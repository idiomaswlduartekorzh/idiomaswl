import 'server-only';

import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { escapeEmailHtml, sendCourseEmail } from '@/lib/course-pricing/email.server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { wompiPrivateAuthorization } from '@/lib/wompi/validation';
import { getXpressOffer, XPRESS_OFFER_VERSION, type XpressMembershipOfferId } from './catalog';
import { activeXpressMembership, queueXpressPaymentReconciliation, reconcileXpressPayment, saveXpressProviderPayment, xpressExamLabel } from './payments.server';
import { parseXpressProviderPayment, type XpressSubscriptionInput } from './payment';
import { buildXpressRecurringTransaction } from './recurring';
import {
  XPRESS_LEGAL_SNAPSHOT,
  XPRESS_PRIVACY_VERSION,
  XPRESS_RECURRING_CONSENT_VERSION,
  XPRESS_TERMS_VERSION,
} from './terms';

export type XpressSubscriptionStatus = 'creating_source' | 'pending_initial' | 'scheduled' | 'active' | 'past_due' | 'cancel_at_period_end' | 'canceled';

type SubscriptionRow = {
  id: string;
  user_id: string;
  purchaser_email: string;
  environment: 'sandbox' | 'production';
  offer_id: XpressMembershipOfferId;
  exam_slug: string;
  amount_in_cents: number;
  status: XpressSubscriptionStatus;
  payment_source_id: string | null;
  payment_source_status: 'AVAILABLE' | 'UNAVAILABLE' | null;
  initial_charge_at: string;
  current_period_start: string | null;
  current_period_end: string | null;
  next_charge_at: string | null;
  payment_failure_count: number;
  last_payment_status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED' | null;
  cancel_requested_at: string | null;
  canceled_at: string | null;
};

type WompiAcceptance = {
  policy: { token: string; permalink: string };
  personalData: { token: string; permalink: string };
};

function safeHttpsUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 800) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch { return null; }
}

