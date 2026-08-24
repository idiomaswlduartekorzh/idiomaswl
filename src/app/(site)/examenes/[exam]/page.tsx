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
import {
  ICFES_SEVEN_PARTS_NOTES,
  ICFES_SEVEN_PARTS_PODCAST,
} from '@/data/practica/podcasts/estrategias-para-las-7-partes-del-icfes';
import {
  CAMBRIDGE_B2_FIRST_NOTES,
  CAMBRIDGE_B2_FIRST_PODCAST,
} from '@/data/practica/podcasts/how-to-pass-cambridge-b2-first';
import {
  DIGITAL_SAT_STRATEGY_MAP_NOTES,
  DIGITAL_SAT_STRATEGY_MAP_PODCAST,
} from '@/data/practica/podcasts/strategic-map-for-the-digital-sat';
import toeflStyles from './toefl-ios.module.css';

export async function generateStaticParams() {
  return Object.keys(EXAMS).map(slug => ({ exam: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = EXAMS[slug];
  if (!exam) return {};
  const guide = EXAM_GUIDES[slug];
  const satKeywords = [
    'SAT', 'SAT digital', 'simulacro SAT gratis', 'práctica SAT',
    'SAT Reading and Writing', 'SAT Colombia', 'preparación SAT en español',
    'puntaje SAT', 'cómo estudiar para el SAT', 'examen SAT universidades Estados Unidos',
  ];
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
    ...(slug === 'sat' ? { keywords: satKeywords } : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: guide?.title ?? `${exam.name} — Simulacros y preparación`,
      description: guide?.description ?? exam.tagline,
      url: `https://www.idiomaswl.com/examenes/${slug}`,
      type: 'website' as const,
      locale: 'es_CO',
      siteName: 'Idiomas WeLearn',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: guide?.title ?? `${exam.name} — Simulacros y preparación`,
      description: guide?.description ?? exam.tagline,
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

  const content = (
    <>
      <ExamJsonLd exam={exam} guide={guide} />

      {/* Breadcrumb */}
      <div className={slug === 'toefl' ? toeflStyles.breadcrumbBar : undefined} style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line-soft)', padding: '0.6rem 0' }}>
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
          variant="ios"
          links={[
            { href: '/practica/toefl#toefl-strategy-map', label: 'Episode notes and study map' },
            { href: '/practica/toefl/reading', label: 'Practise Reading' },
            { href: '/practica/toefl/listening', label: 'Practise Listening' },
            { href: '/practica/toefl/writing', label: 'Practise Writing' },
            { href: '/practica/toefl/speaking', label: 'Practise Speaking' },
          ]}
        />
      )}

      {slug === 'icfes' && (
        <PodcastFeature
          {...ICFES_SEVEN_PARTS_PODCAST}
          accent={exam.color}
          notes={ICFES_SEVEN_PARTS_NOTES}
          links={[
            { href: '/practica/icfes-saber-11', label: 'Abrir la ruta de las 7 partes' },
            { href: '/practica/icfes-saber-11/diagnostico', label: 'Hacer el diagnóstico' },
            { href: '/practica/icfes-saber-11/simulacro-guiado', label: 'Practicar con guía' },
            { href: '/practica/icfes-saber-11/repaso-errores', label: 'Revisar errores' },
            { href: '/practica/icfes-saber-11/plan-de-estudio', label: 'Crear un plan' },
          ]}
        />
      )}

      {slug === 'cambridge-b2' && (
        <PodcastFeature
          {...CAMBRIDGE_B2_FIRST_PODCAST}
          accent={exam.color}
          notes={CAMBRIDGE_B2_FIRST_NOTES}
          links={[
            { href: '/examenes/cambridge-b2/practica/set-1', label: 'Take the complete diagnostic' },
            { href: '/practica/ingles/b2/uso-del-idioma', label: 'Train B2 Use of English' },
            { href: '/practica/ingles/b2/conectores', label: 'Practise cohesion and connectors' },
            { href: '/nivel-radar', label: 'Check your current level' },
          ]}
        />
      )}

      {slug === 'sat' && (
        <PodcastFeature
          {...DIGITAL_SAT_STRATEGY_MAP_PODCAST}
          accent={exam.color}
          notes={DIGITAL_SAT_STRATEGY_MAP_NOTES}
          links={[
            { href: '/examenes/sat/practica/set-1', label: 'Take the SAT diagnostic' },
            { href: '/examenes/sat/guia/reading-and-writing', label: 'Map Reading and Writing' },
            { href: '/examenes/sat/guia/puntaje-sat-universidades', label: 'Set a target score' },
            { href: '/examenes/sat/guia/como-estudiar-sat-desde-cero', label: 'Build the study plan' },
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

  return slug === 'toefl' ? <div className={toeflStyles.page}>{content}</div> : content;
}
