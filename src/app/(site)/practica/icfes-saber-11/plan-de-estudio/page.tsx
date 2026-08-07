import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPlanClient from './StudyPlanClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/plan-de-estudio';
export const metadata: Metadata = {
  title: 'Plan de estudio ICFES Inglés de 2, 4, 8 o 12 semanas',
  description: 'Crea gratis un plan de estudio para ICFES Inglés según tus semanas y minutos diarios, con las siete partes, práctica guiada y repaso de errores.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Crea tu plan de estudio ICFES Inglés', description: 'Una ruta práctica de 2 a 12 semanas conectada con ejercicios y simulacros.', url: CANONICAL, type: 'website' },
};

export default function StudyPlanPage() {
  return (
    <main className={styles.learningPage} style={{ '--part-color': '#0F3D8C', '--part-soft': '#EFF6FF' } as React.CSSProperties}>
      <IcfesJsonLd name="Plan de estudio ICFES Inglés" description="Generador de rutas de estudio de 2, 4, 8 o 12 semanas." url={CANONICAL} currentLabel="Plan de estudio" />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Plan de estudio</span></nav>
        <header className={styles.planHero}><p className={styles.kicker}>Plan gratuito · sin registro</p><h1>Un calendario que termina en práctica, no en tareas vagas</h1><p>Elige el tiempo disponible. La ruta distribuye las siete partes, reserva semanas de repaso y enlaza cada misión con una actividad concreta.</p></header>
        <StudyPlanClient />
        <section className={styles.sourceSection}><div><span>Cómo prioriza</span><p>El plan rota las siete partes e introduce repaso acumulativo. Después del diagnóstico puedes empezar por tu debilidad aunque el calendario sugiera otra parte.</p></div><div><span>Progreso</span><p>La configuración anónima se guarda localmente; no necesitas dejar datos para ver el plan.</p></div></section>
      </div>
    </main>
  );
}
