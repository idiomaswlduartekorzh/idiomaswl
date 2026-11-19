import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content, { WRITING_FAQS } from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing: Task 1 and Task 2',
  description: 'Study IELTS Academic Writing Task 1 and Task 2 through separate courses with worked decisions, guided practice and a review rubric.',
  keywords: ['IELTS Academic Writing', 'IELTS Writing Task 1', 'IELTS Writing Task 2', 'IELTS Writing Band 7', 'IELTS Writing exercises'],
  openGraph: {
    title: 'IELTS Academic Writing',
    description: 'Practise IELTS Writing Task 1 and Task 2 with interactive exercises.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing'

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
      <FaqJsonLd faqs={[...WRITING_FAQS]} />
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
