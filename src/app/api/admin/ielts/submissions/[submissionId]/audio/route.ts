import { requireAdmin } from '@/lib/auth/require-admin.server'
import { IELTS_SPEAKING_BUCKET } from '@/lib/ielts/submission'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Vary': 'Cookie',
  'X-Content-Type-Options': 'nosniff',
}

function fail(status: number, error: string): Response {
  return Response.json({ error }, { status, headers: PRIVATE_HEADERS })
}

export async function GET(_request: Request, context: { params: Promise<{ submissionId: string }> }): Promise<Response> {
  try {
    await requireAdmin()
  } catch {
    return fail(403, 'No tienes permiso para abrir estos audios.')
  }

  const { submissionId } = await context.params
  if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) return fail(404, 'La entrega no es válida.')

  try {
    const admin = createAdminClient()
    const { data: submission, error } = await admin
      .from('exam_submissions')
      .select('mock_id, speaking_audio_paths')
      .eq('id', submissionId)
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .maybeSingle()
    if (error || !submission || typeof submission.mock_id !== 'string') {
      return fail(404, 'No encontramos los audios de esta entrega.')
    }

    const entries = Object.entries((submission.speaking_audio_paths ?? {}) as Record<string, string>)
      .filter(([questionId, path]) => path.startsWith(`${submission.mock_id}/${submissionId}/${questionId}.`))
    const signed = await Promise.all(entries.map(async ([questionId, path]) => {
      const { data, error: storageError } = await admin.storage.from(IELTS_SPEAKING_BUCKET).createSignedUrl(path, 5 * 60)
      return !storageError && data?.signedUrl ? { questionId, signedUrl: data.signedUrl } : null
    }))
    const files = signed.filter((item): item is { questionId: string; signedUrl: string } => item !== null)
    if (entries.length > 0 && files.length === 0) return fail(503, 'No pudimos abrir los audios privados.')

    return Response.json({ files }, { headers: PRIVATE_HEADERS })
  } catch {
    return fail(503, 'No pudimos abrir los audios privados.')
  }
}
