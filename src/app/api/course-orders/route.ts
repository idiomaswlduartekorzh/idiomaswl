import { parseOrderInput } from '@/lib/course-pricing/payment';
import { courseOrderCookie, courseSalesEnabled, courseUser, prepareCourseOrder } from '@/lib/course-pricing/payments.server';
import { json, readBody, sameOrigin } from '@/lib/course-pricing/http.server';
import { TERMS_VERSION } from '@/lib/course-pricing/terms';
export const runtime='nodejs';
export async function POST(request:Request) {
  if(!sameOrigin(request))return json({message:'Solicitud no permitida.'},403);
  if(!courseSalesEnabled())return json({message:'Las inscripciones están temporalmente fuera de servicio.'},503);
  let body;try{body=await readBody(request);}catch{return json({message:'Revisa tus datos.'},400);}
  const acceptedTerms=body && typeof body==='object' && !Array.isArray(body) ? (body as Record<string,unknown>).acceptedTerms : null;
  if(typeof acceptedTerms==='string' && /^course-\d{8}-v\d+$/.test(acceptedTerms) && acceptedTerms!==TERMS_VERSION)
    return json({message:'Actualizamos el reglamento mientras tenías abierta esta página. Recárgala, vuelve a aceptarlo y continúa al pago.',code:'terms_updated'},409);
  const input=parseOrderInput(body);
  if(!input)return json({message:'Revisa tus datos y confirma las condiciones.'},400);
  try {
    const order=await prepareCourseOrder(input);
    return json({orderId:order.id},201,{'Set-Cookie':courseOrderCookie(order.id,input.idempotencyKey)});
  }catch(error){
    const code=error instanceof Error?error.message:'course_order_prepare_failed';
    console.error('[course-orders] unable to prepare order',{code});
    if(code==='open_order_exists')return json({message:'Ya tienes una inscripción pendiente de pago con este correo. Vuelve a esa orden para pagar; si no la encuentras, escríbenos por WhatsApp para recuperarla.',code},409);
    if(code==='idempotency_conflict')return json({message:'Esta página conserva un intento anterior con datos distintos. Vuelve a la orden que se creó o contáctanos para recuperarla.',code},409);
    if(code==='order_rate_limit')return json({message:'Hubo varios intentos con este correo. Escríbenos por WhatsApp para ayudarte a completar el pago.',code},429);
    return json({
      message:'No pudimos guardar la inscripción. No se ha abierto un cobro.',
      ...(process.env.VERCEL_ENV==='preview'?{code}:{}),
    },503);
  }
}
export async function GET() {
  try{
    const user=await courseUser();if(!user)return json({message:'Inicia sesión para ver tus inscripciones.'},401);
    const {createAdminClient}=await import('@/lib/supabase/admin');
    const {data,error}=await createAdminClient().from('course_orders').select('id,created_at,amount_in_cents').eq('user_id',user.id).order('created_at',{ascending:false}).limit(50).abortSignal(AbortSignal.timeout(8000));
    if(error)throw error;return json({orders:data});
  }catch{return json({message:'No podemos consultar tus inscripciones en este momento.'},503);}
}
