import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Complete Practice | Timed Visual Tasks',
  description: 'Practise complete IELTS Academic Writing Task 1 responses with original paired visuals, guided planning, timing, self-review and WeLearn model responses.',
  keywords: ['IELTS Writing Task 1 complete practice','IELTS timed Task 1','IELTS Task 1 model response','IELTS Task 1 self review'],
  openGraph: {
    title: 'IELTS Task 1 Complete Practice | Timed Visual Tasks',
    description: 'Practise a complete IELTS Academic Writing Task 1 workflow with original paired visual prompts, checklists and model responses.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tarea-completa' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 complete timed practice"
        path="/practica/ielts/academic/writing/task1/tarea-completa"
        teaches={['full task response', 'visual analysis', 'timed writing', 'self review']}
      />
      <Content />
    </>
  )
}
