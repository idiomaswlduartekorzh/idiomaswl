import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-c2.json'

export const metadata: Metadata = {
  title: 'Escrita C2 · Casos do trabalho | WeLearn',
  description: 'Vinte situações profissionais complexas para avaliar os fatos, calibrar afirmações e responder em português com precisão e tato.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="pt" level="C2" cases={cases} />
}
