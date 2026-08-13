import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../task2/Task2SkillStructuredData'
import { VOCAB_UNITS, unitBySlug } from '../vocabulary-index'
import VocabularyUnitClient from '../VocabularyUnitClient'

/**
 * Una URL por unidad de vocabulario.
 *
 * Es la mitad del argumento para organizar por subparte y por función en vez de por tema:
 * quien busca «vocabulario de tendencias en inglés» o «cómo introducir un gráfico en inglés»
 * llega a una página que va de eso y nada más. Un índice temático no tiene ninguna URL que
 * ofrecerle a esa búsqueda.
 */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/vocabulario'

export function generateStaticParams() {
  return VOCAB_UNITS.map((unit) => ({ unidad: unit.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ unidad: string }> }): Promise<Metadata> {
  const { unidad } = await params
  const unit = unitBySlug(unidad)
  if (!unit) return {}

  return {
    title: unit.seoTitle,
    description: unit.seoDescription,
    keywords: [
      unit.spanishName.toLowerCase(),
      `${unit.label.toLowerCase()} vocabulary ielts`,
      'vocabulario IELTS writing',
      'vocabulario académico inglés',
    ],
    openGraph: { title: unit.seoTitle, description: unit.seoDescription, type: 'article', locale: 'es_CO' },
    alternates: { canonical: `${BASE}/${unit.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ unidad: string }> }) {
  const { unidad } = await params
  const unit = unitBySlug(unidad)
  if (!unit) notFound()

  return (
    <>
      <Task2SkillStructuredData
        name={unit.spanishName}
        path={`/practica/ielts/academic/writing/vocabulario/${unit.slug}`}
        teaches={['academic vocabulary', unit.label.toLowerCase(), 'lexical resource']}
      />
      <VocabularyUnitClient slug={unit.slug} />
    </>
  )
}
