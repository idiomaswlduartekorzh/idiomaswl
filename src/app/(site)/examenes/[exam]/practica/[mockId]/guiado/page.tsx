import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMock } from '@/data/mocks';
import { getGuidedMockQuestions, GUIDED_MOCK_IDS } from '@/data/icfes/guided-mocks';
import { getIcfesPart, ICFES_PARTS } from '@/data/icfes/parts';
import IcfesJsonLd from '@/app/(site)/practica/icfes-saber-11/_components/IcfesJsonLd';
import IcfesPartPracticeEngine from '@/app/(site)/practica/icfes-saber-11/_components/IcfesPartPracticeEngine';
import ExamAccessBoundary from '@/components/exams/ExamAccessBoundary';
import styles from '@/app/(site)/practica/icfes-saber-11/icfes-learning.module.css';
import { IELTS_GUIDED_SET_1_WRITING } from '@/data/ielts/guided-set-1';
import { getIeltsGuidedEvidence } from '@/data/ielts/guided-evidence';
import { buildIeltsGuidedMock, IELTS_GUIDED_MOCK_IDS, type IeltsGuidedReferences } from '@/data/ielts/guided-mock';
import { getIeltsGuidedSpeakingReference } from '@/data/ielts/guided-speaking-references';
import { IELTS_GUIDED_WRITING_BY_SET } from '@/data/ielts/guided-writing-samples';
import IeltsGuidedMockCoach from './IeltsGuidedMockCoach';
import guidedStyles from './ielts-guided.module.css';

interface Props { params: Promise<{ exam: string; mockId: string }> }

function IeltsGuidedLockedPreview({ setNumber }: { setNumber: number }) {
  return <main className={guidedStyles.page}>
    <div className={guidedStyles.glowOne} aria-hidden="true" />
    <div className={guidedStyles.glowTwo} aria-hidden="true" />
    <div className={guidedStyles.shell}>
      <nav className={guidedStyles.breadcrumbs} aria-label="Migas de pan"><Link href="/examenes/ielts">IELTS</Link><span>/</span><span aria-current="page">Set {setNumber} · Modo guiado</span></nav>
      <header className={guidedStyles.hero}>
        <div className={guidedStyles.heroCopy}>
          <span className={guidedStyles.eyebrow}>Tutor de bolsillo</span>
          <h1>Responde primero.<br /><em>Entiende después.</em></h1>
          <p>La guía separa Listening y Reading en bloques cortos y revela la corrección, el fragmento de audio o el pasaje exacto únicamente después de responder.</p>
          <div className={guidedStyles.heroActions}><button data-exam-start="true" type="button">Comenzar guía del Set {setNumber}</button><Link href={`/examenes/ielts/practica/set-${setNumber}`}>Ir al modo examen</Link></div>
        </div>
        <aside className={guidedStyles.progressCard} aria-label="Contenido de la guía"><div className={guidedStyles.progressTop}><span>Incluye</span><strong>4 habilidades</strong></div><p><strong>80 preguntas objetivas</strong> más referencias pedagógicas de Writing y Speaking.</p><small>Las claves y evidencias se cargan sólo con acceso habilitado.</small></aside>
      </header>
    </div>
  </main>;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...GUIDED_MOCK_IDS.map((mockId) => ({ exam: 'icfes', mockId })),
    ...IELTS_GUIDED_MOCK_IDS.map((mockId) => ({ exam: 'ielts', mockId })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, mockId } = await params;
  if (exam === 'ielts' && IELTS_GUIDED_MOCK_IDS.includes(mockId)) {
    const setNumber = Number(mockId.replace('set-', ''));
    const canonical = `https://www.idiomaswl.com/examenes/ielts/practica/${mockId}/guiado`;
    return {
      title: `IELTS Set ${setNumber} guiado: audio y evidencia pregunta por pregunta`,
      description: 'Practica IELTS Listening, Reading, Writing y Speaking con corrección inmediata, clips de audio exactos, texto resaltado y autoevaluación guiada.',
      alternates: { canonical },
      openGraph: {
        title: `IELTS Set ${setNumber} · Modo guiado WeLearn`,
        description: 'Una ruta de aprendizaje autónoma con evidencia exacta después de cada respuesta.',
        url: canonical,
        type: 'website',
      },
      robots: { index: false, follow: false },
    };
  }
  const mock = exam === 'icfes' ? getMock(exam, mockId) : null;
  if (!mock || !GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number])) return {};
  const canonical = `https://www.idiomaswl.com/examenes/icfes/practica/${mockId}/guiado`;
  return {
    title: `${mock.title} guiado: 45 preguntas explicadas`,
    description: `Resuelve ${mock.title} en modo guiado con corrección inmediata, evidencia, análisis de opciones, microlecciones y repaso de errores.`,
    alternates: { canonical },
    openGraph: { title: `${mock.title} · Modo guiado`, description: 'Práctica ICFES propia de WeLearn con feedback después de cada respuesta.', url: canonical, type: 'website' },
  };
}

