import type { ListeningExercise } from './ingles-a1-listening'
import { ITALIAN_A2_SERIES } from './series/italiano-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «La bicicletta gialla» — Italiano A2 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/italiano-a2-series.ts (no editar aquí).

export const LISTENING_ITALIANO_A2: ListeningExercise[] = seriesToExercises(ITALIAN_A2_SERIES, {
  audioAvailable: audioReady('italiano', 'a2'),
})
