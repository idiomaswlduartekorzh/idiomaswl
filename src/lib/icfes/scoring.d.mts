export interface PracticeScoringAttempt {
  questionId: string;
  isCorrect: boolean;
  elapsedSeconds: number;
}
export interface PracticeScore {
  correctCount: number;
  totalSeconds: number;
  accuracy: number;
  averageSeconds: number;
  overTargetCount: number;
}
export function calculatePracticeResult(
  attempts: PracticeScoringAttempt[],
  targetSecondsByQuestion?: Record<string, number>,
): PracticeScore;
