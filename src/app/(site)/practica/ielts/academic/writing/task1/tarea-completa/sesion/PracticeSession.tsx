'use client';

import { useSearchParams } from 'next/navigation';
import Content from '../Content';

export default function PracticeSession() {
  const searchParams = useSearchParams();

  return <Content initialPhase="writing" initialTaskId={searchParams.get('task') ?? undefined} />;
}
