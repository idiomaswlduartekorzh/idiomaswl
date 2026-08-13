import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  SENTENCE_ENDINGS_GUIDED_PASSAGE_ID,
  SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID,
  SENTENCE_ENDINGS_LEGACY_STORAGE_KEY,
  SENTENCE_ENDINGS_LEVELS,
  SENTENCE_ENDINGS_PASSAGES,
  SENTENCE_ENDINGS_STORAGE_KEY,
  getSentenceEndingDrillIds,
  getSentenceEndingPassage,
} from '../src/data/practica-exams/ielts-reading-matching-sentence-endings-progress.ts';

const questions = SENTENCE_ENDINGS_PASSAGES.flatMap((passage) => passage.questions.map((question) => ({ passage, question })));

test('the progressive bank contains six bounded passages and twenty-eight retained decisions', () => {
  assert.equal(SENTENCE_ENDINGS_PASSAGES.length, 6);
  assert.equal(questions.length, 28);
  assert.equal(new Set(SENTENCE_ENDINGS_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(questions.map(({ question }) => question.id)).size, 28);
  assert.ok(SENTENCE_ENDINGS_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(SENTENCE_ENDINGS_PASSAGES.every((passage) => passage.sourceNote.length > 100));
});

test('every beginning resolves to an ending and records evidence plus one competitor', () => {
  const codes = new Set();
  for (const { passage, question } of questions) {
    const endingIds = new Set(passage.endingOptions.map((ending) => ending.id));
    assert.ok(endingIds.has(question.answer), question.id);
    assert.ok(endingIds.has(question.closestDistractorId), question.id);
    assert.notEqual(question.answer, question.closestDistractorId, question.id);
    assert.ok(question.evidence.length >= 20, question.id);
    assert.ok(question.distractorFailure.length >= 20, question.id);
    codes.add(question.errorCode);
  }
  assert.deepEqual(codes, new Set(['grammar-only', 'wrong-relation', 'scope-inflation', 'polarity-reversal', 'lexical-echo', 'wrong-evidence-zone']));
});

test('known ambiguous and passage-order legacy defects remain excluded', () => {
  const ids = new Set(questions.map(({ question }) => question.id));
  for (const excluded of ['mse-libraries-01', 'mse-food-waste-06', 'mse-libraries-06']) {
    assert.equal(ids.has(excluded), false, excluded);
  }
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(SENTENCE_ENDINGS_GUIDED_PASSAGE_ID, SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(SENTENCE_ENDINGS_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(SENTENCE_ENDINGS_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('the engine has two relationship drills followed by four complete passage sets', () => {
  assert.equal(SENTENCE_ENDINGS_LEVELS.length, 6);
  for (const level of SENTENCE_ENDINGS_LEVELS.slice(0, 2)) {
    assert.equal(level.questionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of SENTENCE_ENDINGS_LEVELS.slice(2)) {
    assert.equal(level.questionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getSentenceEndingPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.questions.length - 1);
  }
});

test('drill option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const [seed, level] of SENTENCE_ENDINGS_LEVELS.slice(0, 2).entries()) {
    let firstChoiceScore = 0;
    for (const questionId of level.questionIds ?? []) {
      const passage = level.passageIds.map(getSentenceEndingPassage).find((item) => item?.questions.some((question) => question.id === questionId));
      const question = passage?.questions.find((item) => item.id === questionId);
      assert.ok(passage && question);
      const order = getSentenceEndingDrillIds(passage, question, seed);
      assert.deepEqual(order, getSentenceEndingDrillIds(passage, question, seed));
      assert.equal(order.length, 4);
      assert.equal(new Set(order).size, 4);
      const position = order.indexOf(question.answer);
      positions.add(position);
      if (position === 0) firstChoiceScore += 1;
    }
    assert.ok(firstChoiceScore < level.masteryScore, `${level.id}: always-first scored ${firstChoiceScore}/4`);
  }
  assert.ok(positions.size >= 3, `answer positions only covered ${[...positions].join(', ')}`);
});

test('a clean retry changes order while preserving four available endings', () => {
  let changed = 0;
  for (const { passage, question } of questions.slice(12)) {
    const first = getSentenceEndingDrillIds(passage, question, 0);
    const retry = getSentenceEndingDrillIds(passage, question, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 10);
});

test('the interaction preserves the task contract without inventing no-reuse', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/MatchingSentenceEndingsPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /type="radio"/);
  assert.match(lab, /disabled=\{submitted\}/);
  assert.doesNotMatch(lab, /usedEndings|disabled=.*used/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
});

test('storage is versioned and isolated to Matching Sentence Endings', () => {
  assert.equal(SENTENCE_ENDINGS_STORAGE_KEY, 'welearn:ielts-reading:matching-sentence-endings:v2');
  assert.equal(SENTENCE_ENDINGS_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:matching-sentence-endings:v1');
});

test('canonical and rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) {
    assert.match(page, /MatchingSentenceEndingsGuidedPractice/);
    assert.match(page, /MatchingSentenceEndingsIndependentPractice/);
    assert.match(page, /MatchingSentenceEndingsProgressEngine/);
    assert.match(page, /SkillReviewSourceBlock/);
    assert.match(page, /IELTS_ACADEMIC_URL/);
  }
  assert.match(publicPage, /isMatchingSentenceEndings/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Tres pasajes|Práctica guiada|Reiniciar|Cómo resolver/);
});

test('the blueprint records sentence-ending gates before scaling again', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  for (const required of [
    'Matching Sentence Endings practice must apply two filters in order',
    'passage-information-order defect',
    'Do not invent a no-reuse rule for Matching Sentence Endings',
    '6 source-backed or conservatively bounded passages and 28 retained decisions',
    'Next question-type vertical:** Sentence Completion',
  ]) assert.match(blueprint, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
