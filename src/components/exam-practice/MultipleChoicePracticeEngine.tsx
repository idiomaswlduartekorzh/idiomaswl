'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { MultipleChoicePassage } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function MultipleChoicePracticeEngine({
  passage,
  accent = '#0369a1',
}: {
  passage: MultipleChoicePassage;
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(answers).length;
  const correct = useMemo(
    () => passage.questions.filter((question) => answers[question.id] === question.answer).length,
    [answers, passage.questions]
  );

  function choose(questionId: string, optionIndex: number) {
    if (answers[questionId] !== undefined) return;
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  }

  function reset() {
    setAnswers({});
    setShowHints({});
    setShowResult(false);
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>{passage.title}</h2>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
        <p style={{ margin: '0 0 0.5rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          Reading passage
        </p>
        <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{passage.passage}</div>
      </article>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((answered / passage.questions.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {passage.questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          const locked = selected !== undefined;
          const isCorrect = selected === question.answer;

          return (
            <article key={question.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Question {questionIndex + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {question.skill}
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.5 }}>{question.question}</h3>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {question.options.map((option, optionIndex) => {
                  const optionIsCorrect = optionIndex === question.answer;
                  const optionIsSelected = selected === optionIndex;
                  let border = '1px solid var(--line-soft)';
                  let background = 'var(--bg-2)';
                  let color = 'var(--ink)';

                  if (locked && optionIsCorrect) {
                    border = '1px solid #059669';
                    background = 'rgba(5,150,105,0.1)';
                    color = '#047857';
                  }

                  if (locked && optionIsSelected && !optionIsCorrect) {
                    border = '1px solid #dc2626';
                    background = 'rgba(220,38,38,0.1)';
                    color = '#b91c1c';
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={locked}
                      onClick={() => choose(question.id, optionIndex)}
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
                      <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && optionIsCorrect ? '#047857' : accent }}>
                        {LETTERS[optionIndex]}.
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowHints((current) => ({ ...current, [question.id]: !current[question.id] }))}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Lightbulb size={15} />
                  Ver trampa
                </button>
              </div>

              {showHints[question.id] && (
                <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                  {question.trap}
                </p>
              )}

              {locked && (
                <div
                  style={{
                    marginTop: '0.75rem',
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
                    <strong>{isCorrect ? 'Correcto.' : `Respuesta correcta: ${LETTERS[question.answer]}.`}</strong>{' '}
                    {question.explanation}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {answered === passage.questions.length && !showResult && (
        <button className="btn btn-sm" type="button" onClick={() => setShowResult(true)} style={{ marginTop: '1rem' }}>
          Ver resultado
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{passage.questions.length} correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Revisa si tus errores vienen de detalle, propósito, inferencia o vocabulario en contexto. Esa etiqueta te dice qué tipo de pregunta practicar después.
          </p>
        </div>
      )}
    </section>
  );
}
