import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayRolePage } from '@/components/practica/roleplay/RoleplayExperience'
import {
  ROLEPLAY_INGLES_A2,
  getRoleplayRole,
  getRoleplayScenario,
  getRoleplaySet,
  isRoleId,
} from '@/data/practica/habla-acompanado'
import { fitDescription, fitTitle } from '@/lib/seo-snippet'

type Props = { params: Promise<{ slug: string; role: string }> }

export function generateStaticParams() {
  return ROLEPLAY_INGLES_A2.flatMap((scenario) => [
    { slug: scenario.slug, role: 'a' },
    { slug: scenario.slug, role: 'b' },
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, role } = await params
  const scenario = getRoleplayScenario('ingles', 'a2', slug)
  if (!scenario || !isRoleId(role)) return { title: 'Ficha no encontrada', robots: { index: false } }
  const selectedRole = getRoleplayRole(scenario, role)
  if (!selectedRole) return { title: 'Ficha no encontrada', robots: { index: false } }
  const url = `https://www.idiomaswl.com/practica/ingles/a2/habla/acompanada/${scenario.slug}/${role}`
  return {
    title: fitTitle(`${scenario.title}: rol ${role.toUpperCase()} — Speaking A2`),
    description: fitDescription(`Ficha del rol ${role.toUpperCase()} para practicar “${scenario.title}” en inglés A2 con otra persona.`),
    alternates: { canonical: url },
  }
}

export default async function Page({ params }: Props) {
  const { slug, role } = await params
  const scenario = getRoleplayScenario('ingles', 'a2', slug)
  if (!getRoleplaySet('ingles', 'a2') || !scenario || !isRoleId(role)) notFound()
  const selectedRole = getRoleplayRole(scenario, role)
  if (!selectedRole) notFound()
  return <RoleplayRolePage role={selectedRole} scenario={scenario} />
}
