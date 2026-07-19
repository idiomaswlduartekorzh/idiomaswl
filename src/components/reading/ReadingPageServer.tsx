import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReadingHub } from './ReadingHub'
import { ReadingLesson } from './ReadingLesson'
import { ReadingLocaleShell } from './ReadingLocaleShell'
import { ReadingStructuredData } from './ReadingStructuredData'
import { availableExercises, findReadingExercise, findReadingHubExercises } from '@/lib/reading/catalog'
import { LANGUAGE_NAMES, languageSlug, readingExercisePath, readingHubPath, resolveLanguageSlug } from '@/lib/reading/routes'
import { localized } from '@/lib/reading/validate'
import type { CefrLevel, ReadingExercise, ReadingLanguage, TutorLocale } from '@/lib/reading/types'

function parseLevel(raw: string): CefrLevel | null {
  const level = raw.toUpperCase()
  return ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'].includes(level) ? level as CefrLevel : null
}

export function readingStaticParams(locale: TutorLocale) {
  return availableExercises(locale)
    .map((exercise) => ({
      language: languageSlug(locale, exercise.language),
      level: exercise.level.cefr.toLowerCase(),
      slug: exercise.slug,
    }))
}

export function readingHubStaticParams(locale: TutorLocale) {
  const unique = new Map<string, { language: string; level: string }>()
  for (const exercise of availableExercises(locale)) {
    const entry = { language: languageSlug(locale, exercise.language), level: exercise.level.cefr.toLowerCase() }
    unique.set(`${entry.language}-${entry.level}`, entry)
  }
  return [...unique.values()]
}

function resolveRoute(locale: TutorLocale, languageParam: string, levelParam: string) {
  const language = resolveLanguageSlug(locale, languageParam)
  const level = parseLevel(levelParam)
  if (!language || !level) notFound()
  return { language, level }
}

function localizedAlternates(exercise: ReadingExercise) {
  const es = readingExercisePath('es', exercise.language, exercise.level.cefr, exercise.slug)
  const en = readingExercisePath('en', exercise.language, exercise.level.cefr, exercise.slug)
  return { es, en, 'x-default': es }
}

export function buildExerciseMetadata(exercise: ReadingExercise, locale: TutorLocale): Metadata {
  const canonical = readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug)
  const publishable = exercise.status === 'published' && exercise.seo.indexable
  return {
    title: localized(exercise.seo.title, locale),
    description: localized(exercise.seo.description, locale),
    alternates: { canonical, languages: localizedAlternates(exercise) },
    robots: { index: publishable, follow: true },
    openGraph: {
      type: 'article',
      url: canonical,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      title: localized(exercise.seo.title, locale),
      description: localized(exercise.seo.description, locale),
      modifiedTime: exercise.seo.lastModified,
    },
  }
}

export function buildHubMetadata(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel, exercises: ReadingExercise[]): Metadata {
  const languageName = LANGUAGE_NAMES[locale][language]
  const canonical = readingHubPath(locale, language, level)
  const es = readingHubPath('es', language, level)
  const en = readingHubPath('en', language, level)
  const indexable = exercises.some((exercise) => exercise.status === 'published' && exercise.seo.indexable)
  const title = locale === 'es' ? `Lecturas de ${languageName} ${level} con preguntas | WeLearn` : `${level} ${languageName} readings with questions | WeLearn`
  const description = locale === 'es'
    ? `Practica lectura en ${languageName} ${level} con textos breves, vocabulario, preguntas y feedback basado en evidencia.`
    : `Practise ${level} ${languageName} reading with short texts, vocabulary, questions, and evidence-based feedback.`
  return {
    title,
    description,
    alternates: { canonical, languages: { es, en, 'x-default': es } },
    robots: { index: indexable, follow: true },
    openGraph: { type: 'website', url: canonical, locale: locale === 'es' ? 'es_CO' : 'en_US', title, description },
  }
}

export function resolveExerciseForRoute(locale: TutorLocale, languageParam: string, levelParam: string, slug: string) {
  const { language, level } = resolveRoute(locale, languageParam, levelParam)
  const exercise = findReadingExercise(locale, language, level, slug)
  if (!exercise) notFound()
  return exercise
}

export function resolveHubForRoute(locale: TutorLocale, languageParam: string, levelParam: string) {
  const { language, level } = resolveRoute(locale, languageParam, levelParam)
  const exercises = findReadingHubExercises(locale, language, level)
  if (!exercises.length) notFound()
  return { language, level, exercises }
}

export function ExercisePage({ exercise, locale }: { exercise: ReadingExercise; locale: TutorLocale }) {
  const otherLocale: TutorLocale = locale === 'es' ? 'en' : 'es'
  const alternateHref = readingExercisePath(otherLocale, exercise.language, exercise.level.cefr, exercise.slug)
  return (
    <ReadingLocaleShell locale={locale} alternateHref={alternateHref}>
      <ReadingStructuredData exercise={exercise} locale={locale} />
      <ReadingLesson exercise={exercise} locale={locale} />
    </ReadingLocaleShell>
  )
}

export function HubPage({ locale, language, level, exercises }: { locale: TutorLocale; language: ReadingLanguage; level: CefrLevel; exercises: ReadingExercise[] }) {
  const otherLocale: TutorLocale = locale === 'es' ? 'en' : 'es'
  return (
    <ReadingLocaleShell locale={locale} alternateHref={readingHubPath(otherLocale, language, level)}>
      <ReadingHub locale={locale} language={language} level={level} exercises={exercises} />
    </ReadingLocaleShell>
  )
}
