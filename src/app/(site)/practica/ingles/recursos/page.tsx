import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EnglishResourcesAnalytics from '@/components/analytics/EnglishResourcesAnalytics'
import {
  ADJECTIVE_PAIRS,
  ENGLISH_REFERENCE_RESOURCES,
  LINKING_WORDS,
  PHRASAL_VERBS,
  PREPOSITION_COMBINATIONS,
} from '@/data/practica/recursos/english-reference-resources'
import { IRREGULAR_VERBS_100 } from '@/data/practica/recursos/verbos-irregulares-100'
import styles from './page.module.css'

const canonical = 'https://www.idiomaswl.com/practica/ingles/recursos'

export const metadata: Metadata = {
  title: 'Recursos de inglés en PDF: verbos, adjetivos y conectores',
  description: 'Descarga gratis listas de inglés A1-B1: 100 verbos irregulares, 100 adjetivos con opuestos, phrasal verbs, preposiciones y conectores.',
  alternates: { canonical },
  openGraph: {
    title: '5 recursos de inglés A1-B1 para descargar gratis',
    description: 'Listas visuales, PDFs imprimibles y práctica relacionada para aprender inglés con contexto.',
    url: canonical,
    type: 'website',
    images: [{ url: '/images/ingles/recursos/100-verbos-irregulares-ingles.png', width: 1080, height: 1350, alt: 'Lista visual de verbos irregulares en inglés de WeLearn' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos de inglés en PDF gratis | WeLearn',
    description: 'Cinco listas visuales para estudiar inglés desde A1 hasta B1.',
    images: ['/images/ingles/recursos/100-verbos-irregulares-ingles.png'],
  },
}

const verbPreview = IRREGULAR_VERBS_100.flatMap((group) => group.verbs)
  .filter((verb) => ['be', 'go', 'do', 'have', 'get', 'make'].includes(verb.base))
  .map((verb) => `${verb.base} · ${verb.past} · ${verb.participle}`)

const previewBySlug: Record<string, string[]> = {
  '100-verbos-irregulares-ingles': verbPreview,
  '100-adjetivos-ingles-opuestos': ADJECTIVE_PAIRS.slice(0, 6).map(([word, opposite]) => `${word} ↔ ${opposite}`),
  '50-phrasal-verbs-esenciales': PHRASAL_VERBS.slice(0, 6).map(([verb, meaning]) => `${verb} · ${meaning}`),
  '60-combinaciones-preposiciones-ingles': PREPOSITION_COMBINATIONS.slice(0, 6).map(([combination]) => combination),
  '40-conectores-ingles': LINKING_WORDS.slice(0, 6).map(([connector, functionLabel]) => `${connector} · ${functionLabel}`),
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Recursos de inglés A1-B1 en PDF',
  description: 'Biblioteca gratuita de listas visuales y PDFs imprimibles para estudiantes de inglés.',
  url: canonical,
  isPartOf: { '@type': 'WebSite', name: 'WeLearn', url: 'https://www.idiomaswl.com' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: ENGLISH_REFERENCE_RESOURCES.length,
    itemListElement: ENGLISH_REFERENCE_RESOURCES.map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LearningResource',
        name: resource.title,
        description: resource.description,
        educationalLevel: resource.eyebrow,
        learningResourceType: ['Reference guide', 'Printable PDF'],
        inLanguage: ['en', 'es'],
        isAccessibleForFree: true,
        url: `${canonical}#${resource.slug}`,
        image: `https://www.idiomaswl.com${resource.image}`,
      },
    })),
  },
}

