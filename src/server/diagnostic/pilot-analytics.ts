import { createHash } from 'node:crypto';

import {
  CEFR_LEVELS,
  DIAGNOSTIC_SKILLS,
  type CefrLevel,
  type DiagnosticObjectiveSkill,
  type DiagnosticSkill,
} from '../../lib/diagnostic/types.ts';
import type { DiagnosticWritingPromptRecord } from '../../lib/diagnostic/writing.ts';
import type { DiagnosticItemDriftMonitoringPolicy } from './delivery-policy.ts';
import type { DiagnosticBankRecord } from './types.ts';

export interface DiagnosticPilotCriteria {
  criteriaVersion: string;
  status: 'provisional-pending-academic-approval' | 'approved';
  minimumStartedAttempts: number;
  minimumCompletionRate: number;
  minimumCompletedPerRoute: number;
  minimumResponsesPerItem: number;
  minimumDiscriminationSample: number;
  minimumCorrectedItemTotal: number;
  minimumItemFacility: number;
  maximumItemFacility: number;
  minimumDistractorSelectionRate: number;
  maximumOmissionRate: number;
  minimumWritingPairs: number;
  minimumWritingExactAgreement: number;
  maximumWritingMeanAbsoluteLevelDifference: number;
  maximumWritingAdjudicationRate: number;
  minimumIndependentReferencePairs: number;
  minimumReferencesPerCefrLevel: number;
  minimumReferenceExactAgreement: number;
  minimumReferenceWithinOneLevel: number;
  maximumReferenceSevereDisagreement: number;
  minimumAdaptiveReliabilitySamplePerSkill: number;
  minimumAdaptiveReliability: number;
  minimumClassificationConsistencySample: number;
  minimumClassificationConsistency: number;
  minimumLocalDependencePairsPerTestlet: number;
  maximumLocalDependenceResidualCorrelation: number;
  maximumUnresolvedLocalDependenceTestlets: number;
  minimumStabilityPairsPerSkill: number;
  minimumStabilityCorrelation: number;
  minimumStabilityWithinOneLevel: number;
  minimumFairnessGroups: number;
  minimumFairnessGroupSample: number;
  maximumUnresolvedDifItems: number;
  minimumStandardSettingPanelists: number;
}

export interface DiagnosticPilotMeasurementEvidence {
  evidenceVersion: 'diagnostic-pilot-measurement-evidence-v2';
  status: 'not-collected' | 'complete';
  criteriaVersion: string;
  bankSnapshotSha256: string | null;
  generatedAt: string | null;
  provenance: {
    aggregateDatasetSha256: string | null;
    analysisCodeSha256: string | null;
    analysisRunId: string | null;
  };
  adaptiveReliability: readonly {
    skill: DiagnosticObjectiveSkill;
    sampleSize: number;
    coefficient: number;
    method: 'marginal-reliability' | 'route-aware-resampling';
  }[];
  classificationConsistency: {
    sampleSize: number;
    coefficient: number;
    method: 'bootstrap-classification' | 'replicated-routing';
  } | null;
  localDependence: {
    method: 'adjusted-yen-q3' | 'testlet-residual-correlation';
    eligibleTestlets: number;
    analyzedTestlets: number;
    minimumPairSample: number;
    maximumObservedAbsoluteResidualCorrelation: number;
    flaggedTestlets: number;
    unresolvedMaterialTestlets: number;
    resolutionReference: string | null;
  } | null;
  stabilityBySkill: readonly {
    skill: DiagnosticSkill;
    pairs: number;
    correlation: number;
    withinOneLevel: number;
    method: 'test-retest' | 'parallel-forms';
  }[];
  fairness: {
    method: 'dif-analysis';
    groupSampleSizes: readonly number[];
    itemsAnalyzed: number;
    flaggedItems: number;
    unresolvedMaterialItems: number;
    lawfulBasisReference: string;
  } | null;
  standardSetting: {
    method: 'bookmark' | 'body-of-work';
    panelists: number;
    reviewedBoundaries: readonly string[];
    decision: 'approved' | 'changes-requested';
  } | null;
  approval: {
    manifestSha256: string;
    candidateSha256: string;
    approvedAt: string;
    approvedBy: readonly string[];
    appliedAt: string;
    appliedBy: string;
  } | null;
}

const OBJECTIVE_SKILLS: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
const ROUTES = ['low-a1-a2', 'mid-b1-b2', 'high-c1-c2'] as const;
const CEFR_BOUNDARIES = ['A1/A2', 'A2/B1', 'B1/B2', 'B2/C1', 'C1/C2'] as const;
const SHA256 = /^[a-f0-9]{64}$/u;
const REVIEW_REFERENCE = /^(academic-lead|measurement-lead|privacy-lead):[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;

export interface DiagnosticPilotAttemptRow {
  attemptId: string;
  status: string;
  routeId: string | null;
  bankVersion: string;
  startedAt: string;
  expiresAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface DiagnosticPilotResponseRow {
  attemptId: string;
  itemId: string;
  contentVersion: string;
  skill: string;
  outcome: 'correct' | 'incorrect' | 'omitted';
  submittedResponse: unknown;
  responseMs: number | null;
  audioPlayCount: number | null;
}

export type DiagnosticItemDriftResponseRow = Pick<DiagnosticPilotResponseRow,
  'attemptId' | 'itemId' | 'contentVersion' | 'skill' | 'outcome'>;

export interface DiagnosticPilotWritingRow {
  attemptId: string;
  promptId: string;
  contentVersion: string;
  status: string;
  exactAgreement: number | null;
  meanAbsoluteLevelDifference: number | null;
  requiresAdjudication: boolean | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface DiagnosticPilotReferenceRow {
  attemptId: string;
  diagnosticLevel: CefrLevel;
  referenceLevel: CefrLevel;
  source: 'external-test' | 'tutor-judgement' | 'course-placement';
}

function boundedRate(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

export function validateDiagnosticPilotCriteria(criteria: DiagnosticPilotCriteria): string[] {
  const errors: string[] = [];
  if (!criteria.criteriaVersion.trim()) errors.push('pilot criteria version is required');
  for (const key of [
    'minimumStartedAttempts', 'minimumCompletedPerRoute', 'minimumResponsesPerItem',
    'minimumDiscriminationSample', 'minimumWritingPairs', 'minimumIndependentReferencePairs',
    'minimumReferencesPerCefrLevel', 'minimumAdaptiveReliabilitySamplePerSkill',
    'minimumClassificationConsistencySample', 'minimumStabilityPairsPerSkill',
    'minimumLocalDependencePairsPerTestlet',
    'minimumFairnessGroups', 'minimumFairnessGroupSample', 'minimumStandardSettingPanelists',
  ] as const) {
    if (!Number.isInteger(criteria[key]) || criteria[key] < 1) errors.push(`${key} must be a positive integer`);
  }
  if (!Number.isInteger(criteria.maximumUnresolvedDifItems) || criteria.maximumUnresolvedDifItems < 0) {
    errors.push('maximumUnresolvedDifItems must be a non-negative integer');
  }
  if (!Number.isInteger(criteria.maximumUnresolvedLocalDependenceTestlets)
    || criteria.maximumUnresolvedLocalDependenceTestlets < 0) {
    errors.push('maximumUnresolvedLocalDependenceTestlets must be a non-negative integer');
  }
  for (const key of [
    'minimumCompletionRate', 'minimumItemFacility', 'maximumItemFacility',
    'minimumDistractorSelectionRate', 'maximumOmissionRate', 'minimumWritingExactAgreement',
    'maximumWritingAdjudicationRate', 'minimumReferenceExactAgreement',
    'minimumReferenceWithinOneLevel', 'maximumReferenceSevereDisagreement',
    'minimumAdaptiveReliability', 'minimumClassificationConsistency',
    'maximumLocalDependenceResidualCorrelation',
    'minimumStabilityCorrelation', 'minimumStabilityWithinOneLevel',
  ] as const) {
    if (!boundedRate(criteria[key])) errors.push(`${key} must be between zero and one`);
  }
  if (boundedRate(criteria.minimumItemFacility) && boundedRate(criteria.maximumItemFacility)
    && criteria.minimumItemFacility >= criteria.maximumItemFacility) {
    errors.push('minimumItemFacility must be lower than maximumItemFacility');
  }
  if (!Number.isFinite(criteria.minimumCorrectedItemTotal) || criteria.minimumCorrectedItemTotal < -1 || criteria.minimumCorrectedItemTotal > 1) {
    errors.push('minimumCorrectedItemTotal must be a correlation between -1 and 1');
  }
  if (!Number.isFinite(criteria.maximumWritingMeanAbsoluteLevelDifference) || criteria.maximumWritingMeanAbsoluteLevelDifference < 0) {
    errors.push('maximumWritingMeanAbsoluteLevelDifference must be non-negative');
  }
  return errors;
}

function rounded(value: number, digits = 3): number {
  return Number(value.toFixed(digits));
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonicalize(child)]));
  }
  return value;
}

