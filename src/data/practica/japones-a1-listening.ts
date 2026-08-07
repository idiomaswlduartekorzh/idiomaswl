import type { ListeningExercise } from './ingles-a1-listening'
import { JAPANESE_A1_SERIES } from './series/japones-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «青い手帳のスタンプ» — Japonés A1 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/japones-a1-series.ts (no editar aquí).

export const LISTENING_JAPONES_A1: ListeningExercise[] = seriesToExercises(JAPANESE_A1_SERIES, {
  audioAvailable: audioReady('japones'),
})
