import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-japones-c2.json'

export const metadata: Metadata = {
  title: '日本語C2ライティング · 職場のケース | WeLearn',
  description: '複雑な職場の20ケース。資料が支える主張と残る不確実さを見極め、日本語で正確かつ配慮のある返信を書きます。',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ja" level="C2" cases={cases} />
}
