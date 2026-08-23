import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayScenarioSetup } from '@/components/practica/roleplay/RoleplayExperience'
import { ROLEPLAY_INGLES_A2, getRoleplayScenario } from '@/data/practica/habla-acompanado'
import { fitDescription, fitTitle } from '@/lib/seo-snippet'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ROLEPLAY_INGLES_A2.map((scenario) => ({ slug: scenario.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const scenario = getRoleplayScenario('ingles', 'a2', slug)
  if (!scenario) return { title: 'Escenario no encontrado', robots: { index: false } }
  const url = `https://www.idiomaswl.com/practica/ingles/a2/habla/acompanada/${scenario.slug}`
  return {
    title: fitTitle(`${scenario.title} — Roleplay en inglés A2`),
    description: fitDescription(`${scenario.settingEs} Juego de rol de ${scenario.minutes} minutos para dos personas, con fichas separadas y práctica de inglés A2.`),
    alternates: { canonical: url },
    openGraph: { title: scenario.title, description: scenario.settingEs, url, type: 'article', locale: 'es_CO' },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const scenario = getRoleplayScenario('ingles', 'a2', slug)
  if (!scenario) notFound()
  return <RoleplayScenarioSetup scenario={scenario} />
}
