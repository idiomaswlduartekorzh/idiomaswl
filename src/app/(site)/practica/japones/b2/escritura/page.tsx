import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-japones-b2.json'

const title = "日本語B2ライティング · 職場のケース | WeLearn"
const description = "職場で起こる20の行き違い。メールと資料を読み比べ、根拠を確認して日本語で返信を書きます。"
const canonical = '/practica/japones/b2/escritura'

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
  return <WorkplaceWritingExperience language="ja" level="B2" cases={cases} />
}