export default async function GuidedMockPage({ params }: Props) {
  const { exam, mockId } = await params;
  if (exam === 'ielts' && IELTS_GUIDED_MOCK_IDS.includes(mockId)) {
    const ieltsMock = getMock('ielts', mockId);
    if (!ieltsMock) notFound();
    const writingReference = IELTS_GUIDED_WRITING_BY_SET[mockId as keyof typeof IELTS_GUIDED_WRITING_BY_SET];
    const references: IeltsGuidedReferences = {
      writing: mockId === 'set-1' ? IELTS_GUIDED_SET_1_WRITING : writingReference,
      speaking: getIeltsGuidedSpeakingReference(Number(mockId.replace('set-', ''))),
    };
    const guidedData = buildIeltsGuidedMock(ieltsMock, getIeltsGuidedEvidence(mockId), references);
    return <ExamAccessBoundary
      examSlug="ielts"
      examLabel="IELTS Academic"
      language="ingles"
      redactLockedChildren
      lockedFallback={<IeltsGuidedLockedPreview setNumber={Number(mockId.replace('set-', ''))} />}
    >
      <IeltsGuidedMockCoach data={guidedData} />
    </ExamAccessBoundary>;
  }
  const mock = exam === 'icfes' ? getMock(exam, mockId) : null;
  const questions = getGuidedMockQuestions(mockId);
  const firstPart = getIcfesPart('parte-1');
  if (!mock || !firstPart || !questions.length || !GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number])) notFound();
  const canonical = `https://www.idiomaswl.com/examenes/icfes/practica/${mockId}/guiado`;

  return <ExamAccessBoundary examSlug="icfes" examLabel="ICFES Saber 11" language="ingles">
    <main className={styles.learningPage} style={{ '--part-color': firstPart.color, '--part-soft': firstPart.softColor } as React.CSSProperties}>
      <IcfesJsonLd name={`${mock.title}: modo guiado`} description="Práctica propia abreviada de WeLearn con retroalimentación inmediata." url={canonical} type="Quiz" questionCount={questions.length} currentLabel={`${mock.title} guiado`} />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/examenes/icfes">Prácticas ICFES</Link><span>/</span><span aria-current="page">{mock.title} guiado</span></nav>
        <header className={styles.guidedHero}>
          <div><p className={styles.kicker}>Práctica propia WeLearn · modo guiado</p><h1>{mock.title}, explicado paso a paso</h1><p>Son las mismas 45 preguntas del modo examen, ahora presentadas una por una con respuesta inmediata, evidencia, análisis de opciones y una estrategia transferible.</p></div>
          <div className={styles.guidedModeCard}><span>Dos modos · un mismo banco</span><strong>45 preguntas</strong><p>Esta práctica abreviada entrena las siete partes, pero no reproduce la extensión estándar de 55 preguntas ni predice tu puntaje oficial.</p><Link href={`/examenes/icfes/practica/${mock.id}`}>Cambiar a modo examen →</Link></div>
        </header>
        <section className={styles.workbookMap} aria-labelledby="mock-map-title">
          <div><p className={styles.kicker}>Mapa del recorrido</p><h2 id="mock-map-title">Las siete partes del mismo test</h2></div>
          <ol>{ICFES_PARTS.map((part) => { const count = questions.filter((question) => question.officialPart === part.part).length; return <li key={part.part} style={{ '--map-color': part.color } as React.CSSProperties}><span>Parte {part.part}</span><strong>{part.shortTitle}</strong><small>{count} preguntas</small></li>; })}</ol>
        </section>
        <section className={styles.practiceSection}><div className={styles.sectionHeading}><p className={styles.kicker}>45 preguntas · feedback inmediato</p><h2>El error deja una ruta clara</h2><p>Cada respuesta incorrecta se guarda para que puedas revisarla después y volver a aplicar la habilidad.</p></div><IcfesPartPracticeEngine part={firstPart} questions={questions} context="guided-simulator" progressScope={`guided:${mock.id}:45`} /></section>
        <section className={styles.sourceSection}><div><span>Fuente</span><p>Preguntas y claves: práctica original de WeLearn. Capa pedagógica: adaptación estructurada para el motor guiado.</p></div><div><span>Alcance</span><p>El porcentaje mide únicamente este test. Consulta los bancos históricos atribuidos y pendientes de cotejo en el catálogo separado.</p></div></section>
      </div>
    </main>
  </ExamAccessBoundary>;
}
