import { IELTS_SENTENCE_COMPLETION_PASSAGES, type SummaryCompletionPassage } from './seo-catalog.ts';
import {
  WORD_LIMIT_PASSAGES,
  countWordLimitWords,
  normalizeWordLimitAnswer,
  type WordLimitDecision,
} from './ielts-reading-word-limit-progress.ts';

export type SentenceCompletionErrorCode =
  | 'over-limit'
  | 'duplicate-frame-word'
  | 'incomplete-span'
  | 'grammar-mismatch'
  | 'wrong-evidence'
  | 'instruction-misread';

export type SentenceCompletionDecision = {
  id: string;
  instruction: string;
  maxWords: number;
  before: string;
  after: string;
  answer: string;
  alternatives: string[];
  evidenceQuote: string;
  explanation: string;
  hint: string;
  trap: string;
  errorCode: SentenceCompletionErrorCode;
};

export type SentenceCompletionTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  sourceUrl: string;
  sourceNote: string;
  decisions: SentenceCompletionDecision[];
};

export type SentenceCompletionLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const SENTENCE_COMPLETION_STORAGE_KEY = 'welearn:ielts-reading:sentence-completion:v2';
export const SENTENCE_COMPLETION_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:sentence-completion:v1';
export const SENTENCE_COMPLETION_GUIDED_PASSAGE_ID = 'sentence-wetland-parks';
export const SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID = 'sentence-library-makerspaces';

const LEGACY_SOURCES: Record<string, { sourceUrl: string; sourceNote: string }> = {
  'sentence-wetland-parks': {
    sourceUrl: 'https://www.epa.gov/green-infrastructure/about-green-infrastructure',
    sourceNote: 'This WeLearn training passage is a composite scenario grounded in public EPA explanations of green infrastructure. The candidate source supports the general mechanism; it does not verify every sentence or establish authorship or publication rights for this practice text.',
  },
  'sentence-library-makerspaces': {
    sourceUrl: 'https://www.ala.org/advocacy/sites/ala.org.advocacy/files/content/Workforce/LBB_Playbook_web_013122.pdf',
    sourceNote: 'This WeLearn training passage combines common library-makerspace examples. The ALA playbook is a candidate context source, not proof for every composite claim, authorship, rights clearance or human factual sign-off.',
  },
  'sentence-night-markets': {
    sourceUrl: 'https://www2.naga.gov.ph/prev-ordinance/ordinance-no-2014-004/',
    sourceNote: 'This WeLearn training passage is a composite market-planning scenario. The municipal source is one candidate reference for temporary street trading; it does not verify the complete passage or establish authorship, rights clearance or human review.',
  },
};

const ERROR_SEQUENCE: SentenceCompletionErrorCode[] = [
  'wrong-evidence',
  'incomplete-span',
  'grammar-mismatch',
  'duplicate-frame-word',
  'over-limit',
  'instruction-misread',
];

function paragraphContaining(passage: string, answer: string) {
  const normalized = normalizeWordLimitAnswer(answer);
  return passage.split(/\n\s*\n/u).find((paragraph) => normalizeWordLimitAnswer(paragraph).includes(normalized)) ?? passage;
}

function diagnosis(code: SentenceCompletionErrorCode, answer: string) {
  const exact = `“${answer}”`;
  const messages: Record<SentenceCompletionErrorCode, string> = {
    'over-limit': `The response adds words beyond the displayed maximum. Copy only the missing span ${exact}.`,
    'duplicate-frame-word': `The response repeats a word already supplied by the sentence frame. Submit only ${exact}.`,
    'incomplete-span': `A shorter nearby word loses part of the required meaning. The complete evidence span is ${exact}.`,
    'grammar-mismatch': `The chosen form does not rebuild the sentence naturally. The passage form ${exact} fits the frame.`,
    'wrong-evidence': `A nearby true detail answers a different relationship. This frame is completed by ${exact}.`,
    'instruction-misread': `The response does not follow the displayed source and word-limit rule. The valid passage span is ${exact}.`,
  };
  return messages[code];
}

function fromLegacy(passage: SummaryCompletionPassage): SentenceCompletionTrainingPassage {
  const source = LEGACY_SOURCES[passage.id];
  if (!source) throw new Error(`Missing Sentence Completion source boundary for ${passage.id}`);
  return {
    id: passage.id,
    title: passage.title,
    passage: passage.passage,
    ...source,
    decisions: passage.questions.map((question, index) => {
      const errorCode = ERROR_SEQUENCE[index % ERROR_SEQUENCE.length];
      return {
        id: question.id,
        instruction: passage.wordLimit,
        maxWords: 2,
        before: question.before,
        after: question.after,
        answer: question.answer,
        alternatives: question.alternatives ?? [],
        evidenceQuote: paragraphContaining(passage.passage, question.answer),
        explanation: question.explanation,
        hint: question.hint,
        trap: diagnosis(errorCode, question.answer),
        errorCode,
      };
    }),
  };
}

