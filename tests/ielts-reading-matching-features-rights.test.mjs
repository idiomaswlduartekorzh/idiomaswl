import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  assertDecisionQuarantined,
  assertBoardStopBoundary,
  assertNextUnitPinned,
  assertNoFutureTimestamp,
  assertUnitCardinality,
  buildBlindReviewPacket,
  buildStoredStructuralBiasProfile,
  buildValidationArtifacts,
  findFeatureAssignmentLeaks,
  validateFinalReportArtifacts,
  validateStudentWalkthroughDocument,
} from '../scripts/check-ielts-reading-matching-features-rights.mjs';

const ROOT = new URL('../', import.meta.url);
const OUTPUT = new URL(
  'output/audits/ielts-reading-rights-matching-features-2026-08-09/',
  ROOT,
);
const readOutput = name => JSON.parse(readFileSync(new URL(name, OUTPUT), 'utf8'));
const clone = value => JSON.parse(JSON.stringify(value));

const { validation, blindReview, factualSourceReview } = buildValidationArtifacts();

test('F0.2b.6 covers exactly three passages, nineteen questions and fourteen feature candidates', () => {
  assert.equal(validation.scope.passages, 3);
  assert.equal(validation.scope.questions, 19);
  assert.equal(validation.scope.featureCandidates, 14);
  assert.equal(validation.scope.registryEntriesInUnit, 3);
  assert.deepEqual(validation.scope.coveredAssetIds, [
    'formative:matching-features:mf-urban-farming',
    'formative:matching-features:mf-memory-research',
    'formative:matching-features:mf-transport-policies',
  ]);
  assert.equal(validation.checks.exactCoverage, true);
  assert.equal(validation.checks.stableUniqueIds, true);
});

test('seven learner-facing sources and the F0.2b.7 route/engine/bank remain pinned', () => {
  assert.equal(validation.checks.sourceHashesMatchBaseline, true);
  assert.equal(validation.checks.scopedLearnerSourcesUnchanged, true);
  assert.equal(validation.checks.nextUnitSourcesUnchangedAndStopBoundaryEnforced, true);
  assert.equal(validation.checks.auditRegistryAbsentFromLearnerRuntimeImports, true);
  assert.equal(validation.scope.scopedLearnerSourcesChangedSinceBaseline, false);
  assert.equal(validation.checks.learnerFacingDependencyClosureContainsNoFeatureAssignments, true);
  assert.equal(validation.checks.renderDependencyClosureContainsNoUnexpectedClaims, true);
  assert.ok(validation.renderDependencyClosure.sourceCount > 7);
  for (const decision of validation.decisions) {
    assert.match(decision.sourceObjectSha256, /^[a-f0-9]{64}$/u);
    assert.match(decision.passageSha256, /^[a-f0-9]{64}$/u);
  }
});

test('official Matching Features plus fifteen factual candidates have honest availability records', () => {
  assert.equal(validation.checks.officialRuleSourceAvailable, true);
  assert.equal(validation.checks.factualSourceAvailabilityRecorded, true);
  assert.equal(validation.checks.availabilityNotTreatedAsVerification, true);
  assert.equal(validation.checks.registryEvidenceAndReviewTimestampsValid, true);
  assert.equal(validation.sourceAvailability.sources.length, 16);
  assert.equal(
    factualSourceReview.records.reduce((sum, record) => sum + record.candidateSources.length, 0),
    15,
  );
  assert.ok(validation.sourceAvailability.sources.some(source => source.httpStatus === 403));
  assert.ok(validation.sourceAvailability.sources.some(source => source.httpStatus === 405));
});

test('registry policy v7 keeps the three records in exact deny-by-default quarantine', () => {
  assert.equal(validation.checks.registryPolicyV7Pinned, true);
  assert.equal(validation.checks.actualAssetsAllQuarantined, true);
  assert.equal(validation.checks.actualRegistryRecordsStructurallyValid, true);
  for (const decision of validation.decisions) {
    assert.equal(assertDecisionQuarantined(decision), true);
    assert.equal(decision.factualReviewPolicy, 'required');
    assert.equal(decision.factualReviewStatus, 'not-reviewed');
    assert.equal(decision.humanReviewStatus, 'pending');
    assert.equal(decision.candidateFactualSourceCount, 5);
  }
});

