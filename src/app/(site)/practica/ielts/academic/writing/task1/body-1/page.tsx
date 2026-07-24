import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/body-1'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Body 1: Group Data and Select Evidence',
  description: 'Learn how to write the first IELTS Academic Writing Task 1 detail paragraph. Group data, choose relevant evidence and build clear Body 1 sentences.',
  keywords: ['IELTS Task 1 Body 1', 'IELTS Task 1 body paragraph', 'IELTS Task 1 grouping data', 'IELTS detail paragraph'],
  openGraph: { title: 'IELTS Task 1 Body 1: Group Data and Select Evidence', description: 'Guided IELTS Task 1 Body 1 practice for charts, tables, processes and maps.', type: 'website', locale: 'en_US' },
  alternates: { canonical: URL },
}

export default function Page() {
  return <><Task1SkillStructuredData name="IELTS Task 1 Body 1" path="/practica/ielts/academic/writing/task1/body-1" teaches={['detail paragraph organisation', 'data grouping', 'evidence selection']} /><Content /></>
}
