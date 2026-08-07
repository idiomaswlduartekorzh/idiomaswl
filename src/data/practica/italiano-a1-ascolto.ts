import type { ListeningExercise } from './ingles-a1-listening'
import { ITALIAN_A1_SERIES } from './series/italiano-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Il primo mese a Bologna» — Italiano A1 · temporada 1 de «La bicicletta gialla».
// Fuente editorial: src/data/practica/series/italiano-a1-series.ts (no editar aqui).
//
// Sustituye a los 20 monologos que vivian aqui. Ocurre antes de A2: el primer mes de
// Valeria en Bolonia, cuando todavia va a todas partes a pie, y termina el domingo en
// que descubre el mercadillo donde comprara la bicicleta amarilla.

export const ASCOLTO_A1: ListeningExercise[] = seriesToExercises(ITALIAN_A1_SERIES, {
  audioAvailable: audioReady('italiano', 'a1'),
})
