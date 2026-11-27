import Link from 'next/link'
import { LANGUAGE_NAMES, type ImprovisaLanguage, type ImprovisaLevel } from '@/data/practica/improvisa/config'
import { dilemmaCollectionPath, speakingHubPath } from '@/lib/practica/speaking-dilemma-routes'
import { WORD_CARDS, type SpeakingDilemma } from '@/data/practica/speaking-dilemmas/types'
import { DILEMMA_COPY } from './copy'
import styles from './speaking.module.css'

function highlightedVocabulary(paragraph: string) {
  return paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, index) => (
    index % 2 === 0 ? part : <strong key={index}>{part.slice(2, -2)}</strong>
  ))
}

export default function DilemmaExercise({ level, dilemma, language = 'ingles' }: { level: ImprovisaLevel; dilemma: SpeakingDilemma; language?: ImprovisaLanguage }) {
  const beginner = level === 'a1' || level === 'a2'
  const copy = DILEMMA_COPY[language]
  const middle = beginner ? copy.beginnerMiddle : copy.middle
  const modelTitles = { a: copy.options[0], b: copy.options[1], conditional: middle }
  const [optionA, optionB] = dilemma.options
  const options = [
    { value: 'a', label: `A. ${optionA.label}`, description: optionA.description },
    { value: 'b', label: `B. ${optionB.label}`, description: optionB.description },
    { value: 'conditional', label: !beginner && language === 'ingles' ? 'A conditional position' : middle, description: dilemma.conditionalPrompt },
  ]

  return (
    <div className="wlp-page" lang={LANGUAGE_NAMES[language].code}>
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label={copy.speaking}>
          <Link href={speakingHubPath(level, language)}>{copy.speaking} {level.toUpperCase()}</Link>
          <span aria-hidden="true">/</span>
          <Link href={dilemmaCollectionPath(level, language)}>{copy.all}</Link>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <h1>{dilemma.title}</h1>
          <p className="wlp-hero-lead">{dilemma.prompt}</p>
        </header>

        <fieldset className={styles.choices}>
          <legend>{copy.position}</legend>
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
          <h2 id="word-bank">{copy.preparation}</h2>
          <p>{copy.instructions[level]}</p>
          <div className={`${styles.grid} ${styles.vocabulary}`}>
            {WORD_CARDS.map(([category]) => (
              <div key={category} className={styles.wordCard}>
                <h3>{copy.cards[category]}</h3>
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

        {(['a', 'b', 'conditional'] as const).map((key) => (
          <details key={key} className={styles.model}>
            <summary>{copy.reveal} · {modelTitles[key]}</summary>
            {dilemma.models[key].map((paragraph) => <p key={paragraph}>{highlightedVocabulary(paragraph)}</p>)}
          </details>
        ))}
      </div>
    </div>
  )
}
