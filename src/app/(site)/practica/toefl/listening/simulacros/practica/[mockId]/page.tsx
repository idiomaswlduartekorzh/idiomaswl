import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import { getMock } from '@/data/mocks';
import {
  isToeflSectionalListeningSetId,
  selectToeflListeningPractice,
} from '@/data/toefl/sectional-listening-adapter';

import ToeflListeningSectionRunner from './ToeflListeningSectionRunner';

export const metadata: Metadata = {
  title: 'TOEFL Listening — Focused Practice Set',
  description: 'Fixed TOEFL Listening practice created by WeLearn.',
  robots: { index: false, follow: true },
};

export default async function ToeflListeningPracticePage({
  params,
}: {
  params: Promise<{ mockId: string }>;
}) {
  const { mockId } = await params;
  if (!isToeflSectionalListeningSetId(mockId)) notFound();

  const mock = getMock('toefl', mockId);
  const practice = mock ? selectToeflListeningPractice(mock) : null;
  if (!practice) notFound();

  const setLabel = practice.sourceMockId.replace('set-', 'Set ');

  return (
    <PracticeRouteShell
      section="listening"
      breadcrumbs={[
        { label: 'Exercises', href: '/practica/toefl/ejercicios#listening' },
        { label: 'Listening', href: '/practica/toefl/listening/simulacros' },
        { label: setLabel },
      ]}
      backHref="/practica/toefl/listening/simulacros"
      backLabel="Choose another Listening exercise"
    >
      <ToeflListeningSectionRunner key={practice.id} practice={practice} />
    </PracticeRouteShell>
  );
}
