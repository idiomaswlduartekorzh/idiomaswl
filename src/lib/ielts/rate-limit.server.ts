import 'server-only';

import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';

/**
 * Durable, cross-instance IELTS quota. Raw emails, IP addresses and bearer
 * tokens never enter the rate-limit table; only a namespaced SHA-256 digest is
 * stored. The database function performs the increment atomically.
 */
export async function consumeIeltsRateLimit(input: {
  namespace: string;
  identifier: string;
  limit: number;
  windowSeconds: number;
}): Promise<boolean> {
  return consumeExamReviewRateLimit(input);
}
