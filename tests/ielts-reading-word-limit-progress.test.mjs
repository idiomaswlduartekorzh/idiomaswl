import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  WORD_LIMIT_GUIDED_PASSAGE_ID,
  WORD_LIMIT_INDEPENDENT_PASSAGE_ID,
  WORD_LIMIT_LEGACY_STORAGE_KEY,
  WORD_LIMIT_LEVELS,
  WORD_LIMIT_PASSAGES,
  WORD_LIMIT_STORAGE_KEY,
  countWordLimitWords,
  normalizeWordLimitAnswer,
} from '../src/data/practica-exams/ielts-reading-word-limit-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(WORD_LIMIT_GUIDED_PASSAGE_ID, WORD_LIMIT_INDEPENDENT_PASSAGE_ID);
  const progress = new Set(WORD_LIMIT_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progress.has(WORD_LIMIT_GUIDED_PASSAGE_ID), false);
  assert.equal(progress.has(WORD_LIMIT_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progress.size, 4);
});

test('six source-backed passages expose thirty exact-span decisions', () => {
  const ids = new Set();
  assert.equal(WORD_LIMIT_PASSAGES.length, 6);
  assert.equal(WORD_LIMIT_PASSAGES.flatMap((passage) => passage.decisions).length, 30);
  for (const passage of WORD_LIMIT_PASSAGES) {
    assert.ok(passage.sourceUrl.startsWith('https://'));
    assert.equal(passage.decisions.length, 5);
    for (const decision of passage.decisions) {
      assert.equal(ids.has(decision.id), false, decision.id);
      ids.add(decision.id);
      const paragraph = passage.paragraphs.find((item) => item.id === decision.paragraphId);
      assert.ok(paragraph, decision.id);
      assert.ok(paragraph.text.includes(decision.evidenceQuote), `${decision.id}: evidence is not literal`);
      assert.ok(decision.evidenceQuote.toLowerCase().includes(decision.answer.toLowerCase()), `${decision.id}: answer is not in evidence`);
      assert.ok(countWordLimitWords(decision.answer) <= decision.maxWords, decision.id);
      assert.match(decision.instruction, /WORD/);
      assert.ok(decision.explanation.length > 20);
      assert.ok(decision.trap.length > 20);
    }
  }
});

test('the engine has two control drills followed by four full passage sets', () => {
  assert.equal(WORD_LIMIT_LEVELS.length, 6);
  assert.ok(WORD_LIMIT_LEVELS.slice(0, 2).every((level) => level.decisionIds?.length === 4 && level.masteryScore === 3));
  assert.ok(WORD_LIMIT_LEVELS.slice(2).every((level) => !level.decisionIds && level.passageIds.length === 1 && level.masteryScore === 4));
});

test('normalization and counting follow the displayed answer contract', () => {
  assert.equal(normalizeWordLimitAnswer('  Coastal   Carbon. '), 'coastal carbon');
  assert.equal(normalizeWordLimitAnswer('ＣＯＡＳＴＡＬ carbon'), 'coastal carbon');
  assert.equal(countWordLimitWords('coastal carbon'), 2);
  assert.equal(countWordLimitWords(''), 0);
  assert.equal(countWordLimitWords('work together!'), 2);
});

test('all answers rebuild a non-empty sentence without duplicated boundary tokens', () => {
  for (const passage of WORD_LIMIT_PASSAGES) for (const decision of passage.decisions) {
    const completed = `${decision.before} ${decision.answer} ${decision.after}`.replace(/\s+/g, ' ').trim();
    assert.ok(completed.length > decision.answer.length, decision.id);
    const beforeLast = normalizeWordLimitAnswer(decision.before).split(' ').at(-1);
    const answerFirst = normalizeWordLimitAnswer(decision.answer).split(' ')[0];
    const answerLast = normalizeWordLimitAnswer(decision.answer).split(' ').at(-1);
    const afterFirst = normalizeWordLimitAnswer(decision.after).split(' ')[0];
    assert.notEqual(beforeLast, answerFirst, `${decision.id}: duplicates left boundary`);
    if (afterFirst) assert.notEqual(answerLast, afterFirst, `${decision.id}: duplicates right boundary`);
  }
});

test('the bank covers every word-limit diagnosis family', () => {
  assert.deepEqual(new Set(WORD_LIMIT_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => decision.errorCode))), new Set(['over-limit', 'duplicate-frame-word', 'incomplete-span', 'grammar-mismatch', 'wrong-evidence', 'instruction-misread']));
});

test('storage is versioned and scoped to word-limit control', () => {
  assert.equal(WORD_LIMIT_STORAGE_KEY, 'welearn:ielts-reading:word-limit:v2');
  assert.equal(WORD_LIMIT_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:word-limit:v1');
});

test('public route mounts guided, independent and progress surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/habilidades/limite-de-palabras/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/WordLimitPracticeLab.tsx', import.meta.url), 'utf8');
  for (const component of ['WordLimitGuidedPractice', 'WordLimitIndependentPractice', 'WordLimitProgressEngine']) assert.match(page, new RegExp(component));
  assert.match(lab, /name={decision.id}/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
});
