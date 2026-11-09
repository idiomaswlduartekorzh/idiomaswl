import 'server-only';
import {createHash,randomUUID} from 'node:crypto';
import {createAdminClient} from '@/lib/supabase/admin';
import {LANGUAGES,PLANS,formatCOP,objectiveLabel} from './catalog';
import {escapeEmailHtml,sendCourseEmail} from './email.server';
import {buildCourseWelcomeEmail} from './email-template';
import {generateCourseTermsPdf,resolveCourseTermsSnapshot} from './terms-pdf.server';
import {xpressExamForClassSelection} from '@/lib/student-onboarding/catalog';

type JobKind='student_welcome'|'owner_notification';
type CourseOrderRecord={id:string;reference:string;amount_in_cents:number;created_at?:string;terms_version?:string;enrollment_fee_in_cents?:number;enrollment_fee_version?:string|null;platform_fee_in_cents?:number;platform_fee_version?:string|null;classes:number;contact:unknown;selection:unknown};
const DEFAULT_OWNER_NOTIFICATION_EMAIL='david_duarte182@hotmail.com';
function paymentBreakdown(order:CourseOrderRecord) {
  const total=Number(order.amount_in_cents)/100;
  if(!order.enrollment_fee_version)return `<p>Total pagado: <strong>${escapeEmailHtml(formatCOP(total))} COP</strong>.</p>`;
  const fee=Number(order.enrollment_fee_in_cents??0)/100;
  const platform=Number(order.platform_fee_in_cents??0)/100;
  const platformLine=order.platform_fee_version && (order.selection as {objective?:string}).objective!=='general' ? ` · Plataforma para exámenes: ${escapeEmailHtml(formatCOP(platform))} COP` : '';
  return `<p>Curso: ${escapeEmailHtml(formatCOP(total-fee-platform))} COP · Inscripción: ${escapeEmailHtml(formatCOP(fee))} COP${platformLine} · Total pagado: <strong>${escapeEmailHtml(formatCOP(total))} COP</strong>.</p>`;
}

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

function acceptanceDateLabel(value?:string) {
  if(!value)return 'registrada con la orden';
  const timestamp=Date.parse(value);
  if(!Number.isFinite(timestamp))return 'registrada con la orden';
  return new Intl.DateTimeFormat('es-CO',{dateStyle:'long',timeStyle:'short',timeZone:'America/Bogota'}).format(timestamp);
}

async function welcomeStudent(order:CourseOrderRecord) {
  const admin=createAdminClient();
  const contact=order.contact as {studentName:string;studentEmail:string;payerName?:string;acceptance?:{termsVersion?:string;signedBy?:string;acceptedAt?:string;snapshot?:unknown;sha256?:string}};
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
  const selection=order.selection as {language:string;objective:string;level:string;plan:string};
  const assignedExam=xpressExamForClassSelection(selection.language,selection.objective);
  const studentPlan=selection.plan==='intensivo'||selection.plan==='diario'?'intensivo':'preparacion';
  const {error:profileError}=await admin.from('profiles').upsert({
    id:profile.id,email:contact.studentEmail,name:contact.studentName,full_name:contact.studentName,
    language:selection.language,level:selection.level,subject:assignedExam??selection.language,plan:studentPlan,role:'user',
    student_path:'welearn',target_exam:assignedExam,xpress_plan_interest:null,onboarding_completed_at:new Date().toISOString(),enrolled_at:new Date().toISOString(),
  },{onConflict:'id'});
  if(profileError)throw new Error('student_profile_update_failed');
  if(assignedExam){
    const {error:accessError}=await admin.rpc('grant_welearn_exam_access',{
      p_user:profile.id,p_exam:assignedExam,p_source_reference:`course-order:${order.id}`,p_created_by:null,
    });
    if(accessError)throw new Error('welearn_exam_access_failed');
  }
  const {error:orderError}=await admin.from('course_orders').update({user_id:profile.id}).eq('id',order.id).is('user_id',null);
  if(orderError)throw new Error('student_order_link_failed');
  const language=LANGUAGES.find(item=>item.id===selection.language)?.name??selection.language;
  const accountMessage=invited?'Creamos tu cuenta. Verifica que este correo es tuyo y actívala con el botón.':accountActionLink?'Usa este enlace seguro para verificar el correo y entrar a tu inscripción.':'Tu cuenta existente quedó vinculada a esta inscripción. Entra con tus datos habituales.';
  const accountHref=accountActionLink??`https://www.idiomaswl.com/login?next=${encodeURIComponent(`/inscripcion?orden=${order.id}`)}`;
  const accountLabel=invited?'Verificar correo y activar cuenta':accountActionLink?'Verificar correo y continuar':'Entrar a mi inscripción';
  const acceptance=contact.acceptance;
  if(typeof acceptance?.snapshot==='string' && acceptance.sha256){
    const snapshotHash=createHash('sha256').update(acceptance.snapshot).digest('hex');
    if(snapshotHash!==acceptance.sha256)throw new Error('course_terms_snapshot_hash_mismatch');
  }
  const termsSnapshot=resolveCourseTermsSnapshot(acceptance?.snapshot);
  const acceptanceVersion=acceptance?.termsVersion??order.terms_version??termsSnapshot.version;
  const termsPdf=await generateCourseTermsPdf(termsSnapshot);
  const total=Number(order.amount_in_cents)/100;
  const enrollmentFee=Number(order.enrollment_fee_in_cents??0)/100;
  const platformFee=Number(order.platform_fee_in_cents??0)/100;
  const coursePrice=Math.max(0,total-enrollmentFee-platformFee);
  const plan=PLANS.find(item=>item.id===selection.plan)?.name??selection.plan;
  const paymentItems=[
    {label:'Curso',value:`${formatCOP(coursePrice)} COP`},
    ...(enrollmentFee>0?[{label:'Inscripción',value:`${formatCOP(enrollmentFee)} COP`}]:[]),
    ...(platformFee>0?[{label:'Plataforma de preparación para exámenes · pago único',value:`${formatCOP(platformFee)} COP`}]:[]),
  ];
  await sendCourseEmail({
    to:contact.studentEmail,
    subject:invited?'Verifica tu correo y activa tu cuenta de WeLearn':'Tu inscripción en WeLearn está confirmada',
    idempotencyKey:`course-welcome/${order.id}`,
    html:buildCourseWelcomeEmail({
      studentName:contact.studentName,
      courseLabel:`${language} · ${objectiveLabel(selection.objective)} · ${plan}`,
      orderReference:order.reference,
      paymentItems,
      totalPaid:`${formatCOP(total)} COP`,
      accountHeading:invited||accountActionLink?'VERIFICA TU CORREO PARA ACTIVAR TU ACCESO':'TU CUENTA ESTÁ LISTA',
      accountMessage,
      accountHref,
      accountLabel,
      acceptanceVersion,
      acceptedAt:acceptanceDateLabel(order.created_at??acceptance?.acceptedAt),
      signerName:acceptance?.signedBy??contact.payerName??contact.studentName,
      pdfVersion:termsSnapshot.version,
      pdfFilename:termsPdf.filename,
      pdfMatchesAcceptance:termsSnapshot.version===acceptanceVersion,
    }),
    attachments:[{filename:termsPdf.filename,content:termsPdf.bytes,contentType:'application/pdf'}],
  });
}

