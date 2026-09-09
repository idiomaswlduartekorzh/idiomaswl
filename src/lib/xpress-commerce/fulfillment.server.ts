import 'server-only';
import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { escapeEmailHtml, sendCourseEmail } from '@/lib/course-pricing/email.server';
import { XPRESS_EXAM_OPTIONS } from '@/lib/student-onboarding/catalog';
import { getXpressOffer } from './catalog';

type JobKind = 'student_receipt' | 'owner_notification';
type XpressOrderRecord = {
  id: string;
  user_id: string;
  purchaser_email: string;
  reference: string;
  amount_in_cents: number;
  offer_id: 'exam-auto' | 'exam-teacher';
  exam_slug: string;
};

const DEFAULT_OWNER_EMAIL = 'david_duarte182@hotmail.com';

async function finish(orderId: string, kind: JobKind, lease: string, success: boolean, error?: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? 'failed');
  const { data, error: rpcError } = await createAdminClient().rpc('finish_xpress_job', {
    p_order: orderId,
    p_kind: kind,
    p_lease: lease,
    p_success: success,
    p_error: success ? null : message,
  });
  if (rpcError || data !== true) throw new Error('xpress_job_finish_failed');
}

async function runJob(orderId: string, kind: JobKind, work: () => Promise<void>) {
  const lease = randomUUID();
  const { data, error } = await createAdminClient().rpc('claim_xpress_job', {
    p_order: orderId,
    p_kind: kind,
    p_lease: lease,
  });
  if (error) throw new Error('xpress_job_claim_failed');
  if (data !== true) return true;
  try {
    await work();
    await finish(orderId, kind, lease, true);
    return true;
  } catch (jobError) {
    try { await finish(orderId, kind, lease, false, jobError); } catch {}
    return false;
  }
}

function labels(order: XpressOrderRecord) {
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === order.exam_slug)?.label ?? order.exam_slug;
  const offer = getXpressOffer(order.offer_id);
  return { exam, offer };
}

async function sendReceipt(order: XpressOrderRecord) {
  const { exam, offer } = labels(order);
  const { data: profile } = await createAdminClient().from('profiles').select('full_name,name').eq('id', order.user_id).maybeSingle();
  const name = profile?.full_name || profile?.name || 'estudiante';
  const { error } = await createAdminClient().from('profiles').update({ xpress_plan_interest: order.offer_id }).eq('id', order.user_id);
  if (error) throw new Error('xpress_profile_update_failed');
  await sendCourseEmail({
    to: order.purchaser_email,
    subject: `Tu membresía de ${exam} está activa`,
    idempotencyKey: `xpress-receipt/${order.id}`,
    html: `<h1>Tu membresía está activa, ${escapeEmailHtml(name)}</h1><p>Confirmamos el pago de <strong>${escapeEmailHtml(offer.name)}</strong> para <strong>${escapeEmailHtml(exam)}</strong>.</p><p>Valor: <strong>$${Math.round(order.amount_in_cents / 100).toLocaleString('es-CO')} COP</strong>.</p><p>Referencia: <strong>${escapeEmailHtml(order.reference)}</strong>.</p><p><a href="https://www.idiomaswl.com/dashboard/student">Entrar a WeLearn</a></p><p>Conserva este correo como comprobante.</p>`,
  });
}

async function notifyOwner(order: XpressOrderRecord) {
  const to = process.env.COURSE_OWNER_NOTIFICATION_EMAIL || DEFAULT_OWNER_EMAIL;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('xpress_owner_email_not_configured');
  const { exam, offer } = labels(order);
  await sendCourseEmail({
    to,
    subject: `Nuevo pago Xpress: ${exam}`,
    idempotencyKey: `xpress-owner/${order.id}`,
    html: `<h1>Nuevo pago de membresía</h1><ul><li>Estudiante: ${escapeEmailHtml(order.purchaser_email)}</li><li>Examen: ${escapeEmailHtml(exam)}</li><li>Plan: ${escapeEmailHtml(offer.name)}</li><li>Valor: $${Math.round(order.amount_in_cents / 100).toLocaleString('es-CO')} COP</li><li>Referencia: ${escapeEmailHtml(order.reference)}</li></ul>`,
  });
}

export async function fulfillPaidXpressOrder(orderId: string) {
  const { data: order, error } = await createAdminClient().from('xpress_orders').select('*').eq('id', orderId).maybeSingle();
  if (error || !order) throw new Error('xpress_fulfillment_order_missing');
  const receipt = await runJob(orderId, 'student_receipt', () => sendReceipt(order as XpressOrderRecord));
  const owner = await runJob(orderId, 'owner_notification', () => notifyOwner(order as XpressOrderRecord));
  if (!receipt || !owner) throw new Error('xpress_fulfillment_pending');
}
