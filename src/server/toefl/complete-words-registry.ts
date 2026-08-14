import 'server-only';

import { TOEFL_CTW_SET1_V3_SCORING } from '@/server/toefl/complete-words-set-1';
import { TOEFL_CTW_SET1_V3 } from '@/data/toefl/complete-the-words-set-1';
import {
  TOEFL_CTW_SET2_V2,
  TOEFL_CTW_SET3_V2,
  TOEFL_CTW_SET4_V2,
  TOEFL_CTW_SET5_V2,
} from '@/data/toefl/complete-the-words-sets-2-5';
import {
  TOEFL_CTW_SET6_V2,
  TOEFL_CTW_SET7_V2,
  TOEFL_CTW_SET8_V2,
  TOEFL_CTW_SET9_V2,
  TOEFL_CTW_SET10_V2,
} from '@/data/toefl/complete-the-words-sets-6-10';
import {
  TOEFL_CTW_SET11_V2,
  TOEFL_CTW_SET12_V2,
  TOEFL_CTW_SET13_V2,
  TOEFL_CTW_SET14_V2,
  TOEFL_CTW_SET15_V2,
} from '@/data/toefl/complete-the-words-sets-11-15';
import {
  TOEFL_CTW_SET16_V2,
  TOEFL_CTW_SET17_V2,
  TOEFL_CTW_SET18_V2,
  TOEFL_CTW_SET19_V2,
  TOEFL_CTW_SET20_V2,
} from '@/data/toefl/complete-the-words-sets-16-20';
import type { CompleteWordsScoringBlank } from '@/lib/toefl/complete-words-contract';
import { TOEFL_CTW_MODULE2_SCORING_BY_OBJECT_ID } from '@/server/toefl/reading-module2-sets-1-5';

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

const SET6_KEY = {
  'item:t6-r-ctw-v2:blank-01': 'ting', 'item:t6-r-ctw-v2:blank-02': 'ries',
  'item:t6-r-ctw-v2:blank-03': 'n', 'item:t6-r-ctw-v2:blank-04': 'dy',
  'item:t6-r-ctw-v2:blank-05': 'sfers', 'item:t6-r-ctw-v2:blank-06': 'o',
  'item:t6-r-ctw-v2:blank-07': 'wer', 'item:t6-r-ctw-v2:blank-08': 'sfer',
  'item:t6-r-ctw-v2:blank-09': 'low', 'item:t6-r-ctw-v2:blank-10': 'ant',
} as const;

const SET7_KEY = {
  'item:t7-r-ctw-v2:blank-01': 'ass', 'item:t7-r-ctw-v2:blank-02': 'als',
  'item:t7-r-ctw-v2:blank-03': 'pted', 'item:t7-r-ctw-v2:blank-04': 're',
  'item:t7-r-ctw-v2:blank-05': 'ities', 'item:t7-r-ctw-v2:blank-06': 'nd',
  'item:t7-r-ctw-v2:blank-07': 'em', 'item:t7-r-ctw-v2:blank-08': 'o',
  'item:t7-r-ctw-v2:blank-09': 'les', 'item:t7-r-ctw-v2:blank-10': 'ting',
} as const;

const SET8_KEY = {
  'item:t8-r-ctw-v2:blank-01': 'he', 'item:t8-r-ctw-v2:blank-02': 'olved',
  'item:t8-r-ctw-v2:blank-03': 'an', 'item:t8-r-ctw-v2:blank-04': 'sure',
  'item:t8-r-ctw-v2:blank-05': 'gma', 'item:t8-r-ctw-v2:blank-06': 'tion',
  'item:t8-r-ctw-v2:blank-07': 'ease', 'item:t8-r-ctw-v2:blank-08': 'sh',
  'item:t8-r-ctw-v2:blank-09': 'ments', 'item:t8-r-ctw-v2:blank-10': 'ses',
} as const;

