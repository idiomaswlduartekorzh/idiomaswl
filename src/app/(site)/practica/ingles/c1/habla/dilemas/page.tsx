import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../speaking.module.css'

export const metadata: Metadata = {
  title: 'Speaking Dilemmas C1 — What should count as merit? | WeLearn',
  description: 'Weigh academic performance against final-semester placement performance with C1 vocabulary, short examples and three model answers.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c1/habla/dilemas' },
}

const vocabulary = [
  {
    title: 'Nouns',
    terms: [
      ['rigour', 'care and precision in how work is done', 'The study shows methodological rigour.'],
      ['track record', 'evidence of past performance', 'The team has a track record of delivering results.'],
      ['proxy', 'an indirect measure of something', 'Attendance is one proxy for access to care.'],
      ['accountability', 'being answerable for decisions and results', 'Clear reporting improves accountability.'],
    ],
  },
  {
    title: 'Phrasal verbs',
    terms: [
      ['bear out a claim', 'show that a claim is true', 'The follow-up data bear out her claim.'],
      ['follow through on a plan', 'carry a plan to completion', 'The team followed through on its plan.'],
      ['hold up under scrutiny', 'remain convincing when examined closely', 'The results held up under scrutiny.'],
      ['build on a finding', 'use a finding as a basis for further work', 'Two clinics built on that finding.'],
    ],
  },
  {
    title: 'Adjectives',
    terms: [
      ['substantiated', 'supported by evidence', 'The claim was substantiated by the audit.'],
      ['replicable', 'able to be repeated with similar results', 'Are these results replicable in larger clinics?'],
      ['transferable', 'useful in a different setting', 'That approach is transferable to other settings.'],
      ['contingent on', 'dependent on a particular condition', 'The rollout is contingent on funding.'],
    ],
  },
  {
    title: 'Connectors',
    terms: [
      ['Granted, …', 'acknowledge a valid opposing point', 'Granted, the pilot reached only two clinics.'],
      ['Even so, …', 'keep your point despite that concession', 'Even so, the improvement is worth noting.'],
      ['Insofar as …', 'limit a claim to the extent it is true', 'Insofar as the clinics are comparable, the findings are relevant.'],
      ['All things considered, …', 'give your verdict after weighing both sides', 'All things considered, I’d back the clinic pilot.'],
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
            Two final-year public health students are up for the same university award.
            When choosing the winner, which should carry more weight: academic performance
            throughout their studies or performance during their final-semester placements?
          </p>
        </header>

        <fieldset className={styles.choices}>
          <legend>Choose your position</legend>
          <div className={`${styles.grid} ${styles.options}`}>
            <label className={styles.option}>
              <input type="radio" name="position" value="academic" />
              <span>
                <strong>A. Academic performance</strong>
                <span>One student excelled throughout the degree and published a peer-reviewed study on missed appointments. Clinics have yet to act on the findings.</span>
              </span>
            </label>
            <label className={styles.option}>
              <input type="radio" name="position" value="professional" />
              <span>
                <strong>B. Final-semester placement</strong>
                <span>In their final semester, the other student led a pilot during a supervised placement. It reduced missed appointments at two clinics. It’s unclear whether the results would hold elsewhere.</span>
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
                  {terms.map(([term, definition, example]) => (
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

        <details className={styles.model}>
          <summary>Reveal model answer · Option A</summary>
          <p>
            I&rsquo;d give the award to the student with the stronger academic record. They performed well
            throughout the degree, and other teams can <strong>build on the findings</strong> of their study.
            If the method is transparent and the results are
            <strong> replicable</strong>, the study could influence practice well beyond those two clinics.
          </p>
          <p>
            <strong>Granted</strong>, the other student has a <strong>track record</strong> of delivering
            tangible results during their placement. Fewer missed appointments mean fewer delays in care. <strong>Even so</strong>,
            I&rsquo;d want to know whether the improvement would <strong>hold up</strong> in clinics with fewer
            staff and a different patient population.
          </p>
          <p>
            <strong>All things considered</strong>, I&rsquo;d give more weight to methodological <strong>rigour</strong> this
            year. If independent clinics could confirm similar gains from the pilot, I might vote differently.
          </p>
        </details>

        <details className={styles.model}>
          <summary>Reveal model answer · Option B</summary>
          <p>
            I&rsquo;d give the award to the student who led the clinic pilot. For me, a placement shows whether
            someone can <strong>follow through on a plan</strong> when other people depend on them. There&rsquo;s
            real <strong>accountability</strong> there because the clinics can check their appointment records
            and see whether the pilot made a difference.
          </p>
          <p>
            <strong>Granted</strong>, the other student&rsquo;s academic <strong>track record</strong> and the
            <strong> rigour</strong> of their research deserve credit. <strong>Even so</strong>, fewer patients
            missed appointments at two clinics. That&rsquo;s the kind of result I&rsquo;d want the award to recognise.
          </p>
          <p>
            <strong>All things considered</strong>, I&rsquo;d choose option B. I&rsquo;d still want to know whether
            those gains <strong>hold up</strong> over time and whether the approach is <strong>transferable</strong> to
            clinics with fewer resources.
          </p>
        </details>

        <details className={styles.model}>
          <summary>Reveal model answer · Conditional position</summary>
          <p>
            I&rsquo;d make my decision <strong>contingent on</strong> the quality of the evidence. I&rsquo;d lean
            towards A if the academic <strong>track record</strong> shows consistent performance and an independent
            team can reproduce the study&rsquo;s results. That would give other researchers something to <strong>build on</strong>.
          </p>
          <p>
            <strong>Granted</strong>, the pilot reached only two clinics. I&rsquo;d lean towards B if the
            appointment records <strong>bear out the claim</strong>, the improvement <strong>holds up</strong> after
            the pilot ends, and it&rsquo;s clear what the student contributed.
          </p>
          <p>
            <strong>All things considered</strong>, if both cases are equally well <strong>substantiated</strong>,
            I&rsquo;d give B a slight edge because patients have already benefited. The first thing I&rsquo;d ask
            for is follow-up data from both clinics.
          </p>
        </details>
      </div>
    </div>
  )
}
