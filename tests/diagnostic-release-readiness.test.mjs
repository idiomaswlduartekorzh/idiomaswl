import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { buildDiagnosticReleaseReadiness } from '../scripts/lib/diagnostic-release-readiness.mjs';

const json = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

function readyFixture() {
  const reviewedAt = '2026-09-25T12:00:00.000Z';
  const commit = 'a'.repeat(40);
  const governanceManifestSha256 = '4'.repeat(64);
  const pilotReportSha256 = '6'.repeat(64);
  const pilotCaptureSha256 = '7'.repeat(64);
  const pilotReviews = [
    {
      role: 'academic-lead', reviewerId: 'academic-reviewer', decision: 'APPROVE', reviewedAt,
      checks: {
        sampleAndCompletionReviewed: true, routeAndLevelCoverageReviewed: true,
        itemQualityReviewed: true, writingAgreementReviewed: true, independentReferenceReviewed: true,
        measurementEvidenceBindingReviewed: true, adaptiveReliabilityReviewed: true,
        classificationConsistencyReviewed: true, stabilityReviewed: true, fairnessReviewed: true,
        standardSettingReviewed: true, limitationsAccepted: true,
      },
    },
    {
      role: 'measurement-lead', reviewerId: 'measurement-reviewer', decision: 'APPROVE', reviewedAt,
      checks: {
        sampleAndCompletionReviewed: true, routeAndLevelCoverageReviewed: true,
        itemQualityReviewed: true, writingAgreementReviewed: true, independentReferenceReviewed: true,
        measurementEvidenceBindingReviewed: true, adaptiveReliabilityReviewed: true,
        classificationConsistencyReviewed: true, stabilityReviewed: true, fairnessReviewed: true,
        standardSettingReviewed: true, limitationsAccepted: true,
      },
    },
  ];
  const pilotValidationCore = {
    manifestVersion: 'diagnostic-pilot-validation-manifest-v2', decision: 'APPROVED',
    reportSha256: pilotReportSha256, captureReceiptSha256: pilotCaptureSha256,
    sourceSha256: 'source-sha', bankSnapshotSha256: 'bank-sha',
    reviews: pilotReviews,
    safeguards: { independentRoleReviews: true, aggregateEvidenceOnly: true },
    compiledAt: reviewedAt,
    receipts: [
      { packetId: 'diagnostic-pilot-validation:academic-lead', file: 'academic-lead.json', sha256: '8'.repeat(64) },
      { packetId: 'diagnostic-pilot-validation:measurement-lead', file: 'measurement-lead.json', sha256: '9'.repeat(64) },
    ],
  };
  const pilotValidationSha256 = createHash('sha256').update(JSON.stringify(pilotValidationCore)).digest('hex');
  const objectiveCells = Array.from({ length: 24 }, (_, index) => ({
    level: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'][Math.floor(index / 4)],
    skill: ['reading', 'listening', 'grammar', 'vocabulary'][index % 4],
    requirements: { decisions: 12 }, operationalDecisions: 12,
  }));
  return {
    bankReadiness: { summary: { operationalObjectiveDecisions: 288, approvedSelectableObjectiveDecisions: 288, writingApprovedPrompts: 24 }, objectiveCells },
    approvals: {
      objectiveApprovals: Array.from({ length: 288 }, (_, index) => ({ id: `o-${index}` })),
      writingApprovals: Array.from({ length: 24 }, (_, index) => ({ id: `w-${index}` })),
    },
    audioPublications: { publications: Array.from({ length: 36 }, (_, index) => ({
      mediaId: `m-${index}`, audioSha256: 'a'.repeat(64), transcriptSha256: 'b'.repeat(64),
      transcriptReviewerId: `transcript-${index}`, alignmentReviewerId: `alignment-${index}`, reviewedAt,
    })) },
    voiceCasting: { profiles: {} },
    pilotCriteria: {
      criteriaVersion: 'criteria-v1', status: 'approved',
      approval: { manifestSha256: governanceManifestSha256, snapshotSha256: 'pilot-snapshot' },
    },
    retentionPolicy: {
      policyVersion: 'retention-v1', status: 'approved',
      approval: { manifestSha256: governanceManifestSha256, snapshotSha256: 'retention-snapshot' },
    },
    deliveryPolicy: {
      policyVersion: 'english-diagnostic-delivery-policy-v1', status: 'approved',
      approval: {
        manifestSha256: governanceManifestSha256, snapshotSha256: 'delivery-snapshot',
        approvedAt: reviewedAt,
        approvedBy: ['academic-lead:academic-reviewer', 'product-owner:product-reviewer'],
        appliedBy: 'release-operator',
      },
    },
    releaseEvidence: {
      evidenceVersion: 'english-diagnostic-release-evidence-v1',
      updatedAt: reviewedAt,
      governanceApplication: { manifestSha256: governanceManifestSha256 },
      database: {
        appliedThroughMigration: 'latest.sql', authenticatedFlowVerified: true,
        verifiedAt: reviewedAt, verifiedBy: 'db-reviewer',
        liveVerification: {
          inspectionReceiptSha256: '1'.repeat(64), authenticatedFlowReceiptSha256: '2'.repeat(64),
          supabaseProject: 'project-ref', applicationHost: 'preview.example.test',
          sourceSha256: 'source-sha', bankSnapshotSha256: 'bank-sha', deployedCommit: commit,
          accessMode: 'pilot',
        },
      },
      writingOperations: {
        mode: 'human',
        governanceManifestSha256,
        workflowSnapshotSha256: 'writing-snapshot',
        humanReview: {
          approved: true, verifiedReviewerCount: 2, reviewerRosterSha256: '5'.repeat(64),
          slaHours: 48, verifiedAt: reviewedAt, verifiedBy: 'academic-lead',
        },
        externalProcessing: { consentCaptureVerified: false, verifiedAt: null, verifiedBy: null },
      },
      privacy: {
        retentionPolicyVersion: 'retention-v1', approvedAt: reviewedAt, approvedBy: 'privacy-reviewer',
        retentionSnapshotSha256: 'retention-snapshot', governanceManifestSha256,
        deletionFlowVerified: true, deletionReceiptSha256: '2'.repeat(64),
      },
      pilot: {
        reportPath: '.diagnostic-private/pilot.json', reportSha256: pilotReportSha256,
        captureReceiptPath: '.diagnostic-private/capture.json', captureReceiptSha256: pilotCaptureSha256,
        validationManifestPath: '.diagnostic-private/validation.json', validationManifestSha256: pilotValidationSha256,
        sourceSha256: 'source-sha', bankSnapshotSha256: 'bank-sha', validationDecision: 'approved',
        reviewedAt, reviewedBy: 'academic-lead:academic-reviewer,measurement-lead:measurement-reviewer',
        appliedAt: reviewedAt, appliedBy: 'release-operator',
      },
      quality: {
        diagnosticSuiteSourceSha256: 'source-sha', productionBuildSourceSha256: 'source-sha',
        browserE2ESourceSha256: 'source-sha', browserE2ETestCount: 4,
        verifiedCommit: commit, verifiedAt: reviewedAt, verifiedBy: 'qa-reviewer',
        receiptSha256: '3'.repeat(64),
      },
    },
    pilotReport: {
      reportVersion: 'diagnostic-pilot-report-v2',
      generatedAt: reviewedAt,
      criteria: { version: 'criteria-v1', status: 'approved' },
      decision: 'ELIGIBLE_FOR_VALIDATION_REVIEW',
      gates: { sample: true, quality: true },
      bankSnapshot: { sha256: 'bank-sha' },
    },
    pilotReportSha256,
    pilotCaptureReceipt: {
      receiptVersion: 'diagnostic-pilot-report-capture-v2',
      report: { sha256: pilotReportSha256, generatedAt: reviewedAt },
      target: {
        sourceSha256: 'source-sha', bankSnapshotSha256: 'bank-sha', accessMode: 'pilot',
        commitSha: commit, applicationHost: 'preview.example.test', supabaseProject: 'project-ref',
      },
      safeguards: {
        aggregateReportOnly: true, participantRowsIncluded: false, cookiesIncluded: false, answerKeysIncluded: false,
      },
    },
    pilotCaptureReceiptSha256: pilotCaptureSha256,
    pilotValidationManifest: { ...pilotValidationCore, manifestSha256: pilotValidationSha256 },
    pilotValidationManifestSha256: pilotValidationSha256,
    currentBankSha256: 'bank-sha',
    providerReadiness: { ready: false, provider: null, model: null, blockers: ['api-key-missing'] },
    expectedMigration: 'latest.sql', currentCommit: commit, currentSourceSha256: 'source-sha', workingTreeClean: true,
    governanceSnapshots: {
      'writing-operations': 'writing-snapshot',
      'retention-policy': 'retention-snapshot',
      'pilot-criteria': 'pilot-snapshot',
      'delivery-policy': 'delivery-snapshot',
    },
    activation: { engineEnabled: false, uiEnabled: false },
  };
}

