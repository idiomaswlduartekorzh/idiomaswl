import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Introducción — Hook + Thesis Band 7 | Idiomas WeLearn',
  description: 'Practica escribir introducciones del IELTS Writing Task 2: parafrasear el prompt, posición clara y thesis statement. Técnicas Band 7+ con ejemplos y feedback.',
  keywords: ['IELTS task 2 introducción', 'IELTS thesis statement', 'IELTS writing introducción', 'IELTS task 2 band 7'],
  openGraph: {
    title: 'IELTS Task 2: Introducción — Hook + Thesis Band 7 | Idiomas WeLearn',
    description: 'Practica escribir introducciones del IELTS Writing Task 2: parafrasear el prompt, posición clara y thesis statement. Técnicas Band 7+ con ejemplos y feedback.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/introduccion' },
}

import IntroduccionTask2Client from './IntroduccionTask2Client';
export default function Page() { return <IntroduccionTask2Client />; }
