import type { ListeningExercise } from './ingles-a1-listening'
import { KOREAN_B1_SERIES } from './series/coreano-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «별 카페의 마지막 여름» — Coreano B1 · temporada 3 de «노란 우산의 주인». La romanización viaja en cada línea.
// Fuente editorial: src/data/practica/series/coreano-b1-series.ts (no editar aquí).

export const LISTENING_COREANO_B1: ListeningExercise[] = seriesToExercises(KOREAN_B1_SERIES, {
  audioAvailable: audioReady('coreano', 'b1'),
})
