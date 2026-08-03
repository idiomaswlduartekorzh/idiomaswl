import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuidedWorkbookQuestions, GUIDED_WORKBOOK_IDS } from '@/data/icfes/guided-workbooks';
import { getIcfesPart, ICFES_PARTS } from '@/data/icfes/parts';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';
import IcfesPartPracticeEngine from '../../../_components/IcfesPartPracticeEngine';
import IcfesJsonLd from '../../../_components/IcfesJsonLd';
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
    description: 'Resuelve las 25 preguntas del cuadernillo paso a paso con respuesta correcta, evidencia, distractores y microlecciones.',
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
      <IcfesJsonLd name={`${exam.title}: modo guiado`} description="Cuadernillo de 25 preguntas con retroalimentación pedagógica de WeLearn." url={`https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${exam.id}/guiado`} type="Quiz" questionCount={questions.length} currentLabel="Cuadernillo guiado 2023" />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES</Link><span>/</span><Link href="/practica/icfes-saber-11/examenes">Cuadernillos</Link><span>/</span><span aria-current="page">Modo guiado</span></nav>
        <header className={styles.guidedHero}>
          <div><p className={styles.kicker}>Cuadernillo guiado completo</p><h1>{exam.title}, explicado paso a paso</h1><p>Resuelve sus 25 preguntas oficiales publicadas y recibe análisis pedagógico original de WeLearn: evidencia, razonamiento, explicación de cada distractor y una microlección transferible.</p></div>
          <div className={styles.guidedModeCard}><span>Modo guiado</span><strong>25 preguntas</strong><p>Partes 1, 3, 5, 6 y 7 incluidas en este cuadernillo publicado.</p><Link href={`/practica/icfes-saber-11/examenes/${exam.id}`}>Cambiar a modo examen →</Link></div>
        </header>
        <section className={styles.workbookMap} aria-labelledby="workbook-map-title"><div><p className={styles.kicker}>Mapa del recorrido</p><h2 id="workbook-map-title">Cinco habilidades, un solo cuadernillo</h2></div><ol>{exam.partRanges.map((range) => { const config = ICFES_PARTS.find((item) => item.part === range.part); return <li key={range.part} style={{ '--map-color': config?.color } as React.CSSProperties}><span>Parte {range.part}</span><strong>{config?.shortTitle}</strong><small>Preguntas {range.from}–{range.to}</small></li>; })}</ol></section>
        <section className={styles.practiceSection}><div className={styles.sectionHeading}><p className={styles.kicker}>25 preguntas · feedback inmediato</p><h2>Responde, confirma y entiende</h2><p>La identidad visual cambia al entrar en cada parte. El progreso se guarda localmente y se sincroniza con tu cuenta cuando has iniciado sesión.</p></div><IcfesPartPracticeEngine part={part} questions={questions} context="guided-simulator" progressScope={`guided:${exam.id}:complete`} /></section>
        <section className={styles.sourceSection}><div><span>Fuente del contenido</span><p>{exam.source} Enunciados y claves: material publicado por el ICFES. Explicaciones, evidencia y análisis de distractores: elaboración editorial de Idiomas WeLearn.</p></div><div><span>Estado editorial</span><p>Las 25 preguntas fueron revisadas para modo guiado el 3 de agosto de 2026. Los demás cuadernillos permanecen en modo examen hasta completar el mismo estándar editorial.</p></div></section>
      </div>
    </main>
  );
}
