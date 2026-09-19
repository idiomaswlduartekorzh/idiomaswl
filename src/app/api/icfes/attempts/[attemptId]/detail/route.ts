import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  ICFES_ATTEMPT_ID_PATTERN,
  type IcfesOfferProductCode,
  type IcfesPaymentStatus,
  type IcfesPremiumDetailDto,
} from '@/lib/icfes/attempt-contract';
import { readOwnedIcfesAttempt } from '@/lib/icfes/attempt-store.server';
import {
  ICFES_ATTEMPT_COOKIE,
  ICFES_LEAD_COOKIE,
  verifyIcfesAttemptToken,
  verifyIcfesLeadToken,
} from '@/lib/icfes/attempt-token.server';
import { getIcfesPaidExam, getIcfesPremiumAvailability } from '@/lib/icfes/exam-registry.server';
import { buildPremiumQuestions } from '@/lib/icfes/grading.server';
import { buildIcfesPersonalizedFeedback } from '@/lib/icfes/personalized-feedback.server';
import { getIcfesCommercialOffer } from '@/lib/icfes/commercial-contract';
import { ICFES_PASS_AMOUNT_IN_CENTS, isIcfesPersistenceEnabled } from '@/lib/icfes/product-config.server';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';
const headers = { 'cache-control': 'private, no-store, max-age=0' };

export async function GET(
  _request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  const { attemptId } = await context.params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId) || !isIcfesPersistenceEnabled()) {
    return Response.json({ ok: false, error: 'Resultado no disponible.' }, { status: 404, headers });
  }
  const jar = await cookies();
  const token = jar.get(ICFES_ATTEMPT_COOKIE)?.value ?? '';
  const payload = verifyIcfesAttemptToken(token);
  if (!payload || payload.attemptId !== attemptId
    || !verifyIcfesLeadToken(jar.get(ICFES_LEAD_COOKIE)?.value, attemptId)) {
    return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  }
  const attempt = await readOwnedIcfesAttempt(attemptId, token);
  if (!attempt) return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  const availability = getIcfesPremiumAvailability(attempt.examId);
  if (!availability.eligible || !getIcfesPaidExam(attempt.examId)) {
    return Response.json({ ok: false, error: availability.reason ?? 'Detalle premium no disponible.' }, { status: 403, headers });
  }

  const admin = createAdminClient();
  const { data: { user } } = await (await createClient()).auth.getUser();
  const [{ data: order }, membership] = await Promise.all([
    admin.from('icfes_pass_orders').select('id,status,amount_in_cents,currency')
      .eq('attempt_id', attemptId).order('created_at', { ascending: false }).limit(1).maybeSingle(),
    user ? activeXpressMembership(user.id, 'icfes') : Promise.resolve(null),
  ]);

  let productCode: IcfesOfferProductCode | null = null;
  let paymentStatus: IcfesPaymentStatus = 'ERROR';
  let amountInCents = Number(order?.amount_in_cents ?? ICFES_PASS_AMOUNT_IN_CENTS);
  if (membership) {
    const offer = getIcfesCommercialOffer(membership.offer_id);
    productCode = offer.productCode;
    paymentStatus = 'APPROVED';
    amountInCents = offer.amountInCents;
  } else if (order) {
    const { data: entitlement } = await admin.from('icfes_entitlements')
      .select('id').eq('attempt_id', attemptId).maybeSingle();
    paymentStatus = order.status as IcfesPaymentStatus;
    if (paymentStatus === 'APPROVED' && entitlement) productCode = 'icfes-single-report-v1';
  }

  const entitled = paymentStatus === 'APPROVED' && productCode !== null;
  const base = {
    ok: true as const,
    paymentStatus,
    amountInCents,
    currency: 'COP' as const,
    productCode: productCode ?? 'icfes-single-report-v1',
    result: entitled ? attempt.result : null,
  };
  if (!entitled || !productCode) return Response.json(base, { headers });

  const questions = buildPremiumQuestions(attempt.examId, attempt.answers) ?? [];
  const personalizedFeedback = productCode === 'icfes-intensive-v1'
    ? buildIcfesPersonalizedFeedback({ offerId: 'exam-teacher', result: attempt.result, questions })
    : null;
  const response: IcfesPremiumDetailDto = {
    ...base,
    productCode,
    questions,
    ...(personalizedFeedback ? { personalizedFeedback } : {}),
  };
  return Response.json(response, { headers });
}
