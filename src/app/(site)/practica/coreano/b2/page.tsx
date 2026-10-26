import type { Metadata } from 'next'
import KoreanAdvancedLevelHub from '@/components/practica/KoreanAdvancedLevelHub'
export const metadata: Metadata = { title: '한국어 B2 — 문법 완성 과정', description: '30개 한국어 B2 문법 강의, 시각 지도, 단계별 연습과 PDF 3종을 제공합니다.', alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/b2' } }
export default function Page() { return <KoreanAdvancedLevelHub level="b2" /> }
