import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayToolkitPage } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet, roleplayToolkitPath } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'ingles'
const LEVEL = 'b1'

export const metadata: Metadata = {
  title: 'Caja de herramientas para hablar inglés B1 | Idiomas WeLearn',
  description: 'Recursos para aclarar, negociar, poner límites, conceder con condiciones y cerrar acuerdos en conversaciones de inglés B1.',
  alternates: { canonical: `https://www.idiomaswl.com${roleplayToolkitPath(LANGUAGE, LEVEL)}` },
}

export default function Page() {
  const set = getRoleplaySet(LANGUAGE, LEVEL)
  if (!set) notFound()
  return <RoleplayToolkitPage set={set} />
}
