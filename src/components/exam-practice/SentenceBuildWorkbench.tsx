'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { SentenceBuildItem } from '@/data/practica-exams/seo-catalog';

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1');
}

export default function SentenceBuildWorkbench({
  items,
  accent = '#1a4fcc',
}: {
  items: SentenceBuildItem[];
  accent?: string;
}) {
  const [itemId, setItemId] = useState(items[0]?.id ?? '');
  const [response, setResponse] = useState('');
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const item = items.find((entry) => entry.id === itemId) ?? items[0];
  const isCorrect = useMemo(() => normalize(response) === normalize(item.answer), [item.answer, response]);

  function reset(nextItemId = itemId) {
    setItemId(nextItemId);
    setResponse('');
    setChecked(false);
    setShowHint(false);
  }

  function addFragment(fragment: string) {
    if (checked) return;
    setResponse((current) => `${current}${current.trim() ? ' ' : ''}${fragment}`);
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'start' }}>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Construye una oración académica</h2>
          </div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => reset()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <RotateCcw size={15} />
            Reiniciar
          </button>
        </div>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
            Enfoque
          </span>
          <select
            value={item.id}
            onChange={(event) => reset(event.target.value)}
            style={{
              width: '100%',
              border: '1px solid var(--line-soft)',
              borderRadius: 10,
              padding: '0.65rem 0.75rem',
              background: 'var(--bg)',
              color: 'var(--ink)',
              font: 'inherit',
            }}
          >
            {items.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.focus}
              </option>
            ))}
          </select>
        </label>

        <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: `${accent}0d`, border: `1px solid ${accent}25` }}>
          <p style={{ margin: '0 0 0.4rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
            Prompt
          </p>
          <h3 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '1rem' }}>{item.prompt}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {item.fragments.map((fragment) => (
              <button
                key={fragment}
                type="button"
                disabled={checked}
                onClick={() => addFragment(fragment)}
                style={{
                  border: `1px solid ${accent}30`,
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  borderRadius: 999,
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.86rem',
                  cursor: checked ? 'default' : 'pointer',
                }}
              >
                {fragment}
              </button>
            ))}
          </div>
        </article>

        <label style={{ display: 'grid', gap: '0.45rem' }}>
          <span style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            <strong style={{ color: 'var(--ink)' }}>Tu oración</strong>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
              {item.focus}
            </span>
          </span>
          <textarea
            value={response}
            disabled={checked}
            onChange={(event) => setResponse(event.target.value)}
            placeholder="Escribe o arma la oración con los fragmentos..."
            style={{
              width: '100%',
              minHeight: 130,
              resize: 'vertical',
              border: `1px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`,
              borderRadius: 14,
              padding: '0.9rem',
              background: 'var(--bg)',
              color: 'var(--ink)',
              font: 'inherit',
              lineHeight: 1.65,
              boxSizing: 'border-box',
            }}
          />
        </label>

        <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
          <button className="btn btn-sm" type="button" onClick={() => setChecked(true)} disabled={!response.trim() || checked}>
            Revisar oración
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowHint((value) => !value)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Lightbulb size={15} />
            Ver pista
          </button>
        </div>

        {showHint && (
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>{item.hint}</p>
        )}

        {checked && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: '0.55rem',
              alignItems: 'start',
              color: isCorrect ? '#047857' : '#b91c1c',
              background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
              borderRadius: 12,
              padding: '0.75rem',
              lineHeight: 1.55,
            }}
          >
            {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span>
              <strong>{isCorrect ? 'Correcto.' : 'Revisa el orden y la puntuación.'}</strong> {item.explanation}
              {!isCorrect && (
                <span style={{ display: 'block', marginTop: '0.45rem', color: 'var(--ink-2)' }}>
                  Modelo: {item.answer}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
