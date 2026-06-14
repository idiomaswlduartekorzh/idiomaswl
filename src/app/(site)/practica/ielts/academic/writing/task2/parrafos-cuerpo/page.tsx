'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Exercise {
  topic: string;
  essayType: string;
  prompt: string;
  teel: {
    T: string;
    E1label: string;
    E2label: string;
    L: string;
    E1model: string;
    E2model: string;
    Lmodel: string;
  };
}

const EXERCISES: Exercise[] = [
  {
    essayType: 'Opinión',
    prompt: 'Governments should invest more in public transport than in new roads.',
    topic: 'Public transport efficiency',
    teel: {
      T: 'Public transport is a far more efficient use of urban space than private vehicles.',
      E1label: 'Explanation — ¿Por qué es verdad esto? (1-2 oraciones, sin ejemplos aún)',
      E1model: 'A single bus can carry up to 60 passengers, occupying the road space of just a few cars and significantly reducing congestion in city centres.',
      E2label: 'Example — Da un dato, ciudad, estudio o caso real que demuestre tu punto',
      E2model: 'In Singapore, a highly integrated metro and bus network has reduced private car usage by over 30%, cutting average commute times significantly.',
      L: '',
      Lmodel: 'This demonstrates that redirecting government investment towards mass transit would deliver tangible benefits to the majority of urban residents.',
    },
  },
  {
    essayType: 'Discusión',
    prompt: 'Some argue that all graduates should complete one year of community service.',
    topic: 'Community service and social responsibility',
    teel: {
      T: 'Mandatory community service would help graduates develop a broader sense of social responsibility.',
      E1label: 'Explanation — ¿Por qué el community service desarrolla responsabilidad? Razona.',
      E1model: 'When young professionals work alongside disadvantaged communities, they gain first-hand insight into social inequalities that formal education rarely conveys.',
      E2label: 'Example — Da un ejemplo de país, programa o estudio que respalde esta idea',
      E2model: 'In South Korea, mandatory military and social service has been credited with fostering national cohesion and empathy among the youth population.',
      L: '',
      Lmodel: 'It is therefore reasonable to conclude that structured service programmes can cultivate civic values that benefit both graduates and society as a whole.',
    },
  },
  {
    essayType: 'Problema-Solución',
    prompt: 'The number of elderly people living alone is increasing in many countries.',
    topic: 'Health risks of elderly isolation',
    teel: {
      T: 'The most pressing consequence of elderly people living alone is the risk to their physical and mental health.',
      E1label: 'Explanation — ¿Por qué vivir solo es peligroso para la salud de los mayores?',
      E1model: 'Without regular human contact, older adults are far more likely to experience depression and cognitive decline, while medical emergencies may go undetected for hours or even days.',
      E2label: 'Example — Cita datos, informes, o ejemplos de países afectados',
      E2model: 'A 2022 WHO report found that social isolation increases the risk of dementia by 50% and is associated with a 29% higher risk of heart disease among people over 65.',
      L: '',
      Lmodel: 'This evidence underscores the urgent need for government-funded welfare programmes that provide regular check-ins and social engagement for elderly people living alone.',
    },
  },
];

const TEEL_COLORS: Record<string, string> = {
  T: '#0f3d8c',
  E1: '#7c3aed',
  E2: '#059669',
  L: '#d97706',
};

