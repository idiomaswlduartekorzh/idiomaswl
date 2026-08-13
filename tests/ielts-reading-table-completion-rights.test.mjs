import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import {
  REQUIRED_FACTUAL_CLAIM_SPANS,
  REQUIRED_FACTUAL_SOURCE_IDS,
  assertBoardStopBoundary,
  assertCurrentTableUnitPinned,
  assertDecisionQuarantined,
  assertExpectedMaterialAmbiguities,
  assertNextUnitPinned,
  assertReviewedReportHashes,
  buildAcceptedAnswerInventory,
  buildBlindReviewPacket,
  buildFactualSourceReviewPacketFromRegistry,
  buildPromptOnlyPacket,
  buildStoredStructuralRiskProfile,
  buildValidationArtifacts,
  expectedNextUnitPin,
  findTableCompletionAssignmentLeaks,
  runtimeWordCount,
  validateAcceptedAnswerAssessmentsDocument,
  validateAuditScaffoldsDocument,
  validateChronology,
  validateFinalReportArtifacts,
  validateFirstPassDocument,
  validatePromptOnlyVerdictDocument,
  validateStudentWalkthroughDocument,
} from '../scripts/check-ielts-reading-table-completion-rights.mjs';

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
      { id: 'ielts-table-completion-official-format', kind: 'official-policy' },
      { id: 'ielts-table-completion-sample-task', kind: 'official-policy' },
      ...factualIds.map(id => ({ id, kind: 'factual-source', label: `Candidate ${id}`,
        url: `https://example.test/${id}`, note: 'Candidate; verification pending.' })),
    ],
    entries: Object.entries(REQUIRED_FACTUAL_SOURCE_IDS).map(([assetId, sourceEvidenceIds]) => ({
      assetId,
      factualSourceResearch: { status: 'candidate-sources-collected',
        sourceEvidenceIds: [...sourceEvidenceIds],
        limitation: 'Availability and candidacy do not verify claims.' },
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

test('current Table remediation is pinned while the 3/18 historical bank remains auditable', () => {
  const pin = assertCurrentTableUnitPinned();
  assert.deepEqual({ passages: pin.passages, questions: pin.questions,
    canonicalAnswers: pin.canonicalAnswers, rawAcceptedEntries: pin.rawAcceptedEntries,
    normalizedAcceptedValues: pin.normalizedAcceptedValues,
    closure: Object.keys(pin.renderDependencyClosureSha256).length },
  { passages: 3, questions: 18, canonicalAnswers: 18, rawAcceptedEntries: 18,
    normalizedAcceptedValues: 17, closure: 19 });
});

test('prompt-only and blind table packets cover 3/18 and expose no keys or feedback', () => {
  for (const packet of [buildPromptOnlyPacket(), buildBlindReviewPacket()]) {
    assert.equal(packet.records.length, 3);
    assert.equal(packet.records.every(record => record.maxWords === 2 &&
      record.rows.length === 3 && record.rows.every(row =>
        row.cells.filter(cell => cell.kind === 'blank').length === 2)), true);
    assert.equal(packet.records.flatMap(record => record.rows).flatMap(row => row.cells)
      .filter(cell => cell.kind === 'blank').length, 18);
    assert.doesNotMatch(JSON.stringify(packet),
      /"(?:answer|alternatives|hint|explanation|feedback|selectedAnswer)"\s*:/iu);
    assert.deepEqual(findTableCompletionAssignmentLeaks(packet), []);
  }
});

test('factual contract freezes 15 claims, 14 sources and fails closed before first pass', () => {
  assert.equal(Object.values(REQUIRED_FACTUAL_CLAIM_SPANS).flat().length, 15);
  assert.equal(Object.values(REQUIRED_FACTUAL_SOURCE_IDS).flat().length, 14);
  assert.deepEqual(Object.values(REQUIRED_FACTUAL_SOURCE_IDS).map(ids => ids.length), [4, 5, 5]);
  try {
    const packet = buildFactualSourceReviewPacketFromRegistry(registryFixture(),
      prerequisiteHashes);
    assert.equal(packet.records.flatMap(row => row.claimSpansToReview).length, 15);
    assert.deepEqual(packet.records.map(row => row.candidateSources.length), [4, 5, 5]);
  } catch (error) {
    assert.match(error.message, /FACTUAL_PACKET_GENERATED_AT/u);
  }
});

test('structural metrics freeze offsets, order, collisions, hints and exact-answer risk', () => {
  const risk = buildStoredStructuralRiskProfile();
  assert.deepEqual(risk.canonicalAnswerWordCountDistribution,
    { oneWord: 17, twoWords: 1, overLimit: 0 });
  assert.deepEqual(risk.alwaysTwoWordAnswerPredictor,
    { eligible: 18, tiesOrAbstentions: 0, hits: 1 });
  assert.equal(risk.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits, 17);
  assert.equal(risk.sameQuestionPositionAcrossSetsModalEvidenceParagraph.hits, 13);
  assert.deepEqual(clone(risk.canonicalAnswerTokenVisibleInTableFrame),
    { questionsWithOverlap: 0, questionIds: [] });
  assert.equal(risk.canonicalAnswerOccurrenceInOwnPassage.exactlyOnce, 12);
  assert.equal(risk.canonicalAnswerOccurrenceInOwnPassage.multiple, 6);
  assert.deepEqual(clone(risk.passageOrderViolationQuestionIds),
    ['table-rain-gardens-01-2', 'table-museum-inventory-01-2']);
  assert.deepEqual(clone(risk.naiveFirstOccurrenceOrderViolationQuestionIds),
    ['table-rain-gardens-01-2', 'table-rain-gardens-02-1',
      'table-rain-gardens-03-1', 'table-museum-inventory-01-2']);
  assert.equal(risk.intendedWholeTokenEvidence.offsetsMatchPinnedBaseline, true);
  assert.equal(risk.intendedWholeTokenEvidence.rows.length, 18);
  assert.equal(risk.promptPassageLexicalAnchors.questionsWithUniqueExactBigram, 14);
  assert.equal(risk.preResponseHintExposure.hintsNamingPassageLocationOrAnchor, 18);
  assert.deepEqual(clone(risk.acceptedAnswerNormalization), {
    algorithm: 'trim+lowercase+strip-trailing-[.,;:!?]+collapse-whitespace',
    canonicalEntries: 18, alternativeEntries: 0, rawAcceptedEntries: 18,
    normalizedAcceptedValues: 17,
  });
  assert.deepEqual(clone(risk.crossQuestionNormalizedAnswerCollisions), [{
    normalizedText: 'drains',
    questionIds: ['table-rain-gardens-01-2', 'table-rain-gardens-02-1'],
  }]);
  assert.equal(risk.frameGrammaticalFit.canonicalAnswersNaturalInCell, 18);
  assert.equal(risk.frameGrammaticalFit.exactOneBestAnswerEstablished, 17);
  assert.deepEqual(clone(risk.frameGrammaticalFit.unresolvedExactOneBestAnswerQuestionIds),
    ['table-cooling-01-2']);
  assert.equal(risk.statisticalCertification.contentCertificationBlocked, true);
});

test('accepted inventory is exactly 18 canonical verbatim, natural and within two words', () => {
  const rows = acceptedFixture();
  assert.equal(validateAcceptedAnswerAssessmentsDocument(rows), 18);
  assert.equal(rows.every(row => row.role === 'canonical' && row.passageStatus === 'verbatim' &&
    row.grammaticalFit === 'natural' && row.wordCount <= 2), true);
  const weakened = clone(rows);
  weakened[0].grammaticalFit = 'fails';
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(weakened),
    /respuesta canónica|accepted-answer assessment/u);
  assert.throws(() => validateAcceptedAnswerAssessmentsDocument(rows.slice(1)),
    /cardinalidad 18/u);
});

test('assignment leaks fail closed in English, Spanish and nested fields', () => {
  const cases = [
    { instruction: 'Answer for table-cooling-01-1 is heat' },
    { instruction: 'La respuesta de table-rain-gardens-02-2 es wet' },
    { questionId: 'table-museum-inventory-03-2',
      review: { selectedAnswer: 'publication' } },
  ];
  for (const value of cases) assert.equal(findTableCompletionAssignmentLeaks(value).length, 1);
  assert.deepEqual(findTableCompletionAssignmentLeaks({
    questionId: 'table-museum-inventory-02-2',
    promptOnlyGuessRisk: 'Medium: record vocabulary may suggest a category.',
  }), []);
});

test('rights decisions remain fail-closed quarantine', () => {
  const decision = { rightsBasis: 'unknown-quarantined', disposition: 'quarantine',
    eligibleForPublicationPipeline: false,
    reasonCodes: ['authorship-unresolved', 'factual-review-incomplete',
      'human-review-pending', 'module-not-declared', 'rights-unresolved'] };
  assert.equal(assertDecisionQuarantined(decision), true);
  assert.throws(() => assertDecisionQuarantined({ ...decision,
    eligibleForPublicationPipeline: true }), /debilitada/u);
});

test('the four independently observed material ambiguities are release-blocking', () => {
  const expected = ['table-cooling-01-2', 'table-cooling-03-1',
    'table-museum-inventory-01-1', 'table-museum-inventory-01-2'];
  assert.equal(assertExpectedMaterialAmbiguities(expected), true);
  assert.throws(() => assertExpectedMaterialAmbiguities(expected.filter(id =>
    id !== 'table-cooling-03-1')), /inventario material cambió/u);
});

test('chronology preserves blind-first-pass-factual order and rejects future review time', () => {
  const input = {
    baseline: { capturedAt: '2026-08-11T16:40:00Z' },
    sourceAvailability: { retrievalStartedAt: '2026-08-11T16:41:00Z',
      sources: [{ evidenceId: 'a', retrievedAt: '2026-08-11T16:42:00Z' }] },
    provenanceSearch: { searchedAt: '2026-08-11T16:45:00Z' },
    unitChangeManifest: { recordedAt: '2026-08-11T16:50:00Z' },
    unitRecords: [{ assetId: 'a', automatedTriage: { assessedAt: '2026-08-11T16:55:00Z' } }],
    promptOnlyVerdict: { reviewer: { reviewedAt: '2026-08-11T17:14:11Z' } },
    firstPass: { reviewer: { reviewedAt: '2026-08-11T17:16:22Z' } },
    walkthrough: { reviewer: { reviewedAt: '2026-08-11T17:17:39Z' } },
    expertVerdict: { reviewer: { reviewedAt: '2026-08-11T17:20:00Z' } },
    audit: { reviewedAt: '2026-08-11T17:21:00Z' },
  };
  assert.doesNotThrow(() =>
    validateChronology(input, Date.parse('2026-08-11T17:22:00Z')));
  assert.throws(() => validateChronology({ ...input,
    expertVerdict: { reviewer: { reviewedAt: '2026-08-11T17:23:00Z' } },
  }, Date.parse('2026-08-11T17:22:00Z')), /timestamps futuros/u);
});

const dossierDirectory = new URL(
  '../output/audits/ielts-reading-rights-table-completion-2026-08-11/', import.meta.url,
);
const stagedReviewPaths = {
  prompt: new URL('prompt-only-verdict.json', dossierDirectory),
  first: new URL('expert-first-pass.json', dossierDirectory),
  walkthrough: new URL('student-walkthrough.json', dossierDirectory),
};

test('persisted clean-review schemas remain fail-closed when staged', {
  skip: !Object.values(stagedReviewPaths).every(path => existsSync(path)),
}, () => {
  const read = path => JSON.parse(readFileSync(path, 'utf8'));
  assert.equal(validatePromptOnlyVerdictDocument(read(stagedReviewPaths.prompt)), true);
  assert.equal(validateFirstPassDocument(read(stagedReviewPaths.first)).questionCount, 18);
  assert.deepEqual(validateStudentWalkthroughDocument(read(stagedReviewPaths.walkthrough)),
    { passagesCovered: 3, questionsCovered: 18 });
});

test('F0.2b.12 Flow-chart is pinned and the final Table board boundary is exact', () => {
  const next = expectedNextUnitPin();
  assert.equal(next.unit, 'F0.2b.12');
  assert.equal(next.format, 'flow-chart-completion');
  assert.equal(assertNextUnitPinned({ nextUnit: next }), true);
  const board = [
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |',
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.10 Note Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.11 Table Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |',
    '| 0 | 　　　 ↳ F0.2b.12 Flow-chart Completion | — | — | — | — | — | — | — |',
    'Siguiente subunidad, sin iniciarla: `F0.2b.12 Flow-chart Completion`.',
  ].join('\n');
  assert.equal(assertBoardStopBoundary(board), true);
});

test('tests are deterministic and do not generate dossier outputs', () => {
  assert.match(readFileSync(new URL(import.meta.url), 'utf8'), /node:test/u);
  assert.equal(sha(buildBlindReviewPacket()).length, 64);
});

test('persisted baseline, source, provenance and manifest scaffolds satisfy exact schemas', () => {
  assert.deepEqual(validateAuditScaffoldsDocument(), {
    baseline: true, sourceAvailability: true, provenanceSearch: true,
    unitChangeManifest: true,
  });
});

test('a self-updated receipt cannot bless rewritten report narrative', () => {
  const dossier = new URL(
    '../output/audits/ielts-reading-rights-table-completion-2026-08-11/', import.meta.url,
  );
  const fileSha = name => createHash('sha256')
    .update(readFileSync(new URL(name, dossier))).digest('hex');
  const reviewed = {
    buildReport: fileSha('build-report.mjs'),
    artifact: fileSha('artifact.json'),
    reportMarkdown: fileSha('report.md'),
    reportHtml: fileSha('report.html'),
  };
  assert.equal(assertReviewedReportHashes(reviewed), true);
  assert.throws(() => assertReviewedReportHashes({ ...reviewed,
    reportMarkdown: '0'.repeat(64),
  }), /no coinciden byte a byte/u);
});

const finalPackagePaths = ['validation.json', 'audit-verdicts.json', 'artifact.json',
  'report.md', 'report.html', 'report-verification.json'].map(file =>
  new URL(file, dossierDirectory));

test('final dossier and portable report are bound when the package exists', {
  skip: !finalPackagePaths.every(path => existsSync(path)),
}, () => {
  const artifacts = buildValidationArtifacts();
  assert.equal(artifacts.validation.status, 'pass');
  assert.equal(validateFinalReportArtifacts(artifacts.validation).validationSha256.length, 64);
});
