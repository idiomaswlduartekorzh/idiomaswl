import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import {
  REQUIRED_FACTUAL_CLAIM_SPANS,
  REQUIRED_FACTUAL_SOURCE_IDS,
  assertBoardStopBoundary,
  assertCurrentNoteUnitPinned,
  assertDecisionQuarantined,
  assertNextUnitPinned,
  buildAcceptedAnswerInventory,
  buildBlindReviewPacket,
  buildValidationArtifacts,
  buildFactualSourceReviewPacketFromRegistry,
  buildPromptOnlyPacket,
  buildStoredStructuralRiskProfile,
  expectedNextUnitPin,
  findNoteCompletionAssignmentLeaks,
  runtimeWordCount,
  validateAcceptedAnswerAssessmentsDocument,
  validateChronology,
  validateFinalReportArtifacts,
  validateFirstPassDocument,
  validatePromptOnlyVerdictDocument,
  validateStudentWalkthroughDocument,
} from '../scripts/check-ielts-reading-note-completion-rights.mjs';

const clone = value => JSON.parse(JSON.stringify(value));
const sha = value => createHash('sha256').update(`${JSON.stringify(value, null, 2)}\n`)
  .digest('hex');
const prerequisiteHashes = { promptOnlyVerdict: 'a'.repeat(64), expertFirstPass: 'b'.repeat(64) };

function registryFixture() {
  const factualIds = Object.values(REQUIRED_FACTUAL_SOURCE_IDS).flat();
  return {
    schemaVersion: 'ielts-academic-reading-rights-registry.v2',
    policyVersion: '2026-08-09.v8',
    module: 'academic',
    evidence: [
      { id: 'ielts-note-completion-official-format', kind: 'official-policy' },
      { id: 'ielts-note-completion-official-samples', kind: 'official-policy' },
      ...factualIds.map(id => ({
        id, kind: 'factual-source', label: `Candidate ${id}`,
        url: `https://example.test/${id}`, note: 'Candidate evidence; verification pending.',
      })),
    ],
    entries: Object.entries(REQUIRED_FACTUAL_SOURCE_IDS).map(([assetId, sourceEvidenceIds]) => ({
      assetId,
      factualSourceResearch: {
        status: 'candidate-sources-collected', sourceEvidenceIds: [...sourceEvidenceIds],
        limitation: 'Availability and candidacy do not verify claims.',
      },
    })),
  };
}

function acceptedFixture() {
  return buildAcceptedAnswerInventory().map(row => ({
    questionId: row.questionId,
    acceptedText: row.acceptedText,
    normalizedText: row.normalizedText,
    role: row.role,
    passageStatus: 'verbatim',
    wordCount: runtimeWordCount(row.acceptedText),
    grammaticalFit: 'natural',
    evidenceIds: [],
    note: 'Canonical literal whole-token span.',
  }));
}

test('current Note unit is pinned at 3/18/18/18/18 with a 15-file closure', () => {
  const pin = assertCurrentNoteUnitPinned();
  assert.deepEqual({
    passages: pin.passages, questions: pin.questions, canonicalAnswers: pin.canonicalAnswers,
    rawAcceptedEntries: pin.rawAcceptedEntries,
    normalizedAcceptedValues: pin.normalizedAcceptedValues,
    closure: Object.keys(pin.renderDependencyClosureSha256).length,
  }, { passages: 3, questions: 18, canonicalAnswers: 18,
    rawAcceptedEntries: 18, normalizedAcceptedValues: 18, closure: 15 });
});

test('prompt-only and blind packets cover 3/18 and expose no keys, alternatives, hints or feedback', () => {
  const prompt = buildPromptOnlyPacket();
  const blind = buildBlindReviewPacket();
  assert.equal(prompt.records.length, 3);
  assert.equal(prompt.records.every(row => row.maxWords === 2 &&
    row.noteGroups.length === 3 && row.noteGroups.every(group => group.items.length === 2)),
  true);
  assert.equal(prompt.records.flatMap(row => row.noteGroups)
    .flatMap(group => group.items).length, 18);
  assert.equal(blind.records.length, 3);
  assert.equal(blind.records.every(row => row.maxWords === 2 &&
    row.noteGroups.length === 3 && row.noteGroups.every(group => group.items.length === 2)),
  true);
  assert.equal(blind.records.flatMap(row => row.noteGroups)
    .flatMap(group => group.items).length, 18);
  const serialized = JSON.stringify([prompt, blind]);
  assert.doesNotMatch(serialized,
    /"(?:answer|alternatives|hint|explanation|feedback|selectedAnswer)"\s*:/iu);
  assert.deepEqual(findNoteCompletionAssignmentLeaks([prompt, blind]), []);
});

