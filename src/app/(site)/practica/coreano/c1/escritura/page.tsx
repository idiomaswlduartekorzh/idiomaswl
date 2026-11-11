import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-coreano-c1.json'

const title = "한국어 C1 쓰기 · 직장 사례 | WeLearn"
const description = "직장에서 생기는 오해 20가지. 서로 다른 설명을 자료와 대조하고 한국어로 정확하고 균형 잡힌 답장을 씁니다."
const canonical = '/practica/coreano/c1/escritura'

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
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ko" level="C1" cases={cases} />
}
