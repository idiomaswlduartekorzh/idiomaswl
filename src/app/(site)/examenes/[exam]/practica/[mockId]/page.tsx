import { notFound } from 'next/navigation';
import { EXAMS } from '@/data/exams';
import { getMock } from '@/data/mocks';
import PracticeClient from './PracticeClient';
import IELTSPracticeClient from './IELTSPracticeClient';
import TOEFLPracticeClient from './TOEFLPracticeClient';
import Toefl2026PracticeClient from './Toefl2026PracticeClient';
import LanguagePracticeClient from './LanguagePracticeClient';
import TOPIKPracticeClient from './TOPIKPracticeClient';
import { toPublicIeltsMock } from '@/data/mocks/ielts-public-payload';

const LANGUAGE_EXAMS = new Set(['goethe', 'cils-celi', 'delf-dalf', 'celpe-bras', 'cambridge-b2']);

export async function generateMetadata({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);
  if (!exam || !mock) return {};
  return {
    title: `${mock.title} — ${exam.name}`,
    description: `Simulacro de ${exam.name}: ${mock.subtitle ?? mock.title}. Practica con contenido original alineado al formato y recibe feedback pedagógico.`,
    robots: { index: false, follow: false }, // practice sessions are not indexable
  };
}

export default async function PracticePage({ params }: { params: Promise<{ exam: string; mockId: string }> }) {
  const { exam: slug, mockId } = await params;
  const exam = EXAMS[slug];
  const mock = getMock(slug, mockId);

  if (!exam || !mock) notFound();

  if (slug === 'ielts') return <IELTSPracticeClient exam={exam} mock={toPublicIeltsMock(mock)} />;
  if (slug === 'toefl') {
    // All twenty public TOEFL sets use the audited fixed-form 2026 runner.
    return mock.format === 'toefl-2026'
      ? <Toefl2026PracticeClient exam={exam} mock={mock} />
      : <TOEFLPracticeClient exam={exam} mock={mock} />;
  }
  // TOPIK: set-1 es el diagnóstico-gancho de leads (UI propia, sin timer);
  // los demás sets son simulacros completos con el blueprint unificado.
  if (slug === 'topik') {
    return mockId === 'set-1'
      ? <TOPIKPracticeClient exam={exam} mock={mock} />
      : <LanguagePracticeClient exam={exam} mock={mock} />;
  }
  if (LANGUAGE_EXAMS.has(slug)) return <LanguagePracticeClient exam={exam} mock={mock} />;

  return <PracticeClient exam={exam} mock={mock} />;
}
