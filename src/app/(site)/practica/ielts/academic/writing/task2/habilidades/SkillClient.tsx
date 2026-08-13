'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import SkillExplainer from '../../_shared/SkillExplainer';
import GuidedPractice from '../../_shared/GuidedPractice';
import { TRANSFERABLE_SKILLS, type TransferableSkill } from './skills-data';
import styles from '../introduccion/page.module.css';

/**
 * Una habilidad transversal, con los cuatro bloques del blueprint.
 *
 * Estas siete eran fichas que enlazaban a una etapa. Para navegar valía; para aprender la
 * habilidad no, porque la etapa enseña a montar un párrafo y la habilidad atraviesa todos.
 * La ficha sigue llevando a su etapa —`practisedIn`— pero ahora desde una página que primero
 * enseña la habilidad.
 */

function Drill({ skill, index }: { skill: TransferableSkill; index: number }) {
  const drill = skill.drills[index];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const displayed = useMemo(
    () => placeOption(drill.options, drill.correct, `habilidad|${skill.slug}`, index),
    [drill, skill.slug, index],
  );
  const isCorrect = selected === displayed.correct;

  return <article className={styles.examplePanel}>
    <p className={styles.exercisePrompt}>{drill.stem}</p>
    <div className={styles.optionGrid}>
      {displayed.options.map((option, position) => (
        <button key={option.text} type="button" disabled={checked} data-option={position}
          onClick={() => !checked && setSelected(position)} aria-pressed={selected === position}
          className={`${styles.option} ${selected === position ? styles.selected : ''} ${checked && position === displayed.correct ? styles.correct : ''} ${checked && selected === position && position !== displayed.correct ? styles.incorrect : ''}`}>
          <span>{String.fromCharCode(65 + position)}</span><div>{option.text}</div>
        </button>
      ))}
    </div>
    <div className={styles.workshopHeader}>
      <button type="button" className={styles.secondaryButton} disabled={selected === null || checked}
        onClick={() => setChecked(true)}>{checked ? (isCorrect ? 'Correct' : 'See what happened') : 'Check answer'}</button>
      {!checked && selected === null && <span className={styles.comparisonNote}>Choose an option first</span>}
      {checked && <button type="button" className={styles.secondaryButton}
        onClick={() => { setSelected(null); setChecked(false); }}><RotateCcw size={15} /> Try it again</button>}
    </div>
    {checked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status" aria-live="polite">
      <CheckCircle2 size={20} />
      <div><strong>{isCorrect ? 'Good work.' : 'Not this one.'}</strong>
        <ul className={styles.optionGrid}>
          {displayed.options.map((option, position) => {
            const good = position === displayed.correct;
            return <li key={option.text} className={`${styles.legoBlock} ${good ? styles.correct : ''}`}>
              <strong>{String.fromCharCode(65 + position)}{good ? ' · correct' : ''}{position === selected && !good ? ' · you chose this' : ''}</strong>
              <p>{option.why}</p></li>;
          })}
        </ul>
      </div>
    </div>}
  </article>;
}

export default function SkillClient({ slug }: { slug: string }) {
  const skill = TRANSFERABLE_SKILLS.find((item) => item.slug === slug) ?? TRANSFERABLE_SKILLS[0];
  const others = TRANSFERABLE_SKILLS.filter((item) => item.slug !== skill.slug);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span><span>{skill.label}</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>Task 2 · Cross-cutting skill</p>
      <h1>{skill.label} — the skill, not the paragraph</h1>
      <p className={styles.heroLead}>This does one job: <strong>{skill.job}</strong>. {skill.whenToUse}</p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>The long version</strong><span>what it is, what it costs, where it stops</span></div>
        <div className={styles.fact}><strong>{skill.examples.length + skill.mistakes.length} examples</strong><span>worked, and the mistakes with their repair</span></div>
        <div className={styles.fact}><strong>Guided practice</strong><span>{skill.guided.steps.length} steps, you write, then you compare</span></div>
        <div className={styles.fact}><strong>{skill.drills.length} exercises</strong><span>every wrong option explains itself</span></div>
      </div>
    </header>

    <SkillExplainer explainer={skill.explainer} tone={skill.tone} heading={`What ${skill.label.toLowerCase()} really asks you to do`} />

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Examples · watch, then the mistakes</p>
        <h2>The skill working, and the two ways it fails</h2>
      </div>
      {skill.examples.map((example) => (
        <article key={example.sentence.slice(0, 30)} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example · {example.doing}</div>
          <div className={styles.completeParagraph}><p>{example.sentence}</p></div>
          <p className={styles.mistakeNote}><strong>Why it works:</strong> {example.why}</p>
        </article>
      ))}
      <div className={styles.reviewGrid}>
        {skill.mistakes.map((mistake) => (
          <article key={mistake.wrong} className={styles.analysisCard}>
            <p className={styles.reviewDraft}>{mistake.wrong}</p>
            <p className={styles.comparisonNote}>{mistake.why}</p>
            <p className={styles.paragraphJob}><strong>Repaired:</strong> {mistake.right}</p>
          </article>
        ))}
      </div>
    </section>

    <GuidedPractice exercise={skill.guided} />

    <section id="practice" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Exercises · production</p>
        <h2>Now judge it without the scaffolding</h2>
        <p>Every wrong option is wrong for its own reason, and it says so. Nothing here is scored automatically.</p>
      </div>
      {skill.drills.map((_, index) => <Drill key={`${skill.slug}-${index}`} skill={skill} index={index} />)}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Where it is practised</p>
        <h2>This skill lives in a stage of the essay too</h2>
      </div>
      <div className={styles.promptChoiceGrid}>
        <Link href={skill.practisedIn.href} className={styles.promptChoice}>
          <strong>{skill.practisedIn.label}</strong>
          <p>Where this skill is built into a paragraph, with the rest of the stage around it.</p>
        </Link>
        {others.map((item) => (
          <Link key={item.slug} href={`/practica/ielts/academic/writing/task2/habilidades/${item.slug}`} className={styles.promptChoice}>
            <strong>{item.label}</strong>
            <p>{item.job.charAt(0).toUpperCase()}{item.job.slice(1)}.</p>
          </Link>
        ))}
      </div>
    </section>

    <nav className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={16} /> Back to Task 2</Link>
      <Link href="/practica/ielts/academic/writing/task2/paraphrasing">Paraphrasing</Link>
      <Link href="/practica/ielts/academic/writing/vocabulario">Vocabulary <ArrowRight size={16} /></Link>
    </nav>
  </div></div>;
}
