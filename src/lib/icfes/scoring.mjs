/** Pure scoring shared by the interactive engine and Node tests. */
export function calculatePracticeResult(attempts, targetSecondsByQuestion = {}) {
  const correctCount = attempts.reduce((sum, attempt) => sum + (attempt.isCorrect ? 1 : 0), 0);
  const totalSeconds = attempts.reduce((sum, attempt) => sum + Math.max(0, attempt.elapsedSeconds), 0);
  const accuracy = attempts.length ? Math.round((correctCount / attempts.length) * 100) : 0;
  const averageSeconds = attempts.length ? Math.round(totalSeconds / attempts.length) : 0;
  const overTargetCount = attempts.reduce((sum, attempt) => {
    const target = targetSecondsByQuestion[attempt.questionId];
    return sum + (typeof target === 'number' && attempt.elapsedSeconds > target ? 1 : 0);
  }, 0);

  return { correctCount, totalSeconds, accuracy, averageSeconds, overTargetCount };
}
