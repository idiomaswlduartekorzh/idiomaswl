'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import SkillExplainer from '../../_shared/SkillExplainer';
import GuidedPractice from '../../_shared/GuidedPractice';
import { PARAPHRASE_TECHNIQUES, RISK_LABEL, type ParaphraseTechnique } from './paraphrasing-data';
import { EXPLAINERS, GUIDED } from './paraphrasing-explainers';
import styles from '../introduccion/page.module.css';

/**
 * Una técnica de paráfrasis, con los cuatro bloques del blueprint de Writing.
 *
 *   1. EXPLICACIÓN LARGA  · qué es, dónde están las marcas, qué cuesta, dónde deja de aplicar
 *   2. EJEMPLOS           · la mecánica, los movimientos, tres resueltos y los errores típicos
 *   3. EJERCICIO GUIADO   · produces tú, por pasos, con el modelo detrás de un botón
 *   4. MOTOR              · reconocer primero, después elegir entre cuatro
 *
 * El orden importa y no estaba. Antes la página abría con dos párrafos y saltaba a elegir
 * entre opciones: quien no sabía lo que era una paráfrasis seguía sin saberlo y elegía a
 * ciegas. Y entre el ejemplo resuelto —que lo hace todo por ti— y el motor —que no te ayuda
 * en nada— faltaba el escalón intermedio.
 *
 * Dentro del bloque 4, el ejercicio de RECONOCIMIENTO va antes que el de producción. El fallo
 * característico de la paráfrasis no es escribir mal: es escribir bien otra cosa. Quien no
 * distingue «does not guarantee» de «never brings» no lo arregla produciendo más frases.
 */

