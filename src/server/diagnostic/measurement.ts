import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import {
  CEFR_LEVELS,
  type CefrLevel,
  type DiagnosticObjectiveSkill,
  type DiagnosticResultProfile,
  type DiagnosticSkillEvidence,
} from '../../lib/diagnostic/types.ts';
import type { DiagnosticObjectiveOutcome } from './scoring.ts';
import type { DiagnosticBankRecord } from './types.ts';
import { buildEnglishDiagnosticRecommendations, type DiagnosticRecommendation } from './recommendations.ts';

export interface DiagnosticCalibrationPolicy {
  version: string;
  status: 'pilot' | 'validated';
  cutScores: Readonly<Record<'A2' | 'B1' | 'B2' | 'C1' | 'C2', number>>;
  minimumItemSampleSize: number;
}

export interface DiagnosticObjectiveObservation {
  itemId: string;
  outcome: DiagnosticObjectiveOutcome;
}

export interface DiagnosticMeasuredSkillEvidence extends DiagnosticSkillEvidence {
  attempted: number;
  omitted: number;
  observedAccuracy: number | null;
  theta?: number;
  standardError?: number;
  calibrationVersion?: string;
}

export interface DiagnosticCompositeResult extends DiagnosticResultProfile {
  overallStatus: 'not-estimated' | 'provisional' | 'calibrated';
  profileIsUneven: boolean;
  warnings: readonly string[];
  recommendations: readonly DiagnosticRecommendation[];
}

const AUTHORED_LEVEL_DIFFICULTY: Readonly<Record<CefrLevel, number>> = {
  A1: -2.5, A2: -1.5, B1: -0.5, B2: 0.5, C1: 1.5, C2: 2.5,
};

export const ENGLISH_PILOT_CALIBRATION: DiagnosticCalibrationPolicy = {
  version: 'english-pilot-cuts-v1',
  status: 'pilot',
  cutScores: { A2: -1.5, B1: -0.75, B2: 0, C1: 0.75, C2: 1.5 },
  minimumItemSampleSize: 200,
};

export function validateDiagnosticCalibrationPolicy(policy: DiagnosticCalibrationPolicy): string[] {
  const errors: string[] = [];
  if (!policy.version.trim()) errors.push('calibration version is required');
  if (!Number.isInteger(policy.minimumItemSampleSize) || policy.minimumItemSampleSize < 30) {
    errors.push('minimum item sample size must be an integer of at least 30');
  }
  const cuts = ['A2', 'B1', 'B2', 'C1', 'C2'].map(level => policy.cutScores[level as keyof typeof policy.cutScores]);
  if (cuts.some(cut => !Number.isFinite(cut))) errors.push('calibration cut scores must be finite');
  if (cuts.some((cut, index) => index > 0 && cut <= cuts[index - 1])) errors.push('calibration cut scores must be strictly increasing');
  return errors;
}

function stimulusIdentity(record: DiagnosticBankRecord): string {
  const stimulus = record.publicItem.stimulus;
  if (stimulus.kind === 'audio') return `audio:${stimulus.mediaId}`;
  if (stimulus.kind === 'text') return `text:${stimulus.stimulusId}`;
  return `item:${record.publicItem.id}`;
}

function logistic(value: number): number {
  if (value >= 0) return 1 / (1 + Math.exp(-value));
  const exponential = Math.exp(value);
  return exponential / (1 + exponential);
}

function thetaToLevel(theta: number, policy: DiagnosticCalibrationPolicy): CefrLevel {
  if (theta < policy.cutScores.A2) return 'A1';
  if (theta < policy.cutScores.B1) return 'A2';
  if (theta < policy.cutScores.B2) return 'B1';
  if (theta < policy.cutScores.C1) return 'B2';
  if (theta < policy.cutScores.C2) return 'C1';
  return 'C2';
}

function estimateTheta(
  evidence: readonly { outcome: 'correct' | 'incorrect'; difficulty: number; discrimination: number }[],
): { theta: number; standardError: number } {
  const grid = Array.from({ length: 161 }, (_, index) => -4 + index * 0.05);
  const logPosteriors = grid.map(theta => {
    let value = -0.5 * theta * theta;
    for (const item of evidence) {
      const probability = Math.min(1 - 1e-9, Math.max(1e-9, logistic(item.discrimination * (theta - item.difficulty))));
      value += item.outcome === 'correct' ? Math.log(probability) : Math.log(1 - probability);
    }
    return value;
  });
  const maximum = Math.max(...logPosteriors);
  const weights = logPosteriors.map(value => Math.exp(value - maximum));
  const denominator = weights.reduce((sum, value) => sum + value, 0);
  const theta = weights.reduce((sum, weight, index) => sum + weight * grid[index], 0) / denominator;
  const variance = weights.reduce((sum, weight, index) => sum + weight * ((grid[index] - theta) ** 2), 0) / denominator;
  return { theta, standardError: Math.sqrt(variance) };
}

