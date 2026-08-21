import type { ToeflReportPaymentStatus } from './report-payment';

export interface ToeflWompiTransaction {
  id: string;
  reference: string;
  amountInCents: number;
  currency: 'COP';
  status: ToeflReportPaymentStatus;
}

const REFERENCE_PATTERN = /^WL-TOEFL-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{8}$/;
const STATUSES = new Set<ToeflReportPaymentStatus>(['PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR']);

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

export function parseToeflWompiTransaction(value: unknown): ToeflWompiTransaction | null {
  const transaction = record(value);
  if (!transaction) return null;
  const id = transaction.id;
  const reference = transaction.reference;
  const amountInCents = transaction.amount_in_cents;
  const status = transaction.status;
  if (typeof id !== 'string' || id.length < 1 || id.length > 255
    || typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)
    || !Number.isSafeInteger(amountInCents) || Number(amountInCents) <= 0
    || transaction.currency !== 'COP' || typeof status !== 'string'
    || !STATUSES.has(status as ToeflReportPaymentStatus)) {
    return null;
  }
  return {
    id,
    reference,
    amountInCents: Number(amountInCents),
    currency: 'COP',
    status: status as ToeflReportPaymentStatus,
  };
}
