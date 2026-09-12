import { requireAdmin } from '@/lib/auth/require-admin.server';
import { sameOrigin } from '@/lib/course-pricing/http.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ICFES_TEACHER_UUID_PATTERN, parseIcfesTeacherIdempotencyKey, readIcfesTeacherJson } from '@/lib/icfes/teacher-api';
import {
  claimIcfesTeacherReviewForWorker,
  finishIcfesTeacherReviewForWorker,
  getIcfesTeacherReviewPayload,
  IcfesTeacherOpsError,
  renewIcfesTeacherReviewLease,
} from '@/lib/icfes/teacher-ops.server';
import { parseIcfesTeacherReviewResult } from '@/lib/icfes/teacher-review-result';
import { getWompiServerConfig } from '@/lib/wompi/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow, noarchive' } });
}

async function adminOrNull() {
  try { return await requireAdmin(); } catch { return null; }
}

function publicReview(row: Record<string, unknown>, adminId: string) {
  const assignedToMe = row.assigned_to === adminId;
  return {
    id: row.id,
    status: row.status,
    stage: row.workflow_stage,
    requestedAt: row.requested_at,
    dueAt: row.due_at,
    completedAt: row.completed_at,
    attempts: row.attempts,
    assignedToMe,
    lastError: row.last_error,
  };
}

async function queueFor(adminId: string) {
  const db = createAdminClient();
  const environment = getWompiServerConfig().environment;
  const now = new Date().toISOString();
  const [queueResult, currentResult, reviewerResult, deadResult] = await Promise.all([
    db.from('xpress_teacher_reviews')
      .select('id,status,workflow_stage,requested_at,due_at,completed_at,attempts,assigned_to,lease_id,lease_expires_at,last_error')
      .eq('environment', environment).in('status', ['queued', 'in_review', 'needs_qa', 'failed'])
      .order('due_at', { ascending: true }).limit(100).abortSignal(AbortSignal.timeout(8000)),
    db.from('xpress_teacher_reviews')
      .select('id,status,workflow_stage,requested_at,due_at,completed_at,attempts,assigned_to,lease_id,lease_expires_at,last_error')
      .eq('environment', environment).eq('status', 'in_review').eq('assigned_to', adminId)
      .gt('lease_expires_at', now).order('lease_expires_at', { ascending: false }).limit(1).maybeSingle(),
    db.from('xpress_teacher_reviewers')
      .select('status,rubric_version,calibration_expires_at').eq('reviewer_id', adminId).abortSignal(AbortSignal.timeout(8000)).maybeSingle(),
    db.from('xpress_teacher_review_notifications')
      .select('id,xpress_teacher_reviews!inner(environment)', { count: 'exact', head: true })
      .eq('status', 'dead').eq('xpress_teacher_reviews.environment', environment),
  ]);
  const { data: rows, error } = queueResult;
  const { data: current, error: currentError } = currentResult;
  const { data: reviewer, error: reviewerError } = reviewerResult;
  const { count: deadNotifications, error: deadError } = deadResult;
  if (error || currentError || reviewerError) throw new Error('queue_unavailable');
  let activeAssignment = null;
  if (current) {
    const payload = await getIcfesTeacherReviewPayload({
      reviewId: String(current.id), reviewerId: adminId, leaseId: String(current.lease_id),
    });
    if (payload) activeAssignment = { reviewId: current.id, leaseId: current.lease_id, leaseExpiresAt: current.lease_expires_at, payload };
  }
  const reviewerReady = reviewer?.status === 'active'
    && new Date(String(reviewer.calibration_expires_at)).getTime() > Date.now();
  return {
    environment,
    deadNotifications: deadError ? -1 : deadNotifications ?? 0,
    reviews: ((rows ?? []) as Record<string, unknown>[]).map((row) => publicReview(row, adminId)),
    reviewerReady,
    activeAssignment,
  };
}

