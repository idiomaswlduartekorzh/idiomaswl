import type { XpressOfferId } from '../xpress-commerce/catalog.ts';
import { LEVELS, PLANS, selectionPath, type CoursePlanId, type Selection } from '../course-pricing/catalog.ts';

export const STUDENT_PATHS = [
  { id: 'welearn', label: 'Idioma general', description: 'Clases en vivo para aprender y practicar el idioma.' },
  { id: 'exam', label: 'Preparación para un examen', description: 'Simulacros, correcciones y apoyo opcional de docentes.' },
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

const XPRESS_CLASS_OBJECTIVES: Readonly<Record<XpressExamSlug, string>> = {
  ielts: 'IELTS Academic',
  toefl: 'TOEFL iBT',
  sat: 'SAT Reading and Writing',
  icfes: 'ICFES inglés',
  'cambridge-b2': 'general',
  goethe: 'Goethe',
  'delf-dalf': 'DELF',
  'cils-celi': 'CILS',
  topik: 'TOPIK I',
  'celpe-bras': 'CELPE-Bras',
};

export function xpressClassSelection(examSlug: XpressExamSlug): Selection {
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug);
  if (!exam) throw new Error('unknown_xpress_exam');
  return {
    language: exam.language,
    objective: XPRESS_CLASS_OBJECTIVES[examSlug],
    plan: 'esencial',
    level: LEVELS[0],
  };
}

export function xpressClassPurchasePath(examSlug: XpressExamSlug): string {
  return selectionPath(xpressClassSelection(examSlug));
}

export type RegistrationIntent =
  | Readonly<{ path: 'welearn'; language: WelearnLanguage; plan: CoursePlanId }>
  | Readonly<{ path: 'exam'; language: WelearnLanguage; exam: XpressExamSlug; plan: XpressOfferId }>;

function scalar(value: unknown): string | null {
  return typeof value === 'string' ? value : Array.isArray(value) && typeof value[0] === 'string' ? value[0] : null;
}

export function parseRegistrationIntent(value: unknown): RegistrationIntent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const path = scalar(input.path);
  if (path === 'welearn') {
    const language = scalar(input.language);
    const plan = scalar(input.plan);
    if (WELEARN_LANGUAGE_OPTIONS.some((item) => item.id === language) && PLANS.some((item) => item.id === plan)) {
      return { path, language: language as WelearnLanguage, plan: plan as CoursePlanId };
    }
    return null;
  }
  if (path === 'exam') {
    const language = scalar(input.language);
    const exam = scalar(input.exam);
    const plan = scalar(input.plan);
    const matchingExam = XPRESS_EXAM_OPTIONS.find((item) => item.id === exam);
    if (matchingExam && matchingExam.language === language && (plan === 'exam-single' || plan === 'exam-auto' || plan === 'exam-teacher')) {
      return { path, language: language as WelearnLanguage, exam: exam as XpressExamSlug, plan };
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
  params.set('language', intent.language);
  if (intent.path === 'welearn') params.set('plan', intent.plan);
  else {
    params.set('exam', intent.exam);
    params.set('plan', intent.plan);
  }
  return `/registro/completar?${params.toString()}`;
}

export function registrationPurchasePath(intent: RegistrationIntent): string {
  if (intent.path === 'exam') return '/suscripcion/examenes';
  return selectionPath({ language: intent.language, objective: 'general', plan: intent.plan, level: LEVELS[0] });
}
