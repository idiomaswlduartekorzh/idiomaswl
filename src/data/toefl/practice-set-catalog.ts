import { TOEFL_BUILD_SENTENCE_SET1 } from './build-sentence-set-1';
import {
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
} from './build-sentence-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SETS_6_TO_10 } from './build-sentence-sets-6-10';
import { TOEFL_BUILD_SENTENCE_SETS_11_TO_15 } from './build-sentence-sets-11-15';
import { TOEFL_BUILD_SENTENCE_SETS_16_TO_20 } from './build-sentence-sets-16-20';
import { TOEFL_CTW_SET1_V3 } from './complete-the-words-set-1';
import { TOEFL_CTW_SETS_2_TO_5 } from './complete-the-words-sets-2-5';
import { TOEFL_CTW_SETS_6_TO_10 } from './complete-the-words-sets-6-10';
import { TOEFL_CTW_SETS_11_TO_15 } from './complete-the-words-sets-11-15';
import { TOEFL_CTW_SETS_16_TO_20 } from './complete-the-words-sets-16-20';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from './reading-module2-sets-1-5';
import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from './reading-module2-sets-6-10';
import { TOEFL_READING_MODULE2_SETS_11_TO_15 } from './reading-module2-sets-11-15';
import { TOEFL_READING_MODULE2_SETS_16_TO_20 } from './reading-module2-sets-16-20';

export const TOEFL_COMPLETE_WORDS_PRACTICE_SETS = [
  TOEFL_CTW_SET1_V3,
  ...TOEFL_CTW_SETS_2_TO_5,
  ...TOEFL_CTW_SETS_6_TO_10,
  ...TOEFL_CTW_SETS_11_TO_15,
  ...TOEFL_CTW_SETS_16_TO_20,
] as const;

export const TOEFL_BUILD_SENTENCE_PRACTICE_SETS = [
  TOEFL_BUILD_SENTENCE_SET1,
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
  ...TOEFL_BUILD_SENTENCE_SETS_6_TO_10,
  ...TOEFL_BUILD_SENTENCE_SETS_11_TO_15,
  ...TOEFL_BUILD_SENTENCE_SETS_16_TO_20,
] as const;

export const TOEFL_READING_PRACTICE_SETS = [
  ...TOEFL_READING_MODULE2_SETS_1_TO_5,
  ...TOEFL_READING_MODULE2_SETS_6_TO_10,
  ...TOEFL_READING_MODULE2_SETS_11_TO_15,
  ...TOEFL_READING_MODULE2_SETS_16_TO_20,
] as const;

export function practiceSetNumber(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  const parsed = Number(candidate);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 20 ? parsed : null;
}
