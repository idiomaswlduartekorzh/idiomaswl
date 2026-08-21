import type { WompiTransactionStatus } from '@/lib/wompi/transactions';

export interface RegistrationWompiTransaction {
  id: string;
  reference: string;
  amountInCents: number;
  currency: 'COP';
  status: WompiTransactionStatus;
  paymentMethodType: string | null;
}

const REFERENCE_PATTERN = /^WL-REG-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{8}$/;
const STATUSES = new Set<WompiTransactionStatus>([
  'PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR',
]);

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

export function parseRegistrationWompiTransaction(
  value: unknown,
): RegistrationWompiTransaction | null {
  const transaction = record(value);
  if (!transaction) return null;

  const id = transaction.id;
  const reference = transaction.reference;
  const amountInCents = transaction.amount_in_cents;
  const status = transaction.status;
  const paymentMethodType = transaction.payment_method_type;

  if (
    typeof id !== 'string' || id.length < 1 || id.length > 255
    || typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)
    || typeof amountInCents !== 'number' || !Number.isSafeInteger(amountInCents) || amountInCents <= 0
    || transaction.currency !== 'COP'
    || typeof status !== 'string' || !STATUSES.has(status as WompiTransactionStatus)
    || (paymentMethodType !== null && paymentMethodType !== undefined && typeof paymentMethodType !== 'string')
  ) {
    return null;
  }

  return Object.freeze({
    id,
    reference,
    amountInCents,
    currency: 'COP',
    status: status as WompiTransactionStatus,
    paymentMethodType: paymentMethodType ?? null,
  });
}
