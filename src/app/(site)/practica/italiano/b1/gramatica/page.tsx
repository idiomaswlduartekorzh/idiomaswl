import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'b1', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Italiano B1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/italiano/b1/gramatica"
        description="Ejercicios de gramática italiana B1: congiuntivo presente, condizionale, particelle pronominali, periodo ipotetico, pronomi relativi y discorso indiretto."
      />
      <Content />
    </>
  )
}
