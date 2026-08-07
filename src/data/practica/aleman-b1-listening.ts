import type { ListeningExercise } from './ingles-a1-listening'
import { GERMAN_B1_SERIES } from './series/aleman-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Der Brief ohne Absender» — Alemán B1 · temporada 3 de «Emma in Berlin».
// Fuente editorial: src/data/practica/series/aleman-b1-series.ts (no editar aquí).
//
// Sustituye a los 12 monólogos que vivían en este fichero: la temporada se reescribió
// en diálogo y se amplió a 20 episodios. Un monólogo no enseña a sostener una conversación,
// y el resto de series del proyecto ya alternaban voces.

export const LISTENING_ALEMAN_B1: ListeningExercise[] = seriesToExercises(GERMAN_B1_SERIES, {
  audioAvailable: audioReady('aleman', 'b1'),
})
