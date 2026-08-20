import { IELTS_MOCK4_ID } from './mock4-submission';

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
  writingTasks: Record<IeltsWritingTaskNumber, IeltsWritingTaskBlueprint>;
}

/**
 * Source of truth for connecting an IELTS mock to the shared review pipeline.
 * To onboard another mock, add its title here and make its submission flow pass
 * the same signed receipt to useWritingAssessment. No new assessment endpoint,
 * scoring formula or admin panel is required.
 */
export const IELTS_REVIEW_BLUEPRINTS: Record<string, IeltsReviewBlueprint> = {
  [IELTS_MOCK4_ID]: {
    mockId: IELTS_MOCK4_ID,
    mockTitle: 'IELTS Academic Set 4',
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
  },
};

export function getIeltsReviewBlueprint(mockId: string): IeltsReviewBlueprint | null {
  return IELTS_REVIEW_BLUEPRINTS[mockId] ?? null;
}
