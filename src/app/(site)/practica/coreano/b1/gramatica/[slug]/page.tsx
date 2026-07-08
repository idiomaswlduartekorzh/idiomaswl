import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTopicsByLevel, getTopicBySlug } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import GrammarTopicClient from '@/components/grammar/GrammarTopicClient'

const IDIOMA = 'coreano'
const NIVEL = 'b1'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const topics = getTopicsByLevel(IDIOMA, NIVEL)
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) return {}
  return generateGrammarMetadata(topic, IDIOMA, NIVEL)
}

export default async function GrammarTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) notFound()

  const canonical = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/gramatica`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: topic.title,
        description: topic.description,
        url: canonical,
        educationalLevel: topic.level,
        inLanguage: 'ko',
        teaches: topic.shortTitle,
        learningResourceType: 'Lección interactiva',
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: topic.seo.map((s) => ({
          '@type': 'Question',
          name: s.heading,
          acceptedAnswer: { '@type': 'Answer', text: s.paragraphs.join(' ') },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: 'Coreano', item: 'https://www.idiomaswl.com/practica/coreano' },
          { '@type': 'ListItem', position: 3, name: 'B1', item: 'https://www.idiomaswl.com/practica/coreano/b1' },
          { '@type': 'ListItem', position: 4, name: 'Gramática B1', item: indexUrl },
          { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
        ],
      },
    ],
  }

  const waText = encodeURIComponent(`Hola, tengo una pregunta sobre ${topic.shortTitle} en coreano B1.`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}>
        <div className="wrap">
          <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Coreano B1</Link>
            <span>/</span>
            <Link href={`/practica/${IDIOMA}/${NIVEL}/gramatica`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Gramática</Link>
            <span>/</span>
            <span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span>
          </nav>

          <section className="topic-hero">
            <div className="topic-hero__grid">
              <div>
                <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Gramática · {topic.category} · {topic.level}</p>
                <h1 className="gram-h1">{topic.title}</h1>
                <p className="gram-lead">{topic.lead}</p>
                <div className="hero-actions">
                  <a href="#practica" className="gram-btn accent">Ir a práctica →</a>
                  <a href="#explicacion" className="gram-btn secondary">Leer explicación</a>
                </div>
              </div>
              <div className="hero-brief">
                <div><span>✓</span><p><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '0.18rem' }}>Objetivo</strong>{topic.guide.goal}</p></div>
                <div><span>≈</span><p><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '0.18rem' }}>Fórmula</strong>{topic.guide.formula}</p></div>
                <div><span>⚑</span><p><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '0.18rem' }}>Logros</strong>{topic.outcomes.join(' · ')}</p></div>
              </div>
            </div>
          </section>

          <article id="explicacion" className="seo-article">
            <span className="section-label">— Explicación del especialista</span>
            <h2 className="gram-h2">Aprende {topic.shortTitle}: guía para hispanohablantes</h2>
            <p className="article-lead">{topic.description}</p>
            {topic.seo.map((section, i) => (
              <div key={i} className="article-section">
                <h2 className="gram-h2">{section.heading}</h2>
                {section.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
                {section.table && (
                  <div className="grammar-table" style={{ marginTop: '1rem' }}>
                    {section.table.map((row, ri) => (
                      <div key={ri} className={`grammar-table__row${ri === 0 ? ' is-head' : ''}`} style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0,1fr))` }}>
                        {row.map((cell, ci) => <span key={ci}>{cell}</span>)}
                      </div>
                    ))}
                  </div>
                )}
                {section.examples && (
                  <div className="example-stack">
                    {section.examples.map((ex, ei) => (
                      <div key={ei} style={{ gridTemplateColumns: `repeat(${ex.length}, minmax(0,1fr))` }}>
                        {ex.map((cell, ci) => <span key={ci}>{cell}</span>)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="article-section">
              <p>
                ¿Tienes dudas sobre {topic.shortTitle} o quieres practicarlo en clase con retroalimentación personalizada?{' '}
                <a href={`https://wa.me/573005004253?text=${waText}`} rel="nofollow" style={{ color: topic.color, fontWeight: 700, textDecoration: 'none' }}>
                  Escríbele al equipo de Idiomas WeLearn por WhatsApp
                </a>{' '}y te orientamos.
              </p>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '0.9rem', borderTop: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
              <span style={{ display: 'inline-grid', placeItems: 'center', width: 32, height: 32, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '1rem', flexShrink: 0 }}>✍</span>
              <span>Escrito por el <strong style={{ color: 'var(--ink)' }}>Equipo Idiomas WeLearn</strong>{' '}· Gramática {topic.level} para hispanohablantes</span>
            </div>
          </article>

          <GrammarTopicClient topic={topic} idioma={IDIOMA} nivel={NIVEL} />

          <nav className="topic-nav" aria-label="Navegación de temas">
            <Link href={`/practica/${IDIOMA}/${NIVEL}/gramatica`} className="topic-nav__link">
              <span>← Todos los temas</span>
              <strong>Gramática B1</strong>
            </Link>
            <div className="topic-nav__link next" style={{ border: '1.5px solid var(--line-soft)', borderRadius: 8, background: 'var(--surface)', padding: '1rem', textAlign: 'right' }}>
              <span>Próximamente</span>
              <strong>Siguiente tema</strong>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
