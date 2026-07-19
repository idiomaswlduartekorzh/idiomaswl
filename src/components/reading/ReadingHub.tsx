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
        <section className={styles.cardGrid} aria-label={copy.title}>
          {exercises.map((exercise, index) => (
            <article className={styles.readingCard} key={exercise.id}>
              <div className={styles.cardTopline}>
                <span className={styles.levelPill}>{exercise.level.cefr}</span>
                {exercise.status !== 'published' && <span className={styles.previewPill}>{copy.preview}</span>}
              </div>
              <p className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</p>
              <h2>{localized(exercise.content.title, locale)}</h2>
              <p>{localized(exercise.content.intro, locale)}</p>
              <div className={styles.cardMeta}>
                <span><Clock3 size={15} /> {exercise.content.estimatedMinutes} min</span>
                <span><Sparkles size={15} /> {exercise.content.wordCount} {copy.words}</span>
              </div>
              <Link
                className={styles.primaryLink}
                href={readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug)}
              >
                {copy.start} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}><BookOpenText size={28} /><p>{copy.empty}</p></div>
      )}
    </div>
  )
}

