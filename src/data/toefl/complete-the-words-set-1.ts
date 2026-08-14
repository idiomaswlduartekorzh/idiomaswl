export const TOEFL_CTW_SET1_V3 = {
  id: 't1-r-cw2-v3',
  objectId: 'object:t1-r-cw2-v3',
  version: 3,
  title: 'The Sun',
  instructions: 'Complete each word with the missing letters. Write only the letters that are not shown.',
  template:
    'The sun is a giant ball of plasma at the center of our solar system. It {{1}} the {{2}} and {{3}} that {{4}} life {{5}} Earth {{6}}. Deep {{7}} the {{8}}, a {{9}} called {{10}} fusion releases enormous amounts of energy. This energy travels through space and reaches Earth in about eight minutes. Without the sun, most forms of life on Earth could not survive. Scientists study the sun to understand how it affects our climate.',
  blanks: [
    { id: 'item:t1-r-cw2-v3:blank-01', num: 1, prefix: 'prov', missingLength: 4 },
    { id: 'item:t1-r-cw2-v3:blank-02', num: 2, prefix: 'li', missingLength: 3 },
    { id: 'item:t1-r-cw2-v3:blank-03', num: 3, prefix: 'he', missingLength: 2 },
    { id: 'item:t1-r-cw2-v3:blank-04', num: 4, prefix: 'ma', missingLength: 2 },
    { id: 'item:t1-r-cw2-v3:blank-05', num: 5, prefix: 'o', missingLength: 1 },
    { id: 'item:t1-r-cw2-v3:blank-06', num: 6, prefix: 'poss', missingLength: 4 },
    { id: 'item:t1-r-cw2-v3:blank-07', num: 7, prefix: 'ins', missingLength: 3 },
    { id: 'item:t1-r-cw2-v3:blank-08', num: 8, prefix: 's', missingLength: 2 },
    { id: 'item:t1-r-cw2-v3:blank-09', num: 9, prefix: 'pro', missingLength: 4 },
    { id: 'item:t1-r-cw2-v3:blank-10', num: 10, prefix: 'nuc', missingLength: 4 },
  ],
} as const;

export type CompleteWordsOutcomeKind =
  | 'scored'
  | 'mismatch'
  | 'unanswered'
  | 'invalid_input'
  | 'not_presented'
  | 'technical_failure'
  | 'invalidated';

export interface CompleteWordsItemOutcome {
  blankId: string;
  num: number;
  outcome: CompleteWordsOutcomeKind;
  score: 0 | 1;
  maxScore: 0 | 1;
  expectedMissing?: string;
  completedWord?: string;
  reason?: 'characters' | 'length' | 'configuration';
}

export interface CompleteWordsScoreResult {
  objectId: string;
  attemptId: string;
  closeId: string;
  status: 'closed';
  correct: number;
  denominator: number;
  presented: number;
  outcomes: CompleteWordsItemOutcome[];
  disclosure: string;
}