test('blind allowlist exposes passages/features/statements but no answers, explanations, traps, PII or assignments', () => {
  assert.equal(validation.checks.blindPacketContainsNoAnswersExplanationsTrapsOrSkills, true);
  assert.equal(validation.checks.blindPacketContainsNoFeatureLetterAssignments, true);
  assert.equal(validation.checks.blindPacketContainsNoLearnerOrContactPii, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoAnswersExplanationsTrapsOrSkills, true);
  assert.equal(validation.checks.factualSourcePacketContainsNoFeatureLetterAssignments, true);
  assert.equal(blindReview.records.reduce((sum, record) => sum + record.statements.length, 0), 19);
  assert.equal(blindReview.records.reduce((sum, record) => sum + record.features.length, 0), 14);
  const serialized = JSON.stringify({ blindReview, factualSourceReview });
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"selectedFeatureId"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.doesNotMatch(serialized, /"skill"\s*:/iu);
});

test('persisted blind first pass and expert verdict cover 19/19 with quotes and a closest competitor', () => {
  assert.equal(validation.checks.independentExpertCoverageComplete, true);
  assert.equal(validation.checks.expertAgreementNineteenOfNineteen, true);
  assert.equal(validation.checks.expertFirstPassPersistedAndPinned, true);
  assert.equal(validation.checks.evidenceQuotesAndClosestCompetitorEnforced, true);
  assert.equal(validation.expertReview.answerAgreement.matches, 19);
  assert.equal(validation.expertReview.answerAgreement.total, 19);
  assert.equal(validation.expertReview.humanSignature, false);
});

test('expert factual review covers exactly fifteen frozen claim spans without manufacturing verification', () => {
  assert.equal(validation.checks.exactFactualClaimCoverage, true);
  assert.equal(validation.checks.candidateSourcesAreNotTreatedAsVerification, true);
  assert.equal(validation.checks.factualReviewRequiredForEveryAsset, true);
  assert.equal(
    Object.values(validation.expertReview.factualAssessmentCounts).reduce((sum, count) => sum + count, 0),
    15,
  );
  assert.match(validation.processLimitations.sourceAvailability, /403\/405/u);
  assert.match(validation.processLimitations.directSourceReview, /not automatic proof/u);
});

test('declared feature reuse, feature-letter bindings and multidimensional anti-shortcut gates are explicit', () => {
  const profile = validation.antiBias.storedKeyProfile;
  assert.equal(validation.checks.featureReuseDeclaredAllowedAndAudited, true);
  assert.equal(validation.checks.featureLetterBindingsPreserved, true);
  assert.equal(validation.checks.antiBiasMultidimensionalCoverage, true);
  assert.deepEqual(profile.answerCounts, { A: 5, B: 3, C: 5, D: 4, E: 2 });
  assert.equal(profile.globalConcatenatedMaxSameLabelRun, 2);
  assert.equal(profile.perSetMaxSameLabelRun, 1);
  assert.ok(profile.perSet.every(row => row.declaredReuseAllowed));
  assert.ok(profile.perSet.every(row => row.reusedFeatureIds.length > 0));
  assert.equal(profile.questionPositionModuloFeatureCount.eligible, 19);
  assert.equal(profile.questionPositionModuloFeatureCount.hits, 11);
  assert.equal(profile.highestLabelDescriptionOverlapPredictsAnswer.eligible, 4);
  assert.equal(profile.highestLabelDescriptionOverlapPredictsAnswer.hits, 1);
  assert.equal(profile.highestLabelDescriptionOverlapPredictsAnswer.tiesOrAbstentions, 15);
  assert.equal(profile.longestFeatureDescriptionWordCountPredictsAnswer.eligible, 7);
  assert.equal(profile.longestFeatureDescriptionWordCountPredictsAnswer.hits, 2);
  assert.equal(profile.longestFeatureDescriptionWordCountPredictsAnswer.tiesOrAbstentions, 12);
  assert.equal(profile.descriptionTitleCue.featureDescriptionsVisiblePreResponse, 14);
  assert.equal(profile.descriptionTitleCue.passageTitlesVisible, 3);
  assert.equal(profile.descriptionTitleCue.independentDescriptionOnlyMatches, 16);
  assert.equal(profile.descriptionTitleCue.independentPreAnswerTrapMatches, 18);
  assert.equal(Object.keys(profile.constantLabelHeuristics).length, 5);
  assert.equal(Object.keys(profile.featureLengthByLabel).length, 5);
});

