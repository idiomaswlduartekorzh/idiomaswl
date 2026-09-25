import assert from 'node:assert/strict';
import test from 'node:test';

import { submitEnglishDiagnosticWriting } from '../src/server/diagnostic/writing-submit-core.ts';

const prompt = {
  id: 'en-b1-writing-01', contentVersion: 'pilot-1', language: 'en', levelCandidate: 'B1',
  title: 'A community proposal', situation: 'Write to a community group about a practical proposal.',
  instructions: ['Describe the proposal.', 'Explain its likely effects.', 'Recommend a next step.'],
  minimumWords: 8, maximumWords: 30, recommendedMinutes: 18,
};
const responseText = 'Our library should open later because working students need a quiet place to study.';
const stage = {
  stageId: 'stage-writing', kind: 'writing', routeId: 'mid-b1-b2', itemIds: [prompt.id],
  contentVersions: { [prompt.id]: prompt.contentVersion }, issuedAt: '2026-09-24T13:00:00.000Z',
};

test('validates, binds and persists writing before moving the attempt to scoring', async () => {
  let persisted;
  const result = await submitEnglishDiagnosticWriting({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 3, status: 'writing', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage, prompt, submission: { attemptVersion: 3, responseText: `  ${responseText}  ` },
  }, {
    now: () => new Date('2026-09-24T13:30:00.000Z'),
    persist: async input => { persisted = input; return { replayed: false, version: 4 }; },
  });
  assert.deepEqual(result, {
    attemptId: 'attempt-1', attemptVersion: 4, status: 'scoring', replayed: false, writingStatus: 'pending',
  });
  assert.equal(persisted.responseText, responseText);
  assert.equal(persisted.wordCount, 14);
  assert.match(persisted.responseSha256, /^[a-f0-9]{64}$/);
});

test('identical writing retry is idempotent and does not invent an evaluation', async () => {
  const result = await submitEnglishDiagnosticWriting({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 4, status: 'scoring', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage: { ...stage, completedAt: '2026-09-24T13:31:00.000Z' }, prompt,
    submission: { attemptVersion: 3, responseText },
  }, {
    now: () => new Date('2026-09-24T13:32:00.000Z'),
    persist: async () => ({ replayed: true, version: 4 }),
  });
  assert.equal(result.replayed, true);
  assert.equal(result.writingStatus, 'pending');
  assert.equal('estimatedLevel' in result, false);
});

test('rejects foreign, short and prompt-tampered writing before persistence', async () => {
  let writes = 0;
  const dependencies = {
    now: () => new Date('2026-09-24T13:30:00.000Z'),
    persist: async () => { writes += 1; return { replayed: false, version: 4 }; },
  };
  const attempt = { id: 'attempt-1', userId: 'user-1', version: 3, status: 'writing', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' };
  await assert.rejects(() => submitEnglishDiagnosticWriting({ authenticatedUserId: 'user-2', attempt, stage, prompt, submission: { attemptVersion: 3, responseText } }, dependencies), /does not belong/);
  await assert.rejects(() => submitEnglishDiagnosticWriting({ authenticatedUserId: 'user-1', attempt, stage, prompt, submission: { attemptVersion: 3, responseText: 'Too short.' } }, dependencies), /at least/);
  await assert.rejects(() => submitEnglishDiagnosticWriting({ authenticatedUserId: 'user-1', attempt, stage, prompt, submission: { attemptVersion: 2, responseText } }, dependencies), /version conflict/);
  await assert.rejects(() => submitEnglishDiagnosticWriting({ authenticatedUserId: 'user-1', attempt, stage: { ...stage, contentVersions: { [prompt.id]: 'forged' } }, prompt, submission: { attemptVersion: 3, responseText } }, dependencies), /out of order/);
  assert.equal(writes, 0);
});
