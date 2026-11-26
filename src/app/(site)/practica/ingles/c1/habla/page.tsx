import type { Metadata } from 'next'
import Link from 'next/link'
import { DILEMMA_COLLECTION_PATH, SPEAKING_C1_PATH } from '@/lib/practica/speaking-dilemma-routes'
import styles from './speaking.module.css'

export const metadata: Metadata = {
  title: 'Speaking C1 | WeLearn',
  description: 'Practise English C1 with 20 improvisation challenges and 20 dilemmas with advanced vocabulary and three model answers each.',
  alternates: { canonical: `https://www.idiomaswl.com${SPEAKING_C1_PATH}` },
}

const exercises = [
  {
    title: 'Improvisation',
    description: 'Pick one of 20 questions and work six surprise words into your answer.',
    href: `${SPEAKING_C1_PATH}/solo`,
  },
  {
    title: 'Speaking Dilemmas',
    description: 'Choose from 20 dilemmas. Build an argument with four vocabulary cards and compare it with three model answers.',
    href: DILEMMA_COLLECTION_PATH,
  },
]

export default function SpeakingC1Page() {
  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/practica/ingles/c1">English C1</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Speaking</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>Speaking C1</h1>
          <p className="wlp-hero-lead">Choose a speaking exercise.</p>
        </header>
        <ul className={`${styles.grid} ${styles.exerciseGrid}`}>
          {exercises.map(({ title, description, href }) => (
            <li key={href}>
              <Link className={`wlp-card wlp-card--path ${styles.exercise}`} href={href}>
                <h2>{title}<span aria-hidden="true">↗</span></h2>
                <p>{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
