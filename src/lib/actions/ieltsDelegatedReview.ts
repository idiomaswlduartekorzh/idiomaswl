'use server'

import { createHash, randomBytes } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import {
  findMissingIeltsSpeakingAudioIds,
  IELTS_OFFICIAL_RUBRICS,
  isIeltsDelegatedReviewTask,
  taskLabel,
  taskShortCode,
  type IeltsDelegatedReviewTask,
} from '@/lib/ielts/delegated-review'
import { getIeltsSpeakingAssignment } from '@/lib/labs/exam-bridge/ielts'
import { getIeltsReviewBlueprint, getIeltsReviewBlueprintByTitle } from '@/lib/ielts/review-blueprint'
import { ieltsSpeakingEvidenceIssues, type IeltsAudioDescriptor } from '@/lib/ielts/submission'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'

const INVITATION_TTL_MS = 24 * 60 * 60 * 1000

function hashReviewToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export type CreateIeltsDelegatedReviewResult =
  | {
    ok: true
    inviteId: string
    path: string
    url: string
    callCode: string
    task: IeltsDelegatedReviewTask
    taskLabel: string
    rubricVersion: string
    rubricUrl: string
    expiresAt: string
  }
  | { ok: false; error: string }

export interface IeltsDelegatedReviewInviteHistoryItem {
  id: string
  task: IeltsDelegatedReviewTask
  callCode: string
  createdAt: string
  expiresAt: string
  usedAt: string | null
  revokedAt: string | null
  evaluatorName: string | null
  evaluatorModel: string | null
  status: 'active' | 'used' | 'revoked' | 'expired'
}

export async function getIeltsDelegatedReviewInviteHistory(
  submissionId: string,
): Promise<{ ok: true; items: IeltsDelegatedReviewInviteHistoryItem[] } | { ok: false; error: string }> {
  try {
    await requireAdmin()
    if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) return { ok: false, error: 'La entrega no es válida.' }

    const { data, error } = await createAdminClient()
      .from('ielts_delegated_review_invites')
      .select('id, task_type, call_code, created_at, expires_at, used_at, revoked_at, evaluator_name, evaluator_model')
      .eq('submission_id', submissionId)
      .order('created_at', { ascending: false })
      .limit(20)
    if (error) throw error

    return {
      ok: true,
      items: (data ?? []).flatMap(item => isIeltsDelegatedReviewTask(item.task_type) ? [{
        id: item.id,
        task: item.task_type,
        callCode: item.call_code,
        createdAt: item.created_at,
        expiresAt: item.expires_at,
        usedAt: item.used_at,
        revokedAt: item.revoked_at,
        evaluatorName: item.evaluator_name,
        evaluatorModel: item.evaluator_model,
        status: item.used_at
          ? 'used'
          : item.revoked_at
            ? 'revoked'
            : Date.parse(item.expires_at) <= Date.now()
              ? 'expired'
              : 'active',
      }] : []),
    }
  } catch {
    return { ok: false, error: 'No pudimos cargar el historial de llamados.' }
  }
}

