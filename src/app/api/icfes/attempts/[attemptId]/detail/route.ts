import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { ICFES_ATTEMPT_ID_PATTERN, type IcfesBasicResultDto, type IcfesPaymentStatus, type IcfesPremiumDetailDto } from '@/lib/icfes/attempt-contract';
import { icfesAttemptCookieName, verifyIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';
import { buildPremiumQuestions } from '@/lib/icfes/grading.server';
import { getIcfesPaidExam, getIcfesPremiumAvailability } from '@/lib/icfes/exam-registry.server';
import { ICFES_PASS_AMOUNT_IN_CENTS, isIcfesPersistenceEnabled } from '@/lib/icfes/product-config.server';
import { ICFES_DETAIL_OFFER_ID, getIcfesCommerceOffer } from '@/lib/icfes/commerce-v1';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import { xpressOfferIncludes } from '@/lib/xpress-commerce/catalog';

export const runtime = 'nodejs';
const headers = {
  'cache-control': 'private, no-store, max-age=0',
  'referrer-policy': 'no-referrer',
  'x-robots-tag': 'noindex, nofollow, noarchive',
};

export async function GET(_request: Request, context: { params: Promise<{ attemptId: string }> }): Promise<Response> {
  const { attemptId } = await context.params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId) || !isIcfesPersistenceEnabled()) {
    return Response.json({ ok: false, error: 'Resultado no disponible.' }, { status: 404, headers });
  }
  const admin = createAdminClient();
  const { data: { user } } = await (await createClient()).auth.getUser();
  const token = (await cookies()).get(icfesAttemptCookieName(attemptId))?.value;
  const payload = verifyIcfesAttemptToken(token);
  const { data: attempt } = await admin.from('icfes_attempts').select('id, exam_id, user_id, access_token_hash, answers, basic_result')
    .eq('id', attemptId).maybeSingle();
  if (!attempt) {
    return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  }
  const capabilityMatches = Boolean(
    token
    && payload?.attemptId === attemptId
    && attempt.access_token_hash === createHash('sha256').update(token, 'utf8').digest('hex'),
  );
  const userOwnsAttempt = Boolean(user && attempt.user_id === user.id);
  if (!capabilityMatches && !userOwnsAttempt) {
    return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  }
  const availability = getIcfesPremiumAvailability(attempt.exam_id);
  if (!availability.eligible || !getIcfesPaidExam(attempt.exam_id)) {
    return Response.json({ ok: false, error: availability.reason ?? 'Detalle premium no disponible.' }, { status: 403, headers });
  }
  let membership: Awaited<ReturnType<typeof activeXpressMembership>> = null;
  if (userOwnsAttempt && user) {
    try {
      const active = await activeXpressMembership(user.id);
      if (active?.exam_slug === 'icfes' && xpressOfferIncludes(active.offer_id, 'question-review')) membership = active;
    } catch { /* A valid one-time entitlement remains usable if membership lookup is unavailable. */ }
  }
  if (membership) {
    const offer = getIcfesCommerceOffer(membership.offer_id);
    return Response.json({
      ok: true,
      paymentStatus: 'APPROVED',
      amountInCents: offer.amountInCents,
      currency: 'COP',
      productCode: membership.offer_id,
      result: attempt.basic_result as IcfesBasicResultDto,
      questions: buildPremiumQuestions(attempt.exam_id, attempt.answers) ?? [],
    } satisfies IcfesPremiumDetailDto, { headers });
  }
  const { data: order } = await admin.from('icfes_pass_orders').select('id, status, amount_in_cents, currency')
    .eq('attempt_id', attemptId).order('created_at', { ascending: false }).limit(1).maybeSingle();
  const status = (order?.status ?? 'ERROR') as IcfesPaymentStatus;
  const base: IcfesPremiumDetailDto = {
    ok: true, paymentStatus: status, amountInCents: Number(order?.amount_in_cents ?? ICFES_PASS_AMOUNT_IN_CENTS),
    currency: 'COP', productCode: ICFES_DETAIL_OFFER_ID, result: attempt.basic_result as IcfesBasicResultDto,
  };
  if (status !== 'APPROVED') return Response.json(base, { headers });
  const { data: entitlement } = await admin.from('icfes_entitlements').select('id').eq('attempt_id', attemptId).maybeSingle();
  if (!entitlement) return Response.json({ ...base, paymentStatus: 'ERROR' }, { headers });
  return Response.json({ ...base, questions: buildPremiumQuestions(attempt.exam_id, attempt.answers) ?? [] }, { headers });
}
