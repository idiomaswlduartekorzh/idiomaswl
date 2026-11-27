import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGUAGE_NAMES, type ImprovisaLanguage, type ImprovisaLevel } from '@/data/practica/improvisa/config'
import { dilemmaCollectionPath, speakingHubPath } from '@/lib/practica/speaking-dilemma-routes'
import { DILEMMA_COPY } from './copy'
import styles from './speaking.module.css'

export function speakingDilemmaHubMetadata(level: ImprovisaLevel, language: ImprovisaLanguage = 'ingles'): Metadata {
  const copy = DILEMMA_COPY[language]
  return {
    title: `${copy.speaking} ${level.toUpperCase()} | WeLearn`,
    description: copy.collectionHint,
    alternates: { canonical: `https://www.idiomaswl.com${speakingHubPath(level, language)}` },
  }
}

export default function SpeakingDilemmaHub({ level, language = 'ingles' }: { level: ImprovisaLevel; language?: ImprovisaLanguage }) {
  const label = level.toUpperCase()
  const copy = DILEMMA_COPY[language]
  const locale = LANGUAGE_NAMES[language]
  const exercises = [
    {
      title: copy.improvisation,
      description: copy.improvisationHint,
      href: `${speakingHubPath(level, language)}/solo`,
    },
    {
      title: copy.collection,
      description: copy.collectionHint,
      href: dilemmaCollectionPath(level, language),
    },
  ]

  return (
    <div className="wlp-page" lang={locale.code}>
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label={copy.speaking}>
          <Link href={`/practica/${language}/${level}`}>{locale.target} {label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.speaking}</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>{copy.speaking} {label}</h1>
          <p className="wlp-hero-lead">{copy.chooseMode}</p>
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
