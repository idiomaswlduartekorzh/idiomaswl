import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 2 — Ensayo argumentativo Band 7 | Idiomas WeLearn',
  description: 'Practica el IELTS Writing Task 2: tipos de ensayo, introducción, párrafos cuerpo, linking language, conclusión y tarea completa. Estrategias pedagógicas Band 7+.',
  keywords: ['IELTS writing task 2', 'IELTS task 2 ejercicios', 'IELTS ensayo argumentativo', 'IELTS task 2 band 7', 'IELTS opinion essay', 'IELTS linking words'],
  openGraph: {
    title: 'IELTS Writing Task 2 | Idiomas WeLearn',
    description: 'Ejercicios progresivos de IELTS Writing Task 2: ensayo argumentativo paso a paso.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2' },
}

export default function Page() {
  return <Content />
}
