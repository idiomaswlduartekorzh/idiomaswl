import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Trends Practice | Identify Key Features',
  description: 'Practise identifying the most important trends in IELTS Writing Task 1 line graphs, bar charts, pie charts, tables, processes and maps.',
  keywords: ['IELTS trends practice','IELTS Task 1 identify trends','IELTS line graph overview','IELTS key features'],
  openGraph: {
    title: 'IELTS Task 1 Trends Practice | Identify Key Features',
    description: 'Practise identifying the most important trends and comparisons before writing an IELTS Task 1 overview.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tendencias' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 trends practice"
        path="/practica/ielts/academic/writing/task1/tendencias"
        teaches={['trend language', 'line graphs', 'data patterns']}
      />
      <Content />
    </>
  )
}
