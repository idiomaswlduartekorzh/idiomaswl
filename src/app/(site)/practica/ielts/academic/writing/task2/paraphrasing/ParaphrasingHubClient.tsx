'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import { PARAPHRASE_TECHNIQUES } from './paraphrasing-data';
import ParaphrasingEngine from './ParaphrasingEngine';
import styles from '../introduccion/page.module.css';

/**
 * El hub de paráfrasis: presenta las cinco técnicas y deja el motor mixto aquí.
 *
 * Mismo reparto que el hub de conectores. La explicación, los ejemplos y los ejercicios de
 * cada técnica viven en su propia URL —que además es la que puede posicionar por «cambiar la
 * voz pasiva en inglés»— y aquí se queda lo único que solo tiene sentido mezclado: reconocer
 * qué técnica se ha usado sin que nadie te diga cuál buscar.
 *
 * POR QUÉ ESTA PÁGINA EXISTE
 *
 * «Paraphrasing» era una de las diez fichas de habilidades transversales del hub de Task 2, y
 * las diez enlazaban a la etapa donde esa habilidad se practica de paso. Para nueve de ellas
 * eso basta. Para esta no: parafrasear es lo primero que se hace en la introducción, lo hace
 * también Task 1, lo mide Reading, y es donde un hispanohablante pierde marcas por calco sin
 * enterarse. Necesitaba su recorrido propio.
 */

const TOTAL_MOVES = PARAPHRASE_TECHNIQUES.reduce((total, technique) => total + technique.moves.length, 0);
const TOTAL_DRILLS = PARAPHRASE_TECHNIQUES.reduce((total, technique) => total + technique.drills.length + 1, 0);
const TOTAL_MISTAKES = PARAPHRASE_TECHNIQUES.reduce((total, technique) => total + technique.mistakes.length, 0);

export default function ParaphrasingHubClient() {
  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span><span>Paraphrasing</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Task 2 · Cross-cutting skill</p>
      <h1>Paraphrasing in English, as five things you can actually do</h1>
      <p className={styles.heroLead}>
        “Say it in your own words” is not instruction, it is a wish. Paraphrasing is five concrete
        moves — swap the words, move them, change their shape, turn the sentence around, rebuild it —
        and each one has a place where the meaning breaks. Learn the five and the blank first minute
        of an essay stops being blank.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{PARAPHRASE_TECHNIQUES.length} techniques</strong><span>one page each, with its own exercises</span></div>
        <div className={styles.fact}><strong>{TOTAL_MOVES} moves</strong><span>each labelled by how safely it travels</span></div>
        <div className={styles.fact}><strong>{TOTAL_DRILLS} exercises</strong><span>plus a twelve-question mixed engine</span></div>
        <div className={styles.fact}><strong>No auto-band</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Official criteria and WeLearn strategy</p>
        <h2>Copying the prompt is not penalised by a rule — it is penalised by every criterion</h2>
      </div>
      <Task2OfficialReviewBlock
        focus="Move every content word, and check the claim survived the move."
        officialFormat="IELTS does not have a paraphrasing criterion. Words copied from the prompt are simply not counted as your own language, which lowers Lexical Resource, and a first sentence that repeats the question does no work for Task Response."
        welearnStrategy="WeLearn teaches paraphrasing as five separate techniques, because 'use synonyms' collapses the moment a prompt contains a term with no synonym. Each technique has its own page, its own worked examples and its own trap."
        answerCheck="A strong paraphrase could not be mistaken for the prompt and could not be argued to mean something different from it. Nothing here is scored automatically."
      />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Start here</p>
        <h2>The five techniques</h2>
        <p>
          Each page explains what the technique moves, gives you a sentence to judge before you write
          one, lists its moves with the risk each carries, works through three examples, names the
          mistakes it produces, and gives four exercises.
        </p>
      </div>
      <div className={styles.promptChoiceGrid}>
        {PARAPHRASE_TECHNIQUES.map((technique) => (
          <Link key={technique.slug} href={`/practica/ielts/academic/writing/task2/paraphrasing/${technique.slug}`} className={styles.promptChoice}>
            <strong>{technique.label} · {technique.spanishName}</strong>
            <p>{technique.signals.charAt(0).toUpperCase()}{technique.signals.slice(1)}.</p>
            <small>{technique.moves.length} moves · {technique.examples.length} worked examples · {technique.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The one rule</p>
        <h2>A paraphrase that reads better and means something else is worth less than no paraphrase</h2>
      </div>
      <p className={styles.trap}>
        <strong>Every technique on these pages can break the same way.</strong><br />
        “Should” becomes “must” and a recommendation becomes an obligation. “Many” becomes “all” and a
        measured claim becomes one you cannot defend. “Affects” becomes “damages” and a neutral finding
        takes a side. That is why each page makes you judge a sentence before it lets you write one,
        and why {TOTAL_MISTAKES} real classroom errors are printed here with their diagnosis instead
        of being tidied away.
      </p>
    </section>

    <ParaphrasingEngine />

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Where you will use this</p>
        <h2>Paraphrasing is not only the first sentence of Task 2</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        <Link href="/practica/ielts/academic/writing/task2/introduccion" className={styles.promptChoice}>
          <strong>Task 2 introduction</strong>
          <p>The opening sentence restates the prompt. This is where these five techniques earn their marks first.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task1/introduccion" className={styles.promptChoice}>
          <strong>Task 1 introduction</strong>
          <p>The same job on a chart: restate what the visual shows without copying the label above it.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task2/linking-language" className={styles.promptChoice}>
          <strong>Linking language</strong>
          <p>Rebuilding a sentence usually needs a connector. Seven relationships, one page each.</p>
        </Link>
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={16} /> Back to Task 2</Link>
      <Link href="/practica/ielts/academic/writing/task2/introduccion">Build the introduction</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
