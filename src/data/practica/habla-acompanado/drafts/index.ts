import { ROLEPLAY_INGLES_A2 } from '../ingles-a2.ts'
import { ROLEPLAY_INGLES_A2_BATCH_1 } from './ingles-a2-batch-1.ts'
import { ROLEPLAY_INGLES_A2_BATCH_2 } from './ingles-a2-batch-2.ts'
import { ROLEPLAY_INGLES_A2_BATCH_3 } from './ingles-a2-batch-3.ts'
import { ROLEPLAY_INGLES_A2_BATCH_4 } from './ingles-a2-batch-4.ts'
import { TOOLKIT_INGLES_A1 } from '../toolkit-ingles-a1.ts'
import { ROLEPLAY_INGLES_A1_BATCH_1 } from './ingles-a1-batch-1.ts'
import { ROLEPLAY_INGLES_A1_BATCH_2 } from './ingles-a1-batch-2.ts'
import { ROLEPLAY_INGLES_A1_BATCH_3 } from './ingles-a1-batch-3.ts'
import { ROLEPLAY_INGLES_A1_BATCH_4 } from './ingles-a1-batch-4.ts'
import { ROLEPLAY_INGLES_A1_BATCH_5 } from './ingles-a1-batch-5.ts'
import { ROLEPLAY_INGLES_A1_BATCH_6 } from './ingles-a1-batch-6.ts'
import { ROLEPLAY_INGLES_A1_BATCH_7 } from './ingles-a1-batch-7.ts'
import { ROLEPLAY_INGLES_A1_BATCH_8 } from './ingles-a1-batch-8.ts'
import { ROLEPLAY_INGLES_A1_BATCH_9 } from './ingles-a1-batch-9.ts'
import { ROLEPLAY_INGLES_A1_BATCH_10 } from './ingles-a1-batch-10.ts'
import { ROLEPLAY_INGLES_B1_BATCH_1 } from './ingles-b1-batch-1.ts'
import { ROLEPLAY_INGLES_B1_BATCH_2 } from './ingles-b1-batch-2.ts'
import { ROLEPLAY_INGLES_B1_BATCH_3 } from './ingles-b1-batch-3.ts'
import { ROLEPLAY_INGLES_B1_BATCH_4 } from './ingles-b1-batch-4.ts'
import { ROLEPLAY_INGLES_B1_BATCH_5 } from './ingles-b1-batch-5.ts'
import { ROLEPLAY_INGLES_B1_BATCH_6 } from './ingles-b1-batch-6.ts'
import { ROLEPLAY_INGLES_B1_BATCH_7 } from './ingles-b1-batch-7.ts'
import { ROLEPLAY_INGLES_B1_BATCH_8 } from './ingles-b1-batch-8.ts'
import { ROLEPLAY_INGLES_B1_BATCH_9 } from './ingles-b1-batch-9.ts'
import { ROLEPLAY_INGLES_B1_BATCH_10 } from './ingles-b1-batch-10.ts'
import { ROLEPLAY_INGLES_B1_BATCH_11 } from './ingles-b1-batch-11.ts'
import { ROLEPLAY_COREANO_A2_BATCH_1 } from './coreano-a2-batch-1.ts'
import { ROLEPLAY_COREANO_A2_BATCH_1B } from './coreano-a2-batch-1b.ts'
import { ROLEPLAY_COREANO_A2_BATCH_2 } from './coreano-a2-batch-2.ts'
import { ROLEPLAY_COREANO_A2_BATCH_2B } from './coreano-a2-batch-2b.ts'
import { ROLEPLAY_COREANO_A2_BATCH_3 } from './coreano-a2-batch-3.ts'
import { ROLEPLAY_COREANO_A2_BATCH_3B } from './coreano-a2-batch-3b.ts'
import { ROLEPLAY_COREANO_A2_BATCH_4 } from './coreano-a2-batch-4.ts'
import { ROLEPLAY_COREANO_A2_BATCH_5 } from './coreano-a2-batch-5.ts'
import { ROLEPLAY_FRANCES_A2_BATCH_1 } from './frances-a2-batch-1.ts'
import { TOOLKIT_FRANCES_A2 } from '../toolkit-frances-a2.ts'

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

export const ROLEPLAY_INGLES_A1_CANDIDATE = [
  ...ROLEPLAY_INGLES_A1_BATCH_1,
  ...ROLEPLAY_INGLES_A1_BATCH_2,
  ...ROLEPLAY_INGLES_A1_BATCH_3,
  ...ROLEPLAY_INGLES_A1_BATCH_4,
  ...ROLEPLAY_INGLES_A1_BATCH_5,
  ...ROLEPLAY_INGLES_A1_BATCH_6,
  ...ROLEPLAY_INGLES_A1_BATCH_7,
  ...ROLEPLAY_INGLES_A1_BATCH_8,
  ...ROLEPLAY_INGLES_A1_BATCH_9,
  ...ROLEPLAY_INGLES_A1_BATCH_10,
].sort((a, b) => a.sequence - b.sequence)

export const ROLEPLAY_INGLES_B1_CANDIDATE = [
  ...ROLEPLAY_INGLES_B1_BATCH_1,
  ...ROLEPLAY_INGLES_B1_BATCH_2,
  ...ROLEPLAY_INGLES_B1_BATCH_3,
  ...ROLEPLAY_INGLES_B1_BATCH_4,
  ...ROLEPLAY_INGLES_B1_BATCH_5,
  ...ROLEPLAY_INGLES_B1_BATCH_6,
  ...ROLEPLAY_INGLES_B1_BATCH_7,
  ...ROLEPLAY_INGLES_B1_BATCH_8,
  ...ROLEPLAY_INGLES_B1_BATCH_9,
  ...ROLEPLAY_INGLES_B1_BATCH_10,
  ...ROLEPLAY_INGLES_B1_BATCH_11,
].sort((a, b) => a.sequence - b.sequence)

export const ROLEPLAY_COREANO_A2_CANDIDATE = [
  ...ROLEPLAY_COREANO_A2_BATCH_1,
  ...ROLEPLAY_COREANO_A2_BATCH_1B,
  ...ROLEPLAY_COREANO_A2_BATCH_2,
  ...ROLEPLAY_COREANO_A2_BATCH_2B,
  ...ROLEPLAY_COREANO_A2_BATCH_3,
  ...ROLEPLAY_COREANO_A2_BATCH_3B,
  ...ROLEPLAY_COREANO_A2_BATCH_4,
  ...ROLEPLAY_COREANO_A2_BATCH_5,
].sort((a, b) => a.sequence - b.sequence)

export const ROLEPLAY_FRANCES_A2_CANDIDATE = [
  ...ROLEPLAY_FRANCES_A2_BATCH_1,
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
    language: 'frances',
    level: 'a2',
    scenarios: ROLEPLAY_FRANCES_A2_CANDIDATE,
    toolkit: TOOLKIT_FRANCES_A2,
  },
]
import type { RoleplaySet } from '../index.ts'
