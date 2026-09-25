import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';

test('the original language-use tranches fill A1 through B2 grammar and vocabulary draft capacity', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES.length, 96);
  for (const level of ['A1', 'A2', 'B1', 'B2']) {
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
  assert.deepEqual(positions, [32, 32, 32]);
  assert.ok(longestOptionKeys <= 48, 'the longest-option strategy must not beat chance materially');
});

test('only the four editorially revised items advance to content draft 2', () => {
  const revisions = ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES.filter((record) =>
    record.publicItem.contentVersion === 'draft-2');
  assert.deepEqual(revisions.map(record => record.publicItem.id), [
    'en-a1-vocabulary-07',
    'en-a2-vocabulary-07',
    'en-b1-vocabulary-07',
    'en-b2-grammar-08',
  ]);
  assert.ok(revisions.every(record => record.source.reference === 'en-language-use-original-draft-2'));
  assert.equal(ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES
    .filter(record => record.publicItem.contentVersion === 'draft-1').length, 92);
});
