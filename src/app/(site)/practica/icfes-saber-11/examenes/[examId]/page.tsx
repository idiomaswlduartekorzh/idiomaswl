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
  const canonical = `https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${sim.id}`;
  return {
    title: `${sim.title} — Simulacro ICFES Inglés`,
    description: `Practica con el cuadernillo oficial ICFES ${sim.year} Grado ${sim.grade}. ${sim.totalQuestions} preguntas, ${sim.timeMinutes} minutos. Corrección automática y revisión detallada.`,
    alternates: { canonical },
    openGraph: {
      title: `${sim.title} — Simulacro ICFES Inglés`,
      description: `${sim.totalQuestions} preguntas de un cuadernillo divulgado por el ICFES, con corrección automática.`,
      url: canonical,
      type: 'website',
    },
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