const SET9_KEY = {
  'item:t9-r-ctw-v2:blank-01': 'bers', 'item:t9-r-ctw-v2:blank-02': 'ves',
  'item:t9-r-ctw-v2:blank-03': 'ood', 'item:t9-r-ctw-v2:blank-04': 'n',
  'item:t9-r-ctw-v2:blank-05': 'rect', 'item:t9-r-ctw-v2:blank-06': 'ile',
  'item:t9-r-ctw-v2:blank-07': 'nals', 'item:t9-r-ctw-v2:blank-08': 'ch',
  'item:t9-r-ctw-v2:blank-09': 'ood', 'item:t9-r-ctw-v2:blank-10': 'gen',
} as const;

const SET10_KEY = {
  'item:t10-r-ctw-v2:blank-01': 'gin', 'item:t10-r-ctw-v2:blank-02': 'in',
  'item:t10-r-ctw-v2:blank-03': 'r', 'item:t10-r-ctw-v2:blank-04': 'ects',
  'item:t10-r-ctw-v2:blank-05': 'her', 'item:t10-r-ctw-v2:blank-06': 'wing',
  'item:t10-r-ctw-v2:blank-07': 'des', 'item:t10-r-ctw-v2:blank-08': 'nd',
  'item:t10-r-ctw-v2:blank-09': 'ries', 'item:t10-r-ctw-v2:blank-10': 'nd',
} as const;

const SET11_KEY = {
  'item:t11-r-ctw-v2:blank-01': 'he', 'item:t11-r-ctw-v2:blank-02': 'me',
  'item:t11-r-ctw-v2:blank-03': 'ome', 'item:t11-r-ctw-v2:blank-04': 'ot',
  'item:t11-r-ctw-v2:blank-05': 'hts', 'item:t11-r-ctw-v2:blank-06': 'e',
  'item:t11-r-ctw-v2:blank-07': 'der', 'item:t11-r-ctw-v2:blank-08': 'nd',
  'item:t11-r-ctw-v2:blank-09': 'vive', 'item:t11-r-ctw-v2:blank-10': 'ting',
} as const;

const SET12_KEY = {
  'item:t12-r-ctw-v2:blank-01': 'vity', 'item:t12-r-ctw-v2:blank-02': 'duce',
  'item:t12-r-ctw-v2:blank-03': 'des', 'item:t12-r-ctw-v2:blank-04': 'ts',
  'item:t12-r-ctw-v2:blank-05': 'erves', 'item:t12-r-ctw-v2:blank-06': 'act',
  'item:t12-r-ctw-v2:blank-07': 'ause', 'item:t12-r-ctw-v2:blank-08': 'on',
  'item:t12-r-ctw-v2:blank-09': 'ost', 'item:t12-r-ctw-v2:blank-10': 'phere',
} as const;

const SET13_KEY = {
  'item:t13-r-ctw-v2:blank-01': 'ees', 'item:t13-r-ctw-v2:blank-02': 'ers',
  'item:t13-r-ctw-v2:blank-03': 'uence', 'item:t13-r-ctw-v2:blank-04': 'ch',
  'item:t13-r-ctw-v2:blank-05': 'ches', 'item:t13-r-ctw-v2:blank-06': 'est',
  'item:t13-r-ctw-v2:blank-07': 'nts', 'item:t13-r-ctw-v2:blank-08': 'or',
  'item:t13-r-ctw-v2:blank-09': 'ile', 'item:t13-r-ctw-v2:blank-10': 'upy',
} as const;

const SET14_KEY = {
  'item:t14-r-ctw-v2:blank-01': 'ols', 'item:t14-r-ctw-v2:blank-02': 'dens',
  'item:t14-r-ctw-v2:blank-03': 'ter', 'item:t14-r-ctw-v2:blank-04': 'dd',
  'item:t14-r-ctw-v2:blank-05': 'rial', 'item:t14-r-ctw-v2:blank-06': 'he',
  'item:t14-r-ctw-v2:blank-07': 'form', 'item:t14-r-ctw-v2:blank-08': 'ves',
  'item:t14-r-ctw-v2:blank-09': 'in', 'item:t14-r-ctw-v2:blank-10': 'ode',
} as const;

