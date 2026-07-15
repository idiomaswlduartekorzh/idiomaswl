'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { ObjectiveQuestion } from '@/data/practica-exams/seo-catalog';

type ObjectiveAnswer = ObjectiveQuestion['answer'];

const DEFAULT_ANSWERS = ['TRUE', 'FALSE', 'NOT GIVEN'] as const satisfies readonly ObjectiveAnswer[];
const ANSWER_COLORS = {
  TRUE: '#059669',
  YES: '#059669',
  FALSE: '#dc2626',
  NO: '#dc2626',
  'NOT GIVEN': '#d97706',
} as const satisfies Record<ObjectiveAnswer, string>;

export default function ObjectivePracticeEngine({
  questions,
  accent = '#0369a1',
  answers = DEFAULT_ANSWERS,
  resultTip = 'Si fallaste varias con palabras como always, every, immediately o all, tu prioridad es entrenar alcance y cuantificadores.',
}: {
  questions: ObjectiveQuestion[];
  accent?: string;
  answers?: readonly ObjectiveAnswer[];
  resultTip?: string;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, ObjectiveAnswer>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(selectedAnswers).length;
  const correct = useMemo(
    () => questions.filter((question) => selectedAnswers[question.id] === question.answer).length,
    [selectedAnswers, questions]
  );
  const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  function choose(question: ObjectiveQuestion, answer: ObjectiveAnswer) {
    if (selectedAnswers[question.id]) return;
    setSelectedAnswers((current) => ({ ...current, [question.id]: answer }));
  }

  function reset() {
    setSelectedAnswers({});
    setShowHints({});
    setShowResult(false);
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Decide con evidencia, no con intuición</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
              {answered}/{questions.length} respondidas
            </span>
            <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <RotateCcw size={15} />
              Reiniciar
            </button>
          </div>
        </div>

        <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${Math.round((answered / questions.length) * 100)}%`,
              background: accent,
              transition: 'width 0.25s ease',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {questions.map((question, index) => {
          const selected = selectedAnswers[question.id];
          const isCorrect = selected === question.answer;

          return (
            <article key={question.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--mono)', color: accent, fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Statement {index + 1}
                </span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.72rem' }}>
                  Habilidad: {question.skill}
                </span>
              </div>

              <p style={{ margin: '0 0 0.85rem', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.55 }}>
                {question.statement}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {answers.map((answer) => {
                  const active = selected === answer;
                  const answerIsCorrect = answer === question.answer;
                  let border = '1px solid var(--line-soft)';
                  let background = 'var(--bg-2)';
                  let color = 'var(--ink)';

                  if (selected && answerIsCorrect) {
                    border = `1px solid ${ANSWER_COLORS[answer]}`;
                    background = `${ANSWER_COLORS[answer]}18`;
                    color = ANSWER_COLORS[answer];
                  }

                  if (selected && active && !answerIsCorrect) {
                    border = '1px solid #dc2626';
                    background = 'rgba(220,38,38,0.1)';
                    color = '#dc2626';
                  }

                  return (
                    <button
                      key={answer}
                      type="button"
                      disabled={Boolean(selected)}
                      onClick={() => choose(question, answer)}
                      style={{
                        border,
                        background,
                        color,
                        borderRadius: 10,
                        padding: '0.55rem 0.8rem',
                        fontFamily: 'var(--mono)',
                        fontWeight: 900,
                        fontSize: '0.78rem',
                        cursor: selected ? 'default' : 'pointer',
                        minWidth: 88,
                      }}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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

              {selected && (
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
                    <strong>{isCorrect ? 'Correcto.' : `Respuesta correcta: ${question.answer}.`}</strong> {question.explanation}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {answered === questions.length && !showResult && (
        <button className="btn btn-sm" type="button" onClick={() => setShowResult(true)} style={{ marginTop: '1rem' }}>
          Ver resultado
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{questions.length} correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Precisión: {accuracy}%. {resultTip}
          </p>
        </div>
      )}
    </section>
  );
}
