import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('aleman', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Alemán B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/aleman/b1/gramatica"
        description="Ejercicios interactivos de gramática de Alemán nivel B1: Konjunktiv II, Relativsätze, Passiv, temporale Konjunktionen e Indirekte Rede."
      />
      <Content />
    </>
  )
}
