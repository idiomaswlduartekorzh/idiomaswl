'use client';

import { useState } from 'react';
import Link from 'next/link';

const TYPES = ['Opinión', 'Discusión', 'Problema-Solución', 'Dos preguntas'] as const;
type EssayType = typeof TYPES[number];

interface Prompt {
  text: string;
  type: EssayType;
  keywords: string[];
  explanation: string;
}

const PROMPTS: Prompt[] = [
  {
    text: 'Some people believe that governments should ban all advertising aimed at children. To what extent do you agree or disagree?',
    type: 'Opinión',
    keywords: ['To what extent do you agree or disagree'],
    explanation: '"To what extent do you agree or disagree?" always demands YOUR personal position. You must state ONE clear stance (agree / disagree / partially agree) in the introduction and defend it throughout. Do NOT present both sides equally — that is a Discussion essay structure.',
  },
  {
    text: 'Some experts argue that all university graduates should complete one year of community service before starting their careers. Others believe this infringes on individual freedom. Discuss both views and give your own opinion.',
    type: 'Discusión',
    keywords: ['Discuss both views', 'give your own opinion'],
    explanation: '"Discuss both views and give your own opinion" requires you to present View A (community service benefits) in one body paragraph, View B (individual freedom) in another, then clearly state your opinion. Missing either side loses Task Response marks.',
  },
  {
    text: 'In many countries, the number of elderly people living alone is increasing significantly. What problems does this cause, and what solutions can be suggested?',
    type: 'Problema-Solución',
    keywords: ['What problems does this cause', 'what solutions'],
    explanation: 'Two separate questions: problems AND solutions. Each solution must logically address a stated problem. The classic mistake is listing unrelated solutions. Structure: Intro → Body 1 (problems) → Body 2 (solutions that match those problems) → Conclusion.',
  },
  {
    text: 'Many companies now allow employees to work from home rather than commuting to an office. Why has this practice become so widespread? Is this a positive or negative development for society?',
    type: 'Dos preguntas',
    keywords: ['Why has this', 'Is this a positive or negative'],
    explanation: 'Two completely different questions requiring separate body paragraphs with equal depth. Body 1 answers WHY (causes of the trend). Body 2 answers whether it is POSITIVE or NEGATIVE. Spending 80% on one question is the most common Task Response error here.',
  },
  {
    text: 'While some people think that social media has brought society closer together, others argue it has increased isolation and loneliness. To what extent do you agree or disagree?',
    type: 'Opinión',
    keywords: ['To what extent do you agree or disagree'],
    explanation: 'Even though the prompt mentions TWO views, "To what extent do you agree or disagree?" makes this an OPINION essay. You must take a clear position and defend it — do not give equal weight to both sides as you would in a Discussion essay. The mention of two views is just context for your argument.',
  },
];

export default function TipoEnsayoPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<EssayType | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const prompt = PROMPTS[current];
  const isCorrect = selected === prompt.type;

  function handleSelect(type: EssayType) {
    if (selected !== null) return;
    setSelected(type);
    if (type === prompt.type) setScore(s => s + 1);
  }

  function next() {
    if (current < PROMPTS.length - 1) {
      setCurrent(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            </div>
            <div className="wl-card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #0f3d8c' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>Resultado final</p>
              <p style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1 }}>{score}/{PROMPTS.length}</p>
              <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                {score === 5 ? 'Perfecto — identificas todos los tipos con precisión de examinador.' : score >= 3 ? 'Buen nivel. Repasa las explicaciones de los que fallaste antes de escribir.' : 'Identificar el tipo correcto es la base del Task 2. Practica hasta lograr 5/5.'}
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn" onClick={restart}>Intentar de nuevo</button>
                <Link href="/practica/ielts/academic/writing/task2/introduccion" className="btn btn-ghost btn-sm">Sub-habilidad 2: Introducción →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Tipo de Ensayo</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔍 Sub-habilidad 1 — Tipo de Ensayo</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Identifica el tipo</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            Las palabras clave al final del enunciado determinan la estructura completa del ensayo. Lee con atención y selecciona el tipo correcto.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / PROMPTS.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{current + 1}/{PROMPTS.length} · {score} correctas</span>
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Enunciado IELTS Task 2</p>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>
              &ldquo;{prompt.text}&rdquo;
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
            {TYPES.map(type => {
              const isSelected = selected === type;
              const isRight = type === prompt.type;
              let border = '2px solid var(--line-soft)';
              let bg = 'var(--bg-2)';
              let color = 'var(--ink)';
              if (selected !== null) {
                if (isRight) { border = '2px solid #059669'; bg = 'rgba(5,150,105,0.08)'; color = '#059669'; }
                else if (isSelected && !isRight) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.07)'; color = '#dc2626'; }
              }
              return (
                <button key={type} onClick={() => handleSelect(type)}
                  style={{ padding: '0.9rem', borderRadius: 10, border, background: bg, cursor: selected !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', fontWeight: 700, fontSize: '0.92rem', color }}>
                  {type}
                  {selected !== null && isRight && <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, marginTop: '0.2rem' }}>✓ Correcto</span>}
                  {selected !== null && isSelected && !isRight && <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, marginTop: '0.2rem' }}>✗ Incorrecto</span>}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <>
              <div style={{ padding: '1.25rem', borderRadius: 12, background: isCorrect ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.05)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.3)' : 'rgba(220,38,38,0.2)'}`, marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--mono)', margin: '0 0 0.5rem', color: isCorrect ? '#059669' : '#dc2626' }}>
                  {isCorrect ? '✓ Correcto — ' : '✗ Incorrecto — '}Tipo: {prompt.type}
                </p>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{prompt.explanation}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {'Palabras clave: '}<span style={{ color: '#0f3d8c', fontWeight: 700 }}>{prompt.keywords.join(' · ')}</span>
                </p>
              </div>
              <button className="btn btn-sm" onClick={next}>
                {current < PROMPTS.length - 1 ? 'Siguiente enunciado →' : 'Ver resultado final →'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
