import { accessibleCourseOrder,reconcileCoursePayment } from '@/lib/course-pricing/payments.server';
import {json,readBody,sameOrigin,validOrderId} from '@/lib/course-pricing/http.server';
export const runtime='nodejs';
export async function POST(request:Request,{params}:{params:Promise<{orderId:string}>}) {
  if(!sameOrigin(request))return json({message:'Solicitud no permitida.'},403);
  const {orderId}=await params;if(!validOrderId(orderId))return json({message:'Inscripción no encontrada.'},404);
  let id;try{id=(await readBody(request)).transactionId;}catch{return json({message:'Transacción inválida.'},400);}
  if(typeof id!=='string'||!/^[A-Za-z0-9_-]{6,120}$/.test(id))return json({message:'Transacción inválida.'},400);
  try {
    if(!await accessibleCourseOrder(orderId,request))return json({message:'Inscripción no encontrada.'},404);
    await reconcileCoursePayment(id,orderId);return json({saved:true});
  }catch{return json({message:'Tu pago está en verificación. No vuelvas a pagar; conservamos tu inscripción para revisarlo.'},503);}
}
