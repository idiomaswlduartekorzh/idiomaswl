import type { Metadata } from 'next'
import InglesPageClient from './InglesPageClient'
import { CourseSchema } from '@/components/practica/EducationSchema'

export const metadata: Metadata = {
  title: 'Práctica de Inglés — Elige tu nivel MCER | Idiomas WeLearn',
  description: 'Ejercicios interactivos de inglés por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha. A2, B1, B2, C1 próximamente.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles' },
}

export default function InglesPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Inglés — Ejercicios interactivos MCER"
        description="Ejercicios interactivos de inglés por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha."
        url="https://www.idiomaswl.com/practica/ingles"
        educationalLevel="A1,A2,B1"
        teaches="Inglés, IELTS, TOEFL"
        inLanguage="en"
      />
      <InglesPageClient />
    </>
  )
}
