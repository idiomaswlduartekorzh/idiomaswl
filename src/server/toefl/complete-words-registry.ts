import 'server-only';

import { TOEFL_CTW_SET1_V3_SCORING } from '@/server/toefl/complete-words-set-1';
import { TOEFL_CTW_SET1_V3 } from '@/data/toefl/complete-the-words-set-1';
import {
  TOEFL_CTW_SET2_V2,
  TOEFL_CTW_SET3_V2,
  TOEFL_CTW_SET4_V2,
  TOEFL_CTW_SET5_V2,
} from '@/data/toefl/complete-the-words-sets-2-5';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';

function attachKey(
  blanks: readonly { id: string; num: number; prefix: string; missingLength: number }[],
  expectedById: Readonly<Record<string, string>>,
): readonly CompleteWordsScoringBlank[] {
  return blanks.map((blank) => ({ ...blank, expectedMissing: expectedById[blank.id] ?? '' }));
}

const SET2_KEY = {
  'item:t2-r-ctw-v2:blank-01': 'ngs',
  'item:t2-r-ctw-v2:blank-02': 'ome',
  'item:t2-r-ctw-v2:blank-03': 'at',
  'item:t2-r-ctw-v2:blank-04': 'em',
  'item:t2-r-ctw-v2:blank-05': 'ckly',
  'item:t2-r-ctw-v2:blank-06': 'he',
  'item:t2-r-ctw-v2:blank-07': 'n',
  'item:t2-r-ctw-v2:blank-08': 'f',
  'item:t2-r-ctw-v2:blank-09': 'st',
  'item:t2-r-ctw-v2:blank-10': 've',
} as const;

const SET3_KEY = {
  'item:t3-r-ctw-v2:blank-01': 'ains',
  'item:t3-r-ctw-v2:blank-02': 'f',
  'item:t3-r-ctw-v2:blank-03': 'lls',
  'item:t3-r-ctw-v2:blank-04': 'rons',
  'item:t3-r-ctw-v2:blank-05': 'nd',
  'item:t3-r-ctw-v2:blank-06': 'o',
  'item:t3-r-ctw-v2:blank-07': 'ther',
  'item:t3-r-ctw-v2:blank-08': 'nals',
  'item:t3-r-ctw-v2:blank-09': 's',
  'item:t3-r-ctw-v2:blank-10': 'ink',
} as const;

const SET4_KEY = {
  'item:t4-r-ctw-v2:blank-01': 're',
  'item:t4-r-ctw-v2:blank-02': 'or',
  'item:t4-r-ctw-v2:blank-03': 'inated',
  'item:t4-r-ctw-v2:blank-04': 'vior',
  'item:t4-r-ctw-v2:blank-05': 'n',
  'item:t4-r-ctw-v2:blank-06': 'nies',
  'item:t4-r-ctw-v2:blank-07': 'ch',
  'item:t4-r-ctw-v2:blank-08': 'orms',
  'item:t4-r-ctw-v2:blank-09': 'ific',
  'item:t4-r-ctw-v2:blank-10': 'kers',
} as const;

const SET5_KEY = {
  'item:t5-r-ctw-v2:blank-01': 'eep',
  'item:t5-r-ctw-v2:blank-02': 'ain',
  'item:t5-r-ctw-v2:blank-03': 'ot',
  'item:t5-r-ctw-v2:blank-04': 'ut',
  'item:t5-r-ctw-v2:blank-05': 't',
  'item:t5-r-ctw-v2:blank-06': 'ive',
  'item:t5-r-ctw-v2:blank-07': 'ries',
  'item:t5-r-ctw-v2:blank-08': 'her',
  'item:t5-r-ctw-v2:blank-09': 'esses',
  'item:t5-r-ctw-v2:blank-10': 'arch',
} as const;

export const TOEFL_CTW_SCORING_BY_OBJECT_ID: Readonly<Record<string, readonly CompleteWordsScoringBlank[]>> = {
  [TOEFL_CTW_SET1_V3.objectId]: TOEFL_CTW_SET1_V3_SCORING,
  [TOEFL_CTW_SET2_V2.objectId]: attachKey(TOEFL_CTW_SET2_V2.blanks, SET2_KEY),
  [TOEFL_CTW_SET3_V2.objectId]: attachKey(TOEFL_CTW_SET3_V2.blanks, SET3_KEY),
  [TOEFL_CTW_SET4_V2.objectId]: attachKey(TOEFL_CTW_SET4_V2.blanks, SET4_KEY),
  [TOEFL_CTW_SET5_V2.objectId]: attachKey(TOEFL_CTW_SET5_V2.blanks, SET5_KEY),
};

