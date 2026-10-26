'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { notifyExamReview } from '@/lib/student-notifications.server';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function requestHumanXpressReview(form: FormData): Promise<void> {
  const submissionId = String(form.get('submissionId') ?? '');
  const reviewKind = String(form.get('reviewKind') ?? '');
  if (!UUID.test(submissionId) || (reviewKind !== 'writing' && reviewKind !== 'speaking')) {
    throw new Error('Solicitud de revisión inválida.');
  }
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user?.email_confirmed_at) throw new Error('Inicia sesión para solicitar la revisión.');
  const { error } = await createAdminClient().rpc('request_xpress_human_review', {
    p_user: user.id,
    p_submission: submissionId,
    p_kind: reviewKind,
    p_environment: getWompiServerConfig().environment,
  });
  if (error) {
    if (error.message.includes('human_review_quota_exhausted')) throw new Error('Ya utilizaste las 5 revisiones humanas de este periodo.');
    if (error.message.includes('human_review_not_included')) throw new Error('Tu plan actual no incluye esta revisión humana.');
    throw new Error('No pudimos registrar la revisión. Intenta nuevamente.');
  }
  revalidatePath(`/dashboard/student/resultados/${submissionId}`);
  revalidatePath('/dashboard/student');
}

function reviewText(form: FormData, key: string, label: string): string {
  const value = String(form.get(key) ?? '').trim();
  if (value.length < 12 || value.length > 2400) throw new Error(`Revisa ${label}: escribe entre 12 y 2400 caracteres.`);
  return value;
}

export async function completeXpressReview(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const reviewId = String(form.get('reviewId') ?? '');
  if (!UUID.test(reviewId)) throw new Error('Revisión inválida.');
  const report = {
    summary: reviewText(form, 'summary', 'la lectura del resultado'),
    strengths: reviewText(form, 'strengths', 'las fortalezas'),
    improvements: reviewText(form, 'improvements', 'los aspectos por mejorar'),
    nextSteps: reviewText(form, 'nextSteps', 'el siguiente paso'),
  };
  const now = new Date().toISOString();
  const { data, error } = await createAdminClient().from('xpress_personalized_feedback_requests')
    .update({ status: 'completed', generated_report: report, reviewer_id: admin.id,
      completed_at: now, updated_at: now, last_error: null })
    .eq('id', reviewId).in('status', ['pending', 'processing', 'failed'])
    .select('submission_id').maybeSingle();
  if (error || !data) throw new Error('La revisión ya se cerró o no pudo guardarse.');
  try { await notifyExamReview(data.submission_id, 'Xpress', 'personalized') } catch (notificationError) { console.error('[student-notification:xpress]', notificationError) }
  revalidatePath('/dashboard/admin/revisiones-xpress');
  revalidatePath(`/dashboard/student/resultados/${data.submission_id}`);
  revalidatePath('/dashboard/student');
}

export async function completeHumanXpressReview(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const reviewId = String(form.get('reviewId') ?? '');
  if (!UUID.test(reviewId)) throw new Error('Revisión humana inválida.');
  const db = createAdminClient();
  const { data: review, error: reviewError } = await db.from('xpress_human_review_requests')
    .select('membership_id,submission_id').eq('id', reviewId).in('status', ['pending', 'assigned']).maybeSingle();
  if (reviewError || !review) throw new Error('La revisión ya se cerró o no existe.');
  const { data: membership, error: membershipError } = await db.from('xpress_memberships')
    .select('offer_id').eq('id', review.membership_id).maybeSingle();
  if (membershipError || !membership) throw new Error('No pudimos verificar el plan de esta revisión.');

  const improvementPlan = String(form.get('improvementPlan') ?? '').trim();
  if (membership.offer_id === 'exam-teacher' && (improvementPlan.length < 12 || improvementPlan.length > 2400)) {
    throw new Error('El plan Personalizado requiere un plan de mejora de 12 a 2400 caracteres.');
  }
  if (improvementPlan.length > 2400) throw new Error('El plan de mejora no puede superar 2400 caracteres.');
  const report = {
    summary: reviewText(form, 'summary', 'la evaluación'),
    strengths: reviewText(form, 'strengths', 'las fortalezas'),
    improvements: reviewText(form, 'improvements', 'los aspectos por mejorar'),
    improvementPlan: improvementPlan || null,
  };
  const now = new Date().toISOString();
  const { data, error } = await db.from('xpress_human_review_requests')
    .update({ status: 'completed', review_report: report, reviewer_id: admin.id,
      completed_at: now, updated_at: now })
    .eq('id', reviewId).in('status', ['pending', 'assigned'])
    .select('submission_id').maybeSingle();
  if (error || !data) throw new Error('La revisión ya se cerró o no pudo guardarse.');
  try { await notifyExamReview(data.submission_id, 'Xpress', `human-${reviewId}`) } catch (notificationError) { console.error('[student-notification:xpress-human]', notificationError) }
  revalidatePath('/dashboard/admin/revisiones-xpress');
  revalidatePath(`/dashboard/student/resultados/${data.submission_id}`);
  revalidatePath('/dashboard/student');
}
