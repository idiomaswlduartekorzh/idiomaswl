import type { Metadata } from 'next'
import Link from 'next/link'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
import { getTopicsByLevel } from '@/data/grammar/registry'

export const metadata: Metadata = generateGrammarIndexMetadata('coreano', 'a2')

const IDIOMA = 'coreano'
const NIVEL = 'a2'

export default function GrammarIndexPage() {
  const topics = getTopicsByLevel(IDIOMA, NIVEL)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
      { '@type': 'ListItem', position: 2, name: 'Coreano', item: 'https://www.idiomaswl.com/practica/coreano' },
      { '@type': 'ListItem', position: 3, name: 'A2', item: 'https://www.idiomaswl.com/practica/coreano/a2' },
      { '@type': 'ListItem', position: 4, name: 'Gramática A2', item: 'https://www.idiomaswl.com/practica/coreano/a2/gramatica' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="gram-page" style={{ '--topic-color': '#c60c30' } as React.CSSProperties}>
        <div className="wrap">
          <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano</Link>
            <span>/</span>
            <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>A2</Link>
            <span>/</span>
            <span style={{ color: 'var(--wl-on-panel-alert, #c60c30)', fontWeight: 800 }}>Gramática</span>
          </nav>

          <section className="topic-hero" style={{ paddingBottom: '1.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Gramática · Coreano A2</p>
            <h1 className="gram-h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Temas de gramática A2</h1>
            <p className="gram-lead">Cada tema incluye explicación de especialista orientada al hispanohablante, laboratorio visual y práctica progresiva de 6 niveles. Supera el 65 % en cada nivel para desbloquear el siguiente.</p>
          </section>

          <div style={{ display: 'grid', gap: '0.9rem', paddingBottom: '3rem' }}>
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/practica/${IDIOMA}/${NIVEL}/gramatica/${topic.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ padding: '1.2rem 1.4rem', border: `1.5px solid ${topic.color}33`, borderRadius: 16, borderLeft: `5px solid ${topic.color}`, background: `linear-gradient(135deg, ${topic.color}08 0%, transparent 100%)`, display: 'flex', alignItems: 'center', gap: '1.2rem', transition: 'box-shadow 0.18s' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: topic.color, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 950, fontSize: '0.86rem', flexShrink: 0 }}>{topic.order}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.98rem', fontWeight: 900, color: 'var(--ink)' }}>{topic.shortTitle}</span>
                      <span style={{ fontSize: '0.67rem', fontFamily: 'var(--mono)', fontWeight: 800, color: topic.color, textTransform: 'uppercase', letterSpacing: '0.04em', borderRadius: 999, border: `1px solid ${topic.color}44`, padding: '0.12rem 0.38rem', background: `${topic.color}10` }}>{topic.category}</span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.5 }}>{topic.lead}</p>
                  </div>
                  <span style={{ flexShrink: 0, color: topic.color, fontSize: '1.2rem', fontWeight: 700 }}>→</span>
                </div>
              </Link>
            ))}
            {topics.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.95rem', border: '1.5px solid var(--line-soft)', borderRadius: 16 }}>Próximamente: temas de gramática A2.</div>
            )}
          </div>

          <div style={{ paddingBottom: '2rem' }}>
            <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.82rem', textDecoration: 'none' }}>← Volver a Coreano A2</Link>
          </div>
        </div>
      </div>
    </>
  )
}
