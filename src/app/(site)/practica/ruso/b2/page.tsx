import type { Metadata } from 'next'
import RussianAdvancedLevelHub from '@/components/practica/RussianAdvancedLevelHub'
export const metadata: Metadata = { title: 'Русский B2: полный курс грамматики', description: 'Русская грамматика B2: вид, падежи, синтаксис, визуальные карты, поэтапная практика и три PDF для каждой темы.', alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso/b2' } }
export default function Page() { return <RussianAdvancedLevelHub level="b2" /> }
