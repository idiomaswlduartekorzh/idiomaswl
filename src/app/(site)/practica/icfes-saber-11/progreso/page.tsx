import type { Metadata } from 'next';
import Link from 'next/link';
import ProgressDashboardClient from './ProgressDashboardClient';
import styles from '../icfes-learning.module.css';

export const metadata: Metadata = {
  title: 'Mi progreso de práctica ICFES Inglés',
  description: 'Consulta tus sesiones, precisión por parte, dominio por habilidad y errores pendientes de Inglés ICFES.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/icfes-saber-11/progreso' },
  robots: { index: false, follow: true },
};

export default function IcfesProgressPage() {
  return <main className={styles.learningPage} style={{ '--part-color': '#047857', '--part-soft': '#ECFDF5' } as React.CSSProperties}><div className={styles.pageWrap}><nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Mi progreso</span></nav><header className={styles.progressHero}><p className={styles.kicker}>Progreso sincronizado</p><h1>Decide la próxima práctica con evidencia</h1><p>Tu cuenta reúne sesiones, precisión por parte, habilidades practicadas y errores pendientes. Los datos anónimos siguen primero en tu dispositivo.</p></header><ProgressDashboardClient /></div></main>;
}
