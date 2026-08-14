import 'server-only';

import {
  TOEFL_READING_SET1,
  TOEFL_READING_SET1_ITEMS,
} from '@/data/toefl/reading-set-1';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

// Frozen source copy from the pre-T13 Set 1. It is retained server-side so the
// expansion is reversible and auditable without exposing its answer key to clients.
export const TOEFL_READING_SET1_LEGACY_ACADEMIC_SOURCE = {
  id: 'source:t1-r-ap-green-sahara-v1',
  status: 'preserved_superseded_source',
  supersededBy: 'item:t1-r-ap-green-sahara-v2',
  passage: `The Sahara Desert, the largest hot desert on Earth, is often imagined as a timeless sea of sand. Yet the geological and archaeological record tells a startling story: the Sahara has not always been a desert. In fact, over the past several hundred thousand years, it has repeatedly transformed between a lush, green landscape and the arid expanse we know today. Scientists refer to the green phases as the "African Humid Periods."

During these humid periods, the Sahara was dotted with lakes, rivers, and grasslands. Rock paintings found deep in the desert depict people herding cattle, swimming, and hunting animals such as giraffes and hippos—creatures that could never survive in today's climate. The bones of fish and crocodiles have been found buried beneath the sand, silent evidence of a once-watery world.

What causes these dramatic transformations? The answer lies not on Earth but in space. The Earth's orbit and the tilt of its axis change slowly over cycles lasting tens of thousands of years. These changes alter the amount of sunlight the Northern Hemisphere receives in summer, which in turn strengthens or weakens the seasonal rains, known as the monsoon, that reach into North Africa. When the tilt and orbit align to bring stronger monsoon rains, the Sahara greens; when they shift, the rains retreat and the desert returns. The most recent green Sahara ended around five thousand years ago, drying out over a relatively short period.

This history carries a powerful lesson. It shows that even the most seemingly permanent features of our planet are, on long timescales, in constant flux, driven by subtle astronomical rhythms. It also has human significance: some researchers believe that the drying of the Sahara pushed early human populations toward the Nile Valley, contributing to the rise of ancient Egyptian civilization. The desert we see today, then, is not a fixed backdrop to history but an active, changing force that has helped shape where and how humans have lived.`,
  items: [
    { id: 't1-r-ap1', answer: 0 },
    { id: 't1-r-ap2', answer: 1 },
    { id: 't1-r-ap3', answer: 2 },
    { id: 't1-r-ap4', answer: 2 },
    { id: 't1-r-ap5', answer: 0 },
    { id: 't1-r-ap6', answers: ['A', 'C'] },
  ],
} as const;

const ANSWER_KEY: Record<string, string[]> = {
  'item:t1-r-dl1': ['item:t1-r-dl1:option-b'],
  'item:t1-r-dl2': ['item:t1-r-dl2:option-d'],
  'item:t1-r-dl3': ['item:t1-r-dl3:option-c'],
  'item:t1-r-dl4': ['item:t1-r-dl4:option-a'],
  'item:t1-r-dl5': ['item:t1-r-dl5:option-b'],
  'item:t1-r-ap1-v2': ['item:t1-r-ap1-v2:option-c'],
  'item:t1-r-ap2-v2': ['item:t1-r-ap2-v2:option-a'],
  'item:t1-r-ap3-v2': ['item:t1-r-ap3-v2:option-d'],
  'item:t1-r-ap4-v2': ['item:t1-r-ap4-v2:option-b'],
  'item:t1-r-ap5-v2': ['item:t1-r-ap5-v2:option-c'],
  'item:t1-r-ap6-supplementary': [
    'item:t1-r-ap6-supplementary:option-a',
    'item:t1-r-ap6-supplementary:option-c',
  ],
};

export const TOEFL_READING_SET1_SCORING = {
  scoringVersion: TOEFL_READING_SET1.scoringVersion,
  disclosure: TOEFL_READING_SET1.disclosure,
  items: TOEFL_READING_SET1_ITEMS.map<ToeflReadingScoringItem>((item) => ({
    itemId: item.id,
    responseKind: item.type === 'single-select' ? 'selected_option_id' : 'selected_option_ids',
    optionIds: item.options.map((option) => option.id),
    correctOptionIds: ANSWER_KEY[item.id] ?? [],
    selectCount: item.type === 'single-select' ? 1 : item.selectCount,
    maxRawPoints: 1,
  })),
};
