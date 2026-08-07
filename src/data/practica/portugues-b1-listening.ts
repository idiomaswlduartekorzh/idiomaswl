import type { ListeningExercise } from './ingles-a1-listening'
import { PORTUGUESE_B1_SERIES } from './series/portugues-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Uma proposta para o muro» — Portugués B1 · temporada 3 de «O mural do quintal».
// Fuente editorial: src/data/practica/series/portugues-b1-series.ts (no editar aquí).

export const LISTENING_PORTUGUES_B1: ListeningExercise[] = seriesToExercises(PORTUGUESE_B1_SERIES, {
  audioAvailable: audioReady('portugues', 'b1'),
})
