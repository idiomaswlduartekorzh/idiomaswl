import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-coreano-b2.json'

export const metadata: Metadata = {
  title: '한국어 B2 쓰기 · 직장 사례 | WeLearn',
  description: '직장에서 생기는 오해 20가지. 이메일과 자료를 읽고 사실을 확인한 뒤 한국어로 답장을 씁니다.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ko" level="B2" cases={cases} />
}
