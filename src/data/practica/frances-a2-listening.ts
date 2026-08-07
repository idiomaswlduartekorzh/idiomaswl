import type { ListeningExercise } from './ingles-a1-listening'
import { FRENCH_A2_SERIES } from './series/frances-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «La moitié de la recette» — Francés A2 · temporada 2 de «Le carnet rouge».
// Fuente editorial: src/data/practica/series/frances-a2-series.ts (no editar aquí).

export const LISTENING_FRANCES_A2: ListeningExercise[] = seriesToExercises(FRENCH_A2_SERIES, {
  audioAvailable: audioReady('frances', 'a2'),
})
