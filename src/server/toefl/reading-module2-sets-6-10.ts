import 'server-only';

import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from '@/data/toefl/reading-module2-sets-6-10';
import { TOEFL_FIXED_READING_DISCLOSURE } from '@/data/toefl/reading-module2-types';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

const CTW_KEYS: Readonly<Record<number, readonly string[]>> = {
  6: ['nisms', 'ght', 'ical', 'ide', 'lls', 'ers', 'wing', 'at', 'ght', 'em'],
  7: ['stems', 'ter', 'bon', 'ment', 'vide', 'or', 'rds', 'her', 'at', 'et'],
  8: ['bit', 'ile', 'ges', 'nals', 'ther', 'rting', 'tems', 'its', 'cular', 'nd'],
  9: ['eak', 'aps', 'rd', 'ing', 'ture', 'mth', 'he', 'ds', 'ile', 'orts'],
  10: ['nd', 'rials', 'orb', 'und', 'us', 'oes', 'nse', 'iers', 'ock', 'ween'],
};

// Five Read in Daily Life answers followed by five Academic Passage answers.
const READING_KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  6: ['B', 'D', 'A', 'C', 'B', 'A', 'C', 'D', 'B', 'A'],
  7: ['A', 'C', 'B', 'D', 'C', 'B', 'A', 'D', 'B', 'A'],
  8: ['A', 'B', 'C', 'B', 'D', 'A', 'B', 'C', 'D', 'A'],
  9: ['A', 'B', 'C', 'A', 'D', 'C', 'A', 'D', 'B', 'A'],
  10: ['A', 'B', 'C', 'A', 'B', 'A', 'B', 'C', 'D', 'A'],
};

export const TOEFL_CTW_MODULE2_SCORING_SETS_6_TO_10_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_6_TO_10.map((set) => [
    set.completeWords.objectId,
    set.completeWords.blanks.map<CompleteWordsScoringBlank>((blank, index) => ({
      ...blank,
      expectedMissing: CTW_KEYS[set.setNumber]?.[index] ?? '',
    })),
  ]),
) as Readonly<Record<string, readonly CompleteWordsScoringBlank[]>>;

export const TOEFL_READING_MODULE2_SCORING_SETS_6_TO_10_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_6_TO_10.map((set) => {
    const items = [...set.dailyLife.flatMap((block) => block.items), ...set.academic.items];
    const labels = READING_KEY_LABELS[set.setNumber] ?? [];
    return [set.readingObjectId, {
      scoringVersion: `toefl-reading-fixed-set${set.setNumber}@2026-08-14.m2-v1`,
      disclosure: TOEFL_FIXED_READING_DISCLOSURE,
      items: items.map<ToeflReadingScoringItem>((item, index) => ({
        itemId: item.id,
        responseKind: 'selected_option_id',
        optionIds: item.options.map((option) => option.id),
        correctOptionIds: [`${item.id}:option-${(labels[index] ?? '').toLowerCase()}`],
        selectCount: 1,
        maxRawPoints: 1,
      })),
    }];
  }),
) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflReadingScoringItem[];
}>>;
