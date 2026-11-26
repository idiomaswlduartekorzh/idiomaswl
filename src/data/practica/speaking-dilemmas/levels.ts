import type { AdditionalDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'
import { A1_DILEMMAS } from './a1'
import { A2_DILEMMAS } from './a2'
import { B1_DILEMMAS } from './b1'
import { B2_DILEMMAS } from './b2'
import { C2_DILEMMAS } from './c2'
import type { SpeakingDilemma } from './types'

export const DILEMMAS_BY_LEVEL: Record<AdditionalDilemmaLevel, readonly SpeakingDilemma[]> = {
  a1: A1_DILEMMAS,
  a2: A2_DILEMMAS,
  b1: B1_DILEMMAS,
  b2: B2_DILEMMAS,
  c2: C2_DILEMMAS,
}
