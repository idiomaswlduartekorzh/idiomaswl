import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'
import AcademicVocabularyHubClient from './AcademicVocabularyHubClient'

export const metadata: Metadata = {
  title: 'Academic vocabulary for IELTS Writing Task 2 by function',
  description: 'Practise eight academic vocabulary functions for IELTS Task 2: hedging, asserting, attributing, quantifying, causing, evaluating, proposing and register.',
  keywords: [
    'academic vocabulary for IELTS',
    'IELTS Writing Task 2 vocabulary',
    'academic English for essays',
    'lexical resource IELTS',
    'academic register practice',
  ],
  openGraph: {
    title: 'Academic vocabulary for IELTS Writing Task 2 by function',
    description: 'Build precise IELTS vocabulary through eight functions, usage patterns and corrected practice.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/academic-vocabulary' },
}

export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 academic vocabulary"
        path="/practica/ielts/academic/writing/task2/academic-vocabulary"
        teaches={['academic vocabulary', 'lexical resource', 'collocation']}
      />
      <AcademicVocabularyHubClient />
    </>
  )
}
