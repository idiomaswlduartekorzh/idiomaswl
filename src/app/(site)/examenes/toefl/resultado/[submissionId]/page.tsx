import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOEFL_SUBMISSION_ID_PATTERN } from '@/lib/toefl/submission-token.server';
import ToeflPaidReportClient from './ToeflPaidReportClient';

export const metadata: Metadata = {
  title: 'Informe privado TOEFL',
  description: 'Acceso privado al informe pedagógico de un simulacro TOEFL WeLearn.',
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default async function ToeflPaidReportPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  if (!TOEFL_SUBMISSION_ID_PATTERN.test(submissionId)) notFound();
  return <ToeflPaidReportClient submissionId={submissionId} />;
}
