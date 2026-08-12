import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { PARAPHRASE_TECHNIQUES, techniqueBySlug } from '../paraphrasing-data'
import ParaphrasingTechniqueClient from '../ParaphrasingTechniqueClient'

/**
 * Una URL por técnica de paráfrasis.
 *
 * El contenido va en inglés y los metadatos en español, igual que en las siete familias de
 * conectores: quien busca «voz pasiva en inglés» llega a una página que va de eso y nada más,
 * y quien viene de IELTS recorre las cinco desde el hub.
 */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/paraphrasing'

export function generateStaticParams() {
  return PARAPHRASE_TECHNIQUES.map((technique) => ({ tecnica: technique.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tecnica: string }> }): Promise<Metadata> {
  const { tecnica } = await params
  const technique = techniqueBySlug(tecnica)
  if (!technique) return {}

  return {
    title: technique.seoTitle,
    description: technique.seoDescription,
    keywords: [
      technique.spanishName.toLowerCase(),
      `${technique.label.toLowerCase()} paraphrasing english`,
      'cómo parafrasear en inglés',
      'parafrasear IELTS writing task 2',
    ],
    openGraph: {
      title: technique.seoTitle,
      description: technique.seoDescription,
      type: 'article',
      locale: 'es_CO',
    },
    alternates: { canonical: `${BASE}/${technique.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ tecnica: string }> }) {
  const { tecnica } = await params
  const technique = techniqueBySlug(tecnica)
  if (!technique) notFound()

  return (
    <>
      <Task2SkillStructuredData
        name={technique.spanishName}
        path={`/practica/ielts/academic/writing/task2/paraphrasing/${technique.slug}`}
        teaches={['paraphrasing', technique.label.toLowerCase(), 'lexical resource']}
      />
      <ParaphrasingTechniqueClient slug={technique.slug} />
    </>
  )
}
