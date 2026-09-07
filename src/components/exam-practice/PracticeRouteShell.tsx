import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

import styles from './PracticeRouteShell.module.css';

export type PracticeSection = 'reading' | 'listening' | 'writing' | 'speaking' | 'neutral';

export type PracticeBreadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  breadcrumbs: readonly PracticeBreadcrumb[];
  children: ReactNode;
  section?: PracticeSection;
  backHref?: string;
  backLabel?: string;
  id?: string;
};

/**
 * Shared frame for practice libraries and individual exercises.
 * Exam and language products can reuse it by supplying their own breadcrumb trail.
 */
export default function PracticeRouteShell({
  breadcrumbs,
  children,
  section = 'neutral',
  backHref,
  backLabel = 'Choose another exercise',
  id,
}: Props) {
  return (
    <main id={id} className={styles.page} data-practice-section={section}>
      <div className={`wrap ${styles.wrap}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={`${breadcrumb.label}:${index}`} className={styles.crumb}>
              {index > 0 ? <span className={styles.separator} aria-hidden="true">›</span> : null}
              {breadcrumb.href ? <Link href={breadcrumb.href}>{breadcrumb.label}</Link> : <strong>{breadcrumb.label}</strong>}
            </span>
          ))}
        </nav>

        {backHref ? (
          <div className={styles.contextBar}>
            <Link href={backHref} className={styles.backLink}>
              <ArrowLeft aria-hidden="true" /> {backLabel}
            </Link>
            <span>Open practice · progress saved in this browser</span>
          </div>
        ) : null}

        {children}
      </div>
    </main>
  );
}
