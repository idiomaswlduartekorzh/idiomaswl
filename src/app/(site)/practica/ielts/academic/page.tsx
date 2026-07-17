import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Practice: Writing, Reading and More',
  description: 'Practise IELTS Academic with interactive Writing Task 1 and Task 2 exercises, academic vocabulary and Band 7+ strategies. Free on Idiomas WeLearn.',
  keywords: ['IELTS Academic', 'IELTS practice', 'IELTS Writing exercises', 'IELTS preparation', 'IELTS Band 7'],
  openGraph: {
    title: 'IELTS Academic',
    description: 'Interactive IELTS Academic exercises for Writing Task 1, Task 2 and more.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic'

const FAQS = [
  {
    question: 'What does IELTS Academic include?',
    answer:
      'IELTS Academic includes Listening, Reading, Writing and Speaking. This route organises practice by skill and distinguishes the official format from WeLearn strategies.',
  },
  {
    question: 'Does this page replace official IELTS materials?',
    answer:
      'No. It is an original WeLearn practice guide that links to available skills and should be used alongside official exam resources.',
  },
]

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic practice"
        url={URL}
        description="IELTS Academic practice hub with Reading and Writing routes, original exercises and skill-based navigation."
        teaches={['IELTS Academic', 'Academic Reading', 'Academic Writing', 'exam practice']}
        isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS Academic', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