export default function ParrafosCuerpoPage() {
  const [current, setCurrent] = useState(0);
  const [e1, setE1] = useState('');
  const [e2, setE2] = useState('');
  const [lk, setLk] = useState('');
  const [assembled, setAssembled] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const ex = EXERCISES[current];

  function reset() {
    setE1(''); setE2(''); setLk('');
    setAssembled(false); setShowModel(false);
  }

  function next() {
    setCurrent(i => (i + 1) % EXERCISES.length);
    reset();
  }

  const canAssemble = e1.trim().length > 10 && e2.trim().length > 10 && lk.trim().length > 10;

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Párrafos de Cuerpo</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🧱 Sub-habilidad 3 — Párrafos de Cuerpo</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Estructura TEEL</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', lineHeight: 1.65 }}>
            Cada párrafo de cuerpo sigue la estructura TEEL. La oración tópico ya está escrita — tú escribes las demás partes.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            {[['T', 'Topic sentence'], ['E', 'Explanation'], ['E', 'Example'], ['L', 'Link back']].map(([k, label], i) => {
              const key = i === 2 ? 'E2' : i === 1 ? 'E1' : k;
              return (
                <span key={i} style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: `rgba(${key === 'T' ? '15,61,140' : key === 'E1' ? '124,58,237' : key === 'E2' ? '5,150,105' : '217,119,6'},0.1)`, color: TEEL_COLORS[key === 'T' ? 'T' : key], border: `1px solid rgba(${key === 'T' ? '15,61,140' : key === 'E1' ? '124,58,237' : key === 'E2' ? '5,150,105' : '217,119,6'},0.25)`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                  {k} — {label}
                </span>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{current + 1}/{EXERCISES.length}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--line-soft)', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.3rem' }}>Tipo {ex.essayType} — {ex.topic}</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;{ex.prompt}&rdquo;</p>
          </div>

          {/* T — Topic sentence (given) */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 10, background: 'rgba(15,61,140,0.06)', border: '2px solid rgba(15,61,140,0.25)', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>T — Topic sentence (dada)</p>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)', fontWeight: 600 }}>{ex.teel.T}</p>
          </div>

          {/* E1 — Explanation */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#7c3aed', marginBottom: '0.4rem' }}>
              E — Explanation
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 0.4rem', lineHeight: 1.45 }}>{ex.teel.E1label}</p>
            <textarea value={e1} onChange={e => setE1(e.target.value)} rows={3} disabled={assembled}
              placeholder="Explica el mecanismo o la razón detrás del topic sentence..."
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid rgba(124,58,237,0.3)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.93rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          {/* E2 — Example */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#059669', marginBottom: '0.4rem' }}>
              E — Example
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 0.4rem', lineHeight: 1.45 }}>{ex.teel.E2label}</p>
            <textarea value={e2} onChange={e => setE2(e.target.value)} rows={3} disabled={assembled}
              placeholder="For example / For instance / In [Country], ... / According to [source], ..."
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid rgba(5,150,105,0.3)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.93rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          {/* L — Link */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#d97706', marginBottom: '0.4rem' }}>
              L — Link back
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 0.4rem', lineHeight: 1.45 }}>Conecta la evidencia con el argumento general del ensayo. Empieza con: &ldquo;This demonstrates / suggests / shows that...&rdquo;</p>
            <textarea value={lk} onChange={e => setLk(e.target.value)} rows={2} disabled={assembled}
              placeholder="This demonstrates / suggests / shows that..."
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid rgba(217,119,6,0.3)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.93rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          {!assembled && (
            <button className="btn" onClick={() => setAssembled(true)} disabled={!canAssemble} style={{ marginBottom: '1.25rem', opacity: canAssemble ? 1 : 0.5, cursor: canAssemble ? 'pointer' : 'not-allowed' }}>
              Ensamblar párrafo →
            </button>
          )}

          {assembled && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Student paragraph assembled */}
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Tu párrafo ensamblado</p>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink)' }}>
                  <span style={{ background: 'rgba(15,61,140,0.12)', borderRadius: 3, padding: '0 2px' }} title="Topic sentence">{ex.teel.T}</span>
                  {' '}
                  <span style={{ background: 'rgba(124,58,237,0.1)', borderRadius: 3, padding: '0 2px' }} title="Explanation">{e1}</span>
                  {' '}
                  <span style={{ background: 'rgba(5,150,105,0.1)', borderRadius: 3, padding: '0 2px' }} title="Example">{e2}</span>
                  {' '}
                  <span style={{ background: 'rgba(217,119,6,0.1)', borderRadius: 3, padding: '0 2px' }} title="Link">{lk}</span>
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', flexWrap: 'wrap' }}>
                  {[['#0f3d8c', 'T'], ['#7c3aed', 'E explanation'], ['#059669', 'E example'], ['#d97706', 'L']].map(([c, l]) => (
                    <span key={l} style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: `${c}18`, color: c, fontFamily: 'var(--mono)', fontWeight: 600 }}>{l}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-ghost btn-sm" onClick={() => setShowModel(v => !v)} style={{ alignSelf: 'flex-start' }}>
                {showModel ? 'Ocultar modelo' : 'Ver párrafo modelo Band 7 →'}
              </button>

              {showModel && (
                <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Párrafo modelo</p>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink)' }}>
                    <span style={{ background: 'rgba(15,61,140,0.12)', borderRadius: 3, padding: '0 2px' }}>{ex.teel.T}</span>
                    {' '}
                    <span style={{ background: 'rgba(124,58,237,0.1)', borderRadius: 3, padding: '0 2px' }}>{ex.teel.E1model}</span>
                    {' '}
                    <span style={{ background: 'rgba(5,150,105,0.1)', borderRadius: 3, padding: '0 2px' }}>{ex.teel.E2model}</span>
                    {' '}
                    <span style={{ background: 'rgba(217,119,6,0.1)', borderRadius: 3, padding: '0 2px' }}>{ex.teel.Lmodel}</span>
                  </p>
                </div>
              )}

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
