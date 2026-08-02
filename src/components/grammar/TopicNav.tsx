import Link from 'next/link'
import { getTopicsByLevel } from '@/data/grammar/registry'

/**
 * Navegación entre lecciones de gramática hermanas.
 *
 * Reemplaza el bloque que antes cerraba cada lección con «← Todos los temas» y un
 * recuadro muerto que decía «Próximamente · Siguiente tema».
 *
 * Por qué importa, más allá de la comodidad del lector: Search Console reportaba
 * 470 páginas en «Descubierta: actualmente sin indexar» — Google las conocía y
 * decidía no rastrearlas. La causa no era que estuvieran rotas (las 801 URLs del
 * sitemap responden 200), sino que cada lección era un callejón sin salida: su
 * único enlace saliente dentro del grupo era volver al índice, que a su vez está
 * a cuatro clics de la home. Con anterior/siguiente y la lista de hermanas, cada
 * lección pasa de 1 enlace a una decena, y el rastreador puede recorrer un nivel
 * entero sin volver a subir.
 */
export default function TopicNav({
  idioma, nivel, slug, indexLabel,
}: {
  idioma: string
  nivel: string
  slug: string
  /** Etiqueta del índice, p. ej. «Gramática A1». */
  indexLabel: string
}) {
  const topics = getTopicsByLevel(idioma, nivel)
  const i = topics.findIndex(t => t.slug === slug)
  const prev = i > 0 ? topics[i - 1] : null
  const next = i >= 0 && i < topics.length - 1 ? topics[i + 1] : null
  const base = `/practica/${idioma}/${nivel}/gramatica`

  // Las demás lecciones del nivel, empezando por la siguiente para que el orden
  // de lectura tenga sentido y no repita las que ya salen como anterior/siguiente.
  const others = topics
    .filter((t, n) => n !== i && t.slug !== prev?.slug && t.slug !== next?.slug)
    .slice(0, 8)

  const box: React.CSSProperties = {
    border: '1.5px solid var(--line-soft)',
    borderRadius: 8,
    background: 'var(--surface)',
    padding: '1rem',
    textDecoration: 'none',
    display: 'block',
  }

  return (
    <>
      <nav className="topic-nav" aria-label="Navegación de temas">
        {prev ? (
          <Link href={`${base}/${prev.slug}`} className="topic-nav__link" style={box}>
            <span>← Tema anterior</span>
            <strong>{prev.shortTitle}</strong>
          </Link>
        ) : (
          <Link href={base} className="topic-nav__link" style={box}>
            <span>← Todos los temas</span>
            <strong>{indexLabel}</strong>
          </Link>
        )}

        {next ? (
          <Link href={`${base}/${next.slug}`} className="topic-nav__link next" style={{ ...box, textAlign: 'right' }}>
            <span>Tema siguiente →</span>
            <strong>{next.shortTitle}</strong>
          </Link>
        ) : (
          <Link href={base} className="topic-nav__link next" style={{ ...box, textAlign: 'right' }}>
            <span>Volver al índice →</span>
            <strong>{indexLabel}</strong>
          </Link>
        )}
      </nav>

      {others.length > 0 && (
        <section style={{ margin: '2rem 0 3rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.9rem' }}>
            Más gramática de este nivel
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.7rem' }}>
            {others.map(t => (
              <Link
                key={t.slug}
                href={`${base}/${t.slug}`}
                style={{
                  ...box,
                  padding: '0.8rem 0.95rem',
                  borderLeft: `3px solid ${t.color}`,
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.35 }}>
                  {t.shortTitle}
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.category}</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: '0.9rem', fontSize: '0.86rem' }}>
            <Link href={base} style={{ fontWeight: 700 }}>Ver los {topics.length} temas de {indexLabel} →</Link>
          </p>
        </section>
      )}
    </>
  )
}
