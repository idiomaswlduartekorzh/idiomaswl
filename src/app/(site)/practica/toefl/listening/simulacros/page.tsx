import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Headphones, LockKeyhole, Radio } from 'lucide-react';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';
import { TOEFL_SECTIONAL_LISTENING_SET_IDS } from '@/data/toefl/sectional-listening-adapter';

import styles from './page.module.css';

const URL = 'https://www.idiomaswl.com/practica/toefl/listening/simulacros';

export const metadata: Metadata = {
  title: 'Práctica TOEFL Listening por secciones',
  description:
    'Practica TOEFL Listening en un recorrido fijo de WeLearn con audios originales, cuatro familias de tarea y corrección bruta sin puntuación oficial.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Práctica TOEFL Listening por secciones',
    description: 'Elige un recorrido de Listening con audios originales y corrección privada en servidor.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: '¿Esta práctica de Listening es adaptativa?',
    answer:
      'No. Cada recorrido es fijo y usa el subconjunto Listening del set correspondiente en los simulacros completos de WeLearn.',
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

function setNumberFromId(mockId: string) {
  return mockId.replace('set-', '');
}

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
                <h1>Elige un set. Entrena solo Listening.</h1>
                <p className={styles.lead}>
                  Cada recorrido toma únicamente los bloques Listening de su simulacro completo. Conserva los mismos
                  IDs, audios y corrección privada sin copiar el banco.
                </p>
              </div>
              <aside className={styles.scopeNote}>
                <Radio aria-hidden="true" />
                <strong>Colección fija WeLearn</strong>
                <p>Cada set es independiente. Ninguno reproduce el enrutamiento adaptativo ni genera una puntuación oficial.</p>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.library} aria-labelledby="listening-library-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Biblioteca Listening</p>
              <h2 id="listening-library-heading">20 recorridos para practicar por set</h2>
              <span>Elige cualquiera. Puedes completar sus cuatro familias en una sesión o continuar luego en este navegador.</span>
            </div>

            <aside className={styles.taskKey} aria-labelledby="listening-task-key">
              <div>
                <Headphones aria-hidden="true" />
                <strong id="listening-task-key">Qué encuentras en cada set</strong>
              </div>
              <ul>
                {tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </aside>

            <div className={styles.setGrid}>
              {TOEFL_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => {
                const setNumber = setNumberFromId(mockId);
                return (
                  <article className={styles.setCard} key={mockId}>
                    <div className={styles.setIdentity}>
                      <span className={styles.setNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p>TOEFL Listening</p>
                        <h3>Set {setNumber}</h3>
                      </div>
                      <span className={styles.status}>Disponible</span>
                    </div>
                    <p className={styles.setSummary}>Recorrido fijo con progreso guardado en este navegador.</p>
                    <div className={styles.setFooter}>
                      <p><LockKeyhole aria-hidden="true" /> Corrección privada</p>
                      <Link href={`/practica/toefl/listening/simulacros/practica/${mockId}`}>
                        Iniciar Set {setNumber} <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
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
