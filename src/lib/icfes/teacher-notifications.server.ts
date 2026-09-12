import 'server-only';

import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { escapeEmailHtml, sendCourseEmail } from '@/lib/course-pricing/email.server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { isJoseAdminEmail, normalizeAdminEmail } from '@/lib/config/admins';

type NotificationKind = 'owner_requested' | 'owner_due_6h' | 'owner_due_9h' | 'owner_due_11h' | 'owner_breached' | 'student_completed';
type NotificationRow = { id: string; review_id: string; kind: NotificationKind };

const DEFAULT_OWNER_EMAIL = 'david.duartes182@gmail.com';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function publicOrigin(): string {
  const configured = process.env.ICFES_PASE_ORIGIN?.trim();
  try {
    if (configured) {
      const value = new URL(configured);
      if (value.protocol === 'https:') return value.origin;
      if (process.env.VERCEL_ENV !== 'production' && value.protocol === 'http:'
        && (value.hostname === 'localhost' || value.hostname === '127.0.0.1')) return value.origin;
    }
  } catch {}
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    const previewHost = process.env.VERCEL_URL?.trim();
    if (previewHost && previewHost.length <= 253 && /^[a-z0-9.-]+$/i.test(previewHost)
      && !previewHost.startsWith('.') && !previewHost.endsWith('.') && !previewHost.includes('..')) {
      return `https://${previewHost}`;
    }
    throw new Error('icfes_teacher_origin_not_configured');
  }
  return 'https://www.idiomaswl.com';
}

async function finishNotification(row: NotificationRow, leaseId: string, success: boolean, error?: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? 'notification_failed');
  const { data, error: rpcError } = await createAdminClient().rpc('finish_xpress_teacher_review_notification', {
    p_notification: row.id,
    p_lease: leaseId,
    p_success: success,
    p_error: success ? null : message,
  }).abortSignal(AbortSignal.timeout(8000));
  if (rpcError || data !== true) throw new Error('icfes_teacher_notification_finish_failed');
}

async function loadNotificationContext(row: NotificationRow) {
  const db = createAdminClient();
  const { data: review, error: reviewError } = await db.from('xpress_teacher_reviews')
    .select('id,membership_id,icfes_attempt_id,status,requested_at,due_at,completed_at,human_attested_at,codex_model_reference,environment')
    .eq('id', row.review_id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (reviewError || !review) throw new Error('icfes_teacher_notification_review_missing');
  const { data: membership, error: membershipError } = await db.from('xpress_memberships')
    .select('source_order_id').eq('id', review.membership_id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (membershipError || !membership) throw new Error('icfes_teacher_notification_membership_missing');
  const { data: order, error: orderError } = await db.from('xpress_orders')
    .select('purchaser_email').eq('id', membership.source_order_id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (orderError || !order) throw new Error('icfes_teacher_notification_order_missing');
  return { review, studentEmail: String(order.purchaser_email) };
}

async function deliverNotification(row: NotificationRow): Promise<void> {
  const { review, studentEmail } = await loadNotificationContext(row);
  const isOwnerNotice = row.kind !== 'student_completed';
  if (isOwnerNotice && !['queued', 'in_review', 'needs_qa', 'failed'].includes(String(review.status))) return;
  if (row.kind === 'student_completed' && review.status !== 'completed') {
    throw new Error('icfes_teacher_notification_not_completed');
  }

  const reviewId = String(review.id);
  const dashboardUrl = `${publicOrigin()}/dashboard/admin/icfes-reviews`;
  if (isOwnerNotice) {
    const ownerEmail = normalizeAdminEmail(process.env.COURSE_OWNER_NOTIFICATION_EMAIL || DEFAULT_OWNER_EMAIL);
    if (!isJoseAdminEmail(ownerEmail)) throw new Error('icfes_teacher_owner_email_not_authorized');
    const subjects: Record<Exclude<NotificationKind, 'student_completed'>, string> = {
      owner_requested: 'Nueva revisión humana ICFES',
      owner_due_6h: 'Revisión ICFES: quedan 6 horas',
      owner_due_9h: 'Revisión ICFES: quedan 3 horas',
      owner_due_11h: 'Revisión ICFES: queda 1 hora',
      owner_breached: 'Revisión ICFES vencida',
    };
    await sendCourseEmail({
      to: ownerEmail,
      subject: `${review.environment === 'sandbox' ? '[SANDBOX] ' : ''}${subjects[row.kind as Exclude<NotificationKind, 'student_completed'>]}`,
      idempotencyKey: `icfes-teacher/${row.id}`,
      html: `<h1>${escapeEmailHtml(subjects[row.kind as Exclude<NotificationKind, 'student_completed'>])}</h1><p>La solicitud <strong>${escapeEmailHtml(reviewId)}</strong> está en estado <strong>${escapeEmailHtml(review.status)}</strong>.</p><p>Fecha límite: <strong>${escapeEmailHtml(new Date(String(review.due_at)).toLocaleString('es-CO', { timeZone: 'America/Bogota' }))}</strong>.</p><p><a href="${escapeEmailHtml(dashboardUrl)}">Abrir la bandeja privada</a></p><p>El correo no contiene respuestas ni datos personales del estudiante.</p>`,
    });
    return;
  }

  const attemptId = String(review.icfes_attempt_id ?? '');
  if (!UUID.test(attemptId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
    throw new Error('icfes_teacher_student_delivery_invalid');
  }
  const resultUrl = `${publicOrigin()}/practica/icfes-saber-11/resultados/${attemptId}`;
  const qualityApproved = Boolean(review.human_attested_at && review.codex_model_reference);
  await sendCourseEmail({
    to: studentEmail,
    subject: 'Tu retroalimentación ICFES está lista',
    idempotencyKey: `icfes-teacher/${row.id}`,
    html: `<h1>Tu retroalimentación ICFES está lista</h1><p>${qualityApproved
      ? 'Tu feedback pedagógico personalizado de WeLearn con asistencia de IA completó el control de calidad.'
      : 'Está listo tu feedback pedagógico personalizado de WeLearn con asistencia de IA; no se presenta como revisión humana.'}</p><p><a href="${escapeEmailHtml(resultUrl)}">Ver mi retroalimentación</a></p><p>Debes iniciar sesión con la misma cuenta que solicitó la revisión.</p>`,
  });
}

export async function recoverIcfesTeacherNotifications(limit = 20) {
  const safeLimit = Math.max(1, Math.min(50, Math.floor(limit)));
  const environment = getWompiServerConfig().environment;
  let sent = 0;
  let pending = 0;
  for (let index = 0; index < safeLimit; index += 1) {
    const leaseId = randomUUID();
    const { data, error } = await createAdminClient().rpc('claim_xpress_teacher_review_notification', {
      p_lease: leaseId,
      p_environment: environment,
    }).abortSignal(AbortSignal.timeout(8000));
    if (error) throw new Error('icfes_teacher_notification_claim_failed');
    if (!data) break;
    const row = data as NotificationRow;
    try {
      await deliverNotification(row);
      await finishNotification(row, leaseId, true);
      sent += 1;
    } catch (deliveryError) {
      try { await finishNotification(row, leaseId, false, deliveryError); } catch {}
      pending += 1;
    }
  }
  return { sent, pending };
}
