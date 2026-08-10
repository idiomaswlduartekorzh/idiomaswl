import Link from 'next/link'
import { getVocabBlocks, getVocabLevel, unidadesDe } from '@/data/practica/vocabulario/registry'

/**
 * El hub de vocabulario de inglés A1.
 *
 * Sustituye —el 9 de agosto de 2026, por decisión del usuario— a la página anterior, que
 * tenía sus propios 6 sets de 60 palabras con flashcards, opción múltiple y rellenar huecos
 * dentro de la misma pantalla. Se retira entera porque las dos cosas no podían convivir en
 * la misma URL: aquel contenido enseñaba 60 palabras sueltas y este nivel enseña 310 con
 * ficha completa, procedencia declarada y la escalera de cinco cajas del método.
 *
 * Lo que aquella página hacía en una pantalla lo hace ahora cada bloque en la suya
 * (`[slug]/page.tsx`), con el motor entero. Aquí solo se reparten los diez caminos.
 *
 * Es un componente de servidor a propósito: no hay estado que guardar, y así los diez
 * enlaces salen en el HTML y el nivel queda rastreable desde una sola página.
 */

const COLOR = '#e11d48'
const IDIOMA = 'ingles'
const NIVEL = 'a1'

export default function VocabularioInglesA1() {
  const nivel = getVocabLevel(IDIOMA, NIVEL)
  const bloques = getVocabBlocks(IDIOMA, NIVEL)
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
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            🇬🇧 Inglés A1
          </Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />
          Vocabulary · Inglés A1
        </p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Vocabulario A1
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
            border: `1.5px solid ${COLOR}22`,
            borderRadius: 14,
            background: `${COLOR}06`,
            marginBottom: '2rem',
          }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--mono)',
              color: COLOR,
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
                href={`/practica/${IDIOMA}/${NIVEL}/vocabulario/${b.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    padding: '1.3rem 1.4rem',
                    border: `1.5px solid ${COLOR}22`,
                    borderRadius: 16,
                    background: `${COLOR}06`,
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
                      color: COLOR,
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
                          borderRadius: 5,
                          background: `${COLOR}10`,
                          color: COLOR,
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

        {nivel && (
          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.8rem',
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
            }}
          >
            Eje del nivel: {nivel.eje}
          </p>
        )}
      </div>
    </section>
  )
}
