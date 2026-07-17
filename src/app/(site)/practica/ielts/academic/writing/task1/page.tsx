import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1'

const FAQS = [
  {
    question: 'What does IELTS Academic Writing Task 1 ask you to do?',
    answer:
      'It asks you to describe visual information in at least 150 words. The input may be a graph, table, process, map or combination of visuals.',
  },
  {
    question: 'Are these skills separate official tasks?',
    answer:
      'No. The introduction, overview, trends and comparisons routes are WeLearn micro-skills designed to train the official IELTS Academic Writing Task 1 more effectively.',
  },
]

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 1: 8 Essential Skills',
  description: 'Practise IELTS Writing Task 1 skills: paraphrasing, overviews, trends, comparisons, processes, maps, vocabulary and the complete task. Band 6–7 exercises with feedback.',
  keywords: ['IELTS Writing Task 1', 'IELTS Task 1 exercises', 'IELTS Academic Writing Task 1', 'IELTS Task 1 Band 7', 'IELTS overview', 'IELTS graph trends'],
  openGraph: {
    title: 'IELTS Writing Task 1',
    description: 'Progressive IELTS Writing Task 1 exercises, from paraphrasing to the complete task.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: URL },
}

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing Task 1"
        url={URL}
        description="IELTS Academic Writing Task 1 practice hub with visual-description skills and guided practice routes."
        teaches={[
          'IELTS Academic Writing Task 1',
          'visual data description',
          'overview',
          'comparisons',
          'process description',
          'map description',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
