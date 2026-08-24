import type { RoleplaySet } from '../index.ts'
import { TOOLKIT_INGLES_A2 } from '../toolkit-ingles-a2.ts'
import { ROLEPLAY_INGLES_A2_BATCH_1 } from './ingles-a2-batch-1.ts'

/**
 * Conjuntos todavía no publicables.
 *
 * El guardián profundo sí los recorre, pero las rutas y el sitemap no los ven. Un
 * conjunto sale de aquí únicamente cuando alcanza 20 escenarios y pasa sus puertas
 * como unidad completa.
 */
export const ROLEPLAY_DRAFT_SETS: RoleplaySet[] = [
  {
    language: 'ingles',
    level: 'a2',
    scenarios: ROLEPLAY_INGLES_A2_BATCH_1,
    toolkit: TOOLKIT_INGLES_A2,
  },
]
