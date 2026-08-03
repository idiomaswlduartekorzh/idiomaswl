import assert from 'node:assert/strict';
import test from 'node:test';
import { calculatePracticeResult } from '../src/lib/icfes/scoring.mjs';

test('scores an empty practice safely', () => {
  assert.deepEqual(calculatePracticeResult([]), {
    correctCount: 0,
    totalSeconds: 0,
    accuracy: 0,
    averageSeconds: 0,
    overTargetCount: 0,
  });
});

test('calculates accuracy, timing and questions over target', () => {
  const result = calculatePracticeResult([
    { questionId: 'q1', isCorrect: true, elapsedSeconds: 20 },
    { questionId: 'q2', isCorrect: false, elapsedSeconds: 50 },
    { questionId: 'q3', isCorrect: true, elapsedSeconds: 31 },
  ], { q1: 25, q2: 35, q3: 30 });

  assert.deepEqual(result, {
    correctCount: 2,
    totalSeconds: 101,
    accuracy: 67,
    averageSeconds: 34,
    overTargetCount: 2,
  });
});

test('does not allow a negative duration to reduce total time', () => {
  const result = calculatePracticeResult([
    { questionId: 'q1', isCorrect: true, elapsedSeconds: -10 },
  ]);
  assert.equal(result.totalSeconds, 0);
  assert.equal(result.accuracy, 100);
});
