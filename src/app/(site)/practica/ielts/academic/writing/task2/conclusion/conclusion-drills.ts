import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import { ESSAY_TYPES, type EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS } from '../body-1/body-one-data';
import { BODY_TWO_LESSONS } from '../body-2/body-two-data';
import { CONCLUSION_LESSONS } from './conclusion-data';
import { MISSING_INTRODUCTIONS, REASON_PREVIEWS, introductionKey } from '../tarea-completa/task2-prompt-bank';

/**
 * El ensayo que hay que cerrar, y los dos ejercicios de cierre, para cada enunciado.
 *
 * EL DEFECTO QUE ARREGLA
 *
 * David lo dijo exacto: «en la parte que dicen step two, write a complete conclusion, ¿cómo
 * voy a colocar algo que yo no he visto?». El taller mostraba el enunciado y una línea con
 * la función del párrafo, y a continuación pedía escribir la conclusión completa. La
 * introducción, el Body 1 y el Body 2 de ese ensayo no aparecían por ninguna parte. Se
 * pedía sintetizar un razonamiento que el estudiante no había leído.
 *
 * Y el paso 1 tenía el mismo defecto de banco que el resto: **dos distractores distintos
 * para 40 ranuras**. Eran estas dos frases, repetidas en los 20 ejercicios:
 *
 *   «In conclusion, this essay has discussed several interesting points…»
 *   «In the future, governments will probably discover a completely new way…»
 *
 * Solo cambiaba la correcta, así que a partir del segundo ejercicio se acertaba eligiendo
 * el texto nuevo. Con tres opciones y cuatro ejercicios por familia el reparto además se
 * escoraba: B-C-B-B en ventajas y desventajas.
 *
 * CÓMO QUEDA
 *
 * 1. **El ensayo va delante.** Introducción, Body 1 y Body 2 completos, tomados de los
 *    módulos que los enseñan. Ahora sí hay algo que cerrar.
 * 2. **Dos decisiones separadas**, que son las dos que tiene una conclusión: primero qué
 *    retoma la respuesta, después qué sintetiza los dos cuerpos.
 * 3. **Los distractores son cierres reales de otros enunciados**, elegidos por longitud
 *    parecida y prefiriendo la misma familia. Equivocarse es cerrar el ensayo de otro, y el
 *    mensaje dice de cuál.
 * 4. **Al revelar se subrayan la tesis y los dos cierres parciales** de los cuerpos: es
 *    exactamente lo que la conclusión tenía que recoger, y se ve de dónde salió.
 */

export type EssaySentence = { text: string; highlight: boolean };

export type ConclusionDrillOption = { text: string; why: string };

export type ConclusionStep = {
  question: string;
  /** Qué se subraya en el ensayo cuando se acierta este paso. */
  highlights: 'thesis' | 'links';
  options: ConclusionDrillOption[];
  correct: number;
};

export type ConclusionDrill = {
  id: string;
  essayType: EssayTypeId;
  title: string;
  prompt: string;
  /** El ensayo hasta aquí. `highlight` marca la tesis o el cierre parcial del párrafo. */
  introduction: EssaySentence[];
  bodyOne: EssaySentence[];
  bodyTwo: EssaySentence[];
  steps: [ConclusionStep, ConclusionStep];
  /** Los dos bloques que hay que escribir, con su función. */
  blocks: { label: string; purpose: string; text: string }[];
  commonMistake: string;
};

const words = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const isThesisBlock = (label: string) => label === 'Position' || /thesis$/i.test(label);

/** Parte un texto corrido en frases. Solo se usa con las 9 introducciones escritas a mano. */
const toSentences = (value: string) => value.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()) ?? [value];

const introductionByPrompt = new Map(
  ESSAY_TYPES.flatMap((lesson) => lesson.examples.map((example) => [example.prompt, example] as const)),
);

function buildIntroduction(essayType: EssayTypeId, title: string, prompt: string): EssaySentence[] {
  const written = MISSING_INTRODUCTIONS[introductionKey(essayType, title)];
  // En las nueve escritas a mano la última frase es la posición: gancho, paráfrasis, tesis.
  if (written) {
    const sentences = toSentences(written);
    return sentences.map((text, index) => ({ text, highlight: index === sentences.length - 1 }));
  }

  const source = introductionByPrompt.get(prompt);
  if (!source) return [];
  const sentences: EssaySentence[] = source.blocks.map((block) => ({ text: block.text, highlight: isThesisBlock(block.label) }));
  const preview = REASON_PREVIEWS[introductionKey(essayType, title)];
  if (preview) sentences.push({ text: preview, highlight: false });
  return sentences;
}

/** El cierre parcial de un cuerpo es su último bloque: el que devuelve el párrafo a la tesis. */
const buildBody = (blocks: { label: string; text: string }[]): EssaySentence[] =>
  blocks.map((block, index) => ({ text: block.text, highlight: index === blocks.length - 1 }));

type PoolItem = { text: string; title: string; type: EssayTypeId; typeLabel: string };

