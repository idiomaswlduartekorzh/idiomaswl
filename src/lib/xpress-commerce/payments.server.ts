import 'server-only';
import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { createWompiIntegritySignature } from '@/lib/wompi/security';
import { wompiPrivateAuthorization } from '@/lib/wompi/validation';
import { XPRESS_EXAM_OPTIONS } from '@/lib/student-onboarding/catalog';
import { quoteXpressPurchase, XPRESS_OFFER_VERSION, type XpressOfferId } from './catalog';
import { fulfillPaidXpressOrder } from './fulfillment.server';
import { parseXpressProviderPayment, type XpressOrderInput } from './payment';
import { XPRESS_LEGAL_SNAPSHOT, XPRESS_PRIVACY_VERSION, XPRESS_TERMS_VERSION } from './terms';

type MembershipRow = {
  id: string;
  exam_slug: string;
  offer_id: XpressOfferId;
  starts_at: string;
  ends_at: string;
};

export async function xpressUser() {
  const { createClient } = await import('@/lib/supabase/server');
  const { data: { user }, error } = await (await createClient()).auth.getUser();
  return !error && user?.email_confirmed_at && user.email ? user : null;
}

export async function activeXpressMembership(userId: string): Promise<MembershipRow | null> {
  const config = getWompiServerConfig();
  const { data, error } = await createAdminClient().from('xpress_memberships')
    .select('id,exam_slug,offer_id,starts_at,ends_at')
    .eq('user_id', userId).eq('environment', config.environment).eq('status', 'active')
    .gt('ends_at', new Date().toISOString()).order('ends_at', { ascending: false })
    .abortSignal(AbortSignal.timeout(8000));
  if (error) throw new Error('xpress_membership_lookup_failed');
  const memberships = (data ?? []) as MembershipRow[];
  return memberships.find((item) => item.offer_id === 'exam-teacher') ?? memberships[0] ?? null;
}

export async function prepareXpressOrder(user: NonNullable<Awaited<ReturnType<typeof xpressUser>>>, input: XpressOrderInput) {
  const config = getWompiServerConfig();
  if (process.env.VERCEL_ENV !== 'production' && config.environment === 'production') throw new Error('production_disabled_outside_production');
  const { data: profile, error: profileError } = await createAdminClient().from('profiles')
    .select('student_path,target_exam').eq('id', user.id).maybeSingle();
  if (profileError) throw new Error('xpress_profile_lookup_failed');
  if (profile?.student_path !== 'exam' || profile.target_exam !== input.examSlug) throw new Error('xpress_exam_mismatch');

  const active = await activeXpressMembership(user.id);
  const quote = quoteXpressPurchase({
    requestedOfferId: input.offerId,
    requestedExamSlug: input.examSlug,
    activeMembership: active ? { offerId: active.offer_id, examSlug: active.exam_slug } : undefined,
  });
  if (quote.action === 'already-included') throw new Error('xpress_already_included');
  if (quote.action === 'schedule-change') throw new Error('xpress_change_next_period');

  const coverageEndsAt = quote.reason === 'membership-upgrade' ? active?.ends_at ?? null : null;
  const orderKind = quote.reason === 'membership-upgrade' ? 'upgrade' : 'new';
  const { data, error } = await createAdminClient().rpc('prepare_xpress_order', {
    p_user: user.id,
    p_email: user.email!.toLowerCase(),
    p_key: input.idempotencyKey,
    p_environment: config.environment,
    p_offer_version: XPRESS_OFFER_VERSION,
    p_offer: quote.offer.id,
    p_exam: quote.examSlug,
    p_kind: orderKind,
    p_credit: quote.creditInCents,
    p_amount: quote.amountInCents,
    p_coverage_ends: coverageEndsAt,
    p_terms: XPRESS_TERMS_VERSION,
    p_privacy: XPRESS_PRIVACY_VERSION,
    p_legal: JSON.parse(XPRESS_LEGAL_SNAPSHOT),
  }).abortSignal(AbortSignal.timeout(10000));
  if (error || !data) {
    const code = error?.message?.includes('xpress_order_pending') ? 'xpress_order_pending' : 'xpress_order_storage_unavailable';
    throw new Error(code);
  }
  return data;
}

