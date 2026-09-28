import {
  type DiagnosticObjectiveSkill,
  type DiagnosticRouteId,
  type DiagnosticSkillRouteMap,
} from './types.ts';

export const LOCATOR_OBJECTIVE_SKILLS = [
  'reading',
  'listening',
  'written-discourse',
  'grammar',
  'vocabulary',
] as const satisfies readonly DiagnosticObjectiveSkill[];

export interface LocatorSkillScore {
  correct: number;
  decisions: number;
  omitted: number;
}

export type LocatorScorecard = Readonly<Record<DiagnosticObjectiveSkill, LocatorSkillScore>>;

export type LocatorRouteReason =
  | 'LOW_TOTAL_EVIDENCE'
  | 'MID_TOTAL_EVIDENCE'
  | 'HIGH_TOTAL_EVIDENCE'
  | 'UNEVEN_PROFILE'
  | 'SKILL_EVIDENCE_OMITTED'
  | 'BOUNDARY_SCORE';

export interface LocatorRouteDecision {
  routeId: DiagnosticRouteId;
  totalCorrect: number;
  effectiveCorrect: number;
  totalDecisions: number;
  totalOmitted: number;
  skillRoutes: DiagnosticSkillRouteMap;
  requiresConfirmation: boolean;
  reasons: readonly LocatorRouteReason[];
}

export interface LocatorRoutingPolicy {
  decisionsPerSkill: number;
  lowMaximumCorrect: number;
  highMinimumCorrect: number;
  highMinimumCorrectPerSkill: number;
  boundaryDistance: number;
  confirmationSpread: number;
}

/**
 * Provisional routing policy for the uncalibrated MST. These values choose the
 * next module; they never claim a CEFR result. Pilot data must version any
 * replacement policy before it is used operationally.
 */
export const ENGLISH_LOCATOR_ROUTING_POLICY: LocatorRoutingPolicy = {
  decisionsPerSkill: 3,
  lowMaximumCorrect: 6,
  highMinimumCorrect: 12,
  highMinimumCorrectPerSkill: 1,
  boundaryDistance: 0,
  confirmationSpread: 3,
};

function assertIntegerInRange(value: number, minimum: number, maximum: number, label: string): void {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new RangeError(`${label} must be an integer between ${minimum} and ${maximum}`);
  }
}

export function routeEnglishLocator(
  scorecard: LocatorScorecard,
  policy: LocatorRoutingPolicy = ENGLISH_LOCATOR_ROUTING_POLICY,
): LocatorRouteDecision {
  if (policy.lowMaximumCorrect >= policy.highMinimumCorrect) {
    throw new Error('routing thresholds overlap');
  }

  const scores = LOCATOR_OBJECTIVE_SKILLS.map(skill => {
    const score = scorecard[skill];
    if (!score) throw new Error(`missing locator evidence for ${skill}`);
    if (score.decisions !== policy.decisionsPerSkill) {
      throw new Error(`${skill} must contain exactly ${policy.decisionsPerSkill} locator decisions`);
    }
    assertIntegerInRange(score.correct, 0, score.decisions, `${skill}.correct`);
    assertIntegerInRange(score.omitted, 0, score.decisions, `${skill}.omitted`);
    if (score.correct + score.omitted > score.decisions) {
      throw new RangeError(`${skill} correct and omitted decisions exceed the delivered evidence`);
    }
    return score;
  });

  const totalCorrect = scores.reduce((sum, score) => sum + score.correct, 0);
  const totalDecisions = scores.reduce((sum, score) => sum + score.decisions, 0);
  const totalOmitted = scores.reduce((sum, score) => sum + score.omitted, 0);
  const totalAttempted = totalDecisions - totalOmitted;
  const effectiveCorrect = totalAttempted
    ? Math.round((totalCorrect / totalAttempted) * totalDecisions)
    : 0;
  const skillRoutes = Object.fromEntries(LOCATOR_OBJECTIVE_SKILLS.map((skill, index) => {
    const score = scores[index];
    const attempted = score.decisions - score.omitted;
    if (attempted === 0) return [skill, null];
    const accuracy = score.correct / attempted;
    const routeId: DiagnosticRouteId = accuracy <= 1 / 3
      ? 'low-a1-a2'
      : accuracy >= 0.8 && attempted >= 2
        ? 'high-c1-c2'
        : 'mid-b1-b2';
    return [skill, routeId];
  })) as DiagnosticSkillRouteMap;
  const correctCounts = scores.map(score => score.correct);
  const spread = Math.max(...correctCounts) - Math.min(...correctCounts);
  const unevenProfile = spread >= policy.confirmationSpread;
  const highEvidence =
    effectiveCorrect >= policy.highMinimumCorrect &&
    scores.every(score => {
      const attempted = score.decisions - score.omitted;
      return attempted === 0 || score.correct >= Math.min(policy.highMinimumCorrectPerSkill, attempted);
    });

  let routeId: DiagnosticRouteId;
  const reasons: LocatorRouteReason[] = [];
  if (effectiveCorrect <= policy.lowMaximumCorrect) {
    routeId = 'low-a1-a2';
    reasons.push('LOW_TOTAL_EVIDENCE');
  } else if (highEvidence) {
    routeId = 'high-c1-c2';
    reasons.push('HIGH_TOTAL_EVIDENCE');
  } else {
    routeId = 'mid-b1-b2';
    reasons.push('MID_TOTAL_EVIDENCE');
  }

  const boundaryScore =
    Math.abs(effectiveCorrect - policy.lowMaximumCorrect) <= policy.boundaryDistance ||
    Math.abs(effectiveCorrect - policy.highMinimumCorrect) <= policy.boundaryDistance;
  if (unevenProfile) reasons.push('UNEVEN_PROFILE');
  if (totalOmitted > 0) reasons.push('SKILL_EVIDENCE_OMITTED');
  if (boundaryScore) reasons.push('BOUNDARY_SCORE');

  return {
    routeId,
    totalCorrect,
    effectiveCorrect,
    totalDecisions,
    totalOmitted,
    skillRoutes,
    requiresConfirmation: unevenProfile || boundaryScore || totalOmitted > 0,
    reasons,
  };
}
