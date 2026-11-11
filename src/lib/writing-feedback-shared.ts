export const GERMAN_A1_READING_TASK_ID = 'de-a1-der-weg-zur-arbeit'

export type WritingAssignmentContext = {
  taskId?: string
  title?: string
  language: string
  level: string
  prompt: string
  sourceText?: string
  objectives?: string[]
  focus?: string[]
  feedbackLanguage?: 'en' | 'fr' | 'it' | 'de' | 'ru' | 'ja' | 'ko' | 'pt'
}

export type WritingFeedback = {
  errores: { fragmento: string; explicacion: string; correccion: string }[]
  version_corregida: string
  reescribe: string
}

export type WritingDraftRequirements = {
  minWords?: number
  maxWords?: number
  minSentences?: number
  maxSentences?: number
  maxCharacters?: number
  minCharacters?: number
}

export function meetsWritingDraftRequirements(text: string, requirements?: WritingDraftRequirements) {
  if (!requirements) return true
  const draft = text.trim()
  const words = draft ? draft.split(/\s+/u).length : 0
  const sentences = draft ? draft.split(/[.!?]+/u).filter(sentence => sentence.trim()).length : 0
  return (requirements.minWords === undefined || words >= requirements.minWords)
    && (requirements.maxWords === undefined || words <= requirements.maxWords)
    && (requirements.minSentences === undefined || sentences >= requirements.minSentences)
    && (requirements.maxSentences === undefined || sentences <= requirements.maxSentences)
    && (requirements.maxCharacters === undefined || draft.length <= requirements.maxCharacters)
    && (requirements.minCharacters === undefined || draft.length >= requirements.minCharacters)
}
