import type { Metadata } from 'next';
import { Suspense } from 'react';
import PracticeSession from './PracticeSession';

export const metadata: Metadata = {
  title: 'IELTS Task 1 Timed Writing Practice',
  description: 'Write a complete IELTS Academic Writing Task 1 response under timed conditions with an original WeLearn visual prompt.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Suspense><PracticeSession /></Suspense>;
}
