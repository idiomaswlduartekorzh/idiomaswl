import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMock } from '@/data/mocks';
import {
  isToeflSectionalListeningSetId,
  selectToeflListeningPractice,
} from '@/data/toefl/sectional-listening-adapter';

import ToeflListeningSectionRunner from './ToeflListeningSectionRunner';

export const metadata: Metadata = {
  title: 'TOEFL Listening — práctica enfocada por set',
  description: 'Runner de práctica fija TOEFL Listening creado por WeLearn.',
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

  return <ToeflListeningSectionRunner key={practice.id} practice={practice} />;
}
