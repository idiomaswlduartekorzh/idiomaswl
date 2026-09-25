import assert from 'node:assert/strict';
import test from 'node:test';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import {
  ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES,
} from '../src/server/diagnostic/bank/writing.en.ts';

test('writing candidate bank has four reserved parallel prompts at every CEFR level', () => {
  assert.ok(ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION);
  assert.equal(ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.length, 24);
  assert.equal(new Set(ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.map(record => record.publicPrompt.id)).size, 24);
  for (const level of CEFR_LEVELS) {
    const prompts = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.filter(record => record.publicPrompt.levelCandidate === level);
    assert.equal(prompts.length, 4, `${level} should have four prompts`);
    assert.equal(prompts.every(record => record.exposure === 'reserved'), true);
  }
});

test('candidate status never masquerades as linguistic approval', () => {
  for (const record of ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES) {
    assert.equal(record.status, 'reserved');
    assert.equal(record.review.status, 'draft');
    assert.equal(record.review.reviewerId, undefined);
    assert.equal(record.review.reviewedAt, undefined);
  }
});

test('every prompt is internally coherent and bounded for delivery', () => {
  for (const { publicPrompt: prompt } of ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES) {
    assert.equal(prompt.instructions.length, 3);
    assert.equal(prompt.instructions.every(instruction => instruction.trim().length >= 20), true);
    assert.ok(prompt.situation.trim().length >= 50);
    assert.ok(prompt.minimumWords >= 40);
    assert.ok(prompt.maximumWords > prompt.minimumWords);
    assert.ok(prompt.maximumWords <= 400);
    assert.ok(prompt.recommendedMinutes >= 10 && prompt.recommendedMinutes <= 35);
  }
});

