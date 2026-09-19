import type { Metadata } from 'next'
import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Practice: Listening, Reading and Writing',
  description: 'Practise IELTS Academic with 20 replayable Listening sets, printable PDFs, Reading routes and interactive Writing Task 1 and Task 2 exercises.',
  keywords: ['IELTS Academic', 'IELTS practice', 'IELTS Writing exercises', 'IELTS preparation', 'IELTS Band 7'],
  openGraph: {
    title: 'IELTS Academic',
    description: 'IELTS Academic Listening, Reading and Writing practice with audited sets and printable worksheets.',
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
        description="IELTS Academic practice hub with Listening, Reading and Writing routes, original exercises and skill-based navigation."
        teaches={['IELTS Academic', 'Listening', 'Academic Reading', 'Academic Writing', 'exam practice']}
        isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }}
      />
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
