import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';

type SubmissionAccessResult = Readonly<{ access: 'membership' | 'single-credit' | 'public'; personalizedFeedback: boolean }>;

export async function recordXpressSubmissionAccess(input: { userId: string; examSlug: string; submissionId: string }): Promise<SubmissionAccessResult> {
  const db = createAdminClient();
  const environment = getWompiServerConfig().environment;
  const { data: submission, error: submissionError } = await db.from('exam_submissions').select('id')
    .eq('id', input.submissionId).eq('user_id', input.userId).eq('exam_slug', input.examSlug).maybeSingle();
  if (submissionError || !submission) return { access: 'public', personalizedFeedback: false };

  const now = new Date().toISOString();
  const { data: membership, error: membershipError } = await db.from('xpress_memberships')
    .select('id,offer_id').eq('user_id', input.userId).eq('environment', environment).eq('exam_slug', input.examSlug)
    .eq('status', 'active').lte('starts_at', now).gt('ends_at', now)
    .order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (membershipError) return { access: 'public', personalizedFeedback: false };
  if (membership) {
    const personalizedFeedback = membership.offer_id === 'exam-teacher';
    const { error: accessError } = await db.from('xpress_submission_access').upsert({
      user_id: input.userId, submission_id: input.submissionId, environment, exam_slug: input.examSlug,
      access_kind: 'membership', offer_id: membership.offer_id, membership_id: membership.id,
      credit_id: null, personalized_feedback: personalizedFeedback,
    }, { onConflict: 'submission_id', ignoreDuplicates: true });
    if (accessError) console.error('[xpress-access] Could not persist membership submission access', { submissionId: input.submissionId });
    if (personalizedFeedback) {
      const { error } = await db.from('xpress_personalized_feedback_requests').upsert({
        user_id: input.userId, membership_id: membership.id, submission_id: input.submissionId,
        exam_slug: input.examSlug, status: 'pending',
      }, { onConflict: 'submission_id', ignoreDuplicates: true });
      if (error) console.error('[xpress-access] Could not queue personalized feedback', { submissionId: input.submissionId });
    }
    return { access: 'membership', personalizedFeedback };
  }

  const { data: creditId, error: creditError } = await db.rpc('consume_xpress_exam_credit', {
    p_user: input.userId, p_exam: input.examSlug, p_submission: input.submissionId,
  });
  if (creditError || !creditId) return { access: 'public', personalizedFeedback: false };
  const { error: accessError } = await db.from('xpress_submission_access').upsert({
    user_id: input.userId, submission_id: input.submissionId, environment, exam_slug: input.examSlug,
    access_kind: 'single-credit', offer_id: 'exam-single', membership_id: null,
    credit_id: String(creditId), personalized_feedback: false,
  }, { onConflict: 'submission_id', ignoreDuplicates: true });
  if (accessError) console.error('[xpress-access] Could not persist single-exam submission access', { submissionId: input.submissionId });
  return { access: 'single-credit', personalizedFeedback: false };
}
