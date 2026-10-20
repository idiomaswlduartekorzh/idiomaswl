import { EXAMS } from '@/data/exams';
import { XPRESS_EXAM_OPTIONS, type XpressExamSlug } from '@/lib/student-onboarding/catalog';

export type StudentProductKind = 'free' | 'essential' | 'automatic' | 'personalized' | 'welearn';

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
  free: {
    label: 'Autodidacta Gratis',
    price: '$0 COP',
    billing: 'acceso permanente al examen elegido',
    summary: 'Ecosistema del examen y puntaje total, sin descargas ni revisión detallada.',
  },
  essential: {
    label: 'Autodidacta Esencial',
    price: '$15.900 COP',
    billing: 'cada 30 días',
    summary: 'Todo el ecosistema del examen, resultados detallados y descargas.',
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
    summary: 'Revisiones humanas, retroalimentación integral y plan de mejora.',
  },
  welearn: {
    label: 'Estudiante WeLearn',
    price: 'Incluido',
    billing: 'con tu plan de clases',
    summary: 'Acceso completo al ecosistema del examen asignado en tu programa.',
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
  if (offerId === 'exam-free') return 'free';
  if (offerId === 'exam-basic') return 'essential';
  if (offerId === 'exam-auto') return 'automatic';
  if (offerId === 'exam-teacher') return 'personalized';
  if (offerId === 'welearn-full') return 'welearn';
  return null;
}

export function authenticatedResultHref(submissionId: string): string {
  return `/dashboard/student/resultados/${encodeURIComponent(submissionId)}`;
}
