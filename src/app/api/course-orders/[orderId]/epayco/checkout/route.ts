import { accessibleCourseOrder } from '@/lib/course-pricing/payments.server';
import { createEpaycoCourseSession, epaycoCourseAvailable } from '@/lib/course-pricing/epayco.server';
import { json, sameOrigin, validOrderId } from '@/lib/course-pricing/http.server';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  if (!epaycoCourseAvailable()) return json({ message: 'Este medio de pago aún no está disponible.' }, 503);
  const { orderId } = await params;
  if (!validOrderId(orderId)) return json({ message: 'Inscripción no encontrada.' }, 404);
  try {
    const order = await accessibleCourseOrder(orderId, request);
    if (!order) return json({ message: 'Inscripción no encontrada.' }, 404);
    return json(await createEpaycoCourseSession(order, request.headers.get('origin')!));
  } catch (error) {
    console.error('[course-orders] epayco checkout failed', { orderId, code: error instanceof Error ? error.message : 'unknown' });
    return json({ message: 'No pudimos preparar este pago. Tu inscripción permanece guardada.' }, 503);
  }
}
