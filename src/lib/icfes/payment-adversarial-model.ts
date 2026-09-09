import {
  ICFES_DETAIL_OFFER_ID,
  quoteIcfesCommercePurchase,
  type IcfesCommerceOfferId,
} from './commerce-v1.ts';

export const ICFES_ADVERSARIAL_PAYMENTS_FLAG = 'ICFES_ADVERSARIAL_PAYMENTS_ENABLED' as const;
export const ICFES_ADVERSARIAL_PAYMENT_MODEL_VERSION = 'icfes-payments-adversarial-local-v1' as const;

type RuntimeEnvironment = Readonly<{
  ICFES_ADVERSARIAL_PAYMENTS_ENABLED?: string;
  NODE_ENV?: string;
  VERCEL_ENV?: string;
}>;

export type IcfesLocalPaymentStatus = 'CREATED' | 'PENDING' | 'DECLINED' | 'APPROVED' | 'REVOKED';
export type IcfesLocalReversalReason = 'VOIDED' | 'REFUND' | 'CHARGEBACK' | 'SOURCE_REVERSAL';

export type IcfesLocalPaymentOrder = Readonly<{
  id: string;
  reference: string;
  ownerId: string;
  examSlug: 'icfes';
  offerId: IcfesCommerceOfferId;
  amountInCents: number;
  creditInCents: number;
  currency: 'COP';
  environment: 'sandbox';
  status: IcfesLocalPaymentStatus;
  createdAt: string;
  approvedAt: string | null;
  periodEndsAt: string | null;
  providerTransactionId: string | null;
  upgradeSourceOrderId: string | null;
  creditConsumedByOrderId: string | null;
  reversalReason: IcfesLocalReversalReason | null;
}>;

export type IcfesLocalPaymentLedger = Readonly<{
  modelVersion: typeof ICFES_ADVERSARIAL_PAYMENT_MODEL_VERSION;
  orders: Readonly<Record<string, IcfesLocalPaymentOrder>>;
  processedEventIds: readonly string[];
}>;

export type IcfesLocalProviderEvent = Readonly<{
  eventId: string;
  providerTransactionId: string;
  reference: string;
  environment: 'sandbox' | 'production';
  amountInCents: number;
  currency: string;
  observedAt: string;
  kind: 'TRANSACTION' | 'REFUND' | 'CHARGEBACK';
  status?: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED';
}>;

export type IcfesLocalPaymentEventResult = Readonly<{
  ledger: IcfesLocalPaymentLedger;
  outcome: 'APPLIED' | 'IGNORED' | 'REJECTED' | 'REPLAY';
  reason:
    | 'STATE_CHANGED'
    | 'DUPLICATE_STATE'
    | 'EVENT_REPLAY'
    | 'UNKNOWN_ORDER'
    | 'INVALID_EVENT'
    | 'AMOUNT_MISMATCH'
    | 'CURRENCY_MISMATCH'
    | 'ENVIRONMENT_MISMATCH'
    | 'TRANSACTION_MISMATCH'
    | 'UPGRADE_SOURCE_INVALID'
    | 'REVERSAL_WITHOUT_APPROVAL';
}>;

const SAFE_ID = /^[A-Za-z0-9_-]{3,120}$/;
const REFERENCE = /^LOCAL-ICFES-[A-Za-z0-9_-]{3,100}$/;
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const EVENT_KINDS = new Set(['TRANSACTION', 'REFUND', 'CHARGEBACK']);
const TRANSACTION_STATUSES = new Set(['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED']);

export function isIcfesAdversarialPaymentModelEnabled(environment: RuntimeEnvironment): boolean {
  return environment.ICFES_ADVERSARIAL_PAYMENTS_ENABLED === 'true'
    && environment.NODE_ENV !== 'production'
    && environment.VERCEL_ENV !== 'production';
}

function requireLocalSandbox(environment: RuntimeEnvironment): void {
  if (!isIcfesAdversarialPaymentModelEnabled(environment)) {
    throw new Error('icfes_adversarial_payment_model_disabled');
  }
}

