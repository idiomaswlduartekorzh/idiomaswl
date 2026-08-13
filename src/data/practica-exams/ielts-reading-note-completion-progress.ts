import {
  IELTS_NOTE_COMPLETION_PASSAGES,
  IELTS_SUMMARY_COMPLETION_PASSAGES,
  type NoteCompletionPassage,
  type SummaryCompletionPassage,
} from './seo-catalog.ts';

export type NoteCompletionErrorCode =
  | 'heading-ignored'
  | 'wrong-note-group'
  | 'grammar-mismatch'
  | 'over-limit'
  | 'incomplete-span'
  | 'copied-context';

export type NoteCompletionDecision = {
  id: string;
  groupHeading: string;
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
  errorCode: NoteCompletionErrorCode;
};

export type NoteCompletionTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  notesTitle: string;
  instruction: string;
  maxWords: number;
  sourceUrl: string;
  sourceNote: string;
  decisions: NoteCompletionDecision[];
};

export type NoteCompletionLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const NOTE_COMPLETION_STORAGE_KEY = 'welearn:ielts-reading:note-completion:v1';
export const NOTE_COMPLETION_GUIDED_PASSAGE_ID = 'note-mobile-libraries';
export const NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID = 'note-seed-banks';

export const NOTE_COMPLETION_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const SOURCE_BOUNDARIES: Record<string, { url: string; note: string }> = {
  'note-mobile-libraries': {
    url: 'https://pls.sl.nsw.gov.au/managing-my-library/standards-and-guidelines/library-council-guidelines',
    note: 'This WeLearn mobile-library passage is a composite training scenario. The institutional page is candidate context and does not verify every detail, authorship or publication rights.',
  },
  'note-seed-banks': {
    url: 'https://www.fao.org/4/ac546e/ac546e07.htm',
    note: 'This WeLearn seed-bank passage combines broadly documented practices. FAO material supports selected procedures, not every claim, authorship or blanket rights clearance.',
  },
  'note-night-libraries': {
    url: 'https://www.sl.nsw.gov.au/news/extended-study-hours-students',
    note: 'This WeLearn after-hours-library passage is a composite scenario. The public example supplies candidate context and does not establish universal practice, authorship or rights clearance.',
  },
  'note-urban-farms': {
    url: 'https://www.usda.gov/about-usda/general-information/initiatives-and-highlighted-programs/urban-agriculture-and-innovative-production',
    note: 'This WeLearn rooftop-farming passage is reused as structured-note practice. The USDA page is candidate context, not complete factual verification or proof of authorship or rights.',
  },
  'note-repair-cafes': {
    url: 'https://environment.ec.europa.eu/topics/circular-economy_en',
    note: 'This WeLearn repair-cafe passage is reused as structured-note practice. The circular-economy page supplies broad context only and does not certify the complete scenario or rights.',
  },
  'note-shade-mapping': {
    url: 'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands',
    note: 'This WeLearn heat-planning passage is reused as structured-note practice. The EPA page supports general cooling context, not every local example, authorship or full factual sign-off.',
  },
};

const SUMMARY_GROUPS: Record<string, [string, string, string]> = {
  'summary-urban-farms': ['Location and purpose', 'Design requirements', 'Education and planning'],
  'summary-repair-cafes': ['Learning through repair', 'Safe preparation', 'Community value'],
  'summary-shade-mapping': ['Mapping exposure', 'Targeting action', 'From temporary shade to policy'],
};

const ERROR_ROTATION: NoteCompletionErrorCode[] = [
  'heading-ignored',
  'wrong-note-group',
  'grammar-mismatch',
  'incomplete-span',
  'over-limit',
  'copied-context',
];

function maxWordsFromInstruction(instruction: string) {
  if (/ONE WORD/i.test(instruction)) return 1;
  const match = instruction.match(/(?:NO MORE THAN|UP TO)\s+(\w+)\s+WORDS?/i);
  if (!match) return 2;
  const words: Record<string, number> = { one: 1, two: 2, three: 3 };
  return Number(match[1]) || words[match[1].toLowerCase()] || 2;
}

function evidenceFor(passage: string, answer: string) {
  const paragraph = passage
    .split(/\n\n+/u)
    .find((part) => part.toLocaleLowerCase('en').includes(answer.toLocaleLowerCase('en')));
  if (!paragraph) throw new Error(`Missing literal evidence for Note Completion answer: ${answer}`);
  return paragraph;
}

function fromNotes(source: NoteCompletionPassage): NoteCompletionTrainingPassage {
  const boundary = SOURCE_BOUNDARIES[source.id];
  if (!boundary) throw new Error(`Missing source boundary for ${source.id}`);
  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    notesTitle: source.notesTitle,
    instruction: source.wordLimit,
    maxWords: source.maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.noteGroups.flatMap((group) =>
      group.items.map((question, index) => ({
        id: question.id,
        groupHeading: group.heading,
        before: question.before,
        after: question.after,
        answer: question.answer,
        alternatives: question.alternatives ?? [],
        instruction: source.wordLimit,
        maxWords: source.maxWords,
        evidenceQuote: evidenceFor(source.passage, question.answer),
        explanation: question.explanation,
        hint: question.hint,
        trap: `Use the heading “${group.heading}” to limit the passage zone, then rebuild the complete note around ${question.answer}.`,
        errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
      }))
    ),
  };
}

