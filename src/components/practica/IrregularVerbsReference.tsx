import { IRREGULAR_VERBS_100, TOTAL_VERBS } from '@/data/practica/recursos/verbos-irregulares-100'
import VerbsResourcePdfButton from '@/components/practica/VerbsResourcePdfButton'

// Recurso de referencia embebido DENTRO del tema al que pertenece (en vez de
// una página aparte): la lista completa de los 100 verbos irregulares, con
// su propio botón de descarga en PDF. Server component, contenido crawleable.
export default function IrregularVerbsReference({ color }: { color: string }) {
  return (
    <section style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>
          📋 Los {TOTAL_VERBS} verbos irregulares más comunes (lista completa)
        </h2>
        <VerbsResourcePdfButton color={color} />
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.94rem', maxWidth: 640, margin: '0 0 1.5rem', lineHeight: 1.65 }}>
        Organizados por <strong style={{ color: 'var(--ink)' }}>patrón de sonido</strong> —no alfabéticamente— para
        memorizarlos por familias. Descarga el PDF gratis o consulta la lista completa aquí abajo.
      </p>

      {IRREGULAR_VERBS_100.map((group) => (
        <div key={group.id} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.25rem', letterSpacing: '-0.01em' }}>
            {group.pattern}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: '0 0 0.6rem', lineHeight: 1.55 }}>
            {group.soundNote}
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 10, border: `1px solid ${color}22` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: `${color}0d` }}>
                  {['Base', 'Pasado', 'Participio', 'Español'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 800, color, borderBottom: `2px solid ${color}33`, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.verbs.map((v) => (
                  <tr key={v.base} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                    <td style={{ padding: '0.45rem 0.75rem', fontWeight: 700, color: 'var(--ink)' }}>{v.base}</td>
                    <td style={{ padding: '0.45rem 0.75rem', color: 'var(--ink-2)' }}>{v.past}</td>
                    <td style={{ padding: '0.45rem 0.75rem', color: 'var(--ink-2)' }}>{v.participle}</td>
                    <td style={{ padding: '0.45rem 0.75rem', color: 'var(--ink-2)' }}>
                      {v.es}{v.note && <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--muted)' }}>{v.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  )
}