const SET15_KEY = {
  'item:t15-r-ctw-v2:blank-01': 'duce', 'item:t15-r-ctw-v2:blank-02': 'aust',
  'item:t15-r-ctw-v2:blank-03': 'ile', 'item:t15-r-ctw-v2:blank-04': 'ough',
  'item:t15-r-ctw-v2:blank-05': 'tal', 'item:t15-r-ctw-v2:blank-06': 'act',
  'item:t15-r-ctw-v2:blank-07': 'n', 'item:t15-r-ctw-v2:blank-08': 'ation',
  'item:t15-r-ctw-v2:blank-09': 'icle', 'item:t15-r-ctw-v2:blank-10': 'nd',
} as const;

const SET16_KEY = {
  'item:t16-r-ctw-v2:blank-01': 'ers',
  'item:t16-r-ctw-v2:blank-02': 'ow',
  'item:t16-r-ctw-v2:blank-03': 'nse',
  'item:t16-r-ctw-v2:blank-04': 'at',
  'item:t16-r-ctw-v2:blank-05': 'ows',
  'item:t16-r-ctw-v2:blank-06': 'der',
  'item:t16-r-ctw-v2:blank-07': 'wn',
  'item:t16-r-ctw-v2:blank-08': 'ing',
  'item:t16-r-ctw-v2:blank-09': 'an',
  'item:t16-r-ctw-v2:blank-10': 'leys',
} as const;

const SET17_KEY = {
  'item:t17-r-ctw-v2:blank-01': 'lks',
  'item:t17-r-ctw-v2:blank-02': 'rm',
  'item:t17-r-ctw-v2:blank-03': 'tect',
  'item:t17-r-ctw-v2:blank-04': 'ap',
  'item:t17-r-ctw-v2:blank-05': 'r',
  'item:t17-r-ctw-v2:blank-06': 'ety',
  'item:t17-r-ctw-v2:blank-07': 'he',
  'item:t17-r-ctw-v2:blank-08': 'ines',
  'item:t17-r-ctw-v2:blank-09': 'th',
  'item:t17-r-ctw-v2:blank-10': 'ut',
} as const;

const SET18_KEY = {
  'item:t18-r-ctw-v2:blank-01': 'rgy',
  'item:t18-r-ctw-v2:blank-02': 'ration',
  'item:t18-r-ctw-v2:blank-03': 'ter',
  'item:t18-r-ctw-v2:blank-04': 'ile',
  'item:t18-r-ctw-v2:blank-05': 'ease',
  'item:t18-r-ctw-v2:blank-06': 'ough',
  'item:t18-r-ctw-v2:blank-07': 's',
  'item:t18-r-ctw-v2:blank-08': 'ols',
  'item:t18-r-ctw-v2:blank-09': 'enses',
  'item:t18-r-ctw-v2:blank-10': 'lets',
} as const;

const SET19_KEY = {
  'item:t19-r-ctw-v2:blank-01': 'ved',
  'item:t19-r-ctw-v2:blank-02': 'nds',
  'item:t19-r-ctw-v2:blank-03': 'ile',
  'item:t19-r-ctw-v2:blank-04': 'table',
  'item:t19-r-ctw-v2:blank-05': 'pens',
  'item:t19-r-ctw-v2:blank-06': 'age',
  'item:t19-r-ctw-v2:blank-07': 'he',
  'item:t19-r-ctw-v2:blank-08': 'ceptors',
  'item:t19-r-ctw-v2:blank-09': 'vert',
  'item:t19-r-ctw-v2:blank-10': 'to',
} as const;

const SET20_KEY = {
  'item:t20-r-ctw-v2:blank-01': 'els',
  'item:t20-r-ctw-v2:blank-02': 'ight',
  'item:t20-r-ctw-v2:blank-03': 'ricity',
  'item:t20-r-ctw-v2:blank-04': 'nd',
  'item:t20-r-ctw-v2:blank-05': 'se',
  'item:t20-r-ctw-v2:blank-06': 'ir',
  'item:t20-r-ctw-v2:blank-07': 'ive',
  'item:t20-r-ctw-v2:blank-08': 'power',
  'item:t20-r-ctw-v2:blank-09': 'rgy',
  'item:t20-r-ctw-v2:blank-10': 'wing',
} as const;

