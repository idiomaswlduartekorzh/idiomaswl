import type { Metadata } from 'next';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import ReadingPracticeSet from '@/components/toefl/ReadingPracticeSet';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_READING_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/reading/formato-2026/read-an-academic-passage';
export const metadata: Metadata = { title: 'TOEFL Academic Passage Practice Library', description: 'Choose from 20 academic reading passages with five comprehension questions each.', alternates: { canonical: PATH } };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_READING_PRACTICE_SETS[setNumber - 1] : null;
  return <PracticeRouteShell section="reading" breadcrumbs={[
    { label: 'Exercises', href: '/practica/toefl/ejercicios#reading' },
    { label: 'Academic Passage', href: practice ? PATH : undefined },
    ...(practice ? [{ label: `Set ${setNumber}` }] : []),
  ]} backHref={practice ? PATH : undefined}>
    {practice && setNumber
      ? <ReadingPracticeSet objectId={practice.readingObjectId} setNumber={setNumber} task="Read an Academic Passage" passages={[practice.academic]} />
      : <ToeflPracticeSetCatalog section="reading" task="Academic Passage" description="Select a topic before the passage opens. Each set contains one academic text and five questions." sets={TOEFL_READING_PRACTICE_SETS.map((set) => ({ number: set.setNumber, title: set.academic.title, detail: '1 academic passage · 5 questions', href: `${PATH}?set=${set.setNumber}`, meta: 'About 10 minutes' }))} />}
  </PracticeRouteShell>;
}
