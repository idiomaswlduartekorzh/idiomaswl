import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  buildDiagnosticGovernanceReviewPackets,
  compileDiagnosticGovernanceReviews,
  validateDiagnosticGovernanceReceipt,
} from '../scripts/lib/diagnostic-governance-review.mjs';
import {
  diagnosticGovernanceSnapshots,
  diagnosticReviewableDocumentSha256,
} from '../scripts/lib/diagnostic-governance-snapshots.mjs';
import {
  recordDiagnosticGovernanceApprovals,
  validateDiagnosticGovernanceManifest,
} from '../scripts/lib/diagnostic-governance-record.mjs';

const snapshots = {
  'writing-operations': 'a'.repeat(64),
  'retention-policy': 'b'.repeat(64),
  'pilot-criteria': 'c'.repeat(64),
};
const reviewedAt = '2026-09-25T12:00:00.000Z';

function completedPackets() {
  return buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt: reviewedAt })
    .map((packet, index) => ({
      ...packet,
      reviewerId: `reviewer-${index + 1}`,
      decision: 'APPROVE',
      reviewedAt,
      attestation: true,
      details: packet.topic === 'writing-operations' ? {
        selectedMode: 'human',
        verifiedReviewerReferences: ['writing-reviewer-a', 'writing-reviewer-b'],
        slaHours: 48,
        externalConsentCaptureReference: null,
        externalProviderReviewReference: null,
      } : null,
    }));
}

test('scaffold creates five independent fail-closed review packets without preselected decisions', () => {
  const packets = buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt: reviewedAt });
  assert.equal(packets.length, 5);
  assert.ok(packets.every(packet => packet.decision === null && packet.reviewerId === null));
  assert.deepEqual(packets.map(packet => `${packet.topic}:${packet.role}`), [
    'writing-operations:academic-lead',
    'writing-operations:operations-lead',
    'retention-policy:privacy-lead',
    'pilot-criteria:academic-lead',
    'pilot-criteria:measurement-lead',
  ]);
});

test('governance compilation requires exact snapshots, independent roles and one writing model', () => {
  const manifest = compileDiagnosticGovernanceReviews({ receipts: completedPackets(), snapshots });
  assert.equal(manifest.decision, 'APPROVED');
  assert.equal(manifest.safeguards.reviewerIdentityCount, 5);
  assert.equal(manifest.topics['writing-operations'].reviews[0].details.selectedMode, 'human');

  const duplicated = completedPackets();
  duplicated[1].reviewerId = duplicated[0].reviewerId;
  assert.throws(() => compileDiagnosticGovernanceReviews({ receipts: duplicated, snapshots }), /independent identities/);

  const disagreement = completedPackets();
  disagreement[1].details = { ...disagreement[1].details, slaHours: 24 };
  assert.throws(() => compileDiagnosticGovernanceReviews({ receipts: disagreement, snapshots }), /same operating model/);
});

test('changed snapshots and incomplete operational evidence cannot be approved', () => {
  const [writing] = completedPackets();
  assert.throws(() => validateDiagnosticGovernanceReceipt(writing, 'd'.repeat(64)), /another snapshot/);
  assert.throws(() => validateDiagnosticGovernanceReceipt({
    ...writing,
    details: { ...writing.details, verifiedReviewerReferences: ['only-one'] },
  }, snapshots['writing-operations']), /two verified reviewers/);
});

