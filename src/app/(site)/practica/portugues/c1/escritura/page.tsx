import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-c1.json'

const title = "Escrita C1 · Casos do trabalho | WeLearn"
const description = "Vinte situações profissionais para avaliar versões divergentes e escrever em português uma resposta clara e ponderada."
const canonical = '/practica/portugues/c1/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'pt_BR', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="pt" level="C1" cases={cases} />
}
