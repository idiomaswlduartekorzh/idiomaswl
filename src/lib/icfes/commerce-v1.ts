import {
  XPRESS_OFFER_VERSION,
  getXpressOffer,
  quoteXpressPurchase,
  type XpressEntitlement,
  type XpressOffer,
  type XpressOfferId,
  type XpressPurchaseQuote,
} from '../xpress-commerce/catalog.ts';

export const ICFES_COMMERCE_VERSION = 'icfes-commerce-2026-09-09-v1' as const;
export const ICFES_DETAIL_OFFER_ID = 'icfes-detail-attempt-v1' as const;
export const ICFES_DETAIL_CREDIT_WINDOW_DAYS = 7 as const;
export const ICFES_DETAIL_PRICE_COP = 12_000 as const;
export const ICFES_DETAIL_AMOUNT_IN_CENTS = ICFES_DETAIL_PRICE_COP * 100;

export type IcfesCommerceOfferId = typeof ICFES_DETAIL_OFFER_ID | XpressOfferId;
export type IcfesCommerceEntitlement = XpressEntitlement | 'attempt-detailed-answers';

export type IcfesCommerceOffer = Readonly<{
  id: IcfesCommerceOfferId;
  name: string;
  amountInCents: number;
  currency: 'COP';
  billing: 'one-time' | '30-day-membership';
  entitlementScope: 'attempt' | 'exam';
  entitlements: readonly IcfesCommerceEntitlement[];
  teacherReviewCreditsPerPeriod: number;
  teacherFeedbackTargetHours: number | null;
  sourceVersion: typeof ICFES_COMMERCE_VERSION | typeof XPRESS_OFFER_VERSION;
}>;

const DETAIL_OFFER = Object.freeze({
  id: ICFES_DETAIL_OFFER_ID,
  name: 'Detalle y respuestas de un intento ICFES',
  amountInCents: ICFES_DETAIL_AMOUNT_IN_CENTS,
  currency: 'COP',
  billing: 'one-time',
  entitlementScope: 'attempt',
  entitlements: ['attempt-detailed-answers', 'detailed-report', 'question-review'],
  teacherReviewCreditsPerPeriod: 0,
  teacherFeedbackTargetHours: null,
  sourceVersion: ICFES_COMMERCE_VERSION,
} as const satisfies IcfesCommerceOffer);

function assertMonthlyCatalogContract(offer: XpressOffer): void {
  const requiredAmount = offer.id === 'exam-auto' ? 4_900_000 : 9_900_000;
  if (offer.amountInCents !== requiredAmount || offer.billing !== '30-day-membership') {
    throw new Error(`icfes_monthly_catalog_mismatch:${offer.id}`);
  }

  if (
    offer.id === 'exam-teacher' &&
    (offer.teacherFeedbackTargetHours !== 24 ||
      offer.maxConcurrentTeacherReviews !== 1 ||
      !offer.entitlements.includes('teacher-feedback-24h'))
  ) {
    throw new Error('icfes_teacher_catalog_mismatch');
  }
}

function fromMonthlyCatalog(id: XpressOfferId): IcfesCommerceOffer {
  const source = getXpressOffer(id);
  assertMonthlyCatalogContract(source);

  return Object.freeze({
    id: source.id,
    name: source.name,
    amountInCents: source.amountInCents,
    currency: 'COP',
    billing: source.billing,
    entitlementScope: source.entitlementScope,
    entitlements: source.entitlements,
    teacherReviewCreditsPerPeriod: source.id === 'exam-teacher' ? 1 : 0,
    teacherFeedbackTargetHours: source.teacherFeedbackTargetHours,
    sourceVersion: XPRESS_OFFER_VERSION,
  });
}

export const ICFES_COMMERCE_OFFERS = Object.freeze([
  DETAIL_OFFER,
  fromMonthlyCatalog('exam-auto'),
  fromMonthlyCatalog('exam-teacher'),
] as const satisfies readonly IcfesCommerceOffer[]);

