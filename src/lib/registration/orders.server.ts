import 'server-only';

import { randomBytes, randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createWompiIntegritySignature } from '@/lib/wompi/security';
import { getWompiServerConfig } from '@/lib/wompi/server';
import {
  REGISTRATION_CURRENCY,
  REGISTRATION_PRODUCTS,
  getRegistrationAmountInCents,
  getRegistrationProduct,
  type RegistrationProductId,
  type RegistrationSelection,
  type RegistrationOrderStatus,
  type RegistrationFulfillmentStatus,
  type RegistrationOrderSummary,
} from './catalog';

interface OrderRow {
  id: string;
  user_id: string;
  account_type: 'platform' | 'student';
  product_id: RegistrationProductId;
  reference: string;
  amount_in_cents: number;
  currency: 'COP';
  status: RegistrationOrderStatus;
  fulfillment_status: RegistrationFulfillmentStatus;
  environment: 'sandbox' | 'production';
  paid_at: string | null;
  access_starts_at: string | null;
  access_ends_at: string | null;
  created_at: string;
}

export interface RegistrationCheckoutResponse {
  ok: true;
  environment: 'sandbox' | 'production';
  purchase: {
    productId: RegistrationProductId;
    label: string;
    billingLabel: string;
    amountInCents: number;
    currency: 'COP';
  };
  checkout: {
    currency: 'COP';
    amountInCents: number;
    reference: string;
    publicKey: string;
    signature: { integrity: string };
    redirectUrl: string;
  } | null;
  alreadyActive: boolean;
}

const ORDER_SELECT = 'id, user_id, account_type, product_id, reference, amount_in_cents, currency, status, fulfillment_status, environment, paid_at, access_starts_at, access_ends_at, created_at';

function createReference(orderId: string): string {
  return `WL-REG-${orderId}-${randomBytes(4).toString('hex')}`;
}

function checkoutResponse(
  order: OrderRow,
  redirectUrl: string,
  alreadyActive: boolean,
): RegistrationCheckoutResponse {
  const config = getWompiServerConfig();
  const product = getRegistrationProduct(order.product_id);
  return {
    ok: true,
    environment: config.environment,
    purchase: {
      productId: order.product_id,
      label: product.label,
      billingLabel: product.billingLabel,
      amountInCents: order.amount_in_cents,
      currency: REGISTRATION_CURRENCY,
    },
    checkout: alreadyActive ? null : {
      currency: order.currency,
      amountInCents: order.amount_in_cents,
      reference: order.reference,
      publicKey: config.publicKey,
      signature: {
        integrity: createWompiIntegritySignature({
          reference: order.reference,
          amountInCents: order.amount_in_cents,
          currency: order.currency,
          integritySecret: config.integritySecret,
        }),
      },
      redirectUrl,
    },
    alreadyActive,
  };
}

export async function createRegistrationCheckout(input: Readonly<{
  userId: string;
  selection: RegistrationSelection;
  redirectUrl: string;
}>): Promise<RegistrationCheckoutResponse> {
  const config = getWompiServerConfig();
  const admin = createAdminClient();
  const product = getRegistrationProduct(input.selection.productId);
  const amountInCents = getRegistrationAmountInCents(input.selection.productId);
  const now = new Date().toISOString();

  if (product.accountType === 'platform') {
    const { data: active, error: activeError } = await admin
      .from('registration_orders')
      .select(ORDER_SELECT)
      .eq('user_id', input.userId)
      .eq('product_id', input.selection.productId)
      .eq('status', 'APPROVED')
      .gt('access_ends_at', now)
      .order('access_ends_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (activeError) throw new Error('No pudimos consultar tu acceso actual.');
    if (active) return checkoutResponse(active as OrderRow, input.redirectUrl, true);
  }

  const { data: pending, error: pendingError } = await admin
    .from('registration_orders')
    .select(ORDER_SELECT)
    .eq('user_id', input.userId)
    .eq('product_id', input.selection.productId)
    .eq('status', 'PENDING')
    .maybeSingle();
  if (pendingError) throw new Error('No pudimos consultar tu intento de pago.');

  let order: OrderRow | null = pending as OrderRow | null;
  if (order) {
    if (
      order.account_type !== input.selection.accountType
      || order.amount_in_cents !== amountInCents
      || order.environment !== config.environment
    ) {
      throw new Error('El precio o el ambiente cambió mientras había un pago abierto. Escríbenos para renovarlo.');
    }
  } else {
    const orderId = randomUUID();
    const reference = createReference(orderId);
    const { data: inserted, error: insertError } = await admin
      .from('registration_orders')
      .insert({
        id: orderId,
        user_id: input.userId,
        account_type: input.selection.accountType,
        product_id: input.selection.productId,
        reference,
        amount_in_cents: amountInCents,
        currency: REGISTRATION_CURRENCY,
        status: 'PENDING',
        fulfillment_status: 'PENDING',
        environment: config.environment,
      })
      .select(ORDER_SELECT)
      .single();

    if (insertError || !inserted) {
      const { data: raced } = await admin
        .from('registration_orders')
        .select(ORDER_SELECT)
        .eq('user_id', input.userId)
        .eq('product_id', input.selection.productId)
        .eq('status', 'PENDING')
        .maybeSingle();
      if (!raced) throw new Error('No pudimos crear la referencia de pago.');
      order = raced as OrderRow;
    } else {
      order = inserted as OrderRow;
    }
  }

  await admin
    .from('profiles')
    .update({
      account_type: input.selection.accountType,
      intended_product_id: input.selection.productId,
      updated_at: now,
    })
    .eq('id', input.userId);

  return checkoutResponse(order, input.redirectUrl, false);
}

export async function listRegistrationOrdersForUser(
  userId: string,
): Promise<RegistrationOrderSummary[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return [];
  }
  const { data, error } = await createAdminClient()
    .from('registration_orders')
    .select(ORDER_SELECT)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(12);
  if (error || !data) return [];

  return (data as OrderRow[])
    .filter((order) => Object.hasOwn(REGISTRATION_PRODUCTS, order.product_id))
    .map((order) => ({
      id: order.id,
      productId: order.product_id,
      productLabel: REGISTRATION_PRODUCTS[order.product_id].label,
      accountType: order.account_type,
      amountInCents: Number(order.amount_in_cents),
      status: order.status,
      fulfillmentStatus: order.fulfillment_status,
      paidAt: order.paid_at,
      accessEndsAt: order.access_ends_at,
      createdAt: order.created_at,
    }));
}
