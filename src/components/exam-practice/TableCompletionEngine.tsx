'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { TableCompletionPassage } from '@/data/practica-exams/seo-catalog';

type BlankCell = Extract<TableCompletionPassage['rows'][number]['cells'][number], { type: 'blank' }>;

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

function blankId(rowId: string, cellIndex: number) {
  return `${rowId}-${cellIndex}`;
}

export default function TableCompletionEngine({
  passage,
  accent = '#7c3aed',
}: {
  passage: TableCompletionPassage;
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const blanks = useMemo(
    () =>
      passage.rows.flatMap((row) =>
        row.cells
          .map((cell, cellIndex) => ({ cell, id: blankId(row.id, cellIndex) }))
          .filter((item): item is { cell: BlankCell; id: string } => item.cell.type === 'blank')
      ),
    [passage.rows]
  );

  const correct = useMemo(
    () =>
      blanks.filter(({ cell, id }) => {
        if (!checked[id]) return false;
        const accepted = [cell.answer, ...(cell.alternatives ?? [])].map(normalizeAnswer);
        return accepted.includes(normalizeAnswer(answers[id] ?? ''));
      }).length,
    [answers, blanks, checked]
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
            width: `${Math.round((checkedCount / blanks.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <section className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
        <p style={{ margin: '0 0 0.5rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          {passage.tableTitle}
        </p>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: 760, borderCollapse: 'separate', borderSpacing: 0, border: '1px solid var(--line-soft)', borderRadius: 14, overflow: 'hidden' }}>
            <thead>
              <tr>
                {passage.columns.map((column) => (
                  <th key={column} scope="col" style={{ textAlign: 'left', padding: '0.8rem', background: `${accent}12`, color: 'var(--ink)', fontSize: '0.82rem', borderBottom: '1px solid var(--line-soft)' }}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {passage.rows.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, cellIndex) => {
                    if (cell.type === 'text') {
                      return (
                        <td key={`${row.id}-${cellIndex}`} style={{ verticalAlign: 'top', padding: '0.85rem', borderTop: '1px solid var(--line-soft)', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                          <strong style={{ color: 'var(--ink)' }}>{cell.text}</strong>
                        </td>
                      );
                    }

                    const id = blankId(row.id, cellIndex);
                    const value = answers[id] ?? '';
                    const isChecked = Boolean(checked[id]);
                    const accepted = [cell.answer, ...(cell.alternatives ?? [])].map(normalizeAnswer);
                    const isCorrect = accepted.includes(normalizeAnswer(value));
                    const exceedsLimit = wordCount(value) > passage.maxWords;

                    return (
                      <td key={id} style={{ verticalAlign: 'top', padding: '0.85rem', borderTop: '1px solid var(--line-soft)', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                        <div style={{ display: 'grid', gap: '0.55rem' }}>
                          <p style={{ margin: 0 }}>
                            {cell.before}
                            <input
                              aria-label={`Blank ${id}`}
                              value={value}
                              disabled={isChecked}
                              onChange={(event) => update(id, event.target.value)}
                              placeholder="your answer"
                              style={{
                                width: 'min(100%, 170px)',
                                margin: '0 0.3rem',
                                border: `1px solid ${isChecked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`,
                                background: isChecked ? (isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)') : 'var(--bg-2)',
                                borderRadius: 10,
                                padding: '0.45rem 0.55rem',
                                color: 'var(--ink)',
                                font: 'inherit',
                                fontWeight: 800,
                              }}
                            />
                            {cell.after}
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ color: exceedsLimit ? '#b91c1c' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                              {wordCount(value)}/{passage.maxWords} words
                            </span>
                            <span style={{ display: 'inline-flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                              <button type="button" className="btn btn-sm" disabled={!value.trim() || isChecked} onClick={() => check(id)}>
                                Revisar
                              </button>
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => setShowHints((current) => ({ ...current, [id]: !current[id] }))}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                              >
                                <Lightbulb size={15} />
                                Pista
                              </button>
                            </span>
                          </div>

                          {showHints[id] && (
                            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                              {cell.hint}
                            </p>
                          )}

                          {isChecked && (
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '24px 1fr',
                                gap: '0.55rem',
                                alignItems: 'start',
                                color: isCorrect ? '#047857' : '#b91c1c',
                                background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                                borderRadius: 12,
                                padding: '0.65rem',
                                fontSize: '0.86rem',
                                lineHeight: 1.55,
                              }}
                            >
                              {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                              <span>
                                <strong>{isCorrect ? 'Correcto.' : `Respuesta correcta: ${cell.answer}.`}</strong>{' '}
                                {cell.explanation}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {checkedCount === blanks.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{blanks.length} correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si una celda falló, lee su fila completa y el encabezado de columna: juntos indican qué tipo de dato debes buscar.
          </p>
        </div>
      )}
    </section>
  );
}
