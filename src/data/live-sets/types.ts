export type QuestionType = 'choice' | 'formality' | 'particle' | 'blank' | 'korean-read'

export type Level = 'A1' | 'A2' | 'TOPIK-I' | 'TOPIK-II' | 'B2' | 'C1'

export interface Option {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  romanization?: string
}

export interface LiveQuestion {
  id: string
  type: QuestionType
  level: Level
  context?: string
  prompt: string
  promptKo?: string
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
  questions: LiveQuestion[]
}
