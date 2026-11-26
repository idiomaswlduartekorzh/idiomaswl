import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NEW_DILEMMAS } from '@/data/practica/speaking-dilemmas'
import { dilemmaPath } from '@/lib/practica/speaking-dilemma-routes'
import DilemmaExercise from '../DilemmaExercise'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return NEW_DILEMMAS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dilemma = NEW_DILEMMAS.find((item) => item.slug === slug)
  if (!dilemma) notFound()

  return {
    title: `${dilemma.title} — Speaking C1 | WeLearn`,
    description: dilemma.prompt,
    alternates: { canonical: `https://www.idiomaswl.com${dilemmaPath(slug)}` },
  }
}

export default async function SpeakingDilemmaPage({ params }: Props) {
  const { slug } = await params
  const dilemma = NEW_DILEMMAS.find((item) => item.slug === slug)
  if (!dilemma) notFound()

  return <DilemmaExercise dilemma={dilemma} />
}
