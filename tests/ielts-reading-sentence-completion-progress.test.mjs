import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  SENTENCE_COMPLETION_GUIDED_PASSAGE_ID,
  SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  SENTENCE_COMPLETION_LEGACY_STORAGE_KEY,
  SENTENCE_COMPLETION_LEVELS,
  SENTENCE_COMPLETION_PASSAGES,
  SENTENCE_COMPLETION_STORAGE_KEY,
  countSentenceCompletionWords,
  getSentenceCompletionPassage,
  isSentenceCompletionCorrect,
  normalizeSentenceCompletionAnswer,
} from '../src/data/practica-exams/ielts-reading-sentence-completion-progress.ts';

const decisions = SENTENCE_COMPLETION_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));

test('the progressive bank contains six passages and thirty exact-span decisions', () => {
  assert.equal(SENTENCE_COMPLETION_PASSAGES.length, 6);
  assert.equal(decisions.length, 30);
  assert.equal(new Set(SENTENCE_COMPLETION_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(decisions.map(({ decision }) => decision.id)).size, 30);
  assert.ok(SENTENCE_COMPLETION_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(SENTENCE_COMPLETION_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('every primary answer is a literal passage span within its displayed limit', () => {
  for (const { passage, decision } of decisions) {
    const normalizedPassage = normalizeSentenceCompletionAnswer(passage.passage);
    const normalizedAnswer = normalizeSentenceCompletionAnswer(decision.answer);
    assert.ok(normalizedPassage.includes(normalizedAnswer), decision.id);
    assert.ok(countSentenceCompletionWords(decision.answer) <= decision.maxWords, decision.id);
    assert.ok(decision.instruction.includes(decision.maxWords === 1 ? 'ONE WORD' : 'TWO WORDS'), decision.id);
    assert.equal(isSentenceCompletionCorrect(decision, decision.answer), true, decision.id);
    assert.ok(decision.evidenceQuote.length >= 20, decision.id);
  }
});

test('accepted spelling variants remain explicit and do not broaden the answer matcher', () => {
  const printers = decisions.find(({ decision }) => decision.id === 'sentence-makerspaces-01')?.decision;
  const centre = decisions.find(({ decision }) => decision.id === 'sentence-night-markets-01')?.decision;
  assert.ok(printers && centre);
  assert.equal(isSentenceCompletionCorrect(printers, '3d printers.'), true);
  assert.equal(isSentenceCompletionCorrect(centre, 'shopping center'), true);
  assert.equal(isSentenceCompletionCorrect(centre, 'the shopping center'), false);
});

test('the bank covers all six evidence and answer-boundary diagnoses', () => {
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.errorCode)), new Set([
    'over-limit', 'duplicate-frame-word', 'incomplete-span', 'grammar-mismatch', 'wrong-evidence', 'instruction-misread',
  ]));
  assert.ok(decisions.every(({ decision }) => decision.trap.length >= 40));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(SENTENCE_COMPLETION_GUIDED_PASSAGE_ID, SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(SENTENCE_COMPLETION_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(SENTENCE_COMPLETION_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two focused drills lead into four complete passage sets', () => {
  assert.equal(SENTENCE_COMPLETION_LEVELS.length, 6);
  for (const level of SENTENCE_COMPLETION_LEVELS.slice(0, 2)) {
    assert.equal(level.decisionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of SENTENCE_COMPLETION_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getSentenceCompletionPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('text inputs stay editable until an explicit check or full-set submission', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/SentenceCompletionPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /<input/);
  assert.match(lab, /disabled=\{checked\}/);
  assert.match(lab, /Check answer/);
  assert.match(lab, /Retry this sentence/);
  assert.match(lab, /disabled=\{submitted\}/);
  assert.match(lab, /Submit full set/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
});

test('storage is versioned and isolated to Sentence Completion', () => {
  assert.equal(SENTENCE_COMPLETION_STORAGE_KEY, 'welearn:ielts-reading:sentence-completion:v2');
  assert.equal(SENTENCE_COMPLETION_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:sentence-completion:v1');
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/sentence-completion/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) {
    assert.match(page, /SentenceCompletionGuidedPractice/);
    assert.match(page, /SentenceCompletionIndependentPractice/);
    assert.match(page, /SentenceCompletionProgressEngine/);
    assert.match(page, /SkillReviewSourceBlock/);
    assert.match(page, /IELTS_ACADEMIC_URL/);
  }
  assert.match(publicPage, /isSentenceCompletion/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Cómo resolver|Tres pasajes|Práctica guiada|Reiniciar/);
});

test('the content guardian requires the progressive Sentence Completion surfaces', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['SentenceCompletionGuidedPractice', 'SentenceCompletionIndependentPractice', 'SentenceCompletionProgressEngine']) {
    assert.match(guardian, new RegExp(required));
  }
  assert.doesNotMatch(guardian, /sentence-completion'[\s\S]{0,500}must render SummaryCompletionPassageBank/);
});

test('the blueprint records Sentence Completion gates before scaling again', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  for (const required of [
    'Sentence Completion practice must derive its accepted word count',
    'literal passage span',
    '6 source-backed or conservatively bounded passages and 30 exact-span decisions',
    'Next question-type vertical:** Summary Completion',
  ]) assert.match(blueprint, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
