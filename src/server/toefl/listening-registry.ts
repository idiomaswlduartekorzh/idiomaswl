import 'server-only';

import type { MCQQuestion, MockExam } from '@/data/mocks/types';
import toeflSet1 from '@/data/mocks/toefl-set-1';
import toeflSet2 from '@/data/mocks/toefl-set-2';
import toeflSet3 from '@/data/mocks/toefl-set-3';
import toeflSet4 from '@/data/mocks/toefl-set-4';
import toeflSet5 from '@/data/mocks/toefl-set-5';
import toeflSet6 from '@/data/mocks/toefl-set-6';
import toeflSet7 from '@/data/mocks/toefl-set-7';
import toeflSet8 from '@/data/mocks/toefl-set-8';
import toeflSet9 from '@/data/mocks/toefl-set-9';
import toeflSet10 from '@/data/mocks/toefl-set-10';
import toeflSet11 from '@/data/mocks/toefl-set-11';
import toeflSet12 from '@/data/mocks/toefl-set-12';
import toeflSet13 from '@/data/mocks/toefl-set-13';
import toeflSet14 from '@/data/mocks/toefl-set-14';
import toeflSet15 from '@/data/mocks/toefl-set-15';
import toeflSet16 from '@/data/mocks/toefl-set-16';
import toeflSet17 from '@/data/mocks/toefl-set-17';
import toeflSet18 from '@/data/mocks/toefl-set-18';
import toeflSet19 from '@/data/mocks/toefl-set-19';
import toeflSet20 from '@/data/mocks/toefl-set-20';
import { TOEFL_FIXED_LISTENING_BY_SET } from '@/data/toefl/listening-fixed-registry';
import {
  TOEFL_FIXED_LISTENING_DISCLOSURE,
  fixedListeningOptionId,
  legacyFixedListeningItemId,
} from '@/data/toefl/listening-fixed-types';
import type { ToeflListeningScoringItem } from '@/lib/toefl/listening-contract';
import { TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_1_TO_5_BY_OBJECT_ID } from './listening-fixed-sets-1-5';
import { TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_6_TO_10_BY_OBJECT_ID } from './listening-fixed-sets-6-10';
import { TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_11_TO_15_BY_OBJECT_ID } from './listening-fixed-sets-11-15';
import { TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_16_TO_20_BY_OBJECT_ID } from './listening-fixed-sets-16-20';

const RAW_MOCKS: readonly MockExam[] = [
  toeflSet1, toeflSet2, toeflSet3, toeflSet4, toeflSet5,
  toeflSet6, toeflSet7, toeflSet8, toeflSet9, toeflSet10,
  toeflSet11, toeflSet12, toeflSet13, toeflSet14, toeflSet15,
  toeflSet16, toeflSet17, toeflSet18, toeflSet19, toeflSet20,
];

const NEW_SCORING_BY_OBJECT_ID = {
  ...TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_1_TO_5_BY_OBJECT_ID,
  ...TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_6_TO_10_BY_OBJECT_ID,
  ...TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_11_TO_15_BY_OBJECT_ID,
  ...TOEFL_FIXED_LISTENING_NEW_SCORING_SETS_16_TO_20_BY_OBJECT_ID,
};

function mcqItems(mock: MockExam, sectionIndex: number) {
  const section = mock.sections.filter((entry) => entry.skill === 'listening')[sectionIndex];
  return section?.questions.filter((question): question is MCQQuestion =>
    question.type === 'mcq' || question.type === 'dialog') ?? [];
}

function legacyScoringItem(question: MCQQuestion): ToeflListeningScoringItem {
  const itemId = legacyFixedListeningItemId(question.id);
  return {
    itemId,
    optionIds: question.options.map((_, index) => fixedListeningOptionId(itemId, index)),
    correctOptionId: fixedListeningOptionId(itemId, question.answer),
    maxRawPoints: 1,
  };
}

export const TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID = Object.fromEntries(
  RAW_MOCKS.map((mock, index) => {
    const setNumber = index + 1;
    const expansion = TOEFL_FIXED_LISTENING_BY_SET[setNumber];
    const newScoring = expansion ? NEW_SCORING_BY_OBJECT_ID[expansion.scoringObjectId] : undefined;
    if (!expansion || !newScoring || newScoring.items.length !== 19) {
      throw new Error(`Incomplete fixed Listening scoring configuration for Set ${setNumber}`);
    }

    const existingChoose = mcqItems(mock, 0).slice(0, 5).map(legacyScoringItem);
    const existingConversation = mcqItems(mock, 1).slice(0, 4).map(legacyScoringItem);
    const existingAnnouncement = mcqItems(mock, 2).slice(0, 2).map(legacyScoringItem);
    const existingAcademic = mcqItems(mock, 3).slice(0, 4).map(legacyScoringItem);
    const existingCount = existingChoose.length
      + existingConversation.length
      + existingAnnouncement.length
      + existingAcademic.length;
    if (existingCount !== 15) {
      throw new Error(`Incomplete reusable fixed Listening configuration for Set ${setNumber}`);
    }

    const items = [
      ...existingChoose,
      ...newScoring.items.slice(0, 3),
      ...existingConversation,
      ...existingAnnouncement,
      ...existingAcademic,
      ...newScoring.items.slice(3),
    ];
    if (items.length !== 34 || new Set(items.map((item) => item.itemId)).size !== 34) {
      throw new Error(`Invalid 34-item fixed Listening form for Set ${setNumber}`);
    }

    return [expansion.scoringObjectId, {
      scoringVersion: `toefl-listening-fixed-set${setNumber}@2026-08-14.full-v1`,
      disclosure: TOEFL_FIXED_LISTENING_DISCLOSURE,
      items,
    }];
  }),
) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflListeningScoringItem[];
}>>;
