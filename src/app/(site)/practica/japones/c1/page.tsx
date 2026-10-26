import type { Metadata } from 'next'
import JapaneseAdvancedLevelHub from '@/components/practica/JapaneseAdvancedLevelHub'
export const metadata: Metadata = { title: '日本語C1・N1文法完全コース', description: '日本語C1・N1相当の高度な文法、情報構造、待遇表現、論証を視覚マップと段階別練習で学びます。', alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/c1' } }
export default function Page() { return <JapaneseAdvancedLevelHub level="c1" /> }