export function diagnosticPilotBankSha256(input: {
  bank: readonly DiagnosticBankRecord[];
  writingBank: readonly DiagnosticWritingPromptRecord[];
}): string {
  const snapshot = {
    objective: [...input.bank]
      .sort((left, right) => left.publicItem.id.localeCompare(right.publicItem.id))
      .map(record => ({
        publicItem: record.publicItem,
        status: record.status,
        exposure: record.exposure,
        reviewContentSha256: record.review.contentSha256 ?? null,
        scoring: record.scoring,
        rationale: record.rationale,
        source: record.source,
        levelRange: record.levelRange,
        parameters: record.parameters ?? null,
      })),
    writing: [...input.writingBank]
      .sort((left, right) => left.publicPrompt.id.localeCompare(right.publicPrompt.id))
      .map(record => ({
        publicPrompt: record.publicPrompt,
        status: record.status,
        exposure: record.exposure,
        reviewContentSha256: record.review.contentSha256 ?? null,
        source: record.source,
      })),
  };
  return createHash('sha256').update(JSON.stringify(canonicalize(snapshot))).digest('hex');
}

export function diagnosticEligibleTestletCount(bank: readonly DiagnosticBankRecord[]): number {
  const counts = new Map<string, number>();
  for (const record of bank) {
    const stimulus = record.publicItem.stimulus;
    const identity = stimulus.kind === 'audio'
      ? `audio:${stimulus.mediaId}`
      : stimulus.kind === 'text' ? `text:${stimulus.stimulusId}` : null;
    if (identity) counts.set(identity, (counts.get(identity) ?? 0) + 1);
  }
  return [...counts.values()].filter(count => count >= 2).length;
}

function rate(numerator: number, denominator: number): number | null {
  return denominator ? rounded(numerator / denominator) : null;
}

interface DiagnosticItemDriftMetric {
  itemId: string;
  contentVersion: string;
  attempted: number;
  correct: number;
  facility: number | null;
}

export function buildDiagnosticItemDriftMetrics(input: {
  responses: readonly DiagnosticItemDriftResponseRow[];
  bank: readonly DiagnosticBankRecord[];
}): DiagnosticItemDriftMetric[] {
  const active = input.bank.filter(record => record.status === 'pilot' || record.status === 'operational');
  const activeById = new Map(active.map(record => [record.publicItem.id, record]));
  const seen = new Set<string>();
  const counts = new Map(active.map(record => [record.publicItem.id, { attempted: 0, correct: 0 }]));
  for (const response of input.responses) {
    const record = activeById.get(response.itemId);
    if (!record || record.publicItem.contentVersion !== response.contentVersion) continue;
    if (record.publicItem.skill !== response.skill || !['correct', 'incorrect', 'omitted'].includes(response.outcome)) {
      throw new Error('item drift response does not match the active versioned bank');
    }
    const identity = `${response.attemptId}\0${response.itemId}`;
    if (!response.attemptId?.trim() || seen.has(identity)) {
      throw new Error('item drift responses contain duplicate or invalid identities');
    }
    seen.add(identity);
    if (response.outcome !== 'omitted') {
      const aggregate = counts.get(response.itemId)!;
      aggregate.attempted += 1;
      if (response.outcome === 'correct') aggregate.correct += 1;
    }
  }
  return active.map(record => {
    const { attempted, correct } = counts.get(record.publicItem.id)!;
    return {
      itemId: record.publicItem.id,
      contentVersion: record.publicItem.contentVersion,
      attempted,
      correct,
      facility: rate(correct, attempted),
    };
  }).sort((left, right) => left.itemId.localeCompare(right.itemId));
}

function validateDriftMetric(metric: DiagnosticItemDriftMetric): void {
  if (!metric.itemId?.trim() || !metric.contentVersion?.trim()
    || !Number.isInteger(metric.attempted) || metric.attempted < 0
    || !Number.isInteger(metric.correct) || metric.correct < 0 || metric.correct > metric.attempted
    || (metric.facility !== null && !boundedRate(metric.facility))) {
    throw new Error('item drift metric is invalid');
  }
}

function twoProportionZScore(currentCorrect: number, currentAttempted: number,
  baselineCorrect: number, baselineAttempted: number): number | null {
  if (currentAttempted < 1 || baselineAttempted < 1) return null;
  const currentFacility = currentCorrect / currentAttempted;
  const baselineFacility = baselineCorrect / baselineAttempted;
  const pooled = (currentCorrect + baselineCorrect) / (currentAttempted + baselineAttempted);
  const standardError = Math.sqrt(pooled * (1 - pooled)
    * ((1 / currentAttempted) + (1 / baselineAttempted)));
  return standardError > 0 ? rounded(Math.abs(currentFacility - baselineFacility) / standardError) : null;
}

