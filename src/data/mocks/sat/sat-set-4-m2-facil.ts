import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-4-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-4-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-4-m2-facil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-4-m2-facil-eoi'

/** Módulo 2 estándar publicado del Set 4, protegido por su acta editorial. */
export const satSet4M2Facil: SatModule = {
  id: 'sat-set-4-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
