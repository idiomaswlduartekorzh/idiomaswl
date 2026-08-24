import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { SpeakingModeHub } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet, speakingPath } from '@/data/practica/habla-acompanado'

const LANGUAGE = 'ingles'
const LEVEL = 'a1'
const set = getRoleplaySet(LANGUAGE, LEVEL)
const scenarioCount = set?.scenarios.length ?? 0
const canonical = `https://www.idiomaswl.com${speakingPath(LANGUAGE, LEVEL)}`

export const metadata: Metadata = {
  title: 'Speaking inglés A1: solo o en pareja | Idiomas WeLearn',
  description: `Practica speaking en inglés A1 con 20 frases individuales o con ${scenarioCount} juegos de rol para dos personas, fichas separadas y situaciones reales.`,
  alternates: { canonical },
}

export default function Page() {
  if (!set) notFound()
  return (
    <>
      <CourseSchema
        name="Speaking en inglés A1 — práctica individual y en pareja"
        description={`20 frases individuales y ${scenarioCount} juegos de rol para dos personas con información diferente por rol.`}
        url={canonical}
        educationalLevel="A1"
        teaches="Expresión oral en inglés"
        inLanguage="en"
      />
      <SpeakingModeHub set={set} />
    </>
  )
}
