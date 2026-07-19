import type { ReadingExercise, ReadingLanguage } from './types'

export type ReadingToken = {
  raw: string
  lookup: string
  isWord: boolean
}

export type ScriptCapabilities = {
  supportsFurigana: boolean
  supportsStressMarks: boolean
  supportsRomanization: boolean
  tokenizationMode: 'space' | 'morphological' | 'custom'
  writingDirection: 'ltr' | 'vertical-optional'
}

const CAPABILITIES: Record<ReadingLanguage, ScriptCapabilities> = {
  en: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: false, tokenizationMode: 'space', writingDirection: 'ltr' },
  fr: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: false, tokenizationMode: 'space', writingDirection: 'ltr' },
  it: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: false, tokenizationMode: 'space', writingDirection: 'ltr' },
  de: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: false, tokenizationMode: 'space', writingDirection: 'ltr' },
  pt: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: false, tokenizationMode: 'space', writingDirection: 'ltr' },
  ru: { supportsFurigana: false, supportsStressMarks: true, supportsRomanization: true, tokenizationMode: 'space', writingDirection: 'ltr' },
  ja: { supportsFurigana: true, supportsStressMarks: false, supportsRomanization: true, tokenizationMode: 'morphological', writingDirection: 'vertical-optional' },
  ko: { supportsFurigana: false, supportsStressMarks: false, supportsRomanization: true, tokenizationMode: 'morphological', writingDirection: 'ltr' },
}

function normalizeLookup(value: string) {
  return value
    .normalize('NFKC')
    .replace(/^[\s“”‘’"'.,!?;:()[\]{}]+|[\s“”‘’"'.,!?;:()[\]{}]+$/gu, '')
    .toLocaleLowerCase()
}

export function getScriptCapabilities(exercise: ReadingExercise): ScriptCapabilities {
  const base = CAPABILITIES[exercise.language]
  return {
    ...base,
    supportsFurigana: exercise.scriptSupport?.furigana ?? base.supportsFurigana,
    supportsStressMarks: exercise.scriptSupport?.stressMarks ?? base.supportsStressMarks,
    supportsRomanization: exercise.scriptSupport?.romanization !== 'none' && base.supportsRomanization,
    tokenizationMode: exercise.scriptSupport?.tokenizationMode ?? base.tokenizationMode,
  }
}

export function tokenizeReadingText(text: string, language: ReadingLanguage): ReadingToken[] {
  const parts = language === 'ja'
    ? text.split(/([\s、。！？「」]+)/u)
    : text.split(/(\s+|[.,!?;:]+)/u)

  return parts.filter(Boolean).map((raw) => {
    const lookup = normalizeLookup(raw)
    return { raw, lookup, isWord: lookup.length > 0 }
  })
}

