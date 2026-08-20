'use server'

import { createHash, randomBytes } from 'node:crypto'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import {
  IELTS_OFFICIAL_RUBRICS,
  isIeltsDelegatedReviewTask,
  taskLabel,
  taskShortCode,
  type IeltsDelegatedReviewTask,
} from '@/lib/ielts/delegated-review'
import { getIeltsReviewBlueprintByTitle } from '@/lib/ielts/review-blueprint'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'

const INVITATION_TTL_MS = 24 * 60 * 60 * 1000

function hashReviewToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

async function requireAdmin(): Promise<{ id: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) throw new Error('Debes iniciar sesión como administrador.')

  if (!ALL_ADMIN_EMAILS.includes(user.email)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
    if (profile?.role !== 'admin') throw new Error('No tienes permisos para crear llamados de evaluación.')
  }

  return { id: user.id }
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
      .select('id, mock_title, writing_task1_answer, writing_task2_answer, speaking_answers, speaking_audio_paths, reviewed_at')
      .eq('id', submissionId)
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .maybeSingle()

    if (submissionError) throw submissionError
    if (!submission) return { ok: false, error: 'No encontramos una entrega IELTS confirmada.' }
    if (submission.reviewed_at) return { ok: false, error: 'Esta entrega ya tiene una evaluación final del administrador.' }

    const blueprint = getIeltsReviewBlueprintByTitle(submission.mock_title)
    if (!blueprint) return { ok: false, error: 'Este simulacro todavía no está conectado al blueprint de revisión.' }

    const hasArtifact = taskValue === 'writing_task_1'
      ? Boolean(submission.writing_task1_answer?.trim())
      : taskValue === 'writing_task_2'
        ? Boolean(submission.writing_task2_answer?.trim())
        : Boolean(
          (submission.speaking_audio_paths && Object.keys(submission.speaking_audio_paths).length > 0)
          || (submission.speaking_answers && Object.values(submission.speaking_answers).some(Boolean)),
        )

    if (!hasArtifact) return { ok: false, error: `La entrega no contiene material para ${taskLabel(taskValue)}.` }

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

    const requestHeaders = await headers()
    const origin = requestHeaders.get('origin')
      ?? `${requestHeaders.get('x-forwarded-proto') ?? 'https'}://${requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'www.idiomaswl.com'}`
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
