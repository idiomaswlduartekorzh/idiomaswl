'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import Task2EssayTypeGuide from '../Task2EssayTypeGuide';
import Task2LegoGuide from '../Task2LegoGuide';
import { ESSAY_TYPES, type EssayTypeId } from '../introduccion/introduction-data';
import { MISREAD_CASES, TYPE_DRILLS, TYPE_OPTIONS, typeLabel } from './essay-type-drills';
import styles from '../introduccion/page.module.css';

/**
 * Sub-habilidad 1 — identificar el tipo de ensayo.
 *
 * QUÉ SE MIDIÓ Y QUÉ SE ARREGLÓ
 *
 *   · Las cinco primeras respuestas bajaban la rejilla en escalera (0,1,2,3,4): se acertaban
 *     sin leer. Ahora el orden de las preguntas está roto a propósito y `check:ielts-task2`
 *     lo vigila.
 *   · Cinco de nueve pistas imprimían el nombre del tipo correcto, así que el segundo intento
 *     era gratis y sumaba un punto. Ahora una pista solo dice DÓNDE mirar.
 *   · No había feedback por opción: el mismo párrafo para las cinco. Ahora cada opción
 *     equivocada explica por qué falla ELLA en ESE enunciado.
 *   · La insignia de dificultad salía de `qIdx < 4`, no del dato, y dos preguntas «Básico»
 *     se pintaban de «Intermedio». Ahora sale del dato.
 *   · Veinte menciones de banda: «este error te deja en tal banda», «haz esto y sacas tal
 *     otra». Ninguna página puede prometer una banda por acertar un test de cinco botones.
 *     Fuera las veinte, y el guardián falla si vuelve una.
 *   · La página traía DOS guías de los mismos cinco tipos: la compartida en inglés y una copia
 *     en español dentro de este fichero, que decían cosas distintas. Se quedó la compartida.
 *
 * Las cinco categorías se pintan siempre en el mismo orden, y eso es deliberado: son las
 * mismas cinco en cada pregunta, así que moverlas obliga a releer etiquetas ya conocidas sin
 * enseñar nada. Lo que delataba era el orden de las preguntas, no el de los botones.
 */

type Phase = 'guide' | 'quiz' | 'analysis' | 'done';

/**
 * Al cambiar de enunciado la vista vuelve arriba.
 *
 * Sin esto, pulsar «Start practice» al final de la referencia —que es larga— dejaba el
 * ejercicio con el migajero medio tapado por la cabecera del sitio: el navegador conserva el
 * desplazamiento y el contenido nuevo es mucho más corto. El enunciado va arriba del todo, así
 * que hay que llevar la vista ahí.
 */
