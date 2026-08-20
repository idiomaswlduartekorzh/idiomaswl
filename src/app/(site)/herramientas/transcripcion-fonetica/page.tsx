import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { TRANSCRIPTOR_IDIOMAS } from '@/data/fonetica/idiomas'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/transcripcion-fonetica'

export const metadata: Metadata = {
  title: 'Transcripción fonética — traductor a AFI por idioma',
  description:
    'Convierte texto a alfabeto fonético internacional. Elige el idioma y ve cómo se pronuncia cada palabra, con el acento tónico marcado. Gratis, sin registro.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Transcripción fonética — traductor a AFI',
    description: 'Convierte texto a alfabeto fonético internacional. Elige tu idioma.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

/**
 * Índice del transcriptor por idiomas.
 *
 * Existía un hueco: `/herramientas/transcripcion-fonetica` daba 404 y era la URL natural
 * para la búsqueda genérica sin idioma. También es el padre que necesitan las páginas de
 * cada idioma para no colgar sueltas de un hub que lista herramientas de otro tipo.
 *
 * La lista sale de `src/data/fonetica/idiomas.ts`, que es la misma fuente que usa el
 * sitemap. Con un idioma la duplicación se aguantaba; con ocho, alguien añade el francés,
 * se olvida del sitemap y la página nace sin rastrear.
 */
export default function TranscripcionFoneticaPage() {
  const publicados = TRANSCRIPTOR_IDIOMAS.filter((idioma) => idioma.publicado)

  return (
    <section className="wl-section">
      <div className="wrap">
        <nav className="wlp-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <span>Transcripción fonética</span>
        </nav>

        <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0.5rem 0', fontWeight: 700 }}>
          Transcripción fonética
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 620, margin: '0 0 2rem' }}>
          Pega un texto y léelo en alfabeto fonético internacional, con el acento tónico
          donde va. Elige el idioma.
        </p>

        <div className="wl-exams-catalog">
          {publicados.map((idioma) => (
            <Link
              key={idioma.slug}
              href={`/herramientas/transcripcion-fonetica/${idioma.slug}`}
              className="wl-catalog-card"
              style={{
                '--exam-color': idioma.color,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              } as CSSProperties}
            >
              <div className="wl-catalog-card__bar" />
              <div className="wl-catalog-card__body">
                <div className="wl-catalog-card__top">
                  <span className="wl-catalog-card__flag">{idioma.bandera}</span>
                  <span className="wl-catalog-card__badge">Disponible</span>
                </div>
                <h2 className="wl-catalog-card__name">{idioma.nombre}</h2>
                <p className="wl-catalog-card__tagline">{idioma.porQue}</p>
              </div>
              <div className="wl-catalog-card__footer">
                <span>{idioma.variantes}</span>
                <span className="wl-catalog-card__cta">Abrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
