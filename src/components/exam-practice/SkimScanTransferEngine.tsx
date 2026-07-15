'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LocateFixed, RotateCcw, XCircle } from 'lucide-react';
import type { SkimScanTransferSet } from '@/data/practica-exams/seo-catalog';

export default function SkimScanTransferEngine({
  practice,
  practices,
  accent = '#0369a1',
}: {
  practice?: SkimScanTransferSet;
  practices?: SkimScanTransferSet[];
  accent?: string;
}) {
  const [moves, setMoves] = useState<Record<string, 'skim' | 'scan'>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const practiceSets = practices ?? (practice ? [practice] : []);
  const tasks = practiceSets.flatMap((item) => item.tasks);

  const correctMoves = useMemo(
    () => tasks.filter((task) => moves[task.id] === task.firstMove).length,
    [moves, tasks]
  );
  const attemptedMoves = Object.keys(moves).length;
  const revealedCount = tasks.filter((task) => revealed[task.id]).length;

  function reset() {
    setMoves({});
    setRevealed({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Transferencia skimming + scanning</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>
            Banco de transferencia: del mapa a la evidencia
          </h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Practica cuándo conviene empezar con skimming y cuándo conviene empezar con scanning. Cada set exige decidir, justificar y revelar evidencia.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--ink)', fontSize: '1.05rem' }}>Cómo usar este banco</h3>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
          Si la pregunta pide función, ubicación o propósito general, empieza con skimming. Si ya trae una señal concreta como fecha, número, nombre o frase límite, empieza con scanning.
        </p>
      </article>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem', marginBottom: '1.2rem' }}>
        {[
          { label: 'Decisiones correctas', value: `${correctMoves}/${tasks.length}` },
          { label: 'Preguntas intentadas', value: `${attemptedMoves}/${tasks.length}` },
          { label: 'Evidencias reveladas', value: `${revealedCount}/${tasks.length}` },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {practiceSets.map((practiceSet, setIndex) => (
          <section key={practiceSet.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, background: 'var(--bg)' }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {setIndex + 1}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practiceSet.title}</h3>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {practiceSet.instructions}
              </p>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Tiempo objetivo:</strong> {practiceSet.timeTarget}
              </p>
              <h4 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{practiceSet.passageTitle}</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {practiceSet.passage.map((paragraph) => (
                  <section key={`${practiceSet.id}-${paragraph.id}`} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.85rem', background: 'var(--bg-2)' }}>
                    <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      {paragraph.label} · {paragraph.function}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.7 }}>{paragraph.text}</p>
                  </section>
                ))}
              </div>
            </article>

            {practiceSet.tasks.map((task, index) => {
              const selectedMove = moves[task.id];
              const locked = selectedMove !== undefined;
              const isCorrect = selectedMove === task.firstMove;
              const isRevealed = Boolean(revealed[task.id]);

              return (
                <article key={task.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
                  <p style={{ margin: '0 0 0.4rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Set {setIndex + 1} · Pregunta {index + 1}
                  </p>
                  <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{task.question}</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.55rem', marginBottom: locked ? '0.75rem' : 0 }}>
                    {[
                      { key: 'skim' as const, label: 'Empezar con skimming', icon: <Eye size={16} /> },
                      { key: 'scan' as const, label: 'Empezar con scanning', icon: <LocateFixed size={16} /> },
                    ].map((option) => {
                      const selected = selectedMove === option.key;
                      let border = '1px solid var(--line-soft)';
                      let background = 'var(--bg-2)';
                      let color = 'var(--ink)';

                      if (locked && option.key === task.firstMove) {
                        border = '1px solid #059669';
                        background = 'rgba(5,150,105,0.1)';
                        color = '#047857';
                      }
                      if (locked && selected && !isCorrect) {
                        border = '1px solid #dc2626';
                        background = 'rgba(220,38,38,0.1)';
                        color = '#b91c1c';
                      }

                      return (
                        <button
                          key={option.key}
                          type="button"
                          disabled={locked}
                          onClick={() => setMoves((current) => ({ ...current, [task.id]: option.key }))}
                          style={{
                            border,
                            background,
                            color,
                            borderRadius: 12,
                            padding: '0.65rem 0.75rem',
                            font: 'inherit',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            justifyContent: 'center',
                            cursor: locked ? 'default' : 'pointer',
                          }}
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {locked && (
                    <div style={{ display: 'grid', gap: '0.65rem' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '24px 1fr',
                          gap: '0.55rem',
                          alignItems: 'start',
                          color: isCorrect ? '#047857' : '#b91c1c',
                          background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                          borderRadius: 12,
                          padding: '0.7rem',
                          fontSize: '0.88rem',
                          lineHeight: 1.55,
                        }}
                      >
                        {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        <span>
                          <strong>{isCorrect ? 'Buen primer movimiento.' : `Mejor empezar con ${task.firstMove}.`}</strong>{' '}
                          {task.explanation}
                        </span>
                      </div>

                      <button
                        className="btn btn-ghost btn-sm"
                        type="button"
                        onClick={() => setRevealed((current) => ({ ...current, [task.id]: true }))}
                        disabled={isRevealed}
                        style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <LocateFixed size={15} />
                        {isRevealed ? 'Evidencia revelada' : 'Revelar párrafo y señal'}
                      </button>

                      {isRevealed && (
                        <div style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)', display: 'grid', gap: '0.45rem' }}>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Párrafo:</strong> {task.paragraphAnswer}
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Señal:</strong> {task.signalAnswer}
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> “{task.evidence}”.
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {task.trap}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </section>
  );
}
