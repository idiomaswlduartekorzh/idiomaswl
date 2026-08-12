import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  PARAPHRASE_GUIDED_PASSAGE_ID,
  PARAPHRASE_INDEPENDENT_PASSAGE_ID,
  PARAPHRASE_LEGACY_STORAGE_KEY,
  PARAPHRASE_LEVELS,
  PARAPHRASE_PASSAGES,
  PARAPHRASE_STORAGE_KEY,
  getParaphraseOptions,
  getParaphrasePassage,
} from '../src/data/practica-exams/ielts-reading-paraphrase-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(PARAPHRASE_GUIDED_PASSAGE_ID, PARAPHRASE_INDEPENDENT_PASSAGE_ID);
  const progress = new Set(PARAPHRASE_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progress.has(PARAPHRASE_GUIDED_PASSAGE_ID), false);
  assert.equal(progress.has(PARAPHRASE_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progress.size, 4);
});

test('six source-backed passages expose thirty proposition decisions', () => {
  const ids = new Set();
  assert.equal(PARAPHRASE_PASSAGES.length, 6);
  assert.equal(PARAPHRASE_PASSAGES.flatMap((passage) => passage.decisions).length, 30);
  for (const passage of PARAPHRASE_PASSAGES) {
    assert.ok(passage.sourceUrl.startsWith('https://'));
    assert.equal(passage.decisions.length, 5);
    for (const decision of passage.decisions) {
      assert.equal(ids.has(decision.id), false, decision.id);
      ids.add(decision.id);
      const paragraph = passage.paragraphs.find((item) => item.id === decision.paragraphId);
      assert.ok(paragraph?.text.includes(decision.source), `${decision.id}: source is not a literal passage span`);
      assert.ok(decision.invariant.length > 2);
      assert.equal(decision.distractors.length, 3);
      assert.equal(new Set([decision.answer, ...decision.distractors]).size, 4);
      assert.ok(decision.explanation.length > 20);
      assert.ok(decision.trap.length > 20);
    }
  }
});

test('the engine has two control drills followed by four full passage sets', () => {
  assert.equal(PARAPHRASE_LEVELS.length, 6);
  assert.ok(PARAPHRASE_LEVELS.slice(0, 2).every((level) => level.decisionIds?.length === 4 && level.masteryScore === 3));
  assert.ok(PARAPHRASE_LEVELS.slice(2).every((level) => !level.decisionIds && level.passageIds.length === 1 && level.masteryScore === 4));
});

test('option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const level of PARAPHRASE_LEVELS.slice(0, 2)) {
    let firstScore = 0;
    for (const decisionId of level.decisionIds ?? []) {
      const passage = level.passageIds.map(getParaphrasePassage).find((item) => item?.decisions.some((decision) => decision.id === decisionId));
      const decision = passage?.decisions.find((item) => item.id === decisionId);
      assert.ok(decision);
      const options = getParaphraseOptions(decision, 0);
      assert.deepEqual(options, getParaphraseOptions(decision, 0));
      positions.add(options.indexOf(decision.answer));
      if (options[0] === decision.answer) firstScore += 1;
    }
    assert.ok(firstScore < level.masteryScore, `${level.id}: always-first scored ${firstScore}/4`);
  }
  assert.ok(positions.size >= 3);
});

test('clean retries change ordering without changing the option set', () => {
  let changed = 0;
  for (const passage of PARAPHRASE_PASSAGES) for (const decision of passage.decisions) {
    const first = getParaphraseOptions(decision, 0);
    const retry = getParaphraseOptions(decision, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 18);
});

test('the bank covers all material distortion families', () => {
  assert.deepEqual(new Set(PARAPHRASE_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => decision.errorCode))), new Set(['entity-shift', 'scope-shift', 'certainty-shift', 'polarity-shift', 'cause-or-sequence-shift', 'comparison-shift']));
});

test('storage is versioned and scoped to paraphrase recognition', () => {
  assert.equal(PARAPHRASE_STORAGE_KEY, 'welearn:ielts-reading:paraphrase:v2');
  assert.equal(PARAPHRASE_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:paraphrase:v1');
});

test('public route mounts guided, independent and progress surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/habilidades/parafrasis/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/ParaphrasePracticeLab.tsx', import.meta.url), 'utf8');
  for (const component of ['ParaphraseGuidedPractice', 'ParaphraseIndependentPractice', 'ParaphraseProgressEngine']) assert.match(page, new RegExp(component));
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
});
