import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic — práctica completa de Writing, Reading y más',
  description: 'Practica el IELTS Academic con ejercicios interactivos de Writing Task 1, Task 2, vocabulario académico y estrategias Band 7+. Gratis en Idiomas WeLearn.',
  keywords: ['IELTS academic', 'IELTS práctica', 'IELTS writing ejercicios', 'preparación IELTS', 'IELTS band 7'],
  openGraph: {
    title: 'IELTS Academic',
    description: 'Ejercicios interactivos para el IELTS Academic. Writing Task 1, Task 2 y más.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic'

const FAQS = [
  {
    question: '¿Qué incluye IELTS Academic?',
    answer:
      'IELTS Academic incluye Listening, Reading, Writing y Speaking. En esta ruta organizamos la práctica por habilidad y distinguimos el formato oficial de las estrategias WeLearn.',
  },
  {
    question: '¿Esta página reemplaza los materiales oficiales de IELTS?',
    answer:
      'No. Es una guía de práctica original de WeLearn que enlaza las habilidades disponibles y debe usarse junto con las fuentes oficiales del examen.',
  },
]

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic práctica"
        url={URL}
        description="Hub de práctica para IELTS Academic con rutas de Reading y Writing, ejercicios originales y navegación por habilidades."
        teaches={['IELTS Academic', 'Academic Reading', 'Academic Writing', 'exam practice']}
        isPartOf={{ name: 'Práctica IELTS', url: 'https://www.idiomaswl.com/practica/ielts' }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS Academic', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