export async function ownedXpressOrder(id: string, userId: string) {
  const { data, error } = await createAdminClient().from('xpress_orders').select('*').eq('id', id).eq('user_id', userId)
    .abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (error) throw new Error('xpress_order_storage_unavailable');
  return data;
}

export async function xpressOrderState(orderId: string) {
  const db = createAdminClient();
  const [payments, membership, jobs] = await Promise.all([
    db.from('xpress_payment_transactions').select('provider_id,status').eq('order_id', orderId).abortSignal(AbortSignal.timeout(8000)),
    db.from('xpress_memberships').select('id,starts_at,ends_at,status,offer_id,exam_slug').eq('source_order_id', orderId).abortSignal(AbortSignal.timeout(8000)).maybeSingle(),
    db.from('xpress_fulfillment_jobs').select('kind,status').eq('order_id', orderId).abortSignal(AbortSignal.timeout(8000)),
  ]);
  if (payments.error || membership.error || jobs.error) throw new Error('xpress_order_storage_unavailable');
  const approved = payments.data.filter((item: { status: string }) => item.status === 'APPROVED');
  const status = jobs.data.some((item: { kind: string }) => item.kind === 'financial_review') ? 'review'
    : approved.length && membership.data ? 'paid'
      : payments.data.some((item: { status: string }) => item.status === 'PENDING') ? 'pending'
        : payments.data.length ? 'not_completed' : 'created';
  return { status, payments: payments.data, membership: membership.data };
}

export async function checkoutForXpressOrder(order: Record<string, unknown>, origin: string) {
  const config = getWompiServerConfig();
  if (config.environment !== order.environment || (process.env.VERCEL_ENV !== 'production' && config.environment === 'production')) throw new Error('environment_mismatch');
  if (order.terms_version !== XPRESS_TERMS_VERSION) throw new Error('terms_unavailable');
  const state = await xpressOrderState(String(order.id));
  if (['paid', 'review', 'pending'].includes(state.status)) return { status: state.status };
  const expirationTime = new Date(String(order.expires_at)).toISOString();
  if (new Date(expirationTime).getTime() <= Date.now()) return { status: 'expired' };
  const reference = String(order.reference);
  const amountInCents = Number(order.amount_in_cents);
  const integrity = createWompiIntegritySignature({ reference, amountInCents, currency: 'COP', expirationTime, integritySecret: config.integritySecret });
  const url = new URL('https://checkout.wompi.co/p/');
  url.search = new URLSearchParams({
    'public-key': config.publicKey,
    currency: 'COP',
    'amount-in-cents': String(amountInCents),
    reference,
    'signature:integrity': integrity,
    'expiration-time': expirationTime,
    'redirect-url': new URL(`/suscripcion/examenes?orden=${String(order.id)}`, origin).href,
  }).toString();
  return { status: 'ready', checkoutUrl: url.href };
}

export async function queueXpressPaymentReconciliation(reference: string, transactionId: string) {
  if (!/^WX-[0-9a-f-]{36}$/.test(reference) || !/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) return null;
  const config = getWompiServerConfig();
  const { data, error } = await createAdminClient().rpc('queue_xpress_payment_reconciliation', {
    p_reference: reference,
    p_environment: config.environment,
    p_provider_id: transactionId,
  }).abortSignal(AbortSignal.timeout(10000));
  if (error) throw new Error('xpress_payment_queue_unavailable');
  return typeof data === 'string' ? data : null;
}

async function finishXpressPaymentReconciliation(transactionId: string, success: boolean, error?: unknown) {
  const config = getWompiServerConfig();
  const message = error instanceof Error ? error.message : String(error ?? 'failed');
  const { error: rpcError } = await createAdminClient().rpc('finish_xpress_payment_reconciliation', {
    p_environment: config.environment,
    p_provider_id: transactionId,
    p_success: success,
    p_error: success ? null : message,
  }).abortSignal(AbortSignal.timeout(10000));
  if (rpcError) throw new Error('xpress_payment_queue_unavailable');
}

