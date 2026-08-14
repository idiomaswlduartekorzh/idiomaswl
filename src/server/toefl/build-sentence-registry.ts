import 'server-only';

import { TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID as SETS_1_TO_5 } from '@/server/toefl/build-sentence-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SCORING_SETS_6_TO_10 } from '@/server/toefl/build-sentence-sets-6-10';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

export const TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID = {
  ...SETS_1_TO_5,
  ...TOEFL_BUILD_SENTENCE_SCORING_SETS_6_TO_10,
} as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflBuildSentenceScoringItem[];
}>>;
