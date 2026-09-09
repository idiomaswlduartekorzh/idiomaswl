import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { WompiServerConfig } from '@/lib/wompi/validation';
import { ICFES_PASS_AMOUNT_IN_CENTS, isIcfesPersistenceEnabled } from './product-config.server';
import { parseIcfesWompiTransaction } from './payment-event';

export type IcfesPaymentPersistenceResult = 'saved' | 'ignored' | 'failed';

export async function persistVerifiedIcfesTransaction(input: {
  transactionId: string;
  config: WompiServerConfig;
}): Promise<IcfesPaymentPersistenceResult> {
  if (!/^[A-Za-z0-9_-]{6,120}$/.test(input.transactionId)) return 'ignored';
  if (!isIcfesPersistenceEnabled()) return 'failed';
  try {
    const response = await fetch(
      `${input.config.apiBaseUrl}/transactions/${encodeURIComponent(input.transactionId)}`,
      {
        headers: { Accept: 'application/json', Authorization: `Bearer ${input.config.publicKey}` },
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) return response.status === 404 ? 'ignored' : 'failed';
    const body = await response.json() as { data?: unknown };
    const transaction = parseIcfesWompiTransaction(body?.data);
    if (!transaction || transaction.id !== input.transactionId) return 'ignored';
    if (transaction.amountInCents !== ICFES_PASS_AMOUNT_IN_CENTS) return 'failed';
    const admin = createAdminClient();
    const { data: order, error } = await admin.from('icfes_pass_orders')
      .select('id, attempt_id, amount_in_cents, currency, environment, status, wompi_transaction_id, paid_at')
      .eq('reference', transaction.reference).maybeSingle();
    if (error || !order || order.attempt_id !== transaction.attemptId
      || Number(order.amount_in_cents) !== transaction.amountInCents || order.currency !== transaction.currency
      || order.environment !== input.config.environment
      || (order.wompi_transaction_id && order.wompi_transaction_id !== transaction.id)) return 'failed';
    const nextStatus = order.status === 'APPROVED' ? 'APPROVED' : transaction.status;
    const now = new Date().toISOString();
    const { error: updateError } = await admin.from('icfes_pass_orders').update({
      status: nextStatus, wompi_transaction_id: transaction.id,
      paid_at: nextStatus === 'APPROVED' ? order.paid_at ?? now : null, updated_at: now,
    }).eq('id', order.id);
    if (updateError) return 'failed';
    if (nextStatus === 'APPROVED') {
      const { error: entitlementError } = await admin.from('icfes_entitlements').upsert({
        attempt_id: transaction.attemptId, order_id: order.id, product_code: 'icfes-pass-v1', granted_at: order.paid_at ?? now,
      }, { onConflict: 'attempt_id' });
      if (entitlementError) return 'failed';
    }
    return 'saved';
  } catch { return 'failed'; }
}
