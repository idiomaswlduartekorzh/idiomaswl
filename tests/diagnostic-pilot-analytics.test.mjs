import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import {
  buildDiagnosticPilotReport,
  diagnosticPilotBankSha256,
  validateDiagnosticPilotCriteria,
} from '../src/server/diagnostic/pilot-analytics.ts';

const bank = ENGLISH_DIAGNOSTIC_READING_CANDIDATES.slice(0, 2).map(record => ({
  ...record, status: 'pilot', review: { status: 'approved' },
}));
const writingBank = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.slice(0, 1).map(record => ({
  ...record, status: 'pilot', review: { status: 'approved' },
}));
const criteria = {
  criteriaVersion: 'fixture-v2', status: 'approved', minimumStartedAttempts: 12,
  minimumCompletionRate: 0.75, minimumCompletedPerRoute: 4,
  minimumResponsesPerItem: 12, minimumDiscriminationSample: 12,
  minimumCorrectedItemTotal: 0.1, minimumItemFacility: 0.2, maximumItemFacility: 0.8,
  minimumDistractorSelectionRate: 0.05, maximumOmissionRate: 0.25, minimumWritingPairs: 12,
  minimumWritingExactAgreement: 0.7, maximumWritingMeanAbsoluteLevelDifference: 0.5,
  maximumWritingAdjudicationRate: 0.25, minimumIndependentReferencePairs: 12,
  minimumReferencesPerCefrLevel: 2,
  minimumReferenceExactAgreement: 0.5, minimumReferenceWithinOneLevel: 0.75,
  maximumReferenceSevereDisagreement: 0.25,
  minimumAdaptiveReliabilitySamplePerSkill: 10, minimumAdaptiveReliability: 0.8,
  minimumClassificationConsistencySample: 10, minimumClassificationConsistency: 0.8,
  minimumStabilityPairsPerSkill: 10, minimumStabilityCorrelation: 0.75,
  minimumStabilityWithinOneLevel: 0.9, minimumFairnessGroups: 2,
  minimumFairnessGroupSample: 10, maximumUnresolvedDifItems: 0,
  minimumStandardSettingPanelists: 3,
};

const routes = ['low-a1-a2', 'mid-b1-b2', 'high-c1-c2'];
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const attempts = Array.from({ length: 12 }, (_, index) => ({
  attemptId: `private-attempt-${index + 1}`, status: 'completed', routeId: routes[Math.floor(index / 4)],
  bankVersion: 'fixture-bank', startedAt: `2026-09-25T12:${String(index).padStart(2, '0')}:00.000Z`,
  updatedAt: `2026-09-25T13:${String(index).padStart(2, '0')}:00.000Z`,
  completedAt: `2026-09-25T13:${String(index).padStart(2, '0')}:00.000Z`,
}));

const patterns = Array.from({ length: 12 }, (_, index) => [index < 6, index < 6]);
const responses = attempts.flatMap((attempt, attemptIndex) => bank.map((record, itemIndex) => ({
  attemptId: attempt.attemptId, itemId: record.publicItem.id, contentVersion: record.publicItem.contentVersion,
  skill: 'reading', outcome: patterns[attemptIndex][itemIndex] ? 'correct' : 'incorrect',
  submittedResponse: {
    kind: 'single-choice',
    optionId: patterns[attemptIndex][itemIndex]
      ? record.scoring.optionId
      : record.publicItem.response.optionIds.filter(optionId => optionId !== record.scoring.optionId)[attemptIndex % 2],
  },
  responseMs: 1_000 + attemptIndex * 100, audioPlayCount: null,
})));

const writing = attempts.map(attempt => ({
  attemptId: attempt.attemptId, status: 'completed', exactAgreement: 0.75,
  meanAbsoluteLevelDifference: 0.25, requiresAdjudication: false,
}));
const references = attempts.map((attempt, index) => ({
  attemptId: attempt.attemptId, diagnosticLevel: levels[index % levels.length],
  referenceLevel: levels[index % levels.length], source: 'external-test',
}));

const measurementEvidence = {
  evidenceVersion: 'diagnostic-pilot-measurement-evidence-v1', status: 'complete',
  criteriaVersion: criteria.criteriaVersion,
  bankSnapshotSha256: diagnosticPilotBankSha256({ bank, writingBank }),
  generatedAt: '2026-09-25T13:00:00.000Z',
  adaptiveReliability: ['reading', 'listening', 'grammar', 'vocabulary'].map(skill => ({
    skill, sampleSize: 12, coefficient: 0.85, method: 'route-aware-resampling',
  })),
  classificationConsistency: { sampleSize: 12, coefficient: 0.84, method: 'bootstrap-classification' },
  stabilityBySkill: ['reading', 'listening', 'writing', 'grammar', 'vocabulary'].map(skill => ({
    skill, pairs: 12, correlation: 0.8, withinOneLevel: 0.92, method: 'parallel-forms',
  })),
  fairness: {
    method: 'dif-analysis', groupSampleSizes: [12, 12], itemsAnalyzed: bank.length,
    flaggedItems: 1, unresolvedMaterialItems: 0, lawfulBasisReference: 'privacy-review-fixture',
  },
  standardSetting: {
    method: 'bookmark', panelists: 3,
    reviewedBoundaries: ['A1/A2', 'A2/B1', 'B1/B2', 'B2/C1', 'C1/C2'], decision: 'approved',
  },
};

const buildReport = overrides => buildDiagnosticPilotReport({
  attempts, responses, writing, references, bank, writingBank, criteria, measurementEvidence,
  generatedAt: '2026-09-25T14:00:00.000Z', ...overrides,
});

