import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import {
  buildDiagnosticPilotReport,
  validateDiagnosticPilotCriteria,
} from '../src/server/diagnostic/pilot-analytics.ts';

const bank = ENGLISH_DIAGNOSTIC_READING_CANDIDATES.slice(0, 2).map(record => ({
  ...record, status: 'pilot', review: { status: 'approved' },
}));
const criteria = {
  criteriaVersion: 'fixture-v1', status: 'approved', minimumStartedAttempts: 4,
  minimumCompletionRate: 0.75, minimumResponsesPerItem: 4, minimumDiscriminationSample: 4,
  minimumCorrectedItemTotal: 0.1, maximumOmissionRate: 0.25, minimumWritingPairs: 4,
  minimumWritingExactAgreement: 0.7, maximumWritingMeanAbsoluteLevelDifference: 0.5,
  maximumWritingAdjudicationRate: 0.25, minimumIndependentReferencePairs: 4,
  minimumReferenceExactAgreement: 0.5, minimumReferenceWithinOneLevel: 0.75,
  maximumReferenceSevereDisagreement: 0.25,
};

const attempts = Array.from({ length: 4 }, (_, index) => ({
  attemptId: `private-attempt-${index + 1}`, status: 'completed', routeId: index < 2 ? 'low-a1-a2' : 'mid-b1-b2',
  bankVersion: 'fixture-bank', startedAt: `2026-09-25T12:0${index}:00.000Z`,
  updatedAt: `2026-09-25T12:2${index}:00.000Z`, completedAt: `2026-09-25T12:2${index}:00.000Z`,
}));

const patterns = [[true, true], [true, true], [false, false], [false, false]];
const responses = attempts.flatMap((attempt, attemptIndex) => bank.map((record, itemIndex) => ({
  attemptId: attempt.attemptId, itemId: record.publicItem.id, contentVersion: record.publicItem.contentVersion,
  skill: 'reading', outcome: patterns[attemptIndex][itemIndex] ? 'correct' : 'incorrect',
  submittedResponse: { kind: 'single-choice', optionId: record.publicItem.response.optionIds[patterns[attemptIndex][itemIndex] ? 0 : 1] },
  responseMs: 1_000 + attemptIndex * 100, audioPlayCount: null,
})));

const writing = attempts.map(attempt => ({
  attemptId: attempt.attemptId, status: 'completed', exactAgreement: 0.75,
  meanAbsoluteLevelDifference: 0.25, requiresAdjudication: false,
}));
const references = attempts.map((attempt, index) => ({
  attemptId: attempt.attemptId, diagnosticLevel: index < 2 ? 'A2' : 'B1',
  referenceLevel: index === 0 ? 'A1' : index < 2 ? 'A2' : 'B1', source: 'external-test',
}));

test('pilot report aggregates attempts, item behavior, writing and independent references', () => {
  const report = buildDiagnosticPilotReport({ attempts, responses, writing, references, bank, criteria, generatedAt: '2026-09-25T14:00:00.000Z' });
  assert.equal(report.attempts.started, 4);
  assert.equal(report.attempts.completionRate, 1);
  assert.equal(report.itemMetrics[0].served, 4);
  assert.equal(report.itemMetrics[0].facility, 0.5);
  assert.equal(report.writingAgreement.comparablePairs, 4);
  assert.equal(report.independentReference.withinOneLevel, 1);
  assert.equal(report.decision, 'ELIGIBLE_FOR_VALIDATION_REVIEW');
  assert.equal(report.gates.itemQuality, true);
});

test('report never serializes attempt identity or submitted response content', () => {
  const report = buildDiagnosticPilotReport({ attempts, responses, writing, references, bank, criteria, generatedAt: '2026-09-25T14:00:00.000Z' });
  const serialized = JSON.stringify(report);
  assert.doesNotMatch(serialized, /private-attempt/);
  assert.doesNotMatch(serialized, /submittedResponse/);
  assert.doesNotMatch(serialized, /userId|responseText/);
});

test('empty real-world evidence holds every publication-sensitive gate', () => {
  const strictCriteria = { ...criteria, status: 'provisional-pending-academic-approval' };
  const report = buildDiagnosticPilotReport({ attempts: [], responses: [], writing: [], references: [], bank, criteria: strictCriteria, generatedAt: '2026-09-25T14:00:00.000Z' });
  assert.equal(report.decision, 'HOLD');
  assert.equal(Object.values(report.gates).every(value => value === false), true);
  assert.deepEqual(report.warnings, ['PUBLICATION_CRITERIA_AWAIT_ACADEMIC_APPROVAL', 'NO_INDEPENDENT_REFERENCE_EVIDENCE', 'ITEMS_REQUIRE_REVIEW']);
});

test('criteria validation rejects unfrozen or impossible thresholds', () => {
  assert.deepEqual(validateDiagnosticPilotCriteria(criteria), []);
  assert.match(validateDiagnosticPilotCriteria({ ...criteria, minimumResponsesPerItem: 0 }).join('; '), /positive integer/);
  assert.match(validateDiagnosticPilotCriteria({ ...criteria, maximumOmissionRate: 2 }).join('; '), /between zero and one/);
});