test('current guided-training runtime is documented without presenting it as Practice or Exam', () => {
  assert.equal(validation.checks.runtimeImmediateFeedbackAndAnswerLockingDetected, true);
  assert.equal(validation.checks.preResponseTrapHintsDetected, true);
  assert.equal(validation.checks.visibleFeatureDescriptionsDetected, true);
  assert.equal(validation.checks.answerKeysDeliveredToClientDetected, true);
  assert.equal(validation.checks.runtimeNotMisrepresentedAsPracticeOrExam, true);
  assert.equal(
    validation.runtime.classification,
    'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation',
  );
  assert.equal(validation.antiBias.contentCertification, 'blocked-editorial-and-runtime-review-required');
  assert.equal(validation.checks.statisticalCertificationWithheld, true);
  assert.equal(validation.checks.contentCertificationBlocked, true);
});

test('average-student walkthrough is exact and UI/Playwright remain scoped ➖, not conformity passes', () => {
  assert.equal(validation.checks.studentWalkthroughCoverageComplete, true);
  assert.equal(validation.studentWalkthrough.passagesCovered, 3);
  assert.equal(validation.studentWalkthrough.questionsCovered, 19);
  assert.equal(validation.applicability.cognitiveWalkthrough, 'applicable-to-content-only');
  assert.equal(validation.applicability.uiUxAccessibility, 'not-applicable-to-unchanged-runtime-conformance');
  assert.equal(validation.applicability.playwright, 'not-applicable-scoped-learner-runtime-unchanged');
  assert.equal(validation.scope.parentF02bRemainsOpen, true);
  assert.equal(validation.runtime.accessibilityObservations.unnamedSelects, 19);
  assert.equal(validation.runtime.accessibilityObservations.feedbackHasAriaLive, false);
});

test('English and Spanish feature-letter assignment leaks fail closed', () => {
  assert.deepEqual(
    findFeatureAssignmentLeaks({ instruction: 'Choose feature B for mf-memory-01' }),
    ['$.instruction'],
  );
  assert.deepEqual(
    findFeatureAssignmentLeaks({ repairAction: 'mf-memory-01 corresponde a la feature B' }),
    ['$.repairAction'],
  );
  assert.deepEqual(
    findFeatureAssignmentLeaks({ questionId: 'mf-memory-01', repairAction: 'Choose feature B.' }),
    ['$.repairAction'],
  );
  assert.deepEqual(
    findFeatureAssignmentLeaks({ questionId: 'mf-transport-01', repairAction: 'La respuesta corresponde a la letra C.' }),
    ['$.repairAction'],
  );
  assert.deepEqual(
    findFeatureAssignmentLeaks({ questionId: 'mf-urban-farming-01', repairAction: 'B is the right choice.' }),
    ['$.repairAction'],
  );
  assert.deepEqual(
    findFeatureAssignmentLeaks({ questionId: 'mf-transport-02', repairAction: 'Respuesta: D.' }),
    ['$.repairAction'],
  );
  for (const leak of [
    'Match this statement with D.',
    'Assign letter C.',
    'This maps to B.',
    'It corresponds to option C.',
    'La opción correcta es B.',
    'Empareja con D.',
    'La correcta es A.',
    'Asignación: C.',
    'The answer should be C.',
    'The correct one is B.',
    'Pair it with D.',
    'Associate the statement with B.',
    'La respuesta debe ser C.',
    'La letra debe ser B.',
    'Asocia con D.',
    'Debes marcar D.',
    'Go with C.',
    'Va con C.',
    'Pon D.',
    'The label should be C.',
    'The key is C.',
    'The key should be C.',
    'This belongs under B.',
    'Link this item to A.',
    'La clave es C.',
    'Clave: C.',
    'Respuesta final: B.',
    'Opción elegida: C.',
    'Letra asignada: D.',
    'La indicada es A.',
    'Vincula este ítem con C.',
    'Una paráfrasis no anticipada termina en E.',
  ]) {
    assert.deepEqual(
      findFeatureAssignmentLeaks({ questionId: 'mf-memory-01', repairAction: leak }),
      ['$.repairAction'],
      leak,
    );
  }
  for (const leak of [
    { 'mf-memory-01-answer-B': true },
    { 'mf-memory-01-corresponde-a-B': true },
    { assignment_B_for_mf_memory_01: true },
    { asignacion_C_mf_transport_01: true },
    { questionId: 'mf-memory-01', selected: 'B' },
    { questionId: 'mf-memory-01', chosenOption: 'C' },
    { questionId: 'mf-memory-01', respuesta: 'D' },
    { questionId: 'mf-memory-01', details: { value: 'C' } },
    { questionId: 'mf-memory-01', repairAction: ['D'] },
    { questionId: 'mf-memory-01', nested: { opaque: 'Unknown relation E' } },
  ]) {
    assert.ok(findFeatureAssignmentLeaks(leak).length > 0, JSON.stringify(leak));
  }
  assert.deepEqual(findFeatureAssignmentLeaks('The answer is a single noun.'), []);
  assert.deepEqual(findFeatureAssignmentLeaks('The system may use a single technology.'), []);
  assert.equal(validation.checks.keyLikeValueLeakageMutationsDetected, true);
  assert.deepEqual(validation.negativeControl.englishImperativeLeakFindings, ['$.instruction']);
  assert.deepEqual(validation.negativeControl.spanishCorrespondenceLeakFindings, ['$.repairAction']);
});

