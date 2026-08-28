import { MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG } from './university-blueprints.ts';
import type { OfficialSourceId } from './types.ts';

export const CALDAS_FIRST_SPECIALTIES_2027 = [
  { slug: 'anestesiologia', label: 'Anestesiología' },
  { slug: 'cirugia-general', label: 'Cirugía General' },
  { slug: 'medicina-interna', label: 'Medicina Interna' },
  { slug: 'medicina-interna-geriatria', label: 'Medicina Interna–Geriatría' },
  { slug: 'medicina-de-urgencias', label: 'Medicina de Urgencias' },
  { slug: 'obstetricia-ginecologia', label: 'Obstetricia y Ginecología' },
  { slug: 'pediatria', label: 'Pediatría' },
] as const;

export type CaldasSpecialtySlug = (typeof CALDAS_FIRST_SPECIALTIES_2027)[number]['slug'];

export const STUDY_PLAN_WEEK_OPTIONS = [4, 8, 12, 16] as const;
export const STUDY_PLAN_HOUR_OPTIONS = [4, 6, 8, 10, 12] as const;

export interface CaldasStudyPlanInput {
  specialty: CaldasSpecialtySlug;
  weeks: (typeof STUDY_PLAN_WEEK_OPTIONS)[number];
  hoursPerWeek: (typeof STUDY_PLAN_HOUR_OPTIONS)[number];
}

export interface CaldasStudyPlan {
  blueprintVersion: string;
  sourceIds: readonly OfficialSourceId[];
  specialty: string;
  weeks: number;
  hoursPerWeek: number;
  totalHours: number;
  weeklyAllocation: readonly {
    id: 'general-medicine' | 'target-specialty';
    label: string;
    hours: number;
    officialQuestionShare: string;
  }[];
  checkpoints: readonly {
    week: number;
    label: string;
    purpose: string;
  }[];
  disclaimer: string;
}

function includesNumber<T extends number>(values: readonly T[], value: number): value is T {
  return values.includes(value as T);
}

export function isCaldasSpecialty(value: string): value is CaldasSpecialtySlug {
  return CALDAS_FIRST_SPECIALTIES_2027.some((specialty) => specialty.slug === value);
}

export function parseCaldasStudyPlanInput(
  values: Record<string, string | string[] | undefined>,
): CaldasStudyPlanInput | null {
  const specialty = typeof values.especialidad === 'string' ? values.especialidad : '';
  const weeks = Number(typeof values.semanas === 'string' ? values.semanas : NaN);
  const hoursPerWeek = Number(typeof values.horas === 'string' ? values.horas : NaN);

  if (
    !isCaldasSpecialty(specialty)
    || !includesNumber(STUDY_PLAN_WEEK_OPTIONS, weeks)
    || !includesNumber(STUDY_PLAN_HOUR_OPTIONS, hoursPerWeek)
  ) {
    return null;
  }

  return { specialty, weeks, hoursPerWeek };
}

export function createCaldasStudyPlan(input: CaldasStudyPlanInput): CaldasStudyPlan {
  const blueprint = MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG.ucaldas;
  const specialty = CALDAS_FIRST_SPECIALTIES_2027.find((entry) => entry.slug === input.specialty);

  if (!specialty) {
    throw new Error(`Especialidad de Caldas no soportada: ${input.specialty}`);
  }

  const generalHours = Math.round((input.hoursPerWeek * 2 / 3) * 2) / 2;
  const specialtyHours = input.hoursPerWeek - generalHours;
  const middleWeek = Math.max(2, Math.round(input.weeks / 2));

  return {
    blueprintVersion: blueprint.version,
    sourceIds: blueprint.sourceIds,
    specialty: specialty.label,
    weeks: input.weeks,
    hoursPerWeek: input.hoursPerWeek,
    totalHours: input.weeks * input.hoursPerWeek,
    weeklyAllocation: [
      {
        id: 'general-medicine',
        label: 'Medicina general',
        hours: generalHours,
        officialQuestionShare: '40 de 60 preguntas',
      },
      {
        id: 'target-specialty',
        label: specialty.label,
        hours: specialtyHours,
        officialQuestionShare: '20 de 60 preguntas',
      },
    ],
    checkpoints: [
      {
        week: 1,
        label: 'Línea de base',
        purpose: 'Registrar precisión, tiempo y confianza sin estimar probabilidad de admisión.',
      },
      {
        week: middleWeek,
        label: 'Control intermedio',
        purpose: 'Comparar desempeño por bloque y reordenar el repaso.',
      },
      {
        week: input.weeks,
        label: 'Ensayo de cierre',
        purpose: 'Completar un bloque de 60 ítems en 120 minutos cuando el banco clínico esté aprobado.',
      },
    ],
    disclaimer:
      'Plan educativo independiente construido sobre la composición pública 40+20 de la convocatoria 2027. No predice admisión y todavía no contiene preguntas clínicas publicadas.',
  };
}
