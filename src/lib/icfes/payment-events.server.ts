import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { wompiPrivateAuthorization, type WompiServerConfig } from '@/lib/wompi/validation';
import { ICFES_PASS_AMOUNT_IN_CENTS, isIcfesPersistenceEnabled } from './product-config.server';
import { ICFES_DETAIL_OFFER_ID } from './commerce-v1';
import { parseIcfesWompiTransaction } from './payment-event';

export type IcfesPaymentPersistenceResult = 'saved' | 'ignored' | 'failed';

async function finishIcfesPaymentReconciliation(
  transactionId: string,
  config: WompiServerConfig,
  success: boolean,
  error?: unknown,
) {
  const message = error instanceof Error ? error.message : String(error ?? 'failed');
  const { error: rpcError } = await createAdminClient().rpc('finish_icfes_payment_reconciliation', {
    p_environment: config.environment,
    p_provider_id: transactionId,
    p_success: success,
    p_error: success ? null : message,
  }).abortSignal(AbortSignal.timeout(10_000));
  if (rpcError) throw new Error('icfes_payment_queue_unavailable');
}

export async function persistVerifiedIcfesTransaction(input: {
  transactionId: string;
  config: WompiServerConfig;
  expectedAttemptId?: string;
}): Promise<IcfesPaymentPersistenceResult> {
  if (!/^[A-Za-z0-9_-]{6,120}$/.test(input.transactionId)) return 'ignored';
  if (!isIcfesPersistenceEnabled()) return 'failed';
  const admin = createAdminClient();
  let queued = false;
  try {
    // The browser redirect knows the signed attempt before the provider lookup.
    // Persist one bounded reconciliation job first so a transient Wompi outage
    // cannot lose a payment that the webhook has not delivered yet.
    if (input.expectedAttemptId) {
      const { data: expectedOrder, error: expectedOrderError } = await admin.from('icfes_pass_orders')
        .select('id,reference,environment').eq('attempt_id', input.expectedAttemptId)
        .eq('environment', input.config.environment).in('status', ['PENDING', 'APPROVED', 'VOIDED'])
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (expectedOrderError || !expectedOrder) return 'failed';
      const { data: queuedOrderId, error: queueError } = await admin.rpc('queue_icfes_payment_reconciliation', {
        p_reference: expectedOrder.reference,
        p_environment: input.config.environment,
        p_provider_id: input.transactionId,
      }).abortSignal(AbortSignal.timeout(10_000));
      if (queueError || queuedOrderId !== expectedOrder.id) return 'failed';
      queued = true;
    }
    const response = await fetch(
      `${input.config.apiBaseUrl}/transactions/${encodeURIComponent(input.transactionId)}`,
      {
        headers: { Accept: 'application/json', Authorization: wompiPrivateAuthorization(input.config) },
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) {
      if (queued) await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, `wompi_${response.status}`);
      return response.status === 404 ? 'ignored' : 'failed';
    }
    const body = await response.json() as { data?: unknown };
    const transaction = parseIcfesWompiTransaction(body?.data);
    if (!transaction || transaction.id !== input.transactionId) {
      if (queued) await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, 'invalid_provider_transaction');
      return 'ignored';
    }
    if (input.expectedAttemptId && transaction.attemptId !== input.expectedAttemptId) {
      if (queued) await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, 'attempt_mismatch');
      return 'ignored';
    }
    if (transaction.amountInCents !== ICFES_PASS_AMOUNT_IN_CENTS) {
      if (queued) await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, 'amount_mismatch');
      return 'failed';
    }
    const { data: order, error } = await admin.from('icfes_pass_orders')
      .select('id, attempt_id, amount_in_cents, currency, environment, status, wompi_transaction_id, paid_at')
      .eq('reference', transaction.reference).maybeSingle();
    if (error || !order || order.attempt_id !== transaction.attemptId
      || Number(order.amount_in_cents) !== transaction.amountInCents || order.currency !== transaction.currency
      || order.environment !== input.config.environment
      || (order.wompi_transaction_id && order.wompi_transaction_id !== transaction.id)) {
      if (queued) await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, 'stored_order_mismatch');
      return 'failed';
    }
    if (!queued) {
      const { data: queuedOrderId, error: queueError } = await admin.rpc('queue_icfes_payment_reconciliation', {
        p_reference: transaction.reference,
        p_environment: input.config.environment,
        p_provider_id: transaction.id,
      }).abortSignal(AbortSignal.timeout(10_000));
      if (queueError || queuedOrderId !== order.id) return 'failed';
      queued = true;
    }
    const nextStatus = order.status === 'VOIDED'
      ? 'VOIDED'
      : transaction.status === 'VOIDED'
        ? 'VOIDED'
        : order.status === 'APPROVED' ? 'APPROVED' : transaction.status;
    const now = new Date().toISOString();
    const { error: updateError } = await admin.from('icfes_pass_orders').update({
      status: nextStatus, wompi_transaction_id: transaction.id,
      paid_at: nextStatus === 'APPROVED' ? order.paid_at ?? now : null, updated_at: now,
    }).eq('id', order.id);
    if (updateError) {
      try { await finishIcfesPaymentReconciliation(transaction.id, input.config, false, updateError); } catch {}
      return 'failed';
    }
    if (nextStatus === 'APPROVED') {
      const { error: entitlementError } = await admin.from('icfes_entitlements').upsert({
        attempt_id: transaction.attemptId, order_id: order.id, product_code: ICFES_DETAIL_OFFER_ID,
        granted_at: order.paid_at ?? now, status: 'active', revoked_at: null,
      }, { onConflict: 'attempt_id' });
      if (entitlementError) {
        try { await finishIcfesPaymentReconciliation(transaction.id, input.config, false, entitlementError); } catch {}
        return 'failed';
      }
    } else if (nextStatus === 'VOIDED') {
      const { error: revokeError } = await admin.from('icfes_entitlements')
        .update({ status: 'revoked', revoked_at: now }).eq('order_id', order.id).eq('status', 'active');
      if (revokeError) {
        try { await finishIcfesPaymentReconciliation(transaction.id, input.config, false, revokeError); } catch {}
        return 'failed';
      }
    }
    await finishIcfesPaymentReconciliation(
      transaction.id,
      input.config,
      nextStatus !== 'PENDING',
      nextStatus === 'PENDING' ? 'payment_pending' : undefined,
    );
    return 'saved';
  } catch (error) {
    if (queued) {
      try { await finishIcfesPaymentReconciliation(input.transactionId, input.config, false, error); } catch {}
    }
    return 'failed';
  }
}

export async function recoverIcfesPayments(limit = 10) {
  const admin = createAdminClient();
  const config = (await import('@/lib/wompi/server')).getWompiServerConfig();
  const { data, error } = await admin.from('icfes_payment_reconciliation_queue')
    .select('provider_id').in('status', ['pending', 'failed']).lte('next_attempt_at', new Date().toISOString())
    .order('next_attempt_at', { ascending: true }).limit(limit).abortSignal(AbortSignal.timeout(10_000));
  if (error) throw new Error('icfes_payment_queue_unavailable');
  let recovered = 0;
  let pending = 0;
  for (const row of data ?? []) {
    const result = await persistVerifiedIcfesTransaction({ transactionId: String(row.provider_id), config });
    if (result === 'saved') recovered += 1;
    else pending += 1;
  }
  return { checked: (data ?? []).length, recovered, pending };
}
