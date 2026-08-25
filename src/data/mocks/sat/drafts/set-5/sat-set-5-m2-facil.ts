import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-5-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-5-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-5-m2-facil-sec'

/** Candidato incremental del M2 estándar. Permanece en drafts y no está registrado en producto. */
export const satSet5M2Facil: SatModule = {
  id: 'sat-set-5-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec],
  meta: [...csMeta, ...iiMeta, ...secMeta],
}
