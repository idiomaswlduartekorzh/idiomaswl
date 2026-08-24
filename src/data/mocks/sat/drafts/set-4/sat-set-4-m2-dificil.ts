import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-4-m2-dificil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-4-m2-dificil-ii'

/** Candidato incremental de M2 exigente. Permanece fuera del registro de producto. */
export const satSet4M2Dificil: SatModule = {
  id: 'sat-set-4-m2-dificil',
  variant: 'M2-dificil',
  items: [...cs, ...ii],
  meta: [...csMeta, ...iiMeta],
}
