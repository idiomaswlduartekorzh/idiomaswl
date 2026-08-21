import type { ExamSubmissionReceipt } from '@/lib/exam-review/submission-receipt';

export type ToeflSubmissionReceipt = ExamSubmissionReceipt;
export type ToeflWritingTaskNumber = 1 | 2;

export interface ToeflWritingTaskBlueprint {
  answerColumn: 'writing_task1_answer' | 'writing_task2_answer';
  assessmentColumn: 'writing_task1_assessment' | 'writing_task2_assessment';
  taskId: 'write-email' | 'academic-discussion';
  label: string;
}

export interface ToeflReviewBlueprint {
  mockId: string;
  mockTitle: string;
  contentVersion: string;
  writingTasks: Record<ToeflWritingTaskNumber, ToeflWritingTaskBlueprint>;
}

/** Every public 2026 set uses the same private delivery and correction contract. */
export const TOEFL_REVIEW_BLUEPRINTS: Record<string, ToeflReviewBlueprint> = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    const mockId = `set-${setNumber}`;
    return [mockId, {
      mockId,
      mockTitle: `TOEFL iBT Set ${setNumber} (Formato 2026)`,
      contentVersion: `toefl-2026-set-${setNumber}-review-v1`,
      writingTasks: {
        1: {
          answerColumn: 'writing_task1_answer',
          assessmentColumn: 'writing_task1_assessment',
          taskId: 'write-email',
          label: 'Write an Email',
        },
        2: {
          answerColumn: 'writing_task2_answer',
          assessmentColumn: 'writing_task2_assessment',
          taskId: 'academic-discussion',
          label: 'Write for an Academic Discussion',
        },
      },
    } satisfies ToeflReviewBlueprint];
  }),
);

export function getToeflReviewBlueprint(mockId: string): ToeflReviewBlueprint | null {
  return TOEFL_REVIEW_BLUEPRINTS[mockId] ?? null;
}

export function getToeflReviewBlueprintByTitle(mockTitle: string | null): ToeflReviewBlueprint | null {
  if (!mockTitle) return null;
  return Object.values(TOEFL_REVIEW_BLUEPRINTS).find(blueprint => blueprint.mockTitle === mockTitle) ?? null;
}