/**
 * Tres cierres reales de otros enunciados, con la longitud más parecida a la del correcto.
 * Uno de la misma familia —el difícil, porque tiene la forma correcta— y dos de fuera.
 */
function pickDistractors(pool: PoolItem[], correct: string, ownType: EssayTypeId) {
  const candidates = pool.filter((item) => item.text !== correct);
  const target = words(correct);
  const byDistance = [...candidates].sort((a, b) => {
    const difference = Math.abs(words(a.text) - target) - Math.abs(words(b.text) - target);
    return difference !== 0 ? difference : a.text.localeCompare(b.text);
  });
  const sameFamily = byDistance.filter((item) => item.type === ownType).slice(0, 1);
  const others = byDistance.filter((item) => item.type !== ownType).slice(0, 3 - sameFamily.length);
  return [...sameFamily, ...others].slice(0, 3);
}

/** Todos los primeros bloques de conclusión, y todos los segundos, de los 25 ejemplos. */
function buildPool(blockIndex: number): PoolItem[] {
  const pool: PoolItem[] = [];
  for (const lesson of CONCLUSION_LESSONS) {
    for (const example of lesson.examples) {
      const text = example.blocks[blockIndex]?.text;
      if (!text || pool.some((item) => item.text === text)) continue;
      pool.push({ text, title: example.title, type: lesson.id, typeLabel: lesson.shortLabel });
    }
  }
  return pool;
}

const RESTATEMENT_POOL = buildPool(0);
const SYNTHESIS_POOL = buildPool(1);

function buildStep(
  pool: PoolItem[],
  correct: string,
  lessonId: EssayTypeId,
  slot: number,
  question: string,
  highlights: ConclusionStep['highlights'],
  correctWhy: string,
  naming: string,
): ConclusionStep {
  const source: ConclusionDrillOption[] = [
    { text: correct, why: `Correct. ${correctWhy}` },
    ...pickDistractors(pool, correct, lessonId).map((item) => ({
      text: item.text,
      why: item.type === lessonId
        ? `That is the ${naming} of the “${item.title}” essay, which is in this same family. Read the paragraphs above again: this essay did not argue that.`
        : `That is the ${naming} of the “${item.title}” essay, a ${item.typeLabel} question. It closes a different argument from the one above.`,
    })),
  ];
  /**
   * Los dos pasos de una familia son UNA serie de diez, no dos de cinco.
   *
   * Con dos series separadas —semillas `…|thesis` y `…|links`— las permutaciones se sortean
   * independientes y pueden salir iguales: en problema-solución salieron B-A-D-C-C las dos,
   * o sea que acertado el paso 1, el paso 2 tenía su misma letra. Medido: 3 colisiones en
   * 10 tiradas, que es lo que da el azar con 24 permutaciones posibles. No es un fallo del
   * barajado, es que sortear dos veces permite empatar.
   *
   * Numerando de corrido, los dos pasos del mismo ejercicio caen en bloques distintos de la
   * misma serie y no hay dos secuencias que puedan coincidir, porque solo hay una.
   */
  const placed = placeFirstAsCorrect(source, `conclusion|${lessonId}`, slot);
  return { question, highlights, options: placed.options, correct: placed.correct };
}

export const CONCLUSION_DRILLS: ConclusionDrill[] = CONCLUSION_LESSONS.flatMap((lesson, lessonIndex) =>
  lesson.examples.map((example, exampleIndex) => {
    const bodyOne = BODY_ONE_LESSONS[lessonIndex].examples[exampleIndex];
    const bodyTwo = BODY_TWO_LESSONS[lessonIndex].examples[exampleIndex];
    const [restatement, synthesis] = example.blocks;

    return {
      id: `${lesson.id}--${example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      essayType: lesson.id,
      title: example.title,
      prompt: example.prompt,
      introduction: buildIntroduction(lesson.id, example.title, example.prompt),
      bodyOne: buildBody(bodyOne.blocks),
      bodyTwo: buildBody(bodyTwo.blocks),
      steps: [
        buildStep(
          RESTATEMENT_POOL, restatement.text, lesson.id, exampleIndex * 2,
          'Which sentence restates the answer this essay actually gave?',
          'thesis',
          'It gives the same answer as the thesis, in different words. Nothing has shifted.',
          'restatement',
        ),
        buildStep(
          SYNTHESIS_POOL, synthesis.text, lesson.id, exampleIndex * 2 + 1,
          'Which sentence brings together what the two body paragraphs argued?',
          'links',
          'It compresses both paragraphs without adding an argument neither of them made.',
          'synthesis',
        ),
      ],
      blocks: example.blocks.map((block) => ({ label: block.label, purpose: block.purpose, text: block.text })),
      commonMistake: example.commonMistake,
    } satisfies ConclusionDrill;
  }),
);

export const drillsFor = (essayType: EssayTypeId) => CONCLUSION_DRILLS.filter((item) => item.essayType === essayType);