/**
 * Compares equal, consecutive attempt-start cohorts. Facility is an operational proxy for
 * difficulty drift; a signal requires both a material shift and a two-proportion z threshold.
 * The result never recalibrates or retires an item automatically.
 */
export function buildDiagnosticItemDriftMonitor(input: {
  current: readonly DiagnosticItemDriftMetric[];
  baseline: readonly DiagnosticItemDriftMetric[];
  policy: DiagnosticItemDriftMonitoringPolicy;
}) {
  const policy = input.policy;
  if (!Number.isInteger(policy?.minimumAttemptedPerWindow) || policy.minimumAttemptedPerWindow < 20
    || !boundedRate(policy?.maximumAbsoluteFacilityShift) || policy.maximumAbsoluteFacilityShift < 0.05
    || typeof policy?.minimumTwoProportionZScore !== 'number'
    || !Number.isFinite(policy.minimumTwoProportionZScore) || policy.minimumTwoProportionZScore < 1.96) {
    throw new Error('item drift monitoring policy is invalid');
  }
  for (const metric of [...input.current, ...input.baseline]) validateDriftMetric(metric);
  const identity = (metric: DiagnosticItemDriftMetric) => `${metric.itemId}\0${metric.contentVersion}`;
  if (new Set(input.current.map(identity)).size !== input.current.length
    || new Set(input.baseline.map(identity)).size !== input.baseline.length) {
    throw new Error('item drift metrics contain duplicate identities');
  }
  const baselineByIdentity = new Map(input.baseline.map(metric => [identity(metric), metric]));
  const items = input.current.map(current => {
    const baseline = baselineByIdentity.get(identity(current));
    const enoughSample = Boolean(baseline
      && current.attempted >= policy.minimumAttemptedPerWindow
      && baseline.attempted >= policy.minimumAttemptedPerWindow);
    const currentFacility = current.attempted ? current.correct / current.attempted : null;
    const baselineFacility = baseline?.attempted ? baseline.correct / baseline.attempted : null;
    const absoluteFacilityShift = enoughSample && currentFacility !== null && baselineFacility !== null
      ? rounded(Math.abs(currentFacility - baselineFacility)) : null;
    const zScore = enoughSample && baseline
      ? twoProportionZScore(current.correct, current.attempted, baseline.correct, baseline.attempted) : null;
    const reviewRequired = absoluteFacilityShift !== null && zScore !== null
      && absoluteFacilityShift >= policy.maximumAbsoluteFacilityShift
      && zScore >= policy.minimumTwoProportionZScore;
    return {
      itemId: current.itemId,
      contentVersion: current.contentVersion,
      currentAttempted: current.attempted,
      baselineAttempted: baseline?.attempted ?? 0,
      currentFacility: currentFacility === null ? null : rounded(currentFacility),
      baselineFacility: baselineFacility === null ? null : rounded(baselineFacility),
      absoluteFacilityShift,
      twoProportionZScore: zScore,
      status: reviewRequired ? 'REVIEW_REQUIRED' : enoughSample ? 'STABLE' : 'INSUFFICIENT_DATA',
    } as const;
  }).sort((left, right) => left.itemId.localeCompare(right.itemId));
  const comparable = items.filter(item => item.status !== 'INSUFFICIENT_DATA');
  const flagged = items.filter(item => item.status === 'REVIEW_REQUIRED');
  const shifts = comparable.flatMap(item => item.absoluteFacilityShift === null ? [] : [item.absoluteFacilityShift]);
  return {
    monitorVersion: 'diagnostic-item-drift-monitor-v1',
    comparisonBasis: 'consecutive-equal-attempt-start-cohorts',
    status: flagged.length > 0 ? 'REVIEW_REQUIRED'
      : items.length > 0 && comparable.length === items.length ? 'STABLE' : 'INSUFFICIENT_DATA',
    thresholds: { ...policy },
    activeItems: items.length,
    comparableItems: comparable.length,
    insufficientItems: items.length - comparable.length,
    reviewRequiredItems: flagged.length,
    largestAbsoluteFacilityShift: shifts.length ? Math.max(...shifts) : null,
    safeguards: {
      automaticRecalibration: false,
      automaticRetirement: false,
      independentRetirementReviewRequired: true,
    },
    items,
  } as const;
}

function quantile(values: readonly number[], percentile: number): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(percentile * sorted.length) - 1));
  return sorted[index];
}

function pearson(left: readonly number[], right: readonly number[]): number | null {
  if (left.length !== right.length || left.length < 2) return null;
  const leftMean = left.reduce((sum, value) => sum + value, 0) / left.length;
  const rightMean = right.reduce((sum, value) => sum + value, 0) / right.length;
  let numerator = 0;
  let leftSquared = 0;
  let rightSquared = 0;
  for (let index = 0; index < left.length; index += 1) {
    const leftDelta = left[index] - leftMean;
    const rightDelta = right[index] - rightMean;
    numerator += leftDelta * rightDelta;
    leftSquared += leftDelta ** 2;
    rightSquared += rightDelta ** 2;
  }
  const denominator = Math.sqrt(leftSquared * rightSquared);
  return denominator ? rounded(numerator / denominator) : null;
}

function selectedOptionIds(value: unknown): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  const response = value as Record<string, unknown>;
  if (response.kind === 'single-choice') return typeof response.optionId === 'string' ? [response.optionId] : [];
  if (response.kind === 'multiple-choice' && Array.isArray(response.optionIds)) {
    return response.optionIds.filter((item): item is string => typeof item === 'string');
  }
  return [];
}

