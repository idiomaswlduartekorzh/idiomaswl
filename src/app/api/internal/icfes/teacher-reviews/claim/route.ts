import { ICFES_TEACHER_UUID_PATTERN, readIcfesTeacherJson } from '@/lib/icfes/teacher-api';
import { claimIcfesTeacherReviewForWorker, IcfesTeacherOpsError } from '@/lib/icfes/teacher-ops.server';
import { authenticateIcfesTeacherWorker } from '@/lib/icfes/teacher-worker-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0' } });
}

export async function POST(request: Request): Promise<Response> {
  const reviewerId = authenticateIcfesTeacherWorker(request.headers.get('authorization'), process.env.ICFES_TEACHER_WORKER_SECRET);
  if (!reviewerId) {
    return json({ ok: false, code: 'unauthorized' }, 401);
  }
  let body: unknown;
  try { body = await readIcfesTeacherJson(request, 4_096); }
  catch { return json({ ok: false, code: 'invalid_request' }, 400); }
  const input = body as Record<string, unknown>;
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || typeof input.reviewId !== 'string' || !ICFES_TEACHER_UUID_PATTERN.test(input.reviewId)
    || !['review', 'qa'].includes(String(input.stage))
    || Object.keys(input).some((key) => !['reviewId', 'stage'].includes(key))) {
    return json({ ok: false, code: 'invalid_request' }, 400);
  }
  try {
    const claimed = await claimIcfesTeacherReviewForWorker({
      reviewId: input.reviewId, reviewerId, stage: input.stage as 'review' | 'qa',
    });
    return json({ ok: true, ...claimed });
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, code === 'not_claimable' ? 409 : code === 'reviewer_not_ready' ? 403 : 503);
  }
}
