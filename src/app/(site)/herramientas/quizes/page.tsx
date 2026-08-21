import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/quizes'

export const metadata: Metadata = {
  title: 'Quizes de idiomas — ejercicios gratuitos y autocorregibles',
  description:
    'Quizes gratuitos por idioma con niveles progresivos y corrección inmediata. Empieza con el acumulativo de tiempos verbales en italiano.',
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
    slug: 'italiano',
    href: '/herramientas/quizes/italiano',
    flag: '🇮🇹',
    name: 'Italiano',
    tagline:
      'Elige los tiempos y recorre seis niveles: reconoce, conjuga, corrige errores y reconstruye una narración.',
    detail: '11 tiempos · 41 retos',
    color: '#009246',
  },
]

export default function QuizesPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <nav className="wlp-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <span>Quizes</span>
        </nav>

        <p className="eyebrow" style={{ margin: '1rem 0 0.5rem' }}>
          <span className="ink-line" />Aprende haciendo
        </p>
        <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Quizes por idioma
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 620, margin: '0 0 2rem' }}>
          Recorridos autocorregibles para usar durante la clase o practicar a tu ritmo.
          Elige el idioma.
        </p>

        <div className="wl-exams-catalog">
          {QUIZES.map((quiz) => (
            <Link
              key={quiz.slug}
              href={quiz.href}
              className="wl-catalog-card"
              style={{
                '--exam-color': quiz.color,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              } as CSSProperties}
            >
              <div className="wl-catalog-card__bar" />
              <div className="wl-catalog-card__body">
                <div className="wl-catalog-card__top">
                  <span className="wl-catalog-card__flag">{quiz.flag}</span>
                  <span className="wl-catalog-card__badge">6 niveles</span>
                </div>
                <h2 className="wl-catalog-card__name">{quiz.name}</h2>
                <p className="wl-catalog-card__tagline">{quiz.tagline}</p>
              </div>
              <div className="wl-catalog-card__footer">
                <span>{quiz.detail}</span>
                <span className="wl-catalog-card__cta">Empezar →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
