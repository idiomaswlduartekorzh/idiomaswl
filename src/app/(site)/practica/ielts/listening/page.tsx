import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { CourseSchema } from '@/components/practica/EducationSchema';

import styles from '../../toefl/page.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening';

export const metadata: Metadata = {
  title: 'IELTS Listening: Format, Strategy and 20 Practice Sets',
  description: 'Understand the four IELTS Listening parts, follow a practical study method, and practise 20 audited sets with replayable audio and printable PDFs.',
  alternates: { canonical: URL },
  openGraph: { title: 'IELTS Listening: Format and Practice', description: 'Four-part IELTS Listening guidance and 20 complete WeLearn practice sets.', url: URL, type: 'website', locale: 'en_US' },
};

const parts = [
  { title: 'Part 1 · Everyday conversation', description: 'Follow a conversation in a familiar social setting and identify names, dates, prices, places and practical details.', measures: 'accurate detail and form completion' },
  { title: 'Part 2 · Everyday monologue', description: 'Follow one speaker explaining a service, place, event or process and connect details across the talk.', measures: 'purpose, sequence and factual detail' },
  { title: 'Part 3 · Academic conversation', description: 'Track two or more speakers discussing a course, project or research task and distinguish their views and decisions.', measures: 'speaker attitude, agreement and development' },
  { title: 'Part 4 · Academic monologue', description: 'Follow a lecture-style talk, recognise its structure and record connected academic information accurately.', measures: 'organisation, main ideas and note completion' },
] as const;

const faqs = [
  { question: 'Can I pause and replay the audio in WeLearn practice?', answer: 'Yes. The practice route is designed for study, so you can pause, replay, rewind, jump forward and drag the timeline.' },
  { question: 'Does the practice use different questions from the complete mocks?', answer: 'No. Each Listening practice set is projected from the same audited mock, so its audio, questions, numbering and scoring contract stay connected.' },
  { question: 'Can teachers print a set for class?', answer: 'Yes. Every set generates a branded student PDF with the questions and a blank answer sheet, without the transcript or answer key.' },
  { question: 'Is the result an official IELTS band?', answer: 'No. WeLearn calculates a study estimate from the raw Listening score. It is not an official IELTS result.' },
];

export default function IELTSListeningPage() {
  return (
    <>
      <CourseSchema name="IELTS Listening Practice" description="Four-part IELTS Listening guidance and 20 complete practice sets with replayable audio." url={URL} educationalLevel="B1,B2,C1" teaches="IELTS Listening, form completion, note completion, multiple choice, matching" inLanguage="en" />
      <LearningResourceJsonLd name="IELTS Listening Practice" url={URL} description="Understand the four IELTS Listening parts and practise them in 20 complete WeLearn sets." teaches={parts.map(part => part.title)} inLanguage="en" isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }} />
      <BreadcrumbJsonLd items={[{ name: 'Practice', url: 'https://www.idiomaswl.com/practica' }, { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' }, { name: 'Listening', url: URL }]} />
      <FaqJsonLd faqs={faqs} />

      <main className={styles.page} lang="en">
        <section className={styles.hero}><div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>›</span><Link href="/practica/ielts">IELTS</Link><span>›</span><span>Listening</span></nav>
          <p className={styles.kicker}>IELTS Academic · Listening study route</p>
          <h1>IELTS Listening: understand the four parts, then practise the full set.</h1>
          <p className={styles.lead}>Learn what changes from an everyday conversation to an academic lecture, then use any of the 20 audited WeLearn sets with complete playback control and no timer.</p>
          <div className={styles.facts} aria-label="IELTS Listening summary"><div><strong>4</strong><span>parts in every set</span></div><div><strong>40</strong><span>scored responses</span></div><div><strong>20</strong><span>audited practice sets</span></div><div><strong>PDF</strong><span>student copy for every set</span></div></div>
        </div></section>

        <section className={styles.routes} aria-labelledby="ielts-listening-parts"><div className="wrap">
          <div className={styles.sectionHeading}><p>Build the listening map</p><h2 id="ielts-listening-parts">The context becomes more academic as you progress</h2><span>Keep the same core routine: preview the task, predict the answer type, follow signposts and check the exact word limit.</span></div>
          <div className={styles.routeGrid}>{parts.map(part => <article key={part.title} className={styles.routeCard}><div className={styles.routeTop}><small>Listening part</small></div><h3>{part.title}</h3><p>{part.description}</p><span className={styles.routeCta}>Focus: {part.measures}</span></article>)}</div>
        </div></section>

        <section className={styles.guide}><div className="wrap">
          <div className={styles.guideGrid}><article><p className={styles.guideEyebrow}>A useful practice loop</p><h2>Listen once for the task, then replay for the evidence</h2><p>Start by reading the instructions and predicting whether each gap needs a name, number, place or noun phrase. On the first listen, answer without stopping. On the second, rewind only around uncertain items and write down the exact phrase that supports your choice.</p><p>Finish by checking spelling, plural forms, word limits and whether a distractor was corrected later by the speaker. These small checks turn repeated listening into a transferable method.</p></article><aside className={styles.disclosure}><strong>What WeLearn provides</strong><p>The same audio and 40 questions used by each audited full mock, now with pause, replay, seeking, free navigation, local progress and private scoring.</p><strong>What the PDF contains</strong><p>All four parts and a blank answer sheet for students. Transcripts and answer keys stay out of the student copy.</p></aside></div>
          <div className={styles.practiceBlock}><p className={styles.guideEyebrow}>Practice route</p><h2>Use one set in three passes</h2><ol><li>Complete it once without pausing to establish your current level.</li><li>Replay difficult sections, locate the audible evidence and correct your process.</li><li>Try another set and compare your part-by-part result rather than memorising answers.</li></ol><div className={styles.actionRow}><Link href="/practica/ielts/listening/simulacros" className="btn">Choose one of 20 Listening sets</Link><Link href="/examenes/ielts#practica" className="btn btn-ghost">Open the complete IELTS mocks</Link></div></div>
          <section className={styles.faq} aria-labelledby="ielts-listening-faq"><p className={styles.guideEyebrow}>Questions</p><h2 id="ielts-listening-faq">Using the IELTS Listening practice route</h2><div>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
        </div></section>
      </main>
    </>
  );
}
