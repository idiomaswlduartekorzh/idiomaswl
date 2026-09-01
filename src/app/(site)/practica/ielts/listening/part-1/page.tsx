import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, FileText, Headphones, ShieldCheck } from 'lucide-react';

import { BreadcrumbJsonLd, JsonLd } from '@/components/exam-practice/StructuredData';
import styles from '../ListeningHub.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening/part-1';
const SESSION_URL = '/practica/ielts/listening/sesion?practice=welearn-listening-part-1-001&part=1';
const IELTS_FORMAT_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';
const PIPER_MODEL_CARD_URL = 'https://huggingface.co/rhasspy/piper-voices/blob/39ab474be869e9181350af6a65e4953eef67aaa0/en/en_GB/vctk/medium/MODEL_CARD';
const CC_BY_URL = 'https://creativecommons.org/licenses/by/4.0/';

export const metadata: Metadata = {
  title: 'IELTS Listening Part 1 Practice: Questions 1–10',
  description:
    'Practise IELTS Listening Part 1 with an original two-person everyday conversation, 10 questions, audio and server-scored feedback.',
  keywords: ['IELTS Listening Part 1 practice', 'IELTS Listening Section 1', 'IELTS Listening questions 1 to 10'],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'IELTS Listening Part 1 Practice: Questions 1–10',
    description: 'Original everyday-conversation audio, 10 completion questions and controlled feedback.',
    type: 'website', locale: 'en_US', url: URL,
  },
  twitter: { card: 'summary_large_image', title: 'IELTS Listening Part 1 Practice', description: 'Original audio and Questions 1–10.' },
};

const FAQS = [
  { question: 'What happens in IELTS Listening Part 1?', answer: 'You hear two people speaking in an everyday social situation, such as arranging or booking a service.' },
  { question: 'How many questions are in Part 1?', answer: 'Part 1 contains 10 questions. In this WeLearn practice, they are form and table completion items.' },
  { question: 'Can I replay this practice audio?', answer: 'Yes. Replay is enabled for deliberate learning. In the IELTS test itself, you hear the recording once.' },
  { question: 'Does this practice predict an IELTS band score?', answer: 'No. The /10 result measures only this independent WeLearn exercise and does not award or predict an official IELTS band.' },
];

