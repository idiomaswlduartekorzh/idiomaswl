import type { AutodidactaPlanId } from '../xpress-commerce/catalog.ts';
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
  'cambridge-b2': 'Cambridge B2 First',
  goethe: 'Goethe',
  'delf-dalf': 'DELF',
  'cils-celi': 'CILS',
  topik: 'TOPIK I',
  'celpe-bras': 'CELPE-Bras',
};

export function xpressClassSelection(examSlug: XpressExamSlug, plan: CoursePlanId = 'esencial'): Selection {
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug);
  if (!exam) throw new Error('unknown_xpress_exam');
  if (!PLANS.some((item) => item.id === plan)) throw new Error('unknown_course_plan');
  return {
    language: exam.language,
    objective: XPRESS_CLASS_OBJECTIVES[examSlug],
    plan,
    level: LEVELS[0],
  };
}

export function xpressExamForClassSelection(language: string, objective: string): XpressExamSlug | null {
  const aliases: Readonly<Record<string, XpressExamSlug>> = {
    'IELTS General Training': 'ielts', DALF: 'delf-dalf', CELI: 'cils-celi', 'TOPIK II': 'topik',
  };
  if (aliases[objective]) {
    const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === aliases[objective]);
    return exam?.language === language ? aliases[objective] : null;
  }
  return (Object.entries(XPRESS_CLASS_OBJECTIVES) as [XpressExamSlug, string][])
    .find(([examSlug, examObjective]) => {
      const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug);
      return exam?.language === language && examObjective === objective;
    })?.[0] ?? null;
}

export function xpressClassPurchasePath(examSlug: XpressExamSlug, options?: { plan?: CoursePlanId; startAtRules?: boolean }): string {
  const path = selectionPath(xpressClassSelection(examSlug, options?.plan));
  return options?.startAtRules ? `${path}&paso=reglamento` : path;
}

export function guidedLanguagePurchasePath(language: WelearnLanguage, plan: CoursePlanId, exam?: XpressExamSlug): string {
  const selection = exam ? xpressClassSelection(exam, plan) : { language, objective: 'general', plan, level: LEVELS[0] };
  return `${selectionPath(selection)}&paso=reglamento`;
}

export type RegistrationIntent =
  | Readonly<{ path: 'welearn'; language: WelearnLanguage; plan: CoursePlanId; exam?: XpressExamSlug }>
  | Readonly<{ path: 'exam'; language: WelearnLanguage; exam: XpressExamSlug; plan: AutodidactaPlanId }>;

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
    const exam = scalar(input.exam);
    if (WELEARN_LANGUAGE_OPTIONS.some((item) => item.id === language) && PLANS.some((item) => item.id === plan)) {
      const matchingExam = exam ? XPRESS_EXAM_OPTIONS.find((item) => item.id === exam && item.language === language) : null;
      if (exam && !matchingExam) return null;
      return {
        path,
        language: language as WelearnLanguage,
        plan: plan as CoursePlanId,
        ...(matchingExam ? { exam: matchingExam.id } : {}),
      };
    }
    return null;
  }
  if (path === 'exam') {
    const language = scalar(input.language);
    const exam = scalar(input.exam);
    const plan = scalar(input.plan);
    const matchingExam = XPRESS_EXAM_OPTIONS.find((item) => item.id === exam);
    if (matchingExam && matchingExam.language === language && ['exam-free', 'exam-basic', 'exam-auto', 'exam-teacher'].includes(String(plan))) {
      return { path, language: language as WelearnLanguage, exam: exam as XpressExamSlug, plan: plan as AutodidactaPlanId };
    }
  }
  return null;
}

export function registrationIntentMetadata(intent: RegistrationIntent) {
  if (intent.path === 'welearn') {
    return {
      student_path: 'welearn' as const,
      language: intent.language,
      subject: intent.exam ?? intent.language,
      target_exam: intent.exam ?? null,
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
  if (intent.path === 'welearn') {
    params.set('plan', intent.plan);
    if (intent.exam) params.set('exam', intent.exam);
  }
  else {
    params.set('exam', intent.exam);
    params.set('plan', intent.plan);
  }
  return `/registro/completar?${params.toString()}`;
}

export function registrationPurchasePath(intent: RegistrationIntent): string {
  if (intent.path === 'exam') {
    if (intent.plan === 'exam-free') return '/dashboard/student';
    return `/suscripcion/examenes?${new URLSearchParams({ exam: intent.exam, plan: intent.plan }).toString()}`;
  }
  if (intent.exam) return xpressClassPurchasePath(intent.exam, { plan: intent.plan, startAtRules: true });
  return selectionPath({ language: intent.language, objective: 'general', plan: intent.plan, level: LEVELS[0] });
}
