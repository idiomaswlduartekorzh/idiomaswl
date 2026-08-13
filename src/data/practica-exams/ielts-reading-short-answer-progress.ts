import {
  IELTS_SHORT_ANSWER_PASSAGES,
  type ShortAnswerPassage,
} from './seo-catalog.ts';
import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type ShortAnswerTarget = 'person' | 'place' | 'time' | 'thing' | 'reason' | 'condition' | 'quantity';
export type ShortAnswerErrorCode =
  | 'wrong-target'
  | 'wrong-evidence-zone'
  | 'nearby-detail'
  | 'copied-context'
  | 'over-limit'
  | 'outside-knowledge';

export type ShortAnswerDecision = {
  id: string;
  question: string;
  target: ShortAnswerTarget;
  answer: string;
  alternatives: string[];
  maxWords: number;
  evidenceQuote: string;
  explanation: string;
  hint: string;
  trap: string;
  errorCode: ShortAnswerErrorCode;
};

export type ShortAnswerTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  instruction: string;
  maxWords: number;
  sourceUrl: string;
  sourceNote: string;
  decisions: ShortAnswerDecision[];
};

export type ShortAnswerLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const SHORT_ANSWER_STORAGE_KEY = 'welearn:ielts-reading:short-answer:v1';
export const SHORT_ANSWER_GUIDED_PASSAGE_ID = 'short-answer-night-markets';
export const SHORT_ANSWER_INDEPENDENT_PASSAGE_ID = 'short-answer-floating-classrooms';
export const SHORT_ANSWER_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const ERROR_ROTATION: ShortAnswerErrorCode[] = [
  'wrong-target',
  'wrong-evidence-zone',
  'nearby-detail',
  'copied-context',
  'over-limit',
  'outside-knowledge',
];

const LEGACY_TARGETS: Record<string, ShortAnswerTarget[]> = {
  'short-answer-night-markets': ['reason', 'thing', 'thing', 'person', 'condition', 'thing'],
  'short-answer-floating-classrooms': ['reason', 'thing', 'thing', 'time', 'thing', 'thing'],
  'short-answer-community-compost': ['place', 'thing', 'thing', 'thing', 'thing', 'thing'],
};

const LEGACY_SOURCES: Record<string, { url: string; note: string }> = {
  'short-answer-night-markets': {
    url: 'https://maidstone.gov.uk/home/primary-services/council-and-democracy/information-and-data/council-performance-reports/policies/street-trading-policy',
    note: 'WeLearn is authorised to publish this guided-practice passage. The council policy supplies candidate context for street-trading noise, obstruction and operating controls; it does not verify this composite market account or license the WeLearn wording.',
  },
  'short-answer-floating-classrooms': {
    url: 'https://www.shidhulai.org/',
    note: 'WeLearn is authorised to publish this guided-practice passage. Shidhulai documents boat-based classrooms in flood-prone communities; it does not verify every construction, timetable or material detail in this composite passage.',
  },
  'short-answer-community-compost': {
    url: 'https://www.epa.gov/recycle/composting-home',
    note: 'WeLearn is authorised to publish this guided-practice passage. EPA guidance supports food scraps, dry materials, aeration and exclusion of meat, dairy and oily foods; it does not certify every local-station detail or third-party right.',
  },
};

export function normalizeShortAnswer(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/[.,;:!?]+$/gu, '').replace(/\s+/gu, ' ');
}

export function countShortAnswerWords(value: string) {
  const clean = normalizeShortAnswer(value);
  return clean ? clean.split(' ').length : 0;
}

export function isShortAnswerCorrect(decision: ShortAnswerDecision, value: string) {
  if (countShortAnswerWords(value) > decision.maxWords) return false;
  const accepted = [decision.answer, ...decision.alternatives].map(normalizeShortAnswer);
  return accepted.includes(normalizeShortAnswer(value));
}

function paragraphContaining(passage: string, answer: string) {
  const normalized = normalizeShortAnswer(answer);
  const paragraph = passage.split(/\n\s*\n/u).find((part) => normalizeShortAnswer(part).includes(normalized));
  if (!paragraph) throw new Error(`Missing literal Short Answer evidence for ${answer}`);
  return paragraph;
}

