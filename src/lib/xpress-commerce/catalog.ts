export const XPRESS_OFFER_VERSION = 'xpress-2026-09-08-v1' as const;
export const XPRESS_REPORT_UPGRADE_WINDOW_DAYS = 7;

export type XpressOfferId = 'single-report' | 'xpress-monthly' | 'xpress-guided';
export type XpressEntitlement =
  | 'basic-result'
  | 'detailed-report'
  | 'question-review'
  | 'focus-areas'
  | 'unlimited-exams'
  | 'progress-history'
  | 'study-route'
  | 'tutor-session-50';

export type XpressOffer = Readonly<{
  id: XpressOfferId;
  name: string;
  amountInCents: number;
  billing: 'one-time' | '30-day-membership';
  entitlementScope: 'submission' | 'account';
  entitlements: readonly XpressEntitlement[];
  tutorMinutesPerPeriod: number;
}>;

export const XPRESS_FREE_ENTITLEMENTS = ['basic-result'] as const satisfies readonly XpressEntitlement[];

export const XPRESS_OFFERS = Object.freeze([
  {
    id: 'single-report',
    name: 'Reporte completo',
    amountInCents: 1_290_000,
    billing: 'one-time',
    entitlementScope: 'submission',
    entitlements: ['detailed-report', 'question-review', 'focus-areas'],
    tutorMinutesPerPeriod: 0,
  },
  {
    id: 'xpress-monthly',
    name: 'Xpress mensual',
    amountInCents: 4_990_000,
    billing: '30-day-membership',
    entitlementScope: 'account',
    entitlements: [
      'detailed-report',
      'question-review',
      'focus-areas',
      'unlimited-exams',
      'progress-history',
      'study-route',
    ],
    tutorMinutesPerPeriod: 0,
  },
  {
    id: 'xpress-guided',
    name: 'Xpress guiado',
    amountInCents: 14_990_000,
    billing: '30-day-membership',
    entitlementScope: 'account',
    entitlements: [
      'detailed-report',
      'question-review',
      'focus-areas',
      'unlimited-exams',
      'progress-history',
      'study-route',
      'tutor-session-50',
    ],
    tutorMinutesPerPeriod: 50,
  },
] as const satisfies readonly XpressOffer[]);

export type XpressPurchaseContext = Readonly<{
  requestedOfferId: XpressOfferId;
  ownsDetailedReportForSubmission: boolean;
  activeMembershipOfferId?: Extract<XpressOfferId, 'xpress-monthly' | 'xpress-guided'>;
  recentReportPaidAt?: Date;
  now?: Date;
}>;

export type XpressPurchaseQuote = Readonly<{
  action: 'checkout' | 'already-included' | 'schedule-downgrade';
  amountInCents: number;
  offer: XpressOffer;
  creditInCents: number;
  reason: 'new-purchase' | 'report-credit' | 'membership-upgrade' | 'owned' | 'active-membership' | 'downgrade';
}>;

export function getXpressOffer(id:XpressOfferId):XpressOffer {
  const offer=XPRESS_OFFERS.find(item=>item.id===id);
  if(!offer)throw new Error('unknown_xpress_offer');
  return offer;
}

function reportCreditIsValid(paidAt:Date|undefined,now:Date):boolean {
  if(!paidAt)return false;
  const age=now.getTime()-paidAt.getTime();
  return age>=0&&age<=XPRESS_REPORT_UPGRADE_WINDOW_DAYS*24*60*60*1000;
}

export function quoteXpressPurchase(context:XpressPurchaseContext):XpressPurchaseQuote {
  const offer=getXpressOffer(context.requestedOfferId);
  const now=context.now??new Date();
  const active=context.activeMembershipOfferId;

  if(offer.id==='single-report'){
    if(context.ownsDetailedReportForSubmission||active){
      return {action:'already-included',amountInCents:0,offer,creditInCents:offer.amountInCents,reason:active?'active-membership':'owned'};
    }
    return {action:'checkout',amountInCents:offer.amountInCents,offer,creditInCents:0,reason:'new-purchase'};
  }

  if(active===offer.id){
    return {action:'already-included',amountInCents:0,offer,creditInCents:offer.amountInCents,reason:'active-membership'};
  }
  if(active==='xpress-guided'&&offer.id==='xpress-monthly'){
    return {action:'schedule-downgrade',amountInCents:0,offer,creditInCents:0,reason:'downgrade'};
  }
  if(active==='xpress-monthly'&&offer.id==='xpress-guided'){
    const credit=getXpressOffer('xpress-monthly').amountInCents;
    return {action:'checkout',amountInCents:offer.amountInCents-credit,offer,creditInCents:credit,reason:'membership-upgrade'};
  }

  const reportCredit=reportCreditIsValid(context.recentReportPaidAt,now)
    ?getXpressOffer('single-report').amountInCents:0;
  return {
    action:'checkout',amountInCents:offer.amountInCents-reportCredit,offer,
    creditInCents:reportCredit,reason:reportCredit?'report-credit':'new-purchase',
  };
}

export function xpressAccessEndsAt(paidAt:Date):Date {
  return new Date(paidAt.getTime()+30*24*60*60*1000);
}

export function xpressOfferIncludes(offerId:XpressOfferId,entitlement:XpressEntitlement):boolean {
  return getXpressOffer(offerId).entitlements.includes(entitlement);
}
