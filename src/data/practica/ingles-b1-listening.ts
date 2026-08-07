import type { ListeningExercise } from './ingles-a1-listening'
import { ENGLISH_B1_SERIES } from './series/ingles-b1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «The Door Stays Open» — Inglés B1 · temporada 3 de «The Corner Shop».
// Fuente editorial: src/data/practica/series/ingles-b1-series.ts (no editar aqui).
//
// Sustituye a la version anterior, que si tenia transcripcion pero arrastraba dos
// defectos: un narrador que contaba media trama —el nivel pide sostener conversacion,
// no escuchar a alguien narrando— y una «consolidacion» que preguntaba que estructura
// organiza el episodio y daba como respuesta el nombre de la estructura.

export const LISTENING_B1_ALL: ListeningExercise[] = seriesToExercises(ENGLISH_B1_SERIES, {
  audioAvailable: audioReady('ingles', 'b1'),
})
