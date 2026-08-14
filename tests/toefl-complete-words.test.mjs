import assert from 'node:assert/strict';
import test from 'node:test';
import {
  scoreCompleteWords,
  validateMissingLetters,
} from '../src/lib/toefl/complete-words-contract.ts';
import { TOEFL_CTW_SETS_2_TO_5 } from '../src/data/toefl/complete-the-words-sets-2-5.ts';
import { TOEFL_CTW_SETS_6_TO_10 } from '../src/data/toefl/complete-the-words-sets-6-10.ts';

const missing = ['ides', 'ght', 'at', 'ke', 'n', 'ible', 'ide', 'un', 'cess', 'lear'];
const prefixes = ['prov', 'li', 'he', 'ma', 'o', 'poss', 'ins', 's', 'pro', 'nuc'];
const blanks = missing.map((expectedMissing, index) => ({
  id: `item:t1-r-cw2-v3:blank-${String(index + 1).padStart(2, '0')}`,
  num: index + 1,
  prefix: prefixes[index],
  missingLength: expectedMissing.length,
  expectedMissing,
}));
const allIds = blanks.map((blank) => blank.id);

function request(responses, overrides = {}) {
  return {
    objectId: 'object:t1-r-cw2-v3',
    attemptId: 'attempt:test',
    closeId: 'close:attempt:test:t1-r-cw2-v3',
    responses,
    presentedBlankIds: allIds,
    ...overrides,
  };
}

test('normalization accepts case and outer space but rejects cleanup and wrong length', () => {
  assert.deepEqual(validateMissingLetters(' GHT ', 3), { valid: true, normalized: 'ght' });
  assert.deepEqual(validateMissingLetters('g ht', 3), { valid: false, normalized: 'g ht', reason: 'characters' });
  assert.deepEqual(validateMissingLetters('ght.', 3), { valid: false, normalized: 'ght.', reason: 'characters' });
  assert.deepEqual(validateMissingLetters('gh7', 3), { valid: false, normalized: 'gh7', reason: 'characters' });
  assert.deepEqual(validateMissingLetters('light', 3), { valid: false, normalized: 'light', reason: 'length' });
});

test('the ten missing-letter answers score 10/10 and reconcile to ten outcomes', () => {
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, blank.expectedMissing]));
  const result = scoreCompleteWords(blanks, request(responses));
  assert.equal(result.correct, 10);
  assert.equal(result.denominator, 10);
  assert.equal(result.outcomes.length, 10);
  assert.ok(result.outcomes.every((outcome) => outcome.outcome === 'scored'));
});

test('full words never score as missing letters', () => {
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, `${blank.prefix}${blank.expectedMissing}`]));
  const result = scoreCompleteWords(blanks, request(responses));
  assert.equal(result.correct, 0);
  assert.equal(result.denominator, 10);
  assert.ok(result.outcomes.every((outcome) => outcome.outcome === 'invalid_input'));
});

test('eight correct, one mismatch, and one empty reconcile as 8/10', () => {
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, blank.expectedMissing]));
  responses[blanks[8].id] = 'xxxx';
  responses[blanks[9].id] = '';
  const result = scoreCompleteWords(blanks, request(responses));
  assert.equal(result.correct, 8);
  assert.equal(result.denominator, 10);
  assert.equal(result.outcomes.filter((outcome) => outcome.outcome === 'mismatch').length, 1);
  assert.equal(result.outcomes.filter((outcome) => outcome.outcome === 'unanswered').length, 1);
});

test('not-presented, technical, and invalidated items remain visible but leave the denominator', () => {
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, blank.expectedMissing]));
  const result = scoreCompleteWords(blanks, request(responses, {
    presentedBlankIds: allIds.slice(1),
    technicalFailureIds: [blanks[1].id],
    invalidatedBlankIds: [blanks[2].id],
  }));
  assert.equal(result.correct, 7);
  assert.equal(result.denominator, 7);
  assert.equal(result.outcomes[0].outcome, 'not_presented');
  assert.equal(result.outcomes[1].outcome, 'technical_failure');
  assert.equal(result.outcomes[2].outcome, 'invalidated');
  assert.equal(result.outcomes.length, 10);
});

test('an impossible key configuration fails closed', () => {
  const broken = blanks.map((blank) => ({ ...blank }));
  broken[3].expectedMissing = 'wrong-length';
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, blank.expectedMissing]));
  const result = scoreCompleteWords(broken, request(responses));
  assert.equal(result.outcomes[3].outcome, 'invalidated');
  assert.equal(result.outcomes[3].reason, 'configuration');
  assert.equal(result.denominator, 9);
});

test('closing the same attempt twice is deterministic and idempotent', () => {
  const responses = Object.fromEntries(blanks.map((blank) => [blank.id, blank.expectedMissing]));
  const first = scoreCompleteWords(blanks, request(responses));
  const second = scoreCompleteWords(blanks, request(responses));
  assert.deepEqual(second, first);
});

const setKeys = [
  ['ngs', 'ome', 'at', 'em', 'ckly', 'he', 'n', 'f', 'st', 've'],
  ['ains', 'f', 'lls', 'rons', 'nd', 'o', 'ther', 'nals', 's', 'ink'],
  ['re', 'or', 'inated', 'vior', 'n', 'nies', 'ch', 'orms', 'ific', 'kers'],
  ['eep', 'ain', 'ot', 'ut', 't', 'ive', 'ries', 'her', 'esses', 'arch'],
  ['ting', 'ries', 'n', 'dy', 'sfers', 'o', 'wer', 'sfer', 'low', 'ant'],
  ['ass', 'als', 'pted', 're', 'ities', 'nd', 'em', 'o', 'les', 'ting'],
  ['he', 'olved', 'an', 'sure', 'gma', 'tion', 'ease', 'sh', 'ments', 'ses'],
  ['bers', 'ves', 'ood', 'n', 'rect', 'ile', 'nals', 'ch', 'ood', 'gen'],
  ['gin', 'in', 'r', 'ects', 'her', 'wing', 'des', 'nd', 'ries', 'nd'],
];

test('Sets 2–10 each close at 10/10 with their own stable object identity', () => {
  const expansionSets = [...TOEFL_CTW_SETS_2_TO_5, ...TOEFL_CTW_SETS_6_TO_10];
  for (const [setIndex, object] of expansionSets.entries()) {
    const scoringBlanks = object.blanks.map((blank, blankIndex) => ({
      ...blank,
      expectedMissing: setKeys[setIndex][blankIndex],
    }));
    const presentedBlankIds = scoringBlanks.map((blank) => blank.id);
    const responses = Object.fromEntries(scoringBlanks.map((blank) => [blank.id, blank.expectedMissing]));
    const scoringRequest = {
      objectId: object.objectId,
      attemptId: `attempt:set-${setIndex + 2}`,
      closeId: `close:set-${setIndex + 2}`,
      responses,
      presentedBlankIds,
    };
    const first = scoreCompleteWords(scoringBlanks, scoringRequest);
    const second = scoreCompleteWords(scoringBlanks, scoringRequest);
    assert.equal(first.objectId, object.objectId);
    assert.equal(first.correct, 10);
    assert.equal(first.denominator, 10);
    assert.deepEqual(second, first);
  }
});
