import Link from 'next/link'
import { dilemmaCollectionPath, englishSpeakingPath, type EnglishDilemmaLevel } from '@/lib/practica/speaking-dilemma-routes'
import { WORD_CARDS, type SpeakingDilemma } from '@/data/practica/speaking-dilemmas/types'
import styles from './speaking.module.css'

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

const INSTRUCTIONS: Record<EnglishDilemmaLevel, string> = {
  a1: 'Say A, B or both. Give one simple reason. Try for 15–25 seconds.',
  a2: 'Choose an option or say when you prefer each one. Give a reason and a short example. Try for 25–40 seconds.',
  b1: 'Choose a position. Give a reason and an example, then say when you might change your mind. Speak for 40–60 seconds.',
  b2: 'Speak for 60–75 seconds. Compare the options, support your choice with an example and address a drawback.',
  c1: 'Speak for 60–90 seconds: state your position, explain your criterion, concede a point and give your verdict.',
  c2: 'Speak for 75–120 seconds. State the principle behind your choice, test it against a strong objection and qualify your conclusion.',
}

export default function DilemmaExercise({ level, dilemma }: { level: EnglishDilemmaLevel; dilemma: SpeakingDilemma }) {
  const beginner = level === 'a1' || level === 'a2'
  const [optionA, optionB] = dilemma.options
  const options = [
    { value: 'a', label: `A. ${optionA.label}`, description: optionA.description },
    { value: 'b', label: `B. ${optionB.label}`, description: optionB.description },
    { value: 'conditional', label: beginner ? 'It depends' : 'A conditional position', description: dilemma.conditionalPrompt },
  ]

  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={englishSpeakingPath(level)}>Speaking {level.toUpperCase()}</Link>
          <span aria-hidden="true">/</span>
          <Link href={dilemmaCollectionPath(level)}>All dilemmas</Link>
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
          <p>{beginner ? 'Try two or three words from the cards.' : 'Pick one expression from each card.'} {INSTRUCTIONS[level]}</p>
          <div className={`${styles.grid} ${styles.vocabulary}`}>
            {WORD_CARDS.map(([category, title]) => (
              <div key={category} className={styles.wordCard}>
                <h3>{title}</h3>
                <dl>
                  {dilemma.vocabulary[category].map(([term, definition, example]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd lang={beginner ? 'es' : undefined}>{definition}</dd>
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
            <summary>Reveal model answer · {beginner && key === 'conditional' ? 'It depends' : label}</summary>
            {dilemma.models[key].map((paragraph) => <p key={paragraph}>{highlightedVocabulary(paragraph)}</p>)}
          </details>
        ))}
      </div>
    </div>
  )
}
