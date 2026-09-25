import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';

test('the first original language-use tranche fills A1 and A2 grammar and vocabulary draft capacity', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES.length, 48);
  for (const level of ['A1', 'A2']) {
    for (const skill of ['grammar', 'vocabulary']) {
      const cell = ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES.filter((record) =>
        record.publicItem.levelCandidate === level && record.publicItem.skill === skill);
      assert.equal(cell.length, 12);
      assert.ok(new Set(cell.map((record) => record.publicItem.subdomain)).size >= 4);
    }
  }
});

test('language-use drafts keep keys and rationales server-side', async () => {
  const { toDiagnosticPublicItem } = await import('../src/server/diagnostic/scoring.ts');
  for (const record of ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES) {
    assert.equal(record.status, 'reserved');
    assert.equal(record.exposure, 'reserved');
    assert.equal(record.review.status, 'draft');
    assert.equal(record.publicItem.response.optionIds.length, 3);
    assert.ok(record.publicItem.response.optionIds.includes(record.scoring.optionId));
    assert.equal(Object.keys(record.rationale.distractors).length, 2);
    const serialized = JSON.stringify(toDiagnosticPublicItem(record));
    assert.equal(serialized.includes(record.rationale.key), false);
    assert.equal(serialized.includes('scoring'), false);
  }
});

test('answer positions are balanced and content has no duplicate prompts or options', () => {
  const positions = [0, 0, 0];
  const prompts = new Set();
  let longestOptionKeys = 0;
  for (const record of ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES) {
    assert.equal(prompts.has(record.publicItem.prompt), false);
    prompts.add(record.publicItem.prompt);
    const options = record.publicItem.displayOptions;
    assert.equal(new Set(options.map((option) => option.text.toLocaleLowerCase('en'))).size, 3);
    const keyIndex = record.publicItem.response.optionIds.indexOf(record.scoring.optionId);
    positions[keyIndex] += 1;
    const maximumLength = Math.max(...options.map((option) => option.text.length));
    if (options[keyIndex].text.length === maximumLength) longestOptionKeys += 1;
  }
  assert.deepEqual(positions, [16, 16, 16]);
  assert.ok(longestOptionKeys <= 24, 'the longest-option strategy must not beat chance materially');
});
