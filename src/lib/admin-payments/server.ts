import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { sha256 } from '@/lib/wompi/security';
import { getWompiServerConfig } from '@/lib/wompi/server';
import {
  parseCreatedWompiPaymentLink,
  parseWompiPaymentLinkTransaction,
  type CreatedWompiPaymentLink,
  type VerifiedWompiPaymentLinkTransaction,
} from '@/lib/wompi/payment-links';
import {
  wompiPrivateAuthorization,
  type WompiEnvironment,
  type WompiServerConfig,
} from '@/lib/wompi/validation';
import type { AdminPaymentLinkInput } from './validation';

export type AdminPaymentLedgerStatus =
  | 'CREATED'
  | 'PENDING'
  | 'APPROVED'
  | 'DECLINED'
  | 'VOIDED'
  | 'ERROR'
  | 'EXPIRED';

export interface AdminPaymentLedgerRow {
  source: 'plans' | 'courses' | 'xpress' | 'icfes' | 'custom_link';
  recordId: string;
  reference: string;
  providerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  description: string;
  amountInCents: number;
  currency: 'COP';
  status: AdminPaymentLedgerStatus;
  paymentMethodType: string | null;
  environment: WompiEnvironment;
  createdAt: string;
  observedAt: string;
  paidAt: string | null;
  paymentUrl: string | null;
}

export interface AdminPaymentLinkRow {
  id: string;
  wompiPaymentLinkId: string | null;
  paymentUrl: string | null;
  environment: WompiEnvironment;
  amountInCents: number;
  currency: 'COP';
  title: string;
  description: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  internalNote: string | null;
  status: 'CREATING' | 'ACTIVE' | 'PAID' | 'VOIDED' | 'EXPIRED' | 'CANCELLED' | 'ERROR';
  lastPaymentStatus: string | null;
  lastWompiTransactionId: string | null;
  createdByEmail: string;
  expiresAt: string;
  paidAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPaymentsData {
  generatedAt: string;
  currentEnvironment: WompiEnvironment;
  wompiConfigured: boolean;
  setupRequired: boolean;
  ledger: AdminPaymentLedgerRow[];
  links: AdminPaymentLinkRow[];
}

export type AdminPaymentLinkPersistenceResult = 'saved' | 'ignored' | 'failed';

type AdminActor = Readonly<{ id: string; email: string }>;

class WompiPaymentLinkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WompiPaymentLinkError';
  }
}

function asSafeInteger(value: unknown): number | null {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isSafeInteger(number) ? number : null;
}

