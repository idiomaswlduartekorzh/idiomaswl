import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-b2.json'

export const metadata: Metadata = {
  title: 'Escrita B2 · Casos do trabalho | WeLearn',
  description: 'Vinte situações profissionais para ler um e-mail, conferir os fatos e escrever uma resposta clara em português.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="pt" level="B2" cases={cases} />
}
