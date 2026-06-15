'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const PROMPT = 'The graph below shows the percentage of households in the UK with access to broadband internet between 2003 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.';

const MODEL_ANSWER = `The line graph illustrates the proportion of UK households with broadband internet access over a twenty-year period from 2003 to 2023.

Overall, there was a dramatic and sustained increase in broadband penetration throughout the period, rising from a very low base to near-universal coverage by 2023.

In 2003, only 4% of households had broadband access. This figure rose steeply over the following decade, reaching approximately 75% by 2013. The most rapid growth occurred between 2003 and 2008, when adoption increased by roughly 40 percentage points.

The rate of growth slowed somewhat in the second decade of the period. Nevertheless, broadband access continued to climb, reaching 93% in 2020 before peaking at 96% in 2023. This suggests that nearly all UK households with the capacity for internet access had adopted broadband by the end of the period.`;

const RUBRIC: { criterion: string; desc: string; bands: { band: string; descriptor: string }[] }[] = [
  {
    criterion: 'Task Achievement',
    desc: '¿Respondiste todo lo que pide la tarea? ¿Cubriste las tendencias principales?',
    bands: [
      { band: '7–9', descriptor: 'Covers all requirements; clearly presents and highlights key features; makes relevant comparisons; data is accurately represented.' },
      { band: '5–6', descriptor: 'Addresses the task; presents main features but may be mechanical or miss some key comparisons.' },
      { band: '3–4', descriptor: 'Attempts task but key features missing; data may be inaccurate or overview absent.' },
    ],
  },
  {
    criterion: 'Coherence & Cohesion',
    desc: '¿Fluye lógicamente tu texto? ¿Usas conectores correctamente?',
    bands: [
      { band: '7–9', descriptor: 'Logical sequencing; cohesive devices used flexibly; clear progression throughout.' },
      { band: '5–6', descriptor: 'Information is generally arranged coherently; some cohesive devices used but may be repetitive.' },
      { band: '3–4', descriptor: 'Some basic cohesion but ideas may be unclear or poorly linked.' },
    ],
  },
  {
    criterion: 'Lexical Resource',
    desc: '¿Variaste el vocabulario? ¿Usaste lenguaje de tendencias y comparación?',
    bands: [
      { band: '7–9', descriptor: 'Wide range; uses paraphrase effectively; rare errors in word choice; appropriate approximation language.' },
      { band: '5–6', descriptor: 'Adequate range; some attempts at less common vocabulary; noticeable errors but meaning is clear.' },
      { band: '3–4', descriptor: 'Limited range; repetition; errors may impede communication.' },
    ],
  },
  {
    criterion: 'Grammatical Range & Accuracy',
    desc: '¿Variaste las estructuras gramaticales? ¿Cuántos errores cometiste?',
    bands: [
      { band: '7–9', descriptor: 'Wide range of structures; majority of sentences error-free; minor errors only.' },
      { band: '5–6', descriptor: 'Mix of simple and complex sentences; some errors but rarely cause misunderstanding.' },
      { band: '3–4', descriptor: 'Mainly simple sentences; frequent errors; may obscure meaning.' },
    ],
  },
];

