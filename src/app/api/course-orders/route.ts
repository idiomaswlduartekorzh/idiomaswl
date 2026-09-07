import { parseOrderInput } from '@/lib/course-pricing/payment';
import { courseOrderCookie, courseSalesEnabled, courseUser, prepareCourseOrder } from '@/lib/course-pricing/payments.server';
import { json, readBody, sameOrigin } from '@/lib/course-pricing/http.server';
export const runtime='nodejs';
export async function POST(request:Request) {
  if(!sameOrigin(request))return json({message:'Solicitud no permitida.'},403);
  if(!courseSalesEnabled())return json({message:'Las inscripciones están temporalmente fuera de servicio.'},503);
  let input;try{input=parseOrderInput(await readBody(request));}catch{return json({message:'Revisa tus datos.'},400);}
  if(!input)return json({message:'Revisa tus datos y confirma las condiciones.'},400);
  try {
    const order=await prepareCourseOrder(input);
    return json({orderId:order.id},201,{'Set-Cookie':courseOrderCookie(order.id,input.idempotencyKey)});
  }catch{return json({message:'No pudimos guardar la inscripción. No se ha abierto un cobro.'},503);}
}
export async function GET() {
  try{
    const user=await courseUser();if(!user)return json({message:'Inicia sesión para ver tus inscripciones.'},401);
    const {createAdminClient}=await import('@/lib/supabase/admin');
    const {data,error}=await createAdminClient().from('course_orders').select('id,created_at,amount_in_cents').eq('user_id',user.id).order('created_at',{ascending:false}).limit(50).abortSignal(AbortSignal.timeout(8000));
    if(error)throw error;return json({orders:data});
  }catch{return json({message:'No podemos consultar tus inscripciones en este momento.'},503);}
}
