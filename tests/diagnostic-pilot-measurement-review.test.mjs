import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  buildDiagnosticPilotMeasurementReviewPackets,
  compileDiagnosticPilotMeasurementReviews,
  recordDiagnosticPilotMeasurementEvidence,
  validateDiagnosticPilotMeasurementCandidate,
  validateDiagnosticPilotMeasurementManifest,
} from '../scripts/lib/diagnostic-pilot-measurement-review.mjs';

const criteria = {
  criteriaVersion: 'criteria-v2', minimumAdaptiveReliabilitySamplePerSkill: 10,
  minimumAdaptiveReliability: 0.8, minimumClassificationConsistencySample: 10,
  minimumClassificationConsistency: 0.8, minimumStabilityPairsPerSkill: 10,
  minimumLocalDependencePairsPerTestlet: 10,
  maximumLocalDependenceResidualCorrelation: 0.2,
  maximumUnresolvedLocalDependenceTestlets: 0,
  minimumStabilityCorrelation: 0.75, minimumStabilityWithinOneLevel: 0.9,
  minimumFairnessGroups: 2, minimumFairnessGroupSample: 10,
  maximumUnresolvedDifItems: 0, minimumStandardSettingPanelists: 3,
};
const bankSnapshotSha256 = 'b'.repeat(64);
const candidateSha256 = 'c'.repeat(64);
const candidate = {
  evidenceVersion: 'diagnostic-pilot-measurement-evidence-v2', status: 'complete',
  criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  generatedAt: '2026-09-25T12:00:00.000Z',
  provenance: {
    aggregateDatasetSha256: '1'.repeat(64), analysisCodeSha256: '2'.repeat(64),
    analysisRunId: 'pilot-analysis-run-1',
  },
  adaptiveReliability: ['reading', 'listening', 'grammar', 'vocabulary'].map(skill => ({
    skill, sampleSize: 10, coefficient: 0.85, method: 'route-aware-resampling',
  })),
  classificationConsistency: { sampleSize: 10, coefficient: 0.84, method: 'bootstrap-classification' },
  localDependence: {
    method: 'adjusted-yen-q3', eligibleTestlets: 1, analyzedTestlets: 1,
    minimumPairSample: 10, maximumObservedAbsoluteResidualCorrelation: 0.12,
    flaggedTestlets: 0, unresolvedMaterialTestlets: 0, resolutionReference: null,
  },
  stabilityBySkill: ['reading', 'listening', 'writing', 'grammar', 'vocabulary'].map(skill => ({
    skill, pairs: 10, correlation: 0.8, withinOneLevel: 0.92, method: 'parallel-forms',
  })),
  fairness: {
    method: 'dif-analysis', groupSampleSizes: [10, 11], itemsAnalyzed: 2,
    flaggedItems: 1, unresolvedMaterialItems: 0, lawfulBasisReference: 'privacy-review-2026',
  },
  standardSetting: {
    method: 'bookmark', panelists: 3,
    reviewedBoundaries: ['A1/A2', 'A2/B1', 'B1/B2', 'B2/C1', 'C1/C2'], decision: 'approved',
  },
  approval: null,
};

function packets() {
  return buildDiagnosticPilotMeasurementReviewPackets({
    candidate, candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
    objectiveItemCount: 2, eligibleTestletCount: 1, generatedAt: '2026-09-25T13:00:00.000Z',
  });
}

function approvedReviews() {
  return packets().map((packet, index) => ({
    ...packet,
    reviewerId: ['academic-reviewer', 'measurement-reviewer', 'privacy-reviewer'][index],
    decision: 'APPROVE', reviewedAt: `2026-09-25T14:0${index}:00.000Z`, attestation: true,
    checks: Object.fromEntries(Object.keys(packet.checks).map(check => [check, true])),
  }));
}

test('measurement candidate is aggregate-only, thresholded and bound to criteria and bank', () => {
  assert.equal(validateDiagnosticPilotMeasurementCandidate({
    candidate, candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
    objectiveItemCount: 2, eligibleTestletCount: 1,
  }), candidate);
  assert.throws(() => validateDiagnosticPilotMeasurementCandidate({
    candidate: { ...candidate, participantRows: [] }, candidateSha256, criteria,
    expectedBankSnapshotSha256: bankSnapshotSha256, objectiveItemCount: 2, eligibleTestletCount: 1,
  }), /aggregate evidence schema/);
  assert.throws(() => validateDiagnosticPilotMeasurementCandidate({
    candidate: {
      ...candidate,
      adaptiveReliability: candidate.adaptiveReliability.map((row, index) =>
        index === 0 ? { ...row, coefficient: 0.5 } : row),
    },
    candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
    objectiveItemCount: 2, eligibleTestletCount: 1,
  }), /does not meet criteria/);
  assert.throws(() => validateDiagnosticPilotMeasurementCandidate({
    candidate: {
      ...candidate,
      localDependence: {
        ...candidate.localDependence,
        maximumObservedAbsoluteResidualCorrelation: 0.4,
        flaggedTestlets: 1,
        unresolvedMaterialTestlets: 1,
      },
    },
    candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
    objectiveItemCount: 2, eligibleTestletCount: 1,
  }), /Local dependence evidence/);
});

