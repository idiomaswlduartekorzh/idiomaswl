import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';

export interface RecomputedIeltsScore {
  writingBand: number | null;
  speakingBand: number | null;
  overallBand: number | null;
  final: boolean;
}

export async function recomputeIeltsSubmissionScore(
  submissionId: string,
): Promise<RecomputedIeltsScore> {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc('recompute_ielts_submission_score', {
    p_submission_id: submissionId,
  });

  if (error || !data || typeof data !== 'object') {
    throw new Error(error?.message || 'No pudimos consolidar las bandas IELTS.');
  }

  const result = data as Record<string, unknown>;
  const band = (value: unknown) => typeof value === 'number' ? value : null;
  return {
    writingBand: band(result.writingBand),
    speakingBand: band(result.speakingBand),
    overallBand: band(result.overallBand),
    final: result.final === true,
  };
}
