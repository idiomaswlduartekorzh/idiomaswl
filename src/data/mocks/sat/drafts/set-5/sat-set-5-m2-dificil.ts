import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-5-m2-dificil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-5-m2-dificil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-5-m2-dificil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-5-m2-dificil-eoi'

/** Candidato incremental del M2 exigente. Permanece en drafts y no está registrado en producto. */
export const satSet5M2Dificil: SatModule = {
  id: 'sat-set-5-m2-dificil',
  variant: 'M2-dificil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
