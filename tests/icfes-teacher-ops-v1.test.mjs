import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { ICFES_TEACHER_RUBRIC } from '../src/lib/icfes/teacher-rubric-v1.ts';
import { parseXpressOrderInput } from '../src/lib/xpress-commerce/payment.ts';
import { XPRESS_PRIVACY_VERSION, XPRESS_TERMS_VERSION } from '../src/lib/xpress-commerce/terms.ts';
import {
  ICFES_TEACHER_ADDENDUM,
  claimIcfesTeacherReview,
  dueIcfesTeacherAlerts,
  evaluateIcfesTeacherCapacity,
  finishIcfesTeacherReview,
  requestIcfesTeacherReview,
  reserveIcfesTeacherCapacity,
} from '../src/lib/icfes/teacher-ops-v1.ts';

const healthyCapacity = {
  calibratedReviewers: 2,
  dailyCapacitySlots: 10,
  heldReservations: 2,
  outstandingCredits: 3,
  oldestQueuedHours: 6,
  rollingP95Hours: 8,
  hasOpenSlaBreach: false,
};

test('versions the rubric and limits the ICFES addendum to one credit', () => {
  assert.equal(ICFES_TEACHER_RUBRIC.version, 'icfes-teacher-rubric-2026-09-09-v1');
  assert.equal(ICFES_TEACHER_RUBRIC.criteria.reduce((sum, criterion) => sum + criterion.weight, 0), 100);
  assert.equal(ICFES_TEACHER_ADDENDUM.appliesTo.examSlug, 'icfes');
  assert.equal(ICFES_TEACHER_ADDENDUM.reviewCreditsPer30Days, 1);
  assert.equal(ICFES_TEACHER_ADDENDUM.serviceTargetHours, 12);
  assert.match(ICFES_TEACHER_ADDENDUM.text, /un solo crédito/);
  assert.doesNotMatch(ICFES_TEACHER_ADDENDUM.text, /cada entrega/);
});

test('requires the ICFES-only addendum without changing other Xpress order contracts', () => {
  const base = {
    idempotencyKey: '12345678-1234-4234-8234-123456789012',
    examSlug: 'icfes',
    offerId: 'exam-teacher',
    acceptedTerms: XPRESS_TERMS_VERSION,
    acceptedPrivacy: XPRESS_PRIVACY_VERSION,
  };
  assert.equal(parseXpressOrderInput(base), null);
  assert.deepEqual(parseXpressOrderInput({
    ...base,
    acceptedIcfesTeacherAddendum: ICFES_TEACHER_ADDENDUM.version,
  }), {
    ...base,
    acceptedIcfesTeacherAddendum: ICFES_TEACHER_ADDENDUM.version,
  });
  assert.notEqual(parseXpressOrderInput({ ...base, examSlug: 'ielts' }), null);
});

test('reserves capacity before checkout and replays the same reservation', () => {
  const now = new Date('2026-09-09T15:00:00.000Z');
  const first = reserveIcfesTeacherCapacity({
    userId: 'user-1', idempotencyKey: 'key-1', now, capacity: healthyCapacity,
  });
  assert.equal(first.action, 'held');
  assert.equal(first.capacity.serviceRepresentation, 'target-12h');
  assert.equal(first.reservation.expiresAt, '2026-09-09T15:20:00.000Z');

  const replay = reserveIcfesTeacherCapacity({
    userId: 'user-1', idempotencyKey: 'key-1', now, capacity: healthyCapacity,
    existingReservation: first.reservation,
  });
  assert.equal(replay.action, 'replayed');
  assert.strictEqual(replay.reservation, first.reservation);

  const released = reserveIcfesTeacherCapacity({
    userId: 'user-1', idempotencyKey: 'key-1', now,
    capacity: healthyCapacity,
    existingReservation: { ...first.reservation, status: 'released' },
  });
  assert.equal(released.action, 'blocked');
});

test('blocks the human tier instead of representing a target without capacity', () => {
  const decision = evaluateIcfesTeacherCapacity({
    ...healthyCapacity,
    calibratedReviewers: 0,
    dailyCapacitySlots: 0,
  });
  assert.equal(decision.canReserve, false);
  assert.equal(decision.serviceRepresentation, 'unavailable');
  assert.deepEqual(decision.stopReasons, [
    'no-calibrated-reviewer', 'capacity-not-finite', 'capacity-utilization-red',
  ]);
});

test('applies all operational stop conditions before accepting another sale', () => {
  const decision = evaluateIcfesTeacherCapacity({
    calibratedReviewers: 1,
    dailyCapacitySlots: 5,
    heldReservations: 2,
    outstandingCredits: 2,
    oldestQueuedHours: 18,
    rollingP95Hours: 21,
    hasOpenSlaBreach: true,
  });
  assert.equal(decision.canReserve, false);
  assert.deepEqual(decision.stopReasons, [
    'capacity-utilization-red', 'oldest-queue-red', 'rolling-p95-red', 'open-sla-breach',
  ]);
});

