import { getStudentExamWorkspace, type StudentProductKind } from './catalog';
import type { StudentDashboardData } from './types';

const NOW = '2026-09-12T15:00:00.000Z';
const END = '2026-10-12T15:00:00.000Z';

export function studentDashboardPreview(product: StudentProductKind): StudentDashboardData {
  const examSlug = product === 'single' ? 'toefl' : product === 'automatic' ? 'goethe' : 'ielts';
  const exam = getStudentExamWorkspace(examSlug)!;
  const attempts = product === 'single' ? [{
    id: '00000000-0000-4000-8000-000000000001', mockId: 'set-1', title: `${exam.name} · Simulacro 1`,
    createdAt: NOW, score: 76, scoreLabel: '76%', reportHref: '#reporte', feedbackState: 'not-included' as const,
  }] : [
    { id: '00000000-0000-4000-8000-000000000002', mockId: exam.mocks[0]?.id ?? null, title: exam.mocks[0]?.title ?? 'Simulacro 1', createdAt: '2026-09-11T18:00:00.000Z', score: 82, scoreLabel: '82%', reportHref: '#reporte', feedbackState: product === 'personalized' ? 'delivered' as const : 'not-included' as const },
    { id: '00000000-0000-4000-8000-000000000003', mockId: exam.mocks[1]?.id ?? null, title: exam.mocks[1]?.title ?? 'Simulacro 2', createdAt: '2026-09-08T18:00:00.000Z', score: 68, scoreLabel: '68%', reportHref: '#reporte', feedbackState: product === 'personalized' ? 'processing' as const : 'not-included' as const },
  ];
  return {
    name: 'Mariana López', email: 'mariana@ejemplo.com', dataAvailable: true,
    access: { state: product === 'single' ? 'consumed' : 'active', product, exam, startsAt: NOW, endsAt: product === 'single' ? null : END, singleAttemptAvailable: false },
    subscription: product === 'single' ? null : { id: '00000000-0000-4000-8000-000000000004', status: 'active', nextChargeAt: END, periodEndsAt: END, cancelRequestedAt: null },
    attempts,
    courses: product === 'personalized' ? [{ id: '00000000-0000-4000-8000-000000000005', language: 'ingles', objective: 'IELTS Academic', plan: 'esencial', classes: 4, sessions: 8, purchasedAt: NOW }] : [],
  };
}

