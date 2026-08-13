/**
 * El superhub de vocabulario de IELTS Writing: los tipos.
 *
 * POR QUÉ ES UN SUPERHUB Y NO UNA FICHA DENTRO DE TASK 2
 *
 * Las ocho funciones nacieron dentro de `task2/academic-vocabulary` porque ese era el hueco
 * que había. David lo miró y dijo lo que era evidente en cuanto se dice: «esta parte en
 * especial debería ser un superhub por sí solo de vocabulario específico para writing de
 * IELTS, tomar lo que tenemos pero expandirlo mucho».
 *
 * Tenía dos razones y las dos son buenas. El vocabulario sirve a las DOS tareas —un verbo de
 * subida se usa igual en un gráfico de Task 1 que en un argumento de Task 2— y estaba
 * enterrado donde solo lo encuentra quien ya está estudiando Task 2. Y ocho funciones con seis
 * entradas cada una son un esqueleto: suficiente para enseñar el criterio, insuficiente para
 * un examen.
 *
 * TRES EJES, NO UNO
 *
 * El material del mercado usa un solo eje: el tema. Aquí hay tres, porque son las tres
 * preguntas que alguien se hace de verdad delante de una hoja en blanco:
 *
 *   · «Estoy escribiendo la introducción de Task 1, ¿qué palabras necesito?» → POR SUBPARTE
 *   · «Quiero decir que esto probablemente pasa pero no siempre» → POR FUNCIÓN
 *   · «¿Cómo se dice esto sin repetir la palabra del enunciado?» → las dos anteriores
 *
 * El eje temático —salud, educación, medio ambiente— se queda fuera a propósito. Es el que ya
 * cubre cualquier manual, y es el que menos ayuda a escribir: nadie se atasca por no saber
 * decir «contaminación», se atasca por no saber decir que algo aumentó bruscamente y luego se
 * estabilizó.
 *
 * EL PATRÓN ES LA MITAD DE LA ENTRADA
 *
 * Cada palabra viene con la construcción que exige. Saber «detrimental» y no saber que pide
 * «to» produce «detrimental for», que puntúa peor que el «bad for» que venía a sustituir. Esa
 * es la regla que gobierna todo el superhub y la que vigila la compuerta.
 */

import type { Explainer, GuidedExercise } from '../_shared/skill-blueprint';

/**
 * Qué tan segura es una entrada en manos de quien la acaba de aprender.
 *
 * `safe`  — se usa sin pensarlo dos veces.
 * `watch` — funciona y arrastra una trampa: una preposición, una coma, un patrón.
 * `avoid` — la que parece que sirve y no sirve. Es la entrada más útil de las tres.
 */
export type Risk = 'safe' | 'watch' | 'avoid';

export type VocabEntry = {
  text: string;
  risk: Risk;
  /** La construcción que exige. Sin esto, la entrada es media entrada. */
  pattern: string;
  /** Opcional: una frase de ejemplo, cuando el patrón solo no basta para verlo. */
  example?: string;
};

/**
 * Las entradas van AGRUPADAS POR TRABAJO, no en una lista alfabética.
 *
 * Una lista de cuarenta palabras es un diccionario corto y se estudia como tal: se lee y no se
 * usa. Agrupadas por lo que hacen —«verbos para reportar una subida», «adverbios de
 * velocidad»— se convierten en algo que se puede buscar mientras escribes, que es el único
 * momento en que el vocabulario sirve para algo.
 */
export type VocabGroup = {
  label: string;
  /** Qué trabajo hace este grupo, en una línea. */
  purpose: string;
  entries: VocabEntry[];
};

/** El comparador vago → preciso. Nunca lleva un número de banda: el curso no promete notas. */
export type Upgrade = {
  vague: string;
  precise: string;
  /** Qué gana: precisión, colocación, registro, rango. */
  earns: string[];
  why: string;
};

export type VocabExample = {
  sentence: string;
  /** La palabra o frase que hace el trabajo. */
  doing: string;
  why: string;
};

export type VocabMistake = { wrong: string; why: string; right: string };

/** Cada opción con SU motivo: una explicación para las cuatro no enseña a nadie. */
export type VocabDrill = {
  stem: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición la reparte `placeOption`. */
  correct: number;
};

/**
 * Una unidad del superhub: una subparte de una tarea, o una función transversal.
 *
 * Lleva los cuatro bloques del blueprint de Writing, sin excepción: explicación larga,
 * ejemplos, ejercicio guiado y motor.
 */
export type VocabUnit = {
  slug: string;
  label: string;
  spanishName: string;
  seoTitle: string;
  seoDescription: string;
  /** Dónde vive: la tarea y la subparte, o la función transversal. */
  family: 'task1' | 'task2' | 'function';
  /** El trabajo que hace esta parte del examen, en una línea. */
  job: string;
  whenToUse: string;
  tone: 'prompt' | 'claim' | 'development' | 'contrast' | 'link' | 'evidence' | 'review';
  /** Bloque 1. */
  explainer: Explainer;
  upgrade: Upgrade;
  /** El banco, agrupado por trabajo. */
  groups: VocabGroup[];
  /** Bloque 2. */
  examples: VocabExample[];
  mistakes: VocabMistake[];
  /** Bloque 3. */
  guided: GuidedExercise;
  /** Bloque 4. */
  drills: VocabDrill[];
};

export const RISK_LABEL: Record<Risk, string> = {
  safe: 'Safe to use',
  watch: 'Watch the pattern',
  avoid: 'Costs you marks',
};

/** Cuenta las entradas de una unidad, que es como se mide el tamaño del superhub. */
export function countEntries(unit: VocabUnit): number {
  return unit.groups.reduce((total, group) => total + group.entries.length, 0);
}
