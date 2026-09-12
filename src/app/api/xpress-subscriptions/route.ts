import { sameOrigin } from '@/lib/course-pricing/http.server';
import { parseXpressSubscriptionForm } from '@/lib/xpress-commerce/payment';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';
import { prepareXpressSubscription } from '@/lib/xpress-commerce/subscriptions.server';

export const runtime = 'nodejs';
export const maxDuration = 60;

function redirectTo(request: Request, params: Record<string, string>) {
  const url = new URL('/suscripcion/examenes', request.url);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return Response.redirect(url, 303);
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return redirectTo(request, { error: 'solicitud' });
  const user = await xpressUser();
  if (!user) return Response.redirect(new URL('/login?next=%2Fsuscripcion%2Fexamenes', request.url), 303);
  const length = Number(request.headers.get('content-length') || '0');
  if (!Number.isFinite(length) || length > 16_384) return redirectTo(request, { error: 'datos' });
  let input;
  try { input = parseXpressSubscriptionForm(await request.formData()); }
  catch { return redirectTo(request, { error: 'datos' }); }
  if (!input) return redirectTo(request, { error: 'condiciones' });
  try {
    const result = await prepareXpressSubscription(user, input);
    const params: Record<string, string> = { suscripcion: result.subscription.id };
    if (input.icfesAttemptId) params.attempt = input.icfesAttemptId;
    if (result.order?.id) params.orden = String(result.order.id);
    if (!result.order) params.programada = '1';
    return redirectTo(request, params);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'subscription_failed';
    console.error('[xpress-subscriptions] setup failed', { userId: user.id, code });
    const attempt: Record<string, string> = {};
    if (input.icfesAttemptId) attempt.attempt = input.icfesAttemptId;
    if (code === 'xpress_subscription_exists') return redirectTo(request, { error: 'ya-activa', ...attempt });
    if (code === 'xpress_exam_mismatch') return redirectTo(request, { error: 'seleccion', ...attempt });
    if (code === 'icfes_membership_unavailable') return redirectTo(request, { error: 'icfes-cerrado', ...attempt });
    if (code === 'icfes_teacher_unavailable') return redirectTo(request, { error: 'capacidad', ...attempt });
    if (code.startsWith('payment_source_rejected_')) return redirectTo(request, { error: 'tarjeta', ...attempt });
    return redirectTo(request, { error: 'suscripcion', ...attempt });
  }
}
