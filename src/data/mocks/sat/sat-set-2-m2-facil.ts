import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-2-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-2-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-2-m2-facil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-2-m2-facil-eoi'

/** Borrador no registrable de la rama M2 fácil del SAT Set 2. */
export const satSet2M2Facil: SatModule = {
  id: 'sat-set-2-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
