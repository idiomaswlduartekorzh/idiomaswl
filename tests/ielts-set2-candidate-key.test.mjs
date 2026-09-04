import assert from 'node:assert/strict';
import test from 'node:test';
import mock from '../src/data/mocks/ielts-set-2.ts';
import { auditObjectiveKey } from '../scripts/lib/ielts-answer-key-audit.mjs';
import { set2CandidateFixture } from './fixtures/ielts/set-2-candidate.mjs';

test('Set 2 v2 candidate covers the live 80-point objective map without approving unreleased audio', () => {
  assert.equal(set2CandidateFixture.status, 'PENDING_GENERATED_AUDIO_AND_TIMECODE_QA');
  const rows = auditObjectiveKey(mock, set2CandidateFixture);
  assert.equal(rows.reduce((sum, row) => sum + row.weight, 0), 80);
  assert.deepEqual(
    rows.filter(row => row.skill === 'listening').flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index)),
    Array.from({ length: 40 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    rows.filter(row => row.skill === 'reading').flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index)),
    Array.from({ length: 40 }, (_, index) => index + 1),
  );
});
