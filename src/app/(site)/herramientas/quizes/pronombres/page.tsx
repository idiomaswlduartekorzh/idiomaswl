import type { Metadata } from 'next'
import Link from 'next/link'

import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import { PRONOUN_QUESTS } from '@/data/practica/pronoun-quest-registry'

import s from '../QuizesHub.module.css'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/pronombres'

export const metadata: Metadata = {
  title: 'Quizes de pronombres por idioma — práctica acumulativa',
  description: 'Practica pronombres personales, demostrativos, posesivos, directos, indirectos y reflexivos con corrección al terminar cada nivel.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Quizes de pronombres — Idiomas WeLearn',
    description: 'Sigue referentes, funciones, concordancia y posición mediante seis niveles cerrados.',
    url: URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function PronounQuizesPage() {
  return <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
    <div className="wlp-shell">
      <nav aria-label="Migas de pan" className="wlp-breadcrumb"><Link href="/herramientas">Herramientas</Link><span aria-hidden="true">/</span><Link href="/herramientas/quizes">Quizes</Link><span aria-hidden="true">/</span><span aria-current="page">Pronombres</span></nav>
      <header className="wlp-hero wlp-hero--compact"><p className="wlp-eyebrow">Gramática · referentes y función</p><h1>Quizes de pronombres</h1><p className="wlp-hero-lead">Practica quién hace qué a quién sin depender de traducción literal. Elige las familias y recibe la corrección al cerrar cada nivel.</p></header>
      <section className="wlp-section" aria-labelledby="pronoun-languages"><div className="wlp-section-heading"><p className="wlp-eyebrow">8 recorridos disponibles</p><h2 id="pronoun-languages">Elige un idioma</h2><p>Cada banco sigue el mapa real del idioma; no son traducciones mecánicas del italiano.</p></div><ul className={s.grid}>{PRONOUN_QUESTS.map((entry) => <li key={entry.slug}><Link className={`wlp-card wlp-card--path ${s.card}`} href={`/herramientas/quizes/pronombres/${entry.slug}`}><p className="wlp-eyebrow wlp-eyebrow--card" lang={entry.config.languageCode}>{entry.eyebrow}</p><h3 className={s.name} lang={entry.config.languageCode}>{entry.config.title}</h3><p className={s.desc}>{entry.description}</p><div className={s.foot}><span className={s.detail}>{entry.config.topics.length} familias · 6 niveles</span><span className={s.arrow} aria-hidden="true">→</span></div></Link></li>)}</ul></section>
    </div>
  </div>
}
