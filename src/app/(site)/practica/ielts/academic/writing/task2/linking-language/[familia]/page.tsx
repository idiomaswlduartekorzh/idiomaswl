import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { LINKING_FAMILIES, familyBySlug } from '../linking-data'
import LinkingFamilyClient from '../LinkingFamilyClient'

/**
 * Una URL por familia de conectores.
 *
 * El contenido de la página está en inglés, porque es lo que se aprende; los metadatos van
 * en español, porque es como busca esta audiencia: «conectores de contraste en inglés» tiene
 * volumen y «contrast linking words» no lo tiene para un lector colombiano. Es el mismo
 * criterio que usa la gramática de práctica.
 */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/linking-language'

export function generateStaticParams() {
  return LINKING_FAMILIES.map((family) => ({ familia: family.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ familia: string }> }): Promise<Metadata> {
  const { familia } = await params
  const family = familyBySlug(familia)
  if (!family) return {}

  return {
    title: family.seoTitle,
    description: family.seoDescription,
    keywords: [
      family.spanishName.toLowerCase(),
      `${family.label.toLowerCase()} linking words`,
      ...family.connectors.slice(0, 4).map((connector) => `${connector.text.toLowerCase()} en inglés`),
      'conectores en inglés',
      'IELTS writing task 2 linking words',
    ],
    openGraph: {
      title: family.seoTitle,
      description: family.seoDescription,
      type: 'article',
      locale: 'es_CO',
    },
    alternates: { canonical: `${BASE}/${family.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ familia: string }> }) {
  const { familia } = await params
  const family = familyBySlug(familia)
  if (!family) notFound()

  return (
    <>
      <Task2SkillStructuredData
        name={`Conectores de ${family.label.toLowerCase()} en inglés`}
        path={`/practica/ielts/academic/writing/task2/linking-language/${family.slug}`}
        teaches={['linking words', family.label.toLowerCase(), 'cohesion']}
      />
      <LinkingFamilyClient slug={family.slug} />
    </>
  )
}
