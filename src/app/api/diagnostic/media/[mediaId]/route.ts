import { resolveAudioByteRange } from '@/lib/media/byte-range';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK } from '@/server/diagnostic/bank';
import { resolveDiagnosticMediaObject } from '@/server/diagnostic/media';
import { authorizeDiagnosticMediaAccess } from '@/server/diagnostic/repository.server';
import { logDiagnosticInternalFailure, observeDiagnosticRoute } from '@/server/diagnostic/observability';

export const runtime = 'nodejs';

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Cookie',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Content-Type-Options': 'nosniff',
};
const MEDIA_ID = /^en-[a-z0-9-]{3,100}$/;

function fail(status: number, extra: Record<string, string> = {}): Response {
  return new Response(null, { status, headers: { ...PRIVATE_HEADERS, ...extra } });
}

async function serveDiagnosticMedia(
  request: Request,
  context: { params: Promise<{ mediaId: string }> },
  headOnly = false,
): Promise<Response> {
  if (process.env.DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true') return fail(404);
  const { mediaId } = await context.params;
  if (!MEDIA_ID.test(mediaId)) return fail(404);
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return fail(401);
  const media = resolveDiagnosticMediaObject(ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, mediaId);
  if (!media) return fail(404);
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-media-user', identifier: user.id, limit: 1200, windowSeconds: 3600,
  });
  if (!allowed) return fail(429);
  try {
    if (!await authorizeDiagnosticMediaAccess({ userId: user.id, itemIds: media.itemIds, now: new Date() })) {
      return fail(404);
    }
    const { data: file, error } = await createAdminClient().storage.from(media.bucket).download(media.objectPath);
    if (error || !file) return fail(404);
    const range = resolveAudioByteRange(request.headers.get('range'), file.size);
    if (range === null) return fail(416, { 'Content-Range': `bytes */${file.size}` });
    const headers = {
      ...PRIVATE_HEADERS,
      'Accept-Ranges': 'bytes',
      'Content-Type': media.mimeType,
      'Content-Length': String(range ? range.end - range.start + 1 : file.size),
      ...(range ? { 'Content-Range': `bytes ${range.start}-${range.end}/${file.size}` } : {}),
    };
    return new Response(headOnly ? null : range ? file.slice(range.start, range.end + 1) : file, {
      status: range ? 206 : 200,
      headers,
    });
  } catch {
    logDiagnosticInternalFailure({ component: 'media-delivery', reason: 'media-delivery-failed' });
    return fail(503);
  }
}

export async function GET(request: Request, context: { params: Promise<{ mediaId: string }> }): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/media/[mediaId]', method: 'GET' },
    () => serveDiagnosticMedia(request, context),
  );
}

export async function HEAD(request: Request, context: { params: Promise<{ mediaId: string }> }): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/media/[mediaId]', method: 'HEAD' },
    () => serveDiagnosticMedia(request, context, true),
  );
}
