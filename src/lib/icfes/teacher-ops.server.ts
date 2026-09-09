import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  ICFES_TEACHER_ADDENDUM_VERSION,
  type IcfesTeacherReservation,
} from './teacher-ops-v1';
import { ICFES_TEACHER_RUBRIC, ICFES_TEACHER_RUBRIC_VERSION } from './teacher-rubric-v1';
import { claimIcfesAttemptForUser } from './attempt-ownership.server';

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
    throw new Error('icfes_teacher_review_enqueue_failed');
  }
  return data as Record<string, unknown>;
}

export async function claimAndEnqueueIcfesTeacherReview(input: Readonly<{
  membershipId: string;
  attemptId: string;
  attemptCapability: string | undefined;
  idempotencyKey: string;
}>): Promise<Record<string, unknown>> {
  // Ownership is derived from server auth plus the HttpOnly capability. The
  // queue never accepts a client-supplied owner without completing this claim.
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) throw new Error('icfes_teacher_authentication_required');
  await claimIcfesAttemptForUser({
    userId: user.id,
    attemptId: input.attemptId,
    token: input.attemptCapability,
  });
  return enqueueIcfesTeacherReview({ ...input, userId: user.id });
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
