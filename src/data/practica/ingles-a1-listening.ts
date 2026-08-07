export type ListeningOption = { label: string; correct: boolean; feedback: string }

export type ListeningQuestion = {
  prompt: string
  options: ListeningOption[]
}

/**
 * Una línea de la transcripción. `en` es el idioma meta (el campo conserva su nombre
 * histórico: las series de alemán, italiano, etc. lo reutilizan tal cual).
 *
 * `speaker` y `romanization` son opcionales y solo los traen las series dialogadas
 * (francés, portugués, coreano, japonés y ruso A1). Las series de monólogo previas
 * los omiten y se renderizan exactamente igual que antes.
 */
export type ListeningLine = {
  en: string
  es: string
  /** Nombre del personaje que habla. Solo en series dialogadas. */
  speaker?: string
  /** Transliteración latina de `en`. Solo donde la escritura no es latina (ko, ja, ru). */
  romanization?: string
}

export type ListeningExercise = {
  id: string
  order: number
  title: string
  titleEs: string
  objective: string
  duration: number
  grammar: string[]
  keywords: Array<{ en: string; es: string }>
  transcript: ListeningLine[]
  gist: ListeningQuestion
  details: ListeningQuestion[]
  consolidation: ListeningQuestion
  audioAvailable?: boolean
  /** Nombre del mp3 sin extensión. Por defecto: listening-<order>. */
  audioFile?: string
}


import { ENGLISH_A1_SERIES } from './series/ingles-a1-series'
import { seriesToExercises } from './series/adapt'
import { audioReady } from './series/audio-ready'

/**
 * Serie «The Corner Shop» — Inglés A1 · temporada 1.
 * Fuente editorial: src/data/practica/series/ingles-a1-series.ts (no editar aquí).
 *
 * Este fichero sigue siendo el hogar de los tipos que consume ListeningJourney y que
 * importan todas las demás series; lo que se ha ido es el contenido antiguo. Eran los
 * veinte monólogos de una tal Emma Brown de Londres, y a partir del episodio seis
 * varios llegaban a producción con `transcript: []` y `details: []`: audio sin texto
 * y fase de detalles vacía. Ahora los veinte son diálogo y tienen las cinco preguntas.
 */
export const LISTENING_A1_ALL: ListeningExercise[] = seriesToExercises(ENGLISH_A1_SERIES, {
  audioAvailable: audioReady('ingles', 'a1'),
})

export function getListeningExercise(id: string) {
  return LISTENING_A1_ALL.find(exercise => exercise.id === id)
}
