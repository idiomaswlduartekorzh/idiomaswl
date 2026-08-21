import 'server-only';

import { TOEFL_FIXED_LISTENING_SETS_6_TO_10 } from '@/data/toefl/listening-fixed-sets-6-10';
import { TOEFL_FIXED_LISTENING_DISCLOSURE } from '@/data/toefl/listening-fixed-types';
import type { ToeflListeningScoringItem } from '@/lib/toefl/listening-contract';

// Three Module 1 additions, eight Module 2 Choose, Conversation 2,
// Announcement 2, and Academic Talk 4.
const KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  6: ['B', 'D', 'A', 'C', 'A', 'B', 'D', 'C', 'B', 'A', 'D', 'C', 'B', 'A', 'D', 'B', 'C', 'D', 'A'],
  7: ['D', 'A', 'C', 'B', 'D', 'A', 'C', 'B', 'A', 'D', 'C', 'A', 'D', 'C', 'B', 'D', 'B', 'A', 'C'],
  8: ['A', 'C', 'B', 'D', 'B', 'C', 'A', 'D', 'C', 'B', 'A', 'B', 'C', 'D', 'A', 'C', 'A', 'D', 'B'],
  9: ['C', 'B', 'D', 'A', 'C', 'D', 'B', 'A', 'D', 'C', 'B', 'D', 'A', 'B', 'C', 'A', 'D', 'B', 'C'],
  10: ['B', 'A', 'C', 'D', 'C', 'A', 'B', 'D', 'B', 'C', 'A', 'C', 'D', 'A', 'B', 'D', 'C', 'A', 'B'],
};

function orderedItems(set: (typeof TOEFL_FIXED_LISTENING_SETS_6_TO_10)[number]) {
  return [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
}

export const TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_6_TO_10_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS_6_TO_10.map((set) => {
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
