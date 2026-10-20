export const XPRESS_OFFER_VERSION = 'xpress-2026-10-20-v8' as const;

export type XpressLegacyOfferId = 'exam-single';
export type XpressMembershipOfferId = 'exam-basic' | 'exam-auto' | 'exam-teacher';
export type XpressOfferId = XpressLegacyOfferId | XpressMembershipOfferId;
export type AutodidactaPlanId = 'exam-free' | XpressMembershipOfferId;

export type XpressEntitlement =
  | 'detailed-report'
  | 'question-review'
  | 'focus-areas'
  | 'unlimited-mocks'
  | 'progress-history'
  | 'study-route'
  | 'automatic-feedback'
  | 'personalized-feedback'
  | 'material-downloads'
  | 'improvement-plan';

export type XpressOffer = Readonly<{
  id: XpressOfferId;
  name: string;
  amountInCents: number;
  billing: 'single-exam' | 'recurring-30-days';
  entitlementScope: 'exam';
  entitlements: readonly XpressEntitlement[];
  availableForPurchase: boolean;
}>;

const CORE_ENTITLEMENTS = [
  'detailed-report',
  'question-review',
  'focus-areas',
  'unlimited-mocks',
  'progress-history',
  'study-route',
  'automatic-feedback',
  'material-downloads',
] as const satisfies readonly XpressEntitlement[];

export const XPRESS_LEGACY_OFFERS = Object.freeze([
  {
    id: 'exam-single',
    name: 'Un examen autodidacta (histórico)',
    amountInCents: 1_290_000,
    billing: 'single-exam',
    entitlementScope: 'exam',
    entitlements: ['detailed-report', 'question-review', 'focus-areas', 'automatic-feedback'],
    availableForPurchase: false,
  },
] as const satisfies readonly XpressOffer[]);

// Publicly purchasable offers. Every plan applies to exactly one selected exam.
export const XPRESS_OFFERS = Object.freeze([
  {
    id: 'exam-basic',
    name: 'Autodidacta Esencial',
    amountInCents: 1_590_000,
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: CORE_ENTITLEMENTS,
    availableForPurchase: true,
  },
  {
    id: 'exam-auto',
    name: 'Autodidacta',
    amountInCents: 4_990_000,
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: [...CORE_ENTITLEMENTS, 'personalized-feedback'],
    availableForPurchase: true,
  },
  {
    id: 'exam-teacher',
    name: 'Autodidacta Pro',
    amountInCents: 9_990_000,
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: [...CORE_ENTITLEMENTS, 'personalized-feedback', 'improvement-plan'],
    availableForPurchase: true,
  },
] as const satisfies readonly XpressOffer[]);

export const XPRESS_MEMBERSHIP_OFFERS = XPRESS_OFFERS;
export const XPRESS_ALL_OFFERS = Object.freeze([...XPRESS_LEGACY_OFFERS, ...XPRESS_OFFERS]);

export const AUTODIDACTA_PLANS = Object.freeze([
  {
    id: 'exam-free',
    name: 'Gratis',
    amountInCents: 0,
    reviewQuota: 0,
    description: 'Practica un examen y consulta tu puntaje total. Sin detalle por pregunta ni descargas.',
  },
  {
    id: 'exam-basic',
    name: 'Autodidacta Esencial',
    amountInCents: 1_590_000,
    reviewQuota: 0,
    description: 'Un examen completo con resultados detallados, descargas y retroalimentación automática.',
  },
  {
    id: 'exam-auto',
    name: 'Autodidacta',
    amountInCents: 4_990_000,
    reviewQuota: 5,
    description: 'Todo Esencial más 5 revisiones humanas de Writing o Speaking por periodo.',
  },
  {
    id: 'exam-teacher',
    name: 'Autodidacta Pro',
    amountInCents: 9_990_000,
    reviewQuota: null,
    description: 'Revisiones humanas, retroalimentación integral y un plan de mejora personalizado.',
  },
] as const satisfies readonly Readonly<{
  id: AutodidactaPlanId;
  name: string;
  amountInCents: number;
  reviewQuota: number | null;
  description: string;
}>[]);

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
  reason: 'single-purchase' | 'new-purchase' | 'additional-exam' | 'membership-upgrade' | 'active-membership' | 'downgrade';
}>;

export function getXpressOffer(id: XpressOfferId): XpressOffer {
  const offer = XPRESS_ALL_OFFERS.find((item) => item.id === id);
  if (!offer) throw new Error('unknown_xpress_offer');
  return offer;
}

export function quoteXpressPurchase(context: XpressPurchaseContext): XpressPurchaseQuote {
  const offer = getXpressOffer(context.requestedOfferId);
  if (!offer.availableForPurchase || offer.billing !== 'recurring-30-days') {
    throw new Error('legacy_xpress_offer_not_sellable');
  }
  const examSlug = context.requestedExamSlug.trim().toLowerCase();
  if (!examSlug) throw new Error('xpress_exam_required');

  const active = context.activeMembership;
  if (!active) {
    return {
      action: 'checkout', amountInCents: offer.amountInCents, offer, creditInCents: 0, examSlug,
      reason: 'new-purchase',
    };
  }
  if (active.examSlug !== examSlug) {
    return {
      action: 'checkout', amountInCents: offer.amountInCents, offer, creditInCents: 0, examSlug,
      reason: 'additional-exam',
    };
  }
  if (active.offerId === offer.id) {
    return { action: 'already-included', amountInCents: 0, offer, creditInCents: offer.amountInCents, examSlug, reason: 'active-membership' };
  }

  const rank: Readonly<Record<XpressMembershipOfferId, number>> = {
    'exam-basic': 1,
    'exam-auto': 2,
    'exam-teacher': 3,
  };
  const requestedOffer = offer.id as XpressMembershipOfferId;
  if (rank[active.offerId] > rank[requestedOffer]) {
    return { action: 'schedule-change', amountInCents: 0, offer, creditInCents: 0, examSlug, reason: 'downgrade' };
  }

  const credit = getXpressOffer(active.offerId).amountInCents;
  return {
    action: 'checkout',
    amountInCents: offer.amountInCents - credit,
    offer,
    creditInCents: credit,
    examSlug,
    reason: 'membership-upgrade',
  };
}

export function xpressAccessEndsAt(paidAt: Date): Date {
  return new Date(paidAt.getTime() + 30 * 24 * 60 * 60 * 1000);
}

export function xpressOfferIncludes(offerId: XpressOfferId, entitlement: XpressEntitlement): boolean {
  return getXpressOffer(offerId).entitlements.includes(entitlement);
}
