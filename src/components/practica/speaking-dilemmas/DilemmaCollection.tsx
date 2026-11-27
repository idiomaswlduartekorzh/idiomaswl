import Link from 'next/link'
import { LANGUAGE_NAMES, type ImprovisaLanguage, type ImprovisaLevel } from '@/data/practica/improvisa/config'
import type { SpeakingDilemma } from '@/data/practica/speaking-dilemmas/types'
import { dilemmaPath, speakingHubPath } from '@/lib/practica/speaking-dilemma-routes'
import { DILEMMA_COPY } from './copy'
import styles from './speaking.module.css'

export default function DilemmaCollection({ level, dilemmas, language = 'ingles' }: { level: ImprovisaLevel; dilemmas: readonly SpeakingDilemma[]; language?: ImprovisaLanguage }) {
  const copy = DILEMMA_COPY[language]
  return (
    <div className="wlp-page" lang={LANGUAGE_NAMES[language].code}>
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label={copy.speaking}>
          <Link href={speakingHubPath(level, language)}>{copy.speaking} {level.toUpperCase()}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.collection}</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>{copy.collection}</h1>
          <p className="wlp-hero-lead">{copy.catalogLead}</p>
        </header>
        <ul className={`${styles.grid} ${styles.exerciseGrid} ${styles.catalogGrid}`}>
          {dilemmas.map(({ slug, title, options: [a, b] }) => (
            <li key={slug}>
              <Link className={`wlp-card wlp-card--path ${styles.exercise}`} href={dilemmaPath(level, slug, language)}>
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
