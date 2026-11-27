import { notFound } from 'next/navigation'
import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'
import { IMPROVISA_LANGUAGES, isImprovisaLanguage } from '@/data/practica/improvisa/config'

type Props = { params: Promise<{ idioma: string; nivel: string }> }
const advancedLevels = ['b2', 'c1', 'c2'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return IMPROVISA_LANGUAGES.filter((idioma) => idioma !== 'ingles').flatMap((idioma) => (
    advancedLevels.map((nivel) => ({ idioma, nivel }))
  ))
}

async function route(params: Props['params']) {
  const { idioma, nivel } = await params
  if (!isImprovisaLanguage(idioma) || idioma === 'ingles') notFound()
  if (nivel !== 'b2' && nivel !== 'c1' && nivel !== 'c2') notFound()
  return { idioma, nivel } as const
}

export async function generateMetadata({ params }: Props) {
  const { idioma, nivel } = await route(params)
  return speakingDilemmaHubMetadata(nivel, idioma)
}

export default async function Page({ params }: Props) {
  const { idioma, nivel } = await route(params)
  return <SpeakingDilemmaHub level={nivel} language={idioma} />
}
