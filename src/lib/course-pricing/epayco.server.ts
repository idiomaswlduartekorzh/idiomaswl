import 'server-only';
import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { TERMS_VERSION } from './terms';
import { courseSalesEnabled } from './release';
import { epaycoLedgerId, parseEpaycoPayment, rawEpaycoReference, type EpaycoEnvironment } from './epayco';
import { courseOrderState, finishPaymentReconciliation } from './payments.server';
import { fulfillPaidCourseOrder } from './fulfillment.server';

const allowedTerms = [TERMS_VERSION, 'course-20261031-v4', 'course-20261031-v3', 'course-20260912-v2', 'course-20260907-v1'];

type Config = { publicKey: string; privateKey: string; customerId: string; pKey: string; environment: EpaycoEnvironment };

export function epaycoCourseConfigured(): boolean {
  const credentialsPresent = !!process.env.EPAYCO_PUBLIC_KEY && !!process.env.EPAYCO_PRIVATE_KEY
    && !!process.env.EPAYCO_CUSTOMER_ID && !!process.env.EPAYCO_P_KEY
    && (process.env.EPAYCO_ENVIRONMENT === 'sandbox' || process.env.EPAYCO_ENVIRONMENT === 'production')
    && (process.env.VERCEL_ENV === 'production' || process.env.EPAYCO_ENVIRONMENT === 'sandbox');
  if (!credentialsPresent) return false;
  try { return getWompiServerConfig().environment === process.env.EPAYCO_ENVIRONMENT; }
  catch { return false; }
}

export function epaycoCourseAvailable(): boolean {
  return courseSalesEnabled() && process.env.EPAYCO_COURSE_ENABLED === 'true' && epaycoCourseConfigured();
}

function config(): Config {
  // Keep confirmations and recovery working after the checkout is turned off.
  if (!epaycoCourseConfigured()) throw new Error('epayco_unavailable');
  const environment = process.env.EPAYCO_ENVIRONMENT as EpaycoEnvironment;
  return {
    publicKey: process.env.EPAYCO_PUBLIC_KEY!, privateKey: process.env.EPAYCO_PRIVATE_KEY!,
    customerId: process.env.EPAYCO_CUSTOMER_ID!, pKey: process.env.EPAYCO_P_KEY!, environment,
  };
}

async function providerJson(url: string, init: RequestInit): Promise<Record<string, unknown>> {
  const response = await fetch(url, { ...init, cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('epayco_provider_unavailable');
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('epayco_provider_unavailable');
  return data as Record<string, unknown>;
}

export async function createEpaycoCourseSession(order: Record<string, unknown>, origin: string) {
  const cfg = config();
  if (order.environment !== cfg.environment || !allowedTerms.includes(String(order.terms_version))) throw new Error('environment_mismatch');
  const state = await courseOrderState(String(order.id));
  if (state.status === 'paid' || state.status === 'pending' || state.status === 'review') return { status: state.status };
  if (new Date(String(order.expires_at)).getTime() <= Date.now()) return { status: 'expired' };
  const amountInCents = Number(order.amount_in_cents);
  if (!Number.isSafeInteger(amountInCents) || amountInCents <= 0 || amountInCents % 100 !== 0) throw new Error('invalid_course_amount');
  const login = await providerJson('https://apify.epayco.co/login', {
    method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${cfg.publicKey}:${cfg.privateKey}`).toString('base64')}`, Accept: 'application/json' },
  });
  const token = typeof login.token === 'string' ? login.token : null;
  if (!token) throw new Error('epayco_auth_unavailable');
  const response = new URL(`/api/epayco/course/response/${String(order.id)}`, origin).href;
  const confirmation = new URL('/api/epayco/course/confirmation', origin).href;
  const session = await providerJson('https://apify.epayco.co/payment/session/create', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ checkout_version: '2', name: 'Curso WeLearn', currency: 'COP', amount: amountInCents / 100,
      description: 'Inscripción a curso WeLearn', lang: 'ES', country: 'CO',
      invoice: String(order.reference), response, confirmation, method: 'GET' }),
  });
  if (session.success !== true) throw new Error('epayco_session_unavailable');
  const data = session.data && typeof session.data === 'object' && !Array.isArray(session.data) ? session.data as Record<string, unknown> : null;
  const sessionId = typeof data?.sessionId === 'string' ? data.sessionId : null;
  if (!sessionId || !/^[A-Za-z0-9_-]{8,200}$/.test(sessionId)) throw new Error('epayco_session_unavailable');
  return { status: 'ready', sessionId, test: cfg.environment === 'sandbox' };
}

/** The redirect and webhook only identify a candidate. ePayco's signed validation response is authoritative. */
export async function reconcileEpaycoCoursePayment(providerReference: string, expectedOrderId?: string) {
  const cfg = config();
  const ledgerId = epaycoLedgerId(providerReference);
  const raw = await providerJson(`https://secure.epayco.co/validation/v1/reference/${encodeURIComponent(providerReference)}`, { headers: { Accept: 'application/json' } });
  if (raw.success !== true && raw.status !== true) throw new Error('epayco_reference_unavailable');
  const payment = parseEpaycoPayment(raw.data, cfg.customerId, cfg.pKey);
  if (!payment || payment.providerReference !== providerReference || payment.environment !== cfg.environment) throw new Error('invalid_provider_payment');
  if (expectedOrderId && payment.reference !== `WC-${expectedOrderId}`) throw new Error('payment_order_mismatch');
  const { data: queued, error: queueError } = await createAdminClient().rpc('queue_course_payment_reconciliation', {
    p_reference: payment.reference, p_environment: cfg.environment, p_provider_id: ledgerId,
  }).abortSignal(AbortSignal.timeout(10000));
  if (queueError || !queued) throw new Error('payment_queue_unavailable');
  try {
    const { data, error } = await createAdminClient().rpc('record_course_payment', {
      p_reference: payment.reference, p_environment: cfg.environment, p_provider_id: ledgerId,
      p_amount: payment.amountInCents, p_currency: payment.currency, p_status: payment.status,
      p_observed: new Date().toISOString(),
      p_fingerprint: createHash('sha256').update(JSON.stringify([cfg.environment, payment])).digest('hex'),
    }).abortSignal(AbortSignal.timeout(10000));
    if (error || !data) throw new Error('payment_storage_unavailable');
    await finishPaymentReconciliation(ledgerId, true);
    await fulfillPaidCourseOrder(String(data));
    return String(data);
  } catch (error) {
    try { await finishPaymentReconciliation(ledgerId, false, error); } catch {}
    throw error;
  }
}

export function validEpaycoReference(value: string): boolean {
  try { return rawEpaycoReference(epaycoLedgerId(value)) === value; } catch { return false; }
}
