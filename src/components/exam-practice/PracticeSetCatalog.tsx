import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock3 } from 'lucide-react';

import type { PracticeSection } from './PracticeRouteShell';
import styles from './PracticeSetCatalog.module.css';

export type PracticeSetSummary = {
  number: number;
  title: string;
  detail: string;
  href: string;
  meta?: string;
};

type Props = {
  product: string;
  section: PracticeSection;
  task: string;
  description: string;
  sets: readonly PracticeSetSummary[];
  note?: string;
};

/** Reusable catalog shown before a learner enters an individual exercise. */
export default function PracticeSetCatalog({
  product,
  section,
  task,
  description,
  sets,
  note = 'Each exercise opens separately. Your progress stays in this browser.',
}: Props) {
  return (
    <section className={styles.shell} data-practice-section={section} aria-labelledby="practice-library-title">
      <header className={styles.header}>
        <div>
          <p>{product} practice library · {section}</p>
          <h1 id="practice-library-title">Choose a {task} exercise.</h1>
          <span>{description}</span>
        </div>
        <aside aria-label={`${sets.length} available exercises`}>
          <strong>{sets.length}</strong>
          <span>available exercises</span>
        </aside>
      </header>

      <div className={styles.grid}>
        {sets.map((set) => (
          <Link key={set.number} href={set.href} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.number}>{String(set.number).padStart(2, '0')}</span>
              <span className={styles.status}>Available</span>
            </div>
            <p>{task}</p>
            <h2>{set.title}</h2>
            <span className={styles.detail}>{set.detail}</span>
            <div className={styles.footer}>
              <span><Clock3 aria-hidden="true" /> {set.meta ?? 'Self-paced'}</span>
              <strong>Open exercise <ArrowRight aria-hidden="true" /></strong>
            </div>
          </Link>
        ))}
      </div>

      <p className={styles.note}>
        <BookOpenCheck aria-hidden="true" /> {note}
      </p>
    </section>
  );
}