test('the committed repository remains on HOLD with explicit independent blockers', () => {
  const fixture = readyFixture();
  fixture.bankReadiness = json('../docs/diagnostic-bank-readiness.json');
  fixture.approvals = json('../config/diagnostic/english-bank-approvals.json');
  fixture.audioPublications = json('../config/diagnostic/english-listening-audio-publications.json');
  fixture.voiceCasting = json('../config/diagnostic/english-listening-voice-casting.json');
  fixture.pilotCriteria = json('../config/diagnostic/pilot-publication-criteria.json');
  fixture.retentionPolicy = json('../config/diagnostic/data-retention-policy.json');
  fixture.deliveryPolicy = json('../config/diagnostic/delivery-policy.json');
  fixture.releaseEvidence = json('../config/diagnostic/release-evidence.json');
  fixture.pilotReport = null;
  fixture.pilotReportSha256 = null;
  fixture.workingTreeClean = true;
  const report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.decision, 'HOLD');
  assert.equal(report.releaseReady, false);
  assert.ok(report.summary.blockerCount >= 10);
  assert.deepEqual(report.gates.find(candidate => candidate.id === 'governance').blockers, [
    'DELIVERY_POLICY_NOT_APPROVED',
  ]);
  assert.ok(report.gates.every(candidate => candidate.status === 'HOLD'));
});

