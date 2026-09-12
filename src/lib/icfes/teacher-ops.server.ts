import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import {
  ICFES_TEACHER_ADDENDUM_VERSION,
  type IcfesTeacherReservation,
} from './teacher-ops-v1';
import { ICFES_TEACHER_RUBRIC, ICFES_TEACHER_RUBRIC_VERSION } from './teacher-rubric-v1';
import { claimIcfesAttemptForUser } from './attempt-ownership.server';
import { hashIcfesTeacherReviewResult, parseIcfesTeacherReviewResult, type IcfesTeacherReviewResult } from './teacher-review-result';
import { isIcfesPersistenceEnabled } from './product-config.server';
import { getIcfesPremiumAvailability } from './exam-registry.server';
import { verifyIcfesAttemptToken } from './attempt-token.server';
import { isIcfesTeacherReviewRequestReady } from './teacher-offer-readiness.server';
import { ICFES_TEACHER_UUID_PATTERN } from './teacher-api';
import { canonicalJson, type JsonValue } from './attempt-evidence';

const ICFES_CODEX_HANDOFF_VERSION = 'icfes-codex-handoff-2026-09-12-v1' as const;

export type IcfesTeacherOpsErrorCode =
  | 'authentication_required' | 'membership_required' | 'invalid_capability'
  | 'idempotency_conflict' | 'credit_exhausted' | 'not_claimable'
  | 'reviewer_not_ready' | 'stale_lease' | 'unavailable';

export class IcfesTeacherOpsError extends Error {
  constructor(public readonly code: IcfesTeacherOpsErrorCode) { super(`icfes_teacher_${code}`); }
}

async function activeIcfesTeacherMembership(userId: string): Promise<Record<string, unknown>> {
  const config = getWompiServerConfig();
  const { data, error } = await createAdminClient().from('xpress_memberships').select('id,environment,starts_at,ends_at')
    .eq('user_id', userId).eq('environment', config.environment).eq('exam_slug', 'icfes')
    .eq('offer_id', 'exam-teacher').eq('status', 'active').lte('starts_at', new Date().toISOString())
    .gt('ends_at', new Date().toISOString()).order('ends_at', { ascending: false }).limit(1).maybeSingle();
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (!data) throw new IcfesTeacherOpsError('membership_required');
  return data as Record<string, unknown>;
}

