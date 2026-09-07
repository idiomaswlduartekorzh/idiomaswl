import { accessibleCourseOrder, courseSalesEnabled, checkoutForOrder } from '@/lib/course-pricing/payments.server';
import { json,sameOrigin,validOrderId } from '@/lib/course-pricing/http.server';
export const runtime='nodejs';
export async function POST(request:Request,{params}:{params:Promise<{orderId:string}>}) {
  if(!sameOrigin(request))return json({message:'Solicitud no permitida.'},403);
  if(!courseSalesEnabled())return json({message:'Los pagos están temporalmente fuera de servicio.'},503);
  const {orderId}=await params;if(!validOrderId(orderId))return json({message:'Inscripción no encontrada.'},404);
  try {
    const order=await accessibleCourseOrder(orderId,request);if(!order)return json({message:'Inscripción no encontrada.'},404);
    return json(await checkoutForOrder(order,request.headers.get('origin')!));
  }catch{return json({message:'No pudimos preparar el pago. Tu inscripción permanece guardada.'},503);}
}
