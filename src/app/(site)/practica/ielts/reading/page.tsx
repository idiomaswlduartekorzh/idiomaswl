import type { Metadata } from 'next'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd } from '@/components/exam-practice/StructuredData'
import InternationalLearningResourceJsonLd from '@/components/exam-practice/InternationalLearningResourceJsonLd'
import { IELTS_READING_SKILLS, IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog'
import Content from './Content'

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading`

const ENGLISH_SKILL_NAMES: Record<string, string> = {
  skimming: 'Skimming',
  scanning: 'Scanning',
  inferencia: 'Inference',
  parafrasis: 'Paraphrase recognition',
  'limite-de-palabras': 'Word-limit control',
  'gestion-del-tiempo': 'Time management',
}

export const metadata: Metadata = {
  title: 'IELTS Academic Reading Practice Hub: Skills and Question Types',
  description:
    'Build IELTS Academic Reading step by step with 14 question-type routes, skimming, scanning, inference, paraphrase, word-limit control and mixed practice.',
  keywords: [
    'IELTS Academic Reading practice',
    'IELTS Reading question types',
    'IELTS skimming practice',
    'IELTS scanning practice',
    'IELTS Reading skills',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'IELTS Academic Reading Practice Hub',
    description: 'Train question types, reading subskills and mixed-passage transfer in one progressive IELTS Reading hub.',
    type: 'website',
    locale: 'en_US',
    url: URL,
  },
  alternates: { canonical: URL },
}

const FAQS = [
  {
    question: '¿Por dónde debería empezar en el hub de IELTS Reading?',
    answer:
      'Empieza con Skimming y Scanning si pierdes tu ubicación dentro del pasaje. Empieza con un tipo de pregunta específico si encuentras la evidencia, pero todavía eliges la respuesta incorrecta.',
  },
  {
    question: '¿Skimming y scanning son tipos oficiales de pregunta IELTS?',
    answer:
      'No. Son habilidades de lectura transferibles. WeLearn las separa de los formatos oficiales y muestra en qué tipos de pregunta se aplican.',
  },
  {
    question: '¿Debo practicar IELTS Reading con cronómetro desde el principio?',
    answer:
      'No. Primero construye un proceso preciso para localizar evidencia y decidir respuestas. Añade presión de tiempo cuando puedas explicar por qué una respuesta es correcta.',
  },
  {
    question: '¿Cuándo debo usar la práctica mixta de IELTS Reading?',
    answer:
      'Usa la práctica mixta después del entrenamiento enfocado, cuando puedas cambiar entre afirmaciones, emparejamientos y ejercicios de completar dentro del mismo pasaje.',
  },
]

export default function Page() {
  const learningRoutes = [...IELTS_READING_TYPES, ...IELTS_READING_SKILLS].filter((item) => item.status === 'published')

  return (
    <>
      <CourseSchema
        name="IELTS Academic Reading Practice Hub"
        description="English-first IELTS Academic Reading hub with question-type routes, transferable reading skills and mixed practice."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Academic Reading, skimming, scanning, inference, paraphrase, question types and time management"
        inLanguage="en"
      />
      <InternationalLearningResourceJsonLd
        name="IELTS Academic Reading Practice Hub"
        url={URL}
        description="Progressive IELTS Academic Reading practice organised by question type, reading subskill and mixed-passage transfer."
        teaches={['IELTS Academic Reading', 'question types', 'skimming', 'scanning', 'paraphrase', 'inference', 'word limits', 'time management']}
        isPartOf={{ name: 'IELTS Practice', url: `${PRACTICE_BASE_URL}/practica/ielts` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'IELTS Reading learning routes',
          itemListElement: learningRoutes.map((route, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: ENGLISH_SKILL_NAMES[route.slug] ?? route.title,
            url: `${PRACTICE_BASE_URL}${route.path}`,
          })),
        }}
      />
      <Content />
    </>
  )
}
