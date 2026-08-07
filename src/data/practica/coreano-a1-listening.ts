import type { ListeningExercise } from './ingles-a1-listening'
import { KOREAN_A1_SERIES } from './series/coreano-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

// Serie «노란 우산의 주인» — Coreano A1 · 20 episodios dialogados.
// Fuente editorial: src/data/practica/series/coreano-a1-series.ts (no editar aquí).
// La romanización viaja en cada línea de la transcripción: el placeholder que esta
// página sustituye ya la mostraba, y quitarla sería una regresión.

export const LISTENING_COREANO_A1: ListeningExercise[] = seriesToExercises(KOREAN_A1_SERIES, {
  audioAvailable: audioReady('coreano'),
})
