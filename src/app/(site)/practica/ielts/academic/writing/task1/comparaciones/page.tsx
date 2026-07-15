import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Comparaciones — Datos y porcentajes',
  description: 'Ejercicios de comparaciones en el IELTS Writing Task 1: datos, porcentajes, tablas y gráficos de barras. Vocabulary para comparar cifras Band 6–7.',
  keywords: ['IELTS comparaciones','IELTS task 1 comparaciones','IELTS bar chart','IELTS table task 1'],
  openGraph: {
    title: 'IELTS Task 1: Comparaciones — Datos y porcentajes',
    description: 'Ejercicios de comparaciones en el IELTS Writing Task 1: datos, porcentajes, tablas y gráficos de barras. Vocabulary para comparar cifras Band 6–7.',
    type: 'website', locale: 'es_CO',
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
