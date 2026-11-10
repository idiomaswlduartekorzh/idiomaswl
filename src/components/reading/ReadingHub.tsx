import Link from 'next/link'
import { ArrowRight, BookOpenCheck, BookOpenText, Clock3, Sparkles } from 'lucide-react'
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

const GENRE_LABELS: Record<TutorLocale, Record<string, string>> = {
  es: { article: 'Artículo', story: 'Relato', dialogue: 'Diálogo', message: 'Mensaje', email: 'Correo', notice: 'Aviso', review: 'Reseña', instructions: 'Instrucciones', exam: 'Examen' },
  en: { article: 'Article', story: 'Story', dialogue: 'Dialogue', message: 'Message', email: 'Email', notice: 'Notice', review: 'Review', instructions: 'Instructions', exam: 'Exam' },
}

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
  const advanced = ['B2', 'C1', 'C2'].includes(level)
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
        {advanced ? (
          <div className={styles.heroLevel} aria-hidden="true">
            <span>{locale === 'es' ? 'NIVEL' : 'LEVEL'}</span>
            <strong>{level}</strong>
          </div>
        ) : <div className={styles.heroGlyph} aria-hidden="true"><BookOpenText size={44} /></div>}
      </section>

      {exercises.length ? (
        <section className={styles.topicList} aria-label={copy.title}>
          {exercises.map((exercise, index) => (
            <Link
              key={exercise.id}
              className={styles.topicRow}
              href={readingExercisePath(locale, exercise.language, exercise.level.cefr, exercise.slug)}
            >
              <span className={styles.topicNumber}>{advanced ? String(index + 1).padStart(2, '0') : index + 1}</span>
              <span className={styles.topicBody}>
                <span className={styles.topicHead}>
                  <span className={styles.topicTitle}>{localized(exercise.content.title, locale)}</span>
                  <span className={styles.topicTag}>{GENRE_LABELS[locale][exercise.classification.genre] ?? exercise.classification.genre}</span>
                  {exercise.status !== 'published' && <span className={styles.previewPill}>{copy.preview}</span>}
                </span>
                <span className={styles.topicLead}>{localized(exercise.content.intro, locale)}</span>
                <span className={styles.topicMeta}>
                  <span><Clock3 size={13} /> {exercise.content.estimatedMinutes} min</span>
                  <span><Sparkles size={13} /> {exercise.content.wordCount} {exercise.language === 'ja' ? 'caracteres' : exercise.language === 'ko' ? 'eojeol' : copy.words}</span>
                  {advanced && <span><BookOpenCheck size={13} /> {exercise.questions.length} {locale === 'es' ? 'preguntas' : 'questions'}</span>}
                </span>
              </span>
              <span className={styles.topicAction}><span>{advanced ? copy.start : ''}</span><ArrowRight className={styles.topicArrow} size={20} aria-hidden="true" /></span>
            </Link>
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}><BookOpenText size={28} /><p>{copy.empty}</p></div>
      )}
    </div>
  )
}

