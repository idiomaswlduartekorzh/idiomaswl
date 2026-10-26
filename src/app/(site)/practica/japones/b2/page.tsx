import type { Metadata } from 'next'
import JapaneseAdvancedLevelHub from '@/components/practica/JapaneseAdvancedLevelHub'
export const metadata: Metadata = { title: '日本語B2・N2文法完全コース', description: '日本語B2・N2相当の文法を、視覚マップ、段階別練習、テーマ別PDFで体系的に学ぶ完全コースです。', alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/b2' } }
export default function Page() { return <JapaneseAdvancedLevelHub level="b2" /> }
