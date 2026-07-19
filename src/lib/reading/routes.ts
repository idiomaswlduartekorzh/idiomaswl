import type { CefrLevel, ReadingLanguage, TutorLocale } from './types'

const LANGUAGE_SLUGS: Record<TutorLocale, Record<ReadingLanguage, string>> = {
  es: { en: 'ingles', fr: 'frances', it: 'italiano', de: 'aleman', ru: 'ruso', ja: 'japones', ko: 'coreano', pt: 'portugues' },
  en: { en: 'english', fr: 'french', it: 'italian', de: 'german', ru: 'russian', ja: 'japanese', ko: 'korean', pt: 'portuguese' },
}

export const LANGUAGE_NAMES: Record<TutorLocale, Record<ReadingLanguage, string>> = {
  es: { en: 'Inglés', fr: 'Francés', it: 'Italiano', de: 'Alemán', ru: 'Ruso', ja: 'Japonés', ko: 'Coreano', pt: 'Portugués brasileño' },
  en: { en: 'English', fr: 'French', it: 'Italian', de: 'German', ru: 'Russian', ja: 'Japanese', ko: 'Korean', pt: 'Brazilian Portuguese' },
}

export function readingHubPath(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel) {
  const languageSlug = LANGUAGE_SLUGS[locale][language]
  const normalizedLevel = level.toLowerCase()
  return locale === 'es'
    ? `/es/practica/${languageSlug}/${normalizedLevel}/lectura`
    : `/en/practice/${languageSlug}/${normalizedLevel}/reading`
}

export function readingExercisePath(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel, slug: string) {
  return `${readingHubPath(locale, language, level)}/${slug}`
}

export function resolveLanguageSlug(locale: TutorLocale, slug: string): ReadingLanguage | null {
  const entry = Object.entries(LANGUAGE_SLUGS[locale]).find(([, localizedSlug]) => localizedSlug === slug)
  return (entry?.[0] as ReadingLanguage | undefined) ?? null
}

export function languageSlug(locale: TutorLocale, language: ReadingLanguage) {
  return LANGUAGE_SLUGS[locale][language]
}

