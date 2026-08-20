import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-1-m1-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-1-m1-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-1-m1-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-1-m1-eoi'

/**
 * Módulo 1 del primer set SAT. 27 ítems, todos puntuables.
 *
 * El orden de los bloques NO es decorativo: College Board ordena los dominios de forma
 * fija y la misma en los dos módulos —Craft and Structure → Information and Ideas →
 * Standard English Conventions → Expression of Ideas—, y dentro de cada dominio agrupa
 * por tipo de ítem antes de subir la dificultad, salvo en convenciones, que va de fácil a
 * difícil sin agrupar. Verificado el 18 ago 2026 (docs/sat-ingles-blueprint.md §2).
 *
 * Los bloques se escriben y se auditan por separado porque son independientes; lo único
 * que los ata es el reparto de claves, y ese se preasigna en el plan del módulo antes de
 * escribir un solo ítem. Aquí solo se concatenan.
 *
 * Quien valide esto: `node scripts/check-sat-exam.mjs --module sat-set-1-m1 --verbose`.
 */
export const satSet1M1: SatModule = {
  id: 'sat-set-1-m1',
  variant: 'M1',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
