import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-3-m2-facil-cs'

/** Candidato incremental de la rama estándar. Sigue fuera del registro de producto. */
export const satSet3M2Facil: SatModule = {
  id: 'sat-set-3-m2-facil',
  variant: 'M2-facil',
  items: [...cs],
  meta: [...csMeta],
}
