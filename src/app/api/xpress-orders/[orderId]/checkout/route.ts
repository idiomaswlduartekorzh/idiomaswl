import { json, sameOrigin, validOrderId } from '@/lib/course-pricing/http.server';
import { checkoutForXpressOrder, ownedXpressOrder, xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const { orderId } = await params;
  if (!validOrderId(orderId)) return json({ message: 'Compra no encontrada.' }, 404);
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para continuar.' }, 401);
  try {
    const order = await ownedXpressOrder(orderId, user.id);
    if (!order) return json({ message: 'Compra no encontrada.' }, 404);
    return json(await checkoutForXpressOrder(order, request.headers.get('origin')!));
  } catch {
    return json({ message: 'No pudimos abrir Wompi. Tu orden quedó guardada; inténtalo nuevamente.' }, 503);
  }
}
