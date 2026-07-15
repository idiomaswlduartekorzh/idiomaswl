import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Overview — El párrafo más importante',
  description: 'Aprende a escribir el overview del IELTS Writing Task 1. Técnica de 2 oraciones sin números, identificar la tendencia principal. Ejercicios Band 7.',
  keywords: ['IELTS overview','IELTS task 1 overview','IELTS tendencia principal','IELTS writing band 7'],
  openGraph: {
    title: 'IELTS Task 1: Overview — El párrafo más importante',
    description: 'Aprende a escribir el overview del IELTS Writing Task 1. Técnica de 2 oraciones sin números, identificar la tendencia principal. Ejercicios Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/overview' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 overview"
        path="/practica/ielts/academic/writing/task1/overview"
        teaches={['overview', 'main trends', 'visual summary']}
      />
      <Content />
    </>
  )
}
