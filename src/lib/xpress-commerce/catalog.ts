import {
  ICFES_COMMERCIAL_OFFERS,
  ICFES_COMMERCIAL_VERSION,
  ICFES_EXAM_SLUG,
} from '../icfes/commercial-contract.ts';

export const XPRESS_OFFER_VERSION = 'xpress-2026-09-12-v5' as const;

export type XpressOfferId = 'exam-single' | 'exam-auto' | 'exam-teacher';
export type XpressMembershipOfferId = Exclude<XpressOfferId, 'exam-single'>;
export type XpressEntitlement =
  | 'detailed-report'
  | 'question-review'
  | 'focus-areas'
  | 'unlimited-mocks'
  | 'progress-history'
  | 'study-route'
  | 'automatic-feedback'
  | 'personalized-feedback';

export type XpressOffer = Readonly<{
  id: XpressOfferId;
  name: string;
  amountInCents: number;
  billing: 'single-exam' | 'recurring-30-days';
  entitlementScope: 'exam';
  entitlements: readonly XpressEntitlement[];
}>;

const CORE_ENTITLEMENTS = [
  'detailed-report',
  'question-review',
  'focus-areas',
] as const satisfies readonly XpressEntitlement[];

const MEMBERSHIP_ENTITLEMENTS = [
  ...CORE_ENTITLEMENTS,
  'unlimited-mocks',
  'progress-history',
  'study-route',
  'automatic-feedback',
] as const satisfies readonly XpressEntitlement[];

export const XPRESS_OFFERS = Object.freeze([
  {
    id: 'exam-single',
    name: 'Un examen autodidacta',
    amountInCents: 1_290_000,
    billing: 'single-exam',
    entitlementScope: 'exam',
    entitlements: [...CORE_ENTITLEMENTS, 'automatic-feedback'],
  },
  {
    id: 'exam-auto',
    name: 'Exámenes + corrección automática',
    amountInCents: 4_990_000,
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: MEMBERSHIP_ENTITLEMENTS,
  },
  {
    id: 'exam-teacher',
    name: 'Exámenes + feedback personalizado',
    amountInCents: 9_990_000,
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: [...MEMBERSHIP_ENTITLEMENTS, 'personalized-feedback'],
  },
] as const satisfies readonly XpressOffer[]);

export type XpressPurchaseContext = Readonly<{
  requestedOfferId: XpressOfferId;
  requestedExamSlug: string;
  activeMembership?: Readonly<{
    offerId: XpressMembershipOfferId;
    examSlug: string;
  }>;
}>;

export type XpressPurchaseQuote = Readonly<{
  action: 'checkout' | 'already-included' | 'schedule-change';
  amountInCents: number;
  offer: XpressOffer;
  creditInCents: number;
  examSlug: string;
  reason: 'single-purchase' | 'new-purchase' | 'membership-upgrade' | 'active-membership' | 'different-exam' | 'downgrade';
}>;

export function getXpressOffer(id: XpressOfferId): XpressOffer {
  const offer = XPRESS_OFFERS.find((item) => item.id === id);
  if (!offer) throw new Error('unknown_xpress_offer');
  return offer;
}

const ICFES_XPRESS_OFFERS = Object.freeze(ICFES_COMMERCIAL_OFFERS.map((offer) => ({
  id: offer.id,
  name: offer.name,
  amountInCents: offer.amountInCents,
  billing: offer.billing,
  entitlementScope: 'exam' as const,
  entitlements: offer.entitlements,
} satisfies XpressOffer)));

export function getXpressOffersForExam(examSlug: string): readonly XpressOffer[] {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_XPRESS_OFFERS : XPRESS_OFFERS;
}

export function getXpressOfferForExam(id: XpressOfferId, examSlug: string): XpressOffer {
  const offer = getXpressOffersForExam(examSlug).find((candidate) => candidate.id === id);
  if (!offer) throw new Error('unknown_xpress_offer');
  return offer;
}

export function getXpressOfferVersion(examSlug: string): string {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG
    ? ICFES_COMMERCIAL_VERSION
    : XPRESS_OFFER_VERSION;
}

export function quoteXpressPurchase(context: XpressPurchaseContext): XpressPurchaseQuote {
  const examSlug = context.requestedExamSlug.trim().toLowerCase();
  if (!examSlug) throw new Error('xpress_exam_required');
  const offer = getXpressOfferForExam(context.requestedOfferId, examSlug);

  const active = context.activeMembership;
  if (!active) {
    return {
      action: 'checkout', amountInCents: offer.amountInCents, offer, creditInCents: 0, examSlug,
      reason: offer.billing === 'single-exam' ? 'single-purchase' : 'new-purchase',
    };
  }
  if (active.examSlug !== examSlug) {
    return { action: 'schedule-change', amountInCents: 0, offer, creditInCents: 0, examSlug, reason: 'different-exam' };
  }
  if (active.offerId === offer.id) {
    return { action: 'already-included', amountInCents: 0, offer, creditInCents: offer.amountInCents, examSlug, reason: 'active-membership' };
  }
  if (offer.id === 'exam-single') {
    return { action: 'already-included', amountInCents: 0, offer, creditInCents: offer.amountInCents, examSlug, reason: 'active-membership' };
  }
  if (active.offerId === 'exam-teacher' && offer.id === 'exam-auto') {
    return { action: 'schedule-change', amountInCents: 0, offer, creditInCents: 0, examSlug, reason: 'downgrade' };
  }

  const credit = getXpressOfferForExam('exam-auto', examSlug).amountInCents;
  return { action: 'checkout', amountInCents: offer.amountInCents - credit, offer, creditInCents: credit, examSlug, reason: 'membership-upgrade' };
}

export function xpressAccessEndsAt(paidAt: Date): Date {
  return new Date(paidAt.getTime() + 30 * 24 * 60 * 60 * 1000);
}

export function xpressOfferIncludes(
  offerId: XpressOfferId,
  entitlement: XpressEntitlement,
  examSlug?: string,
): boolean {
  return (examSlug ? getXpressOfferForExam(offerId, examSlug) : getXpressOffer(offerId))
    .entitlements.includes(entitlement);
}
