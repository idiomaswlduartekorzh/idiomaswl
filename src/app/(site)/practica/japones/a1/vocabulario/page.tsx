import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Japonés A1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/japones/a1/vocabulario"
        description="Ejercicios de vocabulario de Japonés nivel A1: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
