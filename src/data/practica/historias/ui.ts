// ─── Historias — textos de la interfaz del motor ──────────────────────────────
//
// Dos paquetes. El inglés conserva palabra por palabra la interfaz que ya estaba
// publicada en /practica/the-locked-phone: quien llega desde Google encuentra la
// misma página. El resto de idiomas usa español, porque a nivel B1 en coreano,
// japonés o ruso una instrucción en el idioma meta deja de ser inmersión y pasa
// a ser un obstáculo.

export interface StoryUI {
  back: string;
  begin: string;
  structure: string;
  partOf: (n: number, total: number, kind: string) => string;
  reading: string;
  listening: string;
  overall: string;
  questionsLabel: string;
  narrator: string;
  narratorComprehension: string;
  readNarrator: string;
  readNarratorSub: string;
  listenTo: (name: string) => string;
  listenToSub: string;
  overallTitle: string;
  overallSub: (n: number) => string;
  tip: string;
  readDone: string;
  step1: string;
  step2: string;
  step3: string;
  noTranscriptYet: string;
  listenedNext: string;
  whatDidYouUnderstand: string;
  listenAgainTranscript: string;
  clickUnknown: string;
  transcript: string;
  submitWithTranscript: string;
  compareVersions: string;
  comparison: string;
  comparisonTitle: string;
  withoutTranscript: string;
  withTranscript: string;
  markedWords: (n: number) => string;
  continueQuestions: string;
  voiceNote: (name: string) => string;
  comprehensionOf: (name: string) => string;
  bigPicture: string;
  correct: string;
  notQuite: string;
  nextQuestion: string;
  continueLabel: string;
  results: string;
  completedAll: string;
  correctAnswers: string;
  vocabList: (n: number) => string;
  discussionPrompt: string;
  keyLanguage: string;
  tryAgain: string;
  backToSection: string;
  writePlaceholder: string;
  clickAnyWord: string;
  noTranslation: string;
  audioPendingTitle: string;
  audioPendingBody: string;
  audioPendingCta: string;
  bands: { advanced: string; upper: string; intermediate: string; keepGoing: string };
}

const EN: StoryUI = {
  back: '← Back',
  begin: 'Begin →',
  structure: 'Structure',
  partOf: (n, total, kind) => `Part ${n} of ${total} · ${kind}`,
  reading: 'Reading',
  listening: 'Listening',
  overall: 'Overall',
  questionsLabel: 'Questions',
  narrator: 'Narrator',
  narratorComprehension: 'Narrator — Comprehension',
  readNarrator: 'Read the narrator',
  readNarratorSub: 'click words to look up',
  listenTo: name => `Listen: ${name}`,
  listenToSub: 'write → transcript → compare',
  overallTitle: 'Overall comprehension',
  overallSub: n => `${n} questions`,
  tip: 'Tip:',
  readDone: "I've read it — Answer questions →",
  step1: 'Step 1 of 3:',
  step2: 'Step 2 of 3',
  step3: 'Step 3 of 3',
  noTranscriptYet: 'no transcript yet',
  listenedNext: "I've listened — Write what you understood →",
  whatDidYouUnderstand: 'What did you understand?',
  listenAgainTranscript: 'Listen again — with the transcript',
  clickUnknown: "Click words you don't know",
  transcript: 'Transcript',
  submitWithTranscript: 'Submit — now listen with the transcript →',
  compareVersions: 'Compare my two versions →',
  comparison: 'Comparison',
  comparisonTitle: 'See how your understanding evolved',
  withoutTranscript: 'Without the transcript',
  withTranscript: 'With the transcript',
  markedWords: n => `Words you marked as unknown (${n})`,
  continueQuestions: 'Continue to questions →',
  voiceNote: name => `${name}'s Voice Note`,
  comprehensionOf: name => `${name} — Comprehension`,
  bigPicture: 'Big Picture — Both Perspectives',
  correct: '✅ Correct',
  notQuite: '❌ Not quite',
  nextQuestion: 'Next question →',
  continueLabel: 'Continue →',
  results: 'Results',
  completedAll: "You've completed all four sections.",
  correctAnswers: 'Correct answers',
  vocabList: n => `Vocabulary list — words you marked across all sections (${n})`,
  discussionPrompt: 'Discussion Prompt',
  keyLanguage: 'Key Language from this Story',
  tryAgain: 'Try again →',
  backToSection: '← Back to the stories',
  writePlaceholder: 'Write here… (English or Spanish, both are fine)',
  clickAnyWord: '👆 Click any word to see its translation · Click again to mark as unknown',
  noTranslation: '(no translation — add to your vocabulary list)',
  audioPendingTitle: 'Recording in production',
  audioPendingBody:
    'The voice note for this part has not been recorded yet. You can still do the whole exercise: read the transcript, mark the words you don\'t know and answer the questions. The audio will appear here, on this same page, as soon as it is ready.',
  audioPendingCta: 'Read the transcript →',
  bands: {
    advanced: 'C1 · Advanced',
    upper: 'B2 · Upper-Intermediate',
    intermediate: 'B1 · Intermediate',
    keepGoing: 'A2–B1 · Keep Practising',
  },
};

