import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Headphones, LockKeyhole, Radio } from 'lucide-react';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';

import styles from './page.module.css';

const URL = 'https://www.idiomaswl.com/practica/toefl/listening/simulacros';

export const metadata: Metadata = {
  title: 'Práctica TOEFL Listening por secciones',
  description:
    'Practica TOEFL Listening en un recorrido fijo de WeLearn con audios originales, cuatro familias de tarea y corrección bruta sin puntuación oficial.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Práctica TOEFL Listening por secciones',
    description: 'Un piloto completo de Listening con audios originales y corrección privada en servidor.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: '¿Esta práctica de Listening es adaptativa?',
    answer:
      'No. Es un recorrido fijo de WeLearn construido con el subconjunto Listening del mismo Set 1 usado en los simulacros completos.',
  },
  {
    question: '¿Recibo una puntuación oficial del TOEFL?',
    answer:
      'No. Al terminar ves aciertos brutos de esta práctica. WeLearn no calcula banda ETS, overall ni equivalencias de admisión.',
  },
  {
    question: '¿Puedo volver a escuchar los audios?',
    answer:
      'Cada audio se reproduce una vez dentro del intento. Si deseas repetir todo el recorrido, puedes iniciar un intento nuevo al terminar.',
  },
];

const tasks = [
  'Listen and Choose a Response',
  'Listen to a Conversation',
  'Listen to an Announcement',
  'Listen to an Academic Talk',
];

export default function ToeflListeningLibraryPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="Práctica TOEFL Listening por secciones"
        url={URL}
        description="Biblioteca seccional de práctica fija TOEFL Listening creada por WeLearn."
        teaches={tasks}
        isPartOf={{
          name: 'TOEFL Listening Practice',
          url: 'https://www.idiomaswl.com/practica/toefl/listening',
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' },
          { name: 'Ejercicios', url: 'https://www.idiomaswl.com/practica/toefl/ejercicios' },
          { name: 'Listening', url: 'https://www.idiomaswl.com/practica/toefl/listening' },
          { name: 'Simulacros seccionales', url: URL },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/practica/toefl/ejercicios">Ejercicios</Link>
              <span aria-hidden="true">›</span>
              <Link href="/practica/toefl/listening">Listening</Link>
              <span aria-hidden="true">›</span>
              <span>Práctica por sets</span>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>TOEFL Listening · práctica enfocada</p>
                <h1>Entrena Listening sin presentar el simulacro completo.</h1>
                <p className={styles.lead}>
                  El piloto toma únicamente los bloques Listening del Set 1 canónico. Conserva los mismos IDs,
                  audios y corrección privada sin copiar el banco.
                </p>
              </div>
              <aside className={styles.scopeNote}>
                <Radio aria-hidden="true" />
                <strong>Recorrido fijo WeLearn</strong>
                <p>No reproduce el enrutamiento adaptativo ni genera una puntuación oficial del TOEFL iBT.</p>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.library} aria-labelledby="listening-library-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Disponible ahora</p>
              <h2 id="listening-library-heading">Piloto funcional · Set 1</h2>
              <span>Completa las cuatro familias en una sesión o deja el progreso guardado en este navegador.</span>
            </div>

            <article className={styles.setCard}>
              <div className={styles.setIdentity}>
                <span className={styles.setIcon}><Headphones aria-hidden="true" /></span>
                <div>
                  <p>TOEFL Listening</p>
                  <h3>Set 1 · recorrido seccional</h3>
                </div>
                <span className={styles.status}>Disponible</span>
              </div>
              <ul>
                {tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
              <div className={styles.setFooter}>
                <p><LockKeyhole aria-hidden="true" /> Las respuestas correctas permanecen en el servidor.</p>
                <Link href="/practica/toefl/listening/simulacros/practica/set-1">
                  Iniciar Listening Set 1 <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>

            <aside className={styles.nextSets}>
              <strong>Próxima etapa</strong>
              <p>Los demás sets se incorporarán solo después de aprobar la integridad, el audio, el móvil y el teclado de este piloto.</p>
            </aside>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="listening-library-faq">
          <div className="wrap">
            <p className={styles.kicker}>Antes de comenzar</p>
            <h2 id="listening-library-faq">Cómo funciona esta práctica</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
