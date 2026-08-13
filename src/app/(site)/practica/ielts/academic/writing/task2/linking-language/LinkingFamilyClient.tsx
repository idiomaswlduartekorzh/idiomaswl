'use client';

import { Fragment, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import SkillExplainer from '../../_shared/SkillExplainer';
import GuidedPractice from '../../_shared/GuidedPractice';
import { LINKING_FAMILIES, signalFor, type LinkingFamily } from './linking-data';
import { LINKING_EXPLAINERS, LINKING_GUIDED } from './linking-explainers';
import styles from '../introduccion/page.module.css';

/**
 * Una familia de conectores, con la misma estructura que el resto de Task 2.
 *
 * `/linking-language` era una sola página que iba directa al quiz. David: «la estructura no
 * es como la de los demás, deberíamos acá explicar cómo se usan, mostrar ejemplos, y dar
 * ejercicios y luego el motor», y que valiera «para la gente que necesite conjunciones en
 * general». Así que cada familia tiene su URL y su recorrido completo:
 *
 *   qué relación señala → cuándo se usa → los conectores con su nota de uso
 *   → ejemplos resueltos → los dos errores típicos → tres ejercicios
 *
 * La nota de uso es lo que más falta hace y lo que menos se enseña: «however» y «but»
 * significan lo mismo y no se puntúan igual, y de ahí sale el error de coma más repetido
 * del Task 2.
 */

const REGISTER_LABEL: Record<string, string> = {
  formal: 'Formal',
  neutral: 'Neutral',
  informal: 'Informal',
};

function Drill({ family, index }: { family: LinkingFamily; index: number }) {
  const drill = family.drills[index];
  const [selected, setSelected] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [locked, setLocked] = useState(false);

  // Mismo barajado que el resto del curso: por bloques, sembrado con algo único.
  const options = useMemo(
    () => placeOption(drill.options, drill.options.indexOf(drill.correct), `linking|${family.slug}`, index).options,
    [drill, family.slug, index],
  );

  const isCorrect = selected === drill.correct;
  const showHint = attempt > 0 && !locked && selected !== null && !isCorrect;

  function choose(option: string) {
    if (locked) return;
    setSelected(option);
    if (option === drill.correct) setLocked(true);
    else if (attempt === 0) setAttempt(1);
    else setLocked(true);
  }

  function reset() { setSelected(null); setAttempt(0); setLocked(false); }

  return <article className={styles.examplePanel}>
    <p className={styles.exercisePrompt}>
      {drill.before} <strong>_______</strong>{drill.after}
    </p>
    <div className={styles.optionGrid}>
      {options.map((option, position) => (
        <button key={option} type="button" onClick={() => choose(option)}
          className={`${styles.option} ${selected === option ? styles.selected : ''} ${locked && option === drill.correct ? styles.correct : ''} ${locked && selected === option && option !== drill.correct ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + position)}</span>{option}
        </button>
      ))}
    </div>

    {showHint && <div className={`${styles.feedback} ${styles.feedbackNeutral}`}>
      <div>
        <strong>Not that one — try again</strong>
        <p>Read the two halves again. Does the second one go the same way as the first, against it, or does it follow from it?</p>
      </div>
    </div>}

    {locked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
      <CheckCircle2 size={20} />
      <div>
        <strong>{isCorrect ? `Correct — “${drill.correct}”` : `The answer was “${drill.correct}”`}</strong>
        {/* El mensaje es el del conector que ELIGIÓ, no uno común: cada conector señala una
            relación distinta, y eso es exactamente lo que hay que aprender a distinguir. */}
        <p>
          {isCorrect
            ? `Here the second half ${signalFor(drill.correct)}, which is what “${drill.correct}” signals.`
            : `“${selected}” signals that ${signalFor(selected ?? '')}. This sentence needs a connector that signals that ${signalFor(drill.correct)}.`}
        </p>
        <button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={15} /> Try it again</button>
      </div>
    </div>}
  </article>;
}


/**
 * Primero la relación, después la palabra.
 *
 * David: «acá quedó, por ejemplo, la oración, luego qué oración va después y por qué va esa
 * oración». Este ejercicio no tiene conectores en las opciones a propósito: lo que se
 * practica es notar hacia dónde va la segunda frase, que es lo que decide el conector.
 * Elegir la palabra primero es lo que convierte los conectores en decoración.
 */
function RelationDrill({ family }: { family: LinkingFamily }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { stem, options } = family.continuation;

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Step 1 · the relationship</span><h3>Which sentence comes next — and why that one?</h3></div>
      <button type="button" className={styles.iconButton} onClick={() => setChosen(null)} title="Reset" aria-label="Reset"><RotateCcw size={18} /></button>
    </div>
    <p className={styles.paragraphJob}><strong>The sentence you have:</strong> {stem}</p>
    <p className={styles.exerciseInstruction}>
      Three sentences could follow. Only one of them {family.signals}. Choose it before you think about any connector.
    </p>
    <div className={styles.continuationGrid}>
      {options.map((option, index) => (
        <button key={option.text} type="button"
          onClick={() => setChosen(index)}
          className={`${styles.option} ${chosen === index ? styles.selected : ''} ${chosen !== null && option.fits ? styles.correct : ''} ${chosen === index && !option.fits ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + index)}</span>
          <div>{option.text}</div>
        </button>
      ))}
    </div>
    {chosen !== null && <div className={`${styles.feedback} ${options[chosen].fits ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
      <CheckCircle2 size={20} />
      <div>
        <strong>{options[chosen].fits ? 'That is the one.' : 'That is a different relationship.'}</strong>
        <p>{options[chosen].why}</p>
        {!options[chosen].fits && <p><strong>Try another one</strong> — the options stay live.</p>}
      </div>
    </div>}
  </div>;
}

export default function LinkingFamilyClient({ slug }: { slug: string }) {
  const family = LINKING_FAMILIES.find((item) => item.slug === slug) ?? LINKING_FAMILIES[0];
  const others = LINKING_FAMILIES.filter((item) => item.slug !== family.slug);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <Link href="/practica/ielts/academic/writing/task2/linking-language">Linking language</Link>
      <span>/</span><span>{family.label}</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Linking language · {family.label}</p>
      <h1>{family.label} connectors in English</h1>
      <p className={styles.heroLead}>
        These connectors tell the reader that <strong>{family.signals}</strong>. {family.whenToUse}
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{family.connectors.length} connectors</strong><span>each with where it goes and how it is punctuated</span></div>
        <div className={styles.fact}><strong>{family.examples.length} worked examples</strong><span>the relationship, explained</span></div>
        <div className={styles.fact}><strong>{family.mistakes.length} common mistakes</strong><span>with the repair</span></div>
        <div className={styles.fact}><strong>{family.drills.length + 1} exercises</strong><span>relationship first, then the word</span></div>
      </div>
    </header>

    {/* BLOQUE 1 del blueprint — la explicación larga. Lo de abajo ya existía y no se toca. */}
    <SkillExplainer
      explainer={LINKING_EXPLAINERS[family.slug]}
      tone={family.tone}
      heading={`What ${family.label.toLowerCase()} connectors really claim`}
    />

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Examples · what these words actually do</p>
        <h2>A connector joins two sentences and names the relationship between them</h2>
        <p>
          That is the whole job. The words are not decoration and they are not interchangeable: each one
          makes a claim about how the second sentence relates to the first, and the reader will read it
          that way whether you meant it or not. Here is what this family claims.
        </p>
      </div>

      <div className={styles.mechanic}>
        <div className={`${styles.mechanicRow} ${styles[family.tone]}`}>
          <strong>First sentence</strong>
          <p>{family.howItWorks.first}</p>
        </div>
        <div className={styles.mechanicHinge}>
          <span>{family.connectors[0].text}</span>
        </div>
        <div className={`${styles.mechanicRow} ${styles[family.tone]}`}>
          <strong>Second sentence</strong>
          <p>{family.howItWorks.second}</p>
        </div>
        <p className={styles.mechanicPlain}>{family.howItWorks.plain}</p>
      </div>

      <p className={styles.trap}>
        <strong>When you need it</strong><br />{family.whenToUse}
      </p>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The connectors</p>
        <h2>Where each one goes, and how it is punctuated</h2>
        <p>They do not all behave the same way. Two connectors can mean the same thing and still be written differently — that is where most linking errors come from.</p>
      </div>
      <div className={styles.reviewGrid}>
        {family.connectors.map((connector) => (
          <article key={connector.text} className={`${styles.legoBlock} ${styles[family.tone]}`}>
            <strong>{connector.text}</strong>
            <p className={styles.comparisonNote}>{REGISTER_LABEL[connector.register]}</p>
            <p>{connector.usage}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Watch one · then do three</p>
        <h2>See the relationship before you choose the word</h2>
        <p>The connector is not a decoration. It is a claim about how the two halves relate, and the reader will hold you to it.</p>
      </div>
      {family.examples.map((example) => (
        <article key={example.connector + example.after.slice(0, 20)} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example · {example.connector}</div>
          <div className={styles.completeParagraph}>
            <p>{example.before}</p>
            <p><strong>{example.connector}</strong>{example.after.startsWith(example.connector) ? '' : ','} {example.after.startsWith(example.connector) ? example.after.slice(example.connector.length).replace(/^[,\s]+/, '') : example.after}</p>
          </div>
          <p className={styles.mistakeNote}><strong>Why this one:</strong> {example.why}</p>
        </article>
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>What goes wrong</p>
        <h2>The two mistakes this family produces</h2>
      </div>
      <div className={styles.reviewGrid}>
        {family.mistakes.map((mistake) => (
          <article key={mistake.wrong} className={styles.analysisCard}>
            <p className={styles.reviewDraft}>{mistake.wrong}</p>
            <p className={styles.comparisonNote}>{mistake.why}</p>
            <p className={styles.paragraphJob}><strong>Repaired:</strong> {mistake.right}</p>
          </article>
        ))}
      </div>
    </section>

    {/* BLOQUE 3 del blueprint — el escalón entre el ejemplo y el ejercicio de opción. */}
    <GuidedPractice exercise={LINKING_GUIDED[family.slug]} />

    <section id="relationship" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · step 1, the relationship</p>
        <h2>Before the word, the direction</h2>
        <p>Choosing the connector is the second decision. The first one is noticing where the next sentence is going.</p>
      </div>
      <RelationDrill family={family} />
    </section>

    <section id="practice" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · step 2, the word</p>
        <h2>Choose the connector the sentence actually needs</h2>
        <p>
          Now that you can see the direction, pick the word that announces it. The first wrong answer
          gives you a hint and a second attempt, and every wrong option explains what it would have
          signalled instead. Nothing here is scored.
        </p>
      </div>
      {family.drills.map((_, index) => (
        <Drill key={`${family.slug}-${index}`} family={family} index={index} />
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The other families</p>
        <h2>Six more relationships to learn</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        {others.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/linking-language/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label}</strong>
            <p>{item.signals.charAt(0).toUpperCase()}{item.signals.slice(1)}.</p>
            <small>{item.connectors.length} connectors · {item.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/linking-language"><ArrowLeft size={16} /> All seven families</Link>
      <Link href="/practica/ielts/academic/writing/task2/body-1">Build Body 1</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}

/** Se exporta para que el hub pinte las mismas fichas sin duplicar el marcado. */
export function FamilyGrid() {
  return <div className={styles.promptChoiceGrid}>
    {LINKING_FAMILIES.map((item) => (
      <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/linking-language/${item.slug}`} className={styles.promptChoice}>
        <strong>{item.label} · {item.spanishName}</strong>
        <p>{item.signals.charAt(0).toUpperCase()}{item.signals.slice(1)}.</p>
        <small>{item.connectors.length} connectors · {item.examples.length} worked examples · {item.drills.length} exercises</small>
      </Link>
    ))}
  </div>;
}

export { Fragment };