export function estimateObjectiveSkillEvidence(
  skill: DiagnosticObjectiveSkill,
  records: readonly DiagnosticBankRecord[],
  observations: readonly DiagnosticObjectiveObservation[],
  calibration: DiagnosticCalibrationPolicy,
): DiagnosticMeasuredSkillEvidence {
  const policyErrors = validateDiagnosticCalibrationPolicy(calibration);
  if (policyErrors.length) throw new Error(policyErrors.join('; '));
  const dimension = ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions.find(candidate => candidate.skill === skill);
  if (!dimension) throw new Error(`missing blueprint dimension for ${skill}`);
  const recordById = new Map(records.filter(record => record.publicItem.skill === skill).map(record => [record.publicItem.id, record]));
  if (new Set(observations.map(item => item.itemId)).size !== observations.length) throw new Error(`${skill} contains duplicate observations`);
  const resolved = observations.map(observation => {
    const record = recordById.get(observation.itemId);
    if (!record) throw new Error(`${skill} observation ${observation.itemId} has no matching bank record`);
    return { record, outcome: observation.outcome };
  });
  const distinctStimuli = new Set(resolved.map(item => stimulusIdentity(item.record))).size;
  const omitted = resolved.filter(item => item.outcome === 'omitted').length;
  const attemptedEvidence = resolved.filter(
    (item): item is { record: DiagnosticBankRecord; outcome: 'correct' | 'incorrect' } => item.outcome !== 'omitted',
  );
  const attempted = attemptedEvidence.length;
  const correct = attemptedEvidence.filter(item => item.outcome === 'correct').length;
  const base = { skill, decisions: resolved.length, distinctStimuli, attempted, omitted, observedAccuracy: attempted ? correct / attempted : null };
  if (resolved.length < dimension.minimumDecisions
    || distinctStimuli < dimension.minimumDistinctStimuli
    || attempted < Math.max(4, dimension.minimumDecisions - 1)) {
    return { ...base, status: 'not-estimated' };
  }

  const itemEvidence = attemptedEvidence.map(({ record, outcome }) => ({
    outcome,
    difficulty: record.parameters?.difficulty ?? AUTHORED_LEVEL_DIFFICULTY[record.publicItem.levelCandidate],
    discrimination: record.parameters?.discrimination ?? 1,
  }));
  if (itemEvidence.some(item => !Number.isFinite(item.difficulty)
    || !Number.isFinite(item.discrimination)
    || item.discrimination <= 0)) {
    throw new Error(`${skill} contains invalid item parameters`);
  }
  const { theta, standardError } = estimateTheta(itemEvidence);
  const lowerTheta = theta - 1.645 * standardError;
  const upperTheta = theta + 1.645 * standardError;
  const allItemsCalibrated = attemptedEvidence.every(({ record }) =>
    record.parameters?.difficulty !== undefined
    && record.parameters?.discrimination !== undefined
    && record.parameters.sampleSize >= calibration.minimumItemSampleSize,
  );
  const status = calibration.status === 'validated' && allItemsCalibrated ? 'calibrated' : 'provisional';
  const confidenceCap = status === 'calibrated' ? 0.99 : 0.65;
  const confidence = Math.min(confidenceCap, Math.max(0.05, 1 - standardError / 2));
  return {
    ...base,
    status,
    estimatedLevel: thetaToLevel(theta, calibration),
    plausibleRange: [thetaToLevel(lowerTheta, calibration), thetaToLevel(upperTheta, calibration)],
    confidence: Number(confidence.toFixed(3)),
    theta: Number(theta.toFixed(3)),
    standardError: Number(standardError.toFixed(3)),
    calibrationVersion: calibration.version,
  };
}

export function buildDiagnosticCompositeResult(input: {
  attemptId: string;
  blueprintVersion: string;
  bankVersion: string;
  skills: readonly DiagnosticSkillEvidence[];
  generatedAt: string;
}): DiagnosticCompositeResult {
  const warnings: string[] = [];
  const levelIndexes = input.skills.flatMap(skill => skill.estimatedLevel ? [CEFR_LEVELS.indexOf(skill.estimatedLevel)] : []);
  const allSkillsEstimated = input.skills.length === 5 && input.skills.every(skill => skill.status !== 'not-estimated' && skill.estimatedLevel);
  if (!allSkillsEstimated) warnings.push('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE');
  const spread = levelIndexes.length ? Math.max(...levelIndexes) - Math.min(...levelIndexes) : 0;
  const profileIsUneven = spread >= 2;
  if (profileIsUneven) warnings.push('UNEVEN_SKILL_PROFILE');
  const allCalibrated = allSkillsEstimated && input.skills.every(skill => skill.status === 'calibrated');
  const overallStatus = !allSkillsEstimated ? 'not-estimated' : allCalibrated ? 'calibrated' : 'provisional';
  let globalLevel: CefrLevel | null = null;
  let globalRange: readonly [CefrLevel, CefrLevel] | null = null;
  if (allSkillsEstimated) {
    const sorted = [...levelIndexes].sort((a, b) => a - b);
    globalLevel = CEFR_LEVELS[sorted[Math.floor(sorted.length / 2)]];
    const ranges = input.skills.flatMap(skill => {
      const range = skill.plausibleRange ?? (skill.estimatedLevel ? [skill.estimatedLevel, skill.estimatedLevel] : []);
      return range.map(level => CEFR_LEVELS.indexOf(level));
    });
    globalRange = [CEFR_LEVELS[Math.min(...ranges)], CEFR_LEVELS[Math.max(...ranges)]];
  }
  return {
    ...input,
    globalLevel,
    globalRange,
    overallStatus,
    profileIsUneven,
    warnings,
    recommendations: buildEnglishDiagnosticRecommendations(input.skills),
  };
}
