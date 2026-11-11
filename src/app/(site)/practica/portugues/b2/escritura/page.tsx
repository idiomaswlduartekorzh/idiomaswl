import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-b2.json'

const title = "Escrita B2 · Casos do trabalho | WeLearn"
const description = "Vinte situações profissionais para ler um e-mail, conferir os fatos e escrever uma resposta clara em português."
const canonical = '/practica/portugues/b2/escritura'

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
  return <WorkplaceWritingExperience language="pt" level="B2" cases={cases} />
}
