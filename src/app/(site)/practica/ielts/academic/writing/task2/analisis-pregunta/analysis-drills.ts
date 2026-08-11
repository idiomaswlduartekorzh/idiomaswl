import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import { PROMPT_ANALYSIS_LESSONS, type PromptAnalysisExample } from './prompt-analysis-data';
import type { EssayTypeId } from '../introduccion/introduction-data';

/**
 * Los ejercicios de opción del motor de análisis, construidos con respuestas reales.
 *
 * POR QUÉ EXISTE ESTE FICHERO
 *
 * El motor armaba sus cuatro opciones así:
 *
 *   [correcta, lesson.trap,
 *    'Describe the topic generally without answering the instruction.',
 *    'Use one memorised plan for every question family.']
 *
 * Medido sobre las 20 preguntas de opción (5 tipos × 4 niveles):
 *
 *  - **7 textos distintos para 60 ranuras de distractor.** Las dos frases genéricas salían
 *    20 veces cada una y la trampa del tipo, 4. Solo cambiaba la correcta.
 *  - Consecuencia directa: en **15 de 15** preguntas posteriores a la primera de su tipo,
 *    los tres distractores ya se habían visto y la correcta no. Se acertaba sin leer el
 *    enunciado, eligiendo el texto nuevo. Un 100 % de atajo.
 *  - En el nivel 2 la correcta medía entre 44 y 60 palabras y el distractor más largo entre
 *    12 y 22: una ventaja de +31 a +44 palabras en los cinco tipos. Se acertaba por tamaño.
 *  - La rotación cíclica dejaba la secuencia C-B-A-C IDÉNTICA en tres de los cinco tipos.
 *  - Y las correctas eran campos del TIPO —`signal`, `mustAnswer`, `bodyOne`, `bodyTwo`—,
 *    que la propia página imprime más arriba en el panel de la familia. La respuesta estaba
 *    a un scroll de distancia.
 *
 * CÓMO SE ARREGLA
 *
 * Un distractor solo enseña si podría haber sido cierto. Aquí cada opción es **la respuesta
 * real de otro enunciado de esta misma práctica**: mismo campo, mismo registro, longitud
 * parecida a propósito. Equivocarse ya no es caer en una frase de relleno, es confundir dos
 * enunciados concretos, y el feedback nombra cuál era el suyo.
 *
 * Tres decisiones que sostienen eso:
 *
 * 1. **Todas las correctas son de nivel EJEMPLO**, nunca del tipo. Los campos del tipo se
 *    imprimen en la página; los del ejemplo, no. Así no hay nada que copiar de más arriba.
 * 2. **Los distractores se eligen por longitud más cercana.** No es cosmética: es lo que
 *    impide que «la más larga» vuelva a ser una estrategia.
 * 3. **El reparto de la letra correcta va por bloques** (`placeFirstAsCorrect`), sembrado
 *    con el tipo de ensayo. Cuatro niveles, cuatro opciones: cada letra sale exactamente una
 *    vez por tipo, y la secuencia cambia de un tipo a otro.
 *
 * `scripts/check-ielts-task2-alignment.mjs` mide las cuatro cosas y para el build si alguna
 * se rompe.
 */

export type DrillOption = {
  text: string;
  /** Por qué falla ESTA opción. Nunca una frase común a los tres distractores. */
  why: string;
};

export type AnalysisDrill = {
  id: string;
  /** Enunciado IELTS sobre el que se pregunta. */
  prompt: string;
  /** Título corto del enunciado, para el feedback. */
  title: string;
  /** La pregunta, en inglés directo y sin jerga interna. */
  question: string;
  options: DrillOption[];
  correct: number;
};

type FieldSpec = {
  key: string;
  question: string;
  /** Cómo se llama esto cuando el feedback tiene que nombrarlo. */
  naming: string;
  read: (example: PromptAnalysisExample) => string;
  /** Por qué la correcta es la correcta para ESE ejemplo. */
  reason: (example: PromptAnalysisExample) => string;
};

const FIELDS: FieldSpec[] = [
  {
    key: 'scope',
    question: 'What must your answer keep visible from the first line to the last?',
    naming: 'requirement',
    read: (example) => example.map.scope,
    reason: (example) => example.whyItWorks[0] ?? 'Every paragraph has to serve this requirement.',
  },
  {
    key: 'position',
    question: 'Which thesis sentence answers this exact prompt?',
    naming: 'thesis',
    /**
     * La tesis se lee del bloque del ejemplo, no de `map.position`.
     *
     * `map.position` cae en `lesson.position` cuando el ejemplo no tiene bloque «Position»,
     * y 13 de los 25 no lo tienen: las familias de problema-solución, ventajas y dos
     * preguntas lo llaman «Scope thesis», «Evaluation thesis» o «Two-part thesis». Con el
     * respaldo, dos ejercicios ofrecían como respuesta correcta un texto del tipo —«Required
     * for an outweigh question. For a plain advantages-and-disadvantages prompt…»—, que no
     * es una tesis sino una nota pedagógica, y que además la página imprime más arriba.
     */
    read: (example) =>
      (example.blocks.find((block) => block.label === 'Position' || /thesis$/i.test(block.label))?.text ?? example.map.position),
    reason: (example) => example.whyItWorks[1] ?? example.whyItWorks[0] ?? 'The reader can tell what you decided.',
  },
  {
    key: 'body-one',
    question: 'What is the one job of Body 1?',
    naming: 'Body 1 job',
    read: (example) => example.map.bodyRoute[0],
    reason: () => 'Body 1 does this and nothing else. A second idea belongs in Body 2.',
  },
  {
    key: 'body-two',
    question: 'What is the one job of Body 2?',
    naming: 'Body 2 job',
    read: (example) => example.map.bodyRoute[1],
    reason: () => 'Body 2 has to add something Body 1 did not already cover.',
  },
];

