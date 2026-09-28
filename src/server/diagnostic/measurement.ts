import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import {
  CEFR_LEVELS,
  type CefrLevel,
  type DiagnosticLanguageUseIntegration,
  type DiagnosticObjectiveSkill,
  type DiagnosticResultProfile,
  type DiagnosticSkillEvidence,
} from '../../lib/diagnostic/types.ts';
import type { DiagnosticObjectiveOutcome } from './scoring.ts';
import type { DiagnosticBankRecord } from './types.ts';
import type { DiagnosticHumanWritingEvaluation, DiagnosticWritingCriterionEvaluation } from './writing.ts';
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

export interface DiagnosticLanguageUseIntegrationPolicy {
  version: string;
  status: 'pilot' | 'validated';
  materialDifferenceLevels: number;
  confidenceCap: number;
  adjacentConfidenceMultiplier: number;
  divergentConfidenceMultiplier: number;
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

/**
 * This policy treats one reviewed writing criterion as corroborating evidence,
 * never as a second objective response set. It cannot move a level or rescue an
 * objective estimate that failed its evidence floor.
 */
export const ENGLISH_PILOT_LANGUAGE_USE_INTEGRATION: DiagnosticLanguageUseIntegrationPolicy = {
  version: 'english-language-use-integration-v1',
  status: 'pilot',
  materialDifferenceLevels: 2,
  confidenceCap: 0.65,
  adjacentConfidenceMultiplier: 0.85,
  divergentConfidenceMultiplier: 0.65,
};

export function validateDiagnosticLanguageUseIntegrationPolicy(
  policy: DiagnosticLanguageUseIntegrationPolicy,
): string[] {
  const errors: string[] = [];
  if (!policy.version.trim()) errors.push('language-use integration version is required');
  if (!Number.isInteger(policy.materialDifferenceLevels) || policy.materialDifferenceLevels < 2) {
    errors.push('material language-use difference must be at least two CEFR levels');
  }
  for (const [name, value] of [
    ['confidence cap', policy.confidenceCap],
    ['adjacent confidence multiplier', policy.adjacentConfidenceMultiplier],
    ['divergent confidence multiplier', policy.divergentConfidenceMultiplier],
  ] as const) {
    if (!Number.isFinite(value) || value <= 0 || value > 1) errors.push(`${name} must be greater than zero and at most one`);
  }
  if (policy.divergentConfidenceMultiplier >= policy.adjacentConfidenceMultiplier) {
    errors.push('divergent confidence multiplier must be lower than adjacent confidence multiplier');
  }
  return errors;
}

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
  const omitted = resolved.filter(item => item.outcome === 'omitted').length;
  const attemptedEvidence = resolved.filter(
    (item): item is { record: DiagnosticBankRecord; outcome: 'correct' | 'incorrect' } => item.outcome !== 'omitted',
  );
  const distinctStimuli = new Set(attemptedEvidence.map(item => stimulusIdentity(item.record))).size;
  const attempted = attemptedEvidence.length;
  const correct = attemptedEvidence.filter(item => item.outcome === 'correct').length;
  const base = { skill, decisions: resolved.length, distinctStimuli, attempted, omitted, observedAccuracy: attempted ? correct / attempted : null };
  const writtenDiscourseCoverage = skill === 'written-discourse'
    ? new Set(attemptedEvidence.map(item => item.record.publicItem.subdomain))
    : null;
  const missingWrittenDiscourseCoverage = writtenDiscourseCoverage !== null
    && (writtenDiscourseCoverage.size < 4
      || !writtenDiscourseCoverage.has('organisation-sequencing')
      || !writtenDiscourseCoverage.has('rhetorical-relations')
      || omitted > 1);
  if (resolved.length < dimension.minimumDecisions
    || distinctStimuli < dimension.minimumDistinctStimuli
    || attempted < Math.max(4, dimension.minimumDecisions - 1)
    || missingWrittenDiscourseCoverage) {
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

function orderedLevelRange(levels: readonly CefrLevel[]): readonly [CefrLevel, CefrLevel] {
  const indexes = levels.map(level => CEFR_LEVELS.indexOf(level));
  if (!indexes.length || indexes.some(index => index < 0)) throw new Error('language-use integration contains an invalid CEFR level');
  return [CEFR_LEVELS[Math.min(...indexes)], CEFR_LEVELS[Math.max(...indexes)]];
}

function languageUseCriterion(
  skill: 'grammar' | 'vocabulary',
  evaluation: DiagnosticHumanWritingEvaluation,
): DiagnosticWritingCriterionEvaluation {
  const criterionName = skill === 'grammar' ? 'grammar-control' : 'vocabulary-control';
  const matches = evaluation.criteria.filter(criterion => criterion.criterion === criterionName);
  if (matches.length !== 1) throw new Error(`final writing evaluation must contain exactly one ${criterionName} criterion`);
  return matches[0];
}

/**
 * Integrates reviewed productive evidence without ordinal averaging or double-counting.
 * The objective estimate remains the point estimate; writing can only corroborate it or
 * widen uncertainty. One writing sample never creates a language-use estimate by itself.
 */
export function integrateWritingLanguageUseEvidence(input: {
  objective: DiagnosticMeasuredSkillEvidence & { skill: 'grammar' | 'vocabulary' };
  finalWritingEvaluation: DiagnosticHumanWritingEvaluation;
  policy?: DiagnosticLanguageUseIntegrationPolicy;
}): DiagnosticMeasuredSkillEvidence & { skill: 'grammar' | 'vocabulary' } {
  const policy = input.policy ?? ENGLISH_PILOT_LANGUAGE_USE_INTEGRATION;
  const policyErrors = validateDiagnosticLanguageUseIntegrationPolicy(policy);
  if (policyErrors.length) throw new Error(policyErrors.join('; '));
  if (input.finalWritingEvaluation.decision !== 'accept') {
    throw new Error('only accepted final writing evidence can inform language-use integration');
  }
  const productive = languageUseCriterion(input.objective.skill, input.finalWritingEvaluation);
  const objectiveSnapshot: DiagnosticLanguageUseIntegration['objective'] = {
    status: input.objective.status,
    decisions: input.objective.decisions,
    attempted: input.objective.attempted,
    ...(input.objective.estimatedLevel ? { estimatedLevel: input.objective.estimatedLevel } : {}),
    ...(input.objective.plausibleRange ? { plausibleRange: input.objective.plausibleRange } : {}),
    ...(input.objective.confidence !== undefined ? { confidence: input.objective.confidence } : {}),
  };
  const integrationBase = {
    policyVersion: policy.version,
    objective: objectiveSnapshot,
    productiveWriting: {
      criterion: productive.criterion as 'grammar-control' | 'vocabulary-control',
      level: productive.level,
      confidence: productive.confidence,
      rubricVersion: input.finalWritingEvaluation.rubricVersion,
    },
    automaticLevelShift: false as const,
  };
  if (input.objective.status === 'not-estimated'
    || !input.objective.estimatedLevel
    || !input.objective.plausibleRange
    || input.objective.confidence === undefined) {
    return {
      ...input.objective,
      languageUseIntegration: { ...integrationBase, outcome: 'objective-insufficient' },
    };
  }

  const levelDifference = Math.abs(
    CEFR_LEVELS.indexOf(input.objective.estimatedLevel) - CEFR_LEVELS.indexOf(productive.level),
  );
  const outcome: DiagnosticLanguageUseIntegration['outcome'] = levelDifference === 0
    ? 'corroborated'
    : levelDifference < policy.materialDifferenceLevels ? 'adjacent' : 'divergent';
  const multiplier = outcome === 'corroborated'
    ? 1
    : outcome === 'adjacent' ? policy.adjacentConfidenceMultiplier : policy.divergentConfidenceMultiplier;
  const confidence = Math.min(
    policy.confidenceCap,
    input.objective.confidence,
    productive.confidence,
  ) * multiplier;
  const plausibleRange = outcome === 'corroborated'
    ? input.objective.plausibleRange
    : orderedLevelRange([...input.objective.plausibleRange, productive.level]);
  return {
    ...input.objective,
    status: policy.status === 'validated' ? input.objective.status : 'provisional',
    plausibleRange,
    confidence: Number(confidence.toFixed(3)),
    languageUseIntegration: { ...integrationBase, outcome, levelDifference },
  };
}

export function buildDiagnosticCompositeResult(input: {
  attemptId: string;
  blueprintVersion: string;
  bankVersion: string;
  skills: readonly DiagnosticSkillEvidence[];
  generatedAt: string;
  validUntil: string;
}): DiagnosticCompositeResult {
  if (Number.isNaN(Date.parse(input.generatedAt)) || Number.isNaN(Date.parse(input.validUntil))
    || Date.parse(input.validUntil) <= Date.parse(input.generatedAt)) {
    throw new Error('diagnostic result validity window is invalid');
  }
  const warnings: string[] = [];
  const levelIndexes = input.skills.flatMap(skill => skill.estimatedLevel ? [CEFR_LEVELS.indexOf(skill.estimatedLevel)] : []);
  const allSkillsEstimated = input.skills.length === 5 && input.skills.every(skill => skill.status !== 'not-estimated' && skill.estimatedLevel);
  if (!allSkillsEstimated) warnings.push('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE');
  for (const skill of input.skills) {
    if (skill.skill === 'grammar' && skill.languageUseIntegration?.outcome === 'divergent') {
      warnings.push('GRAMMAR_WRITING_EVIDENCE_DIVERGES');
    }
    if (skill.skill === 'vocabulary' && skill.languageUseIntegration?.outcome === 'divergent') {
      warnings.push('VOCABULARY_WRITING_EVIDENCE_DIVERGES');
    }
  }
  const spread = levelIndexes.length ? Math.max(...levelIndexes) - Math.min(...levelIndexes) : 0;
  const profileIsUneven = spread >= 2;
  if (profileIsUneven) warnings.push('UNEVEN_SKILL_PROFILE', 'GLOBAL_WITHHELD_UNEVEN_PROFILE');
  const allCalibrated = allSkillsEstimated && input.skills.every(skill => skill.status === 'calibrated');
  const overallStatus = !allSkillsEstimated ? 'not-estimated' : allCalibrated ? 'calibrated' : 'provisional';
  let globalLevel: CefrLevel | null = null;
  let globalRange: readonly [CefrLevel, CefrLevel] | null = null;
  if (allSkillsEstimated && !profileIsUneven) {
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
