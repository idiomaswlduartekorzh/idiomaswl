export type IeltsWritingTaskNumber = 1 | 2;

export interface IeltsSubmissionReceipt {
  submissionId: string;
  completionToken: string;
}

export interface IeltsWritingTaskBlueprint {
  answerColumn: 'writing_task1_answer' | 'writing_task2_answer';
  assessmentColumn: 'writing_task1_assessment' | 'writing_task2_assessment';
  weight: number;
}

export interface IeltsReviewBlueprint {
  mockId: string;
  mockTitle: string;
  contentVersion: string;
  writingTasks: Record<IeltsWritingTaskNumber, IeltsWritingTaskBlueprint>;
}

/**
 * Source of truth for connecting an IELTS mock to the shared review pipeline.
 * The same submission endpoint, receipt, scoring formula and admin panel serve
 * every registered set. The contract test fails if the public catalog and this
 * manifest ever drift apart.
 */
export const IELTS_REVIEW_BLUEPRINTS: Record<string, IeltsReviewBlueprint> = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    const mockId = `set-${setNumber}`;
    return [mockId, {
      mockId,
      mockTitle: `IELTS Academic Set ${setNumber}`,
      contentVersion: `ielts-set-${setNumber}-v1`,
      writingTasks: {
        1: {
          answerColumn: 'writing_task1_answer',
          assessmentColumn: 'writing_task1_assessment',
          weight: 1,
        },
        2: {
          answerColumn: 'writing_task2_answer',
          assessmentColumn: 'writing_task2_assessment',
          weight: 2,
        },
      },
    } satisfies IeltsReviewBlueprint];
  }),
);

export function getIeltsReviewBlueprint(mockId: string): IeltsReviewBlueprint | null {
  return IELTS_REVIEW_BLUEPRINTS[mockId] ?? null;
}

export function getIeltsReviewBlueprintByTitle(mockTitle: string | null): IeltsReviewBlueprint | null {
  if (!mockTitle) return null;
  return Object.values(IELTS_REVIEW_BLUEPRINTS).find(blueprint => blueprint.mockTitle === mockTitle) ?? null;
}
