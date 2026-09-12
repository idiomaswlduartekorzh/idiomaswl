import { requireAdmin } from '@/lib/auth/require-admin.server';
import { sameOrigin } from '@/lib/course-pricing/http.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ICFES_TEACHER_UUID_PATTERN, parseIcfesTeacherIdempotencyKey, readIcfesTeacherJson } from '@/lib/icfes/teacher-api';
import {
  claimNextIcfesTeacherReviewForAdmin,
  claimIcfesTeacherReviewForWorker,
  completeIcfesTeacherReviewByAdmin,
  getIcfesTeacherReviewPayload,
  IcfesTeacherOpsError,
  recordIcfesTeacherCodexHandoff,
  renewIcfesTeacherReviewLease,
  retryIcfesTeacherNotification,
} from '@/lib/icfes/teacher-ops.server';
import { parseIcfesTeacherReviewResult } from '@/lib/icfes/teacher-review-result';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { ICFES_TEACHER_RUBRIC_VERSION } from '@/lib/icfes/teacher-rubric-v1';
import { recoverIcfesTeacherNotifications } from '@/lib/icfes/teacher-notifications.server';

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
  const leaseExpired = row.status === 'in_review'
    && Date.parse(String(row.lease_expires_at ?? '')) <= Date.now();
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
    claimable: row.status === 'queued' || row.status === 'failed' || row.status === 'needs_qa' || leaseExpired,
  };
}

function hasOnly(input: Record<string, unknown>, allowed: readonly string[]) {
  return Object.keys(input).every((key) => allowed.includes(key));
}

