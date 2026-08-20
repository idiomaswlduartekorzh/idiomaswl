import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EXAMS } from '@/data/exams';
import ExamInfoGraphic from './ExamInfoGraphic';
import MockGrid from './MockGrid';
import ExamGuideBlock from './ExamGuide';
import ExamJsonLd from './ExamJsonLd';
import ExamCluster from './ExamCluster';
import { EXAM_GUIDES } from '@/data/examGuides';
import PodcastFeature from '@/components/practica/PodcastFeature';
import { TOEFL_STRATEGY_MAP_PODCAST } from '@/data/practica/podcasts/your-2026-toefl-ibt-strategy-map';

export async function generateStaticParams() {
  return Object.keys(EXAMS).map(slug => ({ exam: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = EXAMS[slug];
  if (!exam) return {};
  const guide = EXAM_GUIDES[slug];
  // Cuando el examen tiene guía, el título encabeza con el examen y no con
  // "simulacros": la gente busca "examen first" o "cambridge b2", no simulacros.
  return {
    title:
      guide?.title ??
      (guide
        ? `${exam.fullName ?? exam.name}: qué es, puntajes y simulacros gratis`
        : `Simulacros de ${exam.fullName ?? exam.name}`),
    description:
      guide?.description ??
      `${exam.description ?? exam.tagline} Practica con ${exam.totalQuestions} preguntas en ${exam.totalTime}. Simulacros completos con feedback de IA.`,
    openGraph: {
      title: `${exam.name} — Simulacros y preparación`,
      description: exam.tagline,
      url: `https://www.idiomaswl.com/examenes/${slug}`,
    },
    alternates: {
      canonical: `https://www.idiomaswl.com/examenes/${slug}`,
    },
  };
}

export default async function ExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = EXAMS[slug];
  if (!exam) notFound();
  const guide = EXAM_GUIDES[slug];

  return (
    <>
      <ExamJsonLd exam={exam} guide={guide} />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line-soft)', padding: '0.6rem 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <Link href="/examenes" style={{ color: 'var(--muted)' }}>Exámenes</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{exam.name}</span>
        </div>
      </div>

      {/* Animated infographic */}
      <ExamInfoGraphic exam={exam} />

      {slug === 'toefl' && (
        <PodcastFeature
          {...TOEFL_STRATEGY_MAP_PODCAST}
          compact
          links={[
            { href: '/practica/toefl#toefl-strategy-map', label: 'Episode notes and study map' },
            { href: '/practica/toefl/reading', label: 'Practise Reading' },
            { href: '/practica/toefl/writing', label: 'Practise Writing' },
          ]}
        />
      )}

      {/* ── Practice mocks ── */}
      <MockGrid exam={exam} />

      {/* ── Índice del superhub (hoy solo el SAT tiene clúster propio) ── */}
      {slug === 'sat' && <ExamCluster accent={exam.color} />}

      {/* ── Guía de contenido (solo los exámenes que ya la tienen escrita) ── */}
      {guide && <ExamGuideBlock guide={guide} examName={exam.name} accent={exam.color} />}
    </>
  );
}
