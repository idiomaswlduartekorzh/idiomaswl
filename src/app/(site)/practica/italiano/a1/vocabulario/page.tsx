import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Italiano A1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/italiano/a1/vocabulario"
        description="Ejercicios de vocabulario de Italiano nivel A1: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
