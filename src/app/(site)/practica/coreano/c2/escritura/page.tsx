import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-coreano-c2.json'

const title = "한국어 C2 쓰기 · 직장 사례 | WeLearn"
const description = "복잡한 직장 사례 20가지. 자료가 뒷받침하는 주장과 남은 불확실성을 구분하고 한국어로 정확하고 신중한 답장을 씁니다."
const canonical = '/practica/coreano/c2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'ko_KR', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ko" level="C2" cases={cases} />
}
