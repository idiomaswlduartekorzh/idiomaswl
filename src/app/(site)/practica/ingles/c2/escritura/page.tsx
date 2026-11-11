import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-c2.json'

export const metadata: Metadata = {
  title: 'Writing C2 · Workplace cases | WeLearn',
  description: 'Twenty English C2 workplace writing cases that challenge attribution, precision, and professional tone.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience level="C2" cases={cases} />
}
