import type { Explainer } from './skill-blueprint';
import styles from '../task2/introduccion/page.module.css';

/**
 * Bloque 1 del blueprint: la explicación larga.
 *
 * Es un componente de servidor a propósito —no tiene estado ni interacción— para que el texto
 * viaje en el HTML. Es la parte que un buscador lee y la que alguien puede leer sin que cargue
 * ningún JavaScript, y en una lección eso importa más que en un ejercicio.
 *
 * Las dos secciones finales, `cost` y `limits`, son obligatorias por el tipo y no por capricho:
 * son las dos que ninguna explicación de IELTS suele traer. Qué se pierde exactamente si no
 * haces esto, y dónde deja de aplicar.
 */
export default function SkillExplainer({
  explainer,
  tone,
  kicker = 'Start here · the long version',
  heading,
}: {
  explainer: Explainer;
  tone: string;
  kicker?: string;
  heading: string;
}) {
  return (
    <section id="explanation" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>{kicker}</p>
        <h2>{heading}</h2>
        <p>{explainer.definition}</p>
      </div>

      {explainer.sections.map((section) => (
        <article key={section.heading} className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>{section.heading}</div>
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.paragraphJob}>{paragraph}</p>
          ))}
          {section.points && section.points.length > 0 && (
            <div className={styles.reviewGrid}>
              {section.points.map((point) => (
                <article key={point.term} className={`${styles.legoBlock} ${styles[tone]}`}>
                  <strong>{point.term}</strong>
                  <p>{point.detail}</p>
                </article>
              ))}
            </div>
          )}
        </article>
      ))}

      <div className={styles.reviewGrid}>
        <article className={styles.analysisCard}>
          <p className={styles.comparisonNote}>What it costs you to skip this</p>
          <p className={styles.paragraphJob}>{explainer.cost}</p>
        </article>
        <article className={styles.analysisCard}>
          <p className={styles.comparisonNote}>Where it stops applying</p>
          <p className={styles.paragraphJob}>{explainer.limits}</p>
        </article>
      </div>
    </section>
  );
}
