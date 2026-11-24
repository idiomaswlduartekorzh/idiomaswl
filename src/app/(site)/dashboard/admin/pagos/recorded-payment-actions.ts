'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { isJoseAdminEmail } from '@/lib/config/admins';
import { createAdminClient } from '@/lib/supabase/admin';
import { HISTORICAL_UPLOAD_LIMIT, PAYMENTS_PATH, isRecordedPaymentId, parseHistoricalPayments, parseManualPayment } from '@/lib/admin-operations/recorded-payments';

export async function changeRecordedPayment(
  _state: { message: string; ok: boolean; preview?: { count: number; withoutDay: number; years: string[] } },
  form: FormData,
): Promise<typeof _state> {
  let admin;
  try {
    admin = await requireAdmin();
    if (!isJoseAdminEmail(admin.email)) throw new Error();
  } catch {
    return { ok: false, message: 'Esta operación requiere una cuenta de propietario.' };
  }

  const mode = String(form.get('mode') ?? '');
  const db = createAdminClient();

  if (mode === 'manual') {
    const payment = parseManualPayment(form);
    if (!payment) return { ok: false, message: 'Revisa los campos. La fecha debe ser de hoy o anterior y el valor debe ser positivo.' };
    const { error } = await db.from('admin_recorded_payments').upsert(
      { ...payment, created_by: admin.id },
      { onConflict: 'id', ignoreDuplicates: true },
    );
    if (error?.code === '23505') return { ok: false, message: 'Ya hay un pago activo con esa referencia y ese método.' };
    if (error) return { ok: false, message: 'No se pudo registrar el pago.' };
    revalidatePath(PAYMENTS_PATH);
    return { ok: true, message: 'Pago registrado.' };
  }

  if (mode === 'void') {
    const id = String(form.get('id') ?? '');
    const reason = String(form.get('reason') ?? '').trim();
    if (!isRecordedPaymentId(id) || reason.length < 3 || reason.length > 300) {
      return { ok: false, message: 'Escribe un motivo para anular el pago.' };
    }
    const { data, error } = await db.from('admin_recorded_payments')
      .update({ voided_at: new Date().toISOString(), voided_by: admin.id, void_reason: reason })
      .eq('id', id).is('voided_at', null).select('id').maybeSingle();
    if (error || !data) return { ok: false, message: 'El pago ya estaba anulado o no se pudo actualizar.' };
    revalidatePath(PAYMENTS_PATH);
    return { ok: true, message: 'Pago anulado. El movimiento queda en el historial.' };
  }

  if (mode !== 'preview' && mode !== 'import') return { ok: false, message: 'Acción desconocida.' };
  const file = form.get('history');
  if (!file || typeof file === 'string' || file.size < 1 || file.size > HISTORICAL_UPLOAD_LIMIT) {
    return { ok: false, message: 'Selecciona el archivo histórico JSON con un tamaño de hasta 2 MB.' };
  }

  let input: unknown;
  try {
    input = JSON.parse(await file.text());
  } catch {
    return { ok: false, message: 'El archivo histórico no contiene JSON válido.' };
  }

  let payments;
  try {
    payments = parseHistoricalPayments(input);
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'Revisa el archivo histórico.' };
  }

  if (mode === 'preview') {
    return {
      ok: true,
      message: 'Archivo validado. Revisa el resumen antes de importar.',
      preview: {
        count: payments.length,
        withoutDay: payments.filter(payment => !payment.paid_on).length,
        years: [...new Set(payments.map(payment => payment.period.slice(0, 4)))].sort(),
      },
    };
  }

  const { error } = await db.from('admin_recorded_payments').upsert(
    payments.map(payment => ({ ...payment, created_by: admin.id })),
    { onConflict: 'id', ignoreDuplicates: true },
  );
  if (error) return { ok: false, message: 'No se pudo importar el historial. Inténtalo de nuevo con el mismo archivo.' };
  revalidatePath(PAYMENTS_PATH);
  return { ok: true, message: 'Historial importado. Para consultarlo, elige Historial de Numbers y el periodo Todo.' };
}
