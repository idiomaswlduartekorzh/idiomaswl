import { XPRESS_TERMS_VERSION } from '../xpress-commerce/terms.ts';
import { ICFES_TEACHER_RUBRIC_VERSION } from './teacher-rubric-v1.ts';

export const ICFES_TEACHER_OPS_VERSION = 'icfes-teacher-ops-2026-09-12-v2' as const;
export const ICFES_TEACHER_ADDENDUM_VERSION = 'icfes-teacher-addendum-2026-09-12-v2' as const;
export const ICFES_TEACHER_REVIEW_CREDITS = 1 as const;
export const ICFES_TEACHER_REVIEW_TARGET_HOURS = 12 as const;
export const ICFES_TEACHER_ALERT_HOURS = Object.freeze([6, 9, 11] as const);
export const ICFES_TEACHER_RESERVATION_MINUTES = 20 as const;
export const ICFES_TEACHER_LEASE_MINUTES = 15 as const;

export const ICFES_TEACHER_ADDENDUM = Object.freeze({
  version: ICFES_TEACHER_ADDENDUM_VERSION,
  appliesTo: Object.freeze({ sku: 'exam-teacher', examSlug: 'icfes' }),
  baseTermsVersion: XPRESS_TERMS_VERSION,
  supersedesSection: 'Correcciones',
  reviewCreditsPer30Days: ICFES_TEACHER_REVIEW_CREDITS,
  serviceTargetHours: ICFES_TEACHER_REVIEW_TARGET_HOURS,
  text:
    'Para ICFES, el plan incluye un solo crédito de revisión docente durante los 30 días. El objetivo operativo es entregar la revisión dentro de 12 horas desde una solicitud completa. El checkout docente no debe ofrecerse si no existe una reserva de capacidad vigente.',
} as const);

export type IcfesTeacherCapacitySnapshot = Readonly<{
  calibratedReviewers: number;
  dailyCapacitySlots: number;
  heldReservations: number;
  outstandingCredits: number;
  oldestQueuedHours: number | null;
  rollingP95Hours: number | null;
  hasOpenSlaBreach: boolean;
}>;

export type IcfesTeacherCapacityStopReason =
  | 'no-calibrated-reviewer'
  | 'capacity-not-finite'
  | 'capacity-utilization-red'
  | 'oldest-queue-red'
  | 'rolling-p95-red'
  | 'open-sla-breach';

export type IcfesTeacherCapacityDecision = Readonly<{
  canReserve: boolean;
  projectedUtilizationPercent: number | null;
  stopReasons: readonly IcfesTeacherCapacityStopReason[];
  serviceRepresentation: 'target-12h' | 'unavailable';
}>;

export function evaluateIcfesTeacherCapacity(
  snapshot: IcfesTeacherCapacitySnapshot,
): IcfesTeacherCapacityDecision {
  const stopReasons: IcfesTeacherCapacityStopReason[] = [];
  if (!Number.isSafeInteger(snapshot.calibratedReviewers) || snapshot.calibratedReviewers < 1) {
    stopReasons.push('no-calibrated-reviewer');
  }
  if (!Number.isSafeInteger(snapshot.dailyCapacitySlots) || snapshot.dailyCapacitySlots < 1) {
    stopReasons.push('capacity-not-finite');
  }

  const projectedSlots = snapshot.heldReservations + snapshot.outstandingCredits + 1;
  const projectedUtilizationPercent = snapshot.dailyCapacitySlots > 0
    ? (projectedSlots / snapshot.dailyCapacitySlots) * 100
    : null;
  if (projectedUtilizationPercent === null || projectedUtilizationPercent > 80) {
    stopReasons.push('capacity-utilization-red');
  }
  if (snapshot.oldestQueuedHours !== null && snapshot.oldestQueuedHours >= 9) {
    stopReasons.push('oldest-queue-red');
  }
  if (snapshot.rollingP95Hours !== null && snapshot.rollingP95Hours > 10) {
    stopReasons.push('rolling-p95-red');
  }
  if (snapshot.hasOpenSlaBreach) stopReasons.push('open-sla-breach');

  const canReserve = stopReasons.length === 0;
  return Object.freeze({
    canReserve,
    projectedUtilizationPercent,
    stopReasons: Object.freeze(stopReasons),
    serviceRepresentation: canReserve ? 'target-12h' : 'unavailable',
  });
}

export type IcfesTeacherReservation = Readonly<{
  idempotencyKey: string;
  userId: string;
  status: 'held' | 'order-linked' | 'consumed' | 'released' | 'expired';
  heldAt: string;
  expiresAt: string;
  rubricVersion: typeof ICFES_TEACHER_RUBRIC_VERSION;
  addendumVersion: typeof ICFES_TEACHER_ADDENDUM_VERSION;
}>;

export type IcfesTeacherReservationResult = Readonly<{
  action: 'held' | 'replayed' | 'blocked';
  reservation: IcfesTeacherReservation | null;
  capacity: IcfesTeacherCapacityDecision;
}>;