function validateDataset(input: {
  attempts: readonly DiagnosticPilotAttemptRow[];
  responses: readonly DiagnosticPilotResponseRow[];
  writing: readonly DiagnosticPilotWritingRow[];
  references: readonly DiagnosticPilotReferenceRow[];
}, bank: readonly DiagnosticBankRecord[]): void {
  if (new Set(input.attempts.map(row => row.attemptId)).size !== input.attempts.length) throw new Error('pilot attempts contain duplicate ids');
  if (new Set(bank.map(record => record.publicItem.id)).size !== bank.length) throw new Error('pilot bank contains duplicate item ids');
  const attemptIds = new Set(input.attempts.map(row => row.attemptId));
  const bankById = new Map(bank.map(record => [record.publicItem.id, record]));
  for (const attempt of input.attempts) {
    const startedAt = Date.parse(attempt.startedAt);
    const expiresAt = Date.parse(attempt.expiresAt);
    const updatedAt = Date.parse(attempt.updatedAt);
    const completedAt = attempt.completedAt === null ? null : Date.parse(attempt.completedAt);
    if (![startedAt, expiresAt, updatedAt].every(Number.isFinite)
      || expiresAt <= startedAt || updatedAt < startedAt
      || (completedAt !== null && (!Number.isFinite(completedAt) || completedAt < startedAt))) {
      throw new Error('pilot attempt timestamps are invalid');
    }
  }
  const responseIds = new Set<string>();
  for (const response of input.responses) {
    const identity = `${response.attemptId}:${response.itemId}`;
    if (responseIds.has(identity)) throw new Error(`pilot responses contain duplicate ${identity}`);
    responseIds.add(identity);
    const record = bankById.get(response.itemId);
    if (!attemptIds.has(response.attemptId)) throw new Error(`${identity} has no pilot attempt`);
    if (!record || record.publicItem.contentVersion !== response.contentVersion || record.publicItem.skill !== response.skill) {
      throw new Error(`${identity} does not match the versioned bank`);
    }
    if (!['correct', 'incorrect', 'omitted'].includes(response.outcome)) throw new Error(`${identity} has an invalid outcome`);
    if (response.responseMs !== null && (!Number.isInteger(response.responseMs) || response.responseMs < 0 || response.responseMs > 3_600_000)) {
      throw new Error(`${identity} has invalid response time`);
    }
  }
  for (const row of input.writing) {
    const createdAt = Date.parse(row.createdAt);
    const updatedAt = Date.parse(row.updatedAt);
    const completedAt = row.completedAt === null ? null : Date.parse(row.completedAt);
    if (!Number.isFinite(createdAt) || !Number.isFinite(updatedAt) || updatedAt < createdAt
      || (completedAt !== null && (!Number.isFinite(completedAt) || completedAt < createdAt))) {
      throw new Error('pilot writing timestamps are invalid');
    }
  }
  if (new Set(input.references.map(row => row.attemptId)).size !== input.references.length) {
    throw new Error('pilot references contain duplicate attempts');
  }
  for (const reference of input.references) {
    if (!attemptIds.has(reference.attemptId) || !CEFR_LEVELS.includes(reference.diagnosticLevel) || !CEFR_LEVELS.includes(reference.referenceLevel)) {
      throw new Error('pilot independent reference is invalid');
    }
    if (!['external-test', 'tutor-judgement', 'course-placement'].includes(reference.source)) {
      throw new Error('pilot independent reference source is invalid');
    }
  }
}

function correctedItemTotal(
  targetRecord: DiagnosticBankRecord,
  responses: readonly DiagnosticPilotResponseRow[],
  bankById: ReadonlyMap<string, DiagnosticBankRecord>,
  minimumSample: number,
): {
  sampleSize: number;
  correlation: number | null;
  basis: 'same-skill-excluding-shared-stimulus';
  excludedSiblingItems: number;
} {
  const clusterIdentity = (record: DiagnosticBankRecord): string => {
    const stimulus = record.publicItem.stimulus;
    if (stimulus.kind === 'audio') return `audio:${stimulus.mediaId}`;
    if (stimulus.kind === 'text') return `text:${stimulus.stimulusId}`;
    return `item:${record.publicItem.id}`;
  };
  const targetCluster = clusterIdentity(targetRecord);
  const excludedSiblingItems = [...bankById.values()].filter(record =>
    record.publicItem.id !== targetRecord.publicItem.id
    && record.publicItem.skill === targetRecord.publicItem.skill
    && clusterIdentity(record) === targetCluster).length;
  const byAttempt = new Map<string, DiagnosticPilotResponseRow[]>();
  for (const response of responses) {
    if (response.skill !== targetRecord.publicItem.skill || response.outcome === 'omitted') continue;
    const rows = byAttempt.get(response.attemptId) ?? [];
    rows.push(response);
    byAttempt.set(response.attemptId, rows);
  }
  const itemScores: number[] = [];
  const restScores: number[] = [];
  for (const rows of byAttempt.values()) {
    const item = rows.find(row => row.itemId === targetRecord.publicItem.id);
    const rest = rows.filter(row => {
      if (row.itemId === targetRecord.publicItem.id) return false;
      const record = bankById.get(row.itemId);
      return record !== undefined && clusterIdentity(record) !== targetCluster;
    });
    if (!item || !rest.length) continue;
    itemScores.push(item.outcome === 'correct' ? 1 : 0);
    restScores.push(rest.filter(row => row.outcome === 'correct').length / rest.length);
  }
  return {
    sampleSize: itemScores.length,
    correlation: itemScores.length >= minimumSample ? pearson(itemScores, restScores) : null,
    basis: 'same-skill-excluding-shared-stimulus',
    excludedSiblingItems,
  };
}

function referenceMetrics(references: readonly DiagnosticPilotReferenceRow[]) {
  const differences = references.map(row => Math.abs(
    CEFR_LEVELS.indexOf(row.diagnosticLevel) - CEFR_LEVELS.indexOf(row.referenceLevel),
  ));
  return {
    pairs: differences.length,
    exactAgreement: rate(differences.filter(value => value === 0).length, differences.length),
    withinOneLevel: rate(differences.filter(value => value <= 1).length, differences.length),
    severeDisagreementRate: rate(differences.filter(value => value > 1).length, differences.length),
    meanAbsoluteLevelDifference: differences.length ? rounded(differences.reduce((sum, value) => sum + value, 0) / differences.length) : null,
    sources: Object.fromEntries(['external-test', 'tutor-judgement', 'course-placement'].map(source => [source, references.filter(row => row.source === source).length])),
    referenceLevelCounts: Object.fromEntries(CEFR_LEVELS.map(level => [level, references.filter(row => row.referenceLevel === level).length])),
  };
}

function positiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function measurementEvidenceSummary(input: {
  evidence: DiagnosticPilotMeasurementEvidence;
  criteria: DiagnosticPilotCriteria;
  bankSnapshotSha256: string;
  objectiveItemCount: number;
  eligibleTestletCount: number;
}) {
  const evidence = input.evidence;
  const provenanceValid = SHA256.test(evidence?.provenance?.aggregateDatasetSha256 ?? '')
    && SHA256.test(evidence?.provenance?.analysisCodeSha256 ?? '')
    && typeof evidence?.provenance?.analysisRunId === 'string'
    && /^[A-Za-z0-9][A-Za-z0-9._:-]{2,159}$/u.test(evidence.provenance.analysisRunId);
  const approval = evidence?.approval;
  const approvalValid = Boolean(approval
    && SHA256.test(approval.manifestSha256)
    && SHA256.test(approval.candidateSha256)
    && typeof approval.approvedAt === 'string'
    && !Number.isNaN(Date.parse(approval.approvedAt))
    && new Date(Date.parse(approval.approvedAt)).toISOString() === approval.approvedAt
    && typeof approval.appliedAt === 'string'
    && !Number.isNaN(Date.parse(approval.appliedAt))
    && new Date(Date.parse(approval.appliedAt)).toISOString() === approval.appliedAt
    && typeof approval.appliedBy === 'string'
    && /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u.test(approval.appliedBy)
    && Array.isArray(approval.approvedBy)
    && approval.approvedBy.length === 3
    && new Set(approval.approvedBy).size === 3
    && approval.approvedBy.every(reference => REVIEW_REFERENCE.test(reference))
    && new Set(approval.approvedBy.map(reference => reference.slice(reference.indexOf(':') + 1))).size === 3
    && ['academic-lead', 'measurement-lead', 'privacy-lead'].every(role =>
      approval.approvedBy.some(reference => reference.startsWith(`${role}:`)))
    && Date.parse(approval.appliedAt) >= Date.parse(approval.approvedAt));
  const bindingValid = evidence?.evidenceVersion === 'diagnostic-pilot-measurement-evidence-v2'
    && evidence.status === 'complete'
    && evidence.criteriaVersion === input.criteria.criteriaVersion
    && evidence.bankSnapshotSha256 === input.bankSnapshotSha256
    && typeof evidence.generatedAt === 'string'
    && !Number.isNaN(Date.parse(evidence.generatedAt))
    && new Date(Date.parse(evidence.generatedAt)).toISOString() === evidence.generatedAt
    && provenanceValid
    && approvalValid;

  const reliabilityRows = Array.isArray(evidence?.adaptiveReliability) ? evidence.adaptiveReliability : [];
  const reliabilityBySkill = OBJECTIVE_SKILLS.map(skill => {
    const matches = reliabilityRows.filter(row => row?.skill === skill);
    const row = matches.length === 1 ? matches[0] : null;
    const valid = Boolean(row
      && positiveInteger(row.sampleSize)
      && boundedRate(row.coefficient)
      && ['marginal-reliability', 'route-aware-resampling'].includes(row.method));
    return {
      skill,
      sampleSize: valid ? row!.sampleSize : null,
      coefficient: valid ? rounded(row!.coefficient) : null,
      method: valid ? row!.method : null,
      meetsThreshold: Boolean(valid
        && row!.sampleSize >= input.criteria.minimumAdaptiveReliabilitySamplePerSkill
        && row!.coefficient >= input.criteria.minimumAdaptiveReliability),
    };
  });
  const adaptiveReliability = bindingValid
    && reliabilityRows.length === OBJECTIVE_SKILLS.length
    && reliabilityBySkill.every(row => row.meetsThreshold);

  const consistency = evidence?.classificationConsistency;
  const consistencyValid = Boolean(consistency
    && positiveInteger(consistency.sampleSize)
    && boundedRate(consistency.coefficient)
    && ['bootstrap-classification', 'replicated-routing'].includes(consistency.method));
  const classificationConsistency = bindingValid && consistencyValid
    && consistency!.sampleSize >= input.criteria.minimumClassificationConsistencySample
    && consistency!.coefficient >= input.criteria.minimumClassificationConsistency;

  const localDependence = evidence?.localDependence;
  const localDependenceValid = Boolean(localDependence
    && ['adjusted-yen-q3', 'testlet-residual-correlation'].includes(localDependence.method)
    && Number.isInteger(localDependence.eligibleTestlets) && localDependence.eligibleTestlets >= 0
    && Number.isInteger(localDependence.analyzedTestlets) && localDependence.analyzedTestlets >= 0
    && positiveInteger(localDependence.minimumPairSample)
    && boundedRate(localDependence.maximumObservedAbsoluteResidualCorrelation)
    && Number.isInteger(localDependence.flaggedTestlets) && localDependence.flaggedTestlets >= 0
    && Number.isInteger(localDependence.unresolvedMaterialTestlets) && localDependence.unresolvedMaterialTestlets >= 0
    && localDependence.flaggedTestlets <= localDependence.analyzedTestlets
    && localDependence.unresolvedMaterialTestlets <= localDependence.flaggedTestlets
    && (localDependence.resolutionReference === null
      || (typeof localDependence.resolutionReference === 'string'
        && /^[A-Za-z0-9][A-Za-z0-9._:@+-]{2,159}$/u.test(localDependence.resolutionReference)))
    && (localDependence.maximumObservedAbsoluteResidualCorrelation
      <= input.criteria.maximumLocalDependenceResidualCorrelation
      || localDependence.flaggedTestlets > 0)
    && (localDependence.flaggedTestlets === 0
      || localDependence.unresolvedMaterialTestlets > 0
      || localDependence.resolutionReference !== null));
  const localDependenceReview = bindingValid && localDependenceValid
    && localDependence!.eligibleTestlets === input.eligibleTestletCount
    && localDependence!.analyzedTestlets === input.eligibleTestletCount
    && localDependence!.minimumPairSample >= input.criteria.minimumLocalDependencePairsPerTestlet
    && localDependence!.unresolvedMaterialTestlets <= input.criteria.maximumUnresolvedLocalDependenceTestlets;

  const stabilityRows = Array.isArray(evidence?.stabilityBySkill) ? evidence.stabilityBySkill : [];
  const stabilityBySkill = DIAGNOSTIC_SKILLS.map(skill => {
    const matches = stabilityRows.filter(row => row?.skill === skill);
    const row = matches.length === 1 ? matches[0] : null;
    const valid = Boolean(row
      && positiveInteger(row.pairs)
      && boundedRate(row.correlation)
      && boundedRate(row.withinOneLevel)
      && ['test-retest', 'parallel-forms'].includes(row.method));
    return {
      skill,
      pairs: valid ? row!.pairs : null,
      correlation: valid ? rounded(row!.correlation) : null,
      withinOneLevel: valid ? rounded(row!.withinOneLevel) : null,
      method: valid ? row!.method : null,
      meetsThreshold: Boolean(valid
        && row!.pairs >= input.criteria.minimumStabilityPairsPerSkill
        && row!.correlation >= input.criteria.minimumStabilityCorrelation
        && row!.withinOneLevel >= input.criteria.minimumStabilityWithinOneLevel),
    };
  });
  const stability = bindingValid
    && stabilityRows.length === DIAGNOSTIC_SKILLS.length
    && stabilityBySkill.every(row => row.meetsThreshold);

  const fairness = evidence?.fairness;
  const fairnessValid = Boolean(fairness
    && fairness.method === 'dif-analysis'
    && Array.isArray(fairness.groupSampleSizes)
    && fairness.groupSampleSizes.every(positiveInteger)
    && positiveInteger(fairness.itemsAnalyzed)
    && Number.isInteger(fairness.flaggedItems) && fairness.flaggedItems >= 0
    && Number.isInteger(fairness.unresolvedMaterialItems) && fairness.unresolvedMaterialItems >= 0
    && fairness.flaggedItems <= fairness.itemsAnalyzed
    && fairness.unresolvedMaterialItems <= fairness.flaggedItems
    && typeof fairness.lawfulBasisReference === 'string'
    && fairness.lawfulBasisReference.trim().length >= 3);
  const fairnessReview = bindingValid && fairnessValid
    && fairness!.groupSampleSizes.length >= input.criteria.minimumFairnessGroups
    && fairness!.groupSampleSizes.every(sample => sample >= input.criteria.minimumFairnessGroupSample)
    && fairness!.itemsAnalyzed === input.objectiveItemCount
    && fairness!.unresolvedMaterialItems <= input.criteria.maximumUnresolvedDifItems;

  const standardSetting = evidence?.standardSetting;
  const standardSettingValid = Boolean(standardSetting
    && ['bookmark', 'body-of-work'].includes(standardSetting.method)
    && positiveInteger(standardSetting.panelists)
    && Array.isArray(standardSetting.reviewedBoundaries)
    && new Set(standardSetting.reviewedBoundaries).size === CEFR_BOUNDARIES.length
    && CEFR_BOUNDARIES.every(boundary => standardSetting.reviewedBoundaries.includes(boundary))
    && ['approved', 'changes-requested'].includes(standardSetting.decision));
  const standardSettingReview = bindingValid && standardSettingValid
    && standardSetting!.panelists >= input.criteria.minimumStandardSettingPanelists
    && standardSetting!.decision === 'approved';

  return {
    bindingValid,
    evidenceVersion: typeof evidence?.evidenceVersion === 'string' ? evidence.evidenceVersion : null,
    status: typeof evidence?.status === 'string' ? evidence.status : null,
    generatedAt: bindingValid ? evidence.generatedAt : null,
    provenanceBound: provenanceValid,
    approvalBound: approvalValid,
    adaptiveReliability: { bySkill: reliabilityBySkill },
    classificationConsistency: {
      sampleSize: consistencyValid ? consistency!.sampleSize : null,
      coefficient: consistencyValid ? rounded(consistency!.coefficient) : null,
      method: consistencyValid ? consistency!.method : null,
    },
    localDependence: {
      eligibleTestlets: localDependenceValid ? localDependence!.eligibleTestlets : null,
      analyzedTestlets: localDependenceValid ? localDependence!.analyzedTestlets : null,
      minimumPairSample: localDependenceValid ? localDependence!.minimumPairSample : null,
      maximumObservedAbsoluteResidualCorrelation: localDependenceValid
        ? rounded(localDependence!.maximumObservedAbsoluteResidualCorrelation) : null,
      flaggedTestlets: localDependenceValid ? localDependence!.flaggedTestlets : null,
      unresolvedMaterialTestlets: localDependenceValid ? localDependence!.unresolvedMaterialTestlets : null,
      method: localDependenceValid ? localDependence!.method : null,
      resolutionRecorded: localDependenceValid && localDependence!.resolutionReference !== null,
    },
    stability: { bySkill: stabilityBySkill },
    fairness: {
      groupCount: fairnessValid ? fairness!.groupSampleSizes.length : null,
      minimumGroupSample: fairnessValid ? Math.min(...fairness!.groupSampleSizes) : null,
      itemsAnalyzed: fairnessValid ? fairness!.itemsAnalyzed : null,
      flaggedItems: fairnessValid ? fairness!.flaggedItems : null,
      unresolvedMaterialItems: fairnessValid ? fairness!.unresolvedMaterialItems : null,
      method: fairnessValid ? fairness!.method : null,
      lawfulBasisRecorded: fairnessValid,
    },
    standardSetting: {
      method: standardSettingValid ? standardSetting!.method : null,
      panelists: standardSettingValid ? standardSetting!.panelists : null,
      reviewedBoundaryCount: standardSettingValid ? standardSetting!.reviewedBoundaries.length : null,
      decision: standardSettingValid ? standardSetting!.decision : null,
    },
    gates: {
      adaptiveReliability, classificationConsistency, localDependenceReview,
      stability, fairnessReview, standardSettingReview,
    },
  } as const;
}

