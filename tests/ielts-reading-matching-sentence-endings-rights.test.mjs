import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import {
  assertBoardStopBoundary,
  assertDecisionQuarantined,
  assertNextUnitPinned,
  assertNoFutureTimestamp,
  assertUnitCardinality,
  buildBlindReviewPacket,
  buildConnectiveOnlyPacket,
  buildFactualSourceReviewPacket,
  buildStoredStructuralBiasProfile,
  buildSurfaceOnlyPacket,
  buildValidationArtifacts,
  findSentenceEndingAssignmentLeaks,
  validateFinalReportArtifacts,
  validateStudentWalkthroughDocument,
} from '../scripts/check-ielts-reading-matching-sentence-endings-rights.mjs';

const ROOT = new URL('../', import.meta.url);
const OUTPUT = new URL(
  'output/audits/ielts-reading-rights-matching-sentence-endings-2026-08-09/',
  ROOT,
);
const readOutput = name => JSON.parse(readFileSync(new URL(name, OUTPUT), 'utf8'));
const clone = value => JSON.parse(JSON.stringify(value));
const requiredFinalFiles = [
  'connective-only.json', 'connective-only-verdict.json', 'surface-only.json',
  'surface-only-verdict.json', 'blind-review.json', 'factual-source-review.json',
  'expert-first-pass.json', 'expert-verdict.json', 'student-walkthrough.json',
  'validation.json', 'audit-verdicts.json', 'build-report.mjs', 'artifact.json',
  'report.md', 'report.html', 'report-verification.json',
];
const finalPackageExists = requiredFinalFiles.every(name => existsSync(new URL(name, OUTPUT)));

test('F0.2b.7 packets expose exactly 3 passages, 18 starts and 24 endings without editorial fields', () => {
  const packets = [
    buildConnectiveOnlyPacket(),
    buildSurfaceOnlyPacket(),
    buildBlindReviewPacket(),
    buildFactualSourceReviewPacket(),
  ];
  assert.ok(packets.every(packet => packet.records.length === 3));
  const connective = packets[0];
  const surface = packets[1];
  const blind = packets[2];
  assert.equal(connective.records.reduce((sum, row) => sum + row.sentenceStarts.length, 0), 18);
  assert.equal(connective.records.reduce((sum, row) => sum + row.endingConnectives.length, 0), 24);
  assert.equal(surface.records.reduce((sum, row) => sum + row.sentenceStarts.length, 0), 18);
  assert.equal(surface.records.reduce((sum, row) => sum + row.endingOptions.length, 0), 24);
  assert.equal(blind.records.reduce((sum, row) => sum + row.sentenceStarts.length, 0), 18);
  assert.equal(blind.records.reduce((sum, row) => sum + row.endingOptions.length, 0), 24);
  const serialized = JSON.stringify(packets);
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"trap"\s*:/iu);
  assert.doesNotMatch(serialized, /"selectedEndingId"\s*:/iu);
});

test('stored anti-bias profile freezes position, order, lexical, length, connector and reuse risks', () => {
  const profile = buildStoredStructuralBiasProfile();
  assert.deepEqual(profile.answerCounts, { A: 3, B: 2, C: 2, D: 2, E: 3, F: 1, G: 2, H: 3 });
  assert.equal(profile.globalConcatenatedMaxSameLabelRun, 1);
  assert.equal(profile.perSetMaxSameLabelRun, 1);
  assert.equal(profile.setsWithStrictlyAscendingStoredSelectionOrder, 3);
  assert.deepEqual(profile.sameQuestionPositionAcrossSetsModalEnding,
    { eligible: 18, positions: 6, hits: 15 });
  assert.equal(profile.questionPositionModuloEndingCount.eligible, 18);
  assert.equal(profile.questionPositionModuloEndingCount.hits, 6);
  assert.equal(profile.highestSentenceStartEndingLexicalOverlapPredictsAnswer.eligible, 9);
  assert.equal(profile.highestSentenceStartEndingLexicalOverlapPredictsAnswer.hits, 2);
  assert.equal(profile.highestSentenceStartEndingLexicalOverlapPredictsAnswer.tiesOrAbstentions, 9);
  assert.equal(profile.longestEndingWordCountPredictsAnswer.eligible, 12);
  assert.equal(profile.longestEndingWordCountPredictsAnswer.hits, 2);
  assert.equal(profile.longestEndingWordCountPredictsAnswer.tiesOrAbstentions, 6);
  assert.deepEqual(profile.visibleConnectiveProfile.endingCandidateCounts, {
    although: 1, as: 1, because: 9, before: 1, by: 3, if: 1,
    'only when': 3, unless: 1, when: 3, without: 1,
  });
  assert.deepEqual(clone(profile.storedSelectionReuse), {
    declaredReusePolicy: 'not-declared',
    setsWithReuse: 0,
    reusedAssignments: 0,
    usedEndingsPerSet: [6, 6, 6],
    unusedEndingsPerSet: [2, 2, 2],
  });
  assert.equal(readOutput('baseline.json').structuralRisk.preResponseTrapExposure
    .questionsWhoseTrapNamesAnEndingLetter, 8);
});

