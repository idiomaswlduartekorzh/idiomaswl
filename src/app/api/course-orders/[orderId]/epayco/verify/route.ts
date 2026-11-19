import { accessibleCourseOrder } from '@/lib/course-pricing/payments.server';
import { reconcileEpaycoCoursePayment, validEpaycoReference } from '@/lib/course-pricing/epayco.server';
import { json, readBody, sameOrigin, validOrderId } from '@/lib/course-pricing/http.server';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const { orderId } = await params;
  if (!validOrderId(orderId)) return json({ message: 'Inscripción no encontrada.' }, 404);
  let reference: unknown;
  try { reference = (await readBody(request)).reference; } catch { return json({ message: 'Referencia inválida.' }, 400); }
  if (typeof reference !== 'string' || !validEpaycoReference(reference)) return json({ message: 'Referencia inválida.' }, 400);
  try {
    if (!await accessibleCourseOrder(orderId, request)) return json({ message: 'Inscripción no encontrada.' }, 404);
    await reconcileEpaycoCoursePayment(reference, orderId);
    return json({ saved: true });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'epayco_verification_failed';
    console.error('[course-orders] epayco verification failed', { orderId, code });
    if (code === 'course_fulfillment_pending') return json({ saved: true, fulfillmentPending: true }, 202);
    return json({ message: 'Tu pago está en verificación. No vuelvas a pagar; conservamos tu inscripción para revisarlo.' }, 503);
  }
}
