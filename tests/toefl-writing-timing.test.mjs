import assert from 'node:assert/strict';
import test from 'node:test';
import { reconcileTimedWritingState, remainingWritingSeconds } from '../src/lib/toefl/writing-time-contract.ts';
import { TOEFL_WRITING_CONSTRUCTED_SET1 } from '../src/data/toefl/writing-constructed-set-1.ts';

test('Set 1 contains one seven-minute Email and one ten-minute Discussion', () => {
  assert.deepEqual(TOEFL_WRITING_CONSTRUCTED_SET1.tasks.map((task) => [task.kind, task.timeLimitSeconds]), [
    ['email', 420], ['academic-discussion', 600],
  ]);
});

test('Email has no invented word minimum and Discussion preserves recommended 100', () => {
  const [email, discussion] = TOEFL_WRITING_CONSTRUCTED_SET1.tasks;
  assert.equal(email.recommendedMinimumWords, undefined);
  assert.equal(discussion.recommendedMinimumWords, 100);
});

test('Sets 2–20 preserve the same honest Email and Discussion timing policies', async () => {
  for (let setNumber = 2; setNumber <= 20; setNumber += 1) {
    const moduleUrl = new URL(`../src/data/mocks/toefl-set-${setNumber}.ts`, import.meta.url);
    const set = (await import(moduleUrl)).default;
    const [email, discussion] = set.sections
      .flatMap((section) => section.questions)
      .filter((question) => question.type === 'write');

    assert.deepEqual(
      [email.timeLimitSeconds, email.minWords, email.minimumWordsPolicy],
      [420, 0, 'none-published'],
      `Set ${setNumber} Email policy`,
    );
    assert.ok(!email.text.includes('80–120'), `Set ${setNumber} Email range`);
    assert.deepEqual(
      [discussion.timeLimitSeconds, discussion.minWords, discussion.minimumWordsPolicy],
      [600, 100, 'recommended-100'],
      `Set ${setNumber} Discussion policy`,
    );
  }
});

test('remaining time is derived from the durable deadline and rounds up', () => {
  assert.equal(remainingWritingSeconds(10_001, 10_000), 1);
  assert.equal(remainingWritingSeconds(11_001, 10_000), 2);
  assert.equal(remainingWritingSeconds(9_999, 10_000), 0);
});

test('reload before the deadline preserves active state and elapsed time', () => {
  assert.deepEqual(reconcileTimedWritingState('active', 500_000, 380_000), { phase: 'active', remainingSeconds: 120 });
});

test('reload at or after the deadline seals the response as expired', () => {
  assert.deepEqual(reconcileTimedWritingState('active', 500_000, 500_000), { phase: 'closed', closeReason: 'expired', remainingSeconds: 0 });
  assert.deepEqual(reconcileTimedWritingState('active', 500_000, 700_000), { phase: 'closed', closeReason: 'expired', remainingSeconds: 0 });
});

test('an active attempt without a valid deadline fails closed', () => {
  assert.deepEqual(reconcileTimedWritingState('active', undefined, 500_000), { phase: 'closed', closeReason: 'expired', remainingSeconds: 0 });
});

test('ready and closed states are never reopened by reconciliation', () => {
  assert.deepEqual(reconcileTimedWritingState('ready', 1, 999), { phase: 'ready' });
  assert.deepEqual(reconcileTimedWritingState('closed', 999_999, 1), { phase: 'closed' });
});
