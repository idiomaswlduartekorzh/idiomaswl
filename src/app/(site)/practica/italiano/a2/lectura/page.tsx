import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a2', 'lectura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Lectura en Italiano A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/italiano/a2/lectura"
        description="Ejercicios de comprensión lectora de Italiano nivel A2 con vocabulario interactivo y preguntas adaptativas."
      />
      <Content />
    </>
  )
}
