import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ruso', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Ruso B1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/ruso/b1/vocabulario"
        description="Ejercicios de vocabulario de Ruso nivel B1: 8 sets temáticos con cirílico, transliteración y práctica activa."
      />
      <Content />
    </>
  )
}
