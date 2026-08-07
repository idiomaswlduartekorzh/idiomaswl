import type { ListeningExercise } from './ingles-a1-listening'
import { JAPANESE_B1_SERIES } from './series/japones-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «二十二年目の広場» — Japonés B1 · temporada 3 de «青い手帳のスタンプ». La romanización viaja en cada línea.
// Fuente editorial: src/data/practica/series/japones-b1-series.ts (no editar aquí).

export const LISTENING_JAPONES_B1: ListeningExercise[] = seriesToExercises(JAPANESE_B1_SERIES, {
  audioAvailable: audioReady('japones', 'b1'),
})
