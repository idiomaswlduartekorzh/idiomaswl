'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, RotateCcw, Timer, XCircle } from 'lucide-react';
import type { SkimmingPracticeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function SkimmingPracticeEngine({
  practice,
  accent = '#0369a1',
}: {
  practice: SkimmingPracticeSet;
  accent?: string;
}) {
  const [summaryAnswer, setSummaryAnswer] = useState<number | null>(null);
  const [mapAnswers, setMapAnswers] = useState<Record<string, number>>({});
  const [showPassage, setShowPassage] = useState(true);

  const mapCorrect = useMemo(
    () => practice.paragraphMap.filter((item) => mapAnswers[item.id] === item.answer).length,
    [mapAnswers, practice.paragraphMap]
  );
  const answeredMap = Object.keys(mapAnswers).length;
  const summaryCorrect = summaryAnswer === practice.summaryQuestion.answer;

  function reset() {
    setSummaryAnswer(null);
    setMapAnswers({});
    setShowPassage(true);
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>{practice.title}</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            {practice.instructions}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => setShowPassage((value) => !value)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Eye size={15} />
            {showPassage ? 'Ocultar texto' : 'Ver texto'}
          </button>
          <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <RotateCcw size={15} />
            Reiniciar
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Objetivo', value: 'mapa general' },
          { label: 'Tiempo sugerido', value: practice.timeTarget },
          { label: 'No hagas', value: 'traducción palabra por palabra' },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      {showPassage && (
        <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: accent, marginBottom: '0.45rem' }}>
            <Timer size={17} />
            <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Skim first, answer after
            </p>
          </div>
          <h3 style={{ margin: '0 0 0.6rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practice.passageTitle}</h3>
          <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{practice.passage}</div>
        </article>
      )}

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.45rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          Paso 1 · resumen global
        </p>
        <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{practice.summaryQuestion.question}</h3>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {practice.summaryQuestion.options.map((option, optionIndex) => {
            const locked = summaryAnswer !== null;
            const isCorrect = optionIndex === practice.summaryQuestion.answer;
            const isSelected = summaryAnswer === optionIndex;
            let border = '1px solid var(--line-soft)';
            let background = 'var(--bg-2)';
            let color = 'var(--ink)';

            if (locked && isCorrect) {
              border = '1px solid #059669';
              background = 'rgba(5,150,105,0.1)';
              color = '#047857';
            }

            if (locked && isSelected && !isCorrect) {
              border = '1px solid #dc2626';
              background = 'rgba(220,38,38,0.1)';
              color = '#b91c1c';
            }

            return (
              <button
                key={option}
                type="button"
                disabled={locked}
                onClick={() => setSummaryAnswer(optionIndex)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr',
                  gap: '0.6rem',
                  alignItems: 'start',
                  textAlign: 'left',
                  border,
                  background,
                  color,
                  borderRadius: 12,
                  padding: '0.65rem 0.75rem',
                  font: 'inherit',
                  lineHeight: 1.45,
                  cursor: locked ? 'default' : 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && isCorrect ? '#047857' : accent }}>
                  {LETTERS[optionIndex]}.
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {summaryAnswer !== null && (
          <div
            style={{
              marginTop: '0.75rem',
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: '0.55rem',
              alignItems: 'start',
              color: summaryCorrect ? '#047857' : '#b91c1c',
              background: summaryCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
              borderRadius: 12,
              padding: '0.7rem',
              fontSize: '0.88rem',
              lineHeight: 1.55,
            }}
          >
            {summaryCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span>
              <strong>{summaryCorrect ? 'Correcto.' : `Respuesta correcta: ${LETTERS[practice.summaryQuestion.answer]}.`}</strong>{' '}
              {practice.summaryQuestion.explanation}
            </span>
          </div>
        )}

        {summaryAnswer !== null && !summaryCorrect && (
          <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.4rem' }}>
            {practice.summaryQuestion.traps.map((trap) => (
              <p key={trap} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.86rem' }}>
                {trap}
              </p>
            ))}
          </div>
        )}
      </article>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
        <p style={{ margin: '0 0 0.45rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          Paso 2 · mapa de párrafos
        </p>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {practice.paragraphMap.map((item) => {
            const selected = mapAnswers[item.id];
            const locked = selected !== undefined;

            return (
              <section key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.85rem', background: 'var(--bg-2)' }}>
                <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{item.label}</h3>
                <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{item.text}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.45rem' }}>
                  {item.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === item.answer;
                    const isSelected = selected === optionIndex;
                    let border = '1px solid var(--line-soft)';
                    let background = 'var(--bg)';
                    let color = 'var(--ink)';

                    if (locked && isCorrect) {
                      border = '1px solid #059669';
                      background = 'rgba(5,150,105,0.1)';
                      color = '#047857';
                    }

                    if (locked && isSelected && !isCorrect) {
                      border = '1px solid #dc2626';
                      background = 'rgba(220,38,38,0.1)';
                      color = '#b91c1c';
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={locked}
                        onClick={() => setMapAnswers((current) => ({ ...current, [item.id]: optionIndex }))}
                        style={{
                          border,
                          background,
                          color,
                          borderRadius: 10,
                          padding: '0.55rem 0.65rem',
                          font: 'inherit',
                          textAlign: 'left',
                          cursor: locked ? 'default' : 'pointer',
                          lineHeight: 1.35,
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {locked && (
                  <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    {item.explanation}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        {answeredMap === practice.paragraphMap.length && (
          <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
              Mapa: {mapCorrect}/{practice.paragraphMap.length} funciones correctas
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
              Si fallaste, vuelve a mirar la primera oración de cada párrafo y los conectores de giro. Skimming mejora cuando nombras la función, no cuando traduces más.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}
