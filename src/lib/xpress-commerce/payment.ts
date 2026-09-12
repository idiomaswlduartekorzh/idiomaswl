import { XPRESS_EXAM_OPTIONS, type XpressExamSlug } from '../student-onboarding/catalog.ts';
import { ICFES_TEACHER_ADDENDUM_VERSION } from '../icfes/teacher-ops-v1.ts';
import { getXpressOffer, type XpressOfferId } from './catalog.ts';
import { XPRESS_PRIVACY_VERSION, XPRESS_TERMS_VERSION } from './terms.ts';

export type XpressOrderInput = Readonly<{
  idempotencyKey: string;
  examSlug: XpressExamSlug;
  offerId: XpressOfferId;
  acceptedTerms: string;
  acceptedPrivacy: string;
  acceptedIcfesTeacherAddendum?: string;
  icfesAttemptId?: string;
}>;

export function parseXpressOrderInput(value: unknown): XpressOrderInput | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (typeof input.idempotencyKey !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.idempotencyKey)) return null;
  if (!XPRESS_EXAM_OPTIONS.some((item) => item.id === input.examSlug)) return null;
  if (input.offerId !== 'exam-single' && input.offerId !== 'exam-auto' && input.offerId !== 'exam-teacher') return null;
  // ICFES has its own attempt-bound COP 12.000 product. The generic single-exam
  // credit is intentionally unavailable here because it cannot unlock an ICFES attempt.
  if (input.examSlug === 'icfes' && input.offerId === 'exam-single') return null;
  if (input.acceptedTerms !== XPRESS_TERMS_VERSION || input.acceptedPrivacy !== XPRESS_PRIVACY_VERSION) return null;
  const isIcfesTeacher = input.examSlug === 'icfes' && input.offerId === 'exam-teacher';
  const icfesAttemptId = input.examSlug === 'icfes' && typeof input.icfesAttemptId === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.icfesAttemptId)
    ? input.icfesAttemptId.toLowerCase()
    : undefined;
  if (input.icfesAttemptId !== undefined && !icfesAttemptId) return null;
  if (isIcfesTeacher && input.acceptedIcfesTeacherAddendum !== ICFES_TEACHER_ADDENDUM_VERSION) return null;
  getXpressOffer(input.offerId);
  return {
    idempotencyKey: input.idempotencyKey,
    examSlug: input.examSlug as XpressExamSlug,
    offerId: input.offerId,
    acceptedTerms: input.acceptedTerms,
    acceptedPrivacy: input.acceptedPrivacy,
    ...(isIcfesTeacher ? { acceptedIcfesTeacherAddendum: ICFES_TEACHER_ADDENDUM_VERSION } : {}),
    ...(icfesAttemptId ? { icfesAttemptId } : {}),
  } as XpressOrderInput;
}

export type XpressProviderPayment = Readonly<{
  id: string;
  reference: string;
  amount_in_cents: number;
  currency: 'COP';
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED';
}>;

export function parseXpressProviderPayment(value: unknown): XpressProviderPayment | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const payment = value as Record<string, unknown>;
  if (typeof payment.id !== 'string' || !/^[A-Za-z0-9_-]{6,120}$/.test(payment.id)) return null;
  if (typeof payment.reference !== 'string' || !/^WX-[0-9a-f-]{36}$/.test(payment.reference)) return null;
  if (payment.currency !== 'COP' || !Number.isSafeInteger(payment.amount_in_cents) || Number(payment.amount_in_cents) <= 0) return null;
  if (!['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'].includes(String(payment.status))) return null;
  return payment as unknown as XpressProviderPayment;
}
