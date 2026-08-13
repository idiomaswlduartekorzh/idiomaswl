import {
  IELTS_TABLE_COMPLETION_PASSAGES,
  type TableCompletionPassage,
} from './seo-catalog.ts';
import {
  NOTE_COMPLETION_PASSAGES,
  type NoteCompletionTrainingPassage,
} from './ielts-reading-note-completion-progress.ts';

export type TableCompletionErrorCode =
  | 'headers-ignored'
  | 'wrong-row'
  | 'wrong-column'
  | 'grammar-mismatch'
  | 'over-limit'
  | 'copied-context';

export type TableCompletionDecision = {
  id: string;
  rowHeading: string;
  columnHeading: string;
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
  errorCode: TableCompletionErrorCode;
};

export type TableCompletionTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  tableTitle: string;
  instruction: string;
  maxWords: number;
  columns: [string, string, string];
  sourceUrl: string;
  sourceNote: string;
  decisions: TableCompletionDecision[];
};

export type TableCompletionLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const TABLE_COMPLETION_STORAGE_KEY = 'welearn:ielts-reading:table-completion:v1';
export const TABLE_COMPLETION_GUIDED_PASSAGE_ID = 'table-cooling-buildings';
export const TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID = 'table-rain-gardens';
export const TABLE_COMPLETION_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

export function normalizeTableCompletionAnswer(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/[.,;:!?]+$/gu, '').replace(/\s+/gu, ' ');
}

export function countTableCompletionWords(value: string) {
  const clean = normalizeTableCompletionAnswer(value);
  return clean ? clean.split(' ').length : 0;
}

export function isTableCompletionCorrect(decision: TableCompletionDecision, value: string) {
  if (countTableCompletionWords(value) > decision.maxWords) return false;
  const accepted = [decision.answer, ...decision.alternatives].map(normalizeTableCompletionAnswer);
  return accepted.includes(normalizeTableCompletionAnswer(value));
}

const SOURCE_BOUNDARIES: Record<string, { url: string; note: string }> = {
  'table-cooling-buildings': {
    url: 'https://www.yourhome.gov.au/passive-design/passive-cooling',
    note: 'WeLearn is authorized to publish this guided-practice passage. The Australian Government page is candidate factual context and does not verify every simplified claim or license the WeLearn wording.',
  },
  'table-rain-gardens': {
    url: 'https://www.epa.gov/green-infrastructure/types-green-infrastructure',
    note: 'WeLearn is authorized to publish this guided-practice passage. EPA material supports general rain-garden context, not universal performance or every school example.',
  },
  'table-museum-inventory': {
    url: 'https://www.canada.ca/en/heritage-information-network/services/digitization/capture-collections-small-museum.html',
    note: 'WeLearn is authorized to publish this guided-practice passage. The institutional guide provides candidate context and does not certify every workflow detail or third-party right.',
  },
};

const ERROR_ROTATION: TableCompletionErrorCode[] = [
  'headers-ignored',
  'wrong-row',
  'wrong-column',
  'grammar-mismatch',
  'over-limit',
  'copied-context',
];

function evidenceFor(passage: string, answer: string) {
  const paragraph = passage
    .split(/\n\n+/u)
    .find((part) => part.toLocaleLowerCase('en').includes(answer.toLocaleLowerCase('en')));
  if (!paragraph) throw new Error(`Missing literal evidence for Table Completion answer: ${answer}`);
  return paragraph;
}

function fromTable(source: TableCompletionPassage): TableCompletionTrainingPassage {
  const boundary = SOURCE_BOUNDARIES[source.id];
  if (!boundary) throw new Error(`Missing source boundary for ${source.id}`);
  const decisions: TableCompletionDecision[] = [];

  source.rows.forEach((row) => {
    const rowHeading = row.cells.find((cell) => cell.type === 'text')?.text;
    if (!rowHeading) throw new Error(`Missing row heading in ${row.id}`);
    row.cells.forEach((cell, cellIndex) => {
      if (cell.type !== 'blank') return;
      const id = `${row.id}-${cellIndex}`;
      const alternatives = [...(cell.alternatives ?? [])];
      if (id === 'table-cooling-01-2') alternatives.push('direction', 'the direction');
      decisions.push({
        id,
        rowHeading,
        columnHeading: source.columns[cellIndex],
        before: cell.before,
        after: cell.after,
        answer: cell.answer,
        alternatives,
        instruction: source.wordLimit,
        maxWords: source.maxWords,
        evidenceQuote: evidenceFor(source.passage, cell.answer),
        explanation: cell.explanation,
        hint: cell.hint,
        trap: `Use the ${rowHeading} row and ${source.columns[cellIndex]} column together; a true detail from another coordinate cannot complete this cell.`,
        errorCode: ERROR_ROTATION[decisions.length % ERROR_ROTATION.length],
      });
    });
  });

  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    tableTitle: source.tableTitle,
    instruction: source.wordLimit,
    maxWords: source.maxWords,
    columns: source.columns as [string, string, string],
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions,
  };
}

