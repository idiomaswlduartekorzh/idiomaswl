import 'server-only';
import {randomUUID} from 'node:crypto';
import {createAdminClient} from '@/lib/supabase/admin';
import {LANGUAGES,PLANS,formatCOP,objectiveLabel} from './catalog';
import {escapeEmailHtml,sendCourseEmail} from './email.server';

type JobKind='student_welcome'|'owner_notification';
type CourseOrderRecord={id:string;reference:string;amount_in_cents:number;classes:number;contact:unknown;selection:unknown};
const DEFAULT_OWNER_NOTIFICATION_EMAIL='david_duarte182@hotmail.com';

async function finish(orderId:string,kind:JobKind,lease:string,success:boolean,error?:unknown) {
  const message=error instanceof Error?error.message:String(error??'failed');
  const {data,error:rpcError}=await createAdminClient().rpc('finish_course_job',{p_order:orderId,p_kind:kind,p_lease:lease,p_success:success,p_error:success?null:message});
  if(rpcError||data!==true)throw new Error('course_job_finish_failed');
}

async function runJob(orderId:string,kind:JobKind,work:()=>Promise<void>) {
  const lease=randomUUID();
  const {data,error}=await createAdminClient().rpc('claim_course_job',{p_order:orderId,p_kind:kind,p_lease:lease});
  if(error)throw new Error('course_job_claim_failed');
  if(data!==true)return true;
  try { await work(); await finish(orderId,kind,lease,true); return true; }
  catch(jobError) { try{await finish(orderId,kind,lease,false,jobError);}catch{} return false; }
}

async function findProfile(email:string) {
  const {data,error}=await createAdminClient().from('profiles').select('id,email').eq('email',email).maybeSingle();
  if(error)throw new Error('student_profile_lookup_failed');
  return data;
}

async function welcomeStudent(order:CourseOrderRecord) {
  const admin=createAdminClient();
  const contact=order.contact as {studentName:string;studentEmail:string};
  let profile=await findProfile(contact.studentEmail);
  let invited=false;
  let accountActionLink:string|null=null;
  if(!profile){
    const options={
      data:{full_name:contact.studentName,source:'course_payment',course_order_id:order.id,course_language:(order.selection as {language:string}).language},
      redirectTo:`https://www.idiomaswl.com/auth/callback?next=${encodeURIComponent(`/inscripcion?orden=${order.id}`)}`,
    };
    let generated=await admin.auth.admin.generateLink({type:'invite',email:contact.studentEmail,options});
    invited=!generated.error;
    if(generated.error)generated=await admin.auth.admin.generateLink({type:'magiclink',email:contact.studentEmail,options});
    if(generated.error||!generated.data.user||!generated.data.properties)throw new Error('student_account_link_failed');
    profile={id:generated.data.user.id,email:contact.studentEmail};
    accountActionLink=generated.data.properties.action_link;
  }
  const selection=order.selection as {language:string;objective:string;level:string};
  const {error:profileError}=await admin.from('profiles').upsert({
    id:profile.id,email:contact.studentEmail,name:contact.studentName,full_name:contact.studentName,
    language:selection.language,level:selection.level,subject:selection.language,plan:'autodidacta',role:'user',enrolled_at:new Date().toISOString(),
  },{onConflict:'id'});
  if(profileError)throw new Error('student_profile_update_failed');
  const {error:orderError}=await admin.from('course_orders').update({user_id:profile.id}).eq('id',order.id).is('user_id',null);
  if(orderError)throw new Error('student_order_link_failed');
  const language=LANGUAGES.find(item=>item.id===selection.language)?.name??selection.language;
  const accountMessage=invited?'Creamos tu cuenta. Usa el botón para activarla y entrar a tu inscripción.':accountActionLink?'Tu cuenta ya existía. Usa el botón para entrar de forma segura.':'Tu cuenta existente quedó vinculada a esta inscripción.';
  const accountHref=accountActionLink??`https://www.idiomaswl.com/login?next=${encodeURIComponent(`/inscripcion?orden=${order.id}`)}`;
  const accountLabel=invited?'Activar mi cuenta':'Entrar a mi inscripción';
  await sendCourseEmail({
    to:contact.studentEmail,
    subject:`Bienvenido a WeLearn: tu pago de ${language} está confirmado`,
    idempotencyKey:`course-welcome/${order.id}`,
    html:`<h1>¡Bienvenido a WeLearn, ${escapeEmailHtml(contact.studentName)}!</h1><p>Confirmamos tu inscripción a <strong>${escapeEmailHtml(language)}</strong> por ${escapeEmailHtml(formatCOP(Number(order.amount_in_cents)/100))} COP.</p><p>Referencia: <strong>${escapeEmailHtml(order.reference)}</strong>.</p><p>${escapeEmailHtml(accountMessage)}</p><p><a href="${escapeEmailHtml(accountHref)}">${escapeEmailHtml(accountLabel)}</a></p><p>Te contactaremos para coordinar el horario. Conserva este correo como constancia de la compra.</p>`,
  });
}

async function notifyOwner(order:CourseOrderRecord) {
  const to=process.env.COURSE_OWNER_NOTIFICATION_EMAIL||DEFAULT_OWNER_NOTIFICATION_EMAIL;
  if(!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))throw new Error('course_owner_email_not_configured');
  const contact=order.contact as {studentName:string;studentEmail:string;payerName:string;phone:string};
  const selection=order.selection as {language:string;objective:string;plan:string;level:string};
  const language=LANGUAGES.find(item=>item.id===selection.language)?.name??selection.language;
  const plan=PLANS.find(item=>item.id===selection.plan)?.name??selection.plan;
  await sendCourseEmail({
    to,subject:`Nuevo pago confirmado: ${language} · ${contact.studentName}`,
    idempotencyKey:`course-owner/${order.id}`,
    html:`<h1>Nuevo estudiante para coordinar</h1><p><strong>${escapeEmailHtml(contact.studentName)}</strong> pagó ${escapeEmailHtml(formatCOP(Number(order.amount_in_cents)/100))} COP.</p><ul><li>Curso: ${escapeEmailHtml(language)} · ${escapeEmailHtml(objectiveLabel(selection.objective))}</li><li>Plan: ${escapeEmailHtml(plan)} · ${escapeEmailHtml(order.classes)} clases</li><li>Nivel: ${escapeEmailHtml(selection.level)}</li><li>Correo: ${escapeEmailHtml(contact.studentEmail)}</li><li>WhatsApp: ${escapeEmailHtml(contact.phone)}</li><li>Pagador: ${escapeEmailHtml(contact.payerName)}</li><li>Referencia: ${escapeEmailHtml(order.reference)}</li></ul><p>La tarea de coordinación quedó registrada en la plataforma.</p>`,
  });
}

export async function fulfillPaidCourseOrder(orderId:string) {
  const {data:order,error}=await createAdminClient().from('course_orders').select('*').eq('id',orderId).maybeSingle();
  if(error||!order)throw new Error('course_fulfillment_order_missing');
  const student=await runJob(orderId,'student_welcome',()=>welcomeStudent(order as CourseOrderRecord));
  const owner=await runJob(orderId,'owner_notification',()=>notifyOwner(order as CourseOrderRecord));
  if(!student||!owner)throw new Error('course_fulfillment_pending');
}
