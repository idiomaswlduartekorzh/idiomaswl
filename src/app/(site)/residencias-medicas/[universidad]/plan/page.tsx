import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CALDAS_FIRST_SPECIALTIES_2027,
  STUDY_PLAN_HOUR_OPTIONS,
  STUDY_PLAN_WEEK_OPTIONS,
  createCaldasStudyPlan,
  parseCaldasStudyPlanInput,
} from '@/data/medical-residency';
import styles from '../../residencias.module.css';

interface PageProps {
  params: Promise<{ universidad: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: 'Plan de estudio Universidad de Caldas 2027 | WeLearn',
  description: 'Prototipo reproducible basado en la composición pública 40+20 de la convocatoria 2027.',
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ universidad: 'ucaldas' }];
}

export default async function CaldasPlanPage({ params, searchParams }: PageProps) {
  const { universidad } = await params;
  if (universidad !== 'ucaldas') notFound();

  const values = await searchParams;
  const hasQuery = ['especialidad', 'semanas', 'horas'].some((key) => values[key] !== undefined);
  const input = parseCaldasStudyPlanInput(values);
  const plan = input ? createCaldasStudyPlan(input) : null;

  return (
    <div className={styles.page}>
      <section className={styles.planHero}>
        <div className={styles.breadcrumbs}>
          <Link href="/residencias-medicas">Residencias médicas</Link>
          <span aria-hidden="true">/</span>
          <Link href="/residencias-medicas/ucaldas">Universidad de Caldas</Link>
          <span aria-hidden="true">/</span>
          <span>Plan</span>
        </div>
        <p className={styles.kicker}>MVP 03 · Generador reproducible</p>
        <h1>Convierte el 40+20 en una semana concreta.</h1>
        <p>
          El cálculo ocurre en el servidor y queda representado en la URL. No crea una cuenta,
          no guarda datos personales y no estima tu probabilidad de admisión.
        </p>
      </section>

      <div className={styles.planLayout}>
        <section className={styles.planFormPanel} aria-labelledby="plan-form-title">
          <p className={styles.kicker}>Configurar</p>
          <h2 id="plan-form-title">Tu ventana de preparación</h2>
          <form method="get" className={styles.planForm}>
            <label>
              <span>Especialidad</span>
              <select name="especialidad" defaultValue={input?.specialty ?? 'medicina-interna'}>
                {CALDAS_FIRST_SPECIALTIES_2027.map((specialty) => (
                  <option key={specialty.slug} value={specialty.slug}>{specialty.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Semanas disponibles</span>
              <select name="semanas" defaultValue={String(input?.weeks ?? 12)}>
                {STUDY_PLAN_WEEK_OPTIONS.map((weeks) => (
                  <option key={weeks} value={weeks}>{weeks} semanas</option>
                ))}
              </select>
            </label>
            <label>
              <span>Horas por semana</span>
              <select name="horas" defaultValue={String(input?.hoursPerWeek ?? 6)}>
                {STUDY_PLAN_HOUR_OPTIONS.map((hours) => (
                  <option key={hours} value={hours}>{hours} horas</option>
                ))}
              </select>
            </label>
            <button className={styles.primaryButton} type="submit">Generar mi plan</button>
          </form>
          {hasQuery && !plan && (
            <p className={styles.formError} role="alert">
              La URL contiene valores fuera del contrato. Elige una opción válida y vuelve a generar el plan.
            </p>
          )}
          <div className={styles.formAuditNote}>
            <strong>Fuente del cálculo</strong>
            <span>Convocatoria ECQ Universidad de Caldas 2027 · blueprint ucaldas-2027.v1</span>
          </div>
        </section>

        <section className={styles.planResult} aria-live="polite" aria-labelledby="plan-result-title">
          {plan ? (
            <>
              <div className={styles.resultHeader}>
                <div>
                  <p className={styles.kicker}>Plan generado</p>
                  <h2 id="plan-result-title">{plan.specialty}</h2>
                </div>
                <div className={styles.totalHours}>
                  <strong>{plan.totalHours}</strong>
                  <span>horas totales</span>
                </div>
              </div>

              <div className={styles.allocationBar} aria-label="Distribución semanal">
                <span style={{ width: '66.666%' }}>40 general</span>
                <span style={{ width: '33.334%' }}>20 específica</span>
              </div>

              <div className={styles.allocationGrid}>
                {plan.weeklyAllocation.map((block) => (
                  <article key={block.id}>
                    <span>{block.officialQuestionShare}</span>
                    <strong>{block.hours} h/semana</strong>
                    <h3>{block.label}</h3>
                  </article>
                ))}
              </div>

              <ol className={styles.checkpointList}>
                {plan.checkpoints.map((checkpoint) => (
                  <li key={`${checkpoint.week}-${checkpoint.label}`}>
                    <span>Semana {checkpoint.week}</span>
                    <div><strong>{checkpoint.label}</strong><p>{checkpoint.purpose}</p></div>
                  </li>
                ))}
              </ol>

              <p className={styles.planDisclaimer}>{plan.disclaimer}</p>
            </>
          ) : (
            <div className={styles.planEmpty}>
              <span className={styles.emptyPulse} aria-hidden="true" />
              <p className={styles.kicker}>Sin datos personales</p>
              <h2 id="plan-result-title">Tu distribución aparecerá aquí.</h2>
              <p>Elige especialidad, semanas y horas. El resultado puede compartirse copiando la URL.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
