import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-c1.json'

export const metadata: Metadata = {
  title: 'Escrita C1 · Casos do trabalho | WeLearn',
  description: 'Vinte situações profissionais para avaliar versões divergentes e escrever em português uma resposta clara e ponderada.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="pt" level="C1" cases={cases} />
}
