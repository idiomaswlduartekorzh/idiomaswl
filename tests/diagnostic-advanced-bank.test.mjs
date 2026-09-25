import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';

const all = [...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES, ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES];

test('C1 and C2 reading drafts meet decision, stimulus and subdomain floors', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES.length, 24);
  for (const level of ['C1', 'C2']) {
    const records = ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES.filter(record => record.publicItem.levelCandidate === level);
    assert.equal(records.length, 12);
    assert.equal(new Set(records.map(record => record.publicItem.stimulus.stimulusId)).size, 6);
    assert.ok(new Set(records.map(record => record.publicItem.subdomain)).size >= 5);
    const positions = [0, 0, 0];
    for (const record of records) {
      const words = record.publicItem.stimulus.body.split(/\s+/u).length;
      assert.ok(words >= 105 && words <= 190, `${record.publicItem.id} has ${words} words`);
      positions[record.publicItem.response.optionIds.indexOf(record.scoring.optionId)] += 1;
    }
    assert.deepEqual(positions, [4, 4, 4]);
  }
});

test('C1 and C2 grammar and vocabulary drafts meet balanced capacity floors', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES.length, 48);
  for (const level of ['C1', 'C2']) {
    for (const skill of ['grammar', 'vocabulary']) {
      const records = ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES.filter(record =>
        record.publicItem.levelCandidate === level && record.publicItem.skill === skill);
      assert.equal(records.length, 12);
      assert.ok(new Set(records.map(record => record.publicItem.subdomain)).size >= 6);
      const positions = [0, 0, 0];
      for (const record of records) positions[record.publicItem.response.optionIds.indexOf(record.scoring.optionId)] += 1;
      assert.deepEqual(positions, [4, 4, 4]);
    }
  }
});

test('advanced drafts are original, reserved, rationalized and never falsely approved', async () => {
  const { toDiagnosticPublicItem } = await import('../src/server/diagnostic/scoring.ts');
  const ids = new Set();
  const prompts = new Set();
  for (const record of all) {
    assert.equal(ids.has(record.publicItem.id), false);
    assert.equal(prompts.has(record.publicItem.prompt), false);
    ids.add(record.publicItem.id);
    prompts.add(record.publicItem.prompt);
    assert.equal(record.status, 'reserved');
    assert.equal(record.exposure, 'reserved');
    assert.equal(record.review.status, 'draft');
    assert.equal(record.source.kind, 'welearn-original');
    assert.equal(Object.keys(record.rationale.distractors ?? {}).length, 2);
    const serialized = JSON.stringify(toDiagnosticPublicItem(record));
    assert.equal(serialized.includes(record.rationale.key), false);
    assert.equal(serialized.includes('scoring'), false);
  }
});
