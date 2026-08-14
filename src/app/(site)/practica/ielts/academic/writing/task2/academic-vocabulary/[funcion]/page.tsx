import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { VOCAB_FUNCTIONS, functionBySlug } from '../vocabulary-data'
import VocabularyFunctionClient from '../VocabularyFunctionClient'

/**
 * Una URL por función del vocabulario.
 *
 * Es la mitad del argumento para organizar por función y no por tema: quien busca «registro
 * académico en inglés» o «cómo matizar una afirmación» llega a una página que va de eso y nada
 * más. Un índice temático no tiene ninguna URL que ofrecerle a esa búsqueda.
 */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/academic-vocabulary'

export function generateStaticParams() {
  return VOCAB_FUNCTIONS.map((item) => ({ funcion: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ funcion: string }> }): Promise<Metadata> {
  const { funcion } = await params
  const item = functionBySlug(funcion)
  if (!item) return {}
  const title = `${item.label} in IELTS Writing Task 2 vocabulary`
  const description = `Build precise academic vocabulary for ${item.label.toLowerCase()} in IELTS Writing Task 2 through usage patterns, common errors and guided practice.`

  return {
    title,
    description,
    keywords: [
      `${item.label.toLowerCase()} academic english`,
      'academic English vocabulary',
      'IELTS writing task 2 vocabulary',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      url: `${BASE}/${item.slug}`,
    },
    alternates: { canonical: `${BASE}/${item.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ funcion: string }> }) {
  const { funcion } = await params
  const item = functionBySlug(funcion)
  if (!item) notFound()

  return (
    <>
      <Task2SkillStructuredData
        name={`${item.label} in IELTS Writing Task 2 vocabulary`}
        path={`/practica/ielts/academic/writing/task2/academic-vocabulary/${item.slug}`}
        teaches={['academic vocabulary', item.label.toLowerCase(), 'lexical resource']}
      />
      <VocabularyFunctionClient slug={item.slug} />
    </>
  )
}
