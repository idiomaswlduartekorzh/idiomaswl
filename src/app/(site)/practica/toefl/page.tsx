import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  ClipboardCheck,
  Headphones,
  Mic2,
  PenLine,
  Route,
} from 'lucide-react';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';
import ExamPodcastShelf from '@/components/practica/ExamPodcastShelf';
import { getExamPodcasts } from '@/data/practica/exam-podcast-catalog';
import {
  TOEFL_EXERCISE_COUNT,
  TOEFL_EXERCISE_SECTIONS,
  TOEFL_MOCK_LIBRARY_HREF,
} from '@/data/practica/toefl-exercise-catalog';

import styles from './ios.module.css';

const URL = 'https://www.idiomaswl.com/practica/toefl';
const TOEFL_PODCASTS = getExamPodcasts('toefl');

export const metadata: Metadata = {
  title: 'Práctica TOEFL: ejercicios, rutas y 20 simulacros',
  description:
    'Elige entre ejercicios TOEFL por tipo, práctica guiada en desarrollo y 20 simulacros completos originales de WeLearn para Reading, Listening, Writing y Speaking.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Práctica TOEFL por ejercicios, rutas y simulacros',
    description: 'Tres formas claras de preparar TOEFL con material original de WeLearn.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: '¿Qué encuentro en la sección de práctica TOEFL?',
    answer:
      'Puedes elegir un tipo de ejercicio concreto, consultar las rutas guiadas que estamos construyendo o entrar a uno de los 20 simulacros completos de WeLearn.',
  },
  {
    question: '¿Los ejercicios y simulacros de WeLearn son oficiales?',
    answer:
      'No. Son materiales originales de WeLearn y no estamos afiliados con ETS. Nuestros recorridos son fijos y no reproducen la adaptación ni la puntuación oficial del TOEFL iBT.',
  },
  {
    question: '¿Cómo están organizados los ejercicios TOEFL?',
    answer:
      'El catálogo agrupa doce familias de tarea en Reading, Listening, Writing y Speaking. Cada tarea indica si tiene práctica individual o si por ahora se practica dentro de los simulacros.',
  },
];

const sectionIcons = {
  reading: BookOpenCheck,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic2,
} as const;

