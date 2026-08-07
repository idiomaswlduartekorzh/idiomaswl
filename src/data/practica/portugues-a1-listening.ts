import type { ListeningExercise } from './ingles-a1-listening'
import { PORTUGUESE_A1_SERIES } from './series/portugues-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «O áudio no grupo errado» — Portugués brasileño A1 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/portugues-a1-series.ts (no editar aquí).

export const LISTENING_PORTUGUES_A1: ListeningExercise[] = seriesToExercises(PORTUGUESE_A1_SERIES, {
  audioAvailable: audioReady('portugues'),
})
