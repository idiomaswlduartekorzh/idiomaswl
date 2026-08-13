import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildValidationArtifacts,
  validateFinalReportArtifacts,
} from '../scripts/check-ielts-reading-matching-headings-rights.mjs';

const { validation, blindReview, factualSourceReview } = buildValidationArtifacts();

test('F0.2b.5 covers exactly three passages, seventeen paragraph decisions and twenty-seven heading candidates', () => {
  assert.equal(validation.scope.passages, 3);
  assert.equal(validation.scope.paragraphs, 17);
  assert.equal(validation.scope.questions, 17);
  assert.equal(validation.scope.headingCandidates, 27);
  assert.equal(validation.scope.registryEntriesInUnit, 3);
  assert.equal(validation.checks.exactCoverage, true);
  assert.equal(validation.checks.stableUniqueIds, true);
});

test('source identity and the scoped learner-facing runtime remain pinned to baseline', () => {
  assert.equal(validation.checks.sourceHashesMatchBaseline, true);
  assert.equal(validation.checks.scopedLearnerSourcesUnchanged, true);
  assert.equal(validation.checks.learnerFacingDependencyClosureContainsNoKeyLikeValues, true);
  assert.equal(validation.checks.nextUnitSourcesUnchangedAndStopBoundaryEnforced, true);
  assert.equal(validation.checks.auditRegistryAbsentFromLearnerRuntimeImports, true);
  assert.equal(validation.scope.scopedLearnerSourcesChangedSinceBaseline, false);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
    assert.equal(decision.headingCandidateCount, 9);
  }
});

test('official rule and all nine candidate factual sources have recorded availability', () => {
  assert.equal(validation.checks.officialRuleSourceAvailable, true);
  assert.equal(validation.checks.factualSourceAvailabilityRecorded, true);
  assert.equal(validation.sourceAvailability.sources.length, 10);
  assert.equal(
    factualSourceReview.records.reduce((sum, row) => sum + row.candidateSources.length, 0),
    9,
  );
});

