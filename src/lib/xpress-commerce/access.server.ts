import 'server-only';

import { XPRESS_EXAM_OPTIONS, type XpressExamSlug } from '@/lib/student-onboarding/catalog';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import {
  EXAM_ACCESS_MATRIX,
  type ExamAccessDecision,
  type ExamAccessLevel,
  type ExamAccessSource,
} from './access';
import type { AutodidactaPlanId } from './catalog';

type DatabaseAccessDecision = Readonly<{
  level: ExamAccessLevel;
  planId: AutodidactaPlanId | 'welearn-full' | null;
  source: ExamAccessSource;
  expiresAt: string | null;
}>;

export function parseXpressExamSlug(value: unknown): XpressExamSlug | null {
  return typeof value === 'string' && XPRESS_EXAM_OPTIONS.some((exam) => exam.id === value)
    ? value as XpressExamSlug
    : null;
}

function isDatabaseAccessDecision(value: unknown): value is DatabaseAccessDecision {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  return ['locked', 'free', 'essential', 'autodidacta', 'pro', 'welearn-full'].includes(String(input.level))
    && ['none', 'autodidacta-free', 'xpress-membership', 'welearn'].includes(String(input.source))
    && (input.planId === null || ['exam-free', 'exam-basic', 'exam-auto', 'exam-teacher', 'welearn-full'].includes(String(input.planId)))
    && (input.expiresAt === null || typeof input.expiresAt === 'string');
}

export async function resolveExamAccessForUser(userId: string, examSlug: XpressExamSlug): Promise<ExamAccessDecision> {
  const { environment } = getWompiServerConfig();
  const { data, error } = await createAdminClient().rpc('resolve_exam_access', {
    p_user: userId,
    p_exam: examSlug,
    p_environment: environment,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error || !isDatabaseAccessDecision(data)) throw new Error('exam_access_lookup_failed');
  return { examSlug, ...data };
}

export async function claimFreeExamAccess(userId: string, examSlug: XpressExamSlug): Promise<ExamAccessDecision> {
  const { error } = await createAdminClient().rpc('claim_free_exam_access', {
    p_user: userId,
    p_exam: examSlug,
  }).abortSignal(AbortSignal.timeout(8000));
  if (error) {
    if (error.message.includes('free_exam_already_claimed')) throw new Error('free_exam_already_claimed');
    if (error.message.includes('free_exam_requires_first_access')) throw new Error('free_exam_requires_first_access');
    throw new Error('free_exam_claim_failed');
  }
  return resolveExamAccessForUser(userId, examSlug);
}

export async function hasClaimedFreeExamAccess(userId: string): Promise<boolean> {
  const { count, error } = await createAdminClient().from('exam_access_grants')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('source', 'autodidacta-free')
    .abortSignal(AbortSignal.timeout(8000));
  if (error) throw new Error('free_exam_claim_lookup_failed');
  return (count ?? 0) > 0;
}

/**
 * General study-library downloads are not tied to one exam slug. They are
 * available when the learner has at least one current paid autonomous access
 * or an active WeLearn academic assignment. The free claim intentionally does
 * not qualify.
 */
export async function hasMaterialDownloadAccess(userId: string): Promise<boolean> {
  const { environment } = getWompiServerConfig();
  const now = new Date().toISOString();
  const admin = createAdminClient();
  const [membership, welearnGrant] = await Promise.all([
    admin.from('xpress_memberships')
      .select('id')
      .eq('user_id', userId)
      .eq('environment', environment)
      .eq('status', 'active')
      .lte('starts_at', now)
      .gt('ends_at', now)
      .limit(1)
      .abortSignal(AbortSignal.timeout(8000))
      .maybeSingle(),
    admin.from('exam_access_grants')
      .select('id')
      .eq('user_id', userId)
      .eq('source', 'welearn')
      .eq('status', 'active')
      .lte('starts_at', now)
      .or(`ends_at.is.null,ends_at.gt.${now}`)
      .limit(1)
      .abortSignal(AbortSignal.timeout(8000))
      .maybeSingle(),
  ]);
  if (membership.error || welearnGrant.error) throw new Error('material_access_lookup_failed');
  return Boolean(membership.data || welearnGrant.data);
}

export function publicExamAccessPayload(decision: ExamAccessDecision) {
  return {
    examSlug: decision.examSlug,
    level: decision.level,
    planId: decision.planId,
    source: decision.source,
    expiresAt: decision.expiresAt,
    capabilities: EXAM_ACCESS_MATRIX[decision.level],
  } as const;
}
