import {
  type DiagnosticObjectiveSkill,
  type DiagnosticRouteId,
} from './types.ts';

export const LOCATOR_OBJECTIVE_SKILLS = [
  'reading',
  'listening',
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
  | 'BOUNDARY_SCORE';

export interface LocatorRouteDecision {
  routeId: DiagnosticRouteId;
  totalCorrect: number;
  totalDecisions: number;
  totalOmitted: number;
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
  lowMaximumCorrect: 4,
  highMinimumCorrect: 9,
  highMinimumCorrectPerSkill: 1,
  boundaryDistance: 1,
  confirmationSpread: 2,
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
  const correctCounts = scores.map(score => score.correct);
  const spread = Math.max(...correctCounts) - Math.min(...correctCounts);
  const unevenProfile = spread >= policy.confirmationSpread;
  const highEvidence =
    totalCorrect >= policy.highMinimumCorrect &&
    correctCounts.every(correct => correct >= policy.highMinimumCorrectPerSkill);

  let routeId: DiagnosticRouteId;
  const reasons: LocatorRouteReason[] = [];
  if (totalCorrect <= policy.lowMaximumCorrect) {
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
    Math.abs(totalCorrect - policy.lowMaximumCorrect) <= policy.boundaryDistance ||
    Math.abs(totalCorrect - policy.highMinimumCorrect) <= policy.boundaryDistance;
  if (unevenProfile) reasons.push('UNEVEN_PROFILE');
  if (boundaryScore) reasons.push('BOUNDARY_SCORE');

  return {
    routeId,
    totalCorrect,
    totalDecisions,
    totalOmitted,
    requiresConfirmation: unevenProfile || boundaryScore,
    reasons,
  };
}

