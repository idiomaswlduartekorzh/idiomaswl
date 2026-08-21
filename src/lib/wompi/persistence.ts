import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';

import type { WompiCheckoutDetails } from './catalog';
import type { WompiEnvironment } from './validation';
import type { VerifiedWompiTransaction } from './transactions';

export type WompiPersistenceResult = 'saved' | 'skipped' | 'failed';

function isSupabaseAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

function reportPersistenceError(operation: string, message: string): void {
  console.error(`[wompi] ${operation} no se pudo persistir: ${message}`);
}

export async function persistWompiCheckoutStarted(input: Readonly<{
  reference: string;
  environment: WompiEnvironment;
  details: WompiCheckoutDetails;
}>): Promise<WompiPersistenceResult> {
  if (!isSupabaseAdminConfigured()) return 'skipped';

  const now = new Date().toISOString();
  const { error } = await createAdminClient()
    .from('wompi_transactions')
    .upsert(
      {
        reference: input.reference,
        environment: input.environment,
        plan_id: input.details.planId,
        language: input.details.language,
        billing_period: input.details.billingPeriod,
        amount_in_cents: input.details.amountInCents,
        currency: input.details.currency,
        status: 'CREATED',
        updated_at: now,
      },
      { onConflict: 'reference', ignoreDuplicates: true },
    );

  if (error) {
    reportPersistenceError('checkout', error.message);
    return 'failed';
  }

  return 'saved';
}

export async function persistVerifiedWompiTransaction(input: Readonly<{
  transaction: VerifiedWompiTransaction;
  environment: WompiEnvironment;
  eventSentAt?: string | null;
}>): Promise<WompiPersistenceResult> {
  if (!isSupabaseAdminConfigured()) return 'skipped';

  const { transaction } = input;
  const now = new Date().toISOString();
  const eventSentAt = input.eventSentAt ? new Date(input.eventSentAt) : null;
  const validEventSentAt =
    eventSentAt && !Number.isNaN(eventSentAt.valueOf()) ? eventSentAt.toISOString() : null;

  const { error } = await createAdminClient()
    .from('wompi_transactions')
    .upsert(
      {
        reference: transaction.reference,
        wompi_transaction_id: transaction.id,
        environment: input.environment,
        plan_id: transaction.details.planId,
        language: transaction.details.language,
        billing_period: transaction.details.billingPeriod,
        amount_in_cents: transaction.amountInCents,
        currency: transaction.currency,
        status: transaction.status,
        payment_method_type: transaction.paymentMethodType,
        last_event_at: validEventSentAt,
        updated_at: now,
      },
      { onConflict: 'reference' },
    );

  if (error) {
    reportPersistenceError('transacción verificada', error.message);
    return 'failed';
  }

  return 'saved';
}
