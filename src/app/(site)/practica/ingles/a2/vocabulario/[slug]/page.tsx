import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVocabBlock, getVocabBlocks, getVocabLevel } from '@/data/practica/vocabulario/registry'
import { vocabBlockMetadata } from '@/lib/practica-metadata'
import VocabularyJourney from '@/components/practica/VocabularyJourney'

/**
 * Una URL por bloque de vocabulario, igual que gramática tiene una URL por tema.
 *
 * Cada bloque es un tema con entidad propia —presentarse, el clima, la hora— y es así como
 * la gente lo busca. Diez bloques × 24 combinaciones de idioma y nivel son 240 páginas
 * indexables cuando el catálogo esté completo.
 */

const IDIOMA = 'ingles'
const NIVEL = 'a2'
const IDIOMA_LABEL = 'Inglés'
const NIVEL_LABEL = 'A2'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getVocabBlocks(IDIOMA, NIVEL).map((b) => ({ slug: b.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const bloque = getVocabBlock(IDIOMA, NIVEL, slug)
  if (!bloque) return {}
  return {
    ...vocabBlockMetadata({
      lang: IDIOMA,
      level: NIVEL,
      slug: bloque.id,
      bloque: bloque.nombre,
      entradas: bloque.entradas.length,
    }),
  }
}

export default async function VocabBlockPage({ params }: Props) {
  const { slug } = await params
  const bloque = getVocabBlock(IDIOMA, NIVEL, slug)
  const nivel = getVocabLevel(IDIOMA, NIVEL)
  if (!bloque || !nivel) notFound()

  const canonical = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/vocabulario/${bloque.id}`
  const indexUrl = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/vocabulario`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `Vocabulario de ${IDIOMA_LABEL} ${NIVEL_LABEL}: ${bloque.nombre}`,
        url: canonical,
        educationalLevel: NIVEL_LABEL,
        inLanguage: 'en',
        teaches: bloque.nombre,
        learningResourceType: 'Ejercicio interactivo de vocabulario',
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: 'Inglés A1', item: `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}` },
          { '@type': 'ListItem', position: 3, name: 'Vocabulario A1', item: indexUrl },
          { '@type': 'ListItem', position: 4, name: bloque.nombre, item: canonical },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="wrap" style={{ paddingBottom: '3rem' }}>
        <nav
          aria-label="breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1.5rem 0 0',
            fontSize: '0.82rem',
            fontFamily: 'var(--mono)',
            color: 'var(--muted)',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href={`/practica/${IDIOMA}/${NIVEL}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés A1</Link>
          <span>/</span>
          <Link href={`/practica/${IDIOMA}/${NIVEL}/vocabulario`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Vocabulario</Link>
          <span>/</span>
          <span style={{ color: '#e11d48', fontWeight: 800 }}>{bloque.nombre}</span>
        </nav>

        <header style={{ padding: '1.6rem 0 1.4rem', display: 'grid', gap: '0.5rem' }}>
          <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'var(--muted)' }}>
            Vocabulario · {IDIOMA_LABEL} {NIVEL_LABEL} · {nivel.eje}
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            {bloque.icono} {bloque.nombre}
          </h1>
          <p style={{ margin: 0, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.6 }}>
            {bloque.entradas.length} palabras en {Math.ceil(bloque.entradas.length / 10)} unidades de diez.
            Una unidad es un día de estudio: unos doce minutos.
          </p>
        </header>

        <VocabularyJourney
          bloque={bloque}
          nivel={nivel}
          idiomaLabel={IDIOMA_LABEL}
          nivelLabel={NIVEL_LABEL}
          locale="en-US"
        />
      </div>
    </>
  )
}
