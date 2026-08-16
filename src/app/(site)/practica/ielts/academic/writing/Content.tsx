import type { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './WritingHub.module.css';

const PRIMARY_TASKS = [
  {
    id: 'task1',
    index: 'T1',
    label: 'Task 1',
    time: '20 minutes · 150+ words',
    description: 'Turn graphs, tables, maps and process diagrams into a selective, accurate report. Practise the response structure and every major visual family.',
    href: '/practica/ielts/academic/writing/task1',
    accent: 'var(--wl-on-panel-teal, #176b87)',
  },
  {
    id: 'task2',
    index: 'T2',
    label: 'Task 2',
    time: '40 minutes · 250+ words',
    description: 'Build a clear position, develop relevant ideas and answer opinion, discussion, problem-solution, advantages-disadvantages and direct-question prompts.',
    href: '/practica/ielts/academic/writing/task2',
    accent: 'var(--wl-on-panel-alert, #b42332)',
  },
];

const CRITERIA = [
  'Task Achievement / Response',
  'Coherence & Cohesion',
  'Lexical Resource',
  'Grammatical Range & Accuracy',
];

export default function IELTSWritingPage() {
  return (
    <div className={styles.page} lang="en">
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica/ielts">IELTS</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ielts/academic">Academic</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Writing</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>IELTS Academic Writing</p>
            <h1>Write the answer the task actually asks for.</h1>
          </div>
          <p className={styles.heroCopy}>
            Practise visual reporting and argument writing through complete learning routes: understand the task, study a worked decision, practise with feedback and then write independently.
          </p>
        </header>

        <section className={styles.formatPanel} aria-label="Official format and WeLearn learning structure">
          <article>
            <h2>Official format</h2>
            <p>Academic Writing has 2 tasks. Task 1 describes visual information in at least 150 words; Task 2 answers an essay question in at least 250 words.</p>
          </article>
          <article>
            <h2>WeLearn learning structure</h2>
            <p>Each route separates method, worked example, guided practice, independent practice and review. Study targets support learning; they are not additional official IELTS rules.</p>
          </article>
        </section>

        <div className={styles.criteria} aria-label="IELTS Academic Writing assessment criteria">
          {CRITERIA.map((criterion) => <span key={criterion}>{criterion}</span>)}
        </div>

        <section aria-labelledby="writing-routes-heading">
          <div className={styles.routeHeader}>
            <div>
              <p className={styles.sectionLabel}>Choose the writing task</p>
              <h2 id="writing-routes-heading">2 tasks, 1 connected writing system</h2>
            </div>
            <p>Original practice · explained decisions</p>
          </div>

          <div className={styles.primaryGrid}>
            {PRIMARY_TASKS.map((task) => (
              <Link
                key={task.id}
                href={task.href}
                className={styles.taskCard}
                style={{ '--card-accent': task.accent } as CSSProperties}
              >
                <div className={styles.cardBody}>
                  <p className={styles.cardIndex}>{task.index}</p>
                  <h3>{task.label}</h3>
                  <p className={styles.cardMeta}>{task.time}</p>
                  <p className={styles.cardDescription}>{task.description}</p>
                  <div className={styles.cardAction}>
                    <span>Open {task.label} learning route</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/practica/ielts/academic/writing/rubrica"
            className={styles.rubricCard}
            style={{ '--card-accent': 'var(--wl-on-panel, #102e6f)' } as CSSProperties}
          >
            <div>
              <h3>Writing review rubric</h3>
              <p>Use one shared evidence-based review for Task 1 and Task 2: task coverage, organisation, vocabulary and grammar.</p>
            </div>
            <div className={styles.cardAction}>
              <span>Open the review checklist</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