export async function createIeltsDelegatedReviewInvite(
  submissionId: string,
  taskValue: string,
): Promise<CreateIeltsDelegatedReviewResult> {
  try {
    const adminUser = await requireAdmin()
    if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) {
      return { ok: false, error: 'El código de la entrega no es válido.' }
    }
    if (!isIeltsDelegatedReviewTask(taskValue)) {
      return { ok: false, error: 'La tarea solicitada no es válida.' }
    }

    const admin = createAdminClient()
    const { data: submission, error: submissionError } = await admin
      .from('exam_submissions')
      .select('id, mock_id, mock_title, content_version, assignment_snapshot, writing_task1_answer, writing_task2_answer, speaking_answers, speaking_audio_paths, speaking_audio_metadata, reviewed_at')
      .eq('id', submissionId)
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .maybeSingle()

    if (submissionError) throw submissionError
    if (!submission) return { ok: false, error: 'No encontramos una entrega IELTS confirmada.' }
    if (submission.reviewed_at) return { ok: false, error: 'Esta entrega ya tiene una evaluación final del administrador.' }

    const blueprint = getIeltsReviewBlueprint(submission.mock_id ?? '')
      ?? getIeltsReviewBlueprintByTitle(submission.mock_title)
    if (!blueprint) return { ok: false, error: 'Este simulacro todavía no está conectado al blueprint de revisión.' }
    if (submission.content_version && !blueprint.reviewableContentVersions.includes(submission.content_version)) {
      return { ok: false, error: 'La versión del contenido no coincide con el blueprint actual. Conserva la entrega y revisa su snapshot antes de crear el llamado.' }
    }

    if (taskValue === 'writing_task_1' && !submission.writing_task1_answer?.trim()) {
      return { ok: false, error: `La entrega no contiene material para ${taskLabel(taskValue)}.` }
    }
    if (taskValue === 'writing_task_2' && !submission.writing_task2_answer?.trim()) {
      return { ok: false, error: `La entrega no contiene material para ${taskLabel(taskValue)}.` }
    }
    if (taskValue === 'speaking') {
      const snapshot = submission.assignment_snapshot as { speaking?: Awaited<ReturnType<typeof getIeltsSpeakingAssignment>> } | null
      const speakingAssignment = snapshot?.speaking ?? await getIeltsSpeakingAssignment(blueprint.mockId)
      if (!speakingAssignment) return { ok: false, error: 'Este simulacro no tiene consignas de Speaking conectadas.' }

      const missingAudioIds = findMissingIeltsSpeakingAudioIds(speakingAssignment, submission.speaking_audio_paths)
      if (missingAudioIds.length > 0) {
        return {
          ok: false,
          error: `Speaking necesita ${speakingAssignment.length} grabaciones completas. Faltan: ${missingAudioIds.join(', ')}.`,
        }
      }
      const audioMetadata = Object.values((submission.speaking_audio_metadata ?? {}) as Record<string, IeltsAudioDescriptor>)
      const evidenceIssues = ieltsSpeakingEvidenceIssues(speakingAssignment, audioMetadata)
      if (evidenceIssues.length > 0) return { ok: false, error: evidenceIssues[0] }
    }

    const now = new Date()
    const expiresAt = new Date(now.getTime() + INVITATION_TTL_MS).toISOString()
    const token = randomBytes(32).toString('base64url')
    const callCode = `IELTS-${submissionId.slice(0, 8).toUpperCase()}-${taskShortCode(taskValue)}-${randomBytes(3).toString('hex').toUpperCase()}`
    const rubric = IELTS_OFFICIAL_RUBRICS[taskValue]

    // Regenerating a task intentionally revokes older unused links for the
    // same artifact, so there is only one active capability at a time.
    const { error: revokeError } = await admin
      .from('ielts_delegated_review_invites')
      .update({ revoked_at: now.toISOString() })
      .eq('submission_id', submissionId)
      .eq('task_type', taskValue)
      .is('used_at', null)
      .is('revoked_at', null)
    if (revokeError) throw revokeError

    const { data: invite, error: insertError } = await admin
      .from('ielts_delegated_review_invites')
      .insert({
        submission_id: submissionId,
        mock_id: blueprint.mockId,
        task_type: taskValue,
        call_code: callCode,
        token_hash: hashReviewToken(token),
        rubric_version: rubric.version,
        created_by: adminUser.id,
        expires_at: expiresAt,
      })
      .select('id')
      .single()

    if (insertError || !invite) throw insertError ?? new Error('No se creó la invitación.')

    const origin = process.env.IELTS_REVIEW_ORIGIN ?? 'https://www.idiomaswl.com'
    const path = `/evaluacion-ielts/${token}`

    return {
      ok: true,
      inviteId: invite.id,
      path,
      url: new URL(path, origin).toString(),
      callCode,
      task: taskValue,
      taskLabel: taskLabel(taskValue),
      rubricVersion: rubric.version,
      rubricUrl: rubric.sourceUrl,
      expiresAt,
    }
  } catch (error) {
    console.error('[ielts-delegated-review] Could not create invitation:', error instanceof Error ? error.message : error)
    return { ok: false, error: 'No pudimos crear el llamado. Inténtalo de nuevo.' }
  }
}

export async function revokeIeltsDelegatedReviewInvite(inviteId: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin()
    if (!IELTS_SUBMISSION_ID_PATTERN.test(inviteId)) return { ok: false, error: 'La invitación no es válida.' }

    const { error } = await createAdminClient()
      .from('ielts_delegated_review_invites')
      .update({ revoked_at: new Date().toISOString() })
      .eq('id', inviteId)
      .is('used_at', null)
      .is('revoked_at', null)
    if (error) throw error
    return { ok: true }
  } catch (error) {
    console.error('[ielts-delegated-review] Could not revoke invitation:', error instanceof Error ? error.message : error)
    return { ok: false, error: 'No pudimos revocar el llamado.' }
  }
}
