import 'server-only';

import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import type { IcfesAnswerMap, IcfesBasicResultDto } from './attempt-contract';
import { isIcfesPersistenceEnabled } from './product-config.server';

export type StoredIcfesAttempt = Readonly<{
  attemptId: string;
  examId: string;
  userId: string | null;
  answers: IcfesAnswerMap;
  result: IcfesBasicResultDto;
}>;

export function hashIcfesAttemptToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export async function readOwnedIcfesAttempt(
  attemptId: string,
  token: string,
): Promise<StoredIcfesAttempt | null> {
  if (!isIcfesPersistenceEnabled()) return null;
  const admin = createAdminClient();
  const { data: { user } } = await (await createClient()).auth.getUser();
  const { data: attempt, error } = await admin.from('icfes_attempts')
    .select('id,exam_id,user_id,access_token_hash,answers,basic_result')
    .eq('id', attemptId)
    .maybeSingle();
  if (error || !attempt || attempt.access_token_hash !== hashIcfesAttemptToken(token)
    || (attempt.user_id && attempt.user_id !== user?.id)) return null;
  return {
    attemptId: attempt.id,
    examId: attempt.exam_id,
    userId: attempt.user_id,
    answers: attempt.answers as IcfesAnswerMap,
    result: attempt.basic_result as IcfesBasicResultDto,
  };
}
