import assert from 'node:assert/strict';
import test from 'node:test';
import {
  TOEFL_FIXED_REPEAT_BY_SET,
  TOEFL_FIXED_REPEAT_EXPANSIONS,
  TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS,
  TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS,
} from '../src/data/toefl/speaking-fixed-repeat.ts';

test('Sets 1–20 expose exactly Repeat items 6 and 7 as blocked media', () => {
  for (let setNumber = 1; setNumber <= 20; setNumber++) {
    const entries = TOEFL_FIXED_REPEAT_BY_SET[setNumber];
    assert.equal(entries.length, 2);
    assert.deepEqual(entries.map((entry) => entry.itemNumber), [6, 7]);
    assert.ok(entries.every((entry) => entry.mediaStatus === 'script-ready-audio-blocked'));
  }
  assert.equal(TOEFL_FIXED_REPEAT_EXPANSIONS.length, 40);
  assert.equal(TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS.size, 0);
  assert.equal(TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS.size, 0);
});

test('planned Repeat IDs, media and scripts are unique', () => {
  for (const select of [
    (entry) => entry.id,
    (entry) => entry.mediaId,
    (entry) => entry.plannedAudioUrl,
    (entry) => entry.targetSentence.toLowerCase(),
  ]) {
    assert.equal(new Set(TOEFL_FIXED_REPEAT_EXPANSIONS.map(select)).size, 40);
  }
});
