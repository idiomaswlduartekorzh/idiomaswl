import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock3 } from 'lucide-react';

import styles from './ToeflPracticeSetCatalog.module.css';

type PracticeSet = {
  number: number;
  title: string;
  detail: string;
  href: string;
  meta?: string;
};

type Props = {
  task: string;
  description: string;
  sets: readonly PracticeSet[];
};

export default function ToeflPracticeSetCatalog({ task, description, sets }: Props) {
  return (
    <section className={styles.shell} aria-labelledby="practice-library-title">
      <header className={styles.header}>
        <div>
          <p>TOEFL practice library</p>
          <h1 id="practice-library-title">Choose a {task} exercise.</h1>
          <span>{description}</span>
        </div>
        <aside>
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
        <BookOpenCheck aria-hidden="true" /> Each exercise opens separately. Your progress stays in this browser.
      </p>
    </section>
  );
}
