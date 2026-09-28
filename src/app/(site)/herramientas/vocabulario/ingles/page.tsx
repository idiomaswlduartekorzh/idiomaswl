import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {
  PHRASAL_VERBS_BASE_PATH,
  PHRASAL_VERBS_PUBLISHED_AT,
  PHRASAL_VERBS_SUMMARY,
} from '@/data/herramientas/vocabulario'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'

import s from '../VocabularioHub.module.css'

const PAGE_URL = 'https://www.idiomaswl.com/herramientas/vocabulario/ingles'
const PREVIEW_IMAGE = `${PHRASAL_VERBS_BASE_PATH}/assets/seo/phrasal-verbs-esenciales-welearn.png`

export const metadata: Metadata = {
  title: 'Vocabulario en inglés — phrasal verbs con ejemplos y PDFs',
  description:
    'Estudia phrasal verbs por contexto, verbo y partícula: 334 expresiones, 672 usos, 1.344 ejemplos, ejercicios e imágenes y PDFs descargables.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Vocabulario en inglés — banco de phrasal verbs',
    description: '334 expresiones y 1.344 ejemplos organizados en 40 rutas de aprendizaje.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
    images: [
      {
        url: `https://www.idiomaswl.com${PREVIEW_IMAGE}`,
        width: 1600,
        height: 900,
        alt: 'Banco visual de phrasal verbs de Idiomas WeLearn',
      },
    ],
  },
}

export default function VocabularioInglesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vocabulario en inglés',
    url: PAGE_URL,
    description: metadata.description,
    datePublished: PHRASAL_VERBS_PUBLISHED_AT,
    dateModified: PHRASAL_VERBS_PUBLISHED_AT,
    hasPart: {
      '@type': 'LearningResource',
      name: 'Banco de phrasal verbs en inglés',
      url: `https://www.idiomaswl.com${PHRASAL_VERBS_BASE_PATH}`,
      educationalLevel: 'A2-B2',
      inLanguage: ['es', 'en'],
    },
  }

  return (
    <div className="wlp-page">
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas/vocabulario">Vocabulario</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Inglés</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">English vocabulary</p>
          <h1>Vocabulario en inglés</h1>
          <p className="wlp-hero-lead">
            Empieza por una colección amplia y navegable de phrasal verbs. Puedes estudiar
            por situación, familia verbal o partícula, practicar y descargar cada guía.
          </p>
        </header>

        <section aria-labelledby="recursos-disponibles">
          <h2 id="recursos-disponibles" className="wlp-section-title">Recursos disponibles</h2>
          <div className={s.featureGrid}>
            <Link
              href={PHRASAL_VERBS_BASE_PATH}
              className={`wlp-card wlp-card--path ${s.featureCard}`}
              style={{ '--wlp-accent': SKILL_ACCENT.vocabulario.var } as React.CSSProperties}
            >
              <div className={s.preview}>
                <Image
                  src={PREVIEW_IMAGE}
                  alt="Mapa visual WeLearn del banco de phrasal verbs en inglés"
                  width={1600}
                  height={900}
                  sizes="(max-width: 820px) 100vw, 760px"
                  priority
                />
              </div>
              <div className={s.featureBody}>
                <p className="wlp-eyebrow wlp-eyebrow--card">A2–B2 · biblioteca abierta</p>
                <h2>Phrasal verbs</h2>
                <p>
                  Explora significados y ejemplos dentro de restaurantes, viajes, trabajo,
                  estudio y áreas profesionales; sigue expresiones polisémicas entre rutas.
                </p>
                <div className={s.metrics} aria-label="Contenido del banco">
                  <span>{PHRASAL_VERBS_SUMMARY.uniqueTerms} expresiones</span>
                  <span>{PHRASAL_VERBS_SUMMARY.occurrences} usos</span>
                  <span>{PHRASAL_VERBS_SUMMARY.examples.toLocaleString('es-CO')} ejemplos</span>
                  <span>{PHRASAL_VERBS_SUMMARY.downloadableGuides} guías PDF</span>
                </div>
                <div className={s.featureCta}>
                  <span>Abrir el banco completo</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <nav aria-label="Vocabulario por niveles" className="wlp-next">
          <Link href="/practica/ingles/a1/vocabulario">Practicar vocabulario de inglés A1 →</Link>
        </nav>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </div>
    </div>
  )
}
