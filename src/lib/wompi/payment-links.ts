import {
  WOMPI_TRANSACTION_STATUSES,
  type WompiTransactionStatus,
} from './transactions.ts';

const WOMPI_PAYMENT_LINK_ID = /^[A-Za-z0-9_-]{3,120}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTransactionStatus(value: unknown): value is WompiTransactionStatus {
  return (
    typeof value === 'string' &&
    (WOMPI_TRANSACTION_STATUSES as readonly string[]).includes(value)
  );
}

export type CreatedWompiPaymentLink = Readonly<{
  id: string;
  url: string;
}>;

export function parseCreatedWompiPaymentLink(
  body: unknown,
  expectedAmountInCents: number,
): CreatedWompiPaymentLink | null {
  if (!isRecord(body) || !isRecord(body.data)) return null;

  const id = body.data.id;
  const currency = body.data.currency;
  const amountInCents = body.data.amount_in_cents;
  const singleUse = body.data.single_use;

  if (
    typeof id !== 'string' ||
    !WOMPI_PAYMENT_LINK_ID.test(id) ||
    currency !== 'COP' ||
    amountInCents !== expectedAmountInCents ||
    singleUse !== true
  ) {
    return null;
  }

  return Object.freeze({
    id,
    url: `https://checkout.wompi.co/l/${id}`,
  });
}

export type VerifiedWompiPaymentLinkTransaction = Readonly<{
  id: string;
  paymentLinkId: string;
  status: WompiTransactionStatus;
  amountInCents: number;
  currency: 'COP';
  paymentMethodType: string | null;
}>;

export function parseWompiPaymentLinkTransaction(
  value: unknown,
): VerifiedWompiPaymentLinkTransaction | null {
  if (!isRecord(value)) return null;

  const id = value.id;
  const paymentLinkId = value.payment_link_id;
  const status = value.status;
  const amountInCents = value.amount_in_cents;
  const currency = value.currency;
  const paymentMethodType = value.payment_method_type;

  if (
    typeof id !== 'string' ||
    !/^[A-Za-z0-9_-]{6,120}$/.test(id) ||
    typeof paymentLinkId !== 'string' ||
    !WOMPI_PAYMENT_LINK_ID.test(paymentLinkId) ||
    !isTransactionStatus(status) ||
    typeof amountInCents !== 'number' ||
    !Number.isSafeInteger(amountInCents) ||
    amountInCents <= 0 ||
    currency !== 'COP' ||
    (paymentMethodType !== null &&
      paymentMethodType !== undefined &&
      typeof paymentMethodType !== 'string')
  ) {
    return null;
  }

  return Object.freeze({
    id,
    paymentLinkId,
    status,
    amountInCents,
    currency,
    paymentMethodType: paymentMethodType ?? null,
  });
}