function paymentLinkExpiry(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

async function createWompiPaymentLink(input: Readonly<{
  config: WompiServerConfig;
  ticketId: string;
  amountInCents: number;
  title: string;
  description: string;
  expiresAt: string;
}>): Promise<CreatedWompiPaymentLink> {
  let response: Response;
  try {
    response = await fetch(`${input.config.apiBaseUrl}/payment_links`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: wompiPrivateAuthorization(input.config),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: input.title,
        description: input.description || input.title,
        single_use: true,
        collect_shipping: false,
        currency: 'COP',
        amount_in_cents: input.amountInCents,
        expires_at: input.expiresAt,
        sku: input.ticketId,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    throw new WompiPaymentLinkError('Wompi no respondió al crear el link.');
  }

  if (!response.ok) {
    console.error(`[admin-payments] Wompi rechazó el link con HTTP ${response.status}.`);
    throw new WompiPaymentLinkError('Wompi rechazó la creación del link.');
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new WompiPaymentLinkError('Wompi devolvió una respuesta inválida.');
  }

  const link = parseCreatedWompiPaymentLink(body, input.amountInCents);
  if (!link) throw new WompiPaymentLinkError('Wompi devolvió un link inconsistente.');
  return link;
}

export async function createAdminPaymentLink(
  input: AdminPaymentLinkInput,
  actor: AdminActor,
): Promise<AdminPaymentLinkRow> {
  const config = getWompiServerConfig();
  const expiresAt = paymentLinkExpiry(input.expiresInDays);
  const db = createAdminClient();

  const { data: ticket, error: insertError } = await db
    .from('admin_payment_links')
    .insert({
      environment: config.environment,
      amount_in_cents: input.amountInCents,
      currency: 'COP',
      title: input.title,
      description: input.description,
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone,
      internal_note: input.internalNote,
      status: 'CREATING',
      created_by: actor.id,
      created_by_email: actor.email,
      expires_at: expiresAt,
    })
    .select('id')
    .single();

  if (insertError || !ticket?.id) {
    console.error(`[admin-payments] No se pudo crear el ticket: ${insertError?.message ?? 'sin id'}`);
    throw new Error('No se pudo registrar el ticket de pago.');
  }

  try {
    const providerLink = await createWompiPaymentLink({
      config,
      ticketId: String(ticket.id),
      amountInCents: input.amountInCents,
      title: input.title,
      description: input.description,
      expiresAt,
    });

    const { data: saved, error: updateError } = await db
      .from('admin_payment_links')
      .update({
        wompi_payment_link_id: providerLink.id,
        payment_url: providerLink.url,
        status: 'ACTIVE',
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticket.id)
      .select('*')
      .single();

    if (updateError || !saved) {
      console.error(
        `[admin-payments] Link ${providerLink.id} creado en Wompi pero no consolidado: ${updateError?.message ?? 'sin fila'}`,
      );
      throw new Error('Wompi creó el link, pero no fue posible consolidarlo en el tracker.');
    }

    return mapPaymentLinkRow(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error inesperado al crear el link.';
    await db
      .from('admin_payment_links')
      .update({ status: 'ERROR', error_message: message.slice(0, 500), updated_at: new Date().toISOString() })
      .eq('id', ticket.id);
    throw error;
  }
}

type PaymentLinkTransactionLookup =
  | Readonly<{ kind: 'success'; transaction: VerifiedWompiPaymentLinkTransaction }>
  | Readonly<{ kind: 'not_found' }>
  | Readonly<{ kind: 'upstream_error' }>;

async function fetchPaymentLinkTransaction(
  transactionId: string,
  config: WompiServerConfig,
): Promise<PaymentLinkTransactionLookup> {
  if (!/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) return { kind: 'not_found' };

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: wompiPrivateAuthorization(config),
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (response.status === 404) return { kind: 'not_found' };
    if (!response.ok) return { kind: 'upstream_error' };

    const body: unknown = await response.json();
    if (typeof body !== 'object' || body === null || !Object.hasOwn(body, 'data')) {
      return { kind: 'upstream_error' };
    }

    const transaction = parseWompiPaymentLinkTransaction(
      (body as Record<string, unknown>).data,
    );
    return transaction ? { kind: 'success', transaction } : { kind: 'not_found' };
  } catch {
    return { kind: 'upstream_error' };
  }
}

export async function persistVerifiedAdminPaymentLinkTransaction(input: Readonly<{
  transactionId: string;
  config: WompiServerConfig;
}>): Promise<AdminPaymentLinkPersistenceResult> {
  const lookup = await fetchPaymentLinkTransaction(input.transactionId, input.config);
  if (lookup.kind === 'upstream_error') return 'failed';
  if (lookup.kind === 'not_found') return 'ignored';

  const transaction = lookup.transaction;
  const observedAt = new Date().toISOString();
  const fingerprint = sha256([
    'admin-payment-link',
    input.config.environment,
    transaction.id,
    transaction.status,
    transaction.amountInCents,
    transaction.currency,
  ].join('|'));

  const { data, error } = await createAdminClient().rpc(
    'record_admin_payment_link_transaction',
    {
      p_wompi_link_id: transaction.paymentLinkId,
      p_environment: input.config.environment,
      p_provider_id: transaction.id,
      p_amount: transaction.amountInCents,
      p_currency: transaction.currency,
      p_status: transaction.status,
      p_payment_method: transaction.paymentMethodType,
      p_observed: observedAt,
      p_fingerprint: fingerprint,
    },
  );

  if (error) {
    console.error(`[admin-payments] No se pudo conciliar ${transaction.id}: ${error.message}`);
    return 'failed';
  }

  return data ? 'saved' : 'ignored';
}

function mapLedgerRow(row: Record<string, unknown>): AdminPaymentLedgerRow | null {
  const amountInCents = asSafeInteger(row.amount_in_cents);
  if (
    amountInCents === null ||
    typeof row.source !== 'string' ||
    typeof row.record_id !== 'string' ||
    typeof row.reference !== 'string' ||
    typeof row.description !== 'string' ||
    typeof row.status !== 'string' ||
    typeof row.environment !== 'string' ||
    typeof row.created_at !== 'string' ||
    typeof row.observed_at !== 'string'
  ) return null;

  return {
    source: row.source as AdminPaymentLedgerRow['source'],
    recordId: row.record_id,
    reference: row.reference,
    providerId: typeof row.provider_id === 'string' ? row.provider_id : null,
    customerName: typeof row.customer_name === 'string' ? row.customer_name : null,
    customerEmail: typeof row.customer_email === 'string' ? row.customer_email : null,
    customerPhone: typeof row.customer_phone === 'string' ? row.customer_phone : null,
    description: row.description,
    amountInCents,
    currency: 'COP',
    status: row.status as AdminPaymentLedgerStatus,
    paymentMethodType: typeof row.payment_method_type === 'string' ? row.payment_method_type : null,
    environment: row.environment as WompiEnvironment,
    createdAt: row.created_at,
    observedAt: row.observed_at,
    paidAt: typeof row.paid_at === 'string' ? row.paid_at : null,
    paymentUrl: typeof row.payment_url === 'string' ? row.payment_url : null,
  };
}

function mapPaymentLinkRow(row: Record<string, unknown>): AdminPaymentLinkRow {
  return {
    id: String(row.id),
    wompiPaymentLinkId: typeof row.wompi_payment_link_id === 'string' ? row.wompi_payment_link_id : null,
    paymentUrl: typeof row.payment_url === 'string' ? row.payment_url : null,
    environment: row.environment as WompiEnvironment,
    amountInCents: asSafeInteger(row.amount_in_cents) ?? 0,
    currency: 'COP',
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    customerName: typeof row.customer_name === 'string' ? row.customer_name : null,
    customerEmail: typeof row.customer_email === 'string' ? row.customer_email : null,
    customerPhone: typeof row.customer_phone === 'string' ? row.customer_phone : null,
    internalNote: typeof row.internal_note === 'string' ? row.internal_note : null,
    status: row.status as AdminPaymentLinkRow['status'],
    lastPaymentStatus: typeof row.last_payment_status === 'string' ? row.last_payment_status : null,
    lastWompiTransactionId: typeof row.last_wompi_transaction_id === 'string' ? row.last_wompi_transaction_id : null,
    createdByEmail: String(row.created_by_email ?? ''),
    expiresAt: String(row.expires_at),
    paidAt: typeof row.paid_at === 'string' ? row.paid_at : null,
    errorMessage: typeof row.error_message === 'string' ? row.error_message : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function loadAdminPaymentsData(): Promise<AdminPaymentsData> {
  let currentEnvironment: WompiEnvironment = 'production';
  let wompiConfigured = false;
  try {
    currentEnvironment = getWompiServerConfig().environment;
    wompiConfigured = true;
  } catch {
    // The dashboard remains useful for historical data while configuration is repaired.
  }

  const db = createAdminClient();
  const [ledgerResult, linksResult] = await Promise.all([
    db
      .from('admin_payment_ledger')
      .select('*')
      .order('observed_at', { ascending: false })
      .limit(2_500),
    db
      .from('admin_payment_links')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300),
  ]);

  const setupRequired = Boolean(ledgerResult.error || linksResult.error);
  if (ledgerResult.error) {
    console.error(`[admin-payments] No se pudo leer el ledger: ${ledgerResult.error.message}`);
  }
  if (linksResult.error) {
    console.error(`[admin-payments] No se pudieron leer los links: ${linksResult.error.message}`);
  }

  const now = Date.now();
  const links = ((linksResult.data ?? []) as Record<string, unknown>[]).map(mapPaymentLinkRow);
  for (const link of links) {
    if (
      (link.status === 'ACTIVE' || link.status === 'CREATING') &&
      new Date(link.expiresAt).getTime() <= now
    ) {
      link.status = 'EXPIRED';
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    currentEnvironment,
    wompiConfigured,
    setupRequired,
    ledger: ((ledgerResult.data ?? []) as Record<string, unknown>[])
      .map(mapLedgerRow)
      .filter((row): row is AdminPaymentLedgerRow => row !== null),
    links,
  };
}