const ES: StoryUI = {
  back: '← Volver',
  begin: 'Empezar →',
  structure: 'Cómo está montado',
  partOf: (n, total, kind) => `Parte ${n} de ${total} · ${kind}`,
  reading: 'Lectura',
  listening: 'Escucha',
  overall: 'Conjunto',
  questionsLabel: 'Preguntas',
  narrator: 'Narrador',
  narratorComprehension: 'Narrador — Comprensión',
  readNarrator: 'Lee al narrador',
  readNarratorSub: 'haz clic en las palabras para traducirlas',
  listenTo: name => `Escucha: ${name}`,
  listenToSub: 'escribes → transcripción → comparas',
  overallTitle: 'Comprensión de conjunto',
  overallSub: n => `${n} preguntas`,
  tip: 'Pista:',
  readDone: 'Ya lo leí — Responder preguntas →',
  step1: 'Paso 1 de 3:',
  step2: 'Paso 2 de 3',
  step3: 'Paso 3 de 3',
  noTranscriptYet: 'todavía no hay transcripción',
  listenedNext: 'Ya escuché — Escribir lo que entendí →',
  whatDidYouUnderstand: '¿Qué entendiste?',
  listenAgainTranscript: 'Escucha otra vez — ahora con la transcripción',
  clickUnknown: 'Haz clic en las palabras que no conozcas',
  transcript: 'Transcripción',
  submitWithTranscript: 'Enviar — ahora escuchar con la transcripción →',
  compareVersions: 'Comparar mis dos versiones →',
  comparison: 'Comparación',
  comparisonTitle: 'Mira cómo cambió lo que entendiste',
  withoutTranscript: 'Sin transcripción',
  withTranscript: 'Con transcripción',
  markedWords: n => `Palabras que marcaste como desconocidas (${n})`,
  continueQuestions: 'Continuar a las preguntas →',
  voiceNote: name => `Nota de voz de ${name}`,
  comprehensionOf: name => `${name} — Comprensión`,
  bigPicture: 'Las dos versiones a la vez',
  correct: '✅ Correcto',
  notQuite: '❌ No exactamente',
  nextQuestion: 'Siguiente pregunta →',
  continueLabel: 'Continuar →',
  results: 'Resultados',
  completedAll: 'Completaste las cuatro partes.',
  correctAnswers: 'Respuestas correctas',
  vocabList: n => `Tu lista de vocabulario — palabras que marcaste en todo el ejercicio (${n})`,
  discussionPrompt: 'Para discutir',
  keyLanguage: 'Lenguaje clave de esta historia',
  tryAgain: 'Intentar de nuevo →',
  backToSection: '← Volver a las historias',
  writePlaceholder: 'Escribe aquí… (en español o en el idioma, como te salga)',
  clickAnyWord: '👆 Haz clic en cualquier palabra para verla traducida · Otro clic la marca como desconocida',
  noTranslation: '(sin traducción — añádela a tu lista)',
  audioPendingTitle: 'Grabación en producción',
  audioPendingBody:
    'La nota de voz de esta parte todavía no está grabada. Puedes hacer el ejercicio completo igual: lee la transcripción, marca las palabras que no conozcas y responde las preguntas. El audio aparecerá aquí, en esta misma página, en cuanto esté listo.',
  audioPendingCta: 'Leer la transcripción →',
  bands: {
    advanced: 'C1 · Avanzado',
    upper: 'B2 · Intermedio alto',
    intermediate: 'B1 · Intermedio',
    keepGoing: 'A2–B1 · Sigue practicando',
  },
};

export const STORY_UI: Record<'en' | 'es', StoryUI> = { en: EN, es: ES };