test('English, Spanish and nested question-to-ending leaks fail closed', () => {
  const cases = [
    [{ instruction: 'Choose ending C for mse-microclimates-02' }, '$.instruction'],
    [{ instruction: 'Correct letter for mse-libraries-05 is G' }, '$.instruction'],
    [{ repairAction: 'mse-food-waste-03 corresponde al final D' }, '$.repairAction'],
    [{ repairAction: 'Elige la letra H para mse-food-waste-06' }, '$.repairAction'],
    [{ nested: [{ instruction: 'Choose ending B for mse-food-waste-01' }] },
      '$.nested[0].instruction'],
    [{ repairAction: 'The complete sentence for mse-food-waste-02 is complete text.' },
      '$.repairAction'],
    [{ repairAction: 'La oración completa de mse-food-waste-02 es texto completo.' },
      '$.repairAction'],
    [{ questionId: 'mse-food-waste-02', selectedEndingId: 'B' }, '$.selectedEndingId'],
    [{ questionId: 'mse-food-waste-02', nested: { correctEndingId: 'B' } },
      '$.nested.correctEndingId'],
    [{ assignments: { 'mse-food-waste-03': 'D' } }, '$.assignments.mse-food-waste-03'],
    [{ questionId: 'mse-food-waste-03', verdict: 'D' }, '$.verdict'],
    [{ questionId: 'mse-food-waste-03', note: 'La respuesta corresponde a la letra D.' },
      '$.note'],
    [{ instruction: 'choose ending d' }, '$.instruction'],
    [{ instruction: 'elige la letra d' }, '$.instruction'],
    [{ assignments: { 'mse-food-waste-03': 'd' } }, '$.assignments.mse-food-waste-03'],
    [{ questionId: 'mse-food-waste-03', answer: 'd' }, '$.answer'],
    [{ questionId: 'mse-food-waste-03', result: 'D' }, '$.result'],
    [{ questionId: 'mse-food-waste-03', answer: 'D.' }, '$.answer'],
    [{ questionId: 'mse-food-waste-03', deep: { result: 'D' } }, '$.deep.result'],
    [{ instruction: 'La respuesta de mse-food-waste-03 es D.' }, '$.instruction'],
    [{ instruction: 'Pair mse-food-waste-03 with D.' }, '$.instruction'],
    [{ instruction: 'mse-food-waste-03 takes D.' }, '$.instruction'],
    [{ instruction: 'mse-food-waste-03 va con D.' }, '$.instruction'],
    [{ instruction: 'Pon D en mse-food-waste-03.' }, '$.instruction'],
    [{ assignments: { 'mse-food-waste-03': 'D,' } }, '$.assignments.mse-food-waste-03'],
    [{ questionId: 'mse-food-waste-03', result: '(D)' }, '$.result'],
    [{ questionId: 'mse-food-waste-03', note: 'letter D' }, '$.note'],
    [{ instruction: 'Match mse-food-waste-03 to D.' }, '$.instruction'],
    [{ instruction: 'Link mse-food-waste-03 with D.' }, '$.instruction'],
    [{ instruction: 'mse-food-waste-03 pairs with D.' }, '$.instruction'],
    [{ instruction: 'Set mse-food-waste-03 to D.' }, '$.instruction'],
    [{ instruction: 'Go with D for mse-food-waste-03.' }, '$.instruction'],
    [{ instruction: 'Asigna D a mse-food-waste-03.' }, '$.instruction'],
    [{ instruction: 'Une mse-food-waste-03 con D.' }, '$.instruction'],
    [{ instruction: 'mse-food-waste-03 = d' }, '$.instruction'],
    [{ questionId: 'mse-food-waste-03', result: ['D'] }, '$.result[0]'],
    [{ questionId: 'mse-food-waste-03', deep: ['D.'] }, '$.deep[0]'],
    [{ assignments: { 'mse-food-waste-03': ['D'] } },
      '$.assignments.mse-food-waste-03[0]'],
    [{ questionId: 'mse-food-waste-03', answer: ['a'] }, '$.answer[0]'],
  ];
  for (const [fixture, expectedPath] of cases) {
    assert.deepEqual(findSentenceEndingAssignmentLeaks(fixture), [expectedPath],
      JSON.stringify(fixture));
  }
});

