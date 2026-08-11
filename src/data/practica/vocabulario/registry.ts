import type { Lang, Nivel, VocabBlock, VocabLevel } from './schema'
import { INGLES_A1 } from './ingles-a1'

/**
 * Registro de los niveles de vocabulario escritos con el esquema nuevo.
 *
 * Se llena idioma por idioma según el plan de arranque: un nivel no entra aquí hasta que
 * pasa su Puerta 2. Hoy solo está el piloto de inglés A1, con un bloque de los diez.
 */
const LEVELS: VocabLevel[] = [INGLES_A1]

export function getVocabLevel(lang: Lang | string, nivel: Nivel | string): VocabLevel | undefined {
  return LEVELS.find((l) => l.lang === lang && l.nivel === nivel)
}

export function getVocabBlocks(lang: Lang | string, nivel: Nivel | string): VocabBlock[] {
  return getVocabLevel(lang, nivel)?.bloques ?? []
}

export function getVocabBlock(
  lang: Lang | string,
  nivel: Nivel | string,
  slug: string,
): VocabBlock | undefined {
  return getVocabBlocks(lang, nivel).find((b) => b.id === slug)
}

// El reparto en unidades vive en `unidades.ts`, sin importar ningún nivel, para que lo pueda
// cargar también el script que factura el audio. Se reexporta para no romper a quien ya lo
// importaba de aquí.
export { TAMANO_UNIDAD, unidadesDe } from './unidades'
