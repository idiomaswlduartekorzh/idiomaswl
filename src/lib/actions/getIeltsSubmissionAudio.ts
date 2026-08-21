'use server'

import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import { IELTS_SPEAKING_BUCKET } from '@/lib/ielts/submission'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'

export async function getIeltsSubmissionAudio(
  submissionId: string,
): Promise<{ ok: true; files: { questionId: string; signedUrl: string }[] } | { ok: false; error: string }> {
  try {
    await requireAdmin()
    if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) return { ok: false, error: 'La entrega no es válida.' }

    const admin = createAdminClient()
    const { data: submission, error } = await admin
      .from('exam_submissions')
      .select('speaking_audio_paths')
      .eq('id', submissionId)
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .maybeSingle()
    if (error || !submission) return { ok: false, error: 'No encontramos los audios de esta entrega.' }

    const paths = Object.entries((submission.speaking_audio_paths ?? {}) as Record<string, string>)
    const signed = await Promise.all(paths.map(async ([questionId, path]) => {
      const { data } = await admin.storage.from(IELTS_SPEAKING_BUCKET).createSignedUrl(path, 5 * 60)
      return data?.signedUrl ? { questionId, signedUrl: data.signedUrl } : null
    }))
    return { ok: true, files: signed.filter((item): item is { questionId: string; signedUrl: string } => item !== null) }
  } catch {
    return { ok: false, error: 'No pudimos abrir los audios privados.' }
  }
}