test('factual packet binds 15 claims to 15 factual sources under policy v8', () => {
  const packet = buildFactualSourceReviewPacketFromRegistry(registryFixture(), prerequisiteHashes);
  assert.equal(packet.records.flatMap(row => row.claimSpansToReview).length, 15);
  assert.deepEqual(packet.records.map(row => row.candidateSources.length), [5, 5, 5]);
  assert.equal(new Set(packet.records.flatMap(row => row.candidateSources)
    .map(row => row.evidenceId)).size, 15);
  assert.equal(Object.values(REQUIRED_FACTUAL_SOURCE_IDS).flat().length, 15);
  assert.equal(Object.values(REQUIRED_FACTUAL_CLAIM_SPANS).flat().length, 15);
  const wrongPolicy = registryFixture();
  wrongPolicy.policyVersion = '2026-08-09.v9';
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(wrongPolicy,
    prerequisiteHashes), /policy v8/u);
  const missing = registryFixture();
  missing.entries[0].factualSourceResearch.sourceEvidenceIds.pop();
  assert.throws(() => buildFactualSourceReviewPacketFromRegistry(missing,
    prerequisiteHashes), /incompleto|duplicado/u);
});

test('baseline metrics freeze word length, intended offsets, order, overlap, hints and grammar risk', () => {
  const risk = buildStoredStructuralRiskProfile();
  assert.deepEqual(risk.canonicalAnswerWordCountDistribution,
    { oneWord: 13, twoWords: 5, overLimit: 0 });
  assert.deepEqual(risk.alwaysTwoWordAnswerPredictor,
    { eligible: 18, tiesOrAbstentions: 0, hits: 5 });
  assert.equal(risk.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits, 14);
  assert.equal(risk.sameQuestionPositionAcrossSetsModalEvidenceParagraph.hits, 18);
  assert.deepEqual(clone(risk.canonicalAnswerTokenVisibleInNoteFrame),
    { questionsWithOverlap: 0, questionIds: [] });
  assert.deepEqual(risk.canonicalAnswerOccurrenceInOwnPassage.exactlyOnce, 15);
  assert.deepEqual(risk.canonicalAnswerOccurrenceInOwnPassage.multiple, 3);
  assert.deepEqual(clone(risk.naiveFirstOccurrenceOrderViolationQuestionIds),
    ['note-night-libraries-05']);
  assert.equal(risk.intendedWholeTokenEvidence.offsetsMatchPinnedBaseline, true);
  assert.equal(risk.intendedWholeTokenEvidence.rows.length, 18);
  assert.equal(risk.promptPassageLexicalAnchors.questionsWithUniqueExactBigram, 17);
  assert.deepEqual(clone(risk.promptPassageLexicalAnchors.longestExactNgramDistribution),
    { 1: 1, 2: 5, 3: 3, 4: 3, 5: 4, 6: 2 });
  assert.equal(risk.preResponseHintExposure.hintsNamingPassageLocationOrAnchor, 18);
  assert.deepEqual(clone(risk.preResponseHintExposure.semanticParaphraseOnlyHintQuestionIds),
    []);
  assert.deepEqual(clone(risk.grammaticallyInvalidAcceptedAlternatives), []);
  assert.deepEqual(clone(risk.acceptedAnswerNormalization), {
    algorithm: 'trim+lowercase+strip-trailing-[.,;:!?]+collapse-whitespace',
    canonicalEntries: 18,
    alternativeEntries: 0,
    rawAcceptedEntries: 18,
    normalizedAcceptedValues: 18,
  });
  assert.deepEqual(clone(risk.canonicalAnswerGrammarSurface), {
    manuallyClassifiedNominalOrNounPhrase: 15,
    manuallyClassifiedAdjective: 2,
    manuallyClassifiedVerb: 1,
    total: 18,
    caveat: 'Manual structural classification; it is not a statistical POS certification.',
  });
  assert.equal(risk.statisticalCertification.contentCertificationBlocked, true);
});

test('accepted inventory is exactly 18 canonical verbatim and natural answers', () => {
  const rows = acceptedFixture();
  assert.equal(validateAcceptedAnswerAssessmentsDocument(rows), 18);
  assert.equal(rows.every(row => row.role === 'canonical' && row.passageStatus === 'verbatim' &&
    row.grammaticalFit === 'natural'), true);
  const weakened = clone(rows);
  weakened[0].grammaticalFit = 'fails';
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(weakened),
    /respuesta canónica|accepted-answer assessment/u);
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(rows.slice(1)),
    /cardinalidad 18/u);
});

test('assignment leaks fail closed in English, Spanish and nested fields', () => {
  const cases = [
    { instruction: 'Answer for note-mobile-libraries-06 is volunteer groups' },
    { instruction: 'La respuesta de note-seed-banks-01 es harvest' },
    { questionId: 'note-night-libraries-02', review: { selectedAnswer: 'wireless internet' } },
  ];
  for (const value of cases) assert.equal(findNoteCompletionAssignmentLeaks(value).length, 1);
  assert.deepEqual(findNoteCompletionAssignmentLeaks({
    taskRule: 'Use no more than two words.', passage: 'Libraries may open at night.',
  }), []);
  assert.deepEqual(findNoteCompletionAssignmentLeaks({
    questionId: 'note-night-libraries-04',
    promptOnlyGuessRisk: 'Medium: building vocabulary can be inferred too easily.',
  }), []);
});

