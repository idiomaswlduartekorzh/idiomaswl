import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MIXED_PRACTICE_GUIDED_PASSAGE_ID,
  MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID,
  MIXED_PRACTICE_LEVELS,
  MIXED_PRACTICE_PASSAGES,
  MIXED_PRACTICE_STORAGE_KEY,
  countMixedAnswerWords,
  getMixedPracticeTask,
  isMixedTaskCorrect,
  normalizeMixedAnswer,
} from '../src/data/practica-exams/ielts-reading-mixed-progress.ts';

const rows = MIXED_PRACTICE_PASSAGES.flatMap((passage) => passage.tasks.map((task) => ({ passage, task })));

test('the progressive Mixed Practice bank contains six passages and thirty-six decisions', () => {
  assert.equal(MIXED_PRACTICE_PASSAGES.length, 6);
  assert.equal(rows.length, 36);
  assert.equal(new Set(MIXED_PRACTICE_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(rows.map(({ task }) => task.id)).size, 36);
  assert.ok(MIXED_PRACTICE_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(MIXED_PRACTICE_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('all fourteen Reading question families are practised as real response contracts', () => {
  const expected = new Set([
    'Multiple Choice',
    'True/False/Not Given',
    'Yes/No/Not Given',
    'Matching Headings',
    'Matching Information',
    'Matching Features',
    'Matching Sentence Endings',
    'Sentence Completion',
    'Summary Completion',
    'Note Completion',
    'Table Completion',
    'Flow-chart Completion',
    'Diagram Label Completion',
    'Short-answer Questions',
  ]);
  assert.deepEqual(new Set(rows.map(({ task }) => task.questionType)), expected);
  for (const { task } of rows) {
    assert.notEqual(task.answer, task.questionType, task.id);
    assert.ok(task.route.startsWith('/practica/ielts/reading/tipos-de-preguntas/'), task.id);
    if (task.responseKind === 'choice') {
      assert.ok(task.options?.includes(task.answer), task.id);
      assert.ok(task.options.length >= 3, task.id);
    } else {
      assert.ok(task.maxWords >= 1 && task.maxWords <= 4, task.id);
    }
  }
});

test('every free-text answer is a literal passage span within its displayed limit', () => {
  for (const { passage, task } of rows.filter(({ task }) => task.responseKind === 'text')) {
    const text = normalizeMixedAnswer(passage.paragraphs.map((paragraph) => paragraph.text).join(' '));
    assert.ok(text.includes(normalizeMixedAnswer(task.answer)), task.id);
    assert.ok(countMixedAnswerWords(task.answer) <= task.maxWords, task.id);
    assert.equal(isMixedTaskCorrect(task, task.answer), true, task.id);
  }
});

test('choice labels and text values are scored without cross-format shortcuts', () => {
  const falseTask = getMixedPracticeTask('mixed-campus-02')?.task;
  const textTask = getMixedPracticeTask('mixed-campus-04')?.task;
  assert.ok(falseTask && textTask);
  assert.equal(isMixedTaskCorrect(falseTask, 'FALSE'), true);
  assert.equal(isMixedTaskCorrect(falseTask, 'TRUE'), false);
  assert.equal(isMixedTaskCorrect(textTask, 'Usage   data.'), true);
  assert.equal(isMixedTaskCorrect(textTask, 'the usage data'), false);
});

test('choice positions are varied and always-first cannot dominate the bank', () => {
  const choiceRows = rows.filter(({ task }) => task.responseKind === 'choice');
  const positions = choiceRows.map(({ task }) => task.options.indexOf(task.answer));
  assert.ok(new Set(positions).size >= 4);
  assert.ok(positions.filter((position) => position === 0).length < choiceRows.length / 2);
});

test('guided, independent and Progress Engine pools are separated', () => {
  assert.notEqual(MIXED_PRACTICE_GUIDED_PASSAGE_ID, MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID);
  const enginePassages = new Set(MIXED_PRACTICE_LEVELS.flatMap((level) => level.taskIds.map((id) => getMixedPracticeTask(id)?.passage.id)));
  assert.equal(enginePassages.has(MIXED_PRACTICE_GUIDED_PASSAGE_ID), false);
  assert.equal(enginePassages.has(MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(enginePassages.size, 4);
});

test('six engine levels progress from micro-decisions to two-passage transfer', () => {
  assert.equal(MIXED_PRACTICE_LEVELS.length, 6);
  assert.deepEqual(MIXED_PRACTICE_LEVELS.map((level) => level.taskIds.length), [4, 4, 4, 6, 6, 12]);
  assert.deepEqual(MIXED_PRACTICE_LEVELS.map((level) => level.masteryScore), [3, 3, 3, 5, 5, 10]);
  assert.ok(MIXED_PRACTICE_LEVELS.every((level) => new Set(level.taskIds).size === level.taskIds.length));
});

test('the error ledger covers contract, scope, evidence, paraphrase, limit and grammar failures', () => {
  assert.deepEqual(new Set(rows.map(({ task }) => task.errorCode)), new Set(['wrong-format', 'wrong-scope', 'wrong-location', 'paraphrase-miss', 'word-limit', 'grammar-mismatch']));
});

test('guided repair, held-back submission, focus and persistence are explicit', async () => {
  const component = await readFile(new URL('../src/components/exam-practice/MixedPracticeLab.tsx', import.meta.url), 'utf8');
  for (const required of ['type="radio"', 'type="text"', 'Check decision', 'Submit all decisions', 'Repair this set', 'Repair this level', 'localStorage', 'focus()', 'aria-live="polite"', 'Confirm reset']) assert.match(component, new RegExp(required));
  assert.match(component, /answer keys still reach this browser/i);
  assert.match(component, /not secure Practice, Exam or proctored delivery/i);
});

test('storage is versioned and isolated to Mixed Practice', () => {
  assert.equal(MIXED_PRACTICE_STORAGE_KEY, 'welearn:ielts-reading:mixed-practice:v1');
});

test('the canonical page mounts all three English practice surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/mixed-practice/page.tsx', import.meta.url), 'utf8');
  for (const required of ['MixedGuidedPractice', 'MixedIndependentPractice', 'MixedProgressEngine', '6 passages · 36 decisions · 14 question families', "locale: 'en_US'"]) assert.match(page, new RegExp(required));
  assert.doesNotMatch(page, /Set mixto|Práctica mixta|Reiniciar/);
  assert.doesNotMatch(page, /IeltsReadingMixedQuestionTypeEngine/);
});

test('the old format-name quiz is no longer the canonical Mixed Practice experience', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/mixed-practice/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /IELTS_READING_MIXED_QUESTION_TYPE_SETS/);
  assert.match(page, /Hold every key until the full passage is complete/);
});

test('the guardian and blueprint freeze the Mixed Practice contract', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['MixedGuidedPractice', 'MixedIndependentPractice', 'MixedProgressEngine', '6 passages · 36 decisions · 14 question families']) assert.match(guardian, new RegExp(required));
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  assert.match(blueprint, /Mixed Practice must preserve the native response contract/);
  assert.match(blueprint, /6 passages and 36 authentic decisions across all 14 question families/);
});
