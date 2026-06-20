import type { GrammarTopic } from '@/data/practica/ingles-a1-gramatica';

// Componente SERVER — todo el contenido se renderiza en el HTML inicial (SEO).
export default function GrammarExplainer({ topic, color }: { topic: GrammarTopic; color: string }) {
  return (
    <article style={{ marginBottom: '2.25rem' }}>
      {/* Intro / explicación */}
      <section style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
          ¿Cuándo y cómo se usa?
        </h2>
        {topic.intro.map((p, i) => (
          <p key={i} style={{ color: 'var(--ink-2)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 0.85rem' }}>{p}</p>
        ))}
      </section>

      {/* Tabla */}
      {topic.table && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            {topic.table.caption}
          </h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${color}22` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: `${color}0d` }}>
                  {topic.table.headers.map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '0.7rem 0.9rem', fontWeight: 800, color: color, borderBottom: `2px solid ${color}33`, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topic.table.rows.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: '0.65rem 0.9rem', color: ci === 0 ? 'var(--ink)' : 'var(--ink-2)', fontWeight: ci === 0 ? 700 : 400, lineHeight: 1.5 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Ejemplos */}
      {topic.examples.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            Ejemplos
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {topic.examples.map((ex, i) => (
              <li key={i} style={{ padding: '0.7rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{ex.en}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}> — {ex.es}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Errores comunes */}
      {topic.commonMistakes.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            Errores comunes de hispanohablantes
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {topic.commonMistakes.map((m, i) => (
              <li key={i} style={{ padding: '0.8rem 1rem', borderRadius: 10, background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 0.9rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ color: '#dc2626', fontWeight: 700 }}>✗ {m.wrong}</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ {m.right}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{m.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tip */}
      <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: `${color}0d`, border: `1px solid ${color}25` }}>
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.6 }}>
          <strong style={{ color }}>💡 Truco:</strong> {topic.tip}
        </p>
      </div>
    </article>
  );
}
