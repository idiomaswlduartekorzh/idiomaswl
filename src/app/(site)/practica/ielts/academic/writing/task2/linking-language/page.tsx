'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Exercise {
  category: string;
  categoryColor: string;
  before: string;
  correct: string;
  after: string;
  options: string[];
  explanation: string;
}

const EXERCISES: Exercise[] = [
  {
    category: 'Adición',
    categoryColor: '#0f3d8c',
    before: 'Online education has made university degrees more accessible to students worldwide.',
    correct: 'Furthermore',
    after: ', it has allowed working professionals to develop new skills without leaving their jobs.',
    options: ['Furthermore', 'However', 'As a result', 'For instance'],
    explanation: '"Furthermore" adds a parallel positive point, reinforcing the same idea. "However" would introduce a contrast. "As a result" would imply causality (accessibility causing professional development). "For instance" would introduce a specific example — but the second clause is a general point, not an example.',
  },
  {
    category: 'Contraste',
    categoryColor: '#7c3aed',
    before: 'Renewable energy sources such as solar and wind power are becoming increasingly affordable.',
    correct: 'However',
    after: ', many developing nations still rely heavily on fossil fuels due to infrastructure constraints.',
    options: ['However', 'Furthermore', 'Consequently', 'In addition'],
    explanation: '"However" signals a contrast: the first sentence is positive about renewables, but the second introduces an obstacle. "Furthermore" and "In addition" would add a supporting point. "Consequently" would imply the affordability of renewables causes reliance on fossil fuels — logically backwards.',
  },
  {
    category: 'Causa-Efecto',
    categoryColor: '#059669',
    before: 'The rapid expansion of e-commerce has fundamentally transformed consumer behaviour across the globe.',
    correct: 'As a result',
    after: ', many traditional high-street retailers have been forced to permanently close their stores.',
    options: ['As a result', 'In addition', 'For example', 'Nevertheless'],
    explanation: '"As a result" correctly shows that store closures are the EFFECT of e-commerce growth. "In addition" would add a parallel point. "For example" would introduce an example (but closures are a consequence, not an example). "Nevertheless" would introduce a contrast despite the cause.',
  },
  {
    category: 'Ejemplo',
    categoryColor: '#d97706',
    before: 'Several countries have successfully reduced car dependency through sustained investment in cycling infrastructure.',
    correct: 'For instance',
    after: ', Amsterdam now handles over 40% of all daily trips by bicycle following decades of dedicated investment.',
    options: ['For instance', 'However', 'Consequently', 'In conclusion'],
    explanation: '"For instance" introduces Amsterdam as a specific example supporting the general claim. "However" would contradict the main clause. "Consequently" implies Amsterdam\'s data is a result of the general statement rather than an illustration of it. "In conclusion" signals the end of an essay, not a supporting example.',
  },
  {
    category: 'Conclusión',
    categoryColor: '#dc2626',
    before: 'Both individuals and governments have a critical role to play in addressing the climate crisis.',
    correct: 'In conclusion',
    after: ', only a sustained and coordinated global effort can lead society towards a genuinely sustainable future.',
    options: ['In conclusion', 'Furthermore', 'For instance', 'However'],
    explanation: '"In conclusion" signals the final synthesis of an argument and is appropriate at the start of the closing sentence. "Furthermore" would add another point. "For instance" would introduce an example. "However" would create an unexpected contrast — none of these match the summarising function needed here.',
  },
];

export default function LinkingLanguagePage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const ex = EXERCISES[current];
  const isCorrect = selected === ex.correct;

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === ex.correct) setScore(s => s + 1);
  }

  function next() {
    if (current < EXERCISES.length - 1) {
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
              <p style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1 }}>{score}/{EXERCISES.length}</p>
              <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                {score === 5 ? 'Excelente — dominas los conectores por función.' : score >= 3 ? 'Buen nivel. Repasa las explicaciones de los que fallaste.' : 'Los conectores son esenciales para Coherence & Cohesion. Sigue practicando.'}
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn" onClick={restart}>Intentar de nuevo</button>
                <Link href="/practica/ielts/academic/writing/task2/conclusion" className="btn btn-ghost btn-sm">Sub-habilidad 5: Conclusión →</Link>
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Linking Language</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔗 Sub-habilidad 4 — Linking Language</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Conectores por función</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', lineHeight: 1.65 }}>
            Elige el conector correcto para cada oración. Lee el contexto: el significado de cada cláusula determina la función del conector.
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            {[['#0f3d8c', 'Adición'], ['#7c3aed', 'Contraste'], ['#059669', 'Causa-Efecto'], ['#d97706', 'Ejemplo'], ['#dc2626', 'Conclusión']].map(([c, l]) => (
              <span key={l} style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', borderRadius: 10, background: `${c}15`, color: c, border: `1px solid ${c}35`, fontFamily: 'var(--mono)', fontWeight: 600 }}>{l}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{current + 1}/{EXERCISES.length} · {score} correctas</span>
          </div>

          <div style={{ marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 10, background: `${ex.categoryColor}18`, color: ex.categoryColor, border: `1px solid ${ex.categoryColor}35`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
              Función: {ex.category}
            </span>
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Completa la oración</p>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink)' }}>
              {ex.before}
              {selected !== null ? (
                <span style={{ fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', margin: '0 0.15rem' }}> {selected}</span>
              ) : (
                <span style={{ display: 'inline-block', minWidth: 120, borderBottom: '2px dashed #0f3d8c', margin: '0 0.25rem', verticalAlign: 'bottom', textAlign: 'center', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>?</span>
              )}
              {ex.after}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
            {ex.options.map(opt => {
              const isSel = selected === opt;
              const isRight = opt === ex.correct;
              let border = '1.5px solid var(--line-soft)';
              let bg = 'var(--bg-2)';
              let color = 'var(--ink)';
              if (selected !== null) {
                if (isRight) { border = `2px solid #059669`; bg = 'rgba(5,150,105,0.08)'; color = '#059669'; }
                else if (isSel && !isRight) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.07)'; color = '#dc2626'; }
              }
              return (
                <button key={opt} onClick={() => handleSelect(opt)}
                  style={{ padding: '0.9rem', borderRadius: 10, border, background: bg, cursor: selected !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color, fontFamily: 'var(--mono)' }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <>
              <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: isCorrect ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.05)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.3)' : 'rgba(220,38,38,0.2)'}`, marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--mono)', margin: '0 0 0.4rem', color: isCorrect ? '#059669' : '#dc2626' }}>
                  {isCorrect ? `✓ Correcto — "${ex.correct}"` : `✗ Incorrecto — la respuesta correcta es "${ex.correct}"`}
                </p>
                <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{ex.explanation}</p>
              </div>
              <button className="btn btn-sm" onClick={next}>
                {current < EXERCISES.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
