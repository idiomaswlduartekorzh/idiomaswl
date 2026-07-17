import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Processes: Diagrams and Flows',
  description: 'Practise describing IELTS Writing Task 1 processes and diagrams with passive voice, sequence vocabulary and process connectors. Band 7 strategies.',
  keywords: ['IELTS processes', 'IELTS Task 1 process', 'IELTS process diagram', 'IELTS passive voice Task 1'],
  openGraph: {
    title: 'IELTS Task 1 Processes: Diagrams and Flows',
    description: 'Practise describing IELTS Writing Task 1 processes and diagrams with passive voice and sequence language.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/procesos' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 processes"
        path="/practica/ielts/academic/writing/task1/procesos"
        teaches={['process description', 'sequence language', 'passive voice']}
      />
      <Content />
    </>
  )
}
