import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getIeltsListeningPart1Practice } from '@/data/ielts/listening-part1-welearn-001.server';
import ListeningSession from './ListeningSession';

export const metadata: Metadata = {
  title: 'IELTS Listening Practice 001 — Part 1',
  description: 'Focused WeLearn IELTS Listening Part 1 practice session.',
  robots: { index: false, follow: false, nocache: true },
};

interface SessionPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function IeltsListeningSessionPage({ searchParams }: SessionPageProps) {
  const query = await searchParams;
  if (query.practice !== 'welearn-listening-part-1-001' || query.part !== '1') notFound();
  return <ListeningSession practice={getIeltsListeningPart1Practice()} />;
}
