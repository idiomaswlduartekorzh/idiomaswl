import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';
import ExamClient from './ExamClient';
import IcfesJsonLd from '../../_components/IcfesJsonLd';
import { sanitizeIcfesMock, simulacroToMockExam } from '@/lib/icfes/exam-registry.server';

interface Props {
  params: Promise<{ examId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const sim = getSimulacro(examId);
  if (!sim) return {};
  const canonical = `https://www.idiomaswl.com/practica/icfes-saber-11/examenes/${sim.id}`;
  const audience = sim.assessment === 'saber-tyt' ? 'Saber TyT' : `Grado ${sim.grade}`;
  return {
    title: `${sim.title} — Simulacro ICFES Inglés`,
    description: `Practica con una muestra histórica atribuida a material ICFES ${sim.year} para ${audience}. Banco local no cotejado, con ${sim.totalQuestions} preguntas y corrección automática.`,
    alternates: { canonical },
    robots: sim.assessment === 'saber-11' ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${sim.title} — Simulacro ICFES Inglés`,
      description: `${sim.totalQuestions} preguntas de un banco histórico atribuido y no cotejado, con corrección automática.`,
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
  const mock = sanitizeIcfesMock(simulacroToMockExam(sim));
  return <><IcfesJsonLd name={`${sim.title}: modo examen`} description={`${sim.totalQuestions} preguntas de un banco histórico atribuido a material ICFES, pendiente de cotejo primario.`} url={canonical} type="Quiz" questionCount={sim.totalQuestions} currentLabel={sim.title} /><ExamClient mock={mock} /></>;
}
