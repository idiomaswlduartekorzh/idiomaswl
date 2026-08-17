import type { CefrLevel, ReadingExercise, TutorLocale } from './types'

const PUBLISHABLE_STATUSES = new Set(['published'])
const REVIEW_PLACEHOLDER = /(pending|pendiente|replace|por asignar)/i
const WORD_LIMITS: Record<CefrLevel, [number, number]> = {
  A0: [15, 60], A1: [40, 140], A2: [120, 240], B1: [220, 450], B2: [400, 700], C1: [650, 1100],
}

export function localized(value: Partial<Record<TutorLocale, string>>, locale: TutorLocale) {
  return value[locale] ?? value.es ?? value.en ?? ''
}

export function validateReadingExercise(candidate: unknown): asserts candidate is ReadingExercise {
  if (!candidate || typeof candidate !== 'object') throw new Error('Reading exercise must be an object')
  const exercise = candidate as ReadingExercise
  const errors: string[] = []

  if (!['1.0.0', '1.1.0'].includes(exercise.schemaVersion)) errors.push('schemaVersion must be 1.0.0 or 1.1.0')
  if (!/^[a-z0-9][a-z0-9-]{5,80}$/.test(exercise.id ?? '')) errors.push('id has an invalid format')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exercise.slug ?? '')) errors.push('slug has an invalid format')
  if (!exercise.tutorLocales?.length) errors.push('at least one tutor locale is required')
  if (!exercise.content?.targetText) errors.push('targetText is required')
  if (!exercise.questions?.length || exercise.questions.length < 3) errors.push('at least three questions are required')
  if (!exercise.review?.copyrightChecked || !exercise.review?.cultureChecked) errors.push('copyright and culture checks must pass')

  const limits = WORD_LIMITS[exercise.level?.cefr]
  if (!limits) errors.push('CEFR level is invalid')
  else if (exercise.content.wordCount < limits[0] || exercise.content.wordCount > limits[1]) {
    errors.push(`${exercise.level.cefr} wordCount must be between ${limits[0]} and ${limits[1]}`)
  }

  if (exercise.leveling?.metrics?.outOfLevelVocabularyPercent > exercise.leveling?.maxOutOfLevelVocabularyPercent) {
    errors.push('out-of-level vocabulary exceeds the configured limit')
  }
  if (!exercise.leveling?.independentAssessment?.passed) errors.push('independent level assessment must pass')
  if (exercise.leveling?.independentAssessment?.estimatedLevel !== exercise.level?.cefr) errors.push('independent level assessment must match the declared CEFR level')
  if (exercise.language === 'ja' && (!exercise.level.jlpt || !exercise.level.mappingDisclaimer)) errors.push('Japanese exercises require JLPT and a mapping disclaimer')
  if (exercise.language === 'ko' && (!exercise.level.topik || !exercise.level.mappingDisclaimer)) errors.push('Korean exercises require TOPIK and a mapping disclaimer')
  if (exercise.language === 'ko' && exercise.scriptSupport?.tokenizationMode !== 'custom') errors.push('Korean exercises require phrase-aware custom tokenization')
  if (exercise.language === 'pt' && exercise.variant !== 'pt-BR') errors.push('Portuguese exercises must use pt-BR')

  if (PUBLISHABLE_STATUSES.has(exercise.status)) {
    const reviewers = [exercise.review.author, exercise.review.languageReviewer, exercise.review.pedagogyReviewer]
    if (reviewers.some((reviewer) => !reviewer || REVIEW_PLACEHOLDER.test(reviewer))) errors.push('published exercises require identified human reviewers')
    if (exercise.review.languageDecision !== 'approved' || exercise.review.pedagogyDecision !== 'approved') errors.push('published exercises require approved language and pedagogy decisions')
    if (!exercise.seo.indexable) errors.push('published exercises must be indexable')
  }

  for (const locale of exercise.tutorLocales ?? []) {
    if (!localized(exercise.content.title, locale)) errors.push(`content.title is missing for ${locale}`)
    if (!localized(exercise.seo.title, locale)) errors.push(`seo.title is missing for ${locale}`)
  }

  for (const item of exercise.content?.vocabulary ?? []) {
    if (!exercise.content.targetText.normalize('NFKC').includes(item.surface.normalize('NFKC'))) errors.push(`vocabulary surface is absent from target text: ${item.surface}`)
    if (exercise.language === 'ko' && !item.reading) errors.push(`Korean vocabulary requires an optional-support reading: ${item.surface}`)
  }

  if (errors.length) throw new Error(`${exercise.id || 'unknown exercise'}: ${errors.join('; ')}`)
}
