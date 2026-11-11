import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-japones-c1.json'

const title = "日本語C1ライティング · 職場のケース | WeLearn"
const description = "職場で起こる20の行き違い。異なる説明を資料と照らし合わせ、日本語で正確で落ち着いた返信を書きます。"
const canonical = '/practica/japones/c1/escritura'

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
  return <WorkplaceWritingExperience language="ja" level="C1" cases={cases} />
}
