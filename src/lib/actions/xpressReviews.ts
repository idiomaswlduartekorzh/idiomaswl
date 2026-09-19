'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
  revalidatePath('/dashboard/admin/revisiones-xpress');
  revalidatePath(`/dashboard/student/resultados/${data.submission_id}`);
  revalidatePath('/dashboard/student');
}
