/**
 * El recorrido que toda sub-habilidad de Writing tiene que ofrecer.
 *
 * POR QUÉ EXISTE
 *
 * David lo pidió el 12 de agosto de 2026, mirando paraphrasing ya terminado: «no veo el
 * blueprint… primero explicación larga y detallada de en qué consiste cada sub-habilidad,
 * luego ejemplos, luego ejercicio guiado y luego el motor de ejercicios».
 *
 * Tenía razón, y la falta era de las dos que peor se notan:
 *
 *   1. La EXPLICACIÓN. Cada página abría con dos párrafos y saltaba a la práctica. Dos
 *      párrafos son una definición, no una lección: quien no sabía lo que era una paráfrasis
 *      seguía sin saberlo, y se ponía a elegir entre cuatro opciones a ciegas.
 *   2. El EJERCICIO GUIADO. Entre ver un ejemplo resuelto y enfrentarse al motor había un
 *      escalón vacío. El ejemplo lo hace todo por ti; el motor no te ayuda en nada. Faltaba
 *      el intermedio: producir tú, por pasos, con el modelo detrás de un botón.
 *
 * Los cuatro bloques, en este orden y sin saltarse ninguno:
 *
 *   1. EXPLICACIÓN LARGA  — `Explainer`, aquí abajo
 *   2. EJEMPLOS           — ya lo tenía cada unidad
 *   3. EJERCICIO GUIADO   — `GuidedExercise`, aquí abajo
 *   4. MOTOR              — ya lo tenía cada unidad
 *
 * `_shared` lleva guion bajo a propósito: en el App Router una carpeta con ese prefijo es
 * privada y no genera ninguna ruta, así que estos tipos y componentes viven junto a las
 * unidades que los usan sin aparecer como página.
 */

/** Un término con su aclaración, dentro de una sección de la explicación. */
export type ExplainerPoint = {
  term: string;
  detail: string;
};

export type ExplainerSection = {
  heading: string;
  /** Cada entrada es un párrafo. Se escriben largos a propósito: esto es la lección. */
  body: string[];
  points?: ExplainerPoint[];
};

/**
 * La explicación larga: el bloque 1.
 *
 * No es el resumen del hero. Es lo que alguien necesita leer para entender la sub-habilidad
 * antes de intentarla, incluyendo lo que casi nadie escribe: qué cuesta no hacerlo, y dónde
 * la habilidad deja de aplicar.
 */
export type Explainer = {
  /** Una frase que define la sub-habilidad. */
  definition: string;
  sections: ExplainerSection[];
  /** Qué se pierde exactamente si no se hace, o se hace mal. */
  cost: string;
  /** El límite: dónde deja de aplicar, o dónde se pasa de rosca. */
  limits: string;
};

/**
 * Un paso del ejercicio guiado.
 *
 * `minWords` es el andamio que impide comparar sin haber intentado: el botón que revela el
 * modelo está bloqueado hasta que hay algo escrito. Sin ese freno, un ejercicio guiado se
 * convierte en un ejemplo resuelto con pasos intermedios, que es justo lo que ya existía.
 */
export type GuidedStep = {
  instruction: string;
  /** Lo que hay que mirar ANTES de escribir. Es la pista, no la respuesta. */
  hint: string;
  minWords: number;
  placeholder: string;
  model: string;
  why: string;
};

export type GuidedExercise = {
  /** El material sobre el que se trabaja: el enunciado, la frase, el gráfico. */
  brief: string;
  goal: string;
  steps: GuidedStep[];
  /** Los pasos encadenados, para ver adónde llevaban. */
  result: string;
};

/** Cuenta palabras igual en todas las unidades, para que los mínimos signifiquen lo mismo. */
export function countWords(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}
