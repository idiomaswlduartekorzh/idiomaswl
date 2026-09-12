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
  const optionStyle = (active: boolean, accent: '#ef3340' | '#3157d5') => ({
    padding: '7px 11px', borderRadius: 999, color: active ? '#fff' : '#172154',
    font: '750 11px system-ui', textDecoration: 'none',
    background: active ? accent : 'transparent',
    boxShadow: active ? `0 5px 14px ${accent}3d` : 'none',
  });
  return <>
    <nav aria-label="Planes de prueba" style={{ position: 'fixed', zIndex: 100, right: 16, top: 12, display: 'flex', gap: 6, padding: 6, background: '#fff', border: '1px solid #dde0ec', borderRadius: 999, boxShadow: '0 8px 24px #1112' }}>
      <Link href="?plan=single" style={optionStyle(selected === 'single', '#ef3340')}>$12.900</Link>
      <Link href="?plan=automatic" style={optionStyle(selected === 'automatic', '#3157d5')}>$49.900</Link>
      <Link href="?plan=personalized" style={optionStyle(selected === 'personalized', '#ef3340')}>$99.900</Link>
    </nav>
    <StudentDashboardView data={studentDashboardPreview(selected)} preview />
  </>;
}
