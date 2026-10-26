import type { Metadata } from 'next'
import RussianAdvancedLevelHub from '@/components/practica/RussianAdvancedLevelHub'
export const metadata: Metadata = { title: 'Русский C1: полный курс грамматики', description: 'Русская грамматика C1: акциональность, сложный синтаксис, академический стиль, визуальные карты, практика и PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso/c1' } }
export default function Page() { return <RussianAdvancedLevelHub level="c1" /> }