const DERIVED_IDS = ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful'];

function fromWordLimit(id: string): SentenceCompletionTrainingPassage {
  const passage = WORD_LIMIT_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing source-backed passage ${id}`);
  const maxWords = id === 'citizens-do-science' ? 2 : 1;
  const instruction = maxWords === 1 ? 'ONE WORD ONLY' : 'NO MORE THAN TWO WORDS';
  return {
    id: passage.id,
    title: passage.title,
    passage: passage.paragraphs.map((paragraph) => paragraph.text).join('\n\n'),
    sourceUrl: passage.sourceUrl,
    sourceNote: `${passage.sourceNote} Reused here as bounded WeLearn Sentence Completion practice; the cited source remains context rather than blanket verification or rights clearance.`,
    decisions: passage.decisions.slice(0, 4).map((decision: WordLimitDecision) => ({
      id: `sentence-${decision.id}`,
      instruction,
      maxWords,
      before: decision.before,
      after: decision.after,
      answer: decision.answer,
      alternatives: [],
      evidenceQuote: decision.evidenceQuote,
      explanation: decision.explanation,
      hint: `Locate the paragraph containing: “${decision.evidenceQuote.split(/\s+/u).slice(0, 7).join(' ')} …”`,
      trap: decision.trap,
      errorCode: decision.errorCode,
    })),
  };
}

export const SENTENCE_COMPLETION_PASSAGES: SentenceCompletionTrainingPassage[] = [
  ...IELTS_SENTENCE_COMPLETION_PASSAGES.map(fromLegacy),
  ...DERIVED_IDS.map(fromWordLimit),
];

export const SENTENCE_COMPLETION_LEVELS: SentenceCompletionLevel[] = [
  {
    id: 'grammar-span',
    title: 'Predict grammar, then copy',
    focus: 'Grammar + literal span',
    instruction: 'Predict the missing form before searching, then copy the smallest complete passage span.',
    passageIds: ['sentence-night-markets', 'sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful'],
    decisionIds: ['sentence-night-markets-03', 'sentence-sleep-limit-b', 'sentence-citizen-limit-c', 'sentence-seed-limit-b'],
    masteryScore: 3,
  },
  {
    id: 'limit-boundary',
    title: 'Control the answer boundary',
    focus: 'Instruction + frame',
    instruction: 'Respect the displayed limit and do not repeat words already supplied by the sentence frame.',
    passageIds: ['sentence-night-markets', 'sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful'],
    decisionIds: ['sentence-night-markets-06', 'sentence-sleep-limit-a', 'sentence-citizen-limit-d', 'sentence-seed-limit-d'],
    masteryScore: 3,
  },
  { id: 'night', title: 'Full set · Night markets', focus: 'Two-word transfer', instruction: 'Complete all six sentences before feedback opens.', passageIds: ['sentence-night-markets'], masteryScore: 5 },
  { id: 'sleep', title: 'Full set · Sleep and memory', focus: 'ONE WORD ONLY', instruction: 'Use the sentence grammar to control four exact passage answers.', passageIds: ['sleep-builds-memory'], masteryScore: 3 },
  { id: 'citizen', title: 'Paced set · Citizen science', focus: 'One- or two-word answers', instruction: 'Complete the four frames without opening feedback.', passageIds: ['citizens-do-science'], masteryScore: 3 },
  { id: 'seed', title: 'Skill check · Seed collections', focus: 'Controlled transfer', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['keeping-seeds-useful'], masteryScore: 3 },
];

export function getSentenceCompletionPassage(id: string) {
  return SENTENCE_COMPLETION_PASSAGES.find((passage) => passage.id === id);
}

export function normalizeSentenceCompletionAnswer(value: string) {
  return normalizeWordLimitAnswer(value);
}

export function countSentenceCompletionWords(value: string) {
  return countWordLimitWords(value);
}

export function isSentenceCompletionCorrect(decision: SentenceCompletionDecision, value: string) {
  const normalized = normalizeSentenceCompletionAnswer(value);
  return [decision.answer, ...decision.alternatives].some((answer) => normalizeSentenceCompletionAnswer(answer) === normalized)
    && countSentenceCompletionWords(value) <= decision.maxWords;
}
