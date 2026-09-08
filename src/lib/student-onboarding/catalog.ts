import type { XpressOfferId } from '../xpress-commerce/catalog.ts';

export const STUDENT_PATHS = [
  { id: 'welearn', label: 'Aprender un idioma', description: 'Clases y acompañamiento WeLearn.' },
  { id: 'exam', label: 'Preparar un examen', description: 'Simulacros y correcciones.' },
] as const;

export const WELEARN_LANGUAGE_OPTIONS = [
  { id: 'ingles', label: 'Inglés' },
  { id: 'coreano', label: 'Coreano' },
  { id: 'frances', label: 'Francés' },
  { id: 'aleman', label: 'Alemán' },
  { id: 'italiano', label: 'Italiano' },
  { id: 'portugues', label: 'Portugués' },
  { id: 'japones', label: 'Japonés' },
  { id: 'ruso', label: 'Ruso' },
] as const;

export const XPRESS_EXAM_OPTIONS = [
  { id: 'ielts', label: 'IELTS', language: 'ingles' },
  { id: 'toefl', label: 'TOEFL iBT', language: 'ingles' },
  { id: 'sat', label: 'SAT', language: 'ingles' },
  { id: 'icfes', label: 'ICFES Saber 11', language: 'ingles' },
  { id: 'cambridge-b2', label: 'Cambridge B2 First', language: 'ingles' },
  { id: 'goethe', label: 'Goethe-Zertifikat', language: 'aleman' },
  { id: 'delf-dalf', label: 'DELF / DALF', language: 'frances' },
  { id: 'cils-celi', label: 'CILS / CELI', language: 'italiano' },
  { id: 'topik', label: 'TOPIK', language: 'coreano' },
  { id: 'celpe-bras', label: 'CELPE-BRAS', language: 'portugues' },
] as const;

export type StudentPath = (typeof STUDENT_PATHS)[number]['id'];
export type WelearnLanguage = (typeof WELEARN_LANGUAGE_OPTIONS)[number]['id'];
export type XpressExamSlug = (typeof XPRESS_EXAM_OPTIONS)[number]['id'];

export type RegistrationIntent =
  | Readonly<{ path: 'welearn'; language: WelearnLanguage }>
  | Readonly<{ path: 'exam'; exam: XpressExamSlug; plan: XpressOfferId }>;

function scalar(value: unknown): string | null {
  return typeof value === 'string' ? value : Array.isArray(value) && typeof value[0] === 'string' ? value[0] : null;
}

export function parseRegistrationIntent(value: unknown): RegistrationIntent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const path = scalar(input.path);
  if (path === 'welearn') {
    const language = scalar(input.language);
    if (WELEARN_LANGUAGE_OPTIONS.some((item) => item.id === language)) {
      return { path, language: language as WelearnLanguage };
    }
    return null;
  }
  if (path === 'exam') {
    const exam = scalar(input.exam);
    const plan = scalar(input.plan);
    if (XPRESS_EXAM_OPTIONS.some((item) => item.id === exam) && (plan === 'exam-auto' || plan === 'exam-teacher')) {
      return { path, exam: exam as XpressExamSlug, plan };
    }
  }
  return null;
}

export function registrationIntentMetadata(intent: RegistrationIntent) {
  if (intent.path === 'welearn') {
    return {
      student_path: 'welearn' as const,
      language: intent.language,
      subject: intent.language,
      target_exam: null,
      xpress_plan_interest: null,
    };
  }
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === intent.exam)!;
  return {
    student_path: 'exam' as const,
    language: exam.language,
    subject: intent.exam,
    target_exam: intent.exam,
    xpress_plan_interest: intent.plan,
  };
}

export function registrationCompletionPath(intent: RegistrationIntent, returnTo = '/dashboard'): string {
  const params = new URLSearchParams({ path: intent.path, return: returnTo });
  if (intent.path === 'welearn') params.set('language', intent.language);
  else {
    params.set('exam', intent.exam);
    params.set('plan', intent.plan);
  }
  return `/registro/completar?${params.toString()}`;
}
