import type { Metadata } from 'next'
import Link from 'next/link'
import { IRREGULAR_VERBS_100, TOTAL_VERBS } from '@/data/practica/recursos/verbos-irregulares-100'
import { GRAMMAR_COLOR } from '@/data/practica/grammar-types'
import { LearningResourceSchema, FAQSchema } from '@/components/practica/EducationSchema'
import VerbsResourcePdfButton from '@/components/practica/VerbsResourcePdfButton'

const COLOR = GRAMMAR_COLOR
const URL = 'https://www.idiomaswl.com/practica/ingles/recursos/verbos-irregulares'
const TITLE = `Los ${TOTAL_VERBS} verbos irregulares más comunes en inglés (con PDF gratis)`
const DESCRIPTION = `Lista completa de los ${TOTAL_VERBS} verbos irregulares más usados en inglés, organizados por patrón de sonido para memorizarlos por familias. Base, pasado, participio y traducción. Descarga la lista en PDF gratis.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'verbos irregulares pdf', 'verbos irregulares en inglés pdf', 'lista de verbos irregulares en inglés',
    'verbos irregulares ingles pdf gratis', '100 verbos irregulares en inglés', 'verbos irregulares mas comunes ingles',
    'tabla de verbos irregulares inglés', 'verbos irregulares con traducción pdf',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    locale: 'es_CO',
    url: URL,
  },
  alternates: { canonical: URL },
}

const FAQ = [
  { q: '¿Dónde puedo descargar una lista de verbos irregulares en inglés en PDF?', a: 'En esta página: el botón "Descargar PDF gratis" genera al instante un PDF con los 100 verbos irregulares más comunes, organizados por patrón de sonido, con base, pasado, participio y traducción.' },
  { q: '¿Cuántos verbos irregulares hay que memorizar en inglés?', a: 'Existen unos 200 en total, pero con los 100 más frecuentes de esta lista cubres más del 95% de lo que necesitas en conversación y exámenes de nivel A1-B1.' },
  { q: '¿Cuál es la mejor forma de aprender los verbos irregulares?', a: 'Agruparlos por patrón de sonido (como en esta lista) en vez de memorizarlos en orden alfabético. El cerebro retiene mucho mejor "drink-drank-drunk, sing-sang-sung, swim-swam-swum" como familia que como entradas sueltas.' },
  { q: '¿Qué diferencia hay entre el pasado y el participio de un verbo irregular?', a: 'El pasado (2ª forma) se usa solo en past simple: "I went". El participio (3ª forma) se usa con have en present perfect ("I have gone") y con be en voz pasiva. Muchos verbos tienen las tres formas distintas: go-went-gone.' },
  { q: '¿Los verbos irregulares cambian según la persona?', a: 'No. A diferencia del español, la forma del pasado es la misma para todos los sujetos: I went, you went, he went, we went, they went. Solo el verbo "be" tiene dos formas de pasado (was/were).' },
]

export default function Page() {
  return (
    <>
      <LearningResourceSchema
        name={TITLE}
        url={URL}
        description={DESCRIPTION}
        keywords={metadata.keywords as string[]}
      />
      <FAQSchema items={FAQ} />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📋 Recursos</span>
          </div>

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />Recurso gratis · Referencia</p>
          <h1 style={{ fontSize: '2.1rem', letterSpacing: '-0.03em', margin: '0 0 0.75rem', fontWeight: 700, lineHeight: 1.15 }}>
            Los {TOTAL_VERBS} verbos irregulares más comunes en inglés
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 640, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
            Organizados por <strong style={{ color: 'var(--ink)' }}>patrón de sonido</strong> —no alfabéticamente— para que
            se memoricen por familias, igual que se enseñan en Idiomas WeLearn. Cada verbo trae su base, pasado,
            participio y traducción al español.
          </p>

          <div style={{ marginBottom: '2.5rem' }}>
            <VerbsResourcePdfButton color={COLOR} large />
          </div>

          {/* Contexto pedagógico */}
          <div style={{ marginBottom: '2rem', color: 'var(--ink-2)', fontSize: '1rem', lineHeight: 1.75 }}>
            <p style={{ margin: '0 0 0.85rem' }}>
              Estudiar los verbos irregulares en orden alfabético es la forma menos eficaz de memorizarlos: el cerebro
              no encuentra ningún patrón entre &quot;begin&quot; y &quot;bend&quot; solo porque empiezan con la misma letra.
              En cambio, agruparlos por cómo <em>suenan</em> —&quot;drink-drank-drunk, sing-sang-sung, swim-swam-swum&quot;—
              revela familias completas que se aprenden juntas en minutos.
            </p>
            <p style={{ margin: 0 }}>
              Esta lista reúne los {TOTAL_VERBS} verbos irregulares más frecuentes del inglés —los que de verdad
              aparecen en conversaciones, exámenes (IELTS, TOEFL, ICFES) y textos reales— en {IRREGULAR_VERBS_100.length} patrones
              de sonido. Domina un patrón a la vez, en cadena rítmica, y repásalos con el
              <Link href="/practica/ingles/a2/gramatica/past-simple-verbos-irregulares" style={{ color: COLOR, fontWeight: 700, textDecoration: 'none' }}> tema de past simple </Link>
              que explica cuándo y cómo usarlos.
            </p>
          </div>

          {/* Tablas por patrón */}
          {IRREGULAR_VERBS_100.map((group) => (
            <section key={group.id} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.35rem', letterSpacing: '-0.01em' }}>
                {group.pattern}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 0.85rem', lineHeight: 1.6 }}>
                {group.soundNote}
              </p>
              <div style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${COLOR}22` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: `${COLOR}0d` }}>
                      {['Base', 'Pasado', 'Participio', 'Español'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.85rem', fontWeight: 800, color: COLOR, borderBottom: `2px solid ${COLOR}33`, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.verbs.map((v) => (
                      <tr key={v.base} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                        <td style={{ padding: '0.55rem 0.85rem', fontWeight: 700, color: 'var(--ink)' }}>{v.base}</td>
                        <td style={{ padding: '0.55rem 0.85rem', color: 'var(--ink-2)' }}>{v.past}</td>
                        <td style={{ padding: '0.55rem 0.85rem', color: 'var(--ink-2)' }}>{v.participle}</td>
                        <td style={{ padding: '0.55rem 0.85rem', color: 'var(--ink-2)' }}>
                          {v.es}{v.note && <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)' }}>{v.note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* CTA descarga (repetido al final, útil tras el scroll largo) */}
          <div style={{ margin: '1rem 0 2.5rem', padding: '1.25rem 1.5rem', borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.2rem' }}>¿Prefieres tenerlos a mano sin internet?</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Descarga la lista completa en PDF, lista para imprimir o guardar.</div>
            </div>
            <VerbsResourcePdfButton color={COLOR} large />
          </div>

          {/* FAQ */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
              Preguntas frecuentes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {FAQ.map((item) => (
                <details key={item.q} style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                  <summary style={{ fontWeight: 700, color: 'var(--ink)', cursor: 'pointer', fontSize: '0.96rem', lineHeight: 1.5 }}>{item.q}</summary>
                  <p style={{ margin: '0.6rem 0 0', color: 'var(--ink-2)', fontSize: '0.94rem', lineHeight: 1.7 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Enlace de vuelta al tema */}
          <Link href="/practica/ingles/a2/gramatica/past-simple-verbos-irregulares" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${COLOR}22`, background: `${COLOR}05`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>Tema relacionado</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Past Simple: verbos irregulares (explicación + ejercicios)</div>
              </div>
              <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700 }}>→</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
