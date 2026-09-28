import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { VOCABULARY_LANGUAGES } from '@/data/herramientas/vocabulario'

import s from './VocabularioHub.module.css'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/vocabulario'

export const metadata: Metadata = {
  title: 'Vocabulario por idioma — recursos y práctica gratuitos',
  description:
    'Elige entre inglés, alemán, francés, italiano, portugués, ruso, japonés y coreano. Vocabulario por nivel y banco de phrasal verbs en inglés.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Vocabulario por idioma — Idiomas WeLearn',
    description: 'Recursos gratuitos de vocabulario para ocho idiomas.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function VocabularioPage() {
  return (
    <div className="wlp-page">
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Vocabulario</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Ocho idiomas · acceso gratuito</p>
          <h1>Vocabulario por idioma</h1>
          <p className="wlp-hero-lead">
            Elige el idioma que estás estudiando. En inglés también encontrarás el banco
            contextual de phrasal verbs con ejemplos, práctica, imágenes y PDFs.
          </p>
        </header>

        <ul className={s.grid}>
          {VOCABULARY_LANGUAGES.map((language) => (
            <li key={language.slug}>
              <Link
                href={language.href}
                className={`wlp-card wlp-card--path ${s.card}`}
                style={{ '--wlp-accent': language.accent } as CSSProperties}
              >
                <div className={s.cardTop}>
                  <span className={s.flag} aria-hidden="true">{language.flag}</span>
                  <span className="wlp-eyebrow wlp-eyebrow--card" lang={language.code}>
                    {language.targetName}
                  </span>
                </div>
                <h2 className={s.name}>{language.name}</h2>
                <p className={s.desc}>{language.tagline}</p>
                <div className={s.foot}>
                  <span className={s.detail}>{language.detail}</span>
                  <span className={s.arrow} aria-hidden="true">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
