import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { WompiEnvironment } from '@/lib/wompi/validation';
import { getRegistrationProduct, isRegistrationProductId } from './catalog';
import { parseRegistrationWompiTransaction } from './payment-event';

export type RegistrationPaymentPersistenceResult = 'saved' | 'ignored' | 'failed';

export async function persistVerifiedRegistrationTransaction(input: Readonly<{
  transaction: unknown;
  environment: WompiEnvironment;
}>): Promise<RegistrationPaymentPersistenceResult> {
  const transaction = parseRegistrationWompiTransaction(input.transaction);
  if (!transaction) return 'ignored';

  try {
    const admin = createAdminClient();
    const { data: order, error: readError } = await admin
      .from('registration_orders')
      .select('id, user_id, product_id, amount_in_cents, currency, environment, status, fulfillment_status, wompi_transaction_id, paid_at, access_starts_at, access_ends_at')
      .eq('reference', transaction.reference)
      .maybeSingle();
    if (readError) {
      console.error('[wompi] No se pudo consultar la orden de registro:', readError.message);
      return 'failed';
    }
    if (!order) return 'ignored';
    if (
      !isRegistrationProductId(order.product_id)
      || Number(order.amount_in_cents) !== transaction.amountInCents
      || order.currency !== transaction.currency
      || order.environment !== input.environment
      || (order.wompi_transaction_id && order.wompi_transaction_id !== transaction.id)
    ) {
      console.error('[wompi] El evento de registro no coincide con la orden.', {
        reference: transaction.reference,
      });
      return 'failed';
    }

    const product = getRegistrationProduct(order.product_id);
    const nextStatus = order.status === 'APPROVED' ? 'APPROVED' : transaction.status;
    const approvedNow = nextStatus === 'APPROVED' && order.status !== 'APPROVED';
    const paidAt = nextStatus === 'APPROVED'
      ? order.paid_at ?? new Date().toISOString()
      : null;
    const accessStartsAt = product.accountType === 'platform' && nextStatus === 'APPROVED'
      ? order.access_starts_at ?? paidAt
      : null;
    const accessEndsAt = product.accountType === 'platform' && nextStatus === 'APPROVED'
      ? order.access_ends_at ?? new Date(new Date(accessStartsAt!).getTime() + product.accessDays * 86_400_000).toISOString()
      : null;
    const fulfillmentStatus = nextStatus === 'APPROVED'
      ? product.accountType === 'platform' ? 'ACTIVE' : 'AWAITING_SCHEDULE'
      : order.status === 'APPROVED' ? order.fulfillment_status : 'PENDING';

    const { error: updateError } = await admin
      .from('registration_orders')
      .update({
        status: nextStatus,
        fulfillment_status: fulfillmentStatus,
        wompi_transaction_id: transaction.id,
        payment_method_type: transaction.paymentMethodType,
        paid_at: paidAt,
        access_starts_at: accessStartsAt,
        access_ends_at: accessEndsAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);
    if (updateError) {
      console.error('[wompi] No se pudo actualizar la orden de registro:', updateError.message);
      return 'failed';
    }

    if (approvedNow) {
      await admin
        .from('profiles')
        .update({
          account_type: product.accountType,
          intended_product_id: order.product_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.user_id);
    }
    return 'saved';
  } catch (error) {
    console.error('[wompi] No se pudo persistir la compra de registro:', error instanceof Error ? error.message : 'unknown');
    return 'failed';
  }
}
