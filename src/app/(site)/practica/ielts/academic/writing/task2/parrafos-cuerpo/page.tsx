import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Párrafos Cuerpo — PEEL y argumentación | Idiomas WeLearn',
  description: 'Ejercicios de párrafos cuerpo para el IELTS Writing Task 2 con la estructura PEEL: Point, Evidence, Explanation, Link. Conectores y vocabulario académico Band 7.',
  keywords: ['IELTS párrafos cuerpo', 'IELTS PEEL structure', 'IELTS body paragraphs', 'IELTS writing argumentación'],
  openGraph: {
    title: 'IELTS Task 2: Párrafos Cuerpo — PEEL y argumentación | Idiomas WeLearn',
    description: 'Ejercicios de párrafos cuerpo para el IELTS Writing Task 2 con la estructura PEEL: Point, Evidence, Explanation, Link. Conectores y vocabulario académico Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/parrafos-cuerpo' },
}

import ParrafosCuerpoClient from './ParrafosCuerpoClient';
export default function Page() { return <ParrafosCuerpoClient />; }
