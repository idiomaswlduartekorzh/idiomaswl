import type { ListeningExercise } from './ingles-a1-listening'
import { RUSSIAN_B1_SERIES } from './series/ruso-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Второй голос» — Ruso B1 · temporada 3 de «Красный шарф в метро». La transliteración viaja en cada línea.
// Fuente editorial: src/data/practica/series/ruso-b1-series.ts (no editar aquí).

export const LISTENING_RUSO_B1: ListeningExercise[] = seriesToExercises(RUSSIAN_B1_SERIES, {
  audioAvailable: audioReady('ruso', 'b1'),
})
