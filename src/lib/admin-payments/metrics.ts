import type { AdminPaymentLedgerRow } from './server';

export const PAYMENT_MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const;

export type MonthlyPaymentSource = 'all' | 'online' | 'manual' | 'historical';

type PaymentMetricRow = Pick<AdminPaymentLedgerRow,
  'source' | 'status' | 'sourcePeriod' | 'paidOn' | 'paidAt' | 'observedAt' | 'amountInCents'>;

type PaymentTotals = { amountInCents: number; count: number };
export type PaymentYear = PaymentTotals & { year: number; months: PaymentTotals[] };

export const CURRENCY = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const BOGOTA_MONTH = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', timeZone: 'America/Bogota',
});

export function money(cents: number): string {
  return CURRENCY.format(cents / 100);
}

export function shortMoney(cents: number): string {
  const pesos = cents / 100;
  if (pesos >= 1_000_000) return `$${(pesos / 1_000_000).toFixed(pesos % 1_000_000 ? 1 : 0)} M`;
  if (pesos >= 1_000) return `$${Math.round(pesos / 1_000)} mil`;
  return `$${pesos}`;
}

export function monthKey(date: Date): string {
  return BOGOTA_MONTH.format(date);
}

export function paymentMonth(row: PaymentMetricRow): string | null {
  const recordedDate = row.sourcePeriod ?? row.paidOn;
  if (recordedDate && /^\d{4}-(?:0[1-9]|1[0-2])-\d{2}$/.test(recordedDate)) {
    return recordedDate.slice(0, 7);
  }
  const date = new Date(row.paidAt ?? row.observedAt);
  return Number.isFinite(date.getTime()) ? monthKey(date) : null;
}

export function summarizePaymentYears(rows: readonly PaymentMetricRow[], source: MonthlyPaymentSource): PaymentYear[] {
  const years = new Map<number, PaymentYear>();

  for (const row of rows) {
    if (row.status !== 'APPROVED') continue;
    const group = row.source === 'historical' || row.source === 'manual' ? row.source : 'online';
    if (source !== 'all' && group !== source) continue;

    const key = paymentMonth(row);
    if (!key) continue;
    const [year, month] = key.split('-').map(Number);
    let totals = years.get(year);
    if (!totals) {
      totals = { year, amountInCents: 0, count: 0, months: PAYMENT_MONTHS.map(() => ({ amountInCents: 0, count: 0 })) };
      years.set(year, totals);
    }
    totals.amountInCents += row.amountInCents;
    totals.count++;
    totals.months[month - 1].amountInCents += row.amountInCents;
    totals.months[month - 1].count++;
  }

  return [...years.values()].sort((a, b) => b.year - a.year);
}
