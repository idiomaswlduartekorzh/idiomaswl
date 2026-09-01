import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Headphones, LockKeyhole, Radio, Waves } from 'lucide-react';

import { BreadcrumbJsonLd, JsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL,
  IELTS_LISTENING_QUESTION_TYPE_ENTITIES,
} from '@/data/ielts/listening-question-type-entities';
import styles from './ListeningHub.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening';
const IELTS_FORMAT_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';
const IELTS_SCORE_URL = 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail';

export const metadata: Metadata = {
  title: 'IELTS Listening Practice with Audio: Part 1 + Format Guide',
  description:
    'Practise Part 1 with original audio, 10 questions, answers, explanations and transcript after submission, and learn how Parts 2–4 work.',
  keywords: ['IELTS Listening practice', 'IELTS Listening parts', 'IELTS Listening exercises', 'IELTS Listening with audio'],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'IELTS Listening Practice by Part',
    description: 'Understand the four-part format and start an original Part 1 listening practice with audio.',
    type: 'website',
    locale: 'en_US',
    url: URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IELTS Listening Practice by Part',
    description: 'Four-part format, original audio and focused Part 1 practice.',
  },
};

const FAQS = [
  {
    question: 'How many parts and questions are in IELTS Listening?',
    answer: 'There are four parts with 10 questions in each part, for 40 questions in total.',
  },
  {
    question: 'Is Listening the same in Academic and General Training?',
    answer: 'Yes. IELTS Academic and IELTS General Training use the same Listening test format.',
  },
  {
    question: 'Do you hear each recording more than once?',
    answer: 'In the IELTS test, you hear each recording once. Our focused learning session allows replay and labels that difference clearly.',
  },
  {
    question: 'Is this an official IELTS practice test?',
    answer: 'No. Idiomas WeLearn independently creates its scripts, audio and questions. It is not affiliated with or endorsed by IELTS.',
  },
];

interface ListeningPartSummary {
  number: string;
  title: string;
  detail: string;
  status: string;
  href?: string;
}

const PARTS: readonly ListeningPartSummary[] = [
  // ielts-listening-release:welearn-listening-part-1-001:start
  {
    number: '01',
    title: 'Everyday conversation',
    detail: 'Two speakers handle a practical social situation such as a booking or enquiry.',
    status: 'Audited pilot',
    href: '/practica/ielts/listening/part-1',
  },
  // ielts-listening-release:welearn-listening-part-1-001:end
  {
    number: '02',
    title: 'Everyday monologue',
    detail: 'One speaker gives information in a general social context.',
    status: 'Format guide',
  },
  {
    number: '03',
    title: 'Educational conversation',
    detail: 'Two main speakers discuss an educational or training situation.',
    status: 'Format guide',
  },
  {
    number: '04',
    title: 'Academic monologue',
    detail: 'One speaker develops an academic subject in a structured talk.',
    status: 'Format guide',
  },
];

const SCORE_GUIDE = [
  { band: '5', averageCorrect: '16' },
  { band: '6', averageCorrect: '23' },
  { band: '7', averageCorrect: '30' },
  { band: '8', averageCorrect: '35' },
] as const;

