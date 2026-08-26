import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EXAMS } from '@/data/exams';
import ExamInfoGraphic from './ExamInfoGraphic';
import MockGrid from './MockGrid';
import ExamGuideBlock from './ExamGuide';
import ExamJsonLd from './ExamJsonLd';
import ExamCluster from './ExamCluster';
import { EXAM_GUIDES } from '@/data/examGuides';
import ExamPodcastShelf from '@/components/practica/ExamPodcastShelf';
import { getExamPodcasts } from '@/data/practica/exam-podcast-catalog';
import styles from './exam-hub.module.css';

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
      `${exam.description ?? exam.tagline} Practica con ${exam.totalQuestions} preguntas en ${exam.totalTime}. Simulacros completos con retroalimentación personalizada.`,
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
  const podcasts = getExamPodcasts(slug);
  const sectionLinks = [
    { href: '#resumen', label: 'Resumen' },
    { href: '#estructura', label: 'Estructura' },
    { href: '#puntaje', label: 'Puntaje' },
    ...(podcasts.length > 0 ? [{ href: '#podcasts-del-examen', label: 'Podcast' }] : []),
    { href: '#practica', label: 'Práctica' },
    ...(guide ? [{ href: '#guia', label: 'Guía' }] : []),
  ];

  return (
    <main
      className={styles.page}
      style={{ '--exam-accent': exam.color, '--exam-action': exam.colorDark } as React.CSSProperties}
    >
      <ExamJsonLd exam={exam} guide={guide} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className={`wrap ${styles.breadcrumb}`}>
          <Link href="/examenes">Exámenes</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{exam.name}</span>
        </div>
      </div>

      <nav className={styles.localNav} aria-label={`Secciones de ${exam.name}`}>
        <div className={`wrap ${styles.localNavInner}`}>
          <strong>{exam.name}</strong>
          <div>
            {sectionLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>
        </div>
      </nav>

      <ExamInfoGraphic exam={exam} hasPodcast={podcasts.length > 0} />

      {podcasts.length > 0 ? (
        <ExamPodcastShelf
          episodes={podcasts}
          locale="es"
          eyebrow={`Podcast de ${exam.name}`}
          title={podcasts.length > 1 ? `Guías de audio para preparar ${exam.name}` : `Una guía de audio para preparar ${exam.name}`}
          description="Cada episodio tiene una página propia dentro de este examen, con contexto editorial, notas escritas y enlaces directos a la práctica relacionada."
        />
      ) : null}

      {/* ── Practice mocks ── */}
      <MockGrid exam={exam} />

      {/* ── Índice del superhub (hoy solo el SAT tiene clúster propio) ── */}
      {slug === 'sat' && <ExamCluster accent={exam.color} />}

      {/* ── Guía de contenido (solo los exámenes que ya la tienen escrita) ── */}
      {guide && (
        <div id="guia" className={styles.anchorTarget}>
          <ExamGuideBlock guide={guide} examName={exam.name} accent={exam.colorDark} />
        </div>
      )}
    </main>
  );
}
