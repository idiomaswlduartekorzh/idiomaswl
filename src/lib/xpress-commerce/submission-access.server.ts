import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';

export type SubmissionAccessResult = Readonly<{ access: 'membership' | 'single-credit' | 'public'; personalizedFeedback: boolean }>;

export async function recordXpressSubmissionAccess(input: { userId: string; examSlug: string; submissionId: string }): Promise<SubmissionAccessResult> {
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
  return { access: result.access, personalizedFeedback: result.personalizedFeedback === true };
}
