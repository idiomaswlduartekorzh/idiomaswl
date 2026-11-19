import { createHash, timingSafeEqual } from 'node:crypto';

export type EpaycoEnvironment = 'sandbox' | 'production';

export type EpaycoPayment = Readonly<{
  reference: string;
  providerReference: string;
  transactionId: string;
  amountInCents: number;
  currency: 'COP';
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED';
  environment: EpaycoEnvironment;
}>;

const referencePattern = /^WC-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const providerReferencePattern = /^[A-Za-z0-9_-]{6,100}$/;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function nonemptyString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}
function providerValue(value: unknown): string | null {
  return nonemptyString(value) ?? (typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : null);
}

/** ePayco's amounts are pesos; our immutable orders store cents. Reject rounding. */
export function epaycoPesosToCents(value: unknown): number | null {
  const text = typeof value === 'number' && Number.isFinite(value) ? String(value) : value;
  if (typeof text !== 'string' || !/^\d{1,12}(?:\.\d{1,2})?$/.test(text)) return null;
  const [pesos, fraction = ''] = text.split('.');
  const cents = Number(pesos) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null;
}

export function verifyEpaycoSignature(value: unknown, customerId: string, pKey: string): boolean {
  const event = record(value);
  if (!event || (event.x_cust_id_cliente !== undefined && String(event.x_cust_id_cliente) !== customerId)) return false;
  const received = nonemptyString(event.x_signature);
  const reference = providerValue(event.x_ref_payco);
  const transaction = providerValue(event.x_transaction_id);
  const amount = nonemptyString(event.x_amount) ?? (typeof event.x_amount === 'number' ? String(event.x_amount) : null);
  const currency = nonemptyString(event.x_currency_code);
  if (!received || !reference || !transaction || !amount || !currency || !/^[a-f\d]{64}$/i.test(received)) return false;
  const calculated = createHash('sha256').update(`${customerId}^${pKey}^${reference}^${transaction}^${amount}^${currency}`).digest('hex');
  return timingSafeEqual(Buffer.from(received.toLowerCase(), 'hex'), Buffer.from(calculated, 'hex'));
}

export function parseEpaycoPayment(value: unknown, customerId: string, pKey: string): EpaycoPayment | null {
  const payment = record(value);
  if (!payment || !verifyEpaycoSignature(payment, customerId, pKey)) return null;
  const reference = nonemptyString(payment.x_id_invoice);
  const providerReference = providerValue(payment.x_ref_payco);
  const transactionId = providerValue(payment.x_transaction_id);
  const amountInCents = epaycoPesosToCents(payment.x_amount);
  if (!reference || !referencePattern.test(reference) || !providerReference || !providerReferencePattern.test(providerReference)
    || !transactionId || !providerReferencePattern.test(transactionId) || amountInCents === null
    || payment.x_currency_code !== 'COP') return null;
  const response = nonemptyString(payment.x_response)?.toLowerCase();
  const statuses: Record<string, EpaycoPayment['status']> = {
    aceptada: 'APPROVED', pendiente: 'PENDING', rechazada: 'DECLINED',
    fallida: 'ERROR', cancelada: 'VOIDED', reversada: 'VOIDED',
  };
  const status = response ? statuses[response] : undefined;
  if (!status) return null;
  const test = String(payment.x_test_request).toLowerCase();
  if (test !== 'true' && test !== 'false') return null;
  return { reference, providerReference, transactionId, amountInCents, currency: 'COP', status,
    environment: test === 'true' ? 'sandbox' : 'production' };
}

export function epaycoLedgerId(reference: string): string {
  if (!providerReferencePattern.test(reference)) throw new Error('invalid_epayco_reference');
  return `epayco:${reference}`;
}

export function rawEpaycoReference(ledgerId: string): string | null {
  if (!ledgerId.startsWith('epayco:')) return null;
  const reference = ledgerId.slice(7);
  return providerReferencePattern.test(reference) ? reference : null;
}
