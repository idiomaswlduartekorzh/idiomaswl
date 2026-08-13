import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  TABLE_COMPLETION_GUIDED_PASSAGE_ID,
  TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  TABLE_COMPLETION_LEVELS,
  TABLE_COMPLETION_PASSAGES,
  TABLE_COMPLETION_STORAGE_KEY,
  countTableCompletionWords,
  getTableCompletionPassage,
  isTableCompletionCorrect,
  normalizeTableCompletionAnswer,
} from '../src/data/practica-exams/ielts-reading-table-completion-progress.ts';

const decisions = TABLE_COMPLETION_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));

test('the progressive bank contains six passages and thirty-six table decisions', () => {
  assert.equal(TABLE_COMPLETION_PASSAGES.length, 6);
  assert.equal(decisions.length, 36);
  assert.equal(new Set(TABLE_COMPLETION_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(decisions.map(({ decision }) => decision.id)).size, 36);
  assert.ok(TABLE_COMPLETION_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(TABLE_COMPLETION_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('each passage exposes three rows with two cells per row', () => {
  for (const passage of TABLE_COMPLETION_PASSAGES) {
    const counts = Object.groupBy(passage.decisions, (decision) => decision.rowHeading);
    assert.equal(Object.keys(counts).length, 3, passage.id);
    assert.ok(Object.values(counts).every((group) => group?.length === 2), passage.id);
    assert.equal(passage.columns.length, 3, passage.id);
  }
});

test('every primary answer is a literal passage span within its displayed limit', () => {
  for (const { passage, decision } of decisions) {
    assert.ok(normalizeTableCompletionAnswer(passage.passage).includes(normalizeTableCompletionAnswer(decision.answer)), decision.id);
    assert.ok(countTableCompletionWords(decision.answer) <= decision.maxWords, decision.id);
    assert.equal(isTableCompletionCorrect(decision, decision.answer), true, decision.id);
    assert.ok(decision.evidenceQuote.length >= 20, decision.id);
    assert.ok(decision.rowHeading.length >= 3 && decision.columnHeading.length >= 3, decision.id);
  }
});

test('the inherited cooling ambiguity accepts every grammatical exact span', () => {
  const wind = decisions.find(({ decision }) => decision.id === 'table-cooling-01-2')?.decision;
  assert.ok(wind);
  for (const accepted of ['prevailing winds', 'direction', 'the direction']) assert.equal(isTableCompletionCorrect(wind, accepted), true, accepted);
  assert.deepEqual(wind.alternatives, ['direction', 'the direction']);
});

test('the bank covers all six coordinate and answer-boundary diagnoses', () => {
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.errorCode)), new Set(['headers-ignored', 'wrong-row', 'wrong-column', 'grammar-mismatch', 'over-limit', 'copied-context']));
  assert.ok(decisions.every(({ decision }) => decision.trap.length >= 40));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(TABLE_COMPLETION_GUIDED_PASSAGE_ID, TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(TABLE_COMPLETION_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(TABLE_COMPLETION_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two coordinate drills lead into four complete tables', () => {
  assert.equal(TABLE_COMPLETION_LEVELS.length, 6);
  for (const level of TABLE_COMPLETION_LEVELS.slice(0, 2)) { assert.equal(level.decisionIds?.length, 4); assert.equal(level.masteryScore, 3); }
  for (const level of TABLE_COMPLETION_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined); assert.equal(level.passageIds.length, 1);
    const passage = getTableCompletionPassage(level.passageIds[0]); assert.ok(passage); assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('guided repair, closed independent feedback and versioned drafts are explicit', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/TableCompletionPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /<input/); assert.match(lab, /disabled=\{checked\}/); assert.match(lab, /Retry this cell/); assert.match(lab, /disabled=\{submitted\}/); assert.match(lab, /Submit full table/); assert.match(lab, /Press again to reset/); assert.match(lab, /drafts: Record<string/); assert.match(lab, /aria-label="Table row map"/);
});

test('storage is versioned and isolated to Table Completion', () => {
  assert.equal(TABLE_COMPLETION_STORAGE_KEY, 'welearn:ielts-reading:table-completion:v1');
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) for (const required of ['TableCompletionGuidedPractice', 'TableCompletionIndependentPractice', 'TableCompletionProgressEngine', 'SkillReviewSourceBlock']) assert.match(page, new RegExp(required));
  assert.match(publicPage, /isTableCompletion/); assert.match(canonical, /locale: 'en_US'/); assert.doesNotMatch(canonical, /Cómo resolver|Tres tablas|Práctica guiada|Reiniciar/);
});

test('the page states the security and factual-source boundaries', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx', import.meta.url), 'utf8');
  assert.match(canonical, /not a secure Exam or proctored mode/);
  assert.match(canonical, /candidate sources provide factual context but do not independently verify every claim/);
  assert.match(canonical, /prevailing winds, direction and the direction/);
});

test('the content guardian and blueprint pin Table before scaling again', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['TableCompletionGuidedPractice', 'TableCompletionIndependentPractice', 'TableCompletionProgressEngine']) assert.match(guardian, new RegExp(required));
  assert.doesNotMatch(guardian, /table-completion'[\s\S]{0,500}must render TableCompletionPassageBank/);
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  assert.match(blueprint, /Table Completion practice must treat the row and column headers as a single evidence coordinate/);
  assert.match(blueprint, /6 source-backed or conservatively bounded passages and 36 coordinate decisions/);
  assert.match(blueprint, /Next question-type vertical:\*\* Flow-chart Completion/);
});
