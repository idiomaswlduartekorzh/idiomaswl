import Link from 'next/link'
import type { SpeakingDilemma } from '@/data/practica/speaking-dilemmas/types'
import { dilemmaPath, englishSpeakingPath, type EnglishDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'
import styles from './speaking.module.css'

export default function DilemmaCollection({ level, dilemmas }: { level: EnglishDilemmaLevel; dilemmas: readonly SpeakingDilemma[] }) {
  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={englishSpeakingPath(level)}>Speaking {level.toUpperCase()}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Dilemmas</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>Speaking Dilemmas</h1>
          <p className="wlp-hero-lead">Choose from {dilemmas.length} topics. Give your answer, then compare it with three models.</p>
        </header>
        <ul className={`${styles.grid} ${styles.exerciseGrid} ${styles.catalogGrid}`}>
          {dilemmas.map(({ slug, title, options: [a, b] }) => (
            <li key={slug}>
              <Link className={`wlp-card wlp-card--path ${styles.exercise}`} href={dilemmaPath(level, slug)}>
                <h2>{title}<span aria-hidden="true">↗</span></h2>
                <p>{a.label} · {b.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
