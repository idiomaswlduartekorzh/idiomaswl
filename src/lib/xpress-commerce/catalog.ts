export const XPRESS_OFFER_VERSION = 'xpress-2026-09-08-v2' as const;

export type XpressOfferId = 'exam-auto' | 'exam-teacher';
export type XpressEntitlement =
  | 'detailed-report'
  | 'question-review'
  | 'focus-areas'
  | 'unlimited-mocks'
  | 'progress-history'
  | 'study-route'
  | 'automatic-feedback'
  | 'teacher-feedback-24h';

export type XpressOffer = Readonly<{
  id: XpressOfferId;
  name: string;
  amountInCents: number;
  billing: '30-day-membership';
  entitlementScope: 'exam';
  entitlements: readonly XpressEntitlement[];
  teacherFeedbackTargetHours: number | null;
  maxConcurrentTeacherReviews: number;
}>;

const CORE_ENTITLEMENTS = [
  'detailed-report',
  'question-review',
  'focus-areas',
  'unlimited-mocks',
  'progress-history',
  'study-route',
  'automatic-feedback',
] as const satisfies readonly XpressEntitlement[];

export const XPRESS_OFFERS = Object.freeze([
  {
    id: 'exam-auto',
    name: 'Exámenes + corrección automática',
    amountInCents: 4_900_000,
    billing: '30-day-membership',
    entitlementScope: 'exam',
    entitlements: CORE_ENTITLEMENTS,
    teacherFeedbackTargetHours: null,
    maxConcurrentTeacherReviews: 0,
  },
  {
    id: 'exam-teacher',
    name: 'Exámenes + feedback docente',
    amountInCents: 9_900_000,
    billing: '30-day-membership',
    entitlementScope: 'exam',
    entitlements: [...CORE_ENTITLEMENTS, 'teacher-feedback-24h'],
    teacherFeedbackTargetHours: 24,
    maxConcurrentTeacherReviews: 1,
  },
] as const satisfies readonly XpressOffer[]);

export type XpressPurchaseContext = Readonly<{
  requestedOfferId: XpressOfferId;
  requestedExamSlug: string;
  activeMembership?: Readonly<{
    offerId: XpressOfferId;
    examSlug: string;
  }>;
}>;

export type XpressPurchaseQuote = Readonly<{
  action: 'checkout' | 'already-included' | 'schedule-change';
  amountInCents: number;
  offer: XpressOffer;
  creditInCents: number;
  examSlug: string;
  reason: 'new-purchase' | 'membership-upgrade' | 'active-membership' | 'different-exam' | 'downgrade';
}>;

export function getXpressOffer(id: XpressOfferId): XpressOffer {
  const offer = XPRESS_OFFERS.find((item) => item.id === id);
  if (!offer) throw new Error('unknown_xpress_offer');
  return offer;
}

export function quoteXpressPurchase(context: XpressPurchaseContext): XpressPurchaseQuote {
  const offer = getXpressOffer(context.requestedOfferId);
  const examSlug = context.requestedExamSlug.trim().toLowerCase();
  if (!examSlug) throw new Error('xpress_exam_required');

  const active = context.activeMembership;
  if (!active) {
    return { action: 'checkout', amountInCents: offer.amountInCents, offer, creditInCents: 0, examSlug, reason: 'new-purchase' };
  }
  if (active.examSlug !== examSlug) {
    return { action: 'schedule-change', amountInCents: 0, offer, creditInCents: 0, examSlug, reason: 'different-exam' };
  }
  if (active.offerId === offer.id) {
    return { action: 'already-included', amountInCents: 0, offer, creditInCents: offer.amountInCents, examSlug, reason: 'active-membership' };
  }
  if (active.offerId === 'exam-teacher' && offer.id === 'exam-auto') {
    return { action: 'schedule-change', amountInCents: 0, offer, creditInCents: 0, examSlug, reason: 'downgrade' };
  }

  const credit = getXpressOffer('exam-auto').amountInCents;
  return { action: 'checkout', amountInCents: offer.amountInCents - credit, offer, creditInCents: credit, examSlug, reason: 'membership-upgrade' };
}

export function xpressAccessEndsAt(paidAt: Date): Date {
  return new Date(paidAt.getTime() + 30 * 24 * 60 * 60 * 1000);
}

export function xpressOfferIncludes(offerId: XpressOfferId, entitlement: XpressEntitlement): boolean {
  return getXpressOffer(offerId).entitlements.includes(entitlement);
}