export function buildDiagnosticPilotReport(input: {
  attempts: readonly DiagnosticPilotAttemptRow[];
  responses: readonly DiagnosticPilotResponseRow[];
  writing: readonly DiagnosticPilotWritingRow[];
  references: readonly DiagnosticPilotReferenceRow[];
  bank: readonly DiagnosticBankRecord[];
  writingBank: readonly DiagnosticWritingPromptRecord[];
  criteria: DiagnosticPilotCriteria;
  measurementEvidence: DiagnosticPilotMeasurementEvidence;
  generatedAt: string;
}) {
  const criteriaErrors = validateDiagnosticPilotCriteria(input.criteria);
  if (criteriaErrors.length) throw new Error(criteriaErrors.join('; '));
  const generatedAtMs = Date.parse(input.generatedAt);
  if (!Number.isFinite(generatedAtMs)) throw new Error('pilot report date is invalid');
  validateDataset(input, input.bank);
  if (input.attempts.some(row => Date.parse(row.startedAt) > generatedAtMs)
    || input.writing.some(row => Date.parse(row.createdAt) > generatedAtMs)) {
    throw new Error('pilot dataset contains future operational evidence');
  }
  const activeBank = input.bank.filter(record => record.status === 'pilot' || record.status === 'operational');
  const activeWritingBank = input.writingBank.filter(record => record.status === 'pilot' || record.status === 'operational');
  const activeItemIds = new Set(activeBank.map(record => record.publicItem.id));
  const activeResponses = input.responses.filter(response => activeItemIds.has(response.itemId));
  const writingById = new Map(input.writingBank.map(record => [record.publicPrompt.id, record]));
  for (const row of input.writing) {
    const prompt = writingById.get(row.promptId);
    if (!prompt || prompt.publicPrompt.contentVersion !== row.contentVersion) {
      throw new Error('pilot writing row does not match the versioned bank');
    }
  }
  const activeWritingIds = new Set(activeWritingBank.map(record => record.publicPrompt.id));
  const activeWritingRows = input.writing.filter(row => activeWritingIds.has(row.promptId));
  const attemptIds = new Set(input.attempts.map(row => row.attemptId));
  if (input.writing.some(row => !attemptIds.has(row.attemptId))) throw new Error('pilot writing row has no attempt');
  if (new Set(input.writing.map(row => row.attemptId)).size !== input.writing.length) throw new Error('pilot writing rows contain duplicate attempts');

  const completed = input.attempts.filter(row => row.status === 'completed');
  const durations = completed.flatMap(row => {
    if (!row.completedAt) return [];
    const duration = Date.parse(row.completedAt) - Date.parse(row.startedAt);
    return Number.isFinite(duration) && duration >= 0 ? [duration] : [];
  });
  const statusCounts = Object.fromEntries([...new Set(input.attempts.map(row => row.status))].sort()
    .map(status => [status, input.attempts.filter(row => row.status === status).length]));
  const routeCounts = Object.fromEntries([...ROUTES, 'unassigned']
    .map(route => [route, input.attempts.filter(row => (row.routeId ?? 'unassigned') === route).length]));
  const completedRouteCounts = Object.fromEntries(ROUTES
    .map(route => [route, completed.filter(row => row.routeId === route).length]));
  const activeStatuses = new Set(['locator', 'precision', 'writing', 'scoring']);
  const activeAttempts = input.attempts.filter(row => activeStatuses.has(row.status));
  const overdueActiveAttempts = activeAttempts.filter(row => Date.parse(row.expiresAt) <= generatedAtMs).length;
  const objectiveResponseTimes = input.responses.flatMap(row => row.responseMs === null ? [] : [row.responseMs]);
  const listeningResponses = input.responses.filter(row => row.skill === 'listening');
  const attemptedListeningResponses = listeningResponses.filter(row => row.outcome !== 'omitted');
  const listeningResponsesWithoutPlayback = attemptedListeningResponses
    .filter(row => (row.audioPlayCount ?? 0) < 1).length;
  const writingQueueStatuses = new Set(['pending', 'automated-scored', 'human-review', 'adjudication']);
  const writingQueue = input.writing.filter(row => writingQueueStatuses.has(row.status));
  const writingQueueAges = writingQueue.map(row => Math.max(0, generatedAtMs - Date.parse(row.createdAt)));
  const writingTurnaround = input.writing.flatMap(row => row.completedAt === null
    ? [] : [Date.parse(row.completedAt) - Date.parse(row.createdAt)]);
  const activeBankById = new Map(activeBank.map(record => [record.publicItem.id, record]));

  const itemMetrics = activeBank.map(record => {
    const item = record.publicItem;
    const rows = activeResponses.filter(response => response.itemId === item.id);
    const attempted = rows.filter(row => row.outcome !== 'omitted');
    const correct = rows.filter(row => row.outcome === 'correct').length;
    const omissions = rows.filter(row => row.outcome === 'omitted').length;
    const times = rows.flatMap(row => row.responseMs === null ? [] : [row.responseMs]);
    const optionIds = item.response.kind === 'short-text' ? [] : [...item.response.optionIds];
    const optionCounts = new Map(optionIds.map(optionId => [optionId, 0]));
    for (const row of attempted) {
      for (const optionId of selectedOptionIds(row.submittedResponse)) optionCounts.set(optionId, (optionCounts.get(optionId) ?? 0) + 1);
    }
    const discrimination = correctedItemTotal(
      record, activeResponses, activeBankById, input.criteria.minimumDiscriminationSample,
    );
    const omissionRate = rate(omissions, rows.length);
    const facility = rate(correct, attempted.length);
    const correctOptionIds = record.scoring.kind === 'short-text'
      ? new Set<string>()
      : new Set(record.scoring.kind === 'single-choice' ? [record.scoring.optionId] : record.scoring.optionIds);
    const distractorRates = optionIds.filter(optionId => !correctOptionIds.has(optionId))
      .map(optionId => ({ optionId, rate: rate(optionCounts.get(optionId) ?? 0, attempted.length) }));
    const flags: string[] = [];
    if (attempted.length < input.criteria.minimumResponsesPerItem) flags.push('INSUFFICIENT_ITEM_SAMPLE');
    if (facility !== null && (facility < input.criteria.minimumItemFacility || facility > input.criteria.maximumItemFacility)) {
      flags.push('FACILITY_OUTSIDE_TARGET_RANGE');
    }
    if (omissionRate !== null && omissionRate > input.criteria.maximumOmissionRate) flags.push('HIGH_OMISSION');
    if (discrimination.correlation === null) flags.push('DISCRIMINATION_NOT_ESTIMABLE');
    if (discrimination.correlation !== null && discrimination.correlation < input.criteria.minimumCorrectedItemTotal) flags.push('LOW_OR_NEGATIVE_DISCRIMINATION');
    if (attempted.length >= input.criteria.minimumResponsesPerItem
      && distractorRates.some(distractor => distractor.rate === null
        || distractor.rate < input.criteria.minimumDistractorSelectionRate)) {
      flags.push('NONFUNCTIONING_DISTRACTOR');
    }
    if (item.stimulus.kind === 'audio' && attempted.some(row => (row.audioPlayCount ?? 0) < 1)) flags.push('LISTENING_RESPONSE_WITHOUT_PLAYBACK');
    return {
      itemId: item.id,
      contentVersion: item.contentVersion,
      skill: item.skill,
      levelCandidate: item.levelCandidate,
      served: rows.length,
      attempted: attempted.length,
      correct,
      incorrect: rows.filter(row => row.outcome === 'incorrect').length,
      omitted: omissions,
      facility,
      omissionRate,
      medianResponseMs: quantile(times, 0.5),
      p90ResponseMs: quantile(times, 0.9),
      audioStartedRate: item.stimulus.kind === 'audio'
        ? rate(rows.filter(row => (row.audioPlayCount ?? 0) >= 1).length, rows.length)
        : null,
      correctedItemTotal: discrimination,
      optionSelections: [...optionCounts.entries()].sort(([left], [right]) => left.localeCompare(right))
        .map(([optionId, selections]) => ({ optionId, selections, rateAmongAttempted: rate(selections, attempted.length) })),
      distractorFunctioning: distractorRates,
      flags,
    };
  }).sort((left, right) => left.itemId.localeCompare(right.itemId));

  const writingPairs = activeWritingRows.filter(row => boundedRate(row.exactAgreement)
    && typeof row.meanAbsoluteLevelDifference === 'number' && Number.isFinite(row.meanAbsoluteLevelDifference));
  const writingExactAgreement = writingPairs.length
    ? rounded(writingPairs.reduce((sum, row) => sum + (row.exactAgreement ?? 0), 0) / writingPairs.length)
    : null;
  const writingMeanDifference = writingPairs.length
    ? rounded(writingPairs.reduce((sum, row) => sum + (row.meanAbsoluteLevelDifference ?? 0), 0) / writingPairs.length)
    : null;
  const adjudicationRate = rate(writingPairs.filter(row => row.requiresAdjudication === true).length, writingPairs.length);
  const references = referenceMetrics(input.references);
  const bankSnapshotSha256 = diagnosticPilotBankSha256({ bank: input.bank, writingBank: input.writingBank });
  const measurement = measurementEvidenceSummary({
    evidence: input.measurementEvidence,
    criteria: input.criteria,
    bankSnapshotSha256,
    objectiveItemCount: activeBank.length,
    eligibleTestletCount: diagnosticEligibleTestletCount(activeBank),
  });

  const gates = {
    criteriaApproved: input.criteria.status === 'approved',
    attemptVolume: input.attempts.length >= input.criteria.minimumStartedAttempts,
    completion: (rate(completed.length, input.attempts.length) ?? 0) >= input.criteria.minimumCompletionRate,
    routeCoverage: ROUTES.every(route => completedRouteCounts[route] >= input.criteria.minimumCompletedPerRoute),
    itemSamples: itemMetrics.length > 0
      && itemMetrics.every(item => item.attempted >= input.criteria.minimumResponsesPerItem),
    itemQuality: itemMetrics.length > 0 && itemMetrics.every(item => item.omissionRate !== null
      && item.omissionRate <= input.criteria.maximumOmissionRate
      && item.facility !== null
      && item.facility >= input.criteria.minimumItemFacility
      && item.facility <= input.criteria.maximumItemFacility
      && item.correctedItemTotal.correlation !== null
      && item.correctedItemTotal.correlation >= input.criteria.minimumCorrectedItemTotal),
    distractorFunctioning: itemMetrics.length > 0 && itemMetrics.every(item =>
      item.distractorFunctioning.every(distractor => distractor.rate !== null
        && distractor.rate >= input.criteria.minimumDistractorSelectionRate)),
    writingAgreement: writingPairs.length >= input.criteria.minimumWritingPairs
      && writingExactAgreement !== null && writingExactAgreement >= input.criteria.minimumWritingExactAgreement
      && writingMeanDifference !== null && writingMeanDifference <= input.criteria.maximumWritingMeanAbsoluteLevelDifference
      && adjudicationRate !== null && adjudicationRate <= input.criteria.maximumWritingAdjudicationRate,
    independentReference: references.pairs >= input.criteria.minimumIndependentReferencePairs
      && references.exactAgreement !== null && references.exactAgreement >= input.criteria.minimumReferenceExactAgreement
      && references.withinOneLevel !== null && references.withinOneLevel >= input.criteria.minimumReferenceWithinOneLevel
      && references.severeDisagreementRate !== null && references.severeDisagreementRate <= input.criteria.maximumReferenceSevereDisagreement,
    referenceLevelCoverage: CEFR_LEVELS.every(level =>
      references.referenceLevelCounts[level] >= input.criteria.minimumReferencesPerCefrLevel),
    ...measurement.gates,
  };
  const allGatesPass = Object.values(gates).every(Boolean);
  return {
    reportVersion: 'diagnostic-pilot-report-v3',
    generatedAt: new Date(input.generatedAt).toISOString(),
    criteria: { version: input.criteria.criteriaVersion, status: input.criteria.status },
    bankSnapshot: {
      sha256: bankSnapshotSha256,
      objectiveItems: activeBank.length,
      retiredObjectiveItems: input.bank.length - activeBank.length,
      writingPrompts: activeWritingBank.length,
      retiredWritingPrompts: input.writingBank.length - activeWritingBank.length,
      attemptBankVersions: [...new Set(input.attempts.map(row => row.bankVersion))].sort(),
    },
    decision: allGatesPass ? 'ELIGIBLE_FOR_VALIDATION_REVIEW' : 'HOLD',
    gates,
    attempts: {
      started: input.attempts.length,
      completed: completed.length,
      completionRate: rate(completed.length, input.attempts.length),
      medianCompletionMs: quantile(durations, 0.5),
      p90CompletionMs: quantile(durations, 0.9),
      statusCounts,
      routeCounts,
      completedRouteCounts,
    },
    operations: {
      activeAttempts: activeAttempts.length,
      overdueActiveAttempts,
      abandonedAttempts: input.attempts.filter(row => row.status === 'abandoned').length,
      expiredAttempts: input.attempts.filter(row => row.status === 'expired').length,
      objectiveMedianResponseMs: quantile(objectiveResponseTimes, 0.5),
      objectiveP90ResponseMs: quantile(objectiveResponseTimes, 0.9),
      listeningResponses: listeningResponses.length,
      listeningStartedRate: rate(
        listeningResponses.filter(row => (row.audioPlayCount ?? 0) >= 1).length,
        listeningResponses.length,
      ),
      listeningResponsesWithoutPlayback,
      writingQueueOpen: writingQueue.length,
      writingQueueOldestMs: writingQueueAges.length ? Math.max(...writingQueueAges) : null,
      writingFailed: input.writing.filter(row => row.status === 'failed').length,
      writingMedianTurnaroundMs: quantile(writingTurnaround, 0.5),
      writingP90TurnaroundMs: quantile(writingTurnaround, 0.9),
      monitoringCoverage: {
        applicationErrorRate: 'structured-runtime-logs',
        audioDeliveryFailureRate: 'structured-runtime-logs',
        forwardingAndAlerts: 'deployment-verification-required',
      },
    },
    itemMetrics,
    writingAgreement: {
      submitted: activeWritingRows.length,
      comparablePairs: writingPairs.length,
      exactAgreement: writingExactAgreement,
      meanAbsoluteLevelDifference: writingMeanDifference,
      adjudicationRate,
    },
    independentReference: references,
    measurementEvidence: measurement,
    warnings: [
      ...(input.criteria.status !== 'approved' ? ['PUBLICATION_CRITERIA_AWAIT_ACADEMIC_APPROVAL'] : []),
      ...(input.references.length === 0 ? ['NO_INDEPENDENT_REFERENCE_EVIDENCE'] : []),
      ...(!measurement.bindingValid ? ['MEASUREMENT_EVIDENCE_NOT_BOUND'] : []),
      ...(measurement.bindingValid && !measurement.gates.localDependenceReview
        ? ['LOCAL_DEPENDENCE_REVIEW_REQUIRED'] : []),
      ...(itemMetrics.some(item => item.flags.length > 0) ? ['ITEMS_REQUIRE_REVIEW'] : []),
      ...(overdueActiveAttempts > 0 ? ['OVERDUE_ACTIVE_ATTEMPTS'] : []),
      ...(input.writing.some(row => row.status === 'failed') ? ['WRITING_FAILURES_PRESENT'] : []),
      ...(listeningResponsesWithoutPlayback > 0 ? ['LISTENING_RESPONSES_WITHOUT_PLAYBACK'] : []),
    ],
  } as const;
}
