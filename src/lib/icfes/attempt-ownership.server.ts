import 'server-only';

import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyIcfesAttemptToken } from './attempt-token.server';
import { isIcfesPersistenceEnabled } from './product-config.server';

export class IcfesAttemptClaimError extends Error {
  constructor(public readonly code: 'DISABLED' | 'INVALID_CAPABILITY' | 'TAKEOVER' | 'UNAVAILABLE') {
    super(code);
  }
}

export async function claimIcfesAttemptForUser(input: {
  attemptId: string;
  token: string | undefined;
  userId: string;
}) {
  if (!isIcfesPersistenceEnabled()) throw new IcfesAttemptClaimError('DISABLED');
  const capability = verifyIcfesAttemptToken(input.token);
  if (!capability || capability.attemptId !== input.attemptId) {
    throw new IcfesAttemptClaimError('INVALID_CAPABILITY');
  }
  const tokenHash = createHash('sha256').update(input.token!, 'utf8').digest('hex');
  const { data, error } = await createAdminClient().rpc('claim_icfes_attempt', {
    p_user: input.userId,
    p_attempt: input.attemptId,
    p_exam: capability.examId,
    p_token_hash: tokenHash,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error) {
    if (error.message.includes('icfes_attempt_owned_by_another_user')) throw new IcfesAttemptClaimError('TAKEOVER');
    if (error.message.includes('icfes_attempt_claim_mismatch')) throw new IcfesAttemptClaimError('INVALID_CAPABILITY');
    throw new IcfesAttemptClaimError('UNAVAILABLE');
  }
  if (!data) throw new IcfesAttemptClaimError('UNAVAILABLE');
  return data;
}