export default function EnglishResourcesPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <EnglishResourcesAnalytics />

      <div className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link><span>/</span>
          <Link href="/practica/ingles">Inglés</Link><span>/</span>
          <span aria-current="page">Recursos PDF</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Biblioteca gratuita · Inglés A1–B1</p>
            <h1>Listas de inglés que puedes guardar, imprimir y usar</h1>
            <p>Recursos visuales para resolver búsquedas concretas y convertirlas en aprendizaje: cada lista incluye PDF completo, una imagen-resumen y ejercicios relacionados.</p>
            <div className={styles.heroActions}>
              <a href="#biblioteca" data-resource-cta="hero-library">Ver los 5 recursos</a>
              <Link href="/nivel-radar" data-resource-cta="hero-level-test">Descubrir mi nivel</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/images/ingles/recursos/100-verbos-irregulares-ingles.png"
              alt="Tabla visual de 20 verbos irregulares esenciales en inglés"
              width={1080}
              height={1350}
              priority
              sizes="(max-width: 760px) 78vw, 390px"
            />
          </div>
        </header>

        <section className={styles.valueStrip} aria-label="Características de los recursos">
          <div><strong>5</strong><span>guías temáticas</span></div>
          <div><strong>350</strong><span>palabras y combinaciones</span></div>
          <div><strong>A1–B1</strong><span>progresión por nivel</span></div>
          <div><strong>Gratis</strong><span>PDF e imagen</span></div>
        </section>

        <section className={styles.library} id="biblioteca" aria-labelledby="library-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Elige una lista</p>
            <h2 id="library-title">Recursos de referencia esenciales</h2>
            <p>Abre la imagen para compartirla o descarga la versión completa. Después practica el tema para pasar de reconocer a producir.</p>
          </div>

          <div className={styles.grid}>
            {ENGLISH_REFERENCE_RESOURCES.map((resource, index) => (
              <article className={styles.card} id={resource.slug} key={resource.slug}>
                <Link href={resource.image} className={styles.cardImageLink} aria-label={`Abrir imagen completa: ${resource.title}`} data-resource-cta="image-open" data-resource-id={resource.slug}>
                  <Image
                    src={resource.image}
                    alt={`${resource.title}: lista visual con ejemplos y traducción al español`}
                    width={1080}
                    height={1350}
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 45vw, 340px"
                    className={styles.cardImage}
                  />
                </Link>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}><span>0{index + 1}</span><span>{resource.eyebrow}</span></div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className={styles.preview} aria-label={`Vista previa de ${resource.title}`}>
                    {previewBySlug[resource.slug].map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className={styles.cardActions}>
                    <a href={resource.pdf} download data-resource-download={resource.slug} data-resource-cta="pdf-download" data-resource-id={resource.slug}>Descargar PDF</a>
                    <Link href={resource.relatedHref} data-resource-cta="related-practice" data-resource-id={resource.slug}>{resource.relatedLabel} →</Link>
                  </div>
                  <small>{resource.countLabel}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-title">
          <div>
            <p className={styles.eyebrow}>Método de 15 minutos</p>
            <h2 id="method-title">Una lista funciona mejor cuando la conviertes en uso real</h2>
          </div>
          <ol>
            <li><strong>Explora.</strong> Lee una categoría y marca cinco elementos nuevos.</li>
            <li><strong>Recuerda.</strong> Tapa una columna e intenta completar la información.</li>
            <li><strong>Produce.</strong> Crea una oración personal con cada elemento.</li>
            <li><strong>Practica.</strong> Abre el ejercicio relacionado y comprueba lo aprendido.</li>
          </ol>
        </section>

        <section className={styles.finalCta}>
          <div>
            <p className={styles.eyebrow}>Tu siguiente paso</p>
            <h2>Deja de acumular listas: úsalas dentro de una ruta completa.</h2>
          </div>
          <div>
            <Link href="/practica/ingles/a1/gramatica" data-resource-cta="route-a1">Empezar en A1</Link>
            <Link href="/practica/ingles/a2/gramatica" data-resource-cta="route-a2">Continuar con A2</Link>
            <Link href="/practica/ingles/b1/gramatica" data-resource-cta="route-b1">Avanzar a B1</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
