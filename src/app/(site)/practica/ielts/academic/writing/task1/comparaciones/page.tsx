import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import ComparisonsEnglish from './ComparisonsEnglish'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Comparisons: Charts, Tables and Data',
  description: 'Practise IELTS Academic Writing Task 1 comparisons with original charts, tables, comparison vocabulary, guided exercises and explained answers for Band 6–7 writing.',
  keywords: ['IELTS Writing Task 1 comparisons', 'IELTS comparison exercises', 'IELTS bar chart comparison', 'IELTS table comparison'],
  openGraph: {
    title: 'IELTS Writing Task 1 Comparisons: Charts, Tables and Data',
    description: 'Original IELTS Task 1 comparison practice with visual examples, vocabulary and explained answers.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/comparaciones' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 comparisons"
        path="/practica/ielts/academic/writing/task1/comparaciones"
        teaches={['comparisons', 'data selection', 'chart language']}
      />
      <ComparisonsEnglish />
    </>
  )
}
