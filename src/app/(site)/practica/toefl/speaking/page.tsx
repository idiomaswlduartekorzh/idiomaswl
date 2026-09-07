import type { Metadata } from 'next';

import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import SpeakingPracticeSet from '@/components/toefl/SpeakingPracticeSet';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { getMock } from '@/data/mocks';
import type { RepeatQuestion, SpeakQuestion } from '@/data/mocks/types';
import { practiceSetNumber } from '@/data/toefl/practice-set-catalog';

export const metadata: Metadata = { title: 'TOEFL Speaking Practice Sets', description: 'Choose from 20 TOEFL Speaking sets with Listen and Repeat and Take an Interview tasks.' };

const PATH = '/practica/toefl/speaking';

function speakingQuestions(setNumber: number) {
  const mock = getMock('toefl', `set-${setNumber}`);
  return mock?.sections.flatMap((section) => section.questions).filter(
    (question): question is RepeatQuestion | SpeakQuestion => question.type === 'repeat' || question.type === 'speak',
  ) ?? [];
}

export default async function ToeflSpeakingPage({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const selectedSet = practiceSetNumber((await searchParams).set);
  const questions = selectedSet ? speakingQuestions(selectedSet) : [];
  const sets = Array.from({ length: 20 }, (_, index) => ({
    number: index + 1,
    title: `Speaking Set ${index + 1}`,
    detail: 'Listen and Repeat · Take an Interview',
    href: `${PATH}?set=${index + 1}`,
    meta: '11 speaking prompts',
  }));
  return (
    <PracticeRouteShell
      id="practice-sets"
      section="speaking"
      breadcrumbs={[
        { label: 'Exercises', href: '/practica/toefl/ejercicios#speaking' },
        { label: 'Speaking', href: selectedSet ? PATH : undefined },
        ...(selectedSet ? [{ label: `Set ${selectedSet}` }] : []),
      ]}
      backHref={selectedSet ? PATH : undefined}
    >
      {selectedSet && questions.length ? (
        <SpeakingPracticeSet setNumber={selectedSet} questions={questions} />
      ) : (
        <ToeflPracticeSetCatalog
          section="speaking"
          task="Speaking"
          description="Choose a set with both current Speaking task families. Each set opens here with replayable audio, free navigation, and microphone recording."
          sets={sets}
        />
      )}
    </PracticeRouteShell>
  );
}
