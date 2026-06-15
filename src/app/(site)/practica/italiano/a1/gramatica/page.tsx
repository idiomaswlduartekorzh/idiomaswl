import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Italiano A1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/italiano/a1/gramatica"
        description="Ejercicios interactivos de gramática de Italiano nivel A1 con feedback inmediato y explicaciones."
      />
      <Content />
    </>
  )
}
