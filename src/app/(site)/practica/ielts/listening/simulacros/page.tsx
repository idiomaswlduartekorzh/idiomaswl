import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import PracticeSetCatalog from '@/components/exam-practice/PracticeSetCatalog';
import { getMock } from '@/data/mocks/index';
import { IELTS_SECTIONAL_LISTENING_SET_IDS } from '@/data/ielts/sectional-listening-adapter';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening/simulacros';

export const metadata: Metadata = {
  title: 'IELTS Listening Practice Sets with Audio and PDF',
  description: 'Practise all 20 IELTS Listening sets without a timer. Replay, pause and rewind the audio, navigate freely, and download a printable student PDF.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'IELTS Listening Practice Sets',
    description: 'Twenty untimed Listening sets with full audio control, private scoring and printable PDFs.',
    url: URL,
    type: 'website',
    locale: 'en_US',
  },
};

const faqs = [
  { question: 'Can I replay and rewind the audio?', answer: 'Yes. Practice mode lets you pause, replay, jump backward or forward, and drag the audio timeline.' },
  { question: 'Is there a time limit?', answer: 'No. You can move freely between all four parts and leave questions unanswered while you study.' },
  { question: 'Can I print the questions?', answer: 'Yes. Every set includes a student PDF with all 40 questions and a blank answer sheet. The answer key is not included.' },
  { question: 'Is the band official?', answer: 'No. The result is a WeLearn practice estimate based on IELTS Listening raw-score bands.' },
];

const sets = IELTS_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => {
  const mock = getMock('ielts', mockId);
  return {
    number: index + 1,
    title: mock?.title ?? `IELTS Academic Set ${index + 1}`,
    detail: '4 parts · 40 questions · replayable audio · printable PDF',
    meta: 'Untimed practice',
    href: `/practica/ielts/listening/simulacros/practica/${mockId}`,
  };
});

export default function IELTSListeningLibraryPage() {
  return (
    <>
      <LearningResourceJsonLd name="IELTS Listening Practice Sets" url={URL} description="Twenty focused IELTS Listening practice sets created by WeLearn." teaches={['IELTS Listening', 'form completion', 'multiple choice', 'matching', 'note completion']} inLanguage="en" isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }} />
      <BreadcrumbJsonLd items={[{ name: 'Practice', url: 'https://www.idiomaswl.com/practica' }, { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' }, { name: 'Listening', url: 'https://www.idiomaswl.com/practica/ielts/listening' }, { name: 'Listening sets', url: URL }]} />
      <FaqJsonLd faqs={faqs} />
      <PracticeRouteShell section="listening" breadcrumbs={[{ label: 'Practice', href: '/practica' }, { label: 'IELTS', href: '/practica/ielts' }, { label: 'Listening', href: '/practica/ielts/listening' }, { label: 'Listening sets' }]} backHref="/practica/ielts/listening" backLabel="Back to Listening guidance">
        <PracticeSetCatalog product="IELTS" section="listening" task="Listening" description="Use the same audited audio and questions as each complete mock, with no timer and full playback control. Each set also has a printable student worksheet." sets={sets} note="Progress stays in this browser. Answer keys remain on the server and are never included in the downloadable student PDF." />
      </PracticeRouteShell>
    </>
  );
}
