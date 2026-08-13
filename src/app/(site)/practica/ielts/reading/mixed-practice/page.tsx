import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, SearchCheck } from 'lucide-react';
import {
  MixedGuidedPractice,
  MixedIndependentPractice,
  MixedProgressEngine,
} from '@/components/exam-practice/MixedPracticeLab';
import { BreadcrumbJsonLd } from '@/components/exam-practice/StructuredData';
import InternationalLearningResourceJsonLd from '@/components/exam-practice/InternationalLearningResourceJsonLd';
import { CourseSchema } from '@/components/practica/EducationSchema';
import {
  MIXED_PRACTICE_GUIDED_PASSAGE_ID,
  MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID,
  MIXED_PRACTICE_PASSAGES,
  getMixedPracticePassage,
} from '@/data/practica-exams/ielts-reading-mixed-progress';
import { PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import hubStyles from '../page.module.css';
import styles from './page.module.css';

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading/mixed-practice`;

export const metadata: Metadata = {
  title: 'IELTS Reading Mixed Practice: Question Types & Evidence',
  description:
    'Combine IELTS Academic Reading question types in guided passages. Identify the format, choose a reading method and justify every answer with evidence.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'IELTS Reading Mixed Practice',
    description: 'Transfer focused IELTS Reading skills into guided mixed-format passages.',
    type: 'website',
    locale: 'en_US',
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const guidedPassage = getMixedPracticePassage(MIXED_PRACTICE_GUIDED_PASSAGE_ID);
  const independentPassage = getMixedPracticePassage(MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID);
  if (!guidedPassage || !independentPassage) throw new Error('Mixed Practice passage pools are incomplete.');

  return (
    <>
      <CourseSchema
        name="IELTS Reading Mixed Practice"
        description="Guided mixed-format IELTS Academic Reading practice with evidence-based feedback."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Reading question-type recognition, evidence location and mixed-format transfer"
        inLanguage="en"
      />
      <InternationalLearningResourceJsonLd
        name="IELTS Reading Mixed Practice"
        url={URL}
        description="Six original or conservatively bounded passages with thirty-six authentic mixed-format decisions, guided repair, independent submission and a persistent progress engine."
        teaches={['IELTS Reading', 'question-type recognition', 'evidence location', 'mixed practice']}
        isPartOf={{ name: 'IELTS Academic Reading Practice Hub', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Mixed Practice', url: URL },
        ]}
      />

      <div lang="en" className={hubStyles.page}>
        <div className={hubStyles.shell}>
          <nav className={hubStyles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica/ielts/reading">Reading Hub</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Mixed Practice</span>
          </nav>

          <header className={styles.hero}>
            <div>
              <p className={hubStyles.eyebrow}>IELTS Academic Reading · Transfer Practice</p>
              <h1>Choose the method before you choose the answer.</h1>
              <p>
                These guided sets mix several Reading formats inside short passages. Your job is to identify the task, select the right reading method and support the final decision with exact evidence.
              </p>
              <div className={styles.heroActions}>
                <a href="#practice">Start Mixed Practice <ArrowRight size={16} aria-hidden="true" /></a>
                <Link href="/practica/ielts/reading"><ArrowLeft size={16} aria-hidden="true" /> Return to the Reading Hub</Link>
              </div>
            </div>
            <aside aria-label="When mixed practice is useful">
              <strong>Use this room after focused study</strong>
              <p>You should already know at least one question family and one reading subskill. If a format still feels unfamiliar, use the focused lesson linked in the feedback before advancing.</p>
            </aside>
          </header>

          <section className={styles.section} aria-labelledby="method-heading">
            <div className={styles.sectionHeading}>
              <p className={hubStyles.kicker}>Before you answer</p>
              <h2 id="method-heading">Use the 3-part transfer check</h2>
              <p>Do not treat the options as a guessing game. Name the task, locate the evidence and explain why the best option fits more precisely than its closest competitor.</p>
            </div>
            <div className={styles.methodGrid}>
              <article><BookOpenCheck aria-hidden="true" /><span>1 · Identify</span><h3>What decision does the task require?</h3><p>Evidence state, paragraph matching, category matching or exact words from the passage?</p><small>Example: “Which paragraph mentions…” signals Matching Information.</small></article>
              <article><SearchCheck aria-hidden="true" /><span>2 · Locate</span><h3>Where is the complete evidence window?</h3><p>Use an anchor to stop scanning, then read enough context to capture the whole claim.</p><small>Example: a number helps you arrive; the surrounding sentence tells you what it measures.</small></article>
              <article><CheckCircle2 aria-hidden="true" /><span>3 · Justify</span><h3>Why does this answer fit best?</h3><p>State the evidence, the paraphrase and the exact problem with the strongest distractor.</p><small>Example: “smaller effect” contradicts “fell equally”; shared vocabulary does not rescue the distractor.</small></article>
            </div>
          </section>

          <section id="practice" className={styles.practiceSection} aria-labelledby="practice-heading">
            <div className={styles.sectionHeading}>
              <p className={hubStyles.kicker}>Guided decision lab</p>
              <h2 id="practice-heading">Learn to switch contracts without guessing</h2>
              <p>Work through one passage and six authentic formats. A wrong answer reopens immediately so you can repair the method before moving on.</p>
            </div>
            <MixedGuidedPractice passage={guidedPassage} />
          </section>

          <section className={styles.practiceSection} aria-labelledby="independent-heading">
            <div className={styles.sectionHeading}>
              <p className={hubStyles.kicker}>Independent practice</p>
              <h2 id="independent-heading">Hold every key until the full passage is complete</h2>
              <p>Six different task contracts share one passage. Finish all six before the task labels, evidence and explanations are revealed.</p>
            </div>
            <MixedIndependentPractice passage={independentPassage} />
          </section>

          <section className={styles.practiceSection} aria-labelledby="engine-heading">
            <div className={styles.sectionHeading}>
              <p className={hubStyles.kicker}>WeLearn Progress Engine</p>
              <h2 id="engine-heading">6 passages · 36 decisions · 14 question families</h2>
              <p>Six levels move from contract recognition to a two-passage mastery check. Drafts, best scores, error diagnoses and the review queue stay in this browser.</p>
            </div>
            <MixedProgressEngine />
            <p className={styles.bankBoundary}>The complete bank contains {MIXED_PRACTICE_PASSAGES.length} passages and {MIXED_PRACTICE_PASSAGES.flatMap((passage) => passage.tasks).length} scored decisions. Progress scores diagnose this practice bank; they are not IELTS band predictions.</p>
          </section>

          <nav className={styles.nextGrid} aria-label="Continue IELTS Reading practice">
            <Link href="/practica/ielts/reading/tipos-de-preguntas"><span>Need a clearer task rule?</span><strong>Browse Question Types <ArrowRight size={15} aria-hidden="true" /></strong></Link>
            <Link href="/practica/ielts/reading/habilidades"><span>Need a stronger reading method?</span><strong>Browse Reading Skills <ArrowRight size={15} aria-hidden="true" /></strong></Link>
          </nav>
        </div>
      </div>
    </>
  );
}
