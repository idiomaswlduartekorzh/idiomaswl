import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  SKIMMING_GUIDED_PASSAGE_ID,
  SKIMMING_INDEPENDENT_PASSAGE_ID,
  SKIMMING_LEGACY_STORAGE_KEY,
  SKIMMING_LEVELS,
  SKIMMING_STORAGE_KEY,
  getSkimmingFunctionOptionIds,
  getSkimmingParagraph,
  getSkimmingPassage,
} from '../src/data/practica-exams/ielts-reading-skimming-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(SKIMMING_GUIDED_PASSAGE_ID, SKIMMING_INDEPENDENT_PASSAGE_ID);
  const progressPassages = new Set(SKIMMING_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progressPassages.has(SKIMMING_GUIDED_PASSAGE_ID), false);
  assert.equal(progressPassages.has(SKIMMING_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progressPassages.size, 4);
});

test('the engine has two micro-drills followed by four complete passage maps', () => {
  assert.equal(SKIMMING_LEVELS.length, 6);
  for (const level of SKIMMING_LEVELS.slice(0, 2)) {
    assert.equal(level.questionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of SKIMMING_LEVELS.slice(2)) {
    assert.equal(level.questionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    assert.equal(level.masteryScore, 4);
  }
});

test('all six source-backed passages expose auditable paragraph roles', () => {
  const passageIds = [
    SKIMMING_GUIDED_PASSAGE_ID,
    SKIMMING_INDEPENDENT_PASSAGE_ID,
    ...new Set(SKIMMING_LEVELS.flatMap((level) => level.passageIds)),
  ];
  assert.equal(new Set(passageIds).size, 6);
  for (const passageId of passageIds) {
    const passage = getSkimmingPassage(passageId);
    assert.ok(passage, passageId);
    assert.equal(passage.paragraphs.length, 5);
    assert.ok(passage.sourceUrl.startsWith('https://'));
    assert.equal(new Set(passage.paragraphs.map((paragraph) => paragraph.functionLabel)).size, 5);
    assert.ok(passage.paragraphs.every((paragraph) => paragraph.evidence.length >= 55));
  }
});

test('drill ordering is deterministic, varies and defeats an always-first strategy', () => {
  const correctPositions = new Set();
  for (const [attemptSeed, level] of SKIMMING_LEVELS.slice(0, 2).entries()) {
    let firstChoiceScore = 0;
    for (const questionId of level.questionIds ?? []) {
      const passage = level.passageIds.map(getSkimmingPassage).find((item) => item?.paragraphs.some((paragraph) => paragraph.id === questionId));
      assert.ok(passage, questionId);
      const paragraph = getSkimmingParagraph(passage, questionId);
      assert.ok(paragraph, questionId);
      const order = getSkimmingFunctionOptionIds(passage, paragraph, attemptSeed);
      assert.deepEqual(order, getSkimmingFunctionOptionIds(passage, paragraph, attemptSeed));
      assert.equal(order.length, 4);
      assert.equal(new Set(order).size, 4);
      const position = order.indexOf(paragraph.id);
      correctPositions.add(position);
      if (position === 0) firstChoiceScore += 1;
    }
    assert.ok(firstChoiceScore < level.masteryScore, `${level.id}: always-first scored ${firstChoiceScore}/4`);
  }
  assert.ok(correctPositions.size >= 3, `correct positions used only ${[...correctPositions].join(', ')}`);
});

test('a retry changes order while preserving the same option set', () => {
  const level = SKIMMING_LEVELS[0];
  let changed = 0;
  for (const questionId of level.questionIds ?? []) {
    const passage = level.passageIds.map(getSkimmingPassage).find((item) => item?.paragraphs.some((paragraph) => paragraph.id === questionId));
    assert.ok(passage);
    const paragraph = getSkimmingParagraph(passage, questionId);
    assert.ok(paragraph);
    const first = getSkimmingFunctionOptionIds(passage, paragraph, 0);
    const retry = getSkimmingFunctionOptionIds(passage, paragraph, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join(',') !== retry.join(',')) changed += 1;
  }
  assert.ok(changed >= 2);
});

test('storage is versioned and scoped to skimming', () => {
  assert.equal(SKIMMING_STORAGE_KEY, 'welearn:ielts-reading:skimming:v2');
  assert.equal(SKIMMING_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:skimming:v1');
});

test('the public route mounts guided, independent and progress practice', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/habilidades/skimming/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/SkimmingPracticeLab.tsx', import.meta.url), 'utf8');
  const whatsapp = await readFile(new URL('../src/components/WhatsAppFloat.tsx', import.meta.url), 'utf8');
  for (const component of ['SkimmingPracticeEngine', 'SkimmingIndependentPractice', 'SkimmingProgressEngine']) {
    assert.match(page, new RegExp(component));
  }
  assert.match(lab, /type="radio"/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /opens in a new tab/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
  assert.match(whatsapp, /body:has\(\[data-active-practice="true"\]\) \.wl-wa-float \{\s*display: none;/);
});