function fromStructuredNotes(source: NoteCompletionTrainingPassage): TableCompletionTrainingPassage {
  const groups = Array.from(new Set(source.decisions.map((decision) => decision.groupHeading)));
  if (groups.length !== 3) throw new Error(`Expected three structured groups in ${source.id}`);
  const id = `table-${source.id.replace(/^note-/u, '')}`;
  const decisions = source.decisions.map((decision, index) => ({
    id: `${id}-${String(index + 1).padStart(2, '0')}`,
    rowHeading: decision.groupHeading,
    columnHeading: index % 2 === 0 ? 'Primary detail' : 'Linked evidence',
    before: decision.before,
    after: decision.after,
    answer: decision.answer,
    alternatives: decision.alternatives,
    instruction: decision.instruction,
    maxWords: decision.maxWords,
    evidenceQuote: decision.evidenceQuote,
    explanation: decision.explanation,
    hint: decision.hint,
    trap: `The answer must satisfy both the ${decision.groupHeading} row and its column purpose, not merely repeat nearby vocabulary.`,
    errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
  }));

  return {
    id,
    title: source.title,
    passage: source.passage,
    tableTitle: `${source.title}: evidence table`,
    instruction: source.instruction,
    maxWords: source.maxWords,
    columns: ['Category', 'Primary detail', 'Linked evidence'],
    sourceUrl: source.sourceUrl,
    sourceNote: source.sourceNote,
    decisions,
  };
}

const STRUCTURED_TRANSFER_IDS = new Set([
  'note-urban-farms',
  'note-repair-cafes',
  'note-shade-mapping',
]);

export const TABLE_COMPLETION_PASSAGES: TableCompletionTrainingPassage[] = [
  ...IELTS_TABLE_COMPLETION_PASSAGES.map(fromTable),
  ...NOTE_COMPLETION_PASSAGES.filter((passage) => STRUCTURED_TRANSFER_IDS.has(passage.id)).map(fromStructuredNotes),
];

export const TABLE_COMPLETION_LEVELS: TableCompletionLevel[] = [
  {
    id: 'coordinates',
    title: 'Use row and column coordinates',
    focus: 'Row purpose + column category',
    instruction: 'Name both headers before searching for the detail that belongs at their intersection.',
    passageIds: ['table-museum-inventory', 'table-urban-farms', 'table-repair-cafes', 'table-shade-mapping'],
    decisionIds: ['table-museum-inventory-02-1', 'table-urban-farms-03', 'table-repair-cafes-05', 'table-shade-mapping-06'],
    masteryScore: 3,
  },
  {
    id: 'span-control',
    title: 'Control grammar and answer span',
    focus: 'Cell grammar + exact evidence + limit',
    instruction: 'Predict the missing form, then copy the smallest exact span that rebuilds the complete cell.',
    passageIds: ['table-museum-inventory', 'table-urban-farms', 'table-repair-cafes', 'table-shade-mapping'],
    decisionIds: ['table-museum-inventory-03-2', 'table-urban-farms-06', 'table-repair-cafes-03', 'table-shade-mapping-02'],
    masteryScore: 3,
  },
  { id: 'museum', title: 'Full table · Museum inventory', focus: 'Stage, action and quality control', instruction: 'Complete all six cells before feedback opens.', passageIds: ['table-museum-inventory'], masteryScore: 5 },
  { id: 'urban', title: 'Full table · Rooftop farms', focus: 'Purpose, design and planning', instruction: 'Use both coordinates to control every evidence search.', passageIds: ['table-urban-farms'], masteryScore: 5 },
  { id: 'repair', title: 'Full table · Repair cafes', focus: 'Learning, safety and community value', instruction: 'Submit the complete table once.', passageIds: ['table-repair-cafes'], masteryScore: 5 },
  { id: 'shade', title: 'Skill check · Shade mapping', focus: 'Coordinate transfer', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['table-shade-mapping'], masteryScore: 5 },
];

export function getTableCompletionPassage(id: string) {
  return TABLE_COMPLETION_PASSAGES.find((passage) => passage.id === id);
}
