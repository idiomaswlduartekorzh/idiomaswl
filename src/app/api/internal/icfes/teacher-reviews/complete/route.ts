import { ICFES_TEACHER_UUID_PATTERN, parseIcfesTeacherIdempotencyKey, readIcfesTeacherJson } from '@/lib/icfes/teacher-api';
import { finishIcfesTeacherReviewForWorker, IcfesTeacherOpsError } from '@/lib/icfes/teacher-ops.server';
import { parseIcfesTeacherReviewResult } from '@/lib/icfes/teacher-review-result';
import { authenticateIcfesTeacherWorker } from '@/lib/icfes/teacher-worker-auth';
import { recoverIcfesTeacherNotifications } from '@/lib/icfes/teacher-notifications.server';

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
  const idempotencyKey = parseIcfesTeacherIdempotencyKey(request.headers.get('idempotency-key'));
  if (!idempotencyKey) return json({ ok: false, code: 'invalid_idempotency_key' }, 400);
  let body: unknown;
  try { body = await readIcfesTeacherJson(request); }
  catch { return json({ ok: false, code: 'invalid_request' }, 400); }
  const input = body as Record<string, unknown>;
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || typeof input.reviewId !== 'string' || !ICFES_TEACHER_UUID_PATTERN.test(input.reviewId)
    || typeof input.leaseId !== 'string' || !ICFES_TEACHER_UUID_PATTERN.test(input.leaseId)
    || !['completed', 'needs_qa', 'failed'].includes(String(input.outcome))
    || Object.keys(input).some((key) => !['reviewId', 'leaseId', 'outcome', 'result', 'error'].includes(key))) {
    return json({ ok: false, code: 'invalid_request' }, 400);
  }
  const outcome = input.outcome as 'completed' | 'needs_qa' | 'failed';
  const result = outcome === 'completed' ? parseIcfesTeacherReviewResult(input.result) : null;
  const errorMessage = outcome === 'failed' && typeof input.error === 'string' && input.error.trim()
    ? input.error.trim().slice(0, 300) : null;
  if ((outcome === 'completed' && !result) || (outcome !== 'completed' && input.result != null)
    || (outcome === 'failed' && !errorMessage)) return json({ ok: false, code: 'invalid_request' }, 400);
  try {
    await finishIcfesTeacherReviewForWorker({
      reviewId: input.reviewId, reviewerId, leaseId: input.leaseId, idempotencyKey,
      outcome, result, error: errorMessage,
    });
    if (outcome === 'completed') {
      try { await recoverIcfesTeacherNotifications(1); } catch { /* The durable outbox will retry. */ }
    }
    return json({ ok: true, status: outcome });
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, code === 'stale_lease' || code === 'idempotency_conflict' ? 409 : 503);
  }
}
