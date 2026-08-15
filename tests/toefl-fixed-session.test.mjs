import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildToeflFixedStages,
  countStageInteractions,
  flattenForwardItems,
} from '../src/lib/toefl/fixed-session.ts';

const items = (count, type = 'toefl-reading-single') => Array.from({ length: count }, (_, index) => ({
  type,
  id: `${type}-${index + 1}`,
}));

const mock = {
  id: 'set-test',
  examSlug: 'toefl',
  title: 'Test fixture',
  subtitle: '',
  timeMinutes: 90,
  sections: [
    { part: 1, skill: 'reading', moduleId: 'reading-1', title: 'R1', instructions: '', questions: [{ type: 'wordcomplete', id: 'ctw-1', blanks: items(20, 'blank') }] },
    { part: 2, skill: 'reading', moduleId: 'reading-2', title: 'R2', instructions: '', questions: items(20) },
    { part: 3, skill: 'listening', moduleId: 'listening-1', title: 'L1', instructions: '', questions: items(18, 'toefl-listening-single') },
    { part: 4, skill: 'listening', moduleId: 'listening-2', title: 'L2', instructions: '', questions: items(16, 'toefl-listening-single') },
    { part: 5, skill: 'writing', title: 'Build', instructions: '', questions: items(10, 'toefl-build-sentence') },
    { part: 6, skill: 'writing', title: 'Constructed', instructions: '', questions: [{ type: 'write', id: 'email', taskNumber: 1 }, { type: 'write', id: 'discussion', taskNumber: 2 }] },
    { part: 7, skill: 'speaking', moduleId: 'speaking', title: 'Speaking', instructions: '', questions: [...items(7, 'repeat'), ...items(4, 'speak')] },
  ],
};

test('fixed session exposes the eight irreversible blocks in official-practice order', () => {
  const stages = buildToeflFixedStages(mock);
  assert.deepEqual(stages.map((stage) => stage.id), [
    'reading-1',
    'reading-2',
    'listening-1',
    'listening-2',
    'writing-build',
    'writing-email',
    'writing-discussion',
    'speaking',
  ]);
  assert.deepEqual(stages.map(countStageInteractions), [20, 20, 18, 16, 10, 1, 1, 11]);
  assert.equal(stages.reduce((total, stage) => total + countStageInteractions(stage), 0), 97);
});

test('forward-only blocks flatten one question at a time and do not invent clocks', () => {
  const stages = buildToeflFixedStages(mock);
  const listening = stages.find((stage) => stage.id === 'listening-1');
  const speaking = stages.find((stage) => stage.id === 'speaking');
  assert.equal(listening.navigation, 'forward-only');
  assert.equal(speaking.navigation, 'forward-only');
  assert.equal(listening.timeLimitSeconds, undefined);
  assert.equal(speaking.timeLimitSeconds, undefined);
  assert.equal(flattenForwardItems(listening).length, 18);
  assert.equal(flattenForwardItems(speaking).length, 11);
});

test('only documented or explicitly derived task clocks are declared', () => {
  const byId = Object.fromEntries(buildToeflFixedStages(mock).map((stage) => [stage.id, stage]));
  assert.equal(byId['reading-1'].timeLimitSeconds, 1260);
  assert.equal(byId['reading-2'].timeLimitSeconds, 540);
  assert.equal(byId['writing-build'].timeLimitSeconds, 360);
  assert.equal(byId['writing-build'].timingSource, 'welearn-derived-clock');
  assert.equal(byId['writing-email'].timeLimitSeconds, 420);
  assert.equal(byId['writing-discussion'].timeLimitSeconds, 600);
});
