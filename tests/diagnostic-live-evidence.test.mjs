import assert from 'node:assert/strict';
import test from 'node:test';

import {
  recordDiagnosticLiveEvidence,
  validateDiagnosticLiveEvidence,
} from '../scripts/lib/diagnostic-live-evidence.mjs';

const recordedAt = '2026-09-25T12:00:00.000Z';
const sourceSha256 = 'a'.repeat(64);
const bankSnapshotSha256 = 'b'.repeat(64);
const commitSha = 'c'.repeat(40);
const inspectionReceiptSha256 = 'd'.repeat(64);
const authenticatedFlowReceiptSha256 = 'e'.repeat(64);

function receipts() {
  return {
    inspectionReceipt: {
      receiptVersion: 'diagnostic-supabase-inspection-v1', decision: 'PASS',
      generatedAt: '2026-09-25T11:00:00.000Z', target: { project: 'project-ref' },
      expectedMigration: 'latest.sql',
      groups: {
        serviceSchema: true, publicTableIsolation: true, serviceFunctions: true,
        publicFunctionIsolation: true, privateStorage: true, authenticatedBoundary: true,
      },
      claims: {
        schemaContractVerified: true, browserDirectAccessDenied: true, privateStorageVerified: true,
        authenticatedApplicationFlowVerified: false, destructiveWritesPerformed: false,
        participantDataIncluded: false, secretsIncluded: false,
      },
    },
    authenticatedFlowReceipt: {
      receiptVersion: 'diagnostic-authenticated-flow-v1', decision: 'PASS',
      startedAt: '2026-09-25T11:05:00.000Z', completedAt: '2026-09-25T11:15:00.000Z',
      accessMode: 'pilot', failure: null,
      target: { applicationHost: 'preview.example.test', supabaseProject: 'project-ref' },
      releaseBinding: {
        bindingVersion: 'diagnostic-live-release-binding-v1', accessMode: 'pilot',
        sourceSha256, bankSnapshotSha256, commitSha, releaseId: null,
      },
      checks: {
        releaseBinding: true, enrollment: true, start: true, resume: true, privateAudio: true,
        objectiveStages: 2, writing: true, humanFinalization: true, fiveSkillResult: true,
        deletion: true, postDeletionNotFound: true,
      },
      safeguards: {
        dedicatedFixtureConfirmed: true, answerKeysUsed: false, participantContentIncluded: false,
        cookiesIncluded: false, cleanupAttempted: true,
      },
    },
  };
}

function validate(overrides = {}) {
  return validateDiagnosticLiveEvidence({
    ...receipts(), inspectionReceiptSha256, authenticatedFlowReceiptSha256,
    expectedMigration: 'latest.sql', expectedSourceSha256: sourceSha256,
    expectedBankSnapshotSha256: bankSnapshotSha256, expectedCommitSha: commitSha,
    recordedAt, ...overrides,
  });
}

test('two fresh PASS receipts bind database and deletion evidence to one exact release', () => {
  const result = validate();
  assert.equal(result.authenticatedFlowVerified, true);
  assert.equal(result.deletionFlowVerified, true);
  assert.deepEqual(result.liveVerification, {
    inspectionReceiptSha256,
    authenticatedFlowReceiptSha256,
    supabaseProject: 'project-ref',
    applicationHost: 'preview.example.test',
    sourceSha256,
    bankSnapshotSha256,
    deployedCommit: commitSha,
    accessMode: 'pilot',
  });
});

test('receipts from different projects or stale runs are rejected', () => {
  const differentProject = receipts();
  differentProject.authenticatedFlowReceipt.target.supabaseProject = 'other-project';
  assert.throws(() => validate(differentProject), /same expected deployment and Supabase project/);

  const stale = receipts();
  stale.inspectionReceipt.generatedAt = '2026-09-20T11:00:00.000Z';
  assert.throws(() => validate(stale), /outside the 24-hour evidence window/);
});

test('recording live evidence preserves human decisions and never approves retention', () => {
  const currentEvidence = {
    evidenceVersion: 'english-diagnostic-release-evidence-v1', updatedAt: null,
    database: { appliedThroughMigration: null, verifiedAt: null, verifiedBy: null, authenticatedFlowVerified: false },
    writingOperations: { mode: null },
    privacy: {
      retentionPolicyVersion: null, approvedAt: null, approvedBy: null,
      deletionFlowVerified: false, deletionReceiptSha256: null,
    },
    pilot: { validationDecision: null }, quality: { verifiedCommit: null },
  };
  const result = recordDiagnosticLiveEvidence({
    currentEvidence, validated: validate(), recordedAt, attestedBy: 'release.operator',
  });
  assert.equal(result.database.verifiedBy, 'release.operator');
  assert.equal(result.database.liveVerification.sourceSha256, sourceSha256);
  assert.equal(result.privacy.deletionFlowVerified, true);
  assert.equal(result.privacy.retentionPolicyVersion, null);
  assert.equal(result.privacy.approvedBy, null);
  assert.equal(result.writingOperations.mode, null);
  assert.equal(result.pilot.validationDecision, null);
});
