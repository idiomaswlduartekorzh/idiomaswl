import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Italiano B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/italiano/b1/vocabulario"
        description="Ejercicios de vocabulario de Italiano nivel B1: tarjetas temáticas, scelta multipla y escritura activa."
      />
      <Content />
    </>
  )
}
