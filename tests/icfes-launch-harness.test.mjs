import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  calculateCandidateDigest,
  deriveCandidateState,
  inventory,
  loadHarness,
  validateApproval,
  validateHarness,
  validateReviewReport,
} from '../scripts/lib/icfes-launch-harness-core.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harness = loadHarness(repoRoot);
const candidate = harness.candidateLedger.candidates[0];
const workOrder = harness.workOrders[0];

test('initial harness is structurally valid but truthfully not release-ready', () => {
  assert.deepEqual(validateHarness(harness), []);
  const result = inventory(harness);
  assert.equal(result.candidates[0].state, 'BLOCKED_PRIVACY');
  assert.equal(result.candidates[0].releaseReady, false);
  assert.equal(result.releases, 0);
  assert.deepEqual(result.candidates[0].gates, {
    editorial: 'PASS', seo: 'PASS', pricing: 'PASS', security: 'PASS', privacy: 'BLOCKED',
    payments: 'BLOCKED', 'teacher-ops': 'BLOCKED', release: 'BLOCKED',
  });
});

test('mock identity policy permits expansion beyond mock-23 without catalog promotion', () => {
  const pattern = new RegExp(harness.policy.mockExpansion.idPattern);
  assert.equal(pattern.test('mock-24'), true);
  assert.equal(pattern.test('mock-100'), true);
  assert.ok(harness.campaign.expansionQueue.some(({ mockId, catalogEligible }) => mockId === 'mock-24' && catalogEligible === false));
});

test('commercial ladder fixes price, duration, finite human quota and only the implemented membership upgrade', () => {
  const tiers = new Map(harness.policy.commercialModel.tiers.map((tier) => [tier.sku, tier]));
  assert.deepEqual([tiers.get('icfes-detail-attempt-v1').priceCop, tiers.get('exam-auto').priceCop, tiers.get('exam-teacher').priceCop], [12000, 49000, 99000]);
  assert.equal(tiers.get('exam-auto').durationDays, 30);
  assert.equal(tiers.get('exam-auto').examSlug, 'icfes');
  assert.equal(tiers.get('exam-teacher').durationDays, 30);
  assert.equal(tiers.get('exam-teacher').examSlug, 'icfes');
  assert.equal(tiers.get('exam-teacher').humanReviewCredits, 1);
  assert.equal(tiers.get('exam-teacher').humanReviewSlaHours, 12);
  assert.deepEqual(harness.policy.commercialModel.upgradeCredits.map(({ payableCop }) => payableCop), [50000]);
});

test('artifact drift invalidates a candidate instead of accepting a stale review', () => {
  const changed = structuredClone(harness);
  changed.candidateLedger.candidates[0].subjectArtifacts[0].sha256 = 'a'.repeat(64);
  changed.candidateLedger.candidates[0].candidateDigest = calculateCandidateDigest(changed.candidateLedger.candidates[0]);
  assert.ok(validateHarness(changed).some((failure) => failure.includes('subject digest obsoleto')));
});

function report(role, actorId) {
  return {
    schemaVersion: 1,
    reportId: `${role}-report`,
    workOrderId: workOrder.workOrderId,
    workOrderDigest: workOrder.workOrderDigest,
    candidateId: candidate.candidateId,
    candidateDigest: candidate.candidateDigest,
    role,
    actor: { actorId, actorType: 'agent', modelOrCredential: 'test-agent' },
    verdict: 'PASS',
    generatedAt: '2026-09-09T01:00:00-05:00',
    checks: [{ id: 'complete', status: 'PASS' }],
    findings: [],
  };
}

test('author, specialist, adversary and release roles cannot collapse into one actor', () => {
  const author = report('author', 'same-actor');
  assert.deepEqual(validateReviewReport(author, { candidate, policy: harness.policy, workOrder, priorReports: [] }), []);
  const reviewer = report('english-reviewer', 'same-actor');
  assert.ok(validateReviewReport(reviewer, { candidate, policy: harness.policy, workOrder, priorReports: [author] }).some((failure) => failure.includes('no puede cubrir')));
});

test('approvals must be human and bound to current work-order and candidate hashes', () => {
  const fake = {
    approvalId: 'fake', workOrderId: workOrder.workOrderId, workOrderDigest: workOrder.workOrderDigest,
    candidateId: candidate.candidateId, candidateDigest: 'b'.repeat(64), role: 'product-owner',
    actor: { actorId: 'agent-1', actorType: 'agent', credential: 'none' }, decision: 'APPROVE',
    approvedAt: '2026-09-09T01:00:00-05:00', evidence: 'Automated output only.',
  };
  const failures = validateApproval(fake, { candidate, policy: harness.policy, workOrder });
  assert.ok(failures.includes('approval: candidateDigest obsoleto'));
  assert.ok(failures.includes('approval: solo una persona puede aprobar'));
});

test('a release-manifest entry cannot override calculated blocked state', () => {
  const changed = structuredClone(harness);
  changed.releaseManifest.releases.push({
    releaseId: 'forged-release', candidateId: candidate.candidateId, candidateDigest: candidate.candidateDigest,
    workOrderId: workOrder.workOrderId, workOrderDigest: workOrder.workOrderDigest,
    approvalIds: ['1', '2', '3', '4', '5', '6', '7'], releasedAt: '2026-09-09T02:00:00-05:00', releaseWardenActorId: 'warden',
  });
  assert.equal(deriveCandidateState(changed, changed.candidateLedger.candidates[0], []), 'BLOCKED_PRIVACY');
  assert.ok(validateHarness(changed).some((failure) => failure.includes('faltan aprobaciones humanas requeridas')));
});

test('every launch gate owns an explicit stop condition', () => {
  const covered = new Set(harness.policy.stopConditions.map(({ gate }) => gate));
  assert.deepEqual([...covered], harness.policy.gateOrder);
  assert.equal(harness.policy.teacherOps.capacityUtilizationStopPercent, 80);
  assert.equal(harness.policy.teacherOps.oldestQueuedStopHours, 9);
  assert.equal(harness.policy.teacherOps.rollingP95StopHours, 10);
  assert.deepEqual(harness.policy.teacherOps.escalationHours, [6, 9, 11]);
});
