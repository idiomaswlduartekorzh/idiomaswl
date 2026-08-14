import 'server-only';

import { TOEFL_FIXED_LISTENING_SETS_11_TO_15 } from '@/data/toefl/listening-fixed-sets-11-15';
import { TOEFL_FIXED_LISTENING_DISCLOSURE } from '@/data/toefl/listening-fixed-types';
import type { ToeflListeningScoringItem } from '@/lib/toefl/listening-contract';

// Three Module 1 additions, eight Module 2 Choose, Conversation 2,
// Announcement 2, and Academic Talk 4.
const KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  11: ['A', 'C', 'D', 'B', 'D', 'A', 'C', 'B', 'A', 'D', 'C', 'B', 'D', 'C', 'A', 'B', 'D', 'C', 'A'],
  12: ['C', 'A', 'B', 'D', 'B', 'A', 'C', 'D', 'C', 'B', 'A', 'A', 'C', 'B', 'D', 'D', 'A', 'C', 'B'],
  13: ['D', 'B', 'A', 'C', 'A', 'D', 'B', 'C', 'A', 'D', 'B', 'A', 'C', 'D', 'B', 'A', 'C', 'B', 'D'],
  14: ['B', 'D', 'C', 'A', 'C', 'B', 'D', 'A', 'B', 'C', 'D', 'D', 'B', 'A', 'C', 'B', 'D', 'A', 'C'],
  15: ['A', 'B', 'D', 'C', 'D', 'A', 'B', 'C', 'D', 'B', 'A', 'A', 'C', 'B', 'D', 'D', 'A', 'C', 'B'],
};

function orderedItems(set: (typeof TOEFL_FIXED_LISTENING_SETS_11_TO_15)[number]) {
  return [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
}

export const TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_11_TO_15_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS_11_TO_15.map((set) => {
    const labels = KEY_LABELS[set.setNumber] ?? [];
    return [set.scoringObjectId, {
      scoringVersion: `toefl-listening-fixed-set${set.setNumber}@2026-08-14.v1`,
      disclosure: TOEFL_FIXED_LISTENING_DISCLOSURE,
      items: orderedItems(set).map<ToeflListeningScoringItem>((entry, index) => ({
        itemId: entry.id,
        optionIds: entry.options.map((option) => option.id),
        correctOptionId: `${entry.id}:option-${(labels[index] ?? '').toLowerCase()}`,
        maxRawPoints: 1,
      })),
    }];
  }),
) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflListeningScoringItem[];
}>>;
