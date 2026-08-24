import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-2-m1-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-2-m1-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-2-m1-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-2-m1-eoi'

/**
 * Borrador editorial del Módulo 1 del SAT Set 2.
 *
 * Este archivo vive bajo `drafts/` a propósito: el catálogo no lo registra, el alumnado
 * no puede abrirlo y no debe moverse al directorio publicable hasta completar las cuatro
 * auditorías de criterio y firmar un acta vigente. Las ocho puertas mecánicas se ejecutan
 * con:
 *
 * node scripts/check-sat-exam.mjs --draft \
 *   --file src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts --verbose
 */
export const satSet2M1: SatModule = {
  id: 'sat-set-2-m1',
  variant: 'M1',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
