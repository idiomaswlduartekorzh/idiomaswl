import type { Metadata } from 'next'
import Link from 'next/link'

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

const QUIZES = [
  {
    slug: 'ingles',
    href: '/herramientas/quizes/ingles',
    languageCode: 'en',
    targetName: 'ENGLISH',
    name: 'Inglés',
    tagline: 'Contrasta tiempos, aspectos y condicionales en seis niveles que se adaptan a tu selección.',
    detail: '76 contextos fuente · 6 niveles',
  },
  {
    slug: 'italiano',
    href: '/herramientas/quizes/italiano',
    languageCode: 'it',
    targetName: 'ITALIANO',
    name: 'Italiano',
    tagline:
      'Elige los tiempos y recorre seis niveles: reconoce, conjuga, corrige errores y reconstruye una narración.',
    detail: '11 tiempos · 44 retos',
  },
  {
    slug: 'frances', href: '/herramientas/quizes/frances', languageCode: 'fr', targetName: 'FRANÇAIS', name: 'Francés',
    tagline: 'Contrasta récit oral, trasfondo, anterioridad, registro literario, futuro e hipótesis.',
    detail: '40 contextos fuente · 6 niveles',
  },
  {
    slug: 'portugues', href: '/herramientas/quizes/portugues', languageCode: 'pt-BR', targetName: 'PORTUGUÊS', name: 'Portugués',
    tagline: 'Practica portugués brasileño hablado y formal con pasado, futuro e hipótesis.',
    detail: '40 contextos fuente · 6 niveles',
  },
  {
    slug: 'aleman', href: '/herramientas/quizes/aleman', languageCode: 'de', targetName: 'DEUTSCH', name: 'Alemán',
    tagline: 'Controla auxiliar, participio, orden verbal, futuro, hipótesis y tratamiento.',
    detail: '40 contextos fuente · 6 niveles',
  },
  {
    slug: 'ruso', href: '/herramientas/quizes/ruso', languageCode: 'ru', targetName: 'РУССКИЙ', name: 'Ruso',
    tagline: 'Decide no solo cuándo ocurre una acción, sino si importa el proceso o el resultado.',
    detail: '40 contextos fuente · 6 niveles',
  },
  {
    slug: 'japones', href: '/herramientas/quizes/japones', languageCode: 'ja', targetName: '日本語', name: 'Japonés',
    tagline: 'Trabaja no-pasado, pasado, aspecto, experiencia, intención, condición y petición.',
    detail: '40 contextos fuente · 6 niveles',
  },
  {
    slug: 'coreano', href: '/herramientas/quizes/coreano', languageCode: 'ko', targetName: '한국어', name: 'Coreano',
    tagline: 'Integra tiempo, aspecto, intención y registro sin confundir progreso con estado resultante.',
    detail: '40 contextos fuente · 6 niveles',
  },
]

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
            Elige un idioma y construye un recorrido de seis niveles con las formas que necesitas practicar.
            La corrección aparece al cerrar cada nivel.
          </p>
        </header>

        <ul className={s.grid}>
          {QUIZES.map((quiz) => (
            <li key={quiz.slug}>
              <Link href={quiz.href} className={`wlp-card wlp-card--path ${s.card}`}>
                <span className="wlp-eyebrow wlp-eyebrow--card" lang={quiz.languageCode}>
                  {quiz.targetName}
                </span>
                <h2 className={s.name}>{quiz.name}</h2>
                <p className={s.desc}>{quiz.tagline}</p>
                <div className={s.foot}>
                  <span className={s.detail}>{quiz.detail}</span>
                  <span className={s.arrow} aria-hidden="true">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="wlp-section" aria-labelledby="more-quizzes">
          <div className="wlp-section-heading">
            <p className="wlp-eyebrow">Nueva familia</p>
            <h2 id="more-quizzes">Pronombres en contexto</h2>
            <p>Entrena referente, función, concordancia y posición con respuestas cerradas.</p>
          </div>
          <ul className={s.grid}>
            <li>
              <Link href="/herramientas/quizes/pronombres" className={`wlp-card wlp-card--path ${s.card}`}>
                <span className="wlp-eyebrow wlp-eyebrow--card">PRONOMBRES</span>
                <h2 className={s.name}>Quién hace qué a quién</h2>
                <p className={s.desc}>Comienza con italiano: sujeto, demostrativos, posesivos, objetos y combinaciones.</p>
                <div className={s.foot}><span className={s.detail}>1 idioma · 6 niveles</span><span className={s.arrow} aria-hidden="true">→</span></div>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
