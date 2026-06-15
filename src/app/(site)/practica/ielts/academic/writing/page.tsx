import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing — Task 1 y Task 2 | Idiomas WeLearn',
  description: 'Domina el IELTS Academic Writing: Task 1 (datos visuales) y Task 2 (ensayo argumentativo). Ejercicios progresivos con feedback inmediato. Objetivo Band 7.',
  keywords: ['IELTS academic writing', 'IELTS writing task 1', 'IELTS writing task 2', 'IELTS writing band 7', 'ejercicios IELTS writing'],
  openGraph: {
    title: 'IELTS Academic Writing | Idiomas WeLearn',
    description: 'Practica IELTS Writing Task 1 y Task 2 con ejercicios interactivos.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
}

export default function Page() {
  return <Content />
}
