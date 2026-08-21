import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { WompiEnvironment } from '@/lib/wompi/validation';
import { parseToeflWompiTransaction } from './report-payment-event';

export type ToeflPaymentPersistenceResult = 'saved' | 'ignored' | 'failed';

export async function persistVerifiedToeflReportTransaction(input: Readonly<{
  transaction: unknown;
  environment: WompiEnvironment;
}>): Promise<ToeflPaymentPersistenceResult> {
  const transaction = parseToeflWompiTransaction(input.transaction);
  if (!transaction) return 'ignored';

  try {
    const admin = createAdminClient();
    const { data: order, error: readError } = await admin
      .from('toefl_report_orders')
      .select('id, amount_in_cents, currency, environment, status, wompi_transaction_id, paid_at')
      .eq('reference', transaction.reference)
      .maybeSingle();
    if (readError) {
      console.error('[wompi] No se pudo consultar la orden TOEFL:', readError.message);
      return 'failed';
    }
    if (!order) return 'ignored';
    if (Number(order.amount_in_cents) !== transaction.amountInCents
      || order.currency !== transaction.currency || order.environment !== input.environment
      || (order.wompi_transaction_id && order.wompi_transaction_id !== transaction.id)) {
      console.error('[wompi] El evento TOEFL no coincide con la orden.', { reference: transaction.reference });
      return 'failed';
    }

    const nextStatus = order.status === 'APPROVED' ? 'APPROVED' : transaction.status;
    const now = new Date().toISOString();
    const { error: updateError } = await admin
      .from('toefl_report_orders')
      .update({
        status: nextStatus,
        wompi_transaction_id: transaction.id,
        paid_at: nextStatus === 'APPROVED' ? order.paid_at ?? now : null,
        updated_at: now,
      })
      .eq('id', order.id);
    if (updateError) {
      console.error('[wompi] No se pudo actualizar la orden TOEFL:', updateError.message);
      return 'failed';
    }
    return 'saved';
  } catch (error) {
    console.error('[wompi] No se pudo persistir la orden TOEFL:', error instanceof Error ? error.message : 'unknown');
    return 'failed';
  }
}
