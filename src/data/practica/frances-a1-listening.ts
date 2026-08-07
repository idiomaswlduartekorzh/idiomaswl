import type { ListeningExercise } from './ingles-a1-listening'
import { FRENCH_A1_SERIES } from './series/frances-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Le carnet rouge» — Francés A1 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/frances-a1-series.ts (no editar aquí).
// El audio se sirve como `/audio/frances/a1/listening-NN.mp3` según el `order`.

export const LISTENING_FRANCES_A1: ListeningExercise[] = seriesToExercises(FRENCH_A1_SERIES, {
  audioAvailable: audioReady('frances'),
})
