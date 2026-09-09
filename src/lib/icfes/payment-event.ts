import type { IcfesPaymentStatus } from './attempt-contract';

export interface IcfesWompiTransaction {
  id: string;
  reference: string;
  attemptId: string;
  amountInCents: number;
  currency: 'COP';
  status: IcfesPaymentStatus;
}

const PATTERN = /^WL-ICFES-([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-([0-9a-f]{8})$/;
const STATUSES = new Set<IcfesPaymentStatus>(['PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR']);

export function parseIcfesWompiTransaction(value: unknown): IcfesWompiTransaction | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  const match = typeof row.reference === 'string' ? PATTERN.exec(row.reference) : null;
  if (!match || typeof row.id !== 'string' || row.id.length < 1 || row.id.length > 255
    || !Number.isSafeInteger(row.amount_in_cents) || Number(row.amount_in_cents) <= 0
    || row.currency !== 'COP' || typeof row.status !== 'string' || !STATUSES.has(row.status as IcfesPaymentStatus)) return null;
  return {
    id: row.id, reference: row.reference as string, attemptId: match[1],
    amountInCents: Number(row.amount_in_cents), currency: 'COP', status: row.status as IcfesPaymentStatus,
  };
}
