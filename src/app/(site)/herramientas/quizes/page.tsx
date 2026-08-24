import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/quizes'

export const metadata: Metadata = {
  title: 'Quizes de idiomas — ejercicios gratuitos y autocorregibles',
  description:
    'Quizes gratuitos en ocho idiomas con niveles progresivos y resultados al terminar cada nivel. Practica tiempo, aspecto, modalidad y registro.',
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
    flag: '🇺🇸',
    name: 'Inglés',
    tagline: 'Contrasta tiempos, aspectos y condicionales en seis niveles que se adaptan a tu selección.',
    detail: '76 contextos fuente · 6 niveles',
    color: '#3c5fb8',
  },
  {
    slug: 'italiano',
    href: '/herramientas/quizes/italiano',
    flag: '🇮🇹',
    name: 'Italiano',
    tagline:
      'Elige los tiempos y recorre seis niveles: reconoce, conjuga, corrige errores y reconstruye una narración.',
    detail: '11 tiempos · 44 retos',
    color: '#009246',
  },
  {
    slug: 'frances', href: '/herramientas/quizes/frances', flag: '🇫🇷', name: 'Francés',
    tagline: 'Contrasta récit oral, trasfondo, anterioridad, registro literario, futuro e hipótesis.',
    detail: '40 contextos fuente · 6 niveles', color: '#003189',
  },
  {
    slug: 'portugues', href: '/herramientas/quizes/portugues', flag: '🇧🇷', name: 'Portugués',
    tagline: 'Practica portugués brasileño hablado y formal con pasado, futuro e hipótesis.',
    detail: '40 contextos fuente · 6 niveles', color: '#009c3b',
  },
  {
    slug: 'aleman', href: '/herramientas/quizes/aleman', flag: '🇩🇪', name: 'Alemán',
    tagline: 'Controla auxiliar, participio, orden verbal, futuro, hipótesis y tratamiento.',
    detail: '40 contextos fuente · 6 niveles', color: '#dd0000',
  },
  {
    slug: 'ruso', href: '/herramientas/quizes/ruso', flag: '🇷🇺', name: 'Ruso',
    tagline: 'Decide no solo cuándo ocurre una acción, sino si importa el proceso o el resultado.',
    detail: '40 contextos fuente · 6 niveles', color: '#cc0000',
  },
  {
    slug: 'japones', href: '/herramientas/quizes/japones', flag: '🇯🇵', name: 'Japonés',
    tagline: 'Trabaja no-pasado, pasado, aspecto, experiencia, intención, condición y petición.',
    detail: '40 contextos fuente · 6 niveles', color: '#bc002d',
  },
  {
    slug: 'coreano', href: '/herramientas/quizes/coreano', flag: '🇰🇷', name: 'Coreano',
    tagline: 'Integra tiempo, aspecto, intención y registro sin confundir progreso con estado resultante.',
    detail: '40 contextos fuente · 6 niveles', color: '#534ab7',
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
          Cada idioma trabaja las categorías que realmente organizan su gramática.
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
