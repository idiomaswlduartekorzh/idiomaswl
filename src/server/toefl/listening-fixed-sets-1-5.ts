import 'server-only';

import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from '@/data/toefl/listening-fixed-sets-1-5';
import { TOEFL_FIXED_LISTENING_DISCLOSURE } from '@/data/toefl/listening-fixed-types';
import type { ToeflListeningScoringItem } from '@/lib/toefl/listening-contract';

// Three Module 1 additions, eight Module 2 Choose, Conversation 2,
// Announcement 2, and Academic Talk 4.
const KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  1: ['C', 'B', 'A', 'D', 'B', 'C', 'A', 'D', 'B', 'A', 'C', 'B', 'D', 'A', 'C', 'B', 'C', 'A', 'D'],
  2: ['A', 'D', 'C', 'B', 'A', 'D', 'C', 'B', 'D', 'A', 'C', 'C', 'A', 'D', 'B', 'A', 'C', 'D', 'B'],
  3: ['D', 'B', 'A', 'C', 'D', 'A', 'B', 'A', 'D', 'B', 'B', 'B', 'C', 'A', 'D', 'C', 'B', 'A', 'D'],
  4: ['B', 'C', 'D', 'A', 'B', 'A', 'D', 'A', 'B', 'C', 'D', 'D', 'A', 'B', 'C', 'D', 'A', 'C', 'B'],
  5: ['C', 'A', 'B', 'D', 'B', 'A', 'C', 'D', 'B', 'C', 'B', 'A', 'D', 'C', 'B', 'B', 'D', 'A', 'C'],
};

function orderedItems(set: (typeof TOEFL_FIXED_LISTENING_SETS_1_TO_5)[number]) {
  return [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
}

export const TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_1_TO_5_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS_1_TO_5.map((set) => {
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
