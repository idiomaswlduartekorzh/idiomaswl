'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BANK_BY_FAMILY } from '../tarea-completa/task2-prompt-bank';
import { CHECKLIST, WEAK_STRONG } from './model-answer-extras';
import styles from '../introduccion/page.module.css';

/**
 * La biblioteca de ensayos modelo de Task 2.
 *
 * QUÉ SE MIDIÓ Y QUÉ CAMBIÓ
 *
 * La página traía **cinco ensayos escritos a mano, y ninguno existía en el banco de 25**. Dos
 * juegos de modelos desconectados en el mismo curso: los del banco están compuestos con los
 * párrafos que el alumno trabaja en `body-1`, `body-2` y `conclusion` —el enunciado sobre el
 * que practicaste Body 1 es el que aquí lees entero—, y los cinco de aquí no salían de
 * ninguna parte ni llevaban a ninguna.
 *
 * Ahora se leen los 25. Lo que esta página sí aportaba —la comparación flojo/fuerte y la lista
 * de comprobación— se conserva, porque no está en ningún otro módulo.
 *
 * Nada se copia: los ensayos salen de `BANK_BY_FAMILY` en tiempo de render.
 */

export type Faq = { question: string; answer: string };

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion' },
  { href: '/practica/ielts/academic/writing/task2/discussion', label: 'Discussion' },
  { href: '/practica/ielts/academic/writing/task2/problem-solution', label: 'Problem and solution' },
  { href: '/practica/ielts/academic/writing/task2/advantages-disadvantages', label: 'Advantages and disadvantages' },
  { href: '/practica/ielts/academic/writing/task2/direct-question', label: 'Direct questions' },
  { href: '/practica/ielts/academic/writing/task2/tarea-completa', label: 'Write one against the clock' },
];

export default function ModelAnswersClient({ faqs }: { faqs: Faq[] }) {
  const [familyIndex, setFamilyIndex] = useState(0);
  const [essayIndex, setEssayIndex] = useState(0);

  const family = BANK_BY_FAMILY[familyIndex];
  const essay = family.prompts[essayIndex];
  const total = useMemo(() => BANK_BY_FAMILY.reduce((sum, item) => sum + item.prompts.length, 0), []);
  const shortest = useMemo(
    () => Math.min(...BANK_BY_FAMILY.flatMap((item) => item.prompts.map((prompt) => prompt.modelWords))),
    [],
  );

  return <div className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <span>Model answers</span>
    </nav>

    <header className={styles.hero} lang="en">
      <p className={styles.kicker}>Model answers</p>
      <h1>{total} complete essays, built from the paragraphs you practised</h1>
      <p className={styles.heroLead}>
        These are not written separately from the course. The prompt you worked on in Body 1 is the one you
        read whole here, so every paragraph is one you have already seen a workshop for. Each is labelled with
        the job it does, and each ends with the mistake it was written to avoid.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{total} essays</strong><span>five per question family</span></div>
        <div className={styles.fact}><strong>4 paragraphs</strong><span>each labelled with its job</span></div>
        <div className={styles.fact}><strong>{shortest}+ words</strong><span>the shortest one in the library</span></div>
        <div className={styles.fact}><strong>0 band claims</strong><span>a model is not a score</span></div>
      </div>
    </header>

    {/* Lo que separa una frase que responde de una que suena a que responde. */}
    <section className={styles.section} id="weak-strong" lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Before you read a whole one</p>
        <h2>The same sentence, written twice</h2>
        <p>
          Most of the distance between a weak essay and a strong one is visible one sentence at a time. These
          three pairs are the moves that repeat.
        </p>
      </div>
      <div className={styles.studyGrid}>
        {WEAK_STRONG.map((pair) => (
          <article key={pair.id} className={styles.studyCard}>
            <p className={styles.typeTag}>{pair.job}</p>
            <div className={styles.weakStrong}>
              <p className={styles.weak}>{pair.weak}</p>
              <p className={styles.strong}>{pair.strong}</p>
            </div>
            <p>{pair.why}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={`${styles.section} ${styles.practiceSection}`} id="library" lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The library</p>
        <h2>Read one whole, paragraph by paragraph</h2>
        <p>Pick a question family, then a prompt. The label above each paragraph is the job it does.</p>
      </div>

      <div className={styles.typeTabs} role="tablist" aria-label="Question family">
        {BANK_BY_FAMILY.map((item, index) => (
          <button key={item.id} type="button" role="tab" aria-selected={index === familyIndex}
            className={`${styles.typeTab} ${index === familyIndex ? styles.typeTabActive : ''}`}
            onClick={() => { setFamilyIndex(index); setEssayIndex(0); }}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.exampleTabs}>
        {family.prompts.map((item, index) => (
          <button key={item.id} type="button"
            className={`${styles.exampleTab} ${index === essayIndex ? styles.exampleTabActive : ''}`}
            onClick={() => setEssayIndex(index)}>
            {String(index + 1).padStart(2, '0')} · {item.title}
          </button>
        ))}
      </div>

      <article className={styles.examplePanel}>
        <div className={styles.promptCard}>
          <span>{essay.familyLabel} · {essay.modelWords} words</span>
          <p>{essay.prompt}</p>
        </div>
        <p className={styles.signal}><strong>Instruction signal: </strong>{essay.signal}</p>

        <div className={styles.modelBlockGrid}>
          {essay.model.map((paragraph) => (
            <article key={paragraph.label}>
              <strong>{paragraph.label}</strong>
              <small>{paragraph.job}</small>
              <p>{paragraph.text}</p>
            </article>
          ))}
        </div>

        {/*
          `watchFor` son TRES avisos, no uno. Pintados como `{essay.watchFor}` React los pega
          sin separación y salen como un párrafo corrido ilegible: «…no against standards or
          feedback.Repeating the durable-learning argument…». Cada uno va en su línea.
        */}
        <div className={styles.checkList}>
          <strong>Written to avoid</strong>
          {essay.watchFor.map((warning) => <p key={warning}>{warning}</p>)}
        </div>

        <div className={styles.workshopActions}>
          <Link className={styles.secondaryButton} href="/practica/ielts/academic/writing/task2/tarea-completa">
            Write this one yourself <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </section>

    <section className={styles.section} id="checklist" lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Before you hand it in</p>
        <h2>Five questions, in this order</h2>
        <p>Questions rather than advice: each one has a yes or no answer you can check on your own page.</p>
      </div>
      <div className={styles.checkList}>
        {CHECKLIST.map((item) => (
          <p key={item.question}><strong>{item.question}</strong> {item.why}</p>
        ))}
      </div>
    </section>

    {/* El FAQ se queda en español: es la superficie de búsqueda de la página. */}
    {faqs.length > 0 && (
      <section className={styles.section} id="faq">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Preguntas frecuentes</p>
          <h2>Lo que se pregunta sobre los ensayos modelo</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    )}

    <div className={styles.nextLinks}>
      {INTERNAL_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
    </div>
  </div></div>;
}
