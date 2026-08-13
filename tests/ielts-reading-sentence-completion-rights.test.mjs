import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import {
  REQUIRED_FACTUAL_CLAIM_SPANS,
  REQUIRED_FACTUAL_SOURCE_IDS,
  assertBoardStopBoundary,
  assertDecisionQuarantined,
  assertExactPassageSpan,
  assertNextUnitPinned,
  assertNoFutureTimestamp,
  assertUnitCardinality,
  buildAcceptedAnswerInventory,
  buildBlindReviewPacket,
  buildFactualSourceReviewPacketFromRegistry,
  buildPromptOnlyPacket,
  buildStoredStructuralRiskProfile,
  buildValidationArtifacts,
  expectedNextUnitPin,
  findSentenceCompletionAssignmentLeaks,
  normalizeRuntimeAnswer,
  parseWordLimit,
  runtimeWordCount,
  validateAcceptedAnswerAssessmentsDocument,
  validateChronology,
  validateFinalReportArtifacts,
  validateStudentWalkthroughDocument,
} from '../scripts/check-ielts-reading-sentence-completion-rights.mjs';

const ROOT = new URL('../', import.meta.url);
const OUTPUT = new URL(
  'output/audits/ielts-reading-rights-sentence-completion-2026-08-09/',
  ROOT,
);
const clone = value => JSON.parse(JSON.stringify(value));
const formattedJsonSha256 = value => createHash('sha256')
  .update(`${JSON.stringify(value, null, 2)}\n`).digest('hex');
const syntheticPrerequisiteHashes = {
  promptOnlyVerdict: 'a'.repeat(64),
  expertFirstPass: 'b'.repeat(64),
};
const requiredFinalFiles = [
  'baseline.json', 'source-availability.json', 'provenance-search.json',
  'unit-change-manifest.json', 'prompt-only.json', 'prompt-only-verdict.json',
  'blind-review.json', 'factual-source-review.json', 'expert-first-pass.json',
  'expert-verdict.json', 'student-walkthrough.json', 'validation.json',
  'audit-verdicts.json', 'build-report.mjs', 'artifact.json', 'report.md',
  'report.html', 'report-verification.json',
];
const finalPackageExists = requiredFinalFiles.every(name => existsSync(new URL(name, OUTPUT)));

function syntheticRegistry() {
  const evidence = [
    {
      id: 'ielts-sentence-completion-official-format',
      kind: 'official-policy',
      label: 'Official format',
      url: 'https://ielts.org/format',
      accessedAt: '2026-08-09',
      note: 'Candidate policy evidence only.',
    },
    {
      id: 'ielts-british-american-spelling-policy',
      kind: 'official-policy',
      label: 'Official spelling policy',
      url: 'https://ielts.org/spelling',
      accessedAt: '2026-08-09',
      note: 'Candidate policy evidence only.',
    },
    ...Object.values(REQUIRED_FACTUAL_SOURCE_IDS).flat().map(id => ({
      id,
      kind: 'factual-source',
      label: `Candidate ${id}`,
      url: `https://example.test/${id}`,
      accessedAt: '2026-08-09',
      note: 'Availability is not claim verification.',
    })),
  ];
  return {
    schemaVersion: 'ielts-academic-reading-rights-registry.v2',
    policyVersion: '2026-08-09.v8',
    module: 'academic',
    evidence,
    entries: Object.entries(REQUIRED_FACTUAL_SOURCE_IDS).map(([assetId, sourceEvidenceIds]) => ({
      assetId,
      factualSourceResearch: {
        status: 'candidate-sources-collected',
        sourceEvidenceIds: [...sourceEvidenceIds],
        limitation: 'Candidate sources do not verify claims.',
      },
    })),
  };
}

function acceptedAssessmentFixture() {
  return buildAcceptedAnswerInventory().map(row => ({
    questionId: row.questionId,
    acceptedText: row.acceptedText,
    normalizedText: row.normalizedText,
    role: row.role,
    passageStatus: row.role === 'canonical' ? 'verbatim' :
      row.questionId === 'sentence-makerspaces-01' ? 'normalized-duplicate' :
        'official-spelling-variant',
    wordCount: runtimeWordCount(row.acceptedText),
    grammaticalFit: 'natural',
    evidenceIds: row.questionId === 'sentence-night-markets-01' &&
      row.role === 'alternative' ? ['ielts-british-american-spelling-policy'] : [],
    note: 'Explicit accepted-entry assessment.',
  }));
}