test('all independent evidence gates produce READY_TO_ENABLE before flags are switched on', () => {
  const report = buildDiagnosticReleaseReadiness(readyFixture());
  assert.equal(report.decision, 'READY_TO_ENABLE');
  assert.equal(report.releaseReady, true);
  assert.equal(report.summary.passedGates, report.summary.totalGates);
});

test('activation flags alone cannot override missing evidence', () => {
  const fixture = readyFixture();
  fixture.activation = { engineEnabled: true, uiEnabled: true };
  fixture.releaseEvidence.database.authenticatedFlowVerified = false;
  const report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.decision, 'HOLD');
  assert.equal(report.releaseReady, false);
  assert.equal(report.gates.find(candidate => candidate.id === 'database').status, 'HOLD');
});

test('a passing old pilot cannot release a changed bank', () => {
  const fixture = readyFixture();
  fixture.currentBankSha256 = 'changed-bank-sha';
  const report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.decision, 'HOLD');
  assert.deepEqual(report.gates.find(candidate => candidate.id === 'pilot').blockers, [
    'PILOT_BANK_SNAPSHOT_MISMATCH', 'PILOT_CAPTURE_NOT_BOUND', 'PILOT_VALIDATION_NOT_APPROVED',
  ]);
});

test('live verification follows the diagnostic source hash across an evidence-only commit', () => {
  const fixture = readyFixture();
  fixture.currentCommit = 'f'.repeat(40);
  const report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.gates.find(candidate => candidate.id === 'database').status, 'PASS');
});

test('the human writing path does not require provider credentials', () => {
  const report = buildDiagnosticReleaseReadiness(readyFixture());
  assert.equal(report.gates.find(candidate => candidate.id === 'writing-operations').status, 'PASS');
  assert.equal(report.safeguards.humanWritingPathCanReleaseWithoutExternalProvider, true);
  assert.doesNotMatch(JSON.stringify(report), /GEMINI_API_KEY|GROQ_API_KEY|Bearer\s|authorization/i);
  assert.equal(report.safeguards.secretsIncluded, false);
});

test('external writing mode requires both verified consent capture and provider readiness', () => {
  const fixture = readyFixture();
  fixture.releaseEvidence.writingOperations.mode = 'external';
  let report = buildDiagnosticReleaseReadiness(fixture);
  assert.deepEqual(report.gates.find(candidate => candidate.id === 'writing-operations').blockers, [
    'EXTERNAL_WRITING_CONSENT_FLOW_NOT_VERIFIED', 'EXTERNAL_WRITING_PROVIDER_NOT_READY',
  ]);
  fixture.releaseEvidence.writingOperations.externalProcessing = {
    consentCaptureVerified: true,
    verifiedAt: '2026-09-25T12:00:00.000Z',
    verifiedBy: 'privacy-reviewer',
  };
  fixture.providerReadiness = { ready: true, provider: 'groq', model: 'approved-model', blockers: [] };
  report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.gates.find(candidate => candidate.id === 'writing-operations').status, 'PASS');
});
