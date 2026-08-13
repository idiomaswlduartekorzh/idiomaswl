import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Task2SkillStructuredData } from '../../Task2SkillStructuredData'
import { TRANSFERABLE_SKILLS } from '../skills-data'
import SkillClient from '../SkillClient'

const BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/habilidades'

export function generateStaticParams() {
  return TRANSFERABLE_SKILLS.map((skill) => ({ habilidad: skill.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ habilidad: string }> }): Promise<Metadata> {
  const { habilidad } = await params
  const skill = TRANSFERABLE_SKILLS.find((item) => item.slug === habilidad)
  if (!skill) return {}
  return {
    title: skill.seoTitle,
    description: skill.seoDescription,
    keywords: [skill.spanishName.toLowerCase(), `${skill.label.toLowerCase()} ielts`, 'IELTS writing task 2'],
    openGraph: { title: skill.seoTitle, description: skill.seoDescription, type: 'article', locale: 'es_CO' },
    alternates: { canonical: `${BASE}/${skill.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ habilidad: string }> }) {
  const { habilidad } = await params
  const skill = TRANSFERABLE_SKILLS.find((item) => item.slug === habilidad)
  if (!skill) notFound()
  return (
    <>
      <Task2SkillStructuredData
        name={skill.spanishName}
        path={`/practica/ielts/academic/writing/task2/habilidades/${skill.slug}`}
        teaches={[skill.label.toLowerCase(), 'IELTS writing task 2']}
      />
      <SkillClient slug={skill.slug} />
    </>
  )
}
