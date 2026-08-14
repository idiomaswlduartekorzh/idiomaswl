import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { PARAPHRASE_TECHNIQUES, techniqueBySlug } from '../paraphrasing-data'
import ParaphrasingTechniqueClient from '../ParaphrasingTechniqueClient'

/** One canonical English page per paraphrasing technique. */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/paraphrasing'

export function generateStaticParams() {
  return PARAPHRASE_TECHNIQUES.map((technique) => ({ tecnica: technique.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tecnica: string }> }): Promise<Metadata> {
  const { tecnica } = await params
  const technique = techniqueBySlug(tecnica)
  if (!technique) return {}
  const title = `${technique.label} paraphrasing for IELTS Writing Task 2`
  const description = `Practise ${technique.label.toLowerCase()} as an IELTS Writing Task 2 paraphrasing technique, with meaning checks, common traps and guided exercises.`

  return {
    title,
    description,
    keywords: [
      `${technique.label.toLowerCase()} paraphrasing`,
      'how to paraphrase in English',
      'IELTS Writing Task 2 paraphrasing',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      url: `${BASE}/${technique.slug}`,
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
        name={`${technique.label} paraphrasing for IELTS Writing Task 2`}
        path={`/practica/ielts/academic/writing/task2/paraphrasing/${technique.slug}`}
        teaches={['paraphrasing', technique.label.toLowerCase(), 'lexical resource']}
      />
      <ParaphrasingTechniqueClient slug={technique.slug} />
    </>
  )
}
