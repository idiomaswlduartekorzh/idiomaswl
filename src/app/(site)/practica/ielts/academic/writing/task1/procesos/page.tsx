import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Procesos — Diagramas y flujos',
  description: 'Practica describir procesos y diagramas en el IELTS Writing Task 1. Voz pasiva, vocabulario de secuencia y conectores de proceso. Estrategias Band 7.',
  keywords: ['IELTS procesos','IELTS task 1 proceso','IELTS process diagram','IELTS passive voice task 1'],
  openGraph: {
    title: 'IELTS Task 1: Procesos — Diagramas y flujos',
    description: 'Practica describir procesos y diagramas en el IELTS Writing Task 1. Voz pasiva, vocabulario de secuencia y conectores de proceso. Estrategias Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/procesos' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 procesos"
        path="/practica/ielts/academic/writing/task1/procesos"
        teaches={['process description', 'sequence language', 'passive voice']}
      />
      <Content />
    </>
  )
}
