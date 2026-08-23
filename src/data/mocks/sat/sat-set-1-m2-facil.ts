import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-1-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-1-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-1-m2-facil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-1-m2-facil-eoi'

/** Rama estándar del módulo 2, servida cuando M1 queda por debajo del corte. */
export const satSet1M2Facil: SatModule = {
  id: 'sat-set-1-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
