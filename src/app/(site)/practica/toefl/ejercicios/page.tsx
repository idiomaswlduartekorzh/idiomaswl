import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, BookOpenText, ExternalLink } from 'lucide-react';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';
import {
  TOEFL_EXERCISE_COUNT,
  TOEFL_EXERCISE_SECTIONS,
  TOEFL_MOCK_LIBRARY_HREF,
} from '@/data/practica/toefl-exercise-catalog';

import styles from './page.module.css';

const URL = 'https://www.idiomaswl.com/practica/toefl/ejercicios';
const ETS_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export const metadata: Metadata = {
  title: 'Ejercicios TOEFL por tipo: Reading, Listening, Writing y Speaking',
  description:
    'Encuentra ejercicios TOEFL organizados en doce tipos: Reading, Listening, Writing y Speaking, con disponibilidad individual o dentro de 20 simulacros WeLearn.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Ejercicios TOEFL organizados por sección y tipo',
    description: 'Un catálogo claro de Reading, Listening, Writing y Speaking con disponibilidad real.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: '¿Qué tipos de ejercicios TOEFL puedo practicar?',
    answer:
      'El catálogo reúne doce familias de tarea: tres de Reading, cuatro de Listening, tres de Writing y dos de Speaking. Los nombres siguen la estructura vigente publicada por ETS.',
  },
  {
    question: '¿Todos los tipos tienen ejercicio individual?',
    answer:
      'Todavía no. Reading y Writing tienen rutas individuales. Listening y Speaking se practican por ahora dentro de los simulacros, y el catálogo lo indica sin crear enlaces a páginas vacías.',
  },
  {
    question: '¿Esta práctica reproduce el examen oficial?',
    answer:
      'No. Los materiales son originales de WeLearn, usan recorridos fijos y no reproducen la adaptación ni la puntuación oficial del TOEFL iBT.',
  },
];

const taskNames = TOEFL_EXERCISE_SECTIONS.flatMap((section) =>
  section.items.map((item) => item.officialName),
);

export default function ToeflExercisesPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="Ejercicios TOEFL por sección y tipo"
        url={URL}
        description="Catálogo de familias de tarea TOEFL con práctica individual o acceso a simulacros WeLearn."
        teaches={taskNames}
        isPartOf={{ name: 'Práctica TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' },
          { name: 'Ejercicios', url: URL },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/practica">Práctica</Link>
              <span aria-hidden="true">›</span>
              <Link href="/practica/toefl">TOEFL</Link>
              <span aria-hidden="true">›</span>
              <span>Ejercicios</span>
            </nav>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>TOEFL · catálogo de ejercicios</p>
                <h1>Todos los ejercicios TOEFL, organizados por sección.</h1>
                <p className={styles.lead}>
                  Elige una tarea concreta. Verás cuáles ya tienen práctica individual y cuáles están disponibles dentro
                  de los simulacros mientras construimos su recorrido propio.
                </p>
              </div>
              <aside className={styles.catalogNote} aria-label="Cómo leer el catálogo">
                <span>{TOEFL_EXERCISE_COUNT}</span>
                <strong>tipos de ejercicio</strong>
                <p>Los cuatro clústeres permanecen visibles para que puedas comparar y elegir sin filtros ocultos.</p>
              </aside>
            </div>

            <nav className={styles.jumpNav} aria-label="Ir a una sección TOEFL">
              {TOEFL_EXERCISE_SECTIONS.map((section) => (
                <a key={section.id} href={`#${section.id}`} data-section={section.id}>
                  <span>{section.label}</span>
                  <small>{section.items.length} tipos</small>
                  <ArrowDown aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </header>

        <section className={styles.catalog} aria-labelledby="catalog-heading">
          <div className="wrap">
            <div className={styles.catalogIntro}>
              <p>Elige por tarea</p>
              <h2 id="catalog-heading">Qué puedes practicar ahora</h2>
              <span>“Disponible” abre una ruta individual. “En simulacros” indica que la tarea existe, pero todavía no tiene página propia.</span>
            </div>

            <div className={styles.clusterGrid}>
              {TOEFL_EXERCISE_SECTIONS.map((section) => {
                const mockOnly = section.items.some((item) => item.availability.kind === 'mock-only');

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={styles.cluster}
                    data-section={section.id}
                    aria-labelledby={`${section.id}-heading`}
                  >
                    <header className={styles.clusterHeader}>
                      <div>
                        <p>{section.items.length} tipos</p>
                        <h3 id={`${section.id}-heading`}>{section.label}</h3>
                      </div>
                      <Link href={section.guideHref}>Ver guía de {section.label}</Link>
                    </header>
                    <p className={styles.clusterDescription}>{section.description}</p>

                    <div className={styles.taskList}>
                      {section.items.map((item) => {
                        if (item.availability.kind === 'individual') {
                          return (
                            <Link key={item.id} href={item.availability.href} className={styles.taskRow}>
                              <span className={styles.taskCopy}>
                                <strong>{item.officialName}</strong>
                                <small>{item.spanishExplanation}</small>
                              </span>
                              <span className={`${styles.taskState} ${styles.available}`}>Disponible</span>
                              <span className={styles.taskAction}>
                                {item.availability.actionLabel} <ArrowRight aria-hidden="true" />
                              </span>
                            </Link>
                          );
                        }

                        return (
                          <article key={item.id} className={`${styles.taskRow} ${styles.taskRowStatic}`}>
                            <span className={styles.taskCopy}>
                              <strong>{item.officialName}</strong>
                              <small>{item.spanishExplanation}</small>
                            </span>
                            <span className={`${styles.taskState} ${styles.inMocks}`}>En simulacros</span>
                            <span className={styles.soonNote}>Individual próximamente</span>
                          </article>
                        );
                      })}
                    </div>

                    {mockOnly && (
                      <Link href={TOEFL_MOCK_LIBRARY_HREF} className={styles.clusterAction}>
                        Practicar {section.label} en simulacros <ArrowRight aria-hidden="true" />
                      </Link>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.sourceSection} aria-labelledby="source-heading">
          <div className="wrap">
            <div className={styles.sourceGrid}>
              <article>
                <p className={styles.kicker}>Fuente y alcance</p>
                <h2 id="source-heading">Tareas vigentes, práctica propia.</h2>
                <p>
                  Los nombres de las familias se contrastaron con la estructura publicada por ETS. Las explicaciones,
                  actividades, audios y simulacros son materiales originales de WeLearn.
                </p>
                <a href={ETS_CONTENT_URL} target="_blank" rel="noopener noreferrer">
                  Consultar TOEFL iBT Test Content en ETS <ExternalLink aria-hidden="true" />
                </a>
              </article>
              <aside>
                <BookOpenText aria-hidden="true" />
                <strong>Importante</strong>
                <p>
                  WeLearn no está afiliado con ETS. Esta práctica usa recorridos fijos y no reproduce la adaptación ni
                  la puntuación oficial del TOEFL iBT.
                </p>
              </aside>
            </div>

            <section className={styles.faq} aria-labelledby="exercise-faq-heading">
              <p className={styles.kicker}>Preguntas frecuentes</p>
              <h2 id="exercise-faq-heading">Antes de elegir un ejercicio</h2>
              <div>
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
