import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MULTIPLE_CHOICE_GUIDED_PASSAGE_ID,
  MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID,
  MULTIPLE_CHOICE_LEGACY_STORAGE_KEY,
  MULTIPLE_CHOICE_LEVELS,
  MULTIPLE_CHOICE_PASSAGES,
  MULTIPLE_CHOICE_STORAGE_KEY,
  getMultipleChoiceOptions,
  getMultipleChoicePassage,
} from '../src/data/practica-exams/ielts-reading-multiple-choice-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(MULTIPLE_CHOICE_GUIDED_PASSAGE_ID, MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID);
  const progress = new Set(MULTIPLE_CHOICE_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progress.has(MULTIPLE_CHOICE_GUIDED_PASSAGE_ID), false);
  assert.equal(progress.has(MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progress.size, 4);
});

test('six source-backed passages expose thirty one-best-answer decisions', () => {
  const ids = new Set();
  assert.equal(MULTIPLE_CHOICE_PASSAGES.length, 6);
  assert.equal(MULTIPLE_CHOICE_PASSAGES.flatMap((passage) => passage.decisions).length, 30);
  for (const passage of MULTIPLE_CHOICE_PASSAGES) {
    assert.ok(passage.sourceUrl.startsWith('https://'));
    assert.equal(passage.decisions.length, 5);
    for (const decision of passage.decisions) {
      assert.equal(ids.has(decision.id), false, decision.id);
      ids.add(decision.id);
      assert.ok(decision.question.length > 15);
      assert.ok(decision.evidence.length > 15);
      assert.equal(decision.distractors.length, 3);
      assert.equal(new Set([decision.answer, ...decision.distractors]).size, 4);
      assert.ok(decision.explanation.length > 20);
      assert.ok(decision.trap.length > 20);
    }
  }
});

test('the engine has two distractor drills followed by four full passage sets', () => {
  assert.equal(MULTIPLE_CHOICE_LEVELS.length, 6);
  assert.ok(MULTIPLE_CHOICE_LEVELS.slice(0, 2).every((level) => level.decisionIds?.length === 4 && level.masteryScore === 3));
  assert.ok(MULTIPLE_CHOICE_LEVELS.slice(2).every((level) => !level.decisionIds && level.passageIds.length === 1 && level.masteryScore === 4));
});

test('option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const level of MULTIPLE_CHOICE_LEVELS.slice(0, 2)) {
    let firstScore = 0;
    for (const decisionId of level.decisionIds ?? []) {
      const passage = level.passageIds.map(getMultipleChoicePassage).find((item) => item?.decisions.some((decision) => decision.id === decisionId));
      const decision = passage?.decisions.find((item) => item.id === decisionId);
      assert.ok(decision);
      const options = getMultipleChoiceOptions(decision, 0);
      assert.deepEqual(options, getMultipleChoiceOptions(decision, 0));
      positions.add(options.indexOf(decision.answer));
      if (options[0] === decision.answer) firstScore += 1;
    }
    assert.ok(firstScore < level.masteryScore, `${level.id}: always-first scored ${firstScore}/4`);
  }
  assert.ok(positions.size >= 3);
});

test('clean retries change ordering without changing the option set', () => {
  let changed = 0;
  for (const passage of MULTIPLE_CHOICE_PASSAGES) for (const decision of passage.decisions) {
    const first = getMultipleChoiceOptions(decision, 0);
    const retry = getMultipleChoiceOptions(decision, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 18);
});

test('the bank covers all multiple-choice error families', () => {
  assert.deepEqual(new Set(MULTIPLE_CHOICE_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => decision.errorCode))), new Set(['stem-misread', 'lexical-echo', 'partial-truth', 'scope-inflation', 'wrong-relationship', 'unsupported-claim']));
});

test('storage is versioned and scoped to multiple choice', () => {
  assert.equal(MULTIPLE_CHOICE_STORAGE_KEY, 'welearn:ielts-reading:multiple-choice:v2');
  assert.equal(MULTIPLE_CHOICE_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:multiple-choice:v1');
});

test('public route mounts guided, independent and progress surfaces in English', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/multiple-choice/page.tsx', import.meta.url), 'utf8');
  const publicTemplate = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/MultipleChoicePracticeLab.tsx', import.meta.url), 'utf8');
  for (const component of ['MultipleChoiceGuidedPractice', 'MultipleChoiceIndependentPractice', 'MultipleChoiceProgressEngine']) {
    assert.match(page, new RegExp(component));
    assert.match(publicTemplate, new RegExp(component));
  }
  assert.match(publicTemplate, /isMultipleChoice/);
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
  assert.match(page, /locale: 'en_US'/);
});

test('local browser QA cannot load the production GTM container', async () => {
  const layout = await readFile(new URL('../src/app/layout.tsx', import.meta.url), 'utf8');
  assert.match(layout, /const ENTORNO = process\.env\.VERCEL_ENV/);
  assert.match(layout, /const CARGAR_GTM = process\.env\.NODE_ENV === 'production' && ENTORNO === 'production'/);
  assert.doesNotMatch(layout, /ENTORNO !== 'preview'/);
});
