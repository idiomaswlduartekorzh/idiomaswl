import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Practica ajedrez en inglés | WeLearn Kids',
  description:
    'Resuelve mates, tácticas y finales de ajedrez con dificultad adaptativa, progreso guardado y explicaciones paso a paso.',
  alternates: { canonical: 'https://www.idiomaswl.com/kids/ingles-ajedrez/practica' },
};

export default function ChessPracticePage() {
  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <Link className={styles.backLink} href="/kids/ingles-ajedrez">
          ← Volver a Ajedrez Kids
        </Link>
        <span className={styles.title}>Matecraft · Práctica</span>
      </div>
      <iframe
        className={styles.frame}
        src="/kids/ingles-ajedrez/practica/index.html"
        title="Matecraft: práctica interactiva de ajedrez"
        allow="fullscreen"
      />
    </main>
  );
}
