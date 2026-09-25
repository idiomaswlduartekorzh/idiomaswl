import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  buildDiagnosticGovernanceReviewPackets,
  compileDiagnosticGovernanceReviews,
  validateDiagnosticGovernanceReceipt,
} from '../scripts/lib/diagnostic-governance-review.mjs';
import { diagnosticGovernanceSnapshots } from '../scripts/lib/diagnostic-governance-snapshots.mjs';

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
