import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import golden from '../src/data/mocks/goethe-a2-golden-set-1.ts';
import { GOETHE_A2_SETS } from '../src/data/mocks/goethe-a2-sets.ts';
import mock from '../src/data/mocks/goethe-a2-set-1.ts';
import { buildGoldenAudioPlan, buildGoldenCandidate, countMockResponses, validateGoldenSet, validateGoetheA2Collection } from '../scripts/lib/goethe-a2-golden-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('golden set preserves the complete public A2 task architecture', () => {
  assert.deepEqual(validateGoldenSet(golden, root), []);
  assert.deepEqual(golden.reading.parts.map(part => part.items?.length ?? part.profiles.length), [5, 5, 5, 5]);
  assert.deepEqual(golden.listening.parts.map(part => part.items.length), [5, 5, 5, 5]);
  assert.deepEqual(golden.listening.parts.map(part => part.plays), [2, 1, 1, 2]);
});

test('ten original sets satisfy the same frozen Goethe A2 contract', () => {
  assert.deepEqual(validateGoetheA2Collection(GOETHE_A2_SETS, root), []);
  assert.equal(GOETHE_A2_SETS.length, 10);
  for (const set of GOETHE_A2_SETS) {
    assert.deepEqual(set.reading.parts.map(part => part.items?.length ?? part.profiles.length), [5, 5, 5, 5]);
    assert.deepEqual(set.listening.parts.map(part => part.items.length), [5, 5, 5, 5]);
    assert.equal(set.status, 'AUDIO_BLOCKED');
  }
});

test('worked examples match the official sheets and stay outside the 45 scored responses', () => {
  assert.ok(golden.reading.parts[0].example);
  assert.ok(golden.reading.parts[1].example);
  assert.ok(golden.reading.parts[3].example);
  assert.ok(golden.listening.parts[1].example);
  assert.ok(golden.listening.parts[3].example);
  assert.equal(countMockResponses(mock), 45);
});

test('Hören Teil 2 uses the official stage table shape with one consumed example option', () => {
  const part = golden.listening.parts[1];
  assert.equal(part.options.length, 9);
  assert.deepEqual(part.items.map(item => item.number), [6, 7, 8, 9, 10]);
  const used = new Set([part.example.answer, ...part.items.map(item => item.answer)]);
  assert.equal(used.size, 6);
  assert.equal(part.options.filter(option => !used.has(option.letter)).length, 3);
});

test('objective keys are balanced without changing the natural item logic', () => {
  const reading = golden.reading.parts.slice(0, 3).flatMap(part => part.items);
  assert.deepEqual([0, 1, 2].map(position => reading.filter(item => item.answer === position).length), [5, 5, 5]);
  const listening = [golden.listening.parts[0], golden.listening.parts[2]].flatMap(part => part.items);
  assert.deepEqual([...([0, 1, 2].map(position => listening.filter(item => item.answer === position).length))].sort(), [3, 3, 4]);
});

test('runtime adapter exposes 13 parts and 45 responses without publishing audio', () => {
  assert.equal(mock.sections.length, 13);
  assert.equal(countMockResponses(mock), 45);
  assert.deepEqual(mock.sections.slice(0, 10).map(section => section.skill), ['reading', 'reading', 'reading', 'reading', 'listening', 'listening', 'listening', 'listening', 'writing', 'writing']);
  assert.equal(mock.sections.filter(section => section.skill === 'listening').every(section => section.mediaStatus === 'script-ready-audio-blocked' && section.comingSoon), true);
});

test('Lesen Teil 4 has four scored matches, one X and one unused distractor', () => {
  const part = golden.reading.parts[3];
  assert.equal(part.profiles.filter(profile => profile.answer === 'X').length, 1);
  const used = new Set([part.example.answer, ...part.profiles.map(profile => profile.answer).filter(answer => answer !== 'X')]);
  assert.equal(used.size, 5);
  assert.equal(part.adverts.filter(ad => !used.has(ad.letter)).length, 1);
});

test('audio plan is one locked master with repetitions, pauses and transfer window', () => {
  const candidate = buildGoldenCandidate(golden);
  const plan = buildGoldenAudioPlan(golden, candidate.candidateFingerprint);
  assert.deepEqual(plan.sequence.map(part => part.plays), [2, 1, 1, 2]);
  assert.equal(plan.master.navigation.pause, false);
  assert.equal(plan.master.navigation.seek, false);
  assert.equal(plan.master.navigation.replay, false);
  assert.equal(plan.master.containsTransferWindow, true);
  assert.equal(plan.status, 'script-ready-audio-blocked');
  assert.equal(plan.sequence[1].scripts.length, 1);
  assert.equal(plan.sequence[1].scripts[0].turns.length, golden.listening.parts[1].turns.length);
  assert.equal(plan.sequence[3].scripts.length, 1);
  assert.equal(plan.sequence[3].scripts[0].turns.length, golden.listening.parts[3].turns.length);
  assert.equal(plan.sequence.flatMap(part => part.scripts).every(script => script.turns.length > 0), true);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'artifacts/goethe-a2-harness/set-1/golden-1/candidate.json'), 'utf8')), candidate);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'src/data/mocks/goethe-a2-set-1-audio.json'), 'utf8')), plan);
});

test('Sprechen keeps four shared Teil 1 cards and distinct Teil 2 candidate cards', () => {
  assert.equal(golden.speaking.tasks[0].cards.length, 4);
  const part2 = golden.speaking.tasks[1];
  assert.notEqual(part2.candidateA.prompt, part2.candidateB.prompt);
  assert.equal(part2.candidateA.cues.length, 4);
  assert.equal(part2.candidateB.cues.length, 4);
});

test('productive rubrics preserve the official 20-point writing and 25-point speaking grids', () => {
  assert.deepEqual(golden.scoring.writing.rubric.pointsPerCriterion, [5, 3.5, 2, 0.5, 0]);
  const speaking = golden.scoring.speaking.rubric;
  assert.equal((speaking.part1PointsPerCriterion[0] * 2) + (speaking.part2PointsPerCriterion[0] * 2) + (speaking.part3PointsPerCriterion[0] * 2) + speaking.pronunciationPoints[0], 25);
  assert.deepEqual(golden.scoring.pass, { totalMinimum: 60, writtenMinimum: 45, writtenMaximum: 75, oralMinimum: 15, oralMaximum: 25 });
});
