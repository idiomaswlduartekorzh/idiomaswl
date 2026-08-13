'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import SkillExplainer from '../_shared/SkillExplainer';
import GuidedPractice from '../_shared/GuidedPractice';
import { RISK_LABEL, countEntries, type VocabUnit } from './vocabulary-types';
import { VOCAB_UNITS, FAMILY_LABEL } from './vocabulary-index';
import styles from '../task2/introduccion/page.module.css';

/**
 * Una unidad del superhub de vocabulario, con los cuatro bloques del blueprint.
 *
 *   1. EXPLICACIÓN LARGA · 2. EJEMPLOS (banco + resueltos + errores) · 3. GUIADO · 4. MOTOR
 *
 * El banco va entre la explicación y los ejemplos resueltos a propósito. Es lo que alguien
 * viene a consultar mientras escribe, así que tiene que estar donde se encuentra rápido, y
 * agrupado por trabajo en vez de en una lista: «verbos de subida», «cómo de rápido», «picos y
 * suelos». Una lista alfabética de cuarenta palabras se lee una vez y no se usa nunca.
 */

function Drill({ unit, index }: { unit: VocabUnit; index: number }) {
  const drill = unit.drills[index];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const displayed = useMemo(
    () => placeOption(drill.options, drill.correct, `vocabulario|${unit.slug}`, index),
    [drill, unit.slug, index],
  );
  const isCorrect = selected === displayed.correct;

  return <article className={styles.examplePanel}>
    <p className={styles.exercisePrompt}>{drill.stem}</p>
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

export default function VocabularyUnitClient({ slug }: { slug: string }) {
  const unit = VOCAB_UNITS.find((item) => item.slug === slug) ?? VOCAB_UNITS[0];
  const others = VOCAB_UNITS.filter((item) => item.slug !== unit.slug);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing"><ArrowLeft size={15} /> Academic Writing</Link>
      <span>/</span>
      <Link href="/practica/ielts/academic/writing/vocabulario">Vocabulary</Link>
      <span>/</span><span>{unit.label}</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{FAMILY_LABEL[unit.family]}</p>
      <h1>{unit.label} — the words this part of the exam actually needs</h1>
      <p className={styles.heroLead}>
        This is the language for one job: <strong>{unit.job}</strong>. {unit.whenToUse}
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>The long version</strong><span>what it is, what it costs, where it stops</span></div>
        <div className={styles.fact}><strong>{countEntries(unit)} entries</strong><span>in {unit.groups.length} groups, each with its pattern</span></div>
        <div className={styles.fact}><strong>Guided practice</strong><span>{unit.guided.steps.length} steps, you write, then you compare</span></div>
        <div className={styles.fact}><strong>{unit.drills.length} exercises</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    {/* BLOQUE 1 */}
    <SkillExplainer explainer={unit.explainer} tone={unit.tone} heading={`What ${unit.label.toLowerCase()} really asks you to write`} />

    {/* BLOQUE 2 — el comparador, el banco y los resueltos. */}
    <section id="upgrade" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Examples · why precise words score better</p>
        <h2>The same sentence, twice</h2>
        <p>
          Lexical Resource is not a count of long words: it assesses range, precision and control.
          The fastest way to see that is to watch one sentence become precise. Nothing was added below
          except accuracy.
        </p>
      </div>
      <div className={styles.mechanic}>
        <div className={`${styles.mechanicRow} ${styles[unit.tone]}`}><strong>Vague</strong><p>{unit.upgrade.vague}</p></div>
        <div className={styles.mechanicHinge}><span>{unit.label}</span></div>
        <div className={`${styles.mechanicRow} ${styles[unit.tone]}`}><strong>Precise</strong><p>{unit.upgrade.precise}</p></div>
        <p className={styles.mechanicPlain}>{unit.upgrade.why}</p>
      </div>
      <p className={styles.trap}>
        <strong>What the precise version earns</strong><br />
        {unit.upgrade.earns.join(' · ')}. No page here promises anyone a score: these are the things
        the criterion looks at, and they are the things you can control.
      </p>
    </section>

    <section id="bank" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The bank · grouped by the job each word does</p>
        <h2>{countEntries(unit)} entries, and the pattern each one demands</h2>
        <p>
          Knowing a word and not its pattern is what produces a sentence that reads like a translation.
          The preposition, the verb form and the article are the part that carries the marks.
        </p>
      </div>
      {unit.groups.map((group) => (
        <article key={group.label} className={styles.examplePanel}>
          <div className={styles.workedBadge}>{group.label}</div>
          <p className={styles.paragraphJob}>{group.purpose}</p>
          <div className={styles.reviewGrid}>
            {group.entries.map((entry) => (
              <article key={entry.text} className={`${styles.legoBlock} ${styles[unit.tone]}`}>
                <strong>{entry.text}</strong>
                <p className={styles.comparisonNote}>{RISK_LABEL[entry.risk]}</p>
                <p>{entry.pattern}</p>
                {entry.example && <p className={styles.mistakeNote}>{entry.example}</p>}
              </article>
            ))}
          </div>
        </article>
      ))}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Watch two · then the mistakes</p>
        <h2>The words doing their job in a real sentence</h2>
      </div>
      {unit.examples.map((example) => (
        <article key={example.sentence.slice(0, 30)} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example · {example.doing}</div>
          <div className={styles.completeParagraph}><p>{example.sentence}</p></div>
          <p className={styles.mistakeNote}><strong>Why it works:</strong> {example.why}</p>
        </article>
      ))}
      <div className={styles.reviewGrid}>
        {unit.mistakes.map((mistake) => (
          <article key={mistake.wrong} className={styles.analysisCard}>
            <p className={styles.reviewDraft}>{mistake.wrong}</p>
            <p className={styles.comparisonNote}>{mistake.why}</p>
            <p className={styles.paragraphJob}><strong>Repaired:</strong> {mistake.right}</p>
          </article>
        ))}
      </div>
    </section>

    {/* BLOQUE 3 */}
    <GuidedPractice exercise={unit.guided} />

    {/* BLOQUE 4 */}
    <section id="practice" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · production</p>
        <h2>Choose the word that does the job and takes the right pattern</h2>
        <p>Every wrong option is wrong for its own reason, and it says so. Nothing here is scored automatically.</p>
      </div>
      {unit.drills.map((_, index) => <Drill key={`${unit.slug}-${index}`} unit={unit} index={index} />)}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The rest of the vocabulary</p>
        <h2>Where else these words are needed</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        {others.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/vocabulario/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label}</strong>
            <p>{item.job.charAt(0).toUpperCase()}{item.job.slice(1)}.</p>
            <small>{countEntries(item)} entries · {item.drills.length} exercises</small>
          </Link>
        ))}
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/vocabulario"><ArrowLeft size={16} /> All vocabulary</Link>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing">Paraphrasing</Link>
      <Link href="/practica/ielts/academic/writing/task2/linking-language">Linking language <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
