import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Comparisons: Charts, Data and Percentages',
  description: 'Practise IELTS Writing Task 1 comparisons with bar charts, line graphs, pie charts and tables. Learn precise comparison language for Band 6–7 writing.',
  keywords: ['IELTS Task 1 comparisons', 'IELTS comparison language', 'IELTS bar chart comparison', 'IELTS table comparison'],
  openGraph: {
    title: 'IELTS Task 1 Comparisons: Data and Percentages',
    description: 'Practise selecting and comparing visual data with accurate IELTS Task 1 language.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/comparaciones' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 comparaciones"
        path="/practica/ielts/academic/writing/task1/comparaciones"
        teaches={['comparisons', 'data selection', 'chart language']}
      />
      <Content />
    </>
  )
}
