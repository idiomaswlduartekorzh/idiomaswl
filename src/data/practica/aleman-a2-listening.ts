import type { ListeningExercise } from './ingles-a1-listening'
import { GERMAN_A2_SERIES } from './series/aleman-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Der Schlüssel zum Café» — Alemán A2 · temporada 2 de «Emma in Berlin».
// Fuente editorial: src/data/practica/series/aleman-a2-series.ts (no editar aquí).
//
// Sustituye a los 20 monólogos que vivían en este fichero. Se conserva intacta su
// progresión gramatical, que es la que enseña /practica/aleman/a2/gramatica; lo que
// cambia es la forma: dos o tres voces alternando en vez de una narrando.

export const LISTENING_ALEMAN_A2: ListeningExercise[] = seriesToExercises(GERMAN_A2_SERIES, {
  audioAvailable: audioReady('aleman', 'a2'),
})