export async function getWompiAcceptance(): Promise<WompiAcceptance> {
  const config = getWompiServerConfig();
  const response = await fetch(`${config.apiBaseUrl}/merchants/info`, {
    headers: { Accept: 'application/json', 'x-merchant-public-key': config.publicKey },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('wompi_acceptance_unavailable');
  const raw = await response.json() as Record<string, unknown>;
  const data = raw.data as Record<string, unknown> | undefined;
  const policy = data?.presigned_acceptance as Record<string, unknown> | undefined;
  const personal = data?.presigned_personal_data_auth as Record<string, unknown> | undefined;
  const policyUrl = safeHttpsUrl(policy?.permalink);
  const personalUrl = safeHttpsUrl(personal?.permalink);
  if (typeof policy?.acceptance_token !== 'string' || typeof personal?.acceptance_token !== 'string' || !policyUrl || !personalUrl) {
    throw new Error('wompi_acceptance_invalid');
  }
  return {
    policy: { token: policy.acceptance_token, permalink: policyUrl },
    personalData: { token: personal.acceptance_token, permalink: personalUrl },
  };
}

export async function wompiAcceptanceLinks() {
  const acceptance = await getWompiAcceptance();
  return { policy: acceptance.policy.permalink, personalData: acceptance.personalData.permalink };
}

function sourceTokenMatchesEnvironment(token: string, environment: 'sandbox' | 'production') {
  return token.startsWith(environment === 'sandbox' ? 'tok_test_' : 'tok_prod_');
}

async function createWompiCardSource(input: { token: string; email: string; acceptance: WompiAcceptance }) {
  const config = getWompiServerConfig();
  if (!sourceTokenMatchesEnvironment(input.token, config.environment)) throw new Error('payment_source_environment_mismatch');
  const response = await fetch(`${config.apiBaseUrl}/payment_sources`, {
    method: 'POST',
    headers: { Authorization: wompiPrivateAuthorization(config), Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'CARD', token: input.token, customer_email: input.email,
      acceptance_token: input.acceptance.policy.token,
      accept_personal_auth: input.acceptance.personalData.token,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  });
  const raw = await response.json().catch(() => null) as { data?: Record<string, unknown> } | null;
  const source = raw?.data;
  if (!response.ok || !source || (typeof source.id !== 'number' && typeof source.id !== 'string') || source.type !== 'CARD' || source.status !== 'AVAILABLE') {
    throw new Error(`payment_source_rejected_${response.status}`);
  }
  const id = String(source.id);
  if (!/^[A-Za-z0-9_-]{1,120}$/.test(id)) throw new Error('payment_source_invalid');
  return { id, status: 'AVAILABLE' as const };
}

export async function currentXpressSubscription(userId: string): Promise<SubscriptionRow | null> {
  const config = getWompiServerConfig();
  const db = createAdminClient();
  await db.rpc('finalize_xpress_subscription_cancellations').abortSignal(AbortSignal.timeout(8000));
  const { data, error } = await db.from('xpress_subscriptions')
    .select('id,user_id,purchaser_email,environment,offer_id,exam_slug,amount_in_cents,status,payment_source_id,payment_source_status,initial_charge_at,current_period_start,current_period_end,next_charge_at,payment_failure_count,last_payment_status,cancel_requested_at,canceled_at')
    .eq('user_id', userId).eq('environment', config.environment).neq('status', 'canceled')
    .order('created_at', { ascending: false }).limit(1).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (error) throw new Error('xpress_subscription_lookup_failed');
  return data as SubscriptionRow | null;
}

async function profileAllowsSubscription(userId: string, examSlug: string) {
  const { data, error } = await createAdminClient().from('profiles').select('student_path,target_exam').eq('id', userId).maybeSingle();
  if (error) throw new Error('xpress_profile_lookup_failed');
  return data?.student_path === 'exam' && data.target_exam === examSlug;
}

function legalSnapshot(acceptance: WompiAcceptance) {
  return {
    ...JSON.parse(XPRESS_LEGAL_SNAPSHOT),
    wompiDocuments: {
      endUserPolicy: acceptance.policy.permalink,
      personalDataAuthorization: acceptance.personalData.permalink,
    },
  };
}

export async function prepareXpressSubscription(
  user: { id: string; email?: string | null },
  input: XpressSubscriptionInput,
) {
  const config = getWompiServerConfig();
  if (!user.email || !await profileAllowsSubscription(user.id, input.examSlug)) throw new Error('xpress_exam_mismatch');
  if (process.env.VERCEL_ENV !== 'production' && config.environment === 'production') throw new Error('production_disabled_outside_production');
  const offer = getXpressOffer(input.offerId);
  const active = await activeXpressMembership(user.id);
  if (active && active.exam_slug !== input.examSlug) throw new Error('xpress_exam_mismatch');
  const initialChargeAt = active?.ends_at && new Date(active.ends_at).getTime() > Date.now()
    ? active.ends_at
    : new Date().toISOString();
  const acceptance = await getWompiAcceptance();
  const db = createAdminClient();
  const { data: prepared, error } = await db.rpc('prepare_xpress_subscription', {
    p_user: user.id,
    p_email: user.email.toLowerCase(),
    p_key: input.idempotencyKey,
    p_environment: config.environment,
    p_offer_version: XPRESS_OFFER_VERSION,
    p_offer: offer.id,
    p_exam: input.examSlug,
    p_amount: offer.amountInCents,
    p_initial_charge_at: initialChargeAt,
    p_terms: XPRESS_TERMS_VERSION,
    p_privacy: XPRESS_PRIVACY_VERSION,
    p_recurring: XPRESS_RECURRING_CONSENT_VERSION,
    p_legal: legalSnapshot(acceptance),
  }).abortSignal(AbortSignal.timeout(10000));
  if (error || !prepared) {
    if (error?.message?.includes('xpress_subscription_exists')) throw new Error('xpress_subscription_exists');
    throw new Error('xpress_subscription_storage_unavailable');
  }
  let subscription = prepared as SubscriptionRow;
  if (subscription.status === 'canceled') throw new Error('xpress_subscription_canceled');
  if (!subscription.payment_source_id) {
    const source = await createWompiCardSource({ token: input.paymentSourceToken, email: user.email.toLowerCase(), acceptance });
    const { data: attached, error: attachError } = await db.rpc('attach_xpress_subscription_source', {
      p_subscription: subscription.id,
      p_user: user.id,
      p_environment: config.environment,
      p_source_id: source.id,
      p_source_status: source.status,
    }).abortSignal(AbortSignal.timeout(10000));
    if (attachError || !attached) throw new Error('xpress_subscription_source_storage_failed');
    subscription = attached as SubscriptionRow;
  }
  if (subscription.status === 'scheduled') return { subscription, order: null, transactionStatus: null };
  const charge = await dispatchXpressSubscriptionCharge(subscription);
  return { subscription, ...charge };
}

async function subscriptionOrder(subscriptionId: string) {
  const { data, error } = await createAdminClient().rpc('prepare_xpress_subscription_charge', { p_subscription: subscriptionId })
    .abortSignal(AbortSignal.timeout(10000));
  if (error) throw new Error('xpress_subscription_order_failed');
  return data as Record<string, unknown> | null;
}

export async function dispatchXpressSubscriptionCharge(subscription: SubscriptionRow, leaseId?: string) {
  const db = createAdminClient();
  const order = await subscriptionOrder(subscription.id);
  if (!order) {
    if (leaseId) await db.rpc('release_xpress_subscription_lease', { p_subscription: subscription.id, p_lease: leaseId, p_next: null });
    return { order: null, transactionStatus: null };
  }
  const { data: mayDispatch, error: dispatchError } = await db.rpc('start_xpress_recurring_charge', { p_order: order.id })
    .abortSignal(AbortSignal.timeout(10000));
  if (dispatchError) throw new Error('xpress_subscription_dispatch_lock_failed');
  if (mayDispatch !== true) {
    if (leaseId) await db.rpc('release_xpress_subscription_lease', { p_subscription: subscription.id, p_lease: leaseId, p_next: null });
    return { order, transactionStatus: 'PENDING' as const };
  }
  const config = getWompiServerConfig();
  let providerRejected = false;
  try {
    const acceptance = await getWompiAcceptance();
    const paymentSourceId = Number(subscription.payment_source_id);
    if (!Number.isSafeInteger(paymentSourceId) || paymentSourceId <= 0) throw new Error('payment_source_invalid');
    const amount = Number(order.amount_in_cents);
    const reference = String(order.reference);
    const response = await fetch(`${config.apiBaseUrl}/transactions`, {
      method: 'POST',
      headers: { Authorization: wompiPrivateAuthorization(config), Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(buildXpressRecurringTransaction({
        amountInCents: amount,
        reference,
        email: subscription.purchaser_email,
        paymentSourceId,
        integritySecret: config.integritySecret,
        acceptanceToken: acceptance.policy.token,
        personalDataToken: acceptance.personalData.token,
      })),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    const raw = await response.json().catch(() => null) as { data?: unknown } | null;
    const payment = parseXpressProviderPayment(raw?.data);
    if (!response.ok) {
      providerRejected = response.status >= 400 && response.status < 500;
      throw new Error(`wompi_recurring_charge_${response.status}`);
    }
    if (!payment || payment.reference !== reference) throw new Error('wompi_recurring_charge_invalid_response');
    await saveXpressProviderPayment(payment);
    await queueXpressPaymentReconciliation(payment.reference, payment.id);
    try { await reconcileXpressPayment(payment.id, String(order.id)); } catch {}
    if (leaseId) await db.rpc('release_xpress_subscription_lease', { p_subscription: subscription.id, p_lease: leaseId, p_next: null });
    return { order, transactionStatus: payment.status };
  } catch (error) {
    const code = error instanceof Error ? error.message : 'recurring_charge_failed';
    await db.rpc('record_xpress_recurring_dispatch_failure', { p_order: order.id, p_definite: providerRejected, p_error: code.slice(0, 300) });
    if (leaseId) await db.rpc('release_xpress_subscription_lease', {
      p_subscription: subscription.id,
      p_lease: leaseId,
      p_next: null,
    });
    throw error;
  }
}

export async function cancelXpressSubscription(subscriptionId: string, userId: string) {
  const config = getWompiServerConfig();
  const { data, error } = await createAdminClient().rpc('cancel_xpress_subscription', {
    p_subscription: subscriptionId, p_user: userId, p_environment: config.environment,
  }).abortSignal(AbortSignal.timeout(10000));
  if (error || !data) throw new Error('xpress_subscription_cancel_failed');
  await deliverXpressSubscriptionNotifications(10);
  return data as SubscriptionRow;
}

export async function reactivateXpressSubscription(subscriptionId: string, userId: string) {
  const config = getWompiServerConfig();
  const { data, error } = await createAdminClient().rpc('reactivate_xpress_subscription', {
    p_subscription: subscriptionId, p_user: userId, p_environment: config.environment,
  }).abortSignal(AbortSignal.timeout(10000));
  if (error || !data) throw new Error('xpress_subscription_reactivate_failed');
  return data as SubscriptionRow;
}

async function finishNotification(id: string, lease: string, success: boolean, error?: unknown) {
  const { data, error: rpcError } = await createAdminClient().rpc('finish_xpress_subscription_notification', {
    p_notification: id, p_lease: lease, p_success: success,
    p_error: success ? null : error instanceof Error ? error.message : String(error ?? 'failed'),
  });
  if (rpcError || data !== true) throw new Error('xpress_subscription_notification_finish_failed');
}

async function sendSubscriptionNotification(job: Record<string, unknown>) {
  const db = createAdminClient();
  const { data: subscription, error } = await db.from('xpress_subscriptions').select('*').eq('id', job.subscription_id).maybeSingle();
  if (error || !subscription) throw new Error('xpress_subscription_notification_missing');
  const exam = xpressExamLabel(subscription.exam_slug);
  const offer = getXpressOffer(subscription.offer_id);
  const end = subscription.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' })
    : null;
  if (job.kind === 'cancellation_confirmed') {
    await sendCourseEmail({
      to: subscription.purchaser_email,
      subject: 'Cancelamos la renovación de tu suscripción Xpress',
      idempotencyKey: `xpress-subscription-notification/${job.id}`,
      html: `<h1>Renovación cancelada</h1><p>Cancelamos los cobros automáticos de <strong>${escapeEmailHtml(offer.name)}</strong> para <strong>${escapeEmailHtml(exam)}</strong>.</p>${end ? `<p>Tu acceso ya pagado continúa hasta el <strong>${escapeEmailHtml(end)}</strong>.</p>` : '<p>No se harán nuevos cobros.</p>'}<p><a href="https://www.idiomaswl.com/suscripcion/examenes">Administrar mi suscripción</a></p>`,
    });
    return;
  }
  await sendCourseEmail({
    to: subscription.purchaser_email,
    subject: 'No pudimos renovar tu suscripción Xpress',
    idempotencyKey: `xpress-subscription-notification/${job.id}`,
    html: `<h1>El cobro no fue aprobado</h1><p>No pudimos cobrar la renovación de <strong>${escapeEmailHtml(offer.name)}</strong> para <strong>${escapeEmailHtml(exam)}</strong>.</p><p>No haremos un cobro duplicado. Intentaremos nuevamente de forma controlada; después de tres intentos la suscripción quedará suspendida.</p><p><a href="https://www.idiomaswl.com/suscripcion/examenes">Revisar mi suscripción</a></p>`,
  });
}

export async function deliverXpressSubscriptionNotifications(limit = 20) {
  const db = createAdminClient();
  const now = new Date().toISOString();
  const stale = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const [retryable, abandoned] = await Promise.all([
    db.from('xpress_subscription_notifications').select('*').in('status', ['pending', 'failed']).lte('next_attempt_at', now)
      .order('next_attempt_at', { ascending: true }).limit(limit).abortSignal(AbortSignal.timeout(10000)),
    db.from('xpress_subscription_notifications').select('*').eq('status', 'processing').lt('updated_at', stale)
      .order('updated_at', { ascending: true }).limit(limit).abortSignal(AbortSignal.timeout(10000)),
  ]);
  if (retryable.error || abandoned.error) throw new Error('xpress_subscription_notification_lookup_failed');
  const data = [...new Map([...(retryable.data ?? []), ...(abandoned.data ?? [])].map((job) => [String(job.id), job])).values()].slice(0, limit);
  let completed = 0;
  let pending = 0;
  for (const job of data ?? []) {
    const lease = randomUUID();
    const { data: claimed } = await db.rpc('claim_xpress_subscription_notification', { p_notification: job.id, p_lease: lease });
    if (claimed !== true) continue;
    try { await sendSubscriptionNotification(job); await finishNotification(job.id, lease, true); completed += 1; }
    catch (jobError) { try { await finishNotification(job.id, lease, false, jobError); } catch {} pending += 1; }
  }
  return { checked: (data ?? []).length, completed, pending };
}

export async function processDueXpressSubscriptions(limit = 10) {
  const db = createAdminClient();
  await db.rpc('finalize_xpress_subscription_cancellations').abortSignal(AbortSignal.timeout(8000));
  const lease = randomUUID();
  const { data, error } = await db.rpc('claim_due_xpress_subscriptions', { p_lease: lease, p_limit: limit })
    .abortSignal(AbortSignal.timeout(10000));
  if (error) throw new Error('xpress_subscription_claim_failed');
  const subscriptions = (data ?? []) as SubscriptionRow[];
  let submitted = 0;
  let pending = 0;
  for (const subscription of subscriptions) {
    try {
      const result = await dispatchXpressSubscriptionCharge(subscription, lease);
      if (result.order) submitted += 1;
    } catch { pending += 1; }
    finally {
      try { await db.rpc('release_xpress_subscription_lease', { p_subscription: subscription.id, p_lease: lease, p_next: null }); } catch {}
    }
  }
  const notifications = await deliverXpressSubscriptionNotifications(limit * 2);
  return { checked: subscriptions.length, submitted, pending, notifications };
}
