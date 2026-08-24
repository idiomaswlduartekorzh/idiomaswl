import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayToolkitPage } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet, roleplayToolkitPath } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'ingles'
const LEVEL = 'a2'

export const metadata: Metadata = {
  title: 'Caja de herramientas para hablar inglés A2 | Idiomas WeLearn',
  description: 'Frases de apoyo para abrir y cerrar conversaciones, pedir repetición, ganar tiempo, explicar y rechazar con educación en inglés A2.',
  alternates: { canonical: `https://www.idiomaswl.com${roleplayToolkitPath(LANGUAGE, LEVEL)}` },
}

export default function Page() {
  const set = getRoleplaySet(LANGUAGE, LEVEL)
  if (!set) notFound()
  return <RoleplayToolkitPage set={set} />
}
