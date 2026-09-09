import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMock } from '@/data/mocks';
import { getGuidedMockQuestions, GUIDED_MOCK_IDS } from '@/data/icfes/guided-mocks';
import { getIcfesPart, ICFES_PARTS } from '@/data/icfes/parts';
import IcfesJsonLd from '@/app/(site)/practica/icfes-saber-11/_components/IcfesJsonLd';
import IcfesPartPracticeEngine from '@/app/(site)/practica/icfes-saber-11/_components/IcfesPartPracticeEngine';
import styles from '@/app/(site)/practica/icfes-saber-11/icfes-learning.module.css';
import { createClient } from '@/lib/supabase/server';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import { xpressOfferIncludes } from '@/lib/xpress-commerce/catalog';

interface Props { params: Promise<{ exam: string; mockId: string }> }

export const dynamicParams = false;
export const dynamic = 'force-dynamic';
export function generateStaticParams() {
  return GUIDED_MOCK_IDS.map((mockId) => ({ exam: 'icfes', mockId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, mockId } = await params;
  const mock = exam === 'icfes' ? getMock(exam, mockId) : null;
  if (!mock || !GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number])) return {};
  const canonical = `https://www.idiomaswl.com/examenes/icfes/practica/${mockId}/guiado`;
  return {
    title: `${mock.title} guiado: 45 preguntas explicadas`,
    description: `Resuelve ${mock.title} en modo guiado con corrección inmediata, evidencia, análisis de opciones, microlecciones y repaso de errores.`,
    robots: { index: false, follow: false, noarchive: true },
    openGraph: { title: `${mock.title} · Modo guiado`, description: 'Práctica ICFES propia de WeLearn con feedback después de cada respuesta.', url: canonical, type: 'website' },
  };
}

export default async function GuidedMockPage({ params }: Props) {
  const { exam, mockId } = await params;
  const mock = exam === 'icfes' ? getMock(exam, mockId) : null;
  const questions = getGuidedMockQuestions(mockId);
  const firstPart = getIcfesPart('parte-1');
  if (!mock || !firstPart || !questions.length || !GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number])) notFound();
  const canonical = `https://www.idiomaswl.com/examenes/icfes/practica/${mockId}/guiado`;
  const { data: { user } } = await (await createClient()).auth.getUser();
  let hasMembership = false;
  if (user) {
    try {
      const membership = await activeXpressMembership(user.id);
      hasMembership = Boolean(
        membership?.exam_slug === 'icfes'
        && xpressOfferIncludes(membership.offer_id, 'automatic-feedback'),
      );
    } catch { /* The workbook remains closed when entitlement verification is unavailable. */ }
  }

  if (!hasMembership) {
    return (
      <main className={styles.learningPage} style={{ '--part-color': firstPart.color, '--part-soft': firstPart.softColor } as React.CSSProperties}>
        <div className={styles.pageWrap}>
          <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/examenes/icfes">Prácticas ICFES</Link><span>/</span><span aria-current="page">Modo guiado</span></nav>
          <header className={styles.guidedHero}>
            <div>
              <p className={styles.kicker}>Cuaderno guiado para miembros</p>
              <h1>{mock.title}, explicado paso a paso</h1>
              <p>El resultado básico del modo examen sigue siendo gratuito. Este cuaderno completo, con respuestas y retroalimentación inmediata, está incluido en los planes ICFES de 30 días.</p>
              <div className="prac-results__actions">
                <Link href={`/examenes/icfes/practica/${mock.id}`} className="btn btn-ghost">Hacer el examen gratuito</Link>
                <Link href="/registro?path=exam&exam=icfes&plan=exam-auto&next=%2Fsuscripcion%2Fexamenes" className="btn">Ver plan de COP 49.000</Link>
              </div>
            </div>
            <div className={styles.guidedModeCard}>
              <span>Incluido en membresía</span>
              <strong>45 preguntas</strong>
              <p>También está disponible el plan de COP 99.000 con un crédito de revisión docente por periodo.</p>
            </div>
          </header>
        </div>
      </main>
    );
  }

  return (
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
  );
}
