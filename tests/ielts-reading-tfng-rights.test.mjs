import assert from 'node:assert/strict';
import test from 'node:test';

import { buildValidationArtifacts } from '../scripts/check-ielts-reading-tfng-rights.mjs';

const { validation, blindReview, factualSourceReview } = buildValidationArtifacts();

test('F0.2b.2 covers exactly three formative sets and 22 unique statements', () => {
  assert.equal(validation.scope.passages, 3);
  assert.equal(validation.scope.questions, 22);
  assert.equal(validation.scope.registryEntriesInUnit, 3);
  assert.deepEqual(validation.scope.excludedAssetIds, ['legacy:reading-hub:amazon-tfng']);
  assert.equal(validation.checks.exactCoverage, true);
  assert.equal(validation.checks.stableUniqueIds, true);
});

test('source identity and learner-facing runtime remain pinned to baseline', () => {
  assert.equal(validation.checks.sourceHashesMatchBaseline, true);
  assert.equal(validation.checks.scopedLearnerSourcesUnchanged, true);
  assert.equal(validation.checks.auditRegistryAbsentFromLearnerRuntimeImports, true);
  assert.equal(validation.scope.scopedLearnerSourcesChangedSinceBaseline, false);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
  }
});

test('candidate factual sources never become factual verification or approval', () => {
  assert.equal(validation.checks.registryReferencesResolve, true);
  assert.equal(validation.checks.factualSourceAvailabilityRecorded, true);
  assert.equal(validation.checks.candidateSourcesAreNotTreatedAsVerification, true);
  assert.equal(validation.checks.factualReviewRequiredForEveryAsset, true);
  assert.equal(factualSourceReview.records.reduce((sum, row) => sum + row.candidateSources.length, 0), 8);
  for (const decision of validation.decisions) {
    assert.equal(decision.factualReviewPolicy, 'required');
    assert.equal(decision.factualReviewStatus, 'not-reviewed');
    assert.equal(decision.humanReviewStatus, 'pending');
  }
});

test('all three assets remain deny-by-default quarantined under structurally valid records', () => {
  assert.equal(validation.checks.actualAssetsAllQuarantined, true);
  assert.equal(validation.checks.actualRegistryRecordsStructurallyValid, true);
  for (const decision of validation.decisions) {
    assert.equal(decision.rightsBasis, 'unknown-quarantined');
    assert.equal(decision.disposition, 'quarantine');
    assert.equal(decision.eligibleForPublicationPipeline, false);
    assert.ok(decision.reasonCodes.includes('authorship-unresolved'));
    assert.ok(decision.reasonCodes.includes('factual-review-incomplete'));
    assert.ok(decision.reasonCodes.includes('human-review-pending'));
    assert.ok(decision.reasonCodes.includes('rights-unresolved'));
  }
});

test('blind and factual packets contain no stored labels, feedback, skills or PII', () => {
  assert.equal(validation.checks.blindPacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.blindPacketContainsNoKeyLikeValues, true);
  assert.equal(validation.checks.blindPacketContainsNoLearnerOrContactPii, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeyLikeValues, true);
  assert.equal(blindReview.records.reduce((sum, row) => sum + row.statements.length, 0), 22);
  const serialized = JSON.stringify({ blindReview, factualSourceReview });
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.doesNotMatch(serialized, /"skill"\s*:/iu);
});

test('independent expert enforces evidence and absence contracts for all 22 decisions', () => {
  assert.equal(validation.checks.independentExpertCoverageComplete, true);
  assert.equal(validation.checks.expertFirstPassPersistedAndPinned, true);
  assert.equal(validation.checks.notGivenEvidenceContractEnforced, true);
  assert.equal(validation.expertReview.answerAgreement.total, 22);
  assert.equal(validation.expertReview.humanSignature, false);
});

test('average-student cognitive walkthrough covers every statement without assigning keys', () => {
  assert.equal(validation.checks.studentWalkthroughCoverageComplete, true);
  assert.equal(validation.studentWalkthrough.passagesCovered, 3);
  assert.equal(validation.studentWalkthrough.questionsCovered, 22);
});

test('fixed-label anti-shortcut profile exposes the absolute-language cue', () => {
  assert.equal(validation.antiBias.optionPermutationApplied, false);
  assert.deepEqual(validation.antiBias.storedKeyProfile.answerCounts, {
    TRUE: 7,
    FALSE: 11,
    'NOT GIVEN': 4,
  });
  assert.equal(validation.antiBias.storedKeyProfile.maxSameLabelRun, 2);
  assert.equal(validation.antiBias.storedKeyProfile.absoluteLanguageImpliesFalse.eligible, 10);
  assert.equal(validation.antiBias.storedKeyProfile.absoluteLanguageImpliesFalse.hits, 8);
  assert.equal(validation.checks.fixedLabelsNotPermuted, true);
  assert.equal(validation.checks.statisticalCertificationWithheld, true);
  assert.equal(validation.checks.contentCertificationBlocked, true);
  assert.equal(validation.checks.antiBiasMultidimensionalCoverage, true);
  assert.equal(Object.keys(validation.antiBias.storedKeyProfile.constantLabelHeuristics).length, 3);
  assert.equal(Object.keys(validation.antiBias.storedKeyProfile.statementLengthByLabel).length, 3);
  assert.equal(Object.keys(validation.antiBias.storedKeyProfile.lexicalOverlapByLabel).length, 3);
  assert.equal(validation.antiBias.storedKeyProfile.perSet.length, 3);
});

test('UI/UX and Playwright are N/A only because four source hashes are unchanged', () => {
  assert.equal(validation.applicability.cognitiveWalkthrough, 'applicable-to-content-only');
  assert.equal(validation.applicability.uiUxAccessibility, 'not-applicable-scoped-learner-sources-unchanged');
  assert.equal(validation.applicability.playwright, 'not-applicable-scoped-learner-runtime-unchanged');
  assert.equal(validation.scope.parentF02bRemainsOpen, true);
});

test('directed provenance ledger is complete without becoming proof of originality', () => {
  assert.equal(validation.checks.provenanceSearchLedgerComplete, true);
  assert.equal(validation.provenanceSearch.queries.length, 3);
  assert.match(validation.provenanceSearch.interpretation, /non-exhaustive/u);
  assert.match(validation.provenanceSearch.interpretation, /does not prove originality/u);
});

test('content hash mutation fails closed', () => {
  assert.equal(validation.checks.contentMutationDenied, true);
  assert.ok(validation.negativeControl.contentHashMismatch.reasonCodes.includes('content-hash-mismatch'));
});

test('key-like leakage inside a text value is detected fail-closed', () => {
  assert.equal(validation.checks.keyLikeValueLeakageMutationDetected, true);
  assert.deepEqual(validation.negativeControl.keyLikeValueLeakFindings, ['$.instruction']);
});

test('board state matches this exact closed unit and preserves the next stop boundary', () => {
  assert.equal(validation.checks.boardStateMatchesValidatedUnit, true);
  assert.match(validation.processLimitations.firstPassTrace, /not an external append-only witness/u);
  assert.match(validation.processLimitations.directSourceReview, /not automatic proof/u);
});
