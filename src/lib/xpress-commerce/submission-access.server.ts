import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { examCan } from './access';
import { parseXpressExamSlug, resolveExamAccessForUser } from './access.server';

export type SubmissionAccessKind = 'membership' | 'single-credit' | 'welearn' | 'public';
export type SubmissionAccessResult = Readonly<{
  access: SubmissionAccessKind;
  detailedResults: boolean;
  personalizedFeedback: boolean;
}>;

export async function recordXpressSubmissionAccess(input: { userId: string; examSlug: string; submissionId: string }): Promise<SubmissionAccessResult> {
  const examSlug = parseXpressExamSlug(input.examSlug);
  if (!examSlug) throw new Error('xpress_submission_access_invalid_exam');
  const decision = await resolveExamAccessForUser(input.userId, examSlug);
  if (decision.source === 'welearn') {
    return { access: 'welearn', detailedResults: true, personalizedFeedback: true };
  }
  if (decision.source === 'autodidacta-free') {
    return { access: 'public', detailedResults: false, personalizedFeedback: false };
  }

  const { data, error } = await createAdminClient().rpc('record_xpress_submission_access', {
    p_user: input.userId,
    p_exam: input.examSlug,
    p_submission: input.submissionId,
    p_environment: getWompiServerConfig().environment,
  });
  if (error || !data || typeof data !== 'object') {
    console.error('[xpress-access] Could not persist submission entitlement', { submissionId: input.submissionId });
    throw new Error('xpress_submission_access_unavailable');
  }
  const result = data as { access?: unknown; personalizedFeedback?: unknown };
  if (result.access !== 'membership' && result.access !== 'single-credit' && result.access !== 'public') {
    throw new Error('xpress_submission_access_invalid');
  }
  return {
    access: result.access,
    detailedResults: result.access !== 'public' && examCan(decision.level, 'view-detailed-results'),
    personalizedFeedback: result.personalizedFeedback === true,
  };
}
