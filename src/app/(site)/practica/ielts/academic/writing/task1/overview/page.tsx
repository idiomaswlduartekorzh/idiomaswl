'use client';

import { useState } from 'react';
import Link from 'next/link';

interface OverviewExercise {
  chartDesc: string;
  data: string[];
  goodOverview: string;
  badOverviews: { text: string; reason: string }[];
  checklist: { label: string; pass: boolean }[];
}

const EXERCISES: OverviewExercise[] = [
  {
    chartDesc: 'Gráfica de líneas: consumo de café y té en UK entre 1980 y 2020.',
    data: [
      'Café: subió de 2kg/persona (1980) a 6kg/persona (2020) — crecimiento constante',
      'Té: bajó de 5kg/persona (1980) a 2.5kg/persona (2020) — caída constante',
      'Las dos líneas se cruzan en 2005 (aprox. 3.5kg cada una)',
    ],
    goodOverview: 'Overall, there was a clear reversal in trends, with coffee consumption rising steadily while tea drinking declined over the forty-year period. By the end of the period, coffee had overtaken tea as the more popular beverage.',
    badOverviews: [
      { text: 'Overall, coffee increased from 2kg to 6kg and tea decreased from 5kg to 2.5kg.', reason: 'Contiene números específicos. El overview NUNCA debe incluir datos exactos.' },
      { text: 'The graph shows that people in the UK changed their drinking habits.', reason: 'Demasiado vago. No identifica la tendencia principal ni el cambio más significativo.' },
    ],
    checklist: [
      { label: 'Comienza con "Overall," / "In general," / "It is clear that"', pass: true },
      { label: 'No contiene cifras ni datos específicos', pass: true },
      { label: 'Identifica la tendencia MÁS importante (cruce de líneas / inversión)', pass: true },
      { label: 'Máximo 2 oraciones', pass: true },
    ],
  },
  {
    chartDesc: 'Gráfico de barras: porcentaje de personas que usan internet en 5 países (2010 vs 2020).',
    data: [
      'Todos los países muestran aumento entre 2010 y 2020',
      'País A: pasó de 40% a 90% — mayor incremento',
      'País E: pasó de 70% a 75% — menor incremento',
      'En 2020, todos superan el 70%',
    ],
    goodOverview: 'Overall, internet usage increased in all five countries over the decade, with the most dramatic rise occurring in Country A. By 2020, internet penetration had surpassed 70% across all nations included in the data.',
    badOverviews: [
      { text: 'Overall, Country A went from 40% to 90% and Country E went from 70% to 75%.', reason: 'Menciona cifras exactas. El overview generaliza, no detalla.' },
      { text: 'In general, internet use went up.', reason: 'Correcto en estructura pero demasiado simple — no identifica el rasgo más notable.' },
    ],
    checklist: [
      { label: 'Comienza con "Overall," / "In general,"', pass: true },
      { label: 'Sin números específicos', pass: true },
      { label: 'Destaca el cambio más notable (país A)', pass: true },
      { label: 'Máximo 2 oraciones', pass: true },
    ],
  },
];

export default function OverviewPage() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[current];

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const hasOverall = /^(overall|in general|it is clear|it can be seen)/i.test(text.trim());
  const hasNumbers = /\d/.test(text);

  function next() {
    setCurrent(i => (i + 1) % EXERCISES.length);
    setText('');
    setRevealed(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Overview</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔭 Sub-habilidad 2 — Overview</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>El párrafo Overview</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.5rem', lineHeight: 1.65 }}>
            Es el párrafo MÁS importante. Sin un buen overview no puedes superar Band 5 en Task Achievement.
            Reglas: máximo 2 oraciones, sin cifras, identifica la tendencia principal.
          </p>

          {/* Rules box */}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: 'Empieza con "Overall,"', color: '#059669' },
              { label: 'Sin números', color: '#dc2626' },
              { label: 'Máx. 2 oraciones', color: '#0f3d8c' },
              { label: 'Tendencia PRINCIPAL', color: '#7c3aed' },
            ].map(r => (
              <span key={r.label} style={{ fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: 20, background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}40`, fontFamily: 'var(--mono)', fontWeight: 700 }}>{r.label}</span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{current + 1}/{EXERCISES.length}</span>
          </div>

          {/* Chart context */}
          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Datos del gráfico</p>
            <p style={{ margin: '0 0 0.75rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{ex.chartDesc}</p>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {ex.data.map((d, i) => <li key={i} style={{ fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{d}</li>)}
            </ul>
          </div>

          {/* Live feedback */}
          {text.trim().length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 10, background: hasOverall ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', color: hasOverall ? '#059669' : '#dc2626', border: `1px solid ${hasOverall ? '#059669' : '#dc2626'}40`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                {hasOverall ? '✓ Empieza con Overall' : '✗ Falta Overall/In general'}
              </span>
              <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 10, background: !hasNumbers ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', color: !hasNumbers ? '#059669' : '#dc2626', border: `1px solid ${!hasNumbers ? '#059669' : '#dc2626'}40`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                {!hasNumbers ? '✓ Sin números' : '✗ Contiene cifras'}
              </span>
              <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 10, background: sentenceCount <= 2 ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', color: sentenceCount <= 2 ? '#059669' : '#dc2626', border: `1px solid ${sentenceCount <= 2 ? '#059669' : '#dc2626'}40`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                {sentenceCount <= 2 ? `✓ ${sentenceCount} oración(es)` : `✗ ${sentenceCount} oraciones (máx. 2)`}
              </span>
              <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 10, background: 'rgba(15,61,140,0.08)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 700 }}>
                {wordCount} palabras
              </span>
            </div>
          )}

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={'Escribe tu overview aquí. Empieza con "Overall," ...'}
            rows={4}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.75rem' }}
          />

          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {text.trim().length > 15 && !revealed && (
              <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver modelo →</button>
            )}
          </div>

          {/* Model + bad examples */}
          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Overview modelo (Band 7)</p>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)' }}>{ex.goodOverview}</p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
                  {ex.checklist.map(c => (
                    <span key={c.label} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(5,150,105,0.1)', color: '#059669', fontFamily: 'var(--mono)' }}>✓ {c.label}</span>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Errores comunes — ¿los cometiste?</p>
              {ex.badOverviews.map((b, i) => (
                <div key={i} className="wl-card" style={{ padding: '1.1rem', borderLeft: '3px solid #dc2626' }}>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{b.text}&rdquo;</p>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#dc2626', lineHeight: 1.5 }}>✗ {b.reason}</p>
                </div>
              ))}

              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {current < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
