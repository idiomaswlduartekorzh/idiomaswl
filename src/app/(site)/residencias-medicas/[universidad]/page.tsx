import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MEDICAL_RESIDENCY_BLUEPRINTS,
  MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG,
  MEDICAL_RESIDENCY_SOURCE_BY_ID,
  type EvidenceValue,
  type MedicalResidencyUniversitySlug,
  type PublishedSelectionWeights,
  type ExamCompositionBlock,
} from '@/data/medical-residency';
import styles from '../residencias.module.css';

interface PageProps {
  params: Promise<{ universidad: string }>;
}

const EVIDENCE_LABEL = {
  explicit: 'Publicado',
  'calculated-from-official-schedule': 'Calculado',
  'not-published': 'No publicado',
} as const;

const DOMAIN_SCOPE_LABEL = {
  general: 'General',
  specialty: 'Especialidad',
  basic: 'Ciencias básicas',
  clinical: 'Clínico',
  community: 'Salud comunitaria',
  humanistic: 'Humanístico',
  other: 'Otro dominio',
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return MEDICAL_RESIDENCY_BLUEPRINTS.map(({ slug }) => ({ universidad: slug }));
}

function isUniversitySlug(value: string): value is MedicalResidencyUniversitySlug {
  return value in MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { universidad } = await params;
  if (!isUniversitySlug(universidad)) return {};
  const blueprint = MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG[universidad];

  return {
    title: `${blueprint.university}: evidencia de admisión médica | WeLearn`,
    description: `Datos públicos, vacíos y capacidades del perfil ${blueprint.marketLabel}.`,
    robots: { index: false, follow: false },
  };
}

function formatComposition(value: readonly ExamCompositionBlock[]) {
  return value.map((block) => {
    const measure = block.questions != null ? `${block.questions} preguntas` : `${block.percentage} %`;
    return `${block.label}: ${measure}`;
  }).join(' · ');
}

function formatWeights(value: PublishedSelectionWeights) {
  const weights = value.components
    .map(({ component, percentage }) => {
      const label = component === 'knowledge-exam' ? 'Examen' : component === 'interview' ? 'Entrevista' : 'Hoja de vida';
      return `${label} ${percentage} %`;
    })
    .join(' · ');
  return value.complete ? weights : `${weights} · total publicado incompleto`;
}

function EvidenceRow({
  label,
  evidence,
  format,
}: {
  label: string;
  evidence: EvidenceValue<unknown>;
  format?: (value: never) => string;
}) {
  let value = 'La fuente consultada no publica este dato.';

  if (evidence.value != null) {
    if (format) value = format(evidence.value as never);
    else if (typeof evidence.value === 'number') value = String(evidence.value);
    else value = String(evidence.value);
  }

  return (
    <div className={styles.evidenceRow}>
      <dt>{label}</dt>
      <dd>
        <span className={styles.evidenceState} data-state={evidence.status}>
          {EVIDENCE_LABEL[evidence.status]}
        </span>
        <strong>{value}</strong>
        <small>{evidence.note}</small>
      </dd>
    </div>
  );
}

export default async function UniversityEvidencePage({ params }: PageProps) {
  const { universidad } = await params;
  if (!isUniversitySlug(universidad)) notFound();
  const blueprint = MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG[universidad];
  const sources = blueprint.sourceIds.map((sourceId) => MEDICAL_RESIDENCY_SOURCE_BY_ID[sourceId]);

  return (
    <div className={styles.page}>
      <section className={styles.profileHero}>
        <div className={styles.breadcrumbs}>
          <Link href="/residencias-medicas">Residencias médicas</Link>
          <span aria-hidden="true">/</span>
          <span>{blueprint.campusOrRegion}</span>
        </div>
        <div className={styles.profileHeroGrid}>
          <div>
            <p className={styles.kicker}>Blueprint {blueprint.version}</p>
            <h1>{blueprint.university}</h1>
            <p className={styles.profileLead}>{blueprint.marketLabel}</p>
          </div>
          <div className={styles.profileStamp}>
            <span>Ciclo modelado</span>
            <strong>{blueprint.effectiveCycle}</strong>
            <small>Preparación independiente</small>
          </div>
        </div>
      </section>

      <div className={styles.profileLayout}>
        <div className={styles.profileMain}>
          <section className={styles.profileSection} aria-labelledby="exam-contract-title">
            <div className={styles.profileSectionHeading}>
              <p className={styles.kicker}>Contrato del examen</p>
              <h2 id="exam-contract-title">Qué sabemos y qué no.</h2>
            </div>
            <dl className={styles.evidenceTable}>
              <EvidenceRow label="Número de preguntas" evidence={blueprint.exam.questionCount} />
              <EvidenceRow
                label="Duración"
                evidence={blueprint.exam.durationMinutes}
                format={(value) => `${value} minutos`}
              />
              <EvidenceRow
                label="Composición"
                evidence={blueprint.exam.composition}
                format={formatComposition}
              />
              <EvidenceRow label="Formato de ítem" evidence={blueprint.exam.itemFormat} />
              <EvidenceRow label="Puntaje mínimo" evidence={blueprint.exam.minimumPassingScore} />
              <EvidenceRow label="Calificación" evidence={blueprint.exam.scoringMethod} />
              <EvidenceRow
                label="Ponderación de selección"
                evidence={blueprint.exam.selectionWeights}
                format={formatWeights}
              />
              <EvidenceRow label="Inglés médico" evidence={blueprint.exam.medicalEnglish} />
            </dl>
          </section>

          <section className={styles.profileSection} aria-labelledby="domains-title">
            <div className={styles.profileSectionHeading}>
              <p className={styles.kicker}>Dominios oficiales</p>
              <h2 id="domains-title">Categorías nombradas por la universidad.</h2>
            </div>
            {blueprint.officialDomains.length ? (
              <ul className={styles.domainList}>
                {blueprint.officialDomains.map((domain) => (
                  <li key={domain.id}>
                    <span>{DOMAIN_SCOPE_LABEL[domain.scope]}</span>
                    <strong>{domain.label}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState}>
                La fuente general consultada no publica dominios suficientes. No se inventó una taxonomía institucional.
              </p>
            )}
          </section>
        </div>

        <aside className={styles.profileAside}>
          {blueprint.slug === 'ucaldas' ? (
            <div className={styles.actionPanel}>
              <p className={styles.kicker}>Primer corte funcional</p>
              <h2>Crea un plan reproducible.</h2>
              <p>Distribuye tus horas con la proporción oficial 40+20. Aún no consume preguntas clínicas.</p>
              <Link className={styles.primaryButton} href="/residencias-medicas/ucaldas/plan">
                Crear plan 2027
              </Link>
            </div>
          ) : (
            <div className={styles.actionPanelMuted}>
              <p className={styles.kicker}>Estado del MVP</p>
              <h2>Plan interactivo no habilitado.</h2>
              <p>Primero se cerrará el vertical de Caldas y su auditoría antes de ampliar perfiles.</p>
            </div>
          )}

          <div className={styles.sourcePanel}>
            <h2>Fuentes oficiales</h2>
            <ul>
              {sources.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    <strong>{source.title}</strong>
                    <span>{source.institution} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.noticePanel}>
            <strong>Aviso de independencia</strong>
            <p>{blueprint.independentPreparationNotice}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
