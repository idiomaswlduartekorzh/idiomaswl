import Link from 'next/link'
import { ArrowRight, BookOpenText, Clock3, Sparkles } from 'lucide-react'
import { LANGUAGE_NAMES, readingExercisePath } from '@/lib/reading/routes'
import { localized } from '@/lib/reading/validate'
import type { CefrLevel, ReadingExercise, ReadingLanguage, TutorLocale } from '@/lib/reading/types'
import styles from './reading.module.css'

const COPY = {
  es: {
    eyebrow: 'Biblioteca por nivel', title: 'Lecturas que sí puedes terminar',
    intro: 'Textos breves con una misión clara, ayudas bajo demanda y feedback que te muestra la evidencia.',
    empty: 'Aún no hay lecturas publicadas en este nivel.', preview: 'Vista editorial', start: 'Empezar lectura', words: 'palabras',
  },
  en: {
    eyebrow: 'Level-based library', title: 'Readings you can actually finish',
    intro: 'Short texts with a clear mission, optional support, and feedback that points to the evidence.',
    empty: 'There are no published readings at this level yet.', preview: 'Editorial preview', start: 'Start reading', words: 'words',
  },
} as const

export function ReadingHub({
  locale,
  language,
  level,
  exercises,
}: {
  locale: TutorLocale
  language: ReadingLanguage
  level: CefrLevel
  exercises: ReadingExercise[]
}) {
  const copy = COPY[locale]
  const languageName = LANGUAGE_NAMES[locale][language]
  return (
    <div className={styles.pageWidth}>
      <nav className={styles.breadcrumbs} aria-label={locale === 'es' ? 'Migas de pan' : 'Breadcrumbs'}>
        <Link href="/practica">{locale === 'es' ? 'Práctica' : 'Practice'}</Link>
        <span aria-hidden="true">/</span>
        <span>{languageName}</span>
        <span aria-hidden="true">/</span>
        <span>{level}</span>
      </nav>

      <section className={styles.hubHero}>
        <div>
          <p className={styles.eyebrow}>{copy.eyebrow} · {languageName} {level}</p>
          <h1>{copy.title}</h1>
          <p className={styles.lead}>{copy.intro}</p>
        </div>
        <div className={styles.heroGlyph} aria-hidden="true"><BookOpenText size={44} /></div>
      </section>

      {exercises.length ? (
        <section className={styles.topicList} aria-label={copy.title}>
          {exercises.map((exercise, index) => (
            <Link
              key={exercise.id}
              className={styles.topicRow}
              href={readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug)}
            >
              <span className={styles.topicNumber}>{index + 1}</span>
              <span className={styles.topicBody}>
                <span className={styles.topicHead}>
                  <span className={styles.topicTitle}>{localized(exercise.content.title, locale)}</span>
                  <span className={styles.topicTag}>{exercise.classification.genre}</span>
                  {exercise.status !== 'published' && <span className={styles.previewPill}>{copy.preview}</span>}
                </span>
                <span className={styles.topicLead}>{localized(exercise.content.intro, locale)}</span>
                <span className={styles.topicMeta}>
                  <span><Clock3 size={13} /> {exercise.content.estimatedMinutes} min</span>
                  <span><Sparkles size={13} /> {exercise.content.wordCount} {copy.words}</span>
                </span>
              </span>
              <ArrowRight className={styles.topicArrow} size={20} aria-hidden="true" />
            </Link>
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}><BookOpenText size={28} /><p>{copy.empty}</p></div>
      )}
    </div>
  )
}

