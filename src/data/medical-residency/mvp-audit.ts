import type { OfficialSourceId } from './types.ts';

export type MedicalMvpPhaseStatus = 'completed' | 'in-progress' | 'blocked';

export interface MedicalMvpAuditEntry {
  id: `MR-MVP-${number}`;
  sequence: number;
  recordedAt: string;
  phase: string;
  status: MedicalMvpPhaseStatus;
  scope: string;
  artifacts: readonly string[];
  sourceIds: readonly OfficialSourceId[];
  verification: readonly string[];
  blockers: readonly string[];
}

/**
 * Registro de liberación append-only del MVP.
 *
 * No sustituye el futuro log transaccional en base de datos. Audita qué puede
 * afirmarse y mostrarse en cada corte de esta rama antes de existir persistencia.
 */
export const MEDICAL_MVP_AUDIT_LOG = [
  {
    id: 'MR-MVP-1',
    sequence: 1,
    recordedAt: '2026-08-28',
    phase: 'Evidencia y límites',
    status: 'completed',
    scope: 'Registro de fuentes oficiales, vacíos publicados y capacidad por universidad.',
    artifacts: [
      'src/data/medical-residency/official-sources.ts',
      'src/data/medical-residency/university-blueprints.ts',
    ],
    sourceIds: [
      'udea-resolution-00006-2026',
      'univalle-resolution-374-2024',
      'ucaldas-call-2027',
      'unal-admissions-2027-1',
      'unilibre-applicant-guide-2025',
      'unicartagena-call-2027-1',
      'uninorte-medical-specializations',
      'uniatlantico-snies-guide-2026',
    ],
    verification: ['check:medical-residency-blueprints', 'test:medical-residency-blueprints'],
    blockers: [],
  },
  {
    id: 'MR-MVP-2',
    sequence: 2,
    recordedAt: '2026-08-28',
    phase: 'Arquitectura de producto',
    status: 'completed',
    scope: 'Contrato de preguntas, taxonomía, flujo editorial, UX, negocio y seguridad.',
    artifacts: [
      'src/data/medical-residency/types.ts',
      'src/data/medical-residency/editorial-taxonomy.ts',
      'docs/medicina-residencias/ARQUITECTURA-PRODUCTO.md',
      'docs/medicina-residencias/FLUJO-DE-TRABAJO.md',
    ],
    sourceIds: ['ucaldas-call-2027', 'unicartagena-call-2027-1'],
    verification: ['npx tsc --noEmit', 'npx eslint', 'check:practica-catalog'],
    blockers: [],
  },
  {
    id: 'MR-MVP-3',
    sequence: 3,
    recordedAt: '2026-08-28',
    phase: 'Navegador y plan reproducible',
    status: 'completed',
    scope: 'Catálogo, ficha de evidencia y generador GET de plan para Caldas sin persistencia ni contenido clínico.',
    artifacts: [
      'src/app/(site)/residencias-medicas/page.tsx',
      'src/app/(site)/residencias-medicas/[universidad]/page.tsx',
      'src/app/(site)/residencias-medicas/[universidad]/plan/page.tsx',
      'src/data/medical-residency/mvp-plan.ts',
    ],
    sourceIds: ['ucaldas-call-2027'],
    verification: [
      'test:medical-residency-blueprints',
      'npx tsc --noEmit',
      'browser: desktop, mobile, teclado y estados inválidos',
    ],
    blockers: [],
  },
  {
    id: 'MR-MVP-4',
    sequence: 4,
    recordedAt: '2026-08-28',
    phase: 'Primer lote clínico',
    status: 'blocked',
    scope: 'Producción y piloto del primer lote médico real.',
    artifacts: ['docs/medicina-residencias/FLUJO-DE-TRABAJO.md'],
    sourceIds: ['ucaldas-call-2027'],
    verification: [],
    blockers: [
      'Falta médico responsable identificado.',
      'Falta revisor clínico independiente.',
      'Falta presupuesto editorial por ítem revisado.',
      'Falta persistencia de actas y eventos de auditoría.',
    ],
  },
] as const satisfies readonly MedicalMvpAuditEntry[];
