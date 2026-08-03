import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';
import ExamClient from './ExamClient';
import IcfesJsonLd from '../../_components/IcfesJsonLd';

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
    description: `Practica con el cuadernillo divulgado por el ICFES ${sim.year} Grado ${sim.grade}. ${sim.totalQuestions} preguntas, tiempo sugerido y corrección automática.`,
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
  const canonical = `https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${sim.id}`;
  return <><IcfesJsonLd name={`${sim.title}: modo examen`} description={`${sim.totalQuestions} preguntas de un cuadernillo divulgado por el ICFES con corrección automática.`} url={canonical} type="Quiz" questionCount={sim.totalQuestions} currentLabel={sim.title} /><ExamClient exam={sim} /></>;
}
