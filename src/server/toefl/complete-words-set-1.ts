import 'server-only';

import { TOEFL_CTW_SET1_V3 } from '@/data/toefl/complete-the-words-set-1';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';

// Preserved provenance source. This is intentionally server-only: it is not a
// second learner-facing task and never enters the assessment payload.
export const TOEFL_CTW_SET1_SOURCE_V2_TEXT = 'The sun is a giant ball of hot gas at the center of our solar system. It provides the light and heat that make life on Earth possible. Deep inside the sun, a process called nuclear fusion releases enormous amounts of energy. This energy travels through space and reaches Earth in about eight minutes. Without the sun, our planet would be far too cold for anything to live. Scientists study the sun to understand how it affects our climate.';

const MISSING_LETTERS: Record<string, string> = {
  'item:t1-r-cw2-v3:blank-01': 'ides',
  'item:t1-r-cw2-v3:blank-02': 'ght',
  'item:t1-r-cw2-v3:blank-03': 'at',
  'item:t1-r-cw2-v3:blank-04': 'ke',
  'item:t1-r-cw2-v3:blank-05': 'n',
  'item:t1-r-cw2-v3:blank-06': 'ible',
  'item:t1-r-cw2-v3:blank-07': 'ide',
  'item:t1-r-cw2-v3:blank-08': 'un',
  'item:t1-r-cw2-v3:blank-09': 'cess',
  'item:t1-r-cw2-v3:blank-10': 'lear',
};

export const TOEFL_CTW_SET1_V3_SCORING: readonly CompleteWordsScoringBlank[] =
  TOEFL_CTW_SET1_V3.blanks.map((blank) => ({
    ...blank,
    expectedMissing: MISSING_LETTERS[blank.id],
  }));