// The eight superseded learner-facing blocks remain here as reusable provenance,
// outside the public assessment payload and outside official-family counts.
export const TOEFL_CTW_SETS_2_TO_5_LEGACY_SOURCES = [
  {
    id: 't2-r-cw1',
    template: 'Dear Professor Blake,\n\nI am applying for a summer {{1}} at a local research lab, and the application requires a {{2}} from a teacher. As I really enjoyed your biology {{3}} and did well in it, I was hoping you might be willing to {{4}} me. The {{5}} for the application is the end of the month. Please let me know if you would be {{6}} to help.\n\nThank you very much,\nRafael',
    answers: ['internship', 'reference', 'course', 'recommend', 'deadline', 'willing'],
  },
  {
    id: 't2-r-cw2',
    template: 'Penguins are birds that cannot {{1}}, but they are excellent swimmers. Their wings have become {{2}} that help them move quickly through the water in search of fish. Most penguins live in the southern half of the world, and some survive in extremely {{3}} conditions. To keep warm, they have a thick layer of {{4}} under their skin and huddle together in large {{5}}. Sadly, climate change is now threatening the {{6}} where many penguins live.',
    answers: ['fly', 'flippers', 'cold', 'fat', 'groups', 'habitats'],
  },
  {
    id: 't3-r-cw1',
    template: 'Dear Sir or Madam,\n\nI am interested in taking a Spanish {{1}} at your school this summer. I am a complete {{2}} and have never studied the language before. Could you tell me how many {{3}} there are each week and how long the {{4}} lasts? I would also like to know the {{5}} of the course and whether textbooks are {{6}} in the price.\n\nThank you,\nHelen',
    answers: ['course', 'beginner', 'lessons', 'term', 'cost', 'included'],
  },
  {
    id: 't3-r-cw2',
    template: 'The human brain is one of the most complex {{1}} in the known universe. It contains billions of nerve cells, or {{2}}, that send signals to one another. These signals allow us to think, feel, move, and {{3}} information. The brain also controls processes we are not aware of, such as our {{4}} and heartbeat. Scientists still do not fully {{5}} how the brain produces thoughts and consciousness, making it one of the great {{6}} of science.',
    answers: ['organs', 'neurons', 'remember', 'breathing', 'understand', 'mysteries'],
  },
  {
    id: 't4-r-cw1',
    template: 'Dear Warden,\n\nI am writing to report a {{1}} with the heating in Room 204. It has not been {{2}} for two days, and the room is very {{3}}. I have already tried the controls, but {{4}} happens. Could someone please come to {{5}} it as soon as possible? I would be very {{6}} for a quick response, as it is difficult to study in the cold.\n\nThank you,\nMei',
    answers: ['problem', 'working', 'cold', 'nothing', 'fix', 'grateful'],
  },
  {
    id: 't4-r-cw2',
    template: 'Ants are among the most successful {{1}} on Earth, living in almost every part of the world. They are famous for being highly {{2}}, living in large colonies where each ant has a specific {{3}}. Some search for food, others care for the young, and the queen lays all the {{4}}. Ants communicate mainly through chemical {{5}} called pheromones. Despite their small size, ants can carry objects many times their own {{6}}.',
    answers: ['insects', 'social', 'role', 'eggs', 'signals', 'weight'],
  },
  {
    id: 't5-r-cw1',
    template: "Hi Mara,\n\nThanks for lending me your notes from Tuesday's {{1}}. I was {{2}} because I had a doctor's appointment, so I really appreciate it. I've {{3}} them and I think I understand the main points now. Could we {{4}} at the library tomorrow to compare answers before the {{5}} on Friday? I'm free after two o'clock. Let me {{6}} what time works for you.\n\nSee you soon,\nDan",
    answers: ['lecture', 'absent', 'read', 'meet', 'quiz', 'know'],
  },
  {
    id: 't5-r-cw2',
    template: 'Most adults need between seven and nine hours of sleep each {{1}}. During sleep, the brain does not simply shut down; it stays {{2}}, processing memories and clearing waste products. People who regularly sleep too {{3}} may find it harder to concentrate and are more likely to make {{4}}. Researchers {{5}} that keeping a regular schedule — going to bed and waking up at the same time — is one of the most {{6}} ways to improve sleep quality.',
    answers: ['night', 'active', 'little', 'mistakes', 'suggest', 'effective'],
  },
] as const;
