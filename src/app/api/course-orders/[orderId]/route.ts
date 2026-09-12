import { accessibleCourseOrder, courseOrderState } from '@/lib/course-pricing/payments.server';
import { json, validOrderId } from '@/lib/course-pricing/http.server';
export const runtime='nodejs';
export async function GET(request:Request,{params}:{params:Promise<{orderId:string}>}) {
  const {orderId}=await params;if(!validOrderId(orderId))return json({message:'Inscripción no encontrada.'},404);
  try {
    const order=await accessibleCourseOrder(orderId,request);if(!order)return json({message:'Inscripción no encontrada.'},404);
    const state=await courseOrderState(orderId);
    return json({order:{id:order.id,reference:order.reference,selection:order.selection,amountInCents:order.amount_in_cents,classes:order.classes,sessions:order.sessions,createdAt:order.created_at,expiresAt:order.expires_at,acceptedAt:order.contact?.acceptance?.acceptedAt??order.created_at,signedBy:order.contact?.acceptance?.signedBy??null,termsVersion:order.terms_version,legalSnapshot:order.contact?.acceptance?.snapshot??null},status:state.status});
  }catch{return json({message:'No podemos consultar el pago ahora. No pagues de nuevo; vuelve a consultar en unos minutos.'},503);}
}
