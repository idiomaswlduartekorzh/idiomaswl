import type { ListeningExercise } from './ingles-a1-listening'
import { ENGLISH_A2_SERIES } from './series/ingles-a2-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «Sam's Corner» — Inglés A2 · temporada 2 de «The Corner Shop».
// Fuente editorial: src/data/practica/series/ingles-a2-series.ts (no editar aqui).
//
// Sustituye a los 20 episodios que vivian aqui, que se publicaban con `transcript: []`
// —audio sin texto que leer—, una sola pregunta de detalle en vez de tres y una
// «consolidacion» que preguntaba que estructura gramatical organiza el episodio y daba
// como respuesta correcta el nombre de la estructura: se acertaba leyendo el titulo.

export const LISTENING_A2_ALL: ListeningExercise[] = seriesToExercises(ENGLISH_A2_SERIES, {
  audioAvailable: audioReady('ingles', 'a2'),
})
