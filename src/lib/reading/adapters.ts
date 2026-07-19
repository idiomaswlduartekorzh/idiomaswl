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

export function normalizeReadingLookup(value: string) {
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function baseTokenize(text: string, language: ReadingLanguage) {
  return language === 'ja'
    ? text.split(/([\s、。！？「」]+)/u)
    : text.split(/(\s+|[.,!?。！？;:]+)/u)
}

/**
 * Keeps declared glossary phrases intact before applying script-level splitting.
 * This is important for Korean counters and verb phrases such as "한 잔" and
 * "가지고 갈게요", which cannot be discovered by whitespace splitting alone.
 */
export function tokenizeReadingText(text: string, language: ReadingLanguage, glossarySurfaces: string[] = []): ReadingToken[] {
  const surfaces = [...new Set(glossarySurfaces.map((surface) => surface.trim()).filter(Boolean))]
    .sort((a, b) => b.length - a.length)
  const phrasePattern = surfaces.length
    ? new RegExp(`(${surfaces.map(escapeRegExp).join('|')})`, 'giu')
    : null
  const chunks = phrasePattern ? text.split(phrasePattern) : [text]
  const declaredLookups = new Set(surfaces.map(normalizeReadingLookup))
  const parts = chunks.flatMap((chunk) => declaredLookups.has(normalizeReadingLookup(chunk)) ? [chunk] : baseTokenize(chunk, language))

  return parts.filter(Boolean).map((raw) => {
    const lookup = normalizeReadingLookup(raw)
    return { raw, lookup, isWord: lookup.length > 0 }
  })
}
