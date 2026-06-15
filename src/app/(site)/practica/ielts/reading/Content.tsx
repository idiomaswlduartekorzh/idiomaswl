'use client';

import { useState } from 'react';
import Link from 'next/link';

const C = '#0369a1';

const PASSAGE = `The Amazon rainforest is located mainly in Brazil, though it also extends into several other South American countries. It covers approximately 5.5 million square kilometres, making it the world's largest tropical rainforest. Scientists estimate that the Amazon produces around 20% of the world's oxygen through photosynthesis, which is why it is often called "the lungs of the planet." The rainforest is also home to approximately 10% of all animal species on Earth.

In recent decades, deforestation has significantly reduced the size of the Amazon. According to scientists, approximately 17% of the Amazon has been lost in the last 50 years due to logging, agriculture, and urban expansion. Conservation organizations around the world have called for urgent action to protect the remaining forest.`;

type Answer = 'TRUE' | 'FALSE' | 'NOT GIVEN';

const STATEMENTS: { statement: string; answer: Answer; explanation: string }[] = [
  { statement: 'The Amazon rainforest is located exclusively in Brazil.', answer: 'FALSE', explanation: '"Mainly in Brazil" but also extends into other South American countries — so "exclusively" is FALSE.' },
  { statement: 'The Amazon covers more than 5 million square kilometres.', answer: 'TRUE', explanation: '"Approximately 5.5 million square kilometres" — this is more than 5 million, so TRUE.' },
  { statement: 'The Amazon produces all of the world\'s oxygen.', answer: 'FALSE', explanation: '"Around 20% of the world\'s oxygen" — not ALL. So FALSE.' },
  { statement: 'The Amazon rainforest is the largest tropical rainforest in the world.', answer: 'TRUE', explanation: '"The world\'s largest tropical rainforest" is stated directly — TRUE.' },
  { statement: 'Scientists believe the Amazon is home to more than 10% of animal species.', answer: 'FALSE', explanation: 'The text says "approximately 10%" not "more than 10%" — FALSE.' },
  { statement: 'Deforestation in the Amazon is caused only by logging.', answer: 'FALSE', explanation: '"Logging, agriculture, and urban expansion" — multiple causes, not only logging. FALSE.' },
  { statement: 'The Amazon is sometimes called "the lungs of the planet".', answer: 'TRUE', explanation: 'Directly stated in the text — TRUE.' },
  { statement: 'The Brazilian government has introduced new laws to protect the Amazon.', answer: 'NOT GIVEN', explanation: 'The text mentions conservation organizations calling for action, but says nothing about specific Brazilian government laws — NOT GIVEN.' },
];

const OPTIONS: Answer[] = ['TRUE', 'FALSE', 'NOT GIVEN'];
const OPT_COLOR: Record<Answer, string> = { TRUE: '#059669', FALSE: '#dc2626', 'NOT GIVEN': '#d97706' };

export default function IELTSReadingContent() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const done = Object.keys(answers).length;
  const correct = STATEMENTS.filter((s, i) => answers[i] === s.answer).length;

  function pick(qi: number, val: Answer) {
    if (answers[qi]) return;
    setAnswers(p => ({ ...p, [qi]: val }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 760 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📖 Reading</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📖 IELTS Academic — Reading</p>
        <h1 style={{ fontSize: '1.9rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>True / False / Not Given</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', lineHeight: 1.65 }}>
          Lee el pasaje y decide si cada afirmación es <strong style={{ color: '#059669' }}>TRUE</strong>, <strong style={{ color: '#dc2626' }}>FALSE</strong> o <strong style={{ color: '#d97706' }}>NOT GIVEN</strong> según la información del texto.
        </p>

        {/* Strategy box */}
        <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: `${C}08`, border: `1px solid ${C}22`, marginBottom: '1.75rem', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>Estrategia:</strong>{' '}
          TRUE = el texto lo afirma explícitamente ·
          FALSE = el texto contradice la afirmación ·
          NOT GIVEN = el texto no menciona el tema de la afirmación (nunca asumas).
        </div>

        {/* Passage */}
        <div className="wl-card" style={{ padding: '1.5rem', borderLeft: `4px solid ${C}`, marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Reading Passage</p>
          <div style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink-2)', whiteSpace: 'pre-line' }}>{PASSAGE}</div>
        </div>

        {/* Progress bar */}
        {done > 0 && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / STATEMENTS.length) * 100}%`, background: C, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{done}/{STATEMENTS.length}</span>
          </div>
        )}

        {/* Questions */}
        {!showResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {STATEMENTS.map((s, qi) => {
              const ans = answers[qi];
              const isDone = !!ans;
              return (
                <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                    Statement {qi + 1}
                  </div>
                  <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem', lineHeight: 1.6 }}>
                    &ldquo;{s.statement}&rdquo;
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {OPTIONS.map(opt => {
                      const isCorrect = opt === s.answer;
                      const isSelected = ans === opt;
                      let bg = 'var(--bg-2)', border = '1px solid var(--line-soft)', color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = `${OPT_COLOR[opt]}18`; border = `1px solid ${OPT_COLOR[opt]}`; color = OPT_COLOR[opt]; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={opt} onClick={() => pick(qi, opt)} disabled={isDone}
                          style={{ padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 800, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'var(--mono)', letterSpacing: '0.04em', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && (
                    <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === s.answer ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', lineHeight: 1.6 }}>
                      {ans === s.answer ? '✅ ' : `✗ La respuesta es ${s.answer}. `}{s.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {done === STATEMENTS.length && !showResult && (
          <button className="btn btn-sm" style={{ marginTop: '1rem' }} onClick={() => setShowResult(true)}>Ver resultado →</button>
        )}

        {showResult && (
          <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct >= 6 ? '🎉' : correct >= 4 ? '⭐' : '📚'}</div>
            <h2 style={{ margin: '0 0 0.5rem', color: 'var(--ink)' }}>{correct} / {STATEMENTS.length} correctas</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
              {correct >= 6 ? '¡Excelente comprensión lectora!' : correct >= 4 ? 'Buen intento. Revisa los errores.' : 'Vuelve a leer el texto con cuidado.'}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.83rem', fontStyle: 'italic', maxWidth: 460, margin: '0 auto 1.25rem' }}>
              En IELTS, True/False/Not Given es una de las secciones más difíciles. La clave: no asumas — solo marca lo que el texto dice explícitamente.
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
              <Link href="/practica/ielts" className="btn btn-ghost btn-sm">← Volver a IELTS</Link>
            </div>
          </div>
        )}

        {/* Coming soon */}
        {!showResult && (
          <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.6rem' }}>Próximamente en Reading</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Matching Headings', 'Multiple Choice', 'Summary Completion', 'Sentence Completion'].map(t => (
                <span key={t} style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: `${C}08`, color: C, border: `1px solid ${C}22`, fontFamily: 'var(--mono)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
