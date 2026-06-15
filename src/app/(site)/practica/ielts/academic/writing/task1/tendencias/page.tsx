import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Tendencias — Verbos y adverbios para gráficos | Idiomas WeLearn',
  description: 'Practica verbos de tendencia (rise/fall/peak) y adverbios (sharply/gradually) para el IELTS Writing Task 1. Ejercicios con líneas de tiempo y gráficas.',
  keywords: ['IELTS tendencias','IELTS task 1 tendencias','IELTS rise fall verbs','IELTS vocabulary task 1'],
  openGraph: {
    title: 'IELTS Task 1: Tendencias — Verbos y adverbios para gráficos | Idiomas WeLearn',
    description: 'Practica verbos de tendencia (rise/fall/peak) y adverbios (sharply/gradually) para el IELTS Writing Task 1. Ejercicios con líneas de tiempo y gráficas.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tendencias' },
}

export default function Page() {
  return <Content />
}
