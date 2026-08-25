/** Short-lived proof that a complete exam submission reached the server. */
export interface ExamSubmissionReceipt {
  submissionId: string;
  completionToken: string;
  objectiveScores?: {
    listening: { correct: number; total: number; band: number } | null;
    reading: { correct: number; total: number; band: number };
  };
}
