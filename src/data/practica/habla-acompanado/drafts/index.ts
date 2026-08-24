import type { RoleplaySet } from '../index.ts'
import { ROLEPLAY_INGLES_A2 } from '../ingles-a2.ts'
import { TOOLKIT_INGLES_A2 } from '../toolkit-ingles-a2.ts'
import { ROLEPLAY_INGLES_A2_BATCH_1 } from './ingles-a2-batch-1.ts'
import { ROLEPLAY_INGLES_A2_BATCH_2 } from './ingles-a2-batch-2.ts'
import { ROLEPLAY_INGLES_A2_BATCH_3 } from './ingles-a2-batch-3.ts'
import { ROLEPLAY_INGLES_A2_BATCH_4 } from './ingles-a2-batch-4.ts'

const ENGLISH_A2_PUBLISHED_SEQUENCE: Record<string, number> = {
  'the-bike-in-the-parking-lot': 1,
  'no-appointment-until-thursday': 2,
  'cancel-the-gym-i-am-leaving': 3,
  'swap-the-saturday-shift': 5,
  'late-again-on-monday': 6,
  'the-pot-is-already-on': 9,
  'the-cousin-on-the-sofa': 10,
  'two-more-people-for-the-trip': 13,
}

const reorderedPublishedEnglishA2 = ROLEPLAY_INGLES_A2.map((scenario) => {
  const sequence = ENGLISH_A2_PUBLISHED_SEQUENCE[scenario.slug]
  if (sequence === undefined) throw new Error(`Falta secuencia final para ${scenario.slug}`)
  return { ...scenario, sequence }
})

export const ROLEPLAY_INGLES_A2_CANDIDATE = [
  ...reorderedPublishedEnglishA2,
  ...ROLEPLAY_INGLES_A2_BATCH_1,
  ...ROLEPLAY_INGLES_A2_BATCH_2,
  ...ROLEPLAY_INGLES_A2_BATCH_3,
  ...ROLEPLAY_INGLES_A2_BATCH_4,
].sort((a, b) => a.sequence - b.sequence)

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
    scenarios: ROLEPLAY_INGLES_A2_CANDIDATE,
    toolkit: TOOLKIT_INGLES_A2,
  },
]
