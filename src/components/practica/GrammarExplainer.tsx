import type { GrammarTopic, GrammarTable } from '@/data/practica/ingles-a1-gramatica';

const h2Style: React.CSSProperties = {
  fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.75rem', letterSpacing: '-0.02em',
};

function TableBlock({ table, color }: { table: GrammarTable; color: string }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-2)', margin: '0 0 0.4rem' }}>{table.caption}</div>
      <div style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${color}22` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: `${color}0d` }}>
              {table.headers.map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '0.7rem 0.9rem', fontWeight: 800, color, borderBottom: `2px solid ${color}33`, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '0.65rem 0.9rem', color: ci === 0 ? 'var(--ink)' : 'var(--ink-2)', fontWeight: ci === 0 ? 700 : 400, lineHeight: 1.5 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente SERVER — todo el contenido se renderiza en el HTML inicial (SEO).
export default function GrammarExplainer({ topic, color }: { topic: GrammarTopic; color: string }) {
  const tables = topic.tables && topic.tables.length > 0 ? topic.tables : topic.table ? [topic.table] : [];

  return (
    <article style={{ marginBottom: '2.25rem' }}>
      {/* Intro / explicación */}
      <section style={{ marginBottom: '1.75rem' }}>
        <h2 style={h2Style}>¿Cuándo y cómo se usa?</h2>
        {topic.intro.map((p, i) => (
          <p key={i} style={{ color: 'var(--ink-2)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 0.85rem' }}>{p}</p>
        ))}
      </section>

      {/* Sub-secciones explicativas */}
      {topic.sections?.map((sec, si) => (
        <section key={si} style={{ marginBottom: '1.6rem' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{sec.heading}</h3>
          {sec.body.map((p, pi) => (
            <p key={pi} style={{ color: 'var(--ink-2)', fontSize: '0.98rem', lineHeight: 1.72, margin: '0 0 0.7rem' }}>{p}</p>
          ))}
        </section>
      ))}

      {/* Tablas */}
      {tables.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={h2Style}>{tables.length > 1 ? 'Tablas de referencia' : tables[0].caption}</h2>
          {tables.length === 1
            ? <TableBlock table={{ ...tables[0], caption: '' }} color={color} />
            : tables.map((t, i) => <TableBlock key={i} table={t} color={color} />)}
        </section>
      )}

      {/* Ejemplos */}
      {topic.examples.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={h2Style}>Ejemplos</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {topic.examples.map((ex, i) => (
              <li key={i} style={{ padding: '0.7rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{ex.en}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}> — {ex.es}</span>
                {ex.note && <span style={{ display: 'block', color: color, fontSize: '0.8rem', marginTop: '0.2rem' }}>↳ {ex.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contraste español → inglés */}
      {topic.contrast && topic.contrast.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={h2Style}>Del español al inglés (evita la traducción literal)</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {topic.contrast.map((c, i) => (
              <li key={i} style={{ padding: '0.8rem 1rem', borderRadius: 10, background: `${color}07`, border: `1px solid ${color}22` }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem 0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>{c.es}</span>
                  <span style={{ color, fontWeight: 800 }}>→</span>
                  <span style={{ color: 'var(--ink)', fontWeight: 800 }}>{c.en}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{c.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Errores comunes */}
      {topic.commonMistakes.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={h2Style}>Errores comunes de hispanohablantes</h2>
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
