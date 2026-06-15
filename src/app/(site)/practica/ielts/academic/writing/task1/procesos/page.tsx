import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Procesos — Diagramas y flujos | Idiomas WeLearn',
  description: 'Practica describir procesos y diagramas en el IELTS Writing Task 1. Voz pasiva, vocabulario de secuencia y conectores de proceso. Estrategias Band 7.',
  keywords: ['IELTS procesos','IELTS task 1 proceso','IELTS process diagram','IELTS passive voice task 1'],
  openGraph: {
    title: 'IELTS Task 1: Procesos — Diagramas y flujos | Idiomas WeLearn',
    description: 'Practica describir procesos y diagramas en el IELTS Writing Task 1. Voz pasiva, vocabulario de secuencia y conectores de proceso. Estrategias Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/procesos' },
}

export default function Page() {
  return <Content />
}
