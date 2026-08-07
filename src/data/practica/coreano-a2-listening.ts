import type { ListeningExercise } from './ingles-a1-listening'
import { KOREAN_A2_SERIES } from './series/coreano-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «별 카페의 손편지» — Coreano A2 · temporada 2 de «노란 우산의 주인». La romanización viaja en cada línea.
// Fuente editorial: src/data/practica/series/coreano-a2-series.ts (no editar aquí).

export const LISTENING_COREANO_A2: ListeningExercise[] = seriesToExercises(KOREAN_A2_SERIES, {
  audioAvailable: audioReady('coreano', 'a2'),
})
