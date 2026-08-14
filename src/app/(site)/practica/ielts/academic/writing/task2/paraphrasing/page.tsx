import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'
import ParaphrasingHubClient from './ParaphrasingHubClient'

export const metadata: Metadata = {
  title: 'How to paraphrase for IELTS Writing Task 2: five techniques',
  description: 'Practise IELTS paraphrasing with synonyms, word order, word form, voice and sentence structure while preserving the prompt meaning.',
  keywords: [
    'how to paraphrase in English',
    'IELTS Writing paraphrasing',
    'IELTS synonyms practice',
    'paraphrasing techniques',
    'IELTS paraphrasing task 2',
  ],
  openGraph: {
    title: 'How to paraphrase for IELTS Writing Task 2: five techniques',
    description: 'Learn five meaning-safe paraphrasing techniques through examples, common traps and corrected exercises.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/paraphrasing' },
}

export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 paraphrasing"
        path="/practica/ielts/academic/writing/task2/paraphrasing"
        teaches={['paraphrasing', 'synonyms', 'lexical resource']}
      />
      <ParaphrasingHubClient />
    </>
  )
}
