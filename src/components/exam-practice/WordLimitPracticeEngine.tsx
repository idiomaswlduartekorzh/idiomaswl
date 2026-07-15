'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, FileCheck2, RotateCcw, XCircle } from 'lucide-react';
import type { WordLimitPracticeSet } from '@/data/practica-exams/seo-catalog';

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function countWords(value: string) {
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (!cleaned) return 0;
  return cleaned.split(' ').length;
}

export default function WordLimitPracticeEngine({
  practice,
  practices,
  accent = '#b45309',
}: {
  practice?: WordLimitPracticeSet;
  practices?: WordLimitPracticeSet[];
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const practiceSets = practices ?? (practice ? [practice] : []);
  const questions = practiceSets.flatMap((set) => set.questions);
  const checkedCount = Object.keys(checked).length;
  const correctCount = useMemo(
    () =>
      questions.filter((question) => {
        if (!checked[question.id]) return false;
        const accepted = [question.answer, ...(question.alternatives ?? [])].map(normalizeAnswer);
        return accepted.includes(normalizeAnswer(answers[question.id] ?? '')) && countWords(answers[question.id] ?? '') <= 2;
      }).length,
    [answers, checked, questions]
  );

  function reset() {
    setAnswers({});
    setChecked({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Banco de límite de palabras IELTS Reading</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Escribe solo palabras del pasaje. El objetivo es copiar la unidad mínima, respetar la instrucción y verificar que la frase final funcione.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: String(practiceSets.length) },
          { label: 'Gaps', value: String(questions.length) },
          { label: 'Regla', value: 'copia solo lo necesario' },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((checkedCount / questions.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {practiceSets.map((practiceSet, setIndex) => (
          <section key={practiceSet.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: accent, marginBottom: '0.45rem' }}>
                <FileCheck2 size={17} />
                <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Set {setIndex + 1} · {practiceSet.wordLimit}
                </p>
              </div>
              <h3 style={{ margin: '0 0 0.25rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practiceSet.passageTitle}</h3>
              <p style={{ margin: '0 0 0.6rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                {practiceSet.instructions} Meta: {practiceSet.timeTarget}.
              </p>
              <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{practiceSet.passage}</div>
            </article>

            {practiceSet.questions.map((question, index) => {
          const value = answers[question.id] ?? '';
          const isChecked = Boolean(checked[question.id]);
          const accepted = [question.answer, ...(question.alternatives ?? [])].map(normalizeAnswer);
          const wordCount = countWords(value);
          const withinLimit = wordCount <= 2;
          const isCorrect = accepted.includes(normalizeAnswer(value)) && withinLimit;
          const updateAnswer = (nextValue: string) => {
            setAnswers((current) => ({ ...current, [question.id]: nextValue }));
            setChecked((current) => {
              const next = { ...current };
              delete next[question.id];
              return next;
            });
          };

          return (
            <article key={question.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Set {setIndex + 1} · Gap {index + 1}
                </span>
                <span style={{ color: withinLimit ? 'var(--muted)' : '#b91c1c', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {wordCount}/2 palabras
                </span>
              </div>

              <label style={{ display: 'grid', gap: '0.55rem' }}>
                <span style={{ color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {question.before}{' '}
                  <input
                    value={value}
                    onInput={(event) => updateAnswer(event.currentTarget.value)}
                    onChange={(event) => updateAnswer(event.currentTarget.value)}
                    placeholder="tu respuesta"
                    style={{
                      minWidth: 170,
                      maxWidth: '100%',
                      border: `1px solid ${isChecked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`,
                      borderRadius: 10,
                      padding: '0.45rem 0.6rem',
                      font: 'inherit',
                      color: 'var(--ink)',
                      background: 'var(--bg-2)',
                    }}
                  />{' '}
                  {question.after}
                </span>
              </label>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setChecked((current) => ({ ...current, [question.id]: true }))}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.7rem' }}
              >
                <FileCheck2 size={15} />
                Revisar respuesta
              </button>

              {isChecked && (
                <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.65rem' }}>
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
                      {!withinLimit ? 'Tu respuesta supera el límite de palabras. ' : ''}
                      {question.explanation}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {question.trap}
                  </p>
                </div>
              )}
            </article>
          );
            })}
          </section>
        ))}
      </div>

      {checkedCount === questions.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            Resultado: {correctCount}/{questions.length} respuestas exactas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            En IELTS, una respuesta puede ser conceptualmente correcta y aun así fallar por copiar demasiadas palabras. La precisión es parte del puntaje.
          </p>
        </div>
      )}
    </section>
  );
}
