const WORD_LIMITS = {
  A0: [15, 60], A1: [40, 140], A2: [120, 240], B1: [220, 450], B2: [400, 700], C1: [650, 1100],
}

const PLACEHOLDER_REVIEWER = /(pending|pendiente|replace|por asignar)/i

export function validateReadingExercise(exercise) {
  const errors = []
  if (!exercise || typeof exercise !== 'object') return ['exercise must be an object']
  if (exercise.schemaVersion !== '1.0.0') errors.push('schemaVersion must be 1.0.0')
  if (!/^[a-z0-9][a-z0-9-]{5,80}$/.test(exercise.id ?? '')) errors.push('id has an invalid format')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exercise.slug ?? '')) errors.push('slug has an invalid format')
  if (!Array.isArray(exercise.tutorLocales) || exercise.tutorLocales.length === 0) errors.push('at least one tutor locale is required')
  if (!Array.isArray(exercise.questions) || exercise.questions.length < 3) errors.push('at least three questions are required')
  if (!exercise.review?.copyrightChecked || !exercise.review?.cultureChecked) errors.push('copyright and culture checks must pass')

  const limits = WORD_LIMITS[exercise.level?.cefr]
  if (!limits) errors.push('CEFR level is invalid')
  else if (exercise.content?.wordCount < limits[0] || exercise.content?.wordCount > limits[1]) {
    errors.push(`${exercise.level.cefr} wordCount must be between ${limits[0]} and ${limits[1]}`)
  }

  if (exercise.leveling?.metrics?.outOfLevelVocabularyPercent > exercise.leveling?.maxOutOfLevelVocabularyPercent) errors.push('out-of-level vocabulary exceeds the configured limit')
  if (!exercise.leveling?.independentAssessment?.passed) errors.push('independent level assessment must pass')
  if (exercise.leveling?.independentAssessment?.estimatedLevel !== exercise.level?.cefr) errors.push('independent level assessment must match the declared CEFR level')
  if (exercise.language === 'ja' && (!exercise.level?.jlpt || !exercise.level?.mappingDisclaimer)) errors.push('Japanese exercises require JLPT and a mapping disclaimer')
  if (exercise.language === 'ko' && (!exercise.level?.topik || !exercise.level?.mappingDisclaimer)) errors.push('Korean exercises require TOPIK and a mapping disclaimer')
  if (exercise.language === 'ko' && exercise.scriptSupport?.tokenizationMode !== 'custom') errors.push('Korean exercises require phrase-aware custom tokenization')
  if (exercise.language === 'pt' && exercise.variant !== 'pt-BR') errors.push('Portuguese exercises must use pt-BR')

  for (const locale of exercise.tutorLocales ?? []) {
    if (!exercise.content?.title?.[locale]) errors.push(`content.title is missing for ${locale}`)
    if (!exercise.seo?.title?.[locale]) errors.push(`seo.title is missing for ${locale}`)
  }

  for (const item of exercise.content?.vocabulary ?? []) {
    if (!exercise.content?.targetText?.normalize('NFKC').includes(item.surface.normalize('NFKC'))) errors.push(`vocabulary surface is absent from target text: ${item.surface}`)
    if (exercise.language === 'ko' && !item.reading) errors.push(`Korean vocabulary requires an optional-support reading: ${item.surface}`)
  }

  if (exercise.status === 'published') {
    const reviewers = [exercise.review?.author, exercise.review?.languageReviewer, exercise.review?.pedagogyReviewer]
    if (reviewers.some((reviewer) => !reviewer || PLACEHOLDER_REVIEWER.test(reviewer))) errors.push('published exercises require identified human reviewers')
    if (!exercise.seo?.indexable) errors.push('published exercises must be indexable')
  }

  const questionIds = new Set()
  for (const question of exercise.questions ?? []) {
    if (questionIds.has(question.id)) errors.push(`duplicate question id: ${question.id}`)
    questionIds.add(question.id)
    const optionIds = new Set(question.options?.map((option) => option.id) ?? [])
    if (typeof question.answer === 'string' && question.options?.length && !optionIds.has(question.answer)) errors.push(`${question.id} answer does not match an option`)
    if (Array.isArray(question.answer) && question.answer.some((answer) => !optionIds.has(answer))) errors.push(`${question.id} ordering answer does not match its options`)
  }

  return errors
}
