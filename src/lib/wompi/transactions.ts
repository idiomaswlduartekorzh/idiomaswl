import {
  getWompiCheckoutDetails,
  type WompiCheckoutDetails,
} from './catalog.ts';
import { parseWompiReference } from './security.ts';

export const WOMPI_TRANSACTION_STATUSES = [
  'PENDING',
  'APPROVED',
  'DECLINED',
  'VOIDED',
  'ERROR',
] as const;

export type WompiTransactionStatus = (typeof WOMPI_TRANSACTION_STATUSES)[number];

export type VerifiedWompiTransaction = Readonly<{
  id: string;
  reference: string;
  status: WompiTransactionStatus;
  amountInCents: number;
  currency: 'COP';
  paymentMethodType: string | null;
  details: WompiCheckoutDetails;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTransactionStatus(value: unknown): value is WompiTransactionStatus {
  return (
    typeof value === 'string' &&
    (WOMPI_TRANSACTION_STATUSES as readonly string[]).includes(value)
  );
}

export function parseAndVerifyWompiTransaction(value: unknown): VerifiedWompiTransaction | null {
  if (!isRecord(value)) return null;

  const id = value.id;
  const reference = value.reference;
  const status = value.status;
  const amountInCents = value.amount_in_cents;
  const currency = value.currency;
  const paymentMethodType = value.payment_method_type;

  if (
    typeof id !== 'string' ||
    !/^[A-Za-z0-9_-]{6,120}$/.test(id) ||
    typeof reference !== 'string' ||
    !isTransactionStatus(status) ||
    !Number.isSafeInteger(amountInCents) ||
    typeof amountInCents !== 'number' ||
    currency !== 'COP' ||
    (paymentMethodType !== null &&
      paymentMethodType !== undefined &&
      typeof paymentMethodType !== 'string')
  ) {
    return null;
  }

  const selection = parseWompiReference(reference);
  if (!selection) return null;

  const details = getWompiCheckoutDetails(selection);
  if (details.amountInCents !== amountInCents) return null;

  return Object.freeze({
    id,
    reference,
    status,
    amountInCents,
    currency,
    paymentMethodType: paymentMethodType ?? null,
    details,
  });
}