export async function reconcileXpressPayment(transactionId: string, expectedOrderId?: string) {
  if (!/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) throw new Error('invalid_transaction');
  const config = getWompiServerConfig();
  if (expectedOrderId) await queueXpressPaymentReconciliation(`WX-${expectedOrderId}`, transactionId);
  let orderId: string;
  try {
    const response = await fetch(`${config.apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}`, {
      headers: { Authorization: wompiPrivateAuthorization(config), Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('provider_unavailable');
    const raw = await response.json();
    const payment = parseXpressProviderPayment(raw.data);
    if (!payment || payment.id !== transactionId) throw new Error('invalid_provider_payment');
    if (expectedOrderId && payment.reference !== `WX-${expectedOrderId}`) throw new Error('payment_order_mismatch');
    const { data, error } = await createAdminClient().rpc('record_xpress_payment', {
      p_reference: payment.reference,
      p_environment: config.environment,
      p_provider_id: payment.id,
      p_amount: payment.amount_in_cents,
      p_currency: payment.currency,
      p_status: payment.status,
      p_observed: new Date().toISOString(),
      p_fingerprint: createHash('sha256').update(JSON.stringify([config.environment, payment])).digest('hex'),
    }).abortSignal(AbortSignal.timeout(10000));
    if (error || !data) throw new Error('xpress_payment_storage_unavailable');
    orderId = data as string;
    await finishXpressPaymentReconciliation(transactionId, true);
  } catch (error) {
    try { await finishXpressPaymentReconciliation(transactionId, false, error); } catch {}
    throw error;
  }
  await fulfillPaidXpressOrder(orderId);
  return orderId;
}

export async function recoverXpressPayments(limit = 10) {
  const db = createAdminClient();
  const now = new Date().toISOString();
  const { data: queued, error } = await db.from('xpress_payment_reconciliation_queue')
    .select('provider_id,order_id').in('status', ['pending', 'failed']).lte('next_attempt_at', now)
    .order('next_attempt_at', { ascending: true }).limit(limit).abortSignal(AbortSignal.timeout(10000));
  if (error) throw new Error('xpress_payment_queue_unavailable');
  let paymentsRecovered = 0;
  let paymentsPending = 0;
  for (const item of queued ?? []) {
    try { await reconcileXpressPayment(String(item.provider_id), String(item.order_id)); paymentsRecovered += 1; }
    catch { paymentsPending += 1; }
  }

  const [retryable, stale] = await Promise.all([
    db.from('xpress_fulfillment_jobs').select('order_id').in('kind', ['student_receipt', 'owner_notification'])
      .in('status', ['pending', 'failed']).lte('next_attempt_at', now).limit(limit).abortSignal(AbortSignal.timeout(10000)),
    db.from('xpress_fulfillment_jobs').select('order_id').in('kind', ['student_receipt', 'owner_notification'])
      .eq('status', 'processing').lt('updated_at', new Date(Date.now() - 5 * 60 * 1000).toISOString()).limit(limit).abortSignal(AbortSignal.timeout(10000)),
  ]);
  if (retryable.error || stale.error) throw new Error('xpress_job_lookup_failed');
  const orderIds = [...new Set([...(retryable.data ?? []), ...(stale.data ?? [])].map((item) => String(item.order_id)))].slice(0, limit);
  let fulfillmentsRecovered = 0;
  let fulfillmentsPending = 0;
  for (const orderId of orderIds) {
    try { await fulfillPaidXpressOrder(orderId); fulfillmentsRecovered += 1; }
    catch { fulfillmentsPending += 1; }
  }
  return { paymentsChecked: (queued ?? []).length, paymentsRecovered, paymentsPending, fulfillmentsChecked: orderIds.length, fulfillmentsRecovered, fulfillmentsPending };
}

export function xpressExamLabel(examSlug: string) {
  return XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug)?.label ?? examSlug;
}