function walkthroughFixture() {
  const blind = buildBlindReviewPacket();
  return {
    schemaVersion: 'ielts-reading-sentence-completion-student-walkthrough.v1',
    reviewer: {
      humanSignature: false,
      sourceContext: 'blind-review-packet-only',
      reviewedAt: '2026-08-09T16:34:01Z',
      blindPacketSha256: formattedJsonSha256(blind),
      notes: ['Synthetic schema fixture; no answer adjudication.'],
    },
    records: blind.records.map(record => ({
      assetId: record.assetId,
      passageBarrier: 'Locate the relevant passage section before considering grammar.',
      wordLimitRisk: 'medium',
      promptCueRisk: 'medium',
      hintCueRisk: 'high',
      shortcutRisks: ['sentence-frame guessing', 'answer-length guessing'],
      transferValue: 'Use passage evidence before completing the frame.',
      nextAction: 'Find a literal span and compare a plausible competitor.',
      questionWalkthrough: record.questions.map(question => ({
        questionId: question.questionId,
        likelyMisread: 'A paraphrase may be mistaken for a literal span.',
        predictedGrammarCategory: 'Infer the missing grammatical category.',
        wordLimitCheck: 'Count whitespace-delimited words; a hyphenated form counts as one.',
        promptOnlyGuessRisk: 'Do not treat a natural phrase as passage evidence.',
        evidenceSearch: 'Search the relevant passage section in question order.',
        passageSpanCheck: 'Require a contiguous one- or two-word passage span.',
        grammarRecheck: 'Read the completed frame for grammatical fit.',
        spellingCheck: 'Copy spelling from the passage and flag policy variants.',
        competitorCheck: 'Compare the closest plausible passage span.',
        decisionRule: 'Choose only when textual support makes one span best.',
        repairAction: 'Return to the passage if more than one span remains plausible.',
      })),
    })),
  };
}

test('F0.2b.8 prompt-only and blind packets freeze 3/18 and expose no editorial fields', () => {
  const prompt = buildPromptOnlyPacket();
  const blind = buildBlindReviewPacket();
  assert.equal(prompt.records.length, 3);
  assert.equal(blind.records.length, 3);
  assert.equal(prompt.records.reduce((sum, row) => sum + row.sentenceFrames.length, 0), 18);
  assert.equal(blind.records.reduce((sum, row) => sum + row.questions.length, 0), 18);
  assert.ok(prompt.records.every(row => row.maxWords === 2 &&
    row.wordLimit === 'NO MORE THAN TWO WORDS'));
  assert.ok(blind.records.every(row => row.maxWords === 2 &&
    row.wordLimit === 'NO MORE THAN TWO WORDS'));
  assert.deepEqual(clone(blind.records.map(row => row.passageSha256)), [
    'f1f74d465074ba9570c9c4cbb381538a4b0f38c16251930c4d90f2126d14e1a8',
    'e13b68261fc5b2e3c3488ffbb2f920710954d7959d744d0deb24b572edd7b5db',
    '612893d0f0aabbd88a9b75699523b67530744c3402dfe051e0f4197d7657ff1c',
  ]);
  const serialized = JSON.stringify([prompt, blind]);
  assert.doesNotMatch(serialized, /"answer"\s*:/iu);
  assert.doesNotMatch(serialized, /"alternatives"\s*:/iu);
  assert.doesNotMatch(serialized, /"explanation"\s*:/iu);
  assert.doesNotMatch(serialized, /"hint"\s*:/iu);
  assert.doesNotMatch(serialized, /"selectedAnswer"\s*:/iu);
});

