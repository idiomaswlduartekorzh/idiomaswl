import Link from 'next/link'
import { DILEMMA_COLLECTION_PATH, SPEAKING_C1_PATH } from '@/lib/practica/speaking-dilemma-routes'
import { WORD_CARDS, type SpeakingDilemma } from '@/data/practica/speaking-dilemmas/types'
import styles from '../speaking.module.css'

const positions = [
  ['a', 'Option A'],
  ['b', 'Option B'],
  ['conditional', 'Conditional position'],
] as const

function highlightedVocabulary(paragraph: string) {
  return paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, index) => (
    index % 2 === 0 ? part : <strong key={index}>{part.slice(2, -2)}</strong>
  ))
}

export default function DilemmaExercise({ dilemma }: { dilemma: SpeakingDilemma }) {
  const [optionA, optionB] = dilemma.options
  const options = [
    { value: 'a', label: `A. ${optionA.label}`, description: optionA.description },
    { value: 'b', label: `B. ${optionB.label}`, description: optionB.description },
    { value: 'conditional', label: 'A conditional position', description: dilemma.conditionalPrompt },
  ]

  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={SPEAKING_C1_PATH}>Speaking C1</Link>
          <span aria-hidden="true">/</span>
          <Link href={DILEMMA_COLLECTION_PATH}>All dilemmas</Link>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <h1>{dilemma.title}</h1>
          <p className="wlp-hero-lead">{dilemma.prompt}</p>
        </header>

        <fieldset className={styles.choices}>
          <legend>Choose your position</legend>
          <div className={`${styles.grid} ${styles.options}`}>
            {options.map(({ value, label, description }) => (
              <label key={value} className={styles.option}>
                <input type="radio" name="position" value={value} />
                <span>
                  <strong>{label}</strong>
                  <span>{description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <section className={styles.section} aria-labelledby="word-bank">
          <h2 id="word-bank">Build your answer</h2>
          <p>Pick one expression from each card. Speak for 60–90 seconds: state your position, explain your criterion, concede a point and give your verdict.</p>
          <div className={`${styles.grid} ${styles.vocabulary}`}>
            {WORD_CARDS.map(([category, title]) => (
              <div key={category} className={styles.wordCard}>
                <h3>{title}</h3>
                <dl>
                  {dilemma.vocabulary[category].map(([term, definition, example]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{definition}</dd>
                      <dd className={styles.example}>{example}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {positions.map(([key, label]) => (
          <details key={key} className={styles.model}>
            <summary>Reveal model answer · {label}</summary>
            {dilemma.models[key].map((paragraph) => <p key={paragraph}>{highlightedVocabulary(paragraph)}</p>)}
          </details>
        ))}
      </div>
    </div>
  )
}