const words = (value: string) => value.trim().split(/\s+/).length;

/** El motor nunca usa `examples[0]`: ese es el que la página ya imprime resuelto arriba. */
const drillExample = (lesson: (typeof PROMPT_ANALYSIS_LESSONS)[number], index: number) =>
  lesson.examples[1 + (index % (lesson.examples.length - 1))];

/**
 * Tres distractores reales, tomados de otros enunciados, con la longitud más parecida a la
 * de la correcta. Se reparten entre familias distintas para que uno sea el difícil —el de
 * la misma familia— y los otros dos vengan de fuera.
 */
function pickDistractors(field: FieldSpec, correct: string, ownType: EssayTypeId) {
  const pool: { text: string; title: string; type: EssayTypeId; typeLabel: string }[] = [];

  for (const lesson of PROMPT_ANALYSIS_LESSONS) {
    for (const example of lesson.examples) {
      const text = field.read(example);
      if (!text || text === correct || pool.some((item) => item.text === text)) continue;
      pool.push({ text, title: example.title, type: lesson.id, typeLabel: lesson.shortLabel });
    }
  }

  const target = words(correct);
  const byDistance = [...pool].sort((a, b) => {
    const difference = Math.abs(words(a.text) - target) - Math.abs(words(b.text) - target);
    // Empate resuelto por texto: el resultado no puede depender del orden de recorrido.
    return difference !== 0 ? difference : a.text.localeCompare(b.text);
  });

  const sameFamily = byDistance.filter((item) => item.type === ownType).slice(0, 1);
  const otherFamilies = byDistance.filter((item) => item.type !== ownType).slice(0, 3 - sameFamily.length);
  return [...sameFamily, ...otherFamilies].slice(0, 3);
}

/** @param slot Cuál de los cuatro ejercicios del tipo es: elige campo, ejemplo y posición. */
function buildDrill(lesson: (typeof PROMPT_ANALYSIS_LESSONS)[number], field: FieldSpec, slot: number): AnalysisDrill {
  const example = drillExample(lesson, slot);
  const correct = field.read(example);

  const source: DrillOption[] = [
    { text: correct, why: `Correct. ${field.reason(example)}` },
    ...pickDistractors(field, correct, lesson.id).map((item) => ({
      text: item.text,
      why: item.type === lesson.id
        ? `That is the ${field.naming} of the “${item.title}” prompt, which is in this same family. Read this prompt again: it is asking about something else.`
        : `That is the ${field.naming} of the “${item.title}” prompt, a ${item.typeLabel} question. This prompt does not ask for that.`,
    })),
  ];

  const placed = placeFirstAsCorrect(source, `analisis|${lesson.id}`, slot);
  return {
    id: `${lesson.id}--${field.key}`,
    prompt: example.prompt,
    title: example.title,
    question: field.question,
    options: placed.options,
    correct: placed.correct,
  };
}

/**
 * Los cuatro ejercicios de opción de cada tipo, en el orden en que se planifica de verdad.
 *
 * El reparto se siembra POR TIPO, y el bloque coincide con la pestaña a propósito: cuatro
 * preguntas, cuatro opciones, cada letra exactamente una vez. Es la única forma de que
 * dentro de una pestaña ninguna letra domine.
 *
 * La alternativa —numerar las veinte de corrido para que los bloques crucen las familias—
 * se probó y salió peor donde importa: reparto perfecto en el agregado (5-5-5-5) pero
 * C-C-C-D dentro de opinion, o sea marcar C sin leer y acertar tres de cuatro. Lo que el
 * estudiante recorre es una pestaña, así que ahí es donde tiene que ser uniforme.
 *
 * A cambio, con cuatro de cuatro la última letra es deducible si ya se acertaron las tres
 * anteriores. Es un precio pequeño: exige haber leído los tres enunciados primero.
 */
export const ANALYSIS_DRILLS: Record<EssayTypeId, AnalysisDrill[]> = Object.fromEntries(
  PROMPT_ANALYSIS_LESSONS.map((lesson) => [
    lesson.id,
    FIELDS.map((field, slot) => buildDrill(lesson, field, slot)),
  ]),
) as Record<EssayTypeId, AnalysisDrill[]>;

/** El ejemplo que toca en los niveles de escritura, con la misma regla: nunca el resuelto. */
export function writingExample(essayType: EssayTypeId, level: number) {
  const lesson = PROMPT_ANALYSIS_LESSONS.find((item) => item.id === essayType) ?? PROMPT_ANALYSIS_LESSONS[0];
  return drillExample(lesson, level);
}
