import assert from 'node:assert/strict';
import test from 'node:test';
import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from '../src/data/toefl/listening-fixed-sets-1-5.ts';
import { scoreToeflListeningAttempt } from '../src/lib/toefl/listening-contract.ts';

const labels = [
  ['c', 'b', 'a', 'd', 'b', 'c', 'a', 'd', 'b', 'a', 'c', 'b', 'd', 'a', 'c', 'b', 'c', 'a', 'd'],
  ['a', 'd', 'c', 'b', 'a', 'd', 'c', 'b', 'd', 'a', 'c', 'c', 'a', 'd', 'b', 'a', 'c', 'd', 'b'],
  ['d', 'b', 'a', 'c', 'd', 'a', 'b', 'a', 'd', 'b', 'b', 'b', 'c', 'a', 'd', 'c', 'b', 'a', 'd'],
  ['b', 'c', 'd', 'a', 'b', 'a', 'd', 'a', 'b', 'c', 'd', 'd', 'a', 'b', 'c', 'd', 'a', 'c', 'b'],
  ['c', 'a', 'b', 'd', 'b', 'a', 'c', 'd', 'b', 'c', 'b', 'a', 'd', 'c', 'b', 'b', 'd', 'a', 'c'],
];

function publicItems(set) {
  return [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
}

function scoringFor(set, setIndex) {
  return publicItems(set).map((entry, index) => ({
    itemId: entry.id,
    optionIds: entry.options.map((option) => option.id),
    correctOptionId: `${entry.id}:option-${labels[setIndex][index]}`,
    maxRawPoints: 1,
  }));
}

test('Sets 1–5 new fixed Listening items close deterministically at 19/19', () => {
  TOEFL_FIXED_LISTENING_SETS_1_TO_5.forEach((set, setIndex) => {
    const scoring = scoringFor(set, setIndex);
    const input = {
      attemptId: `attempt:listening-set-${set.setNumber}`,
      closeId: `close:listening-set-${set.setNumber}`,
      responses: Object.fromEntries(scoring.map((entry) => [entry.itemId, entry.correctOptionId])),
      presentedItemIds: scoring.map((entry) => entry.itemId),
    };
    const config = { scoringVersion: `test:listening-set-${set.setNumber}`, disclosure: 'Local deterministic test.', items: scoring };
    const first = scoreToeflListeningAttempt(config, input);
    const second = scoreToeflListeningAttempt(config, input);
    assert.equal(first.correct, 19);
    assert.equal(first.denominator, 19);
    assert.equal(first.outcomes.length, 19);
    assert.deepEqual(second, first);
  });
});

test('unknown Listening options fail closed without inflating the denominator', () => {
  const set = TOEFL_FIXED_LISTENING_SETS_1_TO_5[0];
  const scoring = scoringFor(set, 0);
  const responses = Object.fromEntries(scoring.map((entry) => [entry.itemId, entry.correctOptionId]));
  responses[scoring[0].itemId] = `${scoring[0].itemId}:option-z`;
  const result = scoreToeflListeningAttempt(
    { scoringVersion: 'test:listening-invalid', disclosure: 'Local deterministic test.', items: scoring },
    {
      attemptId: 'attempt:listening-invalid',
      closeId: 'close:listening-invalid',
      responses,
      presentedItemIds: scoring.map((entry) => entry.itemId),
    },
  );
  assert.equal(result.correct, 18);
  assert.equal(result.denominator, 18);
  assert.equal(result.outcomes[0].status, 'invalidated');
});

test('unanswered presented Listening items remain visible and score zero', () => {
  const set = TOEFL_FIXED_LISTENING_SETS_1_TO_5[0];
  const scoring = scoringFor(set, 0);
  const result = scoreToeflListeningAttempt(
    { scoringVersion: 'test:listening-unanswered', disclosure: 'Local deterministic test.', items: scoring },
    {
      attemptId: 'attempt:listening-unanswered',
      closeId: 'close:listening-unanswered',
      responses: {},
      presentedItemIds: scoring.map((entry) => entry.itemId),
    },
  );
  assert.equal(result.correct, 0);
  assert.equal(result.denominator, 19);
  assert.ok(result.outcomes.every((outcome) => outcome.status === 'unanswered'));
});
