import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, LockKeyhole } from 'lucide-react'
import { ADVANCED_CYCLE, ADVANCED_TOPICS } from '@/data/practica/advanced-topics'
import { CourseSchema } from '@/components/practica/EducationSchema'
import styles from './AdvancedIdeas.module.css'

export const metadata: Metadata = {
  title: 'Advanced ideas in English B2–C1 | Integrated practice',
  description:
    'Practise advanced English through integrated discussion, long-form reading, vocabulary, evidence questions, dual listening and original production.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ideas-avanzadas' },
  openGraph: {
    title: 'Advanced ideas — English B2–C1',
    description: 'One complex idea. Multiple forms of evidence. A cycle that returns to its opening claim.',
    url: 'https://www.idiomaswl.com/practica/ideas-avanzadas',
  },
}

const CATEGORY_NUMBER = {
  Biases: 'I',
  'Social life': 'II',
  Character: 'III',
} as const

export default function AdvancedIdeasPage() {
  const publishedCount = ADVANCED_TOPICS.filter((topic) => topic.status !== 'planned').length

  return (
    <main className={`wlp-page ${styles.page}`}>
      <CourseSchema
        name="Advanced ideas in English"
        description="Integrated B2–C1 cycles of discussion, reading, vocabulary, evidence practice, listening and production."
        url="https://www.idiomaswl.com/practica/ideas-avanzadas"
        educationalLevel="B2–C1"
        teaches="Critical reading, nuanced vocabulary, listening and argumentation in English"
        inLanguage="en"
      />

      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/practica">Practice</Link>
          <span aria-hidden="true">/</span>
          <span>Advanced ideas</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className="wlp-eyebrow">English B2–C1 · thought and language</p>
            <h1>Ideas that refuse a quick answer.</h1>
            <p className={styles.lead}>
              You do not memorise a position here. Discussion opens the problem; long-form reading
              complicates it, evidence tests it and two listening sources make you locate a real disagreement.
            </p>
            <div className={styles.heroMeta} aria-label="Course features">
              <span>{publishedCount} learning cycles</span>
              <span>Long-form C1 input</span>
              <span>New guided pilot · 8 phases</span>
            </div>
            <Link className="wlp-btn wlp-btn--primary" href="/practica/ideas-avanzadas/dunning-kruger-sin-la-curva">
              Start the recommended pilot <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.orbit} aria-label="Six-move learning cycle">
            <svg className={styles.orbitLine} viewBox="0 0 420 420" role="img" aria-hidden="true">
              <circle cx="210" cy="210" r="150" />
              <path d="M 343 139 l 16 3 -8 14" />
            </svg>
            <div className={styles.orbitCore}>
              <span>One idea</span>
              <strong>6 lenses</strong>
              <small>returns changed</small>
            </div>
            {ADVANCED_CYCLE.map((stage, index) => (
              <div className={styles.orbitStep} data-step={index + 1} key={stage.id}>
                <span>{index + 1}</span>
                <strong>{stage.label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-heading">
          <div className={styles.sectionHeading}>
            <p className="wlp-eyebrow">Pedagogical return</p>
            <h2 id="method-heading">The ending tests what changed in your first explanation.</h2>
            <p>
              Each phase leaves evidence that the next phase needs. Final production is not an isolated
              task: it answers the opening claim again with stronger distinctions and more precise language.
            </p>
          </div>
          <ol className={styles.cycleList}>
            {ADVANCED_CYCLE.map((stage, index) => (
              <li key={stage.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{stage.label}</strong>
                  <p>{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.catalog} aria-labelledby="catalog-heading">
          <div className={styles.sectionHeading}>
            <p className="wlp-eyebrow">Growing library</p>
            <h2 id="catalog-heading">Topics for thinking in more exact English.</h2>
            <p>
              Social topics remain open to evidence and objections. A label never substitutes for an explanation.
            </p>
          </div>

          <div className={styles.topicGrid}>
            {ADVANCED_TOPICS.map((topic) => {
              const content = (
                <>
                  <div className={styles.topicTop}>
                    <span className={styles.category}>
                      {CATEGORY_NUMBER[topic.category]} · {topic.category}
                    </span>
                    <span className={topic.status === 'available' ? styles.available : topic.status === 'pilot' ? styles.pilot : styles.planned}>
                      {topic.status === 'planned' ? <LockKeyhole size={13} /> : <Check size={13} />}
                      {topic.status === 'available' ? 'Available' : topic.status === 'pilot' ? 'Recommended pilot' : 'In development'}
                    </span>
                  </div>
                  <h3>{topic.title}</h3>
                  <p className={styles.topicEn}>{topic.titleEn}</p>
                  <p className={styles.premise}>{topic.premise}</p>
                  {topic.caution && <p className={styles.caution}>{topic.caution}</p>}
                  <div className={styles.topicFooter}>
                    <span>{topic.level}</span>
                    <span>{topic.minutes} min</span>
                    <strong>{topic.status === 'available' ? 'Open cycle →' : topic.status === 'pilot' ? 'Enter pilot →' : 'Coming soon'}</strong>
                  </div>
                </>
              )

              return topic.status !== 'planned' ? (
                <Link className={styles.topicCard} href={`/practica/ideas-avanzadas/${topic.slug}`} key={topic.slug}>
                  {content}
                </Link>
              ) : (
                <article className={`${styles.topicCard} ${styles.topicCardPlanned}`} key={topic.slug}>
                  {content}
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
