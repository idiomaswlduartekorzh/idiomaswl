import Link from 'next/link'
import { getVocabBlocks, getVocabLevel, unidadesDe } from '@/data/practica/vocabulario/registry'

/**
 * El hub de vocabulario de un nivel: reparte los diez bloques y explica cómo se estudia.
 *
 * Nació como la página de inglés A1 —el 9 de agosto de 2026, sustituyendo a la anterior, que
 * tenía sus propios sets de flashcards dentro de la misma pantalla—, y se sacó aquí al llegar
 * A2 con el mismo problema: veinticuatro niveles no pueden ser veinticuatro copias de ciento
 * ochenta y siete líneas. Lo único que cambia entre uno y otro es el idioma, el nivel, el
 * color y la bandera.
 *
 * Es un componente de servidor a propósito: no hay estado que guardar, y así los diez enlaces
 * salen en el HTML y el nivel queda rastreable desde una sola página.
 */

type Props = {
  /** Clave del registro de vocabulario, p. ej. `ingles`. */
  idioma: string
  /** `a1` | `a2` | `b1`. */
  nivel: string
  /** Cómo se llama el nivel en la miga de pan, con su bandera: `🇬🇧 Inglés A1`. */
  etiqueta: string
  /** Título grande de la página. */
  titulo: string
  /** Color de acento del idioma. */
  color: string
}

export default function VocabularyHub({ idioma, nivel, etiqueta, titulo, color }: Props) {
  /** El color al N % de opacidad; antes se pegaba la transparencia en hexadecimal. */
  const colorMix = (p: number) => `color-mix(in srgb, ${color} ${p}%, transparent)`

  const datos = getVocabLevel(idioma, nivel)
  const bloques = getVocabBlocks(idioma, nivel)
  const total = bloques.reduce((n, b) => n + b.entradas.length, 0)

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            fontFamily: 'var(--mono)',
            color: 'var(--muted)',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Práctica
          </Link>
          <span>/</span>
          <Link
            href={`/practica/${idioma}/${nivel}`}
            style={{ color: 'var(--muted)', textDecoration: 'none' }}
          >
            {etiqueta}
          </Link>
          <span>/</span>
          <span style={{ color, fontWeight: 800 }}>📚 Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />
          Vocabulary · {etiqueta.replace(/^\S+\s/u, '')}
        </p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          {titulo}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 1.5rem' }}>
          {total} palabras en {bloques.length} bloques. Cada bloque son tres unidades de diez, y una
          unidad es un día de estudio: unos doce minutos.
        </p>

        {/* Cómo funciona. Va antes de las tarjetas porque quien llega aquí no sabe qué es una
            «caja», y sin esto las tarjetas son diez enlaces sin sentido. */}
        <div
          style={{
            padding: '1.1rem 1.3rem',
            border: `1.5px solid ${colorMix(13.3)}`,
            borderRadius: 'var(--wlp-r)',
            background: `${colorMix(2.4)}`,
            marginBottom: '2rem',
          }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--mono)',
              color,
              margin: '0 0 0.5rem',
              letterSpacing: '0.06em',
            }}
          >
            CÓMO SE ESTUDIA
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Cada palabra sube por cinco escalones y en cada uno se te pide algo distinto: primero
            reconocerla, después escribirla con ayuda, después de memoria, después usarla dentro de
            una frase, y al final escribir una frase tuya. La palabra que fallas vuelve antes; la que
            dominas, más tarde. La mayoría de las frases de ejemplo{' '}
            <strong>salen de las lecciones de escucha y de lectura de este mismo nivel</strong>, y
            cada ficha dice de cuál con un sello: 🎧 si se oye en la serie, 📄 si está en un texto,
            ✎ si se escribió a propósito porque el material todavía no la cubre.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {bloques.map((b) => {
            const muestra = b.entradas.slice(0, 4)
            const resto = b.entradas.length - muestra.length
            return (
              <Link
                key={b.id}
                href={`/practica/${idioma}/${nivel}/vocabulario/${b.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    padding: '1.3rem 1.4rem',
                    border: `1.5px solid ${colorMix(13.3)}`,
                    borderRadius: 'var(--wlp-r)',
                    background: `${colorMix(2.4)}`,
                    height: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.6rem' }}>
                    {b.icono}
                  </span>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.2rem' }}>
                    {b.nombre}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color,
                      fontFamily: 'var(--mono)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {b.entradas.length} palabras · {unidadesDe(b).length} unidades
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {muestra.map((e) => (
                      <span
                        key={e.id}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--wlp-r-sm)',
                          background: `${colorMix(6.3)}`,
                          color,
                          fontFamily: 'var(--mono)',
                        }}
                      >
                        {e.lemma}
                      </span>
                    ))}
                    {resto > 0 && (
                      <span
                        style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}
                      >
                        +{resto}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {datos && (
          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.8rem',
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
            }}
          >
            Eje del nivel: {datos.eje}
          </p>
        )}
      </div>
    </section>
  )
}