export default function TOEFLPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="Práctica TOEFL por ejercicios, rutas y simulacros"
        url={URL}
        description="Hub para elegir práctica TOEFL por tipo de ejercicio, ruta guiada o simulacro completo."
        teaches={TOEFL_EXERCISE_SECTIONS.map((section) => `TOEFL ${section.label}`)}
        isPartOf={{ name: 'Práctica WeLearn', url: 'https://www.idiomaswl.com/practica' }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: URL },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/practica">Práctica</Link>
              <span aria-hidden="true">›</span>
              <span>TOEFL</span>
            </nav>

            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Práctica TOEFL · ejercicios, práctica y simulacros</p>
              <h1>Elige cómo quieres preparar el TOEFL.</h1>
              <p className={styles.lead}>
                Entrena un tipo de ejercicio, sigue una ruta guiada o entra a uno de los 20 simulacros completos.
                Cada opción te dice exactamente qué encontrarás.
              </p>
              <p className={styles.disclosure}>
                Material original de WeLearn, no afiliado con ETS. Estas actividades usan recorridos fijos de práctica y
                no reproducen la adaptación ni la puntuación oficial del TOEFL iBT.
              </p>
            </div>

            <dl className={styles.facts} aria-label="Contenido disponible en práctica TOEFL">
              <div><dt>Rutas</dt><dd>3</dd><dd className={styles.factNote}>ejercicios, práctica y simulacros</dd></div>
              <div><dt>Tipos</dt><dd>{TOEFL_EXERCISE_COUNT}</dd><dd className={styles.factNote}>tareas agrupadas por sección</dd></div>
              <div><dt>Simulacros</dt><dd>20</dd><dd className={styles.factNote}>recorridos completos WeLearn</dd></div>
              <div><dt>Secciones</dt><dd>4</dd><dd className={styles.factNote}>Reading, Listening, Writing y Speaking</dd></div>
            </dl>
          </div>
        </header>

        <section className={styles.modes} aria-labelledby="practice-mode-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Empieza aquí</p>
              <h2 id="practice-mode-heading">¿Qué quieres hacer hoy?</h2>
              <span>Elige una sola puerta. Dentro encontrarás el siguiente paso y el estado real de cada recurso.</span>
            </div>

            <div className={styles.modeGrid}>
              <Link href="/practica/toefl/ejercicios" className={`${styles.modeCard} ${styles.modeExercises}`}>
                <div className={styles.modeTop}>
                  <span className={styles.modeIcon}><ClipboardCheck aria-hidden="true" /></span>
                  <span className={`${styles.status} ${styles.statusAvailable}`}>Disponible</span>
                </div>
                <p className={styles.modeNumber}>01</p>
                <h3>Ejercicios</h3>
                <p>Elige entre los doce tipos de tarea, agrupados en Reading, Listening, Writing y Speaking.</p>
                <span className={styles.modeAction}>Ver todos los ejercicios <ArrowRight aria-hidden="true" /></span>
              </Link>

              <article className={`${styles.modeCard} ${styles.modePractice}`} aria-labelledby="guided-practice-title">
                <div className={styles.modeTop}>
                  <span className={styles.modeIcon}><Route aria-hidden="true" /></span>
                  <span className={`${styles.status} ${styles.statusSoon}`}>Próximamente</span>
                </div>
                <p className={styles.modeNumber}>02</p>
                <h3 id="guided-practice-title">Práctica</h3>
                <p>Recorridos guiados que combinarán explicación, intento, revisión y repetición.</p>
                <span className={styles.modeUnavailable}><CalendarClock aria-hidden="true" /> En desarrollo</span>
              </article>

              <Link href={TOEFL_MOCK_LIBRARY_HREF} className={`${styles.modeCard} ${styles.modeMocks}`}>
                <div className={styles.modeTop}>
                  <span className={styles.modeIcon}><BookOpenCheck aria-hidden="true" /></span>
                  <span className={`${styles.status} ${styles.statusMocks}`}>20 disponibles</span>
                </div>
                <p className={styles.modeNumber}>03</p>
                <h3>Simulacros</h3>
                <p>Recorridos completos con Reading, Listening, Writing y Speaking en una sola sesión.</p>
                <span className={styles.modeAction}>Abrir los 20 simulacros <ArrowRight aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.preview} aria-labelledby="exercise-preview-heading">
          <div className="wrap">
            <div className={styles.previewHeader}>
              <div>
                <p>Dentro de Ejercicios</p>
                <h2 id="exercise-preview-heading">Doce tipos. Cuatro secciones. Una vista clara.</h2>
              </div>
              <Link href="/practica/toefl/ejercicios" className={styles.textLink}>
                Abrir el catálogo <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.sectionStrip}>
              {TOEFL_EXERCISE_SECTIONS.map((section) => {
                const Icon = sectionIcons[section.id];
                return (
                  <Link
                    key={section.id}
                    href={`/practica/toefl/ejercicios#${section.id}`}
                    className={styles.sectionPreview}
                    data-section={section.id}
                  >
                    <Icon aria-hidden="true" />
                    <span><strong>{section.label}</strong><small>{section.items.length} tipos</small></span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="toefl-faq-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Antes de empezar</p>
              <h2 id="toefl-faq-heading">Qué ofrece esta sección</h2>
            </div>
            <div className={styles.faqGrid}>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ExamPodcastShelf
          episodes={TOEFL_PODCASTS}
          locale="es"
          eyebrow="Guía de audio TOEFL"
          title="Escucha el mapa antes de elegir tu práctica"
          description="Una orientación complementaria para entender las secciones, distinguir práctica fija y examen oficial, y decidir qué entrenar primero."
        />
      </main>
    </>
  );
}
