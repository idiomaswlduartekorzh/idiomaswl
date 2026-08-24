import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-4-m2-facil-cs'

/** Candidato incremental de M2 estándar. Permanece fuera del registro de producto. */
export const satSet4M2Facil: SatModule = {
  id: 'sat-set-4-m2-facil',
  variant: 'M2-facil',
  items: [...cs],
  meta: [...csMeta],
}
