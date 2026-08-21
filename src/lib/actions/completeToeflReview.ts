'use server'

import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import { TOEFL_SUBMISSION_ID_PATTERN } from '@/lib/toefl/submission-token.server'

function taskScore(value: number): number | null {
  return Number.isInteger(value) && value >= 0 && value <= 5 ? value : null
}

export async function completeToeflReview(input: {
  submissionId: string
  repeatScore: number
  interviewScore: number
  evidenceNotes: string
}) {
  const adminUser = await requireAdmin()
  if (!TOEFL_SUBMISSION_ID_PATTERN.test(input.submissionId)) throw new Error('La entrega no es válida.')
  const repeatScore = taskScore(input.repeatScore)
  const interviewScore = taskScore(input.interviewScore)
  const evidenceNotes = input.evidenceNotes.trim().slice(0, 5000)
  if (repeatScore == null || interviewScore == null) throw new Error('Cada estimación oral debe ser un entero de 0 a 5.')
  if (evidenceNotes.length < 20) throw new Error('Explica brevemente la evidencia audible usada para la revisión.')

  const admin = createAdminClient()
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, total_label, writing_task1_assessment, writing_task2_assessment, reviewed_at')
    .eq('id', input.submissionId)
    .eq('exam_slug', 'toefl')
    .eq('submission_status', 'submitted')
    .maybeSingle()
  if (readError) throw readError
  if (!submission) throw new Error('No encontramos una entrega TOEFL válida.')
  if (submission.reviewed_at) throw new Error('Esta entrega ya tiene una revisión cerrada.')

  const reviewedAt = new Date().toISOString()
  const reviewer = adminUser.email ?? adminUser.id
  const writingEmail = Number(submission.writing_task1_assessment?.overallBand)
  const writingDiscussion = Number(submission.writing_task2_assessment?.overallBand)
  const writingLabel = Number.isFinite(writingEmail) && Number.isFinite(writingDiscussion)
    ? `Email ${writingEmail}/5 · Discussion ${writingDiscussion}/5`
    : 'Writing automático pendiente'
  const { data: updated, error } = await admin
    .from('exam_submissions')
    .update({
      toefl_speaking_repeat_assessment: {
        score: repeatScore,
        scale: 'task-family-0-5-integer',
        evidenceNotes,
        source: 'human-review',
        reviewedAt,
        reviewedBy: reviewer,
      },
      toefl_speaking_interview_assessment: {
        score: interviewScore,
        scale: 'task-family-0-5-integer',
        evidenceNotes,
        source: 'human-review',
        reviewedAt,
        reviewedBy: reviewer,
      },
      reviewed_at: reviewedAt,
      reviewed_by: reviewer,
      total_score: null,
      total_max: null,
      total_label: `${submission.total_label ?? 'Resultados brutos guardados'} · ${writingLabel} · Repeat ${repeatScore}/5 · Interview ${interviewScore}/5 · sin score oficial 1–6`,
    })
    .eq('id', input.submissionId)
    .eq('exam_slug', 'toefl')
    .is('reviewed_at', null)
    .select('id')
    .maybeSingle()
  if (error) throw error
  if (!updated) throw new Error('Otra persona cerró esta entrega. Actualiza el panel.')
  return { ok: true }
}
