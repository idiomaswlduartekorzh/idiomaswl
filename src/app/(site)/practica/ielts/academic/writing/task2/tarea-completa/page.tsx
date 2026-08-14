import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'Complete IELTS Writing Task 2 essay practice',
  description: 'Choose from 25 prompts, plan the response, write with a 40-minute timer and compare your work with a complete original model essay.',
  keywords: ['complete IELTS Task 2 practice', 'IELTS Writing Task 2 full essay', 'timed IELTS essay practice', 'IELTS model essay'],
  openGraph: {
    title: 'Complete IELTS Writing Task 2 essay practice',
    description: 'Plan, write, self-review and compare one full IELTS Task 2 response across 25 original prompts.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/tarea-completa' },
}

import TareaCompletaTask2Client from './TareaCompletaTask2Client';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="Complete IELTS Writing Task 2 essay practice"
        path="/practica/ielts/academic/writing/task2/tarea-completa"
        teaches={['full essay', 'timed writing', 'self review']}
      />
      <TareaCompletaTask2Client />
    </>
  );
}
