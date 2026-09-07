import type { PracticeSection } from './PracticeRouteShell';
import styles from './PracticeSessionHeader.module.css';

type Props = {
  section: PracticeSection;
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
  metric?: string;
  metricLabel?: string;
  metricRole?: 'timer' | 'status';
};

/** Shared heading for an open exercise, independent of its interaction type. */
export default function PracticeSessionHeader({
  section,
  eyebrow,
  title,
  description,
  titleId,
  metric,
  metricLabel,
  metricRole,
}: Props) {
  return (
    <header className={styles.header} data-practice-section={section}>
      <div>
        <p>{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
        <span>{description}</span>
      </div>
      {metric && metricLabel ? (
        <aside role={metricRole} aria-live={metricRole === 'status' ? 'polite' : 'off'} aria-label={`${metric} ${metricLabel}`}>
          <strong>{metric}</strong>
          <span>{metricLabel}</span>
        </aside>
      ) : null}
    </header>
  );
}
