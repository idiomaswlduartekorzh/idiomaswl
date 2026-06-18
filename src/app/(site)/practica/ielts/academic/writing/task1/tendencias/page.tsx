import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Tendencias — Identificar tendencias en gráficas | Idiomas WeLearn',
  description: 'Practica identificar las tendencias más relevantes en gráficas IELTS Task 1. Aprende qué mencionar y qué omitir para alcanzar Band 7+.',
  keywords: ['IELTS tendencias','IELTS task 1 tendencias','IELTS line graph','IELTS identify trends'],
  openGraph: {
    title: 'IELTS Task 1: Tendencias — Identificar tendencias en gráficas | Idiomas WeLearn',
    description: 'Practica identificar las tendencias más relevantes en gráficas IELTS Task 1. Aprende qué mencionar y qué omitir para alcanzar Band 7+.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tendencias' },
}

export default function Page() {
  return <Content />
}