test('pilot report aggregates attempts, item behavior, writing and independent references', () => {
  const report = buildReport();
  assert.equal(report.attempts.started, 12);
  assert.equal(report.attempts.completionRate, 1);
  assert.equal(report.itemMetrics[0].served, 12);
  assert.equal(report.itemMetrics[0].facility, 0.5);
  assert.equal(report.writingAgreement.comparablePairs, 12);
  assert.equal(report.independentReference.withinOneLevel, 1);
  assert.deepEqual(report.attempts.completedRouteCounts, {
    'low-a1-a2': 4, 'mid-b1-b2': 4, 'high-c1-c2': 4,
  });
  assert.equal(report.measurementEvidence.adaptiveReliability.bySkill.length, 4);
  assert.equal(report.decision, 'ELIGIBLE_FOR_VALIDATION_REVIEW');
  assert.equal(report.gates.itemQuality, true);
  assert.equal(Object.values(report.gates).every(Boolean), true);
  assert.match(report.bankSnapshot.sha256, /^[a-f0-9]{64}$/u);
  assert.equal(report.bankSnapshot.objectiveItems, 2);
  assert.equal(report.bankSnapshot.writingPrompts, 1);
});

test('report never serializes attempt identity or submitted response content', () => {
  const report = buildReport();
  const serialized = JSON.stringify(report);
  assert.doesNotMatch(serialized, /private-attempt/);
  assert.doesNotMatch(serialized, /submittedResponse/);
  assert.doesNotMatch(serialized, /userId|responseText/);
});

test('empty real-world evidence holds every publication-sensitive gate', () => {
  const strictCriteria = { ...criteria, status: 'provisional-pending-academic-approval' };
  const report = buildReport({
    attempts: [], responses: [], writing: [], references: [], criteria: strictCriteria,
    measurementEvidence: {
      ...measurementEvidence, status: 'not-collected', bankSnapshotSha256: null, generatedAt: null,
      adaptiveReliability: [], classificationConsistency: null, stabilityBySkill: [], fairness: null, standardSetting: null,
    },
  });
  assert.equal(report.decision, 'HOLD');
  assert.equal(Object.values(report.gates).every(value => value === false), true);
  assert.deepEqual(report.warnings, [
    'PUBLICATION_CRITERIA_AWAIT_ACADEMIC_APPROVAL', 'NO_INDEPENDENT_REFERENCE_EVIDENCE',
    'MEASUREMENT_EVIDENCE_NOT_BOUND', 'ITEMS_REQUIRE_REVIEW',
  ]);
});

test('criteria validation rejects unfrozen or impossible thresholds', () => {
  assert.deepEqual(validateDiagnosticPilotCriteria(criteria), []);
  assert.match(validateDiagnosticPilotCriteria({ ...criteria, minimumResponsesPerItem: 0 }).join('; '), /positive integer/);
  assert.match(validateDiagnosticPilotCriteria({ ...criteria, maximumOmissionRate: 2 }).join('; '), /between zero and one/);
  assert.match(validateDiagnosticPilotCriteria({ ...criteria, minimumItemFacility: 0.9 }).join('; '), /lower than/);
});

test('route, CEFR coverage and specialist measurement evidence fail closed independently', () => {
  const missingRoute = buildReport({ attempts: attempts.map(row => ({ ...row, routeId: 'low-a1-a2' })) });
  assert.equal(missingRoute.gates.routeCoverage, false);
  const missingLevel = buildReport({ references: references.map(row => ({ ...row, referenceLevel: 'A1' })) });
  assert.equal(missingLevel.gates.referenceLevelCoverage, false);
  const staleMeasurement = buildReport({
    measurementEvidence: { ...measurementEvidence, bankSnapshotSha256: '0'.repeat(64) },
  });
  assert.equal(staleMeasurement.gates.adaptiveReliability, false);
  assert.equal(staleMeasurement.gates.classificationConsistency, false);
  assert.equal(staleMeasurement.gates.stability, false);
  assert.equal(staleMeasurement.gates.fairnessReview, false);
  assert.equal(staleMeasurement.gates.standardSettingReview, false);
  assert.deepEqual(staleMeasurement.warnings, ['MEASUREMENT_EVIDENCE_NOT_BOUND']);
});

test('item facility and every keyed distractor must function at the approved sample size', () => {
  const allCorrect = responses.map(row => ({
    ...row, outcome: 'correct',
    submittedResponse: { kind: 'single-choice', optionId: bank.find(record => record.publicItem.id === row.itemId).scoring.optionId },
  }));
  const report = buildReport({ responses: allCorrect });
  assert.equal(report.gates.itemQuality, false);
  assert.equal(report.gates.distractorFunctioning, false);
  assert.ok(report.itemMetrics.every(item => item.flags.includes('FACILITY_OUTSIDE_TARGET_RANGE')));
  assert.ok(report.itemMetrics.every(item => item.flags.includes('NONFUNCTIONING_DISTRACTOR')));
});

test('pilot bank fingerprint changes when an objective item or writing prompt changes', () => {
  const original = diagnosticPilotBankSha256({ bank, writingBank });
  const changedObjective = bank.map((record, index) => index === 0 ? {
    ...record,
    rationale: { ...record.rationale, key: `${record.rationale.key} changed` },
  } : record);
  const changedWriting = writingBank.map(record => ({
    ...record,
    publicPrompt: { ...record.publicPrompt, title: `${record.publicPrompt.title} changed` },
  }));
  assert.notEqual(diagnosticPilotBankSha256({ bank: changedObjective, writingBank }), original);
  assert.notEqual(diagnosticPilotBankSha256({ bank, writingBank: changedWriting }), original);
});
