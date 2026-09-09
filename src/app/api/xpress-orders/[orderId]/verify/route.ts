import { json, readBody, sameOrigin, validOrderId } from '@/lib/course-pricing/http.server';
import { ownedXpressOrder, reconcileXpressPayment, xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const { orderId } = await params;
  if (!validOrderId(orderId)) return json({ message: 'Compra no encontrada.' }, 404);
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para verificar tu compra.' }, 401);
  let transactionId;
  try { transactionId = (await readBody(request)).transactionId; }
  catch { return json({ message: 'Transacción inválida.' }, 400); }
  if (typeof transactionId !== 'string' || !/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) return json({ message: 'Transacción inválida.' }, 400);
  try {
    if (!await ownedXpressOrder(orderId, user.id)) return json({ message: 'Compra no encontrada.' }, 404);
    await reconcileXpressPayment(transactionId, orderId);
    return json({ saved: true });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'xpress_payment_verification_failed';
    console.error('[xpress-orders] payment verification failed', { orderId, code });
    if (code === 'xpress_fulfillment_pending') return json({ saved: true, fulfillmentPending: true }, 202);
    return json({ message: 'Tu pago está en verificación. No vuelvas a pagar; la orden quedó guardada.' }, 503);
  }
}
