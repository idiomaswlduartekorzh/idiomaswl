import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { loadAdminPaymentsData } from '@/lib/admin-payments/server';
import PaymentsAdminClient from './PaymentsAdminClient';

export const metadata: Metadata = {
  title: 'Pagos y finanzas · Administración',
  robots: { index: false, follow: false },
};

export default async function AdminPaymentsPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  const data = await loadAdminPaymentsData();
  return <PaymentsAdminClient data={data} adminEmail={admin.email} />;
}
