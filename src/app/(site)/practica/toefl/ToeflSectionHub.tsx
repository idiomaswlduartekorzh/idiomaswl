import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { CourseSchema } from '@/components/practica/EducationSchema';

import styles from './page.module.css';

const BASE_URL = 'https://www.idiomaswl.com';

export type ToeflSectionTask = {
  title: string;
  description: string;
  measures: string;
};

export type ToeflSectionFaq = {
  question: string;
  answer: string;
};

type Props = {
  section: 'Listening' | 'Speaking';
  url: string;
  title: string;
  lead: string;
  facts: { value: string; label: string }[];
  tasks: ToeflSectionTask[];
  officialSummary: string[];
  practiceSteps: string[];
  weLearnSummary: string;
  officialUrl: string;
  faqs: ToeflSectionFaq[];
};

export default function ToeflSectionHub({
  section,
  url,
  title,
  lead,
  facts,
  tasks,
  officialSummary,
  practiceSteps,
  weLearnSummary,
  officialUrl,
  faqs,
}: Props) {
  return (
    <>
      <CourseSchema
        name={`TOEFL ${section} Practice 2026`}
        description={lead}
        url={url}
        educationalLevel="A2,B1,B2,C1"
        teaches={`TOEFL ${section}, ${tasks.map((task) => task.title).join(', ')}`}
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name={`TOEFL ${section} Practice 2026`}
        url={url}
        description={lead}
        teaches={tasks.map((task) => task.title)}
        isPartOf={{ name: 'Práctica TOEFL 2026', url: `${BASE_URL}/practica/toefl` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${BASE_URL}/practica` },
          { name: 'TOEFL', url: `${BASE_URL}/practica/toefl` },
          { name: section, url },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/practica">Práctica</Link><span>›</span>
              <Link href="/practica/toefl">TOEFL</Link><span>›</span>
              <span>{section}</span>
            </nav>
            <p className={styles.kicker}>TOEFL iBT · formato vigente desde el 21 de enero de 2026</p>
            <h1>{title}</h1>
            <p className={styles.lead}>{lead}</p>
            <div className={styles.facts} aria-label={`Resumen de TOEFL ${section}`}>
              {facts.map((fact) => (
                <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.routes} aria-labelledby="task-types-heading">
          <div className="wrap">
            <div className={styles.sectionHeading}>
              <p>Formato oficial 2026</p>
              <h2 id="task-types-heading">Tareas actuales de TOEFL {section}</h2>
              <span>Estas son las familias que ETS publica para el examen posterior al 21 de enero de 2026.</span>
            </div>
            <div className={styles.routeGrid}>
              {tasks.map((task) => (
                <article key={task.title} className={styles.routeCard}>
                  <div className={styles.routeTop}><small>Tarea actual</small></div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <span className={styles.routeCta}>Mide: {task.measures}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.guide}>
          <div className="wrap">
            <div className={styles.guideGrid}>
              <article>
                <p className={styles.guideEyebrow}>Qué ocurre en el TOEFL oficial</p>
                <h2>Formato oficial y práctica WeLearn no son lo mismo</h2>
                {officialSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p>
                  Fuente revisada: <a href={officialUrl} target="_blank" rel="noopener noreferrer">ETS — TOEFL iBT {section} Section</a>.
                </p>
              </article>
              <aside className={styles.disclosure}>
                <strong>Qué sí ofrece WeLearn</strong>
                <p>{weLearnSummary}</p>
                <strong>Qué no afirmamos</strong>
                <p>Los materiales son originales de WeLearn. No son preguntas oficiales de ETS y un recorrido fijo no reproduce el algoritmo adaptativo del examen real.</p>
              </aside>
            </div>

            <div className={styles.practiceBlock}>
              <p className={styles.guideEyebrow}>Ruta de práctica</p>
              <h2>Cómo usar los 20 simulacros sin repetir errores</h2>
              <ol>
                {practiceSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <div className={styles.actionRow}>
                <Link href="/examenes/toefl#simulacros" className="btn">Elegir un simulacro TOEFL</Link>
                <Link href="/practica/toefl" className="btn btn-ghost">Volver al mapa de las 4 secciones</Link>
              </div>
            </div>

            <section className={styles.faq} aria-labelledby="faq-heading">
              <p className={styles.guideEyebrow}>Preguntas frecuentes</p>
              <h2 id="faq-heading">Dudas sobre TOEFL {section} 2026</h2>
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
