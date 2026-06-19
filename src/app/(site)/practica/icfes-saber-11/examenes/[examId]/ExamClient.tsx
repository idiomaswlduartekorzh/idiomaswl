'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Simulacro, SimulacroQuestion } from '@/data/mocks/icfes-simulacros';

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function scoreToLevel(correct: number, total: number) {
  const pct = (correct / total) * 100;
  if (pct >= 80) return { label: 'B1', color: '#059669', note: 'Excelente manejo del inglés.' };
  if (pct >= 60) return { label: 'A2', color: '#0369a1', note: 'Buen nivel, sigue practicando.' };
  if (pct >= 40) return { label: 'A1', color: '#d97706', note: 'Hay margen de mejora.' };
  return { label: 'Pre-A1', color: '#dc2626', note: 'Refuerza tus bases de inglés.' };
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// ── Part label helper ───────────────────────────────────────────────────────
function getPartLabel(q: SimulacroQuestion): string {
  switch (q.type) {
    case 'vocab':   return 'Vocabulario — Emparejamiento';
    case 'notice':  return 'Avisos públicos';
    case 'dialog':  return 'Conversaciones';
    case 'gap':     return 'Completar el texto';
    case 'reading': return 'Comprensión de lectura';
  }
}

// ── Passage display ──────────────────────────────────────────────────────────
function PassageBlock({ text, title, isGap }: { text: string; title?: string; isGap?: boolean }) {
  const [collapsed, setCollapsed] = useState(false);

  const renderGapText = (raw: string) => {
    const parts = raw.split(/(\[\d+\])/g);
    return parts.map((p, i) => {
      const m = p.match(/^\[(\d+)\]$/);
      if (m) return (
        <mark key={i} style={{ background: 'rgba(15,61,140,0.12)', color: '#0f3d8c', fontWeight: 700, borderRadius: 4, padding: '0 4px', fontFamily: 'var(--mono)' }}>
          [{m[1]}]
        </mark>
      );
      return <span key={i}>{p}</span>;
    });
  };

  return (
    <div style={{ marginBottom: '1.25rem', borderRadius: 10, border: '1.5px solid rgba(15,61,140,0.18)', overflow: 'hidden' }}>
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: 'rgba(15,61,140,0.06)', cursor: 'pointer', userSelect: 'none' }}
      >
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title ?? 'Texto de lectura'}{isGap ? ' (completa los espacios)' : ''}
        </span>
        <span style={{ fontSize: '0.78rem', color: '#0f3d8c' }}>{collapsed ? '▼ Mostrar' : '▲ Ocultar'}</span>
      </div>
      {!collapsed && (
        <div style={{ padding: '1rem 1.25rem', fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--ink)', maxHeight: 320, overflowY: 'auto', background: 'var(--bg)' }}>
          {text.split('\n\n').map((para, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : '0.9rem 0 0' }}>
              {isGap ? renderGapText(para) : para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Vocab word bank ──────────────────────────────────────────────────────────
function VocabBank({ words }: { words: string[] }) {
  return (
    <div style={{ marginBottom: '1.25rem', padding: '0.9rem 1.1rem', borderRadius: 10, background: 'rgba(15,61,140,0.04)', border: '1.5px solid rgba(15,61,140,0.14)' }}>
      <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>
        Banco de palabras (A – G)
      </p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {words.map((w, i) => (
          <span key={i} style={{ fontSize: '0.83rem', fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--ink)', padding: '0.2rem 0.6rem', borderRadius: 6, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            {OPTION_LETTERS[i]}. {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

type Phase = 'ready' | 'playing' | 'results';

interface Props { exam: Simulacro }

export default function ExamClient({ exam }: Props) {
  const total = exam.totalQuestions;

  const [phase, setPhase] = useState<Phase>('ready');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const [timeLeft, setTimeLeft] = useState(exam.timeMinutes * 60);
  const [submitted, setSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || submitted) return;
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { clearInterval(t); handleSubmit(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, submitted]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setPhase('results');
  }, []);

  function pick(idx: number) {
    if (submitted) return;
    setAnswers(prev => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  }

  const q = exam.questions[current];
  const passage = q.passageId ? exam.passages.find(p => p.id === q.passageId) : null;
  const answered = answers.filter(a => a !== null).length;
  const timerWarning = timeLeft < 300;

  // ── Results ─────────────────────────────────────────────────────────────────
  if (phase === 'results') {
    const correct = answers.filter((a, i) => a === exam.questions[i].answer).length;
    const level = scoreToLevel(correct, total);

    // group by type
    const byType: Record<string, { correct: number; total: number }> = {};
    exam.questions.forEach((q, i) => {
      const label = getPartLabel(q);
      if (!byType[label]) byType[label] = { correct: 0, total: 0 };
      byType[label].total++;
      if (answers[i] === q.answer) byType[label].correct++;
    });

    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            {/* Score header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                {exam.title}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderRadius: '50%', background: `${level.color}18`, border: `3px solid ${level.color}`, marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: level.color, lineHeight: 1, textAlign: 'center' }}>{correct}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textAlign: 'center' }}>/ {total}</div>
                </div>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.3rem' }}>
                Nivel estimado: <span style={{ color: level.color }}>{level.label}</span>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: 0 }}>{level.note}</p>
            </div>

            {/* Breakdown by section */}
            <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 1rem' }}>
                Resultados por sección
              </p>
              {Object.entries(byType).map(([label, stat]) => {
                const pct = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
                const barColor = pct >= 70 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';
                return (
                  <div key={label} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.83rem', color: 'var(--ink)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', fontWeight: 700 }}>
                        {stat.correct}/{stat.total}
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 4, transition: 'width 0.6s' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Question review */}
            <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 1rem' }}>
                Revisión pregunta a pregunta
              </p>
              {exam.questions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.answer;
                const statusColor = userAns === null ? '#94a3b8' : isCorrect ? '#059669' : '#dc2626';
                return (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.65rem 0', borderBottom: i < total - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, color: statusColor, minWidth: 24, paddingTop: 2 }}>
                      {userAns === null ? '–' : isCorrect ? '✓' : '✗'} {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.83rem', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1.5 }}>{q.stem}</p>
                      {!isCorrect && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {userAns !== null && (
                            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: '#dc2626', fontWeight: 700 }}>
                              Tu respuesta: {OPTION_LETTERS[userAns]}. {q.options[userAns]}
                            </span>
                          )}
                          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: '#059669', fontWeight: 700 }}>
                            Correcta: {OPTION_LETTERS[q.answer]}. {q.options[q.answer]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={`/practica/icfes-saber-11/examenes/${exam.id}`} className="btn btn-ghost">
                Repetir simulacro
              </Link>
              <Link href="/practica/icfes-saber-11/examenes" className="btn">
                Otros simulacros →
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Ready screen ─────────────────────────────────────────────────────────────
  if (phase === 'ready') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <Link href="/practica/icfes-saber-11/examenes" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                ← Simulacros
              </Link>
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
              Simulacro oficial ICFES
            </p>
            <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>
              {exam.title}
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {[
                { label: 'Preguntas', value: `${exam.totalQuestions}` },
                { label: 'Tiempo', value: `${exam.timeMinutes} min` },
                { label: 'Grado', value: `${exam.grade}°` },
                { label: 'Año', value: `${exam.year}` },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center', padding: '0.75rem 1.25rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)' }}>{value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem 1.25rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', marginBottom: '1.75rem', textAlign: 'left' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
                • Lee cada pregunta cuidadosamente y elige <strong>UNA</strong> opción.<br/>
                • Puedes navegar entre preguntas y cambiar respuestas antes de finalizar.<br/>
                • El examen termina automáticamente al acabar el tiempo.<br/>
                • Fuente: <em>{exam.source}</em>
              </p>
            </div>
            <button className="btn" style={{ width: '100%', maxWidth: 320, padding: '0.85rem', fontSize: '1rem' }} onClick={() => setPhase('playing')}>
              Empezar simulacro →
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Playing ──────────────────────────────────────────────────────────────────
  const userAnswer = answers[current];
  const partLabel = getPartLabel(q);

  return (
    <section className="wl-section" style={{ paddingTop: '1.5rem' }}>
      <div className="wrap">
        <div style={{ maxWidth: 740, margin: '0 auto' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', fontWeight: 700 }}>
              Pregunta {current + 1} / {total}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                Respondidas: {answered}/{total}
              </span>
              <span style={{ fontSize: '0.9rem', fontFamily: 'var(--mono)', fontWeight: 800, color: timerWarning ? '#dc2626' : '#0f3d8c', padding: '0.25rem 0.65rem', borderRadius: 8, background: timerWarning ? 'rgba(220,38,38,0.08)' : 'rgba(15,61,140,0.08)', border: `1px solid ${timerWarning ? 'rgba(220,38,38,0.25)' : 'rgba(15,61,140,0.2)'}` }}>
                ⏱ {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 4, marginBottom: '1.5rem' }}>
            <div style={{ height: '100%', width: `${((current + 1) / total) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.3s' }} />
          </div>

          {/* Quick jump dots */}
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {Array.from({ length: total }, (_, i) => {
              const isAnswered = answers[i] !== null;
              const isCurrent = i === current;
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 28, height: 28, borderRadius: 6, fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 700,
                    cursor: 'pointer',
                    background: isCurrent ? '#0f3d8c' : isAnswered ? 'rgba(15,61,140,0.18)' : 'var(--bg-2)',
                    color: isCurrent ? '#fff' : isAnswered ? '#0f3d8c' : 'var(--muted)',
                    border: isCurrent ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)',
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Part label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.2rem 0.6rem', borderRadius: 8, background: 'rgba(15,61,140,0.08)', border: '1px solid rgba(15,61,140,0.18)' }}>
              {partLabel}
            </span>
          </div>

          {/* Vocab word bank */}
          {q.type === 'vocab' && q.vocabWords && (
            <VocabBank words={q.vocabWords} />
          )}

          {/* Passage */}
          {passage && (
            <PassageBlock text={passage.text} title={passage.title} isGap={passage.isGap} />
          )}

          {/* Question card */}
          <div className="wl-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>
              Pregunta {current + 1}
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
              {q.stem}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === i;
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.7rem 1rem', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.9rem', lineHeight: 1.5,
                      color: isSelected ? '#0f3d8c' : 'var(--ink)',
                      background: isSelected ? 'rgba(15,61,140,0.07)' : 'var(--bg-2)',
                      border: isSelected ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ minWidth: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, flexShrink: 0, background: isSelected ? '#0f3d8c' : 'var(--bg)', color: isSelected ? '#fff' : 'var(--muted)', border: isSelected ? 'none' : '1px solid var(--line-soft)' }}>
                      {OPTION_LETTERS[i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                ← Anterior
              </button>
              {current < total - 1 && (
                <button
                  className="btn btn-sm"
                  onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
                >
                  Siguiente →
                </button>
              )}
            </div>
            {answered === total && (
              <button
                className="btn"
                onClick={handleSubmit}
                style={{ background: '#059669', borderColor: '#059669', color: '#fff' }}
              >
                Finalizar y ver resultados ✓
              </button>
            )}
            {answered < total && current === total - 1 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleSubmit}
                style={{ color: 'var(--muted)' }}
              >
                Finalizar sin responder todo ({answered}/{total})
              </button>
            )}
          </div>

          {/* Source note */}
          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '2rem', fontStyle: 'italic' }}>
            {exam.source}
          </p>
        </div>
      </div>
    </section>
  );
}
