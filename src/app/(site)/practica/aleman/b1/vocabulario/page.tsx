import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('aleman', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Alemán B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/aleman/b1/vocabulario"
        description="Ejercicios de vocabulario de Alemán nivel B1: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
