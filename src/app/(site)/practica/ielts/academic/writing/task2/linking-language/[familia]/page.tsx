import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { LINKING_FAMILIES, familyBySlug } from '../linking-data'
import LinkingFamilyClient from '../LinkingFamilyClient'

/** One canonical English page per linking-function family. */

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/linking-language'

export function generateStaticParams() {
  return LINKING_FAMILIES.map((family) => ({ familia: family.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ familia: string }> }): Promise<Metadata> {
  const { familia } = await params
  const family = familyBySlug(familia)
  if (!family) return {}
  const title = `${family.label} linking words for IELTS Writing Task 2`
  const description = `Learn how ${family.label.toLowerCase()} linking words work in IELTS Writing Task 2, with punctuation guidance, worked examples and practice exercises.`

  return {
    title,
    description,
    keywords: [
      `${family.label.toLowerCase()} linking words`,
      ...family.connectors.slice(0, 4).map((connector) => `${connector.text.toLowerCase()} in academic writing`),
      'IELTS cohesion practice',
      'IELTS writing task 2 linking words',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      url: `${BASE}/${family.slug}`,
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
        name={`${family.label} linking words for IELTS Writing Task 2`}
        path={`/practica/ielts/academic/writing/task2/linking-language/${family.slug}`}
        teaches={['linking words', family.label.toLowerCase(), 'cohesion']}
      />
      <LinkingFamilyClient slug={family.slug} />
    </>
  )
}
