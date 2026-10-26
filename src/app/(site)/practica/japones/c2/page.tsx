import type { Metadata } from 'next'
import JapaneseAdvancedLevelHub from '@/components/practica/JapaneseAdvancedLevelHub'
export const metadata: Metadata = { title: '日本語C2・談話と文体の完全コース', description: '日本語C2の視点、作用域、含意、ジャンル変換、専門文体、校閲を視覚マップと実践で磨く完全コースです。', alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/c2' } }
export default function Page() { return <JapaneseAdvancedLevelHub level="c2" /> }
