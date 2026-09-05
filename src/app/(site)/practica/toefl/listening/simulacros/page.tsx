import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Headphones, LockKeyhole, Radio } from 'lucide-react';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';
import { TOEFL_SECTIONAL_LISTENING_SET_IDS } from '@/data/toefl/sectional-listening-adapter';

import styles from './page.module.css';

const URL = 'https://www.idiomaswl.com/practica/toefl/listening/simulacros';

export const metadata: Metadata = {
  title: 'TOEFL Listening Practice Sets',
  description:
    'Practice TOEFL Listening with original audio, four current task families, and private raw scoring.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'TOEFL Listening Practice Sets',
    description: 'Choose a Listening set with original audio and private server-side scoring.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: 'Is this Listening practice adaptive?',
    answer:
      'No. Each exercise follows a fixed path and uses the Listening content from the corresponding WeLearn set.',
  },
  {
    question: 'Will I receive an official TOEFL score?',
    answer:
      'No. You will see the number of correct answers in this practice. WeLearn does not calculate an ETS score or admission equivalency.',
  },
  {
    question: 'Can I replay the audio?',
    answer:
      'Yes. This is practice, so you can replay every audio, move backward or forward, and continue without answering.',
  },
];

const tasks = [
  'Listen and Choose a Response',
  'Listen to a Conversation',
  'Listen to an Announcement',
  'Listen to an Academic Talk',
];

function setNumberFromId(mockId: string) {
  return mockId.replace('set-', '');
}

export default function ToeflListeningLibraryPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="TOEFL Listening Practice Sets"
        url={URL}
        description="Fixed TOEFL Listening practice library created by WeLearn."
        teaches={tasks}
        isPartOf={{
          name: 'TOEFL Listening Practice',
          url: 'https://www.idiomaswl.com/practica/toefl/listening',
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' },
          { name: 'Exercises', url: 'https://www.idiomaswl.com/practica/toefl/ejercicios' },
          { name: 'Listening', url: 'https://www.idiomaswl.com/practica/toefl/listening' },
          { name: 'Listening sets', url: URL },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/practica/toefl/ejercicios">Exercises</Link>
              <span aria-hidden="true">›</span>
              <Link href="/practica/toefl/listening">Listening</Link>
              <span aria-hidden="true">›</span>
              <span>Practice sets</span>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>TOEFL Listening · focused practice</p>
                <h1>Choose a set. Practice Listening.</h1>
                <p className={styles.lead}>
                  Each exercise contains the four Listening task families from one WeLearn set. The exercise opens only after you choose it.
                </p>
              </div>
              <aside className={styles.scopeNote}>
                <Radio aria-hidden="true" />
                <strong>Fixed WeLearn collection</strong>
                <p>Each set is independent. It does not reproduce adaptive routing or generate an official TOEFL score.</p>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.library} aria-labelledby="listening-library-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Listening library</p>
              <h2 id="listening-library-heading">20 Listening sets</h2>
              <span>Choose any set. You can complete all four task families now or continue later in this browser.</span>
            </div>

            <aside className={styles.taskKey} aria-labelledby="listening-task-key">
              <div>
                <Headphones aria-hidden="true" />
                <strong id="listening-task-key">Included in every set</strong>
              </div>
              <ul>
                {tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </aside>

            <div className={styles.setGrid}>
              {TOEFL_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => {
                const setNumber = setNumberFromId(mockId);
                return (
                  <article className={styles.setCard} key={mockId}>
                    <div className={styles.setIdentity}>
                      <span className={styles.setNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p>TOEFL Listening</p>
                        <h3>Set {setNumber}</h3>
                      </div>
                      <span className={styles.status}>Available</span>
                    </div>
                    <p className={styles.setSummary}>Fixed exercise with progress saved in this browser.</p>
                    <div className={styles.setFooter}>
                      <p><LockKeyhole aria-hidden="true" /> Private scoring</p>
                      <Link href={`/practica/toefl/listening/simulacros/practica/${mockId}`}>
                        Open Set {setNumber} <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="listening-library-faq">
          <div className="wrap">
            <p className={styles.kicker}>Before you begin</p>
            <h2 id="listening-library-faq">How this practice works</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
