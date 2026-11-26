import type { Metadata } from 'next'
import Link from 'next/link'
import { dilemmaCollectionPath, englishSpeakingPath, type EnglishDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'
import styles from './speaking.module.css'

export function englishSpeakingMetadata(level: EnglishDilemmaLevel): Metadata {
  return {
    title: `Speaking ${level.toUpperCase()} | WeLearn`,
    description: `Practise English ${level.toUpperCase()} with 20 improvisation challenges and 20 dilemmas with vocabulary and three model answers each.`,
    alternates: { canonical: `https://www.idiomaswl.com${englishSpeakingPath(level)}` },
  }
}

export default function EnglishSpeakingHub({ level }: { level: EnglishDilemmaLevel }) {
  const label = level.toUpperCase()
  const exercises = [
    {
      title: 'Improvisation',
      description: 'Pick one of 20 questions and work six surprise words into your answer.',
      href: `${englishSpeakingPath(level)}/solo`,
    },
    {
      title: 'Speaking Dilemmas',
      description: 'Choose from 20 dilemmas. Prepare your answer with four vocabulary cards and compare it with three models.',
      href: dilemmaCollectionPath(level),
    },
  ]

  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={`/practica/ingles/${level}`}>English {label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Speaking</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>Speaking {label}</h1>
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