test('factual packet freezes 15 claim spans and source IDs one-to-one under policy v8', () => {
  const packet = buildFactualSourceReviewPacketFromRegistry(
    syntheticRegistry(), syntheticPrerequisiteHashes);
  assert.equal(packet.records.length, 3);
  assert.equal(packet.records.reduce((sum, row) => sum + row.claimSpansToReview.length, 0), 15);
  assert.equal(packet.records.reduce((sum, row) => sum + row.candidateSources.length, 0), 15);
  for (const row of packet.records) {
    assert.deepEqual(clone(row.claimSpansToReview),
      clone(REQUIRED_FACTUAL_CLAIM_SPANS[row.assetId]));
    assert.deepEqual(clone(row.candidateSources.map(source => source.evidenceId)),
      clone(REQUIRED_FACTUAL_SOURCE_IDS[row.assetId]));
    const passage = buildBlindReviewPacket().records.find(record =>
      record.assetId === row.assetId).passage;
    assert.ok(row.claimSpansToReview.every(claim => passage.includes(claim)));
  }
  const wrongPolicy = syntheticRegistry();
  wrongPolicy.policyVersion = '2026-08-09.v7';
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(
    wrongPolicy, syntheticPrerequisiteHashes), /policy v8/u);
  const wrongMapping = syntheticRegistry();
  wrongMapping.entries[0].factualSourceResearch.sourceEvidenceIds.reverse();
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(
    wrongMapping, syntheticPrerequisiteHashes),
    /cinco fuentes factuales/u);
  const duplicateEvidence = syntheticRegistry();
  duplicateEvidence.evidence.push({
    ...duplicateEvidence.evidence[2],
    url: 'https://example.test/shadow-source',
  });
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(
    duplicateEvidence, syntheticPrerequisiteHashes),
    /evidence IDs únicos/u);
  const blankLimitation = syntheticRegistry();
  blankLimitation.entries[0].factualSourceResearch.limitation = '   ';
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(
    blankLimitation, syntheticPrerequisiteHashes), /cinco fuentes factuales/u);
  const invalidSource = syntheticRegistry();
  invalidSource.evidence[2].url = 'http://example.test/insecure';
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(
    invalidSource, syntheticPrerequisiteHashes), /fuente factual inválida/u);
});

test('runtime normalization, word counting and accepted inventory are exact', () => {
  assert.equal(normalizeRuntimeAnswer('  3D   printers. '), '3d printers');
  assert.equal(normalizeRuntimeAnswer('SHOPPING CENTER!'), 'shopping center');
  assert.equal(normalizeRuntimeAnswer('long-term success'), 'long-term success');
  assert.equal(runtimeWordCount('long-term success'), 2);
  assert.equal(runtimeWordCount('the concrete channels'), 3);
  assert.doesNotThrow(() => assertExactPassageSpan(
    { text: 'storing', start: 0, end: 7 }, 'storing information', 'storing', 2, 'full'));
  assert.throws(() => assertExactPassageSpan(
    { text: 't', start: 1, end: 2 }, 'storing information', 't', 2, 'partial'),
  /literal, contiguo/u);
  assert.equal(parseWordLimit('NO MORE THAN TWO WORDS'), 2);
  assert.throws(() => parseWordLimit('ABOUT TWO WORDS'), /no soportado/u);
  const inventory = buildAcceptedAnswerInventory();
  assert.equal(inventory.length, 20);
  assert.equal(new Set(inventory.map(row => row.normalizedText)).size, 19);
  assert.deepEqual(clone(inventory.filter(row => row.role === 'alternative').map(row => ({
    questionId: row.questionId, acceptedText: row.acceptedText,
  }))), [
    { questionId: 'sentence-makerspaces-01', acceptedText: '3d printers' },
    { questionId: 'sentence-night-markets-01', acceptedText: 'shopping center' },
  ]);
});

test('stored anti-shortcut profile freezes length, position, overlap, order and hint exposure', () => {
  const risk = buildStoredStructuralRiskProfile();
  assert.deepEqual(risk.canonicalAnswerWordCountDistribution,
    { oneWord: 5, twoWords: 13, overLimit: 0 });
  assert.deepEqual(risk.alwaysTwoWordAnswerPredictor,
    { eligible: 18, tiesOrAbstentions: 0, hits: 13 });
  assert.deepEqual(risk.sameQuestionPositionAcrossSetsModalAnswerWordCount,
    { eligible: 18, positions: 6, tiesOrAbstentions: 0, hits: 14 });
  assert.deepEqual(clone(risk.canonicalAnswerTokenVisibleInSentenceFrame),
    { questionsWithOverlap: 1, questionIds: ['sentence-makerspaces-05'] });
  assert.deepEqual(clone(risk.passageTitleAnswerTokenOverlap),
    { questionsWithOverlap: 0, questionIds: [] });
  assert.equal(risk.canonicalAnswerOccurrenceInOwnPassage.exactlyOnce, 18);
  assert.equal(risk.setsWithStrictlyAscendingCanonicalEvidenceOrder, 3);
  assert.deepEqual(risk.passageOrderViolationQuestionIds, []);
  assert.deepEqual(clone(risk.normalizedDuplicateAlternativeQuestionIds),
    ['sentence-makerspaces-01']);
  assert.deepEqual(clone(risk.nonVerbatimAcceptedAlternativeQuestionIds),
    ['sentence-night-markets-01']);
  assert.deepEqual(clone(risk.crossQuestionNormalizedAnswerCollisions), []);
  assert.deepEqual(clone(risk.preResponseHintExposure), {
    questionsWithVisibleHintControl: 18,
    hintsContainingNormalizedAcceptedAnswer: 0,
    hintsNamingPassageLocationOrAnchor: 17,
    semanticParaphraseOnlyHintQuestionIds: ['sentence-wetlands-05'],
  });
  assert.equal(risk.statisticalCertification.eligible, false);
});

