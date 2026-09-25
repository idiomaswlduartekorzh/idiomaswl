import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  buildDiagnosticGovernanceReviewPackets,
  compileDiagnosticGovernanceReviews,
  diagnosticGovernanceReviewProgress,
  validateDiagnosticGovernanceReceipt,
} from '../scripts/lib/diagnostic-governance-review.mjs';
import {
  DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS,
  DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS,
  DIAGNOSTIC_WRITING_GOVERNANCE_PATHS,
  diagnosticDeliveryGovernanceSnapshot,
  diagnosticGovernanceSnapshots,
  diagnosticPilotCriteriaGovernanceSnapshot,
  diagnosticReviewableDocumentSha256,
  diagnosticWritingGovernanceSnapshot,
} from '../scripts/lib/diagnostic-governance-snapshots.mjs';
import {
  recordDiagnosticGovernanceApprovals,
  validateDiagnosticGovernanceManifest,
} from '../scripts/lib/diagnostic-governance-record.mjs';

const snapshots = {
  'writing-operations': 'a'.repeat(64),
  'retention-policy': 'b'.repeat(64),
  'pilot-criteria': 'c'.repeat(64),
  'delivery-policy': 'd'.repeat(64),
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
      } : packet.topic === 'delivery-policy'
        ? Object.fromEntries(Object.keys(packet.details).map(check => [check, true]))
        : null,
    }));
}

test('scaffold creates seven independent fail-closed review packets without preselected decisions', () => {
  const packets = buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt: reviewedAt });
  assert.equal(packets.length, 7);
  assert.ok(packets.every(packet => packet.decision === null && packet.reviewerId === null));
  assert.ok(packets.every(packet => packet.evidencePaths.every(path => !path.startsWith('.diagnostic-private/'))));
  assert.deepEqual(packets.map(packet => `${packet.topic}:${packet.role}`), [
    'writing-operations:academic-lead',
    'writing-operations:operations-lead',
    'retention-policy:privacy-lead',
    'pilot-criteria:academic-lead',
    'pilot-criteria:measurement-lead',
    'delivery-policy:academic-lead',
    'delivery-policy:product-owner',
  ]);
  assert.ok(packets.filter(packet => packet.topic === 'pilot-criteria')
    .every(packet => JSON.stringify(packet.evidencePaths)
      === JSON.stringify(DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS)));
  assert.ok(packets.filter(packet => packet.topic === 'writing-operations')
    .every(packet => JSON.stringify(packet.evidencePaths)
      === JSON.stringify([...DIAGNOSTIC_WRITING_GOVERNANCE_PATHS, 'config/diagnostic/release-evidence.json'])));
});

test('governance progress is aggregate-only and ready only with seven valid approvals', () => {
  const templates = buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt: reviewedAt });
  const pending = diagnosticGovernanceReviewProgress({ receipts: templates, snapshots });
  assert.equal(pending.decision, 'INCOMPLETE');
  assert.deepEqual(pending.counts, {
    approved: 0, pending: 7, 'changes-requested': 0, missing: 0, invalid: 0,
  });
  assert.equal(JSON.stringify(pending).includes('reviewerId'), false);
  assert.equal(JSON.stringify(pending).includes('comments'), false);

  const ready = diagnosticGovernanceReviewProgress({ receipts: completedPackets(), snapshots });
  assert.equal(ready.decision, 'READY_FOR_COMPILATION');
  assert.equal(ready.counts.approved, 7);

  const changed = completedPackets();
  changed[5] = { ...changed[5], details: { ...changed[5].details, proposedValuesAccepted: false } };
  const rejected = diagnosticGovernanceReviewProgress({
    receipts: [...changed, { ...changed[0], packetId: 'unexpected' }], snapshots,
  });
  assert.equal(rejected.decision, 'INCOMPLETE');
  assert.equal(rejected.counts.invalid, 2);
});

test('delivery reviewers must inspect their exact evidence paths and complete every role-specific check', () => {
  const packets = completedPackets();
  const academic = packets.find(packet => packet.topic === 'delivery-policy' && packet.role === 'academic-lead');
  const product = packets.find(packet => packet.topic === 'delivery-policy' && packet.role === 'product-owner');
  assert.deepEqual(Object.keys(academic.details), [
    'pilotRetestDesignReviewed',
    'productionCooldownReviewed',
    'exposureWindowAndBankCapacityReviewed',
    'validityIsNonCertificationReviewed',
    'itemDriftSignalReviewed',
    'proposedValuesAccepted',
  ]);
  assert.deepEqual(Object.keys(product.details), [
    'activeAttemptUxReviewed',
    'cooldownAndEligibilityUxReviewed',
    'supportAndNoOverrideRuleReviewed',
    'resultExpiryCommunicationReviewed',
    'controlledRolloutAndDrainRollbackReviewed',
    'itemDriftResponseRunbookReviewed',
    'proposedValuesAccepted',
  ]);
  assert.throws(() => validateDiagnosticGovernanceReceipt({
    ...academic,
    details: { ...academic.details, exposureWindowAndBankCapacityReviewed: false },
  }, snapshots['delivery-policy']), /every academic-lead check/);
  assert.throws(() => validateDiagnosticGovernanceReceipt({
    ...product,
    evidencePaths: [...product.evidencePaths, 'unreviewed-extra.md'],
  }, snapshots['delivery-policy']), /another snapshot/);
});