export async function reserveIcfesTeacherCapacityBeforeCheckout(input: Readonly<{
  userId: string;
  environment: 'sandbox' | 'production';
  idempotencyKey: string;
}>): Promise<IcfesTeacherReservation> {
  const { data, error } = await createAdminClient().rpc('reserve_xpress_teacher_capacity', {
    p_user: input.userId,
    p_environment: input.environment,
    p_key: input.idempotencyKey,
    p_rubric: ICFES_TEACHER_RUBRIC_VERSION,
    p_addendum: ICFES_TEACHER_ADDENDUM_VERSION,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error || !data) {
    if (error?.message?.includes('teacher_capacity_unavailable')) {
      throw new Error('icfes_teacher_capacity_unavailable');
    }
    throw new Error('icfes_teacher_capacity_reservation_failed');
  }
  const row = data as Record<string, unknown>;
  return {
    idempotencyKey: String(row.idempotency_key),
    userId: String(row.user_id),
    status: String(row.status).replace('_', '-') as IcfesTeacherReservation['status'],
    heldAt: String(row.held_at),
    expiresAt: String(row.expires_at),
    rubricVersion: ICFES_TEACHER_RUBRIC_VERSION,
    addendumVersion: ICFES_TEACHER_ADDENDUM_VERSION,
  };
}

export async function enqueueIcfesTeacherReview(input: Readonly<{
  userId: string;
  membershipId: string;
  attemptId: string;
  idempotencyKey: string;
}>): Promise<Record<string, unknown>> {
  const { data, error } = await createAdminClient().rpc('request_xpress_teacher_review', {
    p_user: input.userId,
    p_membership: input.membershipId,
    p_attempt: input.attemptId,
    p_key: input.idempotencyKey,
    p_rubric: ICFES_TEACHER_RUBRIC_VERSION,
    p_snapshot: ICFES_TEACHER_RUBRIC,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error || !data) {
    if (error?.message?.includes('teacher_review_attempt_mismatch')) {
      throw new Error('icfes_teacher_attempt_ownership_required');
    }
    if (error?.message?.includes('teacher_review_credit_exhausted')) {
      throw new Error('icfes_teacher_review_credit_exhausted');
    }
    if (error?.message?.includes('teacher_review_idempotency_conflict')) {
      throw new Error('icfes_teacher_review_idempotency_conflict');
    }
    throw new Error('icfes_teacher_review_enqueue_failed');
  }
  return data as Record<string, unknown>;
}

export async function claimAndEnqueueIcfesTeacherReview(input: Readonly<{
  attemptId: string;
  attemptCapability: string | undefined;
  idempotencyKey: string;
}>): Promise<Record<string, unknown>> {
  // Ownership is derived from server auth plus the HttpOnly capability. The
  // queue never accepts a client-supplied owner without completing this claim.
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) throw new IcfesTeacherOpsError('authentication_required');
  const capability = verifyIcfesAttemptToken(input.attemptCapability);
  const capabilityMatches = Boolean(capability && capability.attemptId === input.attemptId
    && getIcfesPremiumAvailability(capability.examId).eligible);
  const { data: ownedAttempt, error: attemptError } = await createAdminClient().from('icfes_attempts')
    .select('id,exam_id,user_id').eq('id', input.attemptId).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (attemptError) throw new IcfesTeacherOpsError('unavailable');
  const alreadyOwned = Boolean(ownedAttempt?.user_id === user.id
    && getIcfesPremiumAvailability(String(ownedAttempt.exam_id)).eligible);
  if (!capabilityMatches && !alreadyOwned) throw new IcfesTeacherOpsError('invalid_capability');
  const membership = await activeIcfesTeacherMembership(user.id);
  if (!(await isIcfesTeacherReviewRequestReady(String(membership.id)))) {
    throw new IcfesTeacherOpsError('unavailable');
  }
  if (!alreadyOwned) {
    try { await claimIcfesAttemptForUser({ userId: user.id, attemptId: input.attemptId, token: input.attemptCapability }); }
    catch { throw new IcfesTeacherOpsError('invalid_capability'); }
  }
  try {
    return await enqueueIcfesTeacherReview({ ...input, userId: user.id, membershipId: String(membership.id) });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (code.includes('idempotency')) throw new IcfesTeacherOpsError('idempotency_conflict');
    if (code.includes('credit_exhausted')) throw new IcfesTeacherOpsError('credit_exhausted');
    if (code.includes('ownership') || code.includes('membership')) throw new IcfesTeacherOpsError('membership_required');
    throw new IcfesTeacherOpsError('unavailable');
  }
}

export async function getOwnedIcfesTeacherReview(attemptId: string): Promise<Record<string, unknown> | null> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) throw new IcfesTeacherOpsError('authentication_required');
  const environment = getWompiServerConfig().environment;
  const admin = createAdminClient();
  const { data, error } = await admin.from('xpress_teacher_reviews')
    .select('id,membership_id,status,requested_at,due_at,completed_at,review_result,review_result_hash,rubric_version,completion_reviewer_id,human_attested_at,codex_model_reference')
    .eq('user_id', user.id).eq('environment', environment).eq('icfes_attempt_id', attemptId).maybeSingle();
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (!data) return null;
  const row = data as Record<string, unknown>;
  const { data: membership, error: membershipError } = await admin.from('xpress_memberships')
    .select('status').eq('id', String(row.membership_id)).eq('user_id', user.id)
    .eq('environment', environment).maybeSingle();
  if (membershipError) throw new IcfesTeacherOpsError('unavailable');
  if (!membership || membership.status === 'revoked') return null;
  if (row.status === 'completed') {
    const attestedAt = typeof row.human_attested_at === 'string' ? Date.parse(row.human_attested_at) : Number.NaN;
    const codexReference = typeof row.codex_model_reference === 'string' ? row.codex_model_reference.trim() : '';
    const reviewerId = typeof row.completion_reviewer_id === 'string' ? row.completion_reviewer_id : '';
    if (!Number.isFinite(attestedAt) || !codexReference || !ICFES_TEACHER_UUID_PATTERN.test(reviewerId)) {
      row.review_result = null;
      row.review_result_hash = null;
      row.delivery_attribution = null;
      return row;
    }
    const { data: reviewer, error: reviewerError } = await admin.from('xpress_teacher_reviewers')
      .select('rubric_version,calibrated_at,calibration_expires_at')
      .eq('reviewer_id', reviewerId).maybeSingle();
    if (reviewerError) throw new IcfesTeacherOpsError('unavailable');
    const calibratedAt = reviewer?.calibrated_at ? Date.parse(String(reviewer.calibrated_at)) : Number.NaN;
    const calibrationExpiresAt = reviewer?.calibration_expires_at
      ? Date.parse(String(reviewer.calibration_expires_at)) : Number.NaN;
    const approvalWasAuthorized = reviewer?.rubric_version === row.rubric_version
      && Number.isFinite(calibratedAt) && Number.isFinite(calibrationExpiresAt)
      && calibratedAt <= attestedAt && attestedAt < calibrationExpiresAt;
    if (!approvalWasAuthorized) {
      row.review_result = null;
      row.review_result_hash = null;
      row.delivery_attribution = null;
      return row;
    }
    const result = parseIcfesTeacherReviewResult(row.review_result);
    if (!result || row.review_result_hash !== hashIcfesTeacherReviewResult(result)) {
      throw new IcfesTeacherOpsError('unavailable');
    }
    row.review_result = result;
    row.delivery_attribution = 'quality-approved-ai-assisted';
  }
  return row;
}

