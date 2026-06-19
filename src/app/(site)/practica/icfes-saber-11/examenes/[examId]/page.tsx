import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';
import ExamClient from './ExamClient';

interface Props {
  params: Promise<{ examId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const sim = getSimulacro(examId);
  if (!sim) return {};
  return {
    title: `${sim.title} — Simulacro ICFES Inglés | Idiomas WeLearn`,
    description: `Practica con el cuadernillo oficial ICFES ${sim.year} Grado ${sim.grade}. ${sim.totalQuestions} preguntas, ${sim.timeMinutes} minutos. Corrección automática y revisión detallada.`,
  };
}

export async function generateStaticParams() {
  const { SIMULACROS } = await import('@/data/mocks/icfes-simulacros');
  return SIMULACROS.map(s => ({ examId: s.id }));
}

export default async function Page({ params }: Props) {
  const { examId } = await params;
  const sim = getSimulacro(examId);
  if (!sim) notFound();
  return <ExamClient exam={sim} />;
}
