import 'server-only';

import { TOEFL_FIXED_LISTENING_SETS_16_TO_20 } from '@/data/toefl/listening-fixed-sets-16-20';
import { TOEFL_FIXED_LISTENING_DISCLOSURE } from '@/data/toefl/listening-fixed-types';
import type { ToeflListeningScoringItem } from '@/lib/toefl/listening-contract';

// Three Module 1 additions, eight Module 2 Choose, Conversation 2,
// Announcement 2, and Academic Talk 4.
const KEY_LABELS: Readonly<Record<number, readonly string[]>> = {
  16: ['C', 'D', 'A', 'B', 'A', 'C', 'D', 'B', 'D', 'A', 'C', 'B', 'C', 'A', 'D', 'C', 'B', 'D', 'A'],
  17: ['B', 'A', 'D', 'C', 'D', 'B', 'A', 'C', 'A', 'D', 'B', 'D', 'A', 'C', 'B', 'A', 'D', 'B', 'C'],
  18: ['D', 'C', 'B', 'A', 'B', 'D', 'C', 'A', 'C', 'B', 'D', 'A', 'B', 'D', 'C', 'B', 'A', 'C', 'D'],
  19: ['A', 'D', 'C', 'B', 'C', 'A', 'D', 'B', 'A', 'D', 'C', 'C', 'D', 'A', 'B', 'D', 'C', 'A', 'B'],
  20: ['C', 'B', 'A', 'D', 'A', 'C', 'B', 'C', 'D', 'A', 'B', 'B', 'D', 'A', 'C', 'B', 'D', 'A', 'C'],
};

function orderedItems(set: (typeof TOEFL_FIXED_LISTENING_SETS_16_TO_20)[number]) {
  return [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
}

export const TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_16_TO_20_BY_OBJECT_ID = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS_16_TO_20.map((set) => {
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
