import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoleplayToolkitPage } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet } from '@/data/practica/habla-acompanado'

export const metadata: Metadata = {
  title: 'Caja de herramientas para hablar inglés A2 | Idiomas WeLearn',
  description: 'Frases de apoyo para abrir y cerrar conversaciones, pedir repetición, ganar tiempo, explicar y rechazar con educación en inglés A2.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2/habla/acompanada/herramientas' },
}

export default function Page() {
  const set = getRoleplaySet('ingles', 'a2')
  if (!set) notFound()
  return <RoleplayToolkitPage set={set} />
}
