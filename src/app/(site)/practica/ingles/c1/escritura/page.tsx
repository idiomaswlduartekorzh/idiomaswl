import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-c1.json'

const title = "Writing C1 · Workplace cases | WeLearn"
const description = "Twenty English C1 workplace writing cases about evidence, intent, scope, and tactful replies."
const canonical = '/practica/ingles/c1/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'en_US', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience level="C1" cases={cases} />
}
