import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EXAMS } from '@/data/exams';
import ExamInfoGraphic from './ExamInfoGraphic';
import MockGrid from './MockGrid';

export async function generateStaticParams() {
  return Object.keys(EXAMS).map(slug => ({ exam: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = EXAMS[slug];
  if (!exam) return {};
  return { title: `${exam.name} · Simulacros y preparación · Idiomas WeLearn` };
}

export default async function ExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = EXAMS[slug];
  if (!exam) notFound();

  return (
    <>
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

      {/* ── Practice mocks ── */}
      <MockGrid exam={exam} />
    </>
  );
}
