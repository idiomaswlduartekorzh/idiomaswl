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
  | 'repeat'
  | 'toefl-reading-single'
  | 'toefl-reading-multi'
  | 'toefl-listening-single';

// ── Existing types ────────────────────────────────────────────────────────────

export interface MCQQuestion {
  type: 'mcq' | 'dialog';
  id: string;
  part: number;
  stimulus?: string;
  stimulusLabel?: string;
  // Visual treatment of the stimulus. 'passage' renders it as reading prose (SAT: each
  // item carries its own 25–150 word text), the rest keep the ICFES notice/sign/dialog look.
  stimulusStyle?: 'notice' | 'sign' | 'dialog-box' | 'passage';
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
  timeLimitSeconds?: 420 | 600;
  minimumWordsPolicy?: 'none-published' | 'recommended-100';
  evaluationDisclosure?: string;
}

export interface SpeakQuestion {
  type: 'speak';
  id: string;
  part: number;
  partNumber: 1 | 2 | 3 | 4;
  text: string;
  audioUrl?: string;
  mediaId?: string;
  mediaStatus?: 'ready-existing' | 'script-ready-audio-blocked';
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

export interface ToeflReadingSingleQuestion {
  type: 'toefl-reading-single';
  id: string;
  sourceItemId: string;
  objectId: string;
  contentVersion: string;
  serverScoring: 'toefl-reading';
  alignment: 'official-family-pilot';
  part: number;
  text: string;
  options: { id: string; label: string; text: string }[];
}

export interface ToeflReadingMultiQuestion {
  type: 'toefl-reading-multi';
  id: string;
  sourceItemId: string;
  objectId: string;
  contentVersion: string;
  serverScoring: 'toefl-reading';
  alignment: 'welearn-supplementary';
  part: number;
  text: string;
  options: { id: string; label: string; text: string }[];
  selectCount: number;
}

// TOEFL iBT 2026 Listening item. The answer key is intentionally absent from
// the public mock payload and is resolved by the server-only scoring registry.
export interface ToeflListeningSingleQuestion {
  type: 'toefl-listening-single';
  id: string;
  sourceItemId: string;
  objectId: string;
  contentVersion: string;
  serverScoring: 'toefl-listening';
  alignment: 'official-family-pilot';
  task: 'choose-response' | 'conversation' | 'announcement' | 'academic-talk';
  part: number;
  text: string;
  options: Array<{ id: string; label: string; text: string }>;
  mediaId: string;
  mediaStatus: 'ready-existing' | 'script-ready-audio-blocked';
  audioUrl?: string;
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
  id?: string;       // stable response identity; required for server-scored assessment items
  num: number;
  prefix?: string;   // letters shown before the gap, e.g. "lib" for "library"
  suffix?: string;   // letters shown after the gap (rare)
  missingLength?: number; // number of letters the learner must enter
  answer?: string;   // legacy local-practice key; omit from server-scored assessment payloads
}

export interface WordCompleteQuestion {
  type: 'wordcomplete';
  id: string;
  objectId?: string; // stable assessment object; required when serverScoring is enabled
  contentVersion?: string;
  serverScoring?: 'toefl-complete-words';
  alignment?: 'official-family-pilot' | 'welearn-supplementary';
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

// TOEFL iBT 2026 Build a Sentence. The public payload contains stable tile IDs,
// context and fixed reply text, but never the answer key.
export interface ToeflBuildSentenceQuestion {
  type: 'toefl-build-sentence';
  id: string;
  sourceItemId?: string;
  objectId: string;
  contentVersion: string;
  serverScoring: 'toefl-build-sentence';
  alignment: 'official-family-pilot';
  part: number;
  context: string;
  replyPrefix: string;
  replySuffix: string;
  tiles: Array<{ id: string; text: string }>;
  blankCount: number;
}

// Listen and Repeat (Speaking). An audio-prompt of a sentence the test-taker
// must repeat aloud. AI scored in the real exam; self-assessed here.
export interface RepeatQuestion {
  type: 'repeat';
  id: string;
  part: number;
  itemNumber: number;
  audioUrl?: string;      // audio of the sentence to repeat (may not exist yet)
  mediaId?: string;
  mediaStatus?: 'ready-existing' | 'script-ready-audio-blocked';
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
  | ToeflBuildSentenceQuestion
  | RepeatQuestion
  | ToeflReadingSingleQuestion
  | ToeflReadingMultiQuestion
  | ToeflListeningSingleQuestion;

// ── Section & exam ────────────────────────────────────────────────────────────

/**
 * Lo que la pantalla de revisión sabe de un ítem además de su clave: a qué área
 * pertenece y por qué cada opción es o no es la respuesta.
 *
 * Va colgado de la sección y no de la pregunta, y todo es opcional, a propósito: así
 * `MCQQuestion` no cambia de forma y los cinco exámenes ya publicados (ICFES, IELTS,
 * TOEFL y los de idiomas) siguen compilando y renderizando exactamente igual. Hoy solo
 * lo llena el SAT, desde `SatItemMeta` (`domain` + `razones`).
 */
export interface QuestionInsight {
  /** Código corto del área evaluada, p. ej. 'CS'. Agrupa el desglose de resultados. */
  domain?: string;
  /** Nombre legible del área, p. ej. 'Craft and Structure'. */
  domainLabel?: string;
  /**
   * Por qué la clave es la clave y qué error concreto comete quien elige cada
   * distractor, indexado por letra de opción ('A', 'B', 'C', 'D'…).
   */
  rationales?: Record<string, string>;
}

export interface MockSection {
  part: number;
  title: string;
  skill?: 'listening' | 'reading' | 'writing' | 'speaking' | 'general';
  instructions: string;
  passage?: string;        // shared reading passage shown above every question
  sectionNote?: string;    // e.g. word bank shown above Part 2 questions
  transcript?: string;
  audioUrl?: string;       // URL to audio file (if available)
  mediaId?: string;        // stable Listening stimulus identity
  mediaStatus?: 'ready-existing' | 'script-ready-audio-blocked';
  comingSoon?: boolean;    // disables the tab, shows "En Construcción" badge
  questions: Question[];
  // TOEFL 2026 fixed-route practice metadata. The official test is adaptive;
  // WeLearn intentionally models the published two-module practice-test shape.
  moduleId?: 'reading-1' | 'reading-2' | 'listening-1' | 'listening-2' | 'writing' | 'speaking';
  /**
   * Rama de un examen por etapas. Sin esto, el único vínculo entre «parte 3» y «módulo
   * exigente» era una cadena de texto en el título, así que un guardián no podía detectar
   * que alguien hubiera intercambiado las dos ramas: al que va bien se le servía la fácil
   * y la pantalla le decía que había hecho la difícil, y todo pasaba en verde.
   */
  variant?: 'M1' | 'M2-facil' | 'M2-dificil';
  /**
   * Explicaciones y dominio por ítem, indexado por `Question['id']`. Opcional: una
   * sección sin esto se revisa como siempre (clave marcada en verde y nada más).
   */
  insights?: Record<string, QuestionInsight>;
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

/**
 * Enrutado adaptativo por etapas. Hoy solo lo usa el SAT.
 *
 * El motor sirve secciones lineales: las pinta todas, una detrás de otra. Con esto, en
 * cambio, el estudiante hace el módulo de `routeAfterPart`, lo **entrega sin poder
 * volver**, y según cuántas acertó se le sirve `lowPart` o `highPart`. Las otras partes
 * no existen para él: ni las ve, ni cuentan, ni aparecen en la revisión.
 *
 * `correctToRouteHigh` es **convención de WeLearn, no de College Board**: el punto de
 * corte real del SAT no se publica. La pantalla lo dice; no se presenta como oficial.
 *
 * Un examen sin este campo se comporta exactamente como antes.
 */
export interface AdaptiveRouting {
  /** Parte que todo el mundo hace primero y que decide el enrutado. */
  routeAfterPart: number;
  /** Aciertos necesarios en esa parte para ir al módulo exigente. */
  correctToRouteHigh: number;
  /** Parte que se sirve por debajo del corte. */
  lowPart: number;
  /** Parte que se sirve a partir del corte. */
  highPart: number;
  /** Minutos por módulo. El cronómetro se reinicia en cada uno, como en el examen real. */
  minutesPerModule: number;
}

export interface MockExam {
  id: string;
  examSlug: string;
  title: string;
  subtitle: string;
  timeMinutes: number;
  sections: MockSection[];
  /** Ver AdaptiveRouting. Ausente = examen lineal de toda la vida. */
  adaptive?: AdaptiveRouting;
  // Marks a mock that follows a specific official blueprint. 'toefl-2026' selects
  // the 1–6 section scoring and the new-format task renderers; absent = legacy.
  format?: 'toefl-2026';
  toefl2026Blueprint?: {
    delivery: 'fixed-official-practice-shape';
    adaptive: false;
    disclosure: string;
    sourceAsOf: '2026-08-14';
    targetInteractions: {
      reading: 40;
      listening: 34;
      writing: 12;
      speaking: 11;
    };
    modules: readonly {
      id: 'reading-1' | 'reading-2' | 'listening-1' | 'listening-2' | 'writing-build' | 'writing-email' | 'writing-discussion' | 'speaking';
      skill: 'reading' | 'listening' | 'writing' | 'speaking';
      interactionCount: number;
      timeLimitSeconds?: number;
      timingSource: 'official-practice-clock' | 'official-task-clock' | 'welearn-derived-clock' | 'not-public-per-item';
      navigation: 'within-module' | 'forward-only';
    }[];
  };
}
