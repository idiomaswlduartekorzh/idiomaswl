import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { listExamAccessCodes } from '@/lib/exam-access-codes/server';
import ExamCodeAdminClient from './ExamCodeAdminClient';

export const dynamic = 'force-dynamic';

export default async function ExamCodeAdminPage() {
  try {
    await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  const codes = await listExamAccessCodes();
  return <ExamCodeAdminClient initialCodes={codes} />;
}
