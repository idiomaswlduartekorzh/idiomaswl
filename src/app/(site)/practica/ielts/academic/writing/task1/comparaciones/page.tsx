import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Comparaciones — Datos y porcentajes | Idiomas WeLearn',
  description: 'Ejercicios de comparaciones en el IELTS Writing Task 1: datos, porcentajes, tablas y gráficos de barras. Vocabulary para comparar cifras Band 6–7.',
  keywords: ['IELTS comparaciones','IELTS task 1 comparaciones','IELTS bar chart','IELTS table task 1'],
  openGraph: {
    title: 'IELTS Task 1: Comparaciones — Datos y porcentajes | Idiomas WeLearn',
    description: 'Ejercicios de comparaciones en el IELTS Writing Task 1: datos, porcentajes, tablas y gráficos de barras. Vocabulary para comparar cifras Band 6–7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/comparaciones' },
}

export default function Page() {
  return <Content />
}
