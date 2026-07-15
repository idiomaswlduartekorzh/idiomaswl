'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { ShortAnswerPassage } from '@/data/practica-exams/seo-catalog';

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ');
}

function wordCount(value: string) {
  const normalized = normalizeAnswer(value);
  return normalized ? normalized.split(' ').length : 0;
}

export default function ShortAnswerEngine({
  passage,
  accent = '#be123c',
}: {
  passage: ShortAnswerPassage;
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const correct = useMemo(
    () =>
      passage.questions.filter((question) => {
        if (!checked[question.id]) return false;
        const accepted = [question.answer, ...(question.alternatives ?? [])].map(normalizeAnswer);
        return accepted.includes(normalizeAnswer(answers[question.id] ?? ''));
      }).length,
    [answers, checked, passage.questions]
  );
  const checkedCount = Object.keys(checked).length;

  function update(questionId: string, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setChecked((current) => {
      const next = { ...current };
      delete next[questionId];
      return next;
    });
  }

  function check(questionId: string) {
    if (!answers[questionId]?.trim()) return;
    setChecked((current) => ({ ...current, [questionId]: true }));
  }

  function reset() {
    setAnswers({});
    setChecked({});
    setShowHints({});
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
        <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.05rem', color: 'var(--ink)' }}>{passage.passageTitle}</h3>
        <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{passage.passage}</div>
      </article>

      <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1rem' }}>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{passage.instructions}</p>
        <span style={{ justifySelf: 'start', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', color: accent, border: `1px solid ${accent}30`, background: `${accent}10`, borderRadius: 999, padding: '0.35rem 0.55rem' }}>
          {passage.wordLimit}
        </span>
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((checkedCount / passage.questions.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {passage.questions.map((question, index) => {
          const value = answers[question.id] ?? '';
          const isChecked = Boolean(checked[question.id]);
          const accepted = [question.answer, ...(question.alternatives ?? [])].map(normalizeAnswer);
          const isCorrect = accepted.includes(normalizeAnswer(value));
          const exceedsLimit = wordCount(value) > passage.maxWords;

          return (
            <article key={question.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Question {index + 1}
                </span>
                <span style={{ color: exceedsLimit ? '#b91c1c' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {wordCount(value)}/{passage.maxWords} words
                </span>
              </div>

              <p style={{ margin: '0 0 0.65rem', color: 'var(--ink)', lineHeight: 1.6, fontWeight: 800 }}>
                {question.question}
              </p>

              <input
                aria-label={`Question ${index + 1}`}
                value={value}
                disabled={isChecked}
                onChange={(event) => update(question.id, event.target.value)}
                placeholder="your answer"
                style={{
                  width: 'min(100%, 360px)',
                  border: `1px solid ${isChecked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`,
                  background: isChecked ? (isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)') : 'var(--bg-2)',
                  borderRadius: 10,
                  padding: '0.55rem 0.65rem',
                  color: 'var(--ink)',
                  font: 'inherit',
                  fontWeight: 800,
                }}
              />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button type="button" className="btn btn-sm" disabled={!value.trim() || isChecked} onClick={() => check(question.id)}>
                  Revisar
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowHints((current) => ({ ...current, [question.id]: !current[question.id] }))}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Lightbulb size={15} />
                  Pista
                </button>
              </div>

              {showHints[question.id] && (
                <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                  {question.hint}
                </p>
              )}

              {isChecked && (
                <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.75rem' }}>
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
                      <strong>{isCorrect ? 'Correcto.' : `Respuesta correcta: ${question.answer}.`}</strong>{' '}
                      {question.explanation}
                    </span>
                  </div>

                  {!isCorrect && (
                    <p style={{ margin: 0, display: 'grid', gridTemplateColumns: '22px 1fr', gap: '0.45rem', alignItems: 'start', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                      <AlertTriangle size={16} color={accent} />
                      <span>{question.trap}</span>
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {checkedCount === passage.questions.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{passage.questions.length} correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si una respuesta falló, revisa si respondiste la pregunta exacta, si copiaste palabras del pasaje y si respetaste el límite.
          </p>
        </div>
      )}
    </section>
  );
}
