import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  TIME_MANAGEMENT_GUIDED_PASSAGE_ID,
  TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID,
  TIME_MANAGEMENT_LEGACY_STORAGE_KEY,
  TIME_MANAGEMENT_LEVELS,
  TIME_MANAGEMENT_PASSAGES,
  TIME_MANAGEMENT_STORAGE_KEY,
  getTimeManagementOptions,
  getTimeManagementPassage,
} from '../src/data/practica-exams/ielts-reading-time-management-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(TIME_MANAGEMENT_GUIDED_PASSAGE_ID, TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID);
  const progress = new Set(TIME_MANAGEMENT_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progress.has(TIME_MANAGEMENT_GUIDED_PASSAGE_ID), false);
  assert.equal(progress.has(TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progress.size, 4);
});

test('six source-backed passage plans expose thirty timing decisions', () => {
  const ids = new Set();
  assert.equal(TIME_MANAGEMENT_PASSAGES.length, 6);
  assert.equal(TIME_MANAGEMENT_PASSAGES.flatMap((passage) => passage.decisions).length, 30);
  for (const passage of TIME_MANAGEMENT_PASSAGES) {
    assert.ok(passage.sourceUrl.startsWith('https://'));
    assert.equal(passage.decisions.length, 5);
    assert.deepEqual(passage.decisions.map((decision) => decision.checkpointMinute), [3, 7, 10, 14, 18]);
    for (const decision of passage.decisions) {
      assert.equal(ids.has(decision.id), false, decision.id);
      ids.add(decision.id);
      assert.ok(passage.paragraphs.some((paragraph) => paragraph.id === decision.paragraphId));
      assert.ok(decision.secondsOnItem >= 0);
      assert.ok(decision.evidenceState.length > 12);
      assert.equal(decision.distractors.length, 2);
      assert.equal(new Set([decision.answer, ...decision.distractors]).size, 3);
      assert.ok(decision.explanation.length > 30);
      assert.ok(decision.trap.length > 30);
    }
  }
});

test('the engine has two pacing drills followed by four full passage plans', () => {
  assert.equal(TIME_MANAGEMENT_LEVELS.length, 6);
  assert.ok(TIME_MANAGEMENT_LEVELS.slice(0, 2).every((level) => level.decisionIds?.length === 4 && level.masteryScore === 3));
  assert.ok(TIME_MANAGEMENT_LEVELS.slice(2).every((level) => !level.decisionIds && level.passageIds.length === 1 && level.masteryScore === 4));
});

test('option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const level of TIME_MANAGEMENT_LEVELS.slice(0, 2)) {
    let firstScore = 0;
    for (const decisionId of level.decisionIds ?? []) {
      const passage = level.passageIds.map(getTimeManagementPassage).find((item) => item?.decisions.some((decision) => decision.id === decisionId));
      const decision = passage?.decisions.find((item) => item.id === decisionId);
      assert.ok(decision);
      const options = getTimeManagementOptions(decision, 0);
      assert.deepEqual(options, getTimeManagementOptions(decision, 0));
      positions.add(options.indexOf(decision.answer));
      if (options[0] === decision.answer) firstScore += 1;
    }
    assert.ok(firstScore < level.masteryScore, `${level.id}: always-first scored ${firstScore}/4`);
  }
  assert.ok(positions.size >= 3);
});

test('clean retries change order without changing the available actions', () => {
  let changed = 0;
  for (const passage of TIME_MANAGEMENT_PASSAGES) for (const decision of passage.decisions) {
    const first = getTimeManagementOptions(decision, 0);
    const retry = getTimeManagementOptions(decision, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 18);
});

test('the bank covers every time-management diagnosis family', () => {
  assert.deepEqual(new Set(TIME_MANAGEMENT_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => decision.errorCode))), new Set(['over-investment', 'restart-search', 'evidence-abandonment', 'unsupported-rush', 'review-mispriority', 'equal-time-fallacy']));
});

test('storage is versioned and scoped to time management', () => {
  assert.equal(TIME_MANAGEMENT_STORAGE_KEY, 'welearn:ielts-reading:time-management:v2');
  assert.equal(TIME_MANAGEMENT_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:time-management:v1');
});

test('public route mounts guided, independent and progress surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/habilidades/gestion-del-tiempo/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/TimeManagementPracticeLab.tsx', import.meta.url), 'utf8');
  for (const component of ['TimeManagementGuidedPractice', 'TimeManagementIndependentPractice', 'TimeManagementProgressEngine']) assert.match(page, new RegExp(component));
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
});
