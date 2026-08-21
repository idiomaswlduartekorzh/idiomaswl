import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getToeflReportPaymentConfig } from '@/lib/wompi/config.server';
import { buildWompiEventChecksum, safeHexEqual } from '@/lib/wompi/signatures';
import type { ToeflReportPaymentStatus } from '@/lib/toefl/report-payment';

export const runtime = 'nodejs';

const ALLOWED_STATUSES = new Set<ToeflReportPaymentStatus>(['PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR']);

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function response(body: object, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

export async function POST(request: Request): Promise<Response> {
  const raw = await request.text();
  if (!raw || raw.length > 64_000) return response({ ok: false, error: 'invalid_event' }, 400);
  let body: Record<string, unknown>;
  try {
    body = record(JSON.parse(raw)) ?? {};
  } catch {
    return response({ ok: false, error: 'invalid_json' }, 400);
  }

  let config: ReturnType<typeof getToeflReportPaymentConfig>;
  try {
    config = getToeflReportPaymentConfig();
  } catch {
    console.error('[wompi-event] Payment configuration is unavailable.');
    return response({ ok: false, error: 'configuration_unavailable' }, 503);
  }

  const data = record(body.data);
  const signature = record(body.signature);
  const properties = Array.isArray(signature?.properties)
    ? signature.properties.filter((item): item is string => typeof item === 'string')
    : [];
  const timestamp = Number(body.timestamp);
  const checksum = buildWompiEventChecksum({ data, properties, timestamp, eventsSecret: config.eventsSecret });
  if (!checksum || !safeHexEqual(signature?.checksum, checksum)) {
    return response({ ok: false, error: 'invalid_signature' }, 401);
  }
  if (body.event !== 'transaction.updated') return response({ ok: true, ignored: true });

  const transaction = record(data?.transaction);
  const reference = typeof transaction?.reference === 'string' ? transaction.reference : '';
  const transactionId = typeof transaction?.id === 'string' ? transaction.id : '';
  const currency = transaction?.currency;
  const amountInCents = Number(transaction?.amount_in_cents);
  const status = transaction?.status as ToeflReportPaymentStatus;
  const eventEnvironment = body.environment;
  const expectedEnvironment = config.environment === 'sandbox' ? 'test' : 'prod';
  if (!reference || !transactionId || currency !== 'COP' || !Number.isSafeInteger(amountInCents)
    || !ALLOWED_STATUSES.has(status) || eventEnvironment !== expectedEnvironment) {
    return response({ ok: false, error: 'invalid_transaction' }, 400);
  }

  const admin = createAdminClient();
  const { data: order, error: readError } = await admin
    .from('toefl_report_orders')
    .select('id, amount_in_cents, currency, environment, status, wompi_transaction_id')
    .eq('reference', reference)
    .maybeSingle();
  if (readError) return response({ ok: false, error: 'order_lookup_failed' }, 503);
  if (!order) return response({ ok: false, error: 'order_not_found' }, 404);
  if (Number(order.amount_in_cents) !== amountInCents || order.currency !== currency || order.environment !== config.environment) {
    return response({ ok: false, error: 'order_mismatch' }, 409);
  }
  if (order.wompi_transaction_id && order.wompi_transaction_id !== transactionId) {
    return response({ ok: false, error: 'transaction_mismatch' }, 409);
  }

  const nextStatus = order.status === 'APPROVED' ? 'APPROVED' : status;
  const now = new Date().toISOString();
  const { error: updateError } = await admin
    .from('toefl_report_orders')
    .update({
      status: nextStatus,
      wompi_transaction_id: transactionId,
      wompi_event: body,
      paid_at: nextStatus === 'APPROVED' ? now : null,
      updated_at: now,
    })
    .eq('id', order.id);
  if (updateError) {
    console.error('[wompi-event] Could not persist transaction:', updateError.message, { reference, transactionId });
    return response({ ok: false, error: 'order_update_failed' }, 503);
  }
  return response({ ok: true });
}
