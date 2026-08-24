import type { SatModule } from '../../module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-4-m1-cs'

/**
 * Candidato incremental de M1. Permanece en drafts y no está registrado en producto.
 * Se añaden bloques únicamente después de cerrar su auditoría.
 */
export const satSet4M1: SatModule = {
  id: 'sat-set-4-m1',
  variant: 'M1',
  items: [...cs],
  meta: [...csMeta],
}
