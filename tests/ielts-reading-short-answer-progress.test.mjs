import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  SHORT_ANSWER_GUIDED_PASSAGE_ID,
  SHORT_ANSWER_INDEPENDENT_PASSAGE_ID,
  SHORT_ANSWER_LEVELS,
  SHORT_ANSWER_PASSAGES,
  SHORT_ANSWER_STORAGE_KEY,
  countShortAnswerWords,
  getShortAnswerPassage,
  isShortAnswerCorrect,
  normalizeShortAnswer,
} from '../src/data/practica-exams/ielts-reading-short-answer-progress.ts';

const rows = SHORT_ANSWER_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));

test('the progressive bank contains six passages and thirty-six factual decisions', () => {
  assert.equal(SHORT_ANSWER_PASSAGES.length, 6);
  assert.equal(rows.length, 36);
  assert.equal(new Set(SHORT_ANSWER_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(rows.map(({ decision }) => decision.id)).size, 36);
  assert.ok(SHORT_ANSWER_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(SHORT_ANSWER_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('every answer is a literal ordered passage span within its displayed limit', () => {
  for (const passage of SHORT_ANSWER_PASSAGES) {
    let previousOffset = -1;
    assert.equal(passage.decisions.length, 6, passage.id);
    for (const decision of passage.decisions) {
      const offset = normalizeShortAnswer(passage.passage).indexOf(normalizeShortAnswer(decision.answer));
      assert.ok(offset >= 0, decision.id);
      assert.ok(offset > previousOffset, `${decision.id} breaks passage order`);
      previousOffset = offset;
      assert.ok(countShortAnswerWords(decision.answer) <= decision.maxWords, decision.id);
      assert.equal(isShortAnswerCorrect(decision, decision.answer), true, decision.id);
      assert.ok(decision.evidenceQuote.length >= 20, decision.id);
    }
  }
});

test('the bank covers factual target types and all six diagnoses', () => {
  assert.deepEqual(new Set(rows.map(({ decision }) => decision.errorCode)), new Set(['wrong-target', 'wrong-evidence-zone', 'nearby-detail', 'copied-context', 'over-limit', 'outside-knowledge']));
  for (const target of ['person', 'thing', 'time', 'condition', 'quantity']) assert.ok(rows.some(({ decision }) => decision.target === target), target);
  assert.ok(rows.every(({ decision }) => decision.trap.length >= 40));
  for (const { decision } of rows) {
    if (decision.question.startsWith('Who')) assert.equal(decision.target, 'person', decision.id);
    if (decision.question.startsWith('Where')) assert.equal(decision.target, 'place', decision.id);
    if (decision.question.startsWith('When')) assert.equal(decision.target, 'time', decision.id);
  }
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(SHORT_ANSWER_GUIDED_PASSAGE_ID, SHORT_ANSWER_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(SHORT_ANSWER_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(SHORT_ANSWER_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(SHORT_ANSWER_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two target drills lead into four complete ordered sets', () => {
  assert.equal(SHORT_ANSWER_LEVELS.length, 6);
  for (const level of SHORT_ANSWER_LEVELS.slice(0, 2)) {
    assert.equal(level.decisionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of SHORT_ANSWER_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getShortAnswerPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('guided repair, held-back feedback, focus and persistence are explicit', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/ShortAnswerPracticeLab.tsx', import.meta.url), 'utf8');
  for (const required of ['<input', 'Check answer', 'Submit all answers', 'Repair this set', 'Repair this level', 'localStorage', 'focus()', 'aria-live="polite"']) assert.match(lab, new RegExp(required));
  assert.match(lab, /Answer keys still reach this browser|answer keys still reach this browser/i);
  assert.match(lab, /function openLevel/);
});

test('storage is versioned and isolated to Short Answer', () => {
  assert.equal(SHORT_ANSWER_STORAGE_KEY, 'welearn:ielts-reading:short-answer:v1');
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/short-answer/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) for (const required of ['ShortAnswerGuidedPractice', 'ShortAnswerIndependentPractice', 'ShortAnswerProgressEngine', 'SkillReviewSourceBlock']) assert.match(page, new RegExp(required));
  assert.match(publicPage, /isShortAnswer/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Cómo resolver|Práctica guiada|Reiniciar|Ubica la evidencia/);
});

test('the page states official order, target and security boundaries', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/short-answer/page.tsx', import.meta.url), 'utf8');
  assert.match(canonical, /person, place, time, quantity, object, reason or result/);
  assert.match(canonical, /Follow the evidence in order/);
  assert.match(canonical, /not a secure Exam or proctored mode/);
  assert.match(canonical, /Candidate sources provide factual context/);
});

test('the old immediate-feedback bank is no longer the canonical learning experience', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/short-answer/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(canonical, /ShortAnswerPassageBank/);
  assert.doesNotMatch(canonical, /IELTS_SHORT_ANSWER_PASSAGES/);
});

test('the guardian pins the public rewrite and the blueprint freezes the method', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['ShortAnswerGuidedPractice', 'ShortAnswerIndependentPractice', 'ShortAnswerProgressEngine', 'public rewrite must include']) assert.match(guardian, new RegExp(required));
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  assert.match(blueprint, /Short Answer practice must classify the requested factual target before scanning/);
  assert.match(blueprint, /A nearby true detail that answers a different question is a distractor/);
  assert.match(blueprint, /6 source-backed or conservatively bounded passages and 36 ordered factual-detail decisions/);
  assert.match(blueprint, /Next product vertical:\*\* Mixed Practice integration/);
});
