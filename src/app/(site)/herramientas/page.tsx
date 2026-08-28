import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { SKILL_ACCENT } from '@/data/practica/skill-accents'

const URL = 'https://www.idiomaswl.com/herramientas'

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para estudiar idiomas',
  description:
    'Utilidades abiertas de Idiomas WeLearn: podcasts para preparar exámenes, quizes y transcripción fonética. Sin registro.',
  alternates: { canonical: URL },
  // Sin esto se hereda el `openGraph` del layout raíz entero, `url` incluida: compartir
  // esta página por WhatsApp enseñaba el título del sitio y un enlace a la portada.
  openGraph: {
    title: 'Herramientas gratuitas para estudiar idiomas',
    description: 'Utilidades abiertas de Idiomas WeLearn. Sin registro.',
    url: URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

/**
 * Índice de herramientas abiertas.
 *
 * Usa las mismas tarjetas que `/practica` —`wl-catalog-card` sobre la rejilla
 * `wl-exams-catalog`— y no las primitivas `wlp-` del sistema nuevo. Es deliberado: hasta
 * que la fase 2 de `docs/sistema-visual-practica.md` cambie los hubs, estas son las
 * tarjetas que el sitio enseña de verdad, y una sección nueva que estrenara el sistema
 * nuevo ella sola se vería como de otro sitio web.
 *
 * Cuando esa fase llegue, esta página se migra con los demás hubs, no antes.
 */

interface Tool {
  slug: string
  href: string
  flag: string
  name: string
  tagline: string
  detail: string
  color: string
}

const TOOLS: Tool[] = [
  {
    slug: 'podcasts-examenes',
    href: '/podcasts',
    flag: '🎧',
    name: 'Podcasts de exámenes',
    tagline:
      'Escucha mapas de estrategia para IELTS, TOEFL, ICFES, Cambridge B2, SAT, TOPIK y Goethe, con notas editoriales y rutas de práctica.',
    // Línea base histórica protegida: 8 episodios · 6 exámenes.
    detail: '10 episodios · 7 exámenes · 3 idiomas',
    color: SKILL_ACCENT.escucha.light,
  },
  {
    slug: 'quizes',
    href: '/herramientas/quizes',
    flag: '🧠',
    name: 'Quizes por idioma',
    tagline:
      'Entrena gramática y uso real con recorridos autocorregibles, niveles progresivos y resultados inmediatos.',
    detail: 'Italiano · 6 niveles',
    color: SKILL_ACCENT.gramatica.light,
  },
  {
    slug: 'fonetica-ingles',
    href: '/herramientas/transcripcion-fonetica',
    flag: '🔤',
    name: 'Transcripción fonética',
    tagline:
      'Pega un texto y léelo en alfabeto fonético, con el acento tónico donde va y las reglas de cada idioma aplicadas.',
    detail: 'Inglés y coreano',
    color: SKILL_ACCENT.habla.light,
  },
]

export default function HerramientasPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />Abiertas y sin registro
        </p>

        <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Herramientas
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 2rem' }}>
          Utilidades que usamos en clase y dejamos abiertas para cualquiera. No piden correo
          ni cuenta.
        </p>

        <div className="wl-exams-catalog">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="wl-catalog-card"
              style={{
                '--exam-color': tool.color,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              } as CSSProperties}
            >
              <div className="wl-catalog-card__bar" />
              <div className="wl-catalog-card__body">
                <div className="wl-catalog-card__top">
                  <span className="wl-catalog-card__flag">{tool.flag}</span>
                  {/* Insignia sin estilos en línea: el puente `--wl-on-panel-*` está
                      mandado jubilar y una sección nueva no debe estrenarlo. */}
                  <span className="wl-catalog-card__badge">Disponible</span>
                </div>
                <h2 className="wl-catalog-card__name">{tool.name}</h2>
                <p className="wl-catalog-card__tagline">{tool.tagline}</p>
              </div>
              <div className="wl-catalog-card__footer">
                <span>{tool.detail}</span>
                <span className="wl-catalog-card__cta">Abrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
