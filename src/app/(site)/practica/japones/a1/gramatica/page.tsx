import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import { getJapaneseGrammarResource } from '@/data/japanese-grammar-a1'
import styles from './JapaneseGrammarIndex.module.css'

export const metadata: Metadata = generateGrammarIndexMetadata('japones', 'a1')

const IDIOMA = 'japones'
const NIVEL = 'a1'

export default function GrammarIndexPage() {
  const topics = getTopicsByLevel(IDIOMA, NIVEL)
  const stages = [
    { number: '01', title: 'Construye la base', copy: 'Escritura, orden de la frase, registro formal y partículas esenciales.', topics: topics.slice(0, 7) },
    { number: '02', title: 'Describe el mundo', copy: 'Lugar, existencia, adjetivos, verbos, números y tiempo.', topics: topics.slice(7, 15) },
    { number: '03', title: 'Comunica intenciones', copy: 'Deseos, permiso, frecuencia, negación, conectores y expresiones.', topics: topics.slice(15, 21) },
    { number: '04', title: 'Completa tu A1', copy: 'Demostrativos, posesión, compañía, rangos, ubicación, gustos e invitaciones.', topics: topics.slice(21) },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: 'Japonés', item: 'https://www.idiomaswl.com/practica/japones' },
          { '@type': 'ListItem', position: 3, name: 'A1', item: 'https://www.idiomaswl.com/practica/japones/a1' },
          { '@type': 'ListItem', position: 4, name: 'Gramática A1', item: 'https://www.idiomaswl.com/practica/japones/a1/gramatica' },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Curso completo de gramática japonesa A1',
        numberOfItems: topics.length,
        itemListElement: topics.map((topic, index) => ({
          '@type': 'ListItem', position: index + 1, name: topic.shortTitle,
          url: `https://www.idiomaswl.com/practica/japones/a1/gramatica/${topic.slug}`,
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="gram-page" style={{ '--topic-color': SKILL_ACCENT.gramatica.var } as React.CSSProperties}>
        <div className="wrap">
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
            <Link href="/practica/japones" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>A1</Link>
            <span>/</span>
            <span style={{ color: 'var(--wl-on-panel-alert, #dc2626)', fontWeight: 800 }}>Gramática</span>
          </nav>

          <section className={styles.hero}>
            <div><p>Japonés · Gramática · A1</p><h1>De los caracteres a tu primera conversación</h1><span>Una ruta completa, visual y práctica para entender cómo piensa una frase japonesa.</span></div>
            <dl><div><dt>{topics.length}</dt><dd>lecciones</dd></div><div><dt>5–6</dt><dd>niveles por tema</dd></div><div><dt>75+</dt><dd>recursos nuevos</dd></div></dl>
          </section>

          <div className={styles.route}>
            {stages.map((stage) => (
              <section key={stage.number} className={styles.stage}>
                <header><span>{stage.number}</span><div><h2>{stage.title}</h2><p>{stage.copy}</p></div><b>{stage.topics.length} temas</b></header>
                <div className={styles.grid}>
                  {stage.topics.map((topic) => {
                    const resource = getJapaneseGrammarResource(topic.slug)
                    return (
                      <Link key={topic.slug} href={`/practica/${IDIOMA}/${NIVEL}/gramatica/${topic.slug}`} className={styles.card}>
                        {resource && <div className={styles.cardImage}><Image src={resource.image} alt="" fill sizes="(max-width: 760px) 100vw, 38vw" /></div>}
                        <div className={styles.cardBody}>
                          <div><span style={{ color: topic.color }}>{topic.order}</span><em>{topic.category}</em></div>
                          <h3>{topic.shortTitle}</h3>
                          <p>{topic.guide.goal}</p>
                          <small>{topic.practice.levels.length} niveles · mapa visual · PDF <b>→</b></small>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          <div style={{ paddingBottom: '2rem' }}>
            <Link
              href="/practica/japones/a1"
              style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.82rem', textDecoration: 'none' }}
            >
              ← Volver a Japonés A1
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
