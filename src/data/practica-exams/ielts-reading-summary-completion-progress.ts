import {
  IELTS_NOTE_COMPLETION_PASSAGES,
  IELTS_SUMMARY_COMPLETION_PASSAGES,
  type NoteCompletionPassage,
  type SummaryCompletionPassage,
} from './seo-catalog.ts';

export type SummaryCompletionErrorCode =
  | 'isolated-gap'
  | 'wrong-summary-zone'
  | 'duplicate-frame-word'
  | 'grammar-mismatch'
  | 'over-limit'
  | 'incomplete-span';

export type SummaryCompletionDecision = {
  id: string;
  before: string;
  after: string;
  answer: string;
  alternatives: string[];
  instruction: string;
  maxWords: number;
  evidenceQuote: string;
  explanation: string;
  hint: string;
  trap: string;
  errorCode: SummaryCompletionErrorCode;
};

export type SummaryCompletionTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  summaryIntro: string;
  instruction: string;
  maxWords: number;
  sourceUrl: string;
  sourceNote: string;
  decisions: SummaryCompletionDecision[];
};

export type SummaryCompletionLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const SUMMARY_COMPLETION_STORAGE_KEY = 'welearn:ielts-reading:summary-completion:v2';
export const SUMMARY_COMPLETION_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:summary-completion:v1';
export const SUMMARY_COMPLETION_GUIDED_PASSAGE_ID = 'summary-urban-farms';
export const SUMMARY_COMPLETION_INDEPENDENT_PASSAGE_ID = 'summary-repair-cafes';

const OFFICIAL_FORMAT_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const SOURCE_BOUNDARIES: Record<string, { url: string; note: string }> = {
  'summary-urban-farms': {
    url: 'https://www.usda.gov/about-usda/general-information/initiatives-and-highlighted-programs/urban-agriculture-and-innovative-production',
    note: 'This WeLearn passage is a composite urban-agriculture scenario. The USDA page is candidate context, not verification of every claim or proof of authorship or publication rights.',
  },
  'summary-repair-cafes': {
    url: 'https://environment.ec.europa.eu/topics/circular-economy_en',
    note: 'This WeLearn passage is a composite repair-cafe scenario. The circular-economy page supplies broad context only; it does not verify the complete passage or establish rights clearance.',
  },
  'summary-shade-mapping': {
    url: 'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands',
    note: 'This WeLearn passage is a composite heat-planning scenario. The EPA page supports general cooling context, not every local example, authorship or full factual sign-off.',
  },
  'summary-mobile-libraries': {
    url: 'https://pls.sl.nsw.gov.au/managing-my-library/standards-and-guidelines/library-council-guidelines',
    note: 'Adapted from an existing WeLearn mobile-library practice passage. The institutional source is candidate context and does not certify all composite details or publication rights.',
  },
  'summary-seed-banks': {
    url: 'https://www.fao.org/4/ac546e/ac546e07.htm',
    note: 'Adapted from an existing WeLearn seed-bank practice passage. FAO material supports selected procedures; it is not blanket verification, authorship evidence or rights clearance for this passage.',
  },
  'summary-night-libraries': {
    url: 'https://www.sl.nsw.gov.au/news/extended-study-hours-students',
    note: 'Adapted from an existing WeLearn after-hours-library passage. The public example is candidate context, not proof of universal practice, authorship or rights clearance.',
  },
};

const ERROR_ROTATION: SummaryCompletionErrorCode[] = [
  'wrong-summary-zone',
  'isolated-gap',
  'grammar-mismatch',
  'incomplete-span',
  'over-limit',
  'duplicate-frame-word',
];

function maxWordsFromInstruction(instruction: string) {
  if (/ONE WORD/i.test(instruction)) return 1;
  const match = instruction.match(/(?:NO MORE THAN|UP TO)\s+(\w+)\s+WORDS?/i);
  if (!match) return 2;
  const words: Record<string, number> = { one: 1, two: 2, three: 3 };
  return Number(match[1]) || words[match[1].toLowerCase()] || 2;
}

function evidenceFor(passage: string, answer: string) {
  const paragraph = passage.split(/\n\n+/u).find((part) => part.toLocaleLowerCase('en').includes(answer.toLocaleLowerCase('en')));
  if (!paragraph) throw new Error(`Missing literal evidence for Summary Completion answer: ${answer}`);
  return paragraph;
}

