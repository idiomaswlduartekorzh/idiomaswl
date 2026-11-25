import { bogotaDay, parseDay } from './agenda';
import { isNumbersPaymentId, parsePaymentAmount, PAYMENTS_PATH } from './recorded-payments';

export const NUMBERS_REVIEW_PATH = `${PAYMENTS_PATH}/revision-numbers`;

export const NUMBERS_REVIEW_REASONS = {
  fecha_fuera_del_mes: 'La fecha anotada corresponde a otro mes',
  coincidencia_de_nombre_e_importe_en_el_mes: 'Coinciden el nombre y el importe con otra fila del mes',
  posible_duplicado: 'Posible duplicado de un pago ya registrado',
  valor_o_concepto_por_verificar: 'Valor o concepto sin confirmar',
  nombre_por_verificar: 'Pagador sin identificar',
} as const;

export type NumbersReviewReason = keyof typeof NUMBERS_REVIEW_REASONS;

export function needsDistinctReceipt(reason: NumbersReviewReason): boolean {
  return reason === 'posible_duplicado' || reason === 'coincidencia_de_nombre_e_importe_en_el_mes';
}

export function parseNumbersReviewPayment(form: FormData, today = bogotaDay()) {
  const id = String(form.get('id') ?? '');
  const paidOn = String(form.get('paidOn') ?? '');
  const name = String(form.get('customerName') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const receipt = String(form.get('receipt') ?? '').trim();
  const cents = parsePaymentAmount(String(form.get('amountInCop') ?? ''));
  if (!isNumbersPaymentId(id) || !parseDay(paidOn) || paidOn > today || cents === null
    || !name || name.length > 150 || !description || description.length > 300 || receipt.length > 120) return null;

  return {
    id, source: 'historical' as const, numbers_review_id: id, period: `${paidOn.slice(0, 7)}-01`,
    paid_on: paidOn, customer_name: name, description, amount_in_cents: cents, external_reference: receipt || null,
  };
}
