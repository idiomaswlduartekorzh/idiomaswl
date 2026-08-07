import type { ListeningExercise } from './ingles-a1-listening'
import { JAPANESE_A2_SERIES } from './series/japones-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «二十年目のスタンプ» — Japonés A2 · temporada 2 de «青い手帳のスタンプ».
// Fuente editorial: src/data/practica/series/japones-a2-series.ts (no editar aquí).

export const LISTENING_JAPONES_A2: ListeningExercise[] = seriesToExercises(JAPANESE_A2_SERIES, {
  audioAvailable: audioReady('japones', 'a2'),
})
