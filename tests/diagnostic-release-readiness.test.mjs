import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { buildDiagnosticReleaseReadiness } from '../scripts/lib/diagnostic-release-readiness.mjs';

const json = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

function readyFixture() {
  const reviewedAt = '2026-09-25T12:00:00.000Z';
  const commit = 'a'.repeat(40);
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
    pilotCriteria: { criteriaVersion: 'criteria-v1', status: 'approved' },
    retentionPolicy: { policyVersion: 'retention-v1', status: 'approved' },
    releaseEvidence: {
      evidenceVersion: 'english-diagnostic-release-evidence-v1',
      updatedAt: reviewedAt,
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
        humanReview: { approved: true, verifiedReviewerCount: 2, slaHours: 48, verifiedAt: reviewedAt, verifiedBy: 'academic-lead' },
        externalProcessing: { consentCaptureVerified: false, verifiedAt: null, verifiedBy: null },
      },
      privacy: {
        retentionPolicyVersion: 'retention-v1', approvedAt: reviewedAt, approvedBy: 'privacy-reviewer',
        deletionFlowVerified: true, deletionReceiptSha256: '2'.repeat(64),
      },
      pilot: { reportPath: 'pilot.json', reportSha256: 'pilot-sha', validationDecision: 'approved', reviewedAt, reviewedBy: 'measurement-reviewer' },
      quality: {
        diagnosticSuiteSourceSha256: 'source-sha', productionBuildSourceSha256: 'source-sha',
        verifiedCommit: commit, verifiedAt: reviewedAt, verifiedBy: 'qa-reviewer',
      },
    },
    pilotReport: {
      reportVersion: 'diagnostic-pilot-report-v1',
      criteria: { version: 'criteria-v1', status: 'approved' },
      decision: 'ELIGIBLE_FOR_VALIDATION_REVIEW',
      gates: { sample: true, quality: true },
      bankSnapshot: { sha256: 'bank-sha' },
    },
    pilotReportSha256: 'pilot-sha',
    currentBankSha256: 'bank-sha',
    providerReadiness: { ready: false, provider: null, model: null, blockers: ['api-key-missing'] },
    expectedMigration: 'latest.sql', currentCommit: commit, currentSourceSha256: 'source-sha', workingTreeClean: true,
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
  fixture.releaseEvidence = json('../config/diagnostic/release-evidence.json');
  fixture.pilotReport = null;
  fixture.pilotReportSha256 = null;
  fixture.workingTreeClean = true;
  const report = buildDiagnosticReleaseReadiness(fixture);
  assert.equal(report.decision, 'HOLD');
  assert.equal(report.releaseReady, false);
  assert.ok(report.summary.blockerCount >= 10);
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
    'PILOT_BANK_SNAPSHOT_MISMATCH',
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
