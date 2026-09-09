import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ICFES_ATTEMPT_ID_PATTERN } from '@/lib/icfes/attempt-contract';
import IcfesPaidResultClient from './IcfesPaidResultClient';

export const metadata: Metadata = {
  title: 'Detalle de intento ICFES — WeLearn',
  description: 'Estado privado del detalle pedagógico de un intento ICFES.',
  robots: { index: false, follow: false, noarchive: true },
};

export default async function Page({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) notFound();
  return <IcfesPaidResultClient attemptId={attemptId} />;
}
