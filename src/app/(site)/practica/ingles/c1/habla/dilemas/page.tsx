import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../speaking.module.css'

export const metadata: Metadata = {
  title: 'Speaking Dilemmas C1 — What should count as merit? | WeLearn',
  description: 'Debate academic achievement and professional impact in English with a C1 vocabulary toolkit and a model answer.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c1/habla/dilemas' },
}

const vocabulary = [
  {
    title: 'Nouns',
    terms: [
      ['rigour', 'care and precision in how work is done'],
      ['track record', 'evidence of past performance'],
      ['proxy', 'an indirect measure of something'],
      ['accountability', 'being answerable for decisions and results'],
    ],
  },
  {
    title: 'Phrasal verbs',
    terms: [
      ['bear out a claim', 'show that a claim is true'],
      ['follow through on a plan', 'carry a plan to completion'],
      ['hold up under scrutiny', 'remain convincing when examined closely'],
      ['build on a finding', 'use a finding as a basis for further work'],
    ],
  },
  {
    title: 'Adjectives',
    terms: [
      ['substantiated', 'supported by evidence'],
      ['replicable', 'able to be repeated with similar results'],
      ['transferable', 'useful in a different setting'],
      ['contingent on', 'dependent on a particular condition'],
    ],
  },
  {
    title: 'Connectors',
    terms: [
      ['Granted, …', 'acknowledge a valid opposing point'],
      ['Even so, …', 'keep your point despite that concession'],
      ['Insofar as …', 'limit a claim to the extent it is true'],
      ['All things considered, …', 'give your verdict after weighing both sides'],
    ],
  },
]

export default function SpeakingDilemmaPage() {
  return (
    <div className="wlp-page" lang="en">
      <div className={`wlp-shell ${styles.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/practica/ingles/c1/habla">Speaking C1</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Dilemmas</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <h1>What should count as merit?</h1>
          <p className="wlp-hero-lead">
            Your university can name only one of two public health graduates Graduate of the Year.
            What should carry more weight: academic achievement or professional impact?
          </p>
        </header>

        <fieldset className={styles.choices}>
          <legend>Choose your position</legend>
          <div className={`${styles.grid} ${styles.options}`}>
            <label className={styles.option}>
              <input type="radio" name="position" value="academic" />
              <span>
                <strong>A. Academic achievement</strong>
                <span>One graduate published a peer-reviewed study with a method other teams can test. No clinics have used it yet.</span>
              </span>
            </label>
            <label className={styles.option}>
              <input type="radio" name="position" value="professional" />
              <span>
                <strong>B. Professional impact</strong>
                <span>One graduate led a pilot that cut missed appointments at two clinics. It is unclear whether the results would hold elsewhere.</span>
              </span>
            </label>
            <label className={styles.option}>
              <input type="radio" name="position" value="conditional" />
              <span>
                <strong>A conditional position</strong>
                <span>Weigh both achievements and name the evidence that would tip the decision.</span>
              </span>
            </label>
          </div>
        </fieldset>

        <section className={styles.section} aria-labelledby="word-bank">
          <h2 id="word-bank">Build your answer</h2>
          <p>Pick one expression from each card. Speak for 60–90 seconds: state your position, explain your criterion, concede a point and give your verdict.</p>
          <div className={`${styles.grid} ${styles.vocabulary}`}>
            {vocabulary.map(({ title, terms }) => (
              <div key={title} className={styles.wordCard}>
                <h3>{title}</h3>
                <dl>
                  {terms.map(([term, definition]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <details className={styles.model}>
          <summary>Reveal model answer · Option A</summary>
          <p>
            I&rsquo;d give the award to the researcher. For me, the deciding factor is whether other teams can
            <strong> build on the findings</strong>. If the method is transparent and the results are
            <strong> replicable</strong>, the study could influence practice well beyond those two clinics.
          </p>
          <p>
            <strong>Granted</strong>, the other graduate has a <strong>track record</strong> of delivering
            tangible results. Fewer missed appointments matter to actual patients. <strong>Even so</strong>,
            I&rsquo;d want to know whether the improvement would <strong>hold up</strong> in clinics with fewer
            staff and a different patient population.
          </p>
          <p>
            <strong>All things considered</strong>, I&rsquo;d give more weight to methodological <strong>rigour</strong> this
            year. If independent clinics could confirm similar gains from the pilot, I might vote differently.
          </p>
        </details>
      </div>
    </div>
  )
}
