import type { ListeningExercise } from './ingles-a1-listening'
import { RUSSIAN_A1_SERIES } from './series/ruso-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Красный шарф в метро» — Ruso A1 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/ruso-a1-series.ts (no editar aquí).

export const LISTENING_RUSO_A1: ListeningExercise[] = seriesToExercises(RUSSIAN_A1_SERIES, {
  audioAvailable: audioReady('ruso'),
})
