'use server';

import { revalidatePath } from 'next/cache';
import { requireOwnerAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  needsDistinctReceipt, NUMBERS_REVIEW_PATH, parseNumbersReviewPayment, type NumbersReviewReason,
} from '@/lib/admin-operations/numbers-payment-review';
import { PAYMENTS_PATH } from '@/lib/admin-operations/recorded-payments';

export async function confirmNumbersPayment(_state: { error: string | null }, form: FormData) {
  let owner;
  try {
    owner = await requireOwnerAdmin();
  } catch {
    return { error: 'Esta operación requiere una cuenta de propietario.' };
  }

  const payment = parseNumbersReviewPayment(form);
  if (!payment) return { error: 'Revisa el valor, el pagador, el concepto y la fecha del comprobante.' };

  const db = createAdminClient();
  const pending = await db.from('admin_numbers_payment_review').select('reason')
    .eq('id', payment.id).maybeSingle<{ reason: NumbersReviewReason }>();
  if (pending.error || !pending.data) return { error: 'No se encontró la fila en la bandeja privada.' };
  if (needsDistinctReceipt(pending.data.reason) && !payment.external_reference) {
    return { error: 'Indica la referencia del comprobante que distingue este pago.' };
  }

  const { error } = await db.from('admin_recorded_payments').insert({ ...payment, created_by: owner.id });
  if (error?.code === '23505') return { error: 'La fila ya fue importada o ese comprobante ya se usó en otra revisión.' };
  if (error) return { error: 'No se pudo importar el pago. Inténtalo de nuevo.' };

  revalidatePath(NUMBERS_REVIEW_PATH);
  revalidatePath(PAYMENTS_PATH);
  return { error: null };
}
