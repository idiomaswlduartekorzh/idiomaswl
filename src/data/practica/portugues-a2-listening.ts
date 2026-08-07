import type { ListeningExercise } from './ingles-a1-listening'
import { PORTUGUESE_A2_SERIES } from './series/portugues-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «O muro que perdeu as cores» — Portugués brasileño A2 · temporada 2 de «O áudio no grupo errado».
// Fuente editorial: src/data/practica/series/portugues-a2-series.ts (no editar aquí).

export const LISTENING_PORTUGUES_A2: ListeningExercise[] = seriesToExercises(PORTUGUESE_A2_SERIES, {
  audioAvailable: audioReady('portugues', 'a2'),
})