export default function IeltsListeningPart1Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
        { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
        { name: 'Listening', url: 'https://www.idiomaswl.com/practica/ielts/listening' },
        { name: 'Part 1', url: URL },
      ]} />
      <JsonLd value={{
        '@context': 'https://schema.org', '@type': ['WebPage', 'LearningResource'],
        name: 'IELTS Listening Part 1 Practice: Questions 1–10', url: URL,
        description: 'A focused IELTS Listening Part 1 guide connected to an original WeLearn practice session.',
        inLanguage: 'en', isAccessibleForFree: true, learningResourceType: ['Guide', 'Practice'],
        educationalUse: ['self-study', 'practice'], teaches: ['IELTS Listening Part 1', 'form completion', 'table completion', 'listening for detail'],
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
        isPartOf: { '@type': 'Course', name: 'IELTS Listening Practice', url: 'https://www.idiomaswl.com/practica/ielts/listening' },
      }} />

      <div className={styles.page} lang="en">
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span aria-hidden="true">/</span><Link href="/practica/ielts">IELTS</Link><span aria-hidden="true">/</span><Link href="/practica/ielts/listening">Listening</Link><span aria-hidden="true">/</span><span aria-current="page">Part 1</span></nav>

          <header className={`${styles.hero} ${styles.partHero}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><Headphones size={15} aria-hidden="true" /> Listening Part 1 · Questions 1–10</p>
              <h1>IELTS Listening Part 1 Practice: Questions 1–10</h1>
              <p className={styles.lead}>Train the detail-heavy opening conversation with an original booking scenario, a dedicated audio track and a complete ten-answer submission.</p>
              <p className={styles.directAnswer}><strong>Direct answer:</strong> In IELTS Listening Part 1, you hear a conversation between two people in an everyday social situation and answer 10 questions in recording order. You hear the recording once. This original WeLearn practice enables replay so you can build the method before adding exam pressure.</p>
              <div className={styles.actions}><Link className={styles.primaryAction} href={SESSION_URL}>Start Practice 001 <ArrowRight size={17} aria-hidden="true" /></Link><Link className={styles.secondaryAction} href="/practica/ielts/listening">Back to all four parts</Link></div>
            </div>
            <aside className={styles.practiceTicket} aria-label="Practice 001 details">
              <span className={styles.ticketLabel}>Original WeLearn audio · 001</span>
              <h2>Harbour City Photography Walk</h2>
              <dl><div><dt>Questions</dt><dd>10</dd></div><div><dt>Audio</dt><dd>02:14</dd></div><div><dt>Task types</dt><dd>Form + table</dd></div><div><dt>Scoring</dt><dd>Server-side /10</dd></div></dl>
            </aside>
          </header>

          <section className={styles.section} aria-labelledby="brief-heading">
            <div className={styles.sectionHeading}><p className={styles.kicker}>Practice brief</p><h2 id="brief-heading">What you will hear and record</h2><p>A customer calls a local photography studio. The first six answers complete booking notes; the last four compare two guided walks.</p></div>
            <div className={styles.briefGrid}>
              <article><FileText size={21} aria-hidden="true" /><h3>Questions 1–6</h3><p>Listen for a surname, address detail, source, date, experience level and main interest.</p></article>
              <article><Clock3 size={21} aria-hidden="true" /><h3>Questions 7–10</h3><p>Separate durations, prices and included items while the speakers mention distractors.</p></article>
              <article><ShieldCheck size={21} aria-hidden="true" /><h3>Private scoring</h3><p>The initial page contains no transcript or accepted-answer list. All ten responses are checked on the server.</p></article>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="prepare-heading">
            <div className={styles.sectionHeading}><p className={styles.kicker}>Before pressing play</p><h2 id="prepare-heading">Predict the answer shape</h2></div>
            <ol className={styles.prepareList}>
              <li><span>01</span><div><strong>Read the word limit.</strong><p>A correct idea can still lose the mark if it breaks the instruction.</p></div></li>
              <li><span>02</span><div><strong>Label each gap.</strong><p>Decide whether you need a name, number, date, level, interest or included item.</p></div></li>
              <li><span>03</span><div><strong>Expect correction language.</strong><p>Part 1 speakers often correct a detail or reject an earlier option before confirming the answer.</p></div></li>
              <li><span>04</span><div><strong>Follow question order.</strong><p>When the conversation moves to the table, move with it instead of returning to an earlier blank.</p></div></li>
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="result-heading">
            <div className={styles.resultPanel}><CheckCircle2 size={26} aria-hidden="true" /><div><p className={styles.kicker}>After submission</p><h2 id="result-heading">A raw result, not a promised band</h2><p>You receive a total out of 10 and item-by-item correct/incorrect signals. The system does not stretch one short practice into an IELTS band prediction.</p></div><Link href={SESSION_URL}>Open the listening desk <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </section>

          <section className={styles.section} aria-labelledby="part-faq-heading"><div className={styles.sectionHeading}><p className={styles.kicker}>Quick answers</p><h2 id="part-faq-heading">Listening Part 1 FAQ</h2></div><div className={styles.faqList}>{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

          <aside className={styles.sourceNote}><strong>Independent practice · reviewed 1 September 2026</strong><p>The scenario, script and questions are original Idiomas WeLearn material. The dialogue audio uses the <a href={PIPER_MODEL_CARD_URL} target="_blank" rel="noopener noreferrer" aria-label="Piper VCTK voice model card (opens in a new tab)">Piper VCTK voice model</a>, derived from the University of Edinburgh VCTK Corpus and attributed under <a href={CC_BY_URL} target="_blank" rel="noopener noreferrer" aria-label="Creative Commons Attribution 4.0 licence (opens in a new tab)">CC BY 4.0</a>. Format statements are checked against the <a href={IELTS_FORMAT_URL} target="_blank" rel="noopener noreferrer" aria-label="official IELTS Listening format (opens in a new tab)">official IELTS Listening format</a>. IELTS is a protected trademark; this resource is not affiliated with or endorsed by its owners.</p><div className={styles.relatedLinks}><Link href="/practica/ielts/academic">IELTS Academic</Link><Link href="/practica/ielts/general-training">IELTS General Training</Link><Link href="/practica/ielts/listening">Listening hub</Link></div></aside>
        </div>
      </div>
    </>
  );
}