test('candidate sources never become factual verification or human approval', () => {
  assert.equal(validation.checks.candidateSourcesAreNotTreatedAsVerification, true);
  assert.equal(validation.checks.factualReviewRequiredForEveryAsset, true);
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

test('blind and factual packets contain passages and options but no keys, feedback, skills or PII', () => {
  assert.equal(validation.checks.blindPacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.blindPacketContainsNoKeyLikeValues, true);
  assert.equal(validation.checks.blindPacketContainsNoLearnerOrContactPii, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeyLikeValues, true);
  assert.equal(blindReview.records.reduce((sum, row) => sum + row.paragraphs.length, 0), 17);
  assert.equal(blindReview.records.reduce((sum, row) => sum + row.headingOptions.length, 0), 27);
  const serialized = JSON.stringify({ blindReview, factualSourceReview });
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"selectedHeadingId"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.doesNotMatch(serialized, /"skill"\s*:/iu);
});

test('independent expert contract covers every paragraph with global evidence and heading competition', () => {
  assert.equal(validation.checks.independentExpertCoverageComplete, true);
  assert.equal(validation.checks.expertFirstPassPersistedAndPinned, true);
  assert.equal(validation.checks.wholeParagraphMainIdeaEvidenceContractEnforced, true);
  assert.equal(validation.checks.singleHeadingDecisionContractEnforced, true);
  assert.equal(validation.expertReview.answerAgreement.total, 17);
  assert.equal(validation.expertReview.humanSignature, false);
});

test('no heading is reused within a set and the runtime mismatch fails certification closed', () => {
  assert.equal(validation.checks.storedHeadingReuseAbsent, true);
  assert.equal(validation.checks.officialNoHeadingReuseRuleCaptured, true);
  assert.equal(validation.checks.runtimeNoReuseMismatchDetected, true);
  for (const row of validation.antiBias.storedKeyProfile.perSet) {
    assert.deepEqual(row.reusedHeadingIds, []);
    assert.ok(row.unusedHeadingIds.length >= 3);
  }
  assert.equal(validation.checks.contentCertificationBlocked, true);
});

test('average-student walkthrough covers every paragraph without assigning headings', () => {
  assert.equal(validation.checks.studentWalkthroughCoverageComplete, true);
  assert.equal(validation.studentWalkthrough.passagesCovered, 3);
  assert.equal(validation.studentWalkthrough.questionsCovered, 17);
});

test('anti-shortcut profile enumerates label, position, overlap, length and extreme-cue signals', () => {
  const profile = validation.antiBias.storedKeyProfile;
  assert.equal(validation.antiBias.optionPermutationApplied, false);
  assert.deepEqual(profile.answerCounts, {
    i: 3,
    ii: 0,
    iii: 3,
    iv: 2,
    v: 2,
    vi: 1,
    vii: 2,
    viii: 2,
    ix: 2,
  });
  assert.equal(profile.samePositionPredictsHeading.eligible, 17);
  assert.equal(profile.samePositionPredictsHeading.hits, 5);
  assert.equal(profile.highestLexicalOverlapPredictsHeading.eligible, 14);
  assert.equal(profile.highestLexicalOverlapPredictsHeading.hits, 6);
  assert.equal(profile.highestLexicalOverlapPredictsHeading.tiesOrAbstentions, 3);
  assert.equal(profile.longestHeadingPredictsAnswer.eligible, 12);
  assert.equal(profile.longestHeadingPredictsAnswer.hits, 2);
  assert.equal(profile.longestHeadingPredictsAnswer.tiesOrAbstentions, 5);
  assert.equal(profile.extremeCueDistractorSignal.flaggedOptions, 9);
  assert.equal(profile.extremeCueDistractorSignal.flaggedCorrectUses, 1);
  assert.equal(profile.extremeCueDistractorSignal.flaggedOptionsNeverCorrect, 8);
  assert.equal(validation.checks.headingIdTextBindingsPreserved, true);
  assert.equal(validation.checks.statisticalCertificationWithheld, true);
  assert.equal(validation.checks.antiBiasMultidimensionalCoverage, true);
  assert.equal(Object.keys(profile.constantLabelHeuristics).length, 9);
  assert.equal(Object.keys(profile.headingLengthByLabel).length, 9);
  assert.equal(profile.overlapRows.length, 17);
  assert.equal(profile.perSet.length, 3);
});

test('UI/UX and Playwright are N/A only for this unchanged learner-facing delta', () => {
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

test('content hash and English/Spanish heading-key leakage mutations fail closed', () => {
  assert.equal(validation.checks.contentMutationDenied, true);
  assert.ok(validation.negativeControl.contentHashMismatch.reasonCodes.includes('content-hash-mismatch'));
  assert.equal(validation.checks.keyLikeValueLeakageMutationDetected, true);
  assert.deepEqual(validation.negativeControl.keyLikeValueLeakFindings, ['$.instruction']);
  assert.deepEqual(validation.negativeControl.spanishKeyLikeValueLeakFindings, ['$.repairAction']);
  assert.deepEqual(validation.negativeControl.imperativeKeyLikeValueLeakFindings, ['$.instruction']);
  assert.deepEqual(validation.negativeControl.spanishCorrespondenceLeakFindings, ['$.repairAction']);
});

test('chronology, final panel, portable report and stop boundary are validated', () => {
  assert.equal(validation.checks.chronologyIsMonotonicAndNotFutureDated, true);
  assert.equal(validation.checks.finalPanelVerdictsValidated, true);
  assert.equal(validation.checks.boardStateMatchesValidatedUnit, true);
  assert.equal(validation.checks.nextUnitCompletedAndParentRemainsOpen, true);
  assert.match(validation.processLimitations.firstPassTrace, /not an external append-only witness/u);
  assert.match(validation.processLimitations.directSourceReview, /not automatic proof/u);
  const reportArtifacts = validateFinalReportArtifacts(validation);
  assert.match(reportArtifacts.artifactSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportMarkdownSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportHtmlSha256, /^[a-f0-9]{64}$/u);
});
