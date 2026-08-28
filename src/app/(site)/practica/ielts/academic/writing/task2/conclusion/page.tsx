import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

const FAQS = [
  { question: 'How long should the conclusion be?', answer: 'IELTS sets no paragraph limit. WeLearn uses about 30–50 words as a flexible study target inside a complete response of at least 250 words.' },
  { question: 'Must it begin with “In conclusion”?', answer: 'No. A clear closing signal can help, but accurate synthesis and a consistent answer matter more than one memorised phrase.' },
  { question: 'Can I add a recommendation?', answer: 'Only when it follows directly from reasoning already developed. Do not introduce a new policy, example or prediction in the conclusion.' },
  { question: 'Should I repeat my thesis?', answer: 'Restate the same answer with fresh language. Copying the introduction wastes words; changing the position creates inconsistency.' },
]

export const metadata: Metadata = {
  title: 'IELTS Task 2 Conclusion: Examples and Practice',
  description: 'Learn how to write an IELTS Academic Writing Task 2 conclusion for five question types with guided examples, Lego sentence blocks and progressive practice.',
  keywords: ['IELTS task 2 conclusion', 'IELTS essay conclusion', 'IELTS conclusion examples', 'IELTS task 2 final paragraph'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'IELTS Task 2 Conclusion: Examples and Practice',
    description: 'Build question-sensitive IELTS Task 2 conclusions without copying the thesis or adding new ideas.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/conclusion' },
}

import ConclusionTask2Client from './ConclusionTask2Client';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 Conclusion"
        path="/practica/ielts/academic/writing/task2/conclusion"
        teaches={['essay conclusion', 'restate a thesis', 'synthesise developed reasons', 'adapt a conclusion to the question type']}
        faqs={FAQS}
      />
      <ConclusionTask2Client faqs={FAQS} />
    </>
  );
}
