import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MATCHING_INFORMATION_GUIDED_PASSAGE_ID,
  MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID,
  MATCHING_INFORMATION_LEGACY_STORAGE_KEY,
  MATCHING_INFORMATION_LEVELS,
  MATCHING_INFORMATION_PASSAGES,
  MATCHING_INFORMATION_STORAGE_KEY,
  getMatchingInformationDrillParagraphIds,
  getMatchingInformationPassage,
} from '../src/data/practica-exams/ielts-reading-matching-information-progress.ts';

const questions = MATCHING_INFORMATION_PASSAGES.flatMap((passage) => passage.questions.map((question) => ({ passage, question })));

test('the progressive bank contains six source-backed passages and thirty unique decisions', () => {
  assert.equal(MATCHING_INFORMATION_PASSAGES.length, 6);
  assert.equal(questions.length, 30);
  assert.equal(new Set(MATCHING_INFORMATION_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(questions.map(({ question }) => question.id)).size, 30);
  assert.ok(MATCHING_INFORMATION_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(MATCHING_INFORMATION_PASSAGES.every((passage) => passage.sourceNote.length > 70));
});

test('every question resolves to a paragraph and carries a concrete search signal and error diagnosis', () => {
  const codes = new Set();
  for (const { passage, question } of questions) {
    assert.ok(passage.paragraphs.some((paragraph) => paragraph.id === question.answer), question.id);
    assert.ok(question.searchSignal.length >= 20, question.id);
    assert.ok(question.explanation.length >= 45, question.id);
    assert.ok(question.trap.length >= 45, question.id);
    codes.add(question.errorCode);
  }
  assert.deepEqual(codes, new Set(['broad-topic-match', 'entity-confusion', 'ignored-qualifier', 'lexical-echo', 'relationship-mismatch', 'wrong-detail']));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(MATCHING_INFORMATION_GUIDED_PASSAGE_ID, MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(MATCHING_INFORMATION_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(MATCHING_INFORMATION_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('the engine has two focused drills followed by four complete passage maps', () => {
  assert.equal(MATCHING_INFORMATION_LEVELS.length, 6);
  for (const level of MATCHING_INFORMATION_LEVELS.slice(0, 2)) {
    assert.equal(level.questionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of MATCHING_INFORMATION_LEVELS.slice(2)) {
    assert.equal(level.questionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getMatchingInformationPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.equal(level.masteryScore, passage.questions.length - 1);
  }
});

test('paragraph reuse remains possible where two statements resolve to the same location', () => {
  const reusable = MATCHING_INFORMATION_PASSAGES.filter((passage) => (
    new Set(passage.questions.map((question) => question.answer)).size < passage.questions.length
  ));
  assert.ok(reusable.length >= 3);
});

test('drill option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const [seed, level] of MATCHING_INFORMATION_LEVELS.slice(0, 2).entries()) {
    let firstChoiceScore = 0;
    for (const questionId of level.questionIds ?? []) {
      const passage = level.passageIds.map(getMatchingInformationPassage).find((item) => item?.questions.some((question) => question.id === questionId));
      const question = passage?.questions.find((item) => item.id === questionId);
      assert.ok(passage && question);
      const order = getMatchingInformationDrillParagraphIds(passage, question, seed);
      assert.deepEqual(order, getMatchingInformationDrillParagraphIds(passage, question, seed));
      assert.equal(order.length, passage.paragraphs.length);
      assert.equal(new Set(order).size, passage.paragraphs.length);
      const position = order.indexOf(question.answer);
      positions.add(position);
      if (position === 0) firstChoiceScore += 1;
    }
    assert.ok(firstChoiceScore < level.masteryScore, `${level.id}: always-first scored ${firstChoiceScore}/4`);
  }
  assert.ok(positions.size >= 3, `answer positions only covered ${[...positions].join(', ')}`);
});

test('a clean retry changes paragraph order while preserving all paragraph IDs', () => {
  let changed = 0;
  for (const { passage, question } of questions.slice(18)) {
    const first = getMatchingInformationDrillParagraphIds(passage, question, 0);
    const retry = getMatchingInformationDrillParagraphIds(passage, question, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 8);
});

test('storage is versioned and isolated to Matching Information', () => {
  assert.equal(MATCHING_INFORMATION_STORAGE_KEY, 'welearn:ielts-reading:matching-information:v2');
  assert.equal(MATCHING_INFORMATION_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:matching-information:v1');
});

test('canonical and rewrite destination pages mount the complete English practice vertical', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-information/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/MatchingInformationPracticeLab.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) {
    assert.match(page, /MatchingInformationGuidedPractice/);
    assert.match(page, /MatchingInformationIndependentPractice/);
    assert.match(page, /MatchingInformationProgressEngine/);
    assert.match(page, /SkillReviewSourceBlock/);
    assert.match(page, /IELTS_ACADEMIC_URL/);
  }
  assert.match(publicPage, /isMatchingInformation/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.match(canonical, /Strengthen scanning/);
  assert.match(canonical, /Strengthen paraphrase recognition/);
  assert.doesNotMatch(canonical, /Tres pasajes|Práctica guiada|Reiniciar/);
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Paragraphs may be used more than once/);
  assert.match(lab, /disabled=\{submitted\}/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(lab, /not a secure Exam or proctored mode/);
});

test('the blueprint records Matching Information gates before the next type scales', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  for (const required of [
    'Matching Information practice must begin from the statements',
    'allow paragraph reuse',
    'native clickable radio cards',
    '6 source-backed passages and 30 exact-detail decisions',
    'Next question-type vertical:** Matching Features',
  ]) assert.match(blueprint, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
