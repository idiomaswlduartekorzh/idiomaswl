import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 1 — 7 habilidades esenciales | Idiomas WeLearn',
  description: 'Practica las 7 habilidades del IELTS Writing Task 1: parafrasear, overview, tendencias, comparaciones, procesos, mapas y tarea completa. Ejercicios con feedback Band 6–7.',
  keywords: ['IELTS writing task 1', 'IELTS task 1 ejercicios', 'IELTS academic writing task 1', 'IELTS task 1 band 7', 'IELTS overview', 'IELTS tendencias gráficas'],
  openGraph: {
    title: 'IELTS Writing Task 1 | Idiomas WeLearn',
    description: 'Ejercicios progresivos de IELTS Writing Task 1: desde parafrasear hasta tarea completa.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1' },
}

export default function Page() {
  return <Content />
}
