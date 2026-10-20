export type AutodidactaPlanId = 'exam-free' | 'exam-basic' | 'exam-auto' | 'exam-teacher';

export type ExamAccessLevel =
  | 'anonymous'
  | 'locked'
  | 'free'
  | 'essential'
  | 'autodidacta'
  | 'pro'
  | 'welearn-full';

export type ExamCapability =
  | 'discover-public-content'
  | 'start-exam'
  | 'save-result'
  | 'view-total-score'
  | 'view-detailed-results'
  | 'play-required-audio'
  | 'download-materials'
  | 'automatic-feedback'
  | 'human-review'
  | 'improvement-plan';

export type ExamAccessSource = 'anonymous' | 'none' | 'autodidacta-free' | 'xpress-membership' | 'welearn';

export type ExamAccessDecision = Readonly<{
  examSlug: string;
  level: ExamAccessLevel;
  planId: AutodidactaPlanId | 'welearn-full' | null;
  source: ExamAccessSource;
  expiresAt: string | null;
}>;

export type ExamMembershipCandidate = Readonly<{
  examSlug: string;
  offerId: Exclude<AutodidactaPlanId, 'exam-free'>;
  status: 'active' | 'revoked';
  startsAt: string;
  endsAt: string;
}>;

export type ExamFreeClaim = Readonly<{
  examSlug: string;
  status: 'active' | 'revoked';
}>;

export type WeLearnExamAssignment = Readonly<{
  examSlug: string;
  status: 'active' | 'revoked' | 'completed';
}>;

const PUBLIC_CAPABILITIES = ['discover-public-content'] as const satisfies readonly ExamCapability[];
const PRACTICE_CAPABILITIES = [
  ...PUBLIC_CAPABILITIES,
  'start-exam',
  'save-result',
  'view-total-score',
  'play-required-audio',
] as const satisfies readonly ExamCapability[];
const ESSENTIAL_CAPABILITIES = [
  ...PRACTICE_CAPABILITIES,
  'view-detailed-results',
  'download-materials',
  'automatic-feedback',
] as const satisfies readonly ExamCapability[];

export const EXAM_ACCESS_MATRIX = Object.freeze({
  anonymous: PUBLIC_CAPABILITIES,
  locked: PUBLIC_CAPABILITIES,
  free: PRACTICE_CAPABILITIES,
  essential: ESSENTIAL_CAPABILITIES,
  autodidacta: [...ESSENTIAL_CAPABILITIES, 'human-review'],
  pro: [...ESSENTIAL_CAPABILITIES, 'human-review', 'improvement-plan'],
  'welearn-full': [...ESSENTIAL_CAPABILITIES, 'human-review', 'improvement-plan'],
} as const satisfies Readonly<Record<ExamAccessLevel, readonly ExamCapability[]>>);

export const AUTODIDACTA_PLAN_ORDER = Object.freeze([
  'exam-free',
  'exam-basic',
  'exam-auto',
  'exam-teacher',
] as const satisfies readonly AutodidactaPlanId[]);

const PAID_PLAN_RANK: Readonly<Record<Exclude<AutodidactaPlanId, 'exam-free'>, number>> = {
  'exam-basic': 1,
  'exam-auto': 2,
  'exam-teacher': 3,
};

export function examAccessLevelForPlan(planId: AutodidactaPlanId | 'welearn-full'): ExamAccessLevel {
  if (planId === 'exam-free') return 'free';
  if (planId === 'exam-basic') return 'essential';
  if (planId === 'exam-auto') return 'autodidacta';
  if (planId === 'exam-teacher') return 'pro';
  return 'welearn-full';
}

export function examCan(level: ExamAccessLevel, capability: ExamCapability): boolean {
  return (EXAM_ACCESS_MATRIX[level] as readonly ExamCapability[]).includes(capability);
}

export function availableAutodidactaPlans(hasClaimedFreeExam: boolean): readonly AutodidactaPlanId[] {
  return hasClaimedFreeExam ? AUTODIDACTA_PLAN_ORDER.slice(1) : AUTODIDACTA_PLAN_ORDER;
}

export function freeExamClaimDecision(
  existingClaim: ExamFreeClaim | null | undefined,
  requestedExamSlug: string,
): 'available' | 'already-active' | 'already-used' {
  const requested = requestedExamSlug.trim().toLowerCase();
  if (!requested) throw new Error('exam_slug_required');
  if (!existingClaim) return 'available';
  if (existingClaim.status === 'active' && existingClaim.examSlug === requested) return 'already-active';
  return 'already-used';
}

export function resolveExamAccess(input: Readonly<{
  authenticated: boolean;
  examSlug: string;
  now?: Date;
  freeClaim?: ExamFreeClaim | null;
  memberships?: readonly ExamMembershipCandidate[];
  welearnAssignments?: readonly WeLearnExamAssignment[];
}>): ExamAccessDecision {
  const examSlug = input.examSlug.trim().toLowerCase();
  if (!examSlug) throw new Error('exam_slug_required');
  if (!input.authenticated) {
    return { examSlug, level: 'anonymous', planId: null, source: 'anonymous', expiresAt: null };
  }

  const welearn = input.welearnAssignments?.some(
    (assignment) => assignment.examSlug === examSlug && assignment.status === 'active',
  );
  if (welearn) {
    return { examSlug, level: 'welearn-full', planId: 'welearn-full', source: 'welearn', expiresAt: null };
  }

  const now = (input.now ?? new Date()).getTime();
  const membership = (input.memberships ?? [])
    .filter((candidate) => candidate.examSlug === examSlug
      && candidate.status === 'active'
      && new Date(candidate.startsAt).getTime() <= now
      && new Date(candidate.endsAt).getTime() > now)
    .sort((left, right) => PAID_PLAN_RANK[right.offerId] - PAID_PLAN_RANK[left.offerId])[0];

  if (membership) {
    return {
      examSlug,
      level: examAccessLevelForPlan(membership.offerId),
      planId: membership.offerId,
      source: 'xpress-membership',
      expiresAt: membership.endsAt,
    };
  }

  if (input.freeClaim?.status === 'active' && input.freeClaim.examSlug === examSlug) {
    return { examSlug, level: 'free', planId: 'exam-free', source: 'autodidacta-free', expiresAt: null };
  }

  return { examSlug, level: 'locked', planId: null, source: 'none', expiresAt: null };
}

