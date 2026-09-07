import type { Metadata } from 'next';

import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LearningResourceJsonLd,
} from '@/components/exam-practice/StructuredData';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_SECTIONAL_LISTENING_SET_IDS } from '@/data/toefl/sectional-listening-adapter';

const URL = 'https://www.idiomaswl.com/practica/toefl/listening/simulacros';

export const metadata: Metadata = {
  title: 'TOEFL Listening Practice Sets',
  description:
    'Practice TOEFL Listening with original audio, four current task families, and private raw scoring.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'TOEFL Listening Practice Sets',
    description: 'Choose a Listening set with original audio and private server-side scoring.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const faqs = [
  {
    question: 'Is this Listening practice adaptive?',
    answer:
      'No. Each exercise follows a fixed path and uses the Listening content from the corresponding WeLearn set.',
  },
  {
    question: 'Will I receive an official TOEFL score?',
    answer:
      'No. You will see the number of correct answers in this practice. WeLearn does not calculate an ETS score or admission equivalency.',
  },
  {
    question: 'Can I replay the audio?',
    answer:
      'Yes. This is practice, so you can replay every audio, move backward or forward, and continue without answering.',
  },
];

const tasks = [
  'Listen and Choose a Response',
  'Listen to a Conversation',
  'Listen to an Announcement',
  'Listen to an Academic Talk',
];

function setNumberFromId(mockId: string) {
  return mockId.replace('set-', '');
}

export default function ToeflListeningLibraryPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="TOEFL Listening Practice Sets"
        url={URL}
        description="Fixed TOEFL Listening practice library created by WeLearn."
        teaches={tasks}
        isPartOf={{
          name: 'TOEFL Listening Practice',
          url: 'https://www.idiomaswl.com/practica/toefl/listening',
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' },
          { name: 'Exercises', url: 'https://www.idiomaswl.com/practica/toefl/ejercicios' },
          { name: 'Listening', url: 'https://www.idiomaswl.com/practica/toefl/listening' },
          { name: 'Listening sets', url: URL },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <PracticeRouteShell
        section="listening"
        breadcrumbs={[
          { label: 'Exercises', href: '/practica/toefl/ejercicios#listening' },
          { label: 'Listening sets' },
        ]}
      >
        <ToeflPracticeSetCatalog
          section="listening"
          task="Listening"
          description="Choose any set. Every exercise contains the four current Listening task families, replayable audio, free navigation, and private scoring."
          sets={TOEFL_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => ({
            number: index + 1,
            title: `Listening Set ${setNumberFromId(mockId)}`,
            detail: '4 task families · replayable audio · private scoring',
            href: `/practica/toefl/listening/simulacros/practica/${mockId}`,
            meta: 'Self-paced',
          }))}
        />
      </PracticeRouteShell>
    </>
  );
}
