import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Headphones, LockKeyhole, Radio, Waves } from 'lucide-react';

import { BreadcrumbJsonLd, JsonLd } from '@/components/exam-practice/StructuredData';
import styles from './ListeningHub.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening';
const IELTS_FORMAT_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';

export const metadata: Metadata = {
  title: 'IELTS Listening Practice: Parts 1–4 with Audio',
  description:
    'Learn the four IELTS Listening parts, then practise Part 1 with original WeLearn audio, 10 questions and server-scored feedback.',
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
  {
    number: '01',
    title: 'Everyday conversation',
    detail: 'Two speakers handle a practical social situation such as a booking or enquiry.',
    status: 'Audited pilot',
    href: '/practica/ielts/listening/part-1',
  },
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
          teaches: ['IELTS Listening format', 'listening for detail', 'answer prediction'],
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
              <div><dt>First practice</dt><dd>Part 1 pilot</dd></div>
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
            <p>Format facts are checked against the <a href={IELTS_FORMAT_URL} target="_blank" rel="noopener noreferrer" aria-label="official IELTS Listening format (opens in a new tab)">official IELTS Listening format</a>. Practice scripts and questions are independently created by Idiomas WeLearn; every audio asset must also carry a documented publication licence. IELTS is a protected trademark; this resource is not affiliated with or endorsed by its owners.</p>
          </aside>
        </div>
      </div>
    </>
  );
}