test('enforces one idempotent review request per membership credit', () => {
  const now = new Date('2026-09-09T15:00:00.000Z');
  const first = requestIcfesTeacherReview({
    reviewId: 'review-1', membershipId: 'membership-1', attemptId: 'attempt-1',
    idempotencyKey: 'request-1', now,
  });
  const replay = requestIcfesTeacherReview({
    reviewId: 'ignored', membershipId: 'membership-1', attemptId: 'attempt-1',
    idempotencyKey: 'request-1', now, existingByIdempotency: first.review,
  });
  assert.equal(replay.action, 'replayed');
  assert.strictEqual(replay.review, first.review);
  assert.throws(() => requestIcfesTeacherReview({
    reviewId: 'review-2', membershipId: 'membership-1', attemptId: 'attempt-2',
    idempotencyKey: 'request-2', now, existingForMembership: first.review,
  }), /credit_exhausted/);
});

test('leases queued work, rejects stale workers and permits reclaim after expiry', () => {
  const queued = requestIcfesTeacherReview({
    reviewId: 'review-1', membershipId: 'membership-1', attemptId: 'attempt-1',
    idempotencyKey: 'request-1', now: new Date('2026-09-09T15:00:00.000Z'),
  }).review;
  const first = claimIcfesTeacherReview(queued, 'lease-1', new Date('2026-09-09T15:01:00.000Z'));
  assert.equal(first.claimed, true);
  assert.equal(first.review.attempts, 1);
  assert.throws(() => finishIcfesTeacherReview(
    first.review, 'wrong-lease', 'completed', new Date('2026-09-09T15:02:00.000Z'),
  ), /lease_mismatch/);
  assert.equal(claimIcfesTeacherReview(
    first.review, 'lease-2', new Date('2026-09-09T15:05:00.000Z'),
  ).claimed, false);

  const reclaimed = claimIcfesTeacherReview(
    first.review, 'lease-2', new Date('2026-09-09T15:16:00.000Z'),
  );
  assert.equal(reclaimed.claimed, true);
  assert.equal(reclaimed.review.attempts, 2);
  const completed = finishIcfesTeacherReview(
    reclaimed.review, 'lease-2', 'completed', new Date('2026-09-09T15:17:00.000Z'),
  );
  assert.equal(completed.status, 'completed');
});

test('emits idempotent alert thresholds before the 12-hour target', () => {
  const requestedAt = new Date('2026-09-09T00:00:00.000Z');
  assert.deepEqual(dueIcfesTeacherAlerts(requestedAt, new Date('2026-09-09T05:59:59.999Z')), []);
  assert.deepEqual(dueIcfesTeacherAlerts(requestedAt, new Date('2026-09-09T06:00:00.000Z')), [6]);
  assert.deepEqual(dueIcfesTeacherAlerts(requestedAt, new Date('2026-09-09T09:00:00.000Z')), [6, 9]);
  assert.deepEqual(dueIcfesTeacherAlerts(requestedAt, new Date('2026-09-09T11:00:00.000Z')), [6, 9, 11]);
});

test('the unapplied SQL keeps teacher operations behind service-role RLS', async () => {
  const sql = await readFile(new URL('../supabase/migrations/20260909000500_xpress_memberships_wompi.sql', import.meta.url), 'utf8');
  assert.match(sql, /alter table public\.xpress_teacher_reviews enable row level security/);
  assert.match(sql, /grant execute on function public\.reserve_xpress_teacher_capacity/);
  assert.match(sql, /grant execute on function public\.request_xpress_teacher_review/);
  assert.match(sql, /grant execute on function public\.claim_xpress_teacher_review/);
  assert.match(sql, /grant execute on function public\.finish_xpress_teacher_review/);
  assert.match(sql, /grant execute on function public\.queue_xpress_teacher_review_alerts/);
  assert.match(sql, /create view public\.xpress_teacher_review_payloads[\s\S]+from public\.xpress_teacher_reviews review[\s\S]+join public\.icfes_attempts attempt/);
  assert.match(sql, /grant execute on function public\.get_xpress_teacher_review_payload\(uuid,uuid,uuid\) to service_role/);
  assert.doesNotMatch(sql, /icfes_teacher_review_assignments/);
  assert.match(sql, /to service_role/);
});

test('binds ICFES reviews to the owned secure attempt that contains the real answers', async () => {
  const sql = await readFile(new URL('../supabase/migrations/20260909000500_xpress_memberships_wompi.sql', import.meta.url), 'utf8');
  const genericSave = await readFile(new URL('../src/lib/actions/saveExamResult.ts', import.meta.url), 'utf8');
  const secureGrading = await readFile(new URL('../src/lib/icfes/grading.server.ts', import.meta.url), 'utf8');
  const serverOps = await readFile(new URL('../src/lib/icfes/teacher-ops.server.ts', import.meta.url), 'utf8');

  assert.doesNotMatch(genericSave, /objective_answers\s*:/);
  assert.match(secureGrading, /from\('icfes_attempts'\)\.insert\([\s\S]+\.\.\.evidence/);
  assert.match(sql, /icfes_attempt_id uuid unique references public\.icfes_attempts\(id\)/);
  assert.match(sql, /check \(\(submission_id is null\)<>\(icfes_attempt_id is null\)\)/);
  assert.match(sql, /where id=p_attempt and user_id=p_user[\s\S]+answers<>'\{\}'::jsonb/);
  assert.match(sql, /attempt\.answers as objective_answers/);
  assert.match(sql, /attempt\.id=review\.icfes_attempt_id and attempt\.user_id=review\.user_id/);
  assert.match(serverOps, /p_attempt: input\.attemptId/);
});
