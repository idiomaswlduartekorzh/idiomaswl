import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildValidationArtifacts,
  validateFinalReportArtifacts,
} from '../scripts/check-ielts-reading-matching-information-rights.mjs';

const { validation, blindReview, factualSourceReview } = buildValidationArtifacts();

test('F0.2b.4 covers exactly three passages, fifteen paragraphs and eighteen statements', () => {
  assert.equal(validation.scope.passages, 3);
  assert.equal(validation.scope.paragraphs, 15);
  assert.equal(validation.scope.questions, 18);
  assert.equal(validation.scope.registryEntriesInUnit, 3);
  assert.equal(validation.checks.exactCoverage, true);
  assert.equal(validation.checks.stableUniqueIds, true);
});

test('source identity and the scoped learner-facing runtime remain pinned to baseline', () => {
  assert.equal(validation.checks.sourceHashesMatchBaseline, true);
  assert.equal(validation.checks.scopedLearnerSourcesUnchanged, true);
  assert.equal(validation.checks.auditRegistryAbsentFromLearnerRuntimeImports, true);
  assert.equal(validation.scope.scopedLearnerSourcesChangedSinceBaseline, false);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
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

test('blind and factual packets contain no stored mappings, feedback, skills or PII', () => {
  assert.equal(validation.checks.blindPacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.blindPacketContainsNoKeyLikeValues, true);
  assert.equal(validation.checks.blindPacketContainsNoLearnerOrContactPii, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeysFeedbackOrSkills, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoKeyLikeValues, true);
  assert.equal(blindReview.records.reduce((sum, row) => sum + row.statements.length, 0), 18);
  const serialized = JSON.stringify({ blindReview, factualSourceReview });
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"correctParagraph"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.doesNotMatch(serialized, /"skill"\s*:/iu);
});

test('independent expert enforces exact evidence and paragraph-competition contracts', () => {
  assert.equal(validation.checks.independentExpertCoverageComplete, true);
  assert.equal(validation.checks.expertFirstPassPersistedAndPinned, true);
  assert.equal(validation.checks.specificInformationEvidenceContractEnforced, true);
  assert.equal(validation.checks.singleParagraphDecisionContractEnforced, true);
  assert.equal(validation.expertReview.answerAgreement.matches, 18);
  assert.equal(validation.expertReview.answerAgreement.total, 18);
  assert.equal(validation.expertReview.materialAmbiguityCount, 0);
  assert.equal(validation.expertReview.humanSignature, false);
});

test('paragraph reuse is explicit and appears in every scoped set', () => {
  assert.equal(validation.checks.paragraphReuseInstructionAndDataAligned, true);
  for (const row of validation.antiBias.storedKeyProfile.perSet) {
    assert.ok(row.reusedParagraphIds.length >= 1);
  }
});

test('average-student walkthrough covers every statement without assigning mappings', () => {
  assert.equal(validation.checks.studentWalkthroughCoverageComplete, true);
  assert.equal(validation.studentWalkthrough.passagesCovered, 3);
  assert.equal(validation.studentWalkthrough.questionsCovered, 18);
});

test('anti-shortcut profile exposes the positional and lexical-overlap heuristics', () => {
  assert.equal(validation.antiBias.optionPermutationApplied, false);
  assert.deepEqual(validation.antiBias.storedKeyProfile.answerCounts, {
    A: 3,
    B: 5,
    C: 3,
    D: 4,
    E: 3,
  });
  assert.equal(validation.antiBias.storedKeyProfile.maxSameLabelRun, 1);
  assert.equal(validation.antiBias.storedKeyProfile.positionOneToFivePredictsAToE.eligible, 15);
  assert.equal(validation.antiBias.storedKeyProfile.positionOneToFivePredictsAToE.hits, 11);
  assert.equal(validation.antiBias.storedKeyProfile.highestLexicalOverlapPredictsParagraph.eligible, 11);
  assert.equal(validation.antiBias.storedKeyProfile.highestLexicalOverlapPredictsParagraph.hits, 8);
  assert.equal(validation.checks.paragraphLabelsNotRandomized, true);
  assert.equal(validation.checks.statisticalCertificationWithheld, true);
  assert.equal(validation.checks.contentCertificationBlocked, true);
  assert.equal(validation.checks.antiBiasMultidimensionalCoverage, true);
  assert.equal(Object.keys(validation.antiBias.storedKeyProfile.constantLabelHeuristics).length, 5);
  assert.equal(Object.keys(validation.antiBias.storedKeyProfile.statementLengthByLabel).length, 5);
  assert.equal(validation.antiBias.storedKeyProfile.overlapRows.length, 18);
  assert.equal(validation.antiBias.storedKeyProfile.perSet.length, 3);
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

test('content-hash and paragraph-mapping leakage mutations fail closed', () => {
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
  assert.equal(validation.checks.nextUnitAndParentRemainOpen, true);
  assert.match(validation.processLimitations.firstPassTrace, /not an external append-only witness/u);
  assert.match(validation.processLimitations.directSourceReview, /not automatic proof/u);
  const reportArtifacts = validateFinalReportArtifacts(validation);
  assert.match(reportArtifacts.artifactSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportMarkdownSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportHtmlSha256, /^[a-f0-9]{64}$/u);
});
