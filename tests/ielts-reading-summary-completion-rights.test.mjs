import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  REQUIRED_FACTUAL_CLAIM_SPANS,
  REQUIRED_FACTUAL_SOURCE_IDS,
  assertBoardStopBoundary,
  assertCurrentSummaryUnitPinned,
  assertDecisionQuarantined,
  assertNextUnitPinned,
  buildAcceptedAnswerInventory,
  buildBlindReviewPacket,
  buildFactualSourceReviewPacketFromRegistry,
  buildPromptOnlyPacket,
  buildStoredStructuralRiskProfile,
  expectedNextUnitPin,
  findSummaryCompletionAssignmentLeaks,
  runtimeWordCount,
  validateAcceptedAnswerAssessmentsDocument,
  validateChronology,
} from '../scripts/check-ielts-reading-summary-completion-rights.mjs';

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
      { id: 'ielts-summary-completion-official-format', kind: 'official-policy' },
      { id: 'ielts-summary-completion-official-samples', kind: 'official-policy' },
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
    grammaticalFit: row.role === 'alternative' ? 'fails' : 'natural',
    evidenceIds: [],
    note: row.role === 'alternative'
      ? 'Literal span, but it duplicates the determiner already present in the frame.'
      : 'Canonical literal whole-token span.',
  }));
}

test('current Summary unit is pinned at 3/18/18/19/19 with a 16-file closure', () => {
  const pin = assertCurrentSummaryUnitPinned();
  assert.deepEqual({
    passages: pin.passages, questions: pin.questions, canonicalAnswers: pin.canonicalAnswers,
    rawAcceptedEntries: pin.rawAcceptedEntries,
    normalizedAcceptedValues: pin.normalizedAcceptedValues,
    closure: Object.keys(pin.renderDependencyClosureSha256).length,
  }, { passages: 3, questions: 18, canonicalAnswers: 18,
    rawAcceptedEntries: 19, normalizedAcceptedValues: 19, closure: 16 });
});

test('prompt-only and blind packets cover 3/18 and expose no keys, alternatives, hints or feedback', () => {
  const prompt = buildPromptOnlyPacket();
  const blind = buildBlindReviewPacket();
  assert.equal(prompt.records.length, 3);
  assert.equal(prompt.records.flatMap(row => row.summaryFrames).length, 18);
  assert.equal(blind.records.length, 3);
  assert.equal(blind.records.flatMap(row => row.questions).length, 18);
  const serialized = JSON.stringify([prompt, blind]);
  assert.doesNotMatch(serialized,
    /"(?:answer|alternatives|hint|explanation|feedback|selectedAnswer)"\s*:/iu);
  assert.deepEqual(findSummaryCompletionAssignmentLeaks([prompt, blind]), []);
});

test('factual packet binds 15 claims to 14 factual sources under policy v8', () => {
  const packet = buildFactualSourceReviewPacketFromRegistry(registryFixture(), prerequisiteHashes);
  assert.equal(packet.records.flatMap(row => row.claimSpansToReview).length, 15);
  assert.deepEqual(packet.records.map(row => row.candidateSources.length), [5, 4, 5]);
  assert.equal(new Set(packet.records.flatMap(row => row.candidateSources)
    .map(row => row.evidenceId)).size, 14);
  assert.equal(Object.values(REQUIRED_FACTUAL_SOURCE_IDS).flat().length, 14);
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
    { oneWord: 7, twoWords: 11, overLimit: 0 });
  assert.deepEqual(risk.alwaysTwoWordAnswerPredictor,
    { eligible: 18, tiesOrAbstentions: 0, hits: 11 });
  assert.equal(risk.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits, 13);
  assert.equal(risk.sameQuestionPositionAcrossSetsModalEvidenceParagraph.hits, 17);
  assert.deepEqual(clone(risk.canonicalAnswerTokenVisibleInSentenceFrame),
    { questionsWithOverlap: 0, questionIds: [] });
  assert.deepEqual(risk.canonicalAnswerOccurrenceInOwnPassage.exactlyOnce, 17);
  assert.deepEqual(risk.canonicalAnswerOccurrenceInOwnPassage.multiple, 1);
  assert.deepEqual(clone(risk.naiveFirstOccurrenceOrderViolationQuestionIds),
    ['summary-urban-farms-06']);
  assert.equal(risk.intendedWholeTokenEvidence.offsetsMatchPinnedBaseline, true);
  assert.equal(risk.intendedWholeTokenEvidence.rows.length, 18);
  assert.equal(risk.promptPassageLexicalAnchors.questionsWithUniqueExactBigram, 16);
  assert.deepEqual(clone(risk.promptPassageLexicalAnchors.longestExactNgramDistribution),
    { 1: 1, 2: 8, 3: 3, 4: 6 });
  assert.equal(risk.preResponseHintExposure.hintsNamingPassageLocationOrAnchor, 16);
  assert.deepEqual(clone(risk.preResponseHintExposure.semanticParaphraseOnlyHintQuestionIds),
    ['summary-urban-farms-02', 'summary-urban-farms-03']);
  assert.deepEqual(clone(risk.grammaticallyInvalidAcceptedAlternatives), [{
    questionId: 'summary-urban-farms-06', acceptedText: 'the roof',
    duplicatedBoundaryToken: 'the',
  }]);
  assert.equal(risk.statisticalCertification.contentCertificationBlocked, true);
});

