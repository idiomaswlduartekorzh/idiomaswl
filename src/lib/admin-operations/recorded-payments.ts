import { bogotaDay, isRecordId, parseDay } from './agenda';

export const PAYMENTS_PATH = '/dashboard/admin/pagos';
export const PAYMENT_METHODS = ['Transferencia', 'Efectivo', 'Nequi', 'Daviplata', 'Otro'] as const;
export const HISTORICAL_UPLOAD_LIMIT = 2_000_000;
const HISTORICAL_REFERENCE = /^NUMBERS-(20\d{2}-(?:0[1-9]|1[0-2]))-[A-Z]{1,3}[0-9]{1,5}$/;
type Method = typeof PAYMENT_METHODS[number];

export type RecordedPayment = {
  id: string;
  source: 'manual' | 'historical';
  paid_on: string | null;
  period: string;
  amount_in_cents: number;
  customer_name: string;
  description: string;
  method: Method | null;
  external_reference: string | null;
};

function validText(value: unknown, limit: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= limit;
}

function validAmount(cents: unknown): cents is number {
  return typeof cents === 'number' && Number.isSafeInteger(cents) && cents >= 1 && cents <= 100_000_000_000;
}

function validMethod(value: string): value is Method {
  return PAYMENT_METHODS.some(method => value === method);
}

export function parsePaymentAmount(amount: string): number | null {
  if (!/^\d{1,10}(?:\.\d{1,2})?$/.test(amount)) return null;
  const [pesos, cents = ''] = amount.split('.');
  const total = Number(pesos) * 100 + Number(cents.padEnd(2, '0'));
  return validAmount(total) ? total : null;
}

export function parseManualPayment(form: FormData, today = bogotaDay()): RecordedPayment | null {
  const id = String(form.get('requestId') ?? '');
  const paidOn = String(form.get('paidOn') ?? '');
  const amountInCents = parsePaymentAmount(String(form.get('amountInCop') ?? ''));
  const customer = String(form.get('customerName') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const method = String(form.get('method') ?? '');
  const reference = String(form.get('reference') ?? '').trim();
  if (!isRecordId(id) || !parseDay(paidOn) || paidOn > today || amountInCents === null
    || !validText(customer, 150) || !validText(description, 300) || !validMethod(method) || reference.length > 120) return null;

  return {
    id: id.toLowerCase(),
    source: 'manual',
    paid_on: paidOn,
    period: `${paidOn.slice(0, 7)}-01`,
    amount_in_cents: amountInCents,
    customer_name: customer,
    description,
    method,
    external_reference: reference || null,
  };
}

export function isRecordedPaymentId(value: string): boolean {
  return isRecordId(value) || isNumbersPaymentId(value);
}

export function isNumbersPaymentId(value: string): boolean {
  return HISTORICAL_REFERENCE.test(value);
}

export function parseHistoricalPayments(input: unknown): RecordedPayment[] {
  if (!Array.isArray(input) || !input.length || input.length > 5_000) {
    throw new Error('El archivo debe contener entre 1 y 5.000 registros.');
  }

  const seen = new Set<string>();
  return input.map((value: unknown, index) => {
    if (!value || typeof value !== 'object') throw new Error(`Revisa el registro ${index + 1} del archivo.`);
    const { id, paid_on, amount_in_cents, customer_name, description } = value as Record<string, unknown>;
    const period = typeof id === 'string' ? HISTORICAL_REFERENCE.exec(id)?.[1] : undefined;
    if (typeof id !== 'string' || !period || seen.has(id) || !validAmount(amount_in_cents)
      || !validText(customer_name, 150) || !validText(description, 300)
      || !(paid_on === null || (typeof paid_on === 'string' && parseDay(paid_on) && paid_on.startsWith(period)))) {
      throw new Error(`Revisa la referencia, fecha o valor del registro ${index + 1}.`);
    }
    seen.add(id);
    return {
      id,
      paid_on,
      amount_in_cents,
      customer_name: customer_name.trim(),
      description: description.trim(),
      source: 'historical',
      period: `${period}-01`,
      method: null,
      external_reference: null,
    };
  });
}
