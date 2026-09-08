import type { Metadata } from 'next';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import BuildSentenceSet1Practice from '@/components/toefl/BuildSentenceSet1Practice';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_BUILD_SENTENCE_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/writing/build-a-sentence';
export const metadata: Metadata = { title: 'TOEFL Build a Sentence Practice Library', description: 'Choose from 20 Build a Sentence exercise sets with ten questions each.', alternates: { canonical: PATH } };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_BUILD_SENTENCE_PRACTICE_SETS[setNumber - 1] : null;
  return <PracticeRouteShell section="writing" breadcrumbs={[
    { label: 'Exercises', href: '/practica/toefl/ejercicios#writing' },
    { label: 'Build a Sentence', href: practice ? PATH : undefined },
    ...(practice ? [{ label: `Set ${setNumber}` }] : []),
  ]} backHref={practice ? PATH : undefined}>
    {practice && setNumber
      ? <BuildSentenceSet1Practice practice={practice} setNumber={setNumber} />
      : <ToeflPracticeSetCatalog section="writing" task="Build a Sentence" description="Choose a set before the sentence builder opens. Each set contains ten independent items." sets={TOEFL_BUILD_SENTENCE_PRACTICE_SETS.map((set, index) => ({ number: index + 1, title: `Sentence Set ${index + 1}`, detail: `${set.items.length} sentence-building items`, href: `${PATH}?set=${index + 1}`, meta: 'About 10 minutes' }))} />}
  </PracticeRouteShell>;
}