function Drill({ technique, index }: { technique: ParaphraseTechnique; index: number }) {
  const drill = technique.drills[index];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  // Mismo reparto por bloques que el resto del curso, sembrado con algo único por técnica.
  const displayed = useMemo(
    () => placeOption(drill.options, drill.correct, `paraphrasing|${technique.slug}`, index),
    [drill, technique.slug, index],
  );

  const isCorrect = selected === displayed.correct;

  return <article className={styles.examplePanel}>
    <p className={styles.exercisePrompt}>
      <strong>Paraphrase this:</strong> {drill.original}
    </p>
    {/* Mismo gancho estable que en el motor: las pruebas leen la permutación por
        `data-option`, no por los nombres con hash del módulo CSS. */}
    <div className={styles.optionGrid}>
      {displayed.options.map((option, position) => (
        <button key={option.text} type="button" disabled={checked} data-option={position}
          onClick={() => !checked && setSelected(position)}
          aria-pressed={selected === position}
          className={`${styles.option} ${selected === position ? styles.selected : ''} ${checked && position === displayed.correct ? styles.correct : ''} ${checked && selected === position && position !== displayed.correct ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + position)}</span>
          <div>{option.text}</div>
        </button>
      ))}
    </div>

    <div className={styles.workshopHeader}>
      <button type="button" className={styles.secondaryButton} disabled={selected === null || checked}
        onClick={() => setChecked(true)}>
        {checked ? (isCorrect ? 'Correct' : 'See what happened') : 'Check answer'}
      </button>
      {!checked && selected === null && <span className={styles.comparisonNote}>Choose an option first</span>}
      {checked && <button type="button" className={styles.secondaryButton}
        onClick={() => { setSelected(null); setChecked(false); }}><RotateCcw size={15} /> Try it again</button>}
    </div>

    {/* Cada opción explica por qué falla ELLA. Una sola explicación para las cuatro fue el
        defecto que se corrigió en los ocho motores de Task 1: quien falla no aprende nada
        de un mensaje escrito para otra opción. */}
    {checked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status" aria-live="polite">
      <CheckCircle2 size={20} />
      <div>
        <strong>{isCorrect ? 'Good work.' : 'Not this one.'}</strong>
        <ul className={styles.optionGrid}>
          {displayed.options.map((option, position) => {
            const good = position === displayed.correct;
            return <li key={option.text} className={`${styles.legoBlock} ${good ? styles.correct : ''}`}>
              <strong>{String.fromCharCode(65 + position)}{good ? ' · correct' : ''}{position === selected && !good ? ' · you chose this' : ''}</strong>
              <p>{option.why}</p>
            </li>;
          })}
        </ul>
      </div>
    </div>}
  </article>;
}

/**
 * Primero reconocer, después producir.
 *
 * Tres paráfrasis del mismo original; solo una conserva el significado. Las otras dos fallan
 * por los dos motivos reales: subir la fuerza de la afirmación, y perder algo que el original
 * sí decía.
 */
function MeaningCheck({ technique }: { technique: ParaphraseTechnique }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { original, options } = technique.meaningCheck;

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Step 1 · the meaning</span><h3>Which one still says the same thing?</h3></div>
      <button type="button" className={styles.iconButton} onClick={() => setChosen(null)} title="Reset" aria-label="Reset"><RotateCcw size={18} /></button>
    </div>
    <p className={styles.paragraphJob}><strong>The sentence you have:</strong> {original}</p>
    <p className={styles.exerciseInstruction}>
      All three are written in good English. Only one of them makes the same claim as the original.
      Find it before you write a single paraphrase of your own.
    </p>
    <div className={styles.continuationGrid}>
      {options.map((option, index) => (
        <button key={option.text} type="button"
          onClick={() => setChosen(index)}
          className={`${styles.option} ${chosen === index ? styles.selected : ''} ${chosen !== null && option.keeps ? styles.correct : ''} ${chosen === index && !option.keeps ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + index)}</span>
          <div>{option.text}</div>
        </button>
      ))}
    </div>
    {chosen !== null && <div className={`${styles.feedback} ${options[chosen].keeps ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status" aria-live="polite">
      <CheckCircle2 size={20} />
      <div>
        <strong>{options[chosen].keeps ? 'That is the one.' : 'That one changed the claim.'}</strong>
        <p>{options[chosen].why}</p>
        {!options[chosen].keeps && <p><strong>Try another one</strong> — the options stay live.</p>}
      </div>
    </div>}
  </div>;
}

export default function ParaphrasingTechniqueClient({ slug }: { slug: string }) {
  const technique = PARAPHRASE_TECHNIQUES.find((item) => item.slug === slug) ?? PARAPHRASE_TECHNIQUES[0];
  const others = PARAPHRASE_TECHNIQUES.filter((item) => item.slug !== technique.slug);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing">Paraphrasing</Link>
      <span>/</span><span>{technique.label}</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Paraphrasing · {technique.label}</p>
      <h1>{technique.label} in English paraphrasing</h1>
      <p className={styles.heroLead}>
        With this technique, <strong>{technique.signals}</strong>. {technique.whenToUse}
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>The long version</strong><span>what it is, what it costs, where it stops</span></div>
        <div className={styles.fact}><strong>{technique.examples.length + technique.moves.length} examples</strong><span>{technique.moves.length} moves and {technique.examples.length} worked rewrites</span></div>
        <div className={styles.fact}><strong>Guided practice</strong><span>{GUIDED[technique.slug].steps.length} steps, you write, then you compare</span></div>
        <div className={styles.fact}><strong>{technique.drills.length + 1} exercises</strong><span>meaning first, then production</span></div>
      </div>
    </header>

    {/* BLOQUE 1 — la explicación larga. */}
    <SkillExplainer
      explainer={EXPLAINERS[technique.slug]}
      tone={technique.tone}
      heading={`What ${technique.label.toLowerCase()} really asks you to do`}
    />

    {/* BLOQUE 2 — los ejemplos, empezando por la mecánica en dos frases. */}
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Examples · the move in two sentences</p>
        <h2>A paraphrase changes the words and keeps the claim</h2>
        <p>
          That is the whole job, and it is harder than it sounds: the fastest way to lose marks is to
          write something in better English than the prompt that no longer says what the prompt said.
          Here is what this particular technique moves.
        </p>
      </div>

      <div className={styles.mechanic}>
        <div className={`${styles.mechanicRow} ${styles[technique.tone]}`}>
          <strong>The original</strong>
          <p>{technique.howItWorks.original}</p>
        </div>
        <div className={styles.mechanicHinge}>
          <span>{technique.label}</span>
        </div>
        <div className={`${styles.mechanicRow} ${styles[technique.tone]}`}>
          <strong>The paraphrase</strong>
          <p>{technique.howItWorks.rewritten}</p>
        </div>
        <p className={styles.mechanicPlain}>{technique.howItWorks.plain}</p>
      </div>

      <p className={styles.trap}>
        <strong>When you need it</strong><br />{technique.whenToUse}
      </p>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The moves</p>
        <h2>What you can change, and where the meaning breaks</h2>
        <p>Not every move is equally safe. Three of these you can make without thinking; the last two are where paraphrases stop being paraphrases.</p>
      </div>
      <div className={styles.reviewGrid}>
        {technique.moves.map((move) => (
          <article key={move.text} className={`${styles.legoBlock} ${styles[technique.tone]}`}>
            <strong>{move.text}</strong>
            <p className={styles.comparisonNote}>{RISK_LABEL[move.risk]}</p>
            <p>{move.usage}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Watch three · then do four</p>
        <h2>Follow every word that moved</h2>
        <p>Each example lists exactly what changed, so you can check the claim survived the journey.</p>
      </div>
      {technique.examples.map((example) => (
        <article key={example.rewritten.slice(0, 30)} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example · {technique.label}</div>
          <div className={styles.completeParagraph}>
            <p><strong>Original:</strong> {example.original}</p>
            <p><strong>Paraphrase:</strong> {example.rewritten}</p>
          </div>
          <p className={styles.paragraphJob}><strong>What moved:</strong> {example.moved}</p>
          <p className={styles.mistakeNote}><strong>Why this works:</strong> {example.why}</p>
        </article>
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>What goes wrong</p>
        <h2>The mistakes this technique produces</h2>
        <p>
          These are real sentences from a WeLearn classroom, not invented errors. Most of them are
          calques: English words in a Spanish shape, which is exactly what paraphrasing under time
          pressure produces.
        </p>
      </div>
      <div className={styles.reviewGrid}>
        {technique.mistakes.map((mistake) => (
          <article key={mistake.wrong} className={styles.analysisCard}>
            <p className={styles.reviewDraft}>{mistake.wrong}</p>
            <p className={styles.comparisonNote}>{mistake.why}</p>
            <p className={styles.paragraphJob}><strong>Repaired:</strong> {mistake.right}</p>
          </article>
        ))}
      </div>
    </section>

    {/* BLOQUE 3 — el ejercicio guiado: el escalón entre el ejemplo y el motor. */}
    <GuidedPractice exercise={GUIDED[technique.slug]} />

    {/* BLOQUE 4 — el motor: reconocer primero, elegir después. */}
    <section id="meaning" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · step 1, the meaning</p>
        <h2>Before you judge a rewrite, learn to spot what changed</h2>
        <p>
          Producing a paraphrase is the second skill. The first is noticing when a sentence that reads
          perfectly well has quietly stopped saying the same thing.
        </p>
      </div>
      <MeaningCheck technique={technique} />
    </section>

    <section id="practice" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · step 2, production</p>
        <h2>Choose the paraphrase that moves everything and changes nothing</h2>
        <p>
          Every wrong option here is wrong for its own reason, and it says so. Three of them are
          grammatical English — that is the point. Nothing on this page is scored automatically.
        </p>
      </div>
      {technique.drills.map((_, index) => (
        <Drill key={`${technique.slug}-${index}`} technique={technique} index={index} />
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The other techniques</p>
        <h2>Four more ways to move a sentence</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        {others.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/paraphrasing/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label}</strong>
            <p>{item.signals.charAt(0).toUpperCase()}{item.signals.slice(1)}.</p>
            <small>{item.moves.length} moves · {item.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing"><ArrowLeft size={16} /> All five techniques</Link>
      <Link href="/practica/ielts/academic/writing/task2/introduccion">Build the introduction</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
