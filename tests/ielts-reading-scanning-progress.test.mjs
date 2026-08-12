import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  SCANNING_GUIDED_PASSAGE_ID,
  SCANNING_INDEPENDENT_PASSAGE_ID,
  SCANNING_LEGACY_STORAGE_KEY,
  SCANNING_LEVELS,
  SCANNING_PASSAGES,
  SCANNING_STORAGE_KEY,
  getEvidenceOptions,
  getScanningPassage,
  getSignalOptions,
} from '../src/data/practica-exams/ielts-reading-scanning-progress.ts';

test('guided, independent and progress pools remain separated', () => {
  assert.notEqual(SCANNING_GUIDED_PASSAGE_ID, SCANNING_INDEPENDENT_PASSAGE_ID);
  const progress = new Set(SCANNING_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(progress.has(SCANNING_GUIDED_PASSAGE_ID), false);
  assert.equal(progress.has(SCANNING_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(progress.size, 4);
});

test('six source-backed passages expose thirty exact evidence decisions', () => {
  assert.equal(SCANNING_PASSAGES.length, 6);
  assert.equal(SCANNING_PASSAGES.flatMap((passage) => passage.targets).length, 30);
  for (const passage of SCANNING_PASSAGES) {
    assert.equal(passage.targets.length, 5);
    assert.ok(passage.sourceUrl.startsWith('https://'));
    const ids = new Set(passage.targets.map((target) => target.id));
    assert.equal(ids.size, 5);
    for (const target of passage.targets) {
      const paragraph = passage.paragraphs.find((item) => item.id === target.paragraphId);
      assert.ok(paragraph, target.id);
      assert.ok(paragraph.text.includes(target.evidence), `${target.id}: evidence is not literal`);
      assert.equal(target.signalOptions.length, 4);
      assert.equal(new Set(target.signalOptions).size, 4);
      assert.ok(target.signalOptions.includes(target.bestSignal));
    }
  }
});

test('the engine has two focused drills followed by four full sets', () => {
  assert.equal(SCANNING_LEVELS.length, 6);
  assert.deepEqual(SCANNING_LEVELS.slice(0, 2).map((level) => level.mode), ['signal', 'evidence']);
  assert.ok(SCANNING_LEVELS.slice(0, 2).every((level) => level.targetIds?.length === 4 && level.masteryScore === 3));
  assert.ok(SCANNING_LEVELS.slice(2).every((level) => !level.targetIds && level.passageIds.length === 1 && level.masteryScore === 4));
});

test('option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const level of SCANNING_LEVELS.slice(0, 2)) {
    let firstScore = 0;
    for (const targetId of level.targetIds ?? []) {
      const passage = level.passageIds.map(getScanningPassage).find((item) => item?.targets.some((target) => target.id === targetId));
      assert.ok(passage);
      const target = passage.targets.find((item) => item.id === targetId);
      assert.ok(target);
      const options = level.mode === 'signal' ? getSignalOptions(target, 0) : getEvidenceOptions(passage, target, 0);
      const answer = level.mode === 'signal' ? target.bestSignal : target.evidence;
      assert.deepEqual(options, level.mode === 'signal' ? getSignalOptions(target, 0) : getEvidenceOptions(passage, target, 0));
      positions.add(options.indexOf(answer));
      if (options[0] === answer) firstScore += 1;
    }
    assert.ok(firstScore < level.masteryScore, `${level.id}: always-first scored ${firstScore}/4`);
  }
  assert.ok(positions.size >= 3);
});

test('clean retries change ordering without changing the option set', () => {
  let changed = 0;
  for (const passage of SCANNING_PASSAGES.slice(2)) {
    for (const target of passage.targets) {
      const first = getEvidenceOptions(passage, target, 0);
      const retry = getEvidenceOptions(passage, target, 1);
      assert.deepEqual(first.toSorted(), retry.toSorted());
      if (first.join('|') !== retry.join('|')) changed += 1;
    }
  }
  assert.ok(changed >= 12);
});

test('storage is versioned and scoped to scanning', () => {
  assert.equal(SCANNING_STORAGE_KEY, 'welearn:ielts-reading:scanning:v2');
  assert.equal(SCANNING_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:scanning:v1');
});

test('public route mounts guided, independent and progress surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/habilidades/scanning/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/ScanningPracticeLab.tsx', import.meta.url), 'utf8');
  for (const component of ['ScanningPracticeEngine', 'ScanningIndependentPractice', 'ScanningProgressEngine']) assert.match(page, new RegExp(component));
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(page, /ielts-reading-practice-engine-blueprint\.md/);
});
