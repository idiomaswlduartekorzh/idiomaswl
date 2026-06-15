import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('aleman', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Alemán A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/aleman/a2/gramatica"
        description="Ejercicios interactivos de gramática de Alemán nivel A2 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
