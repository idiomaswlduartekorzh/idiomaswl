import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-5-m1-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-5-m1-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-5-m1-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-5-m1-eoi'

/** Candidato incremental de M1. Permanece en drafts y no está registrado en producto. */
export const satSet5M1: SatModule = {
  id: 'sat-set-5-m1',
  variant: 'M1',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
