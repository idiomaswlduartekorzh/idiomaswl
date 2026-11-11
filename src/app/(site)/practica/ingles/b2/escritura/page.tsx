import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-b2.json'

const title = "Writing B2 · Workplace cases | WeLearn"
const description = "Twenty English B2 workplace writing cases: read an email, check the facts, and write a clear reply."
const canonical = '/practica/ingles/b2/escritura'

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
}

export default function Page() {
  return <WorkplaceWritingExperience level="B2" cases={cases} />
}
