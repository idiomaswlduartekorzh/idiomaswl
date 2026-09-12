import { EXAMS } from '@/data/exams';
import { XPRESS_EXAM_OPTIONS, type XpressExamSlug } from '@/lib/student-onboarding/catalog';

export type StudentProductKind = 'single' | 'automatic' | 'personalized';

export type StudentMock = Readonly<{
  id: string;
  title: string;
  subtitle: string;
  href: string;
  parts: number;
  questions: number;
}>;

export type StudentExamWorkspace = Readonly<{
  slug: XpressExamSlug;
  name: string;
  flag: string;
  language: string;
  color: string;
  hubHref: string;
  mocks: readonly StudentMock[];
}>;

export const STUDENT_PRODUCT_COPY = Object.freeze({
  single: {
    label: 'Un examen',
    price: '$12.900 COP',
    billing: 'pago único',
    summary: 'Un intento, su resultado y el reporte detallado.',
  },
  automatic: {
    label: 'Xpress',
    price: '$49.900 COP',
    billing: 'cada 30 días',
    summary: 'Todos los simulacros de tu examen, corrección automática y progreso.',
  },
  personalized: {
    label: 'Xpress + feedback',
    price: '$99.900 COP',
    billing: 'cada 30 días',
    summary: 'Todo Xpress más feedback pedagógico personalizado de WeLearn, asistido por IA.',
  },
} as const);

function mockHref(examSlug: string, mock: { id: string; href?: string }): string {
  return mock.href ?? `/examenes/${examSlug}/practica/${mock.id}`;
}

export function getStudentExamWorkspace(examSlug: string | null | undefined): StudentExamWorkspace | null {
  const option = XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug);
  const exam = examSlug ? EXAMS[examSlug] : null;
  if (!option || !exam || !exam.available) return null;
  return {
    slug: option.id,
    name: option.label,
    flag: exam.flag,
    language: exam.language,
    color: exam.color,
    hubHref: `/examenes/${exam.slug}`,
    mocks: exam.mocks.map((mock) => ({
      id: mock.id,
      title: mock.title,
      subtitle: mock.subtitle,
      href: mockHref(exam.slug, mock),
      parts: mock.parts,
      questions: mock.questions,
    })),
  };
}

export function productKindForOffer(offerId: string | null | undefined): StudentProductKind | null {
  if (offerId === 'exam-single') return 'single';
  if (offerId === 'exam-auto') return 'automatic';
  if (offerId === 'exam-teacher') return 'personalized';
  return null;
}

export function authenticatedResultHref(submissionId: string): string {
  return `/dashboard/student/resultados/${encodeURIComponent(submissionId)}`;
}

