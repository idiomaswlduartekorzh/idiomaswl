import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreToeflReadingAttempt } from '../src/lib/toefl/reading-contract.ts';
import { TOEFL_READING_SETS_2_TO_5 } from '../src/data/toefl/reading-sets-2-5.ts';
import { TOEFL_READING_SETS_6_TO_10 } from '../src/data/toefl/reading-sets-6-10.ts';
import { TOEFL_READING_SETS_11_TO_15 } from '../src/data/toefl/reading-sets-11-15.ts';

const single = (number, correct = 'a') => ({
  itemId: `item:single-${number}`,
  responseKind: 'selected_option_id',
  optionIds: ['a', 'b', 'c', 'd'].map((letter) => `item:single-${number}:option-${letter}`),
  correctOptionIds: [`item:single-${number}:option-${correct}`],
  selectCount: 1,
  maxRawPoints: 1,
});
const multi = {
  itemId: 'item:multi',
  responseKind: 'selected_option_ids',
  optionIds: ['a', 'b', 'c', 'd'].map((letter) => `item:multi:option-${letter}`),
  correctOptionIds: ['item:multi:option-a', 'item:multi:option-c'],
  selectCount: 2,
  maxRawPoints: 1,
};
const items = [...Array.from({ length: 10 }, (_, index) => single(index + 1)), multi];
const config = {
  scoringVersion: 'test-reading-v1',
  disclosure: 'Local test result.',
  items,
};

function request(responses, overrides = {}) {
  return {
    attemptId: 'attempt:test',
    closeId: 'close:attempt:test:reading',
    responses,
    presentedItemIds: items.map((item) => item.itemId),
    ...overrides,
  };
}

function allCorrect() {
  return Object.fromEntries(items.map((item) => [
    item.itemId,
    item.responseKind === 'selected_option_id' ? item.correctOptionIds[0] : item.correctOptionIds,
  ]));
}

test('ten single-select items and one exact-set item reconcile to 11/11', () => {
  const result = scoreToeflReadingAttempt(config, request(allCorrect()));
  assert.equal(result.correct, 11);
  assert.equal(result.denominator, 11);
  assert.equal(result.outcomes.length, 11);
  assert.ok(result.outcomes.every((outcome) => outcome.status === 'scored'));
});

test('a wrong single selection scores zero without changing the denominator', () => {
  const responses = allCorrect();
  responses['item:single-1'] = 'item:single-1:option-b';
  const result = scoreToeflReadingAttempt(config, request(responses));
  assert.equal(result.correct, 10);
  assert.equal(result.denominator, 11);
  assert.equal(result.outcomes[0].rawPoints, 0);
});

test('multi-select accepts an unordered exact set and gives no partial credit', () => {
  const exact = allCorrect();
  exact['item:multi'] = ['item:multi:option-c', 'item:multi:option-a'];
  assert.equal(scoreToeflReadingAttempt(config, request(exact)).outcomes.at(-1).rawPoints, 1);

  const partial = allCorrect();
  partial['item:multi'] = ['item:multi:option-a'];
  const outcome = scoreToeflReadingAttempt(config, request(partial)).outcomes.at(-1);
  assert.equal(outcome.status, 'unanswered');
  assert.equal(outcome.reasonCode, 'incomplete_selection');
  assert.equal(outcome.rawPoints, 0);
});

test('unknown options fail closed and leave the academic denominator', () => {
  const responses = allCorrect();
  responses['item:single-2'] = 'item:single-2:option-z';
  const result = scoreToeflReadingAttempt(config, request(responses));
  assert.equal(result.correct, 10);
  assert.equal(result.denominator, 10);
  assert.equal(result.outcomes[1].status, 'invalidated');
  assert.equal(result.outcomes[1].reasonCode, 'invalid_option');
});

test('not-presented items remain reconciled and never enter the denominator', () => {
  const presentedItemIds = items.slice(0, 5).map((item) => item.itemId);
  const result = scoreToeflReadingAttempt(config, request(allCorrect(), { presentedItemIds }));
  assert.equal(result.correct, 5);
  assert.equal(result.denominator, 5);
  assert.equal(result.outcomes.length, 11);
  assert.equal(result.outcomes.filter((outcome) => outcome.status === 'not_presented').length, 6);
});

test('an impossible key configuration is invalidated instead of guessed', () => {
  const broken = { ...config, items: items.map((item, index) => index === 0 ? { ...item, correctOptionIds: ['unknown'] } : item) };
  const result = scoreToeflReadingAttempt(broken, request(allCorrect()));
  assert.equal(result.outcomes[0].status, 'invalidated');
  assert.equal(result.outcomes[0].reasonCode, 'invalid_configuration');
  assert.equal(result.denominator, 10);
});

test('closing the same attempt twice is deterministic', () => {
  const first = scoreToeflReadingAttempt(config, request(allCorrect()));
  const second = scoreToeflReadingAttempt(config, request(allCorrect()));
  assert.deepEqual(second, first);
});

const expansionKeys = [
  [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
  [['d'], ['a'], ['b'], ['c'], ['d'], ['a', 'c']],
  [['c'], ['d'], ['a'], ['b'], ['c'], ['a', 'c']],
  [['b'], ['c'], ['d'], ['a'], ['b'], ['b', 'c']],
  [['a'], ['b'], ['b'], ['d'], ['a'], ['b', 'c']],
  [['d'], ['a'], ['b'], ['c'], ['d'], ['b', 'd']],
  [['c'], ['a'], ['a'], ['b'], ['c'], ['b', 'c']],
  [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
  [['d'], ['a'], ['b'], ['c'], ['d'], ['a', 'c']],
  [['c'], ['d'], ['a'], ['b'], ['c'], ['a', 'c']],
  [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
  [['a'], ['b'], ['c'], ['d'], ['a'], ['a', 'c']],
  [['d'], ['a'], ['b'], ['c'], ['d'], ['a', 'c']],
  [['c'], ['d'], ['a'], ['b'], ['c'], ['a', 'c']],
];

test('Academic Sets 2–15 each reconcile five official items plus one supplement at 6/6', () => {
  const objects = [...TOEFL_READING_SETS_2_TO_5, ...TOEFL_READING_SETS_6_TO_10, ...TOEFL_READING_SETS_11_TO_15];
  for (const [setIndex, object] of objects.entries()) {
    const scoringItems = object.academic.items.map((item, itemIndex) => ({
      itemId: item.id,
      responseKind: item.type === 'single-select' ? 'selected_option_id' : 'selected_option_ids',
      optionIds: item.options.map((option) => option.id),
      correctOptionIds: expansionKeys[setIndex][itemIndex].map((label) => `${item.id}:option-${label}`),
      selectCount: item.type === 'single-select' ? 1 : item.selectCount,
      maxRawPoints: 1,
    }));
    const responses = Object.fromEntries(scoringItems.map((item) => [
      item.itemId,
      item.responseKind === 'selected_option_id' ? item.correctOptionIds[0] : item.correctOptionIds,
    ]));
    const input = {
      attemptId: `attempt:set-${setIndex + 2}`,
      closeId: `close:set-${setIndex + 2}`,
      responses,
      presentedItemIds: scoringItems.map((item) => item.itemId),
    };
    const config = { scoringVersion: object.scoringVersion, disclosure: object.disclosure, items: scoringItems };
    const first = scoreToeflReadingAttempt(config, input);
    const second = scoreToeflReadingAttempt(config, input);
    assert.equal(first.correct, 6);
    assert.equal(first.denominator, 6);
    assert.deepEqual(second, first);
  }
});
