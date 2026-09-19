import { requireAdmin } from '@/lib/auth/require-admin.server'
import { resolveAudioByteRange } from '@/lib/goethe/admin-audio-range'
import { GOETHE_SPEAKING_BUCKET } from '@/lib/goethe/submission'
import { GOETHE_SUBMISSION_ID_PATTERN } from '@/lib/goethe/submission-token.server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Vary': 'Cookie',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Content-Type-Options': 'nosniff',
}

const AUDIO_MIME_TYPES = new Set(['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-m4a'])

function fail(status: number): Response {
  return new Response(null, { status, headers: PRIVATE_HEADERS })
}

async function serveAudio(request: Request, context: { params: Promise<{ submissionId: string; questionId: string }> }, headOnly = false): Promise<Response> {
  try {
    await requireAdmin()
  } catch {
    return fail(403)
  }

  const { submissionId, questionId } = await context.params
  if (!GOETHE_SUBMISSION_ID_PATTERN.test(submissionId) || !/^g-a1-\d+-sp[1-3]$/.test(questionId)) return fail(404)

  try {
    const admin = createAdminClient()
    const { data: submission, error: readError } = await admin.from('exam_submissions')
      .select('mock_id, speaking_audio_paths, speaking_audio_metadata')
      .eq('id', submissionId).eq('exam_slug', 'goethe').eq('submission_status', 'submitted').maybeSingle()
    if (readError || !submission) return fail(404)

    const mockId = submission.mock_id
    const paths = (submission.speaking_audio_paths ?? {}) as Record<string, string>
    const path = paths[questionId]
    if (typeof mockId !== 'string' || questionId !== `g-${mockId}-sp${questionId.at(-1)}`
      || typeof path !== 'string' || !path.startsWith(`${mockId}/${submissionId}/${questionId}.`)) return fail(404)

    const { data: file, error: storageError } = await admin.storage.from(GOETHE_SPEAKING_BUCKET).download(path)
    if (storageError || !file) return fail(404)

    const metadata = (submission.speaking_audio_metadata ?? {}) as Record<string, { mimeType?: string }>
    const recordedType = (metadata[questionId]?.mimeType || file.type)?.split(';')[0].toLowerCase()
    const contentType = recordedType && AUDIO_MIME_TYPES.has(recordedType) ? recordedType : 'application/octet-stream'
    const range = resolveAudioByteRange(request.headers.get('range'), file.size)
    if (range === null) return new Response(null, {
      status: 416,
      headers: { ...PRIVATE_HEADERS, 'Content-Range': `bytes */${file.size}` },
    })

    const headers = {
      ...PRIVATE_HEADERS,
      'Accept-Ranges': 'bytes',
      'Content-Type': contentType,
      'Content-Length': String(range ? range.end - range.start + 1 : file.size),
      ...(range ? { 'Content-Range': `bytes ${range.start}-${range.end}/${file.size}` } : {}),
    }
    return new Response(headOnly ? null : range ? file.slice(range.start, range.end + 1) : file, {
      status: range ? 206 : 200,
      headers,
    })
  } catch {
    return fail(503)
  }
}

export async function GET(request: Request, context: { params: Promise<{ submissionId: string; questionId: string }> }): Promise<Response> {
  return serveAudio(request, context)
}

export async function HEAD(request: Request, context: { params: Promise<{ submissionId: string; questionId: string }> }): Promise<Response> {
  return serveAudio(request, context, true)
}
