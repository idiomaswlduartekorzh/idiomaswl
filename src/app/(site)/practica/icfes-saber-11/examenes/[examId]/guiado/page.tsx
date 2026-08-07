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
    description: `Resuelve las ${exam.totalQuestions} preguntas de esta muestra histórica paso a paso con respuesta correcta, evidencia, distractores y microlecciones.`,
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
      <IcfesJsonLd name={`${exam.title}: modo guiado`} description={`Muestra histórica de ${questions.length} preguntas con retroalimentación pedagógica de WeLearn.`} url={`https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${exam.id}/guiado`} type="Quiz" questionCount={questions.length} currentLabel={`${exam.title} guiado`} />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/practica/icfes-saber-11">ICFES</Link><span>/</span><Link href="/practica/icfes-saber-11/examenes">Cuadernillos</Link><span>/</span><span aria-current="page">Modo guiado</span></nav>
        <header className={styles.guidedHero}>
          <div><p className={styles.kicker}>Muestra histórica · modo guiado completo</p><h1>{exam.title}, explicado paso a paso</h1><p>Resuelve sus {questions.length} preguntas divulgadas y recibe análisis pedagógico original de WeLearn: evidencia, razonamiento, explicación de cada distractor y una microlección transferible.</p></div>
          <div className={styles.guidedModeCard}><span>Modo guiado</span><strong>{questions.length} preguntas</strong><p>Conserva las partes y la extensión de esta muestra de {exam.year}; no se presenta como formato estándar 2026-2.</p><Link href={`/practica/icfes-saber-11/examenes/${exam.id}`}>Cambiar a modo examen →</Link></div>
        </header>
        <section className={styles.workbookMap} aria-labelledby="workbook-map-title"><div><p className={styles.kicker}>Mapa del recorrido original</p><h2 id="workbook-map-title">{exam.partRanges.length} partes presentes en esta muestra</h2></div><ol>{exam.partRanges.map((range) => { const config = ICFES_PARTS.find((item) => item.part === range.part); return <li key={range.part} style={{ '--map-color': config?.color } as React.CSSProperties}><span>Parte {range.part}</span><strong>{config?.shortTitle}</strong><small>Preguntas {range.from}–{range.to}</small></li>; })}</ol></section>
        <section className={styles.practiceSection}><div className={styles.sectionHeading}><p className={styles.kicker}>{questions.length} preguntas · feedback inmediato</p><h2>Responde, confirma y entiende</h2><p>La identidad visual cambia al entrar en cada parte. El progreso se guarda localmente y se sincroniza con tu cuenta cuando has iniciado sesión.</p></div><IcfesPartPracticeEngine part={part} questions={questions} context="guided-simulator" progressScope={`guided:${exam.id}:complete`} /></section>
        <section className={styles.sourceSection}><div><span>Fuente del contenido</span><p>{exam.source} Enunciados y claves: material divulgado por el ICFES. Explicaciones, selección de evidencia y análisis de distractores: elaboración editorial de Idiomas WeLearn.</p></div><div><span>Alcance histórico</span><p>Las {questions.length} preguntas conservan el formato y la extensión de la muestra de {exam.year}. Esta práctica no reproduce necesariamente la aplicación estándar 2026-2 ni predice un puntaje oficial.</p></div></section>
      </div>
    </main>
  );
}
