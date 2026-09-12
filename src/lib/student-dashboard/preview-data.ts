import { getStudentExamWorkspace, type StudentProductKind } from './catalog';
import { buildStudentProgress } from './progress';
import type { StudentAttempt, StudentDashboardData } from './types';

const NOW = '2026-09-12T15:00:00.000Z';
const END = '2026-10-12T15:00:00.000Z';

export function studentDashboardPreview(product: StudentProductKind): StudentDashboardData {
  const examSlug = product === 'single' ? 'toefl' : product === 'automatic' ? 'goethe' : 'ielts';
  const exam = getStudentExamWorkspace(examSlug)!;
  const attempts: StudentAttempt[] = product === 'single' ? [{
    id: '00000000-0000-4000-8000-000000000001', examSlug: exam.slug, examName: exam.name, examFlag: exam.flag, examHubHref: exam.hubHref,
    mockId: 'set-1', title: `${exam.name} · Simulacro 1`,
    createdAt: NOW, score: 76, scoreLabel: '76%', reportHref: '#reporte', feedbackState: 'not-included' as const,
    skills: [{ name: 'Reading', score: 8, maximum: 10, percentage: 80 }, { name: 'Listening', score: 7, maximum: 10, percentage: 70 }],
  }] : [
    { id: '00000000-0000-4000-8000-000000000002', examSlug: exam.slug, examName: exam.name, examFlag: exam.flag, examHubHref: exam.hubHref, mockId: exam.mocks[0]?.id ?? null, title: exam.mocks[0]?.title ?? 'Simulacro 1', createdAt: '2026-09-11T18:00:00.000Z', score: 82, scoreLabel: '82%', reportHref: '#reporte', feedbackState: product === 'personalized' ? 'delivered' as const : 'not-included' as const, skills: [{ name: 'Reading', score: 86, maximum: 100, percentage: 86 }, { name: 'Listening', score: 81, maximum: 100, percentage: 81 }, { name: 'Writing', score: 72, maximum: 100, percentage: 72 }, { name: 'Speaking', score: 78, maximum: 100, percentage: 78 }] },
    { id: '00000000-0000-4000-8000-000000000003', examSlug: exam.slug, examName: exam.name, examFlag: exam.flag, examHubHref: exam.hubHref, mockId: exam.mocks[1]?.id ?? null, title: exam.mocks[1]?.title ?? 'Simulacro 2', createdAt: '2026-09-08T18:00:00.000Z', score: 68, scoreLabel: '68%', reportHref: '#reporte', feedbackState: product === 'personalized' ? 'processing' as const : 'not-included' as const, skills: [{ name: 'Reading', score: 70, maximum: 100, percentage: 70 }, { name: 'Listening', score: 72, maximum: 100, percentage: 72 }, { name: 'Writing', score: 60, maximum: 100, percentage: 60 }, { name: 'Speaking', score: 66, maximum: 100, percentage: 66 }] },
  ];
  const activityDates = ['2026-09-12', '2026-09-11', '2026-09-10', '2026-09-08', '2026-09-05'];
  const courses = product === 'personalized' ? [{ id: '00000000-0000-4000-8000-000000000005', language: 'ingles', objective: 'IELTS Academic', plan: 'esencial', classes: 4, sessions: 8, purchasedAt: NOW }] : [];
  return {
    name: 'Mariana López', email: 'mariana@ejemplo.com', dataAvailable: true,
    access: { state: product === 'single' ? 'consumed' : 'active', product, exam, startsAt: NOW, endsAt: product === 'single' ? null : END, singleAttemptAvailable: false },
    subscription: product === 'single' ? null : { id: '00000000-0000-4000-8000-000000000004', status: 'active', nextChargeAt: END, periodEndsAt: END, cancelRequestedAt: null },
    attempts,
    courses,
    assignments: courses.length ? [
      { id: '00000000-0000-4000-8000-000000000006', title: 'Writing Task 2 · ensayo de práctica', instructions: 'Escribe un ensayo de 250 palabras y súbelo antes de la próxima clase.', resourceUrl: '/examenes/ielts', dueAt: '2026-09-14T23:59:00.000Z', status: 'assigned', assignedAt: NOW, completedAt: null },
      { id: '00000000-0000-4000-8000-000000000007', title: 'Repasar conectores de contraste', instructions: 'Completa la práctica y anota tres dudas para revisar juntos.', resourceUrl: '/practica/ielts-writing-conectores', dueAt: '2026-09-11T23:59:00.000Z', status: 'completed', assignedAt: '2026-09-08T15:00:00.000Z', completedAt: '2026-09-11T20:00:00.000Z' },
    ] : [],
    progress: buildStudentProgress(attempts, exam.slug, activityDates, new Date('2026-09-12T18:00:00.000Z')),
  };
}
