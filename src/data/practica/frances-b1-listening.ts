import type { ListeningExercise } from './ingles-a1-listening'
import { FRENCH_B1_SERIES } from './series/frances-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «La relève» — Francés B1 · temporada 3 de «Le pain de six heures».
// Fuente editorial: src/data/practica/series/frances-b1-series.ts (no editar aquí).

export const LISTENING_FRANCES_B1: ListeningExercise[] = seriesToExercises(FRENCH_B1_SERIES, {
  audioAvailable: audioReady('frances', 'b1'),
})
