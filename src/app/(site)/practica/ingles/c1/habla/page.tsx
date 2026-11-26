import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './speaking.module.css'

const base = '/practica/ingles/c1/habla'

export const metadata: Metadata = {
  title: 'Speaking C1 | WeLearn',
  description: 'Practise English C1 with 20 improvisation challenges and a dilemma with advanced vocabulary and a model answer.',
  alternates: { canonical: `https://www.idiomaswl.com${base}` },
}

const exercises = [
  {
    title: 'Improvisation',
    description: 'Pick one of 20 questions and work six surprise words into your answer.',
    href: `${base}/solo`,
  },
  {
    title: 'Speaking Dilemmas',
    description: 'Defend a position, try four sets of advanced expressions and compare your answer with a model.',
    href: `${base}/dilemas`,
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