test('English, Spanish and nested question-to-answer leaks fail closed', () => {
  const cases = [
    [{ instruction: 'Answer for sentence-wetlands-01 is concrete channels' }, '$.instruction'],
    [{ instruction: 'Complete sentence-makerspaces-02 with storing' }, '$.instruction'],
    [{ instruction: 'Use shopping centre for sentence-night-markets-01' }, '$.instruction'],
    [{ instruction: 'Write shopping center for sentence-night-markets-01' }, '$.instruction'],
    [{ repair: 'sentence-wetlands-02 se completa con underground pipes' }, '$.repair'],
    [{ repair: 'La respuesta de sentence-night-markets-05 es longer' }, '$.repair'],
    [{ repair: 'Escribe public role para sentence-makerspaces-06' }, '$.repair'],
    [{ nested: [{ instruction: 'sentence-makerspaces-03 corresponde a first projects' }] },
      '$.nested[0].instruction'],
    [{ questionId: 'sentence-makerspaces-01', selectedAnswer: '3D printers' },
      '$.selectedAnswer'],
    [{ questionId: 'sentence-makerspaces-01', review: { selectedAnswer: '3d printers' } },
      '$.review.selectedAnswer'],
    [{ questionId: 'sentence-night-markets-06', nested: { answer: 'long-term success' } },
      '$.nested.answer'],
    [{ 'sentence-wetlands-05': 'water flow' }, '$.sentence-wetlands-05'],
    [{ questionId: 'sentence-wetlands-03', completedSentence: 'Any completed text' },
      '$.completedSentence'],
    [{ questionId: 'sentence-makerspaces-02', note: 'Choose storing.' }, '$.note'],
    [{ questionId: 'sentence-wetlands-02', note: 'Selecciona underground pipes.' }, '$.note'],
    [{ questionId: 'sentence-night-markets-05', note: 'Pick longer.' }, '$.note'],
    [{ questionId: 'sentence-makerspaces-06', note: 'The target wording remains public role.' },
      '$.note'],
  ];
  for (const [fixture, expectedPath] of cases) {
    assert.deepEqual(findSentenceCompletionAssignmentLeaks(fixture), [expectedPath],
      JSON.stringify(fixture));
  }
});

test('leak detector avoids task-rule, passage and non-assignment false positives', () => {
  assert.deepEqual(findSentenceCompletionAssignmentLeaks(
    'Answer using no more than two words.'), []);
  assert.deepEqual(findSentenceCompletionAssignmentLeaks(
    'British or American spelling may be accepted.'), []);
  assert.deepEqual(findSentenceCompletionAssignmentLeaks({
    questionId: 'sentence-makerspaces-02',
    note: 'The passage discusses archival information.',
  }), []);
  assert.deepEqual(findSentenceCompletionAssignmentLeaks(buildBlindReviewPacket()), []);
  assert.deepEqual(findSentenceCompletionAssignmentLeaks({
    taskRule: 'Complete every sentence using one or two words from the passage.',
    questions: [{
      questionId: 'sentence-wetlands-01',
      before: 'Wetland parks send water through ',
      after: '.',
    }],
  }), []);
});

