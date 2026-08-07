import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuidedWorkbookQuestions, GUIDED_WORKBOOK_IDS } from '@/data/icfes/guided-workbooks';
import { GUIDED_SIMULACRO_2026_QUESTIONS } from '@/data/icfes/guided-simulacro-2026';
import { getGuidedMockQuestions, GUIDED_MOCK_IDS } from '@/data/icfes/guided-mocks';
import ErrorReviewClient from './ErrorReviewClient';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/repaso-errores';
export const metadata: Metadata = {
  title: 'Repaso de errores ICFES Inglés: evidencia y refuerzo',
  description: 'Revisa tus preguntas incorrectas de ICFES Inglés, compara respuestas, vuelve a la evidencia y aplica una microlección de refuerzo.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function ErrorReviewPage() {
  const questions = [...GUIDED_SIMULACRO_2026_QUESTIONS, ...GUIDED_MOCK_IDS.flatMap(getGuidedMockQuestions), ...GUIDED_WORKBOOK_IDS.flatMap(getGuidedWorkbookQuestions)];
  return (
    <main className={styles.learningPage} style={{ '--part-color': '#DC2626', '--part-soft': '#FEF2F2' } as React.CSSProperties}>
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Repaso de errores</span></nav>
        <header className={styles.reviewHero}><p className={styles.kicker}>Tu cola de aprendizaje</p><h1>Un error útil vuelve con evidencia</h1><p>Este espacio reúne los fallos de las prácticas guiadas en tu dispositivo. Repasa la diferencia, marca el error como comprendido y vuelve a aplicar la habilidad.</p></header>
        <ErrorReviewClient questions={questions} />
      </div>
    </main>
  );
}
