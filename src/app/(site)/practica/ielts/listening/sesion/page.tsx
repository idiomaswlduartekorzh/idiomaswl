import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getIeltsListeningPracticeForSession,
  getIeltsListeningPracticeIdentityForSession,
} from '@/data/ielts/listening-practice-registry.server';
import ListeningSession from './ListeningSession';

const ROBOTS = { index: false, follow: false, nocache: true } as const;

interface SessionPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: SessionPageProps): Promise<Metadata> {
  const query = await searchParams;
  const identity = getIeltsListeningPracticeIdentityForSession(query.practice, query.part);
  if (!identity) return { title: 'IELTS Listening Practice Session', robots: ROBOTS };
  const label = String(identity.practiceNumber).padStart(3, '0');
  return {
    title: `IELTS Listening Practice ${label} — Part ${identity.part}`,
    description: `Focused WeLearn IELTS Listening Part ${identity.part} practice session.`,
    robots: ROBOTS,
  };
}

export default async function IeltsListeningSessionPage({ searchParams }: SessionPageProps) {
  const query = await searchParams;
  const practice = getIeltsListeningPracticeForSession(query.practice, query.part);
  if (!practice) notFound();
  return <ListeningSession practice={practice} />;
}
