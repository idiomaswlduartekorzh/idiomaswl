import assert from 'node:assert/strict';
import test from 'node:test';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';

test('first recovered-audio tranche fills the A1 and B1 listening capacity floor as drafts', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES.length, 24);
  for (const level of CEFR_LEVELS) {
    const records = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES.filter((record) => record.publicItem.levelCandidate === level);
    assert.equal(records.length, level === 'A1' || level === 'B1' ? 12 : 0);
    if (records.length) {
      assert.equal(new Set(records.map((record) => record.publicItem.stimulus.mediaId)).size, 6);
    }
  }
});

test('draft listening candidates use target-language questions and never masquerade as approved', () => {
  const spanishMarkers = /[¿¡]|\b(qué|cuál|dónde|según|porque|edificio|familia)\b/iu;
  for (const record of ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES) {
    assert.equal(record.status, 'reserved');
    assert.equal(record.exposure, 'previously-public');
    assert.equal(record.review.status, 'draft');
    assert.equal(spanishMarkers.test(record.publicItem.prompt), false);
    assert.ok(record.publicItem.displayOptions.every((option) => !spanishMarkers.test(option.text)));
    assert.match(record.source.reference, /audio-sha256:[a-f0-9]{64}$/);
  }
});

test('every listening item has one private key and a rationale for every distractor', () => {
  const keyPositions = [];
  for (const record of ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES) {
    const ids = record.publicItem.response.optionIds;
    assert.equal(ids.length, 3);
    assert.equal(new Set(ids).size, 3);
    assert.ok(ids.includes(record.scoring.optionId));
    keyPositions.push(ids.indexOf(record.scoring.optionId));
    assert.equal(Object.keys(record.rationale.distractors).length, 2);
    assert.ok(record.rationale.key.length >= 35);
    assert.equal(record.publicItem.stimulus.kind, 'audio');
    assert.ok(record.publicItem.stimulus.endMs > 15_000);
    assert.equal(record.publicItem.stimulus.maxPlays, 2);
  }
  assert.ok(new Set(keyPositions).size === 3, 'answer positions must use all three slots');
});

test('public serialization excludes scoring, rationales, hashes and review warnings', async () => {
  const { toDiagnosticPublicItem } = await import('../src/server/diagnostic/scoring.ts');
  const payload = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES.map(toDiagnosticPublicItem);
  const serialized = JSON.stringify(payload);
  assert.equal(serialized.includes('rationale'), false);
  assert.equal(serialized.includes('audio-sha256'), false);
  assert.equal(serialized.includes('PENDING_'), false);
  assert.equal(serialized.includes('scoring'), false);
});

