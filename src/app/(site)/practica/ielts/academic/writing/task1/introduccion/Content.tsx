'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Exercise {
  original: string;
  hint: string;
  models: { text: string; changes: string[] }[];
}

const EXERCISES: Exercise[] = [
  {
    original: 'The graph below shows the percentage of people using the internet in three countries between 2000 and 2020.',
    hint: 'Cambia: "shows" → "illustrates/presents/compares", "percentage" → "proportion", "using the internet" → "who had internet access", "between 2000 and 2020" → "from 2000 to 2020" / "over a twenty-year period"',
    models: [
      {
        text: 'The line graph illustrates the proportion of the population who had internet access in three countries over a twenty-year period from 2000 to 2020.',
        changes: ['shows → illustrates', 'percentage → proportion', 'people using the internet → population who had internet access', 'between 2000 and 2020 → over a twenty-year period from 2000 to 2020'],
      },
      {
        text: 'The graph compares the percentage of internet users across three nations during the period from 2000 to 2020.',
        changes: ['shows → compares', 'people using the internet → internet users', 'countries → nations', 'between → during the period from'],
      },
    ],
  },
  {
    original: 'The bar chart below shows the amount of money spent on different types of advertising in the UK in 2020.',
    hint: 'Cambia: "shows" → "presents/displays", "amount of money spent" → "expenditure/spending", "different types of" → "various categories of", "in the UK" → "in the United Kingdom"',
    models: [
      {
        text: 'The bar chart presents the total expenditure on various categories of advertising in the United Kingdom in 2020.',
        changes: ['shows → presents', 'amount of money spent → expenditure', 'different types of → various categories of', 'UK → United Kingdom'],
      },
      {
        text: 'The chart displays spending on different advertising channels in the UK during 2020.',
        changes: ['shows → displays', 'amount of money spent → spending', 'types of advertising → advertising channels'],
      },
    ],
  },
  {
    original: 'The pie charts below show the proportion of male and female students studying four subjects at a university in 2010.',
    hint: 'Cambia: "show" → "illustrate/present", "proportion" → "percentage/share", "studying" → "enrolled in", "subjects" → "academic disciplines/courses"',
    models: [
      {
        text: 'The pie charts illustrate the percentage of male and female students enrolled in four academic disciplines at a university in 2010.',
        changes: ['show → illustrate', 'proportion → percentage', 'studying → enrolled in', 'subjects → academic disciplines'],
      },
      {
        text: 'The two pie charts present the share of male and female undergraduates across four courses at a university in 2010.',
        changes: ['show → present', 'proportion → share', 'students studying → undergraduates across', 'subjects → courses'],
      },
    ],
  },
];

const TIPS = [
  'NUNCA copies el enunciado original. Siempre parafrasea.',
  'No cambies los números, fechas o nombres propios (países, ciudades).',
  'Cambia al menos 3 elementos: verbo principal, sustantivos clave, estructura.',
  'La introducción NO es el overview — no menciones tendencias aquí.',
];

export default function IntroduccionPage() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[current];

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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Introducción</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔁 Sub-habilidad 1 — Introducción</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Paraphrasing</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            La introducción es tu primera oración. Nunca copies el enunciado — parafrasea cambiando vocabulario,
            clase de palabra y estructura. El examinador espera esto.
          </p>

          {/* Tips */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.6rem' }}>Reglas clave</p>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {TIPS.map((tip, i) => (
                <li key={i} style={{ fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{current + 1}/{EXERCISES.length}</span>
          </div>

          {/* Original prompt */}
          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Enunciado original</p>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>
              &ldquo;{ex.original}&rdquo;
            </p>
          </div>

          {/* Hint */}
          {!revealed && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '1rem', fontSize: '0.84rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
              <strong style={{ color: '#d97706' }}>Sugerencias:</strong> {ex.hint}
            </div>
          )}

          {/* Text area */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>
              Tu paráfrasis:
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Escribe aquí tu versión parafraseada..."
              rows={3}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{text.trim().split(/\s+/).filter(Boolean).length} palabras</span>
              {text.trim().length > 10 && !revealed && (
                <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver modelos →</button>
              )}
            </div>
          </div>

          {/* Model answers */}
          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Respuestas modelo</p>
              {ex.models.map((m, i) => (
                <div key={i} className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)' }}>{m.text}</p>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {m.changes.map(c => (
                      <span key={c} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.25)', fontFamily: 'var(--mono)' }}>{c}</span>
                    ))}
                  </div>
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
