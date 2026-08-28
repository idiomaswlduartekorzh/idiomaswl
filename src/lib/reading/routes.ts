import type { CefrLevel, ReadingExercise, ReadingLanguage, TutorLocale } from './types'

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
  // Todas las lecturas viven en las URLs canónicas del sitio, sin prefijo de idioma:
  // /practica/<idioma>/<nivel>/lectura. El inglés ya era así; el resto llevaba un /es/
  // delante que habría abierto un segundo espacio de URLs en paralelo al que se unificó
  // en agosto de 2026. Es la misma ruta que escribe el generador en `seo.canonicalPath`,
  // y las dos tienen que coincidir o el sitemap apuntaría a un sitio y el canonical a otro.
  if (locale === 'es') {
    return `/practica/${languageSlug}/${normalizedLevel}/lectura`
  }
  return `/en/practice/${languageSlug}/${normalizedLevel}/reading`
}

export function readingExercisePath(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel, slug: string) {
  return `${readingHubPath(locale, language, level)}/${slug}`
}

export function readingExerciseLocalePaths(
  exercise: Pick<ReadingExercise, 'language' | 'level' | 'slug' | 'tutorLocales'>
) {
  return [...new Set(exercise.tutorLocales)].map((locale) => ({
    locale,
    path: readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug),
  }))
}

export function readingHubLocalePaths(
  locales: readonly TutorLocale[],
  language: ReadingLanguage,
  level: CefrLevel
) {
  return [...new Set(locales)].map((locale) => ({
    locale,
    path: readingHubPath(locale, language, level),
  }))
}

export function readingAlternates(paths: ReadonlyArray<{ locale: TutorLocale; path: string }>) {
  const languages = Object.fromEntries(paths.map(({ locale, path }) => [locale, path]))
  const xDefault = languages.es ?? languages.en
  return xDefault ? { ...languages, 'x-default': xDefault } : languages
}

export function resolveLanguageSlug(locale: TutorLocale, slug: string): ReadingLanguage | null {
  const entry = Object.entries(LANGUAGE_SLUGS[locale]).find(([, localizedSlug]) => localizedSlug === slug)
  return (entry?.[0] as ReadingLanguage | undefined) ?? null
}

export function languageSlug(locale: TutorLocale, language: ReadingLanguage) {
  return LANGUAGE_SLUGS[locale][language]
}