test('governance compilation requires exact snapshots, independent roles and one writing model', () => {
  const manifest = compileDiagnosticGovernanceReviews({ receipts: completedPackets(), snapshots });
  assert.equal(manifest.decision, 'APPROVED');
  assert.equal(manifest.safeguards.reviewerIdentityCount, 7);
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
  assert.deepEqual(Object.keys(current), ['writing-operations', 'retention-policy', 'pilot-criteria', 'delivery-policy']);
  assert.equal(DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS.length, 37);
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

test('approved manifest records only reviewed writing, retention, pilot and delivery decisions', () => {
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
    deliveryPolicy: {
      policyVersion: 'english-diagnostic-delivery-policy-v1',
      status: 'provisional-pending-academic-and-product-approval', approval: null,
    },
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
  assert.equal(result.nextDeliveryPolicy.status, 'approved');
  assert.deepEqual(result.nextDeliveryPolicy.approval.approvedBy, [
    'academic-lead:reviewer-6', 'product-owner:reviewer-7',
  ]);
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

test('delivery governance snapshot binds enforcement and UI, not only proposed numbers', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'diagnostic-delivery-governance-'));
  try {
    for (const path of DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS) {
      const destination = join(temporaryRoot, path);
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(join(root, path), destination);
    }
    const before = diagnosticDeliveryGovernanceSnapshot(temporaryRoot);
    const rollout = join(temporaryRoot, 'src/server/diagnostic/production-rollout.ts');
    const rolloutSource = readFileSync(rollout, 'utf8');
    writeFileSync(rollout, rolloutSource.replace('* 10_000', '* 9_999'));
    assert.notEqual(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    writeFileSync(rollout, rolloutSource);
    assert.equal(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    const controls = join(temporaryRoot, 'src/server/diagnostic/bank/controls.ts');
    writeFileSync(controls, readFileSync(controls, 'utf8').replace("'psychometric-anomaly'", "'unreviewed-auto-retirement'"));
    assert.notEqual(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    copyFileSync(join(root, 'src/server/diagnostic/bank/controls.ts'), controls);
    assert.equal(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    const interpretationGuide = join(temporaryRoot, 'docs/diagnostic-interpretation-guide.md');
    writeFileSync(interpretationGuide, readFileSync(interpretationGuide, 'utf8').replace(
      'no porcentaje de dominio', 'porcentaje exacto de dominio',
    ));
    assert.notEqual(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    copyFileSync(join(root, 'docs/diagnostic-interpretation-guide.md'), interpretationGuide);
    assert.equal(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
    const migration = join(temporaryRoot, 'supabase/migrations/20260925050000_diagnostic_delivery_policy.sql');
    writeFileSync(migration, readFileSync(migration, 'utf8').replace('between 1 and 730', 'between 2 and 730'));
    assert.notEqual(diagnosticDeliveryGovernanceSnapshot(temporaryRoot), before);
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('writing governance snapshot binds rubric, review UI, server enforcement and runbook', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'diagnostic-writing-governance-'));
  try {
    for (const path of DIAGNOSTIC_WRITING_GOVERNANCE_PATHS) {
      const destination = join(temporaryRoot, path);
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(join(root, path), destination);
    }
    const before = diagnosticWritingGovernanceSnapshot(temporaryRoot);
    const client = join(temporaryRoot, 'src/app/(site)/dashboard/admin/nivel-radar/DiagnosticWritingReviewClient.tsx');
    writeFileSync(client, readFileSync(client, 'utf8').replace('Esto no prueba plagio.', 'Coincidencia confirmada.'));
    assert.notEqual(diagnosticWritingGovernanceSnapshot(temporaryRoot), before);
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('pilot criteria governance binds recruitment assumptions, calculation and report', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  assert.equal(DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS.length, 6);
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'diagnostic-pilot-governance-'));
  try {
    for (const path of DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS) {
      const destination = join(temporaryRoot, path);
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(join(root, path), destination);
    }
    const before = diagnosticPilotCriteriaGovernanceSnapshot(temporaryRoot);
    const plan = join(temporaryRoot, 'docs/diagnostic-pilot-recruitment-plan.json');
    writeFileSync(plan, readFileSync(plan, 'utf8').replace('4348', '4349'));
    assert.notEqual(diagnosticPilotCriteriaGovernanceSnapshot(temporaryRoot), before);
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