test('review packets separate academic, measurement and privacy responsibilities', () => {
  const result = packets();
  assert.deepEqual(result.map(packet => packet.role), ['academic-lead', 'measurement-lead', 'privacy-lead']);
  assert.deepEqual(Object.keys(result[0].checks), [
    'constructCoverageReviewed', 'cefrBoundaryEvidenceReviewed',
    'localDependenceInterpretationReviewed', 'standardSettingReviewed', 'interpretationLimitsAccepted',
  ]);
  assert.ok(Object.hasOwn(result[1].checks, 'adaptiveReliabilityReviewed'));
  assert.ok(Object.hasOwn(result[1].checks, 'localDependenceReviewed'));
  assert.ok(Object.hasOwn(result[2].checks, 'lawfulBasisVerified'));
  assert.doesNotMatch(JSON.stringify(result), /participantRows|groupLabel/);
});

test('measurement compilation requires three complete reviews with independent identities', () => {
  const reviews = approvedReviews();
  const compiled = compileDiagnosticPilotMeasurementReviews({
    reviews, candidateSha256, criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  });
  assert.equal(compiled.decision, 'APPROVED');
  assert.equal(compiled.reviews.length, 3);
  assert.throws(() => compileDiagnosticPilotMeasurementReviews({
    reviews: reviews.map(review => ({ ...review, reviewerId: 'same-reviewer' })),
    candidateSha256, criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  }), /independent reviewer identities/);
  assert.throws(() => compileDiagnosticPilotMeasurementReviews({
    reviews: reviews.map((review, index) => index === 1
      ? { ...review, checks: { ...review.checks, stabilityReviewed: false } } : review),
    candidateSha256, criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  }), /every role-specific check/);
});

test('only a re-hashed approved manifest can populate committed measurement evidence', () => {
  const reviews = approvedReviews();
  const reviewFiles = new Map(reviews.map(review => {
    const file = `${review.role}.json`;
    const bytes = Buffer.from(`${JSON.stringify(review, null, 2)}\n`);
    return [file, { review, sha256: createHash('sha256').update(bytes).digest('hex') }];
  }));
  const compiled = compileDiagnosticPilotMeasurementReviews({
    reviews, candidateSha256, criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  });
  const core = {
    ...compiled, compiledAt: '2026-09-25T15:00:00.000Z',
    receipts: reviews.map(review => ({
      packetId: review.packetId, file: `${review.role}.json`,
      sha256: reviewFiles.get(`${review.role}.json`).sha256,
    })),
  };
  const manifestSha256 = createHash('sha256').update(JSON.stringify(core)).digest('hex');
  const validated = validateDiagnosticPilotMeasurementManifest({
    manifest: { ...core, manifestSha256 }, manifestSha256, reviewFiles, candidateSha256,
    criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
  });
  const recorded = recordDiagnosticPilotMeasurementEvidence({
    candidate, validated, appliedAt: '2026-09-25T15:05:00.000Z', appliedBy: 'release-operator',
  });
  assert.equal(recorded.approval.manifestSha256, manifestSha256);
  assert.deepEqual(recorded.approval.approvedBy, [
    'academic-lead:academic-reviewer', 'measurement-lead:measurement-reviewer',
    'privacy-lead:privacy-reviewer',
  ]);
  assert.equal(recorded.approval.candidateSha256, candidateSha256);
});

test('measurement tooling is private, dry-run first and confirmation bound', () => {
  const scaffold = readFileSync(new URL('../scripts/scaffold-diagnostic-pilot-measurement.mjs', import.meta.url), 'utf8');
  const recorder = readFileSync(new URL('../scripts/record-diagnostic-pilot-measurement.mjs', import.meta.url), 'utf8');
  assert.match(scaffold, /\.diagnostic-private/);
  assert.match(scaffold, /refusing to overwrite/);
  assert.match(recorder, /requires a clean working tree/);
  assert.match(recorder, /Dry run only/);
  assert.match(recorder, /APPLY_DIAGNOSTIC_PILOT_MEASUREMENT/);
  assert.match(recorder, /--write/);
});
