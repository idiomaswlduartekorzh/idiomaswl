import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Introduction: Paraphrasing the Prompt',
  description: 'Practise paraphrasing the IELTS Writing Task 1 prompt. Learn vocabulary, word-class and sentence-structure changes with immediate feedback.',
  keywords: ['IELTS Task 1 introduction', 'IELTS paraphrasing', 'IELTS Writing Task 1 exercises'],
  openGraph: {
    title: 'IELTS Task 1 Introduction: Paraphrasing the Prompt',
    description: 'Practise paraphrasing the IELTS Writing Task 1 prompt with vocabulary, word-class and sentence-structure changes.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/introduccion' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 introduction"
        path="/practica/ielts/academic/writing/task1/introduccion"
        teaches={['paraphrasing', 'task introduction', 'visual data prompt']}
      />
      <Content />
    </>
  )
}
