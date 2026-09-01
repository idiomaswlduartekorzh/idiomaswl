import 'server-only';

import { TOEFL_READING_MODULE2_SETS_16_TO_20 } from '@/data/toefl/reading-module2-sets-16-20';
import { TOEFL_FIXED_READING_DISCLOSURE } from '@/data/toefl/reading-module2-types';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

const CTW_KEYS: Readonly<Record<number, readonly string[]>> = {
  16: ['uments', 'und', 'en', 'ease', 'ong', 'ding', 'ves', 'ough', 'ard', 'oring'],
  17: ['ir', 'nd', 'til', 'por', 'und', 'icles', 'tless', 'at', 'ome', 'ible'],
  18: ['nisms', 'ead', 'en', 'nments', 'ators', 'ases', 'rols', 'ited', 'oss', 'inal'],
  19: ['tas', 'ere', 'ter', 'iting', 'oss', 'nels', 'ands', 'lines', 'aped', 'des'],
  20: ['ids', 'wer', 'th', 'ery', 'ile', 'rage', 'nd', 'ers', 'o', 'tions'],
};

// Five Read in Daily Life answers followed by five Academic Passage answers.
const READING_KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  16: ['B', 'D', 'A', 'C', 'B', 'C', 'A', 'D', 'B', 'C'],
  17: ['A', 'C', 'B', 'A', 'C', 'B', 'C', 'A', 'D', 'B'],
  18: ['C', 'A', 'D', 'A', 'C', 'A', 'D', 'B', 'C', 'A'],
  19: ['B', 'C', 'A', 'D', 'B', 'C', 'B', 'D', 'A', 'C'],
  20: ['A', 'D', 'C', 'A', 'B', 'D', 'A', 'C', 'B', 'D'],
};

export const TOEFL_CTW_MODULE2_SCORING_SETS_16_TO_20_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_16_TO_20.map((set) => [
    set.completeWords.objectId,
    set.completeWords.blanks.map<CompleteWordsScoringBlank>((blank, index) => ({
      ...blank,
      expectedMissing: CTW_KEYS[set.setNumber]?.[index] ?? '',
    })),
  ]),
) as Readonly<Record<string, readonly CompleteWordsScoringBlank[]>>;

export const TOEFL_READING_MODULE2_SCORING_SETS_16_TO_20_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_READING_MODULE2_SETS_16_TO_20.map((set) => {
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
