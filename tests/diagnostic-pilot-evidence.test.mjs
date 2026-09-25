import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  buildDiagnosticPilotValidationPackets,
  compileDiagnosticPilotValidation,
  recordDiagnosticPilotValidation,
  validateDiagnosticPilotCapture,
  validateDiagnosticPilotCaptureReceipt,
  validateDiagnosticPilotValidationManifest,
} from '../scripts/lib/diagnostic-pilot-evidence.mjs';

const sourceSha256 = 'a'.repeat(64);
const bankSnapshotSha256 = 'b'.repeat(64);
const commitSha = 'c'.repeat(40);
const reportSha256 = 'd'.repeat(64);
const capturedAt = '2026-09-25T14:05:00.000Z';
const report = {
  reportVersion: 'diagnostic-pilot-report-v1',
  generatedAt: '2026-09-25T14:04:00.000Z',
  criteria: { version: 'criteria-v1', status: 'approved' },
  bankSnapshot: { sha256: bankSnapshotSha256 },
  decision: 'ELIGIBLE_FOR_VALIDATION_REVIEW',
  gates: {
    criteriaApproved: true, attemptVolume: true, completion: true, itemSamples: true,
    itemQuality: true, writingAgreement: true, independentReference: true,
  },
  itemMetrics: [],
};
const binding = {
  bindingVersion: 'diagnostic-live-release-binding-v1', ready: true, accessMode: 'pilot',
  sourceSha256, bankSnapshotSha256, commitSha, supabaseProject: 'fixture-project',
};

function captureReceipt() {
  return validateDiagnosticPilotCapture({
    report, binding, capturedAt, since: '2026-08-01T00:00:00.000Z',
    reportFile: 'pilot-report.json', reportSha256, applicationUrl: 'https://preview.example.test',
    expectedSourceSha256: sourceSha256, expectedBankSnapshotSha256: bankSnapshotSha256,
    expectedCommitSha: commitSha,
  });
}

function approvedReviews(receipt, receiptSha256) {
  return buildDiagnosticPilotValidationPackets({
    captureReceipt: receipt, captureReceiptSha256: receiptSha256, generatedAt: capturedAt,
  }).map((packet, index) => ({
    ...packet,
    reviewerId: index === 0 ? 'academic-reviewer' : 'measurement-reviewer',
    decision: 'APPROVE',
    reviewedAt: `2026-09-25T15:0${index}:00.000Z`,
    attestation: true,
    checks: Object.fromEntries(Object.keys(packet.checks).map(key => [key, true])),
  }));
}

test('pilot capture binds an aggregate report to the exact live release without participant data', () => {
  const receipt = captureReceipt();
  assert.equal(receipt.target.sourceSha256, sourceSha256);
  assert.equal(receipt.target.bankSnapshotSha256, bankSnapshotSha256);
  assert.equal(receipt.report.sha256, reportSha256);
  assert.equal(receipt.safeguards.participantRowsIncluded, false);
  assert.equal(receipt.safeguards.cookiesIncluded, false);
  assert.doesNotMatch(JSON.stringify(receipt), /session=|authorization/i);
});

test('pilot capture rejects participant rows and mismatched deployments', () => {
  assert.throws(() => validateDiagnosticPilotCapture({
    report: { ...report, participant: { userId: 'private-user' } }, binding, capturedAt,
    since: '2026-08-01T00:00:00.000Z', reportFile: 'pilot-report.json', reportSha256,
    applicationUrl: 'https://preview.example.test', expectedSourceSha256: sourceSha256,
    expectedBankSnapshotSha256: bankSnapshotSha256, expectedCommitSha: commitSha,
  }), /forbidden participant field/);
  assert.throws(() => validateDiagnosticPilotCapture({
    report, binding: { ...binding, sourceSha256: 'e'.repeat(64) }, capturedAt,
    since: '2026-08-01T00:00:00.000Z', reportFile: 'pilot-report.json', reportSha256,
    applicationUrl: 'https://preview.example.test', expectedSourceSha256: sourceSha256,
    expectedBankSnapshotSha256: bankSnapshotSha256, expectedCommitSha: commitSha,
  }), /does not match/);
});

