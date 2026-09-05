import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, ClipboardCheck, Headphones, Mic2, PenLine } from 'lucide-react';

import { TOEFL_EXERCISE_COUNT, TOEFL_EXERCISE_SECTIONS, TOEFL_MOCK_LIBRARY_HREF } from '@/data/practica/toefl-exercise-catalog';
import styles from './ios.module.css';

export const metadata: Metadata = {
  title: 'TOEFL Practice: Exercises and 20 Full Mocks',
  description: 'Choose a TOEFL task, a Listening set, or one of 20 complete WeLearn mock exams.',
};

const sectionIcons = { reading: BookOpenCheck, listening: Headphones, writing: PenLine, speaking: Mic2 } as const;

export default function TOEFLPage() {
  return <main className={styles.page}>
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>›</span><span>TOEFL</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>TOEFL practice · clear paths</p>
        <h1>Choose what you want to practice.</h1>
        <p className={styles.lead}>Start with one task, focus on Listening, or complete a full mock. Each path shows a list before an exercise begins.</p>
        <p className={styles.disclosure}>Original WeLearn material. Fixed practice paths do not reproduce TOEFL adaptive routing or official scoring.</p>
      </div>
      <dl className={styles.facts} aria-label="Available TOEFL practice">
        <div><dt>Task families</dt><dd>{TOEFL_EXERCISE_COUNT}</dd><dd className={styles.factNote}>across four sections</dd></div>
        <div><dt>Practice sets</dt><dd>20</dd><dd className={styles.factNote}>selectable exercises</dd></div>
        <div><dt>Full mocks</dt><dd>20</dd><dd className={styles.factNote}>complete WeLearn sessions</dd></div>
        <div><dt>Sections</dt><dd>4</dd><dd className={styles.factNote}>Reading, Listening, Writing, Speaking</dd></div>
      </dl>
    </div></header>

    <section className={styles.modes} aria-labelledby="practice-mode-heading"><div className="wrap">
      <div className={styles.sectionHeading}><p>Start here</p><h2 id="practice-mode-heading">What would you like to do?</h2><span>Choose a path. You will see the available exercises before anything starts.</span></div>
      <div className={styles.modeGrid}>
        <Link href="/practica/toefl/ejercicios" className={`${styles.modeCard} ${styles.modeExercises}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><ClipboardCheck aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusAvailable}`}>Available</span></div>
          <p className={styles.modeNumber}>01</p><h3>Practice by task</h3><p>Choose one of the twelve TOEFL task families, then select an exercise set.</p><span className={styles.modeAction}>Browse exercises <ArrowRight aria-hidden="true" /></span>
        </Link>
        <Link href="/practica/toefl/listening/simulacros" className={`${styles.modeCard} ${styles.modePractice}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><Headphones aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusAvailable}`}>20 sets</span></div>
          <p className={styles.modeNumber}>02</p><h3>Listening practice</h3><p>Choose one of 20 Listening sets with all four current task families and original audio.</p><span className={styles.modeAction}>Choose a Listening set <ArrowRight aria-hidden="true" /></span>
        </Link>
        <Link href={TOEFL_MOCK_LIBRARY_HREF} className={`${styles.modeCard} ${styles.modeMocks}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><BookOpenCheck aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusMocks}`}>20 available</span></div>
          <p className={styles.modeNumber}>03</p><h3>Full mocks</h3><p>Practice Reading, Listening, Writing, and Speaking in one complete session.</p><span className={styles.modeAction}>Open full mocks <ArrowRight aria-hidden="true" /></span>
        </Link>
      </div>
    </div></section>

    <section className={styles.preview} aria-labelledby="exercise-preview-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Practice by section</p><h2 id="exercise-preview-heading">Four sections. Twelve task families.</h2></div><Link href="/practica/toefl/ejercicios" className={styles.textLink}>Open the exercise library <ArrowRight aria-hidden="true" /></Link></div>
      <div className={styles.sectionStrip}>{TOEFL_EXERCISE_SECTIONS.map((section) => { const Icon = sectionIcons[section.id]; return <Link key={section.id} href={`/practica/toefl/ejercicios#${section.id}`} className={styles.sectionPreview} data-section={section.id}><Icon aria-hidden="true" /><span><strong>{section.label}</strong><small>{section.items.length} tasks</small></span><ArrowRight aria-hidden="true" /></Link>; })}</div>
    </div></section>
  </main>;
}