test('accepted-answer gate rejects missing policy evidence, wrong duplicate status and over-limit drift', () => {
  const fixture = acceptedAssessmentFixture();
  assert.equal(validateAcceptedAnswerAssessmentsDocument(fixture), 20);
  const missingPolicy = clone(fixture);
  missingPolicy.find(row => row.questionId === 'sentence-night-markets-01' &&
    row.role === 'alternative').evidenceIds = [];
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(missingPolicy),
    /spelling/u);
  const duplicateStatus = clone(fixture);
  duplicateStatus.find(row => row.questionId === 'sentence-makerspaces-01' &&
    row.role === 'alternative').passageStatus = 'verbatim';
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(duplicateStatus),
    /duplicate normalizado/u);
  const overLimit = clone(fixture);
  overLimit[0].acceptedText = 'the concrete channels';
  overLimit[0].normalizedText = 'the concrete channels';
  overLimit[0].wordCount = 3;
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(overLimit),
    /entradas extra|wordCount|cardinalidad/u);
  const fabricatedEvidence = clone(fixture);
  fabricatedEvidence[0].evidenceIds = ['fabricated-source-id'];
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(fabricatedEvidence),
    /respuesta canónica|assessment inválido/u);
});

test('chronology is strictly monotonic from baseline through audit', () => {
  const fixture = {
    baseline: { capturedAt: '2026-08-09T16:20:00Z' },
    sourceAvailability: {
      retrievalStartedAt: '2026-08-09T16:21:00Z',
      sources: [{ evidenceId: 'source-1', retrievedAt: '2026-08-09T16:21:30Z' }],
    },
    provenanceSearch: { searchedAt: '2026-08-09T16:22:00Z' },
    unitChangeManifest: { recordedAt: '2026-08-09T16:23:00Z' },
    unitRecords: [{
      assetId: 'asset-1',
      automatedTriage: { assessedAt: '2026-08-09T16:24:00Z' },
    }],
    promptOnlyVerdict: { reviewer: { reviewedAt: '2026-08-09T16:37:00Z' } },
    firstPass: { reviewer: { reviewedAt: '2026-08-09T16:38:00Z' } },
    walkthrough: { reviewer: { reviewedAt: '2026-08-09T16:52:00Z' } },
    expertVerdict: { reviewer: { reviewedAt: '2026-08-09T16:53:30Z' } },
    audit: { reviewedAt: '2026-08-09T16:54:00Z' },
  };
  assert.doesNotThrow(() => validateChronology(fixture));
  const reversedSearch = clone(fixture);
  reversedSearch.provenanceSearch.searchedAt = '2026-08-09T16:20:30Z';
  assert.throws(() => validateChronology(reversedSearch), /no monotónica/u);
  const earlyTriage = clone(fixture);
  earlyTriage.unitRecords[0].automatedTriage.assessedAt = '2026-08-09T16:22:30Z';
  assert.throws(() => validateChronology(earlyTriage), /no monotónica/u);
});

test('rights basis, cardinality, future timestamps and next-unit drift fail closed', () => {
  const quarantined = {
    rightsBasis: 'unknown-quarantined',
    disposition: 'quarantine',
    eligibleForPublicationPipeline: false,
    reasonCodes: ['authorship-unresolved', 'factual-review-incomplete',
      'human-review-pending', 'module-not-declared', 'rights-unresolved'],
  };
  assert.equal(assertDecisionQuarantined(quarantined), true);
  const weakened = clone(quarantined);
  weakened.rightsBasis = 'owned-original';
  weakened.disposition = 'eligible-for-editorial-review';
  weakened.eligibleForPublicationPipeline = true;
  assert.throws(() => assertDecisionQuarantined(weakened), /cuarentena exacta/u);
  const invalidTriage = clone(quarantined);
  invalidTriage.reasonCodes.splice(1, 0, 'automated-triage-invalid');
  assert.throws(() => assertDecisionQuarantined(invalidTriage), /cuarentena exacta/u);

  const assets = buildBlindReviewPacket().records;
  assert.equal(assertUnitCardinality(assets), true);
  const extra = clone(assets);
  extra[0].questions.push({ questionId: 'sentence-wetlands-extra' });
  assert.throws(() => assertUnitCardinality(extra), /cardinalidad/u);
  assert.throws(() => assertNoFutureTimestamp('2999-01-01T00:00:00Z'), /timestamp futuro/u);
  assert.throws(() => assertNoFutureTimestamp('2026-02-31T00:00:00Z'),
    /fecha calendárica inválida/u);

  const baseline = { nextUnit: expectedNextUnitPin() };
  assert.equal(assertNextUnitPinned(baseline), true);
  const sourceDrift = clone(baseline);
  const firstPath = Object.keys(sourceDrift.nextUnit.sourceSha256)[0];
  sourceDrift.nextUnit.sourceSha256[firstPath] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(sourceDrift), /F0\.2b\.9/u);
  const objectDrift = clone(baseline);
  objectDrift.nextUnit.sourceObjectSha256['summary-urban-farms'] = '0'.repeat(64);
  assert.throws(() => assertNextUnitPinned(objectDrift), /F0\.2b\.9/u);
});

