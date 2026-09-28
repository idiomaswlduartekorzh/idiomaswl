import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import master from '../src/data/mocks/goethe-b1-master-set-1.ts';
import { GOETHE_B1_ORIGINAL_SETS, GOETHE_B1_ORIGINAL_SOURCES } from '../src/data/mocks/goethe-b1-original-sets.ts';
import { getGoetheB1PracticeMock, getMock } from '../src/data/mocks/index.ts';
import { getGoetheB1Release } from '../src/lib/goethe/b1-release.ts';

const allSets = [master, ...Object.values(GOETHE_B1_ORIGINAL_SETS)];
const topicLedger = JSON.parse(readFileSync(new URL('../config/goethe-b1-harness/topic-ledger.json', import.meta.url), 'utf8'));

function sectionSize(section) {
  const question = section.questions[0];
  return question?.type === 'matching' ? question.items.length : section.questions.length;
}

test('the expanded B1 bank contains ten distinct, structurally complete mocks', () => {
  assert.equal(allSets.length, 10);
  assert.equal(topicLedger.targetSets, 10);
  assert.equal(topicLedger.sets.length, 10);
  assert.deepEqual(allSets.map(mock => mock.id), Array.from({ length: 10 }, (_, index) => `b1-${index + 1}`));
  assert.equal(new Set(GOETHE_B1_ORIGINAL_SOURCES.map(source => source.topicKey)).size, 9);
  assert.deepEqual(GOETHE_B1_ORIGINAL_SOURCES.map(source => source.topicKey), topicLedger.sets.slice(1).map(entry => entry.topicKey));

  for (const mock of allSets) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    const writing = mock.sections.filter(section => section.skill === 'writing');
    const speaking = mock.sections.filter(section => section.skill === 'speaking');
    assert.deepEqual(reading.map(sectionSize), [6, 6, 7, 7, 4], `${mock.id}: official Lesen task counts`);
    assert.deepEqual(writing.map(section => section.questions[0].minWords), [80, 80, 40], `${mock.id}: official Schreiben targets`);
    assert.deepEqual(speaking.map(section => section.questions[0].partNumber), [1, 2, 3], `${mock.id}: official Sprechen parts`);
    assert.deepEqual(mock.sections.map(section => section.part), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  }
});

test('objective keys are valid, varied and contain one no-match item per mock', () => {
  for (const mock of allSets) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    const matching = reading[2].questions[0];
    assert.equal(matching.type, 'matching');
    assert.equal(matching.items.filter(item => item.answer === '0').length, 1, `${mock.id}: one zero option`);
    const threeChoice = reading.flatMap(section => section.questions)
      .filter(question => question.type === 'mcq' && question.options.length === 3);
    assert.deepEqual(new Set(threeChoice.map(question => question.answer)), new Set([0, 1, 2]), `${mock.id}: balanced option positions`);
    for (const question of threeChoice) assert.ok(question.answer >= 0 && question.answer < question.options.length);
  }
});

test('new B1 themes do not repeat the rejected repair-cafe motif or ship audio substitutes', () => {
  const serialized = JSON.stringify(GOETHE_B1_ORIGINAL_SOURCES);
  assert.doesNotMatch(serialized, /reparatur\s*-?\s*caf[eé]|repair\s*-?\s*caf[eé]|gemeinschaftswerkstatt|reparaturservice/i);
  for (const mock of Object.values(GOETHE_B1_ORIGINAL_SETS)) {
    assert.doesNotMatch(JSON.stringify(mock), /transcript|audioUrl|\.mp3/i, mock.id);
    assert.equal(mock.sections.some(section => section.skill === 'listening'), false, mock.id);
  }
});

test('each set has an original topic and no duplicated source or writing assignment', () => {
  const sourceTexts = Object.values(GOETHE_B1_ORIGINAL_SETS).flatMap(mock => mock.sections
    .filter(section => section.skill === 'reading')
    .map(section => section.passage));
  const writingAssignments = Object.values(GOETHE_B1_ORIGINAL_SETS).flatMap(mock => mock.sections
    .filter(section => section.skill === 'writing')
    .flatMap(section => section.questions.map(question => question.stimulus)));
  assert.equal(new Set(sourceTexts).size, sourceTexts.length);
  assert.equal(new Set(writingAssignments).size, writingAssignments.length);
});

test('all ten full exams fail closed while Lesen, Schreiben and Sprechen remain available', () => {
  for (let number = 1; number <= 10; number += 1) {
    const id = `b1-${number}`;
    const release = getGoetheB1Release(id);
    assert.equal(release?.state, 'AUDIO_BLOCKED', id);
    assert.equal(release?.audioReady, false, id);
    assert.equal(getMock('goethe', id), null, `${id}: full exam must stay held`);
    assert.ok(getGoetheB1PracticeMock(id, 'reading'), `${id}: Lesen practice`);
    assert.ok(getGoetheB1PracticeMock(id, 'writing', 3), `${id}: Schreiben Teil 3`);
    assert.ok(getGoetheB1PracticeMock(id, 'speaking', 2), `${id}: Sprechen Teil 2`);
    assert.equal(getGoetheB1PracticeMock(id, 'reading')?.title, `Goethe-Zertifikat B1 · Set ${number} · Lesen`);
  }
});

test('the generated bank has enough B1 reading substance for every task family', () => {
  for (const mock of Object.values(GOETHE_B1_ORIGINAL_SETS)) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    assert.ok(reading[0].passage.split(/\s+/).length >= 180, `${mock.id}: Teil 1 length`);
    assert.ok(reading[1].passage.split(/\s+/).length >= 190, `${mock.id}: Teil 2 length`);
    assert.equal((reading[2].passage.match(/^[A-J] ·/gm) ?? []).length, 10, `${mock.id}: ten advertisements`);
    assert.equal((reading[3].passage.match(/^\d{2} ·/gm) ?? []).length, 7, `${mock.id}: seven opinions`);
    assert.ok(reading[4].passage.split(/\s+/).length >= 100, `${mock.id}: Teil 5 length`);
  }
});
