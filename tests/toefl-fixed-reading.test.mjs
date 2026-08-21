import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreCompleteWords } from '../src/lib/toefl/complete-words-contract.ts';
import { scoreToeflReadingAttempt } from '../src/lib/toefl/reading-contract.ts';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '../src/data/toefl/reading-module2-sets-1-5.ts';
import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from '../src/data/toefl/reading-module2-sets-6-10.ts';
import { TOEFL_READING_MODULE2_SETS_11_TO_15 } from '../src/data/toefl/reading-module2-sets-11-15.ts';
import { TOEFL_READING_MODULE2_SETS_16_TO_20 } from '../src/data/toefl/reading-module2-sets-16-20.ts';

const sets = [
  ...TOEFL_READING_MODULE2_SETS_1_TO_5,
  ...TOEFL_READING_MODULE2_SETS_6_TO_10,
  ...TOEFL_READING_MODULE2_SETS_11_TO_15,
  ...TOEFL_READING_MODULE2_SETS_16_TO_20,
];

const ctwKeys = [
  ['vide', 'nd', 'or', 'ine', 'ile', 'ach', 'ant', 'cks', 'he', 'ter'],
  ['stal', 'en', 'por', 'und', 'ny', 'nd', 'nd', 'uence', 'ape', 't'],
  ['orbs', 'xide', 'he', 'nd', 'ting', 'ak', 'at', 'olves', 'ong', 'cks'],
  ['ries', 'eds', 'ter', 'ose', 'an', 'nd', 'ract', 'at', 'eds', 'ter'],
  ['ves', 'ade', 'ration', 'iage', 'ol', 'ir', 'orb', 'ile', 'fer', 'or'],
  ['nisms', 'ght', 'ical', 'ide', 'lls', 'ers', 'wing', 'at', 'ght', 'em'],
  ['stems', 'ter', 'bon', 'ment', 'vide', 'or', 'rds', 'her', 'at', 'et'],
  ['bit', 'ile', 'ges', 'nals', 'ther', 'rting', 'tems', 'its', 'cular', 'nd'],
  ['eak', 'aps', 'rd', 'ing', 'ture', 'mth', 'he', 'ds', 'ile', 'orts'],
  ['nd', 'rials', 'orb', 'und', 'us', 'oes', 'nse', 'iers', 'ock', 'ween'],
  ['des', 'nd', 'nly', 'ational', 'om', 'on', 'he', 'ct', 'll', 'ean'],
  ['wly', 'il', 'ck', 'all', 'ming', 'rves', 'ply', 'ings', 'nd', 'rby'],
  ['fully', 'ch', 'ore', 'hods', 'ow', 'hout', 'ical', 'om', 'ng', 'r'],
  ['ents', 'rm', 'ld', 'ough', 'ins', 'at', 'ngly', 'ther', 'onal', 'erns'],
  ['nts', 'end', 'mals', 'rry', 'ween', 'ile', 'or', 'ls', 'r', 'rby'],
  ['uments', 'und', 'en', 'ease', 'ong', 'ding', 'ves', 'ough', 'ard', 'oring'],
  ['ir', 'nd', 'til', 'por', 'und', 'icles', 'tless', 'at', 'ome', 'ible'],
  ['nisms', 'ead', 'en', 'nments', 'ators', 'ases', 'rols', 'ited', 'oss', 'inal'],
  ['tas', 'ere', 'ter', 'iting', 'oss', 'nels', 'ands', 'lines', 'aped', 'des'],
  ['ids', 'wer', 'th', 'ery', 'ile', 'rage', 'nd', 'ers', 'o', 'tions'],
];

const readingLabels = [
  ['b', 'c', 'c', 'b', 'd', 'b', 'c', 'a', 'd', 'b'],
  ['c', 'b', 'b', 'a', 'c', 'c', 'a', 'd', 'b', 'c'],
  ['a', 'c', 'a', 'd', 'b', 'd', 'b', 'c', 'a', 'd'],
  ['a', 'd', 'b', 'c', 'd', 'a', 'c', 'b', 'd', 'a'],
  ['c', 'a', 'd', 'a', 'c', 'b', 'd', 'a', 'c', 'b'],
  ['b', 'd', 'a', 'c', 'b', 'a', 'c', 'd', 'b', 'a'],
  ['a', 'c', 'b', 'd', 'c', 'b', 'a', 'd', 'b', 'a'],
  ['a', 'b', 'c', 'b', 'd', 'a', 'b', 'c', 'd', 'a'],
  ['a', 'b', 'c', 'a', 'd', 'c', 'a', 'd', 'b', 'a'],
  ['a', 'b', 'c', 'a', 'b', 'a', 'b', 'c', 'd', 'a'],
  ['b', 'c', 'a', 'd', 'b', 'c', 'a', 'd', 'b', 'c'],
  ['a', 'd', 'b', 'c', 'a', 'b', 'c', 'a', 'd', 'b'],
  ['c', 'a', 'd', 'b', 'c', 'a', 'd', 'b', 'c', 'a'],
  ['b', 'd', 'c', 'a', 'b', 'd', 'b', 'a', 'c', 'd'],
  ['a', 'c', 'b', 'd', 'a', 'b', 'a', 'c', 'd', 'b'],
  ['b', 'd', 'a', 'c', 'b', 'c', 'a', 'd', 'b', 'c'],
  ['a', 'c', 'b', 'a', 'c', 'b', 'c', 'a', 'd', 'b'],
  ['c', 'a', 'd', 'a', 'c', 'a', 'd', 'b', 'c', 'a'],
  ['b', 'c', 'a', 'd', 'b', 'c', 'b', 'd', 'a', 'c'],
  ['a', 'd', 'c', 'a', 'b', 'd', 'a', 'c', 'b', 'd'],
];

test('Sets 1–20 Module 2 Complete the Words close deterministically at 10/10', () => {
  for (const [setIndex, set] of sets.entries()) {
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

test('Sets 1–20 Module 2 Daily Life and Academic items close at 10/10', () => {
  for (const [setIndex, set] of sets.entries()) {
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
  const set = sets[0];
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
