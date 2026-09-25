import { notFound, redirect } from 'next/navigation';
import { EXAMS } from '@/data/exams';
import { getGoetheA2PracticeMock, getMock } from '@/data/mocks';
import PracticeClient from './PracticeClient';
import IELTSPracticeClient from './IELTSPracticeClient';
import TOEFLPracticeClient from './TOEFLPracticeClient';
import Toefl2026PracticeClient from './Toefl2026PracticeClient';
import LanguagePracticeClient from './LanguagePracticeClient';
import TOPIKPracticeClient from './TOPIKPracticeClient';
import GoetheA1PracticeClient from './GoetheA1PracticeClient';
import { sanitizeIcfesMock } from '@/lib/icfes/exam-registry.server';
import { isIcfesPassEnabled } from '@/lib/icfes/product-config.server';
import { parseGoetheA2PracticeTeil, parseGoethePracticeTeil, type GoetheA2PracticeSkill, type GoethePracticeSkill } from '@/lib/goethe/practice';
import { hasGoetheA1Audio } from '@/lib/goethe/release';
import { sanitizeIeltsMock } from '@/lib/ielts/public-mock';

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

export default async function PracticePage({ params, searchParams }: { params: Promise<{ exam: string; mockId: string }>; searchParams: Promise<{ mode?: string; skill?: string; teil?: string }> }) {
  const { exam: slug, mockId } = await params;
  const query = await searchParams;
  const exam = EXAMS[slug];
  const a2Skill = slug === 'goethe'
    && /^a2-(?:[1-9]|10)$/.test(mockId)
    && query.mode === 'practice'
    && ['reading', 'writing', 'speaking'].includes(query.skill ?? '')
      ? query.skill as GoetheA2PracticeSkill
      : undefined;
  const a2PracticePart = a2Skill ? parseGoetheA2PracticeTeil(a2Skill, query.teil) : undefined;
  const mock = a2Skill
    ? getGoetheA2PracticeMock(mockId, a2Skill, a2PracticePart)
    : getMock(slug, mockId);

  if (!exam || !mock) notFound();

  if (slug === 'icfes') return <PracticeClient
    exam={exam}
    mock={sanitizeIcfesMock(mock)}
    secureIcfes={{ offerEnabled: isIcfesPassEnabled() }}
  />;

  if (slug === 'ielts') {
    const practiceSkill = query.mode === 'practice' && ['reading', 'writing', 'speaking'].includes(query.skill ?? '')
      ? query.skill as 'reading' | 'writing' | 'speaking'
      : undefined;
    return <IELTSPracticeClient exam={exam} mock={sanitizeIeltsMock(mock)} key={`${mock.id}:${practiceSkill ?? 'exam'}`} practiceSkill={practiceSkill} />;
  }
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
  if (slug === 'goethe' && /^a1-(?:[1-9]|10)$/.test(mockId)) {
    const skill = query.mode === 'practice' && ['listening', 'reading', 'writing', 'speaking'].includes(query.skill ?? '')
      ? query.skill as GoethePracticeSkill
      : undefined;
    if (!hasGoetheA1Audio(mockId) && !skill) redirect(`/examenes/goethe/practica/${mockId}?mode=practice&skill=reading`);
    if (!hasGoetheA1Audio(mockId) && skill === 'listening') redirect('/practica/goethe/listening');
    const practicePart = skill ? parseGoethePracticeTeil(skill, query.teil) : undefined;
    return <GoetheA1PracticeClient key={`${mock.id}:${skill ?? 'exam'}:${practicePart ?? 'all'}`} exam={exam} mock={mock} practiceSkill={skill} practicePart={practicePart} />;
  }
  if (slug === 'goethe' && a2Skill) {
    return <LanguagePracticeClient
      key={`${mock.id}:${a2Skill}:${a2PracticePart ?? 'all'}`}
      exam={exam}
      mock={mock}
      focusedPractice={{ level: 'A2', skill: a2Skill, part: a2PracticePart }}
    />;
  }
  if (LANGUAGE_EXAMS.has(slug)) return <LanguagePracticeClient exam={exam} mock={mock} />;

  return <PracticeClient exam={exam} mock={mock} />;
}
