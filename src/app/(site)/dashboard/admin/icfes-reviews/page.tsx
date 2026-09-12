import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import IcfesReviewInbox from './IcfesReviewInbox';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Revisiones ICFES | Administración', robots: { index: false, follow: false } };

export default async function IcfesReviewsPage() {
  try { await requireAdmin(); } catch { redirect('/dashboard'); }
  return <IcfesReviewInbox />;
}