function fromSummary(source: SummaryCompletionPassage): NoteCompletionTrainingPassage {
  const id = source.id.replace(/^summary-/u, 'note-');
  const boundary = SOURCE_BOUNDARIES[id];
  const headings = SUMMARY_GROUPS[source.id];
  if (!boundary || !headings) throw new Error(`Missing Note Completion adaptation contract for ${source.id}`);
  const maxWords = maxWordsFromInstruction(source.wordLimit);
  return {
    id,
    title: source.title,
    passage: source.passage,
    notesTitle: `Structured notes: ${source.title.toLowerCase()}`,
    instruction: source.wordLimit,
    maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.questions.map((question, index) => ({
      id: question.id.replace(/^summary-/u, 'note-'),
      groupHeading: headings[Math.floor(index / 2)],
      before: question.before,
      after: question.after,
      answer: question.answer,
      // “the roof” would create “check the the roof”; the grammatical span is “roof”.
      alternatives: (question.alternatives ?? []).filter(
        (alternative) => !(question.id === 'summary-urban-farms-06' && alternative === 'the roof')
      ),
      instruction: source.wordLimit,
      maxWords,
      evidenceQuote: evidenceFor(source.passage, question.answer),
      explanation: question.explanation,
      hint: question.hint,
      trap: `The heading “${headings[Math.floor(index / 2)]}” defines the evidence category. A nearby phrase from another group is not enough.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

export const NOTE_COMPLETION_PASSAGES: NoteCompletionTrainingPassage[] = [
  ...IELTS_NOTE_COMPLETION_PASSAGES.map(fromNotes),
  ...IELTS_SUMMARY_COMPLETION_PASSAGES.map(fromSummary),
];

export const NOTE_COMPLETION_LEVELS: NoteCompletionLevel[] = [
  {
    id: 'heading-map',
    title: 'Use headings as a search map',
    focus: 'Group purpose + passage zone',
    instruction: 'Name the note group first, then search only for evidence that belongs to its purpose.',
    passageIds: ['note-night-libraries', 'note-urban-farms', 'note-repair-cafes', 'note-shade-mapping'],
    decisionIds: ['note-night-libraries-03', 'note-urban-farms-03', 'note-repair-cafes-05', 'note-shade-mapping-06'],
    masteryScore: 3,
  },
  {
    id: 'form-and-boundary',
    title: 'Predict form and answer boundary',
    focus: 'Grammar + exact span + limit',
    instruction: 'Predict the missing form from the bullet, then copy the smallest exact span within the displayed limit.',
    passageIds: ['note-night-libraries', 'note-urban-farms', 'note-repair-cafes', 'note-shade-mapping'],
    decisionIds: ['note-night-libraries-05', 'note-urban-farms-06', 'note-repair-cafes-03', 'note-shade-mapping-02'],
    masteryScore: 3,
  },
  { id: 'night', title: 'Full set · Night libraries', focus: 'Services, pilot and rules', instruction: 'Complete all three note groups before feedback opens.', passageIds: ['note-night-libraries'], masteryScore: 5 },
  { id: 'urban', title: 'Full set · Rooftop farms', focus: 'Purpose, design and planning', instruction: 'Use each group heading to control the passage zone.', passageIds: ['note-urban-farms'], masteryScore: 5 },
  { id: 'repair', title: 'Full set · Repair cafes', focus: 'Learning, safety and community value', instruction: 'Submit the complete structured-note set once.', passageIds: ['note-repair-cafes'], masteryScore: 5 },
  { id: 'shade', title: 'Skill check · Shade mapping', focus: 'Evidence transfer', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['note-shade-mapping'], masteryScore: 5 },
];

export function getNoteCompletionPassage(id: string) {
  return NOTE_COMPLETION_PASSAGES.find((passage) => passage.id === id);
}

export function normalizeNoteCompletionAnswer(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[.,;:!?]+$/gu, '')
    .replace(/\s+/gu, ' ');
}

export function countNoteCompletionWords(value: string) {
  const normalized = normalizeNoteCompletionAnswer(value);
  return normalized ? normalized.split(' ').length : 0;
}

export function isNoteCompletionCorrect(decision: NoteCompletionDecision, value: string) {
  const normalized = normalizeNoteCompletionAnswer(value);
  return [decision.answer, ...decision.alternatives].some(
    (answer) => normalizeNoteCompletionAnswer(answer) === normalized
  ) && countNoteCompletionWords(value) <= decision.maxWords;
}
