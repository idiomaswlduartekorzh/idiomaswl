'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ModelIntro {
  paraphrase: string;
  thesis: string;
}

interface Exercise {
  original: string;
  type: string;
  models: ModelIntro[];
}

const EXERCISES: Exercise[] = [
  {
    original: 'In many countries, young people are spending increasing amounts of time on social media. Some argue this is damaging their ability to communicate face to face. To what extent do you agree or disagree?',
    type: 'Opinión',
    models: [
      {
        paraphrase: 'The growing use of social networking platforms among younger generations has raised serious concerns about its impact on interpersonal communication skills.',
        thesis: 'While digital connectivity offers certain benefits, I firmly believe that excessive social media use significantly undermines young people\'s ability to engage in meaningful face-to-face interactions.',
      },
      {
        paraphrase: 'It is widely debated whether the time young people dedicate to social media is eroding their capacity for direct communication.',
        thesis: 'In my view, although these platforms facilitate connection across distances, their overuse is detrimental to the development of real-world communication skills.',
      },
    ],
  },
  {
    original: 'Some people believe that governments should invest more in public transportation than in building new roads. To what extent do you agree or disagree?',
    type: 'Opinión',
    models: [
      {
        paraphrase: 'The question of whether public funds should be directed towards improving transit systems rather than expanding road infrastructure has become increasingly relevant in urban planning debates.',
        thesis: 'I strongly agree that prioritising public transport investment is a far more effective and sustainable approach to addressing the mobility challenges facing modern cities.',
      },
      {
        paraphrase: 'There is ongoing disagreement as to whether governments should allocate resources to mass transit or to the construction of additional roads.',
        thesis: 'In my opinion, the evidence overwhelmingly supports investment in public transport, as this approach benefits a greater number of people while simultaneously reducing environmental harm.',
      },
    ],
  },
  {
    original: 'In many cities, air pollution has reached dangerous levels due to the increasing number of vehicles on the roads. What are the main causes of this problem, and what measures can governments take to address it?',
    type: 'Problema-Solución',
    models: [
      {
        paraphrase: 'Urban air quality has deteriorated significantly in numerous cities worldwide, largely as a consequence of the rapid growth in the number of motor vehicles.',
        thesis: 'This essay will examine the primary factors driving this environmental crisis before proposing several governmental strategies that could effectively combat it.',
      },
      {
        paraphrase: 'The sharp decline in air quality observed in many urban centres has been closely linked to a dramatic rise in vehicle numbers in recent decades.',
        thesis: 'After considering the root causes of this issue, this essay will argue that a combination of stricter emissions policy and investment in sustainable transport offers the most viable solution.',
      },
    ],
  },
];

const TIPS = [
  'NUNCA copies el enunciado original. Cambia al menos 3 elementos: el verbo principal, los sustantivos clave y la estructura.',
  'La tesis debe dejar claro tu postura (Opinión) o lo que vas a cubrir (Discusión / Problema-Solución).',
  'Máximo 60 palabras. Una introducción larga roba tiempo y no suma puntos.',
  'No menciones tus argumentos específicos aquí — eso va en los párrafos de cuerpo.',
];

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasCopied(original: string, userText: string): boolean {
  const origWords = original.toLowerCase().split(/\s+/);
  const user = userText.toLowerCase();
  for (let i = 0; i <= origWords.length - 5; i++) {
    const phrase = origWords.slice(i, i + 5).join(' ');
    if (user.includes(phrase)) return true;
  }
  return false;
}

export default function IntroduccionTask2Page() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[current];
  const wc = wordCount(text);
  const copied = hasCopied(ex.original, text);

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
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Introducción</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />✍️ Sub-habilidad 2 — Introducción</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Paraphrase + Thesis</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            Escribe una introducción de dos oraciones: primero parafrasea el tema, luego da tu tesis. Máximo 60 palabras.
          </p>

          <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.6rem' }}>Reglas clave</p>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {TIPS.map((tip, i) => (
                <li key={i} style={{ fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{tip}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{current + 1}/{EXERCISES.length}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Enunciado</p>
              <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 700 }}>{ex.type}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>
              &ldquo;{ex.original}&rdquo;
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>
              Tu introducción (paráfrasis + tesis):
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Escribe aquí tu introducción. Recuerda: paráfrasis primero, tesis después..."
              rows={4}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: wc > 60 ? '#dc2626' : 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: wc > 60 ? 700 : 400 }}>
                {wc} palabras {wc > 60 ? '— excede el límite de 60' : wc > 0 ? `(límite: 60)` : ''}
              </span>
              {wc > 15 && !revealed && (
                <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver análisis →</button>
              )}
            </div>
          </div>

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.75rem' }}>Checklist automático</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    { label: '¿Parafraseaste sin copiar literalmente?', pass: !copied, note: copied ? 'Detectamos frases copiadas del original.' : 'Sin coincidencias exactas detectadas.' },
                    { label: '¿Tiene 60 palabras o menos?', pass: wc <= 60, note: wc <= 60 ? `${wc} palabras — dentro del límite.` : `${wc} palabras — reduce ${wc - 60} palabras.` },
                    { label: '¿Tiene al menos 20 palabras (intro completa)?', pass: wc >= 20, note: wc >= 20 ? 'Longitud adecuada.' : 'Demasiado corta — añade más contenido.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: item.pass ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.05)', border: `1px solid ${item.pass ? 'rgba(5,150,105,0.25)' : 'rgba(220,38,38,0.2)'}` }}>
                      <span style={{ fontSize: '1rem', lineHeight: 1, marginTop: '0.1rem' }}>{item.pass ? '✓' : '✗'}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{item.label}</p>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: item.pass ? '#059669' : '#dc2626' }}>{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Introducciones modelo</p>
              {ex.models.map((m, i) => (
                <div key={i} className="wl-card" style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Modelo {i + 1}</p>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--ink)' }}>
                    <span style={{ background: 'rgba(15,61,140,0.12)', borderRadius: 3, padding: '0 2px' }}>{m.paraphrase}</span>
                    {' '}
                    <span style={{ background: 'rgba(5,150,105,0.12)', borderRadius: 3, padding: '0 2px' }}>{m.thesis}</span>
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 600 }}>azul = paráfrasis</span>
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(5,150,105,0.1)', color: '#059669', fontFamily: 'var(--mono)', fontWeight: 600 }}>verde = tesis</span>
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'var(--bg-2)', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{wordCount(`${m.paraphrase} ${m.thesis}`)} palabras</span>
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
