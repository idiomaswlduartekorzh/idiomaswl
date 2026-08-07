export type QuestionType =
  | 'mcq'
  | 'dialog'
  | 'fill'
  | 'write'
  | 'speak'
  | 'formgroup'
  | 'tablegroup'
  | 'multiselect'
  | 'matching'
  // TOEFL iBT 2026 task types
  | 'wordcomplete'
  | 'sentencebuild'
  | 'repeat';

// ── Existing types ────────────────────────────────────────────────────────────

export interface MCQQuestion {
  type: 'mcq' | 'dialog';
  id: string;
  part: number;
  stimulus?: string;
  stimulusLabel?: string;
  stimulusStyle?: 'notice' | 'sign' | 'dialog-box'; // visual treatment of stimulus
  audioUrl?: string;   // per-item audio prompt (e.g. TOEFL 2026 "Listen and Choose a Response")
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
  partNumber: 1 | 2 | 3 | 4;
  text: string;
  cueCard?: string;
  followUp?: string[];
  imageUrls?: string[];
  imageAlts?: string[];
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

// ── TOEFL iBT 2026 task types ──────────────────────────────────────────────────

// Complete the Words (Reading). A short text/sentence with word gaps that already
// show some given letters; the test-taker completes each word. Machine scored.
export interface WordCompleteBlank {
  num: number;
  prefix?: string;   // letters shown before the gap, e.g. "lib" for "library"
  suffix?: string;   // letters shown after the gap (rare)
  answer: string;    // the full word (case-insensitive exact match)
}

export interface WordCompleteQuestion {
  type: 'wordcomplete';
  id: string;
  part: number;
  qRange?: [number, number];
  instructions?: string;
  template: string;  // text with {{n}} markers, use \n for line breaks
  blanks: WordCompleteBlank[];
}

// Build a Sentence (Writing). Scrambled word/chunk tiles the test-taker orders
// into a single grammatical sentence. Machine scored (exact order).
export interface SentenceBuildQuestion {
  type: 'sentencebuild';
  id: string;
  part: number;
  prompt?: string;   // optional context/instruction shown above the tiles
  tiles: string[];   // words/chunks shown in scrambled order
  answer: string[];  // correct ordering (a permutation of tiles)
}

// Listen and Repeat (Speaking). An audio-prompt of a sentence the test-taker
// must repeat aloud. AI scored in the real exam; self-assessed here.
export interface RepeatQuestion {
  type: 'repeat';
  id: string;
  part: number;
  itemNumber: number;
  audioUrl?: string;      // audio of the sentence to repeat (may not exist yet)
  targetSentence: string; // the sentence to repeat (also the audio script)
}

export type Question =
  | MCQQuestion
  | FillQuestion
  | WriteQuestion
  | SpeakQuestion
  | FormGroupQuestion
  | TableGroupQuestion
  | MultiSelectQuestion
  | MatchingGroupQuestion
  | WordCompleteQuestion
  | SentenceBuildQuestion
  | RepeatQuestion;

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
  sectionStyle?: 'matching-grid' | 'notices-grid' | 'dialogs-grid' | 'cloze-text' | 'reading';
  passageTitle?: string;  // shown as heading above the reading passage
  // matching-grid (ICFES Part 1)
  topic?: string;          // category title shown bold-centered, e.g. "Health"
  exampleText?: string;    // example question text
  exampleAnswer?: string;  // matching-grid: H word; notices-grid: answer letter ('A'/'B'/'C')
  // notices-grid (ICFES Part 2)
  exampleStimulus?: string;  // notice/sign text shown in the example row
  // dialogs-grid (ICFES Part 3)
  exampleOptions?: string[]; // A/B/C options shown in the example scene
}

export interface MockExam {
  id: string;
  examSlug: string;
  title: string;
  subtitle: string;
  timeMinutes: number;
  sections: MockSection[];
  // Marks a mock that follows a specific official blueprint. 'toefl-2026' selects
  // the 1–6 section scoring and the new-format task renderers; absent = legacy.
  format?: 'toefl-2026';
}
