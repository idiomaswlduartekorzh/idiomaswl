// ─── Historias — modelo de datos ──────────────────────────────────────────────
//
// Una «historia» es un ejercicio de comprensión integrada B1–B2: un narrador
// escrito, dos notas de voz que se contradicen y 19 preguntas que obligan a
// sostener las dos versiones a la vez.
//
// Todo el contenido vive aquí como datos puros. El motor
// (`src/components/practica/StoryEngine.tsx`) no sabe de qué idioma se trata:
// recibe una `Historia` y la pinta.
//
// AUDIO PENDIENTE: `audioSrc: null` es un estado de primera clase, no un error.
// El motor muestra un aviso honesto («la grabación está en producción») y deja
// pasar al alumno por lectura + transcripción + preguntas. Cuando exista el
// mp3, basta con poner la ruta: no hay que tocar el motor.

export type HistoriaLang =
  | 'ingles' | 'aleman' | 'frances' | 'italiano'
  | 'portugues' | 'coreano' | 'japones' | 'ruso';

export interface StoryQuestion {
  /** Etiqueta de la destreza: Vocabulary, Inference, Tone… */
  type: string;
  q: string;
  opts: string[];
  /** Índice 0-based de la opción correcta dentro de `opts`. */
  correct: number;
  explanation: string;
}

export interface StoryVoice {
  /** Clave de sección para el marcador. Estable: 'a' | 'b'. */
  key: 'a' | 'b';
  /** Nombre del personaje: «Jess». */
  name: string;
  /** Su papel en el conflicto: «Girlfriend», «Nuera». */
  role: string;
  color: string;
  /**
   * Ruta al mp3, o `null` si la grabación todavía no existe.
   * Convención: /audio/historias/<idioma>/<slug>/<key>.mp3
   */
  audioSrc: string | null;
  /** Transcripción, un elemento por párrafo. Debe coincidir con el audio. */
  paragraphs: string[];
  questions: StoryQuestion[];
  /** Pista antes de escuchar sin transcripción. */
  listenHint: string;
  /** Pista al abrir la transcripción. */
  transcriptHint: string;
  write1Prompt: string;
  write1Hint: string;
  write2Prompt: string;
}

export interface Historia {
  slug: string;
  lang: HistoriaLang;
  /** Emoji de la tarjeta. */
  icon: string;
  /** Color de acento de la historia. */
  color: string;
  /** Nivel MCER que declara la historia: «B1–B2». */
  level: string;
  /** Título en el idioma que se aprende. */
  title: string;
  /** Frase de una línea, en español, para la tarjeta del hub. */
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Párrafo de presentación en la pantalla de entrada. */
  intro: string;
  narrator: {
    paragraphs: string[];
    questions: StoryQuestion[];
    /** Consejo de lectura antes de pasar a las preguntas. */
    tip: string;
  };
  voices: [StoryVoice, StoryVoice];
  finalQuestions: StoryQuestion[];
  /** Párrafos que abren la sección final. */
  finalIntro: string[];
  /** Click en cualquier palabra. Claves en minúscula y solo letras. */
  dict: Record<string, string>;
  keyLanguage: { phrase: string; meaning: string }[];
  discussion: { question: string; note: string };
  /** Idioma de la interfaz del motor: inglés se mantiene inmersivo. */
  ui: 'en' | 'es';
}

// ─── Reparto de la respuesta correcta ─────────────────────────────────────────
//
// Medido el 13 de agosto de 2026 sobre las 304 preguntas: el 63 % de las
// respuestas correctas estaba en la opción B, el 34 % en la C, y NINGUNA en la
// D. Quien marcaba siempre B aprobaba sin leer nada. Venía de las dos historias
// inglesas originales, y las adaptaciones lo heredaron al copiar su diseño.
//
// Arreglarlo reordenando 304 preguntas a mano es pedir un error. En vez de eso
// se rota el array de opciones para que la correcta caiga en una posición
// derivada del texto del enunciado:
//
//   • Determinista — la misma pregunta sale siempre igual, así que al repetir el
//     ejercicio las opciones no bailan y la explicación sigue encajando.
//   • Sin ciclo aprendible — no es «A, B, C, D, A, B…», sale del hash.
//   • Rotación, no barajado — conserva el orden relativo, que importa cuando las
//     cuatro opciones se redactaron pensadas como conjunto.
//
// Requisito al escribir preguntas: ninguna opción puede referirse a otra por su
// letra («como en la A», «ninguna de las anteriores»). Si alguna vez hace falta,
// esa pregunta habría que sacarla del reparto.

function fnv1a(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function balanceQuestion(q: StoryQuestion): StoryQuestion {
  const n = q.opts.length;
  if (n < 2) return q;
  const target = fnv1a(q.q) % n;
  const shift = (target - q.correct + n) % n;
  if (shift === 0) return q;
  const opts = q.opts.map((_, i) => q.opts[(i - shift + n) % n]);
  return { ...q, opts, correct: target };
}

export function balanceHistoria(h: Historia): Historia {
  return {
    ...h,
    narrator: { ...h.narrator, questions: h.narrator.questions.map(balanceQuestion) },
    voices: [
      { ...h.voices[0], questions: h.voices[0].questions.map(balanceQuestion) },
      { ...h.voices[1], questions: h.voices[1].questions.map(balanceQuestion) },
    ],
    finalQuestions: h.finalQuestions.map(balanceQuestion),
  };
}

export function totalQuestions(h: Historia): number {
  return (
    h.narrator.questions.length +
    h.voices[0].questions.length +
    h.voices[1].questions.length +
    h.finalQuestions.length
  );
}

/** Una historia está completa cuando sus dos notas de voz tienen grabación. */
export function hasAudio(h: Historia): boolean {
  return h.voices.every(v => v.audioSrc !== null);
}
