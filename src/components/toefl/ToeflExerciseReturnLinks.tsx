import Link from 'next/link';
import styles from './ToeflExerciseReturnLinks.module.css';

type ToeflExerciseReturnLinksProps = {
  section: 'reading' | 'writing';
};

const SECTION_LABELS = {
  reading: 'Reading',
  writing: 'Writing',
} as const;

export default function ToeflExerciseReturnLinks({ section }: ToeflExerciseReturnLinksProps) {
  const label = SECTION_LABELS[section];

  return (
    <nav className={styles.navigation} aria-label="Siguientes pasos de práctica TOEFL">
      <p className={styles.label}>Continúa tu práctica</p>
      <Link className={styles.link} href={`/practica/toefl/ejercicios#${section}`}>
        Ver todos los ejercicios de {label}
      </Link>
      <Link className={`${styles.link} ${styles.secondary}`} href="/examenes/toefl#practica">
        Hacer un simulacro completo
      </Link>
    </nav>
  );
}
