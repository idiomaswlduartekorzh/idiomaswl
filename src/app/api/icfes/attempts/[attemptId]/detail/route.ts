import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { ICFES_ATTEMPT_ID_PATTERN, type IcfesBasicResultDto, type IcfesPaymentStatus, type IcfesPremiumDetailDto } from '@/lib/icfes/attempt-contract';
import { ICFES_ATTEMPT_COOKIE, verifyIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';
import { buildPremiumQuestions } from '@/lib/icfes/grading.server';
import { getIcfesPaidExam, getIcfesPremiumAvailability } from '@/lib/icfes/exam-registry.server';
import { ICFES_PASS_AMOUNT_IN_CENTS, isIcfesPersistenceEnabled } from '@/lib/icfes/product-config.server';

export const runtime = 'nodejs';
const headers = { 'cache-control': 'private, no-store, max-age=0' };

export async function GET(_request: Request, context: { params: Promise<{ attemptId: string }> }): Promise<Response> {
  const { attemptId } = await context.params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId) || !isIcfesPersistenceEnabled()) {
    return Response.json({ ok: false, error: 'Resultado no disponible.' }, { status: 404, headers });
  }
  const token = (await cookies()).get(ICFES_ATTEMPT_COOKIE)?.value;
  const payload = verifyIcfesAttemptToken(token);
  if (!payload || payload.attemptId !== attemptId) return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  const admin = createAdminClient();
  const { data: { user } } = await (await createClient()).auth.getUser();
  const tokenHash = createHash('sha256').update(token!, 'utf8').digest('hex');
  const { data: attempt } = await admin.from('icfes_attempts').select('id, exam_id, user_id, access_token_hash, answers, basic_result')
    .eq('id', attemptId).maybeSingle();
  if (!attempt || attempt.access_token_hash !== tokenHash || (attempt.user_id && attempt.user_id !== user?.id)) {
    return Response.json({ ok: false, error: 'Acceso no autorizado.' }, { status: 403, headers });
  }
  const availability = getIcfesPremiumAvailability(attempt.exam_id);
  if (!availability.eligible || !getIcfesPaidExam(attempt.exam_id)) {
    return Response.json({ ok: false, error: availability.reason ?? 'Detalle premium no disponible.' }, { status: 403, headers });
  }
  const { data: order } = await admin.from('icfes_pass_orders').select('id, status, amount_in_cents, currency')
    .eq('attempt_id', attemptId).order('created_at', { ascending: false }).limit(1).maybeSingle();
  const status = (order?.status ?? 'ERROR') as IcfesPaymentStatus;
  const base: IcfesPremiumDetailDto = {
    ok: true, paymentStatus: status, amountInCents: Number(order?.amount_in_cents ?? ICFES_PASS_AMOUNT_IN_CENTS),
    currency: 'COP', result: attempt.basic_result as IcfesBasicResultDto,
  };
  if (status !== 'APPROVED') return Response.json(base, { headers });
  const { data: entitlement } = await admin.from('icfes_entitlements').select('id').eq('attempt_id', attemptId).maybeSingle();
  if (!entitlement) return Response.json({ ...base, paymentStatus: 'ERROR' }, { headers });
  return Response.json({ ...base, questions: buildPremiumQuestions(attempt.exam_id, attempt.answers) ?? [] }, { headers });
}
