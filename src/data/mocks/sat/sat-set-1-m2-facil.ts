import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-1-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-1-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-1-m2-facil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-1-m2-facil-eoi'

/**
 * Módulo 2, rama **estándar**: la que se sirve a quien no llega al corte del módulo 1.
 *
 * «Estándar» no quiere decir fácil. Lo que la separa de la rama exigente es la **media**, no
 * la ausencia de los otros niveles: un módulo sin ningún ítem difícil deja de medir a quien
 * va bien, y el examen real tampoco lo hace (blueprint §2, «Módulo 1 vs módulo 2»).
 *
 * Etiquetas de hoy: **12 fáciles, 10 medios y 5 difíciles**, que vienen de 13 · 11 · 3. Las
 * movió la calibración del 22 ago 2026, y está a medias a propósito: el calibrador encontró
 * que esta rama salía **más difícil que el módulo 1** (10,48 contra 10,07), lo que hace que
 * la adaptación castigue a quien va peor. Se rebajaron los textos del bloque EOI, que era el
 * peor de los ocho (12,00 de media), sin tocar ni una opción. Las etiquetas de `q23` y `q24`
 * son **anteriores** a esa rebaja y se espera que bajen a 2 al re-medir, con lo que la mezcla
 * volvería a 12 · 12 · 3. Detalle en el comentario de `blocks/sat-set-1-m2-facil-eoi.ts`.
 *
 * Mismo reparto y mismo orden de dominios que el módulo 1. Plan en
 * `docs/sat-planes/sat-set-1-m2-facil.md`, con las claves preasignadas.
 *
 * Quien valide esto: `node scripts/check-sat-exam.mjs --module sat-set-1-m2-facil`.
 */
export const satSet1M2Facil: SatModule = {
  id: 'sat-set-1-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
