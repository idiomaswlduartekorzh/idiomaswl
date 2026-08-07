import type { Metadata } from 'next';
import Link from 'next/link';
import { ICFES_PRACTICE_QUESTIONS } from '@/data/icfes/questions';
import DailyQuestionClient from './DailyQuestionClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/pregunta-del-dia';
export const metadata: Metadata = {
  title: 'Pregunta ICFES Inglés del día con explicación',
  description: 'Resuelve una pregunta diaria de Inglés ICFES Saber 11 con respuesta, evidencia, análisis de distractores y microlección.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Pregunta ICFES Inglés del día', description: 'Una pregunta, evidencia y microlección para mantener tu preparación activa.', url: CANONICAL, type: 'website' },
};

export default function DailyQuestionPage() {
  return (
    <main className={styles.learningPage} style={{ '--part-color': '#7C3AED', '--part-soft': '#F5F3FF' } as React.CSSProperties}>
      <IcfesJsonLd name="Pregunta ICFES Inglés del día" description="Práctica diaria con evidencia, distractores y microlección." url={CANONICAL} currentLabel="Pregunta del día" />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Pregunta del día</span></nav>
        <header className={styles.dailyHero}><div><p className={styles.kicker}>Rutina de 2 minutos</p><h1>Una decisión pequeña para no perder el ritmo</h1><p>La pregunta cambia según la fecha de tu dispositivo y rota entre las siete partes. Responde antes de mirar la evidencia; el objetivo es practicar el proceso, no coleccionar letras.</p></div><div aria-hidden="true"><span>HOY</span><strong>?</strong></div></header>
        <section className={styles.practiceSection}><DailyQuestionClient questions={[...ICFES_PRACTICE_QUESTIONS]} /></section>
        <section className={styles.sourceSection}><div><span>Contenido</span><p>Pregunta propia identificada como práctica y tomada del banco editorial compartido. No es una pregunta oficial inédita.</p></div><div><span>Siguiente paso</span><p>Si fallas, el error queda disponible en tu repaso local.</p></div></section>
      </div>
    </main>
  );
}
