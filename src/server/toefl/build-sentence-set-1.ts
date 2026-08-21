import 'server-only';

import { TOEFL_BUILD_SENTENCE_SET1 } from '@/data/toefl/build-sentence-set-1';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

// Frozen source copy from the pre-T16 Set 1. It is kept server-side for provenance
// and rollback without publishing the former answer key in client bundles.
export const TOEFL_BUILD_SENTENCE_SET1_LEGACY_SOURCE = {
  id: 'source:toefl-build-sentence-set1-v1',
  status: 'preserved_superseded_source',
  supersededBy: TOEFL_BUILD_SENTENCE_SET1.objectId,
  items: [
    { id: 't1-w-bs1', tiles: ['They', 'are', 'renovating', 'the old theatre', 'downtown'], answer: ['They', 'are', 'renovating', 'the old theatre', 'downtown'] },
    { id: 't1-w-bs2', tiles: ['the report', 'you', 'review', 'Could', 'before Friday'], answer: ['Could', 'you', 'review', 'the report', 'before Friday'] },
    { id: 't1-w-bs3', tiles: ['recommended', 'The book', 'you', 'was', 'fascinating'], answer: ['The book', 'you', 'recommended', 'was', 'fascinating'] },
    { id: 't1-w-bs4', tiles: ['finish,', 'you', 'When', 'me', 'call', 'please'], answer: ['When', 'you', 'finish,', 'please', 'call', 'me'] },
    { id: 't1-w-bs5', tiles: ['is', 'This city', 'my hometown', 'than', 'bigger', 'much'], answer: ['This city', 'is', 'much', 'bigger', 'than', 'my hometown'] },
    { id: 't1-w-bs6', tiles: ['the news,', 'Hearing', 'they', 'to celebrate', 'decided'], answer: ['Hearing', 'the news,', 'they', 'decided', 'to celebrate'] },
  ],
} as const;

function answer(itemNumber: number, ...positions: number[]) {
  const item = TOEFL_BUILD_SENTENCE_SET1.items[itemNumber - 1];
  return positions.map((position) => `${item.id}:tile-${position}`);
}

const ANSWER_KEY: Record<string, string[][]> = {
  'item:t1-w-bs1-v2': [answer(1, 2, 5, 1, 4)],
  'item:t1-w-bs2-v2': [answer(2, 4, 2, 5, 1)],
  'item:t1-w-bs3-v2': [answer(3, 2, 5, 1, 4)],
  'item:t1-w-bs4-v2': [answer(4, 4, 1, 3)],
  'item:t1-w-bs5-v2': [answer(5, 3, 4, 1)],
  'item:t1-w-bs6-v2': [answer(6, 2, 5, 4, 1)],
  'item:t1-w-bs7-v2': [answer(7, 4, 1, 3)],
  'item:t1-w-bs8-v2': [answer(8, 2, 5, 1, 4)],
  'item:t1-w-bs9-v2': [answer(9, 4, 2, 5, 1)],
  'item:t1-w-bs10-v2': [answer(10, 2, 5, 1, 4)],
};

export const TOEFL_BUILD_SENTENCE_SET1_SCORING = {
  scoringVersion: TOEFL_BUILD_SENTENCE_SET1.scoringVersion,
  disclosure: TOEFL_BUILD_SENTENCE_SET1.disclosure,
  items: TOEFL_BUILD_SENTENCE_SET1.items.map<ToeflBuildSentenceScoringItem>((item) => ({
    itemId: item.id,
    tileIds: item.tiles.map((entry) => entry.id),
    expectedTileCount: item.blankCount,
    acceptedOrders: ANSWER_KEY[item.id] ?? [],
    maxRawPoints: 1,
  })),
};
