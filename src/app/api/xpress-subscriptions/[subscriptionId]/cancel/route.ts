import { json, sameOrigin, validOrderId } from '@/lib/course-pricing/http.server';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';
import { cancelXpressSubscription } from '@/lib/xpress-commerce/subscriptions.server';

export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: Promise<{ subscriptionId: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para administrar tu suscripción.' }, 401);
  const { subscriptionId } = await params;
  if (!validOrderId(subscriptionId)) return json({ message: 'Suscripción no encontrada.' }, 404);
  try {
    const subscription = await cancelXpressSubscription(subscriptionId, user.id);
    return json({ subscription: { id: subscription.id, status: subscription.status, currentPeriodEnd: subscription.current_period_end } });
  } catch {
    return json({ message: 'No pudimos cancelar la renovación ahora. No se realizó ningún cobro.' }, 503);
  }
}
