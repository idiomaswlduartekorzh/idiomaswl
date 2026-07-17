import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing: Task 1 and Task 2',
  description: 'Master IELTS Academic Writing: Task 1 visual data and Task 2 argumentative essays with progressive exercises and immediate feedback. Target Band 7.',
  keywords: ['IELTS Academic Writing', 'IELTS Writing Task 1', 'IELTS Writing Task 2', 'IELTS Writing Band 7', 'IELTS Writing exercises'],
  openGraph: {
    title: 'IELTS Academic Writing',
    description: 'Practise IELTS Writing Task 1 and Task 2 with interactive exercises.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing'

const FAQS = [
  {
    question: 'What does IELTS Academic Writing include?',
    answer:
      'IELTS Academic Writing includes Task 1, a response of at least 150 words about visual information, and Task 2, an essay of at least 250 words.',
  },
  {
    question: 'How does WeLearn organise Writing practice?',
    answer:
      'WeLearn separates the official format from strategy: first understand Task 1 and Task 2, then practise micro-skills, prompt banks, annotated models and rubric-based review.',
  },
]

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing practice"
        url={URL}
        description="IELTS Academic Writing Task 1 and Task 2 practice hub with rubric, exercise and explained-answer routes."
        teaches={['IELTS Writing Task 1', 'IELTS Writing Task 2', 'essay writing', 'visual data description']}
        isPartOf={{ name: 'IELTS Academic', url: 'https://www.idiomaswl.com/practica/ielts/academic' }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS Academic', url: 'https://www.idiomaswl.com/practica/ielts/academic' },
          { name: 'Writing', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