function fromLegacy(source: ShortAnswerPassage): ShortAnswerTrainingPassage {
  const boundary = LEGACY_SOURCES[source.id];
  if (!boundary) throw new Error(`Missing Short Answer source boundary for ${source.id}`);
  const targets = LEGACY_TARGETS[source.id];
  if (!targets || targets.length !== source.questions.length) throw new Error(`Missing Short Answer target map for ${source.id}`);
  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    instruction: source.wordLimit,
    maxWords: source.maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.questions.map((question, index) => ({
      id: question.id,
      question: question.question,
      target: targets[index],
      answer: question.answer,
      alternatives: question.alternatives ?? [],
      maxWords: source.maxWords,
      evidenceQuote: paragraphContaining(source.passage, question.answer),
      explanation: question.explanation,
      hint: question.hint,
      trap: question.trap,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

type DerivedDecision = Pick<ShortAnswerDecision, 'id' | 'question' | 'target' | 'answer' | 'alternatives' | 'explanation'>;

const DERIVED_DECISIONS: Record<string, DerivedDecision[]> = {
  'keeping-seeds-useful': [
    { id: 'short-seeds-01', question: 'What threat could an uncommon variety respond to besides drought and a changing climate?', target: 'thing', answer: 'disease', alternatives: [], explanation: 'The opening paragraph lists drought, disease and a changing climate as possible future pressures.' },
    { id: 'short-seeds-02', question: 'What turns stored material into a resource another researcher can understand?', target: 'thing', answer: 'data', alternatives: [], explanation: 'The record paragraph says data turns stored material into a usable research resource.' },
    { id: 'short-seeds-03', question: 'What storage condition do staff control besides moisture?', target: 'condition', answer: 'temperature', alternatives: [], explanation: 'Staff control moisture and temperature during long-term storage.' },
    { id: 'short-seeds-04', question: 'What do curators collect after growing part of the remaining stock?', target: 'thing', answer: 'fresh generation', alternatives: [], explanation: 'Curators collect a fresh generation of seed after controlled growth.' },
    { id: 'short-seeds-05', question: 'Who can request material alongside researchers?', target: 'person', answer: 'plant breeders', alternatives: [], explanation: 'The final paragraph names plant breeders and researchers as users of the collection.' },
    { id: 'short-seeds-06', question: 'What gives preservation a practical purpose?', target: 'thing', answer: 'access', alternatives: [], explanation: 'The conclusion states that access gives preservation a practical purpose.' },
  ],
  'citizens-do-science': [
    { id: 'short-citizen-01', question: 'Who share the work in citizen-science projects?', target: 'person', answer: 'volunteers', alternatives: [], explanation: 'Citizen-science projects divide large research tasks among volunteers.' },
    { id: 'short-citizen-02', question: 'What kind of images may participants classify?', target: 'thing', answer: 'galaxy images', alternatives: [], explanation: 'The participation paragraph gives galaxy-image classification as one example.' },
    { id: 'short-citizen-03', question: 'What do projects provide alongside instructions and fixed reporting categories?', target: 'thing', answer: 'examples', alternatives: [], explanation: 'Projects provide instructions, examples and fixed reporting categories.' },
    { id: 'short-citizen-04', question: 'What entries may researchers flag for review?', target: 'thing', answer: 'unusual entries', alternatives: [], explanation: 'Researchers may flag unusual entries as part of quality control.' },
    { id: 'short-citizen-05', question: 'What may volunteers verify before later automated searches improve?', target: 'thing', answer: 'algorithm’s suggestions', alternatives: ["algorithm's suggestions"], explanation: 'The human-software paragraph says volunteers can verify an algorithm’s suggestions.' },
    { id: 'short-citizen-06', question: 'What have some volunteers become in research publications?', target: 'person', answer: 'co-authors', alternatives: [], explanation: 'The final paragraph notes that volunteers have become co-authors.' },
  ],
  'night-trains-cross-borders': [
    { id: 'short-rail-01', question: 'What services did European institutions select?', target: 'thing', answer: 'pilot services', alternatives: [], explanation: 'European institutions selected pilot services to test cross-border links.' },
    { id: 'short-rail-02', question: 'What modern feature do new sleeper coaches need?', target: 'thing', answer: 'safety systems', alternatives: [], explanation: 'New sleeper coaches need authorisation and modern safety systems.' },
    { id: 'short-rail-03', question: 'Who must cooperate across several countries?', target: 'person', answer: 'infrastructure managers', alternatives: [], explanation: 'The network paragraph requires cooperation among infrastructure managers.' },
    { id: 'short-rail-04', question: 'What may a multi-operator trip be difficult to buy as?', target: 'thing', answer: 'one itinerary', alternatives: [], explanation: 'The sales paragraph says a trip can be difficult to buy as one itinerary.' },
    { id: 'short-rail-05', question: 'What can a night train turn travel time into?', target: 'time', answer: 'sleeping time', alternatives: [], explanation: 'The conclusion says night rail can turn travel time into sleeping time.' },
    { id: 'short-rail-06', question: 'What must be sufficient alongside suitable vehicles and reliable connections?', target: 'quantity', answer: 'enough demand', alternatives: [], explanation: 'A viable service still requires enough demand.' },
  ],
};

function fromSourcePassage(sourceId: string): ShortAnswerTrainingPassage {
  const source = MATCHING_HEADINGS_PASSAGES.find((item: MatchingHeadingsTrainingPassage) => item.id === sourceId);
  if (!source) throw new Error(`Missing source-backed Short Answer passage ${sourceId}`);
  const passage = source.paragraphs.map((paragraph) => paragraph.text).join('\n\n');
  const decisions = DERIVED_DECISIONS[sourceId];
  if (!decisions) throw new Error(`Missing Short Answer decisions for ${sourceId}`);
  return {
    id: `short-${source.id}`,
    title: source.title,
    passage,
    instruction: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} Reused here as bounded WeLearn Short Answer practice; the cited source is candidate context rather than blanket factual verification, authorship proof or third-party rights clearance.`,
    decisions: decisions.map((decision, index) => ({
      ...decision,
      maxWords: 2,
      evidenceQuote: paragraphContaining(passage, decision.answer),
      hint: `Use the question word and requested ${decision.target} to predict the evidence shape, then scan in question order.`,
      trap: `A nearby true detail is not correct unless it answers the requested ${decision.target} with the smallest exact span.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

export const SHORT_ANSWER_PASSAGES: ShortAnswerTrainingPassage[] = [
  ...IELTS_SHORT_ANSWER_PASSAGES.map(fromLegacy),
  ...Object.keys(DERIVED_DECISIONS).map(fromSourcePassage),
];

export const SHORT_ANSWER_LEVELS: ShortAnswerLevel[] = [
  {
    id: 'target-shape',
    title: 'Predict the answer shape',
    focus: 'Question word → target type',
    instruction: 'Name whether the question requests a person, thing, time, condition or quantity before scanning.',
    passageIds: ['short-answer-community-compost', 'short-keeping-seeds-useful', 'short-citizens-do-science', 'short-night-trains-cross-borders'],
    decisionIds: ['short-community-compost-02', 'short-seeds-05', 'short-citizen-06', 'short-rail-06'],
    masteryScore: 3,
  },
  {
    id: 'minimal-span',
    title: 'Return the smallest exact span',
    focus: 'Evidence + scope + word limit',
    instruction: 'Reject a nearby true detail and copy only the span that answers the exact question.',
    passageIds: ['short-answer-community-compost', 'short-keeping-seeds-useful', 'short-citizens-do-science', 'short-night-trains-cross-borders'],
    decisionIds: ['short-community-compost-04', 'short-seeds-03', 'short-citizen-04', 'short-rail-04'],
    masteryScore: 3,
  },
  ...[
    ['compost-full', 'Community compost stations', 'short-answer-community-compost'],
    ['seeds-full', 'Keeping a seed collection useful', 'short-keeping-seeds-useful'],
    ['citizen-full', 'When the public joins a research team', 'short-citizens-do-science'],
    ['rail-full', 'Rebuilding cross-border night rail', 'short-night-trains-cross-borders'],
  ].map(([id, title, passageId]) => ({
    id,
    title,
    focus: 'Complete ordered Short Answer set',
    instruction: 'Complete all six questions in passage order, then submit once for feedback and repair.',
    passageIds: [passageId],
    masteryScore: 5,
  })),
];

export const SHORT_ANSWER_GUIDED_PASSAGE = SHORT_ANSWER_PASSAGES.find((passage) => passage.id === SHORT_ANSWER_GUIDED_PASSAGE_ID)!;
export const SHORT_ANSWER_INDEPENDENT_PASSAGE = SHORT_ANSWER_PASSAGES.find((passage) => passage.id === SHORT_ANSWER_INDEPENDENT_PASSAGE_ID)!;
export const SHORT_ANSWER_ENGINE_PASSAGES = SHORT_ANSWER_PASSAGES.filter((passage) => ![SHORT_ANSWER_GUIDED_PASSAGE_ID, SHORT_ANSWER_INDEPENDENT_PASSAGE_ID].includes(passage.id));

export function getShortAnswerPassage(id: string) {
  return SHORT_ANSWER_PASSAGES.find((passage) => passage.id === id);
}
