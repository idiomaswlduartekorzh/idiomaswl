import Link from 'next/link'

/**
 * Navegación lateral entre las destrezas de un nivel y entre los niveles de un idioma.
 *
 * Por qué existe. Las páginas de destreza (escucha, lectura, escritura, habla,
 * vocabulario) tenían CERO o UN enlace interno saliente. Medido en producción el
 * 2026-08-01: /practica/aleman/a1/escucha → 1 enlace; /practica/ingles/a1/escritura → 0.
 *
 * Eso las convertía en el peor tipo de callejón sin salida para el rastreador: se
 * llega desde el índice del nivel y no se sale a ninguna parte. Search Console
 * reportaba 470 páginas en «Descubierta: actualmente sin indexar», y el grueso son
 * justamente estas.
 *
 * Se monta desde el layout de cada nivel, no repitiéndolo en 96 páginas.
 */

export const SKILL_LABELS: Record<string, { label: string; desc: string }> = {
  gramatica:   { label: 'Gramática',    desc: 'Reglas explicadas desde el español, con ejercicios' },
  vocabulario: { label: 'Vocabulario',  desc: 'Palabras de alta frecuencia con audio nativo' },
  escucha:     { label: 'Escucha',      desc: 'Audio real con transcripción y preguntas' },
  lectura:     { label: 'Lectura',      desc: 'Textos con preguntas de comprensión' },
  escritura:   { label: 'Escritura',    desc: 'Produce textos y compara con un modelo' },
  habla:       { label: 'Expresión oral', desc: 'Estructuras y pronunciación modelo' },
  conjunciones:      { label: 'Conjunciones',      desc: 'Conectores para unir ideas con soltura' },
  conectores:        { label: 'Conectores',        desc: 'Los enlaces que exige el writing de examen' },
  'uso-del-idioma':  { label: 'Uso del idioma',    desc: 'Transformaciones y precisión léxica' },
  particelle:        { label: 'Particelle',        desc: 'Ci y ne, la parte que más se atraganta' },
  integrato:         { label: 'Repaso integrado',  desc: 'Todas las destrezas en un mismo bloque' },
  'leccion-integrada': { label: 'Lección integrada', desc: 'Una sesión completa de principio a fin' },
}

export const LANG_LABELS: Record<string, string> = {
  aleman: 'Alemán', coreano: 'Coreano', frances: 'Francés', ingles: 'Inglés',
  italiano: 'Italiano', japones: 'Japonés', portugues: 'Portugués', ruso: 'Ruso',
}

/** Hub comercial de cada idioma, para que la práctica alimente a la landing. */
const LANG_HUB: Record<string, string> = {
  aleman: '/clases-de-aleman', coreano: '/clases-de-coreano', frances: '/clases-de-frances',
  ingles: '/clases-de-ingles', italiano: '/clases-de-italiano', japones: '/clases-de-japones',
  portugues: '/clases-de-portugues', ruso: '/clases-de-ruso',
}

export default function SkillNav({
  lang, level, skills, levels,
}: {
  lang: string
  level: string
  /** Destrezas que existen en ESTE nivel, en orden de aparición. */
  skills: string[]
  /** Niveles que existen para este idioma. */
  levels: string[]
}) {
  const langName = LANG_LABELS[lang] ?? lang
  const lvl = level.toUpperCase()
  const base = `/practica/${lang}/${level}`

  const card: React.CSSProperties = {
    display: 'block', padding: '0.85rem 1rem', borderRadius: 10,
    border: '1px solid var(--line-soft)', background: 'var(--bg-2)', textDecoration: 'none',
  }

  return (
    <section style={{ maxWidth: 1180, margin: '3rem auto 4rem', padding: '0 1.25rem' }}>
      <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '2rem' }}>

        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.9rem' }}>
          Practica {langName} {lvl} por destreza
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.7rem' }}>
          {skills.map(s => {
            const meta = SKILL_LABELS[s] ?? { label: s, desc: '' }
            return (
              <Link key={s} href={`${base}/${s}`} style={card}>
                <strong style={{ display: 'block', fontSize: '0.93rem', color: 'var(--ink)' }}>{meta.label}</strong>
                {meta.desc && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{meta.desc}</span>
                )}
              </Link>
            )
          })}
        </div>

        {levels.length > 1 && (
          <>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '2rem 0 0.9rem' }}>
              Otros niveles de {langName}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {levels.map(n => (
                <Link
                  key={n}
                  href={`/practica/${lang}/${n}`}
                  style={{
                    ...card,
                    padding: '0.6rem 1.1rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    opacity: n === level ? 0.55 : 1,
                  }}
                >
                  {langName} {n.toUpperCase()}
                </Link>
              ))}
            </div>
          </>
        )}

        <p style={{ marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          Toda esta práctica es gratuita.{' '}
          <Link href={LANG_HUB[lang] ?? '/clases-de-idiomas'} style={{ fontWeight: 700 }}>
            Ver cómo enseñamos {langName.toLowerCase()} en WeLearn
          </Link>{' '}
          — presencial en Bucaramanga u online. El diagnóstico de nivel es gratis.
        </p>

      </div>
    </section>
  )
}
