import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIcfesQuestionsByPart } from '@/data/icfes/questions';
import { getIcfesPart, ICFES_PARTS, ICFES_PART_SLUGS } from '@/data/icfes/parts';
import IcfesPartPracticeEngine from '../_components/IcfesPartPracticeEngine';
import styles from '../icfes-learning.module.css';

const BASE = 'https://www.idiomaswl.com';
const REVIEWED_AT = '3 de agosto de 2026';

interface Props {
  params: Promise<{ partSlug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ICFES_PART_SLUGS.map((partSlug) => ({ partSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partSlug } = await params;
  const part = getIcfesPart(partSlug);
  if (!part) return {};
  const url = `${BASE}/practica/icfes-saber-11/${part.slug}`;
  return {
    title: part.seoTitle,
    description: part.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: part.seoTitle, description: part.seoDescription, url, type: 'website' },
  };
}

export default async function IcfesPartPage({ params }: Props) {
  const { partSlug } = await params;
  const part = getIcfesPart(partSlug);
  if (!part) notFound();
  const questions = getIcfesQuestionsByPart(part.part);
  const nextPart = ICFES_PARTS.find((item) => item.part === part.part + 1);
  const url = `${BASE}/practica/icfes-saber-11/${part.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: part.seoTitle,
        description: part.seoDescription,
        url,
        inLanguage: 'es',
        learningResourceType: ['Guía', 'Práctica interactiva'],
        educationalLevel: 'Educación media',
        teaches: part.skills,
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: `${BASE}/practica` },
          { '@type': 'ListItem', position: 2, name: 'ICFES Saber 11', item: `${BASE}/practica/icfes-saber-11` },
          { '@type': 'ListItem', position: 3, name: `Parte ${part.part}`, item: url },
        ],
      },
    ],
  };

  return (
    <main className={styles.learningPage} style={{ '--part-color': part.color, '--part-soft': part.softColor } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link><span>/</span>
          <Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span>
          <span aria-current="page">Parte {part.part}</span>
        </nav>

        <header className={styles.partHero}>
          <div>
            <p className={styles.kicker}>Inglés ICFES Saber 11 · peso aproximado {part.approximateWeight}%</p>
            <h1>{part.title}</h1>
            <p className={styles.heroAnswer}>{part.directAnswer}</p>
            <div className={styles.skillPills}>{part.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
          <div className={styles.heroVisual} aria-label={`Demostración visual: ${part.task}`}>
            <span className={styles.heroVisualNumber}>0{part.part}</span>
            <div className={styles.heroVisualCard}>
              <strong>{part.icon}</strong>
              <p>{part.task}</p>
            </div>
          </div>
        </header>

        <section className={styles.strategySection} aria-labelledby="strategy-title">
          <div>
            <p className={styles.kicker}>Método de resolución</p>
            <h2 id="strategy-title">Una estrategia de cuatro movimientos</h2>
            <p>No memorices una letra. Entrena un proceso que puedas repetir cuando cambien el tema, el vocabulario o los distractores.</p>
          </div>
          <ol className={styles.strategySteps}>
            {part.strategy.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
          </ol>
        </section>

        <section id="practica-guiada" className={styles.practiceSection} aria-labelledby="practice-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Ahora hazlo tú</p>
            <h2 id="practice-title">Práctica guiada de la Parte {part.part}</h2>
            <p>Primero decides; después ves evidencia, distractores y una microlección. Tu primera práctica no requiere registro.</p>
          </div>
          <IcfesPartPracticeEngine part={part} questions={questions} />
        </section>

        <section className={styles.sourceSection}>
          <div><span>Fuente y revisión</span><p>Estructura contrastada con la <a href="https://www.icfes.gov.co/wp-content/uploads/2026/03/17-marzo-guia-de-orientacion-saber-11-2026-2.pdf" target="_blank" rel="noreferrer">Guía de orientación Saber 11 2026-2 del ICFES</a>. Ejercicios propios de práctica; no se presentan como preguntas oficiales.</p></div>
          <div><span>Última revisión editorial</span><p>{REVIEWED_AT}</p></div>
        </section>

        <section className={styles.continuitySection}>
          <div><p className={styles.kicker}>Sigue entrenando</p><h2>Convierte esta habilidad en parte de una ruta</h2></div>
          <div className={styles.continuityLinks}>
            {nextPart && <Link href={`/practica/icfes-saber-11/${nextPart.slug}`}><span>Siguiente parte</span><strong>{nextPart.shortTitle} →</strong></Link>}
            <Link href="/practica/icfes-saber-11/examenes"><span>Modo examen</span><strong>Cuadernillos ICFES →</strong></Link>
            <Link href="/preparacion-icfes"><span>Apoyo personal</span><strong>Preparación con tutor →</strong></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
