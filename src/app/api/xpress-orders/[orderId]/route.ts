import { json, validOrderId } from '@/lib/course-pricing/http.server';
import { ownedXpressOrder, xpressOrderState, xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!validOrderId(orderId)) return json({ message: 'Compra no encontrada.' }, 404);
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para consultar tu compra.' }, 401);
  try {
    const order = await ownedXpressOrder(orderId, user.id);
    if (!order) return json({ message: 'Compra no encontrada.' }, 404);
    const state = await xpressOrderState(orderId);
    return json({
      order: {
        id: order.id,
        reference: order.reference,
        offerId: order.offer_id,
        examSlug: order.exam_slug,
        orderKind: order.order_kind,
        creditInCents: order.credit_in_cents,
        amountInCents: order.amount_in_cents,
        createdAt: order.created_at,
        expiresAt: order.expires_at,
        acceptedAt: order.accepted_at,
        termsVersion: order.terms_version,
        legalSnapshot: order.legal_snapshot,
      },
      status: state.status,
      membership: state.membership,
    });
  } catch {
    return json({ message: 'No podemos consultar el pago ahora. No pagues de nuevo.' }, 503);
  }
}