type Phase = 'intro' | 'writing' | 'scoring' | 'done';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function TareaCompletaPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setPhase('scoring');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timeLeft]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const allScored = RUBRIC.every(r => scores[r.criterion]);
  const avgBand = allScored
    ? (Object.values(scores).reduce((s, v) => s + (v === '7–9' ? 8 : v === '5–6' ? 5.5 : 3.5), 0) / 4).toFixed(1)
    : null;

  function startTimer() {
    setTimerActive(true);
    setPhase('writing');
  }

  function submitEarly() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setPhase('scoring');
  }

  const timerColor = timeLeft < 120 ? '#dc2626' : timeLeft < 300 ? '#d97706' : '#059669';

  if (phase === 'intro') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Tarea Completa</span>
            </div>

            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⏱️ Sub-habilidad 7 — Tarea Completa</p>
            <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Práctica en condiciones reales</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
              20 minutos. 150+ palabras. Cuatro párrafos: Introducción → Overview → Body 1 → Body 2.
              Al terminar, usas la rúbrica oficial para auto-evaluarte.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Introducción', tip: 'Parafrasea el enunciado' },
                { label: 'Overview', tip: 'Tendencia principal, sin cifras' },
                { label: 'Body 1', tip: 'Detalle con datos y tendencias' },
                { label: 'Body 2', tip: 'Comparaciones o segundo grupo' },
              ].map((p, i) => (
                <div key={i} style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{p.label}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{p.tip}</p>
                </div>
              ))}
            </div>

            {/* The prompt */}
            <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Task prompt</p>
              <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--ink)' }}>{PROMPT}</p>
            </div>

            {/* Imaginary chart description */}
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '1.75rem', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: '#d97706' }}>Datos del gráfico:</strong> Línea ascendente.
              2003: 4% · 2005: 18% · 2008: 45% · 2010: 58% · 2013: 75% · 2016: 84% · 2020: 93% · 2023: 96%.
              El crecimiento fue más rápido entre 2003–2008. Se estabilizó a partir de 2016.
            </div>

            <button className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }} onClick={startTimer}>
              Empezar — 20 minutos ⏱️
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'writing') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Timer bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1.5px solid var(--line-soft)', position: 'sticky', top: 8, zIndex: 10 }}>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.25rem', color: timerColor }}>
                ⏱️ {formatTime(timeLeft)}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: wordCount >= 150 ? '#059669' : '#d97706', fontWeight: 700 }}>
                  {wordCount} / 150+ palabras
                </span>
                <button className="btn btn-sm" onClick={submitEarly}>Entregar →</button>
              </div>
            </div>

            {/* Prompt reminder */}
            <div className="wl-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #0f3d8c', marginBottom: '0.75rem', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              {PROMPT}
            </div>

            {/* Data reminder */}
            <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
              Datos: 2003: 4% · 2005: 18% · 2008: 45% · 2010: 58% · 2013: 75% · 2016: 84% · 2020: 93% · 2023: 96%
            </div>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={'Empieza con tu introducción (paráfrasis del enunciado)...\n\nLuego el Overview.\n\nLuego los párrafos de detalle.'}
              rows={20}
              style={{ width: '100%', padding: '1rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.97rem', fontFamily: 'inherit', lineHeight: 1.75, resize: 'vertical', boxSizing: 'border-box' }}
              autoFocus
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
                {wordCount} palabras {wordCount < 150 ? `— faltan ${150 - wordCount}` : '— ✓ mínimo alcanzado'}
              </span>
              <button className="btn btn-sm" onClick={submitEarly}>Entregar ahora →</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'scoring') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Auto-evaluación</p>
            <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Evalúa tu respuesta</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Lee cada criterio y elige el band que mejor describe tu texto. Sé honesto — es tu herramienta de mejora.
            </p>

            {/* Their text */}
            <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', maxHeight: 200, overflowY: 'auto' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Tu respuesta ({wordCount} palabras)</p>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{text || '(sin texto)'}</p>
            </div>

            {/* Rubric */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {RUBRIC.map(r => (
                <div key={r.criterion} className="wl-card" style={{ padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{r.criterion}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{r.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {r.bands.map(b => {
                      const selected = scores[r.criterion] === b.band;
                      return (
                        <button key={b.band} onClick={() => setScores(s => ({ ...s, [r.criterion]: b.band }))}
                          style={{ textAlign: 'left', padding: '0.65rem 0.85rem', borderRadius: 9, border: selected ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)', background: selected ? 'rgba(15,61,140,0.08)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: selected ? '#0f3d8c' : 'var(--muted)', fontSize: '0.8rem' }}>Band {b.band}</span>
                          <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{b.descriptor}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {allScored && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #0f3d8c', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Band estimado</p>
                <p style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1 }}>{avgBand}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 1rem' }}>
                  {Number(avgBand) >= 7 ? 'Excelente — nivel competitivo para universidades de élite.' : Number(avgBand) >= 5.5 ? 'Buen nivel. Enfócate en el criterio más bajo.' : 'Sigue practicando. Revisa las sub-habilidades 1–6.'}
                </p>
                <button className="btn btn-sm" onClick={() => setShowModel(v => !v)}>
                  {showModel ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo Band 7 →'}
                </button>
              </div>
            )}

            {showModel && (
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Respuesta modelo (Band 7+)</p>
                <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{MODEL_ANSWER}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setPhase('intro'); setText(''); setScores({}); setTimeLeft(20*60); setShowModel(false); }}>
                Intentar de nuevo
              </button>
              <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm">← Volver a Task 1</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
