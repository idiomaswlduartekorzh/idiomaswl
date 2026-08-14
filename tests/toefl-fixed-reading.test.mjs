import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreCompleteWords } from '../src/lib/toefl/complete-words-contract.ts';
import { scoreToeflReadingAttempt } from '../src/lib/toefl/reading-contract.ts';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '../src/data/toefl/reading-module2-sets-1-5.ts';

const ctwKeys = [
  ['vide', 'nd', 'or', 'ine', 'ile', 'ach', 'ant', 'cks', 'he', 'ter'],
  ['stal', 'en', 'por', 'und', 'ny', 'nd', 'nd', 'uence', 'ape', 't'],
  ['orbs', 'xide', 'he', 'nd', 'ting', 'ak', 'at', 'olves', 'ong', 'cks'],
  ['ries', 'eds', 'ter', 'ose', 'an', 'nd', 'ract', 'at', 'eds', 'ter'],
  ['ves', 'ade', 'ration', 'iage', 'ol', 'ir', 'orb', 'ile', 'fer', 'or'],
];

const readingLabels = [
  ['b', 'c', 'c', 'b', 'd', 'b', 'c', 'a', 'd', 'b'],
  ['c', 'b', 'b', 'a', 'c', 'c', 'a', 'd', 'b', 'c'],
  ['a', 'c', 'a', 'd', 'b', 'd', 'b', 'c', 'a', 'd'],
  ['a', 'd', 'b', 'c', 'd', 'a', 'c', 'b', 'd', 'a'],
  ['c', 'a', 'd', 'a', 'c', 'b', 'd', 'a', 'c', 'b'],
];

test('Sets 1–5 Module 2 Complete the Words close deterministically at 10/10', () => {
  for (const [setIndex, set] of TOEFL_READING_MODULE2_SETS_1_TO_5.entries()) {
    const scoring = set.completeWords.blanks.map((blank, index) => ({
      ...blank,
      expectedMissing: ctwKeys[setIndex][index],
    }));
    const ids = scoring.map((blank) => blank.id);
    const request = {
      objectId: set.completeWords.objectId,
      attemptId: `attempt:m2-ctw-set-${set.setNumber}`,
      closeId: `close:m2-ctw-set-${set.setNumber}`,
      responses: Object.fromEntries(scoring.map((blank) => [blank.id, blank.expectedMissing])),
      presentedBlankIds: ids,
    };
    const first = scoreCompleteWords(scoring, request);
    const second = scoreCompleteWords(scoring, request);
    assert.equal(first.correct, 10);
    assert.equal(first.denominator, 10);
    assert.equal(first.outcomes.length, 10);
    assert.deepEqual(second, first);
  }
});

test('Sets 1–5 Module 2 Daily Life and Academic items close at 10/10', () => {
  for (const [setIndex, set] of TOEFL_READING_MODULE2_SETS_1_TO_5.entries()) {
    const publicItems = [...set.dailyLife.flatMap((block) => block.items), ...set.academic.items];
    const scoringItems = publicItems.map((item, index) => ({
      itemId: item.id,
      responseKind: 'selected_option_id',
      optionIds: item.options.map((option) => option.id),
      correctOptionIds: [`${item.id}:option-${readingLabels[setIndex][index]}`],
      selectCount: 1,
      maxRawPoints: 1,
    }));
    const responses = Object.fromEntries(scoringItems.map((item) => [item.itemId, item.correctOptionIds[0]]));
    const request = {
      attemptId: `attempt:m2-reading-set-${set.setNumber}`,
      closeId: `close:m2-reading-set-${set.setNumber}`,
      responses,
      presentedItemIds: scoringItems.map((item) => item.itemId),
    };
    const config = {
      scoringVersion: `test:m2-reading-set-${set.setNumber}`,
      disclosure: 'Local deterministic test.',
      items: scoringItems,
    };
    const first = scoreToeflReadingAttempt(config, request);
    const second = scoreToeflReadingAttempt(config, request);
    assert.equal(first.correct, 10);
    assert.equal(first.denominator, 10);
    assert.equal(first.outcomes.length, 10);
    assert.deepEqual(second, first);
  }
});

test('unknown Module 2 options fail closed without inflating the denominator', () => {
  const set = TOEFL_READING_MODULE2_SETS_1_TO_5[0];
  const publicItems = [...set.dailyLife.flatMap((block) => block.items), ...set.academic.items];
  const scoringItems = publicItems.map((item, index) => ({
    itemId: item.id,
    responseKind: 'selected_option_id',
    optionIds: item.options.map((option) => option.id),
    correctOptionIds: [`${item.id}:option-${readingLabels[0][index]}`],
    selectCount: 1,
    maxRawPoints: 1,
  }));
  const responses = Object.fromEntries(scoringItems.map((item) => [item.itemId, item.correctOptionIds[0]]));
  responses[scoringItems[0].itemId] = `${scoringItems[0].itemId}:option-z`;
  const result = scoreToeflReadingAttempt(
    { scoringVersion: 'test:m2-invalid', disclosure: 'Local deterministic test.', items: scoringItems },
    {
      attemptId: 'attempt:m2-invalid',
      closeId: 'close:m2-invalid',
      responses,
      presentedItemIds: scoringItems.map((item) => item.itemId),
    },
  );
  assert.equal(result.correct, 9);
  assert.equal(result.denominator, 9);
  assert.equal(result.outcomes[0].status, 'invalidated');
});
