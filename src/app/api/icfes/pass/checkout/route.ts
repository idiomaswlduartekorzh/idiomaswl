import { createHash, randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { createWompiIntegritySignature } from '@/lib/wompi/security';
import { getIcfesPremiumAvailability } from '@/lib/icfes/exam-registry.server';
import { icfesAttemptCookieName, verifyIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';
import { getIcfesProductConfig, isIcfesPassEnabled } from '@/lib/icfes/product-config.server';
import { ICFES_ATTEMPT_ID_PATTERN, type IcfesCheckoutDto, type IcfesPaymentStatus } from '@/lib/icfes/attempt-contract';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import { xpressOfferIncludes } from '@/lib/xpress-commerce/catalog';
import { claimIcfesAttemptForUser, IcfesAttemptClaimError } from '@/lib/icfes/attempt-ownership.server';

export const runtime = 'nodejs';

function json(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('cache-control', 'private, no-store, max-age=0');
  return response;
}

export async function POST(request: Request): Promise<Response> {
  if (!isIcfesPassEnabled()) return json({ ok: false, error: 'El Pase ICFES todavía no está habilitado.' }, 503);
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return json({ ok: false, error: 'Solicitud inválida.' }, 400); }
  const attemptId = typeof body.attemptId === 'string' ? body.attemptId : '';
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) return json({ ok: false, error: 'El intento no está autorizado.' }, 403);
  const token = (await cookies()).get(icfesAttemptCookieName(attemptId))?.value;
  const payload = verifyIcfesAttemptToken(token);
  if (!payload || payload.attemptId !== attemptId) return json({ ok: false, error: 'El intento no está autorizado.' }, 403);
  const availability = getIcfesPremiumAvailability(payload.examId);
  if (!availability.eligible) return json({ ok: false, error: availability.reason ?? 'Este recurso no admite detalle premium.' }, 403);

  const config = getIcfesProductConfig();
  const admin = createAdminClient();
  const { data: { user } } = await (await createClient()).auth.getUser();
  const tokenHash = createHash('sha256').update(token!, 'utf8').digest('hex');
  const { data: attempt } = await admin.from('icfes_attempts')
    .select('id, exam_id, user_id, access_token_hash').eq('id', attemptId).maybeSingle();
  if (!attempt || attempt.exam_id !== payload.examId || attempt.access_token_hash !== tokenHash
    || (attempt.user_id && attempt.user_id !== user?.id)) return json({ ok: false, error: 'El intento guardado no coincide con tu sesión.' }, 403);

  let ownedByUser = Boolean(user && attempt.user_id === user.id);
  if (user) {
    try {
      await claimIcfesAttemptForUser({ attemptId, token, userId: user.id });
      ownedByUser = true;
    } catch (error) {
      const status = error instanceof IcfesAttemptClaimError && error.code === 'UNAVAILABLE' ? 503 : 403;
      return json({ ok: false, error: 'No pudimos asociar el intento con tu cuenta.' }, status);
    }
  }

  const resultUrl = `${config.origin}/practica/icfes-saber-11/resultados/${attemptId}`;
  if (ownedByUser && user) {
    try {
      const membership = await activeXpressMembership(user.id);
      if (membership?.exam_slug === 'icfes' && xpressOfferIncludes(membership.offer_id, 'question-review')) {
        const included: IcfesCheckoutDto = {
          ok: true,
          paymentStatus: 'APPROVED',
          amountInCents: 0,
          currency: 'COP',
          checkoutUrl: null,
          resultUrl,
        };
        return json(included);
      }
    } catch {
      return json({ ok: false, error: 'No pudimos verificar si tu membresía ya incluye este detalle.' }, 503);
    }
  }

  const select = 'id, attempt_id, reference, amount_in_cents, currency, status, environment';
  const { data: existing } = await admin.from('icfes_pass_orders').select(select)
    .eq('attempt_id', attemptId).in('status', ['PENDING', 'APPROVED']).order('created_at', { ascending: false }).limit(1).maybeSingle();
  let order = existing;
  if (!order) {
    const reference = `WL-ICFES-${attemptId}-${randomUUID().replaceAll('-', '').slice(0, 8)}`;
    const inserted = await admin.from('icfes_pass_orders').insert({
      attempt_id: attemptId, user_id: user?.id ?? null, reference,
      amount_in_cents: config.amountInCents, currency: config.currency,
      status: 'PENDING', environment: config.environment,
    }).select(select).single();
    if (inserted.error || !inserted.data) {
      // Two clicks can race against the partial unique index. Recover the one
      // valid open order instead of creating a second charge or showing a false failure.
      const { data: racedOrder } = await admin.from('icfes_pass_orders').select(select)
        .eq('attempt_id', attemptId).in('status', ['PENDING', 'APPROVED'])
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (!racedOrder) return json({ ok: false, error: 'No pudimos preparar el pago.' }, 503);
      order = racedOrder;
    } else {
      order = inserted.data;
    }
  }
  if (Number(order.amount_in_cents) !== config.amountInCents || order.environment !== config.environment) {
    return json({ ok: false, error: 'El precio o ambiente del pago no coincide.' }, 409);
  }
  let checkoutUrl: string | null = null;
  if (order.status !== 'APPROVED') {
    const url = new URL('https://checkout.wompi.co/p/');
    url.searchParams.set('public-key', config.publicKey);
    url.searchParams.set('currency', config.currency);
    url.searchParams.set('amount-in-cents', String(config.amountInCents));
    url.searchParams.set('reference', order.reference);
    url.searchParams.set('signature:integrity', createWompiIntegritySignature({
      reference: order.reference, amountInCents: config.amountInCents,
      currency: config.currency, integritySecret: config.integritySecret,
    }));
    url.searchParams.set('redirect-url', resultUrl);
    checkoutUrl = url.toString();
  }
  const response: IcfesCheckoutDto = {
    ok: true, paymentStatus: order.status as IcfesPaymentStatus,
    amountInCents: config.amountInCents, currency: 'COP', checkoutUrl, resultUrl,
  };
  return json(response);
}
