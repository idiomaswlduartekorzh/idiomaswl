import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic — Práctica completa de Writing, Reading y más | Idiomas WeLearn',
  description: 'Practica el IELTS Academic con ejercicios interactivos de Writing Task 1, Task 2, vocabulario académico y estrategias Band 7+. Gratis en Idiomas WeLearn.',
  keywords: ['IELTS academic', 'IELTS práctica', 'IELTS writing ejercicios', 'preparación IELTS', 'IELTS band 7'],
  openGraph: {
    title: 'IELTS Academic | Idiomas WeLearn',
    description: 'Ejercicios interactivos para el IELTS Academic. Writing Task 1, Task 2 y más.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic' },
}

export default function Page() {
  return <Content />
}
