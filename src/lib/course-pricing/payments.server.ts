import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { createWompiIntegritySignature } from '@/lib/wompi/security';
import { wompiPrivateAuthorization } from '@/lib/wompi/validation';
import { parseProviderPayment, type parseOrderInput } from './payment';
import { TERMS_VERSION, COURSE_LEGAL_SNAPSHOT } from './terms';
import { courseSalesEnabled } from './release';
import { fulfillPaidCourseOrder } from './fulfillment.server';

export { courseSalesEnabled } from './release';
export async function courseUser() {
  const { createClient } = await import('@/lib/supabase/server');
  const { data:{user},error }=await (await createClient()).auth.getUser();
  return !error && user?.email_confirmed_at && user.email ? user : null;
}
function accessSecret() {
  const value=process.env.COURSE_ORDER_ACCESS_SECRET;
  if(!value || value.length<32) throw new Error('course_access_not_configured');
  return value;
}
function orderAccessToken(idempotencyKey:string) { return createHmac('sha256',accessSecret()).update(idempotencyKey).digest('base64url'); }
function orderAccessHash(token:string) { return createHash('sha256').update(token).digest('hex'); }
export function courseOrderCookie(orderId:string,idempotencyKey:string) {
  const secure=process.env.VERCEL_ENV==='production'?'; Secure':'';
  return `wl_course_order=${orderId}.${orderAccessToken(idempotencyKey)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure}`;
}
function requestAccessToken(request:Request,orderId:string) {
  const cookie=request.headers.get('cookie')?.split(';').map(value=>value.trim()).find(value=>value.startsWith('wl_course_order='))?.slice(16)??'';
  const prefix=`${orderId}.`;
  return cookie.startsWith(prefix)?cookie.slice(prefix.length):'';
}
function hashesMatch(value:string,expected:string) {
  const actual=orderAccessHash(value);
  return actual.length===expected.length && timingSafeEqual(Buffer.from(actual),Buffer.from(expected));
}
export async function prepareCourseOrder(input:NonNullable<ReturnType<typeof parseOrderInput>>) {
  const config=getWompiServerConfig();
  if (process.env.VERCEL_ENV!=='production' && config.environment==='production') throw new Error('production_disabled_outside_production');
  const token=orderAccessToken(input.idempotencyKey);
  const {data,error}=await createAdminClient().rpc('prepare_course_order',{
    p_user:null,p_email:input.contact.studentEmail,p_access_hash:orderAccessHash(token),p_key:input.idempotencyKey,p_environment:config.environment,p_offer:input.offerVersion,
    p_selection:input.selection,p_contact:{...input.contact,acceptance:{...input.acceptance,snapshot:COURSE_LEGAL_SNAPSHOT,sha256:createHash('sha256').update(COURSE_LEGAL_SNAPSHOT).digest('hex')}},p_amount:input.amountInCents,p_classes:input.classes,p_terms:input.termsVersion,
  }).abortSignal(AbortSignal.timeout(10000));
  if (error || !data) throw new Error('order_storage_unavailable');
  return data;
}
export async function ownedCourseOrder(id:string,userId:string) {
  const {data,error}=await createAdminClient().from('course_orders').select('*').eq('id',id).eq('user_id',userId).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (error) throw new Error('order_storage_unavailable');
  return data;
}
export async function accessibleCourseOrder(id:string,request:Request) {
  const {data,error}=await createAdminClient().from('course_orders').select('*').eq('id',id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if(error)throw new Error('order_storage_unavailable');
  if(!data)return null;
  const token=requestAccessToken(request,id);
  if(token && hashesMatch(token,String(data.access_token_hash)))return data;
  const user=await courseUser();
  return user && data.user_id===user.id?data:null;
}
export async function courseOrderState(orderId:string) {
  const db=createAdminClient();
  const [payments,enrollment,jobs]=await Promise.all([
    db.from('course_payment_transactions').select('provider_id,status').eq('order_id',orderId).abortSignal(AbortSignal.timeout(8000)),
    db.from('course_enrollments').select('order_id').eq('order_id',orderId).abortSignal(AbortSignal.timeout(8000)).maybeSingle(),
    db.from('course_coordination_jobs').select('kind').eq('order_id',orderId).abortSignal(AbortSignal.timeout(8000)),
  ]);
  if(payments.error||enrollment.error||jobs.error) throw new Error('order_storage_unavailable');
  const approved=payments.data.filter(p=>p.status==='APPROVED');
  return { status:jobs.data.some(j=>j.kind==='financial_review')?'review':approved.length && enrollment.data?'paid':payments.data.some(p=>p.status==='PENDING')?'pending':payments.data.length?'not_completed':'created', payments:payments.data };
}
export async function checkoutForOrder(order:Record<string,unknown>,origin:string) {
  const config=getWompiServerConfig();
  if(config.environment!==order.environment || (process.env.VERCEL_ENV!=='production'&&config.environment==='production')) throw new Error('environment_mismatch');
  if (!courseSalesEnabled() || order.terms_version!==TERMS_VERSION) throw new Error('terms_unavailable');
  const state=await courseOrderState(String(order.id));
  if(state.status==='paid'||state.status==='review'||state.status==='pending') return {status:state.status};
  const expirationTime=new Date(String(order.expires_at)).toISOString();
  if(new Date(expirationTime).getTime()<=Date.now()) return {status:'expired'};
  const reference=String(order.reference),amountInCents=Number(order.amount_in_cents);
  const integrity=createWompiIntegritySignature({reference,amountInCents,currency:'COP',expirationTime,integritySecret:config.integritySecret});
  const url=new URL('https://checkout.wompi.co/p/');
  url.search=new URLSearchParams({'public-key':config.publicKey,currency:'COP','amount-in-cents':String(amountInCents),reference,'signature:integrity':integrity,'expiration-time':expirationTime,'redirect-url':new URL('/inscripcion?orden='+String(order.id),origin).href}).toString();
  return {status:'ready',checkoutUrl:url.href};
}

export async function queueCoursePaymentReconciliation(reference:string,transactionId:string) {
  if(!/^WC-[0-9a-f-]{36}$/.test(reference)||!/^[A-Za-z0-9_-]{6,120}$/.test(transactionId))return null;
  const config=getWompiServerConfig();
  const {data,error}=await createAdminClient().rpc('queue_course_payment_reconciliation',{
    p_reference:reference,p_environment:config.environment,p_provider_id:transactionId,
  }).abortSignal(AbortSignal.timeout(10000));
  if(error)throw new Error('payment_queue_unavailable');
  return typeof data==='string'?data:null;
}

async function finishPaymentReconciliation(transactionId:string,success:boolean,error?:unknown) {
  const config=getWompiServerConfig();
  const message=error instanceof Error?error.message:String(error??'failed');
  const {error:rpcError}=await createAdminClient().rpc('finish_course_payment_reconciliation',{
    p_environment:config.environment,p_provider_id:transactionId,p_success:success,p_error:success?null:message,
  }).abortSignal(AbortSignal.timeout(10000));
  if(rpcError)throw new Error('payment_queue_unavailable');
}

/** Always obtain amount, reference and status from Wompi; webhook unsigned fields are not authority. */
export async function reconcileCoursePayment(transactionId:string,expectedOrderId?:string) {
  if(!/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) throw new Error('invalid_transaction');
  const config=getWompiServerConfig();
  if(expectedOrderId)await queueCoursePaymentReconciliation('WC-'+expectedOrderId,transactionId);
  let orderId:string;
  try {
    const response=await fetch(`${config.apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}`,{headers:{Authorization:wompiPrivateAuthorization(config),Accept:'application/json'},cache:'no-store',signal:AbortSignal.timeout(10000)});
    if(!response.ok) throw new Error('provider_unavailable');
    const raw=await response.json();
    const payment=parseProviderPayment(raw.data);
    if(!payment || payment.id!==transactionId) throw new Error('invalid_provider_payment');
    if(expectedOrderId && payment.reference!=='WC-'+expectedOrderId) throw new Error('payment_order_mismatch');
    const {data,error}=await createAdminClient().rpc('record_course_payment',{
      p_reference:payment.reference,p_environment:config.environment,p_provider_id:payment.id,p_amount:payment.amount_in_cents,p_currency:payment.currency,p_status:payment.status,p_observed:new Date().toISOString(),
      p_fingerprint:createHash('sha256').update(JSON.stringify([config.environment,payment])).digest('hex'),
    }).abortSignal(AbortSignal.timeout(10000));
    if(error||!data)throw new Error('payment_storage_unavailable');
    orderId=data as string;
    await finishPaymentReconciliation(transactionId,true);
  } catch(error) {
    try{await finishPaymentReconciliation(transactionId,false,error);}catch{}
    throw error;
  }
  await fulfillPaidCourseOrder(orderId);
  return orderId;
}

export async function recoverCoursePayments(limit=10) {
  const db=createAdminClient(),now=new Date().toISOString();
  const {data:queued,error}=await db.from('course_payment_reconciliation_queue')
    .select('provider_id,order_id').in('status',['pending','failed']).lte('next_attempt_at',now)
    .order('next_attempt_at',{ascending:true}).limit(limit).abortSignal(AbortSignal.timeout(10000));
  if(error)throw new Error('payment_queue_unavailable');
  let paymentsRecovered=0,paymentsPending=0;
  for(const item of queued??[]){
    try{await reconcileCoursePayment(String(item.provider_id),String(item.order_id));paymentsRecovered+=1;}
    catch{paymentsPending+=1;}
  }

  const [retryable,stale]=await Promise.all([
    db.from('course_coordination_jobs').select('order_id').in('kind',['student_welcome','owner_notification'])
      .in('status',['pending','failed']).lte('next_attempt_at',now).limit(limit).abortSignal(AbortSignal.timeout(10000)),
    db.from('course_coordination_jobs').select('order_id').in('kind',['student_welcome','owner_notification'])
      .eq('status','processing').lt('updated_at',new Date(Date.now()-5*60*1000).toISOString()).limit(limit).abortSignal(AbortSignal.timeout(10000)),
  ]);
  if(retryable.error||stale.error)throw new Error('course_job_lookup_failed');
  const orderIds=[...new Set([...(retryable.data??[]),...(stale.data??[])].map(item=>String(item.order_id)))].slice(0,limit);
  let fulfillmentsRecovered=0,fulfillmentsPending=0;
  for(const orderId of orderIds){
    try{await fulfillPaidCourseOrder(orderId);fulfillmentsRecovered+=1;}
    catch{fulfillmentsPending+=1;}
  }
  return {paymentsChecked:(queued??[]).length,paymentsRecovered,paymentsPending,fulfillmentsChecked:orderIds.length,fulfillmentsRecovered,fulfillmentsPending};
}