test('rights decisions remain fail-closed quarantine', () => {
  const decision = {
    rightsBasis: 'unknown-quarantined', disposition: 'quarantine',
    eligibleForPublicationPipeline: false,
    reasonCodes: ['authorship-unresolved', 'factual-review-incomplete',
      'human-review-pending', 'module-not-declared', 'rights-unresolved'],
  };
  assert.equal(assertDecisionQuarantined(decision), true);
  assert.throws(() => assertDecisionQuarantined({ ...decision,
    eligibleForPublicationPipeline: true }), /debilitada/u);
});

test('chronology enforces baseline≤retrieval≤provenance≤manifest≤triage≤blind≤prompt≤first≤factual≤expert≤audit', () => {
  const input = {
    baseline: { capturedAt: '2026-08-11T16:00:30Z' },
    sourceAvailability: { retrievalStartedAt: '2026-08-11T16:02:00Z', sources: [
      { evidenceId: 'a', retrievedAt: '2026-08-11T16:02:30Z' },
    ] },
    provenanceSearch: { searchedAt: '2026-08-11T16:04:00Z' },
    unitChangeManifest: { recordedAt: '2026-08-11T16:07:00Z' },
    unitRecords: [{ assetId: 'a', automatedTriage: { assessedAt: '2026-08-11T16:08:30Z' } }],
    promptOnlyVerdict: { reviewer: { reviewedAt: '2026-08-11T16:09:20Z' } },
    firstPass: { reviewer: { reviewedAt: '2026-08-11T16:10:40Z' } },
    expertVerdict: { reviewer: { reviewedAt: '2026-08-11T16:20:00Z' } },
    walkthrough: { reviewer: { reviewedAt: '2026-08-11T16:15:00Z' } },
    audit: { reviewedAt: '2026-08-11T16:30:00Z' },
  };
  const now = Date.parse('2026-08-11T16:31:00Z');
  assert.doesNotThrow(() => validateChronology(input, now));
  const impossible = clone(input);
  impossible.expertVerdict.reviewer.reviewedAt = '2026-08-11T16:10:00Z';
  assert.throws(() => validateChronology(impossible, now), /imposible|monotónica/u);
});

const dossierDirectory = new URL(
  '../output/audits/ielts-reading-rights-note-completion-2026-08-11/', import.meta.url,
);
const stagedReviewPaths = {
  prompt: new URL('prompt-only-verdict.json', dossierDirectory),
  first: new URL('expert-first-pass.json', dossierDirectory),
  walkthrough: new URL('student-walkthrough.json', dossierDirectory),
};

test('persisted prompt-only, clean first-pass and walkthrough schemas are fail-closed', {
  skip: !Object.values(stagedReviewPaths).every(path => existsSync(path)),
}, () => {
  const read = path => JSON.parse(readFileSync(path, 'utf8'));
  assert.equal(validatePromptOnlyVerdictDocument(read(stagedReviewPaths.prompt)), true);
  assert.equal(validateFirstPassDocument(read(stagedReviewPaths.first)).questionCount, 18);
  assert.deepEqual(validateStudentWalkthroughDocument(read(stagedReviewPaths.walkthrough)),
    { passagesCovered: 3, questionsCovered: 18 });

  const leaked = read(stagedReviewPaths.walkthrough);
  leaked.records[0].questionWalkthrough[0].decisionRule =
    'Answer for note-mobile-libraries-01 is expensive';
  assert.throws(() => validateStudentWalkthroughDocument(leaked), /filtra una asignación/u);
});

test('F0.2b.11 Table Completion is pinned and board boundary is exact', () => {
  const next = expectedNextUnitPin();
  assert.equal(next.unit, 'F0.2b.11');
  assert.equal(next.format, 'table-completion');
  assert.equal(assertNextUnitPinned({ nextUnit: next }), true);
  const board = [
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |',
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.10 Note Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.11 Table Completion | — | — | — | — | — | — | — |',
    'Siguiente subunidad, sin iniciarla: `F0.2b.11 Table Completion`.',
  ].join('\n');
  assert.equal(assertBoardStopBoundary(board), true);
  assert.throws(() => assertBoardStopBoundary(board.replace('— | — | — | — | — | — | —',
    '✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖')), /fila exacta/u);
});

test('tests do not generate dossier outputs', () => {
  assert.match(readFileSync(new URL(import.meta.url), 'utf8'), /node:test/u);
  const validatorSource = readFileSync(
    new URL('../scripts/check-ielts-reading-note-completion-rights.mjs', import.meta.url),
    'utf8',
  );
  assert.doesNotMatch(validatorSource, /acceptedEntries:\s*19/u);
  assert.equal(sha(buildBlindReviewPacket()).length, 64);
});

const finalPackagePaths = ['validation.json', 'audit-verdicts.json', 'artifact.json',
  'report.md', 'report.html', 'report-verification.json'].map(file => new URL(
  file, dossierDirectory,
));

test('final dossier and portable report are bound when the package exists', {
  skip: !finalPackagePaths.every(path => existsSync(path)),
}, () => {
  const artifacts = buildValidationArtifacts();
  assert.equal(artifacts.validation.status, 'pass');
  assert.equal(validateFinalReportArtifacts(artifacts.validation).validationSha256.length, 64);
});
