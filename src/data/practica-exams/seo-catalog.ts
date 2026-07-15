export const PRACTICE_BASE_URL = 'https://www.idiomaswl.com';

export type PracticeExam = 'ielts' | 'toefl';

export interface PracticeFaq {
  question: string;
  answer: string;
}

export interface PracticeRoute {
  exam: PracticeExam;
  slug: string;
  title: string;
  description: string;
  path: string;
  parentPath?: string;
  skill: 'reading' | 'writing' | 'listening' | 'speaking';
  searchIntent: string;
  teaches: string[];
  keywords: string[];
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  status: 'published' | 'planned';
  currentExam: boolean;
  note?: string;
  faqs: PracticeFaq[];
}

export interface ObjectiveQuestion {
  id: string;
  statement: string;
  answer: 'TRUE' | 'FALSE' | 'YES' | 'NO' | 'NOT GIVEN';
  explanation: string;
  skill: string;
  trap: string;
}

export interface ObjectivePracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: string;
  questions: ObjectiveQuestion[];
}

export interface WritingPrompt {
  id: string;
  topic: string;
  professor: string;
  studentA: string;
  studentB: string;
  question: string;
  target: string;
  checklist: string[];
  phrases: string[];
}

export interface IntegratedWritingPrompt {
  id: string;
  topic: string;
  readingTitle: string;
  reading: string;
  lecture: string;
  task: string;
  target: string;
  readingClaims: string[];
  lectureResponses: string[];
  checklist: string[];
  phrases: string[];
}

export interface IeltsTask2Prompt {
  id: string;
  essayType: 'Opinion' | 'Discussion' | 'Advantages and disadvantages' | 'Problem-solution' | 'Direct question';
  route: string;
  prompt: string;
  target: string;
  plan: string[];
  thesisMove: string;
  usefulLanguage: string[];
  commonTrap: string;
  selfCheck: string[];
}

export interface MatchingHeadingsPassage {
  id: string;
  title: string;
  instructions: string;
  headingOptions: { id: string; text: string }[];
  paragraphs: {
    id: string;
    label: string;
    text: string;
    answer: string;
    explanation: string;
    trap: string;
  }[];
}

export interface MatchingInformationPassage {
  id: string;
  title: string;
  instructions: string;
  paragraphs: {
    id: string;
    label: string;
    text: string;
  }[];
  questions: {
    id: string;
    statement: string;
    answer: string;
    explanation: string;
    trap: string;
  }[];
}

export interface MatchingFeaturesPassage {
  id: string;
  title: string;
  instructions: string;
  passageTitle: string;
  passage: string;
  features: {
    id: string;
    label: string;
    description: string;
  }[];
  questions: {
    id: string;
    statement: string;
    answer: string;
    explanation: string;
    trap: string;
  }[];
}

export interface MatchingSentenceEndingsPassage {
  id: string;
  title: string;
  instructions: string;
  passageTitle: string;
  passage: string;
  endingOptions: {
    id: string;
    text: string;
  }[];
  questions: {
    id: string;
    sentenceStart: string;
    answer: string;
    explanation: string;
    trap: string;
  }[];
}

export interface DiagramLabelingPassage {
  id: string;
  title: string;
  wordLimit: string;
  passage: string;
  diagramTitle: string;
  stages: {
    id: string;
    label: string;
    description: string;
  }[];
  questions: {
    id: string;
    stageId: string;
    before: string;
    after: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
    hint: string;
  }[];
}

export interface EmailPrompt {
  id: string;
  topic: string;
  situation: string;
  task: string;
  audience: string;
  tone: 'formal' | 'semi-formal' | 'friendly';
  target: string;
  checklist: string[];
  phrases: string[];
}

export interface MultipleChoicePassage {
  id: string;
  title: string;
  passage: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    skill: string;
    trap: string;
  }[];
}

export interface SentenceBuildItem {
  id: string;
  focus: string;
  prompt: string;
  fragments: string[];
  answer: string;
  explanation: string;
  hint: string;
}

export interface SentenceBuildPrompt {
  id: string;
  taskFocus: string;
  prompt: string;
  targetStructure: string;
  modelSentence: string;
  whyItWorks: string;
  commonError: string;
  transferTo: string;
}

export interface ToeflWritingMixedDrill {
  id: string;
  taskType: 'Build a Sentence' | 'Write an Email' | 'Write for an Academic Discussion';
  title: string;
  situation: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  structureCue: string;
  trap: string;
  nextStep: string;
}

export interface ToeflWritingScoredVariant {
  id: string;
  taskType: 'Build a Sentence' | 'Write an Email' | 'Write for an Academic Discussion';
  label: string;
  prompt: string;
  response: string;
  welearnScoreEstimate: number;
  scoreLabel: string;
  whyThisScore: string[];
  upgradeMove: string;
  checklist: string[];
}

export interface ToeflWritingRevisionDrill {
  id: string;
  taskType: 'Build a Sentence' | 'Write an Email' | 'Write for an Academic Discussion';
  title: string;
  focus: string;
  prompt: string;
  flawedResponse: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  evidence: string;
  trap: string;
  rewriteAction: string;
}

export interface ToeflWritingTimedReviewSet {
  id: string;
  title: string;
  timeLimitMinutes: number;
  goal: string;
  officialTaskMix: Array<'Build a Sentence' | 'Write an Email' | 'Write for an Academic Discussion'>;
  instructions: string;
  checkpoints: {
    minute: string;
    action: string;
    reason: string;
  }[];
  tasks: {
    id: string;
    taskType: 'Build a Sentence' | 'Write an Email' | 'Write for an Academic Discussion';
    prompt: string;
    timeTarget: string;
    reviewQuestion: string;
    expectedMove: string;
    commonTrap: string;
  }[];
  debrief: string[];
}

export interface ToeflCompleteWordsItem {
  id: string;
  sentence: string;
  options: string[];
  answer: number;
  explanation: string;
  trap: string;
}

export interface ToeflDailyLifeText {
  id: string;
  title: string;
  text: string;
  questions: {
    id: string;
    question: string;
    answer: string;
    explanation: string;
    trap: string;
  }[];
}

export interface ToeflAcademicPassage {
  id: string;
  title: string;
  paragraphs: string[];
  questions: {
    id: string;
    type: string;
    prompt: string;
    options: string[];
    answer: number;
    explanation: string;
    trap: string;
  }[];
}

export interface ToeflReadingSkillPractice {
  slug: string;
  title: string;
  directAnswer: string;
  whenToUse: string[];
  method: string[];
  textTitle: string;
  text: string;
  questions: {
    id: string;
    prompt: string;
    options: string[];
    answer: number;
    explanation: string;
    evidence: string;
    trap: string;
  }[];
}

export interface ToeflReadingMixedDrill {
  id: string;
  taskFamily: 'Complete the Words' | 'Read in Daily Life' | 'Read an Academic Passage';
  skill: 'logical-relationships' | 'text-organisation' | 'time-management';
  title: string;
  text: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  evidence: string;
  trap: string;
}

export interface SummaryCompletionPassage {
  id: string;
  title: string;
  wordLimit: string;
  passage: string;
  summaryIntro: string;
  questions: {
    id: string;
    before: string;
    after: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
    hint: string;
  }[];
}

export interface NoteCompletionPassage {
  id: string;
  title: string;
  wordLimit: string;
  maxWords: number;
  passageTitle: string;
  passage: string;
  notesTitle: string;
  instructions: string;
  noteGroups: {
    heading: string;
    items: {
      id: string;
      before: string;
      after: string;
      answer: string;
      alternatives?: string[];
      explanation: string;
      hint: string;
    }[];
  }[];
}

export interface TableCompletionPassage {
  id: string;
  title: string;
  wordLimit: string;
  maxWords: number;
  passageTitle: string;
  passage: string;
  instructions: string;
  tableTitle: string;
  columns: string[];
  rows: {
    id: string;
    cells: (
      | { type: 'text'; text: string }
      | {
          type: 'blank';
          before: string;
          after: string;
          answer: string;
          alternatives?: string[];
          explanation: string;
          hint: string;
        }
    )[];
  }[];
}

export interface FlowChartCompletionPassage {
  id: string;
  title: string;
  wordLimit: string;
  maxWords: number;
  passageTitle: string;
  passage: string;
  instructions: string;
  flowTitle: string;
  steps: {
    id: string;
    label: string;
    before: string;
    after: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
    hint: string;
  }[];
}

export interface ShortAnswerPassage {
  id: string;
  title: string;
  wordLimit: string;
  maxWords: number;
  passageTitle: string;
  passage: string;
  instructions: string;
  questions: {
    id: string;
    question: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
    hint: string;
    trap: string;
  }[];
}

export interface SkimmingPracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: string;
  summaryQuestion: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    traps: string[];
  };
  paragraphMap: {
    id: string;
    label: string;
    text: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export interface ScanningPracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: string;
  targets: {
    id: string;
    question: string;
    scanFor: string;
    answer: string;
    evidence: string;
    explanation: string;
    trap: string;
  }[];
}

export interface SkimScanTransferSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: {
    id: string;
    label: string;
    text: string;
    function: string;
  }[];
  tasks: {
    id: string;
    question: string;
    firstMove: 'skim' | 'scan';
    paragraphAnswer: string;
    signalAnswer: string;
    explanation: string;
    evidence: string;
    trap: string;
  }[];
}

export interface InferencePracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: string;
  questions: {
    id: string;
    question: string;
    evidenceFocus: string;
    options: string[];
    answer: number;
    evidence: string;
    explanation: string;
    traps: string[];
  }[];
}

export interface ParaphrasePracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  items: {
    id: string;
    source: string;
    focus: string;
    options: string[];
    answer: number;
    explanation: string;
    traps: string[];
  }[];
}

export interface WordLimitPracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  wordLimit: string;
  passage: string;
  questions: {
    id: string;
    before: string;
    after: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
    trap: string;
  }[];
}

export interface TimeManagementPracticeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passageMap: {
    label: string;
    purpose: string;
    timeBudget: string;
  }[];
  decisions: {
    id: string;
    questionType: string;
    prompt: string;
    signal: string;
    options: string[];
    answer: number;
    explanation: string;
    trap: string;
  }[];
}

export interface IeltsReadingMixedQuestionTypeSet {
  id: string;
  title: string;
  instructions: string;
  timeTarget: string;
  passageTitle: string;
  passage: {
    id: string;
    label: string;
    function: string;
    text: string;
  }[];
  tasks: {
    id: string;
    questionType: string;
    route: string;
    prompt: string;
    question: string;
    options: string[];
    answer: number;
    evidence: string;
    explanation: string;
    trap: string;
    linkedSkill: string;
  }[];
}

export const IELTS_READING_TYPES: PracticeRoute[] = [
  {
    exam: 'ielts',
    slug: 'true-false-not-given',
    title: 'IELTS Reading True/False/Not Given',
    description:
      'Aprende a resolver preguntas IELTS True/False/Not Given con método paso a paso, trampas frecuentes, ejercicios y explicación inmediata.',
    path: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar y entender preguntas True/False/Not Given del IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'True False Not Given', 'evidencia textual', 'distractores'],
    keywords: [
      'IELTS true false not given',
      'IELTS reading true false not given ejercicios',
      'true false not given IELTS en español',
      'IELTS reading practice',
    ],
    priority: 0.78,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué significa Not Given en IELTS Reading?',
        answer:
          'Not Given significa que el texto no confirma ni contradice la afirmación. La idea puede sonar razonable, pero si no está sustentada por evidencia textual, no se puede marcar True ni False.',
      },
      {
        question: '¿Cuál es la diferencia entre False y Not Given?',
        answer:
          'False contradice directamente el texto. Not Given introduce información que el texto no permite verificar. La clave es buscar contradicción explícita antes de elegir False.',
      },
      {
        question: '¿Cómo se practica True/False/Not Given?',
        answer:
          'Primero subraya palabras absolutas, fechas, cantidades y comparaciones. Luego localiza la parte del texto relacionada y decide si hay equivalencia, contradicción o ausencia de información.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'yes-no-not-given',
    title: 'IELTS Reading Yes/No/Not Given',
    description:
      'Aprende a resolver preguntas IELTS Yes/No/Not Given sobre opiniones y afirmaciones del autor con estrategia, ejemplos, ejercicios y respuestas explicadas.',
    path: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar y entender preguntas Yes/No/Not Given del IELTS Academic Reading sobre writer views and claims.',
    teaches: ['IELTS Reading', 'Yes No Not Given', 'writer views', 'writer claims', 'evidencia textual'],
    keywords: [
      'IELTS yes no not given',
      'IELTS reading writer views claims',
      'yes no not given IELTS ejercicios',
      'IELTS reading yes no not given en español',
    ],
    priority: 0.77,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Yes/No/Not Given es igual a True/False/Not Given?',
        answer:
          'No. True/False/Not Given evalúa si una afirmación factual coincide con el texto. Yes/No/Not Given evalúa si una afirmación coincide con la opinión, postura o claim del autor.',
      },
      {
        question: '¿Cuándo marco No en IELTS Yes/No/Not Given?',
        answer:
          'Marca No cuando el texto muestra que el autor sostiene lo contrario de la afirmación. Debe existir contradicción de postura, no solo ausencia de información.',
      },
      {
        question: '¿Cuándo marco Not Given en este tipo de pregunta?',
        answer:
          'Marca Not Given cuando el texto menciona un tema relacionado, pero no revela suficiente información sobre la opinión o claim exacto del autor.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'matching-headings',
    title: 'IELTS Reading Matching Headings',
    description:
      'Guía y práctica para elegir encabezados correctos en IELTS Reading sin caer en palabras repetidas, ejemplos secundarios o detalles llamativos.',
    path: '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Aprender estrategias para Matching Headings en IELTS Reading.',
    teaches: ['IELTS Reading', 'Matching Headings', 'main idea', 'skimming'],
    keywords: [
      'IELTS matching headings',
      'IELTS reading headings practice',
      'matching headings IELTS ejercicios',
      'IELTS reading main idea',
    ],
    priority: 0.76,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué evalúa Matching Headings en IELTS Reading?',
        answer:
          'Evalúa si puedes identificar la idea principal de un párrafo completo. No se trata de encontrar una palabra repetida, sino de reconocer la función global del párrafo.',
      },
      {
        question: '¿Por qué fallo en Matching Headings aunque entiendo el vocabulario?',
        answer:
          'Muchas opciones mencionan detalles reales del texto, pero no resumen el párrafo entero. IELTS usa esos detalles como distractores para separar comprensión local de idea central.',
      },
      {
        question: '¿Debo leer las opciones o los párrafos primero?',
        answer:
          'Conviene leer rápido las opciones para conocer el mapa temático, pero la decisión debe salir del párrafo: primera oración, cambio de dirección, repetición de ideas y conclusión.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'multiple-choice',
    title: 'IELTS Reading Multiple Choice',
    description:
      'Ejercicios de opción múltiple IELTS Reading para entrenar detalle, inferencia, propósito del autor y eliminación de distractores.',
    path: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar preguntas de opción múltiple en IELTS Reading.',
    teaches: ['IELTS Reading', 'multiple choice', 'detail questions', 'inference'],
    keywords: [
      'IELTS multiple choice reading',
      'IELTS reading multiple choice ejercicios',
      'IELTS reading option multiple',
      'IELTS reading distractors',
    ],
    priority: 0.74,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué evalúan las preguntas Multiple Choice en IELTS Reading?',
        answer:
          'Pueden evaluar detalle, idea principal, inferencia, propósito del autor o comprensión de una parte específica del texto. La opción correcta suele ser una paráfrasis, no una copia literal.',
      },
      {
        question: '¿Cómo elimino distractores en IELTS Multiple Choice?',
        answer:
          'Busca opciones demasiado absolutas, opciones que mezclan información real con una conclusión falsa y opciones que responden una pregunta parecida pero no la pregunta exacta.',
      },
      {
        question: '¿Debo leer todas las opciones antes de buscar en el texto?',
        answer:
          'Sí, pero rápido. Identifica palabras clave de la pregunta, ubica la zona del texto y luego compara cada opción con evidencia textual.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'summary-completion',
    title: 'IELTS Reading Summary Completion',
    description:
      'Práctica IELTS Summary Completion para completar resúmenes con palabras del texto y evitar errores de gramática o límite de palabras.',
    path: '/practica/ielts/reading/tipos-de-preguntas/summary-completion',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Aprender a completar summaries en IELTS Reading.',
    teaches: ['IELTS Reading', 'summary completion', 'word limit', 'paraphrase'],
    keywords: [
      'IELTS summary completion',
      'IELTS reading completion practice',
      'IELTS summary completion ejercicios',
      'IELTS reading word limit',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Summary Completion en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde completas un resumen usando información del texto. Puede pedir palabras exactas del pasaje o elegir de una lista, y siempre debes respetar el límite de palabras.',
      },
      {
        question: '¿Debo copiar exactamente las palabras del texto?',
        answer:
          'Si la instrucción dice words from the passage, sí: la respuesta debe salir del texto y encajar gramaticalmente en el espacio. El resumen suele usar paráfrasis alrededor del espacio en blanco.',
      },
      {
        question: '¿Cuál es el error más común en Summary Completion?',
        answer:
          'Elegir una palabra relacionada pero que no encaja con la gramática del resumen, o exceder el límite de palabras. Antes de escribir, predice si necesitas un sustantivo, verbo, adjetivo o frase corta.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'note-completion',
    title: 'IELTS Reading Note Completion',
    description:
      'Practica IELTS Note Completion con apuntes incompletos, limite de palabras, evidencia textual y explicaciones paso a paso.',
    path: '/practica/ielts/reading/tipos-de-preguntas/note-completion',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Note Completion en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'note completion', 'word limit', 'scanning', 'paraphrase'],
    keywords: [
      'IELTS note completion',
      'IELTS reading note completion',
      'IELTS note completion ejercicios',
      'IELTS reading gaps practice',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Note Completion en IELTS Reading?',
        answer:
          'Es un tipo oficial de IELTS Reading donde completas apuntes o notas usando informacion del pasaje. La respuesta debe respetar el limite de palabras y encajar en la estructura de la nota.',
      },
      {
        question: '¿En que se diferencia Note Completion de Summary Completion?',
        answer:
          'Summary Completion suele presentar un parrafo conectado. Note Completion organiza la informacion en apuntes, encabezados o bullets, por eso conviene usar la estructura de las notas para ubicar categoria, detalle y relacion.',
      },
      {
        question: '¿Como practico Note Completion sin perder tiempo?',
        answer:
          'Lee los encabezados de las notas, predice la categoria de cada espacio, escanea el pasaje por nombres o conceptos equivalentes y copia solo las palabras necesarias del texto.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'table-completion',
    title: 'IELTS Reading Table Completion',
    description:
      'Practica IELTS Table Completion con tablas incompletas, limite de palabras, lectura por filas y columnas, y respuestas explicadas.',
    path: '/practica/ielts/reading/tipos-de-preguntas/table-completion',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Table Completion en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'table completion', 'word limit', 'scanning', 'classification'],
    keywords: [
      'IELTS table completion',
      'IELTS reading table completion',
      'IELTS table completion ejercicios',
      'IELTS reading completion tasks',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Table Completion en IELTS Reading?',
        answer:
          'Es un tipo oficial de IELTS Reading donde completas espacios en una tabla usando informacion del pasaje. La tabla organiza datos por filas y columnas, y las respuestas deben respetar el limite de palabras.',
      },
      {
        question: '¿Como se diferencia Table Completion de Note Completion?',
        answer:
          'Note Completion organiza apuntes por encabezados o bullets. Table Completion exige comparar categorias en columnas y filas, por eso debes usar la estructura de la tabla para saber que tipo de dato falta.',
      },
      {
        question: '¿Que hago primero en Table Completion?',
        answer:
          'Lee los titulos de columnas y filas antes del pasaje. Eso te dice si buscas material, fecha, funcion, causa, resultado o problema. Luego escanea la zona relevante y copia palabras exactas.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'flow-chart-completion',
    title: 'IELTS Reading Flow-chart Completion',
    description:
      'Practica IELTS Flow-chart Completion con procesos, secuencias, limite de palabras y respuestas explicadas paso a paso.',
    path: '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Flow-chart Completion en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'flow-chart completion', 'process sequence', 'word limit', 'scanning'],
    keywords: [
      'IELTS flow chart completion',
      'IELTS reading flow chart',
      'IELTS flow chart completion ejercicios',
      'IELTS reading process completion',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Flow-chart Completion en IELTS Reading?',
        answer:
          'Es un tipo oficial de IELTS Reading donde completas un diagrama de flujo con palabras del pasaje. Suele representar una secuencia, proceso, ciclo o serie de decisiones.',
      },
      {
        question: '¿En qué se diferencia de Table Completion?',
        answer:
          'Table Completion organiza información por filas y columnas. Flow-chart Completion organiza pasos en orden, por eso debes seguir conectores de secuencia, causa, resultado y condición.',
      },
      {
        question: '¿Cómo evito perderme en un flow chart?',
        answer:
          'Lee primero todos los pasos del flujo, predice qué tipo de palabra falta y busca en el pasaje la parte del proceso correspondiente. No saltes entre párrafos sin seguir el orden lógico.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'short-answer',
    title: 'IELTS Reading Short-answer Questions',
    description:
      'Practica IELTS Reading Short-answer Questions con preguntas abiertas, limite de palabras, evidencia textual y respuestas explicadas.',
    path: '/practica/ielts/reading/tipos-de-preguntas/short-answer',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Short-answer Questions en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'short-answer questions', 'word limit', 'scanning', 'evidence'],
    keywords: [
      'IELTS short answer questions',
      'IELTS reading short answer',
      'IELTS short answer ejercicios',
      'IELTS answer limit',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué son Short-answer Questions en IELTS Reading?',
        answer:
          'Son preguntas abiertas donde debes responder con palabras del pasaje, normalmente respetando un limite como NO MORE THAN TWO WORDS o NO MORE THAN THREE WORDS.',
      },
      {
        question: '¿Puedo responder con mis propias palabras?',
        answer:
          'Si la instrucción pide palabras del texto, debes copiar la respuesta del pasaje. Puedes entender la idea con tus palabras, pero la respuesta final debe respetar el wording y el limite.',
      },
      {
        question: '¿Cuál es el error más común en Short-answer Questions?',
        answer:
          'Escribir una frase completa cuando la pregunta pide una respuesta corta. IELTS suele esperar un sustantivo, número, lugar, fecha, material o frase breve, no una oración larga.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'sentence-completion',
    title: 'IELTS Reading Sentence Completion',
    description:
      'Entrena Sentence Completion en IELTS Reading con foco en paráfrasis, gramática y límites de palabras.',
    path: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar sentence completion para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'sentence completion', 'grammar fit'],
    keywords: [
      'IELTS sentence completion',
      'IELTS reading sentence completion',
      'IELTS sentence completion ejercicios',
      'IELTS reading grammar fit',
    ],
    priority: 0.68,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Sentence Completion en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde completas frases usando información del pasaje. Normalmente debes copiar palabras exactas del texto y respetar un límite como NO MORE THAN TWO WORDS.',
      },
      {
        question: '¿Cómo sé qué palabra falta en Sentence Completion?',
        answer:
          'Primero predice la categoría gramatical: sustantivo, verbo, adjetivo, número o frase corta. Luego busca en el texto una idea equivalente, porque la frase de la pregunta suele estar parafraseada.',
      },
      {
        question: '¿Cuál es la diferencia entre Sentence Completion y Summary Completion?',
        answer:
          'Sentence Completion trabaja con frases individuales; Summary Completion trabaja con un resumen conectado. En ambos casos necesitas evidencia textual, gramática y control del límite de palabras.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'matching-information',
    title: 'IELTS Reading Matching Information',
    description:
      'Método para encontrar información específica en párrafos IELTS sin perder tiempo buscando palabra por palabra.',
    path: '/practica/ielts/reading/tipos-de-preguntas/matching-information',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Resolver matching information en IELTS Reading.',
    teaches: ['IELTS Reading', 'matching information', 'scanning'],
    keywords: [
      'IELTS matching information',
      'IELTS reading paragraph information',
      'IELTS matching information ejercicios',
      'IELTS reading scanning practice',
    ],
    priority: 0.68,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Matching Information en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde debes decidir qué párrafo contiene una información específica. No buscas el tema general del párrafo, sino la ubicación exacta de un detalle, ejemplo, razón o resultado.',
      },
      {
        question: '¿En qué se diferencia Matching Information de Matching Headings?',
        answer:
          'Matching Headings pide la idea principal de cada párrafo. Matching Information pide encontrar dónde aparece una información concreta, aunque esa información sea solo una parte pequeña del párrafo.',
      },
      {
        question: '¿Cómo se practica Matching Information?',
        answer:
          'Subraya nombres, fechas, efectos, razones o verbos clave en el statement. Luego escanea el texto buscando paráfrasis, no solo palabras idénticas.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'matching-features',
    title: 'IELTS Reading Matching Features',
    description:
      'Practica IELTS Matching Features con método para emparejar statements con personas, grupos, periodos o teorías usando evidencia y paráfrasis.',
    path: '/practica/ielts/reading/tipos-de-preguntas/matching-features',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Matching Features en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'matching features', 'people matching', 'scanning', 'paraphrase'],
    keywords: [
      'IELTS matching features',
      'IELTS reading matching features',
      'IELTS people theories matching',
      'matching features IELTS ejercicios',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Matching Features en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde emparejas statements con una lista de features, como personas, grupos, lugares, fechas, teorías o periodos. La respuesta correcta depende de evidencia textual, no de memoria general.',
      },
      {
        question: '¿En qué se diferencia Matching Features de Matching Information?',
        answer:
          'Matching Information pregunta en qué párrafo aparece una información. Matching Features pregunta a qué persona, grupo o categoría corresponde una afirmación específica.',
      },
      {
        question: '¿Cómo se evita caer en distractores en Matching Features?',
        answer:
          'Primero separa los nombres o categorías de la lista. Luego busca en el texto qué verbo, resultado o postura se asocia con cada uno. No elijas una feature solo porque aparece cerca de una palabra del statement.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'matching-sentence-endings',
    title: 'IELTS Reading Matching Sentence Endings',
    description:
      'Practica IELTS Matching Sentence Endings con método para completar inicios de oración usando finales correctos, evidencia textual y gramática.',
    path: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar Matching Sentence Endings en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'matching sentence endings', 'sentence logic', 'paraphrase', 'grammar fit'],
    keywords: [
      'IELTS matching sentence endings',
      'IELTS reading sentence endings',
      'matching sentence endings IELTS ejercicios',
      'IELTS completion practice',
    ],
    priority: 0.69,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Matching Sentence Endings en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde recibes inicios de oración y debes elegir el final correcto de una lista. La respuesta debe coincidir con el significado del texto y encajar gramaticalmente.',
      },
      {
        question: '¿En qué se diferencia de Sentence Completion?',
        answer:
          'Sentence Completion normalmente exige escribir palabras del pasaje respetando un límite. Matching Sentence Endings exige elegir entre finales dados, por eso debes evaluar lógica, gramática y paráfrasis.',
      },
      {
        question: '¿Cómo se eliminan distractores en Matching Sentence Endings?',
        answer:
          'Primero descarta finales que no encajan gramaticalmente con el inicio. Luego compara la relación lógica con el pasaje: causa, contraste, resultado, condición o ejemplo.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'diagram-labeling',
    title: 'IELTS Reading Diagram Labeling',
    description:
      'Practica Diagram Labeling en IELTS Reading con método para ubicar partes, procesos y etiquetas exactas sin romper el límite de palabras.',
    path: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling',
    parentPath: '/practica/ielts/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Aprender diagram labeling en IELTS Reading.',
    teaches: ['IELTS Reading', 'diagram labeling', 'process vocabulary'],
    keywords: [
      'IELTS diagram labeling',
      'IELTS reading diagrams',
      'IELTS diagram labeling ejercicios',
      'IELTS reading process labels',
    ],
    priority: 0.66,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Diagram Labeling en IELTS Reading?',
        answer:
          'Es un tipo de pregunta donde completas etiquetas de un diagrama, proceso, mapa técnico o ilustración usando palabras del pasaje. Evalúa lectura localizada y precisión, no dibujo.',
      },
      {
        question: '¿Cómo encuentro las respuestas en Diagram Labeling?',
        answer:
          'Primero identifica si el diagrama representa un proceso, una estructura o una secuencia. Luego busca en el texto las partes equivalentes y copia solo las palabras permitidas por la instrucción.',
      },
      {
        question: '¿Qué errores son comunes en Diagram Labeling?',
        answer:
          'Copiar demasiadas palabras, ignorar el orden del proceso y elegir una palabra cercana que describe la etapa pero no encaja gramaticalmente en la etiqueta.',
      },
    ],
  },
];

export const IELTS_READING_SKILLS: PracticeRoute[] = [
  {
    exam: 'ielts',
    slug: 'skimming',
    title: 'Skimming en IELTS Reading',
    description:
      'Aprende skimming para IELTS Reading con método de 45 segundos, ejemplo guiado, ejercicio interactivo y enlaces a tipos de pregunta donde esta habilidad sube la precisión.',
    path: '/practica/ielts/reading/habilidades/skimming',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar skimming para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'skimming', 'main idea', 'paragraph mapping', 'time management'],
    keywords: [
      'skimming IELTS reading',
      'IELTS skimming practice',
      'IELTS reading skimming ejercicios',
      'IELTS main idea strategy',
    ],
    priority: 0.72,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Skimming is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Qué es skimming en IELTS Reading?',
        answer:
          'Skimming es leer rápidamente para captar tema, propósito y estructura general del pasaje. No busca responder detalles; crea un mapa para saber dónde volver cuando una pregunta pida evidencia.',
      },
      {
        question: '¿Cuánto tiempo debería dedicar al skimming?',
        answer:
          'Como punto de partida, dedica entre 30 y 60 segundos por pasaje. La meta es orientación: título, primeras oraciones, conectores, palabras repetidas y función de cada párrafo.',
      },
      {
        question: '¿Skimming es un tipo de pregunta oficial del IELTS?',
        answer:
          'No. Skimming no es un tipo de pregunta oficial; es una habilidad de lectura que ayuda especialmente en Matching Headings, resumen, ubicación de información y gestión del tiempo.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'scanning',
    title: 'Scanning en IELTS Reading',
    description:
      'Aprende scanning para IELTS Reading con método para localizar nombres, fechas, cifras, palabras límite y paráfrasis sin leer todo el pasaje de nuevo.',
    path: '/practica/ielts/reading/habilidades/scanning',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar scanning para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'scanning', 'evidence location', 'paraphrase', 'word limits'],
    keywords: [
      'scanning IELTS reading',
      'IELTS scanning practice',
      'IELTS reading scanning ejercicios',
      'IELTS locate information',
    ],
    priority: 0.72,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Scanning is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Qué es scanning en IELTS Reading?',
        answer:
          'Scanning es leer buscando una pieza específica de información: nombre, fecha, cifra, término técnico, sinónimo o frase equivalente. Sirve para localizar evidencia antes de responder.',
      },
      {
        question: '¿En qué se diferencia scanning de skimming?',
        answer:
          'Skimming busca la idea general y la función de cada párrafo. Scanning busca una ubicación exacta dentro del texto para confirmar una respuesta con evidencia.',
      },
      {
        question: '¿Scanning sirve para todos los tipos de pregunta IELTS?',
        answer:
          'No resuelve todo por sí solo, pero ayuda mucho en Matching Information, Sentence Completion, Summary Completion, Diagram Labeling y Short Answer porque esas tareas dependen de localizar evidencia rápido.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'inferencia',
    title: 'Inferencia en IELTS Reading',
    description:
      'Aprende inferencia para IELTS Reading con método de evidencia textual, opciones moderadas, eliminación de extremos y ejercicios explicados.',
    path: '/practica/ielts/reading/habilidades/inferencia',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar inferencias para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'inference', 'textual evidence', 'moderate conclusions', 'logical reading'],
    keywords: [
      'inferencia IELTS reading',
      'IELTS inference practice',
      'IELTS reading inferencia ejercicios',
      'IELTS reading evidence',
    ],
    priority: 0.71,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Inferencia is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Qué es inferir en IELTS Reading?',
        answer:
          'Inferir es llegar a una conclusión razonable a partir de evidencia del texto. La respuesta correcta no necesita copiar una frase literal, pero sí debe poder defenderse con pistas concretas.',
      },
      {
        question: '¿Inferencia es un tipo de pregunta oficial del IELTS?',
        answer:
          'No se trabaja aquí como una categoría oficial separada. Es una habilidad transversal que aparece dentro de preguntas de opinión del autor, ideas implícitas, Matching Headings, Multiple Choice y Yes/No/Not Given.',
      },
      {
        question: '¿Cuál es la trampa principal en inferencia?',
        answer:
          'Elegir una opción demasiado extrema o basada en conocimiento externo. En IELTS, una buena inferencia suele ser moderada y se sostiene con palabras del pasaje.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'parafrasis',
    title: 'Paráfrasis en IELTS Reading',
    description:
      'Aprende paráfrasis para IELTS Reading con ejercicios de equivalencia, cambio de forma, sinónimos, alcance y trampas frecuentes.',
    path: '/practica/ielts/reading/habilidades/parafrasis',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar paráfrasis para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'paraphrase', 'synonyms', 'scope', 'meaning equivalence'],
    keywords: [
      'paráfrasis IELTS reading',
      'IELTS paraphrase practice',
      'IELTS reading synonyms',
      'IELTS reading equivalencia',
    ],
    priority: 0.71,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Paráfrasis is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Qué significa paráfrasis en IELTS Reading?',
        answer:
          'Paráfrasis significa que la pregunta o la opción expresa la misma idea del texto con otras palabras, otra estructura gramatical o un nivel distinto de generalidad sin cambiar el significado.',
      },
      {
        question: '¿Paráfrasis es un tipo de pregunta oficial del IELTS?',
        answer:
          'No. Aquí se trabaja como habilidad transversal de WeLearn. IELTS usa paráfrasis dentro de muchos tipos oficiales, como Multiple Choice, Matching Information, Sentence Completion, Summary Completion y True/False/Not Given.',
      },
      {
        question: '¿Cómo sé si una paráfrasis es correcta?',
        answer:
          'Una paráfrasis correcta conserva causa, tiempo, cantidad, certeza y alcance. Si cambia de some a all, de may a will, o invierte causa y efecto, ya no es equivalente.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'limite-de-palabras',
    title: 'Límite de palabras en IELTS Reading',
    description:
      'Aprende a respetar el límite de palabras en IELTS Reading con ejercicios de completion, respuestas exactas, gramática y trampas comunes.',
    path: '/practica/ielts/reading/habilidades/limite-de-palabras',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar límites de palabras en IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'word limit', 'completion tasks', 'short answer', 'grammar fit'],
    keywords: [
      'limite de palabras IELTS reading',
      'IELTS word limit reading',
      'IELTS no more than two words',
      'IELTS completion answers',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Límite de palabras is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Qué significa NO MORE THAN TWO WORDS en IELTS Reading?',
        answer:
          'Significa que tu respuesta puede tener una o dos palabras, pero no tres. Si escribes tres palabras aunque la idea sea correcta, la respuesta se considera incorrecta.',
      },
      {
        question: '¿Los números cuentan como palabras en IELTS Reading?',
        answer:
          'Los números escritos como cifras normalmente cuentan como un elemento de respuesta. Aun así, debes copiar el formato del texto y respetar exactamente la instrucción de cada tarea.',
      },
      {
        question: '¿Límite de palabras es un tipo oficial de pregunta IELTS?',
        answer:
          'No. Es una habilidad transversal. Aparece dentro de tipos oficiales como Sentence Completion, Summary Completion, Note Completion, Table Completion, Diagram Labeling y Short Answer.',
      },
    ],
  },
  {
    exam: 'ielts',
    slug: 'gestion-del-tiempo',
    title: 'Gestión del tiempo en IELTS Reading',
    description:
      'Aprende a manejar el tiempo en IELTS Reading con decisiones de lectura, priorización de preguntas, saltos inteligentes y revisión final.',
    path: '/practica/ielts/reading/habilidades/gestion-del-tiempo',
    parentPath: '/practica/ielts/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender y practicar gestión del tiempo para IELTS Academic Reading.',
    teaches: ['IELTS Reading', 'time management', 'question triage', 'reading strategy', 'review'],
    keywords: [
      'gestion del tiempo IELTS reading',
      'IELTS reading time management',
      'IELTS reading 60 minutes strategy',
      'IELTS reading como administrar el tiempo',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Gestión del tiempo is a WeLearn reading skill for IELTS preparation, not a separate official IELTS question type.',
    faqs: [
      {
        question: '¿Cuánto tiempo tengo en IELTS Academic Reading?',
        answer:
          'IELTS Academic Reading dura 60 minutos para tres pasajes y 40 preguntas. La estrategia WeLearn reparte tiempo por dificultad, pero siempre debes seguir el formato oficial del examen.',
      },
      {
        question: '¿Gestión del tiempo es un tipo oficial de pregunta IELTS?',
        answer:
          'No. Es una habilidad transversal de preparación. Se aplica a tipos oficiales como Matching Headings, Matching Information, True/False/Not Given, Completion y Multiple Choice.',
      },
      {
        question: '¿Cuándo debo saltar una pregunta en IELTS Reading?',
        answer:
          'Debes saltarla temporalmente cuando ya localizaste la zona del texto pero no puedes decidir en menos de un minuto. Marca la evidencia, avanza y vuelve al final con una decisión más fría.',
      },
    ],
  },
];

export const TOEFL_WRITING_TASKS: PracticeRoute[] = [
  {
    exam: 'toefl',
    slug: 'academic-discussion',
    title: 'TOEFL Writing Academic Discussion',
    description:
      'Aprende a responder Write for an Academic Discussion en TOEFL iBT con estructura, ejemplos, banco de prompts y checklist de respuesta académica.',
    path: '/practica/toefl/writing/academic-discussion',
    parentPath: '/practica/toefl/writing',
    skill: 'writing',
    searchIntent: 'Entender y practicar TOEFL Writing Academic Discussion.',
    teaches: ['TOEFL Writing', 'Academic Discussion', 'opinion académica', 'desarrollo de ideas'],
    keywords: [
      'TOEFL academic discussion',
      'TOEFL writing academic discussion practice',
      'write for an academic discussion TOEFL',
      'TOEFL writing ejercicios',
    ],
    priority: 0.82,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es TOEFL Writing Academic Discussion?',
        answer:
          'Es una tarea de escritura donde respondes a una pregunta de clase, tomas posición y conectas tu idea con la discusión. La respuesta debe sonar académica, clara y desarrollada.',
      },
      {
        question: '¿Cuántas palabras debería escribir?',
        answer:
          'La meta práctica es escribir una respuesta completa y enfocada, normalmente de 100 a 150 palabras, con una postura clara, una razón principal y un ejemplo concreto.',
      },
      {
        question: '¿Debo responder a los estudiantes del prompt?',
        answer:
          'Sí. Puedes estar de acuerdo, discrepar o matizar una idea de otro estudiante, pero tu respuesta debe aportar una razón propia y no limitarse a repetir la discusión.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'write-an-email',
    title: 'TOEFL Writing Write an Email',
    description:
      'Práctica para escribir emails TOEFL claros, adecuados al contexto y gramaticalmente correctos dentro del TOEFL iBT actualizado.',
    path: '/practica/toefl/writing/write-an-email',
    parentPath: '/practica/toefl/writing',
    skill: 'writing',
    searchIntent: 'Practicar Write an Email para TOEFL iBT.',
    teaches: ['TOEFL Writing', 'email writing', 'register', 'clarity'],
    keywords: [
      'TOEFL write an email',
      'TOEFL email writing practice',
      'TOEFL writing email ejercicios',
      'TOEFL iBT email task',
    ],
    priority: 0.78,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Write an Email en TOEFL Writing?',
        answer:
          'Es una tarea de escritura funcional: recibes una situación y debes redactar un email con propósito claro, tono adecuado y suficiente detalle para resolver la necesidad comunicativa.',
      },
      {
        question: '¿Qué tono debo usar en TOEFL Write an Email?',
        answer:
          'Depende del destinatario. Para profesores, administradores o empleadores usa tono formal o semi-formal; para compañeros puedes ser más directo, pero siempre claro y respetuoso.',
      },
      {
        question: '¿Cómo se mejora en emails TOEFL?',
        answer:
          'Practica tres capas: abrir con propósito, responder todos los puntos de la situación y cerrar con una acción concreta como solicitar confirmación, agradecer o proponer una alternativa.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'build-a-sentence',
    title: 'TOEFL Writing Build a Sentence',
    description:
      'Ejercicios para construir oraciones TOEFL con precisión gramatical, orden lógico, conectores y vocabulario académico.',
    path: '/practica/toefl/writing/build-a-sentence',
    parentPath: '/practica/toefl/writing',
    skill: 'writing',
    searchIntent: 'Practicar Build a Sentence para TOEFL iBT.',
    teaches: ['TOEFL Writing', 'sentence building', 'grammar accuracy'],
    keywords: [
      'TOEFL build a sentence',
      'TOEFL sentence writing',
      'TOEFL writing grammar practice',
      'TOEFL sentence building exercises',
    ],
    priority: 0.76,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Build a Sentence en TOEFL Writing?',
        answer:
          'Es práctica de escritura a nivel oración: debes ordenar ideas, usar gramática precisa y construir una frase clara que tenga sentido académico.',
      },
      {
        question: '¿Por qué practicar oraciones si TOEFL también pide respuestas largas?',
        answer:
          'Porque una respuesta larga se cae si sus oraciones son confusas. Sentence building entrena precisión, conectores, subordinación y control gramatical.',
      },
      {
        question: '¿Cómo sé si una oración TOEFL está bien construida?',
        answer:
          'Debe tener sujeto claro, verbo correcto, relación lógica entre ideas y puntuación limpia. Si el conector promete contraste, causa o resultado, la segunda parte debe cumplir esa relación.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'integrated-writing',
    title: 'TOEFL Integrated Writing',
    description:
      'Entrenamiento de síntesis lectura-escucha para TOEFL Integrated Writing, con lectura, notas de clase, estructura, ejercicios y explicación del formato anterior.',
    path: '/practica/toefl/writing/integrated-writing',
    parentPath: '/practica/toefl/writing',
    skill: 'writing',
    searchIntent: 'Entender TOEFL Integrated Writing y practicar síntesis académica.',
    teaches: ['TOEFL Writing', 'integrated writing', 'lecture summary', 'reading listening synthesis'],
    keywords: [
      'TOEFL integrated writing',
      'TOEFL integrated essay',
      'TOEFL writing synthesis',
      'TOEFL integrated writing practice',
      'TOEFL lecture reading writing',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: false,
    note:
      'Este recurso se tratará como formato anterior y entrenamiento de síntesis, no como la estructura principal vigente del TOEFL iBT actualizado.',
    faqs: [
      {
        question: '¿TOEFL Integrated Writing sigue en el TOEFL iBT actual?',
        answer:
          'Este recurso se presenta como formato anterior y como entrenamiento de síntesis académica. Para el TOEFL iBT actualizado, la prioridad de Writing es Academic Discussion.',
      },
      {
        question: '¿Para qué sirve practicar Integrated Writing?',
        answer:
          'Sirve para entrenar una habilidad muy útil: resumir cómo una clase contradice o matiza una lectura. Esa síntesis también ayuda en listening, reading académico y escritura universitaria.',
      },
      {
        question: '¿Cómo se organiza una respuesta Integrated Writing?',
        answer:
          'Primero resume la postura de la lectura, luego explica punto por punto cómo la clase responde a cada idea. No des tu opinión personal; reporta la relación entre ambas fuentes.',
      },
    ],
  },
];

export const TOEFL_READING_TYPES: PracticeRoute[] = [
  {
    exam: 'toefl',
    slug: 'vocabulary',
    title: 'TOEFL Reading Vocabulary in Context',
    description:
      'Practica vocabulario en contexto para TOEFL Reading: significado por pistas, tono y función dentro del pasaje.',
    path: '/practica/toefl/reading/tipos-de-preguntas/vocabulary',
    parentPath: '/practica/toefl/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar preguntas TOEFL Reading de vocabulario en contexto.',
    teaches: ['TOEFL Reading', 'vocabulary in context', 'context clues'],
    keywords: [
      'TOEFL vocabulary in context',
      'TOEFL reading vocabulary',
      'TOEFL vocabulary questions',
      'TOEFL reading vocabulary practice',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Vocabulary in Context en TOEFL Reading?',
        answer:
          'Es un tipo de pregunta donde debes elegir el significado de una palabra según cómo se usa en el pasaje. No basta con conocer una traducción; debes comprobar la función dentro de la frase.',
      },
      {
        question: '¿Cómo se resuelve vocabulario en contexto en TOEFL?',
        answer:
          'Lee la oración completa, identifica pistas de contraste, causa, ejemplo o definición, y sustituye mentalmente cada opción. La respuesta correcta debe conservar el sentido de la frase original.',
      },
      {
        question: '¿Debo memorizar listas de palabras para TOEFL Reading?',
        answer:
          'Ayuda conocer vocabulario académico frecuente, pero TOEFL evalúa contexto. Es mejor combinar listas con ejercicios donde expliques por qué una opción encaja y por qué las otras cambian el sentido.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'inference',
    title: 'TOEFL Reading Inference Questions',
    description:
      'Aprende a responder inferencias TOEFL Reading con evidencia textual, paráfrasis y eliminación de opciones extremas.',
    path: '/practica/toefl/reading/tipos-de-preguntas/inference',
    parentPath: '/practica/toefl/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar inference questions en TOEFL Reading.',
    teaches: ['TOEFL Reading', 'inference questions', 'evidence'],
    keywords: [
      'TOEFL inference questions',
      'TOEFL reading inference',
      'TOEFL inference practice',
      'TOEFL reading evidence questions',
    ],
    priority: 0.72,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué son las inference questions en TOEFL Reading?',
        answer:
          'Son preguntas donde la respuesta no está copiada literalmente, pero sí se puede deducir a partir de evidencia del pasaje. Debes elegir la opción que se desprende del texto sin exagerar.',
      },
      {
        question: '¿Cómo sé si una inferencia TOEFL es válida?',
        answer:
          'Una inferencia válida conecta dos o más pistas del pasaje y no agrega información externa. Si necesitas imaginar datos que el texto no sugiere, la opción probablemente es incorrecta.',
      },
      {
        question: '¿Cuál es la trampa más común en preguntas de inferencia?',
        answer:
          'Las opciones extremas con always, never, only, prove o completely suelen ir más allá de la evidencia. TOEFL prefiere inferencias moderadas y sustentadas.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'factual-information',
    title: 'TOEFL Reading Factual Information Questions',
    description:
      'Practica preguntas TOEFL Reading de información factual: localizar detalles, comprobar evidencia y evitar opciones con palabras del texto pero sentido incorrecto.',
    path: '/practica/toefl/reading/tipos-de-preguntas/factual-information',
    parentPath: '/practica/toefl/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar factual information questions en TOEFL Reading.',
    teaches: ['TOEFL Reading', 'factual information questions', 'detail questions', 'evidence scanning'],
    keywords: [
      'TOEFL factual information questions',
      'TOEFL reading detail questions',
      'TOEFL factual information practice',
      'TOEFL reading evidence practice',
    ],
    priority: 0.74,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué son las Factual Information Questions en TOEFL Reading?',
        answer:
          'Son preguntas que piden identificar un detalle explícito del pasaje. La respuesta correcta está sustentada por una oración o zona concreta del texto, aunque esté parafraseada.',
      },
      {
        question: '¿Cómo se resuelven preguntas de información factual en TOEFL?',
        answer:
          'Lee la pregunta, identifica palabras clave, localiza la zona relevante del pasaje y compara cada opción con la evidencia. No elijas una opción solo porque repite vocabulario del texto.',
      },
      {
        question: '¿Cuál es la trampa más común en Factual Information?',
        answer:
          'TOEFL suele incluir opciones que mezclan una palabra real del pasaje con una relación falsa, una causa invertida o un alcance exagerado.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'rhetorical-purpose',
    title: 'TOEFL Reading Rhetorical Purpose Questions',
    description:
      'Practica preguntas TOEFL Reading de propósito retórico: por qué el autor menciona un ejemplo, contraste, dato o explicación dentro del pasaje.',
    path: '/practica/toefl/reading/tipos-de-preguntas/rhetorical-purpose',
    parentPath: '/practica/toefl/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar rhetorical purpose questions en TOEFL Reading.',
    teaches: ['TOEFL Reading', 'rhetorical purpose', 'author function', 'reading structure'],
    keywords: [
      'TOEFL rhetorical purpose questions',
      'TOEFL reading rhetorical purpose',
      'TOEFL author purpose practice',
      'TOEFL reading function questions',
    ],
    priority: 0.73,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué son las Rhetorical Purpose Questions en TOEFL Reading?',
        answer:
          'Son preguntas que piden explicar por qué el autor incluye una frase, ejemplo, dato o contraste. No preguntan qué dice el texto, sino qué función cumple esa parte.',
      },
      {
        question: '¿Cómo se resuelve una pregunta de propósito retórico?',
        answer:
          'Lee la oración señalada y también la oración anterior y posterior. Pregúntate si la parte introduce una causa, da un ejemplo, refuta una idea, aclara un concepto o apoya una conclusión.',
      },
      {
        question: '¿Cuál es la trampa común en Rhetorical Purpose?',
        answer:
          'Elegir una opción que repite el contenido literal de la frase, pero no explica su función dentro del argumento del párrafo.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'sentence-simplification',
    title: 'TOEFL Reading Sentence Simplification',
    description:
      'Practica Sentence Simplification en TOEFL Reading: elegir la opción que conserva la idea esencial de una oración compleja sin cambiar relaciones lógicas.',
    path: '/practica/toefl/reading/tipos-de-preguntas/sentence-simplification',
    parentPath: '/practica/toefl/reading/tipos-de-preguntas',
    skill: 'reading',
    searchIntent: 'Practicar sentence simplification en TOEFL Reading.',
    teaches: ['TOEFL Reading', 'sentence simplification', 'paraphrase', 'logical relationships'],
    keywords: [
      'TOEFL sentence simplification',
      'TOEFL reading sentence simplification',
      'TOEFL paraphrase questions',
      'TOEFL reading sentence simplification practice',
    ],
    priority: 0.73,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    faqs: [
      {
        question: '¿Qué es Sentence Simplification en TOEFL Reading?',
        answer:
          'Es un tipo de pregunta donde eliges la opción que expresa la idea esencial de una oración compleja. La respuesta debe conservar causa, contraste, condición y alcance.',
      },
      {
        question: '¿Cómo se resuelve Sentence Simplification?',
        answer:
          'Divide la oración original en idea principal, relación lógica y detalles secundarios. Luego elimina opciones que cambian el sujeto, invierten causa-efecto o pierden una condición importante.',
      },
      {
        question: '¿Qué trampa aparece en Sentence Simplification?',
        answer:
          'Una opción puede sonar más simple pero omitir una relación clave. TOEFL no premia la opción más corta, sino la que conserva el significado esencial.',
      },
    ],
  },
];

export const TOEFL_READING_CURRENT_FORMAT: PracticeRoute[] = [
  {
    exam: 'toefl',
    slug: 'formato-2026',
    title: 'TOEFL Reading formato actual',
    description:
      'Guía del formato actual de TOEFL Reading con Complete the Words, Read in Daily Life y Read an Academic Passage, fuente ETS y práctica guiada.',
    path: '/practica/toefl/reading/formato-2026',
    parentPath: '/practica/toefl/reading',
    skill: 'reading',
    searchIntent: 'Entender el formato actual de TOEFL Reading y elegir qué practicar primero.',
    teaches: ['TOEFL Reading', 'Complete the Words', 'Read in Daily Life', 'Read an Academic Passage'],
    keywords: [
      'TOEFL reading 2026',
      'TOEFL reading formato actual',
      'TOEFL complete the words',
      'TOEFL read in daily life',
    ],
    priority: 0.77,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Current TOEFL Reading task-family hub based on the ETS TOEFL iBT Test Content page; older TOEFL Reading question-type pages remain compatible skills.',
    faqs: [
      {
        question: '¿Cuáles son las tareas actuales de TOEFL Reading?',
        answer:
          'La página oficial de ETS lista tres familias de Reading: Complete the Words, Read in Daily Life y Read an Academic Passage. WeLearn las organiza como rutas de práctica actuales.',
      },
      {
        question: '¿Las páginas antiguas de Vocabulary, Inference o Factual Information ya no sirven?',
        answer:
          'Sí sirven como habilidades compatibles. No las tratamos como la estructura principal actual, pero siguen entrenando vocabulario, evidencia, inferencia y propósito dentro de textos TOEFL.',
      },
      {
        question: '¿Cuánto dura TOEFL Reading en el formato actual?',
        answer:
          'ETS indica una base aproximada de 30 minutos para Reading y advierte que, como el test se adapta, el tiempo y número de ítems pueden variar.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'complete-the-words',
    title: 'TOEFL Reading Complete the Words',
    description:
      'Practica Complete the Words para TOEFL Reading con pistas de contexto, elección de palabras, explicación y trampas frecuentes.',
    path: '/practica/toefl/reading/formato-2026/complete-the-words',
    parentPath: '/practica/toefl/reading/formato-2026',
    skill: 'reading',
    searchIntent: 'Practicar Complete the Words para TOEFL Reading actual.',
    teaches: ['TOEFL Reading', 'Complete the Words', 'context clues', 'word choice'],
    keywords: [
      'TOEFL complete the words',
      'TOEFL vocabulary completion',
      'TOEFL reading words',
      'TOEFL complete words practice',
    ],
    priority: 0.74,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Current TOEFL Reading task family listed by ETS; WeLearn practice focuses on context clues and word-form control.',
    faqs: [
      {
        question: '¿Qué es Complete the Words en TOEFL Reading?',
        answer:
          'Es una familia de tarea actual de Reading listada por ETS. En WeLearn la practicamos como selección de palabra por contexto, forma gramatical y coherencia local.',
      },
      {
        question: '¿Cómo se resuelve Complete the Words?',
        answer:
          'Lee la oración completa, identifica qué parte gramatical falta, usa pistas antes y después del espacio, y descarta opciones que encajan como traducción pero rompen la lógica.',
      },
      {
        question: '¿Qué habilidad compatible ayuda más?',
        answer:
          'Vocabulary in Context ayuda mucho, porque ambas prácticas dependen de entender cómo una palabra funciona dentro de una oración específica.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'read-in-daily-life',
    title: 'TOEFL Reading Read in Daily Life',
    description:
      'Practica Read in Daily Life para TOEFL Reading con avisos, emails, instrucciones, horarios y preguntas de propósito, detalle y acción.',
    path: '/practica/toefl/reading/formato-2026/read-in-daily-life',
    parentPath: '/practica/toefl/reading/formato-2026',
    skill: 'reading',
    searchIntent: 'Practicar Read in Daily Life para TOEFL Reading actual.',
    teaches: ['TOEFL Reading', 'Read in Daily Life', 'functional reading', 'daily-life texts'],
    keywords: [
      'TOEFL read in daily life',
      'TOEFL practical reading',
      'TOEFL daily life texts',
      'TOEFL reading notices emails',
    ],
    priority: 0.73,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Current TOEFL Reading task family listed by ETS; WeLearn practice focuses on purpose, action and evidence in everyday texts.',
    faqs: [
      {
        question: '¿Qué es Read in Daily Life en TOEFL Reading?',
        answer:
          'Es una familia de tarea actual de Reading listada por ETS. Evalúa lectura funcional: entender avisos, mensajes, instrucciones o textos cotidianos y decidir qué significan o qué acción piden.',
      },
      {
        question: '¿En qué se diferencia de un pasaje académico?',
        answer:
          'Daily Life suele tener propósito práctico inmediato: confirmar una fecha, seguir una instrucción, entender una política o decidir qué debe hacer alguien.',
      },
      {
        question: '¿Qué habilidad compatible ayuda más?',
        answer:
          'Factual Information y Rhetorical Purpose ayudan porque debes ubicar detalles y reconocer para qué sirve cada frase del texto.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'read-an-academic-passage',
    title: 'TOEFL Reading Read an Academic Passage',
    description:
      'Practica Read an Academic Passage para TOEFL Reading con pasaje académico corto, evidencia, inferencia, propósito y respuestas explicadas.',
    path: '/practica/toefl/reading/formato-2026/read-an-academic-passage',
    parentPath: '/practica/toefl/reading/formato-2026',
    skill: 'reading',
    searchIntent: 'Practicar Read an Academic Passage para TOEFL Reading actual.',
    teaches: ['TOEFL Reading', 'Read an Academic Passage', 'academic reading', 'evidence'],
    keywords: [
      'TOEFL read an academic passage',
      'TOEFL academic reading',
      'TOEFL academic passage practice',
      'TOEFL reading academic passage',
    ],
    priority: 0.74,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'Current TOEFL Reading task family listed by ETS; WeLearn practice connects academic-passage work to evidence, inference and paragraph function.',
    faqs: [
      {
        question: '¿Qué es Read an Academic Passage en TOEFL Reading?',
        answer:
          'Es una familia de tarea actual de Reading listada por ETS. Trabaja lectura de textos académicos: idea principal, detalle, inferencia, función y relaciones lógicas.',
      },
      {
        question: '¿Debo saber del tema antes de leer?',
        answer:
          'No. La estrategia es usar evidencia del pasaje, no conocimiento externo. Si una opción necesita datos que el texto no da, probablemente no es la mejor respuesta.',
      },
      {
        question: '¿Qué habilidad compatible ayuda más?',
        answer:
          'Inference, Factual Information y Rhetorical Purpose son compatibles porque entrenan evidencia, lectura lógica y función de frases dentro de párrafos académicos.',
      },
    ],
  },
];

export const TOEFL_READING_SKILLS: PracticeRoute[] = [
  {
    exam: 'toefl',
    slug: 'habilidades',
    title: 'TOEFL Reading habilidades',
    description:
      'Hub de habilidades WeLearn para TOEFL Reading: relaciones lógicas, organización textual y gestión del tiempo aplicadas al formato actual.',
    path: '/practica/toefl/reading/habilidades',
    parentPath: '/practica/toefl/reading',
    skill: 'reading',
    searchIntent: 'Elegir habilidades de TOEFL Reading para mejorar antes de hacer práctica mixta.',
    teaches: ['TOEFL Reading skills', 'logical relationships', 'text organisation', 'time management'],
    keywords: [
      'TOEFL reading skills',
      'TOEFL reading strategy',
      'TOEFL reading time management',
      'TOEFL logical relationships',
    ],
    priority: 0.7,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'WeLearn strategy hub, not an official ETS task family. It supports current TOEFL Reading tasks such as Read an Academic Passage.',
    faqs: [
      {
        question: '¿Estas habilidades son tareas oficiales de TOEFL Reading?',
        answer:
          'No. Son habilidades WeLearn de entrenamiento. El formato actual de ETS se organiza en familias como Complete the Words, Read in Daily Life y Read an Academic Passage.',
      },
      {
        question: '¿Por qué practicar habilidades si ya existe el formato actual?',
        answer:
          'Porque las tareas oficiales se resuelven mejor cuando puedes reconocer causa, contraste, función de párrafos y prioridades de tiempo sin depender de traducción palabra por palabra.',
      },
      {
        question: '¿Qué habilidad debo practicar primero?',
        answer:
          'Empieza por relaciones lógicas si fallas inferencia o propósito; sigue con organización textual para pasajes académicos y gestión del tiempo cuando ya entiendes pero te demoras.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'logical-relationships',
    title: 'TOEFL Reading Logical Relationships',
    description:
      'Practica relaciones lógicas en TOEFL Reading: causa, contraste, consecuencia y condición con evidencia y respuestas explicadas.',
    path: '/practica/toefl/reading/habilidades/logical-relationships',
    parentPath: '/practica/toefl/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Practicar relaciones lógicas para TOEFL Reading.',
    teaches: ['TOEFL Reading', 'logical relationships', 'cause and effect', 'contrast', 'inference'],
    keywords: [
      'TOEFL logical relationships',
      'TOEFL reading logic',
      'TOEFL inference relationships',
      'TOEFL cause contrast practice',
    ],
    priority: 0.68,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'WeLearn reading strategy skill, not an official standalone ETS Reading task. It supports current academic-passage practice.',
    faqs: [
      {
        question: '¿Qué son las relaciones lógicas en TOEFL Reading?',
        answer:
          'Son conexiones como causa, contraste, consecuencia, ejemplo o condición. Ayudan a responder inferencia, propósito retórico y pasajes académicos.',
      },
      {
        question: '¿Esta es una tarea oficial del TOEFL actual?',
        answer:
          'No. Es una habilidad WeLearn. La usamos para mejorar desempeño en tareas actuales de Reading, especialmente Read an Academic Passage.',
      },
      {
        question: '¿Cómo se practica esta habilidad?',
        answer:
          'Subraya conectores, decide qué relación crean y comprueba si la opción conserva esa relación sin exagerarla.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'text-organisation',
    title: 'TOEFL Reading Text Organisation',
    description:
      'Practica organización textual en TOEFL Reading: función de párrafos, tesis, ejemplos, cambios de enfoque y estructura del argumento.',
    path: '/practica/toefl/reading/habilidades/text-organisation',
    parentPath: '/practica/toefl/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Practicar organización textual para TOEFL Reading.',
    teaches: ['TOEFL Reading', 'text organisation', 'paragraph function', 'academic passage structure'],
    keywords: [
      'TOEFL text organisation',
      'TOEFL reading organization',
      'TOEFL paragraph function',
      'TOEFL academic passage structure',
    ],
    priority: 0.67,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'WeLearn reading strategy skill, not an official standalone ETS Reading task. It supports academic passage structure and rhetorical purpose.',
    faqs: [
      {
        question: '¿Qué significa organización textual en TOEFL Reading?',
        answer:
          'Significa reconocer cómo se construye el pasaje: tesis, explicación, ejemplo, contraste, problema, solución o conclusión.',
      },
      {
        question: '¿Esta habilidad aparece como tarea oficial?',
        answer:
          'No como ruta independiente. Es una estrategia WeLearn para resolver mejor pasajes académicos y preguntas de propósito o función.',
      },
      {
        question: '¿Cómo sé la función de un párrafo?',
        answer:
          'Lee la primera y última oración, identifica conectores y pregunta qué aporta el párrafo al argumento general.',
      },
    ],
  },
  {
    exam: 'toefl',
    slug: 'time-management',
    title: 'TOEFL Reading Time Management',
    description:
      'Practica gestión del tiempo en TOEFL Reading con decisiones de lectura, priorización de evidencia y control de bloqueo.',
    path: '/practica/toefl/reading/habilidades/time-management',
    parentPath: '/practica/toefl/reading/habilidades',
    skill: 'reading',
    searchIntent: 'Aprender gestión del tiempo para TOEFL Reading.',
    teaches: ['TOEFL Reading', 'time management', 'reading pacing', 'question triage'],
    keywords: [
      'TOEFL reading time management',
      'TOEFL reading timing',
      'TOEFL reading pacing',
      'TOEFL reading strategy',
    ],
    priority: 0.67,
    changeFrequency: 'monthly',
    status: 'published',
    currentExam: true,
    note:
      'WeLearn pacing strategy. ETS timing can vary because the current test adapts; this page does not promise an official fixed pacing formula.',
    faqs: [
      {
        question: '¿Cuánto tiempo tengo en TOEFL Reading?',
        answer:
          'ETS indica una base aproximada para Reading, pero también advierte que el test puede variar porque se adapta. Esta página enseña una estrategia flexible, no una promesa oficial.',
      },
      {
        question: '¿Qué hago si una pregunta me bloquea?',
        answer:
          'Marca la evidencia probable, elimina opciones imposibles y avanza si sigues sin una respuesta clara. Volver con contexto fresco suele ser más eficiente.',
      },
      {
        question: '¿La gestión del tiempo reemplaza la comprensión?',
        answer:
          'No. Primero necesitas precisión; después entrenas velocidad con decisiones conscientes sobre qué leer profundo y qué escanear.',
      },
    ],
  },
];

export const TOEFL_READING_SKILL_PRACTICE: ToeflReadingSkillPractice[] = [
  {
    slug: 'logical-relationships',
    title: 'Cause, contrast and consequence',
    directAnswer:
      'Para resolver relaciones lógicas, identifica el conector o la relación implícita y verifica que la opción conserve causa, contraste o consecuencia sin exagerar.',
    whenToUse: [
      'Cuando una pregunta pide inferir por qué ocurrió algo.',
      'Cuando el autor compara dos teorías, resultados o explicaciones.',
      'Cuando una opción parece correcta por vocabulario, pero cambia la dirección lógica.',
    ],
    method: [
      'Localiza conectores como however, therefore, because, although o as a result.',
      'Etiqueta la relación: causa, contraste, consecuencia, condición o ejemplo.',
      'Elimina opciones que invierten la relación o agregan una conclusión absoluta.',
    ],
    textTitle: 'Campus lighting experiment',
    text:
      'A university replaced several bright pathway lights with lower, shielded lamps. Although some students initially worried that the paths would feel less safe, nighttime surveys showed fewer complaints about glare and no increase in reported accidents. As a result, the facilities office expanded the design to two additional walkways.',
    questions: [
      {
        id: 'toefl-logic-01',
        prompt: 'What logical relationship does "Although" create in the passage?',
        options: ['Contrast between a concern and later evidence', 'Cause of a rise in accidents', 'Example of a maintenance problem', 'Condition for closing the paths'],
        answer: 0,
        explanation: 'Although introduces a concern that contrasts with the later survey results.',
        evidence: 'Although some students initially worried... surveys showed fewer complaints...',
        trap: 'The passage says there was no increase in accidents, so accident rise is the opposite of the evidence.',
      },
      {
        id: 'toefl-logic-02',
        prompt: 'Why did the facilities office expand the lighting design?',
        options: ['Because the first results were positive enough to extend the approach', 'Because students refused to use the original walkways', 'Because the lamps made the paths brighter than before', 'Because accidents increased near the library'],
        answer: 0,
        explanation: 'As a result connects the positive survey/safety outcome to the decision to expand.',
        evidence: 'fewer complaints about glare and no increase in reported accidents. As a result...',
        trap: 'The text does not say students refused the paths or that accidents increased.',
      },
    ],
  },
  {
    slug: 'text-organisation',
    title: 'Paragraph function in an academic explanation',
    directAnswer:
      'Para leer organización textual, decide qué hace cada parte del pasaje: presenta una idea, la explica, da evidencia, marca un problema o propone una solución.',
    whenToUse: [
      'Cuando el pasaje académico parece largo pero tiene una estructura clara.',
      'Cuando una pregunta pide propósito retórico o función de una frase.',
      'Cuando necesitas entender la tesis antes de mirar opciones.',
    ],
    method: [
      'Lee la primera oración para encontrar el tema y la dirección.',
      'Busca cambios de función: for example, however, researchers now argue.',
      'Resume cada párrafo en una etiqueta corta antes de responder.',
    ],
    textTitle: 'Why museums rotate exhibits',
    text:
      'Museums rarely display their entire collections at once. The first reason is practical: many objects are sensitive to light, humidity, or repeated handling. A second reason is educational. By rotating exhibits, curators can create new themes that connect familiar objects with different historical questions.',
    questions: [
      {
        id: 'toefl-organisation-01',
        prompt: 'What is the function of the second sentence?',
        options: ['It gives a practical reason for the general claim', 'It rejects the main idea of the passage', 'It introduces a personal opinion from visitors', 'It lists the final conclusion'],
        answer: 0,
        explanation: 'The sentence explains one practical reason museums do not show everything at once.',
        evidence: 'The first reason is practical: many objects are sensitive...',
        trap: 'It supports the claim; it does not reject it or introduce visitor opinions.',
      },
      {
        id: 'toefl-organisation-02',
        prompt: 'How is the passage organized?',
        options: ['General claim followed by two reasons', 'Problem followed by an unrelated story', 'Chronological history of one museum', 'Comparison of two museum buildings'],
        answer: 0,
        explanation: 'The text starts with a broad claim, then gives a practical reason and an educational reason.',
        evidence: 'The first reason... A second reason...',
        trap: 'There is no timeline or comparison between buildings.',
      },
    ],
  },
  {
    slug: 'time-management',
    title: 'Reading decisions under time pressure',
    directAnswer:
      'La gestión del tiempo en TOEFL Reading consiste en decidir cuándo leer profundo, cuándo escanear evidencia y cuándo avanzar para no perder precisión global.',
    whenToUse: [
      'Cuando entiendes el texto pero tardas demasiado.',
      'Cuando una pregunta te consume más tiempo que las demás.',
      'Cuando necesitas equilibrar Complete the Words, Daily Life y Academic Passage.',
    ],
    method: [
      'Primero lee la pregunta para saber qué evidencia buscar.',
      'Escanea nombres, fechas, conectores y palabras repetidas antes de leer todo lento.',
      'Si dos opciones siguen vivas, marca la evidencia y avanza; vuelve al final.',
    ],
    textTitle: 'Course registration reminder',
    text:
      'Students may change their course schedules until Friday at 5 p.m. Requests submitted after that deadline will be reviewed only if they involve graduation requirements. Advisors recommend checking prerequisite rules before replacing any required course.',
    questions: [
      {
        id: 'toefl-time-01',
        prompt: 'Which detail should you scan for first if the question asks about the deadline?',
        options: ['Friday at 5 p.m.', 'Graduation requirements', 'Advisors recommend', 'Prerequisite rules'],
        answer: 0,
        explanation: 'The question target is deadline, so the time expression is the fastest evidence anchor.',
        evidence: 'until Friday at 5 p.m.',
        trap: 'Graduation requirements matter for late requests, but they do not answer the deadline question.',
      },
      {
        id: 'toefl-time-02',
        prompt: 'What is the best time-management move if you cannot decide between two options?',
        options: ['Mark the likely evidence, eliminate impossible choices, and return later', 'Reread the entire text three times immediately', 'Ignore the question permanently', 'Choose the longest option because it contains more words'],
        answer: 0,
        explanation: 'This preserves progress without abandoning accuracy. You return when the surrounding context is clearer.',
        evidence: 'This is a WeLearn pacing strategy for avoiding a time trap.',
        trap: 'Length is not evidence, and rereading everything repeatedly burns time.',
      },
    ],
  },
];

export const TOEFL_READING_MIXED_DRILLS: ToeflReadingMixedDrill[] = [
  {
    id: 'toefl-mixed-logic-academic-01',
    taskFamily: 'Read an Academic Passage',
    skill: 'logical-relationships',
    title: 'Academic Passage + logical relationship',
    text:
      'Marine biologists once assumed that coral recovery depended mostly on water temperature. However, recent field studies suggest that the presence of grazing fish also matters because these fish remove algae that can block young coral from attaching to the reef.',
    prompt: 'Which relationship is most important for answering why grazing fish support coral recovery?',
    options: [
      'Cause and effect: grazing fish remove algae, which helps young coral attach.',
      'Contrast: grazing fish make water temperature less important in every reef.',
      'Chronology: young coral always appears before algae grows.',
      'Definition: grazing fish are another name for young coral.',
    ],
    answer: 0,
    explanation: 'The key relationship is causal. Fish remove algae, and that removal creates better conditions for young coral attachment.',
    evidence: 'because these fish remove algae that can block young coral from attaching',
    trap: 'Option B overstates the contrast. The passage says fish also matter, not that temperature never matters.',
  },
  {
    id: 'toefl-mixed-organisation-academic-02',
    taskFamily: 'Read an Academic Passage',
    skill: 'text-organisation',
    title: 'Academic Passage + paragraph function',
    text:
      'Early maps of the region showed rivers as fixed boundaries. Later surveys complicated that view by showing that seasonal flooding often changed river paths. This evidence forced historians to reinterpret several old land agreements.',
    prompt: 'How is the short passage organized?',
    options: [
      'Original view, new evidence, and consequence for interpretation',
      'Personal story followed by a recommendation',
      'Definition of maps followed by unrelated examples',
      'Problem followed by a list of modern technologies',
    ],
    answer: 0,
    explanation: 'The passage starts with an earlier assumption, introduces later evidence, and ends with the interpretive consequence.',
    evidence: 'Early maps... Later surveys... This evidence forced historians...',
    trap: 'There is no personal story, recommendation, or list of technologies.',
  },
  {
    id: 'toefl-mixed-time-daily-03',
    taskFamily: 'Read in Daily Life',
    skill: 'time-management',
    title: 'Daily Life + fast evidence scan',
    text:
      'Subject: Lab checkout reminder. Students must return borrowed microscopes by Thursday at noon. Equipment returned after noon will be recorded as late unless the instructor approved an extension before Wednesday evening.',
    prompt: 'If the question asks when microscopes must be returned, what should you scan first?',
    options: ['Thursday at noon', 'Wednesday evening', 'approved an extension', 'recorded as late'],
    answer: 0,
    explanation: 'The return deadline is the direct time expression attached to must return borrowed microscopes.',
    evidence: 'must return borrowed microscopes by Thursday at noon',
    trap: 'Wednesday evening is the deadline for requesting an extension, not the normal return deadline.',
  },
  {
    id: 'toefl-mixed-logic-words-04',
    taskFamily: 'Complete the Words',
    skill: 'logical-relationships',
    title: 'Complete the Words + contrast clue',
    text:
      'The first trial produced unclear results; however, the second trial offered _____ evidence that the method worked.',
    prompt: 'Which word best completes the sentence?',
    options: ['convincing', 'temporary', 'unrelated', 'accidental'],
    answer: 0,
    explanation: 'However signals a contrast with unclear results. Convincing evidence fits the positive contrast.',
    evidence: 'unclear results; however, the second trial offered...',
    trap: 'Temporary and unrelated are possible adjectives, but they do not complete the contrast created by however.',
  },
  {
    id: 'toefl-mixed-organisation-daily-05',
    taskFamily: 'Read in Daily Life',
    skill: 'text-organisation',
    title: 'Daily Life + message structure',
    text:
      'Subject: Library room update. The group study rooms on the third floor are closed today for painting. Individual desks on the second floor remain open, and reservations for tomorrow are not affected.',
    prompt: 'What is the structure of the notice?',
    options: [
      'Change today, available alternative, and unaffected future reservations',
      'Complaint, apology, and request for payment',
      'List of books, author biography, and room map',
      'Old policy, historical cause, and scientific evidence',
    ],
    answer: 0,
    explanation: 'The notice gives the immediate change, then an alternative, then clarifies what is not affected.',
    evidence: 'closed today... remain open... reservations for tomorrow are not affected',
    trap: 'The message does not ask for payment or discuss books, authors, or history.',
  },
  {
    id: 'toefl-mixed-time-academic-06',
    taskFamily: 'Read an Academic Passage',
    skill: 'time-management',
    title: 'Academic Passage + when to move on',
    text:
      'A question asks about the purpose of one example in a long paragraph. You found the example, but two options still seem possible after forty seconds.',
    prompt: 'What is the best next move under timed practice?',
    options: [
      'Mark the example and surrounding sentence, choose the stronger option, and return later if time remains.',
      'Reread the entire passage twice before answering.',
      'Ignore the surrounding sentence and choose the option with familiar words.',
      'Skip every remaining academic passage question.',
    ],
    answer: 0,
    explanation: 'This protects time while keeping an evidence trail. Returning later is better than getting stuck without a plan.',
    evidence: 'The target is one example and the surrounding sentence, not the entire passage.',
    trap: 'Familiar words are not evidence, and rereading the full passage repeatedly is a time trap.',
  },
];

export const TOEFL_COMPLETE_WORDS_ITEMS: ToeflCompleteWordsItem[] = [
  {
    id: 'ctw-campus-01',
    sentence: 'The new study room policy was designed to _____ noise during exam week.',
    options: ['reduce', 'replace', 'borrow', 'describe'],
    answer: 0,
    explanation: 'The context is a policy affecting noise. Reduce fits the purpose: make noise lower.',
    trap: 'Replace and borrow are grammatically possible verbs, but they do not match the meaning of noise control.',
  },
  {
    id: 'ctw-campus-02',
    sentence: 'Students must reserve a seat in advance because space is _____.',
    options: ['limited', 'generous', 'optional', 'portable'],
    answer: 0,
    explanation: 'The cause marker because explains why reservations are required: there is not enough space for everyone.',
    trap: 'Generous is the opposite direction; optional describes a rule, not available space.',
  },
  {
    id: 'ctw-campus-03',
    sentence: 'The librarian will _____ the old sign with a clearer digital notice.',
    options: ['avoid', 'delay', 'replace', 'invite'],
    answer: 2,
    explanation: 'Replace matches the structure replace X with Y: old sign with a clearer notice.',
    trap: 'Delay and avoid do not fit with the phrase with a clearer digital notice.',
  },
  {
    id: 'ctw-lab-04',
    sentence: 'The lab assistant asked students to _____ their observations before leaving the room.',
    options: ['record', 'prevent', 'donate', 'expand'],
    answer: 0,
    explanation: 'Observations are information students write down or record during a lab activity.',
    trap: 'Expand can work with an idea, but not naturally with observations before leaving a lab.',
  },
  {
    id: 'ctw-email-05',
    sentence: 'The deadline was _____ by two days after several students reported technical problems.',
    options: ['fragile', 'extended', 'ordinary', 'visible'],
    answer: 1,
    explanation: 'A deadline can be extended, meaning students receive more time.',
    trap: 'Visible and ordinary are adjectives, but they do not express a change in time.',
  },
  {
    id: 'ctw-lecture-06',
    sentence: 'The professor used the diagram to _____ how energy moves through the system.',
    options: ['purchase', 'illustrate', 'interrupt', 'permit'],
    answer: 1,
    explanation: 'A diagram is used to illustrate or show a process visually.',
    trap: 'Permit can be a correct verb in other contexts, but a diagram does not permit movement here.',
  },
  {
    id: 'ctw-notice-07',
    sentence: 'Students who lose their ID cards must request a _____ at the front desk.',
    options: ['replacement', 'comparison', 'prediction', 'preference'],
    answer: 0,
    explanation: 'If an ID card is lost, the needed object is a replacement: a new one that takes its place.',
    trap: 'Comparison and prediction are nouns, but neither names the object a student needs.',
  },
  {
    id: 'ctw-research-08',
    sentence: 'The initial results were promising, but the researchers needed more data to _____ the pattern.',
    options: ['confirm', 'decorate', 'apologize', 'relocate'],
    answer: 0,
    explanation: 'More data can confirm a pattern by showing that it is real and repeatable.',
    trap: 'Relocate means move something to another place, which does not fit with a research pattern.',
  },
  {
    id: 'ctw-campus-09',
    sentence: 'The advisor suggested a lighter course load to _____ students from becoming overwhelmed.',
    options: ['prevent', 'deliver', 'decorate', 'borrow'],
    answer: 0,
    explanation: 'Prevent fits the pattern prevent someone from doing something and matches the goal of avoiding overload.',
    trap: 'Deliver and borrow are action verbs, but neither works with students from becoming overwhelmed.',
  },
  {
    id: 'ctw-lab-10',
    sentence: 'Because the equipment is sensitive, students must handle each sample with _____.',
    options: ['caution', 'distance', 'arrival', 'comparison'],
    answer: 0,
    explanation: 'Sensitive equipment requires caution, meaning careful behavior to avoid damage.',
    trap: 'Distance can be related to safety in other contexts, but the phrase handle with caution is the natural collocation.',
  },
  {
    id: 'ctw-email-11',
    sentence: 'The department will _____ students by email if the workshop location changes.',
    options: ['notify', 'divide', 'purchase', 'estimate'],
    answer: 0,
    explanation: 'Notify means inform someone officially, which fits students by email.',
    trap: 'Estimate can be used with numbers or amounts, not with students by email.',
  },
  {
    id: 'ctw-research-12',
    sentence: 'The survey results were _____ because only twelve students answered the questions.',
    options: ['limited', 'generous', 'portable', 'annual'],
    answer: 0,
    explanation: 'Only twelve responses make the results limited, so the finding should be interpreted carefully.',
    trap: 'Annual relates to time, and generous relates to amount in a positive sense; neither explains the small sample.',
  },
  {
    id: 'ctw-library-13',
    sentence: 'The library added signs to _____ students toward the temporary entrance.',
    options: ['direct', 'delay', 'measure', 'compare'],
    answer: 0,
    explanation: 'Signs can direct people, meaning guide them toward a place.',
    trap: 'Delay students toward an entrance is not a natural or logical phrase.',
  },
  {
    id: 'ctw-lecture-14',
    sentence: 'The speaker gave a brief example to _____ the difference between observation and interpretation.',
    options: ['clarify', 'reserve', 'interrupt', 'predict'],
    answer: 0,
    explanation: 'An example can clarify a difference by making it easier to understand.',
    trap: 'Predict points to the future, but the sentence is about explaining a current distinction.',
  },
  {
    id: 'ctw-campus-15',
    sentence: 'Although the new app is convenient, some students are _____ to share personal information through it.',
    options: ['reluctant', 'visible', 'automatic', 'regional'],
    answer: 0,
    explanation: 'Although creates contrast: the app is convenient, but students hesitate to share personal information.',
    trap: 'Visible and regional are adjectives, but they do not express hesitation after the contrast clue.',
  },
  {
    id: 'ctw-science-16',
    sentence: 'The experiment was repeated several times to make the results more _____.',
    options: ['reliable', 'distant', 'temporary', 'casual'],
    answer: 0,
    explanation: 'Repeating an experiment can make results more reliable by showing they are consistent.',
    trap: 'Temporary is almost the opposite of what repeated trials are meant to establish.',
  },
];

export const TOEFL_DAILY_LIFE_TEXTS: ToeflDailyLifeText[] = [
  {
    id: 'daily-shuttle',
    title: 'Campus shuttle notice',
    text: `Subject: Change to weekend shuttle service

Because of construction near the north entrance, the campus shuttle will not stop outside the library this Saturday. Students going to the science building should use the temporary stop beside the athletic center. The regular library stop will reopen on Monday morning.`,
    questions: [
      {
        id: 'daily-shuttle-01',
        question: 'Why is the shuttle service changing on Saturday?',
        answer: 'Construction near the north entrance affects the regular stop.',
        explanation: 'The first sentence gives the cause: construction near the north entrance.',
        trap: 'The notice does not say the library is closed or that all shuttle service is canceled.',
      },
      {
        id: 'daily-shuttle-02',
        question: 'What should students going to the science building do?',
        answer: 'Use the temporary stop beside the athletic center.',
        explanation: 'The second sentence gives the action for students going to the science building.',
        trap: 'The athletic center is a location marker, not the final destination.',
      },
      {
        id: 'daily-shuttle-03',
        question: 'When will the regular library stop be available again?',
        answer: 'Monday morning.',
        explanation: 'The final sentence says the regular library stop will reopen on Monday morning.',
        trap: 'Saturday is the day of the change, not the day the regular stop returns.',
      },
    ],
  },
  {
    id: 'daily-workshop',
    title: 'Writing center appointment email',
    text: `Subject: Your writing center appointment

Your appointment with the writing center has been moved from Room 214 to the online meeting room listed in your student portal. Please upload your essay draft at least one hour before the session. If the file is not uploaded, the tutor will use the first ten minutes to review it during the appointment.`,
    questions: [
      {
        id: 'daily-workshop-01',
        question: 'What changed about the appointment?',
        answer: 'The location changed from Room 214 to an online meeting room.',
        explanation: 'The first sentence states that the appointment has been moved to the online room in the student portal.',
        trap: 'The email does not say the time changed or that the appointment was canceled.',
      },
      {
        id: 'daily-workshop-02',
        question: 'What should the student do before the session?',
        answer: 'Upload the essay draft at least one hour before the session.',
        explanation: 'The second sentence gives the required action and time limit.',
        trap: 'Opening the portal helps find the room, but the required preparation is uploading the draft.',
      },
      {
        id: 'daily-workshop-03',
        question: 'What happens if the draft is not uploaded?',
        answer: 'The tutor will spend the first ten minutes reviewing it during the appointment.',
        explanation: 'The final sentence explains the consequence of not uploading the file in advance.',
        trap: 'The session is not automatically canceled; part of it is used for review.',
      },
    ],
  },
  {
    id: 'daily-lab-schedule',
    title: 'Chemistry lab schedule update',
    text: `Subject: Change to Thursday chemistry lab

This Thursday's chemistry lab will begin thirty minutes later than usual because the ventilation system is being inspected in the morning. Students should arrive at 10:30 a.m. and bring the printed safety worksheet that was distributed last week. The quiz planned for Thursday will still take place, but it will be shortened to ten minutes.`,
    questions: [
      {
        id: 'daily-lab-schedule-01',
        question: 'Why will the lab start later than usual?',
        answer: 'The ventilation system is being inspected in the morning.',
        explanation: 'The first sentence connects the later start to the ventilation system inspection.',
        trap: 'The quiz is affected in length, but it is not the reason the lab starts later.',
      },
      {
        id: 'daily-lab-schedule-02',
        question: 'What should students bring to the lab?',
        answer: 'The printed safety worksheet distributed last week.',
        explanation: 'The second sentence gives the required item students should bring.',
        trap: 'The notice does not ask students to bring a new worksheet or submit it online.',
      },
      {
        id: 'daily-lab-schedule-03',
        question: 'What will happen to the quiz?',
        answer: 'It will still happen, but it will be shortened to ten minutes.',
        explanation: 'The final sentence says the quiz will still take place and gives the new length.',
        trap: 'Shortened does not mean canceled; TOEFL daily-life questions often test that distinction.',
      },
    ],
  },
  {
    id: 'daily-housing-water',
    title: 'Housing office maintenance message',
    text: `Subject: Water service interruption in Hall B

Water service in Hall B will be unavailable from 8:00 a.m. to 11:00 a.m. on Tuesday while maintenance staff repair a pipe near the laundry room. Residents should fill water bottles before 8:00 a.m. if they need water during that period. Showers in Hall C will remain open, and residents may use them by showing their student ID at the front desk.`,
    questions: [
      {
        id: 'daily-housing-water-01',
        question: 'How long will water service be unavailable in Hall B?',
        answer: 'From 8:00 a.m. to 11:00 a.m. on Tuesday.',
        explanation: 'The first sentence gives both the time window and the day of the interruption.',
        trap: 'Hall C is mentioned as an alternative, not as the building with the interruption.',
      },
      {
        id: 'daily-housing-water-02',
        question: 'What are residents advised to do before 8:00 a.m.?',
        answer: 'Fill water bottles if they need water during the interruption.',
        explanation: 'The second sentence gives the preparation residents should complete before the service stops.',
        trap: 'The notice does not say residents must leave the building before 8:00 a.m.',
      },
      {
        id: 'daily-housing-water-03',
        question: 'How can Hall B residents use the showers in Hall C?',
        answer: 'They can show their student ID at the front desk.',
        explanation: 'The final sentence gives the condition for using the Hall C showers.',
        trap: 'The student ID is needed for access to Hall C showers, not to repair the pipe.',
      },
    ],
  },
];

export const TOEFL_ACADEMIC_PASSAGES: ToeflAcademicPassage[] = [
  {
    id: 'academic-wetlands',
    title: 'Wetlands and coastal protection',
    paragraphs: [
      'Wetlands are often described as natural buffers because they slow the movement of water between land and sea. During storms, marsh plants and shallow pools absorb part of the wave energy that would otherwise strike roads, farms, or neighborhoods directly. This protection is not absolute, but it can reduce damage when wetlands remain wide enough and healthy enough to function as a living barrier.',
      'For many years, some coastal communities drained wetlands to create space for buildings or agriculture. The short-term benefit was clear: more usable land. Over time, however, those communities sometimes discovered that the removed wetlands had been providing a service that was expensive to replace. Artificial walls can protect a narrow area, but they may also redirect water pressure to nearby places.',
      'Researchers now argue that coastal planning should combine engineered structures with restored wetlands. This mixed approach recognizes that natural systems and human-made defenses can support each other. A restored marsh may not stop every flood, but it can lower the force that reaches a wall, making the wall more effective and less costly to maintain.',
    ],
    questions: [
      {
        id: 'academic-wetlands-01',
        type: 'Main idea',
        prompt: 'What is the main idea of the passage?',
        options: [
          'Wetlands can help protect coastal areas and should be included in planning.',
          'Artificial walls are always more effective than natural barriers.',
          'Coastal communities should avoid all construction near water.',
          'Researchers disagree about whether wetlands absorb wave energy.',
        ],
        answer: 0,
        explanation: 'All three paragraphs build toward the idea that wetlands provide protection and work best when included in coastal planning.',
        trap: 'Option B is too absolute and contradicts the final paragraph. Option D invents disagreement that the passage does not mention.',
      },
      {
        id: 'academic-wetlands-02',
        type: 'Inference',
        prompt: 'What can be inferred about communities that drained wetlands?',
        options: [
          'They may have underestimated a service the wetlands were already providing.',
          'They were unable to build artificial walls after draining land.',
          'They drained wetlands mainly to improve water quality.',
          'They knew the long-term costs before making the change.',
        ],
        answer: 0,
        explanation: 'The second paragraph says the short-term benefit was clear, but communities later discovered the wetlands had been providing an expensive-to-replace service.',
        trap: 'The passage does not say they could not build walls, and it does not present water quality as the reason for draining.',
      },
      {
        id: 'academic-wetlands-03',
        type: 'Rhetorical purpose',
        prompt: 'Why does the author mention artificial walls in the second and third paragraphs?',
        options: [
          'To compare a human-made defense with the protective role of wetlands.',
          'To argue that walls should be removed from all coastal areas.',
          'To show that walls are useful only for agriculture.',
          'To introduce an unrelated example of urban design.',
        ],
        answer: 0,
        explanation: 'The wall example helps explain why a combined strategy can be stronger than relying on only one type of defense.',
        trap: 'TOEFL often uses extreme distractors. The passage supports mixed planning, not removing all walls.',
      },
    ],
  },
  {
    id: 'academic-seed-banks',
    title: 'Seed banks and genetic diversity',
    paragraphs: [
      'Seed banks store seeds from many plant varieties in carefully controlled conditions. Their purpose is not simply to preserve rare plants as museum objects. By keeping genetic material available, seed banks give researchers and farmers a way to respond when disease, drought, or changing climate conditions threaten existing crops.',
      'Genetic diversity matters because plants of the same crop can differ in useful traits. One variety of rice may tolerate flooding, while another may resist a particular insect. If agriculture depends on only a narrow set of varieties, a single disease can cause widespread damage. A broader genetic collection increases the chance that at least some plants will survive a new threat.',
      'However, storing seeds is only part of the work. Seeds must be tested, replaced, and documented so that scientists know which traits they carry. Without accurate records, a seed bank may contain valuable material that cannot be used efficiently. For this reason, modern seed banks combine biological preservation with detailed information management.',
    ],
    questions: [
      {
        id: 'academic-seed-banks-01',
        type: 'Factual information',
        prompt: 'According to the passage, why is genetic diversity useful for crops?',
        options: [
          'It increases the chance that some plants can survive new threats.',
          'It allows farmers to stop documenting plant traits.',
          'It guarantees that every crop will grow faster.',
          'It removes the need to store seeds in controlled conditions.',
        ],
        answer: 0,
        explanation: 'The second paragraph says a broader genetic collection improves the chance that some plants survive disease or environmental threats.',
        trap: 'The passage supports careful documentation and controlled storage; it does not remove those needs.',
      },
      {
        id: 'academic-seed-banks-02',
        type: 'Vocabulary in context',
        prompt: 'In the first paragraph, the word "threaten" is closest in meaning to:',
        options: ['endanger', 'describe', 'measure', 'organize'],
        answer: 0,
        explanation: 'Disease, drought, and climate conditions can endanger crops. That is the meaning of threaten in this context.',
        trap: 'Measure and organize may appear in scientific contexts, but they do not fit the risk relationship in the sentence.',
      },
      {
        id: 'academic-seed-banks-03',
        type: 'Rhetorical purpose',
        prompt: 'Why does the author mention rice varieties in the second paragraph?',
        options: [
          'To give an example of how varieties within one crop can have different useful traits.',
          'To argue that rice is the only crop stored in seed banks.',
          'To show that flooding is more dangerous than insects.',
          'To explain why controlled storage damages seeds.',
        ],
        answer: 0,
        explanation: 'The rice example illustrates the broader point that diversity inside one crop can provide different survival advantages.',
        trap: 'The passage does not compare flooding and insects by severity, and it does not limit seed banks to rice.',
      },
    ],
  },
  {
    id: 'academic-urban-heat',
    title: 'Urban heat and reflective surfaces',
    paragraphs: [
      'Cities are often warmer than nearby rural areas because dark roofs, roads, and walls absorb sunlight during the day and release heat slowly after sunset. This pattern, known as the urban heat effect, can increase energy use when residents depend more heavily on air conditioning. It can also make outdoor spaces uncomfortable for pedestrians during periods of extreme heat.',
      'One proposed response is to use reflective materials on roofs and pavements. These surfaces send more sunlight back into the atmosphere instead of storing it as heat. In several pilot projects, reflective roofs have lowered indoor temperatures and reduced cooling costs. However, the benefits depend on local design. A surface that reflects light into nearby windows, for example, may create glare or raise temperatures inside adjacent buildings.',
      'For this reason, urban planners increasingly treat reflective materials as one tool rather than a complete solution. Trees, shade structures, ventilation corridors, and lighter surfaces can work together when they are placed according to how people actually move through the city. The strongest plans are not the ones that use a single technology everywhere, but the ones that match heat-reduction strategies to local streets, buildings, and daily routines.',
    ],
    questions: [
      {
        id: 'academic-urban-heat-01',
        type: 'Factual information',
        prompt: 'According to the passage, why can cities stay warm after sunset?',
        options: [
          'Dark surfaces release stored heat slowly.',
          'Rural areas send heat into cities at night.',
          'Reflective roofs prevent all nighttime cooling.',
          'Pedestrians produce enough heat to warm streets.',
        ],
        answer: 0,
        explanation: 'The first paragraph says dark roofs, roads, and walls absorb sunlight during the day and release heat slowly after sunset.',
        trap: 'The passage compares cities with rural areas, but it does not say rural areas transfer heat into cities.',
      },
      {
        id: 'academic-urban-heat-02',
        type: 'Rhetorical purpose',
        prompt: 'Why does the author mention glare from reflective surfaces?',
        options: [
          'To show that reflective materials can create problems if they are not planned carefully.',
          'To prove that reflective roofs should never be used in cities.',
          'To explain why dark surfaces are safer for pedestrians.',
          'To introduce a new argument about rural building design.',
        ],
        answer: 0,
        explanation: 'The glare example qualifies the benefit of reflective materials and supports the idea that local design matters.',
        trap: 'The author does not reject reflective roofs; the final paragraph treats them as one useful tool among several.',
      },
      {
        id: 'academic-urban-heat-03',
        type: 'Inference',
        prompt: 'What can be inferred about effective heat-reduction plans?',
        options: [
          'They should combine strategies based on local conditions.',
          'They should use reflective materials on every surface.',
          'They should focus only on indoor cooling costs.',
          'They should avoid trees because shade blocks ventilation.',
        ],
        answer: 0,
        explanation: 'The final paragraph says the strongest plans match several strategies to local streets, buildings, and daily routines.',
        trap: 'Option B is too absolute. The passage warns against using one technology everywhere.',
      },
    ],
  },
];

export const EXAM_PRACTICE_ROUTES = [
  ...IELTS_READING_TYPES,
  ...IELTS_READING_SKILLS,
  ...TOEFL_WRITING_TASKS,
  ...TOEFL_READING_TYPES,
  ...TOEFL_READING_CURRENT_FORMAT,
  ...TOEFL_READING_SKILLS,
];

export const IELTS_TFNG_PASSAGE = `For many years, urban planners treated city trees mainly as decoration. Recent research has changed that view. Trees can lower surface temperatures by providing shade and by releasing moisture through transpiration. In dense neighborhoods, this cooling effect can reduce the need for air conditioning during hot months.

However, the benefits are not distributed equally. Wealthier districts often have wider streets, private gardens and long-established parks, while lower-income areas may have fewer trees and more exposed concrete. Some cities now use satellite imagery to identify neighborhoods with the highest heat risk and the lowest tree coverage.

Planting trees is not a quick fix. Young trees need years of care before they provide significant shade, and the wrong species can damage sidewalks or require too much water. Successful urban forestry programs usually combine tree planting with maintenance budgets, community participation and careful species selection.`;

export const IELTS_SKIMMING_PRACTICE: SkimmingPracticeSet = {
  id: 'skimming-urban-trees',
  title: 'Urban trees and public health',
  instructions:
    'Read quickly. Do not translate every sentence. Build a rough map: topic, shift, problem, solution.',
  timeTarget: '45 seconds',
  passageTitle: 'Urban trees and public health',
  passage: `For many years, urban planners treated city trees mainly as decoration. Recent research has changed that view. Trees can lower surface temperatures by providing shade and by releasing moisture through transpiration. In dense neighborhoods, this cooling effect can reduce the need for air conditioning during hot months.

However, the benefits are not distributed equally. Wealthier districts often have wider streets, private gardens and long-established parks, while lower-income areas may have fewer trees and more exposed concrete. Some cities now use satellite imagery to identify neighborhoods with the highest heat risk and the lowest tree coverage.

Planting trees is not a quick fix. Young trees need years of care before they provide significant shade, and the wrong species can damage sidewalks or require too much water. Successful urban forestry programs usually combine tree planting with maintenance budgets, community participation and careful species selection.`,
  summaryQuestion: {
    question: 'Which statement best summarises the passage?',
    options: [
      'City trees are useful only because they make streets more attractive.',
      'Urban trees can support public health, but their benefits depend on fair distribution and long-term planning.',
      'Satellite imagery has solved the problem of heat in lower-income neighborhoods.',
      'Young trees provide immediate shade when cities choose the correct species.',
    ],
    answer: 1,
    explanation:
      'The whole passage moves from benefits, to unequal distribution, to the need for long-term planning. Option B captures the complete structure without exaggerating.',
    traps: [
      'Option A repeats the old decoration view but ignores the research shift.',
      'Option C mentions a real tool but turns it into a complete solution.',
      'Option D contradicts the final paragraph, which says young trees need years of care.',
    ],
  },
  paragraphMap: [
    {
      id: 'skimming-map-01',
      label: 'Paragraph 1',
      text:
        'For many years, urban planners treated city trees mainly as decoration. Recent research has changed that view...',
      options: ['old view changes', 'funding dispute', 'species list', 'public complaints'],
      answer: 0,
      explanation:
        'The paragraph begins with an old view and immediately signals a change: trees are now connected to cooling and health.',
    },
    {
      id: 'skimming-map-02',
      label: 'Paragraph 2',
      text:
        'However, the benefits are not distributed equally. Wealthier districts often have wider streets...',
      options: ['new technology only', 'unequal benefits', 'tree biology', 'air conditioning'],
      answer: 1,
      explanation:
        'The first sentence gives the function: the paragraph is about unequal distribution of benefits.',
    },
    {
      id: 'skimming-map-03',
      label: 'Paragraph 3',
      text:
        'Planting trees is not a quick fix. Young trees need years of care before they provide significant shade...',
      options: ['quick solution', 'tourism benefits', 'long-term planning', 'history of parks'],
      answer: 2,
      explanation:
        'The paragraph warns that tree planting needs time, maintenance, participation and careful species selection.',
    },
  ],
};

export const IELTS_SCANNING_PRACTICE: ScanningPracticeSet = {
  id: 'scanning-river-restoration',
  title: 'River restoration in old industrial districts',
  instructions:
    'Scan for a specific signal first: name, year, number, cause, location or paraphrase. Then read only the surrounding sentence.',
  timeTarget: '6 targets · 5 minutes',
  passageTitle: 'River restoration in old industrial districts',
  passage: `In the late twentieth century, many industrial rivers were treated as drainage channels rather than living systems. The Westbrook River, for example, carried waste from textile workshops until new water rules were introduced in 1984. Although factories had closed by the 1990s, the riverbanks remained covered with concrete walls that made the area hot, noisy and difficult to access.

In 2012, the city began a restoration project led by engineer Maya Chen and a small team of ecologists. Their first step was not planting trees, but removing sections of concrete so that the river could overflow safely during heavy rain. A 1.8-kilometre walking path was added later, after soil tests showed that most pollutants were concentrated near two former dye-storage buildings.

The project did not satisfy everyone. Some business owners worried that construction would reduce foot traffic, while residents were concerned about mosquitoes. The design team responded by creating shallow wetland shelves that supported fish and dragonflies, both of which help control mosquito larvae. Within three years, summer surface temperatures near the restored banks had fallen by up to 4 degrees Celsius.

Today, the Westbrook River is used in school science lessons and weekend walking tours. However, city planners warn that restoration is not a one-time event. Sediment must be tested every spring, invasive plants need regular removal, and flood gates upstream still require inspection before the rainy season.`,
  targets: [
    {
      id: 'scan-river-01',
      question: 'What year introduced new water rules for the Westbrook River?',
      scanFor: 'year + water rules',
      answer: '1984',
      evidence: 'new water rules were introduced in 1984',
      explanation:
        'The target asks for a year. Scanning for "water rules" or a four-digit number leads directly to 1984.',
      trap:
        '1990s is nearby, but it refers to factory closure, not the introduction of water rules.',
    },
    {
      id: 'scan-river-02',
      question: 'Who led the restoration project?',
      scanFor: 'person name + led',
      answer: 'Maya Chen',
      evidence: 'a restoration project led by engineer Maya Chen',
      explanation:
        'The word "led" appears in the passage, and the name immediately after it is the answer.',
      trap:
        'Ecologists were part of the team, but the named leader is Maya Chen.',
    },
    {
      id: 'scan-river-03',
      question: 'How long was the walking path?',
      scanFor: 'number + walking path',
      answer: '1.8 kilometres',
      evidence: 'A 1.8-kilometre walking path was added later',
      explanation:
        'The target asks for length. Scan for a decimal number or "walking path"; the answer is in the same phrase.',
      trap:
        'Three years and 4 degrees are also numbers, but they answer time and temperature, not path length.',
    },
    {
      id: 'scan-river-04',
      question: 'Where were most pollutants concentrated?',
      scanFor: 'pollutants + location',
      answer: 'near two former dye-storage buildings',
      evidence: 'most pollutants were concentrated near two former dye-storage buildings',
      explanation:
        'The question asks for a location. The phrase after "concentrated" gives the precise place.',
      trap:
        'Concrete walls are part of the old riverbank problem, but not the location of most pollutants.',
    },
    {
      id: 'scan-river-05',
      question: 'Which animals helped control mosquito larvae?',
      scanFor: 'mosquito larvae + animals',
      answer: 'fish and dragonflies',
      evidence: 'fish and dragonflies, both of which help control mosquito larvae',
      explanation:
        'The answer appears before the relative clause "both of which". Scan for "mosquito larvae" and read backward.',
      trap:
        'Residents worried about mosquitoes; they did not control larvae.',
    },
    {
      id: 'scan-river-06',
      question: 'How often must sediment be tested?',
      scanFor: 'sediment + frequency',
      answer: 'every spring',
      evidence: 'Sediment must be tested every spring',
      explanation:
        'The frequency is immediately after the passive verb phrase "must be tested".',
      trap:
        'Before the rainy season refers to flood gate inspection, not sediment testing.',
    },
  ],
};

export const IELTS_READING_MIXED_QUESTION_TYPE_SETS: IeltsReadingMixedQuestionTypeSet[] = [
  {
    id: 'ielts-mixed-campus-water',
    title: 'Set mixto 1: elegir el formato antes de resolver',
    instructions:
      'Lee el pasaje corto y decide qué tipo oficial de IELTS Reading se está entrenando. Después responde usando evidencia textual.',
    timeTarget: '4 preguntas · 7 minutos',
    passageTitle: 'Campus water stations',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'problema y respuesta inicial',
        text:
          'A university in southern England installed refillable water stations after a waste audit showed that students bought more than 18,000 single-use bottles in one month. The first stations were placed near the library and sports centre because those buildings had the highest foot traffic.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'resultado desigual',
        text:
          'The project reduced bottle sales in the sports centre cafe, but the effect in the library was smaller than expected. Interviews suggested that students often arrived at the library with drinks already purchased from shops outside the campus.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'cambio de estrategia',
        text:
          'In the second term, the sustainability team added signs showing the nearest refill point and asked lecturers to mention the scheme during orientation. They also delayed plans for new stations in lecture halls until usage data from the first two sites could be reviewed.',
      },
    ],
    tasks: [
      {
        id: 'ielts-mixed-campus-water-01',
        questionType: 'Short-answer questions',
        route: '/practica/ielts/reading/tipos-de-preguntas/short-answer',
        prompt: 'Which two buildings received the first water stations?',
        question: 'Este prompt pide una respuesta breve tomada del texto. ¿Cuál es la respuesta correcta?',
        options: ['the library and sports centre', 'lecture halls and shops', 'the cafe and orientation rooms'],
        answer: 0,
        evidence: 'near the library and sports centre',
        explanation:
          'El prompt pregunta por lugares específicos. En Short Answer debes copiar la frase exacta o una versión gramaticalmente válida del texto.',
        trap:
          'Lecture halls aparecen después, pero como planes retrasados; no recibieron las primeras estaciones.',
        linkedSkill: 'scanning',
      },
      {
        id: 'ielts-mixed-campus-water-02',
        questionType: 'True/False/Not Given',
        route: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given',
        prompt: 'Bottle sales fell equally in the sports centre cafe and the library.',
        question: '¿Qué tipo de pregunta exige decidir si una afirmación factual coincide con el texto?',
        options: ['True/False/Not Given', 'Yes/No/Not Given', 'Matching Headings'],
        answer: 0,
        evidence: 'reduced bottle sales in the sports centre cafe, but the effect in the library was smaller',
        explanation:
          'Es una afirmación factual. La respuesta sería FALSE porque el texto dice que el efecto fue desigual.',
        trap:
          'No es Yes/No/Not Given porque no evalúa una opinión del autor, sino un hecho del pasaje.',
        linkedSkill: 'alcance y evidencia',
      },
      {
        id: 'ielts-mixed-campus-water-03',
        questionType: 'Matching Information',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-information',
        prompt: 'Which paragraph mentions postponing an expansion of the project?',
        question: '¿Qué formato oficial pide ubicar información específica en un párrafo?',
        options: ['Matching Information', 'Matching Features', 'Summary Completion'],
        answer: 0,
        evidence: 'They also delayed plans for new stations in lecture halls',
        explanation:
          'La tarea pide encontrar en qué párrafo aparece una información concreta. Eso es Matching Information.',
        trap:
          'Matching Features empareja personas/categorías con afirmaciones; aquí solo se busca un párrafo.',
        linkedSkill: 'scanning',
      },
      {
        id: 'ielts-mixed-campus-water-04',
        questionType: 'Summary Completion',
        route: '/practica/ielts/reading/tipos-de-preguntas/summary-completion',
        prompt: 'The university used ___ from the first two sites before expanding.',
        question: '¿Qué opción completa mejor el resumen con una palabra del texto?',
        options: ['usage data', 'waste audit', 'foot traffic'],
        answer: 0,
        evidence: 'usage data from the first two sites could be reviewed',
        explanation:
          'La frase del resumen parafrasea “before expanding” como “before new stations”. La palabra necesaria es usage data.',
        trap:
          'Waste audit y foot traffic son reales, pero pertenecen a la decisión inicial, no al paso antes de expandir.',
        linkedSkill: 'paráfrasis + límite de palabras',
      },
    ],
  },
  {
    id: 'ielts-mixed-museum-audio',
    title: 'Set mixto 2: separar detalle, opinión y matching',
    instructions:
      'Identifica el formato oficial y evita responder por palabra repetida. Cada pregunta mezcla una señal real con un distractor plausible.',
    timeTarget: '4 preguntas · 8 minutos',
    passageTitle: 'Audio guides in small museums',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'contexto del cambio',
        text:
          'Small museums often struggle to provide guided tours throughout the day. To solve this problem, the Harford Museum tested audio guides that visitors could borrow at the entrance. The devices included short recordings by curators, local historians and volunteers.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'postura evaluativa',
        text:
          'Some staff feared that audio guides would make the museum feel less personal. The director disagreed. She argued that recorded voices could make the visit more personal if they included stories from people connected to the exhibits rather than a single formal narration.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'evidencia y límite',
        text:
          'Visitor surveys were encouraging: families spent longer in the textile room and international visitors said the slower recordings helped them understand technical vocabulary. However, the devices were less useful in crowded rooms because background noise made the instructions difficult to hear.',
      },
    ],
    tasks: [
      {
        id: 'ielts-mixed-museum-audio-01',
        questionType: 'Yes/No/Not Given',
        route: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given',
        prompt: 'The museum director believes audio guides can make visits feel more personal.',
        question: '¿Qué tipo de pregunta corresponde cuando la afirmación evalúa la postura de una persona/autora?',
        options: ['Yes/No/Not Given', 'True/False/Not Given', 'Table Completion'],
        answer: 0,
        evidence: 'The director disagreed. She argued that recorded voices could make the visit more personal',
        explanation:
          'La afirmación se relaciona con la opinión de la directora. Por eso el formato es Yes/No/Not Given; la respuesta sería YES.',
        trap:
          'True/False/Not Given se usa para hechos; aquí el núcleo es una postura explícita.',
        linkedSkill: 'identificar postura',
      },
      {
        id: 'ielts-mixed-museum-audio-02',
        questionType: 'Matching Features',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-features',
        prompt: 'Match each group with the benefit mentioned: families, international visitors, staff.',
        question: '¿Qué formato oficial empareja grupos/personas con información del texto?',
        options: ['Matching Features', 'Matching Sentence Endings', 'Multiple Choice'],
        answer: 0,
        evidence: 'families spent longer... international visitors said...',
        explanation:
          'El prompt pide conectar grupos con beneficios o preocupaciones. Ese patrón corresponde a Matching Features.',
        trap:
          'Matching Sentence Endings completa inicios de oración; aquí las categorías son grupos de personas.',
        linkedSkill: 'scanning por nombres/categorías',
      },
      {
        id: 'ielts-mixed-museum-audio-03',
        questionType: 'Multiple Choice',
        route: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
        prompt: 'Why were the devices less useful in crowded rooms?',
        question: 'Elige la opción correcta según el texto.',
        options: [
          'Background noise made the instructions hard to hear.',
          'Visitors refused to borrow the devices at the entrance.',
          'The recordings were too fast for international visitors.',
        ],
        answer: 0,
        evidence: 'background noise made the instructions difficult to hear',
        explanation:
          'Es una pregunta de detalle con tres opciones. La respuesta correcta conserva la causa exacta.',
        trap:
          'La velocidad lenta ayudó a visitantes internacionales; no fue el problema.',
        linkedSkill: 'evidencia directa',
      },
      {
        id: 'ielts-mixed-museum-audio-04',
        questionType: 'Matching Headings',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
        prompt: 'Choose the best heading for Paragraph B.',
        question: '¿Cuál sería el mejor heading para el párrafo B?',
        options: ['A concern and a different view', 'The cost of museum devices', 'Survey results from visitors'],
        answer: 0,
        evidence: 'Some staff feared... The director disagreed',
        explanation:
          'El párrafo B se organiza alrededor de una preocupación y la respuesta/opinión contraria de la directora.',
        trap:
          'Survey results aparecen en el párrafo C; no resumen el párrafo B.',
        linkedSkill: 'skimming',
      },
    ],
  },
  {
    id: 'ielts-mixed-urban-farming',
    title: 'Set mixto 3: completion, diagramas y finales de oración',
    instructions:
      'Entrena formatos que suelen parecer iguales porque todos exigen completar algo. Decide el formato antes de mirar la respuesta.',
    timeTarget: '4 preguntas · 8 minutos',
    passageTitle: 'Rooftop gardens and food projects',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'descripción del sistema',
        text:
          'Rooftop food projects convert unused building space into small growing areas. Lightweight containers are placed above waterproof membranes, and sensors monitor soil moisture so that volunteers know when irrigation is needed.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'beneficios y restricción',
        text:
          'The gardens rarely produce enough vegetables to supply an entire neighbourhood. Their main value is educational: residents learn about seasonal food, composting and water use. Engineers warn, however, that older roofs must be inspected before containers are installed.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'secuencia de trabajo',
        text:
          'A typical project begins with a structural survey, followed by membrane repairs if leaks are found. After containers are arranged, volunteers add compost and seedlings. The final stage is a maintenance rota, which prevents irrigation and harvesting from depending on one enthusiastic person.',
      },
    ],
    tasks: [
      {
        id: 'ielts-mixed-urban-farming-01',
        questionType: 'Diagram Label Completion',
        route: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling',
        prompt: 'Label the rooftop system: waterproof membranes, containers, sensors.',
        question: '¿Qué formato oficial usa etiquetas para partes de un sistema o diagrama?',
        options: ['Diagram Label Completion', 'Table Completion', 'Short-answer questions'],
        answer: 0,
        evidence: 'containers are placed above waterproof membranes, and sensors monitor soil moisture',
        explanation:
          'El prompt pide nombrar partes visibles o funcionales de un sistema. Eso corresponde a Diagram Label Completion.',
        trap:
          'Table Completion organiza datos en filas/columnas; aquí se etiquetan partes de un sistema.',
        linkedSkill: 'scanning por partes',
      },
      {
        id: 'ielts-mixed-urban-farming-02',
        questionType: 'Sentence Completion',
        route: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion',
        prompt: 'The main value of rooftop gardens is ___.',
        question: '¿Qué opción completa la oración con evidencia directa?',
        options: ['educational', 'commercial', 'structural'],
        answer: 0,
        evidence: 'Their main value is educational',
        explanation:
          'Sentence Completion exige que la frase final sea gramatical y conserve el significado del texto.',
        trap:
          'Structural aparece por la inspección de techos, pero no describe el valor principal de los jardines.',
        linkedSkill: 'límite de palabras',
      },
      {
        id: 'ielts-mixed-urban-farming-03',
        questionType: 'Flow-chart Completion',
        route: '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion',
        prompt: 'Structural survey → membrane repairs → arrange containers → add compost and seedlings → maintenance rota',
        question: '¿Qué formato oficial corresponde cuando la respuesta sigue una secuencia de etapas?',
        options: ['Flow-chart Completion', 'Matching Headings', 'Yes/No/Not Given'],
        answer: 0,
        evidence: 'begins with a structural survey, followed by membrane repairs... The final stage is a maintenance rota',
        explanation:
          'El prompt organiza pasos en orden. Eso es Flow-chart Completion, especialmente con procesos o secuencias.',
        trap:
          'Matching Headings resume párrafos; no completa una cadena de pasos.',
        linkedSkill: 'orden y conectores',
      },
      {
        id: 'ielts-mixed-urban-farming-04',
        questionType: 'Matching Sentence Endings',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings',
        prompt: 'Older roofs must be inspected before...',
        question: 'Elige el final correcto de la oración.',
        options: ['containers are installed', 'vegetables supply a neighbourhood', 'volunteers monitor every sensor'],
        answer: 0,
        evidence: 'older roofs must be inspected before containers are installed',
        explanation:
          'Matching Sentence Endings completa una oración manteniendo gramática y relación lógica con el texto.',
        trap:
          '“Supply a neighbourhood” contradice el texto: los jardines rara vez producen suficiente para eso.',
        linkedSkill: 'paráfrasis y gramática',
      },
    ],
  },
];

export const IELTS_SKIM_SCAN_TRANSFER: SkimScanTransferSet = {
  id: 'skim-scan-community-cooling',
  title: 'Del mapa general a la evidencia exacta',
  instructions:
    'Primero usa skimming para elegir el párrafo probable. Después usa scanning para encontrar la señal que confirma la respuesta.',
  timeTarget: '4 preguntas · 6 minutos',
  passageTitle: 'Community cooling centres',
  passage: [
    {
      id: 'A',
      label: 'Paragraph A',
      function: 'problema inicial',
      text:
        'During a series of unusually hot summers, the city of Lydford noticed that emergency calls increased most sharply in districts where apartments had poor ventilation. Public health officers argued that advice campaigns were not enough because some residents had no cool indoor place to rest during the afternoon.',
    },
    {
      id: 'B',
      label: 'Paragraph B',
      function: 'programa piloto',
      text:
        'In 2022, Lydford opened six cooling centres in libraries, sports halls and one converted bus station. The centres offered drinking water, shaded seating, basic health checks and charging points for phones. Volunteers were trained to recognise early signs of heat stress, but they were told not to provide medical treatment.',
    },
    {
      id: 'C',
      label: 'Paragraph C',
      function: 'resultados y limite',
      text:
        'A university review found that visits were highest between 2 p.m. and 5 p.m., especially among older residents who lived alone. However, the review also warned that several centres were difficult to reach from hillside neighbourhoods, where bus services ended before the hottest part of the day.',
    },
    {
      id: 'D',
      label: 'Paragraph D',
      function: 'mejora futura',
      text:
        'The following year, the city added a mobile cooling van that stopped near apartment blocks every afternoon. Planners also changed the opening hours of two libraries and began sending heat alerts through community radio instead of relying only on social media posts.',
    },
  ],
  tasks: [
    {
      id: 'skim-scan-cooling-01',
      question: 'Which paragraph explains why advice campaigns were insufficient?',
      firstMove: 'skim',
      paragraphAnswer: 'A',
      signalAnswer: 'no cool indoor place',
      evidence:
        'some residents had no cool indoor place to rest during the afternoon',
      explanation:
        'The question asks for the reason behind the programme. Skimming shows paragraph A presents the initial problem, then scanning for "not enough" confirms the exact reason.',
      trap:
        'Paragraph B describes the solution, but it does not explain why advice campaigns failed.',
    },
    {
      id: 'skim-scan-cooling-02',
      question: 'What were volunteers instructed not to do?',
      firstMove: 'scan',
      paragraphAnswer: 'B',
      signalAnswer: 'provide medical treatment',
      evidence:
        'they were told not to provide medical treatment',
      explanation:
        'The phrase "not to" is the scanning signal. It appears in paragraph B after the volunteer training detail.',
      trap:
        'Recognising heat stress is what volunteers were trained to do, not what they had to avoid.',
    },
    {
      id: 'skim-scan-cooling-03',
      question: 'Which paragraph contains a limitation of the first programme?',
      firstMove: 'skim',
      paragraphAnswer: 'C',
      signalAnswer: 'difficult to reach',
      evidence:
        'several centres were difficult to reach from hillside neighbourhoods',
      explanation:
        'Skimming paragraph functions points to paragraph C because it shifts from results to a warning. Scanning then confirms the limitation with "difficult to reach".',
      trap:
        'Paragraph D responds to the limitation, but the limitation itself is stated in paragraph C.',
    },
    {
      id: 'skim-scan-cooling-04',
      question: 'How did the city communicate heat alerts after the first year?',
      firstMove: 'scan',
      paragraphAnswer: 'D',
      signalAnswer: 'community radio',
      evidence:
        'began sending heat alerts through community radio',
      explanation:
        'The signal "heat alerts" appears in paragraph D. The phrase after "through" gives the communication channel.',
      trap:
        'Social media is mentioned as the previous overreliance, not the improved channel.',
    },
  ],
};

export const IELTS_SKIM_SCAN_TRANSFER_SETS: SkimScanTransferSet[] = [
  IELTS_SKIM_SCAN_TRANSFER,
  {
    id: 'skim-scan-museum-labels',
    title: 'Decidir primero, buscar después',
    instructions:
      'Usa skimming para reconocer la función del párrafo cuando la pregunta pide ubicación. Usa scanning cuando la pregunta ya trae una señal clara.',
    timeTarget: '4 preguntas · 6 minutos',
    passageTitle: 'Museum labels and visitor learning',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'cambio de enfoque',
        text:
          'Traditional museum labels often tried to summarise an object in a few authoritative sentences. Curators assumed that visitors wanted dates, materials and the name of the artist above all else. Recent visitor studies, however, suggest that many people remember an exhibit better when the label also explains why the object mattered to someone at the time.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'experimento',
        text:
          'A small experiment at the Harrow Museum compared two rooms of similar historical objects. One room used standard labels of about 45 words. The other used layered labels: a 20-word summary, a question for children and a short audio code for visitors who wanted more context.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'resultado medible',
        text:
          'Observers found that families spent 37 percent longer in the room with layered labels. Children were more likely to point at details in the objects, while adults were more likely to discuss how the objects had been used. The audio codes were scanned less often than expected, but visitors who used them stayed near the display for several extra minutes.',
      },
      {
        id: 'D',
        label: 'Paragraph D',
        function: 'cautela',
        text:
          'The museum did not replace every label immediately. Staff noted that layered labels took longer to write and required more testing with school groups. They also warned that questions written for children could sound artificial if they were added after the main text rather than planned from the beginning.',
      },
    ],
    tasks: [
      {
        id: 'skim-scan-labels-01',
        question: 'Which paragraph introduces a change in how labels are understood?',
        firstMove: 'skim',
        paragraphAnswer: 'A',
        signalAnswer: 'Recent visitor studies',
        evidence:
          'Recent visitor studies, however, suggest that many people remember an exhibit better',
        explanation:
          'The question asks for the paragraph function, so skimming comes first. Paragraph A moves from traditional labels to a newer view of visitor memory.',
        trap:
          'Paragraph B has an experiment, but the conceptual change is introduced before the experiment.',
      },
      {
        id: 'skim-scan-labels-02',
        question: 'How long were the standard labels in the experiment?',
        firstMove: 'scan',
        paragraphAnswer: 'B',
        signalAnswer: '45 words',
        evidence:
          'One room used standard labels of about 45 words',
        explanation:
          'The question asks for a number. Scanning for "standard labels" or a number leads to paragraph B.',
        trap:
          '20-word summary belongs to the layered-label room, not the standard-label room.',
      },
      {
        id: 'skim-scan-labels-03',
        question: 'Which paragraph reports how visitor behaviour changed?',
        firstMove: 'skim',
        paragraphAnswer: 'C',
        signalAnswer: 'spent 37 percent longer',
        evidence:
          'families spent 37 percent longer in the room with layered labels',
        explanation:
          'Behavioural results are the function of paragraph C. After skimming the paragraph role, scanning confirms the measurable change.',
        trap:
          'Paragraph D evaluates implementation problems, not visitor behaviour during the experiment.',
      },
      {
        id: 'skim-scan-labels-04',
        question: 'What made layered labels harder to implement?',
        firstMove: 'scan',
        paragraphAnswer: 'D',
        signalAnswer: 'took longer to write',
        evidence:
          'layered labels took longer to write and required more testing with school groups',
        explanation:
          'The phrase "harder to implement" is paraphrased by time and testing requirements in paragraph D.',
        trap:
          'Audio codes were scanned less often than expected, but that is a result detail, not the stated implementation problem.',
      },
    ],
  },
  {
    id: 'skim-scan-river-restoration',
    title: 'Del propósito del párrafo al dato técnico',
    instructions:
      'Trabaja como en IELTS: primero decide si la pregunta pide función general o dato localizable; luego revela la evidencia y revisa la trampa.',
    timeTarget: '4 preguntas · 7 minutos',
    passageTitle: 'Restoring a city river',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'contexto historico',
        text:
          'For most of the twentieth century, the River Belden was treated as a drainage channel rather than a public space. Factories lined its banks, and concrete walls kept the water away from nearby streets. Although the walls reduced regular flooding, they also removed shallow habitats where fish and insects had once reproduced.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'intervencion principal',
        text:
          'In 2018, the city began replacing short sections of concrete with sloped banks planted with reeds and willow shrubs. Engineers kept the strongest flood barriers near hospitals and underground stations, but they opened wider edges beside parks and residential streets. The aim was not to make the river look wild, but to let small habitats return without increasing flood risk.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'medicion de resultados',
        text:
          'A five-year survey recorded twelve fish species in restored sections, compared with four species in unchanged concrete channels. Water temperature was also lower near shaded banks during summer afternoons. However, researchers noted that insect diversity improved only where reeds were allowed to remain through the winter.',
      },
      {
        id: 'D',
        label: 'Paragraph D',
        function: 'tension publica',
        text:
          'Some residents complained that winter reeds made the river look untidy, and a few business owners asked for more frequent cutting. The council responded with signs explaining the seasonal habitat cycle and organised monthly walks where ecologists showed visitors how the reeds protected larvae and young fish.',
      },
    ],
    tasks: [
      {
        id: 'skim-scan-river-01',
        question: 'Which paragraph explains the original environmental problem?',
        firstMove: 'skim',
        paragraphAnswer: 'A',
        signalAnswer: 'removed shallow habitats',
        evidence:
          'they also removed shallow habitats where fish and insects had once reproduced',
        explanation:
          'The question asks for the paragraph that explains the original problem, so skimming paragraph functions comes first. Paragraph A gives the historical cause and ecological loss.',
        trap:
          'Paragraph B describes the repair, but the original problem is established before the intervention.',
      },
      {
        id: 'skim-scan-river-02',
        question: 'Which structures kept the strongest flood barriers?',
        firstMove: 'scan',
        paragraphAnswer: 'B',
        signalAnswer: 'hospitals and underground stations',
        evidence:
          'Engineers kept the strongest flood barriers near hospitals and underground stations',
        explanation:
          'The phrase "strongest flood barriers" is a clear scanning signal. The answer sits immediately after it in paragraph B.',
        trap:
          'Parks and residential streets are where wider edges were opened, not where the strongest barriers remained.',
      },
      {
        id: 'skim-scan-river-03',
        question: 'Which paragraph compares restored and unchanged sections?',
        firstMove: 'skim',
        paragraphAnswer: 'C',
        signalAnswer: 'compared with four species',
        evidence:
          'twelve fish species in restored sections, compared with four species in unchanged concrete channels',
        explanation:
          'A comparison of results belongs to the measurement paragraph. Skimming identifies paragraph C, then scanning confirms the comparative phrase.',
        trap:
          'Paragraph D contains public reactions, not the measured comparison between river sections.',
      },
      {
        id: 'skim-scan-river-04',
        question: 'How often did the council organise ecology walks?',
        firstMove: 'scan',
        paragraphAnswer: 'D',
        signalAnswer: 'monthly walks',
        evidence:
          'organised monthly walks where ecologists showed visitors how the reeds protected larvae and young fish',
        explanation:
          'The question asks for frequency. Scanning for a time word leads directly to monthly walks in paragraph D.',
        trap:
          'More frequent cutting is a request from business owners, not the schedule of the council activity.',
      },
    ],
  },
  {
    id: 'skim-scan-campus-sleep',
    title: 'Mapa rapido y señales escondidas',
    instructions:
      'Practica con preguntas que mezclan idea principal, funcion de parrafo, numeros y parafrasis. Decide el primer movimiento antes de leer con detalle.',
    timeTarget: '4 preguntas · 7 minutos',
    passageTitle: 'Sleep advice on campus',
    passage: [
      {
        id: 'A',
        label: 'Paragraph A',
        function: 'problema de comportamiento',
        text:
          'University health teams have long advised students to sleep at regular times, but surveys showed that many first-year students treated sleep as the first thing to sacrifice when deadlines arrived. Posters about eight hours of sleep were widely recognised, yet students rarely changed their routines because the advice felt disconnected from actual coursework pressure.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        function: 'nuevo diseno del programa',
        text:
          'A redesigned programme replaced general warnings with short planning workshops in the first four weeks of term. Students mapped fixed commitments, estimated study blocks and marked two evenings each week when they would stop academic work by 10 p.m. The workshops avoided medical language and focused instead on protecting attention during morning classes.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        function: 'resultado inesperado',
        text:
          'After one semester, participants did not report sleeping much longer on average. The more notable change was consistency: students had fewer nights when bedtime shifted by more than three hours. Tutors also reported that workshop participants submitted fewer requests for deadline extensions during the final month.',
      },
      {
        id: 'D',
        label: 'Paragraph D',
        function: 'limite y siguiente paso',
        text:
          'The programme was less successful for students working late shifts in restaurants and hospitals. Organisers therefore added a separate session on recovery sleep and began sharing examples from older students who had balanced paid work with demanding courses.',
      },
    ],
    tasks: [
      {
        id: 'skim-scan-sleep-01',
        question: 'Which paragraph explains why old advice failed to change behaviour?',
        firstMove: 'skim',
        paragraphAnswer: 'A',
        signalAnswer: 'disconnected from actual coursework pressure',
        evidence:
          'the advice felt disconnected from actual coursework pressure',
        explanation:
          'This asks why an earlier approach failed, so the first move is to skim for the problem paragraph. Paragraph A explains recognition without behaviour change.',
        trap:
          'Paragraph B gives the replacement programme, not the reason the old advice failed.',
      },
      {
        id: 'skim-scan-sleep-02',
        question: 'During which part of term did the planning workshops happen?',
        firstMove: 'scan',
        paragraphAnswer: 'B',
        signalAnswer: 'first four weeks of term',
        evidence:
          'short planning workshops in the first four weeks of term',
        explanation:
          'The question asks for timing. Scanning for workshops and time expressions leads to paragraph B.',
        trap:
          'Two evenings each week is part of the plan students made, not when the workshops were held.',
      },
      {
        id: 'skim-scan-sleep-03',
        question: 'Which paragraph says the main improvement was not longer sleep?',
        firstMove: 'skim',
        paragraphAnswer: 'C',
        signalAnswer: 'not report sleeping much longer',
        evidence:
          'participants did not report sleeping much longer on average. The more notable change was consistency',
        explanation:
          'Skimming paragraph C reveals an unexpected result: duration did not change much, but consistency did.',
        trap:
          'Paragraph A mentions eight hours, but it is about old advice rather than the programme result.',
      },
      {
        id: 'skim-scan-sleep-04',
        question: 'Which students needed a separate session?',
        firstMove: 'scan',
        paragraphAnswer: 'D',
        signalAnswer: 'working late shifts',
        evidence:
          'students working late shifts in restaurants and hospitals',
        explanation:
          'The phrase "separate session" appears in paragraph D after the group that needed extra support.',
        trap:
          'Older students provided examples; they were not the group that needed the separate session.',
      },
    ],
  },
];

export const IELTS_INFERENCE_PRACTICE: InferencePracticeSet = {
  id: 'inference-community-libraries',
  title: 'Community libraries and quiet policy',
  instructions:
    'Choose the conclusion that follows from the text. Do not choose the option that sounds generally true unless the passage supports it.',
  timeTarget: '5 preguntas · 7 minutos',
  passageTitle: 'Community libraries and quiet policy',
  passage: `For decades, the Northgate Library was known as the quietest public building in the district. Its reading rooms were designed for individual study, and staff politely reminded visitors that conversations should be kept outside. This reputation helped students during exam periods, but it also meant that many residents saw the library as a place for people who already enjoyed reading alone.

After a renovation in 2021, the library added a small makerspace, two group-study rooms and a weekly homework club for children. The director, Amina Patel, insisted that the traditional reading room should remain silent, but she argued that a public library also had to serve residents who learned through discussion, demonstration and shared projects.

Not all regular users welcomed the change. Some complained that the new activities made the building feel less serious. Others, however, said the separate zones made expectations clearer than before: people who wanted silence had a protected area, while groups no longer had to whisper awkwardly near the entrance.

Library visits rose during the first year after the renovation, especially among families with children under twelve. Borrowing of printed novels did not increase, but attendance at workshops and homework sessions grew steadily. The council later approved extra evening hours, noting that the library had become useful to residents who had rarely used it in the past.`,
  questions: [
    {
      id: 'infer-library-01',
      question: 'What can be inferred about the library before the renovation?',
      evidenceFocus: 'reputation + who felt welcome',
      options: [
        'It probably felt more welcoming to independent readers than to residents who preferred social learning.',
        'It refused to let children enter during exam periods.',
        'It had no value for students because conversations were forbidden.',
        'It was unpopular because nobody wanted silent spaces.',
      ],
      answer: 0,
      evidence:
        'many residents saw the library as a place for people who already enjoyed reading alone',
      explanation:
        'The text does not say the old library was bad; it says its quiet identity attracted some users and limited how others perceived it. Option A is moderate and evidence-based.',
      traps: [
        'Option B invents a rule about children.',
        'Option C contradicts the passage because students benefited during exams.',
        'Option D overstates the evidence: silence was useful for some people.',
      ],
    },
    {
      id: 'infer-library-02',
      question: 'What does Amina Patel seem to believe about public libraries?',
      evidenceFocus: 'director argument',
      options: [
        'They should remove silent reading rooms to attract more visitors.',
        'They should support different ways of learning, not only solitary reading.',
        'They should focus mainly on borrowing printed novels.',
        'They should avoid group activities because regular users dislike them.',
      ],
      answer: 1,
      evidence:
        'a public library also had to serve residents who learned through discussion, demonstration and shared projects',
      explanation:
        'Her position balances silence with other learning styles. The correct inference preserves that balance instead of replacing one use with another.',
      traps: [
        'Option A ignores that she wanted the traditional reading room to remain silent.',
        'Option C is contradicted by the later focus on workshops and homework sessions.',
        'Option D uses complaints from some users but not Patel’s view.',
      ],
    },
    {
      id: 'infer-library-03',
      question: 'Why did some users feel expectations became clearer?',
      evidenceFocus: 'separate zones',
      options: [
        'Because every part of the library became silent again.',
        'Because staff stopped enforcing any rules about noise.',
        'Because different activities were assigned to different spaces.',
        'Because the entrance was closed to groups.',
      ],
      answer: 2,
      evidence:
        'people who wanted silence had a protected area, while groups no longer had to whisper awkwardly near the entrance',
      explanation:
        'The inference comes from the contrast between protected silent areas and dedicated group spaces.',
      traps: [
        'Option A ignores the new group-study rooms and activities.',
        'Option B goes beyond the text; expectations became clearer, not absent.',
        'Option D misreads the entrance detail.',
      ],
    },
    {
      id: 'infer-library-04',
      question: 'What can be inferred from the fact that printed novel borrowing did not increase?',
      evidenceFocus: 'visits rose + borrowing stable',
      options: [
        'The renovation failed because library visits are only valuable when novel borrowing rises.',
        'The growth in use likely came from services beyond traditional book borrowing.',
        'Families with children stopped reading printed books completely.',
        'Workshops replaced all forms of reading at the library.',
      ],
      answer: 1,
      evidence:
        'Borrowing of printed novels did not increase, but attendance at workshops and homework sessions grew steadily',
      explanation:
        'The passage separates increased visits from novel borrowing, then points to workshops and homework sessions as growing uses.',
      traps: [
        'Option A imposes an outside definition of success.',
        'Option C exaggerates from one borrowing category.',
        'Option D uses all, which the passage does not support.',
      ],
    },
    {
      id: 'infer-library-05',
      question: 'Why did the council probably approve extra evening hours?',
      evidenceFocus: 'council note + new users',
      options: [
        'The library had become useful to residents who previously used it less often.',
        'The council wanted to return the library to its old silent-only model.',
        'The renovation had reduced the number of families visiting the building.',
        'Regular users had unanimously supported every change.',
      ],
      answer: 0,
      evidence:
        'the library had become useful to residents who had rarely used it in the past',
      explanation:
        'The reason is stated indirectly through the council’s note: broader usefulness justified more hours.',
      traps: [
        'Option B contradicts the expanded services.',
        'Option C contradicts the rise among families with children under twelve.',
        'Option D contradicts the paragraph about complaints.',
      ],
    },
  ],
};

export const IELTS_INFERENCE_PRACTICE_SETS: InferencePracticeSet[] = [
  IELTS_INFERENCE_PRACTICE,
  {
    id: 'inference-hillside-farms',
    title: 'Hillside farms and water sharing',
    instructions:
      'Choose the conclusion that the passage supports. Good inferences stay close to evidence and avoid extreme claims.',
    timeTarget: '5 preguntas · 7 minutos',
    passageTitle: 'Hillside farms and water sharing',
    passage: `In the valley town of Merrow, small hillside farms traditionally relied on narrow channels that carried spring water from higher ground. The channels were maintained by families who used them, and repairs were usually made after the first heavy rain of the season. This system worked when farms grew similar crops and planted at roughly the same time.

Over the last decade, planting schedules have become less predictable. Some farmers now grow herbs for restaurants, while others have shifted to fruit trees that need water at different points in the year. During dry months, disagreements increased because one repaired channel could benefit several farms while leaving others with little immediate gain.

The town council introduced a shared maintenance calendar rather than taking control of the channels itself. Farmers still decide which repairs are needed, but each repair team now includes at least one member from a farm that will not receive water from that channel during the same month. Council staff said this rule was designed to make the system feel fairer, not to make every farm use the same amount of water.

The first year produced mixed results. Fewer emergency repairs were needed after storms, and younger farmers said they understood the network better. However, some older farmers disliked recording repair work on a public noticeboard, arguing that trust should not require paperwork. The council kept the noticeboard but made the forms shorter the following season.`,
    questions: [
      {
        id: 'infer-farms-01',
        question: 'What can be inferred about the old water-sharing system?',
        evidenceFocus: 'similar crops + similar timing',
        options: [
          'It depended partly on farms having similar water needs at similar times.',
          'It failed immediately because no families repaired the channels.',
          'It required the town council to control every channel.',
          'It was designed mainly for restaurants growing herbs.',
        ],
        answer: 0,
        evidence:
          'This system worked when farms grew similar crops and planted at roughly the same time',
        explanation:
          'The passage links the old system’s success to similar crops and planting times. Option A keeps that condition without exaggerating.',
        traps: [
          'Option B contradicts the family maintenance described in paragraph 1.',
          'Option C invents council control before the new calendar.',
          'Option D uses herbs from the newer changes, not the old system.',
        ],
      },
      {
        id: 'infer-farms-02',
        question: 'Why did disagreements likely increase during dry months?',
        evidenceFocus: 'different crops + uneven timing',
        options: [
          'Farmers had different water needs, so a repair did not benefit everyone equally at the same time.',
          'All farmers stopped repairing channels after the first heavy rain.',
          'The council forced every farm to grow fruit trees.',
          'Restaurant owners began controlling the spring water directly.',
        ],
        answer: 0,
        evidence:
          'fruit trees that need water at different points in the year... one repaired channel could benefit several farms while leaving others with little immediate gain',
        explanation:
          'The inference connects changed water timing with uneven benefits from repairs. It does not require outside knowledge about farming.',
        traps: [
          'Option B says all and contradicts the repair system.',
          'Option C invents a forced crop change.',
          'Option D invents control by restaurant owners.',
        ],
      },
      {
        id: 'infer-farms-03',
        question: 'What does the council’s new repair-team rule suggest?',
        evidenceFocus: 'fairness rule',
        options: [
          'The council wanted farmers to see repairs as a shared responsibility, even when benefits were delayed.',
          'The council believed farmers should stop deciding which repairs mattered.',
          'The council wanted each farm to receive exactly the same amount of water every month.',
          'The council thought only farms that benefited immediately should repair a channel.',
        ],
        answer: 0,
        evidence:
          'each repair team now includes at least one member from a farm that will not receive water from that channel during the same month',
        explanation:
          'Including someone without immediate benefit implies shared responsibility and perceived fairness, not identical water use.',
        traps: [
          'Option B contradicts farmers still decide which repairs are needed.',
          'Option C contradicts the line about not making every farm use the same amount of water.',
          'Option D is the opposite of the new rule.',
        ],
      },
      {
        id: 'infer-farms-04',
        question: 'What can be inferred from younger farmers saying they understood the network better?',
        evidenceFocus: 'result + network understanding',
        options: [
          'The calendar may have helped some farmers see how different channels were connected.',
          'Younger farmers no longer needed water for their crops.',
          'The noticeboard made all older farmers support the system.',
          'Emergency repairs increased because younger farmers misunderstood the channels.',
        ],
        answer: 0,
        evidence:
          'Fewer emergency repairs were needed after storms, and younger farmers said they understood the network better',
        explanation:
          'The improvement in understanding is linked to the shared maintenance process. Option A is moderate and evidence-based.',
        traps: [
          'Option B invents a change in water need.',
          'Option C contradicts older farmers disliking the noticeboard.',
          'Option D contradicts fewer emergency repairs.',
        ],
      },
      {
        id: 'infer-farms-05',
        question: 'Why did the council probably shorten the forms?',
        evidenceFocus: 'complaint + compromise',
        options: [
          'To keep public records while reducing the burden that some farmers disliked.',
          'To remove the noticeboard and return to no written records at all.',
          'To prevent younger farmers from joining repair teams.',
          'To make every farmer plant the same crop again.',
        ],
        answer: 0,
        evidence:
          'some older farmers disliked recording repair work on a public noticeboard... The council kept the noticeboard but made the forms shorter',
        explanation:
          'The council kept the transparency tool but softened the paperwork. That is a compromise supported by the final sentence.',
        traps: [
          'Option B contradicts kept the noticeboard.',
          'Option C invents exclusion of younger farmers.',
          'Option D has no support in the passage.',
        ],
      },
    ],
  },
];

export const IELTS_PARAPHRASE_PRACTICE: ParaphrasePracticeSet = {
  id: 'paraphrase-urban-food-markets',
  title: 'Paraphrase check: urban food markets',
  instructions:
    'Choose the option that keeps the same meaning. A good paraphrase may change words or grammar, but it must preserve scope, cause, time and certainty.',
  timeTarget: '6 ítems · 8 minutos',
  items: [
    {
      id: 'para-market-01',
      source:
        'Several neighbourhood markets remained open because local farmers could deliver produce directly.',
      focus: 'cause + direct delivery',
      options: [
        'A number of local markets continued operating since farmers were able to supply them without intermediaries.',
        'All city markets expanded after farmers stopped delivering food directly.',
        'Neighbourhood markets closed because local farmers could not deliver produce.',
        'Local farmers delivered produce directly only after several markets had shut down.',
      ],
      answer: 0,
      explanation:
        'Several becomes a number of, remained open becomes continued operating, and because becomes since. The cause stays the same.',
      traps: [
        'Option B changes several to all and reverses direct delivery.',
        'Option C contradicts remained open.',
        'Option D changes the time relationship.',
      ],
    },
    {
      id: 'para-market-02',
      source:
        'The new payment system reduced waiting times, although some older customers found it difficult at first.',
      focus: 'contrast + limited group',
      options: [
        'The payment system was removed because older customers refused to use it.',
        'The new system shortened queues, but it was initially challenging for certain older customers.',
        'Older customers found the system easy because waiting times became shorter.',
        'The payment system eliminated waiting times for every customer immediately.',
      ],
      answer: 1,
      explanation:
        'Reduced waiting times is paraphrased as shortened queues, and although becomes but. Some older customers remains certain older customers.',
      traps: [
        'Option A invents removal and refusal.',
        'Option C changes difficulty into ease.',
        'Option D exaggerates reduced into eliminated and some into every.',
      ],
    },
    {
      id: 'para-market-03',
      source:
        'Food waste fell after vendors began sharing unsold vegetables with community kitchens.',
      focus: 'sequence + result',
      options: [
        'Community kitchens produced more waste after vendors stopped sharing vegetables.',
        'Vendors shared unsold vegetables because food waste had already disappeared.',
        'Less food was wasted once sellers started giving surplus vegetables to community kitchens.',
        'Food waste increased when community kitchens began selling vegetables to vendors.',
      ],
      answer: 2,
      explanation:
        'Food waste fell becomes less food was wasted. Vendors becomes sellers, began becomes started, and unsold becomes surplus.',
      traps: [
        'Option A reverses the action and result.',
        'Option B changes sequence and exaggerates fell into disappeared.',
        'Option D contradicts the direction of change.',
      ],
    },
    {
      id: 'para-market-04',
      source:
        'Inspectors recommended additional refrigeration, but they did not require every stall to install new equipment.',
      focus: 'recommendation vs requirement',
      options: [
        'Inspectors suggested more cooling capacity without making new equipment compulsory for all stalls.',
        'Inspectors required every stall to buy new refrigerators immediately.',
        'Inspectors opposed refrigeration because new equipment was too expensive.',
        'Every stall had already installed equipment before inspectors arrived.',
      ],
      answer: 0,
      explanation:
        'Recommended is equivalent to suggested, additional refrigeration to more cooling capacity, and did not require every stall to without making compulsory for all stalls.',
      traps: [
        'Option B turns a recommendation into an obligation.',
        'Option C invents opposition and cost.',
        'Option D invents a previous installation.',
      ],
    },
    {
      id: 'para-market-05',
      source:
        'The weekend programme attracted more visitors than expected, yet weekday attendance changed very little.',
      focus: 'contrast + degree',
      options: [
        'Both weekend and weekday attendance rose dramatically beyond expectations.',
        'The weekend programme drew unexpectedly high numbers, while weekday visits were almost unchanged.',
        'Weekday attendance fell sharply because weekend visitors stayed away.',
        'The programme failed because visitor numbers were lower than expected.',
      ],
      answer: 1,
      explanation:
        'Attracted more visitors than expected becomes drew unexpectedly high numbers. Changed very little becomes almost unchanged.',
      traps: [
        'Option A applies the weekend result to weekdays.',
        'Option C invents a fall and a cause.',
        'Option D contradicts more visitors than expected.',
      ],
    },
    {
      id: 'para-market-06',
      source:
        'Officials may extend the trial if the market reduces traffic on nearby streets.',
      focus: 'condition + uncertainty',
      options: [
        'Officials will extend the trial because traffic has already disappeared.',
        'The trial could continue longer if the market leads to less traffic in the surrounding area.',
        'Officials ended the trial after nearby streets became busier.',
        'The market must reduce traffic because the trial has already been extended.',
      ],
      answer: 1,
      explanation:
        'May becomes could, extend becomes continue longer, and if preserves the condition. Nearby streets becomes surrounding area.',
      traps: [
        'Option A changes may to will and reduces traffic to disappeared.',
        'Option C invents an ending and opposite traffic result.',
        'Option D reverses the condition and treats extension as already true.',
      ],
    },
  ],
};

export const IELTS_PARAPHRASE_PRACTICE_SETS: ParaphrasePracticeSet[] = [
  IELTS_PARAPHRASE_PRACTICE,
  {
    id: 'paraphrase-coastal-libraries',
    title: 'Paraphrase check: coastal libraries',
    instructions:
      'Choose the paraphrase that preserves the same meaning. Watch for quantity, certainty, cause, time and contrast.',
    timeTarget: '6 ítems · 8 minutos',
    items: [
      {
        id: 'para-library-01',
        source:
          'Many coastal libraries extended their opening hours after storms damaged several school buildings.',
        focus: 'quantity + sequence',
        options: [
          'Numerous libraries near the coast stayed open longer once some schools had been affected by storm damage.',
          'Every coastal library closed early because all schools were destroyed by storms.',
          'Several schools extended library hours before storms damaged coastal buildings.',
          'Libraries reduced their hours after storms left schools undamaged.',
        ],
        answer: 0,
        explanation:
          'Many becomes numerous, coastal becomes near the coast, extended their opening hours becomes stayed open longer, and after preserves the sequence.',
        traps: [
          'Option B changes many to every and several to all, then exaggerates damaged into destroyed.',
          'Option C reverses who extended hours and changes the sequence.',
          'Option D contradicts extended and damaged.',
        ],
      },
      {
        id: 'para-library-02',
        source:
          'The mobile library was introduced because hillside residents could not reach the main branch easily.',
        focus: 'cause + access problem',
        options: [
          'The mobile service began since people living on the hills had difficulty getting to the central library.',
          'Hillside residents stopped using the mobile library because the main branch was easy to reach.',
          'The main branch moved uphill after residents introduced a mobile library.',
          'The mobile library made it impossible for hillside residents to visit the main branch.',
        ],
        answer: 0,
        explanation:
          'Was introduced becomes began, because becomes since, and could not reach easily becomes had difficulty getting to.',
        traps: [
          'Option B reverses the access problem.',
          'Option C changes the actor and invents relocation.',
          'Option D turns the service into the cause of the problem.',
        ],
      },
      {
        id: 'para-library-03',
        source:
          'Staff expected the evening workshops to attract teenagers, but most participants were retired adults.',
        focus: 'expectation vs result',
        options: [
          'The workshops were cancelled because teenagers and retired adults refused to attend.',
          'Employees predicted that teenagers would attend the evening sessions, yet the majority of attendees were older adults no longer working.',
          'Retired adults were expected to avoid the evening workshops, but teenagers attended most sessions.',
          'Staff proved that teenagers and retired adults participated in equal numbers.',
        ],
        answer: 1,
        explanation:
          'Expected becomes predicted, workshops becomes sessions, but becomes yet, and most participants were retired adults becomes the majority of attendees were older adults no longer working.',
        traps: [
          'Option A invents cancellation and refusal.',
          'Option C reverses expectation and result.',
          'Option D invents equal numbers.',
        ],
      },
      {
        id: 'para-library-04',
        source:
          'Borrowing figures rose slightly, whereas attendance at public talks doubled within six months.',
        focus: 'contrast + degree',
        options: [
          'Loans increased a little, while the number of people attending public talks became twice as high in half a year.',
          'Borrowing doubled within six months, whereas public talks rose only slightly.',
          'Both borrowing and public talks fell sharply during the first six months.',
          'Attendance at talks remained unchanged because borrowing figures rose slightly.',
        ],
        answer: 0,
        explanation:
          'Borrowing figures rose slightly becomes loans increased a little, and attendance doubled within six months becomes became twice as high in half a year.',
        traps: [
          'Option B swaps the degree of change.',
          'Option C contradicts both increases.',
          'Option D changes doubled into remained unchanged and invents cause.',
        ],
      },
      {
        id: 'para-library-05',
        source:
          'The council is unlikely to fund a second vehicle unless visitor numbers continue to grow.',
        focus: 'condition + probability',
        options: [
          'The council will definitely buy another vehicle because visitor numbers have stopped growing.',
          'A second vehicle is not expected to receive council funding if visitor numbers fail to keep increasing.',
          'The council has already funded two vehicles although visitor numbers declined.',
          'Visitor numbers must fall before the council can fund another vehicle.',
        ],
        answer: 1,
        explanation:
          'Is unlikely to fund becomes is not expected to receive funding, and unless visitor numbers continue to grow becomes if visitor numbers fail to keep increasing.',
        traps: [
          'Option A changes unlikely to definitely and reverses the condition.',
          'Option C invents completed funding and decline.',
          'Option D turns continued growth into a required fall.',
        ],
      },
      {
        id: 'para-library-06',
        source:
          'Although the digital catalogue helped users search faster, it did not replace printed maps inside the building.',
        focus: 'concession + limit',
        options: [
          'The online catalogue made searches quicker, but physical maps in the library were still kept.',
          'Printed maps disappeared because the digital catalogue slowed user searches.',
          'Users searched more slowly after printed maps replaced the digital catalogue.',
          'The digital catalogue replaced every printed guide as soon as it was introduced.',
        ],
        answer: 0,
        explanation:
          'Helped users search faster becomes made searches quicker, and did not replace printed maps becomes physical maps were still kept.',
        traps: [
          'Option B reverses the speed effect and replacement.',
          'Option C reverses what replaced what.',
          'Option D changes did not replace into replaced every.',
        ],
      },
    ],
  },
];

export const IELTS_WORD_LIMIT_PRACTICE: WordLimitPracticeSet = {
  id: 'word-limit-rooftop-gardens',
  title: 'Completion check: rooftop gardens',
  instructions:
    'Use words from the passage only. Respect the instruction: NO MORE THAN TWO WORDS AND/OR A NUMBER.',
  timeTarget: '6 espacios · 7 minutos',
  passageTitle: 'Rooftop gardens and building design',
  wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
  passage: `Rooftop gardens are increasingly used in dense cities where ground-level green space is limited. A simple layer of plants can reduce heat inside the upper floors of a building, especially during long summer afternoons. However, architects warn that the roof must be checked before planting because wet soil can become heavy after rain.

Some projects use lightweight containers instead of deep beds. These containers are easier to move during repairs and allow building managers to test different plant species. In one apartment block, herbs survived better than ornamental flowers because they needed less water and tolerated windy conditions.

The gardens can also support social life. Residents who rarely met in lifts began sharing watering duties and organising short evening workshops. The building committee later added a small tool cupboard near the access door so volunteers would not have to carry equipment from their apartments.`,
  questions: [
    {
      id: 'word-roof-01',
      before: 'Rooftop gardens are useful in dense cities where ground-level',
      after: 'is limited.',
      answer: 'green space',
      explanation:
        'The exact phrase in the first sentence is "ground-level green space is limited". The answer has two words and fits grammatically.',
      trap:
        'Writing "ground-level green space" uses three words plus a compound modifier and exceeds the target gap.',
    },
    {
      id: 'word-roof-02',
      before: 'A layer of plants can reduce heat inside the building during',
      after: '.',
      answer: 'summer afternoons',
      explanation:
        'The passage says this happens "especially during long summer afternoons". The gap needs the time expression, and two words are enough.',
      trap:
        'Writing "long summer afternoons" is three words, so it breaks NO MORE THAN TWO WORDS.',
    },
    {
      id: 'word-roof-03',
      before: 'Architects say the roof must be checked because wet',
      after: 'can become heavy.',
      answer: 'soil',
      explanation:
        'The phrase is "wet soil can become heavy after rain". The sentence already gives wet, so only "soil" is needed.',
      trap:
        'Writing "wet soil" repeats a word already in the sentence and can make the completed sentence awkward.',
    },
    {
      id: 'word-roof-04',
      before: 'Some projects use lightweight containers instead of',
      after: '.',
      answer: 'deep beds',
      explanation:
        'The exact contrast is "lightweight containers instead of deep beds". The answer is two words from the passage.',
      trap:
        'Writing "beds" alone is under the limit but loses the contrast with deep beds.',
    },
    {
      id: 'word-roof-05',
      before: 'In one apartment block, herbs survived better because they needed',
      after: '.',
      answer: 'less water',
      explanation:
        'The passage gives two reasons; this gap asks for the first one: herbs "needed less water".',
      trap:
        'Writing "less water and tolerated windy conditions" exceeds the limit and answers more than the gap asks.',
    },
    {
      id: 'word-roof-06',
      before: 'The committee added a small',
      after: 'near the access door.',
      answer: 'tool cupboard',
      explanation:
        'The passage says the committee added "a small tool cupboard near the access door". The answer fits the noun phrase after a small.',
      trap:
        'Writing "small tool cupboard" repeats small from the question and uses three words.',
    },
  ],
};

export const IELTS_WORD_LIMIT_PRACTICE_SETS: WordLimitPracticeSet[] = [
  IELTS_WORD_LIMIT_PRACTICE,
  {
    id: 'word-limit-community-workshop',
    title: 'Completion check: community repair workshop',
    instructions:
      'Use words from the passage only. Respect the instruction: NO MORE THAN TWO WORDS AND/OR A NUMBER.',
    timeTarget: '6 espacios · 7 minutos',
    passageTitle: 'A weekend repair workshop',
    wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
    passage: `A community centre in Halden opened a weekend repair workshop after residents complained that small household items were being thrown away too quickly. The organisers began with bicycles and lamps because these objects were common, easy to transport and safe for volunteers to inspect.

Each visitor receives a numbered ticket at the entrance and waits until a repair table becomes free. The ticket system prevents the room from becoming crowded and gives volunteers enough time to explain simple maintenance steps. Children can watch the repairs, but they are asked to stand behind a yellow line near the tool shelves.

The centre does not charge for the service. Instead, visitors may leave a donation in a glass box beside the registration desk. The money is used to replace worn screwdrivers, buy spare bulbs and print instruction sheets for people who want to practise basic repairs at home.`,
    questions: [
      {
        id: 'word-workshop-01',
        before: 'The repair workshop started after residents said small household items were thrown away too',
        after: '.',
        answer: 'quickly',
        explanation:
          'The first sentence says items were "being thrown away too quickly". The gap already includes too, so the answer is only quickly.',
        trap:
          'Writing "too quickly" repeats too from the question. The sentence would read too too quickly.',
      },
      {
        id: 'word-workshop-02',
        before: 'The organisers first worked on bicycles and',
        after: '.',
        answer: 'lamps',
        explanation:
          'The passage says the organisers began with "bicycles and lamps". The gap asks for the second object only.',
        trap:
          'Writing "bicycles and lamps" exceeds the target of the gap and repeats bicycles from the question.',
      },
      {
        id: 'word-workshop-03',
        before: 'Visitors receive a numbered',
        after: 'when they enter.',
        answer: 'ticket',
        explanation:
          'The exact phrase is "receives a numbered ticket at the entrance". The adjective numbered is already in the question, so ticket is enough.',
        trap:
          'Writing "numbered ticket" repeats numbered and can make the completed phrase sound unnatural.',
      },
      {
        id: 'word-workshop-04',
        before: 'The ticket system stops the room from becoming',
        after: '.',
        answer: 'crowded',
        explanation:
          'The second paragraph says the ticket system "prevents the room from becoming crowded".',
        trap:
          'Writing "becoming crowded" repeats becoming from the question and uses more words than necessary.',
      },
      {
        id: 'word-workshop-05',
        before: 'Children must stand behind a',
        after: 'near the tool shelves.',
        answer: 'yellow line',
        explanation:
          'The passage says children are asked to stand "behind a yellow line near the tool shelves". The answer is the two-word noun phrase.',
        trap:
          'Writing "line" alone is short, but it loses the precise location cue from the passage.',
      },
      {
        id: 'word-workshop-06',
        before: 'Donations are left in a',
        after: 'beside the registration desk.',
        answer: 'glass box',
        explanation:
          'The final paragraph says visitors may leave a donation "in a glass box beside the registration desk".',
        trap:
          'Writing "donation in a glass box" copies surrounding context instead of the missing noun phrase.',
      },
    ],
  },
];

export const IELTS_TIME_MANAGEMENT_PRACTICE: TimeManagementPracticeSet = {
  id: 'time-management-reading-triage',
  title: 'Triage de tiempo: museo costero',
  instructions:
    'Decide qué hacer en cada situación: resolver ahora, marcar para volver o saltar temporalmente. La meta no es correr; es proteger puntos.',
  timeTarget: '6 decisiones · 6 minutos',
  passageTitle: 'A coastal museum changes its route',
  passageMap: [
    {
      label: 'Minuto 0-2',
      purpose: 'Skimming del título, primera oración de cada párrafo y cambios de dirección.',
      timeBudget: 'mapa global',
    },
    {
      label: 'Minuto 2-12',
      purpose: 'Resolver preguntas con señales claras: nombres, fechas, números, vocabulario local.',
      timeBudget: 'puntos rápidos',
    },
    {
      label: 'Minuto 12-17',
      purpose: 'Atacar preguntas de idea principal, inferencia o paráfrasis con la evidencia ya marcada.',
      timeBudget: 'puntos lentos',
    },
    {
      label: 'Minuto 17-20',
      purpose: 'Volver solo a preguntas marcadas con evidencia localizada, no a búsquedas desde cero.',
      timeBudget: 'revisión final',
    },
  ],
  decisions: [
    {
      id: 'time-coastal-01',
      questionType: 'Matching Information',
      prompt:
        'La pregunta pide encontrar dónde se menciona una donación de equipos. En el mapa del pasaje viste que el párrafo C habla de financiación y compras.',
      signal: 'zona probable ya localizada',
      options: [
        'Resolver ahora leyendo el párrafo C con cuidado.',
        'Leer todo el pasaje de nuevo desde el principio.',
        'Saltar hasta el final sin marcar nada.',
      ],
      answer: 0,
      explanation:
        'Cuando el mapa ya te da una zona probable, conviene leer ese párrafo con precisión. Matching Information se vuelve lento si reinicias la búsqueda completa.',
      trap:
        'Releer todo parece seguro, pero consume tiempo que pertenece a preguntas más difíciles.',
    },
    {
      id: 'time-coastal-02',
      questionType: 'True/False/Not Given',
      prompt:
        'Llevas 70 segundos con una afirmación. Encontraste el párrafo correcto, pero no logras decidir si contradice el texto o si la información falta.',
      signal: 'evidencia localizada, decisión bloqueada',
      options: [
        'Seguir hasta estar completamente seguro, aunque tome tres minutos más.',
        'Marcar la frase de evidencia, elegir una opción provisional y volver al final.',
        'Borrar la pregunta y no responderla.',
      ],
      answer: 1,
      explanation:
        'Si la zona está localizada pero la decisión se bloquea, marca evidencia y avanza. Volver con distancia suele ser mejor que perder varios puntos por una sola duda.',
      trap:
        'Buscar certeza total en una pregunta puede destruir el ritmo de todo el pasaje.',
    },
    {
      id: 'time-coastal-03',
      questionType: 'Sentence Completion',
      prompt:
        'La instrucción dice NO MORE THAN TWO WORDS. El gap está junto a una palabra clave única que aparece literalmente en el segundo párrafo.',
      signal: 'palabra clave única + límite claro',
      options: [
        'Resolver ahora copiando la unidad mínima que completa la frase.',
        'Dejarla para el final porque todas las completion tasks son lentas.',
        'Leer primero todas las opciones de otros tipos de pregunta.',
      ],
      answer: 0,
      explanation:
        'Completion con señal única y límite claro suele ser un punto rápido. Copia la respuesta mínima, cuenta palabras y sigue.',
      trap:
        'No todas las completion tasks son lentas; algunas deben resolverse temprano para asegurar puntos.',
    },
    {
      id: 'time-coastal-04',
      questionType: 'Matching Headings',
      prompt:
        'Dos headings parecen posibles para el párrafo D. Uno menciona un ejemplo atractivo; el otro resume el cambio principal del párrafo.',
      signal: 'detalle llamativo vs idea principal',
      options: [
        'Elegir el heading con el vocabulario más repetido y no revisar más.',
        'Comparar primera oración, cambio de dirección y cierre del párrafo antes de elegir.',
        'Saltar todos los headings hasta terminar el examen completo.',
      ],
      answer: 1,
      explanation:
        'Matching Headings merece unos segundos de control estructural. La decisión no sale de una palabra repetida, sino de la función del párrafo completo.',
      trap:
        'El detalle atractivo suele ser un distractor de tiempo y de contenido.',
    },
    {
      id: 'time-coastal-05',
      questionType: 'Multiple Choice',
      prompt:
        'Una opción suena correcta por conocimiento general, pero todavía no encontraste una frase del pasaje que la sostenga.',
      signal: 'respuesta plausible sin evidencia',
      options: [
        'Elegirla rápido porque coincide con lo que sabes del tema.',
        'Buscar una zona de evidencia; si no aparece pronto, marcar y avanzar.',
        'Leer artículos externos mentalmente para confirmar la idea.',
      ],
      answer: 1,
      explanation:
        'IELTS premia evidencia del texto. Una opción plausible sin evidencia no debe quedarse con tu tiempo: busca una zona razonable y, si no aparece, marca.',
      trap:
        'El conocimiento externo puede hacer que una opción falsa parezca cómoda.',
    },
    {
      id: 'time-coastal-06',
      questionType: 'Revisión final',
      prompt:
        'Quedan tres minutos. Tienes dos preguntas sin responder: una con evidencia marcada y otra que nunca lograste ubicar.',
      signal: 'tiempo final limitado',
      options: [
        'Volver primero a la pregunta con evidencia marcada.',
        'Empezar una búsqueda nueva para la pregunta nunca ubicada.',
        'Releer el pasaje completo para evitar errores.',
      ],
      answer: 0,
      explanation:
        'La revisión final debe priorizar preguntas con evidencia ya localizada. Una búsqueda desde cero al final suele tener peor retorno.',
      trap:
        'La sensación de recuperar una pregunta perdida puede costar una respuesta que estaba casi lista.',
    },
  ],
};

export const IELTS_TIME_MANAGEMENT_PRACTICE_SETS: TimeManagementPracticeSet[] = [
  IELTS_TIME_MANAGEMENT_PRACTICE,
  {
    id: 'time-management-library-renovation',
    title: 'Triage de tiempo: biblioteca renovada',
    instructions:
      'Decide si conviene resolver ahora, marcar para volver o saltar temporalmente. La meta es priorizar preguntas con retorno alto bajo presión.',
    timeTarget: '6 decisiones · 6 minutos',
    passageTitle: 'A city library reopens after renovation',
    passageMap: [
      {
        label: 'Minuto 0-2',
        purpose: 'Skimming de propósito: por qué cerró, qué cambió y qué problema queda abierto.',
        timeBudget: 'mapa inicial',
      },
      {
        label: 'Minuto 2-11',
        purpose: 'Resolver datos visibles: horarios, espacios nuevos, nombres de salas y límites de reserva.',
        timeBudget: 'evidencia rápida',
      },
      {
        label: 'Minuto 11-17',
        purpose: 'Trabajar inferencia, headings y opciones con distractores de alcance.',
        timeBudget: 'decisiones lentas',
      },
      {
        label: 'Minuto 17-20',
        purpose: 'Volver a dudas con evidencia marcada y dejar búsquedas sin zona clara para el final absoluto.',
        timeBudget: 'cierre selectivo',
      },
    ],
    decisions: [
      {
        id: 'time-library-01',
        questionType: 'Short-answer',
        prompt:
          'La pregunta pide el nombre de la sala que puede reservarse por dos horas. En el mapa viste que el párrafo B describe espacios nuevos y reglas de reserva.',
        signal: 'nombre + límite numérico',
        options: [
          'Resolver ahora leyendo el párrafo B y copiando el nombre exacto.',
          'Dejarla para el final porque las respuestas abiertas siempre toman mucho tiempo.',
          'Releer todo el texto para confirmar cada sala mencionada.',
        ],
        answer: 0,
        explanation:
          'Nombre más número suele ser una señal de scanning rápida. Si ya sabes que el párrafo B contiene espacios y reglas, conviene asegurar ese punto temprano.',
        trap:
          'Clasificar todas las respuestas abiertas como lentas hace perder puntos fáciles.',
      },
      {
        id: 'time-library-02',
        questionType: 'Matching Headings',
        prompt:
          'Un heading menciona la arquitectura nueva y otro resume que el edificio cambió para atraer usuarios que antes no lo visitaban.',
        signal: 'detalle visual vs función del párrafo',
        options: [
          'Elegir arquitectura nueva porque aparece en varias frases.',
          'Revisar la primera y última oración para decidir la función principal.',
          'Saltar todos los headings sin leer el párrafo porque son subjetivos.',
        ],
        answer: 1,
        explanation:
          'Matching Headings se decide por función global. Un detalle repetido puede ser visible, pero no necesariamente resume el propósito del párrafo.',
        trap:
          'La repetición de vocabulario consume tiempo cuando reemplaza el análisis de función.',
      },
      {
        id: 'time-library-03',
        questionType: 'True/False/Not Given',
        prompt:
          'La afirmación dice que todos los visitantes prefirieron el sistema de autoservicio. El texto menciona comentarios positivos de estudiantes, pero no habla de todos los visitantes.',
        signal: 'cuantificador absoluto',
        options: [
          'Elegir True porque estudiantes dieron comentarios positivos.',
          'Marcar como duda eterna hasta leer el texto completo otra vez.',
          'Responder Not Given o False según la evidencia exacta y avanzar.',
        ],
        answer: 2,
        explanation:
          'La decisión eficiente es no quedarse atrapado por "todos". Debes contrastar el alcance de la afirmación con la evidencia disponible y seguir.',
        trap:
          'Convertir un grupo mencionado en todos los visitantes es un distractor de alcance y de tiempo.',
      },
      {
        id: 'time-library-04',
        questionType: 'Summary Completion',
        prompt:
          'El resumen tiene un gap después de "the library reduced noise by adding...". En el mapa marcaste que el párrafo C habla de zonas silenciosas.',
        signal: 'paráfrasis cercana + zona marcada',
        options: [
          'Resolver ahora verificando el noun phrase exacto en el párrafo C.',
          'Ignorar el mapa y buscar noise desde el primer párrafo.',
          'Inventar un sinónimo porque el resumen ya da la idea general.',
        ],
        answer: 0,
        explanation:
          'Si el resumen parafrasea una zona ya marcada, el retorno es alto. Verifica el noun phrase y el límite de palabras antes de seguir.',
        trap:
          'Inventar sinónimos en completion tasks rompe precisión y no ahorra tiempo real.',
      },
      {
        id: 'time-library-05',
        questionType: 'Multiple Choice',
        prompt:
          'Dos opciones son posibles: una coincide con una frase atractiva del ejemplo, la otra resume la razón principal de la renovación.',
        signal: 'ejemplo llamativo vs causa principal',
        options: [
          'Elegir el ejemplo porque es más fácil de recordar.',
          'Comparar la pregunta con la tesis del párrafo y eliminar el detalle decorativo.',
          'Leer todas las preguntas siguientes antes de decidir.',
        ],
        answer: 1,
        explanation:
          'En Multiple Choice, un ejemplo concreto puede distraer. La decisión eficiente es volver a la pregunta exacta: si pide razón principal, busca causa central.',
        trap:
          'Lo memorable no siempre responde lo preguntado.',
      },
      {
        id: 'time-library-06',
        questionType: 'Revisión final',
        prompt:
          'Quedan cuatro minutos. Tienes una pregunta con dos opciones finalistas y otra sin párrafo localizado.',
        signal: 'retorno desigual',
        options: [
          'Volver primero a la pregunta con dos opciones finalistas.',
          'Empezar la búsqueda sin párrafo localizado porque se siente incompleta.',
          'Cambiar respuestas ya seguras para revisar todo por igual.',
        ],
        answer: 0,
        explanation:
          'La revisión final debe maximizar retorno. Una pregunta reducida a dos opciones con evidencia cercana tiene más probabilidad de convertirse en punto.',
        trap:
          'La incomodidad de una pregunta sin ubicar puede empujarte a gastar los últimos minutos donde hay menor retorno.',
      },
    ],
  },
];

export const IELTS_TFNG_QUESTIONS: ObjectiveQuestion[] = [
  {
    id: 'tfng-urban-trees-01',
    statement: 'Urban planners have always considered city trees essential infrastructure.',
    answer: 'FALSE',
    explanation:
      'The passage says planners treated trees mainly as decoration for many years, so "always essential infrastructure" contradicts the text.',
    skill: 'contradiction',
    trap: 'The word always is too absolute.',
  },
  {
    id: 'tfng-urban-trees-02',
    statement: 'Trees can reduce temperatures partly by releasing moisture.',
    answer: 'TRUE',
    explanation:
      'The text directly mentions shade and moisture released through transpiration as causes of cooling.',
    skill: 'paraphrase',
    trap: 'The statement paraphrases "transpiration" as releasing moisture.',
  },
  {
    id: 'tfng-urban-trees-03',
    statement: 'Air conditioning becomes unnecessary in all neighborhoods with many trees.',
    answer: 'FALSE',
    explanation:
      'The passage says trees can reduce the need for air conditioning, not eliminate it in all neighborhoods.',
    skill: 'scope',
    trap: 'Unnecessary and all overstate the claim.',
  },
  {
    id: 'tfng-urban-trees-04',
    statement: 'Lower-income areas may have more exposed concrete than wealthier districts.',
    answer: 'TRUE',
    explanation:
      'The passage states that lower-income areas may have fewer trees and more exposed concrete.',
    skill: 'detail',
    trap: 'The phrase may have must be preserved; it is not an absolute claim.',
  },
  {
    id: 'tfng-urban-trees-05',
    statement: 'Satellite imagery is used by every city government to plan tree planting.',
    answer: 'FALSE',
    explanation:
      'The text says some cities use satellite imagery, not every city government.',
    skill: 'quantifier',
    trap: 'Every changes the meaning of some.',
  },
  {
    id: 'tfng-urban-trees-06',
    statement: 'Young trees usually provide significant shade immediately after planting.',
    answer: 'FALSE',
    explanation:
      'The passage says young trees need years of care before they provide significant shade.',
    skill: 'time',
    trap: 'Immediately contradicts "need years of care".',
  },
  {
    id: 'tfng-urban-trees-07',
    statement: 'The passage identifies the best tree species for dry climates.',
    answer: 'NOT GIVEN',
    explanation:
      'The text says species selection matters, but it does not name the best species for dry climates.',
    skill: 'absence',
    trap: 'A related topic appears, but the exact claim is not stated.',
  },
  {
    id: 'tfng-urban-trees-08',
    statement: 'Community participation can be part of a successful urban forestry program.',
    answer: 'TRUE',
    explanation:
      'The final sentence lists community participation as one element of successful programs.',
    skill: 'detail',
    trap: 'The statement uses "can be part of", which matches the cautious wording.',
  },
  {
    id: 'tfng-urban-trees-09',
    statement: 'The author argues that planting trees solves urban heat problems quickly.',
    answer: 'FALSE',
    explanation:
      'The author explicitly says planting trees is not a quick fix.',
    skill: 'author position',
    trap: 'This reverses the author’s position.',
  },
  {
    id: 'tfng-urban-trees-10',
    statement: 'Private gardens are more common in wealthy districts than in every lower-income area.',
    answer: 'NOT GIVEN',
    explanation:
      'The passage compares general features of wealthier districts and lower-income areas, but it does not make a universal comparison with every lower-income area.',
    skill: 'scope',
    trap: 'The word every makes a claim the text does not verify.',
  },
];

export const IELTS_TFNG_PRACTICE_SETS: ObjectivePracticeSet[] = [
  {
    id: 'tfng-set-urban-trees',
    title: 'Set 1: alcance y cuantificadores',
    instructions:
      'Decide si cada afirmación coincide con el texto, lo contradice o no puede verificarse. Presta atención a always, all, every, may y quickly.',
    timeTarget: '10 statements · 9 minutos',
    passageTitle: 'Urban trees and heat risk',
    passage: IELTS_TFNG_PASSAGE,
    questions: IELTS_TFNG_QUESTIONS,
  },
  {
    id: 'tfng-set-school-libraries',
    title: 'Set 2: información relacionada vs evidencia exacta',
    instructions:
      'El texto menciona varios temas conectados. Marca Not Given solo cuando el dato exacto no aparece, aunque suene lógico.',
    timeTarget: '6 statements · 6 minutos',
    passageTitle: 'School libraries after class',
    passage: `Several secondary schools have kept their libraries open after regular lessons. The decision was not only intended to help students borrow books. Teachers noticed that some pupils needed a quiet place to complete assignments before travelling home, especially those who shared bedrooms with younger siblings.

The first after-school library sessions were supervised by English teachers, but that model was difficult to maintain. In the second term, trained volunteers and senior students helped with basic supervision, while teachers remained available only on two afternoons each week. This reduced staffing pressure without closing the service.

Attendance records showed a clear pattern. Younger students used the library mostly for homework support, while older students were more likely to use reference books and online databases for exam projects. The head librarian argued that the library should not be judged only by the number of books borrowed, because the space now supported several kinds of academic work.

The programme still had limits. Some parents wanted weekend opening hours, but the school board decided to review weekday demand first. No final decision about Saturdays had been made by the end of the year.`,
    questions: [
      {
        id: 'tfng-libraries-01',
        statement: 'The libraries stayed open after lessons only so that students could borrow books.',
        answer: 'FALSE',
        explanation:
          'The text says the decision was not only intended to help students borrow books; it also provided a quiet place for assignments.',
        skill: 'contradiction',
        trap: 'Only contradicts the broader purpose stated in paragraph 1.',
      },
      {
        id: 'tfng-libraries-02',
        statement: 'Some students found it hard to study at home because they shared bedrooms.',
        answer: 'TRUE',
        explanation:
          'Paragraph 1 says some pupils needed a quiet place, especially those who shared bedrooms with younger siblings.',
        skill: 'paraphrase',
        trap: 'The statement paraphrases "needed a quiet place" as difficulty studying at home.',
      },
      {
        id: 'tfng-libraries-03',
        statement: 'English teachers supervised every after-school session throughout the year.',
        answer: 'FALSE',
        explanation:
          'English teachers supervised the first sessions, but later volunteers and senior students helped while teachers were available only on two afternoons.',
        skill: 'time shift',
        trap: 'Every and throughout the year ignore the change in the second term.',
      },
      {
        id: 'tfng-libraries-04',
        statement: 'Older students used online databases for exam projects more often than younger students did.',
        answer: 'TRUE',
        explanation:
          'The text contrasts younger students using homework support with older students using reference books and online databases for exam projects.',
        skill: 'comparison',
        trap: 'The comparison is between usage patterns, not total attendance.',
      },
      {
        id: 'tfng-libraries-05',
        statement: 'The school board rejected weekend opening hours permanently.',
        answer: 'NOT GIVEN',
        explanation:
          'The board decided to review weekday demand first and had made no final decision about Saturdays by the end of the year.',
        skill: 'absence',
        trap: 'A delay is not the same as a permanent rejection.',
      },
      {
        id: 'tfng-libraries-06',
        statement: 'The head librarian believed book borrowing was the only useful measure of the library.',
        answer: 'FALSE',
        explanation:
          'The head librarian argued the opposite: the library should not be judged only by the number of books borrowed.',
        skill: 'author position',
        trap: 'The statement reverses the librarian’s view.',
      },
    ],
  },
  {
    id: 'tfng-set-coastal-paths',
    title: 'Set 3: causa, secuencia y límites de información',
    instructions:
      'Busca contradicción directa antes de marcar False. Si el texto no decide un dato exacto, mantén Not Given aunque el dato parezca probable.',
    timeTarget: '6 statements · 7 minutos',
    passageTitle: 'Coastal walking paths',
    passage: `A coastal town redesigned part of its walking path after winter storms damaged several wooden sections. Instead of rebuilding the path in the same place, engineers moved the most exposed section farther inland. This decision made the route slightly longer, but it reduced the likelihood that waves would reach the boards during ordinary storms.

Local shop owners initially worried that the new route would take visitors away from the seafront cafes. After the path reopened, however, footfall data showed little change in weekend visitor numbers. The council suggested that clearer signs and two new viewing points helped people understand the altered route.

Environmental groups supported the inland move because it allowed damaged dunes to recover. They asked the council to keep visitors off the most fragile areas with low fencing and seasonal notices. The council accepted the fencing proposal but said the notices would be tested for one summer before becoming permanent.

Maintenance costs were reviewed six months after the reopening. Repairs were less frequent than before, although the council warned that one mild winter was not enough evidence to predict long-term savings.`,
    questions: [
      {
        id: 'tfng-coastal-01',
        statement: 'Engineers rebuilt the damaged path in exactly the same location.',
        answer: 'FALSE',
        explanation:
          'Paragraph 1 says engineers moved the most exposed section farther inland instead of rebuilding it in the same place.',
        skill: 'contradiction',
        trap: 'The path was redesigned after damage, but not rebuilt in exactly the same place.',
      },
      {
        id: 'tfng-coastal-02',
        statement: 'Moving the path inland made the route a little longer.',
        answer: 'TRUE',
        explanation:
          'The passage directly states that the decision made the route slightly longer.',
        skill: 'detail',
        trap: 'Slightly and a little are equivalent in this context.',
      },
      {
        id: 'tfng-coastal-03',
        statement: 'Weekend visitor numbers increased sharply after the path reopened.',
        answer: 'NOT GIVEN',
        explanation:
          'The text says footfall data showed little change in weekend visitor numbers. It does not say there was a sharp increase.',
        skill: 'absence vs contradiction',
        trap: 'Little change rules out a large documented shift, but the exact direction is not specified.',
      },
      {
        id: 'tfng-coastal-04',
        statement: 'Environmental groups wanted visitors kept away from fragile dune areas.',
        answer: 'TRUE',
        explanation:
          'Paragraph 3 says environmental groups asked the council to keep visitors off the most fragile areas.',
        skill: 'paraphrase',
        trap: 'Kept away from is a paraphrase of keep visitors off.',
      },
      {
        id: 'tfng-coastal-05',
        statement: 'The council made seasonal notices permanent immediately.',
        answer: 'FALSE',
        explanation:
          'The council said the notices would be tested for one summer before becoming permanent.',
        skill: 'time',
        trap: 'Immediately contradicts the testing period.',
      },
      {
        id: 'tfng-coastal-06',
        statement: 'The council could already predict long-term maintenance savings after six months.',
        answer: 'FALSE',
        explanation:
          'The council warned that one mild winter was not enough evidence to predict long-term savings.',
        skill: 'scope',
        trap: 'Less frequent repairs so far are not the same as a reliable long-term prediction.',
      },
    ],
  },
];

export const IELTS_YNNG_PASSAGE = `Public art in transport stations is often defended as a way to make commuting more pleasant. Murals, small exhibitions and temporary installations can certainly soften places that otherwise feel rushed and anonymous. Yet the strongest argument for station art is not that it decorates a journey. In my view, it gives a public system a visible connection to the neighborhoods it serves.

This does not mean that every station should become a gallery. Transport authorities sometimes commission large works without asking local residents what would feel meaningful or useful. When that happens, art can appear imposed, even if it is technically impressive. A modest project developed with community groups may do more for public trust than an expensive installation chosen by distant planners.

Critics often claim that station art distracts from urgent transport problems. That criticism has force when art budgets replace maintenance or accessibility work. However, the choice is not always so simple. Art programs can be funded separately, supported by cultural grants or used to explain local history while renovation is already taking place. The real test is whether a project improves the station experience without pretending to solve operational failures.

For this reason, public art should be judged by process as much as by appearance. A successful station artwork is not necessarily the largest or most photogenic one. It is the one that helps passengers understand where they are, respects the daily function of the space and gives local people a reason to recognize the station as part of their own environment.`;

export const IELTS_YNNG_QUESTIONS: ObjectiveQuestion[] = [
  {
    id: 'ynng-station-art-01',
    statement: 'The writer believes the main value of station art is its connection to local communities.',
    answer: 'YES',
    explanation:
      'The writer says the strongest argument is that station art gives a public system a visible connection to the neighborhoods it serves.',
    skill: 'author claim',
    trap: 'Pleasant decoration is mentioned, but the writer explicitly says it is not the strongest argument.',
  },
  {
    id: 'ynng-station-art-02',
    statement: 'The writer thinks every transport station should display art like a gallery.',
    answer: 'NO',
    explanation:
      'The second paragraph directly states that this does not mean every station should become a gallery.',
    skill: 'contradiction',
    trap: 'The statement exaggerates a positive view into a universal recommendation.',
  },
  {
    id: 'ynng-station-art-03',
    statement: 'The writer believes technically impressive art is always welcomed by residents.',
    answer: 'NO',
    explanation:
      'The passage says art can appear imposed even if it is technically impressive when residents are not consulted.',
    skill: 'scope',
    trap: 'Always reverses the caution in the paragraph.',
  },
  {
    id: 'ynng-station-art-04',
    statement: 'The writer prefers community-informed modest projects over expensive works chosen by remote planners.',
    answer: 'YES',
    explanation:
      'The writer says a modest project developed with community groups may do more for public trust than an expensive installation chosen by distant planners.',
    skill: 'preference',
    trap: 'The comparison is about public trust and process, not about whether all expensive art is bad.',
  },
  {
    id: 'ynng-station-art-05',
    statement: 'The writer says station art budgets usually reduce funding for accessibility improvements.',
    answer: 'NOT GIVEN',
    explanation:
      'The writer says the criticism has force when art budgets replace maintenance or accessibility work, but does not say this usually happens.',
    skill: 'frequency',
    trap: 'A possible condition is turned into a usual pattern.',
  },
  {
    id: 'ynng-station-art-06',
    statement: 'The writer argues that art can sometimes coexist with practical renovation work.',
    answer: 'YES',
    explanation:
      'The passage notes that art programs may be funded separately or used while renovation is already taking place.',
    skill: 'author argument',
    trap: 'The writer is not saying art should replace renovation; coexistence is the claim.',
  },
  {
    id: 'ynng-station-art-07',
    statement: 'The writer believes the most photogenic station artwork is normally the most successful.',
    answer: 'NO',
    explanation:
      'The final paragraph says a successful artwork is not necessarily the largest or most photogenic one.',
    skill: 'contrast',
    trap: 'Normally is not supported; the writer explicitly rejects appearance as the main measure.',
  },
  {
    id: 'ynng-station-art-08',
    statement: 'The writer recommends removing all art from stations with operational problems.',
    answer: 'NOT GIVEN',
    explanation:
      'The writer says art should not pretend to solve operational failures, but does not recommend removing all art from such stations.',
    skill: 'absence',
    trap: 'The text criticizes a false solution but does not give a removal policy.',
  },
];

export const IELTS_YNNG_PRACTICE_SETS: ObjectivePracticeSet[] = [
  {
    id: 'ynng-station-art',
    title: 'Yes/No/Not Given practice: public art in transport stations',
    instructions:
      'Decide whether each statement agrees with the writer, contradicts the writer or is not stated as the writer\'s view.',
    timeTarget: '8 statements · 9 minutes',
    passageTitle: 'Public art in transport stations',
    passage: IELTS_YNNG_PASSAGE,
    questions: IELTS_YNNG_QUESTIONS,
  },
  {
    id: 'ynng-remote-work',
    title: 'Yes/No/Not Given practice: remote work and city centres',
    instructions:
      'Focus on the writer\'s claims about office districts, not on general facts about remote work.',
    timeTarget: '7 statements · 8 minutes',
    passageTitle: 'Why city centres still need office workers',
    passage: `The rise of remote work has encouraged some commentators to predict the end of central business districts. I think this conclusion is too neat. Fewer daily commuters may reduce pressure on trains and roads, but a city centre is not only a container for desks. It is also a place where shops, cafes, cultural venues and public services depend on repeated daytime movement.

That does not mean every company should force employees back five days a week. A rigid return-to-office policy can waste time and damage trust when people have already shown they can complete focused tasks at home. However, entirely optional attendance can create another problem: if nobody knows when colleagues will be present, the office loses its value as a shared meeting place.

The best approach, in my view, is not to count hours at a desk but to design predictable overlap. Teams may choose two or three common days for meetings, mentoring and decisions that benefit from quick conversation. The remaining time can be used more flexibly. This model accepts that not all work has the same social requirement.

City governments also have a role, but they should not rescue office districts by protecting old habits. Instead, they should make centres more mixed and resilient. Empty ground-floor units can become clinics, classrooms or small performance spaces. Streets designed only for peak-hour office crowds should be adjusted for residents, students and visitors who use the area at different times.

Remote work has changed the city centre, but it has not made proximity irrelevant. The real challenge is to use proximity deliberately, rather than pretending that every task becomes better simply because it happens in the same building.`,
    questions: [
      {
        id: 'ynng-remote-work-01',
        statement: 'The writer believes predictions about the end of central business districts are oversimplified.',
        answer: 'YES',
        explanation:
          'The writer says the conclusion that remote work means the end of central business districts is too neat.',
        skill: 'author claim',
        trap: 'The writer accepts change, but rejects the extreme prediction.',
      },
      {
        id: 'ynng-remote-work-02',
        statement: 'The writer thinks companies should require office attendance five days a week.',
        answer: 'NO',
        explanation:
          'The passage says not every company should force employees back five days a week.',
        skill: 'contradiction',
        trap: 'The writer supports some predictable overlap, not full-time office return.',
      },
      {
        id: 'ynng-remote-work-03',
        statement: 'The writer says remote employees are less productive than office employees.',
        answer: 'NOT GIVEN',
        explanation:
          'The writer says people have shown they can complete focused tasks at home, but does not compare overall productivity between remote and office employees.',
        skill: 'absence',
        trap: 'The topic is work location and coordination, not a measured productivity ranking.',
      },
      {
        id: 'ynng-remote-work-04',
        statement: 'The writer believes completely optional attendance can reduce the office\'s usefulness.',
        answer: 'YES',
        explanation:
          'The writer says entirely optional attendance can mean nobody knows when colleagues will be present, reducing the office as a shared meeting place.',
        skill: 'author argument',
        trap: 'This is not an argument against flexibility in general; it targets unpredictability.',
      },
      {
        id: 'ynng-remote-work-05',
        statement: 'The writer argues that governments should preserve office districts exactly as they were.',
        answer: 'NO',
        explanation:
          'The passage says governments should not protect old habits and should make centres more mixed and resilient.',
        skill: 'contradiction',
        trap: 'The writer wants adaptation, not preservation of the old office-only model.',
      },
      {
        id: 'ynng-remote-work-06',
        statement: 'The writer believes clinics and classrooms are better than shops in city centres.',
        answer: 'NOT GIVEN',
        explanation:
          'Clinics and classrooms are listed as possible uses for empty units, but the writer does not rank them above shops.',
        skill: 'unsupported comparison',
        trap: 'Examples are not preferences unless the writer clearly compares them.',
      },
      {
        id: 'ynng-remote-work-07',
        statement: 'The writer thinks proximity should be used selectively rather than automatically.',
        answer: 'YES',
        explanation:
          'The final paragraph says proximity should be used deliberately, not treated as useful for every task simply because people share a building.',
        skill: 'main claim',
        trap: 'The writer does not reject proximity; the claim is about using it with purpose.',
      },
    ],
  },
  {
    id: 'ynng-school-uniforms',
    title: 'Yes/No/Not Given practice: school uniforms and identity',
    instructions:
      'Answer according to the writer\'s opinion. Watch for claims that sound reasonable but are not actually expressed.',
    timeTarget: '7 statements · 8 minutes',
    passageTitle: 'A careful argument about school uniforms',
    passage: `Debates about school uniforms often become strangely absolute. Supporters say uniforms create equality; opponents say they erase individuality. Both claims contain something useful, but neither is strong enough on its own. In my view, a uniform policy should be judged by the daily pressures it reduces and by the new problems it may create.

Uniforms can reduce visible competition around clothing, especially in schools where students come from very different economic backgrounds. This benefit is real, but it is sometimes overstated. Expensive shoes, phones and bags can still signal status even when shirts and trousers look similar. A uniform is therefore a partial tool, not a complete answer to inequality.

The strongest objection is not that students lose every form of self-expression. Young people express identity through language, friendships, interests and choices outside school. The more serious concern is whether uniform rules are enforced unevenly. If some hairstyles, cultural garments or body types are treated as problems, the policy can become a source of unfair discipline.

Cost also matters. Schools sometimes assume uniforms save families money because they reduce the need for varied outfits. That may be true when items are simple and widely available. It is less true when families must buy from a single supplier or replace branded pieces quickly. A cheap-looking policy can still be expensive in practice.

I am not against uniforms. I am against treating them as a moral shortcut. A good policy should be flexible where identity or affordability is at stake, clear enough to avoid arbitrary punishment and modest about what clothing rules can actually achieve.`,
    questions: [
      {
        id: 'ynng-uniforms-01',
        statement: 'The writer believes both sides of the uniform debate are too absolute.',
        answer: 'YES',
        explanation:
          'The opening says debates become absolute and that both common claims contain something useful but are not strong enough alone.',
        skill: 'author stance',
        trap: 'The writer does not fully accept either side; the position is qualified.',
      },
      {
        id: 'ynng-uniforms-02',
        statement: 'The writer thinks uniforms completely solve economic inequality between students.',
        answer: 'NO',
        explanation:
          'The writer calls uniforms a partial tool and notes that shoes, phones and bags can still signal status.',
        skill: 'scope',
        trap: 'Reduce competition is weaker than completely solve inequality.',
      },
      {
        id: 'ynng-uniforms-03',
        statement: 'The writer says students cannot express identity in any way while wearing uniforms.',
        answer: 'NO',
        explanation:
          'The writer says students express identity through language, friendships, interests and choices outside school.',
        skill: 'contradiction',
        trap: 'The writer worries about enforcement, not total loss of identity.',
      },
      {
        id: 'ynng-uniforms-04',
        statement: 'The writer believes uneven enforcement is a more serious issue than all loss of self-expression.',
        answer: 'YES',
        explanation:
          'The passage says the strongest objection is not loss of every form of expression, but uneven enforcement.',
        skill: 'preference',
        trap: 'This compares two objections; it is not a claim that self-expression never matters.',
      },
      {
        id: 'ynng-uniforms-05',
        statement: 'The writer says most schools use single suppliers for uniforms.',
        answer: 'NOT GIVEN',
        explanation:
          'The passage mentions single suppliers as a condition that can raise costs, but does not say most schools use them.',
        skill: 'frequency',
        trap: 'A possible example is not evidence of a majority pattern.',
      },
      {
        id: 'ynng-uniforms-06',
        statement: 'The writer is completely opposed to school uniforms.',
        answer: 'NO',
        explanation:
          'The writer explicitly says, "I am not against uniforms."',
        skill: 'direct contradiction',
        trap: 'Criticizing weak policies is not the same as opposing all uniforms.',
      },
      {
        id: 'ynng-uniforms-07',
        statement: 'The writer believes uniform policies should include flexibility for identity and affordability.',
        answer: 'YES',
        explanation:
          'The final paragraph says a good policy should be flexible where identity or affordability is at stake.',
        skill: 'recommendation',
        trap: 'The writer supports flexibility inside a policy, not a policy-free school.',
      },
    ],
  },
];

export const IELTS_MATCHING_HEADINGS_PASSAGE: MatchingHeadingsPassage = {
  id: 'mh-public-libraries',
  title: 'The changing role of public libraries',
  instructions:
    'Choose the correct heading for each paragraph. There are more headings than paragraphs, so some options will not be used.',
  headingOptions: [
    { id: 'i', text: 'A new focus on access rather than ownership' },
    { id: 'ii', text: 'Why libraries should charge higher membership fees' },
    { id: 'iii', text: 'Libraries as places for community support' },
    { id: 'iv', text: 'The complete disappearance of printed books' },
    { id: 'v', text: 'How staff roles have expanded' },
    { id: 'vi', text: 'A problem caused by unlimited opening hours' },
    { id: 'vii', text: 'Technology services beyond simple internet use' },
    { id: 'viii', text: 'Evidence that library visits are only declining' },
    { id: 'ix', text: 'A mixed pattern that old measures may miss' },
  ],
  paragraphs: [
    {
      id: 'a',
      label: 'Paragraph A',
      text:
        'Public libraries were once defined mainly by the number of books they stored. Today, many library systems measure success differently. A person may visit without borrowing anything: to use a quiet desk, join a workshop, access a database or receive help with an online form. The central idea is no longer that the library owns information, but that it gives people practical access to it.',
      answer: 'i',
      explanation:
        'The paragraph contrasts the old model of owning books with the new model of giving access to information and services.',
      trap:
        'Printed books appear in the paragraph, but the paragraph does not say they disappear completely.',
    },
    {
      id: 'b',
      label: 'Paragraph B',
      text:
        'In many cities, libraries have become informal support centers. Parents bring children to reading clubs, older adults attend digital literacy sessions, and job seekers receive guidance on applications. During heatwaves or storms, some branches also function as safe public spaces. These services make the library part of the social infrastructure of a neighborhood.',
      answer: 'iii',
      explanation:
        'The paragraph is about social and community support, not only reading or technology.',
      trap:
        'Digital literacy is mentioned, but it is one example inside a broader community-support role.',
    },
    {
      id: 'c',
      label: 'Paragraph C',
      text:
        'The growth of digital services has changed what visitors ask for. People may need help scanning documents, using design software, joining a video interview or protecting personal data online. Some branches lend tablets or Wi-Fi devices, while others offer makerspaces with recording equipment and 3D printers. The library is increasingly a bridge between people and tools they cannot easily afford at home.',
      answer: 'vii',
      explanation:
        'The paragraph focuses on technology services that go beyond basic internet access.',
      trap:
        'Access is part of the topic, but the best heading must capture the specific digital and technology focus.',
    },
    {
      id: 'd',
      label: 'Paragraph D',
      text:
        'These changes have also transformed library work. Staff members still organize collections, but they may also teach classes, troubleshoot devices, coordinate local partnerships and guide users through government websites. This requires communication skills and technical confidence as much as knowledge of cataloguing systems.',
      answer: 'v',
      explanation:
        'The whole paragraph explains how library staff responsibilities have broadened.',
      trap:
        'Government websites are a detail; they do not summarize the paragraph.',
    },
    {
      id: 'e',
      label: 'Paragraph E',
      text:
        'Despite predictions that libraries would become irrelevant, usage patterns are more complex. Traditional book borrowing has decreased in some places, yet attendance at events, demand for study areas and use of digital services have grown. The challenge for library leaders is to explain this mixed picture to funders who may still judge libraries by older measures.',
      answer: 'ix',
      explanation:
        'The paragraph emphasizes mixed usage patterns and explains that older measures may fail to capture the full value of libraries.',
      trap:
        'The paragraph mentions some decline, but it directly rejects the idea that visits are only declining.',
    },
  ],
};

export const IELTS_MATCHING_HEADINGS_PASSAGES: MatchingHeadingsPassage[] = [
  IELTS_MATCHING_HEADINGS_PASSAGE,
  {
    id: 'mh-urban-farming',
    title: 'Urban farming beyond fresh food',
    instructions:
      'Choose the correct heading for each paragraph. Focus on the purpose of the whole paragraph before looking at repeated words.',
    headingOptions: [
      { id: 'i', text: 'A response to limited urban space' },
      { id: 'ii', text: 'Why rooftop farms have replaced rural agriculture' },
      { id: 'iii', text: 'Educational benefits that extend beyond gardening' },
      { id: 'iv', text: 'The role of community trust and local ownership' },
      { id: 'v', text: 'Technical limits that require realistic planning' },
      { id: 'vi', text: 'How supermarkets caused the end of urban markets' },
      { id: 'vii', text: 'Environmental gains from shorter supply chains' },
      { id: 'viii', text: 'A debate about whether yields are the only measure' },
      { id: 'ix', text: 'The risks of using volunteers in every project' },
    ],
    paragraphs: [
      {
        id: 'a',
        label: 'Paragraph A',
        text:
          'Urban farming projects often begin with a practical problem: cities have little unused land. Instead of searching for large fields, organisers use rooftops, school courtyards, vacant lots and narrow strips beside public buildings. These spaces rarely produce huge harvests, but they can turn overlooked corners into productive places.',
        answer: 'i',
        explanation:
          'The paragraph explains how urban farming adapts to the lack of available city land by using smaller spaces.',
        trap:
          'Rooftops are mentioned, but the paragraph is about space constraints in general, not rooftop farms replacing rural agriculture.',
      },
      {
        id: 'b',
        label: 'Paragraph B',
        text:
          'Some advocates describe the environmental value of growing food close to consumers. A tomato grown a few blocks away may require less transport and packaging than one shipped across a continent. Composting programmes connected to gardens can also reduce the amount of organic waste sent to landfill.',
        answer: 'vii',
        explanation:
          'The paragraph focuses on environmental benefits linked to local production, transport, packaging and composting.',
        trap:
          'Food appears throughout the text, but this paragraph is specifically about environmental gains.',
      },
      {
        id: 'c',
        label: 'Paragraph C',
        text:
          'In schools, gardens can become outdoor classrooms. Students measure plant growth, test soil conditions, write observation notes and discuss where food comes from. Teachers often report that the garden works best when it supports science, language and citizenship lessons rather than sitting outside the curriculum.',
        answer: 'iii',
        explanation:
          'The whole paragraph is about educational uses of gardens across several subjects.',
        trap:
          'Gardening is the setting, but the heading must capture learning beyond simply growing plants.',
      },
      {
        id: 'd',
        label: 'Paragraph D',
        text:
          'Projects are more likely to last when residents feel they have shaped the rules. If a garden is designed by an outside organisation without listening to neighbours, it may be seen as temporary decoration. Shared decisions about opening hours, crop choices and maintenance can create a stronger sense of responsibility.',
        answer: 'iv',
        explanation:
          'The paragraph explains that local participation and shared decisions build trust and ownership.',
        trap:
          'Maintenance is mentioned, but the main idea is not technical upkeep; it is community ownership.',
      },
      {
        id: 'e',
        label: 'Paragraph E',
        text:
          'Supporters sometimes celebrate urban farms by counting kilograms of produce. Critics argue that this can miss the point. A small site may never compete with commercial farms, yet it may still provide education, social connection and visible evidence that food systems can be changed locally.',
        answer: 'viii',
        explanation:
          'The paragraph discusses whether harvest size is the right way to judge the value of an urban farm.',
        trap:
          'The paragraph mentions commercial farms, but it does not claim urban farms have replaced rural agriculture.',
      },
      {
        id: 'f',
        label: 'Paragraph F',
        text:
          'There are also practical limits. Soil may be contaminated, roofs may not support heavy containers, and water access can be unreliable in summer. Successful projects therefore start with testing, permissions and maintenance plans rather than assuming that enthusiasm alone will solve every problem.',
        answer: 'v',
        explanation:
          'The paragraph lists technical constraints and argues for realistic planning before a project starts.',
        trap:
          'Volunteers and enthusiasm are implied, but the paragraph is broader than volunteer risk.',
      },
    ],
  },
  {
    id: 'mh-night-trains',
    title: 'The return of night trains',
    instructions:
      'Choose the correct heading for each paragraph. Watch for headings that mention a real detail but fail to summarize the paragraph.',
    headingOptions: [
      { id: 'i', text: 'A service revived by changing travel priorities' },
      { id: 'ii', text: 'Why night trains are always faster than planes' },
      { id: 'iii', text: 'Comfort expectations that operators must manage' },
      { id: 'iv', text: 'Timetabling challenges across borders' },
      { id: 'v', text: 'The complete disappearance of business travel' },
      { id: 'vi', text: 'Environmental arguments behind renewed interest' },
      { id: 'vii', text: 'How stations became tourist attractions' },
      { id: 'viii', text: 'Pricing questions that affect who can use the service' },
      { id: 'ix', text: 'Marketing that treats the journey as part of the trip' },
    ],
    paragraphs: [
      {
        id: 'a',
        label: 'Paragraph A',
        text:
          'For decades, many European night train routes were reduced or cancelled as airlines offered cheap short-haul flights. Recently, several operators have announced new overnight services. The revival reflects a shift in passenger priorities, with some travellers valuing lower-emission journeys and the chance to avoid early airport transfers.',
        answer: 'i',
        explanation:
          'The paragraph describes the decline and revival of night trains and explains the changed priorities behind it.',
        trap:
          'Environmental motives appear, but the paragraph is about the overall revival, not only emissions.',
      },
      {
        id: 'b',
        label: 'Paragraph B',
        text:
          'Supporters often compare night trains with flights in terms of carbon emissions. A rail journey can produce far less pollution than a plane on the same route, especially when the electricity supply is relatively clean. For passengers trying to reduce their travel footprint, this difference is a major part of the appeal.',
        answer: 'vi',
        explanation:
          'The paragraph focuses on environmental comparisons between trains and planes.',
        trap:
          'Planes are mentioned, but the paragraph does not discuss speed or claim trains are always faster.',
      },
      {
        id: 'c',
        label: 'Paragraph C',
        text:
          'Running an overnight route is operationally complex. Trains may cross several national networks, each with its own track access rules, maintenance windows and signalling systems. A delay in one country can also affect morning commuter services in another, so coordination matters as much as demand.',
        answer: 'iv',
        explanation:
          'The paragraph is about cross-border scheduling and operational coordination.',
        trap:
          'Morning services are a detail; the heading must capture the broader timetabling challenge.',
      },
      {
        id: 'd',
        label: 'Paragraph D',
        text:
          'Passenger expectations can be difficult to balance. Some people imagine a hotel-like cabin, while others mainly want a clean, safe place to sleep. Operators must decide how many private compartments, couchettes and seats to provide, because each choice affects both comfort and capacity.',
        answer: 'iii',
        explanation:
          'The paragraph discusses comfort expectations and how operators balance cabin types and capacity.',
        trap:
          'Hotels are mentioned as a comparison, but the paragraph is not about accommodation tourism.',
      },
      {
        id: 'e',
        label: 'Paragraph E',
        text:
          'Price is another obstacle. If a sleeper ticket costs much more than a flight, families and students may not see it as a realistic option. Subsidies, early-booking fares and shared compartments can help, but operators still need enough revenue to cover staff, cleaning and rolling stock.',
        answer: 'viii',
        explanation:
          'The paragraph explains how ticket prices influence access and financial viability.',
        trap:
          'Families and students are examples; the main issue is pricing and affordability.',
      },
      {
        id: 'f',
        label: 'Paragraph F',
        text:
          'Marketing teams increasingly present the overnight journey as more than transport. Advertisements show passengers boarding in one city, sleeping through the dull middle section and waking close to a new destination. This message turns the train into part of the holiday rather than a pause before it begins.',
        answer: 'ix',
        explanation:
          'The paragraph focuses on marketing the journey itself as part of the travel experience.',
        trap:
          'Destinations are mentioned, but the paragraph does not say stations became tourist attractions.',
      },
    ],
  },
];

export const IELTS_MATCHING_INFORMATION_PASSAGE: MatchingInformationPassage = {
  id: 'mi-city-noise',
  title: 'How cities respond to noise',
  instructions:
    'Match each statement with the paragraph that contains the information. You may use any paragraph more than once.',
  paragraphs: [
    {
      id: 'A',
      label: 'Paragraph A',
      text:
        'City noise was once treated mainly as a minor annoyance. Today, public health researchers describe it as an environmental stressor that can affect sleep, concentration and long-term wellbeing. Traffic remains the most common source in many urban areas, but construction, nightlife and delivery vehicles also contribute to the soundscape.',
    },
    {
      id: 'B',
      label: 'Paragraph B',
      text:
        'Some cities have started mapping noise levels street by street. These maps combine sensor data, traffic counts and resident complaints to identify areas where exposure is highest. The results are sometimes surprising: a narrow street with tall buildings can trap sound even when the number of vehicles is lower than on a wider avenue.',
    },
    {
      id: 'C',
      label: 'Paragraph C',
      text:
        'Reducing noise is not always a matter of installing barriers. Lower speed limits, smoother road surfaces and restrictions on night deliveries can reduce sound at the source. Urban trees and green spaces may also help, though their effect is often modest unless combined with changes in traffic design.',
    },
    {
      id: 'D',
      label: 'Paragraph D',
      text:
        'Policy makers also face questions of fairness. Wealthier districts may have more parks, wider streets and better insulated buildings, while lower-income neighborhoods can be located closer to highways or industrial areas. As a result, noise reduction has become part of wider debates about environmental justice.',
    },
    {
      id: 'E',
      label: 'Paragraph E',
      text:
        'Public communication matters because residents do not always recognize gradual improvements. If a city lowers traffic noise by a few decibels, the change may be meaningful for health but hard to notice immediately. Explaining the goal of a policy can therefore make people more willing to support measures that seem inconvenient at first.',
    },
  ],
  questions: [
    {
      id: 'mi-noise-01',
      statement: 'a reason why streets with fewer cars may still be noisy',
      answer: 'B',
      explanation:
        'Paragraph B explains that narrow streets with tall buildings can trap sound even with fewer vehicles.',
      trap:
        'Traffic appears in several paragraphs, but the surprising fewer-cars detail is only in paragraph B.',
    },
    {
      id: 'mi-noise-02',
      statement: 'examples of measures that reduce noise before it spreads',
      answer: 'C',
      explanation:
        'Paragraph C lists lower speed limits, smoother road surfaces and night-delivery restrictions as ways to reduce sound at the source.',
      trap:
        'Barriers are mentioned, but the paragraph says reduction is not always about barriers.',
    },
    {
      id: 'mi-noise-03',
      statement: 'the idea that noise is connected to social inequality',
      answer: 'D',
      explanation:
        'Paragraph D compares wealthier and lower-income districts and connects noise reduction with environmental justice.',
      trap:
        'Health is mentioned in paragraph A, but fairness and inequality are developed in paragraph D.',
    },
    {
      id: 'mi-noise-04',
      statement: 'different kinds of urban activities that add to the soundscape',
      answer: 'A',
      explanation:
        'Paragraph A names traffic, construction, nightlife and delivery vehicles as sources of urban noise.',
      trap:
        'Delivery vehicles also appear later, but the broad list of sources is in paragraph A.',
    },
    {
      id: 'mi-noise-05',
      statement: 'why residents may need an explanation of policy benefits',
      answer: 'E',
      explanation:
        'Paragraph E says gradual decibel reductions can be meaningful but hard to notice, so communication can increase support.',
      trap:
        'The answer is not just about public complaints; it is about communicating benefits that are not immediately obvious.',
    },
    {
      id: 'mi-noise-06',
      statement: 'the use of several data sources to locate the worst affected areas',
      answer: 'B',
      explanation:
        'Paragraph B says maps combine sensor data, traffic counts and resident complaints to identify high-exposure areas.',
      trap:
        'Do not match this to paragraph E just because residents are mentioned; paragraph B is about data sources.',
    },
  ],
};

export const IELTS_MATCHING_INFORMATION_PASSAGES: MatchingInformationPassage[] = [
  IELTS_MATCHING_INFORMATION_PASSAGE,
  {
    id: 'mi-museum-lighting',
    title: 'Lighting in modern museums',
    instructions:
      'Match each statement with the paragraph that contains the information. A paragraph may be used more than once.',
    paragraphs: [
      {
        id: 'A',
        label: 'Paragraph A',
        text:
          'Museum lighting used to be planned mainly around visibility: visitors needed to see paintings, labels and display cases clearly. Curators now treat lighting as part of conservation as well as presentation. Too much exposure can fade pigments, weaken paper and damage textiles, so the brightest display is not always the best one.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        text:
          'Different objects tolerate light in different ways. Stone sculpture can usually be displayed under stronger light than watercolours, manuscripts or historic fabrics. For this reason, museums often rotate sensitive works or show them for limited periods before returning them to storage.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        text:
          'Technology has changed what lighting designers can control. LED systems can adjust colour temperature, direction and intensity with more precision than older lamps. Some galleries also use sensors so that lights become brighter when visitors approach and dim again when the room is empty.',
      },
      {
        id: 'D',
        label: 'Paragraph D',
        text:
          'Lighting also affects how visitors move through a gallery. A bright entrance can invite people in, while a lower level of light around a fragile object may encourage slower viewing. Designers sometimes use contrast to guide attention, but they must avoid making pathways unsafe or labels unreadable.',
      },
      {
        id: 'E',
        label: 'Paragraph E',
        text:
          'There is no single perfect lighting formula. A science museum may need clear, practical illumination for interactive displays, while an exhibition of medieval manuscripts may require a quieter atmosphere and strict light limits. The best plan depends on the object, the room and the kind of experience the museum wants to create.',
      },
    ],
    questions: [
      {
        id: 'mi-lighting-01',
        statement: 'examples of materials that can be harmed by excessive light',
        answer: 'A',
        explanation:
          'Paragraph A says too much exposure can fade pigments, weaken paper and damage textiles.',
        trap:
          'Paragraph B compares object tolerance, but the direct list of damage examples appears in paragraph A.',
      },
      {
        id: 'mi-lighting-02',
        statement: 'a reason why some objects are displayed only temporarily',
        answer: 'B',
        explanation:
          'Paragraph B explains that sensitive works may be rotated or shown for limited periods because they tolerate less light.',
        trap:
          'Storage is mentioned as a result, not the main reason; the reason is light sensitivity.',
      },
      {
        id: 'mi-lighting-03',
        statement: 'a system that changes brightness depending on visitor presence',
        answer: 'C',
        explanation:
          'Paragraph C describes sensors that brighten lights when visitors approach and dim them when the room is empty.',
        trap:
          'Visitor movement appears in paragraph D, but the automatic brightness system is in paragraph C.',
      },
      {
        id: 'mi-lighting-04',
        statement: 'the idea that lighting can influence the route people take',
        answer: 'D',
        explanation:
          'Paragraph D says lighting affects how visitors move through a gallery and can guide attention.',
        trap:
          'Do not choose paragraph C just because it mentions visitors; paragraph D is about movement and guidance.',
      },
      {
        id: 'mi-lighting-05',
        statement: 'why one lighting solution cannot fit every exhibition',
        answer: 'E',
        explanation:
          'Paragraph E says the best plan depends on the object, room and desired visitor experience.',
        trap:
          'Different object tolerance appears in paragraph B, but paragraph E gives the broader no-single-formula idea.',
      },
      {
        id: 'mi-lighting-06',
        statement: 'a safety concern created by using contrast in a gallery',
        answer: 'D',
        explanation:
          'Paragraph D warns that designers must avoid making pathways unsafe or labels unreadable.',
        trap:
          'Contrast is the signal; the answer is not paragraph E, which discusses exhibition differences.',
      },
    ],
  },
  {
    id: 'mi-coastal-restoration',
    title: 'Restoring coastal wetlands',
    instructions:
      'Match each statement with the paragraph that contains the information. Some paragraphs may answer more than one statement.',
    paragraphs: [
      {
        id: 'A',
        label: 'Paragraph A',
        text:
          'Coastal wetlands were once dismissed as empty or unusable land, and many were drained for roads, housing or farmland. Scientists now describe them as protective landscapes because they can absorb wave energy, store carbon and provide nursery areas for fish. This change in understanding has encouraged restoration projects in many regions.',
      },
      {
        id: 'B',
        label: 'Paragraph B',
        text:
          'Restoration rarely means simply planting vegetation. Engineers may need to remove old barriers, reopen tidal channels or change drainage systems so that salt water can return at the right times. If the water regime is wrong, new plants may fail even when the species are carefully chosen.',
      },
      {
        id: 'C',
        label: 'Paragraph C',
        text:
          'Local communities can disagree about wetland projects. Fishers may welcome healthier nursery habitats, while farmers worry about losing productive land or seeing salt water move closer to fields. Project teams therefore spend months discussing maps, compensation and monitoring plans before work begins.',
      },
      {
        id: 'D',
        label: 'Paragraph D',
        text:
          'The benefits of restoration are not immediate. Young marsh plants need time to spread, and sediment may accumulate slowly over several seasons. Monitoring teams often measure progress through small indicators such as insect diversity, water depth and the return of juvenile fish.',
      },
      {
        id: 'E',
        label: 'Paragraph E',
        text:
          'Some restored wetlands are designed to work alongside human infrastructure. A restored marsh may reduce pressure on a sea wall during storms, but it does not remove the need for evacuation plans or building rules in exposed areas. Restoration is most effective when it forms one part of a wider coastal strategy.',
      },
    ],
    questions: [
      {
        id: 'mi-wetlands-01',
        statement: 'a past attitude that led to the loss of wetland areas',
        answer: 'A',
        explanation:
          'Paragraph A says wetlands were dismissed as empty or unusable land and were drained for development or farming.',
        trap:
          'Later paragraphs discuss restoration, but the old attitude and loss appear in paragraph A.',
      },
      {
        id: 'mi-wetlands-02',
        statement: 'physical changes needed before plants can succeed',
        answer: 'B',
        explanation:
          'Paragraph B lists removing barriers, reopening tidal channels and changing drainage systems.',
        trap:
          'Planting is mentioned, but the statement asks what must happen before planting can work.',
      },
      {
        id: 'mi-wetlands-03',
        statement: 'groups that may view the same project differently',
        answer: 'C',
        explanation:
          'Paragraph C contrasts fishers who may welcome restoration with farmers who may worry about its effects.',
        trap:
          'Community discussion is the broad topic, but the statement points to differing stakeholder views.',
      },
      {
        id: 'mi-wetlands-04',
        statement: 'small signs used to judge whether restoration is progressing',
        answer: 'D',
        explanation:
          'Paragraph D names insect diversity, water depth and juvenile fish as monitoring indicators.',
        trap:
          'Paragraph A lists benefits, but paragraph D gives measured signs of progress.',
      },
      {
        id: 'mi-wetlands-05',
        statement: 'why restoration should not be treated as the only form of protection',
        answer: 'E',
        explanation:
          'Paragraph E says restored marshes can reduce pressure on sea walls but do not remove the need for other planning rules.',
        trap:
          'Protection appears in paragraph A, but paragraph E explains limits and wider strategy.',
      },
      {
        id: 'mi-wetlands-06',
        statement: 'the importance of getting water movement right',
        answer: 'B',
        explanation:
          'Paragraph B says plants may fail if the water regime is wrong, even with carefully chosen species.',
        trap:
          'Water depth is monitored in paragraph D, but the setup of water movement is explained in paragraph B.',
      },
    ],
  },
];

export const IELTS_MATCHING_FEATURES_PASSAGE: MatchingFeaturesPassage = {
  id: 'mf-urban-farming',
  title: 'Matching Features practice: urban farming projects',
  instructions:
    'Match each statement with the correct feature. Features may be used more than once, and some may not be used.',
  passageTitle: 'Different approaches to urban farming',
  passage: `Urban farming is often described as a single movement, but city projects can have very different goals. Some focus on food production, while others use gardens as tools for education, environmental repair or neighborhood planning. Understanding who does what is essential when a reading question asks you to match a statement with a person, group or project.

The Green Roof Collective began by converting flat commercial roofs into small vegetable plots. Its founder, Lina Torres, argued that unused roof space could supply herbs and salad leaves to nearby restaurants without competing for street-level land. The group does not claim that rooftops can feed an entire city. Instead, it presents roof farming as a practical supplement where land prices make ground gardens unrealistic.

In contrast, the Riverside School Network treats farming primarily as a teaching method. Students maintain raised beds, record soil temperature and compare plant growth under different watering schedules. The network's coordinator, Amara Singh, says the strongest benefit is not the harvest itself, but the way gardening makes biology, climate and nutrition visible in daily lessons.

Another model is represented by the Vacant Lot Alliance, which works in neighborhoods with abandoned land. The alliance negotiates temporary use agreements with property owners and turns neglected lots into community gardens. Its volunteers argue that the gardens reduce illegal dumping and give residents a reason to care for spaces that previously felt unsafe. Food is part of the project, but public stewardship is the central aim.

The most technology-driven approach comes from Metroponics Lab, a start-up testing indoor hydroponic systems near transit hubs. Its engineers emphasize predictable production: plants grow under controlled light and nutrient conditions, so harvests are less affected by weather. Critics point out that such systems require energy and technical maintenance, but the company says the model is useful where year-round supply matters more than low-tech accessibility.`,
  features: [
    {
      id: 'A',
      label: 'Green Roof Collective',
      description: 'Rooftop plots for restaurants and dense commercial areas.',
    },
    {
      id: 'B',
      label: 'Riverside School Network',
      description: 'School gardens used as a teaching environment.',
    },
    {
      id: 'C',
      label: 'Vacant Lot Alliance',
      description: 'Community gardens on neglected neighborhood land.',
    },
    {
      id: 'D',
      label: 'Metroponics Lab',
      description: 'Indoor hydroponic production near transport hubs.',
    },
  ],
  questions: [
    {
      id: 'mf-urban-farming-01',
      statement: 'uses farming mainly to make academic subjects easier to observe',
      answer: 'B',
      explanation:
        'Riverside School Network treats farming as a teaching method and says gardening makes biology, climate and nutrition visible in daily lessons.',
      trap:
        'Do not choose a project because it grows food. The key phrase is academic subjects becoming visible.',
    },
    {
      id: 'mf-urban-farming-02',
      statement: 'claims its model is a supplement rather than a complete food solution',
      answer: 'A',
      explanation:
        'Green Roof Collective does not claim rooftops can feed an entire city; it presents roof farming as a practical supplement.',
      trap:
        'Supplement is not the same as predictable supply. Metroponics focuses on controlled production, not on modest scope.',
    },
    {
      id: 'mf-urban-farming-03',
      statement: 'links gardening with reducing misuse of abandoned spaces',
      answer: 'C',
      explanation:
        'Vacant Lot Alliance turns neglected lots into gardens and argues this reduces illegal dumping and improves care for unsafe spaces.',
      trap:
        'The word community appears in several projects, but abandoned land and dumping point to the vacant lot model.',
    },
    {
      id: 'mf-urban-farming-04',
      statement: 'depends on controlled conditions to make harvests less vulnerable to weather',
      answer: 'D',
      explanation:
        'Metroponics Lab grows plants under controlled light and nutrient conditions, making harvests less affected by weather.',
      trap:
        'Raised beds and soil measurements appear in the school network, but weather protection is tied to indoor hydroponics.',
    },
    {
      id: 'mf-urban-farming-05',
      statement: 'tries to avoid competition for land at street level',
      answer: 'A',
      explanation:
        'Green Roof Collective uses flat commercial roofs and says this avoids competing for street-level land.',
      trap:
        'Vacant Lot Alliance uses ground-level land, but the statement is about avoiding that competition.',
    },
    {
      id: 'mf-urban-farming-06',
      statement: 'requires agreements before transforming the spaces it uses',
      answer: 'C',
      explanation:
        'Vacant Lot Alliance negotiates temporary use agreements with property owners before turning neglected lots into gardens.',
      trap:
        'Commercial rooftops also imply access, but the text explicitly mentions negotiated temporary agreements only for vacant lots.',
    },
    {
      id: 'mf-urban-farming-07',
      statement: 'is criticized because its method may need significant technical support',
      answer: 'D',
      explanation:
        'Critics of Metroponics Lab point out that indoor hydroponic systems require energy and technical maintenance.',
      trap:
        'Do not match criticism in general; the technical-maintenance criticism belongs to the hydroponic model.',
    },
  ],
};

export const IELTS_MATCHING_FEATURES_PASSAGES: MatchingFeaturesPassage[] = [
  IELTS_MATCHING_FEATURES_PASSAGE,
  {
    id: 'mf-memory-research',
    title: 'Matching Features practice: memory research',
    instructions:
      'Match each statement with the correct researcher or study group. Features may be used more than once, and some may not be used.',
    passageTitle: 'Different approaches to studying memory',
    passage: `Memory researchers do not all study the same problem. Some focus on how memories are formed, others on why they become distorted, and others on how memory can be supported in daily life. In IELTS Matching Features, the task is to connect each claim with the correct researcher, group or experiment.

Dr. Helen Ward studied how people remember directions after walking through unfamiliar buildings. Her team found that participants remembered routes better when they paused at decision points and described what they expected to see next. Ward argued that active prediction helps people build a stronger mental map than simply following signs.

The Moreno Lab investigated false memories in group settings. Participants first watched a short event and then discussed it with another person who had been given slightly different details. The lab found that people often adopted details they had only heard during discussion, especially when the other speaker sounded confident.

Professor Kenji Sato focused on memory aids for older adults. Rather than testing complex digital systems, his project used simple visual routines: a tray by the door for keys, coloured stickers on medication boxes and a checklist beside the kettle. Sato argued that successful aids reduce the need to remember at the exact moment of action.

Another project, the Sleep Recall Study, examined the effect of rest on learning vocabulary. Students who reviewed new words shortly before sleep and again the next morning remembered more than those who completed both reviews during the afternoon. The researchers suggested that sleep may help stabilize recently learned material.

Finally, the Open Notes Group studied students who were allowed to bring notes into low-stakes quizzes. The group did not find that notes made students lazy. Instead, students with well-organized notes tended to review more actively before class because they wanted their notes to be usable under time pressure.`,
    features: [
      {
        id: 'A',
        label: 'Dr. Helen Ward',
        description: 'Route memory and active prediction in unfamiliar buildings.',
      },
      {
        id: 'B',
        label: 'Moreno Lab',
        description: 'False memories created through group discussion.',
      },
      {
        id: 'C',
        label: 'Professor Kenji Sato',
        description: 'Simple daily-life memory aids for older adults.',
      },
      {
        id: 'D',
        label: 'Sleep Recall Study',
        description: 'Vocabulary review before and after sleep.',
      },
      {
        id: 'E',
        label: 'Open Notes Group',
        description: 'Student notes and low-stakes quizzes.',
      },
    ],
    questions: [
      {
        id: 'mf-memory-01',
        statement: 'found that confident social input can make people accept details they did not originally see',
        answer: 'B',
        explanation:
          'The Moreno Lab found that people adopted details heard during discussion, especially when the other speaker sounded confident.',
        trap:
          'This is not about classroom notes or prediction; the signal is discussion introducing new details.',
      },
      {
        id: 'mf-memory-02',
        statement: 'used ordinary household cues rather than advanced technology',
        answer: 'C',
        explanation:
          'Professor Kenji Sato used trays, stickers and checklists instead of complex digital systems.',
        trap:
          'Daily-life support points to Sato, not the Open Notes Group, which studied students.',
      },
      {
        id: 'mf-memory-03',
        statement: 'argued that pausing to anticipate the next location improves recall',
        answer: 'A',
        explanation:
          'Ward argued that active prediction at decision points helps people build a stronger mental map.',
        trap:
          'The task mentions buildings and routes, but the key claim is active prediction.',
      },
      {
        id: 'mf-memory-04',
        statement: 'linked better recall with review timing around sleep',
        answer: 'D',
        explanation:
          'The Sleep Recall Study found stronger vocabulary memory when review happened before sleep and again the next morning.',
        trap:
          'Vocabulary learning is the context; the feature is the sleep-related study.',
      },
      {
        id: 'mf-memory-05',
        statement: 'suggested that allowing a support tool may encourage more active preparation',
        answer: 'E',
        explanation:
          'The Open Notes Group found that students with organized notes reviewed more actively before class.',
        trap:
          'Memory aids appear in Sato, but the support tool here is notes for quizzes.',
      },
      {
        id: 'mf-memory-06',
        statement: 'studied how people remember routes through indoor spaces',
        answer: 'A',
        explanation:
          'Dr. Helen Ward studied route memory after participants walked through unfamiliar buildings.',
        trap:
          'Do not choose Sato because his study involves everyday places; this statement is about route learning.',
      },
    ],
  },
  {
    id: 'mf-transport-policies',
    title: 'Matching Features practice: transport policies',
    instructions:
      'Match each statement with the correct city policy. Features may be used more than once, and some may not be used.',
    passageTitle: 'City transport policies with different goals',
    passage: `Cities often introduce transport policies for different reasons. Some aim to reduce emissions, while others focus on safety, access or travel reliability. Matching Features questions test whether you can identify which policy is linked to a particular goal, limitation or result.

The Rivergate Bus Priority Plan gave buses dedicated lanes on three crowded corridors. City officials reported that average bus journey times fell, but shop owners complained that loading spaces became harder to access. The plan was therefore adjusted to allow deliveries during early morning windows.

In Northbridge, the Safe Streets Programme lowered speed limits around schools and redesigned several crossings. The programme did not greatly change total traffic volume, but hospital data showed fewer serious injuries among pedestrians and cyclists in the treated areas.

The Metro Card Integration Project combined train, bus and shared-bike payment into one account. It was designed for convenience, especially for passengers who used more than one mode in a single journey. Critics noted that the project helped smartphone users first, while cash users had to wait for a later phase.

The Hillside Electric Fleet Trial replaced a small number of diesel municipal vehicles with electric vans. The trial reduced fuel use in city departments, but managers said the charging schedule had to be planned carefully because some vehicles returned late from maintenance jobs.

The East Market Pedestrian Zone closed several streets to private cars at weekends. Restaurants welcomed the extra outdoor seating, but taxi drivers argued that older residents had longer walks from drop-off points. After public meetings, the city added a small accessible shuttle around the zone.`,
    features: [
      {
        id: 'A',
        label: 'Rivergate Bus Priority Plan',
        description: 'Dedicated lanes for buses and adjusted delivery windows.',
      },
      {
        id: 'B',
        label: 'Northbridge Safe Streets Programme',
        description: 'Lower speeds and redesigned crossings near schools.',
      },
      {
        id: 'C',
        label: 'Metro Card Integration Project',
        description: 'Combined payment for train, bus and shared bikes.',
      },
      {
        id: 'D',
        label: 'Hillside Electric Fleet Trial',
        description: 'Electric vans used by municipal departments.',
      },
      {
        id: 'E',
        label: 'East Market Pedestrian Zone',
        description: 'Weekend car restrictions and pedestrian access changes.',
      },
    ],
    questions: [
      {
        id: 'mf-transport-01',
        statement: 'improved travel time for one public transport mode but created a problem for deliveries',
        answer: 'A',
        explanation:
          'Rivergate bus lanes reduced bus journey times, while shop owners complained about loading access.',
        trap:
          'Do not choose the pedestrian zone just because it affected access; this statement mentions bus travel time and deliveries.',
      },
      {
        id: 'mf-transport-02',
        statement: 'was associated with fewer severe injuries without greatly reducing traffic volume',
        answer: 'B',
        explanation:
          'Northbridge lowered speeds and redesigned crossings; hospital data showed fewer serious injuries even though traffic volume did not greatly change.',
        trap:
          'Safety is the signal, not emissions or payment convenience.',
      },
      {
        id: 'mf-transport-03',
        statement: 'initially benefited users of one technology more than people paying another way',
        answer: 'C',
        explanation:
          'The Metro Card Integration Project helped smartphone users first while cash users waited for a later phase.',
        trap:
          'Several policies had critics, but smartphone versus cash points to payment integration.',
      },
      {
        id: 'mf-transport-04',
        statement: 'required careful planning because vehicles might return late from work tasks',
        answer: 'D',
        explanation:
          'The Hillside electric vans needed careful charging schedules because some returned late from maintenance jobs.',
        trap:
          'This is not about ordinary traffic delays; the signal is charging and municipal vehicles.',
      },
      {
        id: 'mf-transport-05',
        statement: 'added a new service after concerns about access for older residents',
        answer: 'E',
        explanation:
          'East Market added an accessible shuttle after taxi drivers raised concerns about longer walks for older residents.',
        trap:
          'Access appears in Rivergate too, but older residents and shuttle identify East Market.',
      },
      {
        id: 'mf-transport-06',
        statement: 'was designed to help passengers combine several modes in one trip',
        answer: 'C',
        explanation:
          'The Metro Card Integration Project combined payment across train, bus and shared bikes for multimodal journeys.',
        trap:
          'Bus lanes involve one mode; the statement asks about combining several modes.',
      },
    ],
  },
];

export const IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGE: MatchingSentenceEndingsPassage = {
  id: 'mse-microclimates',
  title: 'Matching Sentence Endings practice: urban microclimates',
  instructions:
    'Complete each sentence by choosing the correct ending. There are more endings than sentence starts, so some endings will not be used.',
  passageTitle: 'How small design choices change city heat',
  passage: `People often think of urban heat as a city-wide problem, but temperatures can vary sharply from one block to the next. This local variation is known as a microclimate. It is shaped by materials, shade, wind movement and the amount of heat released by vehicles and buildings. Two streets in the same district may therefore feel very different on a summer afternoon.

Surface material is one major factor. Dark asphalt absorbs more solar energy than lighter paving, and it releases stored heat slowly after sunset. This is why some cities are testing pale road coatings and reflective roof materials. These changes do not cool an entire city immediately, but they can reduce the heat stored in specific surfaces.

Shade also matters, though its benefits depend on placement. A tree beside a wide pavement may protect pedestrians at midday, while a tree planted too far from the walking route may have little practical effect. Building overhangs, awnings and transit shelters can provide similar relief when they are designed around the times when people actually use the space.

Wind is more complicated. Tall buildings can block cooling breezes, but they can also channel air through narrow corridors. Urban designers sometimes model airflow before approving large developments because a new tower may improve comfort in one street while making another feel stagnant. For this reason, wind solutions are rarely universal.

Finally, microclimate planning only works when it is connected to daily behavior. A cool plaza is less useful if it is far from bus stops, shops or schools. Small interventions are most effective when they appear along ordinary routes, where people are already walking, waiting or gathering.`,
  endingOptions: [
    { id: 'A', text: 'because the same district can contain very different local conditions.' },
    { id: 'B', text: 'because they stop all heat from entering the city.' },
    { id: 'C', text: 'by lowering the amount of heat stored in particular materials.' },
    { id: 'D', text: 'only when they are placed where and when pedestrians need protection.' },
    { id: 'E', text: 'although the effect of new buildings on air movement can vary by location.' },
    { id: 'F', text: 'if it is located away from the places people normally use.' },
    { id: 'G', text: 'because reflective roofs always perform better than shade trees.' },
    { id: 'H', text: 'when they are added to routes people already use in daily life.' },
  ],
  questions: [
    {
      id: 'mse-microclimates-01',
      sentenceStart: 'Urban heat should not be treated only as a city-wide issue',
      answer: 'A',
      explanation:
        'The first paragraph says temperatures can vary sharply from one block to the next, so local conditions matter inside the same district.',
      trap:
        'Do not choose an ending about one design solution; this sentence start refers to the general idea of microclimates.',
    },
    {
      id: 'mse-microclimates-02',
      sentenceStart: 'Pale road coatings and reflective roof materials may help',
      answer: 'C',
      explanation:
        'The passage says these changes can reduce the heat stored in specific surfaces, not cool the whole city immediately.',
      trap:
        'Ending B is too absolute. The text rejects immediate city-wide cooling.',
    },
    {
      id: 'mse-microclimates-03',
      sentenceStart: 'Shade structures are most useful',
      answer: 'D',
      explanation:
        'The shade paragraph says relief depends on placement and on the times when people actually use the space.',
      trap:
        'Shade is not automatically useful; the sentence must preserve the condition about placement and timing.',
    },
    {
      id: 'mse-microclimates-04',
      sentenceStart: 'Airflow modelling is important before large developments',
      answer: 'E',
      explanation:
        'The passage explains that a tower may improve comfort in one street while making another feel stagnant.',
      trap:
        'Universal wind solutions are rejected, so the ending must include variation by location.',
    },
    {
      id: 'mse-microclimates-05',
      sentenceStart: 'A cool public space may have limited value',
      answer: 'F',
      explanation:
        'The final paragraph says a cool plaza is less useful if it is far from bus stops, shops or schools.',
      trap:
        'This is about usefulness and location, not the technical cooling method used in the plaza.',
    },
    {
      id: 'mse-microclimates-06',
      sentenceStart: 'Small microclimate interventions work best',
      answer: 'H',
      explanation:
        'The passage says small interventions are most effective along ordinary routes where people already walk, wait or gather.',
      trap:
        'Ending F is grammatically possible but negative; this sentence asks for the positive condition for effectiveness.',
    },
  ],
};

export const IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES: MatchingSentenceEndingsPassage[] = [
  IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGE,
  {
    id: 'mse-food-waste',
    title: 'Matching Sentence Endings practice: reducing food waste',
    instructions:
      'Complete each sentence by choosing the correct ending. There are more endings than sentence starts, so some endings will not be used.',
    passageTitle: 'Why food waste policies need more than one solution',
    passage: `Food waste is often described as a problem of careless consumers, but waste occurs at several points before food reaches a plate. Farmers may leave produce unharvested when market prices fall below picking costs. Supermarkets may reject fruit and vegetables because their shape or size does not match retail standards. Restaurants may prepare more food than customers order in order to avoid running out during busy periods.

One response is to improve forecasting. Some grocery chains now use local sales data, weather patterns and holiday schedules to predict demand more accurately. Better forecasting does not remove waste entirely, but it can reduce the amount of fresh food ordered shortly before demand drops.

Another approach is to change how imperfect produce is presented. When stores sell unusual-looking vegetables in a separate discount bin, shoppers may treat them as inferior. However, when the same produce is included in normal displays with simple recipe suggestions, customers are more likely to accept it as ordinary food rather than a special problem category.

Food donation programmes can also help, but they require careful timing. A restaurant cannot simply call a charity after food has already become unsafe. Effective programmes use clear collection windows and packaging routines so that surplus meals can move quickly to community kitchens.

Finally, some cities have introduced household food-scrap collection. Composting does not prevent waste at the source, but it can reduce the environmental impact of food that cannot be eaten. For this reason, waste specialists usually treat composting as a last step, not as a substitute for buying and preparing food more carefully.`,
    endingOptions: [
      { id: 'A', text: 'because waste can begin before consumers make any decision.' },
      { id: 'B', text: 'by making short-term demand estimates more accurate.' },
      { id: 'C', text: 'only when imperfect produce is separated from all other food.' },
      { id: 'D', text: 'when it is treated as normal food and linked to practical cooking ideas.' },
      { id: 'E', text: 'unless surplus food is moved while it is still safe to use.' },
      { id: 'F', text: 'because composting prevents supermarkets from ordering too much food.' },
      { id: 'G', text: 'as a final option for food that cannot realistically be eaten.' },
      { id: 'H', text: 'because demand during busy periods can be uncertain.' },
    ],
    questions: [
      {
        id: 'mse-food-waste-01',
        sentenceStart: 'Food waste should not be blamed only on careless consumers',
        answer: 'A',
        explanation:
          'The opening paragraph explains that waste can occur at farms, supermarkets and restaurants before consumers choose anything.',
        trap:
          'Do not choose a restaurant-only ending. The start asks about the whole food system, not one source of waste.',
      },
      {
        id: 'mse-food-waste-02',
        sentenceStart: 'Forecasting systems can reduce waste',
        answer: 'B',
        explanation:
          'The passage says sales data, weather and holidays help stores predict demand more accurately and avoid ordering too much fresh food.',
        trap:
          'The text says forecasting reduces waste but does not remove it entirely, so avoid absolute endings.',
      },
      {
        id: 'mse-food-waste-03',
        sentenceStart: 'Imperfect produce may sell better',
        answer: 'D',
        explanation:
          'Customers are more likely to accept unusual-looking produce when it appears in normal displays with recipe suggestions.',
        trap:
          'Ending C reverses the evidence. Separate discount bins may make shoppers treat the produce as inferior.',
      },
      {
        id: 'mse-food-waste-04',
        sentenceStart: 'Food donation programmes are useful',
        answer: 'E',
        explanation:
          'The donation paragraph says programmes need clear timing because food must reach charities before it becomes unsafe.',
        trap:
          'Donation is not simply about having surplus food; timing and safety are the controlling ideas.',
      },
      {
        id: 'mse-food-waste-05',
        sentenceStart: 'Household composting is best understood',
        answer: 'G',
        explanation:
          'The final paragraph presents composting as a last step for food that cannot be eaten, not as prevention.',
        trap:
          'Ending F incorrectly says composting prevents ordering problems at supermarkets.',
      },
      {
        id: 'mse-food-waste-06',
        sentenceStart: 'Restaurants may produce surplus meals',
        answer: 'H',
        explanation:
          'The opening paragraph says restaurants may prepare extra food to avoid running out during busy periods, which implies uncertain demand.',
        trap:
          'Do not turn this into a claim that restaurants know demand exactly. The evidence points to uncertainty and overpreparation.',
      },
    ],
  },
  {
    id: 'mse-coastal-libraries',
    title: 'Matching Sentence Endings practice: coastal libraries',
    instructions:
      'Complete each sentence by choosing the correct ending. There are more endings than sentence starts, so some endings will not be used.',
    passageTitle: 'Libraries as climate information hubs',
    passage: `In several coastal towns, public libraries have begun to play a role in climate adaptation. Their traditional function has not disappeared: they still lend books, provide internet access and host reading groups. However, because libraries are familiar, free and open for long hours, some local councils now use them as places where residents can find practical information about flooding, insurance and emergency planning.

One advantage is trust. Residents may ignore technical reports from distant agencies, but they often know library staff personally. When staff receive training from emergency planners, they can guide visitors toward reliable resources without pretending to be engineers or legal advisers.

Libraries can also make risk maps easier to understand. A printed map showing future flood zones may look alarming or abstract. Some libraries therefore run small workshops where residents compare official maps with photographs of streets they know. This helps people connect regional projections with everyday landmarks.

The most successful programmes do not rely only on one-way information. In Harbor Point, library visitors were invited to mark places where drains blocked after heavy rain. The council later used these observations to prioritize maintenance visits. The process showed that residents could provide useful local evidence, not just receive instructions.

There are limits, however. Libraries cannot replace evacuation systems, flood barriers or housing policy. Their value is greatest when they connect people to services and help communities interpret information before an emergency, rather than trying to manage the emergency itself.`,
    endingOptions: [
      { id: 'A', text: 'because they are familiar public spaces with broad local access.' },
      { id: 'B', text: 'without claiming to replace technical or legal experts.' },
      { id: 'C', text: 'by linking official projections to places residents recognize.' },
      { id: 'D', text: 'only when residents stop using them for books and internet access.' },
      { id: 'E', text: 'when local observations are treated as evidence for maintenance decisions.' },
      { id: 'F', text: 'because they can replace flood barriers during severe storms.' },
      { id: 'G', text: 'before a crisis by helping people understand and reach relevant services.' },
      { id: 'H', text: 'because they cannot replace formal protection systems.' },
    ],
    questions: [
      {
        id: 'mse-libraries-01',
        sentenceStart: 'Libraries can support climate adaptation',
        answer: 'A',
        explanation:
          'The first paragraph says councils use libraries because they are familiar, free and open for long hours.',
        trap:
          'Ending D is wrong because traditional library functions have not disappeared.',
      },
      {
        id: 'mse-libraries-02',
        sentenceStart: 'Trained library staff can guide residents',
        answer: 'B',
        explanation:
          'The passage says trained staff guide visitors toward reliable resources without pretending to be engineers or legal advisers.',
        trap:
          'Do not choose H. The passage supports training; it does not warn councils against it.',
      },
      {
        id: 'mse-libraries-03',
        sentenceStart: 'Map workshops become useful',
        answer: 'C',
        explanation:
          'Residents compare official maps with photographs of familiar streets, connecting projections with everyday landmarks.',
        trap:
          'The key is interpretation of maps, not one-way distribution of reports.',
      },
      {
        id: 'mse-libraries-04',
        sentenceStart: 'The Harbor Point programme showed that residents helped planning',
        answer: 'E',
        explanation:
          'Residents marked blocked drains, and the council used those observations to prioritize maintenance visits.',
        trap:
          'The answer depends on local observations becoming evidence, not on residents simply attending workshops.',
      },
      {
        id: 'mse-libraries-05',
        sentenceStart: 'Libraries have the greatest value',
        answer: 'G',
        explanation:
          'The final paragraph says libraries are most valuable before an emergency when they connect people to services and help interpret information.',
        trap:
          'Ending F is too strong and contradicts the limits described in the final paragraph.',
      },
      {
        id: 'mse-libraries-06',
        sentenceStart: 'Libraries should not be expected to manage emergencies alone',
        answer: 'H',
        explanation:
          'The final paragraph says libraries cannot replace evacuation systems, flood barriers or housing policy.',
        trap:
          'Ending G describes the positive role before a crisis; this start asks about the limit on what libraries can replace.',
      },
    ],
  },
];

export const IELTS_DIAGRAM_LABELING_PASSAGE: DiagramLabelingPassage = {
  id: 'dl-rain-garden',
  title: 'How a rain garden filters street runoff',
  wordLimit: 'NO MORE THAN TWO WORDS',
  diagramTitle: 'Rain garden filtration sequence',
  passage: `Rain gardens are shallow planted areas designed to collect water from roofs, pavements or roads after heavy rain. Instead of sending all runoff directly into storm drains, a rain garden slows the flow and allows some water to soak into the ground. This can reduce local flooding and limit the amount of oil, metal particles and fertilizer that reaches streams.

The first part of a rain garden is usually an inlet, such as a curb opening or a stone channel, that guides runoff into the planted basin. Designers often place flat stones near this entry point because fast-moving water can otherwise wash soil away. The stones spread the flow and protect the surface.

Once water enters the basin, it passes through a layer of mulch. This layer traps leaves and larger particles while also helping the soil remain moist between storms. Beneath it is a sandy soil mix. The sand creates small spaces that allow water to move downward, while compost in the mix supports plant growth and helps hold some pollutants.

At the lowest part of the system, plant roots and soil organisms continue the filtering process. Deep-rooted native plants are especially useful because their roots keep channels open in the soil. If the garden receives more water than it can absorb, an overflow pipe sends the excess to the drainage system after the first flush has been filtered.`,
  stages: [
    {
      id: 'A',
      label: 'Inlet',
      description: 'Runoff enters from a curb opening or channel.',
    },
    {
      id: 'B',
      label: 'Surface protection',
      description: 'Flat stones slow fast water and protect the soil.',
    },
    {
      id: 'C',
      label: 'Organic layer',
      description: 'The upper layer catches leaves and larger material.',
    },
    {
      id: 'D',
      label: 'Soil mix',
      description: 'Water moves downward through a sandy growing medium.',
    },
    {
      id: 'E',
      label: 'Plant roots',
      description: 'Roots and organisms keep filtering water below the surface.',
    },
    {
      id: 'F',
      label: 'Overflow',
      description: 'Extra water leaves safely when the basin is full.',
    },
  ],
  questions: [
    {
      id: 'dl-rain-01',
      stageId: 'A',
      before: 'Runoff enters through a',
      after: 'or stone channel.',
      answer: 'curb opening',
      explanation:
        'The passage says the inlet may be a curb opening or a stone channel that guides runoff into the basin.',
      hint: 'Look in the paragraph that explains the first part of the garden.',
    },
    {
      id: 'dl-rain-02',
      stageId: 'B',
      before: 'Flat stones prevent water from washing away',
      after: '.',
      answer: 'soil',
      explanation:
        'The text says fast-moving water can wash soil away, so stones protect the surface.',
      hint: 'The answer is one word immediately after the verb phrase "wash ... away".',
    },
    {
      id: 'dl-rain-03',
      stageId: 'C',
      before: 'The mulch layer traps leaves and',
      after: '.',
      answer: 'larger particles',
      explanation:
        'The passage states that mulch traps leaves and larger particles before water moves lower.',
      hint: 'Find what the upper layer catches besides leaves.',
    },
    {
      id: 'dl-rain-04',
      stageId: 'D',
      before: 'The soil mix contains sand and',
      after: 'to support plants and hold pollutants.',
      answer: 'compost',
      explanation:
        'Compost is named as the part of the mix that supports plant growth and helps hold pollutants.',
      hint: 'This word appears in the same sentence as sand.',
    },
    {
      id: 'dl-rain-05',
      stageId: 'E',
      before: 'Deep-rooted',
      after: 'keep channels open in the soil.',
      answer: 'native plants',
      explanation:
        'The passage says deep-rooted native plants are useful because their roots keep channels open.',
      hint: 'The answer is the noun phrase after "deep-rooted".',
    },
    {
      id: 'dl-rain-06',
      stageId: 'F',
      before: 'Excess water leaves through an',
      after: '.',
      answer: 'overflow pipe',
      explanation:
        'The final sentence explains that an overflow pipe sends excess water to the drainage system.',
      hint: 'Look at what happens if the garden receives more water than it can absorb.',
    },
  ],
};

export const IELTS_DIAGRAM_LABELING_PASSAGES: DiagramLabelingPassage[] = [
  IELTS_DIAGRAM_LABELING_PASSAGE,
  {
    id: 'dl-greenhouse-ventilation',
    title: 'How a greenhouse ventilation system works',
    wordLimit: 'NO MORE THAN TWO WORDS',
    diagramTitle: 'Greenhouse air-flow diagram',
    passage: `A simple greenhouse ventilation system controls temperature by moving warm air out and drawing cooler air in. The structure traps sunlight during the day, which warms the soil, benches and plant leaves. Without ventilation, this heat can build up quickly and damage young plants.

Cooler air usually enters through low side vents. These vents are placed near the base of the greenhouse because incoming air should pass across the lower growing area before rising. Some growers fit insect mesh over the openings so that air can enter while pests are kept outside.

As the air warms, it becomes lighter and moves upward. Roof vents or ridge openings allow this warm air to escape. Automatic vent arms may open these vents when the internal temperature rises, using wax cylinders that expand with heat. This means the system can respond even when no worker is present.

Air movement is improved when shade cloth is used correctly. Shade cloth reduces the intensity of direct sunlight but should not block the roof vents. In larger greenhouses, fans may be added near the ridge to pull warm air out faster. The aim is not to create a cold space, but to keep the temperature stable enough for steady plant growth.`,
    stages: [
      {
        id: 'A',
        label: 'Low side vents',
        description: 'Cooler air enters near the base of the greenhouse.',
      },
      {
        id: 'B',
        label: 'Pest barrier',
        description: 'A covering allows air through while blocking insects.',
      },
      {
        id: 'C',
        label: 'Growing area',
        description: 'Incoming air moves across the lower plant zone.',
      },
      {
        id: 'D',
        label: 'Roof exit',
        description: 'Warm air leaves through openings high in the structure.',
      },
      {
        id: 'E',
        label: 'Automatic arm',
        description: 'A heat-sensitive device opens vents as temperature rises.',
      },
      {
        id: 'F',
        label: 'Assisted extraction',
        description: 'Mechanical support can remove warm air more quickly.',
      },
    ],
    questions: [
      {
        id: 'dl-greenhouse-01',
        stageId: 'A',
        before: 'Cooler air enters through low',
        after: '.',
        answer: 'side vents',
        explanation:
          'The passage says cooler air usually enters through low side vents.',
        hint: 'Look at the first sentence of the paragraph about incoming air.',
      },
      {
        id: 'dl-greenhouse-02',
        stageId: 'B',
        before: 'The openings may be covered with insect',
        after: '.',
        answer: 'mesh',
        explanation:
          'Growers fit insect mesh over the openings so air can enter while pests stay out.',
        hint: 'Find the material placed over the openings.',
      },
      {
        id: 'dl-greenhouse-03',
        stageId: 'C',
        before: 'Incoming air passes across the lower',
        after: '.',
        answer: 'growing area',
        explanation:
          'The passage says incoming air should pass across the lower growing area before rising.',
        hint: 'Look for the phrase after "lower" in paragraph 2.',
      },
      {
        id: 'dl-greenhouse-04',
        stageId: 'D',
        before: 'Warm air escapes through roof vents or',
        after: '.',
        answer: 'ridge openings',
        explanation:
          'Paragraph 3 says roof vents or ridge openings allow warm air to escape.',
        hint: 'Find the second type of high opening.',
      },
      {
        id: 'dl-greenhouse-05',
        stageId: 'E',
        before: 'Automatic arms may use',
        after: 'that expand with heat.',
        answer: 'wax cylinders',
        explanation:
          'Automatic vent arms may open with wax cylinders that expand with heat.',
        hint: 'Look for the heat-sensitive part in paragraph 3.',
      },
      {
        id: 'dl-greenhouse-06',
        stageId: 'F',
        before: 'Larger greenhouses may use',
        after: 'near the ridge.',
        answer: 'fans',
        explanation:
          'The final paragraph says fans may be added near the ridge to pull warm air out faster.',
        hint: 'Find the mechanical support used in larger greenhouses.',
      },
    ],
  },
  {
    id: 'dl-hand-pump',
    title: 'How a hand pump lifts water',
    wordLimit: 'NO MORE THAN TWO WORDS',
    diagramTitle: 'Hand pump mechanism',
    passage: `A hand pump lifts water by creating changes in pressure inside a vertical pipe. When the handle is pushed down, a rod inside the pump moves upward. This rod is connected to a piston that fits closely inside the cylinder. The movement of the piston creates a low-pressure space above the water in the pipe.

At the bottom of the pump, a foot valve controls the entry of water from the well. The valve opens when pressure inside the pipe falls, allowing water to rise into the cylinder. When the handle moves back up and the piston travels downward, the foot valve closes so that water does not fall back into the well.

A second valve is built into the piston. During the downward stroke, this piston valve opens and lets water pass through the piston to the space above it. During the next upward stroke, the valve closes, and the piston pushes the trapped water higher.

After several strokes, water reaches the outlet spout. The spout directs water into a bucket or channel. A leather seal around the piston helps maintain pressure by reducing leaks between the piston and cylinder wall. If the seal dries out or cracks, the pump may move but lift very little water.`,
    stages: [
      {
        id: 'A',
        label: 'Handle',
        description: 'The user moves this part to drive the mechanism.',
      },
      {
        id: 'B',
        label: 'Rod',
        description: 'This link transfers motion from the handle to the piston.',
      },
      {
        id: 'C',
        label: 'Piston',
        description: 'This part moves inside the cylinder and changes pressure.',
      },
      {
        id: 'D',
        label: 'Foot valve',
        description: 'This lower valve controls water entering from the well.',
      },
      {
        id: 'E',
        label: 'Piston valve',
        description: 'This valve allows water through the moving piston.',
      },
      {
        id: 'F',
        label: 'Outlet',
        description: 'This upper part directs lifted water out of the pump.',
      },
    ],
    questions: [
      {
        id: 'dl-hand-pump-01',
        stageId: 'A',
        before: 'Pushing down the',
        after: 'moves the rod upward.',
        answer: 'handle',
        explanation:
          'The passage says that when the handle is pushed down, a rod inside the pump moves upward.',
        hint: 'Find the part pushed down by the user.',
      },
      {
        id: 'dl-hand-pump-02',
        stageId: 'B',
        before: 'The rod is connected to a',
        after: 'inside the cylinder.',
        answer: 'piston',
        explanation:
          'The rod is connected to a piston that fits closely inside the cylinder.',
        hint: 'Look at the sentence after the rod is mentioned.',
      },
      {
        id: 'dl-hand-pump-03',
        stageId: 'C',
        before: 'The piston creates a low-pressure',
        after: 'above the water.',
        answer: 'space',
        explanation:
          'The passage says piston movement creates a low-pressure space above the water in the pipe.',
        hint: 'Find the noun after low-pressure.',
      },
      {
        id: 'dl-hand-pump-04',
        stageId: 'D',
        before: 'The lower valve is called the',
        after: '.',
        answer: 'foot valve',
        explanation:
          'Paragraph 2 identifies the valve at the bottom of the pump as a foot valve.',
        hint: 'Look at the first sentence of paragraph 2.',
      },
      {
        id: 'dl-hand-pump-05',
        stageId: 'E',
        before: 'During the downward stroke, the piston valve',
        after: '.',
        answer: 'opens',
        explanation:
          'Paragraph 3 says the piston valve opens during the downward stroke.',
        hint: 'Find what the piston valve does during the downward stroke.',
      },
      {
        id: 'dl-hand-pump-06',
        stageId: 'F',
        before: 'Water leaves through the outlet',
        after: '.',
        answer: 'spout',
        explanation:
          'The final paragraph says water reaches the outlet spout.',
        hint: 'Find the noun that follows outlet near the end.',
      },
    ],
  },
];

export const IELTS_MULTIPLE_CHOICE_PASSAGE: MultipleChoicePassage = {
  id: 'mc-sleep-learning',
  title: 'Sleep and learning',
  passage: `For decades, sleep was viewed mainly as a period of rest. Researchers now argue that sleep is an active state in which the brain reorganizes information gathered during the day. In particular, slow-wave sleep appears to support the consolidation of factual knowledge, while rapid eye movement sleep may help integrate emotional experiences and creative associations.

One study asked participants to learn pairs of unrelated words in the evening. Some participants slept before being tested, while others stayed awake for the same number of hours. The group that slept remembered more pairs the next morning, especially when their sleep included longer periods of slow-wave activity. However, the researchers warned that sleep does not replace active study; it seems to strengthen material that has already been learned with attention.

The timing of sleep may also matter. Students often stay awake late before an exam, believing that additional review will compensate for fatigue. Yet several experiments suggest that sacrificing sleep can reduce attention, working memory and the ability to apply knowledge flexibly. In other words, an extra hour of tired study may be less useful than an hour of sleep after focused preparation.

This does not mean that every learner needs the same schedule. Age, stress, health and daily routines influence sleep patterns. The practical lesson is more modest: learners should treat sleep as part of the learning process rather than as time stolen from it.`,
  questions: [
    {
      id: 'mc-sleep-01',
      question: 'What is the main purpose of the first paragraph?',
      options: [
        'To argue that sleep is less important than researchers once believed',
        'To introduce a newer view of sleep as an active cognitive process',
        'To compare several medical treatments for sleep problems',
        'To explain why emotional experiences are easier to remember than facts',
      ],
      answer: 1,
      explanation:
        'The paragraph contrasts the older view of sleep as rest with the newer view that sleep actively reorganizes information.',
      skill: 'purpose',
      trap: 'Options with facts and emotions mention real words from the paragraph, but they do not capture its function.',
    },
    {
      id: 'mc-sleep-02',
      question: 'According to the passage, what did the word-pair study suggest?',
      options: [
        'Participants who slept remembered more word pairs than those who stayed awake',
        'Participants learned best when they studied without paying close attention',
        'Rapid eye movement sleep was the only factor that improved factual memory',
        'Sleep helped participants learn material they had never studied',
      ],
      answer: 0,
      explanation:
        'The text states that the group that slept remembered more pairs the next morning.',
      skill: 'detail',
      trap: 'The passage says sleep strengthens material already learned with attention, not material never studied.',
    },
    {
      id: 'mc-sleep-03',
      question: 'The author mentions students staying awake late before an exam in order to',
      options: [
        'show that exam preparation is impossible without late-night study',
        'criticize all forms of review before an important test',
        'illustrate a common belief that may conflict with research on sleep',
        'prove that students need identical sleep schedules',
      ],
      answer: 2,
      explanation:
        'The example introduces the belief that extra review compensates for fatigue, which the following sentence challenges.',
      skill: 'rhetorical purpose',
      trap: 'The author does not reject review itself; the issue is sacrificing sleep.',
    },
    {
      id: 'mc-sleep-04',
      question: 'Which statement best reflects the author’s conclusion?',
      options: [
        'Students should follow one universal sleep schedule',
        'Sleep should be considered one part of effective learning',
        'Creative thinking only improves during rapid eye movement sleep',
        'Studying is unnecessary if learners sleep for enough hours',
      ],
      answer: 1,
      explanation:
        'The final sentence says learners should treat sleep as part of the learning process.',
      skill: 'main idea',
      trap: 'The author’s conclusion is modest; options with only, universal or unnecessary are too extreme.',
    },
    {
      id: 'mc-sleep-05',
      question: 'The phrase "time stolen from it" in the final paragraph refers to time taken away from',
      options: ['health', 'active study', 'daily routines', 'emotional experiences'],
      answer: 1,
      explanation:
        'The contrast is between sleep and learning/study time. The author argues sleep should not be seen as time stolen from learning.',
      skill: 'vocabulary in context',
      trap: 'Health and routines are nearby concepts, but the phrase points to learning time.',
    },
    {
      id: 'mc-sleep-06',
      question: 'Which of the following can be inferred from the passage?',
      options: [
        'A tired learner may study longer but use the time less effectively',
        'Slow-wave sleep prevents all forms of exam anxiety',
        'People who sleep more always remember everything they study',
        'Researchers have stopped studying rapid eye movement sleep',
      ],
      answer: 0,
      explanation:
        'The passage says sacrificing sleep can reduce attention and working memory, so tired study may be less useful.',
      skill: 'inference',
      trap: 'Always and all make claims much stronger than the evidence.',
    },
  ],
};

export const IELTS_MULTIPLE_CHOICE_PASSAGES: MultipleChoicePassage[] = [
  IELTS_MULTIPLE_CHOICE_PASSAGE,
  {
    id: 'mc-river-restoration',
    title: 'River restoration in industrial towns',
    passage: `Many industrial towns were built around rivers that provided transport, water and power. Over time, however, those same rivers were narrowed, straightened or hidden behind warehouses. In recent years, some councils have begun to restore urban rivers, arguing that a visible waterway can improve public space as well as wildlife habitat.

Restoration does not usually mean returning a river to a completely natural condition. In a dense town, flood walls, bridges and underground pipes still shape what is possible. The aim is often more practical: to soften hard banks, create shallow planted edges and give floodwater somewhere safer to spread during storms.

One project in Millgate replaced a concrete channel with a wider river corridor. Within two years, surveys recorded more insects and small fish, while residents reported using the nearby path more often. Yet the project also required regular maintenance. Without removing litter and controlling invasive plants, the new habitat could quickly lose some of its value.

Businesses sometimes worry that river restoration will reduce parking or delivery access. Those concerns should not be dismissed, but the strongest schemes involve local firms early rather than treating them as obstacles. In Millgate, loading bays were moved rather than removed, and several cafes later used the river path to attract customers.

Urban river restoration is therefore neither a simple beautification project nor a purely ecological one. Its success depends on whether engineers, residents and businesses can share the same narrow strip of land without asking the river to solve every urban problem.`,
    questions: [
      {
        id: 'mc-river-01',
        question: 'What is the main purpose of the first paragraph?',
        options: [
          'To explain why industrial towns no longer need rivers',
          'To introduce a change in how some towns view their rivers',
          'To argue that warehouses should be built closer to waterways',
          'To compare river transport with modern road transport',
        ],
        answer: 1,
        explanation:
          'The paragraph moves from rivers as industrial infrastructure to councils restoring them as public and ecological spaces.',
        skill: 'purpose',
        trap: 'Warehouses and transport are historical context, not the main function of the paragraph.',
      },
      {
        id: 'mc-river-02',
        question: 'According to the passage, urban river restoration usually aims to',
        options: [
          'remove every bridge and pipe near the water',
          'return rivers to a completely natural state',
          'make practical improvements within urban limits',
          'prevent all future flooding in nearby streets',
        ],
        answer: 2,
        explanation:
          'The text says restoration rarely returns a river to a natural condition; it makes practical changes such as softer banks and safer floodwater areas.',
        skill: 'detail',
        trap: 'Completely, every and all are stronger than the evidence in the passage.',
      },
      {
        id: 'mc-river-03',
        question: 'The Millgate example is used mainly to show that',
        options: [
          'river projects can bring benefits but still need ongoing care',
          'wildlife always returns without human maintenance',
          'residents prefer concrete channels to planted paths',
          'river restoration prevents businesses from operating',
        ],
        answer: 0,
        explanation:
          'Millgate recorded ecological and public-use benefits, but the passage stresses litter removal and invasive-plant control.',
        skill: 'rhetorical purpose',
        trap: 'The example is balanced; it is not a claim that restoration is maintenance-free.',
      },
      {
        id: 'mc-river-04',
        question: 'What can be inferred about local businesses in successful restoration schemes?',
        options: [
          'They must give up all delivery access',
          'They are more likely to cooperate when included early',
          'They always oppose ecological improvements',
          'They benefit only if parking spaces are increased',
        ],
        answer: 1,
        explanation:
          'The passage says strong schemes involve firms early, and in Millgate loading bays were moved rather than removed.',
        skill: 'inference',
        trap: 'The text recognizes concerns but does not present businesses as automatic opponents.',
      },
      {
        id: 'mc-river-05',
        question: 'The phrase "same narrow strip of land" refers to',
        options: [
          'the area where different urban needs meet around the river',
          'a path used only by cafes and cyclists',
          'the underground pipe network beneath Millgate',
          'a parking zone that should be removed permanently',
        ],
        answer: 0,
        explanation:
          'The final sentence refers to engineers, residents, businesses and the river sharing limited urban space.',
        skill: 'vocabulary in context',
        trap: 'The phrase is conceptual and spatial; it is not only about one path, pipe or parking area.',
      },
      {
        id: 'mc-river-06',
        question: 'Which statement best reflects the author’s conclusion?',
        options: [
          'River restoration succeeds only when ecological goals replace all business needs',
          'Urban rivers should be hidden again when maintenance becomes expensive',
          'Restoration requires balancing public, ecological and practical demands',
          'Beautification is the only realistic goal for industrial rivers',
        ],
        answer: 2,
        explanation:
          'The final paragraph says restoration is not simply beautification or ecology; success depends on shared practical use of limited land.',
        skill: 'main idea',
        trap: 'Options that make one goal dominate the others miss the author’s balanced conclusion.',
      },
    ],
  },
  {
    id: 'mc-digital-notes',
    title: 'Digital notes and memory',
    passage: `Students often assume that digital note-taking is automatically more efficient than writing by hand. Laptops and tablets make it easy to store, search and reorganize large amounts of information. They also reduce the chance of losing a notebook. These advantages are real, but they do not guarantee better learning.

The key issue is how notes are created. When students type quickly, they may copy a lecturer's words almost exactly. This can produce a detailed record, but it may require little processing at the moment of listening. By contrast, slower note-taking often forces students to select, shorten and connect ideas, which can support understanding.

Some educators therefore recommend handwritten notes for conceptual subjects. That recommendation is useful, but it can be too simple. A tablet with a stylus may encourage the same selection and diagramming as paper, while a paper notebook used for copying sentences may be no better than a laptop. The tool matters less than the thinking it encourages.

Digital systems can be especially helpful after class. Search functions allow students to locate examples quickly, and linked folders can connect lecture notes with readings, practice questions and feedback. However, a searchable archive is not the same as revision. Students still need to test themselves, reorganize ideas and notice what they cannot yet explain.

The most sensible approach is not to choose a permanent winner between paper and screens. Learners should ask which method helps them transform information while taking notes and retrieve it actively afterwards.`,
    questions: [
      {
        id: 'mc-notes-01',
        question: 'What is the author’s main point in the first paragraph?',
        options: [
          'Digital notes have practical advantages but do not automatically improve learning',
          'Paper notebooks are safer than laptops and tablets',
          'Students should stop storing information digitally',
          'Searching notes is the only reliable way to study',
        ],
        answer: 0,
        explanation:
          'The paragraph lists real advantages of digital notes but ends by saying they do not guarantee better learning.',
        skill: 'main idea',
        trap: 'The author does not deny digital advantages; the warning is about automatic learning gains.',
      },
      {
        id: 'mc-notes-02',
        question: 'Why can fast typing be a problem during lectures?',
        options: [
          'It always produces inaccurate records',
          'It may encourage copying without much processing',
          'It prevents students from storing large amounts of information',
          'It makes students select too few details from the lecture',
        ],
        answer: 1,
        explanation:
          'The passage says fast typing can lead students to copy words almost exactly, requiring little processing while listening.',
        skill: 'detail',
        trap: 'The problem is not storage or accuracy; it is shallow processing.',
      },
      {
        id: 'mc-notes-03',
        question: 'The tablet-with-stylus example is used to show that',
        options: [
          'all tablets are better than paper notebooks',
          'the learning value depends on the kind of thinking a tool supports',
          'handwriting is impossible on digital devices',
          'students should use diagrams instead of words in every subject',
        ],
        answer: 1,
        explanation:
          'The author says a stylus can encourage selection and diagramming, so the tool matters less than the thinking it encourages.',
        skill: 'rhetorical purpose',
        trap: 'The example complicates a simple paper-versus-digital rule; it does not declare a universal winner.',
      },
      {
        id: 'mc-notes-04',
        question: 'What does the author imply about a searchable archive?',
        options: [
          'It is useful, but it cannot replace active revision',
          'It makes self-testing unnecessary',
          'It works only for students who write by hand',
          'It prevents students from connecting notes with readings',
        ],
        answer: 0,
        explanation:
          'The passage says search functions help after class but a searchable archive is not the same as revision.',
        skill: 'inference',
        trap: 'The author supports search as a tool, not as a substitute for testing and reorganizing ideas.',
      },
      {
        id: 'mc-notes-05',
        question: 'In the final paragraph, the phrase "permanent winner" refers to',
        options: [
          'a student who receives the highest mark in a class',
          'one note-taking method being treated as best in all situations',
          'a folder that stores notes without being deleted',
          'a lecturer whose words are copied exactly',
        ],
        answer: 1,
        explanation:
          'The final paragraph rejects choosing paper or screens as a universal winner for every learner and situation.',
        skill: 'vocabulary in context',
        trap: 'Winner is metaphorical here; it is about methods, not students or lecturers.',
      },
      {
        id: 'mc-notes-06',
        question: 'Which recommendation best matches the author’s conclusion?',
        options: [
          'Use only handwritten notes for every conceptual subject',
          'Use only digital notes because they are searchable',
          'Choose a method based on processing during class and active retrieval after class',
          'Copy as much information as possible before deciding what it means',
        ],
        answer: 2,
        explanation:
          'The conclusion says learners should ask which method helps transform information while taking notes and retrieve it actively afterwards.',
        skill: 'main idea',
        trap: 'The author avoids one-size-fits-all rules and rejects copying as the main goal.',
      },
    ],
  },
];

export const IELTS_SUMMARY_COMPLETION_PASSAGE: SummaryCompletionPassage = {
  id: 'summary-urban-farms',
  title: 'Rooftop farms in modern cities',
  wordLimit: 'NO MORE THAN TWO WORDS',
  passage: `Rooftop farming has become more visible in several large cities, especially where unused roof space is common. Supporters argue that these projects can shorten food supply chains and make residents more aware of seasonal produce. A small farm on top of a supermarket or apartment building cannot feed an entire city, but it can supply herbs, salad leaves and some vegetables to nearby customers.

The environmental benefits depend on design. Lightweight soil systems and careful irrigation can reduce the strain on older buildings, while rainwater collection may lower the demand for treated water. Some rooftop farms also improve insulation, keeping buildings cooler in summer and slightly warmer in winter. However, these advantages are limited if the farm requires frequent deliveries of heavy materials or uses energy-intensive equipment.

Rooftop farms often have a social function as well. Schools use them for science lessons, restaurants invite customers to see where ingredients are grown, and community groups organize volunteer sessions. These activities can make urban agriculture visible and educational, even when the total harvest is modest.

The main barrier is not always technology. Building permissions, safety rules and maintenance costs can slow projects before the first seeds are planted. For this reason, successful rooftop farms usually begin with a realistic plan: engineers check the roof, growers choose suitable crops and managers decide who will care for the site throughout the year.`,
  summaryIntro:
    'Complete the summary below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  questions: [
    {
      id: 'summary-urban-farms-01',
      before: 'Rooftop farming is increasingly visible in cities where there is unused ',
      after: '.',
      answer: 'roof space',
      explanation:
        'The first sentence says rooftop farming is visible where unused roof space is common.',
      hint: 'Look at the first sentence and copy the noun phrase after unused.',
    },
    {
      id: 'summary-urban-farms-02',
      before: 'These farms may shorten food ',
      after: ' and help residents notice seasonal produce.',
      answer: 'supply chains',
      explanation:
        'The passage says supporters argue the projects can shorten food supply chains.',
      hint: 'The summary uses may for can, but the noun phrase stays the same.',
    },
    {
      id: 'summary-urban-farms-03',
      before: 'Careful irrigation and lightweight soil systems can reduce pressure on ',
      after: '.',
      answer: 'older buildings',
      explanation:
        'The second paragraph says these systems can reduce the strain on older buildings.',
      hint: 'Pressure is a paraphrase of strain.',
    },
    {
      id: 'summary-urban-farms-04',
      before: 'Rainwater collection can reduce demand for ',
      after: '.',
      answer: 'treated water',
      explanation:
        'The passage states that rainwater collection may lower the demand for treated water.',
      hint: 'The answer is the object after demand for.',
    },
    {
      id: 'summary-urban-farms-05',
      before: 'Some projects have an educational role because schools use them for ',
      after: '.',
      answer: 'science lessons',
      explanation:
        'The third paragraph gives schools using rooftop farms for science lessons as an example of social function.',
      hint: 'Find the example involving schools.',
    },
    {
      id: 'summary-urban-farms-06',
      before: 'Before planting, successful projects often require engineers to check the ',
      after: '.',
      answer: 'roof',
      alternatives: ['the roof'],
      explanation:
        'The final sentence says engineers check the roof before growers choose crops and managers assign care.',
      hint: 'The answer is a single noun near the end of the passage.',
    },
  ],
};

export const IELTS_SUMMARY_COMPLETION_PASSAGES: SummaryCompletionPassage[] = [
  IELTS_SUMMARY_COMPLETION_PASSAGE,
  {
    id: 'summary-repair-cafes',
    title: 'Community repair cafes',
    wordLimit: 'NO MORE THAN TWO WORDS',
    passage: `Repair cafes began as informal meetings where residents brought broken household objects and learned how to fix them with help from experienced volunteers. The idea has spread because many items that appear useless need only a loose wire, a missing button or a simple replacement part. Organisers usually ask visitors to stay with the repair instead of leaving the object behind, so the event becomes a lesson rather than a free service.

The most successful cafes prepare carefully before each session. Volunteers sort tools, check whether common spare parts are available and decide which repairs are too risky to attempt in a public space. Electrical devices, for example, may be inspected only by people with relevant training. This protects visitors and prevents the cafe from promising results it cannot safely deliver.

Supporters often describe repair cafes as environmental projects, but their social benefits are just as important. Older residents can share practical knowledge, students gain confidence with unfamiliar tools and neighbours who rarely meet have a reason to talk. Even when an object cannot be fixed, visitors often leave understanding why it failed and how future purchases might be chosen more carefully.

Some councils now support repair cafes because they reduce waste and encourage local cooperation. However, organisers warn that the model depends on trust. If sessions become too commercial or if volunteers are pressured to work quickly, the educational atmosphere disappears. For this reason, many cafes limit the number of objects accepted each day and keep the focus on shared problem solving.`,
    summaryIntro:
      'Complete the summary below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'summary-repair-cafes-01',
        before: 'Repair cafes help residents fix broken ',
        after: ' with support from volunteers.',
        answer: 'household objects',
        explanation:
          'The first sentence says residents brought broken household objects and received help from experienced volunteers.',
        hint: 'Look for what residents bring to the cafe.',
      },
      {
        id: 'summary-repair-cafes-02',
        before: 'Visitors are usually asked to stay during the repair so the activity becomes a ',
        after: ' instead of only a service.',
        answer: 'lesson',
        explanation:
          'The passage says organisers ask visitors to stay so the event becomes a lesson rather than a free service.',
        hint: 'The answer contrasts with free service in paragraph 1.',
      },
      {
        id: 'summary-repair-cafes-03',
        before: 'Before a session, volunteers check whether common ',
        after: ' are available.',
        answer: 'spare parts',
        explanation:
          'Paragraph 2 states that volunteers check whether common spare parts are available.',
        hint: 'Find the preparation step between sorting tools and deciding risky repairs.',
      },
      {
        id: 'summary-repair-cafes-04',
        before: 'Electrical items should be inspected by people with relevant ',
        after: '.',
        answer: 'training',
        explanation:
          'The passage says electrical devices may be inspected only by people with relevant training.',
        hint: 'The missing word follows relevant in paragraph 2.',
      },
      {
        id: 'summary-repair-cafes-05',
        before: 'Students may develop ',
        after: ' when they use unfamiliar tools.',
        answer: 'confidence',
        explanation:
          'Paragraph 3 says students gain confidence with unfamiliar tools.',
        hint: 'The summary changes gain to develop.',
      },
      {
        id: 'summary-repair-cafes-06',
        before: 'Many cafes protect the educational mood by focusing on shared ',
        after: '.',
        answer: 'problem solving',
        explanation:
          'The final sentence says many cafes keep the focus on shared problem solving.',
        hint: 'Look at the last sentence of the passage.',
      },
    ],
  },
  {
    id: 'summary-shade-mapping',
    title: 'Mapping shade in hot cities',
    wordLimit: 'NO MORE THAN TWO WORDS',
    passage: `As heatwaves become more common, some cities are mapping shade with the same care once reserved for traffic or drainage. The work begins with satellite images, but planners also send teams into streets to record how buildings, trees and bus shelters affect the experience of walking at different times of day. A route that appears short on a map may feel much longer if it exposes pedestrians to direct sun for several blocks.

Shade maps are especially useful when they are combined with social data. Older residents, outdoor workers and children may face higher heat exposure, while people without cars depend more heavily on walking routes and public transport stops. By comparing shade with these daily movements, planners can identify places where a small intervention would help many people.

The interventions are not limited to planting trees. Trees provide long-term cooling, but they need space, water and years of growth. In narrow streets, temporary canopies, reflective surfaces or redesigned waiting areas may work faster. Some cities test these ideas before making permanent changes, using portable sensors to measure air temperature and surface heat.

Researchers warn that shade mapping should not become a decorative exercise. A beautiful map is useful only if it changes budgets, maintenance schedules and building rules. The best projects therefore connect data collection with cooling plans that specify who will act, where the money will come from and how residents will report gaps after the first improvements are installed.`,
    summaryIntro:
      'Complete the summary below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'summary-shade-mapping-01',
        before: 'Cities are mapping shade as ',
        after: ' become increasingly frequent.',
        answer: 'heatwaves',
        explanation:
          'The opening clause says heatwaves are becoming more common, which the summary paraphrases as increasingly frequent.',
        hint: 'Find the reason given at the start of the passage.',
      },
      {
        id: 'summary-shade-mapping-02',
        before: 'The process starts with ',
        after: ', but teams also collect information on streets.',
        answer: 'satellite images',
        explanation:
          'The passage says the work begins with satellite images before planners send teams into streets.',
        hint: 'The answer is the tool mentioned before street teams.',
      },
      {
        id: 'summary-shade-mapping-03',
        before: 'A short route may feel longer if pedestrians are exposed to ',
        after: ' for several blocks.',
        answer: 'direct sun',
        explanation:
          'Paragraph 1 says a route may feel much longer if it exposes pedestrians to direct sun for several blocks.',
        hint: 'Look at the final sentence of paragraph 1.',
      },
      {
        id: 'summary-shade-mapping-04',
        before: 'Planners compare shade with daily movements to find places where a small ',
        after: ' could help many people.',
        answer: 'intervention',
        explanation:
          'Paragraph 2 says planners can identify places where a small intervention would help many people.',
        hint: 'The missing noun appears after small in paragraph 2.',
      },
      {
        id: 'summary-shade-mapping-05',
        before: 'In narrow streets, temporary ',
        after: ' may cool people faster than trees.',
        answer: 'canopies',
        explanation:
          'The passage lists temporary canopies as a faster option in narrow streets.',
        hint: 'Choose the first fast alternative mentioned after narrow streets.',
      },
      {
        id: 'summary-shade-mapping-06',
        before: 'Useful projects connect data collection with ',
        after: ' that identify action, funding and feedback.',
        answer: 'cooling plans',
        explanation:
          'The final sentence says the best projects connect data collection with cooling plans that specify action, money and reporting gaps.',
        hint: 'Look at the noun phrase after "connect data collection with".',
      },
    ],
  },
];

export const IELTS_NOTE_COMPLETION_PASSAGE: NoteCompletionPassage = {
  id: 'note-mobile-libraries',
  title: 'Mobile libraries and community reading',
  wordLimit: 'NO MORE THAN TWO WORDS',
  maxWords: 2,
  passageTitle: 'Mobile libraries and community reading',
  passage: `In several rural regions, mobile libraries have become a practical way to keep reading services available when permanent branches are too expensive to maintain. Instead of asking residents to travel long distances, vans carry books, magazines and digital materials to schools, markets and community halls on a regular schedule.

The service is most useful when it responds to local routines. In farming areas, visits are often arranged after market days, when families are already near a central meeting place. In coastal towns, the schedule may avoid early mornings because many adults are working at sea. Librarians say that a predictable timetable matters as much as the size of the collection because people need to know when the service will arrive.

Mobile libraries also support learners who cannot easily use online resources. Some vans include tablets and a small satellite connection, but the aim is not to replace printed books. Staff use the connection to help residents download forms, search for courses or contact public offices. For children, the most popular activities are still story sessions and reading games led by visiting librarians.

The main challenge is long-term funding. Fuel, vehicle repairs and trained staff all create costs that may rise faster than local budgets. Successful programmes therefore build partnerships with schools, health centres and volunteer groups. These partners share spaces, announce visits and help identify families who would benefit from extra support.`,
  notesTitle: 'Notes: mobile library services',
  instructions:
    'Complete the notes below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  noteGroups: [
    {
      heading: 'Purpose and delivery',
      items: [
        {
          id: 'note-mobile-libraries-01',
          before: 'Used where permanent branches are too ',
          after: ' to maintain.',
          answer: 'expensive',
          explanation:
            'The first sentence says permanent branches are too expensive to maintain in some rural regions.',
          hint: 'Find the adjective before "to maintain" in paragraph 1.',
        },
        {
          id: 'note-mobile-libraries-02',
          before: 'Vans take reading materials to schools, markets and ',
          after: '.',
          answer: 'community halls',
          explanation:
            'Paragraph 1 lists schools, markets and community halls as places where vans deliver materials.',
          hint: 'Look for the third place in the list of destinations.',
        },
      ],
    },
    {
      heading: 'Planning around routines',
      items: [
        {
          id: 'note-mobile-libraries-03',
          before: 'In farming areas, visits may happen after ',
          after: '.',
          answer: 'market days',
          explanation:
            'The second paragraph says visits are often arranged after market days in farming areas.',
          hint: 'The answer follows "after" in the farming example.',
        },
        {
          id: 'note-mobile-libraries-04',
          before: 'A predictable ',
          after: ' can be as important as collection size.',
          answer: 'timetable',
          explanation:
            'The passage states that a predictable timetable matters as much as the size of the collection.',
          hint: 'Find the noun after "predictable" in paragraph 2.',
        },
      ],
    },
    {
      heading: 'Support and sustainability',
      items: [
        {
          id: 'note-mobile-libraries-05',
          before: 'Staff may help residents search for courses or contact ',
          after: '.',
          answer: 'public offices',
          explanation:
            'Paragraph 3 says staff help residents download forms, search for courses or contact public offices.',
          hint: 'Look near "search for courses" and copy the noun phrase after contact.',
        },
        {
          id: 'note-mobile-libraries-06',
          before: 'Programmes often need partnerships with schools, health centres and ',
          after: '.',
          answer: 'volunteer groups',
          explanation:
            'The final paragraph says successful programmes build partnerships with schools, health centres and volunteer groups.',
          hint: 'The answer is the third partner in the final paragraph.',
        },
      ],
    },
  ],
};

export const IELTS_NOTE_COMPLETION_PASSAGES: NoteCompletionPassage[] = [
  IELTS_NOTE_COMPLETION_PASSAGE,
  {
    id: 'note-seed-banks',
    title: 'Community seed banks',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Community seed banks',
    passage: `Community seed banks are local collections of seeds that farmers can borrow, grow and return after harvest. They are different from large national seed stores because they focus on varieties used in a particular valley, island or farming region. Many of these varieties have been selected over generations for taste, drought tolerance or resistance to local pests.

The first task in a seed bank is documentation. Volunteers record the name of each seed, the place where it was collected and the conditions in which it usually grows well. This information matters because a seed is not useful if farmers do not know when to plant it or how it behaves in poor soil. Some banks also photograph plants at different stages so younger farmers can identify them correctly.

Storage is another challenge. Seeds must be kept dry, cool and protected from insects. In humid regions, simple clay jars or sealed glass containers may work better than expensive equipment if they are checked regularly. Bank managers also test older seeds by planting a small sample; if too few germinate, the variety must be multiplied before the supply disappears.

Seed banks often become educational centres. Farmers compare harvest results, school groups learn why crop diversity matters and cooks demonstrate recipes using less common grains or beans. The goal is not to reject modern agriculture, but to keep local options available when weather, markets or disease make a single commercial crop risky.`,
    notesTitle: 'Notes: community seed banks',
    instructions:
      'Complete the notes below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    noteGroups: [
      {
        heading: 'Purpose and local value',
        items: [
          {
            id: 'note-seed-banks-01',
            before: 'Farmers can borrow seeds and return them after ',
            after: '.',
            answer: 'harvest',
            explanation:
              'The first sentence says farmers can borrow, grow and return seeds after harvest.',
            hint: 'Look at the first sentence and copy the time after return.',
          },
          {
            id: 'note-seed-banks-02',
            before: 'Local varieties may resist pests or tolerate ',
            after: '.',
            answer: 'drought',
            explanation:
              'Paragraph 1 says varieties have been selected for taste, drought tolerance or resistance to local pests.',
            hint: 'Find the list of traits selected over generations.',
          },
        ],
      },
      {
        heading: 'Documentation',
        items: [
          {
            id: 'note-seed-banks-03',
            before: 'Volunteers record each seed name, collection place and growing ',
            after: '.',
            answer: 'conditions',
            explanation:
              'Paragraph 2 says volunteers record the conditions in which each seed usually grows well.',
            hint: 'The answer is the noun after growing in the documentation paragraph.',
          },
          {
            id: 'note-seed-banks-04',
            before: 'Photos can help younger farmers ',
            after: ' plants correctly.',
            answer: 'identify',
            explanation:
              'The passage says some banks photograph plants so younger farmers can identify them correctly.',
            hint: 'Copy the verb before "them correctly".',
          },
        ],
      },
      {
        heading: 'Storage and education',
        items: [
          {
            id: 'note-seed-banks-05',
            before: 'Seeds need protection from insects and should be kept dry and ',
            after: '.',
            answer: 'cool',
            explanation:
              'Paragraph 3 says seeds must be kept dry, cool and protected from insects.',
            hint: 'Find the two adjectives before protected from insects.',
          },
          {
            id: 'note-seed-banks-06',
            before: 'Cooks may show recipes using less common grains or ',
            after: '.',
            answer: 'beans',
            explanation:
              'The final paragraph mentions recipes using less common grains or beans.',
            hint: 'Look at the cooking example near the end.',
          },
        ],
      },
    ],
  },
  {
    id: 'note-night-libraries',
    title: 'Night study spaces in public libraries',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Night study spaces in public libraries',
    passage: `Some public libraries have begun opening selected rooms in the evening for students who do not have quiet places to work at home. These night study spaces are not the same as full library service. In many cases, visitors can use desks, power sockets and wireless internet, but borrowing counters, children's areas and archives remain closed.

Libraries usually start with a pilot programme before extending evening access. Staff count how many people arrive, which hours are busiest and whether extra security is needed near entrances. The data helps managers decide if the service should run during exam periods only or throughout the year. A small pilot also reveals practical issues, such as poor lighting outside the building or a shortage of cleaning staff after closing time.

Design choices affect whether night study spaces feel safe and productive. Clear signs reduce confusion about which areas are open, while glass walls allow staff to monitor rooms without interrupting students. Some libraries create silent zones and discussion zones so groups preparing presentations do not disturb people reading alone.

The policy has limits. Younger students may need parental permission, and libraries must decide how to respond if visitors use the space mainly for socialising. Supporters argue that these problems can be managed with simple rules, booking systems and cooperation with nearby schools. When the rules are clear, night access can turn an underused building into a valuable study option.`,
    notesTitle: 'Notes: night study spaces',
    instructions:
      'Complete the notes below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    noteGroups: [
      {
        heading: 'Service offered',
        items: [
          {
            id: 'note-night-libraries-01',
            before: 'Evening rooms support students without quiet places to work at ',
            after: '.',
            answer: 'home',
            explanation:
              'The first sentence says the rooms serve students who do not have quiet places to work at home.',
            hint: 'Find the location at the end of the first sentence.',
          },
          {
            id: 'note-night-libraries-02',
            before: 'Visitors may use desks, power sockets and ',
            after: '.',
            answer: 'wireless internet',
            explanation:
              'Paragraph 1 lists desks, power sockets and wireless internet as available resources.',
            hint: 'Copy the third item in the list of resources.',
          },
        ],
      },
      {
        heading: 'Pilot programme',
        items: [
          {
            id: 'note-night-libraries-03',
            before: 'Staff check whether extra ',
            after: ' is required near entrances.',
            answer: 'security',
            explanation:
              'Paragraph 2 says staff assess whether extra security is needed near entrances.',
            hint: 'The answer follows extra in the pilot paragraph.',
          },
          {
            id: 'note-night-libraries-04',
            before: 'The trial can reveal poor lighting outside the ',
            after: '.',
            answer: 'building',
            explanation:
              'The passage gives poor lighting outside the building as a practical issue revealed by a pilot.',
            hint: 'Look at the practical issues in the final sentence of paragraph 2.',
          },
        ],
      },
      {
        heading: 'Design and rules',
        items: [
          {
            id: 'note-night-libraries-05',
            before: 'Clear signs show which ',
            after: ' are open.',
            answer: 'areas',
            explanation:
              'Paragraph 3 says clear signs reduce confusion about which areas are open.',
            hint: 'Copy the noun after which in the signage sentence.',
          },
          {
            id: 'note-night-libraries-06',
            before: 'Some younger visitors may need parental ',
            after: '.',
            answer: 'permission',
            explanation:
              'The final paragraph says younger students may need parental permission.',
            hint: 'Find the limit involving younger students.',
          },
        ],
      },
    ],
  },
];

export const IELTS_TABLE_COMPLETION_PASSAGE: TableCompletionPassage = {
  id: 'table-cooling-buildings',
  title: 'Passive cooling in public buildings',
  wordLimit: 'NO MORE THAN TWO WORDS',
  maxWords: 2,
  passageTitle: 'Passive cooling in public buildings',
  passage: `Public buildings in warm regions are increasingly being designed to reduce the need for mechanical air conditioning. Architects call these methods passive cooling because they lower indoor temperatures without relying mainly on powered machines. The approach is not new: older houses in many climates used courtyards, thick walls and shaded openings long before electric cooling became common.

One method is cross-ventilation. When windows or vents are placed on opposite sides of a room, moving air can carry heat away from occupants and surfaces. This works best when designers study the direction of prevailing winds before deciding where openings should go. If the openings face the wrong direction, the room may still feel still and humid.

Another method is thermal mass. Materials such as stone, concrete and brick can absorb heat during the day and release it slowly at night. In schools and libraries, this can make indoor temperatures more stable, especially where nights are cooler than afternoons. However, thermal mass is less useful if the building cannot release stored heat after sunset.

Shading is also important. Deep roof edges, external screens and trees can block direct sunlight before it reaches windows. External shade is usually more effective than curtains because it stops heat before it enters the glass. The best shading design depends on the sun's angle, which changes with season and time of day.

Passive cooling is not a complete replacement for all mechanical systems. Hospitals, laboratories and data rooms may still need precise temperature control. But in many public buildings, passive methods can reduce energy demand and make indoor spaces more comfortable during ordinary use.`,
  instructions:
    'Complete the table below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  tableTitle: 'Passive cooling methods',
  columns: ['Method', 'How it works', 'Important condition or limitation'],
  rows: [
    {
      id: 'table-cooling-01',
      cells: [
        { type: 'text', text: 'Cross-ventilation' },
        {
          type: 'blank',
          before: 'Moving air carries ',
          after: ' away from people and surfaces.',
          answer: 'heat',
          explanation:
            'Paragraph 2 says moving air can carry heat away from occupants and surfaces.',
          hint: 'Look for the object after "carry" in the cross-ventilation paragraph.',
        },
        {
          type: 'blank',
          before: 'Designers should study ',
          after: ' before placing openings.',
          answer: 'prevailing winds',
          explanation:
            'The passage says cross-ventilation works best when designers study the direction of prevailing winds.',
          hint: 'Find what designers study before deciding where openings should go.',
        },
      ],
    },
    {
      id: 'table-cooling-02',
      cells: [
        { type: 'text', text: 'Thermal mass' },
        {
          type: 'blank',
          before: 'Stone, concrete and brick absorb heat during the ',
          after: '.',
          answer: 'day',
          explanation:
            'Paragraph 3 says these materials can absorb heat during the day and release it slowly at night.',
          hint: 'The answer is the time period paired with "at night".',
        },
        {
          type: 'blank',
          before: 'It is less useful if stored heat cannot be released after ',
          after: '.',
          answer: 'sunset',
          explanation:
            'The paragraph states that thermal mass is less useful if the building cannot release stored heat after sunset.',
          hint: 'Find the limitation in the last sentence of the thermal mass paragraph.',
        },
      ],
    },
    {
      id: 'table-cooling-03',
      cells: [
        { type: 'text', text: 'Shading' },
        {
          type: 'blank',
          before: 'External shade stops heat before it enters the ',
          after: '.',
          answer: 'glass',
          explanation:
            'Paragraph 4 explains that external shade stops heat before it enters the glass.',
          hint: 'Look for the comparison between external shade and curtains.',
        },
        {
          type: 'blank',
          before: "Good design depends on the sun's ",
          after: '.',
          answer: 'angle',
          explanation:
            "The passage says the best shading design depends on the sun's angle.",
          hint: 'The answer follows "sun\'s" in the final sentence of paragraph 4.',
        },
      ],
    },
  ],
};

export const IELTS_TABLE_COMPLETION_PASSAGES: TableCompletionPassage[] = [
  IELTS_TABLE_COMPLETION_PASSAGE,
  {
    id: 'table-rain-gardens',
    title: 'Rain gardens in school grounds',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Rain gardens in school grounds',
    passage: `Rain gardens are shallow planted areas designed to collect water after heavy rainfall. Instead of sending all runoff into drains at once, the garden holds water temporarily and lets it soak slowly into the soil. Schools are starting to install them because playgrounds and car parks often create large amounts of surface water during storms.

The first design decision is location. A rain garden should sit below the area it drains, but it must not be placed where water already remains for days. If the soil is permanently wet, plant roots may rot and the garden will not absorb new water effectively. Designers also keep rain gardens away from building foundations so that water does not increase damp problems.

Plant choice matters as much as shape. Deep-rooted native plants are often recommended because they tolerate both wet and dry periods and help open channels in the soil. Decorative annual flowers may look attractive, but they usually need more maintenance and may not survive sudden flooding.

Schools often use rain gardens as outdoor classrooms. Students can measure rainfall, observe insects and compare how quickly different surfaces dry after a storm. Maintenance remains important: leaves must be cleared from inlet points, and litter should be removed before it blocks the flow of water. A well-managed rain garden reduces runoff while making drainage visible to students.`,
    instructions:
      'Complete the table below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    tableTitle: 'Rain garden design and use',
    columns: ['Feature', 'Reason or benefit', 'Condition or warning'],
    rows: [
      {
        id: 'table-rain-gardens-01',
        cells: [
          { type: 'text', text: 'Water management' },
          {
            type: 'blank',
            before: 'The garden holds water ',
            after: ' after heavy rain.',
            answer: 'temporarily',
            explanation:
              'Paragraph 1 explains that the garden holds water temporarily before it soaks into the soil.',
            hint: 'Find the adverb that describes how long the garden holds water.',
          },
          {
            type: 'blank',
            before: 'It helps avoid sending all runoff into ',
            after: ' immediately.',
            answer: 'drains',
            explanation:
              'The passage says rain gardens avoid sending all runoff into drains at once.',
            hint: 'Look for where runoff would otherwise go.',
          },
        ],
      },
      {
        id: 'table-rain-gardens-02',
        cells: [
          { type: 'text', text: 'Location' },
          {
            type: 'blank',
            before: 'The garden should sit below the area it ',
            after: '.',
            answer: 'drains',
            explanation:
              'Paragraph 2 states that a rain garden should sit below the area it drains.',
            hint: 'Copy the verb at the end of the location rule.',
          },
          {
            type: 'blank',
            before: 'Avoid soil that is permanently ',
            after: '.',
            answer: 'wet',
            explanation:
              'The passage warns that permanently wet soil can make roots rot and reduce absorption.',
            hint: 'Find the adjective after permanently.',
          },
        ],
      },
      {
        id: 'table-rain-gardens-03',
        cells: [
          { type: 'text', text: 'Planting and maintenance' },
          {
            type: 'blank',
            before: 'Deep-rooted native plants open channels in the ',
            after: '.',
            answer: 'soil',
            explanation:
              'Paragraph 3 says deep-rooted native plants help open channels in the soil.',
            hint: 'Look at the benefit of deep-rooted native plants.',
          },
          {
            type: 'blank',
            before: 'Leaves should be cleared from ',
            after: ' points.',
            answer: 'inlet',
            explanation:
              'The final paragraph says leaves must be cleared from inlet points.',
            hint: 'Find what kind of points leaves must be cleared from.',
          },
        ],
      },
    ],
  },
  {
    id: 'table-museum-inventory',
    title: 'Digitising small museum collections',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Digitising small museum collections',
    passage: `Small museums often hold objects that are valuable to local communities but poorly documented. A drawer may contain old tools, letters or photographs with little more than a handwritten label. Digitising the collection does not simply mean taking pictures. Staff must create records that explain what each object is, where it came from and why it matters.

The first stage is identification. Curators check existing labels, interview donors and compare objects with catalogues from similar collections. When information is uncertain, the record should say so clearly rather than presenting a guess as fact. This honesty is useful for future researchers who may later add better evidence.

Photography comes next, but it requires consistency. Objects should be photographed against a plain background, with a scale marker when size is important. Reflective objects may need side lighting to avoid glare, while fragile paper should be supported so it does not tear during handling.

Digital records also need storage rules. File names should be stable, backups should be kept in more than one place and access permissions must be agreed before sensitive material is shared online. Volunteers can help with scanning and transcription, but a trained staff member should review records before publication. Without review, spelling errors or missing dates can spread quickly through the public catalogue.`,
    instructions:
      'Complete the table below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    tableTitle: 'Digitising a small museum collection',
    columns: ['Stage', 'Main action', 'Risk or quality control'],
    rows: [
      {
        id: 'table-museum-inventory-01',
        cells: [
          { type: 'text', text: 'Creating records' },
          {
            type: 'blank',
            before: 'Records explain what an object is and where it ',
            after: ' from.',
            answer: 'came',
            explanation:
              'Paragraph 1 says records explain what each object is, where it came from and why it matters.',
            hint: 'Find the verb in the phrase "where it ___ from".',
          },
          {
            type: 'blank',
            before: 'A photo alone is not enough because digitising is more than taking ',
            after: '.',
            answer: 'pictures',
            explanation:
              'The first paragraph says digitising does not simply mean taking pictures.',
            hint: 'Look at what digitising does not simply mean.',
          },
        ],
      },
      {
        id: 'table-museum-inventory-02',
        cells: [
          { type: 'text', text: 'Identification' },
          {
            type: 'blank',
            before: 'Curators may interview ',
            after: ' to check object history.',
            answer: 'donors',
            explanation:
              'Paragraph 2 lists interviewing donors as one way curators identify objects.',
            hint: 'Find the people interviewed during identification.',
          },
          {
            type: 'blank',
            before: 'Uncertain information should not be presented as ',
            after: '.',
            answer: 'fact',
            explanation:
              'The passage warns against presenting a guess as fact when information is uncertain.',
            hint: 'Look for the contrast between guess and the correct record status.',
          },
        ],
      },
      {
        id: 'table-museum-inventory-03',
        cells: [
          { type: 'text', text: 'Photography and storage' },
          {
            type: 'blank',
            before: 'A scale marker helps when ',
            after: ' is important.',
            answer: 'size',
            explanation:
              'Paragraph 3 says a scale marker is needed when size is important.',
            hint: 'Copy the noun after "when" in the scale marker sentence.',
          },
          {
            type: 'blank',
            before: 'A trained staff member should review records before ',
            after: '.',
            answer: 'publication',
            explanation:
              'The final paragraph says a trained staff member should review records before publication.',
            hint: 'Look at the final quality-control rule.',
          },
        ],
      },
    ],
  },
];

export const IELTS_FLOW_CHART_COMPLETION_PASSAGE: FlowChartCompletionPassage = {
  id: 'flow-recycling-textiles',
  title: 'Recycling cotton textiles',
  wordLimit: 'NO MORE THAN TWO WORDS',
  maxWords: 2,
  passageTitle: 'Recycling cotton textiles',
  passage: `Cotton clothing is often discarded long before the fibres have completely lost their value. Textile recycling centres try to recover that value by turning suitable garments into new raw material. The process is selective because not every item can be reused in the same way. Clothing with heavy coatings, oil stains or mixed synthetic fibres may be rejected or sent to a different facility.

The first stage is sorting. Workers separate garments by fibre type and colour, since keeping similar colours together can reduce the need for later dyeing. Items that pass this inspection are then cleaned to remove dust, buttons and other hard parts. Zippers and metal decorations must be taken out because they can damage the shredding equipment.

After cleaning, the fabric is cut into smaller pieces and passed through machines with rotating teeth. These machines pull the cloth apart until it becomes loose fibre. The fibres are shorter than those from new cotton, so they are usually blended with a stronger material before being spun into yarn. Without this blending stage, the yarn may break too easily during weaving.

The recycled yarn can be used for products that do not require very fine thread, such as blankets, insulation pads and some casual fabrics. Although the process saves material, it is not entirely waste-free. Very short fibres and dust are collected separately and may be used for filling, paper products or industrial cleaning cloths.`,
  instructions:
    'Complete the flow chart below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  flowTitle: 'From discarded cotton clothing to recycled products',
  steps: [
    {
      id: 'flow-textiles-01',
      label: 'Step 1',
      before: 'Reject clothing with heavy coatings, oil stains or mixed ',
      after: '.',
      answer: 'synthetic fibres',
      explanation:
        'Paragraph 1 says items with mixed synthetic fibres may be rejected or sent to a different facility.',
      hint: 'Find the third rejection reason in paragraph 1.',
    },
    {
      id: 'flow-textiles-02',
      label: 'Step 2',
      before: 'Sort accepted garments by fibre type and ',
      after: '.',
      answer: 'colour',
      alternatives: ['color'],
      explanation:
        'The first stage separates garments by fibre type and colour.',
      hint: 'Look at the first sentence of the sorting paragraph.',
    },
    {
      id: 'flow-textiles-03',
      label: 'Step 3',
      before: 'Clean items and remove dust, buttons and other ',
      after: '.',
      answer: 'hard parts',
      explanation:
        'Paragraph 2 says items are cleaned to remove dust, buttons and other hard parts.',
      hint: 'The answer is the noun phrase after "other" in paragraph 2.',
    },
    {
      id: 'flow-textiles-04',
      label: 'Step 4',
      before: 'Use machines with rotating teeth to produce loose ',
      after: '.',
      answer: 'fibre',
      alternatives: ['fiber'],
      explanation:
        'The machines pull the cloth apart until it becomes loose fibre.',
      hint: 'Find what the cloth becomes after shredding.',
    },
    {
      id: 'flow-textiles-05',
      label: 'Step 5',
      before: 'Blend short fibres with a ',
      after: ' before spinning yarn.',
      answer: 'stronger material',
      explanation:
        'The passage says shorter fibres are usually blended with a stronger material before being spun into yarn.',
      hint: 'Look for what shorter fibres are blended with.',
    },
    {
      id: 'flow-textiles-06',
      label: 'Step 6',
      before: 'Use very short fibres and dust for filling, paper products or industrial ',
      after: '.',
      answer: 'cleaning cloths',
      explanation:
        'The final sentence lists industrial cleaning cloths as one use for very short fibres and dust.',
      hint: 'Copy the final product named at the end of the passage.',
    },
  ],
};

export const IELTS_FLOW_CHART_COMPLETION_PASSAGES: FlowChartCompletionPassage[] = [
  IELTS_FLOW_CHART_COMPLETION_PASSAGE,
  {
    id: 'flow-community-pottery',
    title: 'Preparing clay for community pottery',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Preparing clay for community pottery',
    passage: `Community pottery studios often use local clay when it is available, but the material must be prepared carefully before it can be shaped. Fresh clay dug from the ground contains stones, roots and uneven lumps that would tear a pot on the wheel. Studio workers therefore begin by drying the clay in shallow trays until it can be broken into smaller pieces.

The dry pieces are then soaked in water to create a smooth mixture called slip. Workers stir the slip and pour it through a fine screen, which catches stones and plant matter. This screening stage is slow, but it prevents hard particles from damaging the final object or injuring a student's hands.

After screening, the slip is left in plaster trays. Plaster absorbs extra water from the clay, gradually turning the liquid mixture into a soft mass. The timing depends on temperature and humidity. If the clay is removed too early, it will be sticky; if it is left too long, it may become too stiff to knead properly.

The final preparation stage is wedging. Potters press and fold the clay repeatedly to remove air pockets and make the texture even. Air trapped inside clay can expand during firing and crack the pot. Once the clay feels consistent, it is wrapped in plastic until students are ready to use it.`,
    instructions:
      'Complete the flow chart below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    flowTitle: 'From local clay to usable pottery material',
    steps: [
      {
        id: 'flow-pottery-01',
        label: 'Step 1',
        before: 'Dry fresh clay in shallow ',
        after: ' until it breaks easily.',
        answer: 'trays',
        explanation:
          'Paragraph 1 says workers dry the clay in shallow trays until it can be broken into smaller pieces.',
        hint: 'Find where fresh clay is dried in the first paragraph.',
      },
      {
        id: 'flow-pottery-02',
        label: 'Step 2',
        before: 'Soak dry pieces in water to create ',
        after: '.',
        answer: 'slip',
        explanation:
          'The dry pieces are soaked in water to create a smooth mixture called slip.',
        hint: 'Look for the name of the smooth mixture.',
      },
      {
        id: 'flow-pottery-03',
        label: 'Step 3',
        before: 'Pour the mixture through a fine ',
        after: '.',
        answer: 'screen',
        explanation:
          'Workers pour the slip through a fine screen to catch stones and plant matter.',
        hint: 'Find the tool used to catch unwanted particles.',
      },
      {
        id: 'flow-pottery-04',
        label: 'Step 4',
        before: 'Leave slip in plaster trays so they absorb extra ',
        after: '.',
        answer: 'water',
        explanation:
          'Paragraph 3 says plaster absorbs extra water from the clay.',
        hint: 'Look at what plaster removes from the mixture.',
      },
      {
        id: 'flow-pottery-05',
        label: 'Step 5',
        before: 'Wedge the clay to remove ',
        after: ' and even the texture.',
        answer: 'air pockets',
        explanation:
          'The final stage removes air pockets and makes the texture even.',
        hint: 'Find what potters remove by pressing and folding.',
      },
      {
        id: 'flow-pottery-06',
        label: 'Step 6',
        before: 'Wrap consistent clay in ',
        after: ' before students use it.',
        answer: 'plastic',
        explanation:
          'The final sentence says prepared clay is wrapped in plastic until students are ready to use it.',
        hint: 'Copy the material used to wrap the clay.',
      },
    ],
  },
  {
    id: 'flow-noise-mapping',
    title: 'Creating an urban noise map',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Creating an urban noise map',
    passage: `Urban noise maps help planners understand where traffic, construction and nightlife create the greatest disturbance. The process begins by choosing measurement points that represent different street types, such as main roads, residential lanes and areas near rail stations. If points are chosen only on busy roads, the final map will exaggerate the average level of noise.

Technicians then install sound meters for several days. The meters record noise at regular intervals, including early morning and late evening periods. Weather conditions are noted because strong wind or heavy rain can distort readings. When unusual events occur, such as a festival or road closure, technicians mark the data so it can be interpreted carefully later.

After collection, analysts clean the dataset. Faulty readings are removed, and measurements from similar time periods are grouped together. The cleaned data is combined with information about traffic volume, building height and land use. This helps the map show not only where noise is high, but also why it may be high.

Finally, planners publish the map with recommendations. A noisy street may need lower speed limits, quieter road surfaces or barriers near homes. However, the map is not useful if residents cannot understand it. Good projects therefore include a simple legend and invite public comments before final decisions are made.`,
    instructions:
      'Complete the flow chart below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    flowTitle: 'From noise measurements to planning recommendations',
    steps: [
      {
        id: 'flow-noise-mapping-01',
        label: 'Step 1',
        before: 'Choose measurement points representing different ',
        after: '.',
        answer: 'street types',
        explanation:
          'The first paragraph says measurement points should represent different street types.',
        hint: 'Find what the chosen points must represent.',
      },
      {
        id: 'flow-noise-mapping-02',
        label: 'Step 2',
        before: 'Install sound ',
        after: ' for several days.',
        answer: 'meters',
        explanation:
          'Paragraph 2 says technicians install sound meters for several days.',
        hint: 'Copy the instrument installed by technicians.',
      },
      {
        id: 'flow-noise-mapping-03',
        label: 'Step 3',
        before: 'Note weather conditions because strong wind can distort ',
        after: '.',
        answer: 'readings',
        explanation:
          'The passage says strong wind or heavy rain can distort readings.',
        hint: 'Find what bad weather can distort.',
      },
      {
        id: 'flow-noise-mapping-04',
        label: 'Step 4',
        before: 'Remove faulty readings and group similar ',
        after: '.',
        answer: 'time periods',
        explanation:
          'Analysts remove faulty readings and group measurements from similar time periods.',
        hint: 'Look at the dataset-cleaning paragraph.',
      },
      {
        id: 'flow-noise-mapping-05',
        label: 'Step 5',
        before: 'Combine cleaned data with traffic volume, building height and ',
        after: '.',
        answer: 'land use',
        explanation:
          'Paragraph 3 lists traffic volume, building height and land use as additional information.',
        hint: 'Copy the third type of information added to the cleaned data.',
      },
      {
        id: 'flow-noise-mapping-06',
        label: 'Step 6',
        before: 'Publish the map with recommendations and a simple ',
        after: '.',
        answer: 'legend',
        explanation:
          'The final paragraph says good projects include a simple legend before final decisions.',
        hint: 'Find what helps residents understand the map.',
      },
    ],
  },
];

export const IELTS_SHORT_ANSWER_PASSAGE: ShortAnswerPassage = {
  id: 'short-answer-night-markets',
  title: 'Night markets and local economies',
  wordLimit: 'NO MORE THAN TWO WORDS',
  maxWords: 2,
  passageTitle: 'Night markets and local economies',
  passage: `Night markets are common in many cities where daytime heat, long working hours or crowded streets make evening trade more attractive. They often begin as informal gatherings of food sellers, but successful markets can grow into organized spaces with lighting, waste collection and safety rules. City officials sometimes support them because they bring activity to streets that would otherwise become quiet after offices close.

For small vendors, the main advantage is a lower entry cost. A stall at a night market usually requires less rent than a permanent shop, and sellers can test new products before investing in larger premises. This flexibility is especially important for families who prepare food at home during the day and sell it in the evening.

Night markets can also strengthen local identity. Visitors often come for dishes, crafts or performances linked to a particular district. When markets are managed carefully, they can give older residents a place to share traditional recipes and younger entrepreneurs a place to experiment with modern versions of familiar products.

However, popularity creates pressure. Noise can disturb nearby residents, and waste may increase if bins are not emptied frequently. Transport is another concern: when many visitors arrive by private car, surrounding streets can become congested. Some cities respond by placing markets near public transport stops or limiting vehicle access on market nights.

The long-term success of a night market depends on balancing commercial energy with community needs. Clear rules about closing times, cleaning responsibilities and stall locations can prevent conflict. Without that balance, a market that once attracted visitors may lose local support.`,
  instructions:
    'Answer the questions below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  questions: [
    {
      id: 'short-night-markets-01',
      question: 'What makes evening trade more attractive in some cities besides long working hours and crowded streets?',
      answer: 'daytime heat',
      explanation:
        'The first sentence lists daytime heat, long working hours and crowded streets as reasons evening trade may be attractive.',
      hint: 'Look at the list in the first sentence.',
      trap: 'Do not answer "evening trade"; the question asks for a reason.',
    },
    {
      id: 'short-night-markets-02',
      question: 'What do city officials add to successful markets besides lighting and safety rules?',
      answer: 'waste collection',
      explanation:
        'Paragraph 1 says organized markets may have lighting, waste collection and safety rules.',
      hint: 'Find the three-part list in paragraph 1.',
      trap: 'Waste alone is not the phrase used in the passage.',
    },
    {
      id: 'short-night-markets-03',
      question: 'What does a stall at a night market usually require less of than a permanent shop?',
      answer: 'rent',
      explanation:
        'Paragraph 2 says a stall at a night market usually requires less rent than a permanent shop.',
      hint: 'Look for the comparison between a stall and a permanent shop.',
      trap: 'Lower entry cost is the broader idea, but it exceeds the word limit and is not what this question asks for.',
    },
    {
      id: 'short-night-markets-04',
      question: 'Who can use night markets to share traditional recipes?',
      answer: 'older residents',
      explanation:
        'Paragraph 3 says older residents can share traditional recipes.',
      hint: 'Look for the sentence contrasting older residents and younger entrepreneurs.',
      trap: 'Younger entrepreneurs are linked to modern versions, not traditional recipes.',
    },
    {
      id: 'short-night-markets-05',
      question: 'What can surrounding streets become when many visitors arrive by private car?',
      answer: 'congested',
      explanation:
        'Paragraph 4 says surrounding streets can become congested when many visitors arrive by private car.',
      hint: 'Find the sentence about private cars.',
      trap: 'Do not answer "transport"; it is the concern, not the street condition.',
    },
    {
      id: 'short-night-markets-06',
      question: 'What kind of local reaction may a market lose without balance?',
      answer: 'local support',
      explanation:
        'The final sentence says that without balance, a market may lose local support.',
      hint: 'Check the last sentence of the passage.',
      trap: 'Visitors are attracted earlier; the question asks what may be lost.',
    },
  ],
};

export const IELTS_SHORT_ANSWER_PASSAGES: ShortAnswerPassage[] = [
  IELTS_SHORT_ANSWER_PASSAGE,
  {
    id: 'short-answer-floating-classrooms',
    title: 'Floating classrooms in flood-prone regions',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Floating classrooms in flood-prone regions',
    passage: `In low-lying regions where seasonal floods close roads for weeks, some communities have built floating classrooms. These structures are usually simple wooden rooms placed on buoyant platforms. During the dry season, they rest beside a riverbank like ordinary school buildings. When water levels rise, the platform lifts with the flood and remains connected to the village by small boats.

The main purpose is continuity. Children in flood-prone areas may lose many school days if classes stop whenever paths disappear underwater. A floating classroom allows lessons to continue, although teachers often adjust the timetable to match safe travel hours. In several villages, morning classes are preferred because winds are usually calmer before noon.

Designers choose materials carefully. Bamboo is popular for walls because it is light and locally available, while metal roofs are avoided in some places because they make rooms too hot. Windows are placed on opposite sides to improve ventilation. Storage boxes are fixed above floor level so books and science materials do not get wet.

Floating classrooms are not a complete solution. They require regular inspection, and anchors must be checked after storms. Communities also need trained adults who can manage boat access safely. Even so, supporters argue that the classrooms protect learning time and show children that school remains important during difficult seasons.`,
    instructions:
      'Answer the questions below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'short-floating-classrooms-01',
        question: 'What closes roads for weeks in some low-lying regions?',
        answer: 'seasonal floods',
        explanation:
          'The first sentence says seasonal floods close roads for weeks in low-lying regions.',
        hint: 'Look at the opening sentence.',
        trap: 'Do not answer "water levels"; the question asks what closes roads.',
      },
      {
        id: 'short-floating-classrooms-02',
        question: 'What are the wooden rooms placed on?',
        answer: 'buoyant platforms',
        explanation:
          'Paragraph 1 says the rooms are placed on buoyant platforms.',
        hint: 'Find the phrase after "placed on".',
        trap: 'A riverbank is where they rest in dry season, not what supports them.',
      },
      {
        id: 'short-floating-classrooms-03',
        question: 'What is the main purpose of floating classrooms?',
        answer: 'continuity',
        explanation:
          'Paragraph 2 states directly that the main purpose is continuity.',
        hint: 'The answer appears as a one-word sentence at the start of paragraph 2.',
        trap: 'Continuing lessons is the explanation; the named purpose is continuity.',
      },
      {
        id: 'short-floating-classrooms-04',
        question: 'When are winds usually calmer?',
        answer: 'before noon',
        explanation:
          'The passage says morning classes are preferred because winds are calmer before noon.',
        hint: 'Look at the end of paragraph 2.',
        trap: 'Morning classes are preferred, but the question asks when winds are calmer.',
      },
      {
        id: 'short-floating-classrooms-05',
        question: 'What material is popular for walls?',
        answer: 'bamboo',
        explanation:
          'Paragraph 3 says bamboo is popular for walls because it is light and local.',
        hint: 'Find the sentence about materials for walls.',
        trap: 'Metal roofs are discussed as something avoided, not a wall material.',
      },
      {
        id: 'short-floating-classrooms-06',
        question: 'What must be checked after storms?',
        answer: 'anchors',
        explanation:
          'The final paragraph says anchors must be checked after storms.',
        hint: 'Look at the maintenance requirement after regular inspection.',
        trap: 'Boat access needs trained adults, but storms are linked to anchors.',
      },
    ],
  },
  {
    id: 'short-answer-community-compost',
    title: 'Community compost stations',
    wordLimit: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    passageTitle: 'Community compost stations',
    passage: `Community compost stations are shared places where residents leave vegetable scraps, coffee grounds and garden waste. They are often set up in apartment districts where individual households do not have space for compost bins. A station may look simple, but it needs clear rules if it is to work well.

The first rule concerns what can be added. Fruit skins, tea leaves and dry leaves are usually accepted, while meat, dairy products and oily food are rejected because they attract animals and create strong smells. Many stations display a picture guide near the lid so residents can check quickly before emptying a container.

Good compost also depends on balance. Food scraps are wet and rich in nitrogen, so volunteers add dry material such as shredded paper or leaves. This prevents the mixture from becoming too wet. The pile is turned with a fork every few days to bring in oxygen, which helps useful organisms break down the waste.

After several months, the finished compost is dark and crumbly. Some stations give it to residents for balcony plants, while others use it in nearby gardens. The system reduces waste sent to landfill, but only if people follow instructions. When plastic bags or glass pieces enter the pile, volunteers must remove them by hand before the compost can be used.`,
    instructions:
      'Answer the questions below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'short-community-compost-01',
        question: 'Where are community compost stations often set up?',
        answer: 'apartment districts',
        explanation:
          'Paragraph 1 says they are often set up in apartment districts.',
        hint: 'Find the place where households lack space for compost bins.',
        trap: 'Compost bins are what households lack, not where stations are placed.',
      },
      {
        id: 'short-community-compost-02',
        question: 'What kind of food is rejected along with meat and dairy products?',
        answer: 'oily food',
        explanation:
          'Paragraph 2 lists meat, dairy products and oily food as rejected materials.',
        hint: 'Look at the rejected list in paragraph 2.',
        trap: 'Vegetable scraps are accepted, not rejected.',
      },
      {
        id: 'short-community-compost-03',
        question: 'What do many stations display near the lid?',
        answer: 'picture guide',
        explanation:
          'The passage says many stations display a picture guide near the lid.',
        hint: 'Find what helps residents check quickly.',
        trap: 'The lid is the location, not the displayed item.',
      },
      {
        id: 'short-community-compost-04',
        question: 'What dry material may volunteers add besides leaves?',
        answer: 'shredded paper',
        explanation:
          'Paragraph 3 says volunteers add dry material such as shredded paper or leaves.',
        hint: 'Look for the dry material named before leaves.',
        trap: 'Dry material is the category; the question asks for one example.',
      },
      {
        id: 'short-community-compost-05',
        question: 'What tool is used to turn the pile?',
        answer: 'fork',
        explanation:
          'The passage says the pile is turned with a fork every few days.',
        hint: 'Find the tool in the sentence about oxygen.',
        trap: 'Oxygen is why the pile is turned, not the tool.',
      },
      {
        id: 'short-community-compost-06',
        question: 'What must volunteers remove by hand besides plastic bags?',
        answer: 'glass pieces',
        explanation:
          'The final sentence says volunteers must remove plastic bags or glass pieces by hand.',
        hint: 'Look at the last sentence.',
        trap: 'Landfill is where waste is reduced, not the contamination removed.',
      },
    ],
  },
];

export const IELTS_SENTENCE_COMPLETION_PASSAGE: SummaryCompletionPassage = {
  id: 'sentence-wetland-parks',
  title: 'Wetland parks and urban flood control',
  wordLimit: 'NO MORE THAN TWO WORDS',
  passage: `Many cities are redesigning old drainage areas as wetland parks. Instead of moving rainwater away as quickly as possible through concrete channels, these parks hold water temporarily and allow it to filter through plants and soil. During heavy storms, this storage capacity can reduce pressure on underground pipes and lower the risk of street flooding.

Wetland parks also create habitats for insects, birds and amphibians. A narrow strip of water beside a road may look small, but if it contains native plants and shallow pools, it can support species that struggle to survive in heavily paved districts. Some city planners therefore describe these parks as ecological infrastructure rather than simple decoration.

The success of a wetland park depends on maintenance. Plants must be monitored, litter needs to be removed and water levels should be checked after extreme weather. If a park is neglected, blocked channels can reduce water flow and the area may become less effective during storms.

Public access is another important issue. Walkways, signs and viewing platforms can help residents understand why the landscape sometimes appears wet or muddy. When people recognize the purpose of the park, they are more likely to support its long-term protection.`,
  summaryIntro:
    'Complete the sentences below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
  questions: [
    {
      id: 'sentence-wetlands-01',
      before: 'Wetland parks can keep rainwater for a short time instead of sending it through ',
      after: '.',
      answer: 'concrete channels',
      explanation:
        'The first paragraph contrasts wetland parks with moving rainwater away through concrete channels.',
      hint: 'Look for the phrase after through in paragraph 1.',
    },
    {
      id: 'sentence-wetlands-02',
      before: 'During storms, the parks can reduce pressure on ',
      after: '.',
      answer: 'underground pipes',
      explanation:
        'The passage says storage capacity can reduce pressure on underground pipes.',
      hint: 'The answer is the object after pressure on.',
    },
    {
      id: 'sentence-wetlands-03',
      before: 'Small wetland areas may help species survive if they include native plants and ',
      after: '.',
      answer: 'shallow pools',
      explanation:
        'The second paragraph says a strip can support species if it contains native plants and shallow pools.',
      hint: 'Find the phrase paired with native plants.',
    },
    {
      id: 'sentence-wetlands-04',
      before: 'Some planners call wetland parks ecological ',
      after: ' instead of decoration.',
      answer: 'infrastructure',
      explanation:
        'The text says planners describe these parks as ecological infrastructure rather than simple decoration.',
      hint: 'The missing word follows ecological in paragraph 2.',
    },
    {
      id: 'sentence-wetlands-05',
      before: 'If maintenance is poor, blocked channels can limit ',
      after: '.',
      answer: 'water flow',
      explanation:
        'The third paragraph says blocked channels can reduce water flow.',
      hint: 'Limit is a paraphrase of reduce.',
    },
    {
      id: 'sentence-wetlands-06',
      before: 'Signs and viewing platforms can help people understand the park’s ',
      after: '.',
      answer: 'purpose',
      explanation:
        'The final paragraph says public features help residents understand why the landscape looks wet, and people who recognize the purpose support protection.',
      hint: 'The answer appears in the final sentence.',
    },
  ],
};

export const IELTS_SENTENCE_COMPLETION_PASSAGES: SummaryCompletionPassage[] = [
  IELTS_SENTENCE_COMPLETION_PASSAGE,
  {
    id: 'sentence-library-makerspaces',
    title: 'Library makerspaces and practical learning',
    wordLimit: 'NO MORE THAN TWO WORDS',
    passage: `Public libraries have long provided quiet rooms, books and internet access. In many towns, they now also provide makerspaces: small areas where visitors can use tools such as sewing machines, audio recorders, 3D printers and basic electronics kits. Supporters argue that these spaces help libraries move from storing information to helping people create things with it.

The equipment is not the main point. A library makerspace works best when staff can introduce tools safely and connect visitors with realistic first projects. A teenager recording a podcast, a parent repairing a school costume and a retired engineer teaching soldering all use the space differently, but each activity turns knowledge into a visible result.

There are risks. Expensive equipment can sit unused if the library buys it without understanding local interests. Noise can also disturb people who still need a quiet reading area. Successful libraries therefore separate noisy activities from study zones and choose tools that match community demand.

Makerspaces are not a replacement for books or reading. Their value is that they extend the library's public role. A person may enter to print a document and leave with the confidence to try a repair, record a story or ask for help with a design.`,
    summaryIntro:
      'Complete the sentences below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'sentence-makerspaces-01',
        before: 'Makerspaces let library visitors use tools including audio recorders and ',
        after: '.',
        answer: '3D printers',
        alternatives: ['3d printers'],
        explanation:
          'The first paragraph lists sewing machines, audio recorders, 3D printers and electronics kits.',
        hint: 'Look at the list of tools in paragraph 1.',
      },
      {
        id: 'sentence-makerspaces-02',
        before: 'Supporters say makerspaces help libraries move beyond ',
        after: ' information.',
        answer: 'storing',
        explanation:
          'The passage says makerspaces help libraries move from storing information to helping people create things with it.',
        hint: 'Find the phrase move from ... information.',
      },
      {
        id: 'sentence-makerspaces-03',
        before: 'Staff need to introduce tools safely and connect visitors with realistic ',
        after: '.',
        answer: 'first projects',
        explanation:
          'The second paragraph says staff should connect visitors with realistic first projects.',
        hint: 'The answer follows realistic in paragraph 2.',
      },
      {
        id: 'sentence-makerspaces-04',
        before: 'Equipment may remain unused if the library ignores local ',
        after: '.',
        answer: 'interests',
        explanation:
          'The passage warns that equipment can sit unused if bought without understanding local interests.',
        hint: 'Look for the risk connected with expensive equipment.',
      },
      {
        id: 'sentence-makerspaces-05',
        before: 'Libraries protect study areas by separating noisy activities from ',
        after: '.',
        answer: 'study zones',
        explanation:
          'The text says successful libraries separate noisy activities from study zones.',
        hint: 'The answer appears in the sentence about successful libraries.',
      },
      {
        id: 'sentence-makerspaces-06',
        before: 'Makerspaces extend the library’s ',
        after: ' rather than replacing books.',
        answer: 'public role',
        explanation:
          'The final paragraph says their value is that they extend the library\'s public role.',
        hint: 'Find the phrase after extend the library\'s.',
      },
    ],
  },
  {
    id: 'sentence-night-markets',
    title: 'Night markets and local economies',
    wordLimit: 'NO MORE THAN TWO WORDS',
    passage: `Night markets are often associated with tourism, but many successful markets begin as local experiments. A closed street, a group of food vendors and a simple lighting plan can create an evening economy without requiring a permanent shopping centre. For small businesses, the short trading window lowers some costs and allows them to test new products.

Location matters. A night market beside a transit stop is easier to reach than one placed in an isolated car park. Nearby residents also influence the design. Organizers may need to limit amplified music, provide waste bins and keep pedestrian routes clear so that the market feels lively without becoming disruptive.

Food is usually the most visible attraction, but it should not be the only one. Craft stalls, repair tables and small performances can encourage visitors to stay longer and return for reasons beyond dinner. A market that depends on one fashionable dish may lose visitors quickly when tastes change.

The strongest markets collect feedback after each event. Vendor sales, crowd movement, noise complaints and cleaning costs reveal whether the market is growing in a healthy way. Without this information, organizers may mistake a busy opening night for long-term success.`,
    summaryIntro:
      'Complete the sentences below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      {
        id: 'sentence-night-markets-01',
        before: 'Night markets can create an evening economy without a permanent ',
        after: '.',
        answer: 'shopping centre',
        alternatives: ['shopping center'],
        explanation:
          'The first paragraph says an evening economy can be created without requiring a permanent shopping centre.',
        hint: 'Look at the final phrase of the first paragraph\'s second sentence.',
      },
      {
        id: 'sentence-night-markets-02',
        before: 'A short trading window helps small businesses test ',
        after: '.',
        answer: 'new products',
        explanation:
          'The passage says the short trading window allows small businesses to test new products.',
        hint: 'Find what the short trading window allows businesses to test.',
      },
      {
        id: 'sentence-night-markets-03',
        before: 'Markets near a ',
        after: ' are easier for people to reach.',
        answer: 'transit stop',
        explanation:
          'The second paragraph says a market beside a transit stop is easier to reach.',
        hint: 'The phrase follows beside a in paragraph 2.',
      },
      {
        id: 'sentence-night-markets-04',
        before: 'Organizers may need to keep ',
        after: ' clear to avoid disruption.',
        answer: 'pedestrian routes',
        explanation:
          'The passage says organizers may need to keep pedestrian routes clear.',
        hint: 'Look at the list of design responsibilities in paragraph 2.',
      },
      {
        id: 'sentence-night-markets-05',
        before: 'Craft stalls and performances can make visitors stay ',
        after: '.',
        answer: 'longer',
        explanation:
          'The third paragraph says these attractions can encourage visitors to stay longer.',
        hint: 'The answer is the word after stay.',
      },
      {
        id: 'sentence-night-markets-06',
        before: 'Organizers need feedback because a busy opening night may not prove ',
        after: '.',
        answer: 'long-term success',
        explanation:
          'The final sentence says organizers may mistake a busy opening night for long-term success.',
        hint: 'Find the phrase contrasted with a busy opening night.',
      },
    ],
  },
];

export const TOEFL_VOCABULARY_PASSAGE: MultipleChoicePassage = {
  id: 'toefl-vocab-urban-bees',
  title: 'Urban beekeeping and city ecosystems',
  passage: `Urban beekeeping has expanded in many cities as residents look for practical ways to support pollinators. Rooftop hives and community gardens can provide bees with access to flowers throughout the growing season, and some local businesses sell honey as a visible symbol of environmental responsibility.

However, researchers caution that the benefits are not automatic. A dense concentration of honeybee hives may intensify competition for nectar and pollen, especially in neighborhoods with limited plant diversity. Native pollinators, such as solitary bees and butterflies, can be affected when floral resources become scarce. For this reason, ecologists argue that planting varied vegetation is just as important as installing hives.

City conditions can also make bee management complicated. Heat, air pollution and fragmented green spaces influence where bees forage and how far they travel. Successful programs therefore combine hive maintenance with habitat planning: gardeners select plants that bloom at different times, building managers limit pesticide use, and community groups monitor whether native insects are also present.

Urban beekeeping can be valuable, but it should be treated as one component of a broader pollinator strategy. Without enough habitat, a fashionable hive may do more to reassure people than to restore ecological balance.`,
  questions: [
    {
      id: 'toefl-vocab-01',
      question: 'The word "expanded" in paragraph 1 is closest in meaning to',
      options: ['grown', 'disappeared', 'moved', 'failed'],
      answer: 0,
      explanation:
        'The sentence says urban beekeeping has expanded in many cities, meaning it has become more common or grown.',
      skill: 'vocabulary in context',
      trap: 'Moved is tempting because hives can be placed on rooftops, but expanded describes the activity becoming more widespread.',
    },
    {
      id: 'toefl-vocab-02',
      question: 'The word "visible" in paragraph 1 is closest in meaning to',
      options: ['expensive', 'easy to notice', 'temporary', 'scientific'],
      answer: 1,
      explanation:
        'Honey is described as a visible symbol of environmental responsibility, so the idea is something people can easily notice.',
      skill: 'vocabulary in context',
      trap: 'Scientific sounds related to environment, but the sentence is about public perception, not research.',
    },
    {
      id: 'toefl-vocab-03',
      question: 'The word "intensify" in paragraph 2 is closest in meaning to',
      options: ['reduce', 'make stronger', 'hide', 'measure'],
      answer: 1,
      explanation:
        'A dense concentration of hives may intensify competition, meaning it may make competition stronger.',
      skill: 'context clue',
      trap: 'Reduce reverses the meaning; the following scarcity problem shows competition increases.',
    },
    {
      id: 'toefl-vocab-04',
      question: 'The word "scarce" in paragraph 2 is closest in meaning to',
      options: ['colorful', 'limited', 'dangerous', 'artificial'],
      answer: 1,
      explanation:
        'The passage says native pollinators can be affected when floral resources become scarce, meaning there are not enough resources.',
      skill: 'vocabulary in context',
      trap: 'Colorful relates to flowers, but scarce describes quantity, not appearance.',
    },
    {
      id: 'toefl-vocab-05',
      question: 'The word "fragmented" in paragraph 3 is closest in meaning to',
      options: ['broken into separate parts', 'recently created', 'protected by law', 'completely natural'],
      answer: 0,
      explanation:
        'Fragmented green spaces are separated rather than connected, which affects where bees forage.',
      skill: 'academic vocabulary',
      trap: 'Protected by law may sound positive, but the paragraph describes a management challenge.',
    },
    {
      id: 'toefl-vocab-06',
      question: 'The word "component" in paragraph 4 is closest in meaning to',
      options: ['problem', 'part', 'prediction', 'replacement'],
      answer: 1,
      explanation:
        'The final paragraph says urban beekeeping should be one component of a broader strategy, meaning one part of it.',
      skill: 'vocabulary in context',
      trap: 'Replacement would imply beekeeping is the whole solution, but the author argues it is only one part.',
    },
  ],
};

export const TOEFL_INFERENCE_PASSAGE: MultipleChoicePassage = {
  id: 'toefl-inference-microgrids',
  title: 'Community microgrids and energy resilience',
  passage: `In recent years, several towns have invested in community microgrids, small energy networks that can operate either with the main electrical grid or independently from it. These systems often combine solar panels, battery storage and software that decides when to draw power from different sources.

Supporters argue that microgrids can make communities more resilient during storms or heat waves. If a regional power line fails, a hospital, school or emergency shelter connected to a microgrid may continue operating for several hours. This does not mean that a microgrid can power every building indefinitely, but it can protect critical services while repairs are made.

The economic case is more complex. Installing batteries and control systems requires significant upfront investment, and smaller towns may need grants or partnerships to afford the project. However, some communities reduce long-term costs by using stored solar energy when electricity prices are high. Others value the system mainly for reliability, even if financial savings are modest.

Energy planners emphasize that microgrids are not a universal solution. Their success depends on local weather, building needs, technical maintenance and public support. A poorly maintained microgrid can create a false sense of security, while a carefully managed one can become a practical layer in a broader energy strategy.`,
  questions: [
    {
      id: 'toefl-inference-01',
      question: 'What can be inferred about community microgrids from paragraph 1?',
      options: [
        'They are designed to work only when the main electrical grid has failed',
        'They can use more than one source of energy or storage',
        'They have replaced regional power lines in most towns',
        'They require communities to stop using solar panels',
      ],
      answer: 1,
      explanation:
        'The paragraph says microgrids often combine solar panels, battery storage and software that selects power sources, so they can use multiple sources or storage.',
      skill: 'inference from detail',
      trap: 'Only and most are too strong. The text says microgrids can operate with or independently from the main grid, not only after failure.',
    },
    {
      id: 'toefl-inference-02',
      question: 'What does paragraph 2 imply about the purpose of microgrids during emergencies?',
      options: [
        'They are mainly intended to keep essential services running temporarily',
        'They guarantee that every home will have unlimited electricity',
        'They prevent storms and heat waves from damaging regional power lines',
        'They are useful only for hospitals and never for schools',
      ],
      answer: 0,
      explanation:
        'The paragraph mentions hospitals, schools and shelters continuing for several hours and protecting critical services while repairs are made.',
      skill: 'purpose inference',
      trap: 'Unlimited, prevent and never go beyond the evidence. TOEFL often tests whether you keep the scope moderate.',
    },
    {
      id: 'toefl-inference-03',
      question: 'What can be inferred from the discussion of smaller towns in paragraph 3?',
      options: [
        'Some towns may find microgrids financially difficult without outside help',
        'Small towns always save money immediately after installing microgrids',
        'Grants make battery systems unnecessary',
        'Only large cities are allowed to build microgrids',
      ],
      answer: 0,
      explanation:
        'The text says smaller towns may need grants or partnerships because batteries and control systems require upfront investment.',
      skill: 'financial inference',
      trap: 'Immediately and always are not supported. The passage says the economic case is complex.',
    },
    {
      id: 'toefl-inference-04',
      question: 'Why does the author mention communities that value reliability even with modest savings?',
      options: [
        'To suggest that the benefits of microgrids are not only financial',
        'To prove that microgrids never reduce costs',
        'To argue that reliability is less important than electricity prices',
        'To show that communities dislike solar energy',
      ],
      answer: 0,
      explanation:
        'The sentence contrasts financial savings with reliability, implying that communities may value resilience even when savings are limited.',
      skill: 'rhetorical inference',
      trap: 'The passage does not say costs never fall; it says some communities reduce costs and others prioritize reliability.',
    },
    {
      id: 'toefl-inference-05',
      question: 'What can be inferred about a poorly maintained microgrid?',
      options: [
        'It may make people believe they are more protected than they really are',
        'It will always perform better than the main electrical grid',
        'It can eliminate the need for public support',
        'It proves that all microgrid projects should be cancelled',
      ],
      answer: 0,
      explanation:
        'The final paragraph says a poorly maintained microgrid can create a false sense of security, meaning people may overestimate its protection.',
      skill: 'phrase inference',
      trap: 'All and always are extreme. The author criticizes poor maintenance, not microgrids as a category.',
    },
    {
      id: 'toefl-inference-06',
      question: 'Which statement best reflects the author’s overall view of microgrids?',
      options: [
        'They can be useful when carefully planned, but they are not a complete solution',
        'They are unnecessary because regional grids never fail',
        'They should be installed everywhere regardless of local conditions',
        'They are valuable only if they produce large financial savings',
      ],
      answer: 0,
      explanation:
        'The author repeatedly qualifies the benefits: microgrids can protect critical services, but success depends on local factors and maintenance.',
      skill: 'author attitude',
      trap: 'Regardless, never and only ignore the author’s cautious, conditional position.',
    },
  ],
};

export const TOEFL_FACTUAL_INFORMATION_PASSAGE: MultipleChoicePassage = {
  id: 'toefl-factual-coral-restoration',
  title: 'Coral reef restoration',
  passage: `Coral reefs support a remarkable variety of marine life, but many reefs have been damaged by warmer water, pollution and destructive fishing practices. In response, scientists and local communities have developed restoration projects that try to help reefs recover rather than simply documenting their decline.

One common method is coral gardening. Researchers collect small fragments from healthy corals and grow them in underwater nurseries. After several months, the fragments can be attached to damaged reef areas. This approach works best when the original cause of damage, such as poor water quality or physical disturbance, has already been reduced.

Another strategy involves selecting corals that appear more tolerant of heat. Some coral colonies survive bleaching events better than others, and scientists study whether their offspring may also handle warmer conditions. However, researchers warn that heat tolerance alone is not enough. A reef also needs herbivorous fish, clean water and enough space for young corals to settle.

Community involvement can influence whether restoration continues over time. In some coastal towns, fishers help monitor nursery sites and report illegal activities. Schools and tourism operators may also participate by collecting data or explaining reef protection to visitors. These partnerships do not replace scientific expertise, but they can make restoration projects more stable and locally supported.

Despite these efforts, restoration is not a substitute for reducing climate change and pollution. Replanting corals on a reef that continues to experience severe stress is unlikely to produce lasting recovery. For that reason, many scientists describe restoration as one tool within a larger conservation plan.`,
  questions: [
    {
      id: 'toefl-factual-01',
      question: 'According to paragraph 1, why have some restoration projects been developed?',
      options: [
        'To help damaged reefs recover instead of only recording their decline',
        'To replace all marine life with laboratory-grown organisms',
        'To encourage destructive fishing practices in warmer water',
        'To prove that pollution has no effect on coral reefs',
      ],
      answer: 0,
      explanation:
        'Paragraph 1 says scientists and communities developed restoration projects to help reefs recover rather than simply documenting decline.',
      skill: 'detail',
      trap: 'The wrong options reuse words like marine life, fishing and pollution, but they contradict the paragraph.',
    },
    {
      id: 'toefl-factual-02',
      question: 'What does paragraph 2 say researchers do in coral gardening?',
      options: [
        'They collect fragments from healthy corals and grow them in underwater nurseries',
        'They remove all corals from damaged reefs permanently',
        'They grow fragments only after attaching them to damaged reef areas',
        'They use coral gardening mainly to document illegal fishing',
      ],
      answer: 0,
      explanation:
        'The paragraph states that researchers collect small fragments from healthy corals and grow them in underwater nurseries.',
      skill: 'sequence detail',
      trap: 'One option reverses the sequence: fragments are grown before they are attached to damaged areas.',
    },
    {
      id: 'toefl-factual-03',
      question: 'According to paragraph 2, when does coral gardening work best?',
      options: [
        'When the original cause of reef damage has already been reduced',
        'When physical disturbance becomes stronger',
        'When water quality is intentionally lowered',
        'When fragments are never moved from nurseries',
      ],
      answer: 0,
      explanation:
        'The text says coral gardening works best when the original cause of damage, such as poor water quality or disturbance, has already been reduced.',
      skill: 'condition detail',
      trap: 'The paragraph mentions poor water quality and disturbance as problems to reduce, not conditions to increase.',
    },
    {
      id: 'toefl-factual-04',
      question: 'What does paragraph 3 indicate about heat-tolerant corals?',
      options: [
        'Scientists study whether their offspring may also tolerate warmer conditions',
        'They no longer need clean water or herbivorous fish',
        'They always survive every bleaching event',
        'They eliminate the need for space where young corals can settle',
      ],
      answer: 0,
      explanation:
        'Paragraph 3 says scientists study whether offspring of more heat-tolerant colonies may also handle warmer conditions.',
      skill: 'factual paraphrase',
      trap: 'The paragraph specifically says heat tolerance alone is not enough, so options removing other needs are false.',
    },
    {
      id: 'toefl-factual-05',
      question: 'According to paragraph 4, how may fishers contribute to restoration projects?',
      options: [
        'By monitoring nursery sites and reporting illegal activities',
        'By replacing scientific expertise entirely',
        'By stopping schools from collecting data',
        'By preventing tourism operators from speaking with visitors',
      ],
      answer: 0,
      explanation:
        'The passage says fishers help monitor nursery sites and report illegal activities in some coastal towns.',
      skill: 'actor detail',
      trap: 'The text says partnerships do not replace scientific expertise; they support project stability.',
    },
    {
      id: 'toefl-factual-06',
      question: 'What point is made in the final paragraph?',
      options: [
        'Restoration should be part of a larger conservation plan',
        'Restoration can fully replace efforts to reduce climate change',
        'Replanting corals always produces lasting recovery',
        'Pollution is no longer relevant once coral fragments are planted',
      ],
      answer: 0,
      explanation:
        'The final paragraph says restoration is not a substitute for reducing climate change and pollution and is one tool within a larger conservation plan.',
      skill: 'final paragraph detail',
      trap: 'Always, fully and no longer exaggerate beyond the text and reverse the author’s caution.',
    },
  ],
};

export const TOEFL_RHETORICAL_PURPOSE_PASSAGE: MultipleChoicePassage = {
  id: 'toefl-rhetorical-ancient-roads',
  title: 'Ancient roads and social exchange',
  passage: `Ancient roads are often described as tools for trade or military movement, but archaeologists now argue that their social role was just as important. Roads connected settlements to markets and administrative centers, yet they also shaped how people exchanged news, rituals and political ideas.

In several regions, roads did not follow the shortest possible route between two towns. Instead, they passed near ceremonial sites, water sources or seasonal gathering places. This pattern suggests that builders were not thinking only about speed. They may have designed routes to connect communities to locations that already had cultural meaning.

The physical construction of a road can also reveal its intended function. A wide, carefully paved road near a capital city might demonstrate state power as much as practical planning. By contrast, a narrow path maintained by local communities may indicate repeated everyday travel rather than centralized control. In this way, roads can be read as evidence of political organization.

However, interpreting ancient roads is difficult because later activity often changes the original surface. Farmers may reuse stones, modern paths may follow older lines, and erosion can remove smaller features. For this reason, archaeologists compare road remains with pottery, settlement patterns and written records when such records exist.

Roads, then, should not be viewed simply as lines on a map. They were active spaces where movement, authority and social contact intersected. Studying them helps researchers understand not only where people traveled, but also how communities were connected.`,
  questions: [
    {
      id: 'toefl-rhetorical-01',
      question: 'Why does the author mention "trade or military movement" in paragraph 1?',
      options: [
        'To introduce a common view of ancient roads before presenting a broader interpretation',
        'To argue that roads were never used for social exchange',
        'To prove that military movement was the only reason roads were built',
        'To describe the shortest route between two settlements',
      ],
      answer: 0,
      explanation:
        'The author starts with the common trade/military view and then expands it by saying roads also had an important social role.',
      skill: 'rhetorical purpose',
      trap: 'The phrase is real content, but the function is to set up a contrast with a broader argument.',
    },
    {
      id: 'toefl-rhetorical-02',
      question: 'Why does the author state that some roads passed near ceremonial sites and water sources?',
      options: [
        'To support the idea that route choices reflected cultural and social priorities',
        'To show that ancient builders always chose the fastest possible route',
        'To explain why ceremonial sites were usually located inside markets',
        'To argue that water sources made roads unnecessary',
      ],
      answer: 0,
      explanation:
        'The examples support the paragraph’s claim that road builders were not thinking only about speed and may have connected culturally meaningful places.',
      skill: 'example function',
      trap: 'The question asks why the examples are included, not merely what locations are mentioned.',
    },
    {
      id: 'toefl-rhetorical-03',
      question: 'What is the purpose of the contrast between a wide paved road and a narrow local path in paragraph 3?',
      options: [
        'To show that different road features can suggest different political or social functions',
        'To claim that all wide roads were built by small local communities',
        'To suggest that narrow paths are never useful to archaeologists',
        'To prove that paved roads were always older than local paths',
      ],
      answer: 0,
      explanation:
        'The contrast illustrates how construction details can reveal whether a road may express state power or everyday local travel.',
      skill: 'contrast function',
      trap: 'The author uses the contrast to interpret function, not to rank one road type above another.',
    },
    {
      id: 'toefl-rhetorical-04',
      question: 'Why does the author discuss farmers reusing stones and erosion in paragraph 4?',
      options: [
        'To explain why interpreting ancient roads requires caution and additional evidence',
        'To argue that ancient roads cannot be studied at all',
        'To show that written records are always more accurate than physical remains',
        'To introduce a new argument about modern farming technology',
      ],
      answer: 0,
      explanation:
        'These examples show that later activity can change road remains, so archaeologists need to compare multiple kinds of evidence.',
      skill: 'supporting detail function',
      trap: 'The paragraph warns about difficulty, but it does not say roads are impossible to study.',
    },
    {
      id: 'toefl-rhetorical-05',
      question: 'What is the function of the final paragraph?',
      options: [
        'To summarize the broader significance of roads as evidence of movement, authority and social contact',
        'To reject all previous claims about cultural meaning',
        'To list the materials used to build ancient roads',
        'To explain why maps are more reliable than archaeological evidence',
      ],
      answer: 0,
      explanation:
        'The final paragraph synthesizes the passage’s main argument: roads reveal more than travel routes; they show social and political connections.',
      skill: 'paragraph function',
      trap: 'The phrase "lines on a map" is a contrast, not an argument that maps are the best evidence.',
    },
    {
      id: 'toefl-rhetorical-06',
      question: 'Why does the author use the phrase "not only where people traveled, but also how communities were connected" in the final sentence?',
      options: [
        'To emphasize the passage’s shift from physical movement to social relationships',
        'To suggest that the locations of roads are irrelevant',
        'To claim that communities were connected only by written records',
        'To introduce a separate topic about modern transportation',
      ],
      answer: 0,
      explanation:
        'The phrase reinforces the central purpose of the passage: road study reveals both travel routes and social connections.',
      skill: 'sentence function',
      trap: 'The author does not dismiss physical location; the point is that location is only part of the story.',
    },
  ],
};

export const TOEFL_SENTENCE_SIMPLIFICATION_PASSAGE: MultipleChoicePassage = {
  id: 'toefl-sentence-simplification-wetlands',
  title: 'Coastal wetlands and storm protection',
  passage: `Coastal wetlands are areas where land and water meet, including marshes, mangrove forests and tidal flats. For many years, some cities viewed these landscapes as empty or unhealthy spaces that should be drained for development. More recently, scientists have emphasized that wetlands provide services that engineered structures cannot easily replace.

One important function is storm protection. Wetland plants slow moving water, and their roots help hold soil in place. Although a wetland cannot stop every flood, it can reduce wave energy before water reaches roads, houses or seawalls. This effect is strongest when the wetland is wide enough and remains connected to the tides.

Wetlands also store carbon in waterlogged soils. Because plant material decomposes slowly when oxygen is limited, carbon can remain buried for long periods. However, if wetlands are drained or converted to farmland, stored carbon may be released into the atmosphere. Protecting wetlands therefore has both local and global environmental value.

Restoration projects are not simple. Replanting vegetation may fail if water flow has been blocked by roads or channels. In some places, managers must first restore tidal movement before plants can survive. Community support is also important because restored wetlands may look muddy or unfinished while they are recovering.

As sea levels rise, the future of wetlands will depend on whether they can move inland. If buildings or roads prevent that movement, wetlands may be squeezed between higher water and fixed development. Planners increasingly describe this problem as a conflict between natural adaptation and human land use.`,
  questions: [
    {
      id: 'toefl-ss-01',
      question:
        'Which of the following best expresses the essential information in this sentence? "More recently, scientists have emphasized that wetlands provide services that engineered structures cannot easily replace."',
      options: [
        'Scientists now stress that wetlands perform useful functions that are difficult for built structures to duplicate',
        'Scientists recently proved that engineered structures are never useful near wetlands',
        'Wetlands have become less valuable because cities can now build better structures',
        'Engineered structures are easy to replace when scientists study wetlands',
      ],
      answer: 0,
      explanation:
        'The correct option preserves the main idea: wetlands provide valuable services that built structures cannot easily duplicate.',
      skill: 'essential meaning',
      trap: 'Never, less valuable and easy reverse or exaggerate the original meaning.',
    },
    {
      id: 'toefl-ss-02',
      question:
        'Which option best simplifies this sentence? "Although a wetland cannot stop every flood, it can reduce wave energy before water reaches roads, houses or seawalls."',
      options: [
        'A wetland may not prevent all flooding, but it can weaken waves before they hit human structures',
        'A wetland stops every flood by blocking water from roads and houses',
        'Wetlands reduce wave energy only after water reaches seawalls',
        'Roads, houses and seawalls reduce wave energy before it reaches wetlands',
      ],
      answer: 0,
      explanation:
        'The option keeps the contrast: wetlands do not stop every flood, but they can reduce wave energy before it reaches built areas.',
      skill: 'contrast preservation',
      trap: 'Several options invert sequence or remove the limiting phrase "cannot stop every flood".',
    },
    {
      id: 'toefl-ss-03',
      question:
        'Which option best expresses the essential meaning of this sentence? "Because plant material decomposes slowly when oxygen is limited, carbon can remain buried for long periods."',
      options: [
        'Limited oxygen slows decomposition, allowing carbon from plant material to stay buried for a long time',
        'Plant material decomposes quickly when oxygen is limited, so carbon disappears immediately',
        'Carbon remains buried because wetlands contain no plant material',
        'Oxygen increases decomposition so much that wetlands cannot store carbon',
      ],
      answer: 0,
      explanation:
        'The correct answer preserves the cause-effect relationship: limited oxygen slows decomposition, which helps carbon remain buried.',
      skill: 'cause and effect',
      trap: 'The distractors reverse the direction of decomposition or remove plant material from the logic.',
    },
    {
      id: 'toefl-ss-04',
      question:
        'Which option best simplifies this sentence? "Replanting vegetation may fail if water flow has been blocked by roads or channels."',
      options: [
        'Planting new vegetation may not work when roads or channels prevent water from moving naturally',
        'Replanting always succeeds after roads and channels block water flow',
        'Roads and channels help vegetation grow by permanently stopping water',
        'Vegetation blocks roads and channels when restoration projects are simple',
      ],
      answer: 0,
      explanation:
        'The correct option keeps the condition: replanting can fail when water movement has been blocked.',
      skill: 'condition',
      trap: 'Always and permanently distort the conditional meaning of the original sentence.',
    },
    {
      id: 'toefl-ss-05',
      question:
        'Which option best expresses the essential information in this sentence? "In some places, managers must first restore tidal movement before plants can survive."',
      options: [
        'In certain areas, plants can survive only after managers bring back tidal flow',
        'Managers restore plants first so that tides can stop moving',
        'Tidal movement prevents all plants from surviving in restored wetlands',
        'Plants survive everywhere without any need for managers to change water flow',
      ],
      answer: 0,
      explanation:
        'The answer preserves order and dependency: tidal movement must be restored before plant survival is possible in some places.',
      skill: 'sequence and dependency',
      trap: 'The wrong options reverse the sequence or remove the condition "in some places".',
    },
    {
      id: 'toefl-ss-06',
      question:
        'Which option best simplifies this sentence? "If buildings or roads prevent that movement, wetlands may be squeezed between higher water and fixed development."',
      options: [
        'When development blocks inland movement, wetlands can become trapped between rising water and permanent structures',
        'Buildings and roads help wetlands move inland as sea levels rise',
        'Wetlands are squeezed only when water levels fall and development disappears',
        'Fixed development prevents sea levels from rising near wetlands',
      ],
      answer: 0,
      explanation:
        'The correct option keeps the conditional relationship: blocked inland movement can trap wetlands between rising water and fixed development.',
      skill: 'conditional paraphrase',
      trap: 'The distractors reverse the effect of buildings and roads or contradict rising sea levels.',
    },
  ],
};

export const TOEFL_INTEGRATED_WRITING_PROMPTS: IntegratedWritingPrompt[] = [
  {
    id: 'iw-urban-farming',
    topic: 'Urban farming and city food systems',
    readingTitle: 'Reading passage: The promise of rooftop farms',
    reading: `Some urban planners argue that rooftop farms can make cities more sustainable. First, they say these farms reduce the distance food travels before it reaches consumers. If vegetables are grown on buildings near restaurants and markets, fewer trucks are needed, which can lower fuel use and emissions.

Second, rooftop farms may help buildings use less energy. Soil and vegetation can provide an extra layer of insulation, keeping roofs cooler in summer and reducing the need for air conditioning. In dense cities, this could also help reduce the urban heat island effect.

Finally, supporters claim that rooftop farms can strengthen local communities. Residents who work together to grow food may develop stronger social connections, and schools can use the farms as outdoor classrooms for environmental education.`,
    lecture: `The lecturer is cautious about the reading's claims. She says rooftop farms can help in some cases, but their benefits are often overstated.

First, she challenges the transportation argument. Many rooftop farms produce small quantities of food and still need supplies such as soil, containers and irrigation equipment delivered by truck. As a result, the total transportation savings may be limited.

Second, she questions the energy claim. A green roof can insulate a building, but rooftop farms are heavier and require structural support, watering systems and maintenance access. For older buildings, these upgrades can be expensive and may cancel out the energy savings.

Third, she agrees that community benefits are possible, but she says they are not automatic. If a rooftop farm is managed by a private restaurant or company, local residents may have little access to it. Community value depends on how the project is organized, not simply on the presence of plants.`,
    task:
      'Summarize the points made in the lecture, explaining how they challenge or qualify the points made in the reading.',
    target:
      'Write a source-based response. Do not give your opinion; explain how the lecture responds to the reading point by point.',
    readingClaims: [
      'Rooftop farms reduce food transportation and emissions.',
      'Vegetation on roofs can lower building energy use.',
      'Rooftop farms can strengthen community connections.',
    ],
    lectureResponses: [
      'The lecturer says farms may still require truck deliveries for supplies and produce limited food.',
      'She says structural upgrades and maintenance can reduce or cancel energy savings.',
      'She says community benefits depend on access and management, not just the farm itself.',
    ],
    checklist: [
      'I introduce the overall relationship between lecture and reading.',
      'I cover all three reading points.',
      'I explain the lecture response to each point.',
      'I avoid personal opinion.',
      'I use reporting verbs such as argues, challenges, questions or notes.',
    ],
    phrases: [
      'The lecture challenges this point by explaining that...',
      'According to the lecturer, this benefit may be limited because...',
      'While the reading claims that...',
      'The professor does not completely reject this idea, but she notes that...',
    ],
  },
  {
    id: 'iw-museum-free-entry',
    topic: 'Free museum admission',
    readingTitle: 'Reading passage: Why museums should be free',
    reading: `Many cultural policy experts believe museums should offer free admission. They argue that museums preserve public heritage, so access should not depend on a visitor's income. Removing ticket prices could allow more families, students and low-income residents to benefit from collections.

Free admission could also increase tourism. Visitors may be more likely to enter several museums during one trip if they do not have to pay separate fees. Once inside, they may still spend money in cafes, shops or nearby businesses.

Finally, free entry can support education. Teachers can plan class visits more easily when cost is not a barrier, and students may return independently if they feel museums are open and welcoming spaces.`,
    lecture: `The professor argues that free admission is attractive but financially complicated.

First, he says ticket revenue often supports conservation, security and staff. If admission becomes free without another funding source, museums may have to reduce programs or delay restoration work, which could harm the same public heritage the reading wants to protect.

Second, he questions the tourism argument. Free entry may increase the number of visitors, but crowded galleries can make the experience worse. In addition, many visitors who enter for free may not spend enough in shops or cafes to replace ticket income.

Third, he agrees that free access can help schools, but he suggests targeted programs may work better. For example, museums can offer free school days, student passes or community partnerships while still charging regular visitors who can afford to pay.`,
    task:
      'Summarize the lecture and explain how it responds to the reading passage about free museum admission.',
    target:
      'Show contrast clearly: the reading supports free admission, while the lecture presents financial and practical limits.',
    readingClaims: [
      'Free admission makes public heritage accessible regardless of income.',
      'Free museums may attract tourists and increase related spending.',
      'Free entry supports school visits and educational access.',
    ],
    lectureResponses: [
      'Ticket revenue funds conservation, security and staff, so removing it can hurt museums.',
      'More visitors can create crowding, and shop spending may not replace ticket income.',
      'Targeted free programs may support education without eliminating all admission fees.',
    ],
    checklist: [
      'I identify the lecture as a challenge to the reading.',
      'I mention museum funding or ticket revenue.',
      'I explain the tourism/crowding counterpoint.',
      'I include the targeted education alternative.',
      'I keep my own opinion out of the answer.',
    ],
    phrases: [
      'The professor raises a concern about...',
      'This directly challenges the reading because...',
      'Instead of completely free admission, he suggests...',
      'The lecture qualifies the reading’s claim by saying that...',
    ],
  },
];

export const TOEFL_ACADEMIC_DISCUSSION_PROMPTS: WritingPrompt[] = [
  {
    id: 'adt-remote-work',
    topic: 'Remote work and productivity',
    professor:
      'This week we are discussing whether remote work improves productivity. Some companies believe it helps employees focus, while others worry that collaboration becomes weaker.',
    studentA:
      'I think remote work improves productivity because employees waste less time commuting and can design a quieter workspace.',
    studentB:
      'I disagree. In my experience, remote work can slow down teamwork because quick questions become long message threads.',
    question:
      'Which position do you find more convincing, and why? Use reasons and examples from your own knowledge or experience.',
    target: 'Take a clear position, respond to one student, and add one concrete example.',
    checklist: [
      'I state my position in the first sentence.',
      'I connect my answer to one student’s idea.',
      'I develop one reason instead of listing many.',
      'I include a concrete example.',
      'I use academic but natural language.',
    ],
    phrases: [
      'I find this argument convincing because...',
      'Although I understand the concern about...',
      'A practical example is...',
      'This suggests that...',
    ],
  },
  {
    id: 'adt-university-attendance',
    topic: 'Attendance policies',
    professor:
      'Today we are considering whether universities should require attendance in large lecture courses. Required attendance may encourage discipline, but optional attendance may promote independence.',
    studentA:
      'I support required attendance because students often underestimate how much they learn by listening to lectures in real time.',
    studentB:
      'I prefer optional attendance. University students are adults, so they should decide how to manage their own learning.',
    question:
      'Should attendance be required in large university lectures? Explain your view using reasons and examples.',
    target: 'Choose required or optional attendance and explain the academic consequence.',
    checklist: [
      'I answer the exact question.',
      'I mention large university lectures.',
      'I explain a consequence for learning.',
      'I avoid repeating both students without adding my own idea.',
    ],
    phrases: [
      'In large lecture courses, ...',
      'This policy would probably...',
      'I agree with the idea that...',
      'However, the stronger point is...',
    ],
  },
  {
    id: 'adt-ai-feedback',
    topic: 'AI feedback in writing classes',
    professor:
      'We are examining whether writing classes should use AI tools for early feedback. These tools can give immediate suggestions, but they may also make students depend too much on automated help.',
    studentA:
      'AI feedback is useful because students can revise more often before submitting a final essay.',
    studentB:
      'I am cautious about it. If students accept every suggestion, they may stop developing their own judgment.',
    question:
      'Should AI feedback be used in university writing classes? Support your answer with a reason and an example.',
    target: 'Give a balanced but clear answer; do not write a generic technology paragraph.',
    checklist: [
      'I give a clear yes, no, or conditional answer.',
      'I address feedback in writing classes specifically.',
      'I explain how students would use the tool.',
      'I include a realistic classroom example.',
    ],
    phrases: [
      'I would support this if...',
      'The main benefit is...',
      'The risk can be reduced by...',
      'For instance, a teacher could...',
    ],
  },
];

export const TOEFL_EMAIL_PROMPTS: EmailPrompt[] = [
  {
    id: 'email-office-hours',
    topic: 'Requesting a meeting with a professor',
    situation:
      'You missed an important part of a lecture because of a medical appointment. Write an email to your professor asking for help understanding the material.',
    task:
      'Explain why you are writing, ask for a short meeting or resource, and suggest two possible times.',
    audience: 'Professor',
    tone: 'formal',
    target: 'Write a respectful email that is specific enough for the professor to answer quickly.',
    checklist: [
      'I include a clear subject or opening purpose.',
      'I briefly explain the reason without over-sharing.',
      'I ask for one concrete action.',
      'I suggest two possible times or alternatives.',
      'I close politely.',
    ],
    phrases: [
      'I am writing to ask whether...',
      'Would it be possible to...',
      'I would be available...',
      'Thank you for your time and help.',
    ],
  },
  {
    id: 'email-library-room',
    topic: 'Changing a room reservation',
    situation:
      'You reserved a library study room for your group project, but your group now needs a larger room with a screen.',
    task:
      'Write to the library desk. Explain the situation, ask if a larger room is available, and mention your preferred time.',
    audience: 'Library staff',
    tone: 'semi-formal',
    target: 'Make the request easy to process: current reservation, needed change and time window.',
    checklist: [
      'I identify the original reservation.',
      'I explain why the change is needed.',
      'I request a larger room with a screen.',
      'I give a preferred time or flexible window.',
      'I thank the staff member.',
    ],
    phrases: [
      'I currently have a reservation for...',
      'Our group realized that we need...',
      'If possible, could we change it to...',
      'I appreciate your help.',
    ],
  },
  {
    id: 'email-club-event',
    topic: 'Inviting a classmate to an event',
    situation:
      'Your student club is organizing a short campus event related to environmental awareness. Write an email inviting a classmate.',
    task:
      'Describe the event, explain why your classmate might enjoy it, and include the time and location.',
    audience: 'Classmate',
    tone: 'friendly',
    target: 'Sound natural and complete: what, why, when, where and invitation.',
    checklist: [
      'I clearly describe the event.',
      'I include date, time and location.',
      'I explain why the person might be interested.',
      'I use a friendly but organized tone.',
      'I end with a clear invitation.',
    ],
    phrases: [
      'I thought you might be interested in...',
      'The event will take place...',
      'It could be a good chance to...',
      'Let me know if you want to come.',
    ],
  },
];

export const TOEFL_SENTENCE_BUILD_ITEMS: SentenceBuildItem[] = [
  {
    id: 'sentence-cause-01',
    focus: 'Cause and result',
    prompt: 'Build one academic sentence explaining a cause-result relationship.',
    fragments: ['because online courses offer flexible schedules', 'many working students', 'can continue their education'],
    answer: 'Many working students can continue their education because online courses offer flexible schedules.',
    explanation:
      'The sentence needs a clear subject, modal verb phrase and because-clause that explains the reason.',
    hint: 'Start with the subject: Many working students...',
  },
  {
    id: 'sentence-contrast-01',
    focus: 'Contrast',
    prompt: 'Build one sentence that contrasts a benefit with a limitation.',
    fragments: ['although group projects can improve communication skills', 'they may also create problems', 'when responsibilities are not shared equally'],
    answer:
      'Although group projects can improve communication skills, they may also create problems when responsibilities are not shared equally.',
    explanation:
      'Although introduces a contrast, so the main clause must show the limitation or opposing idea.',
    hint: 'Use a comma after the although-clause.',
  },
  {
    id: 'sentence-condition-01',
    focus: 'Condition',
    prompt: 'Build one sentence showing when a policy is likely to succeed.',
    fragments: ['a recycling program is more likely to succeed', 'if students understand its purpose', 'and have convenient places to sort waste'],
    answer:
      'A recycling program is more likely to succeed if students understand its purpose and have convenient places to sort waste.',
    explanation:
      'The if-clause gives the condition. The two verbs after students share the same subject: understand and have.',
    hint: 'Keep the two conditions parallel after students.',
  },
  {
    id: 'sentence-relative-01',
    focus: 'Relative clause',
    prompt: 'Build one sentence that defines a useful campus service.',
    fragments: ['academic advisors', 'help students choose courses', 'that match their goals and graduation requirements'],
    answer:
      'Academic advisors help students choose courses that match their goals and graduation requirements.',
    explanation:
      'The relative clause that match their goals modifies courses, so match agrees with plural courses.',
    hint: 'The word that should describe courses, not advisors.',
  },
  {
    id: 'sentence-concession-01',
    focus: 'Concession',
    prompt: 'Build one sentence with a concession and a clear opinion.',
    fragments: ['while public transportation may require more planning', 'it can reduce commuting costs', 'for university students'],
    answer:
      'While public transportation may require more planning, it can reduce commuting costs for university students.',
    explanation:
      'While introduces a concession. The main clause gives the stronger point: reduced commuting costs.',
    hint: 'Use while at the beginning and put the stronger point after the comma.',
  },
];

export const TOEFL_BUILD_A_SENTENCE_PROMPT_BANK: SentenceBuildPrompt[] = [
  {
    id: 'build-sentence-campus-transport',
    taskFocus: 'Cause and result',
    prompt:
      'Explain why a university might add more evening buses for students who work part-time.',
    targetStructure: 'Main clause + because-clause',
    modelSentence:
      'The university might add more evening buses because many part-time students finish work after regular campus shuttles stop running.',
    whyItWorks:
      'The sentence has one clear subject, one modal verb phrase and a because-clause that gives a specific reason.',
    commonError:
      'Do not write a fragment such as "Because many students work late." The reason needs a complete main clause.',
    transferTo: 'Write an Email: explaining a request clearly and politely.',
  },
  {
    id: 'build-sentence-online-feedback',
    taskFocus: 'Contrast',
    prompt:
      'Contrast the speed of online feedback with the risk of misunderstanding written comments.',
    targetStructure: 'Although-clause + main clause',
    modelSentence:
      'Although online feedback can reach students quickly, written comments may be misunderstood when the teacher cannot explain them in person.',
    whyItWorks:
      'Although sets up a benefit, while the main clause gives the limitation. The contrast is explicit and balanced.',
    commonError:
      'Avoid using although and but in the same sentence; one contrast marker is enough.',
    transferTo: 'Academic Discussion: balancing two sides before giving your view.',
  },
  {
    id: 'build-sentence-library-hours',
    taskFocus: 'Condition',
    prompt:
      'State a condition under which longer library hours would actually help students.',
    targetStructure: 'If-clause + main clause',
    modelSentence:
      'If the library also provides staff support at night, longer opening hours can help students finish research projects more effectively.',
    whyItWorks:
      'The if-clause gives the condition, and the main clause explains the practical result without overclaiming.',
    commonError:
      'Do not make the claim absolute. Longer hours help only under the condition stated.',
    transferTo: 'Academic Discussion: making a recommendation with a condition.',
  },
  {
    id: 'build-sentence-peer-study',
    taskFocus: 'Relative clause',
    prompt:
      'Define the type of peer study group that is most useful for exam preparation.',
    targetStructure: 'Noun phrase + relative clause',
    modelSentence:
      'Peer study groups that follow a clear schedule are more useful than informal meetings that have no specific goal.',
    whyItWorks:
      'The relative clauses define which groups are useful and which meetings are less effective.',
    commonError:
      'Make sure the verb agrees with the noun it describes: groups that follow, not groups that follows.',
    transferTo: 'Build a Sentence: defining a key term before explaining it.',
  },
  {
    id: 'build-sentence-campus-gardens',
    taskFocus: 'Concession',
    prompt:
      'Acknowledge a cost of campus gardens while arguing that they can still benefit students.',
    targetStructure: 'While-clause + main opinion',
    modelSentence:
      'While campus gardens require regular maintenance, they can give students a practical space to learn about sustainability.',
    whyItWorks:
      'The concession admits a real cost, and the main clause gives a stronger educational benefit.',
    commonError:
      'Do not let the concession become the whole answer. The sentence still needs a clear main point.',
    transferTo: 'Academic Discussion: disagreeing partly without sounding extreme.',
  },
  {
    id: 'build-sentence-ai-tools',
    taskFocus: 'Purpose',
    prompt:
      'Explain the purpose of teaching students how to use AI tools responsibly.',
    targetStructure: 'Infinitive of purpose',
    modelSentence:
      'Teachers should discuss AI tools in class to help students understand when technology supports learning and when it replaces their own thinking.',
    whyItWorks:
      'The infinitive phrase to help states the purpose, and the when/when contrast clarifies the boundary.',
    commonError:
      'Avoid vague purpose language such as "for better education" without explaining what better means.',
    transferTo: 'Academic Discussion: adding a practical reason to a policy opinion.',
  },
];

export const TOEFL_WRITING_MIXED_DRILLS: ToeflWritingMixedDrill[] = [
  {
    id: 'writing-mixed-01',
    taskType: 'Build a Sentence',
    title: 'Turn a reason into one precise sentence',
    situation:
      'A practice item asks you to express why flexible office hours can help university staff.',
    prompt: 'Which response best fits a Build a Sentence microtask?',
    options: [
      'Flexible office hours can help university staff because they allow employees to meet students at times that match different schedules.',
      'Dear Professor, I am writing to ask whether your office hours can be moved to Friday afternoon.',
      'I agree with Maya because flexible schedules can improve access to academic support for students.',
    ],
    answer: 0,
    explanation:
      'Build a Sentence requires one complete sentence with a clear relationship. Option A gives a cause-result sentence without email framing or discussion response.',
    structureCue: 'Main clause + because-clause',
    trap:
      'Option B is an email opening, and option C responds to a class discussion. Both may be useful in TOEFL Writing, but not for this microtask.',
    nextStep: 'Use this structure inside Write an Email when you need to justify a request.',
  },
  {
    id: 'writing-mixed-02',
    taskType: 'Write an Email',
    title: 'Choose the right opening for a campus request',
    situation:
      'You need to ask a housing coordinator whether you can arrive one day before official move-in because your flight lands early.',
    prompt: 'Which response best fits Write an Email?',
    options: [
      'Early arrival can reduce stress because students have more time to adjust before classes begin.',
      'Dear Housing Office, I am writing to ask whether it would be possible to arrive one day before the official move-in date.',
      'In my opinion, universities should offer flexible move-in dates because international travel is unpredictable.',
    ],
    answer: 1,
    explanation:
      'Write an Email needs a recipient-aware opening, purpose and polite request. Option B clearly identifies the audience and the action needed.',
    structureCue: 'Greeting + purpose + polite request',
    trap:
      'Option A is only a sentence, and option C sounds like Academic Discussion rather than a direct email to an office.',
    nextStep: 'Add details: flight date, reason, and a polite closing action.',
  },
  {
    id: 'writing-mixed-03',
    taskType: 'Write for an Academic Discussion',
    title: 'Add a class contribution, not an email',
    situation:
      'A professor asks whether universities should require first-year students to take a financial literacy course. Two classmates have already posted different views.',
    prompt: 'Which response best fits Academic Discussion?',
    options: [
      'Dear Professor, could you please tell me whether the course is required for all first-year students?',
      'Although some students may see the course as an extra requirement, I think it should be mandatory because it teaches practical decisions about loans and budgeting.',
      'Financial literacy courses help students because they explain loans, budgeting and long-term planning.',
    ],
    answer: 1,
    explanation:
      'Academic Discussion needs a position plus development. Option B acknowledges another side and then gives a clear opinion with a reason.',
    structureCue: 'Concession + position + reason',
    trap:
      'Option A is an email question. Option C is a good sentence, but it is too limited as a class contribution.',
    nextStep: 'Extend it with a concrete example or connection to a classmate’s idea.',
  },
  {
    id: 'writing-mixed-04',
    taskType: 'Build a Sentence',
    title: 'Keep a condition inside one sentence',
    situation:
      'A practice item asks you to explain when an online study group is likely to work well.',
    prompt: 'Which response best fits Build a Sentence?',
    options: [
      'If members agree on a weekly agenda, an online study group can stay focused and productive.',
      'Hi Alex, do you want to join our online study group this semester?',
      'I would support online study groups because they can be convenient for students who commute.',
    ],
    answer: 0,
    explanation:
      'Option A is a complete conditional sentence. It states the condition and the result in one controlled structure.',
    structureCue: 'If-clause + result clause',
    trap:
      'Option B is an invitation email. Option C sounds like Academic Discussion because it takes a position.',
    nextStep: 'Use this conditional pattern to make opinions less absolute in Academic Discussion.',
  },
  {
    id: 'writing-mixed-05',
    taskType: 'Write an Email',
    title: 'Match tone to a professor',
    situation:
      'You missed a deadline for a short assignment because of a documented medical appointment and need to ask for a brief extension.',
    prompt: 'Which response best fits Write an Email?',
    options: [
      'Because medical appointments can interrupt academic work, deadline flexibility may support student success.',
      'I disagree with the idea that late work should never be accepted, since unexpected events can affect responsible students.',
      'Dear Professor Lee, I apologize for missing the deadline and would like to ask whether I may submit the assignment by Friday.',
    ],
    answer: 2,
    explanation:
      'An email to a professor needs respectful tone, apology or context, and a specific request. Option C does that directly.',
    structureCue: 'Greeting + apology/context + specific request',
    trap:
      'Option A is a general sentence. Option B is a discussion stance, not a direct message to the professor.',
    nextStep: 'Add one concise reason and attach or mention documentation if appropriate.',
  },
  {
    id: 'writing-mixed-06',
    taskType: 'Write for an Academic Discussion',
    title: 'Respond to a policy question',
    situation:
      'A class discussion asks whether colleges should limit AI tools in writing courses.',
    prompt: 'Which response best fits Academic Discussion?',
    options: [
      'Teachers should discuss AI tools in class to help students understand when technology supports learning and when it replaces their own thinking.',
      'Dear classmates, I am writing to request permission to use AI tools for my next essay.',
      'I partly agree that colleges should limit AI tools, but the stronger policy would be to teach responsible use, because students need to understand both support and misuse.',
    ],
    answer: 2,
    explanation:
      'Option C gives a nuanced position and reason, which fits Academic Discussion. It can respond to classmates while still adding an original idea.',
    structureCue: 'Partial agreement + better policy + reason',
    trap:
      'Option A is a strong sentence, but it does not fully enter a discussion. Option B uses email framing.',
    nextStep: 'Add a short example, such as outlining help versus paragraph generation.',
  },
  {
    id: 'writing-mixed-07',
    taskType: 'Build a Sentence',
    title: 'Choose one sentence, not a paragraph',
    situation:
      'A practice item asks you to show why quiet study rooms may improve concentration for students preparing for exams.',
    prompt: 'Which response best fits Build a Sentence?',
    options: [
      'Dear Library Staff, I am writing to ask whether more quiet rooms will be available during final exams.',
      'Quiet study rooms can improve concentration because they reduce interruptions during exam preparation.',
      'I agree that quiet rooms are useful, but universities should also teach students how to manage noisy environments.',
    ],
    answer: 1,
    explanation:
      'Option B is one complete cause-result sentence. It does not introduce an email audience or a discussion stance.',
    structureCue: 'Subject + modal/can + because-clause',
    trap:
      'Option A has the right topic but becomes an email. Option C is a discussion contribution because it reacts to a policy idea.',
    nextStep: 'Practice removing greetings and opinions when the task only asks for a controlled sentence.',
  },
  {
    id: 'writing-mixed-08',
    taskType: 'Write an Email',
    title: 'Make the request specific',
    situation:
      'You volunteered for a campus event but now have a required exam review session at the same time. You need to write to the event organizer.',
    prompt: 'Which response best fits Write an Email?',
    options: [
      'Campus events are important because they help students feel connected to the university community.',
      'I think volunteer schedules should be flexible when students have academic responsibilities.',
      'Dear Ms. Carter, I am sorry, but I cannot volunteer on Saturday because I have a required exam review session. Could I help at a later shift instead?',
    ],
    answer: 2,
    explanation:
      'Option C identifies the recipient, apologizes, explains the conflict and offers a concrete alternative.',
    structureCue: 'Greeting + apology + reason + alternative',
    trap:
      'Option A is only a general sentence. Option B sounds like Academic Discussion because it argues for a policy.',
    nextStep: 'Add a polite closing and, if needed, mention the exact time of the review session.',
  },
  {
    id: 'writing-mixed-09',
    taskType: 'Write for an Academic Discussion',
    title: 'Do more than agree',
    situation:
      'A professor asks whether universities should require students to complete a community service project before graduation.',
    prompt: 'Which response best fits Academic Discussion?',
    options: [
      'I would support a community service requirement if students could choose projects related to their field, because that condition makes the work educational rather than just obligatory.',
      'Community service projects can help students develop empathy and understand local problems.',
      'Dear Professor, could you please explain whether the community service project would count for credit?',
    ],
    answer: 0,
    explanation:
      'Option A gives a clear position, adds a condition and explains why the condition matters. That is a developed discussion contribution.',
    structureCue: 'Position + condition + reason',
    trap:
      'Option B is a useful sentence but underdeveloped for discussion. Option C is an email-style question.',
    nextStep: 'Add a specific example, such as engineering students helping with a public design project.',
  },
  {
    id: 'writing-mixed-10',
    taskType: 'Build a Sentence',
    title: 'Use contrast without email framing',
    situation:
      'A practice item asks you to contrast online textbooks with printed books in one sentence.',
    prompt: 'Which response best fits Build a Sentence?',
    options: [
      'Dear Bookstore Manager, I would like to ask whether digital textbooks will be cheaper next semester.',
      'I prefer online textbooks because they are easier to search and usually cost less.',
      'Although printed books can be easier to read for long periods, online textbooks are easier to search and carry.',
    ],
    answer: 2,
    explanation:
      'Option C is one controlled contrast sentence. It uses although to compare a benefit of printed books with a benefit of online textbooks.',
    structureCue: 'Although-clause + main contrast',
    trap:
      'Option A becomes an email. Option B is a simple opinion and would need more context in Academic Discussion.',
    nextStep: 'Use this contrast pattern when a discussion answer needs nuance, but keep it as one sentence for this task.',
  },
  {
    id: 'writing-mixed-11',
    taskType: 'Write an Email',
    title: 'Ask for clarification politely',
    situation:
      'Your professor changed the instructions for a group presentation, and your team is unsure whether the slides must include citations.',
    prompt: 'Which response best fits Write an Email?',
    options: [
      'Presentations are stronger when slides include citations because students can verify the source of each claim.',
      'Dear Professor Ahmed, my group is preparing the presentation, and we would like to clarify whether each slide should include citations or only the final reference slide.',
      'I agree that citation rules should be clear because unclear instructions can create unfair grading differences.',
    ],
    answer: 1,
    explanation:
      'Option B is a direct, respectful clarification email with a precise question about the instructions.',
    structureCue: 'Greeting + context + clarification question',
    trap:
      'Option A is only a sentence. Option C is a discussion-style policy argument rather than a message to the professor.',
    nextStep: 'Close with thanks and mention the presentation date if timing matters.',
  },
  {
    id: 'writing-mixed-12',
    taskType: 'Write for an Academic Discussion',
    title: 'Balance convenience and learning',
    situation:
      'A class discussion asks whether recorded lectures should replace some live classes at university.',
    prompt: 'Which response best fits Academic Discussion?',
    options: [
      'Dear Professor, could you please upload the recording from today’s class?',
      'Recorded lectures are convenient because students can review difficult explanations more than once.',
      'Recorded lectures should supplement rather than replace live classes because they help with review, but live meetings give students a chance to ask questions and respond to classmates.',
    ],
    answer: 2,
    explanation:
      'Option C takes a balanced position and explains both sides. It fits a class discussion because it evaluates a policy, not just a feature.',
    structureCue: 'Balanced position + contrast + reason',
    trap:
      'Option A is an email request. Option B is a correct sentence but too narrow for a full discussion response.',
    nextStep: 'Add a course example, such as reviewing a complex statistics lecture before a live problem-solving session.',
  },
];

export const TOEFL_WRITING_SCORED_VARIANTS: ToeflWritingScoredVariant[] = [
  {
    id: 'scored-build-sentence-strong-feedback',
    taskType: 'Build a Sentence',
    label: 'Strong controlled sentence',
    prompt:
      'Combine the idea into one complete sentence: specific feedback / helps students revise / more effectively than a simple final grade.',
    response:
      'Specific feedback helps students revise more effectively than a simple final grade because it shows them exactly what to improve.',
    welearnScoreEstimate: 5,
    scoreLabel: 'Fuerte para práctica WeLearn',
    whyThisScore: [
      'La oración tiene sujeto, verbo principal y comparación clara.',
      'La cláusula because añade razón específica sin crear un fragmento.',
      'El vocabulario es preciso y no intenta sonar artificialmente académico.',
    ],
    upgradeMove:
      'Para llevarla al máximo, reduce cualquier palabra repetida si el prompt original ya menciona feedback.',
    checklist: [
      'Tiene una sola oración completa.',
      'La relación lógica es visible.',
      'No mezcla email ni discusión.',
    ],
  },
  {
    id: 'scored-build-sentence-developing-feedback',
    taskType: 'Build a Sentence',
    label: 'Developing sentence with fragment risk',
    prompt:
      'Combine the idea into one complete sentence: specific feedback / helps students revise / more effectively than a simple final grade.',
    response:
      'Because specific feedback helps students revise more effectively than a simple final grade.',
    welearnScoreEstimate: 2,
    scoreLabel: 'En desarrollo',
    whyThisScore: [
      'La idea principal es correcta, pero la respuesta queda como fragmento.',
      'Because introduce una razón, pero falta una oración principal.',
      'El estudiante entiende el vocabulario, aunque no controla la estructura.',
    ],
    upgradeMove:
      'Quita because o añade una oración principal: Specific feedback helps students revise more effectively because it identifies exact problems.',
    checklist: [
      'Revisa si el conector dejó una frase incompleta.',
      'Busca sujeto y verbo principal.',
      'Mantén la respuesta como una sola oración.',
    ],
  },
  {
    id: 'scored-email-strong-housing',
    taskType: 'Write an Email',
    label: 'Strong polite campus request',
    prompt:
      'You need to ask the housing office if you can move in one day early because your international flight arrives before the official move-in date.',
    response:
      'Dear Housing Office,\n\nI am writing to ask whether it would be possible to move into my room one day before the official move-in date. My international flight arrives on August 20, and I would not have another safe place to stay that night.\n\nIf early check-in is not available, could you please let me know whether the university recommends temporary housing near campus?\n\nThank you for your help.\n\nBest regards,\nAna Torres',
    welearnScoreEstimate: 5,
    scoreLabel: 'Fuerte para práctica WeLearn',
    whyThisScore: [
      'El propósito aparece en la primera línea después del saludo.',
      'La razón es concreta y suficiente sin sonar dramática.',
      'Incluye una alternativa clara si la primera solicitud no es posible.',
    ],
    upgradeMove:
      'Para hacerlo todavía más eficiente, añade número de estudiante solo si el prompt lo pide o si el contexto lo necesita.',
    checklist: [
      'Saludo y cierre apropiados.',
      'Solicitud específica.',
      'Razón breve y verificable.',
      'Plan alternativo o siguiente acción.',
    ],
  },
  {
    id: 'scored-email-developing-housing',
    taskType: 'Write an Email',
    label: 'Developing email with weak tone',
    prompt:
      'You need to ask the housing office if you can move in one day early because your international flight arrives before the official move-in date.',
    response:
      'Hi, I arrive early and need my room. Please make an exception because I already bought my ticket. Tell me soon.',
    welearnScoreEstimate: 2,
    scoreLabel: 'En desarrollo',
    whyThisScore: [
      'El mensaje comunica la necesidad, pero el tono suena exigente.',
      'No hay saludo institucional ni cierre.',
      'La petición no ofrece alternativa ni reconoce que la oficina puede tener reglas.',
    ],
    upgradeMove:
      'Convierte la exigencia en pregunta: Would it be possible to move in one day early? Luego añade una razón y una alternativa.',
    checklist: [
      'El tono debe sonar respetuoso.',
      'La solicitud debe ser pregunta, no orden.',
      'Incluye contexto mínimo.',
      'Cierra con agradecimiento.',
    ],
  },
  {
    id: 'scored-discussion-strong-ai',
    taskType: 'Write for an Academic Discussion',
    label: 'Strong academic contribution',
    prompt:
      'Professor: Some colleges are considering strict limits on AI tools in writing courses. Do you think strict limits help students learn, or should teachers focus on responsible use?',
    response:
      'I think teachers should focus on responsible use rather than strict limits. A total restriction may stop obvious misuse, but it does not teach students how to make good decisions when the technology is available outside class. For example, a writing course could allow AI for brainstorming but require students to submit their own outline and final paragraph. This approach protects independent thinking while still preparing students for real academic and professional settings.',
    welearnScoreEstimate: 5,
    scoreLabel: 'Fuerte para práctica WeLearn',
    whyThisScore: [
      'La postura aparece de inmediato y responde la pregunta del profesor.',
      'Reconoce el otro lado sin perder control de la opinión.',
      'El ejemplo distingue brainstorming, outline y final paragraph, así que no queda genérico.',
    ],
    upgradeMove:
      'Para subir precisión, conecta una frase explícitamente con un compañero si el prompt incluye posts de estudiantes.',
    checklist: [
      'Postura clara.',
      'Razón desarrollada.',
      'Ejemplo específico.',
      'Conexión con el contexto académico.',
    ],
  },
  {
    id: 'scored-discussion-developing-ai',
    taskType: 'Write for an Academic Discussion',
    label: 'Developing discussion with general support',
    prompt:
      'Professor: Some colleges are considering strict limits on AI tools in writing courses. Do you think strict limits help students learn, or should teachers focus on responsible use?',
    response:
      'I agree with responsible use because AI is very important today. Students can use it for many things and it is helpful. Strict rules are bad because students do not like them and technology is the future.',
    welearnScoreEstimate: 3,
    scoreLabel: 'Intermedio bajo',
    whyThisScore: [
      'La postura es entendible, pero las razones son generales.',
      'No explica cómo responsible use funcionaría en un curso de writing.',
      'La frase technology is the future suena amplia y no prueba la opinión.',
    ],
    upgradeMove:
      'Añade un mecanismo concreto: allow AI for brainstorming, require human-written drafts, and ask students to explain edits.',
    checklist: [
      'Evita razones genéricas.',
      'Explica cómo funcionaría la política.',
      'Usa un ejemplo académico.',
      'Cierra con una idea conectada a aprendizaje.',
    ],
  },
];

export const TOEFL_WRITING_REVISION_DRILLS: ToeflWritingRevisionDrill[] = [
  {
    id: 'revision-build-fragment-because',
    taskType: 'Build a Sentence',
    title: 'Fix a because fragment',
    focus: 'Complete sentence',
    prompt:
      'Combine the idea into one complete sentence: online tutoring / helps commuters / because they can study after work.',
    flawedResponse:
      'Because online tutoring helps commuters study after work.',
    question: 'What is the best revision move?',
    options: [
      'Remove because or add a main clause so the sentence is complete.',
      'Add a greeting because the response should sound polite.',
      'Add a personal opinion about whether tutoring should be free.',
    ],
    answer: 0,
    explanation:
      'The response is a fragment because because introduces a dependent clause. Build a Sentence needs one complete sentence, not an email or discussion opinion.',
    evidence: 'Because online tutoring helps commuters study after work lacks an independent main clause.',
    trap:
      'Politeness and opinion can matter in other TOEFL Writing tasks, but they do not fix the structural problem here.',
    rewriteAction:
      'Online tutoring helps commuters because they can study after work.',
  },
  {
    id: 'revision-build-double-contrast',
    taskType: 'Build a Sentence',
    title: 'Remove double contrast',
    focus: 'Connector control',
    prompt:
      'Build one sentence contrasting printed notes with shared digital notes.',
    flawedResponse:
      'Although printed notes are easier to mark by hand, but shared digital notes are easier to update.',
    question: 'What is the best revision move?',
    options: [
      'Keep both although and but because contrast needs two signals.',
      'Remove but and let although create the contrast.',
      'Turn the sentence into an email asking classmates for notes.',
    ],
    answer: 1,
    explanation:
      'Although already marks contrast, so but creates a double connector error. The sentence should keep one contrast signal.',
    evidence: 'Although printed notes are easier to mark by hand, shared digital notes are easier to update.',
    trap:
      'Adding more transition words often makes a sentence weaker, not stronger.',
    rewriteAction:
      'Although printed notes are easier to mark by hand, shared digital notes are easier to update.',
  },
  {
    id: 'revision-email-missing-request',
    taskType: 'Write an Email',
    title: 'Add the missing request',
    focus: 'Purpose and action',
    prompt:
      'Write an email to a professor explaining that you missed a quiz because of a medical appointment and asking what you should do next.',
    flawedResponse:
      'Dear Professor Kim, I missed the quiz because I had a medical appointment. I am sorry for the inconvenience. Thank you.',
    question: 'What is the best revision move?',
    options: [
      'Add a direct question asking what next step is possible.',
      'Remove the apology because formal emails should be short.',
      'Change it into an academic opinion about attendance policies.',
    ],
    answer: 0,
    explanation:
      'The email explains and apologizes, but it does not ask what the student should do next. The prompt requires a next-step request.',
    evidence: 'The response ends with Thank you without asking about a makeup quiz, alternative assignment or next action.',
    trap:
      'A short email can still be incomplete if it misses one required action from the situation.',
    rewriteAction:
      'Add: Could you please let me know whether I should complete a makeup quiz or another assignment?',
  },
  {
    id: 'revision-email-tone-too-direct',
    taskType: 'Write an Email',
    title: 'Soften an overly direct tone',
    focus: 'Tone and audience',
    prompt:
      'Write an email to the library desk asking whether a reserved study room can be changed to a later time.',
    flawedResponse:
      'Move my study room to 6 p.m. because I cannot come earlier.',
    question: 'What is the best revision move?',
    options: [
      'Keep the sentence because direct language is always clearer.',
      'Add a polite greeting, request form and reason.',
      'Add a class discussion position about library policies.',
    ],
    answer: 1,
    explanation:
      'The message has a clear need, but the tone is too commanding for an email to a service desk. It needs polite request language.',
    evidence: 'Move my study room is an imperative, not a request.',
    trap:
      'Clarity does not mean sounding demanding. TOEFL email tasks reward audience-aware tone.',
    rewriteAction:
      'Dear Library Desk, would it be possible to change my study room reservation to 6 p.m.? I cannot arrive at the earlier time because of a class conflict.',
  },
  {
    id: 'revision-discussion-general-reason',
    taskType: 'Write for an Academic Discussion',
    title: 'Replace a generic reason',
    focus: 'Development',
    prompt:
      'Professor: Should universities require students to take a course on public speaking?',
    flawedResponse:
      'I think public speaking courses are good because communication is important and students need it in the future.',
    question: 'What is the best revision move?',
    options: [
      'Add a concrete academic or professional example showing why the course helps.',
      'Turn the response into an email asking the professor for the syllabus.',
      'Remove the opinion so the paragraph sounds more neutral.',
    ],
    answer: 0,
    explanation:
      'The position is clear, but the reason is generic. Academic Discussion needs development through a mechanism, example or consequence.',
    evidence: 'Communication is important and students need it in the future does not explain how the course improves learning.',
    trap:
      'Neutrality is not the goal. A discussion response needs a position plus developed support.',
    rewriteAction:
      'Add: For example, engineering students often have to present project results, so a public speaking course would help them explain technical ideas to non-specialists.',
  },
  {
    id: 'revision-discussion-no-class-connection',
    taskType: 'Write for an Academic Discussion',
    title: 'Connect to the discussion',
    focus: 'Academic interaction',
    prompt:
      'Professor: Some students argue that group projects teach collaboration, while others say they create unfair workloads. What is your view?',
    flawedResponse:
      'Group projects are bad. I had a bad group once, and nobody helped me.',
    question: 'What is the best revision move?',
    options: [
      'Add more personal details to make the story longer.',
      'Connect the experience to the class question and propose a condition for fair group work.',
      'Change the answer into one sentence only because shorter is always safer.',
    ],
    answer: 1,
    explanation:
      'The personal experience can support the answer, but it must connect to the academic issue: collaboration versus unfair workload.',
    evidence: 'The flawed response says group projects are bad but does not analyze when or why the workload becomes unfair.',
    trap:
      'More personal detail can make the response longer without making it more academic.',
    rewriteAction:
      'Write: Group projects can teach collaboration if professors require individual role reports, because that condition reduces unfair workloads while preserving teamwork.',
  },
];

export const IELTS_TASK2_PROMPT_BANK: IeltsTask2Prompt[] = [
  {
    id: 'ielts-task2-opinion-public-transport',
    essayType: 'Opinion',
    route: '/practica/ielts/academic/writing/task2/opinion',
    prompt:
      'Some people believe that governments should make public transport free in large cities. To what extent do you agree or disagree?',
    target:
      'Take a clear position on free public transport and defend it with two developed reasons, not a list of benefits.',
    plan: [
      'Introduction: paraphrase the policy and state whether you mostly agree, disagree or agree with conditions.',
      'Body 1: explain the strongest public benefit, such as reduced congestion or cleaner air.',
      'Body 2: handle the cost problem and propose a condition, such as funding only high-demand routes first.',
      'Conclusion: restate the position and the condition that makes it realistic.',
    ],
    thesisMove:
      'I largely agree, provided that the policy is targeted at busy urban routes rather than applied without financial planning.',
    usefulLanguage: [
      'This policy would be most effective if...',
      'The main justification is that...',
      'A blanket approach, however, could...',
      'For this reason, I support the measure with clear limits.',
    ],
    commonTrap:
      'Writing a balanced advantages/disadvantages essay instead of answering to what extent you agree.',
    selfCheck: [
      'My opinion is visible in the introduction.',
      'Each body paragraph supports the same position.',
      'I explain how the policy would be funded or limited.',
      'I do not switch to discussing both sides equally.',
    ],
  },
  {
    id: 'ielts-task2-opinion-ai-homework',
    essayType: 'Opinion',
    route: '/practica/ielts/academic/writing/task2/opinion',
    prompt:
      'Some educators argue that students should be banned from using artificial intelligence tools for homework. To what extent do you agree or disagree?',
    target:
      'Write a clear agree/disagree essay that separates academic honesty from responsible guided use.',
    plan: [
      'Introduction: define the issue as homework integrity and state a nuanced position.',
      'Body 1: explain why unrestricted AI use can weaken learning and make assessment unreliable.',
      'Body 2: argue for supervised uses such as brainstorming, feedback or vocabulary support.',
      'Conclusion: reaffirm that rules are better than a total ban.',
    ],
    thesisMove:
      'I disagree with a complete ban because schools should restrict final-answer outsourcing while teaching controlled, transparent use.',
    usefulLanguage: [
      'A complete ban would overlook...',
      'The real risk is not the tool itself, but...',
      'Under clear guidelines, students can...',
      'This distinction matters because...',
    ],
    commonTrap:
      'Sounding absolute: either AI is always harmful or always beneficial. IELTS rewards a controlled, defensible position.',
    selfCheck: [
      'I answer the ban question directly.',
      'I separate misuse from responsible use.',
      'I include a classroom-specific example.',
      'My conclusion does not introduce a new policy.',
    ],
  },
  {
    id: 'ielts-task2-discussion-online-degrees',
    essayType: 'Discussion',
    route: '/practica/ielts/academic/writing/task2/discussion',
    prompt:
      'Some people think online university degrees should be considered equal to traditional degrees. Others believe face-to-face study is still superior. Discuss both views and give your own opinion.',
    target:
      'Develop both views fairly and then make your own evaluation clear.',
    plan: [
      'Introduction: paraphrase both views and preview your opinion.',
      'Body 1: explain why online degrees can be equal when assessment and teaching quality are rigorous.',
      'Body 2: explain why face-to-face study may offer stronger networking and practical interaction.',
      'Conclusion: decide which view is stronger and under what condition.',
    ],
    thesisMove:
      'Although campus study offers richer interaction, I believe online degrees deserve equal recognition when their assessment standards are transparent.',
    usefulLanguage: [
      'Supporters of online degrees argue that...',
      'By contrast, advocates of campus learning point out that...',
      'My own view is that the decisive factor is...',
      'This means equality should depend on quality control rather than location.',
    ],
    commonTrap:
      'Forgetting your own opinion after discussing both sides.',
    selfCheck: [
      'Both views receive a developed paragraph.',
      'My opinion appears in the introduction or conclusion.',
      'I compare quality and outcomes, not just convenience.',
      'The conclusion does more than repeat both views.',
    ],
  },
  {
    id: 'ielts-task2-discussion-city-cameras',
    essayType: 'Discussion',
    route: '/practica/ielts/academic/writing/task2/discussion',
    prompt:
      'Some people support installing more surveillance cameras in public places to reduce crime. Others believe this harms personal privacy. Discuss both views and give your own opinion.',
    target:
      'Balance public safety and privacy, then state a defensible policy position.',
    plan: [
      'Introduction: present the safety-vs-privacy tension and your final stance.',
      'Body 1: explain how cameras can deter crime and help investigations in high-risk areas.',
      'Body 2: explain privacy concerns and the danger of constant monitoring without oversight.',
      'Conclusion: support limited use with rules on storage, access and location.',
    ],
    thesisMove:
      'I support cameras in clearly defined high-risk public areas, but only with strict limits on data use and independent oversight.',
    usefulLanguage: [
      'Those in favour claim that...',
      'Privacy advocates, however, warn that...',
      'A proportionate approach would...',
      'The key issue is not whether cameras exist, but how they are controlled.',
    ],
    commonTrap:
      'Turning the essay into a one-sided crime essay and ignoring privacy.',
    selfCheck: [
      'I explain the privacy view seriously.',
      'I do not use fear-based claims without reasoning.',
      'My opinion includes a policy condition.',
      'I avoid extreme language such as always safe or completely dangerous.',
    ],
  },
  {
    id: 'ielts-task2-advdis-four-day-week',
    essayType: 'Advantages and disadvantages',
    route: '/practica/ielts/academic/writing/task2/advantages-disadvantages',
    prompt:
      'In some countries, companies are experimenting with a four-day working week. Do the advantages of this development outweigh the disadvantages?',
    target:
      'Evaluate both sides and decide which has greater weight.',
    plan: [
      'Introduction: paraphrase the trend and state whether advantages outweigh disadvantages.',
      'Body 1: explain benefits for productivity, health and retention.',
      'Body 2: explain risks for customer service, workload compression or small businesses.',
      'Conclusion: compare weight and give the final judgment.',
    ],
    thesisMove:
      'The advantages outweigh the disadvantages when companies redesign workloads rather than forcing five days of tasks into four.',
    usefulLanguage: [
      'One significant advantage is...',
      'This benefit is not automatic because...',
      'The main drawback is that...',
      'Overall, the benefits are stronger if...',
    ],
    commonTrap:
      'Listing advantages and disadvantages without answering outweigh.',
    selfCheck: [
      'I clearly say which side outweighs the other.',
      'I compare impact, not just number of points.',
      'I include a condition or limitation.',
      'The conclusion repeats the judgment, not only the topic.',
    ],
  },
  {
    id: 'ielts-task2-advdis-tourism-limits',
    essayType: 'Advantages and disadvantages',
    route: '/practica/ielts/academic/writing/task2/advantages-disadvantages',
    prompt:
      'Many popular tourist destinations are limiting the number of visitors each day. What are the advantages and disadvantages of this approach?',
    target:
      'Explain both advantages and disadvantages without forcing an outweigh answer unless the prompt asks for one.',
    plan: [
      'Introduction: paraphrase visitor limits and say the essay will examine both sides.',
      'Body 1: explain advantages for preservation, crowd control and resident quality of life.',
      'Body 2: explain disadvantages for local income, small businesses and visitor access.',
      'Conclusion: summarize the trade-off and mention careful management.',
    ],
    thesisMove:
      'Visitor limits can protect fragile places, although they may reduce income for communities that depend on tourism.',
    usefulLanguage: [
      'A clear advantage of this policy is...',
      'It can also protect...',
      'On the other hand, limiting visitors may...',
      'The policy therefore creates a trade-off between...',
    ],
    commonTrap:
      'Answering as if the prompt asks whether advantages outweigh disadvantages. This one asks for both sides only.',
    selfCheck: [
      'I do not invent an agree/disagree position.',
      'I develop at least one concrete advantage and one concrete disadvantage.',
      'I mention people affected, such as residents, businesses or tourists.',
      'The conclusion summarizes rather than adding a new example.',
    ],
  },
  {
    id: 'ielts-task2-problem-solution-food-waste',
    essayType: 'Problem-solution',
    route: '/practica/ielts/academic/writing/task2/problem-solution',
    prompt:
      'Many households throw away large amounts of food every week. Why does this happen, and what measures could reduce the problem?',
    target:
      'Connect causes with realistic solutions instead of writing two unrelated lists.',
    plan: [
      'Introduction: paraphrase food waste and preview causes plus solutions.',
      'Body 1: explain causes such as overbuying, unclear date labels and poor meal planning.',
      'Body 2: propose linked solutions such as label education, smaller package options and planning apps.',
      'Conclusion: restate that reducing waste needs both information and practical purchasing changes.',
    ],
    thesisMove:
      'Food waste is mainly caused by poor planning and confusion about freshness labels, so solutions must make buying and storing food easier for households.',
    usefulLanguage: [
      'One major cause is...',
      'This problem is reinforced by...',
      'A practical response would be...',
      'This measure would address the cause by...',
    ],
    commonTrap:
      'Giving solutions that do not match the causes.',
    selfCheck: [
      'Each solution responds to a cause I already explained.',
      'I avoid vague solutions such as government should educate people without detail.',
      'I include household-level behavior, not only national policy.',
      'My conclusion links cause and solution.',
    ],
  },
  {
    id: 'ielts-task2-problem-solution-urban-loneliness',
    essayType: 'Problem-solution',
    route: '/practica/ielts/academic/writing/task2/problem-solution',
    prompt:
      'People living in large cities often report feeling lonely despite being surrounded by others. What causes this problem, and what can be done to address it?',
    target:
      'Explain social causes and propose community-level solutions with clear mechanisms.',
    plan: [
      'Introduction: paraphrase urban loneliness and state that both lifestyle and city design matter.',
      'Body 1: explain causes such as long commutes, temporary housing and lack of shared spaces.',
      'Body 2: propose solutions such as local events, mixed-use public spaces and workplace flexibility.',
      'Conclusion: summarize that cities need social infrastructure, not only more population density.',
    ],
    thesisMove:
      'Urban loneliness often results from weak local routines, so solutions should create repeated, low-pressure opportunities for residents to meet.',
    usefulLanguage: [
      'Although cities are crowded, many residents...',
      'A deeper cause is...',
      'This could be addressed by...',
      'The value of this solution is that...',
    ],
    commonTrap:
      'Explaining loneliness as only an individual attitude and ignoring urban conditions.',
    selfCheck: [
      'I explain why proximity does not automatically create connection.',
      'My solutions are specific enough to imagine.',
      'I connect city design, work routines or community spaces to loneliness.',
      'I do not blame residents without evidence.',
    ],
  },
  {
    id: 'ielts-task2-direct-question-reading-children',
    essayType: 'Direct question',
    route: '/practica/ielts/academic/writing/task2/direct-question',
    prompt:
      'Why are some children reading fewer books than in the past? How can parents and schools encourage them to read more?',
    target:
      'Answer both questions visibly: reasons first, then encouragement strategies.',
    plan: [
      'Introduction: paraphrase the decline and preview two causes plus two responses.',
      'Body 1: answer why, focusing on screen entertainment and lack of reading routines.',
      'Body 2: answer how, proposing choice-based reading, classroom time and parent modeling.',
      'Conclusion: summarize that motivation grows when reading is visible, social and enjoyable.',
    ],
    thesisMove:
      'Children often read less because digital entertainment is easier to access, so adults need to make books both routine and personally relevant.',
    usefulLanguage: [
      'One reason is that...',
      'Another factor is...',
      'Parents can respond by...',
      'Schools can reinforce this by...',
    ],
    commonTrap:
      'Answering only the solution question and barely explaining the causes.',
    selfCheck: [
      'I answer both questions in separate parts.',
      'I mention parents and schools, not just one group.',
      'My examples fit children, not university students.',
      'The conclusion does not introduce a third question.',
    ],
  },
  {
    id: 'ielts-task2-direct-question-career-change',
    essayType: 'Direct question',
    route: '/practica/ielts/academic/writing/task2/direct-question',
    prompt:
      'More adults are changing careers several times during their working lives. Why is this happening? Is it a positive or negative development?',
    target:
      'Answer the cause question and then evaluate the development clearly.',
    plan: [
      'Introduction: paraphrase career changes and state whether you see the trend as mostly positive or negative.',
      'Body 1: explain causes such as automation, longer working lives and changing personal priorities.',
      'Body 2: evaluate the trend, weighing adaptability and satisfaction against instability.',
      'Conclusion: restate the judgment and the condition that makes the trend beneficial.',
    ],
    thesisMove:
      'This trend is mostly positive when workers have access to retraining, because career changes can protect employability and improve job satisfaction.',
    usefulLanguage: [
      'This is happening partly because...',
      'A further reason is...',
      'I consider this development positive because...',
      'The main risk, however, is...',
    ],
    commonTrap:
      'Writing a generic advantages/disadvantages essay and forgetting the why question.',
    selfCheck: [
      'I answer why the trend is happening.',
      'I clearly evaluate positive or negative.',
      'I mention retraining or support if my position is positive.',
      'I do not leave the final judgment vague.',
    ],
  },
];

export const IELTS_TASK2_OPINION_PROMPTS: IeltsTask2Prompt[] = IELTS_TASK2_PROMPT_BANK.filter(
  (prompt) => prompt.essayType === 'Opinion'
);

export const IELTS_TASK2_DISCUSSION_PROMPTS: IeltsTask2Prompt[] = IELTS_TASK2_PROMPT_BANK.filter(
  (prompt) => prompt.essayType === 'Discussion'
);

export const IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS: IeltsTask2Prompt[] = IELTS_TASK2_PROMPT_BANK.filter(
  (prompt) => prompt.essayType === 'Advantages and disadvantages'
);

export const IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS: IeltsTask2Prompt[] = IELTS_TASK2_PROMPT_BANK.filter(
  (prompt) => prompt.essayType === 'Problem-solution'
);

export const IELTS_TASK2_DIRECT_QUESTION_PROMPTS: IeltsTask2Prompt[] = IELTS_TASK2_PROMPT_BANK.filter(
  (prompt) => prompt.essayType === 'Direct question'
);

export const TOEFL_WRITING_TIMED_REVIEW_SETS: ToeflWritingTimedReviewSet[] = [
  {
    id: 'timed-writing-campus-services',
    title: '12-minute campus services review set',
    timeLimitMinutes: 12,
    goal:
      'Recognize the task type quickly, write a controlled answer and review whether the response matches the audience.',
    officialTaskMix: ['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion'],
    instructions:
      'Use this as a WeLearn timed review set after the mixed drills. It is not a separate ETS task; it combines current TOEFL Writing task families for practice.',
    checkpoints: [
      {
        minute: '0:00-1:00',
        action: 'Label each prompt as sentence, email or academic discussion before writing.',
        reason: 'Most wrong answers start by using the wrong format, not by lacking vocabulary.',
      },
      {
        minute: '1:00-9:00',
        action: 'Write one compact response for each prompt, respecting its task type.',
        reason: 'The set trains switching speed while keeping tone and structure controlled.',
      },
      {
        minute: '9:00-12:00',
        action: 'Review purpose, audience and one grammar risk in every response.',
        reason: 'A final review catches email tone errors, sentence fragments and underdeveloped discussion claims.',
      },
    ],
    tasks: [
      {
        id: 'campus-services-build',
        taskType: 'Build a Sentence',
        prompt:
          'Build one sentence explaining why extended library desk hours may help students who work part time.',
        timeTarget: '2 minutes',
        reviewQuestion: 'Is it one complete sentence with a clear cause-effect relationship?',
        expectedMove:
          'Use a because-clause or so-clause to connect extended hours with access after work.',
        commonTrap:
          'Writing an opinion paragraph about whether the policy is fair instead of one controlled sentence.',
      },
      {
        id: 'campus-services-email',
        taskType: 'Write an Email',
        prompt:
          'Write to the student services office asking whether you can move an advising appointment because it conflicts with a required lab.',
        timeTarget: '4 minutes',
        reviewQuestion: 'Does the email include greeting, reason, specific request and polite next step?',
        expectedMove:
          'Open with purpose, explain the lab conflict briefly and ask for an alternative appointment time.',
        commonTrap:
          'Sounding demanding or forgetting the concrete action the office needs to take.',
      },
      {
        id: 'campus-services-discussion',
        taskType: 'Write for an Academic Discussion',
        prompt:
          'Professor: Some universities are keeping student services open later in the evening. Is this a good use of campus resources?',
        timeTarget: '5 minutes',
        reviewQuestion: 'Does the answer take a position and explain a condition or trade-off?',
        expectedMove:
          'Argue that later hours help working students if universities measure demand and prioritize high-use services.',
        commonTrap:
          'Only listing benefits without addressing cost or resource limits.',
      },
    ],
    debrief: [
      'Underline the first signal that proves each task type.',
      'Mark one sentence that could be shorter without losing meaning.',
      'Rewrite the weakest response with a clearer audience or purpose.',
    ],
  },
  {
    id: 'timed-writing-academic-tools',
    title: '14-minute academic tools review set',
    timeLimitMinutes: 14,
    goal:
      'Practice switching between grammar precision, polite campus communication and a developed academic stance.',
    officialTaskMix: ['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion'],
    instructions:
      'Treat this as a WeLearn strategy round: first identify the official task family, then write only what that family requires.',
    checkpoints: [
      {
        minute: '0:00-1:30',
        action: 'Circle the verb in every prompt and decide what action the response must perform.',
        reason: 'The verb reveals whether you must combine, request or argue.',
      },
      {
        minute: '1:30-10:30',
        action: 'Draft the three responses in the order shown, keeping each answer task-specific.',
        reason: 'The time pressure exposes format confusion while the topics stay connected.',
      },
      {
        minute: '10:30-14:00',
        action: 'Check transitions, tone and specificity before comparing with the expected move.',
        reason: 'Strong TOEFL writing is usually precise rather than long.',
      },
    ],
    tasks: [
      {
        id: 'academic-tools-build',
        taskType: 'Build a Sentence',
        prompt:
          'Build one sentence explaining how citation software can help students avoid accidental plagiarism.',
        timeTarget: '2 minutes',
        reviewQuestion: 'Does the sentence explain a mechanism, not just say the tool is useful?',
        expectedMove:
          'Connect citation software with tracking sources, formatting references or recording publication details.',
        commonTrap:
          'Using a vague sentence such as technology helps students learn better.',
      },
      {
        id: 'academic-tools-email',
        taskType: 'Write an Email',
        prompt:
          'Write to a professor asking whether your group may use a shared planning app for a research presentation.',
        timeTarget: '4 minutes',
        reviewQuestion: 'Does the email ask permission and explain why the tool supports the assignment?',
        expectedMove:
          'Use respectful request language and mention coordination, deadlines or source tracking.',
        commonTrap:
          'Turning the message into a general argument about apps instead of asking the professor.',
      },
      {
        id: 'academic-tools-discussion',
        taskType: 'Write for an Academic Discussion',
        prompt:
          'Professor: Should universities teach students how to use AI tools responsibly, or should they restrict them strongly?',
        timeTarget: '6 minutes',
        reviewQuestion: 'Does the response define responsible use with a concrete classroom rule?',
        expectedMove:
          'Support responsible use with boundaries, such as brainstorming allowed but final paragraphs written independently.',
        commonTrap:
          'Repeating that AI is the future without explaining how the policy protects learning.',
      },
    ],
    debrief: [
      'Check that the Build a Sentence answer has only one sentence.',
      'Check that the email sounds like a request to a real person.',
      'Check that the discussion answer has a policy, reason and example.',
    ],
  },
  {
    id: 'timed-writing-course-policy',
    title: '15-minute course policy review set',
    timeLimitMinutes: 15,
    goal:
      'Build stamina for a short TOEFL Writing block while keeping Integrated Writing out of the current-task flow.',
    officialTaskMix: ['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion'],
    instructions:
      'Use this after task-specific practice. The review is timed, but scoring remains pedagogical WeLearn feedback rather than an official ETS score.',
    checkpoints: [
      {
        minute: '0:00-2:00',
        action: 'Write a one-line plan for each task before drafting.',
        reason: 'Planning protects the answer from drifting into the wrong genre.',
      },
      {
        minute: '2:00-12:00',
        action: 'Draft the sentence, email and discussion response with a strict length limit.',
        reason: 'Short controlled answers reveal whether the idea is organized.',
      },
      {
        minute: '12:00-15:00',
        action: 'Compare each response with the expected move and revise one weak sentence.',
        reason: 'Revision builds the same quality control used in stronger test-day writing.',
      },
    ],
    tasks: [
      {
        id: 'course-policy-build',
        taskType: 'Build a Sentence',
        prompt:
          'Build one sentence contrasting strict attendance rules with flexible participation policies.',
        timeTarget: '2 minutes',
        reviewQuestion: 'Does the answer use contrast clearly without double connectors?',
        expectedMove:
          'Use although or while to contrast reliability from attendance rules with access from flexible policies.',
        commonTrap:
          'Writing although and but together or adding a second sentence.',
      },
      {
        id: 'course-policy-email',
        taskType: 'Write an Email',
        prompt:
          'Write to a course coordinator asking whether you can switch discussion sections because your work schedule changed.',
        timeTarget: '4 minutes',
        reviewQuestion: 'Does the response include the reason and a specific section-change request?',
        expectedMove:
          'State the schedule change, ask whether switching is possible and offer to provide details.',
        commonTrap:
          'Apologizing repeatedly but never asking for the actual change.',
      },
      {
        id: 'course-policy-discussion',
        taskType: 'Write for an Academic Discussion',
        prompt:
          'Professor: Should group projects be graded mostly as a team, or should individual contribution count more?',
        timeTarget: '6 minutes',
        reviewQuestion: 'Does the answer balance collaboration with fairness?',
        expectedMove:
          'Argue for a mixed grade using role reports or peer evaluation to protect individual accountability.',
        commonTrap:
          'Relying only on a personal bad experience without turning it into an academic reason.',
      },
    ],
    debrief: [
      'Label any sentence fragment or double connector.',
      'Replace one vague word with a precise academic or campus detail.',
      'Write the next practice target: tone, development or sentence control.',
    ],
  },
];
