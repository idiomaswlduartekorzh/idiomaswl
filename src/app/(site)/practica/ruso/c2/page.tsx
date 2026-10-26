import type { Metadata } from 'next'
import RussianAdvancedLevelHub from '@/components/practica/RussianAdvancedLevelHub'
export const metadata: Metadata = { title: 'Русский C2: грамматика, стиль и дискурс', description: 'Русская грамматика C2: перспектива, прагматика, жанр, вариативность, профессиональная редактура, практика и PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso/c2' } }
export default function Page() { return <RussianAdvancedLevelHub level="c2" /> }
