import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MEDICAL_MVP_AUDIT_LOG,
  MEDICAL_RESIDENCY_BLUEPRINTS,
  MEDICAL_RESIDENCY_OFFICIAL_SOURCES,
} from '@/data/medical-residency';
import styles from './residencias.module.css';

export const metadata: Metadata = {
  title: 'Residencias médicas en Colombia — MVP auditado | WeLearn',
  description:
    'Explora qué publican oficialmente las universidades colombianas sobre sus procesos de admisión médico-quirúrgicos.',
  robots: { index: false, follow: false },
};

const READINESS_COPY = {
  'full-simulation-ready': {
    label: 'Estructura suficiente',
    tone: 'ready',
    description: 'Cantidad, duración y composición verificadas.',
  },
  'partial-structure': {
    label: 'Estructura parcial',
    tone: 'partial',
    description: 'Hay datos útiles, pero faltan parámetros del examen.',
  },
  'program-agreement-required': {
    label: 'Depende del programa',
    tone: 'program',
    description: 'Cada especialidad requiere su acuerdo vigente.',
  },
  'monitor-only': {
    label: 'Solo monitoreo',
    tone: 'blocked',
    description: 'No existe evidencia suficiente para ofrecer producto.',
  },
} as const;

function evidenceCounts(blueprint: (typeof MEDICAL_RESIDENCY_BLUEPRINTS)[number]) {
  return Object.values(blueprint.exam).reduce(
    (counts, field) => {
      counts[field.status] += 1;
      return counts;
    },
    { explicit: 0, 'calculated-from-official-schedule': 0, 'not-published': 0 },
  );
}

export default function MedicalResidencyHubPage() {
  const fullMocks = MEDICAL_RESIDENCY_BLUEPRINTS.filter(
    (blueprint) => blueprint.capabilities.fullLengthMock,
  ).length;

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="medical-residency-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>MVP de preparación · Colombia</p>
            <h1 id="medical-residency-title">
              El examen cambia.
              <span>La evidencia queda a la vista.</span>
            </h1>
            <p className={styles.heroLead}>
              Comparamos únicamente documentos públicos de admisión. Cuando una universidad
              no publica un dato, lo mostramos como desconocido: no rellenamos el vacío con rumores.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="#universidades">
                Explorar universidades
              </Link>
              <Link className={styles.secondaryButton} href="/residencias-medicas/ucaldas/plan">
                Crear plan Caldas 2027
              </Link>
            </div>
          </div>

          <aside className={styles.evidenceConsole} aria-label="Estado del registro oficial">
            <p className={styles.consoleLabel}>Registro de evidencia</p>
            <div className={styles.consoleMetric}>
              <strong>{MEDICAL_RESIDENCY_OFFICIAL_SOURCES.length}</strong>
              <span>fuentes oficiales registradas</span>
            </div>
            <div className={styles.consoleMetric}>
              <strong>{MEDICAL_RESIDENCY_BLUEPRINTS.length}</strong>
              <span>perfiles universitarios o de campus</span>
            </div>
            <div className={styles.consoleMetric}>
              <strong>{fullMocks}</strong>
              <span>estructuras aptas para simulacro completo</span>
            </div>
            <p className={styles.consoleFoot}>Corte de evidencia: 28 ago 2026</p>
          </aside>
        </div>
      </section>

      <section className={styles.disclosure} aria-label="Alcance actual del MVP">
        <strong>Alcance actual</strong>
        <span>
          Navegador y planificación verificables. El banco clínico real sigue bloqueado hasta
          contar con autor médico, revisor independiente y actas persistentes.
        </span>
      </section>

      <section className={styles.section} id="universidades" aria-labelledby="universities-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Perfiles versionados</p>
            <h2 id="universities-title">Elige por evidencia, no por promesas.</h2>
          </div>
          <p>
            Cada ficha indica la convocatoria modelada, lo que puede construirse y lo que
            permanece bloqueado.
          </p>
        </div>

        <div className={styles.universityGrid}>
          {MEDICAL_RESIDENCY_BLUEPRINTS.map((blueprint) => {
            const readiness = READINESS_COPY[blueprint.readiness];
            const counts = evidenceCounts(blueprint);

            return (
              <article className={styles.universityCard} key={blueprint.slug}>
                <div className={styles.evidenceRail} aria-label="Resumen de evidencia">
                  <span className={styles.railExplicit} style={{ flex: counts.explicit || 0.2 }} />
                  <span
                    className={styles.railCalculated}
                    style={{ flex: counts['calculated-from-official-schedule'] || 0.2 }}
                  />
                  <span
                    className={styles.railUnknown}
                    style={{ flex: counts['not-published'] || 0.2 }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTopline}>
                    <span className={styles.statusBadge} data-tone={readiness.tone}>
                      {readiness.label}
                    </span>
                    <span className={styles.version}>{blueprint.effectiveCycle}</span>
                  </div>
                  <h3>{blueprint.university}</h3>
                  <p className={styles.campus}>{blueprint.campusOrRegion}</p>
                  <p className={styles.cardDescription}>{readiness.description}</p>
                  <dl className={styles.evidenceCounts}>
                    <div><dt>Publicados</dt><dd>{counts.explicit}</dd></div>
                    <div><dt>Calculados</dt><dd>{counts['calculated-from-official-schedule']}</dd></div>
                    <div><dt>No publicados</dt><dd>{counts['not-published']}</dd></div>
                  </dl>
                  <Link className={styles.cardLink} href={`/residencias-medicas/${blueprint.slug}`}>
                    {blueprint.readiness === 'monitor-only' ? 'Ver por qué está bloqueado' : 'Revisar evidencia'}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.auditSection} aria-labelledby="audit-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Registro append-only</p>
            <h2 id="audit-title">El MVP también muestra sus límites.</h2>
          </div>
          <p>Cada fase registra alcance, artefactos, verificaciones y bloqueos antes de avanzar.</p>
        </div>
        <ol className={styles.auditTimeline}>
          {MEDICAL_MVP_AUDIT_LOG.map((entry) => (
            <li key={entry.id}>
              <span className={styles.auditSequence}>{String(entry.sequence).padStart(2, '0')}</span>
              <div>
                <div className={styles.auditTitleRow}>
                  <h3>{entry.phase}</h3>
                  <span className={styles.auditStatus} data-status={entry.status}>
                    {entry.status === 'completed' ? 'Completada' : entry.status === 'blocked' ? 'Bloqueada' : 'En curso'}
                  </span>
                </div>
                <p>{entry.scope}</p>
                {entry.blockers.length > 0 && (
                  <p className={styles.blockerSummary}>{entry.blockers.length} condiciones pendientes</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
