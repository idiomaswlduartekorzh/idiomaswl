'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CompExercise {
  context: string;
  dataA: { label: string; value: number; unit: string };
  dataB: { label: string; value: number; unit: string };
  models: string[];
  vocab: string[];
}

const EXERCISES: CompExercise[] = [
  {
    context: 'Gasto en educación (% del PIB, 2020)',
    dataA: { label: 'Finlandia', value: 6.8, unit: '%' },
    dataB: { label: 'España', value: 4.2, unit: '%' },
    models: [
      'Finland spent considerably more on education than Spain, at 6.8% of GDP compared to just 4.2%.',
      'While Finland allocated 6.8% of its GDP to education, Spain spent significantly less, at only 4.2%.',
      'Spain\'s education expenditure, at 4.2% of GDP, was notably lower than that of Finland, which stood at 6.8%.',
    ],
    vocab: ['considerably more than', 'significantly less', 'compared to', 'while', 'whereas', 'in contrast to'],
  },
  {
    context: 'Porcentaje de mujeres en el Parlamento (2022)',
    dataA: { label: 'Suecia', value: 47, unit: '%' },
    dataB: { label: 'Brasil', value: 15, unit: '%' },
    models: [
      'Sweden had a significantly higher proportion of female parliamentarians than Brazil, at 47% versus just 15%.',
      'While nearly half of Swedish parliamentarians were women (47%), the figure for Brazil was markedly lower at 15%.',
      'Brazil\'s female parliamentary representation, at roughly 15%, was far lower than Sweden\'s, which stood at just under half.',
    ],
    vocab: ['significantly higher', 'far lower', 'markedly lower', 'versus', 'compared with', 'nearly half', 'just under half'],
  },
  {
    context: 'Consumo de energía renovable (TWh, 2021)',
    dataA: { label: 'China', value: 2920, unit: 'TWh' },
    dataB: { label: 'Alemania', value: 230, unit: 'TWh' },
    models: [
      'China consumed substantially more renewable energy than Germany, producing approximately 2,920 TWh compared to Germany\'s 230 TWh.',
      'At 2,920 TWh, China\'s renewable energy consumption dwarfed that of Germany, which generated just 230 TWh.',
      'Germany produced far less renewable energy than China, with roughly 230 TWh compared to over 2,900 TWh in China.',
    ],
    vocab: ['substantially more', 'dwarfed', 'far less', 'approximately', 'roughly', 'just over/under', 'compared to'],
  },
];

const APPROX_PHRASES = [
  'approximately', 'roughly', 'just over', 'just under', 'nearly', 'around', 'about',
  'slightly more than', 'slightly fewer than',
];

export default function ComparacionesPage() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[idx];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const diff = ex.dataA.value - ex.dataB.value;
  const isAHigher = diff > 0;

  function next() {
    setIdx(i => (i + 1) % EXERCISES.length);
    setText('');
    setRevealed(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Comparaciones</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⚖️ Sub-habilidad 4 — Comparaciones</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Comparar datos</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            En gráficos de barras, pasteles y tablas, el examinador espera comparaciones precisas con lenguaje de aproximación.
            Escribe una oración que compare los dos valores.
          </p>

          {/* Vocab panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Comparación</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                higher/lower than · more/less than · while · whereas · compared to/with · in contrast
              </p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Aproximación</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                approximately · roughly · just over/under · nearly · around · slightly more/less than
              </p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((idx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{EXERCISES.length}</span>
          </div>

          {/* Data */}
          <div className="wl-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>{ex.context}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[ex.dataA, ex.dataB].map((d, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, padding: '1rem', borderRadius: 10, background: i === 0 ? 'rgba(15,61,140,0.07)' : 'rgba(220,38,38,0.06)', border: `1px solid ${i === 0 ? 'rgba(15,61,140,0.2)' : 'rgba(220,38,38,0.15)'}`, textAlign: 'center' }}>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>{d.label}</p>
                  <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.75rem', color: i === 0 ? '#0f3d8c' : '#dc2626' }}>
                    {d.value}{d.unit}
                  </p>
                  {i === 0 && isAHigher && <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>▲ más alto</span>}
                  {i === 1 && !isAHigher && <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>▲ más alto</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {ex.vocab.map(v => (
                <span key={v} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.15)', fontFamily: 'var(--mono)' }}>{v}</span>
              ))}
            </div>
          </div>

          {/* Approximation chips */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', margin: '0 0 0.4rem' }}>Tip — usa expresiones de aproximación en lugar de repetir cifras exactas:</p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {APPROX_PHRASES.map(p => (
                <span key={p} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)', fontFamily: 'var(--mono)', cursor: 'pointer' }}
                  onClick={() => !revealed && setText(t => t + (t.endsWith(' ') || t.length === 0 ? '' : ' ') + p + ' ')}>
                  +{p}
                </span>
              ))}
            </div>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escribe aquí tu oración de comparación..."
            rows={3}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.5rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{wordCount} palabras</span>
            {text.trim().length > 10 && !revealed && (
              <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver modelos →</button>
            )}
          </div>

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Oraciones modelo</p>
              {ex.models.map((m, i) => (
                <div key={i} className="wl-card" style={{ padding: '1rem', borderLeft: '3px solid #0f3d8c' }}>
                  <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--ink)' }}>{m}</p>
                </div>
              ))}
              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {idx < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
