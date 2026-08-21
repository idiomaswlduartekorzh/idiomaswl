import 'server-only';

import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';

/** Durable cross-instance quota. Only a namespaced SHA-256 digest is stored. */
export async function consumeExamReviewRateLimit(input: {
  namespace: string;
  identifier: string;
  limit: number;
  windowSeconds: number;
}): Promise<boolean> {
  const keyHash = createHash('sha256')
    .update(`${input.namespace}\0${input.identifier}`)
    .digest('hex');
  const { data, error } = await createAdminClient().rpc('consume_ielts_rate_limit', {
    p_key_hash: keyHash,
    p_limit: input.limit,
    p_window_seconds: input.windowSeconds,
  });
  if (error) {
    console.error('[exam-review-rate-limit] Durable quota failed closed:', input.namespace, error.message);
    return false;
  }
  return data === true;
}
