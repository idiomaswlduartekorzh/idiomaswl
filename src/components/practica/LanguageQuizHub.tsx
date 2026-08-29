import Link from 'next/link'

import { PRONOUN_QUEST_BY_SLUG } from '@/data/practica/pronoun-quest-registry'
import type { QuizLanguageEntry } from '@/data/practica/quiz-language-catalog'

import s from './LanguageQuizHub.module.css'

export default function LanguageQuizHub({ language }: { language: QuizLanguageEntry }) {
  const pronouns = PRONOUN_QUEST_BY_SLUG.get(language.slug)
  if (!pronouns) return null

  const quizzes = [
    {
      eyebrow: 'VERBOS · TIEMPOS Y ASPECTO',
      href: `/herramientas/quizes/${language.slug}`,
      title: language.tenseTitle,
      description: 'Elige las formas que quieres practicar y avanza por seis niveles: reconocimiento, producción, corrección y reconstrucción.',
      detail: 'Practicar verbos · 6 niveles',
    },
    {
      eyebrow: 'PRONOMBRES',
      href: `/herramientas/quizes/pronombres/${language.slug}`,
      title: pronouns.config.title,
      description: pronouns.description,
      detail: `${pronouns.config.topics.length} familias · 6 niveles`,
    },
  ]

  return (
    <div className="wlp-page" style={{ '--wlp-accent': language.accent } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav aria-label="Migas de pan" className="wlp-breadcrumb">
          <Link href="/herramientas">Herramientas</Link><span aria-hidden="true">/</span>
          <Link href="/herramientas/quizes">Quizes</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{language.name}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow" lang={language.languageCode}>{language.targetName} · práctica acumulativa</p>
          <h1>¿Qué quieres practicar en {language.name}?</h1>
          <p className="wlp-hero-lead">{language.tagline} Elige un quiz para configurar tu recorrido.</p>
        </header>

        <ul aria-label={`Quizes de ${language.name}`} className={s.grid}>
          {quizzes.map((quiz) => (
            <li key={quiz.href}>
              <Link className={`wlp-card wlp-card--path ${s.card}`} href={quiz.href}>
                <span className="wlp-eyebrow wlp-eyebrow--card">{quiz.eyebrow}</span>
                <h2 className={s.name} lang={language.languageCode}>{quiz.title}</h2>
                <p className={s.desc}>{quiz.description}</p>
                <div className={s.foot}><span>{quiz.detail}</span><span aria-hidden="true">→</span></div>
              </Link>
            </li>
          ))}
        </ul>

        <nav aria-label="Volver al catálogo" className={`wlp-next ${s.back}`}>
          <Link href="/herramientas/quizes">← Elegir otro idioma</Link>
        </nav>
      </div>
    </div>
  )
}
