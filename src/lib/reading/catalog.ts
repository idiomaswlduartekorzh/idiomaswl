import cafeMorning from '@/data/reading/exercises/en-a1-my-morning-at-the-cafe.json'
import koreanCafe from '@/data/reading/exercises/ko-a1-cafe-order.json'
import { validateReadingExercise } from './validate'
import type { CefrLevel, ReadingExercise, ReadingLanguage, TutorLocale } from './types'

const RAW_EXERCISES: unknown[] = [cafeMorning, koreanCafe]

export const READING_EXERCISES: ReadingExercise[] = RAW_EXERCISES.map((candidate) => {
  validateReadingExercise(candidate)
  return candidate
})

export function isReadingPreviewEnabled() {
  return process.env.READING_PREVIEW === '1'
}

export function availableExercises(locale: TutorLocale) {
  return READING_EXERCISES.filter((exercise) =>
    exercise.tutorLocales.includes(locale) &&
    (exercise.status === 'published' || isReadingPreviewEnabled())
  )
}

export function findReadingExercise(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel, slug: string) {
  return availableExercises(locale).find((exercise) =>
    exercise.language === language && exercise.level.cefr === level && exercise.slug === slug
  )
}

export function findReadingHubExercises(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel) {
  return availableExercises(locale).filter((exercise) => exercise.language === language && exercise.level.cefr === level)
}

export function publishedReadingExercises() {
  return READING_EXERCISES.filter((exercise) => exercise.status === 'published' && exercise.seo.indexable)
}

