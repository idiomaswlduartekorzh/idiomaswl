'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import { VOCAB_FUNCTIONS } from './vocabulary-data';
import VocabularyEngine from './VocabularyEngine';
import styles from '../introduccion/page.module.css';

/**
 * El hub de vocabulario académico: presenta las ocho funciones y deja el motor mixto aquí.
 *
 * POR QUÉ POR FUNCIÓN Y NO POR TEMA
 *
 * Todo el material de vocabulario para IELTS del mercado se organiza por tema —el manual de
 * Cambridge tiene veinte unidades, de «Growing up» a «The arts»— y ese reparto sirve para
 * leer. No sirve para escribir. Delante de un enunciado sobre coches eléctricos nadie se
 * pregunta qué palabras sabe de transporte: se pregunta cómo se dice que algo probablemente
 * pasa pero no siempre. Eso es una función, y ningún índice temático la contiene.
 *
 * Conectar NO está entre las ocho: lo cubren las siete familias de `linking-language`, con su
 * propia página cada una.
 */

const TOTAL_WORDS = VOCAB_FUNCTIONS.reduce((total, item) => total + item.words.length, 0);
const TOTAL_DRILLS = VOCAB_FUNCTIONS.reduce((total, item) => total + item.drills.length + 1, 0);
const TOTAL_MISTAKES = VOCAB_FUNCTIONS.reduce((total, item) => total + item.mistakes.length, 0);

export default function AcademicVocabularyHubClient() {
  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span><span>Academic vocabulary</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Task 2 · Cross-cutting skill</p>
      <h1>Academic vocabulary, organised by the job each word does</h1>
      <p className={styles.heroLead}>
        Every vocabulary book for this exam is organised by topic — health, education, the environment.
        That helps you read. It does not help you write, because in front of a prompt nobody asks
        “which transport words do I know?”. They ask “how do I say this usually happens, but not
        always?”. That is a function, and these are the eight that build a Task 2 response.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{VOCAB_FUNCTIONS.length} functions</strong><span>one page each, with its own exercises</span></div>
        <div className={styles.fact}><strong>{TOTAL_WORDS} items</strong><span>each with the pattern it demands</span></div>
        <div className={styles.fact}><strong>{TOTAL_DRILLS} exercises</strong><span>plus a twelve-question mixed engine</span></div>
        <div className={styles.fact}><strong>No auto-band</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Official criteria and WeLearn strategy</p>
        <h2>Lexical Resource is not a count of long words</h2>
      </div>
      <Task2OfficialReviewBlock
        focus="Choose the word that adds information, then check it takes the pattern you gave it."
        officialFormat="Lexical Resource is one of the four official criteria for Task 2. It assesses range, precision and control — including collocation and word formation — not the number of unusual words a response contains."
        welearnStrategy="WeLearn teaches vocabulary by function, because a topic list cannot tell you which word a sentence needs. Each function opens with the same sentence written vaguely and precisely, so the gain is visible before any list appears."
        answerCheck="A strong response uses a precise word because the sentence needed one. Swapping in a rare synonym that does not fit its pattern lowers this criterion rather than raising it. Nothing here is scored automatically."
      />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Start here</p>
        <h2>The eight functions</h2>
        <p>
          Each page opens with the same sentence written vaguely and precisely, then asks you to spot
          which version does the job, then gives you the items with the pattern each one demands, two
          worked examples, the mistakes it produces, and three exercises.
        </p>
      </div>
      <div className={styles.promptChoiceGrid}>
        {VOCAB_FUNCTIONS.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/academic-vocabulary/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label} · {item.spanishName}</strong>
            <p>{item.job.charAt(0).toUpperCase()}{item.job.slice(1)}.</p>
            <small>{item.words.length} items · {item.examples.length} worked examples · {item.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The one rule</p>
        <h2>A rare word in the wrong pattern costs more than a plain word in the right one</h2>
      </div>
      <p className={styles.trap}>
        <strong>This is where most vocabulary work goes wrong.</strong><br />
        “Detrimental for” instead of “detrimental to”. “Subsidise to families”. “Tend to investing”.
        “Research have proven”. Every one of those is a word somebody learned and then used without its
        pattern — and every one reads worse than the plain word it replaced. That is why each of the
        {' '}{TOTAL_WORDS} items on these pages carries the construction it demands, and why
        {' '}{TOTAL_MISTAKES} real errors are printed with their diagnosis instead of being tidied away.
      </p>
    </section>

    <VocabularyEngine />

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Where you will use this</p>
        <h2>These words are the argument, not the decoration</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        <Link href="/practica/ielts/academic/writing/task2/linking-language" className={styles.promptChoice}>
          <strong>Linking language</strong>
          <p>The ninth function — connecting ideas — has seven families and a page each. It is not repeated here.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task2/paraphrasing" className={styles.promptChoice}>
          <strong>Paraphrasing</strong>
          <p>Restating the prompt needs precise synonyms. These eight functions are where they come from.</p>
        </Link>
        <Link href="/practica/ielts/academic/writing/task2/parrafos-cuerpo" className={styles.promptChoice}>
          <strong>Body paragraphs</strong>
          <p>Hedging, causing and quantifying do most of their work here, inside the chain of reasoning.</p>
        </Link>
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={16} /> Back to Task 2</Link>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing">Paraphrasing</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
