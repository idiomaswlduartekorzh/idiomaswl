import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-3-m2-facil-cs'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-3-m2-facil-eoi'
import { items as ii, meta as iiMeta } from './blocks/sat-set-3-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-3-m2-facil-sec'

/** Candidato incremental de la rama estándar. Sigue fuera del registro de producto. */
export const satSet3M2Facil: SatModule = {
  id: 'sat-set-3-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