async function queueFor(adminId: string) {
  const db = createAdminClient();
  const environment = getWompiServerConfig().environment;
  const now = new Date().toISOString();
  const [queueResult, currentResult, reviewerResult, deadResult] = await Promise.all([
    db.from('xpress_teacher_reviews')
      .select('id,status,workflow_stage,requested_at,due_at,completed_at,attempts,assigned_to,lease_id,lease_expires_at,last_error,codex_handoff_lease_id,codex_handoff_payload_hash,codex_handoff_at')
      .eq('environment', environment).in('status', ['queued', 'in_review', 'needs_qa', 'failed'])
      .order('due_at', { ascending: true }).limit(100).abortSignal(AbortSignal.timeout(8000)),
    db.from('xpress_teacher_reviews')
      .select('id,status,workflow_stage,requested_at,due_at,completed_at,attempts,assigned_to,lease_id,lease_expires_at,last_error,codex_handoff_lease_id,codex_handoff_payload_hash,codex_handoff_at')
      .eq('environment', environment).eq('status', 'in_review').eq('assigned_to', adminId)
      .gt('lease_expires_at', now).order('lease_expires_at', { ascending: false }).limit(1).maybeSingle(),
    db.from('xpress_teacher_reviewers')
      .select('status,rubric_version,calibration_expires_at').eq('reviewer_id', adminId).abortSignal(AbortSignal.timeout(8000)).maybeSingle(),
    db.from('xpress_teacher_review_notifications')
      .select('id,review_id,kind,attempts,last_error,next_attempt_at,xpress_teacher_reviews!inner(environment)')
      .eq('status', 'dead').eq('xpress_teacher_reviews.environment', environment)
      .order('updated_at', { ascending: false }).limit(50),
  ]);
  const { data: rows, error } = queueResult;
  const { data: current, error: currentError } = currentResult;
  const { data: reviewer, error: reviewerError } = reviewerResult;
  const { data: deadRows, error: deadError } = deadResult;
  if (error || currentError || reviewerError) throw new Error('queue_unavailable');
  let activeAssignment = null;
  if (current) {
    const payload = await getIcfesTeacherReviewPayload({
      reviewId: String(current.id), reviewerId: adminId, leaseId: String(current.lease_id),
    });
    if (payload) activeAssignment = {
      reviewId: current.id,
      leaseId: current.lease_id,
      leaseExpiresAt: current.lease_expires_at,
      stage: current.workflow_stage,
      handoffRecorded: current.codex_handoff_lease_id === current.lease_id
        && typeof current.codex_handoff_payload_hash === 'string'
        && typeof current.codex_handoff_at === 'string',
      payload,
    };
  }
  const reviewerReady = reviewer?.status === 'active'
    && reviewer.rubric_version === ICFES_TEACHER_RUBRIC_VERSION
    && new Date(String(reviewer.calibration_expires_at)).getTime() > Date.now();
  return {
    environment,
    deadNotifications: deadError ? null : (deadRows ?? []).map((row) => ({
      id: row.id,
      reviewId: row.review_id,
      kind: row.kind,
      attempts: row.attempts,
      lastError: row.last_error,
      nextAttemptAt: row.next_attempt_at,
    })),
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
      if (action === 'claim-next') {
        if (!hasOnly(input, ['action'])) return json({ ok: false, code: 'invalid_request' }, 400);
        return json({ ok: true, assignment: await claimNextIcfesTeacherReviewForAdmin(admin.id) });
      }
      const reviewId = String(input.reviewId ?? '');
      const stage = input.stage === 'qa' ? 'qa' : input.stage === 'review' ? 'review' : null;
      if (!hasOnly(input, ['action', 'reviewId', 'stage']) || !ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !stage) {
        return json({ ok: false, code: 'invalid_request' }, 400);
      }
      const claimed = await claimIcfesTeacherReviewForWorker({ reviewId, reviewerId: admin.id, stage });
      return json({ ok: true, assignment: claimed });
    }
    if (action === 'renew') {
      const reviewId = String(input.reviewId ?? '');
      const leaseId = String(input.leaseId ?? '');
      if (!hasOnly(input, ['action', 'reviewId', 'leaseId']) || !ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !ICFES_TEACHER_UUID_PATTERN.test(leaseId)) return json({ ok: false, code: 'invalid_request' }, 400);
      await renewIcfesTeacherReviewLease({ reviewId, reviewerId: admin.id, leaseId });
      return json({ ok: true });
    }
    if (action === 'handoff') {
      const reviewId = String(input.reviewId ?? '');
      const leaseId = String(input.leaseId ?? '');
      if (!hasOnly(input, ['action', 'reviewId', 'leaseId']) || !ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !ICFES_TEACHER_UUID_PATTERN.test(leaseId)) {
        return json({ ok: false, code: 'invalid_request' }, 400);
      }
      await recordIcfesTeacherCodexHandoff({ reviewId, reviewerId: admin.id, leaseId });
      return json({ ok: true, recorded: true });
    }
    if (action === 'complete') {
      const reviewId = String(input.reviewId ?? '');
      const leaseId = String(input.leaseId ?? '');
      const idempotencyKey = parseIcfesTeacherIdempotencyKey(request.headers.get('idempotency-key'));
      const result = parseIcfesTeacherReviewResult(input.result);
      const codexModel = typeof input.codexModel === 'string' ? input.codexModel.trim() : '';
      if (!hasOnly(input, ['action', 'reviewId', 'leaseId', 'result', 'codexModel', 'humanAttested'])
        || !ICFES_TEACHER_UUID_PATTERN.test(reviewId) || !ICFES_TEACHER_UUID_PATTERN.test(leaseId)
        || !idempotencyKey || !result || input.humanAttested !== true
        || codexModel.length < 2 || codexModel.length > 120 || /[\u0000-\u001f]/.test(codexModel)) {
        return json({ ok: false, code: 'invalid_review_result' }, 400);
      }
      await completeIcfesTeacherReviewByAdmin({
        reviewId, reviewerId: admin.id, leaseId, idempotencyKey, result, codexModel,
      });
      try { await recoverIcfesTeacherNotifications(1); } catch { /* Durable outbox retries. */ }
      return json({ ok: true, status: 'completed' });
    }
    if (action === 'retry-notification') {
      const notificationId = String(input.notificationId ?? '');
      if (!hasOnly(input, ['action', 'notificationId']) || !ICFES_TEACHER_UUID_PATTERN.test(notificationId)) {
        return json({ ok: false, code: 'invalid_request' }, 400);
      }
      await retryIcfesTeacherNotification(notificationId);
      try { await recoverIcfesTeacherNotifications(1); } catch { /* It remains pending for cron. */ }
      return json({ ok: true });
    }
    return json({ ok: false, code: 'invalid_action' }, 400);
  } catch (error) {
    const code = error instanceof IcfesTeacherOpsError ? error.code : 'unavailable';
    return json({ ok: false, code }, code === 'not_claimable' || code === 'stale_lease' || code === 'idempotency_conflict' ? 409 : code === 'reviewer_not_ready' ? 403 : 503);
  }
}
