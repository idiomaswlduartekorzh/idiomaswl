import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-coreano-c2.json'

export const metadata: Metadata = {
  title: '한국어 C2 쓰기 · 직장 사례 | WeLearn',
  description: '복잡한 직장 사례 20가지. 자료가 뒷받침하는 주장과 남은 불확실성을 구분하고 한국어로 정확하고 신중한 답장을 씁니다.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ko" level="C2" cases={cases} />
}
