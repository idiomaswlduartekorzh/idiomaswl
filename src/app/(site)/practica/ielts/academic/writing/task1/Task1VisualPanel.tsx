import type { ReactNode } from 'react';
import styles from './Task1VisualPanel.module.css';

type Task1VisualPanelProps = {
  eyebrow: string;
  title: string;
  caption: string;
  kind: string;
  scrollable?: boolean;
  children: ReactNode;
};

export default function Task1VisualPanel({
  eyebrow,
  title,
  caption,
  kind,
  scrollable = false,
  children,
}: Task1VisualPanelProps) {
  return (
    <section className={styles.panel} aria-label={`${kind}: ${title}`}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
          <p className={styles.caption}>{caption}</p>
        </div>
        <p className={styles.badge}>{kind}</p>
      </header>
      <div className={`${styles.canvas} ${scrollable ? styles.scrollable : ''}`}>
        {children}
      </div>
    </section>
  );
}
