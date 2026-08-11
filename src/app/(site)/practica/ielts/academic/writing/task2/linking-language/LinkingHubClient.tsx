'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import { placeOption } from '@/lib/practica/shuffle-options';
import { LINKING_FAMILIES, signalFor } from './linking-data';
import { FIX_PARAGRAPH, MIXED_QUIZ } from './linking-mixed';
import LinkingEngine from './LinkingEngine';
import styles from '../introduccion/page.module.css';

/**
 * El hub: presenta las siete familias y ofrece las dos actividades mixtas.
 *
 * Antes esta página iba directa al quiz, sin explicar nada, y con estilos sueltos escritos a
 * mano que no se parecían al resto de Task 2. Ahora reparte el trabajo: la explicación, los
 * ejemplos y los ejercicios de cada familia viven en su propia URL —que además es la que
 * puede posicionar por «conectores de contraste en inglés»— y aquí se queda lo que solo
 * tiene sentido mezclado: reconocer la relación sin saber de qué familia es, y reparar un
 * párrafo sobre-conectado.
 */

export default function LinkingHubClient() {
  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span><span>Linking language</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Task 2 · Cross-cutting skill</p>
      <h1>Linking words in English, by the relationship they signal</h1>
      <p className={styles.heroLead}>
        A connector is not decoration. It is a claim about how two ideas relate, and the reader will
        hold you to it. Learn them by relationship — addition, contrast, cause, example, concession,
        comparison, closing — and the right word stops being a guess.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{LINKING_FAMILIES.length} families</strong><span>one page each, with its own exercises</span></div>
        <div className={styles.fact}><strong>{LINKING_FAMILIES.reduce((n, f) => n + f.connectors.length, 0)} connectors</strong><span>each with where it goes and how it is punctuated</span></div>
        <div className={styles.fact}><strong>{LINKING_FAMILIES.reduce((n, f) => n + f.drills.length, 0)} exercises</strong><span>plus a mixed test and a repair task</span></div>
        <div className={styles.fact}><strong>No auto-band</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Official criteria and WeLearn strategy</p>
        <h2>Cohesion is a criterion, not a list of transition phrases</h2>
      </div>
      <Task2OfficialReviewBlock
        focus="Choose connectors by the relationship between the ideas, not by variety."
        officialFormat="IELTS assesses Coherence and Cohesion across the whole response. Linking language is one part of that criterion, not a separate official task."
        welearnStrategy="WeLearn practises connectors by function, so the argument progresses instead of being decorated with a list of transition phrases."
        answerCheck="A strong response uses a connector because the relationship requires it. Nothing here is scored automatically."
      />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Start here</p>
        <h2>The seven relationships</h2>
        <p>Each page explains what the family signals, lists its connectors with the position and punctuation each one takes, shows worked examples, names the two mistakes it produces, and gives three exercises.</p>
      </div>
      <div className={styles.promptChoiceGrid}>
        {LINKING_FAMILIES.map((family) => (
          <Link key={family.slug} href={`/practica/ielts/academic/writing/task2/linking-language/${family.slug}`} className={styles.promptChoice}>
            <strong>{family.label} · {family.spanishName}</strong>
            <p>{family.signals.charAt(0).toUpperCase()}{family.signals.slice(1)}.</p>
            <small>{family.connectors.length} connectors · {family.examples.length} worked examples · {family.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <MixedQuiz />
    <LinkingEngine />
    <ParagraphRepair />

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/body-1"><ArrowLeft size={16} /> Build Body 1</Link>
      <Link href="/practica/ielts/academic/writing/task2/conclusion">Build the conclusion</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}

/**
 * El test mixto: ocho huecos sin decir de qué familia es cada uno.
 *
 * Es lo único que no puede vivir en una página de familia. Dentro de «contraste» ya sabes
 * que la respuesta es de contraste; aquí hay que leer la relación primero.
 */
function MixedQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [locked, setLocked] = useState(false);
  const [right, setRight] = useState(0);
  const [firstTry, setFirstTry] = useState(0);

  /**
   * Los hooks corren SIEMPRE, también en la vuelta final.
   *
   * Estaba como `MIXED_QUIZ[index]`, y al contestar la octava `index` pasa a 8: `question`
   * quedaba `undefined` y el `useMemo` de abajo —que corre antes del `return` de la pantalla
   * final, porque un hook no se puede saltar— reventaba con `question.options`. La página
   * entera se caía justo al terminar el test. Lo cazó el recorrido de Playwright al
   * comprobar que no se prometía ninguna banda: no encontró ni un solo `h2` en la página.
   */
  const question = MIXED_QUIZ[Math.min(index, MIXED_QUIZ.length - 1)];
  const options = useMemo(
    () => placeOption(question.options, question.options.indexOf(question.correct), 'linking-mixto', index).options,
    [question, index],
  );
  const isCorrect = selected === question.correct;
  const showHint = attempt > 0 && !locked && selected !== null && !isCorrect;
  const done = index >= MIXED_QUIZ.length;

  function choose(option: string) {
    if (locked) return;
    setSelected(option);
    if (option === question.correct) {
      setLocked(true); setRight((n) => n + 1);
      if (attempt === 0) setFirstTry((n) => n + 1);
    } else if (attempt === 0) setAttempt(1);
    else setLocked(true);
  }

  function next() { setIndex((i) => i + 1); setSelected(null); setAttempt(0); setLocked(false); }
  function restart() { setIndex(0); setSelected(null); setAttempt(0); setLocked(false); setRight(0); setFirstTry(0); }

  if (done) return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Mixed test · finished</p>
        <h2>{`${right} of ${MIXED_QUIZ.length} right, ${firstTry} of them first time`}</h2>
        {/* Ni una promesa de banda. Ocho conectores son una destreza, no una nota. */}
        <p>
          Eight connectors are one skill, not a band score — this page cannot see the rest of your
          writing. What the number tells you is which relationships you still have to look up.
        </p>
      </div>
      <div className={styles.workshopActions}>
        <button type="button" onClick={restart}><RotateCcw size={16} /> Take it again</button>
      </div>
    </section>
  );

  return (
    <section id="mixed-test" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Mixed test · {index + 1} of {MIXED_QUIZ.length}</p>
        <h2>Now without knowing which family it is</h2>
        <p>Inside a family page the answer is always from that family. Here you have to read the relationship first.</p>
      </div>
      <article className={styles.examplePanel}>
        <p className={styles.exercisePrompt}>{question.before} <strong>_______</strong>{question.after}</p>
        <div className={styles.optionGrid}>
          {options.map((option, position) => (
            <button key={option} type="button" onClick={() => choose(option)}
              className={`${styles.option} ${selected === option ? styles.selected : ''} ${locked && option === question.correct ? styles.correct : ''} ${locked && selected === option && option !== question.correct ? styles.incorrect : ''}`}>
              <span>{String.fromCharCode(65 + position)}</span>{option}
            </button>
          ))}
        </div>

        {showHint && <div className={`${styles.feedback} ${styles.feedbackNeutral}`}><div>
          <strong>Not that one — try again</strong>
          <p>Does the second half go the same way as the first, against it, or does it follow from it?</p>
        </div></div>}

        {locked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
          <CheckCircle2 size={20} />
          <div>
            <strong>{isCorrect ? `Correct — “${question.correct}”` : `The answer was “${question.correct}”`}</strong>
            <p>
              {isCorrect
                ? question.explanation
                : `“${selected}” signals that ${signalFor(selected ?? '')}. This sentence needs a connector that signals that ${signalFor(question.correct)}. ${question.explanation}`}
            </p>
          </div>
        </div>}

        <div className={styles.workshopActions}>
          <button type="button" onClick={next} disabled={!locked}>
            {index < MIXED_QUIZ.length - 1 ? 'Next' : 'See the result'} <ArrowRight size={16} />
          </button>
        </div>
        {!locked && <p className={styles.unlockHint}>Answer to move on. A first wrong attempt gives you a hint and a second try.</p>}
      </article>
    </section>
  );
}

/** Reparar un párrafo sobre-conectado: cinco fallos que hay que encontrar leyendo. */
function ParagraphRepair() {
  const [found, setFound] = useState<boolean[]>(() => FIX_PARAGRAPH.problems.map(() => false));
  const all = found.every(Boolean);

  return (
    <section id="repair" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Critical reading</p>
        <h2>Repair an over-linked paragraph</h2>
        <p>Five serious linking errors. Click each one to see what is wrong and how to fix it.</p>
      </div>
      <p className={styles.reviewDraft}>{FIX_PARAGRAPH.original}</p>
      <div className={styles.reviewGrid}>
        {FIX_PARAGRAPH.problems.map((problem, index) => (
          <button key={problem.label} type="button"
            className={`${styles.option} ${found[index] ? styles.correct : ''}`}
            onClick={() => setFound((current) => current.map((value, position) => position === index ? true : value))}>
            <span>{found[index] ? '✓' : index + 1}</span>
            {/* `div`, no `span`: la hoja convierte CUALQUIER span hijo directo de `.option`
                en un círculo de 26 px, así que el texto se comprimía y se pisaba a sí mismo. */}
            <div>
              {problem.label}
              {found[index] && <><br /><strong>Repair:</strong> {problem.fix}</>}
            </div>
          </button>
        ))}
      </div>
      {all && <p className={styles.paragraphJob}>
        <strong>All five found.</strong> {FIX_PARAGRAPH.repaired}
      </p>}
    </section>
  );
}
