import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';

test('original A1 through B2 reading drafts meet decision and stimulus floors', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_READING_CANDIDATES.length, 48);
  for (const level of ['A1', 'A2', 'B1', 'B2']) {
    const records = ENGLISH_DIAGNOSTIC_READING_CANDIDATES.filter((record) => record.publicItem.levelCandidate === level);
    assert.equal(records.length, 12);
    assert.equal(new Set(records.map((record) => record.publicItem.stimulus.stimulusId)).size, 6);
    assert.ok(new Set(records.map((record) => record.publicItem.subdomain)).size >= 4);
  }
});

test('reading content is reserved, original, and remains an unapproved draft', () => {
  const prompts = new Set();
  const wordBounds = { A1: [15, 50], A2: [40, 90], B1: [80, 130], B2: [100, 160] };
  for (const record of ENGLISH_DIAGNOSTIC_READING_CANDIDATES) {
    assert.equal(record.status, 'reserved');
    assert.equal(record.exposure, 'reserved');
    assert.equal(record.review.status, 'draft');
    assert.equal(record.source.kind, 'welearn-original');
    assert.equal(prompts.has(record.publicItem.prompt), false);
    prompts.add(record.publicItem.prompt);
    const words = record.publicItem.stimulus.body.split(/\s+/u).length;
    const [minimum, maximum] = wordBounds[record.publicItem.levelCandidate];
    assert.ok(words >= minimum && words <= maximum, `${record.publicItem.id} has ${words} words`);
  }
});

test('reading keys are balanced, rationalized, and absent from public serialization', async () => {
  const { toDiagnosticPublicItem } = await import('../src/server/diagnostic/scoring.ts');
  const positions = [0, 0, 0];
  for (const record of ENGLISH_DIAGNOSTIC_READING_CANDIDATES) {
    const optionIds = record.publicItem.response.optionIds;
    const keyIndex = optionIds.indexOf(record.scoring.optionId);
    positions[keyIndex] += 1;
    assert.equal(Object.keys(record.rationale.distractors).length, 2);
    const serialized = JSON.stringify(toDiagnosticPublicItem(record));
    assert.equal(serialized.includes('rationale'), false);
    assert.equal(serialized.includes('scoring'), false);
  }
  assert.deepEqual(positions, [16, 16, 16]);
});
