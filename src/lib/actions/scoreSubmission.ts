'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import { buildIeltsScoreSummary, normalizeIeltsBand } from '@/lib/ielts/scoring'

export async function scoreSubmission(
  submissionId: string,
  writingBand: number,
  speakingBand: number,
) {
  const adminUser = await requireAdmin()

  const safeWritingBand = normalizeIeltsBand(writingBand)
  const safeSpeakingBand = normalizeIeltsBand(speakingBand)
  if (safeWritingBand == null || safeSpeakingBand == null) throw new Error('Las bandas deben estar entre 0 y 9.')

  const admin = createAdminClient()
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, listening_band, reading_band, reviewed_at')
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .eq('submission_status', 'submitted')
    .maybeSingle()

  if (readError) throw readError
  if (!submission) throw new Error('No encontramos una entrega IELTS válida.')
  if (submission.reviewed_at) throw new Error('Esta entrega ya tiene una evaluación final. No se sobrescribió.')

  const summary = buildIeltsScoreSummary({
    listening: submission.listening_band,
    reading: submission.reading_band,
    writing: safeWritingBand,
    speaking: safeSpeakingBand,
  })

  const { data: updated, error } = await admin
    .from('exam_submissions')
    .update({
      writing_band: safeWritingBand,
      speaking_band: safeSpeakingBand,
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUser.email,
      skills: summary.skills,
      total_score: summary.totalScore,
      total_max: 9,
      total_label: summary.totalLabel,
    })
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .is('reviewed_at', null)
    .select('id')
    .maybeSingle()

  if (error) throw error
  if (!updated) throw new Error('La entrega fue evaluada por otra persona. Actualiza el panel para ver el resultado final.')
  return { ok: true, overall: summary.totalScore }
}