test('pilot validation requires two independent approvals of the exact captured report', () => {
  const receipt = captureReceipt();
  const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
  const receiptSha256 = createHash('sha256').update(receiptBytes).digest('hex');
  validateDiagnosticPilotCaptureReceipt({
    receipt, receiptSha256, report, reportSha256, reportFile: 'pilot-report.json',
    expectedSourceSha256: sourceSha256, expectedBankSnapshotSha256: bankSnapshotSha256,
  });
  const reviews = approvedReviews(receipt, receiptSha256);
  const compiled = compileDiagnosticPilotValidation({ reviews, captureReceipt: receipt, captureReceiptSha256: receiptSha256 });
  assert.equal(compiled.decision, 'APPROVED');
  assert.equal(new Set(compiled.reviews.map(review => review.reviewerId)).size, 2);
  assert.throws(() => compileDiagnosticPilotValidation({
    reviews: reviews.map(review => ({ ...review, reviewerId: 'same-reviewer' })),
    captureReceipt: receipt, captureReceiptSha256: receiptSha256,
  }), /independent reviewer identities/);
});

test('approved pilot manifest records only after source receipts are re-hashed', () => {
  const receipt = captureReceipt();
  const receiptSha256 = 'e'.repeat(64);
  const reviews = approvedReviews(receipt, receiptSha256);
  const reviewFiles = new Map(reviews.map(review => {
    const file = `${review.role}.json`;
    const bytes = Buffer.from(`${JSON.stringify(review, null, 2)}\n`);
    return [file, { review, sha256: createHash('sha256').update(bytes).digest('hex') }];
  }));
  const compiled = compileDiagnosticPilotValidation({ reviews, captureReceipt: receipt, captureReceiptSha256: receiptSha256 });
  const core = {
    ...compiled,
    compiledAt: '2026-09-25T16:00:00.000Z',
    receipts: reviews.map(review => ({
      packetId: review.packetId,
      file: `${review.role}.json`,
      sha256: reviewFiles.get(`${review.role}.json`).sha256,
    })),
  };
  const manifestSha256 = createHash('sha256').update(JSON.stringify(core)).digest('hex');
  const validated = validateDiagnosticPilotValidationManifest({
    manifest: { ...core, manifestSha256 }, manifestSha256, reviewFiles,
    captureReceipt: receipt, captureReceiptSha256: receiptSha256,
  });
  const next = recordDiagnosticPilotValidation({
    currentEvidence: { evidenceVersion: 'english-diagnostic-release-evidence-v1', pilot: {} },
    validated,
    paths: {
      reportPath: '.diagnostic-private/pilot/pilot-report.json',
      captureReceiptPath: '.diagnostic-private/pilot/capture-receipt.json',
      validationManifestPath: '.diagnostic-private/pilot/validation/manifest.json',
    },
    recordedAt: '2026-09-25T16:05:00.000Z',
    appliedBy: 'release-operator',
  });
  assert.equal(next.pilot.validationDecision, 'approved');
  assert.equal(next.pilot.validationManifestSha256, manifestSha256);
  assert.equal(next.pilot.reviewedBy, 'academic-lead:academic-reviewer,measurement-lead:measurement-reviewer');
});

test('a HOLD pilot cannot be scaffolded for validation approval', () => {
  const receipt = { ...captureReceipt(), report: { ...captureReceipt().report, decision: 'HOLD' } };
  assert.throws(() => buildDiagnosticPilotValidationPackets({
    captureReceipt: receipt, captureReceiptSha256: 'f'.repeat(64), generatedAt: capturedAt,
  }), /eligible captured pilot/);
});
