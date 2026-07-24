import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Maps: Describing Spatial Change',
  description: 'Practise describing IELTS Writing Task 1 maps with spatial-change vocabulary, time comparisons and structured visual analysis.',
  keywords: ['IELTS maps', 'IELTS Task 1 map', 'IELTS map Task 1', 'IELTS spatial change'],
  openGraph: {
    title: 'IELTS Task 1 Maps: Describing Spatial Change',
    description: 'Practise describing IELTS Writing Task 1 maps with spatial-change vocabulary and time comparisons.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/mapas' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 maps"
        path="/practica/ielts/academic/writing/task1/mapas"
        teaches={['map description', 'spatial language', 'change over time']}
      />
      <Content />
    </>
  )
}
