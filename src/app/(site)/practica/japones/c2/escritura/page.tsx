import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-japones-c2.json'

const title = "日本語C2ライティング · 職場のケース | WeLearn"
const description = "複雑な職場の20ケース。資料が支える主張と残る不確実さを見極め、日本語で正確かつ配慮のある返信を書きます。"
const canonical = '/practica/japones/c2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'ja_JP', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ja" level="C2" cases={cases} />
}
