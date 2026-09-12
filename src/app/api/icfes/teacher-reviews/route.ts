import { cookies } from 'next/headers';
import { json, sameOrigin } from '@/lib/course-pricing/http.server';
import { ICFES_ATTEMPT_ID_PATTERN } from '@/lib/icfes/attempt-contract';
import { icfesAttemptCookieName } from '@/lib/icfes/attempt-token.server';
import { parseIcfesTeacherIdempotencyKey, readIcfesTeacherJson } from '@/lib/icfes/teacher-api';
import { claimAndEnqueueIcfesTeacherReview, getOwnedIcfesTeacherReview, IcfesTeacherOpsError } from '@/lib/icfes/teacher-ops.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function statusFor(code: string) {
  if (code === 'authentication_required') return 401;
  if (code === 'membership_required' || code === 'invalid_capability') return 403;
  if (code === 'idempotency_conflict' || code === 'credit_exhausted') return 409;
  return 503;
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return json({ ok: false, code: 'invalid_origin' }, 403);
  const idempotencyKey = parseIcfesTeacherIdempotencyKey(request.headers.get('idempotency-key'));
  if (!idempotencyKey) return json({ ok: false, code: 'invalid_idempotency_key' }, 400);
  let body: unknown;
  try { body = await readIcfesTeacherJson(request, 4_096); }
  catch { return json({ ok: false, code: 'invalid_request' }, 400); }
  const attemptId = body && typeof body === 'object' && !Array.isArray(body)
    ? (body as Record<string, unknown>).attemptId : null;
  if (typeof attemptId !== 'string' || !ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) {
    return json({ ok: false, code: 'invalid_request' }, 400);
  }
  if (Object.keys(body as Record<string, unknown>).some((key) => key !== 'attemptId')) {
    return json({ ok: false, code: 'invalid_request' }, 400);
  }
  const attemptCapability = (await cookies()).get(icfesAttemptCookieName(attemptId))?.value;
  try {
    const review = await claimAndEnqueueIcfesTeacherReview({ attemptId, attemptCapability, idempotencyKey });
    return json({ ok: true, review: {
      id: review.id, status: review.status, requestedAt: review.requested_at, dueAt: review.due_at,
    } }, 201);
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, statusFor(code));
  }
}

export async function GET(request: Request): Promise<Response> {
  const attemptId = new URL(request.url).searchParams.get('attemptId') ?? '';
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) return json({ ok: false, code: 'invalid_request' }, 400);
  try {
    const review = await getOwnedIcfesTeacherReview(attemptId);
    return json({ ok: true, review: review ? {
      id: review.id, status: review.status, requestedAt: review.requested_at, dueAt: review.due_at,
      completedAt: review.completed_at, result: review.review_result,
    } : null });
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, statusFor(code));
  }
}
