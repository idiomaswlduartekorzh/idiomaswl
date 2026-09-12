import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ICFES_ATTEMPT_ID_PATTERN } from '@/lib/icfes/attempt-contract';
import IcfesPaidResultClient from './IcfesPaidResultClient';

export const metadata: Metadata = {
  title: 'Detalle de intento ICFES — WeLearn',
  description: 'Estado privado del detalle pedagógico de un intento ICFES.',
  robots: { index: false, follow: false, noarchive: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({ params, searchParams }: { params: Promise<{ attemptId: string }>; searchParams: SearchParams }) {
  const { attemptId } = await params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) notFound();
  const query = await searchParams;
  const transactionId = typeof query.id === 'string' && /^[A-Za-z0-9_-]{6,120}$/.test(query.id) ? query.id : null;
  return <IcfesPaidResultClient attemptId={attemptId} transactionId={transactionId} />;
}
