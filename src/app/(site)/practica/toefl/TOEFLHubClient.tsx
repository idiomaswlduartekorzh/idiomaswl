'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── TOEFL Reading — Multiple Choice ─────────────────────────────────────────

const PASSAGE = `Bioluminescence is the production and emission of light by living organisms. This phenomenon occurs in a wide variety of organisms, including bacteria, fungi, jellyfish, fireflies, and deep-sea fish. The chemical reaction responsible for bioluminescence involves a compound called luciferin, which reacts with oxygen in the presence of an enzyme called luciferase. This reaction releases energy in the form of light with very little heat, which is why bioluminescence is often called "cold light."

In marine environments, bioluminescence is particularly common. It is estimated that more than 75% of deep-sea organisms are capable of producing light. Scientists believe bioluminescence serves several functions: attracting prey, communicating with potential mates, confusing predators, and providing camouflage by matching the dim light from above.

Research into bioluminescence has also led to important advances in medicine and biology. Scientists have used the genes responsible for bioluminescence to create "reporter genes," which allow researchers to track biological processes inside living cells. This technique has contributed to breakthroughs in cancer research and the development of new diagnostic tools.`;

interface MCQItem {
  question: string;
  opts: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: MCQItem[] = [
  {
    question: 'According to the passage, what is bioluminescence?',
    opts: [
      'A chemical compound found in deep-sea fish',
      'The production and emission of light by living organisms',
      'A type of enzyme that reacts with oxygen',
      'A technique used in cancer research',
    ],
    answer: 1,
    explanation: 'The passage directly states: "Bioluminescence is the production and emission of light by living organisms."',
  },
  {
    question: 'Why is bioluminescence called "cold light"?',
    opts: [
      'Because it only occurs in cold ocean waters',
      'Because the light is blue or green in color',
      'Because the reaction releases light with very little heat',
      'Because luciferin is a cold-temperature compound',
    ],
    answer: 2,
    explanation: '"This reaction releases energy in the form of light with very little heat, which is why bioluminescence is often called \'cold light.\'"',
  },
  {
    question: 'What percentage of deep-sea organisms can produce light, according to scientists?',
    opts: [
      'More than 50%',
      'Exactly 75%',
      'Less than 25%',
      'More than 75%',
    ],
    answer: 3,
    explanation: '"It is estimated that more than 75% of deep-sea organisms are capable of producing light."',
  },
  {
    question: 'Which of the following is NOT mentioned as a function of bioluminescence?',
    opts: [
      'Attracting prey',
      'Regulating body temperature',
      'Confusing predators',
      'Communicating with mates',
    ],
    answer: 1,
    explanation: 'The passage lists attracting prey, communicating with mates, confusing predators, and camouflage — but does NOT mention regulating body temperature.',
  },
  {
    question: 'How have scientists applied bioluminescence research to medicine?',
    opts: [
      'By using luciferin to treat cancer directly',
      'By creating reporter genes to track biological processes in cells',
      'By developing new bioluminescent bacteria for hospitals',
      'By producing artificial light for surgical procedures',
    ],
    answer: 1,
    explanation: '"Scientists have used the genes responsible for bioluminescence to create \'reporter genes,\' which allow researchers to track biological processes inside living cells."',
  },
  {
    question: 'The word "breakthroughs" in the final paragraph most nearly means:',
    opts: [
      'Failures in experiments',
      'Major scientific advances',
      'Small gradual improvements',
      'Dangerous side effects',
    ],
    answer: 1,
    explanation: '"Breakthroughs" refers to significant, sudden advances or discoveries in a field.',
  },
];

function TOEFLReadingExercise() {
  const [answers, setAnswers]   = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const done = Object.keys(answers).length;
  const correct = QUESTIONS.filter((q, i) => answers[i] === q.answer).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Passage */}
      <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #1a4fcc' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Reading Passage — Bioluminescence</p>
        <div style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink-2)', whiteSpace: 'pre-line' }}>{PASSAGE}</div>
      </div>

      {/* Instructions */}
      <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: 'rgba(26,79,204,0.07)', border: '1px solid rgba(26,79,204,0.2)', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
        <strong style={{ color: 'var(--wl-on-panel-link, #1a4fcc)' }}>Instrucciones:</strong> Para cada pregunta, elige la mejor respuesta basada en la información del pasaje. El tiempo en TOEFL iBT para Reading es de ~18 min por pasaje.
      </div>

      {/* Progress */}
      {done > 0 && !showResult && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${(done / QUESTIONS.length) * 100}%`, background: '#1a4fcc', borderRadius: 4, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{done}/{QUESTIONS.length}</span>
        </div>
      )}

      {/* Questions */}
      {!showResult && QUESTIONS.map((q, qi) => {
        const ans = answers[qi];
        const isDone = ans !== undefined;
        return (
          <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--wl-on-panel-link, #1a4fcc)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              Question {qi + 1} of {QUESTIONS.length}
            </div>
            <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem', lineHeight: 1.65 }}>{q.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {q.opts.map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const isSelected = ans === oi;
                let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
                if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                return (
                  <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                    style={{ textAlign: 'left', padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.92rem', cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s', lineHeight: 1.5 }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.6, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                    {isDone && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                    {isDone && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                  </button>
                );
              })}
            </div>
            {revealed[qi] && (
              <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === q.answer ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', lineHeight: 1.6 }}>
                {ans === q.answer ? '✅ ' : `✗ The correct answer is (${String.fromCharCode(65 + q.answer)}). `}{q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {done === QUESTIONS.length && !showResult && (
        <button className="btn btn-sm" onClick={() => setShowResult(true)}>Ver resultado →</button>
      )}

      {showResult && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct >= 5 ? '🎉' : correct >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.5rem', color: 'var(--ink)' }}>{correct} / {QUESTIONS.length}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
            {correct >= 5 ? '¡Excelente! Listo/a para TOEFL Reading.' : correct >= 3 ? 'Buen intento. Practica leyendo pasajes académicos.' : 'Vuelve al texto y lee cada sección con cuidado.'}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.83rem', margin: '0 0 1.25rem', fontStyle: 'italic' }}>
            En el TOEFL iBT, el Reading tiene 10 preguntas por pasaje. El secreto: siempre vuelve al texto para verificar tu respuesta.
          </p>
          <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'reading', label: 'Reading', icon: '📖', desc: 'Multiple Choice · Pasaje académico' },
  { id: 'listening', label: 'Listening', icon: '🎧', desc: 'Próximamente' },
  { id: 'speaking', label: 'Speaking', icon: '🗣️', desc: 'Próximamente' },
  { id: 'writing', label: 'Writing', icon: '✏️', desc: 'Próximamente' },
];

export default function TOEFLHubClient() {
  const [section, setSection] = useState<string | null>(null);

  if (!section) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <Link href="/practica" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Práctica</Link>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Práctica / TOEFL</span>
            </div>

            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🇺🇸 TOEFL iBT</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Práctica de TOEFL</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem' }}>
              El TOEFL iBT evalúa Reading, Listening, Speaking y Writing. Score objetivo: 80–110.
            </p>

            {/* Score scale */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {[['0-41','Básico','#dc2626'],['42-71','Intermedio','#f59e0b'],['72-94','Avanzado','#1a4fcc'],['95-120','Superior','#059669']].map(([score,label,color]) => (
                <span key={score} className="wl-score-chip" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: `${color}15`, color, border: `1px solid ${color}40`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                  {score} — {label}
                </span>
              ))}
            </div>

            <div className="wl-exams-catalog">
              {SECTIONS.map(s => (
                <button key={s.id}
                  onClick={() => s.id === 'reading' && setSection(s.id)}
                  className={`wl-catalog-card${s.id !== 'reading' ? ' wl-catalog-card--soon' : ''}`}
                  style={{ '--exam-color': '#1a4fcc', textAlign: 'left', cursor: s.id === 'reading' ? 'pointer' : 'default', appearance: 'none', WebkitAppearance: 'none', margin: 0, padding: 0, font: 'inherit', color: 'inherit', display: 'flex', flexDirection: 'column' } as React.CSSProperties}
                >
                  <div className="wl-catalog-card__bar" />
                  <div className="wl-catalog-card__body">
                    <div className="wl-catalog-card__top">
                      <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                      {s.id !== 'reading' && <span className="wl-catalog-card__badge">Próximamente</span>}
                    </div>
                    <h2 className="wl-catalog-card__name">{s.label}</h2>
                    <p className="wl-catalog-card__tagline">{s.desc}</p>
                  </div>
                  <div className="wl-catalog-card__footer">
                    <span>TOEFL iBT</span>
                    <span className="wl-catalog-card__cta">{s.id === 'reading' ? 'Practicar →' : 'Próximamente'}</span>
                  </div>
                </button>
              ))}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button onClick={() => setSection(null)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← TOEFL</button>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>TOEFL / Reading</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />📖 TOEFL Reading — Multiple Choice</p>
          <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Lee el pasaje académico y responde las preguntas de opción múltiple. En el TOEFL real tendrías ~18 minutos.
          </p>
          <TOEFLReadingExercise />
        </div>
      </div>
    </section>
  );
}
