import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1'

const FAQS = [
  {
    question: '¿Qué pide IELTS Academic Writing Task 1?',
    answer:
      'Pide describir información visual en al menos 150 palabras. Puede ser una gráfica, tabla, proceso, mapa o combinación de datos visuales.',
  },
  {
    question: '¿Estas habilidades son tareas oficiales separadas?',
    answer:
      'No. Las rutas de introducción, overview, tendencias y comparaciones son microhabilidades WeLearn para entrenar mejor la tarea oficial de IELTS Academic Writing Task 1.',
  },
]

export const metadata: Metadata = {
  title: 'IELTS Academic Writing Task 1 — 8 habilidades esenciales',
  description: 'Practica las habilidades del IELTS Writing Task 1: parafrasear, overview, tendencias, comparaciones, procesos, mapas, vocabulario y tarea completa. Ejercicios con feedback Band 6–7.',
  keywords: ['IELTS writing task 1', 'IELTS task 1 ejercicios', 'IELTS academic writing task 1', 'IELTS task 1 band 7', 'IELTS overview', 'IELTS tendencias gráficas'],
  openGraph: {
    title: 'IELTS Writing Task 1',
    description: 'Ejercicios progresivos de IELTS Writing Task 1: desde parafrasear hasta tarea completa.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: URL },
}

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing Task 1"
        url={URL}
        description="Hub de práctica para IELTS Academic Writing Task 1 con habilidades de descripción visual y rutas de práctica."
        teaches={[
          'IELTS Academic Writing Task 1',
          'visual data description',
          'overview',
          'comparisons',
          'process description',
          'map description',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: URL },
        ]}
      />
      <Content />
    </>
  )
}
