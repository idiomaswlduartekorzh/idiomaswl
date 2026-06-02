export type QuestionType =
  | 'choice'
  | 'formality'
  | 'particle'
  | 'blank'
  | 'korean-read'
  | 'audio-listen'   // ← nuevo: escucha el audio y elige cuál sonó

export type Level = 'A1' | 'A2' | 'TOPIK-I' | 'TOPIK-II' | 'B2' | 'C1'

export interface Option {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  romanization?: string
  meaning?: string        // ← se revela solo al mostrar la respuesta
}

export interface LiveQuestion {
  id: string
  type: QuestionType
  level: Level
  context?: string
  prompt: string          // para audio-listen: "¿Cuál de estas palabras escuchaste?"
  promptKo?: string
  audioText?: string      // ← texto que el TTS va a pronunciar (ko-KR)
  audioRate?: number      // velocidad TTS (default 0.85)
  options: Option[]
  correct: 'A' | 'B' | 'C' | 'D'
  explanation: string
  trap: string
}

export interface LiveSet {
  id: string
  title: string
  titleKo: string
  lang: 'ko'
  difficulty: 1 | 2 | 3  // ← nivel del set
  nextSetId?: string      // ← id del siguiente nivel
  questions: LiveQuestion[]
}
