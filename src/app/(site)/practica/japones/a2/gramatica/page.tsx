import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Japonés A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/japones/a2/gramatica"
        description="Ejercicios de gramática de Japonés nivel A2: て-form, た-form, ～ています, ～たいです, ～ことができます y ～なければなりません."
      />
      <Content />
    </>
  )
}
