import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Academic Writing — Task 1 y Task 2',
  description: 'Domina el IELTS Academic Writing: Task 1 (datos visuales) y Task 2 (ensayo argumentativo). Ejercicios progresivos con feedback inmediato. Objetivo Band 7.',
  keywords: ['IELTS academic writing', 'IELTS writing task 1', 'IELTS writing task 2', 'IELTS writing band 7', 'ejercicios IELTS writing'],
  openGraph: {
    title: 'IELTS Academic Writing',
    description: 'Practica IELTS Writing Task 1 y Task 2 con ejercicios interactivos.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
}

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing'

const FAQS = [
  {
    question: '¿Qué incluye IELTS Academic Writing?',
    answer:
      'IELTS Academic Writing incluye Task 1, una respuesta de al menos 150 palabras sobre información visual, y Task 2, un ensayo de al menos 250 palabras.',
  },
  {
    question: '¿Cómo organiza WeLearn la práctica de Writing?',
    answer:
      'WeLearn separa formato oficial y estrategia: primero entiende Task 1 y Task 2, luego practica microhabilidades, bancos de prompts, modelos comentados y revisión con rúbrica.',
  },
]

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing práctica"
        url={URL}
        description="Hub de práctica para IELTS Academic Writing Task 1 y Task 2 con rutas de rúbrica, ejercicios y respuestas explicadas."
        teaches={['IELTS Writing Task 1', 'IELTS Writing Task 2', 'essay writing', 'visual data description']}
        isPartOf={{ name: 'IELTS Academic', url: 'https://www.idiomaswl.com/practica/ielts/academic' }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS Academic', url: 'https://www.idiomaswl.com/practica/ielts/academic' },
          { name: 'Writing', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
