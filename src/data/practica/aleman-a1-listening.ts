import type { ListeningExercise } from './ingles-a1-listening'
import { GERMAN_A1_SERIES } from './series/aleman-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Ein Zimmer in Berlin» — Alemán A1 · temporada 1 de «Emma in Berlin».
// Fuente editorial: src/data/practica/series/aleman-a1-series.ts (no editar aquí).
//
// Sustituye a los 20 monólogos que vivían en este fichero, conservando su progresión
// gramatical, que es la que enseña /practica/aleman/a1/gramatica. Los tres personajes
// que sostienen las tres temporadas aparecen aquí por primera vez.

export const LISTENING_ALEMAN_A1: ListeningExercise[] = seriesToExercises(GERMAN_A1_SERIES, {
  audioAvailable: audioReady('aleman', 'a1'),
})