test('leak detector avoids false positives for task rules and sibling option inventories', () => {
  const legitimate = {
    taskRule: 'Choose one ending for every sentence start; there are more endings than starts.',
    records: [{
      assetId: 'formative:matching-sentence-endings:mse-microclimates',
      endingOptions: [
        { endingId: 'A', text: 'because local conditions differ.' },
        { endingId: 'B', text: 'by reducing stored heat.' },
      ],
      sentenceStarts: [
        { questionId: 'mse-microclimates-01', sentenceStart: 'Urban heat varies' },
      ],
    }],
  };
  assert.deepEqual(findSentenceEndingAssignmentLeaks(legitimate), []);
  assert.deepEqual(findSentenceEndingAssignmentLeaks('The answer is an ending, not a single word.'), []);
  assert.deepEqual(findSentenceEndingAssignmentLeaks('Option B is a visible distractor label.'), []);
  assert.deepEqual(findSentenceEndingAssignmentLeaks('Choose a single ending.'), []);
  assert.deepEqual(findSentenceEndingAssignmentLeaks({
    questionId: 'mse-food-waste-03', note: 'a',
  }), []);
});

test('rights-basis and cardinality adversarial mutations fail closed', () => {
  const quarantined = {
    rightsBasis: 'unknown-quarantined',
    disposition: 'quarantine',
    eligibleForPublicationPipeline: false,
    reasonCodes: ['authorship-unresolved', 'factual-review-incomplete',
      'human-review-pending', 'rights-unresolved'],
  };
  assert.equal(assertDecisionQuarantined(quarantined), true);
  const weakened = clone(quarantined);
  weakened.rightsBasis = 'owned-original';
  weakened.disposition = 'eligible-for-editorial-review';
  weakened.eligibleForPublicationPipeline = true;
  assert.throws(() => assertDecisionQuarantined(weakened), /cuarentena exacta/u);

  const fixture = buildBlindReviewPacket().records.map(record => ({
    assetId: record.assetId,
    endings: record.endingOptions.map(ending => ({ id: ending.endingId })),
    decisions: record.sentenceStarts.map(row => ({ id: row.questionId })),
  }));
  assert.equal(assertUnitCardinality(fixture), true);
  fixture[0].decisions.push({ id: 'mse-microclimates-extra' });
  assert.throws(() => assertUnitCardinality(fixture), /cardinalidad/u);
});

