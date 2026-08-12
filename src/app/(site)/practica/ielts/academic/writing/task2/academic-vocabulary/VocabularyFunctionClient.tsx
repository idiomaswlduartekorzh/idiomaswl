'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { VOCAB_FUNCTIONS, RISK_LABEL, type VocabFunction } from './vocabulary-data';
import styles from '../introduccion/page.module.css';

/**
 * Una función del vocabulario, con el mismo recorrido que el resto de Task 2.
 *
 *   qué trabajo hace → vago frente a preciso → ¿cuál hace bien el trabajo?
 *   → las palabras con su patrón → ejemplos → los errores → ejercicios
 *
 * El bloque VAGO → PRECISO va lo primero, antes que las palabras. Es lo que David pidió —
 * enseñar por qué el vocabulario preciso puntúa más— y también el orden que funciona: una
 * lista de palabras antes de que se vea para qué sirven es una lista que se memoriza y no se
 * usa. Primero el problema, después el inventario.
 */

function Drill({ func, index }: { func: VocabFunction; index: number }) {
  const drill = func.drills[index];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const displayed = useMemo(
    () => placeOption(drill.options, drill.correct, `vocabulary|${func.slug}`, index),
    [drill, func.slug, index],
  );

  const isCorrect = selected === displayed.correct;

  return <article className={styles.examplePanel}>
    <p className={styles.exercisePrompt}>{drill.stem}</p>
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
 * Tres versiones de la misma frase; solo una hace bien el trabajo de esta función. Las otras
 * dos fallan por los dos motivos que ocurren de verdad: pasarse de fuerza y quedarse corto.
 */
function FunctionCheck({ func }: { func: VocabFunction }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { prompt, question, options } = func.check;

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Step 1 · the job</span><h3>{question}</h3></div>
      <button type="button" className={styles.iconButton} onClick={() => setChosen(null)} title="Reset" aria-label="Reset"><RotateCcw size={18} /></button>
    </div>
    <p className={styles.paragraphJob}><strong>The situation:</strong> {prompt}</p>
    <p className={styles.exerciseInstruction}>
      All three are grammatical English. Only one of them does the job this function exists for.
    </p>
    <div className={styles.continuationGrid}>
      {options.map((option, index) => (
        <button key={option.text} type="button" data-check={index}
          onClick={() => setChosen(index)}
          className={`${styles.option} ${chosen === index ? styles.selected : ''} ${chosen !== null && option.works ? styles.correct : ''} ${chosen === index && !option.works ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + index)}</span>
          <div>{option.text}</div>
        </button>
      ))}
    </div>
    {chosen !== null && <div className={`${styles.feedback} ${options[chosen].works ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status" aria-live="polite">
      <CheckCircle2 size={20} />
      <div>
        <strong>{options[chosen].works ? 'That is the one.' : 'That one does a different job.'}</strong>
        <p>{options[chosen].why}</p>
        {!options[chosen].works && <p><strong>Try another one</strong> — the options stay live.</p>}
      </div>
    </div>}
  </div>;
}

export default function VocabularyFunctionClient({ slug }: { slug: string }) {
  const func = VOCAB_FUNCTIONS.find((item) => item.slug === slug) ?? VOCAB_FUNCTIONS[0];
  const others = VOCAB_FUNCTIONS.filter((item) => item.slug !== func.slug);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <Link href="/practica/ielts/academic/writing/task2/academic-vocabulary">Academic vocabulary</Link>
      <span>/</span><span>{func.label}</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Academic vocabulary · {func.label}</p>
      <h1>{func.label} in academic English</h1>
      <p className={styles.heroLead}>
        This is the language that does one job: <strong>{func.job}</strong>. {func.whenToUse}
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{func.words.length} items</strong><span>each with the pattern it requires</span></div>
        <div className={styles.fact}><strong>{func.examples.length} worked examples</strong><span>with the word doing the work marked</span></div>
        <div className={styles.fact}><strong>{func.mistakes.length} common mistakes</strong><span>with the repair</span></div>
        <div className={styles.fact}><strong>{func.drills.length + 1} exercises</strong><span>recognition first, then production</span></div>
      </div>
    </header>

    <section id="upgrade" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Start here · why precise words score better</p>
        <h2>The same idea, twice</h2>
        <p>
          Lexical Resource is one of the four criteria, and it is not a count of long words. What it
          rewards is whether your word choice adds information — and the fastest way to see that is to
          watch one sentence become precise. Nothing was added below except accuracy.
        </p>
      </div>

      <div className={styles.mechanic}>
        <div className={`${styles.mechanicRow} ${styles[func.tone]}`}>
          <strong>Vague</strong>
          <p>{func.upgrade.vague}</p>
        </div>
        <div className={styles.mechanicHinge}><span>{func.label}</span></div>
        <div className={`${styles.mechanicRow} ${styles[func.tone]}`}>
          <strong>Precise</strong>
          <p>{func.upgrade.precise}</p>
        </div>
        <p className={styles.mechanicPlain}>{func.upgrade.why}</p>
      </div>

      <p className={styles.trap}>
        <strong>What the precise version earns</strong><br />
        {func.upgrade.earns.join(' · ')}. No page here promises anyone a score: these are the things
        the criterion actually looks at, and they are the things you can control.
      </p>
    </section>

    <section id="recognise" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Now you try · recognition first</p>
        <h2>Before you learn the words, learn the job</h2>
        <p>A word list memorised before you can see what it is for is a word list that gets used in the wrong place.</p>
      </div>
      <FunctionCheck func={func} />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The language</p>
        <h2>Each item, and the pattern it demands</h2>
        <p>
          Knowing a word and not its pattern is exactly what produces a sentence that reads like a
          translation. The preposition, the verb form and the article are the part that carries the marks.
        </p>
      </div>
      <div className={styles.reviewGrid}>
        {func.words.map((word) => (
          <article key={word.text} className={`${styles.legoBlock} ${styles[func.tone]}`}>
            <strong>{word.text}</strong>
            <p className={styles.comparisonNote}>{RISK_LABEL[word.risk]}</p>
            <p>{word.pattern}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Watch two · then do three</p>
        <h2>See the word doing its job in a real sentence</h2>
      </div>
      {func.examples.map((example) => (
        <article key={example.sentence.slice(0, 30)} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example · {example.doing}</div>
          <div className={styles.completeParagraph}><p>{example.sentence}</p></div>
          <p className={styles.mistakeNote}><strong>Why it works:</strong> {example.why}</p>
        </article>
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>What goes wrong</p>
        <h2>The mistakes this function produces</h2>
        <p>Most are collocation errors, not grammar errors — which is why no spell-checker will ever flag them.</p>
      </div>
      <div className={styles.reviewGrid}>
        {func.mistakes.map((mistake) => (
          <article key={mistake.wrong} className={styles.analysisCard}>
            <p className={styles.reviewDraft}>{mistake.wrong}</p>
            <p className={styles.comparisonNote}>{mistake.why}</p>
            <p className={styles.paragraphJob}><strong>Repaired:</strong> {mistake.right}</p>
          </article>
        ))}
      </div>
    </section>

    <section id="practice" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Step 2 · production</p>
        <h2>Choose the item that does the job and takes the right pattern</h2>
        <p>Every wrong option is wrong for its own reason, and it says so. Nothing here is scored automatically.</p>
      </div>
      {func.drills.map((_, index) => (
        <Drill key={`${func.slug}-${index}`} func={func} index={index} />
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The other functions</p>
        <h2>Seven more jobs for words to do</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        {others.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/academic-vocabulary/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label}</strong>
            <p>{item.job.charAt(0).toUpperCase()}{item.job.slice(1)}.</p>
            <small>{item.words.length} items · {item.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/academic-vocabulary"><ArrowLeft size={16} /> All eight functions</Link>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing">Paraphrasing</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Complete essay practice <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
