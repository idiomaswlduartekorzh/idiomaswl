import { notFound } from 'next/navigation';
import Link from 'next/link';
import StudentDashboardView from '@/components/student-dashboard/StudentDashboardView';
import { studentDashboardPreview } from '@/lib/student-dashboard/preview-data';
import type { StudentProductKind } from '@/lib/student-dashboard/catalog';

export const metadata = { title: 'Revisión del dashboard de estudiante', robots: { index: false, follow: false } };

export default async function StudentDashboardPreviewPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  if (process.env.VERCEL_ENV === 'production' || process.env.STUDENT_DASHBOARD_PREVIEW !== 'true') notFound();
  const { plan } = await searchParams;
  const selected: StudentProductKind = plan === 'single' || plan === 'personalized' ? plan : 'automatic';
  const optionStyle = (active: boolean) => ({ padding: '7px 10px', borderRadius: 999, color: '#172154', font: '700 11px system-ui', textDecoration: 'none', background: active ? '#f1c84b' : 'transparent' });
  return <>
    <nav aria-label="Planes de prueba" style={{ position: 'fixed', zIndex: 100, right: 16, top: 12, display: 'flex', gap: 6, padding: 6, background: '#fff', border: '1px solid #dde0ec', borderRadius: 999, boxShadow: '0 8px 24px #1112' }}>
      <Link href="?plan=single" style={optionStyle(selected === 'single')}>$12.900</Link>
      <Link href="?plan=automatic" style={optionStyle(selected === 'automatic')}>$49.900</Link>
      <Link href="?plan=personalized" style={optionStyle(selected === 'personalized')}>$99.900</Link>
    </nav>
    <StudentDashboardView data={studentDashboardPreview(selected)} preview />
  </>;
}

