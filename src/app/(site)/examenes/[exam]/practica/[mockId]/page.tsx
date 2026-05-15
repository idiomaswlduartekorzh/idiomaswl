import { notFound } from 'next/navigation';
import { EXAMS } from '@/data/exams';
import { getMock } from '@/data/mocks';
import PracticeClient from './PracticeClient';
import IELTSPracticeClient from './IELTSPracticeClient';
import TOEFLPracticeClient from './TOEFLPracticeClient';

export async function generateMetadata({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);
  if (!exam || !mock) return {};
  return { title: `${mock.title} · Practice · ${exam.name} · Idiomas WeLearn` };
}

export default async function PracticePage({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);

  if (!exam || !mock) notFound();

  if (slug === 'ielts') return <IELTSPracticeClient exam={exam} mock={mock} />;
  if (slug === 'toefl') return <TOEFLPracticeClient exam={exam} mock={mock} />;

  return <PracticeClient exam={exam} mock={mock} />;
}
