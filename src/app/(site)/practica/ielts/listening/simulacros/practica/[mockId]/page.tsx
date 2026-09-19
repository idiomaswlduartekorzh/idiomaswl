import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import { getMock } from '@/data/mocks/index';
import {
  IELTS_SECTIONAL_LISTENING_SET_IDS,
  isIeltsSectionalListeningSetId,
  selectIeltsListeningPractice,
} from '@/data/ielts/sectional-listening-adapter';

import IELTSListeningSectionRunner from './IELTSListeningSectionRunner';

export const metadata: Metadata = {
  title: 'IELTS Listening — Focused Practice Set',
  description: 'Untimed IELTS Listening practice with replayable audio and a printable student PDF.',
  robots: { index: false, follow: true },
};

export function generateStaticParams() {
  return IELTS_SECTIONAL_LISTENING_SET_IDS.map(mockId => ({ mockId }));
}

export default async function IELTSListeningPracticePage({ params }: { params: Promise<{ mockId: string }> }) {
  const { mockId } = await params;
  if (!isIeltsSectionalListeningSetId(mockId)) notFound();
  const mock = getMock('ielts', mockId);
  const practice = mock ? selectIeltsListeningPractice(mock) : null;
  if (!practice) notFound();
  const setLabel = practice.sourceMockId.replace('set-', 'Set ');

  return (
    <PracticeRouteShell
      section="listening"
      breadcrumbs={[
        { label: 'IELTS', href: '/practica/ielts' },
        { label: 'Listening', href: '/practica/ielts/listening/simulacros' },
        { label: setLabel },
      ]}
      backHref="/practica/ielts/listening/simulacros"
      backLabel="Choose another Listening set"
    >
      <IELTSListeningSectionRunner key={practice.id} practice={practice} />
    </PracticeRouteShell>
  );
}
