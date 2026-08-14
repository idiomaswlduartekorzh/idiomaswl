import assert from 'node:assert/strict';
import test from 'node:test';
import {
  scoreCompleteWords,
  validateMissingLetters,
} from '../src/lib/toefl/complete-words-contract.ts';

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
