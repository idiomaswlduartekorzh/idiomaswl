import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/body-2'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Body 2: Complete the Detail Paragraphs',
  description: 'Learn how to write the second IELTS Academic Writing Task 1 detail paragraph. Add a contrast, second group or later phase without repeating Body 1.',
  keywords: ['IELTS Task 1 Body 2', 'IELTS Task 1 second body paragraph', 'IELTS Task 1 comparisons', 'IELTS detail paragraph'],
  openGraph: { title: 'IELTS Task 1 Body 2: Complete the Detail Paragraphs', description: 'Guided IELTS Task 1 Body 2 practice for charts, tables, processes and maps.', type: 'website', locale: 'en_US' },
  alternates: { canonical: URL },
}

export default function Page() {
  return <><Task1SkillStructuredData name="IELTS Task 1 Body 2" path="/practica/ielts/academic/writing/task1/body-2" teaches={['detail paragraph organisation', 'comparison', 'evidence selection']} /><Content /></>
}
