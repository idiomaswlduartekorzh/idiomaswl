import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import master, { GOETHE_B1_MASTER_1_BLUEPRINT } from '../src/data/mocks/goethe-b1-master-set-1.ts';
import { getGoetheB1PracticeMock, getMock } from '../src/data/mocks/index.ts';
import { getGoetheB1Release } from '../src/lib/goethe/b1-release.ts';

const reading = master.sections.filter(section => section.skill === 'reading');
const writing = master.sections.filter(section => section.skill === 'writing');
const speaking = master.sections.filter(section => section.skill === 'speaking');

test('the B1 master follows the official module and task counts', () => {
  assert.equal(master.id, 'b1-1');
  assert.equal(GOETHE_B1_MASTER_1_BLUEPRINT.modules.reading.minutes, 65);
  assert.equal(GOETHE_B1_MASTER_1_BLUEPRINT.modules.listening.itemCount, 30);
  assert.deepEqual(reading.map(section => section.questions[0]?.type === 'matching'
    ? section.questions[0].items.length
    : section.questions.length), [6, 6, 7, 7, 4]);
  assert.equal(writing.length, 3);
  assert.deepEqual(writing.map(section => section.questions[0].minWords), [80, 80, 40]);
  assert.equal(speaking.length, 3);
  assert.equal(GOETHE_B1_MASTER_1_BLUEPRINT.modules.speaking.preparationMinutes, 15);
});

test('answer positions and positions in opinion tasks do not collapse into a pattern', () => {
  const objectiveAnswers = reading.flatMap(section => section.questions.flatMap(question => {
    if (question.type === 'mcq') return [question.answer];
    if (question.type === 'matching') return question.items.map(item => item.answer);
    return [];
  }));
  const threeChoice = reading.flatMap(section => section.questions)
    .filter(question => question.type === 'mcq' && question.options.length === 3)
    .map(question => question.answer);
  assert.deepEqual(new Set(threeChoice), new Set([0, 1, 2]));
  assert.ok(objectiveAnswers.includes('0'), 'Teil 3 must contain exactly one no-match answer');
  assert.equal(objectiveAnswers.filter(answer => answer === '0').length, 1);
  const opinions = reading[3].questions.map(question => question.answer);
  assert.deepEqual(opinions, [0, 1, 0, 1, 0, 1, 0]);
});

test('Hören and the full exam fail closed while approved skills remain available', () => {
  const release = getGoetheB1Release('b1-1');
  assert.equal(release?.state, 'AUDIO_BLOCKED');
  assert.equal(release?.audioReady, false);
  assert.equal(getMock('goethe', 'b1-1'), null);
  assert.equal(getMock('goethe', 'set-1'), null);
  assert.equal(getMock('goethe', 'b1-2'), null);
  assert.ok(getGoetheB1PracticeMock('b1-1', 'reading'));
  assert.ok(getGoetheB1PracticeMock('b1-1', 'writing', 3));
  assert.ok(getGoetheB1PracticeMock('b1-1', 'speaking', 2));
});

test('the B1 practice payload contains no transcript or audio URL', () => {
  const serialized = JSON.stringify(master);
  assert.doesNotMatch(serialized, /transcript|audioUrl|\.mp3/i);
  assert.equal(master.sections.some(section => section.skill === 'listening'), false);
});

test('speaking uses deterministic editorial assets, not generated photography', () => {
  const speakingQuestion = speaking[2].questions[0];
  assert.equal(speakingQuestion.type, 'speak');
  for (const asset of speakingQuestion.imageUrls ?? []) {
    assert.match(asset, /^\/images\/goethe\/b1-1\/.+\.svg$/);
    assert.ok(existsSync(`public${asset}`), `${asset} must exist`);
  }
});

test('catalog and practice copy expose one master while keeping Hören blocked', () => {
  const catalog = readFileSync(new URL('../src/data/exams.ts', import.meta.url), 'utf8');
  const library = readFileSync(new URL('../src/app/(site)/practica/goethe/[skill]/[practiceSkill]/page.tsx', import.meta.url), 'utf8');
  assert.match(catalog, /id: 'b1-1'.+Referenzmock 1/);
  assert.doesNotMatch(catalog, /id: 'b1-[2-5]'.+Goethe-Zertifikat B1/);
  assert.match(library, /level === 'b1' && available[\s\S]+\? \[1\]/);
  assert.match(library, /Hören y.+examen B1 completo.+bloqueados/s);
});
