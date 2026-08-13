/**
 * El índice del superhub: todas las unidades de vocabulario, de todas las familias.
 *
 * Existe para que el hub, las rutas y la compuerta lean una sola lista. Cada familia vive en
 * su propio fichero porque son largos —cada unidad trae explicación, banco, ejemplos, errores,
 * guiado y ejercicios— y mezclarlas daría un módulo que nadie puede abrir.
 *
 * ESTADO, 12 de agosto de 2026
 *
 * Task 1 está COMPLETO: seis de seis. Task 2 tiene dos de sus cuatro —introducción y cuerpo—,
 * y faltan conclusión y revisión, más el traslado de las ocho funciones transversales, que
 * todavía viven en `task2/academic-vocabulary` y tendrán que dejar un redirect al mudarse. Se
 * dice aquí y no en un documento aparte porque es el fichero que alguien abre para añadir la
 * siguiente, y porque un superhub a medio construir que no lo declara se parece demasiado a
 * uno terminado.
 */

import type { VocabUnit } from './vocabulary-types';
import { TASK1_UNITS } from './task1-vocabulary';
import { TASK2_UNITS } from './task2-vocabulary';

export const VOCAB_UNITS: VocabUnit[] = [...TASK1_UNITS, ...TASK2_UNITS];

export function unitBySlug(slug: string): VocabUnit | undefined {
  return VOCAB_UNITS.find((unit) => unit.slug === slug);
}

export const FAMILY_LABEL: Record<VocabUnit['family'], string> = {
  task1: 'Task 1 · by section',
  task2: 'Task 2 · by section',
  function: 'Across both tasks · by function',
};

/** Las familias en el orden en que se recorren, con las unidades que ya existen en cada una. */
export function unitsByFamily() {
  return (['task1', 'task2', 'function'] as const)
    .map((family) => ({ family, label: FAMILY_LABEL[family], units: VOCAB_UNITS.filter((unit) => unit.family === family) }))
    .filter((group) => group.units.length > 0);
}
