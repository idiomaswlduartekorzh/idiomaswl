'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Task2OfficialReviewBlock from '../task2/Task2OfficialReviewBlock';
import { countEntries } from './vocabulary-types';
import { VOCAB_UNITS, unitsByFamily } from './vocabulary-index';
import styles from '../task2/introduccion/page.module.css';

/**
 * El superhub de vocabulario de IELTS Writing.
 *
 * Sirve a las DOS tareas, que es la razón de que viva en `/writing/` y no dentro de Task 2:
 * un verbo de subida se usa igual en un gráfico que en un argumento, y estaba enterrado donde
 * solo lo encontraba quien ya estaba estudiando Task 2.
 *
 * Tres ejes, y el temático no está entre ellos. Nadie se atasca por no saber decir
 * «contaminación»; se atasca por no saber decir que algo subió bruscamente y luego se
 * estabilizó.
 */

const TOTAL = VOCAB_UNITS.reduce((sum, unit) => sum + countEntries(unit), 0);
const GRUPOS = VOCAB_UNITS.reduce((sum, unit) => sum + unit.groups.length, 0);

export default function VocabularyHubClient() {
  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing"><ArrowLeft size={15} /> Academic Writing</Link>
      <span>/</span><span>Vocabulary</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>IELTS Academic Writing · Vocabulary</p>
      <h1>Vocabulary for IELTS Writing, organised by what you are trying to write</h1>
      <p className={styles.heroLead}>
        Every vocabulary book for this exam is organised by topic — health, education, the
        environment. That helps you read. It does not help you write, because nobody sits down in
        front of a chart and asks which transport words they know. They ask how to say that something
        rose steeply and then flattened. That is a section of the exam, or a function — and those are
        the two axes this hub uses.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{VOCAB_UNITS.length} units</strong><span>one page each, with the full four-block route</span></div>
        <div className={styles.fact}><strong>{TOTAL} entries</strong><span>in {GRUPOS} groups, every one with its pattern</span></div>
        <div className={styles.fact}><strong>Guided practice</strong><span>you write first, the model comes after</span></div>
        <div className={styles.fact}><strong>No auto-band</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Official criteria and WeLearn strategy</p>
        <h2>Lexical Resource is not a count of long words</h2>
      </div>
      <Task2OfficialReviewBlock
        focus="Choose the word the sentence needs, then check it takes the pattern you gave it."
        officialFormat="Lexical Resource is one of the four official criteria in both Writing tasks. It assesses range, precision and control — including collocation and word formation — not the number of unusual words a response contains."
        welearnStrategy="WeLearn organises vocabulary by section and by function, because a topic list cannot tell you which word a sentence needs. Every unit opens with the same sentence written vaguely and precisely, so the gain is visible before any list appears."
        answerCheck="A rare word in the wrong pattern scores lower than a plain word in the right one. Nothing here is scored automatically."
      />
    </section>

    {unitsByFamily().map((group) => (
      <section key={group.family} className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>{group.label}</p>
          <h2>{group.family === 'task1' ? 'The words each part of a Task 1 response needs' : group.family === 'task2' ? 'The words each part of a Task 2 essay needs' : 'The jobs words do, in either task'}</h2>
        </div>
        <div className={styles.promptChoiceGrid}>
          {group.units.map((unit) => (
            <Link key={unit.slug} href={`/practica/ielts/academic/writing/vocabulario/${unit.slug}`} className={styles.promptChoice}>
              <strong>{unit.label} · {unit.spanishName}</strong>
              <p>{unit.job.charAt(0).toUpperCase()}{unit.job.slice(1)}.</p>
              <small>{countEntries(unit)} entries · {unit.groups.length} groups · {unit.drills.length} exercises</small>
            </Link>
          ))}
        </div>
      </section>
    ))}

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The one rule</p>
        <h2>A rare word in the wrong pattern costs more than a plain word in the right one</h2>
      </div>
      <p className={styles.trap}>
        <strong>This is where most vocabulary work goes wrong.</strong><br />
        “Peaked to 40%”. “Detrimental for small businesses”. “The figure raised”. “Tend to
        investing”. Every one of those is a word somebody learned and then used without the
        construction it demands — and every one reads worse than the plain word it replaced. That is
        why all {TOTAL} entries here carry their pattern, and why the guardian fails the build if one
        is published without it.
      </p>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Where this connects</p>
        <h2>Vocabulary is the argument, not the decoration</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        <Link href="/practica/ielts/academic/writing/task2/academic-vocabulary" className={styles.promptChoice}>
          <strong>The eight functions</strong>
          <p>Hedging, asserting, attributing, quantifying, causing, evaluating, proposing and register.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task2/paraphrasing" className={styles.promptChoice}>
          <strong>Paraphrasing</strong>
          <p>Restating a prompt needs precise synonyms. This is where they come from.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task2/linking-language" className={styles.promptChoice}>
          <strong>Linking language</strong>
          <p>Connecting ideas is its own skill: seven relationships, a page each.</p>
        </Link>
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task1"><ArrowLeft size={16} /> Task 1</Link>
      <Link href="/practica/ielts/academic/writing/task2">Task 2</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
