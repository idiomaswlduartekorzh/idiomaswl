import type { Metadata } from 'next';
import Link from 'next/link';
import { ICFES_VOCABULARY } from '@/data/icfes-vocabulary';
import VocabularyPracticeClient from './VocabularyPracticeClient';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/vocabulario';

export const metadata: Metadata = {
  title: 'Vocabulario para ICFES Inglés: palabras, conectores y práctica',
  description: `Estudia ${ICFES_VOCABULARY.length} palabras y conectores útiles para Inglés ICFES Saber 11 con tarjetas, ejemplos y progreso local gratuito.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Vocabulario para ICFES Inglés',
    description: 'Banco curado de palabras, conectores y verbos de lectura con tarjetas interactivas.',
    url: CANONICAL,
    type: 'website',
  },
};

export default function IcfesVocabularyPage() {
  const connectors = ICFES_VOCABULARY.filter((word) => word.skill === 'connectors').length;
  return (
    <main className={styles.learningPage} style={{ '--part-color': '#4F46E5', '--part-soft': '#EEF2FF' } as React.CSSProperties}>
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica">Práctica</Link><span>/</span><Link href="/practica/icfes-saber-11">ICFES</Link><span>/</span><span aria-current="page">Vocabulario</span></nav>
        <header className={styles.vocabHero}>
          <div><p className={styles.kicker}>Banco curado · práctica gratuita</p><h1>Vocabulario para entender, no para repetir listas</h1><p>En ICFES necesitas reconocer definiciones, avisos, paráfrasis y relaciones dentro de un texto. Este banco agrupa palabras de uso académico, conectores y verbos frecuentes en preguntas de lectura.</p></div>
          <div className={styles.vocabHeroStats}><div><strong>{ICFES_VOCABULARY.length}</strong><span>palabras iniciales</span></div><div><strong>{connectors}</strong><span>conectores</span></div><div><strong>4</strong><span>niveles de uso</span></div></div>
        </header>
        <section className={styles.vocabLesson}><div className={styles.sectionHeading}><p className={styles.kicker}>Tarjetas activas</p><h2>Reconoce la palabra y comprueba el contexto</h2><p>Intenta explicar la palabra antes de girar la tarjeta. Marca “Ya la reconozco” solo si también comprendes el ejemplo.</p></div><VocabularyPracticeClient words={ICFES_VOCABULARY} /></section>
        <section className={styles.sourceSection}><div><span>Criterio editorial</span><p>Banco propio y versionado. Las palabras apoyan habilidades recurrentes de lectura; no se afirma que sean una lista oficial ni que garanticen una aparición específica.</p></div><div><span>Última revisión</span><p>3 de agosto de 2026</p></div></section>
        <section className={styles.continuitySection}><div><p className={styles.kicker}>Aplica lo aprendido</p><h2>Pasa de la tarjeta a una decisión real</h2></div><div className={styles.continuityLinks}><Link href="/practica/icfes-saber-11/parte-1"><span>Definiciones</span><strong>Practicar Parte 1 →</strong></Link><Link href="/practica/icfes-saber-11/parte-7"><span>Texto cloze</span><strong>Explorar Parte 7 →</strong></Link><Link href="/practica/icfes-saber-11/sinonimos-inferencia"><span>Lectura fina</span><strong>Sinónimos e inferencia →</strong></Link></div></section>
      </div>
    </main>
  );
}
