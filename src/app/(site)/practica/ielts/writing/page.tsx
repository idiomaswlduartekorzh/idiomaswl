import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SKILL_ACCENT } from '@/data/practica/skill-accents';
import styles from '../IeltsHub.module.css';

const accent = { '--ielts-accent': SKILL_ACCENT.escritura.var } as CSSProperties;

export const metadata: Metadata = {
  title: 'IELTS Writing Practice: Task 1, Task 2 and 40 Sets',
  description: 'Choose the Academic Writing Task 1 or Task 2 learning route, study the criteria and practise both tasks in 40 assembled sets.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/writing' },
};

export default function IeltsWritingPage() {
  return <div className={styles.page} style={accent} lang="en"><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts">IELTS</Link><span>/</span><span>Writing</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>IELTS Academic Writing · learning and independent practice</p><h1>Read the task before you build the answer.</h1><p className={styles.heroLead}>Task 1 asks you to select and report the main features of visual information. Task 2 asks you to develop a response to an argument or problem. The two learning routes already teach those jobs in detail; use this page to choose the right route, then practise with a prompt from one of the 40 assembled sets.</p><div className={styles.factGrid}><div className={styles.fact}><strong>2 tasks</strong><span>different writing purposes</span></div><div className={styles.fact}><strong>60 min</strong><span>for Writing in the test</span></div><div className={styles.fact}><strong>2×</strong><span>Task 2 weighting</span></div><div className={styles.fact}><strong>40 sets</strong><span>for untimed skill practice</span></div></div></header>

    <section className={styles.section} aria-labelledby="task-choice"><div className={styles.sectionHeading}><p className={styles.kicker}>Start with the writing job</p><h2 id="task-choice">Two tasks need two different kinds of explanation.</h2><p>Study the route that matches your next response. Each one moves from method and worked decisions to guided and complete writing.</p></div><div className={styles.pathGrid}>
      <Link className={styles.pathCard} href="/practica/ielts/academic/writing/task1"><div className={styles.pathTop}><h3>Task 1 · Report visual information</h3><span className={styles.status}>150+ words</span></div><p>Learn to read a graph, table, process or map; choose the main features; write an overview; and organise relevant details. The route already includes visual examples, paragraph work and full-task practice.</p><strong>Open the Task 1 course →</strong></Link>
      <Link className={styles.pathCard} href="/practica/ielts/academic/writing/task2"><div className={styles.pathTop}><h3>Task 2 · Develop an essay</h3><span className={styles.status}>250+ words</span></div><p>Decode the exact instruction, choose a position, develop body paragraphs and revise the whole argument. The route includes question families, transferable skills and 25 complete model essays.</p><strong>Open the Task 2 course →</strong></Link>
    </div></section>

    <section className={styles.section} aria-labelledby="writing-process">
      <div className={styles.sectionHeading}><h2 id="writing-process">Where does your draft get stuck?</h2></div>
      <div className={styles.prose}>
        <p>If every number looks worth mentioning, choose a figure and try writing just the sentence you want your reader to remember. If your essay keeps drifting, look at the last line of the question and decide what it asks you to explain. The two workshops let you test those decisions before writing a whole response.</p>
      </div>
      <div className={styles.actions}>
        <Link href="/practica/ielts/academic/writing/task1#visual-types">Work through a figure</Link>
        <Link href="/practica/ielts/academic/writing/task2#question-types">Work through an essay question</Link>
        <Link href="/practica/ielts/academic/writing/rubrica#diagnostic">Compare a draft with a revision</Link>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="writing-practice"><div className={styles.sectionHeading}><p className={styles.kicker}>Independent practice</p><h2 id="writing-practice">Use the original set prompts when you are ready.</h2><p>Your drafts stay in this browser. The focused practice review shows completion and word counts; it does not assign an automatic Writing band. A complete mock has a separate submission and review flow.</p></div><div className={styles.actions}><Link href="/practica/ielts/writing/simulacros">Choose one of 40 Writing sets</Link><Link href="/practica/ielts/academic/writing">Explore the full Writing map</Link><Link href="/practica/ielts/academic/writing/rubrica">Open the review rubric</Link></div></section>
  </div></div>;
}
