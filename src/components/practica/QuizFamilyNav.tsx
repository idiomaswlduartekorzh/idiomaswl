import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import s from './QuizFamilyNav.module.css'

type QuizFamily = 'pronombres' | 'tiempos'

export default function QuizFamilyNav({ active, languageName, slug }: {
  active: QuizFamily
  languageName: string
  slug: string
}) {
  const items = [
    { id: 'tiempos' as const, href: `/herramientas/quizes/${slug}`, label: 'Tiempos y estructuras' },
    { id: 'pronombres' as const, href: `/herramientas/quizes/pronombres/${slug}`, label: 'Pronombres' },
  ]

  return (
    <nav aria-label={`Tipos de quiz de ${languageName}`} className={s.nav}>
      {items.map((item) => item.id === active ? (
        <span aria-current="page" className={s.item} key={item.id}>
          <span><small>Quiz actual</small><strong>{item.label}</strong></span>
        </span>
      ) : (
        <Link className={s.item} href={item.href} key={item.id}>
          <span><small>También puedes practicar</small><strong>{item.label}</strong></span>
          <ArrowRight aria-hidden="true" size={17}/>
        </Link>
      ))}
    </nav>
  )
}