test('executable compiler recomputes current snapshots and keeps every artifact private', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const current = diagnosticGovernanceSnapshots(root);
  assert.deepEqual(Object.keys(current), ['writing-operations', 'retention-policy', 'pilot-criteria']);
  assert.ok(Object.values(current).every(value => /^[a-f0-9]{64}$/u.test(value)));
  const compiler = readFileSync(new URL('../scripts/compile-diagnostic-governance-review.mjs', import.meta.url), 'utf8');
  assert.match(compiler, /assertPrivate\(inputRoot/);
  assert.match(compiler, /assertPrivate\(outputPath/);
  assert.match(compiler, /manifestSha256/);
  assert.match(compiler, /receiptCount/);
});

function approvedManifestFixture() {
  const receipts = completedPackets();
  const compiled = compileDiagnosticGovernanceReviews({ receipts, snapshots });
  const references = receipts.map((receipt, index) => {
    const file = `receipt-${index + 1}.json`;
    const bytes = Buffer.from(JSON.stringify(receipt));
    return { packetId: receipt.packetId, file, sha256: createHash('sha256').update(bytes).digest('hex') };
  });
  const core = { ...compiled, compiledAt: reviewedAt, receipts: references };
  const manifestSha256 = createHash('sha256').update(JSON.stringify(core)).digest('hex');
  const receiptFiles = new Map(receipts.map((receipt, index) => {
    const reference = references[index];
    return [reference.file, { sha256: reference.sha256, receipt }];
  }));
  return { manifest: { ...core, manifestSha256 }, manifestSha256, receiptFiles };
}

test('approved manifest can record only the reviewed human-writing, retention and pilot decisions', () => {
  const fixture = approvedManifestFixture();
  const validated = validateDiagnosticGovernanceManifest({ ...fixture, snapshots });
  const result = recordDiagnosticGovernanceApprovals({
    currentEvidence: {
      evidenceVersion: 'english-diagnostic-release-evidence-v1', updatedAt: null,
      writingOperations: {
        mode: null,
        humanReview: { approved: false },
        externalProcessing: { consentCaptureVerified: false, verifiedAt: null, verifiedBy: null },
      },
      privacy: { deletionFlowVerified: false },
      database: { authenticatedFlowVerified: false }, pilot: {}, quality: {},
    },
    retentionPolicy: { policyVersion: 'english-diagnostic-retention-proposal-v1', status: 'proposal-pending-privacy-approval' },
    pilotCriteria: { criteriaVersion: 'english-diagnostic-pilot-criteria-v2', status: 'provisional-pending-academic-approval' },
    validated,
    recordedAt: reviewedAt,
    appliedBy: 'release-operator',
  });
  assert.equal(result.nextEvidence.writingOperations.mode, 'human');
  assert.equal(result.nextEvidence.writingOperations.humanReview.verifiedReviewerCount, 2);
  assert.equal(result.nextEvidence.privacy.deletionFlowVerified, false);
  assert.equal(result.nextRetentionPolicy.status, 'approved');
  assert.equal(result.nextPilotCriteria.status, 'approved');
  assert.equal(result.nextPilotCriteria.approval.manifestSha256, fixture.manifestSha256);
});

test('governance recorder rejects a changed manifest or source receipt', () => {
  const fixture = approvedManifestFixture();
  assert.throws(() => validateDiagnosticGovernanceManifest({
    ...fixture,
    manifest: { ...fixture.manifest, compiledAt: '2026-09-25T12:01:00.000Z' },
    snapshots,
  }), /changed or not approved/);
  const changedReceipts = new Map(fixture.receiptFiles);
  const [firstKey, first] = changedReceipts.entries().next().value;
  changedReceipts.set(firstKey, { ...first, sha256: 'f'.repeat(64) });
  assert.throws(() => validateDiagnosticGovernanceManifest({
    ...fixture, receiptFiles: changedReceipts, snapshots,
  }), /does not match/);
});

test('approval metadata does not invalidate a reviewed policy but threshold edits do', () => {
  const proposal = { policyVersion: 'v1', status: 'proposal', rules: [{ days: 90 }] };
  const approved = {
    ...proposal,
    status: 'approved',
    approval: { manifestSha256: 'a'.repeat(64), approvedAt: reviewedAt },
  };
  assert.equal(diagnosticReviewableDocumentSha256(proposal), diagnosticReviewableDocumentSha256(approved));
  assert.notEqual(
    diagnosticReviewableDocumentSha256(proposal),
    diagnosticReviewableDocumentSha256({ ...approved, rules: [{ days: 91 }] }),
  );
});