export default function IeltsListeningHubPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Listening', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': ['WebPage', 'LearningResource'],
          name: 'IELTS Listening Practice by Part',
          url: URL,
          description: 'A four-part IELTS Listening format guide with focused original WeLearn practice.',
          inLanguage: 'en',
          isAccessibleForFree: true,
          learningResourceType: ['Guide', 'Practice'],
          educationalUse: ['self-study', 'practice'],
          teaches: [
            'IELTS Listening format',
            ...IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((questionType) => questionType.officialName),
            'IELTS Listening scoring',
            'listening for detail',
            'answer prediction',
          ],
          provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
          isPartOf: { '@type': 'Course', name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' },
        }}
      />

      <div className={styles.page} lang="en">
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica">Practice</Link><span aria-hidden="true">/</span>
            <Link href="/practica/ielts">IELTS</Link><span aria-hidden="true">/</span>
            <span aria-current="page">Listening</span>
          </nav>

          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><Radio size={15} aria-hidden="true" /> IELTS Listening · independent practice</p>
              <h1>IELTS Listening Practice by Part</h1>
              <p className={styles.lead}>Learn what changes from Part 1 to Part 4, then train one listening job at a time with original audio and controlled feedback.</p>
              <p className={styles.directAnswer}><strong>Direct answer:</strong> IELTS Listening has four parts with 10 questions in each. Parts 1 and 2 cover everyday social situations; Parts 3 and 4 cover educational and training situations. You hear each recording once, and the questions follow the order of the audio.</p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} href="/practica/ielts/listening/part-1">Practise Listening Part 1 <ArrowRight size={17} aria-hidden="true" /></Link>
                <a className={styles.secondaryAction} href="#four-parts">See the four-part map</a>
              </div>
            </div>

            <aside className={styles.signalPanel} aria-label="IELTS Listening overview">
              <div className={styles.signalTop}><Headphones size={22} aria-hidden="true" /><span>Listening control desk</span></div>
              <div className={styles.waveform} aria-hidden="true">
                {[24, 44, 72, 38, 84, 56, 30, 68, 92, 50, 74, 32, 62, 86, 42, 70].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
              <dl className={styles.signalFacts}>
                <div><dt>Parts</dt><dd>4</dd></div>
                <div><dt>Questions</dt><dd>40</dd></div>
                <div><dt>Playback</dt><dd>Once in the test</dd></div>
                {/* ielts-listening-release:welearn-listening-part-1-001:start */}
                <div><dt>First practice</dt><dd>Part 1 pilot</dd></div>
                {/* ielts-listening-release:welearn-listening-part-1-001:end */}
              </dl>
            </aside>
          </header>

          <section id="four-parts" className={styles.section} aria-labelledby="parts-heading">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Official format map</p>
              <h2 id="parts-heading">Four parts. Four different listening jobs.</h2>
              <p>The context and number of speakers change across the test. We publish a practice route only after its script, audio, questions and scoring pass the release harness.</p>
            </div>
            <div className={styles.partGrid}>
              {PARTS.map((part) => part.href ? (
                <Link className={`${styles.partCard} ${styles.partLive}`} href={part.href} key={part.number}>
                  <span className={styles.partNumber}>{part.number}</span>
                  <div><span className={styles.liveBadge}><Waves size={14} aria-hidden="true" /> {part.status}</span><h3>{part.title}</h3><p>{part.detail}</p><strong>Open Part 1 <ArrowRight size={15} aria-hidden="true" /></strong></div>
                </Link>
              ) : (
                <article className={styles.partCard} key={part.number}>
                  <span className={styles.partNumber}>{part.number}</span>
                  <div><span className={styles.lockedBadge}><LockKeyhole size={13} aria-hidden="true" /> {part.status}</span><h3>{part.title}</h3><p>{part.detail}</p><small>No empty practice page is published.</small></div>
                </article>
              ))}
            </div>
          </section>

          <section id="question-types" className={styles.section} aria-labelledby="question-types-heading">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Official task families</p>
              <h2 id="question-types-heading">Which question types appear in IELTS Listening?</h2>
              <p>IELTS groups Listening tasks into six official families. Use this index to identify the answer shape, the first decision and the most common trap before opening a practice.</p>
            </div>

            <nav className={styles.typeIndex} aria-label="IELTS Listening question types">
              {IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((questionType) => (
                <a href={`#${questionType.id}`} key={questionType.id}>
                  <span>{String(questionType.officialOrder).padStart(2, '0')}</span>
                  {questionType.officialName}
                </a>
              ))}
            </nav>

            <aside className={styles.taxonomyNote}>
              <strong>Why some guides count 9 or 10 types</strong>
              <p>They often split completion into form, note, table, flow-chart and summary tasks, or count plan, map and diagram labels separately. IELTS presents those variants inside six broader families, so this hub keeps one stable taxonomy and names the subformats inside it.</p>
            </aside>

            <div className={styles.typeEntityList}>
              {IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((questionType) => (
                <article className={styles.typeEntity} id={questionType.id} key={questionType.id}>
                  <header className={styles.typeEntityHeader}>
                    <span className={styles.typeNumber}>{String(questionType.officialOrder).padStart(2, '0')}</span>
                    <div>
                      <p className={styles.typeAliases}>{questionType.aliases.join(' · ')}</p>
                      <h3>{questionType.officialName}</h3>
                      <p>{questionType.directDefinition}</p>
                    </div>
                  </header>

                  <dl className={styles.typeDecisionGrid}>
                    <div><dt>Answer shape</dt><dd>{questionType.answerShape}</dd></div>
                    <div><dt>First decision</dt><dd>{questionType.firstDecision}</dd></div>
                    <div><dt>Common trap</dt><dd>{questionType.commonTrap}</dd></div>
                  </dl>

                  <div className={styles.instructionSignals}>
                    <strong>Read the instruction for</strong>
                    <ul>{questionType.instructionSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
                  </div>

                  <details className={styles.workedExample}>
                    <summary>Open an original {questionType.officialName} worked example</summary>
                    <div>
                      <p><strong>Context:</strong> {questionType.workedExample.context}</p>
                      <p><strong>Prompt:</strong> {questionType.workedExample.prompt}</p>
                      <blockquote>{questionType.workedExample.spokenEvidence}</blockquote>
                      <p><strong>Resolution:</strong> {questionType.workedExample.resolution}</p>
                      <p>{questionType.workedExample.rationale}</p>
                    </div>
                  </details>

                  <footer className={styles.typeEntityLinks}>
                    {questionType.availablePracticeHref && (
                      <Link href={questionType.availablePracticeHref}>Practise form and table completion in Part 1 <ArrowRight size={15} aria-hidden="true" /></Link>
                    )}
                    {questionType.sourceUrls.map((sourceUrl) => {
                      const sourceLabel = sourceUrl === IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL
                        ? 'Official map guidance'
                        : 'Official format source';
                      return (
                        <a
                          aria-label={`${sourceLabel} for ${questionType.officialName} (opens in a new tab)`}
                          href={sourceUrl}
                          key={sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sourceLabel}
                        </a>
                      );
                    })}
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section id="scoring" className={styles.section} aria-labelledby="scoring-heading">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Raw score boundary</p>
              <h2 id="scoring-heading">How IELTS Listening scoring works</h2>
              <p>Each correct answer receives one mark. IELTS converts the resulting score out of 40 to a band reported in whole or half bands.</p>
            </div>
            <div className={styles.scoreLayout}>
              <div className={styles.scoreExplanation}>
                <span>Official scoring path</span>
                <p className={styles.scoreFormula}><strong>40 questions</strong><i aria-hidden="true">→</i><strong>raw score /40</strong><i aria-hidden="true">→</i><strong>IELTS band</strong></p>
                <p>The official figures are average reference points. The precise raw mark needed for a band can vary slightly from one test version to another.</p>
              </div>
              <div className={styles.scoreTableWrap}>
                <table className={styles.scoreTable}>
                  <caption>Official average Listening marks at selected band levels</caption>
                  <thead><tr><th scope="col">Band</th><th scope="col">Average correct /40</th></tr></thead>
                  <tbody>{SCORE_GUIDE.map((row) => <tr key={row.band}><th scope="row">{row.band}</th><td>{row.averageCorrect}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <aside className={styles.scoreBoundary}>
              <strong>A 10-question practice is not a band calculator.</strong>
              <p>WeLearn reports Practice 001 as a raw result out of 10. It does not multiply, convert or present that short exercise as an official IELTS band.</p>
            </aside>
          </section>

          <section className={styles.section} aria-labelledby="official-practice-heading">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Know the boundary</p>
              <h2 id="official-practice-heading">Official format vs WeLearn learning mode</h2>
            </div>
            <div className={styles.comparison}>
              <div><span>IELTS test</span><h3>One pass through the recording</h3><ul><li><Check size={16} aria-hidden="true" /> Four parts and 40 questions</li><li><Check size={16} aria-hidden="true" /> Questions follow audio order</li><li><Check size={16} aria-hidden="true" /> A range of English accents</li></ul></div>
              <div><span>WeLearn focused practice</span><h3>Method before pressure</h3><ul><li><Check size={16} aria-hidden="true" /> Original independent audio</li><li><Check size={16} aria-hidden="true" /> Replay allowed and labelled</li><li><Check size={16} aria-hidden="true" /> Raw result, never a predicted band</li></ul></div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="workflow-heading">
            <div className={styles.sectionHeading}><p className={styles.kicker}>Practice loop</p><h2 id="workflow-heading">Preview. Listen. Record. Submit. Repair.</h2></div>
            <ol className={styles.workflow}>
              {[
                ['01', 'Preview', 'Read the task and predict the information type.'],
                ['02', 'Listen', 'Track the conversation in question order.'],
                ['03', 'Record', 'Enter words and numbers inside the stated limit.'],
                ['04', 'Submit', 'The server scores all 10 responses without sending the key first.'],
                ['05', 'Repair', 'Use item-level results to plan the next attempt.'],
              ].map(([number, title, detail]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{detail}</p></div></li>)}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="faq-heading">
            <div className={styles.sectionHeading}><p className={styles.kicker}>Quick answers</p><h2 id="faq-heading">IELTS Listening FAQ</h2></div>
            <div className={styles.faqList}>{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
          </section>

          <aside className={styles.sourceNote} aria-label="Sources and editorial note">
            <strong>Source boundary · reviewed 1 September 2026</strong>
            <p>Format and task-type facts are checked against the <a href={IELTS_FORMAT_URL} target="_blank" rel="noopener noreferrer" aria-label="official IELTS Listening format (opens in a new tab)">official IELTS Listening format</a>. Raw-score reference points and their version caveat come from <a href={IELTS_SCORE_URL} target="_blank" rel="noopener noreferrer" aria-label="official IELTS scoring explanation (opens in a new tab)">IELTS scoring in detail</a>. Practice scripts and questions are independently created by Idiomas WeLearn; every audio asset must also carry a documented publication licence. IELTS is a protected trademark; this resource is not affiliated with or endorsed by its owners.</p>
          </aside>
        </div>
      </div>
    </>
  );
}