test('accepted inventory recognizes `the roof` as literal but grammatically invalid', () => {
  const rows = acceptedFixture();
  assert.equal(validateAcceptedAnswerAssessmentsDocument(rows), 19);
  const alternative = rows.find(row => row.role === 'alternative');
  assert.deepEqual({ id: alternative.questionId, text: alternative.acceptedText,
    fit: alternative.grammaticalFit },
  { id: 'summary-urban-farms-06', text: 'the roof', fit: 'fails' });
  const weakened = clone(rows);
  weakened.find(row => row.role === 'alternative').grammaticalFit = 'natural';
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(weakened),
    /gramaticalmente inválida|accepted-answer assessment/u);
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(rows.slice(1)),
    /cardinalidad 19/u);
});

test('assignment leaks fail closed in English, Spanish and nested fields', () => {
  const cases = [
    { instruction: 'Answer for summary-urban-farms-06 is roof' },
    { instruction: 'La respuesta de summary-repair-cafes-01 es household objects' },
    { questionId: 'summary-shade-mapping-02', review: { selectedAnswer: 'satellite images' } },
  ];
  for (const value of cases) assert.equal(findSummaryCompletionAssignmentLeaks(value).length, 1);
  assert.deepEqual(findSummaryCompletionAssignmentLeaks({
    taskRule: 'Use no more than two words.', passage: 'A roof may reduce heat.',
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
    baseline: { capturedAt: '2026-08-11T15:00:00Z' },
    sourceAvailability: { retrievalStartedAt: '2026-08-11T15:01:00Z', sources: [
      { evidenceId: 'a', retrievedAt: '2026-08-11T15:02:00Z' },
    ] },
    provenanceSearch: { searchedAt: '2026-08-11T15:03:00Z' },
    unitChangeManifest: { recordedAt: '2026-08-11T15:04:00Z' },
    unitRecords: [{ assetId: 'a', automatedTriage: { assessedAt: '2026-08-11T15:05:35Z' } }],
    promptOnlyVerdict: { reviewer: { reviewedAt: '2026-08-11T15:10:00Z' } },
    firstPass: { reviewer: { reviewedAt: '2026-08-11T15:15:00Z' } },
    expertVerdict: { reviewer: { reviewedAt: '2026-08-11T15:28:00Z' } },
    walkthrough: { reviewer: { reviewedAt: '2026-08-11T15:22:00Z' } },
    audit: { reviewedAt: '2026-08-11T15:30:00Z' },
  };
  const now = Date.parse('2026-08-11T15:31:00Z');
  assert.doesNotThrow(() => validateChronology(input, now));
  const impossible = clone(input);
  impossible.expertVerdict.reviewer.reviewedAt = '2026-08-11T15:19:00Z';
  assert.throws(() => validateChronology(impossible, now), /imposible|monotónica/u);
});

test('F0.2b.10 Note Completion is pinned and board boundary is exact', () => {
  const next = expectedNextUnitPin();
  assert.equal(next.unit, 'F0.2b.10');
  assert.equal(next.format, 'note-completion');
  assert.equal(assertNextUnitPinned({ nextUnit: next }), true);
  const board = [
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |',
    '| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.10 Note Completion | — | — | — | — | — | — | — |',
    'Siguiente subunidad, sin iniciarla: `F0.2b.10 Note Completion`.',
  ].join('\n');
  assert.equal(assertBoardStopBoundary(board), true);
  assert.throws(() => assertBoardStopBoundary(board.replace('— | — | — | — | — | — | —',
    '✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖')), /fila exacta/u);
});

test('tests do not generate dossier outputs', () => {
  const source = readFileSync(new URL(import.meta.url), 'utf8');
  assert.doesNotMatch(source, /buildValidationArtifacts\s*\(/u);
  assert.equal(sha(buildBlindReviewPacket()).length, 64);
});
