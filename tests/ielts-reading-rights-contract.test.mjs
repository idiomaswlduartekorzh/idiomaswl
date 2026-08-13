import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildValidationArtifacts,
  scanIeltsRightsAuditPayload,
} from '../scripts/check-ielts-reading-rights.mjs';

const { validation, blindReview } = buildValidationArtifacts();

test('F0.2a covers exactly the three Reading sections in IELTS set-1', () => {
  assert.equal(validation.scope.readingAssetsInSource, 3);
  assert.equal(validation.scope.registryEntries, 3);
  assert.deepEqual([...validation.scope.coveredAssetIds], [
    'mock:set-1:reading-part-5',
    'mock:set-1:reading-part-6',
    'mock:set-1:reading-part-7',
  ]);
  assert.equal(validation.checks.uniqueAssetIds, true);
  assert.equal(validation.checks.uniqueEvidenceIds, true);
});

test('source object and normalized passage hashes are pinned and current', () => {
  assert.equal(validation.checks.sourceHashesCurrent, true);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
  }
});

test('all three actual assets remain unknown and quarantined', () => {
  assert.equal(validation.checks.actualAssetsAllQuarantined, true);
  for (const decision of validation.decisions) {
    assert.equal(decision.rightsBasis, 'unknown-quarantined');
    assert.equal(decision.disposition, 'quarantine');
    assert.equal(decision.eligibleForPublicationPipeline, false);
    assert.equal(decision.authorizationEvidenceStatus, 'not-located-in-reviewed-sources');
    assert.deepEqual([...decision.reasonCodes], [
      'authorship-unresolved',
      'factual-review-incomplete',
      'human-review-pending',
      'module-not-declared',
      'rights-unresolved',
    ]);
  }
});

test('missing records and changed source objects fail closed', () => {
  assert.equal(validation.checks.missingRecordDenied, true);
  assert.deepEqual([...validation.negativeControl.missingRecord.reasonCodes], [
    'missing-rights-registry-entry',
  ]);
  assert.equal(validation.checks.contentMutationDenied, true);
  assert.ok(
    validation.negativeControl.contentHashMismatch.reasonCodes.includes(
      'content-hash-mismatch',
    ),
  );
});

test('the executable contract requires evidence and independent human review', () => {
  assert.deepEqual(validation.contractMutationChecks, {
    verifiedOwnedOriginalCanAdvance: true,
    authorCannotSelfApprove: true,
    verifiedLicenseCanAdvance: true,
    licenseWithoutAuthorizationIsBlocked: true,
    verifiedPublicDomainCanAdvance: true,
    wrongKindModuleEvidenceIsBlocked: true,
    whitespaceAuthorshipIsBlocked: true,
    missingProvenanceEvidenceIsBlocked: true,
    blankFactualReviewIsBlocked: true,
    unknownFactualStatusIsBlocked: true,
    whitespaceHumanReviewIsBlocked: true,
    missingHumanAttestationIsBlocked: true,
    unknownHumanStatusIsBlocked: true,
    automatedTriageCannotApprove: true,
    invalidRightsBasisIsBlocked: true,
    invalidRegistryContractIsBlocked: true,
    impossibleCalendarDatesAreBlocked: true,
    wrongKindFactualResearchIsBlocked: true,
    requiredFactualReviewCannotBeNotApplicable: true,
    malformedEvidenceArrayFailsClosed: true,
    duplicateEvidenceIdsAreBlocked: true,
    duplicateRegistryEntriesAreBlocked: true,
  });
});

test('registry and blind packet store neither assessment payloads nor PII fields', () => {
  assert.equal(validation.checks.registryStoresNoAssessmentPayload, true);
  assert.equal(validation.checks.registryStoresNoLearnerOrContactPii, true);
  assert.deepEqual(blindReview.excludes, [
    'passage text',
    'questions',
    'options',
    'answer keys',
    'student data',
  ]);
  assert.equal(blindReview.records.length, 3);
});

test('payload guard catches key variants and learner/contact PII but permits editorial identity', () => {
  const scan = scanIeltsRightsAuditPayload({
    correctAnswers: ['A'],
    answerKeys: ['B'],
    explanations: ['because'],
    sessionId: 'session-1',
    whatsapp: '+57 300 000 0000',
    note: 'contact learner@example.com',
    authorName: 'Editorial Author',
    reviewerName: 'Independent Reviewer',
  });
  assert.deepEqual(scan.forbiddenPayloadPaths, [
    '$.correctAnswers',
    '$.answerKeys',
    '$.explanations',
  ]);
  assert.deepEqual(scan.learnerOrContactPiiPaths, [
    '$.sessionId',
    '$.whatsapp',
    '$.whatsapp:phone-value',
    '$.note:email-value',
  ]);
});

test('automated triage is explicitly incapable of approval', () => {
  assert.equal(validation.policy.automatedTriageCanApprove, false);
  assert.equal(validation.policy.humanApprovalRequired, true);
  assert.equal(validation.policy.independentReviewerRequired, true);
  assert.equal(validation.scope.parentF02RemainsOpen, true);
});
