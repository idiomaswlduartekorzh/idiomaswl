import type { Metadata } from 'next';
import Link from 'next/link';
import IcfesSmartRoute from '../IcfesSmartRoute';
import IcfesJsonLd from '../_components/IcfesJsonLd';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/diagnostico';

export const metadata: Metadata = {
  title: 'Diagnóstico ICFES Inglés gratis y ruta por habilidades',
  description: 'Haz un diagnóstico gratuito de Inglés ICFES Saber 11 y recibe nivel inicial, fortalezas, debilidades y una ruta de práctica por habilidades.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Diagnóstico ICFES Inglés y ruta inteligente', description: '15 preguntas, reporte por habilidad y siguiente nivel recomendado.', url: CANONICAL, type: 'website' },
};

export default function IcfesDiagnosticPage() {
  return (
    <main className={styles.learningPage} style={{ '--part-color': '#0F3D8C', '--part-soft': '#EFF6FF' } as React.CSSProperties}>
      <IcfesJsonLd name="Diagnóstico ICFES Inglés" description="Diagnóstico práctico de 15 preguntas con ruta recomendada por habilidad." url={CANONICAL} currentLabel="Diagnóstico" />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Diagnóstico</span></nav>
        <header className={styles.diagnosticHero}>
          <div><p className={styles.kicker}>Diagnóstico adaptativo · 15 preguntas</p><h1>Descubre qué debes practicar primero</h1><p>El diagnóstico observa precisión, tiempo y habilidad. Al terminar asigna un punto de entrada y recomienda refuerzos; no reemplaza el puntaje oficial del ICFES.</p></div>
          <div className={styles.diagnosticMap}>{['Vocabulario', 'Gramática', 'Lectura', 'Inferencia'].map((label, index) => <span key={label} style={{ '--diagnostic-index': index } as React.CSSProperties}>{label}</span>)}</div>
        </header>
        <section className={styles.diagnosticEngine}><IcfesSmartRoute /></section>
        <section className={styles.sourceSection}><div><span>Cómo se calcula</span><p>El resultado usa únicamente las respuestas de esta práctica, agrupadas por habilidad y nivel interno. No predice un puntaje oficial de 0 a 100.</p></div><div><span>Privacidad</span><p>El progreso anónimo se guarda en este dispositivo. Puedes borrarlo desde la propia ruta inteligente.</p></div></section>
      </div>
    </main>
  );
}