test('future dates and F0.2b.8 source/object drift fail closed', () => {
  assert.throws(
    () => assertNoFutureTimestamp('2999-01-01T00:00:00Z', 'future', Date.now()),
    /timestamp futuro/u,
  );
  const fixedNow = Date.parse('2026-08-09T15:00:00Z');
  assert.throws(
    () => assertNoFutureTimestamp('2026-08-09T15:04:59.999Z', 'clock-skew', fixedNow),
    /timestamp futuro/u,
  );
  assert.throws(
    () => assertNoFutureTimestamp('2026-02-31T00:00:00Z', 'calendar', Date.now()),
    /fecha calendárica inválida/u,
  );
  const baseline = readOutput('baseline.json');
  assert.equal(assertNextUnitPinned(baseline), true);
  const sourceDrift = clone(baseline);
  const firstPath = Object.keys(sourceDrift.nextUnit.sourceSha256)[0];
  sourceDrift.nextUnit.sourceSha256[firstPath] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(sourceDrift), /F0\.2b\.8/u);
  const objectDrift = clone(baseline);
  objectDrift.nextUnit.sourceObjectSha256['sentence-wetland-parks'] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(objectDrift), /F0\.2b\.8/u);
});

test('board boundary requires unique F0.2b.7 closure, open parent/next and one stop', () => {
  const valid = [
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |',
    '| 0 | 　　　 ↳ F0.2b.6 Matching Features | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.7 Matching Sentence Endings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |',
    'Siguiente subunidad, sin iniciarla: `F0.2b.9 Summary Completion`.',
  ].join('\n');
  assert.equal(assertBoardStopBoundary(valid), true);
  assert.throws(() => assertBoardStopBoundary(`${valid}\n${valid.split('\n')[2]}`),
    /una sola fila/u);
  assert.throws(() => assertBoardStopBoundary(valid.replace('— | — | —', '✅ | — | —')),
    /una sola fila/u);
  assert.throws(() => assertBoardStopBoundary(`${valid}\nF0.2b.9 Summary Completion started`),
    /contradictoria/u);
});

test('complete output package enforces verdict, walkthrough, report binding and extra-ID guards',
  { skip: !finalPackageExists }, () => {
    const { validation, connectivePacket, surfacePacket, blindPacket, factualPacket } =
      buildValidationArtifacts();
    assert.equal(validation.scope.passages, 3);
    assert.equal(validation.scope.questions, 18);
    assert.equal(validation.scope.endingCandidates, 24);
    assert.equal(validation.checks.expertAgreementEighteenOfEighteen, true);
    assert.equal(validation.checks.exactOneBestAnswerContractEnforced, true);
    assert.equal(validation.checks.passageOrderViolationDetected, true);
    assert.deepEqual(validation.expertReview.passageOrderViolationQuestionIds,
      ['mse-food-waste-06', 'mse-libraries-06']);
    assert.equal(validation.checks.factualClaimsFifteenExact, true);
    assert.equal(validation.checks.walkthroughThreeByEighteenExact, true);
    assert.equal(validation.checks.contentCertificationBlocked, true);
    assert.equal(validation.antiBias.statisticalCertification, 'withheld-n-below-100');
    assert.equal(validation.runtime.classification,
      'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation');
    assert.equal(connectivePacket.records.length, 3);
    assert.equal(surfacePacket.records.length, 3);
    assert.equal(blindPacket.records.length, 3);
    assert.equal(factualPacket.records.reduce((sum, row) =>
      sum + row.candidateSources.length, 0), 15);
    for (const decision of validation.decisions) assert.equal(assertDecisionQuarantined(decision), true);
    const walkthrough = readOutput('student-walkthrough.json');
    assert.deepEqual(validateStudentWalkthroughDocument(walkthrough), {
      passagesCovered: 3,
      questionsCovered: 18,
    });
    const extraQuestion = clone(walkthrough);
    extraQuestion.records[0].questionWalkthrough.push({
      ...extraQuestion.records[0].questionWalkthrough[0],
      questionId: 'mse-microclimates-extra',
    });
    assert.throws(() => validateStudentWalkthroughDocument(extraQuestion),
      /cardinalidad|IDs extra/u);
    const extraAsset = clone(walkthrough);
    extraAsset.records.push({ ...extraAsset.records[0], assetId: 'mse-extra' });
    assert.throws(() => validateStudentWalkthroughDocument(extraAsset),
      /cardinalidad|IDs extra/u);
    const bindings = validateFinalReportArtifacts(validation);
    assert.match(bindings.validationSha256, /^[a-f0-9]{64}$/u);
    assert.match(bindings.reportHtmlSha256, /^[a-f0-9]{64}$/u);
  });
