import type { Metadata } from 'next'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { SpeakingModeHub } from '@/components/practica/roleplay/RoleplayExperience'
import { getRoleplaySet } from '@/data/practica/habla-acompanado'

export const metadata: Metadata = {
  title: 'Speaking inglés A2: solo o en pareja | Idiomas WeLearn',
  description: 'Practica speaking en inglés A2 con 20 frases individuales o con 8 juegos de rol para dos personas, fichas separadas y situaciones reales.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2/habla' },
}

export default function Page() {
  const set = getRoleplaySet('ingles', 'a2')
  if (!set) return null
  return (
    <>
      <CourseSchema
        name="Speaking en inglés A2 — práctica individual y en pareja"
        description="20 frases individuales y 8 juegos de rol para dos personas con información diferente por rol."
        url="https://www.idiomaswl.com/practica/ingles/a2/habla"
        educationalLevel="A2"
        teaches="Expresión oral en inglés"
        inLanguage="en"
      />
      <SpeakingModeHub set={set} />
    </>
  )
}
