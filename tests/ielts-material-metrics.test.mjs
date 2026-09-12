import assert from 'node:assert/strict';
import test from 'node:test';
import { ieltsAnswerUnits, whitespaceWords } from '../scripts/lib/ielts-text-metrics.mjs';

test('material word counts remain simple and reproducible', () => {
  assert.equal(whitespaceWords('  one   two\nthree '), 3);
});

test('IELTS answer limits count a spaced phone number as one number', () => {
  assert.equal(ieltsAnswerUnits('078 5501 3742'), 1);
  assert.equal(ieltsAnswerUnits('£ 65'), 1);
  assert.equal(ieltsAnswerUnits('10–12'), 1);
  assert.equal(ieltsAnswerUnits('11 a.m.'), 1);
  assert.equal(ieltsAnswerUnits('5 pm'), 1);
});

test('written number words still consume separate answer units', () => {
  assert.equal(ieltsAnswerUnits('two fifty'), 2);
  assert.equal(ieltsAnswerUnits('10 to 12'), 3);
  assert.equal(ieltsAnswerUnits('half past two'), 3);
});
