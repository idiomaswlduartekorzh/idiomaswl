import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-portugues-c2.json'

const title = "Escrita C2 · Casos do trabalho | WeLearn"
const description = "Vinte situações profissionais complexas para avaliar os fatos, calibrar afirmações e responder em português com precisão e tato."
const canonical = '/practica/portugues/c2/escritura'

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
  return <WorkplaceWritingExperience language="pt" level="C2" cases={cases} />
}
