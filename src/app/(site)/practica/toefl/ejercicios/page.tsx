import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';

import { TOEFL_EXERCISE_COUNT, TOEFL_EXERCISE_SECTIONS } from '@/data/practica/toefl-exercise-catalog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'TOEFL Practice: Reading, Listening, Writing & Speaking',
  description: 'Choose a TOEFL task family, then select one of the available practice sets.',
};

export default function ToeflExercisesPage() {
  return <main className={styles.page}>
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>›</span><Link href="/practica/toefl">TOEFL</Link><span>›</span><span>Exercises</span></nav>
      <div className={styles.heroGrid}>
        <div><p className={styles.kicker}>TOEFL practice library</p><h1>Choose a task. Then choose an exercise.</h1><p className={styles.lead}>Every task family opens a clear list before any exercise begins. Reading, Listening, and Writing include 20 selectable sets.</p></div>
        <aside className={styles.catalogNote}><span>{TOEFL_EXERCISE_COUNT}</span><strong>task families</strong><p>Four sections stay visible so you can move between skills without losing your place.</p></aside>
      </div>
      <nav className={styles.jumpNav} aria-label="Jump to a TOEFL section">{TOEFL_EXERCISE_SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`} data-section={section.id}><span>{section.label}</span><small>{section.items.length} tasks</small><ArrowDown aria-hidden="true" /></a>)}</nav>
    </div></header>

    <section className={styles.catalog} aria-labelledby="catalog-heading"><div className="wrap">
      <div className={styles.catalogIntro}><p>Practice by task</p><h2 id="catalog-heading">What would you like to practice?</h2><span>Select a task family to see its available exercises. Nothing starts until you choose a set.</span></div>
      <div className={styles.clusterGrid}>{TOEFL_EXERCISE_SECTIONS.map((section) => <section key={section.id} id={section.id} className={styles.cluster} data-section={section.id} aria-labelledby={`${section.id}-heading`}>
        <header className={styles.clusterHeader}><div><p>{section.items.length} tasks</p><h3 id={`${section.id}-heading`}>{section.label}</h3></div></header>
        <p className={styles.clusterDescription}>{section.description}</p>
        <div className={styles.taskList}>{section.items.map((item) => <Link key={item.id} href={item.availability.href} className={styles.taskRow}>
          <span className={styles.taskCopy}><strong>{item.officialName}</strong><small>{item.explanation}</small></span>
          <span className={`${styles.taskState} ${styles.available}`}>Available</span>
          <span className={styles.taskAction}>{item.availability.actionLabel} <ArrowRight aria-hidden="true" /></span>
        </Link>)}</div>
      </section>)}</div>
    </div></section>
  </main>;
}
