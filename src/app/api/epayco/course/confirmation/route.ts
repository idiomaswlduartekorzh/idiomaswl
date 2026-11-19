import { epaycoCourseConfigured, reconcileEpaycoCoursePayment, validEpaycoReference } from '@/lib/course-pricing/epayco.server';
import { verifyEpaycoSignature } from '@/lib/course-pricing/epayco';
import { json } from '@/lib/course-pricing/http.server';
export const runtime = 'nodejs';

async function handle(request: Request) {
  if (!epaycoCourseConfigured()) return json({ message: 'Unavailable' }, 503);
  let event: Record<string, unknown>;
  try {
    if (request.method === 'GET') event = Object.fromEntries(new URL(request.url).searchParams);
    else {
      const body = await request.text();
      if (new TextEncoder().encode(body).length > 16384) return json({ message: 'Invalid body' }, 400);
      const type = request.headers.get('content-type') ?? '';
      const value: unknown = type.includes('application/json') ? JSON.parse(body) : type.includes('application/x-www-form-urlencoded') ? Object.fromEntries(new URLSearchParams(body)) : null;
      if (!value || typeof value !== 'object' || Array.isArray(value)) return json({ message: 'Invalid body' }, 400);
      event = value as Record<string, unknown>;
    }
  } catch { return json({ message: 'Invalid body' }, 400); }
  if (!verifyEpaycoSignature(event, process.env.EPAYCO_CUSTOMER_ID!, process.env.EPAYCO_P_KEY!)) return json({ message: 'Invalid signature' }, 401);
  const reference = typeof event.x_ref_payco === 'number' && Number.isSafeInteger(event.x_ref_payco)
    ? String(event.x_ref_payco) : event.x_ref_payco;
  if (typeof reference !== 'string' || !validEpaycoReference(reference)) return json({ message: 'Invalid reference' }, 400);
  try {
    await reconcileEpaycoCoursePayment(reference);
    return json({ received: true });
  } catch (error) {
    console.error('[course-orders] epayco confirmation failed', { code: error instanceof Error ? error.message : 'unknown' });
    return json({ message: 'Retry' }, 503);
  }
}
export const GET = handle;
export const POST = handle;