function fromSummary(source: SummaryCompletionPassage): SummaryCompletionTrainingPassage {
  const maxWords = maxWordsFromInstruction(source.wordLimit);
  const boundary = SOURCE_BOUNDARIES[source.id];
  if (!boundary) throw new Error(`Missing source boundary for ${source.id}`);
  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    summaryIntro: source.summaryIntro,
    instruction: source.wordLimit,
    maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.questions.map((question, index) => ({
      id: question.id,
      before: question.before,
      after: question.after,
      answer: question.answer,
      // “the roof” produced “check the the roof”; only the grammatical span is accepted.
      alternatives: (question.alternatives ?? []).filter((alternative) => !(question.id === 'summary-urban-farms-06' && alternative === 'the roof')),
      instruction: source.wordLimit,
      maxWords,
      evidenceQuote: evidenceFor(source.passage, question.answer),
      explanation: question.explanation,
      hint: question.hint,
      trap: `Do not solve this gap in isolation. Recheck the summary sequence, the grammatical frame and the exact evidence span before submitting ${question.answer}.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

function fromNotes(source: NoteCompletionPassage): SummaryCompletionTrainingPassage {
  const id = source.id.replace(/^note-/u, 'summary-');
  const boundary = SOURCE_BOUNDARIES[id];
  if (!boundary) throw new Error(`Missing source boundary for ${id}`);
  const questions = source.noteGroups.flatMap((group) => group.items);
  return {
    id,
    title: source.title,
    passage: source.passage,
    summaryIntro: `Complete the connected overview of ${source.title.toLowerCase()} using words from the passage. Read all six sentences before filling any gap.`,
    instruction: source.wordLimit,
    maxWords: source.maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: questions.map((question, index) => ({
      id: question.id.replace(/^note-/u, 'summary-'),
      before: question.before,
      after: question.after,
      answer: question.answer,
      alternatives: [],
      instruction: source.wordLimit,
      maxWords: source.maxWords,
      evidenceQuote: evidenceFor(source.passage, question.answer),
      explanation: question.explanation,
      hint: question.hint,
      trap: `A nearby detail may fit the topic but not this position in the connected overview. Rebuild the sentence around ${question.answer}.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

export const SUMMARY_COMPLETION_PASSAGES: SummaryCompletionTrainingPassage[] = [
  ...IELTS_SUMMARY_COMPLETION_PASSAGES.map(fromSummary),
  ...IELTS_NOTE_COMPLETION_PASSAGES.map(fromNotes),
];

export const SUMMARY_COMPLETION_LEVELS: SummaryCompletionLevel[] = [
  {
    id: 'cohesion-map',
    title: 'Map the connected summary',
    focus: 'Cohesion + evidence order',
    instruction: 'Read the complete summary first, then use sequence and reference words to locate each evidence zone.',
    passageIds: ['summary-shade-mapping', 'summary-mobile-libraries', 'summary-seed-banks', 'summary-night-libraries'],
    decisionIds: ['summary-shade-mapping-01', 'summary-mobile-libraries-02', 'summary-seed-banks-03', 'summary-night-libraries-04'],
    masteryScore: 3,
  },
  {
    id: 'grammar-boundary',
    title: 'Control grammar and limits',
    focus: 'Form + answer boundary',
    instruction: 'Predict the missing form, copy the smallest exact span and rebuild the whole summary sentence.',
    passageIds: ['summary-shade-mapping', 'summary-mobile-libraries', 'summary-seed-banks', 'summary-night-libraries'],
    decisionIds: ['summary-shade-mapping-06', 'summary-mobile-libraries-06', 'summary-seed-banks-05', 'summary-night-libraries-05'],
    masteryScore: 3,
  },
  { id: 'shade', title: 'Full set · Shade mapping', focus: 'Connected urban process', instruction: 'Complete the six-gap summary before feedback opens.', passageIds: ['summary-shade-mapping'], masteryScore: 5 },
  { id: 'mobile', title: 'Full set · Mobile libraries', focus: 'Purpose to sustainability', instruction: 'Track the overview across all four passage paragraphs.', passageIds: ['summary-mobile-libraries'], masteryScore: 5 },
  { id: 'seed', title: 'Full set · Seed banks', focus: 'Process and purpose', instruction: 'Use summary sequence, grammar and exact passage wording.', passageIds: ['summary-seed-banks'], masteryScore: 5 },
  { id: 'night', title: 'Skill check · Night libraries', focus: 'Controlled transfer', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['summary-night-libraries'], masteryScore: 5 },
];

export function getSummaryCompletionPassage(id: string) {
  return SUMMARY_COMPLETION_PASSAGES.find((passage) => passage.id === id);
}

export function normalizeSummaryCompletionAnswer(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/[.,;:!?]+$/gu, '').replace(/\s+/gu, ' ');
}

export function countSummaryCompletionWords(value: string) {
  const normalized = normalizeSummaryCompletionAnswer(value);
  return normalized ? normalized.split(' ').length : 0;
}

export function isSummaryCompletionCorrect(decision: SummaryCompletionDecision, value: string) {
  const normalized = normalizeSummaryCompletionAnswer(value);
  return [decision.answer, ...decision.alternatives].some((answer) => normalizeSummaryCompletionAnswer(answer) === normalized)
    && countSummaryCompletionWords(value) <= decision.maxWords;
}

export const SUMMARY_COMPLETION_OFFICIAL_FORMAT_URL = OFFICIAL_FORMAT_URL;
