/** Short-lived proof that a complete exam submission reached the server. */
export interface ExamSubmissionReceipt {
  submissionId: string;
  completionToken: string;
}
