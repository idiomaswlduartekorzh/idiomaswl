import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildValidationArtifacts,
} from '../scripts/check-ielts-reading-multiple-choice-rights.mjs';

const { validation, blindReview, factualSourceReview } = buildValidationArtifacts();

test('F0.2b.1 covers exactly three passages and 18 unique questions', () => {
  assert.equal(validation.scope.passages, 3);
  assert.equal(validation.scope.questions, 18);
  assert.equal(validation.scope.registryEntriesInUnit, 3);
  assert.deepEqual([...validation.scope.coveredAssetIds], [
    'formative:multiple-choice:mc-sleep-learning',
    'formative:multiple-choice:mc-river-restoration',
    'formative:multiple-choice:mc-digital-notes',
  ]);
  assert.equal(validation.checks.exactCoverage, true);
  assert.equal(validation.checks.stableUniqueIds, true);
});

test('source identity remains pinned to the pre-change baseline', () => {
  assert.equal(validation.checks.sourceHashesMatchBaseline, true);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
    assert.ok(decision.wordCount >= 200);
    assert.equal(decision.questionCount, 6);
  }
});

test('candidate factual sources never become factual verification or approval', () => {
  assert.equal(validation.checks.registryReferencesResolve, true);
  assert.equal(validation.checks.factualSourceAvailabilityRecorded, true);
  assert.equal(validation.checks.candidateSourcesAreNotTreatedAsVerification, true);
  assert.equal(validation.checks.factualReviewRequiredForEveryAsset, true);
  for (const decision of validation.decisions) {
    assert.equal(decision.factualResearchStatus, 'candidate-sources-collected');
    assert.equal(decision.factualReviewPolicy, 'required');
    assert.ok(decision.candidateFactualSourceCount >= 2);
    assert.equal(decision.factualReviewStatus, 'not-reviewed');
    assert.equal(decision.humanReviewStatus, 'pending');
  }
});

test('all three visible assets remain deny-by-default quarantined', () => {
  assert.equal(validation.checks.actualAssetsAllQuarantined, true);
  assert.equal(validation.checks.actualRegistryRecordsStructurallyValid, true);
  assert.equal(validation.checks.visibleOriginalityClaimObservedButUnverified, true);
  for (const decision of validation.decisions) {
    assert.equal(decision.rightsBasis, 'unknown-quarantined');
    assert.equal(decision.disposition, 'quarantine');
    assert.equal(decision.eligibleForPublicationPipeline, false);
    assert.equal(decision.authorizationEvidenceStatus, 'not-located-in-reviewed-sources');
    assert.ok(decision.reasonCodes.includes('authorship-unresolved'));
    assert.ok(decision.reasonCodes.includes('factual-review-incomplete'));
    assert.ok(decision.reasonCodes.includes('human-review-pending'));
    assert.ok(decision.reasonCodes.includes('rights-unresolved'));
  }
});

test('blind packet contains content for review but no keys or feedback', () => {
  assert.equal(validation.checks.blindPacketContainsNoKeysOrFeedback, true);
  assert.equal(validation.checks.blindPacketContainsNoLearnerOrContactPii, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeysOrFeedback, true);
  assert.equal(blindReview.records.length, 3);
  assert.equal(
    blindReview.records.reduce((sum, record) => sum + record.questions.length, 0),
    18,
  );
  assert.ok(blindReview.records.every(record => typeof record.passage === 'string'));
  const serialized = JSON.stringify(blindReview);
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.equal(factualSourceReview.records.length, 3);
  assert.equal(
    factualSourceReview.records.reduce(
      (sum, record) => sum + record.candidateSources.length,
      0,
    ),
    8,
  );
});

test('independent expert and average-student walkthrough cover the full blind packet', () => {
  assert.equal(validation.checks.independentExpertCoverageComplete, true);
  assert.equal(validation.expertReview.answerAgreement.total, 18);
  assert.equal(validation.expertReview.humanSignature, false);
  assert.equal(validation.checks.studentWalkthroughCoverageComplete, true);
  assert.equal(validation.studentWalkthrough.passagesCovered, 3);
});

test('anti-shortcut profile records risk without overclaiming statistical certification', () => {
  assert.deepEqual(validation.antiBias.correctOptionIndexCounts, {
    A: 6,
    B: 8,
    C: 4,
    D: 0,
  });
  assert.deepEqual(validation.antiBias.unusedCorrectPositions, ['D']);
  assert.equal(validation.antiBias.uniqueLongestQuestions, 13);
  assert.equal(validation.antiBias.correctIsUniqueLongest, 10);
  assert.equal(validation.antiBias.permutationChecks, 54);
  assert.equal(validation.checks.optionPermutationPreservesSemanticKey, true);
  assert.equal(validation.checks.statisticalCertificationWithheld, true);
  assert.equal(validation.checks.contentBalanceCertificationBlocked, true);
  assert.equal(validation.antiBias.sampleAdequacy.eligibleForStatisticalCertification, false);
  assert.equal(
    validation.antiBias.contentCertification,
    'blocked-editorial-rebalancing-required',
  );
});

test('no learner-facing or runtime behavior is claimed as validated by this unit', () => {
  assert.equal(validation.scope.learnerFacingFilesChangedByUnit, false);
  assert.equal(validation.applicability.cognitiveWalkthrough, 'applicable-to-content-only');
  assert.equal(validation.applicability.uiUxAccessibility, 'not-applicable-no-learner-facing-change');
  assert.equal(validation.applicability.playwright, 'not-applicable-no-runtime-or-dom-change');
  assert.equal(validation.scope.parentF02bRemainsOpen, true);
});

test('content hash mutation fails closed', () => {
  assert.equal(validation.checks.contentMutationDenied, true);
  assert.ok(
    validation.negativeControl.contentHashMismatch.reasonCodes.includes(
      'content-hash-mismatch',
    ),
  );
});
