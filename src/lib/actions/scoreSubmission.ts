'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import { buildIeltsScoreSummary, normalizeIeltsBand } from '@/lib/ielts/scoring'

export async function scoreSubmission(
  submissionId: string,
  writingBand: number,
  speakingBand: number,
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Primary check: DB role column (authoritative, no code change needed to add admins)
  // Fallback: hard-coded email list for legacy compatibility
  if (!user?.email || !ALL_ADMIN_EMAILS.includes(user.email)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user?.id ?? '')
      .single()
    if (profile?.role !== 'admin') throw new Error('Unauthorized')
  }

  const safeWritingBand = normalizeIeltsBand(writingBand)
  const safeSpeakingBand = normalizeIeltsBand(speakingBand)
  if (safeWritingBand == null || safeSpeakingBand == null) throw new Error('Las bandas deben estar entre 0 y 9.')

  const admin = createAdminClient()
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, listening_band, reading_band')
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .eq('submission_status', 'submitted')
    .maybeSingle()

  if (readError) throw readError
  if (!submission) throw new Error('No encontramos una entrega IELTS válida.')

  const summary = buildIeltsScoreSummary({
    listening: submission.listening_band,
    reading: submission.reading_band,
    writing: safeWritingBand,
    speaking: safeSpeakingBand,
  })

  const { error } = await admin
    .from('exam_submissions')
    .update({
      writing_band: safeWritingBand,
      speaking_band: safeSpeakingBand,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.email ?? 'admin',
      skills: summary.skills,
      total_score: summary.totalScore,
      total_max: 9,
      total_label: summary.totalLabel,
    })
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')

  if (error) throw error
  return { ok: true, overall: summary.totalScore }
}