function validInstant(value: string): boolean {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

export function createIcfesLocalPaymentLedger(environment: RuntimeEnvironment): IcfesLocalPaymentLedger {
  requireLocalSandbox(environment);
  return Object.freeze({
    modelVersion: ICFES_ADVERSARIAL_PAYMENT_MODEL_VERSION,
    orders: Object.freeze({}),
    processedEventIds: Object.freeze([]),
  });
}

function replaceOrders(
  ledger: IcfesLocalPaymentLedger,
  orders: Record<string, IcfesLocalPaymentOrder>,
  eventId?: string,
): IcfesLocalPaymentLedger {
  return Object.freeze({
    ...ledger,
    orders: Object.freeze(orders),
    processedEventIds: eventId
      ? Object.freeze([...ledger.processedEventIds, eventId])
      : ledger.processedEventIds,
  });
}

export function prepareIcfesLocalPaymentOrder(input: Readonly<{
  ledger: IcfesLocalPaymentLedger;
  runtime: RuntimeEnvironment;
  id: string;
  reference: string;
  ownerId: string;
  requestedOfferId: IcfesCommerceOfferId;
  createdAt: string;
  upgradeSourceOrderId?: string;
}>): Readonly<{ ledger: IcfesLocalPaymentLedger; order: IcfesLocalPaymentOrder }> {
  requireLocalSandbox(input.runtime);
  if (!SAFE_ID.test(input.id) || !REFERENCE.test(input.reference) || !SAFE_ID.test(input.ownerId) || !validInstant(input.createdAt)) {
    throw new Error('invalid_local_payment_order');
  }
  if (input.ledger.orders[input.id] || Object.values(input.ledger.orders).some((order) => order.reference === input.reference)) {
    throw new Error('duplicate_local_payment_order');
  }

  const now = new Date(input.createdAt);
  const source = input.upgradeSourceOrderId ? input.ledger.orders[input.upgradeSourceOrderId] : undefined;
  if (input.upgradeSourceOrderId && !source) throw new Error('upgrade_source_not_found');
  if (source && (
    source.ownerId !== input.ownerId
    || source.examSlug !== 'icfes'
    || source.status !== 'APPROVED'
    || source.reversalReason
    || source.creditConsumedByOrderId
  )) throw new Error('upgrade_source_ineligible');

  const quote = source?.offerId === ICFES_DETAIL_OFFER_ID
    ? quoteIcfesCommercePurchase({
      requestedOfferId: input.requestedOfferId,
      purchasedDetailAt: new Date(source.approvedAt!),
      now,
    })
    : source
      ? quoteIcfesCommercePurchase({
        requestedOfferId: input.requestedOfferId,
        activeMembership: {
          offerId: source.offerId === 'exam-auto' ? 'exam-auto' : 'exam-teacher',
          periodEndsAt: new Date(source.periodEndsAt!),
        },
      })
      : quoteIcfesCommercePurchase({ requestedOfferId: input.requestedOfferId, now });

  if (quote.action !== 'checkout') throw new Error('local_payment_checkout_not_allowed');
  if (source && quote.creditInCents <= 0) throw new Error('upgrade_source_ineligible');
  if (source?.offerId === ICFES_DETAIL_OFFER_ID && !['exam-auto', 'exam-teacher'].includes(input.requestedOfferId)) {
    throw new Error('upgrade_path_not_allowed');
  }
  if (source?.offerId === 'exam-auto' && input.requestedOfferId !== 'exam-teacher') {
    throw new Error('upgrade_path_not_allowed');
  }
  if (source?.periodEndsAt && new Date(source.periodEndsAt).getTime() <= now.getTime()) {
    throw new Error('upgrade_source_expired');
  }

  const order = Object.freeze({
    id: input.id,
    reference: input.reference,
    ownerId: input.ownerId,
    examSlug: 'icfes' as const,
    offerId: input.requestedOfferId,
    amountInCents: quote.amountInCents,
    creditInCents: quote.creditInCents,
    currency: 'COP' as const,
    environment: 'sandbox' as const,
    status: 'CREATED' as const,
    createdAt: now.toISOString(),
    approvedAt: null,
    periodEndsAt: quote.periodEndsAt,
    providerTransactionId: null,
    upgradeSourceOrderId: source?.id ?? null,
    creditConsumedByOrderId: null,
    reversalReason: null,
  });
  const orders = { ...input.ledger.orders, [order.id]: order };
  if (source) orders[source.id] = Object.freeze({ ...source, creditConsumedByOrderId: order.id });
  return { ledger: replaceOrders(input.ledger, orders), order };
}

function eventResult(
  ledger: IcfesLocalPaymentLedger,
  outcome: IcfesLocalPaymentEventResult['outcome'],
  reason: IcfesLocalPaymentEventResult['reason'],
): IcfesLocalPaymentEventResult {
  return { ledger, outcome, reason };
}

function releaseReservedCredit(
  orders: Record<string, IcfesLocalPaymentOrder>,
  order: IcfesLocalPaymentOrder,
): void {
  if (!order.upgradeSourceOrderId) return;
  const source = orders[order.upgradeSourceOrderId];
  if (source?.creditConsumedByOrderId === order.id) {
    orders[source.id] = Object.freeze({ ...source, creditConsumedByOrderId: null });
  }
}

function revokeDependants(
  orders: Record<string, IcfesLocalPaymentOrder>,
  sourceOrderId: string,
): void {
  for (const candidate of Object.values(orders)) {
    if (candidate.upgradeSourceOrderId === sourceOrderId && candidate.status === 'APPROVED') {
      orders[candidate.id] = Object.freeze({
        ...candidate,
        status: 'REVOKED',
        reversalReason: 'SOURCE_REVERSAL',
      });
      revokeDependants(orders, candidate.id);
    }
  }
}

export function applyIcfesLocalProviderEvent(input: Readonly<{
  ledger: IcfesLocalPaymentLedger;
  runtime: RuntimeEnvironment;
  event: IcfesLocalProviderEvent;
}>): IcfesLocalPaymentEventResult {
  requireLocalSandbox(input.runtime);
  const { event } = input;
  if (input.ledger.processedEventIds.includes(event.eventId)) {
    return eventResult(input.ledger, 'REPLAY', 'EVENT_REPLAY');
  }
  if (!SAFE_ID.test(event.eventId) || !SAFE_ID.test(event.providerTransactionId) || !validInstant(event.observedAt)
    || !EVENT_KINDS.has(event.kind)
    || (event.kind === 'TRANSACTION' && !TRANSACTION_STATUSES.has(event.status ?? ''))
    || (event.kind !== 'TRANSACTION' && event.status !== undefined)) {
    return eventResult(input.ledger, 'REJECTED', 'INVALID_EVENT');
  }
  const order = Object.values(input.ledger.orders).find((candidate) => candidate.reference === event.reference);
  if (!order) return eventResult(input.ledger, 'REJECTED', 'UNKNOWN_ORDER');
  if (event.environment !== order.environment) return eventResult(input.ledger, 'REJECTED', 'ENVIRONMENT_MISMATCH');
  if (event.currency !== order.currency) return eventResult(input.ledger, 'REJECTED', 'CURRENCY_MISMATCH');
  if (event.amountInCents !== order.amountInCents) return eventResult(input.ledger, 'REJECTED', 'AMOUNT_MISMATCH');
  if (order.providerTransactionId && order.providerTransactionId !== event.providerTransactionId) {
    return eventResult(input.ledger, 'REJECTED', 'TRANSACTION_MISMATCH');
  }

  const orders = { ...input.ledger.orders };
  const record = (next: IcfesLocalPaymentOrder) => replaceOrders(input.ledger, { ...orders, [next.id]: Object.freeze(next) }, event.eventId);
  const withTransaction = { ...order, providerTransactionId: event.providerTransactionId };

  if (event.kind === 'REFUND' || event.kind === 'CHARGEBACK') {
    if (order.status !== 'APPROVED') return eventResult(input.ledger, 'IGNORED', 'REVERSAL_WITHOUT_APPROVAL');
    const next = Object.freeze({ ...withTransaction, status: 'REVOKED' as const, reversalReason: event.kind });
    orders[order.id] = next;
    revokeDependants(orders, order.id);
    return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'APPLIED', 'STATE_CHANGED');
  }

  if (event.status === 'APPROVED') {
    if (order.status === 'REVOKED') return eventResult(input.ledger, 'IGNORED', 'DUPLICATE_STATE');
    if (order.status === 'APPROVED') {
      return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'IGNORED', 'DUPLICATE_STATE');
    }
    if (order.upgradeSourceOrderId) {
      const source = orders[order.upgradeSourceOrderId];
      if (!source || source.status !== 'APPROVED' || source.reversalReason || source.creditConsumedByOrderId !== order.id) {
        return eventResult(input.ledger, 'REJECTED', 'UPGRADE_SOURCE_INVALID');
      }
    }
    const approvedAt = new Date(event.observedAt).toISOString();
    const periodEndsAt = order.offerId === ICFES_DETAIL_OFFER_ID
      ? null
      : order.periodEndsAt ?? new Date(Date.parse(approvedAt) + 30 * DAY_IN_MILLISECONDS).toISOString();
    return eventResult(record({
      ...withTransaction,
      status: 'APPROVED',
      approvedAt,
      periodEndsAt,
      reversalReason: null,
    }), 'APPLIED', 'STATE_CHANGED');
  }

  if (event.status === 'VOIDED') {
    const next = Object.freeze({ ...withTransaction, status: 'REVOKED' as const, reversalReason: 'VOIDED' as const });
    orders[order.id] = next;
    releaseReservedCredit(orders, next);
    revokeDependants(orders, order.id);
    return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'APPLIED', 'STATE_CHANGED');
  }

  if (order.status === 'APPROVED' || order.status === 'REVOKED') {
    return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'IGNORED', 'DUPLICATE_STATE');
  }
  if (event.status === 'PENDING') {
    if (order.status === 'PENDING') return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'IGNORED', 'DUPLICATE_STATE');
    return eventResult(record({ ...withTransaction, status: 'PENDING' }), 'APPLIED', 'STATE_CHANGED');
  }

  const declined = Object.freeze({ ...withTransaction, status: 'DECLINED' as const });
  orders[order.id] = declined;
  releaseReservedCredit(orders, declined);
  return eventResult(replaceOrders(input.ledger, orders, event.eventId), 'APPLIED', 'STATE_CHANGED');
}

export function hasIcfesLocalEntitlement(order: IcfesLocalPaymentOrder): boolean {
  return order.status === 'APPROVED' && order.reversalReason === null;
}
