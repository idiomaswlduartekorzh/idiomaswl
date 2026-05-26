'use server'

import { createClient } from '@/lib/supabase/server'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'

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

  const overall = Math.round(((writingBand + speakingBand) / 2) * 2) / 2

  const { error } = await supabase
    .from('exam_submissions')
    .update({
      writing_band: writingBand,
      speaking_band: speakingBand,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.email ?? 'admin',
      total_label: `Writing Band ${writingBand} · Speaking Band ${speakingBand}`,
    })
    .eq('id', submissionId)

  if (error) throw error
  return { ok: true, overall }
}
