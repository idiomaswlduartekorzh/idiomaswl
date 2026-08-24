import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-3-m2-dificil-cs'

/** Candidato incremental de la rama exigente. Sigue fuera del registro de producto. */
export const satSet3M2Dificil: SatModule = {
  id: 'sat-set-3-m2-dificil',
  variant: 'M2-dificil',
  items: [...cs],
  meta: [...csMeta],
}
