import type { Metadata } from 'next'
import Link from 'next/link'

import { QUIZ_LANGUAGES } from '@/data/practica/quiz-language-catalog'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'

import s from './QuizesHub.module.css'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/quizes'

export const metadata: Metadata = {
  title: 'Quizes de idiomas — ejercicios gratuitos y autocorregibles',
  description:
    'Quizes gratuitos con niveles progresivos y resultados al terminar cada nivel. Practica tiempos, estructuras y pronombres por idioma.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Quizes de idiomas — Idiomas WeLearn',
    description: 'Ejercicios gratuitos, progresivos y autocorregibles por idioma.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function QuizesPage() {
  return (
    <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Quizes</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Gramática · práctica acumulativa</p>
          <h1>Quizes por idioma</h1>
          <p className="wlp-hero-lead">
            Primero elige el idioma. En la siguiente pantalla encontrarás sus quizzes de tiempos,
            estructuras y pronombres, cada uno con seis niveles y corrección diferida.
          </p>
        </header>

        <ul className={s.grid}>
          {QUIZ_LANGUAGES.map((quiz) => (
            <li key={quiz.slug}>
              <Link href={`/herramientas/quizes/idiomas/${quiz.slug}`} className={`wlp-card wlp-card--path ${s.card}`}>
                <span className="wlp-eyebrow wlp-eyebrow--card" lang={quiz.languageCode}>
                  {quiz.targetName}
                </span>
                <h2 className={s.name}>{quiz.name}</h2>
                <p className={s.desc}>{quiz.tagline}</p>
                <div className={s.foot}>
                  <span className={s.detail}>2 quizes · 12 niveles</span>
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
