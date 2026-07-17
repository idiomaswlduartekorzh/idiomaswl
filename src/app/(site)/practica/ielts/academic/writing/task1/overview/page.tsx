import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Overview: The Most Important Paragraph',
  description: 'Learn to write an IELTS Writing Task 1 overview with two sentences, no figures and the main trend. Band 7 practice.',
  keywords: ['IELTS overview', 'IELTS Task 1 overview', 'IELTS main trend', 'IELTS Writing Band 7'],
  openGraph: {
    title: 'IELTS Task 1 Overview: The Most Important Paragraph',
    description: 'Learn to write an IELTS Writing Task 1 overview with two sentences, no figures and the main trend. Band 7 practice.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/overview' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 overview"
        path="/practica/ielts/academic/writing/task1/overview"
        teaches={['overview', 'main trends', 'visual summary']}
      />
      <Content />
    </>
  )
}