export async function getIcfesTeacherReviewPayload(input: Readonly<{
  reviewId: string;
  reviewerId: string;
  leaseId: string;
}>): Promise<Record<string, unknown> | null> {
  const { data, error } = await createAdminClient().rpc('get_xpress_teacher_review_payload', {
    p_review: input.reviewId,
    p_reviewer: input.reviewerId,
    p_lease: input.leaseId,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error) throw new Error('icfes_teacher_review_payload_unavailable');
  const rows = (data ?? []) as Record<string, unknown>[];
  return rows[0] ?? null;
}

export async function claimIcfesTeacherReviewForWorker(input: Readonly<{
  reviewId: string; reviewerId: string; stage: 'review' | 'qa';
}>) {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const environment = getWompiServerConfig().environment;
  const leaseId = randomUUID();
  const db = createAdminClient();
  const { data, error } = await db.rpc('claim_xpress_teacher_review_v3', {
    p_review: input.reviewId, p_reviewer: input.reviewerId, p_lease: leaseId,
    p_environment: environment, p_stage: input.stage,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error?.message?.includes('teacher_reviewer_not_calibrated')) throw new IcfesTeacherOpsError('reviewer_not_ready');
  if (error?.message?.includes('teacher_reviewer_busy')) throw new IcfesTeacherOpsError('not_claimable');
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('not_claimable');
  const payload = await getIcfesTeacherReviewPayload({ ...input, leaseId });
  if (!payload) throw new IcfesTeacherOpsError('unavailable');
  const { data: lease, error: leaseError } = await db.from('xpress_teacher_reviews')
    .select('lease_expires_at').eq('id', input.reviewId).eq('environment', environment)
    .eq('assigned_to', input.reviewerId).eq('lease_id', leaseId).maybeSingle();
  if (leaseError || !lease?.lease_expires_at) throw new IcfesTeacherOpsError('unavailable');
  return { reviewId: input.reviewId, leaseId, leaseExpiresAt: String(lease.lease_expires_at), payload, handoffRecorded: false };
}

export async function claimNextIcfesTeacherReviewForAdmin(reviewerId: string) {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const environment = getWompiServerConfig().environment;
  const leaseId = randomUUID();
  const db = createAdminClient();
  const { data: reviewId, error } = await db.rpc('claim_next_xpress_teacher_review_v3', {
    p_reviewer: reviewerId, p_lease: leaseId, p_environment: environment,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error?.message?.includes('teacher_reviewer_not_calibrated')) throw new IcfesTeacherOpsError('reviewer_not_ready');
  if (error?.message?.includes('teacher_reviewer_busy')) throw new IcfesTeacherOpsError('not_claimable');
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (typeof reviewId !== 'string') throw new IcfesTeacherOpsError('not_claimable');
  const payload = await getIcfesTeacherReviewPayload({ reviewId, reviewerId, leaseId });
  if (!payload) throw new IcfesTeacherOpsError('unavailable');
  const { data: lease, error: leaseError } = await db.from('xpress_teacher_reviews')
    .select('lease_expires_at').eq('id', reviewId).eq('environment', environment)
    .eq('assigned_to', reviewerId).eq('lease_id', leaseId).maybeSingle();
  if (leaseError || !lease?.lease_expires_at) throw new IcfesTeacherOpsError('unavailable');
  return { reviewId, leaseId, leaseExpiresAt: String(lease.lease_expires_at), payload, handoffRecorded: false };
}

export async function renewIcfesTeacherReviewLease(input: Readonly<{
  reviewId: string; reviewerId: string; leaseId: string;
}>): Promise<void> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const { data, error } = await createAdminClient().rpc('renew_xpress_teacher_review_lease', {
    p_review: input.reviewId, p_reviewer: input.reviewerId, p_lease: input.leaseId,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('stale_lease');
}

function codexPayloadHash(payload: Record<string, unknown>): string {
  const evidence = { version: ICFES_CODEX_HANDOFF_VERSION, payload } as unknown as JsonValue;
  return createHash('sha256').update(canonicalJson(evidence), 'utf8').digest('hex');
}

export async function recordIcfesTeacherCodexHandoff(input: Readonly<{
  reviewId: string; reviewerId: string; leaseId: string;
}>): Promise<void> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const payload = await getIcfesTeacherReviewPayload(input);
  if (!payload) throw new IcfesTeacherOpsError('stale_lease');
  const { data, error } = await createAdminClient().rpc('record_xpress_teacher_codex_handoff', {
    p_review: input.reviewId,
    p_reviewer: input.reviewerId,
    p_lease: input.leaseId,
    p_environment: getWompiServerConfig().environment,
    p_payload_hash: codexPayloadHash(payload),
  }).abortSignal(AbortSignal.timeout(8000));
  if (error?.message?.includes('teacher_codex_handoff_drift')) throw new IcfesTeacherOpsError('idempotency_conflict');
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('stale_lease');
}

export async function completeIcfesTeacherReviewByAdmin(input: Readonly<{
  reviewId: string;
  reviewerId: string;
  leaseId: string;
  idempotencyKey: string;
  result: IcfesTeacherReviewResult;
  codexModel: string;
}>): Promise<void> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const resultHash = hashIcfesTeacherReviewResult(input.result);
  const { data, error } = await createAdminClient().rpc('complete_xpress_teacher_review_admin_v3', {
    p_review: input.reviewId,
    p_reviewer: input.reviewerId,
    p_lease: input.leaseId,
    p_completion_key: input.idempotencyKey,
    p_environment: getWompiServerConfig().environment,
    p_result: input.result,
    p_result_hash: resultHash,
    p_codex_model: input.codexModel,
    p_human_attested: true,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error?.message?.includes('teacher_review_completion_drift')) throw new IcfesTeacherOpsError('idempotency_conflict');
  if (error?.message?.includes('teacher_reviewer_not_calibrated')) throw new IcfesTeacherOpsError('reviewer_not_ready');
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('stale_lease');
}

export async function retryIcfesTeacherNotification(notificationId: string): Promise<void> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const { data, error } = await createAdminClient().rpc('retry_xpress_teacher_review_notification', {
    p_notification: notificationId,
    p_environment: getWompiServerConfig().environment,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('not_claimable');
}

export async function finishIcfesTeacherReviewForWorker(input: Readonly<{
  reviewId: string;
  reviewerId: string;
  leaseId: string;
  idempotencyKey: string;
  outcome: 'needs_qa' | 'failed';
  result: null;
  error: string | null;
}>): Promise<void> {
  if (!isIcfesPersistenceEnabled()) throw new IcfesTeacherOpsError('unavailable');
  const resultHash = input.result ? hashIcfesTeacherReviewResult(input.result) : null;
  const { data, error } = await createAdminClient().rpc('finish_xpress_teacher_review_v2', {
    p_review: input.reviewId, p_reviewer: input.reviewerId, p_lease: input.leaseId,
    p_completion_key: input.idempotencyKey,
    p_outcome: input.outcome, p_result: input.result, p_result_hash: resultHash,
    p_error: input.error,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error?.message?.includes('teacher_review_completion_drift')) throw new IcfesTeacherOpsError('idempotency_conflict');
  if (error) throw new IcfesTeacherOpsError('unavailable');
  if (data !== true) throw new IcfesTeacherOpsError('stale_lease');
}
