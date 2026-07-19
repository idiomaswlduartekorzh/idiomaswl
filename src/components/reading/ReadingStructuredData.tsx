import { LANGUAGE_NAMES, readingExercisePath, readingHubPath } from '@/lib/reading/routes'
import { localized } from '@/lib/reading/validate'
import type { ReadingExercise, TutorLocale } from '@/lib/reading/types'

const BASE = 'https://www.idiomaswl.com'

export function ReadingStructuredData({ exercise, locale }: { exercise: ReadingExercise; locale: TutorLocale }) {
  const url = `${BASE}${readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug)}`
  const hubUrl = `${BASE}${readingHubPath(locale, exercise.language, exercise.level.cefr)}`
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': `${url}#learning-resource`,
        url,
        name: localized(exercise.content.title, locale),
        description: localized(exercise.content.intro, locale),
        inLanguage: exercise.variant,
        educationalLevel: exercise.level.cefr,
        learningResourceType: 'Reading comprehension exercise',
        timeRequired: `PT${exercise.content.estimatedMinutes}M`,
        author: { '@type': 'Organization', name: 'Idiomas WeLearn' },
        isAccessibleForFree: true,
      },
      {
        '@type': 'Quiz',
        '@id': `${url}#quiz`,
        name: localized(exercise.content.title, locale),
        about: LANGUAGE_NAMES[locale][exercise.language],
        hasPart: exercise.questions.map((question) => ({
          '@type': 'Question',
          name: question.prompt,
          eduQuestionType: question.type,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale === 'es' ? 'Práctica' : 'Practice', item: `${BASE}/practica` },
          { '@type': 'ListItem', position: 2, name: `${LANGUAGE_NAMES[locale][exercise.language]} ${exercise.level.cefr}`, item: hubUrl },
          { '@type': 'ListItem', position: 3, name: localized(exercise.content.title, locale), item: url },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
}

