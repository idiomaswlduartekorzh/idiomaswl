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
      'No. Introduction, overview, Body 1 and Body 2 are parts of one study response plan. Trends, comparisons, vocabulary, process language and map language are WeLearn micro-skills that support the official IELTS Academic Writing Task 1.',
  },
  {
    question: 'Does IELTS prescribe a fixed number of paragraphs or words per paragraph?',
    answer:
      'No. IELTS requires at least 150 words for Academic Writing Task 1, but it does not prescribe paragraph names or paragraph word counts. WeLearn uses an Introduction, Overview, Body 1 and Body 2 plan to make practice more manageable.',
  },
]

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 1: Structure, Skills and Practice',
  description: 'Learn the IELTS Academic Writing Task 1 response structure: introduction, overview and two body paragraphs. Practise charts, tables, maps and process diagrams with guided exercises.',
  keywords: ['IELTS Academic Writing Task 1', 'IELTS Task 1 structure', 'IELTS Task 1 introduction overview body paragraphs', 'IELTS Task 1 practice', 'IELTS Task 1 maps process diagrams'],
  openGraph: {
    title: 'IELTS Writing Task 1',
    description: 'A practical IELTS Academic Writing Task 1 guide: structure, visual types, guided practice and complete-task preparation.',
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
