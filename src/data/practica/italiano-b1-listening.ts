import type { ListeningExercise } from './ingles-a1-listening'
import { ITALIAN_B1_SERIES } from './series/italiano-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Le chiavi della sartoria» — Italiano B1 · temporada 3 del cortile de Bolonia.
// Fuente editorial: src/data/practica/series/italiano-b1-series.ts (no editar aquí).

export const LISTENING_ITALIANO_B1: ListeningExercise[] = seriesToExercises(ITALIAN_B1_SERIES, {
  audioAvailable: audioReady('italiano', 'b1'),
})