export async function GET(): Promise<Response> {
  const admin = await adminOrNull();
  if (!admin) return json({ ok: false, code: 'unauthorized' }, 401);
  try { return json({ ok: true, ...(await queueFor(admin.id)) }); }
  catch { return json({ ok: false, code: 'queue_unavailable' }, 503); }
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return json({ ok: false, code: 'invalid_origin' }, 403);
  const admin = await adminOrNull();
  if (!admin) return json({ ok: false, code: 'unauthorized' }, 401);
  let body: unknown;
  try { body = await readIcfesTeacherJson(request); }
  catch { return json({ ok: false, code: 'invalid_request' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false, code: 'invalid_request' }, 400);
  const input = body as Record<string, unknown>;
  const action = String(input.action ?? '');
  try {
    if (action === 'claim' || action === 'claim-next') {
      let reviewId = typeof input.reviewId === 'string' ? input.reviewId : '';
      let stage: 'review' | 'qa' = 'review';
      const environment = getWompiServerConfig().environment;
      if (action === 'claim-next') {
        const { data, error } = await createAdminClient().from('xpress_teacher_reviews')
          .select('id,status,workflow_stage,lease_expires_at').eq('environment', environment)
          .in('status', ['queued', 'failed', 'needs_qa', 'in_review'])
          .order('due_at', { ascending: true }).limit(100).abortSignal(AbortSignal.timeout(8000));
        if (error) throw new IcfesTeacherOpsError('unavailable');
        const claimable = (data ?? []).find((row) => row.status !== 'in_review'
          || (typeof row.lease_expires_at === 'string' && Date.parse(row.lease_expires_at) <= Date.now()));
        reviewId = String(claimable?.id ?? '');
        stage = claimable?.workflow_stage === 'qa' ? 'qa' : 'review';
      } else if (ICFES_TEACHER_UUID_PATTERN.test(reviewId)) {
        const { data, error } = await createAdminClient().from('xpress_teacher_reviews')
          .select('workflow_stage').eq('id', reviewId).eq('environment', environment).maybeSingle();
        if (error) throw new IcfesTeacherOpsError('unavailable');
        stage = data?.workflow_stage === 'qa' ? 'qa' : 'review';
      }
      if (!ICFES_TEACHER_UUID_PATTERN.test(reviewId)) return json({ ok: false, code: 'nothing_to_claim' }, 409);
      const claimed = await claimIcfesTeacherReviewForWorker({ reviewId, reviewerId: admin.id, stage });
      return json({ ok: true, assignment: { reviewId, leaseId: claimed.leaseId, leaseExpiresAt: new Date(Date.now() + 15 * 60_000).toISOString(), payload: claimed.payload } });
    }
    if (action === 'renew') {
      const reviewId = String(input.reviewId ?? '');
      const leaseId = String(input.leaseId ?? '');
      if (!ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !ICFES_TEACHER_UUID_PATTERN.test(leaseId)) return json({ ok: false, code: 'invalid_request' }, 400);
      await renewIcfesTeacherReviewLease({ reviewId, reviewerId: admin.id, leaseId });
      return json({ ok: true });
    }
    if (action === 'complete') {
      const reviewId = String(input.reviewId ?? '');
      const leaseId = String(input.leaseId ?? '');
      const idempotencyKey = parseIcfesTeacherIdempotencyKey(request.headers.get('idempotency-key'));
      const result = parseIcfesTeacherReviewResult(input.result);
      if (!ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !ICFES_TEACHER_UUID_PATTERN.test(leaseId) || !idempotencyKey || !result) {
        return json({ ok: false, code: 'invalid_review_result' }, 400);
      }
      await finishIcfesTeacherReviewForWorker({
        reviewId, reviewerId: admin.id, leaseId, idempotencyKey,
        outcome: 'completed', result, error: null,
      });
      return json({ ok: true, status: 'completed' });
    }
    return json({ ok: false, code: 'invalid_action' }, 400);
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, code === 'not_claimable' || code === 'stale_lease' || code === 'idempotency_conflict' ? 409 : code === 'reviewer_not_ready' ? 403 : 503);
  }
}
