import { notFound } from 'next/navigation';
import { EXAMS } from '@/data/exams';
import { getMock } from '@/data/mocks';
import PracticeClient from './PracticeClient';
import IELTSPracticeClient from './IELTSPracticeClient';
import TOEFLPracticeClient from './TOEFLPracticeClient';
import LanguagePracticeClient from './LanguagePracticeClient';
import TOPIKPracticeClient from './TOPIKPracticeClient';

const LANGUAGE_EXAMS = new Set(['goethe', 'cils-celi', 'delf-dalf', 'celpe-bras']);

export async function generateMetadata({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);
  if (!exam || !mock) return {};
  return {
    title: `${mock.title} — ${exam.name}`,
    description: `Simulacro completo de ${exam.name}: ${mock.subtitle ?? mock.title}. Practica con preguntas reales y obtén feedback inmediato.`,
    robots: { index: false, follow: false }, // practice sessions are not indexable
  };
}

export default async function PracticePage({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);

  if (!exam || !mock) notFound();

  if (slug === 'ielts') return <IELTSPracticeClient exam={exam} mock={mock} />;
  if (slug === 'toefl') return <TOEFLPracticeClient exam={exam} mock={mock} />;
  if (slug === 'topik') return <TOPIKPracticeClient exam={exam} mock={mock} />;
  if (LANGUAGE_EXAMS.has(slug)) return <LanguagePracticeClient exam={exam} mock={mock} />;

  return <PracticeClient exam={exam} mock={mock} />;
}
