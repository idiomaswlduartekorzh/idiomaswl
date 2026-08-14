import 'server-only';

import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '@/data/toefl/reading-module2-sets-1-5';
import { TOEFL_FIXED_READING_DISCLOSURE } from '@/data/toefl/reading-module2-types';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

const CTW_KEYS: Readonly<Record<number, readonly string[]>> = {
  1: ['vide', 'nd', 'or', 'ine', 'ile', 'ach', 'ant', 'cks', 'he', 'ter'],
  2: ['stal', 'en', 'por', 'und', 'ny', 'nd', 'nd', 'uence', 'ape', 't'],
  3: ['orbs', 'xide', 'he', 'nd', 'ting', 'ak', 'at', 'olves', 'ong', 'cks'],
  4: ['ries', 'eds', 'ter', 'ose', 'an', 'nd', 'ract', 'at', 'eds', 'ter'],
  5: ['ves', 'ade', 'ration', 'iage', 'ol', 'ir', 'orb', 'ile', 'fer', 'or'],
};

// Five Read in Daily Life answers followed by five Academic Passage answers.
const READING_KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  1: ['B', 'C', 'C', 'B', 'D', 'B', 'C', 'A', 'D', 'B'],
  2: ['C', 'B', 'B', 'A', 'C', 'C', 'A', 'D', 'B', 'C'],
  3: ['A', 'C', 'A', 'D', 'B', 'D', 'B', 'C', 'A', 'D'],
  4: ['A', 'D', 'B', 'C', 'D', 'A', 'C', 'B', 'D', 'A'],
  5: ['C', 'A', 'D', 'A', 'C', 'B', 'D', 'A', 'C', 'B'],
};

export const TOEFL_CTW_MODULE2_SCORING_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_1_TO_5.map((set) => [
    set.completeWords.objectId,
    set.completeWords.blanks.map<CompleteWordsScoringBlank>((blank, index) => ({
      ...blank,
      expectedMissing: CTW_KEYS[set.setNumber]?.[index] ?? '',
    })),
  ]),
) as Readonly<Record<string, readonly CompleteWordsScoringBlank[]>>;

export const TOEFL_READING_MODULE2_SCORING_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_1_TO_5.map((set) => {
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
