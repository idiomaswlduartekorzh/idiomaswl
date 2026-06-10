export type QuestionType =
  | 'mcq'
  | 'dialog'
  | 'fill'
  | 'write'
  | 'speak'
  | 'formgroup'
  | 'tablegroup'
  | 'multiselect'
  | 'matching';

// ── Existing types ────────────────────────────────────────────────────────────

export interface MCQQuestion {
  type: 'mcq' | 'dialog';
  id: string;
  part: number;
  stimulus?: string;
  stimulusLabel?: string;
  stimulusStyle?: 'notice' | 'sign' | 'dialog-box'; // visual treatment of stimulus
  text: string;
  options: string[];
  answer: number; // 0-indexed
}

export interface FillQuestion {
  type: 'fill';
  id: string;
  part: number;
  stimulus?: string;
  stimulusLabel?: string;
  text: string;
  answers: string[];
  maxWords?: number;
}

export interface WriteQuestion {
  type: 'write';
  id: string;
  part: number;
  taskNumber: 1 | 2;
  stimulus: string;
  stimulusLabel?: string;
  imageUrl?: string;       // chart/graph image for Task 1
  imageAlt?: string;
  text: string;
  minWords: number;
}

export interface SpeakQuestion {
  type: 'speak';
  id: string;
  part: number;
  partNumber: 1 | 2 | 3;
  text: string;
  cueCard?: string;
  followUp?: string[];
}

// ── New group question types ───────────────────────────────────────────────────

export interface FormBlank {
  num: number;         // question number (e.g. 1, 2, 3...)
  answers: string[];   // accepted answers (case-insensitive)
  maxWords?: number;
}

// Renders a block of rich text with inline numbered input blanks.
// Template uses {{n}} markers (e.g. "Address: 24 {{1}} Road").
export interface FormGroupQuestion {
  type: 'formgroup';
  id: string;
  part: number;
  qRange: [number, number];  // e.g. [1, 6] — for display "Questions 1–6"
  groupLabel: string;        // "Complete the notes below. Write ONE WORD..."
  title?: string;            // e.g. "Car Tours in the USA"
  example?: string;          // e.g. "Name: Andrea Brown"
  imageUrl?: string;         // optional diagram/chart shown above template
  imageAlt?: string;
  template: string;          // text with {{n}} markers, use \n for line breaks
  blanks: FormBlank[];
}

export type TableCell = string | { num: number; answers: string[]; maxWords?: number };

// Renders an HTML table where some cells are input blanks.
export interface TableGroupQuestion {
  type: 'tablegroup';
  id: string;
  part: number;
  qRange: [number, number];
  groupLabel: string;
  headers: string[];
  rows: TableCell[][];
}

// Choose exactly selectCount correct letters from options.
export interface MultiSelectQuestion {
  type: 'multiselect';
  id: string;
  part: number;
  qRange: [number, number];
  text: string;
  options: { letter: string; text: string }[];
  selectCount: number;
  answers: string[];   // correct letters, e.g. ['A', 'C']
}

// Each item has a question number and matches to one of the lettered endings.
export interface MatchingItem {
  num: number;
  stem: string;
  answer: string;  // correct letter
}

export interface MatchingGroupQuestion {
  type: 'matching';
  id: string;
  part: number;
  qRange: [number, number];
  groupLabel?: string;
  items: MatchingItem[];
  endings: { letter: string; text: string }[];
}

export type Question =
  | MCQQuestion
  | FillQuestion
  | WriteQuestion
  | SpeakQuestion
  | FormGroupQuestion
  | TableGroupQuestion
  | MultiSelectQuestion
  | MatchingGroupQuestion;

// ── Section & exam ────────────────────────────────────────────────────────────

export interface MockSection {
  part: number;
  title: string;
  skill?: 'listening' | 'reading' | 'writing' | 'speaking' | 'general';
  instructions: string;
  passage?: string;        // shared reading passage shown above every question
  sectionNote?: string;    // e.g. word bank shown above Part 2 questions
  transcript?: string;
  audioUrl?: string;       // URL to audio file (if available)
  comingSoon?: boolean;    // disables the tab, shows "En Construcción" badge
  questions: Question[];
  // ── Section layout variants ──────────────────────────────────────────────
  sectionStyle?: 'matching-grid' | 'notices-grid';
  // matching-grid (ICFES Part 2)
  topic?: string;          // category title shown bold-centered, e.g. "Health"
  exampleText?: string;    // example question text
  exampleAnswer?: string;  // matching-grid: H word; notices-grid: answer letter ('A'/'B'/'C')
  // notices-grid (ICFES Part 1)
  exampleStimulus?: string; // notice/sign text shown in the example row
}

export interface MockExam {
  id: string;
  examSlug: string;
  title: string;
  subtitle: string;
  timeMinutes: number;
  sections: MockSection[];
}