export const TOEFL_CTW_SCORING_BY_OBJECT_ID: Readonly<Record<string, readonly CompleteWordsScoringBlank[]>> = {
  [TOEFL_CTW_SET1_V3.objectId]: TOEFL_CTW_SET1_V3_SCORING,
  [TOEFL_CTW_SET2_V2.objectId]: attachKey(TOEFL_CTW_SET2_V2.blanks, SET2_KEY),
  [TOEFL_CTW_SET3_V2.objectId]: attachKey(TOEFL_CTW_SET3_V2.blanks, SET3_KEY),
  [TOEFL_CTW_SET4_V2.objectId]: attachKey(TOEFL_CTW_SET4_V2.blanks, SET4_KEY),
  [TOEFL_CTW_SET5_V2.objectId]: attachKey(TOEFL_CTW_SET5_V2.blanks, SET5_KEY),
  [TOEFL_CTW_SET6_V2.objectId]: attachKey(TOEFL_CTW_SET6_V2.blanks, SET6_KEY),
  [TOEFL_CTW_SET7_V2.objectId]: attachKey(TOEFL_CTW_SET7_V2.blanks, SET7_KEY),
  [TOEFL_CTW_SET8_V2.objectId]: attachKey(TOEFL_CTW_SET8_V2.blanks, SET8_KEY),
  [TOEFL_CTW_SET9_V2.objectId]: attachKey(TOEFL_CTW_SET9_V2.blanks, SET9_KEY),
  [TOEFL_CTW_SET10_V2.objectId]: attachKey(TOEFL_CTW_SET10_V2.blanks, SET10_KEY),
  [TOEFL_CTW_SET11_V2.objectId]: attachKey(TOEFL_CTW_SET11_V2.blanks, SET11_KEY),
  [TOEFL_CTW_SET12_V2.objectId]: attachKey(TOEFL_CTW_SET12_V2.blanks, SET12_KEY),
  [TOEFL_CTW_SET13_V2.objectId]: attachKey(TOEFL_CTW_SET13_V2.blanks, SET13_KEY),
  [TOEFL_CTW_SET14_V2.objectId]: attachKey(TOEFL_CTW_SET14_V2.blanks, SET14_KEY),
  [TOEFL_CTW_SET15_V2.objectId]: attachKey(TOEFL_CTW_SET15_V2.blanks, SET15_KEY),
  [TOEFL_CTW_SET16_V2.objectId]: attachKey(TOEFL_CTW_SET16_V2.blanks, SET16_KEY),
  [TOEFL_CTW_SET17_V2.objectId]: attachKey(TOEFL_CTW_SET17_V2.blanks, SET17_KEY),
  [TOEFL_CTW_SET18_V2.objectId]: attachKey(TOEFL_CTW_SET18_V2.blanks, SET18_KEY),
  [TOEFL_CTW_SET19_V2.objectId]: attachKey(TOEFL_CTW_SET19_V2.blanks, SET19_KEY),
  [TOEFL_CTW_SET20_V2.objectId]: attachKey(TOEFL_CTW_SET20_V2.blanks, SET20_KEY),
  ...TOEFL_CTW_MODULE2_SCORING_BY_OBJECT_ID,
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

export const TOEFL_CTW_SETS_6_TO_10_LEGACY_SOURCES = [
  { id: 't6-r-cw1', template: 'Dear Housing Office,\n\nI would like to {{1}} a problem with the heating in my room. It stopped working two days {{2}}, and the room is now very {{3}}. I have tried adjusting the controls, but {{4}} happens. Could someone please come to {{5}} it as soon as possible? I am usually free in the {{6}}, after my classes finish.\n\nThank you,\nLuis', answers: ['report', 'ago', 'cold', 'nothing', 'fix', 'afternoon'] },
  { id: 't6-r-cw2', template: 'Bees play a vital role in {{1}}, the process by which plants reproduce. As a bee moves from flower to flower collecting {{2}}, it carries pollen with it, allowing plants to produce seeds and {{3}}. Without bees and other pollinators, many of the crops we depend on would {{4}} sharply. In recent years, scientists have {{5}} a worrying decline in bee populations, and many are working to {{6}} the causes.', answers: ['pollination', 'nectar', 'fruit', 'decline', 'observed', 'understand'] },
  { id: 't7-r-cw1', template: 'Dear Ms. Carter,\n\nI am interested in {{1}} for the exchange program in Japan next year. Could you tell me what {{2}} I need to submit and the {{3}} for the application? I am also worried about the {{4}} of living there. Are there any {{5}} available for students? I would be grateful for any {{6}} you can give me.\n\nBest wishes,\nElena', answers: ['applying', 'documents', 'deadline', 'cost', 'scholarships', 'advice'] },
  { id: 't7-r-cw2', template: 'Recycling helps reduce the amount of {{1}} that ends up in landfills. When materials such as glass, paper, and {{2}} are collected and processed, they can be turned into new products, saving {{3}} and energy. However, recycling only works if items are sorted {{4}}. Putting the wrong materials in a recycling bin can {{5}} an entire batch. For this reason, many cities provide clear {{6}} about what can and cannot be recycled.', answers: ['waste', 'plastic', 'resources', 'correctly', 'ruin', 'instructions'] },
  { id: 't8-r-cw1', template: "Hi Sam,\n\nI've gone to the {{1}} to buy some food for dinner. Could you please do the {{2}} while I'm out? The basket is full. Also, the landlord called about the broken {{3}} in the bathroom — he'll come to {{4}} it on Thursday, so we need to be {{5}}. I'll be back around six. Call me if you need {{6}}.\n\nThanks,\nJo", answers: ['supermarket', 'dishes', 'tap', 'repair', 'home', 'anything'] },
  { id: 't8-r-cw2', template: "A volcano is an opening in the Earth's {{1}} through which molten rock, ash, and gases can {{2}}. Beneath the surface, this molten rock is called magma; once it {{3}} onto the surface, it is known as lava. Volcanic eruptions can be extremely {{4}}, destroying nearby towns, but they also create rich, fertile {{5}} that is excellent for farming. Scientists closely {{6}} active volcanoes to warn people before an eruption.", answers: ['crust', 'escape', 'reaches', 'dangerous', 'soil', 'monitor'] },
  { id: 't9-r-cw1', template: 'Dear Professor Diaz,\n\nI am writing to ask for a short {{1}} on the essay due Friday. I have been {{2}} this week and was unable to visit the library to find {{3}}. I have already written a first {{4}}, but I would like more time to {{5}} it properly. Would it be possible to submit on Monday {{6}}?\n\nThank you for your understanding,\nHana', answers: ['extension', 'ill', 'sources', 'draft', 'revise', 'instead'] },
  { id: 't9-r-cw2', template: 'The heart is a {{1}} about the size of a fist that pumps blood around the body. It beats around one hundred thousand times a {{2}}, sending oxygen and nutrients to every {{3}}. To keep the heart {{4}}, doctors recommend regular exercise and a balanced {{5}}. Smoking and too much stress can {{6}} the risk of heart disease.', answers: ['muscle', 'day', 'cell', 'healthy', 'diet', 'increase'] },
  { id: 't10-r-cw1', template: 'I had dinner at Green Table last night and I would {{1}} it to anyone. The service was {{2}} — our food arrived quickly and the waiter was very friendly. The vegetable curry was {{3}}, full of flavor, and not too expensive. My only {{4}} is that the restaurant was quite {{5}}, so it was a little hard to talk. Still, I will definitely {{6}} again.', answers: ['recommend', 'excellent', 'delicious', 'complaint', 'noisy', 'return'] },
  { id: 't10-r-cw2', template: 'A river is a natural stream of water that flows toward an ocean, lake, or another river. Rivers begin in high ground, often from rain or melting {{1}}, and gradually flow {{2}}. Along the way, they shape the {{3}}, carving valleys and carrying soil. For thousands of years, humans have settled near rivers because they provide fresh water, {{4}} for crops, and a route for {{5}}. Today, however, many rivers are threatened by {{6}} from factories and farms.', answers: ['snow', 'downhill', 'landscape', 'irrigation', 'transport', 'pollution'] },
] as const;
