import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  calculateCandidateDigest,
  deriveCandidateState,
  hasMergeConflictMarkers,
  inventory,
  loadHarness,
  parseNullSeparatedPaths,
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
    editorial: 'PASS', seo: 'PASS', 'geo-aeo-ai': 'PASS', pricing: 'PASS', security: 'PASS', privacy: 'BLOCKED',
    payments: 'BLOCKED', 'teacher-ops': 'BLOCKED', release: 'BLOCKED',
  });
});

test('mock identity policy permits expansion beyond mock-23 without catalog promotion', () => {
  const pattern = new RegExp(harness.policy.mockExpansion.idPattern);
  assert.equal(pattern.test('mock-24'), true);
  assert.equal(pattern.test('mock-100'), true);
  assert.ok(harness.campaign.expansionQueue.some(({ mockId, catalogEligible }) => mockId === 'mock-24' && catalogEligible === false));
});

test('commercial ladder fixes price, duration, finite feedback quota and only the implemented membership upgrade', () => {
  const tiers = new Map(harness.policy.commercialModel.tiers.map((tier) => [tier.sku, tier]));
  assert.deepEqual([tiers.get('icfes-detail-attempt-v1').priceCop, tiers.get('exam-auto').priceCop, tiers.get('exam-teacher').priceCop], [12900, 49900, 99900]);
  assert.equal(tiers.get('exam-auto').durationDays, 30);
  assert.equal(tiers.get('exam-auto').billing, 'recurring-30-days');
  assert.equal(tiers.get('exam-auto').examSlug, 'icfes');
  assert.equal(tiers.get('exam-teacher').durationDays, 30);
  assert.equal(tiers.get('exam-teacher').billing, 'recurring-30-days');
  assert.equal(tiers.get('exam-teacher').examSlug, 'icfes');
  assert.equal(tiers.get('exam-teacher').humanReviewCredits, 1);
  assert.equal(tiers.get('exam-teacher').humanReviewSlaHours, 12);
  assert.equal(tiers.get('exam-teacher').feedbackCreditsPerPeriod, 1);
  assert.equal(tiers.get('exam-teacher').publicBenefitLabel, 'feedback pedagógico personalizado de WeLearn con asistencia de IA');
  assert.equal(tiers.get('exam-teacher').aiAssistanceDisclosureRequired, true);
  assert.equal(tiers.get('exam-teacher').humanApprovalEvidenceRequiredBeforeDelivery, true);
  assert.equal(tiers.get('exam-teacher').publicTeacherAuthorshipClaimForbidden, true);
  assert.equal(tiers.get('exam-teacher').deliveryTargetConditionalOnReservedCapacity, true);
  assert.equal(tiers.get('exam-teacher').deliveryTargetIsGuarantee, false);
  assert.equal(harness.policy.teacherOps.queueIntakeRequired, true);
  assert.equal(harness.policy.teacherOps.weLearnNotificationRequired, true);
  assert.equal(harness.policy.teacherOps.humanApprovalRequiredBeforeStudentDelivery, true);
  assert.equal(harness.policy.teacherOps.humanApprovalEvidenceRequired, true);
  assert.deepEqual(harness.policy.commercialModel.upgradeCredits.map(({ creditCop, payableCop }) => [creditCop, payableCop]), [[49900, 50000]]);
});

test('public contract discloses AI assistance and forbids teacher-authorship attribution', () => {
  const approvedLabel = 'feedback pedagógico personalizado de WeLearn con asistencia de IA';
  for (const relativePath of ['docs/icfes-commerce-v1.md', 'docs/icfes-product-activation.md']) {
    const content = readFileSync(path.join(repoRoot, relativePath), 'utf8');
    assert.match(content, new RegExp(approvedLabel));
    assert.match(content, /aprobación humana/);
    assert.match(content, /no (?:autoriza|puede afirmar ni insinuar).+docente/);
  }
  const unsafeVariants = [
    ['aiAssistanceDisclosureRequired', false, 'debe revelar la asistencia de IA'],
    ['humanApprovalEvidenceRequiredBeforeDelivery', false, 'exige evidencia de aprobación humana'],
    ['publicTeacherAuthorshipClaimForbidden', false, 'no puede atribuir autoría docente'],
    ['deliveryTargetIsGuarantee', true, 'no puede representarse como garantía'],
  ];
  for (const [field, unsafeValue, expectedFailure] of unsafeVariants) {
    const unsafe = structuredClone(harness);
    unsafe.policy.commercialModel.tiers.find(({ sku }) => sku === 'exam-teacher')[field] = unsafeValue;
    assert.ok(validateHarness(unsafe).some((failure) => failure.includes(expectedFailure)));
  }
});

test('GEO/AEO/AI is a formal, evidence-bound gate without ranking promises', () => {
  assert.ok(harness.policy.gateOrder.includes('geo-aeo-ai'));
  assert.ok(harness.policy.requiredReviewRoles.includes('geo-aeo-ai-reviewer'));
  assert.equal(harness.policy.discovery.measurementMode, 'observed-only');
  assert.equal(harness.policy.discovery.forbidRankingOrCitationGuarantees, true);
  assert.equal(harness.policy.discovery.forbidPrivateAnswerRetrieval, true);
  assert.equal(candidate.gateAssessments['geo-aeo-ai'].status, 'PASS');
  assert.deepEqual(candidate.gateAssessments['geo-aeo-ai'].stopConditionIds, ['discovery-claim-or-source-gap']);
});

test('governance code, schemas, discovery evidence and CI remain hash-bound', () => {
  const required = [
    'config/icfes-launch-harness/policy.json',
    'config/icfes-launch-harness/work-order.schema.json',
    'scripts/lib/icfes-launch-harness-core.mjs',
    'scripts/lib/icfes-own-expansion-core.mjs',
    'scripts/audit-icfes-seo-product.mjs',
    'docs/templates/ICFES-OWN-MOCK-EXPANSION-CHECKLIST.md',
    'docs/icfes-seo-measurement-2026-09-09.md',
    '.github/workflows/content-integrity.yml',
  ];
  const inputs = new Set(workOrder.inputArtifacts.map(({ path: artifactPath }) => artifactPath));
  const subjects = new Set(candidate.subjectArtifacts.map(({ path: artifactPath }) => artifactPath));
  for (const artifactPath of required) {
    assert.ok(inputs.has(artifactPath), `work order must bind ${artifactPath}`);
    assert.ok(subjects.has(artifactPath), `candidate must bind ${artifactPath}`);
  }
});

test('digest refresh recognizes unresolved merge markers before hashing', () => {
  assert.equal(hasMergeConflictMarkers('const safe = true;\n'), false);
  assert.equal(hasMergeConflictMarkers('<<<<<<< HEAD\nours\n=======\ntheirs\n>>>>>>> main\n'), true);
  assert.deepEqual(parseNullSeparatedPaths('a.ts\0b.ts\0a.ts\0'), ['a.ts', 'b.ts']);
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
