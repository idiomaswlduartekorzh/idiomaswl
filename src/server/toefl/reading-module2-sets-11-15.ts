import 'server-only';

import { TOEFL_READING_MODULE2_SETS_11_TO_15 } from '@/data/toefl/reading-module2-sets-11-15';
import { TOEFL_FIXED_READING_DISCLOSURE } from '@/data/toefl/reading-module2-types';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

const CTW_KEYS: Readonly<Record<number, readonly string[]>> = {
  11: ['des', 'nd', 'nly', 'ational', 'om', 'on', 'he', 'ct', 'll', 'ean'],
  12: ['wly', 'il', 'ck', 'all', 'ming', 'rves', 'ply', 'ings', 'nd', 'rby'],
  13: ['fully', 'ch', 'ore', 'hods', 'ow', 'hout', 'ical', 'om', 'ng', 'r'],
  14: ['ents', 'rm', 'ld', 'ough', 'ins', 'at', 'ngly', 'ther', 'onal', 'erns'],
  15: ['nts', 'end', 'mals', 'rry', 'ween', 'ile', 'or', 'ls', 'r', 'rby'],
};

// Five Read in Daily Life answers followed by five Academic Passage answers.
const READING_KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  11: ['B', 'C', 'A', 'D', 'B', 'C', 'A', 'D', 'B', 'C'],
  12: ['A', 'D', 'B', 'C', 'A', 'B', 'C', 'A', 'D', 'B'],
  13: ['C', 'A', 'D', 'B', 'C', 'A', 'D', 'B', 'C', 'A'],
  14: ['B', 'D', 'C', 'A', 'B', 'D', 'B', 'A', 'C', 'D'],
  15: ['A', 'C', 'B', 'D', 'A', 'B', 'A', 'C', 'D', 'B'],
};

export const TOEFL_CTW_MODULE2_SCORING_SETS_11_TO_15_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_11_TO_15.map((set) => [
    set.completeWords.objectId,
    set.completeWords.blanks.map<CompleteWordsScoringBlank>((blank, index) => ({
      ...blank,
      expectedMissing: CTW_KEYS[set.setNumber]?.[index] ?? '',
    })),
  ]),
) as Readonly<Record<string, readonly CompleteWordsScoringBlank[]>>;

export const TOEFL_READING_MODULE2_SCORING_SETS_11_TO_15_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_11_TO_15.map((set) => {
    const items = [...set.dailyLife.flatMap((block) => block.items), ...set.academic.items];
    const labels = READING_KEY_LABELS[set.setNumber] ?? [];
    return [set.readingObjectId, {
      scoringVersion: `toefl-reading-fixed-set${set.setNumber}@2026-08-31.m2-v2`,
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