export function reserveIcfesTeacherCapacity(input: Readonly<{
  userId: string;
  idempotencyKey: string;
  now: Date;
  capacity: IcfesTeacherCapacitySnapshot;
  existingReservation?: IcfesTeacherReservation;
}>): IcfesTeacherReservationResult {
  const capacity = evaluateIcfesTeacherCapacity(input.capacity);
  const existing = input.existingReservation;
  if (existing) {
    if (existing.userId !== input.userId || existing.idempotencyKey !== input.idempotencyKey) {
      throw new Error('icfes_teacher_reservation_idempotency_conflict');
    }
    if (
      new Date(existing.expiresAt).getTime() <= input.now.getTime()
      || existing.status === 'expired'
      || existing.status === 'released'
    ) {
      return { action: 'blocked', reservation: existing, capacity };
    }
    return { action: 'replayed', reservation: existing, capacity };
  }
  if (!capacity.canReserve) return { action: 'blocked', reservation: null, capacity };

  const heldAt = input.now.toISOString();
  return {
    action: 'held',
    reservation: Object.freeze({
      idempotencyKey: input.idempotencyKey,
      userId: input.userId,
      status: 'held',
      heldAt,
      expiresAt: new Date(input.now.getTime() + ICFES_TEACHER_RESERVATION_MINUTES * 60_000).toISOString(),
      rubricVersion: ICFES_TEACHER_RUBRIC_VERSION,
      addendumVersion: ICFES_TEACHER_ADDENDUM_VERSION,
    }),
    capacity,
  };
}

export type IcfesTeacherReview = Readonly<{
  reviewId: string;
  membershipId: string;
  attemptId: string;
  idempotencyKey: string;
  status: 'queued' | 'in-review' | 'needs-qa' | 'completed' | 'cancelled' | 'failed';
  requestedAt: string;
  dueAt: string;
  leaseId: string | null;
  leaseExpiresAt: string | null;
  attempts: number;
  completedAt: string | null;
  rubricVersion: typeof ICFES_TEACHER_RUBRIC_VERSION;
}>;

export function requestIcfesTeacherReview(input: Readonly<{
  reviewId: string;
  membershipId: string;
  attemptId: string;
  idempotencyKey: string;
  now: Date;
  existingByIdempotency?: IcfesTeacherReview;
  existingForMembership?: IcfesTeacherReview;
}>): Readonly<{ action: 'queued' | 'replayed'; review: IcfesTeacherReview }> {
  const replay = input.existingByIdempotency;
  if (replay) {
    if (replay.membershipId !== input.membershipId || replay.attemptId !== input.attemptId) {
      throw new Error('icfes_teacher_review_idempotency_conflict');
    }
    return { action: 'replayed', review: replay };
  }
  if (input.existingForMembership) throw new Error('icfes_teacher_review_credit_exhausted');

  const requestedAt = input.now.toISOString();
  return {
    action: 'queued',
    review: Object.freeze({
      reviewId: input.reviewId,
      membershipId: input.membershipId,
      attemptId: input.attemptId,
      idempotencyKey: input.idempotencyKey,
      status: 'queued',
      requestedAt,
      dueAt: new Date(input.now.getTime() + ICFES_TEACHER_REVIEW_TARGET_HOURS * 3_600_000).toISOString(),
      leaseId: null,
      leaseExpiresAt: null,
      attempts: 0,
      completedAt: null,
      rubricVersion: ICFES_TEACHER_RUBRIC_VERSION,
    }),
  };
}

export function claimIcfesTeacherReview(
  review: IcfesTeacherReview,
  leaseId: string,
  now: Date,
): Readonly<{ claimed: boolean; review: IcfesTeacherReview }> {
  const leaseExpired = review.leaseExpiresAt !== null && new Date(review.leaseExpiresAt).getTime() <= now.getTime();
  if (!['queued', 'failed'].includes(review.status) && !(review.status === 'in-review' && leaseExpired)) {
    return { claimed: false, review };
  }
  return {
    claimed: true,
    review: Object.freeze({
      ...review,
      status: 'in-review',
      leaseId,
      leaseExpiresAt: new Date(now.getTime() + ICFES_TEACHER_LEASE_MINUTES * 60_000).toISOString(),
      attempts: review.attempts + 1,
    }),
  };
}

export function finishIcfesTeacherReview(
  review: IcfesTeacherReview,
  leaseId: string,
  outcome: 'completed' | 'needs-qa' | 'failed',
  now: Date,
): IcfesTeacherReview {
  if (
    review.status !== 'in-review' ||
    review.leaseId !== leaseId ||
    review.leaseExpiresAt === null ||
    new Date(review.leaseExpiresAt).getTime() <= now.getTime()
  ) {
    throw new Error('icfes_teacher_review_lease_mismatch');
  }
  return Object.freeze({
    ...review,
    status: outcome,
    leaseId: null,
    leaseExpiresAt: null,
    completedAt: outcome === 'completed' ? now.toISOString() : null,
  });
}

export function dueIcfesTeacherAlerts(requestedAt: Date, now: Date): readonly (6 | 9 | 11)[] {
  const ageHours = (now.getTime() - requestedAt.getTime()) / 3_600_000;
  if (!Number.isFinite(ageHours) || ageHours < 0) return Object.freeze([]);
  return Object.freeze(ICFES_TEACHER_ALERT_HOURS.filter((threshold) => ageHours >= threshold));
}