test('walkthrough requires exact 3/18 coverage and rejects answer leaks or extra IDs', () => {
  const fixture = walkthroughFixture();
  assert.deepEqual(validateStudentWalkthroughDocument(fixture), {
    passagesCovered: 3,
    questionsCovered: 18,
  });
  const extraQuestion = clone(fixture);
  extraQuestion.records[0].questionWalkthrough.push({
    ...extraQuestion.records[0].questionWalkthrough[0],
    questionId: 'sentence-wetlands-extra',
  });
  assert.throws(() => validateStudentWalkthroughDocument(extraQuestion),
    /cardinalidad|IDs extra/u);
  const extraAsset = clone(fixture);
  extraAsset.records.push({ ...extraAsset.records[0], assetId: 'sentence-extra' });
  assert.throws(() => validateStudentWalkthroughDocument(extraAsset),
    /cardinalidad|IDs extra/u);
  const leaked = clone(fixture);
  leaked.records[0].questionWalkthrough[0].repairAction =
    'Answer for sentence-wetlands-01 is concrete channels';
  assert.throws(() => validateStudentWalkthroughDocument(leaked), /asignación EN\/ES/u);
});

test('board boundary requires unique F0.2b.8 closure, open parent/F0.2b.9 and one stop', () => {
  const valid = [
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |',
    '| 0 | 　　　 ↳ F0.2b.7 Matching Sentence Endings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |',
    'Siguiente subunidad, sin iniciarla: `F0.2b.9 Summary Completion`.',
  ].join('\n');
  assert.equal(assertBoardStopBoundary(valid), true);
  assert.throws(() => assertBoardStopBoundary(`${valid}\n${valid.split('\n')[2]}`),
    /una sola fila/u);
  assert.throws(() => assertBoardStopBoundary(valid.replace(
    '| — | — | — | — | — | — | — |', '| ✅ | — | — | — | — | — | — |')),
  /una sola fila/u);
  assert.throws(() => assertBoardStopBoundary(
    `${valid}\nF0.2b.9 Summary Completion started`), /contradictoria/u);
});

test('complete package enforces registry, expert, walkthrough and report bindings',
  { skip: !finalPackageExists }, () => {
    const { validation, promptOnlyPacket, blindPacket, factualPacket } =
      buildValidationArtifacts();
    assert.equal(validation.scope.passages, 3);
    assert.equal(validation.scope.questions, 18);
    assert.equal(validation.scope.canonicalAnswers, 18);
    assert.equal(validation.scope.rawAcceptedEntries, 20);
    assert.equal(validation.scope.normalizedAcceptedValues, 19);
    assert.equal(validation.checks.expertAgreementEighteenOfEighteen, true);
    assert.equal(validation.checks.contentCertificationBlocked, true);
    assert.equal(validation.antiShortcut.statisticalCertification,
      'withheld-n-below-100');
    assert.match(validation.runtime.classification, /^guided-training-/u);
    assert.equal(promptOnlyPacket.records.length, 3);
    assert.equal(blindPacket.records.length, 3);
    assert.equal(factualPacket.records.reduce((sum, row) =>
      sum + row.candidateSources.length, 0), 15);
    for (const decision of validation.decisions) {
      assert.equal(assertDecisionQuarantined(decision), true);
    }
    const bindings = validateFinalReportArtifacts(validation);
    assert.match(bindings.validationSha256, /^[a-f0-9]{64}$/u);
    assert.match(bindings.reportHtmlSha256, /^[a-f0-9]{64}$/u);
  });

test('test suite itself does not require or generate dossier outputs', () => {
  if (existsSync(new URL('validation.json', OUTPUT))) {
    assert.doesNotThrow(() => JSON.parse(readFileSync(new URL('validation.json', OUTPUT), 'utf8')));
  } else {
    assert.equal(finalPackageExists, false);
  }
});
