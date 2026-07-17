import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Full Practice | Timed Task',
  description: 'Practise the complete IELTS Academic Writing Task 1 workflow: introduction, overview, selected details, timing and self-review.',
  keywords: ['IELTS Writing Task 1 full practice','IELTS timed Task 1','IELTS Band 7 writing practice','IELTS Task 1 self review'],
  openGraph: {
    title: 'IELTS Task 1 Full Practice | Timed Task',
    description: 'Practise the full IELTS Academic Writing Task 1 workflow with an original visual prompt, checklist and model response.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tarea-completa' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 full timed practice"
        path="/practica/ielts/academic/writing/task1/tarea-completa"
        teaches={['full task response', 'timed writing', 'self review']}
      />
      <Content />
    </>
  )
}