export function getIcfesCommerceOffer(id: IcfesCommerceOfferId): IcfesCommerceOffer {
  const offer = ICFES_COMMERCE_OFFERS.find((candidate) => candidate.id === id);
  if (!offer) throw new Error('unknown_icfes_commerce_offer');
  return offer;
}

export type IcfesCommercePurchaseContext = Readonly<{
  requestedOfferId: IcfesCommerceOfferId;
  purchasedDetailAt?: Date;
  activeMembership?: Readonly<{
    offerId: XpressOfferId;
    periodEndsAt: Date;
  }>;
  now?: Date;
}>;

export type IcfesCommercePurchaseQuote = Readonly<{
  action: 'checkout' | 'already-included' | 'schedule-change';
  amountInCents: number;
  creditInCents: number;
  offer: IcfesCommerceOffer;
  periodEndsAt: string | null;
  reason:
    | 'new-purchase'
    | 'detail-upgrade'
    | 'membership-upgrade'
    | 'active-membership'
    | 'owned-detail'
    | 'downgrade';
}>;

function detailCreditIsEligible(purchasedAt: Date, now: Date): boolean {
  const ageInMilliseconds = now.getTime() - purchasedAt.getTime();
  const windowInMilliseconds = ICFES_DETAIL_CREDIT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return Number.isFinite(ageInMilliseconds) && ageInMilliseconds >= 0 && ageInMilliseconds <= windowInMilliseconds;
}

function icfesMonthlyReason(
  reason: XpressPurchaseQuote['reason'],
): Extract<IcfesCommercePurchaseQuote['reason'], 'new-purchase' | 'membership-upgrade' | 'active-membership' | 'downgrade'> {
  if (reason === 'different-exam') throw new Error('icfes_monthly_quote_scope_mismatch');
  return reason;
}

export function quoteIcfesCommercePurchase(
  context: IcfesCommercePurchaseContext,
): IcfesCommercePurchaseQuote {
  const offer = getIcfesCommerceOffer(context.requestedOfferId);
  const active = context.activeMembership;

  if (active) {
    const periodEndsAt = active.periodEndsAt.toISOString();
    if (offer.id === ICFES_DETAIL_OFFER_ID) {
      return {
        action: 'already-included',
        amountInCents: 0,
        creditInCents: DETAIL_OFFER.amountInCents,
        offer,
        periodEndsAt,
        reason: 'active-membership',
      };
    }

    const monthlyQuote = quoteXpressPurchase({
      requestedOfferId: offer.id,
      requestedExamSlug: 'icfes',
      activeMembership: { offerId: active.offerId, examSlug: 'icfes' },
    });
    return {
      action: monthlyQuote.action,
      amountInCents: monthlyQuote.amountInCents,
      creditInCents: monthlyQuote.creditInCents,
      offer,
      periodEndsAt,
      reason: icfesMonthlyReason(monthlyQuote.reason),
    };
  }

  if (offer.id === ICFES_DETAIL_OFFER_ID) {
    if (context.purchasedDetailAt) {
      return {
        action: 'already-included',
        amountInCents: 0,
        creditInCents: DETAIL_OFFER.amountInCents,
        offer,
        periodEndsAt: null,
        reason: 'owned-detail',
      };
    }
    return {
      action: 'checkout',
      amountInCents: offer.amountInCents,
      creditInCents: 0,
      offer,
      periodEndsAt: null,
      reason: 'new-purchase',
    };
  }

  const now = context.now ?? new Date();
  const detailCredit =
    context.purchasedDetailAt && detailCreditIsEligible(context.purchasedDetailAt, now)
      ? DETAIL_OFFER.amountInCents
      : 0;
  return {
    action: 'checkout',
    amountInCents: offer.amountInCents - detailCredit,
    creditInCents: detailCredit,
    offer,
    periodEndsAt: null,
    reason: detailCredit > 0 ? 'detail-upgrade' : 'new-purchase',
  };
}
