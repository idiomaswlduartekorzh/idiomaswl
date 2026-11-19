import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content, { ACADEMIC_FAQS } from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Practice: Listening, Reading, Writing and Speaking',
  description: 'Practise all four IELTS Academic skills with 40 sets, Reading routes, Writing Task 1 and Task 2 courses, and Speaking recording practice.',
  keywords: ['IELTS Academic', 'IELTS practice', 'IELTS Writing exercises', 'IELTS preparation', 'IELTS Band 7'],
  openGraph: {
    title: 'IELTS Academic',
    description: 'IELTS Academic practice across four skills with 40 assembled sets and skill-specific learning routes.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic'

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic practice"
        url={URL}
        description="IELTS Academic practice hub with Listening, Reading, Writing and Speaking routes, original exercises and skill-based navigation."
        teaches={['IELTS Academic', 'Listening', 'Academic Reading', 'Academic Writing', 'Speaking', 'exam practice']}
        isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }}
      />
      <FaqJsonLd faqs={[...ACADEMIC_FAQS]} />
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
