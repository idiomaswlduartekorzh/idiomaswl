import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-japones-c1.json'

export const metadata: Metadata = {
  title: '日本語C1ライティング · 職場のケース | WeLearn',
  description: '職場で起こる20の行き違い。異なる説明を資料と照らし合わせ、日本語で正確で落ち着いた返信を書きます。',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ja" level="C1" cases={cases} />
}
