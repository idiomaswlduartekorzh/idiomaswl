import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuidedWorkbookQuestions, GUIDED_WORKBOOK_IDS } from '@/data/icfes/guided-workbooks';
import { getIcfesPart } from '@/data/icfes/parts';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';
import IcfesPartPracticeEngine from '../../../_components/IcfesPartPracticeEngine';
import styles from '../../../icfes-learning.module.css';

interface Props { params: Promise<{ examId: string }> }

export const dynamicParams = false;
export function generateStaticParams() { return GUIDED_WORKBOOK_IDS.map((examId) => ({ examId })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const exam = getSimulacro(examId);
  if (!exam || !GUIDED_WORKBOOK_IDS.includes(examId as typeof GUIDED_WORKBOOK_IDS[number])) return {};
  const canonical = `https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${examId}/guiado`;
  return {
    title: `${exam.title}: práctica guiada con explicaciones`,
    description: 'Resuelve un bloque del cuadernillo paso a paso con respuesta correcta, evidencia, distractores y microlecciones.',
    alternates: { canonical },
    openGraph: { title: `${exam.title}: modo guiado`, description: 'Práctica paso a paso con retroalimentación pedagógica.', url: canonical, type: 'website' },
  };
}
export default async function GuidedWorkbookPage({ params }: Props) {
  const { examId } = await params;
  const exam = getSimulacro(examId);
  const part = getIcfesPart('parte-1');
  const questions = getGuidedWorkbookQuestions(examId);
  if (!exam || !part || !questions.length) notFound();

  return (
    <main className={styles.learningPage} style={{ '--part-color': part.color, '--part-soft': part.softColor } as React.CSSProperties}>
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES</Link><span>/</span><Link href="/practica/icfes-saber-11/examenes">Cuadernillos</Link><span>/</span><span aria-current="page">Modo guiado</span></nav>
        <header className={styles.guidedHero}>
          <div><p className={styles.kicker}>Piloto guiado · bloque 1</p><h1>{exam.title}, explicado paso a paso</h1><p>Este primer bloque cubre las cinco preguntas de vocabulario de la Parte 1. Conservamos el enunciado del cuadernillo y añadimos análisis editorial propio. Las demás partes continúan disponibles en modo examen mientras completamos su revisión.</p></div>
          <div className={styles.guidedModeCard}><span>Modo guiado</span><strong>5 preguntas</strong><p>Feedback después de cada respuesta</p><Link href={`/practica/icfes-saber-11/examenes/${exam.id}`}>Cambiar a modo examen →</Link></div>
        </header>
        <section className={styles.practiceSection}><div className={styles.sectionHeading}><p className={styles.kicker}>Parte 1 · Health</p><h2>Responde, confirma y entiende</h2><p>Tu progreso se guarda localmente con una clave separada del modo examen.</p></div><IcfesPartPracticeEngine part={part} questions={questions} context="guided-simulator" progressScope={`guided:${exam.id}:block-1`} /></section>
        <section className={styles.sourceSection}><div><span>Fuente del contenido</span><p>{exam.source} Explicaciones, evidencia y análisis de distractores: elaboración editorial de Idiomas WeLearn.</p></div><div><span>Estado editorial</span><p>Bloque 1 revisado el 3 de agosto de 2026. No se presenta todavía como cuadernillo completamente explicado.</p></div></section>
      </div>
    </main>
  );
}