async function notifyOwner(order:CourseOrderRecord) {
  const to=process.env.COURSE_OWNER_NOTIFICATION_EMAIL||DEFAULT_OWNER_NOTIFICATION_EMAIL;
  if(!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))throw new Error('course_owner_email_not_configured');
  const contact=order.contact as {studentName:string;studentEmail:string;payerName:string;phone:string;address?:string;city?:string;purpose?:string;signerName?:string};
  const selection=order.selection as {language:string;objective:string;plan:string;level:string};
  const language=LANGUAGES.find(item=>item.id===selection.language)?.name??selection.language;
  const plan=PLANS.find(item=>item.id===selection.plan)?.name??selection.plan;
  await sendCourseEmail({
    to,subject:`Nuevo pago confirmado: ${language} · ${contact.studentName}`,
    idempotencyKey:`course-owner/${order.id}`,
    html:`<h1>Nuevo estudiante para coordinar</h1><p>Se confirmó el pago de la inscripción de <strong>${escapeEmailHtml(contact.studentName)}</strong>.</p>${paymentBreakdown(order)}<ul><li>Curso: ${escapeEmailHtml(language)} · ${escapeEmailHtml(objectiveLabel(selection.objective))}</li><li>Plan: ${escapeEmailHtml(plan)} · ${escapeEmailHtml(order.classes)} clases</li><li>Nivel: ${escapeEmailHtml(selection.level)}</li><li>Correo: ${escapeEmailHtml(contact.studentEmail)}</li><li>WhatsApp: ${escapeEmailHtml(contact.phone)}</li><li>Dirección: ${escapeEmailHtml(contact.address??'No registrada')} · ${escapeEmailHtml(contact.city??'')}</li><li>Propósito: ${escapeEmailHtml(contact.purpose??'No registrado')}</li><li>Pagador: ${escapeEmailHtml(contact.payerName)}</li><li>Firmante: ${escapeEmailHtml(contact.signerName??contact.payerName)}</li><li>Referencia: ${escapeEmailHtml(order.reference)}</li></ul><p>La tarea de coordinación quedó registrada en la plataforma.</p>`,
  });
}

export async function fulfillPaidCourseOrder(orderId:string) {
  const {data:order,error}=await createAdminClient().from('course_orders').select('*').eq('id',orderId).maybeSingle();
  if(error||!order)throw new Error('course_fulfillment_order_missing');
  const student=await runJob(orderId,'student_welcome',()=>welcomeStudent(order as CourseOrderRecord));
  const owner=await runJob(orderId,'owner_notification',()=>notifyOwner(order as CourseOrderRecord));
  if(!student||!owner)throw new Error('course_fulfillment_pending');
}