test('adversarial rights basis and cardinality mutations fail closed', () => {
  const weakened = clone(validation.decisions[0]);
  weakened.rightsBasis = 'owned-original';
  weakened.disposition = 'eligible-for-editorial-review';
  weakened.eligibleForPublicationPipeline = true;
  assert.throws(() => assertDecisionQuarantined(weakened), /cuarentena exacta/u);

  const cardinalityFixture = buildBlindReviewPacket().records.map(record => ({
    assetId: record.assetId,
    features: record.features,
    decisions: record.statements.map(statement => ({ id: statement.questionId })),
  }));
  assert.equal(assertUnitCardinality(cardinalityFixture), true);
  cardinalityFixture[0].decisions.push({ id: 'mf-urban-farming-extra' });
  assert.throws(() => assertUnitCardinality(cardinalityFixture), /cardinalidad/u);
});

test('adversarial future timestamps, next-unit drift and walkthrough extra IDs fail closed', () => {
  assert.throws(
    () => assertNoFutureTimestamp('2999-01-01T00:00:00Z', 'future-control', Date.now()),
    /timestamp futuro/u,
  );
  assert.throws(
    () => assertNoFutureTimestamp('2026-02-31T00:00:00Z', 'invalid-calendar-control', Date.now()),
    /fecha calendárica inválida/u,
  );

  const baseline = readOutput('baseline.json');
  assert.equal(assertNextUnitPinned(baseline), true);
  const driftedBaseline = clone(baseline);
  const firstPath = Object.keys(driftedBaseline.nextUnitSourceSha256)[0];
  driftedBaseline.nextUnitSourceSha256[firstPath] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(driftedBaseline), /F0\.2b\.7/u);
  const driftedObjectBaseline = clone(baseline);
  driftedObjectBaseline.nextUnitObjectSha256['mse-microclimates'] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(driftedObjectBaseline), /F0\.2b\.7/u);

  const walkthrough = readOutput('student-walkthrough.json');
  assert.deepEqual(validateStudentWalkthroughDocument(walkthrough), {
    passagesCovered: 3,
    questionsCovered: 19,
  });
  const extraIdWalkthrough = clone(walkthrough);
  extraIdWalkthrough.records[0].questionWalkthrough.push({
    ...extraIdWalkthrough.records[0].questionWalkthrough[0],
    questionId: 'mf-urban-farming-extra',
  });
  assert.throws(
    () => validateStudentWalkthroughDocument(extraIdWalkthrough),
    /cardinalidad|IDs extra/u,
  );
});

test('chronology, final panel, report binding and advanced stop boundary validate', () => {
  assert.equal(validation.checks.chronologyIsMonotonicAndNotFutureDated, true);
  assert.equal(validation.checks.finalPanelVerdictsValidated, true);
  assert.equal(validation.checks.boardStateMatchesValidatedUnit, true);
  assert.equal(validation.checks.nextUnitAndParentRemainOpen, true);
  assert.match(validation.processLimitations.firstPassTrace, /not an external append-only witness/u);
  const reportArtifacts = validateFinalReportArtifacts(validation);
  assert.match(reportArtifacts.artifactSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportMarkdownSha256, /^[a-f0-9]{64}$/u);
  assert.match(reportArtifacts.reportHtmlSha256, /^[a-f0-9]{64}$/u);
  const loopDoc = readFileSync(new URL('docs/ielts-reading-loop.md', ROOT), 'utf8');
  assert.equal(assertBoardStopBoundary(loopDoc), true);
  const duplicatedNextRow = loopDoc +
    '\n| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |\n';
  assert.throws(() => assertBoardStopBoundary(duplicatedNextRow), /una sola fila F0\.2b\.9/u);
});

test('structural profile helper is deterministic for the current bank', () => {
  const first = buildStoredStructuralBiasProfile();
  const second = buildStoredStructuralBiasProfile();
  assert.deepEqual(JSON.parse(JSON.stringify(first)), JSON.parse(JSON.stringify(second)));
});
