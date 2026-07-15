import type { Metadata } from 'next'
import { Task1SkillStructuredData } from '../Task1SkillStructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 — Introducción — Parafrasear el enunciado',
  description: 'Practica parafrasear el enunciado del IELTS Writing Task 1. Técnicas de cambio de vocabulario, clase gramatical y estructura. Ejercicios con feedback inmediato.',
  keywords: ['IELTS task 1 introducción','IELTS parafrasear','IELTS writing task 1 ejercicios'],
  openGraph: {
    title: 'IELTS Task 1: Introducción — Parafrasear el enunciado',
    description: 'Practica parafrasear el enunciado del IELTS Writing Task 1. Técnicas de cambio de vocabulario, clase gramatical y estructura. Ejercicios con feedback inmediato.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/introduccion' },
}

export default function Page() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 introducción"
        path="/practica/ielts/academic/writing/task1/introduccion"
        teaches={['paraphrasing', 'task introduction', 'visual data prompt']}
      />
      <Content />
    </>
  )
}
