import type { Metadata } from 'next';
import Link from 'next/link';
import { ICFES_PARTS } from '@/data/icfes/parts';
import IcfesHubClient from './IcfesHubClient';
import styles from './icfes-learning.module.css';

const BASE = 'https://www.idiomaswl.com';
const CANONICAL = `${BASE}/practica/icfes-saber-11`;

export const metadata: Metadata = {
  title: 'ICFES Inglés Saber 11: guía, 7 partes, práctica y simulacros',
  description: 'Superhub gratuito de inglés ICFES Saber 11: las 7 partes oficiales, ejercicios guiados con corrección, vocabulario, gramática y cuadernillos.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'ICFES Inglés Saber 11: aprende y practica las 7 partes',
    description: 'Guías visuales, práctica guiada, feedback de distractores y simulacros del componente de Inglés Saber 11.',
    url: CANONICAL,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Superhub de Inglés ICFES Saber 11',
      description: 'Guías y práctica interactiva para las siete partes del componente de Inglés Saber 11.',
      url: CANONICAL,
      inLanguage: 'es',
      dateModified: '2026-08-04',
      hasPart: ICFES_PARTS.map((part) => ({ '@type': 'LearningResource', name: part.title, url: `${CANONICAL}/${part.slug}` })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Práctica', item: `${BASE}/practica` },
        { '@type': 'ListItem', position: 2, name: 'ICFES Saber 11', item: CANONICAL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <main className={styles.hubPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.hubWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link><span>/</span><span aria-current="page">ICFES Saber 11</span>
        </nav>

        <header className={styles.hubHero}>
          <div className={styles.hubHeroCopy}>
            <p className={styles.hubKicker}>Centro de entrenamiento · Inglés Saber 11</p>
            <h1>Entiende las 7 partes. Practica con feedback. Llega con estrategia.</h1>
            <p>El componente de Inglés evalúa lectura y uso del idioma mediante siete tipos de tarea. Aquí puedes aprender el método, practicar sin registro y pasar después a cuadernillos o una ruta enfocada en tus errores.</p>
            <div className={styles.hubActions}>
              <Link href="/practica/icfes-saber-11/diagnostico" className={styles.primaryButton}>Hacer diagnóstico</Link>
              <Link href="/practica/icfes-saber-11/examenes" className={styles.secondaryButton}>Ver cuadernillos</Link>
            </div>
            <div className={styles.truthStrip}>
              <span><strong>55</strong> preguntas en la aplicación estándar 2026-2</span>
              <span><strong>7</strong> partes oficiales</span>
              <span><strong>B1</strong> nivel máximo reportado</span>
            </div>
          </div>
          <div className={styles.hubMap} aria-label="Mapa visual de las siete partes del ICFES Inglés">
            <div className={styles.hubMapCenter}><strong>ICFES</strong><span>Inglés</span></div>
            {ICFES_PARTS.map((part, index) => (
              <Link
                href={`/practica/icfes-saber-11/${part.slug}`}
                key={part.part}
                className={styles.hubMapNode}
                style={{ '--node-color': part.color, '--node-index': index } as React.CSSProperties}
                aria-label={`Parte ${part.part}: ${part.shortTitle}`}
              >
                <strong>{part.part}</strong><span>{part.icon}</span>
              </Link>
            ))}
          </div>
        </header>

        <section className={styles.startModes} aria-labelledby="start-title">
          <div><p className={styles.hubKicker}>Elige el punto de entrada</p><h2 id="start-title">No todos necesitan comenzar en el mismo lugar</h2></div>
          <div className={styles.modeGrid}>
            <Link href="/practica/icfes-saber-11/diagnostico"><span>01</span><div><strong>No sé por dónde empezar</strong><p>Haz 15 preguntas y recibe una ruta inicial.</p></div></Link>
            <Link href="/practica/icfes-saber-11/examenes"><span>02</span><div><strong>Quiero medirme</strong><p>Responde un cuadernillo y revisa tu resultado.</p></div></Link>
            <Link href="/practica/icfes-saber-11/repaso-errores"><span>03</span><div><strong>Quiero corregir errores</strong><p>Vuelve a la evidencia y aplica la microlección.</p></div></Link>
            <Link href="/practica/icfes-saber-11/progreso"><span>04</span><div><strong>Quiero ver mi avance</strong><p>Consulta dominio, sesiones y errores sincronizados.</p></div></Link>
          </div>
        </section>

        <section className={styles.partsSection} aria-labelledby="parts-title">
          <div className={styles.partsHeading}>
            <div><p className={styles.hubKicker}>Arquitectura de la prueba</p><h2 id="parts-title">Las siete partes, de vocabulario a cloze contextual</h2></div>
            <p>Los pesos son aproximados y sirven para priorizar estudio. Cada guía explica qué evalúa la tarea, un proceso repetible y práctica con retroalimentación.</p>
          </div>
          <div className={styles.partsGrid}>
            {ICFES_PARTS.map((part) => (
              <Link href={`/practica/icfes-saber-11/${part.slug}`} key={part.part} className={styles.partCard} style={{ '--card-color': part.color, '--card-soft': part.softColor } as React.CSSProperties}>
                <div className={styles.partCardTop}><span>Parte {part.part}</span><strong>≈ {part.approximateWeight}%</strong></div>
                <div className={styles.partCardIcon}>{part.icon}</div>
                <h3>{part.shortTitle}</h3>
                <p>{part.task}</p>
                <div className={styles.partCardSkills}>{part.skills.slice(0, 2).map((skill) => <span key={skill}>{skill}</span>)}</div>
                <strong className={styles.partCardCta}>Abrir guía y práctica <span aria-hidden="true">→</span></strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.howItWorks}>
          <div><p className={styles.hubKicker}>Práctica que enseña</p><h2>No solo te dice si fallaste</h2><p>Cada ejercicio guiado convierte el error en una decisión visible: respuesta correcta, evidencia, análisis de distractores, microlección y refuerzo siguiente.</p></div>
          <div className={styles.feedbackFlow} aria-label="Flujo de aprendizaje">
            {['Responde', 'Confirma', 'Encuentra evidencia', 'Entiende el distractor', 'Refuerza'].map((label, index) => <div key={label}><span>{index + 1}</span><strong>{label}</strong></div>)}
          </div>
        </section>

        <section id="rutas-adaptativas" className={styles.legacyTools}>
          <IcfesHubClient embedded />
        </section>

        <section className={styles.hubSource}>
          <div><strong>Fuente oficial de estructura</strong><p><a href="https://www.icfes.gov.co/wp-content/uploads/2026/03/17-marzo-guia-de-orientacion-saber-11-2026-2.pdf" target="_blank" rel="noreferrer">Guía de orientación Saber 11 2026-2</a>, Instituto Colombiano para la Evaluación de la Educación (ICFES).</p></div>
          <div><strong>Criterio editorial</strong><p>Las preguntas propias se identifican como práctica. Los cuadernillos divulgados conservan su fuente y no se confunden con la aplicación estándar completa.</p></div>
          <div><strong>Última revisión</strong><p>4 de agosto de 2026</p></div>
        </section>
        <div className={styles.hubPlanCta}><div><span>¿Ya sabes cuándo presentas?</span><strong>Convierte el tiempo disponible en una ruta semanal.</strong></div><div className={styles.hubActions}><Link href="/practica/icfes-saber-11/pregunta-del-dia" className={styles.secondaryButton}>Pregunta del día</Link><Link href="/practica/icfes-saber-11/plan-de-estudio" className={styles.primaryButton}>Crear plan</Link></div></div>
      </div>
    </main>
  );
}