const alPrincipio = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <div className={`${styles.feedback} ${ok ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
    <CheckCircle2 size={20} /><div>{children}</div>
  </div>;
}

/** La rejilla de las cinco categorías. Orden fijo: son siempre las mismas cinco. */
function TypeGrid({
  answer, selected, locked, onPick,
}: {
  answer: EssayTypeId;
  selected: EssayTypeId | null;
  locked: boolean;
  onPick: (id: EssayTypeId) => void;
}) {
  return <div className={styles.optionGrid}>
    {TYPE_OPTIONS.map((option) => {
      const isRight = option.id === answer;
      const isSelected = selected === option.id;
      return <button key={option.id} type="button" onClick={() => onPick(option.id)} disabled={locked}
        className={[
          styles.option,
          isSelected ? styles.selected : '',
          locked && isRight ? styles.correct : '',
          locked && isSelected && !isRight ? styles.incorrect : '',
        ].filter(Boolean).join(' ')}>
        <div>{option.label}</div>
      </button>;
    })}
  </div>;
}

export default function TipoEnsayoClient() {
  const [phase, setPhase] = useState<Phase>('guide');

  const [drillIndex, setDrillIndex] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [picked, setPicked] = useState<EssayTypeId | null>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const [caseIndex, setCaseIndex] = useState(0);
  const [casePick, setCasePick] = useState<EssayTypeId | null>(null);
  const [caseAttempt, setCaseAttempt] = useState(0);
  const [caseLocked, setCaseLocked] = useState(false);

  const drill = TYPE_DRILLS[drillIndex];
  const study = MISREAD_CASES[caseIndex];

  function pickType(id: EssayTypeId) {
    if (locked) return;
    setPicked(id);
    if (id === drill.answer) {
      setScore((current) => current + (attempt === 0 ? 2 : 1));
      setLocked(true);
    } else if (attempt === 0) {
      setAttempt(1);
    } else {
      setLocked(true);
    }
  }

  function nextDrill() {
    if (drillIndex < TYPE_DRILLS.length - 1) {
      setDrillIndex((current) => current + 1);
      setAttempt(0); setPicked(null); setLocked(false);
    } else {
      setPhase('analysis');
    }
    alPrincipio();
  }

  function pickCase(id: EssayTypeId) {
    if (caseLocked) return;
    setCasePick(id);
    if (id === study.wrote) setCaseLocked(true);
    else if (caseAttempt === 0) setCaseAttempt(1);
    else setCaseLocked(true);
  }

  function nextCase() {
    if (caseIndex < MISREAD_CASES.length - 1) {
      setCaseIndex((current) => current + 1);
      setCasePick(null); setCaseAttempt(0); setCaseLocked(false);
    } else {
      setPhase('done');
    }
    alPrincipio();
  }

  function restart() {
    setPhase('guide');
    setDrillIndex(0); setAttempt(0); setPicked(null); setLocked(false); setScore(0);
    setCaseIndex(0); setCasePick(null); setCaseAttempt(0); setCaseLocked(false);
    alPrincipio();
  }

  const maxScore = TYPE_DRILLS.length * 2;

  /* ── Referencia ──────────────────────────────────────────────────────────────────── */
  if (phase === 'guide') return (
    <div lang="en" className={styles.page}><div className={styles.shell}>
      <nav className={styles.breadcrumb}>
        <Link href="/practica/ielts/academic/writing/task2">← Task 2</Link>
        <span>Sub-skill 1 · Essay type</span>
      </nav>

      <header className={styles.hero}>
        <p className={styles.kicker}>Sub-skill 1</p>
        <h1>Read the instruction before you choose a structure</h1>
        <p className={styles.heroLead}>
          Task 2 is not marked on how much you know about the topic. It is marked on whether you answered the
          question that was asked. Every prompt ends with an instruction that says exactly what to produce, and
          the whole shape of the essay follows from it. Study the five instructions, then practise on ten
          prompts — four of which are written to be misread.
        </p>
      </header>

      <Task2OfficialReviewBlock
        focus="Reading the instruction at the end of the prompt before choosing a structure."
        officialFormat="IELTS Academic Writing Task 2 asks for an essay of at least 250 words in response to a question. The labels opinion, discussion, problem and solution, advantages and disadvantages, and direct questions are WeLearn teaching categories, not official IELTS names."
        welearnStrategy="We train type identification because the most expensive mistake in Task 2 is answering a question the prompt did not ask."
        answerCheck="The type is decided by the final instruction, never by the topic and never by how many views appear in the prompt."
      />

      <Task2EssayTypeGuide />
      <Task2LegoGuide />

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Before you practise</p>
          <h2>The one question worth asking of every prompt</h2>
          <p>
            What does the final instruction want me to produce — a position, two views, a diagnosis and a
            response, both sides of one thing, or answers to two separate questions? Everything else in the
            prompt is topic.
          </p>
        </div>

        <div className={styles.studyGrid}>
          {ESSAY_TYPES.map((type) => (
            <article key={type.id} className={styles.studyCard}>
              <p className={styles.typeTag}>{type.shortLabel}</p>
              <p className={styles.signal}>{type.signal}</p>
              <p>{type.mustAnswer}</p>
              <p className={styles.trap}><strong>Most common misread: </strong>{type.trap}</p>
            </article>
          ))}
        </div>

        <div className={styles.workshopActions}>
          <button type="button" onClick={() => { setPhase('quiz'); alPrincipio(); }}>
            Start practice — {TYPE_DRILLS.length} prompts <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div></div>
  );

  /* ── Práctica ────────────────────────────────────────────────────────────────────── */
  if (phase === 'quiz') {
    const isCorrect = picked === drill.answer;
    const showHint = attempt > 0 && !locked && picked !== null && !isCorrect;

    return (
      <div lang="en" className={styles.page}><div className={styles.shell}>
        <nav className={styles.breadcrumb}>
          <button type="button" onClick={() => { setPhase('guide'); alPrincipio(); }}>
            <ArrowLeft size={15} /> Reference
          </button>
          <span>/</span>
          <span>Prompt {drillIndex + 1} of {TYPE_DRILLS.length}</span>
        </nav>

        <section className={`${styles.section} ${styles.practiceSection}`}>
          <div className={styles.enginePanel}>
            <div className={styles.engineHeader}>
              <div>
                <h3>Which instruction is this?</h3>
                <p>{drill.tricky ? 'Commonly misread' : 'Clear signal'}</p>
              </div>
              <span>{drillIndex + 1}/{TYPE_DRILLS.length}</span>
            </div>

            <div className={styles.exerciseBody}>
              <p className={styles.sourcePrompt}>{drill.prompt}</p>
              <p className={styles.exerciseInstruction}>What does this prompt ask you to write?</p>

              <TypeGrid answer={drill.answer} selected={picked} locked={locked} onPick={pickType} />

              {/* Primer fallo: se dice DÓNDE mirar, nunca qué contestar. */}
              {showHint && <div className={`${styles.feedback} ${styles.feedbackNeutral}`} aria-live="polite">
                <div>
                  <strong>Not that one. Read it again:</strong>
                  <p>{drill.hint}</p>
                  <p>{drill.wrong[picked!]}</p>
                </div>
              </div>}

              {locked && <Feedback ok={isCorrect}>
                <strong>{isCorrect ? `Yes — ${typeLabel(drill.answer)}.` : `It was ${typeLabel(drill.answer)}.`}</strong>
                {!isCorrect && picked && <p>{drill.wrong[picked]}</p>}
                <p>{drill.why}</p>
                <p className={styles.signal}>The words that decide it: {drill.instruction}</p>
              </Feedback>}

              {locked && <div className={styles.workshopActions}>
                <button type="button" onClick={nextDrill}>
                  {drillIndex < TYPE_DRILLS.length - 1 ? 'Next prompt' : 'Critical reading'} <ArrowRight size={16} />
                </button>
              </div>}
            </div>

            <div className={styles.engineNav}>
              <span className={styles.wordMeter}>
                {drillIndex === 0 ? 'No prompts answered yet' : `${score} points from ${drillIndex} prompt${drillIndex > 1 ? 's' : ''}`}
              </span>
              <span className={styles.wordMeter}>Two points first try, one point second</span>
            </div>
          </div>
        </section>
      </div></div>
    );
  }

  /* ── Análisis crítico ────────────────────────────────────────────────────────────── */
  if (phase === 'analysis') {
    const isCorrect = casePick === study.wrote;
    const showHint = caseAttempt > 0 && !caseLocked && casePick !== null && !isCorrect;

    return (
      <div lang="en" className={styles.page}><div className={styles.shell}>
        <nav className={styles.breadcrumb}>
          <span>Critical reading · Case {caseIndex + 1} of {MISREAD_CASES.length}</span>
        </nav>

        <section className={`${styles.section} ${styles.practiceSection}`}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Critical reading</p>
            <h2>This essay answered a different question</h2>
            <p>
              Read the prompt, then read what the student actually wrote. The prompt asked for
              <strong> {typeLabel(study.required)}</strong>. Your job is to name the type the essay turned into.
            </p>
          </div>

          <div className={styles.enginePanel}>
            <div className={styles.exerciseBody}>
              <p className={styles.sourcePrompt}>{study.prompt}</p>

              <div className={styles.essaySoFar}>
                {study.essay.map((paragraph) => (
                  <p key={paragraph.label}>
                    <strong>{paragraph.label}: </strong>{paragraph.text}
                  </p>
                ))}
              </div>

              <p className={styles.exerciseInstruction}>Which type did the student actually write?</p>
              <TypeGrid answer={study.wrote} selected={casePick} locked={caseLocked} onPick={pickCase} />

              {showHint && <div className={`${styles.feedback} ${styles.feedbackNeutral}`} aria-live="polite">
                <div>
                  <strong>Not that one. Look at the essay again:</strong>
                  <p>{study.wrong[casePick!]}</p>
                </div>
              </div>}

              {caseLocked && <>
                <Feedback ok={isCorrect}>
                  <strong>{isCorrect ? `Yes — the essay is ${typeLabel(study.wrote)}.` : `The essay is ${typeLabel(study.wrote)}.`}</strong>
                  {!isCorrect && casePick && <p>{study.wrong[casePick]}</p>}
                  <p>{study.tell}</p>
                </Feedback>

                <div className={styles.mistakeNote}>
                  <p><strong>What it cost. </strong>{study.cost}</p>
                </div>

                <div className={styles.modelReveal}>
                  <p className={styles.paragraphLabel}>{study.fix.label}</p>
                  <p>{study.fix.text}</p>
                </div>

                <div className={styles.workshopActions}>
                  <button type="button" onClick={nextCase}>
                    {caseIndex < MISREAD_CASES.length - 1 ? 'Next case' : 'See your result'} <ArrowRight size={16} />
                  </button>
                </div>
              </>}
            </div>
          </div>
        </section>
      </div></div>
    );
  }

  /* ── Resultado ───────────────────────────────────────────────────────────────────── */
  return (
    <div lang="en" className={styles.page}><div className={styles.shell}>
      <section className={`${styles.section} ${styles.practiceSection}`}>
        <div className={styles.enginePanel}>
          <div className={styles.engineHeader}>
            <div><h3>Ten prompts, three essays</h3><p>Essay type</p></div>
            <span>{score}/{maxScore}</span>
          </div>
          <div className={styles.exerciseBody}>
            {/*
              Un número de aciertos, no una banda. Identificar el tipo es la primera decisión de
              Task 2, no la nota: el examinador puntúa el ensayo, no este test.
            */}
            <p className={styles.exerciseInstruction}>
              You scored {score} of {maxScore} on identification. That is a count of correct readings, not a
              band — the examiner marks the essay you write, not this exercise.
            </p>
            <p>
              What it does tell you: the prompts you had to read twice are the instructions to reread before
              your next timed essay. Nothing else in Task 2 can be repaired if this decision goes wrong.
            </p>

            <div className={styles.workshopActions}>
              <button type="button" className={styles.secondaryButton} onClick={restart}>
                <RotateCcw size={15} /> Start again
              </button>
              <Link href="/practica/ielts/academic/writing/task2/analisis-pregunta" className={styles.secondaryButton}>
                Sub-skill 2: analyse the prompt <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.nextLinks}>
          <Link href="/practica/ielts/academic/writing/task2/introduccion">Introduction</Link>
          <Link href="/practica/ielts/academic/writing/task2/linking-language">Linking language</Link>
          <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Write a full Task 2</Link>
        </div>
      </section>
    </div></div>
  );
}
