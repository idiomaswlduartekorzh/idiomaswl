import type { Metadata } from 'next'
import Link from 'next/link'
import { SPEAKING_DILEMMAS } from '@/data/practica/speaking-dilemmas'
import { DILEMMA_COLLECTION_PATH, dilemmaPath, SPEAKING_C1_PATH } from '@/lib/practica/speaking-dilemma-routes'
import styles from '../../speaking.module.css'

export const metadata: Metadata = {
  title: '20 Speaking Dilemmas for English C1 | WeLearn',
  description: 'Choose a C1 speaking dilemma and practise taking a position with four vocabulary cards and three model answers.',
  alternates: { canonical: `https://www.idiomaswl.com${DILEMMA_COLLECTION_PATH}` },
}

export default function SpeakingDilemmaCollection() {
  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={SPEAKING_C1_PATH}>Speaking C1</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Dilemmas</span>
        </nav>
        <header className="wlp-hero wlp-hero--compact">
          <h1>Speaking Dilemmas</h1>
          <p className="wlp-hero-lead">Choose from {SPEAKING_DILEMMAS.length} topics. Take a position, then compare your response with three models.</p>
        </header>
        <ul className={`${styles.grid} ${styles.exerciseGrid} ${styles.catalogGrid}`}>
          {SPEAKING_DILEMMAS.map(({ slug, title, options: [a, b] }) => (
            <li key={slug}>
              <Link className={`wlp-card wlp-card--path ${styles.exercise}`} href={dilemmaPath(slug)}>
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
