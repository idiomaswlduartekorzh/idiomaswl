import type { ListeningExercise } from './ingles-a1-listening'
import { RUSSIAN_A2_SERIES } from './series/ruso-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Тетрадь студии «Луна»» — Ruso A2 · temporada 2 de «Красный шарф в метро».
// Fuente editorial: src/data/practica/series/ruso-a2-series.ts (no editar aquí).

export const LISTENING_RUSO_A2: ListeningExercise[] = seriesToExercises(RUSSIAN_A2_SERIES, {
  audioAvailable: audioReady('ruso', 'a2'),
})
