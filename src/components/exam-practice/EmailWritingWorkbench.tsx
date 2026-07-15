'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { EmailPrompt } from '@/data/practica-exams/seo-catalog';

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const toneLabels: Record<EmailPrompt['tone'], string> = {
  formal: 'Formal',
  'semi-formal': 'Semi-formal',
  friendly: 'Amigable',
};

export default function EmailWritingWorkbench({
  prompts,
  accent = '#1a4fcc',
}: {
  prompts: EmailPrompt[];
  accent?: string;
}) {
  const [promptId, setPromptId] = useState(prompts[0]?.id ?? '');
  const [response, setResponse] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const prompt = prompts.find((item) => item.id === promptId) ?? prompts[0];
  const words = useMemo(() => countWords(response), [response]);
  const completed = prompt.checklist.filter((item) => checked[item]).length;
  const wordStatus = words >= 70 && words <= 140 ? 'Listo' : words < 70 ? 'Desarrolla más' : 'Recorta';

  function reset(nextPromptId = promptId) {
    setPromptId(nextPromptId);
    setResponse('');
    setChecked({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'start' }}>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Banco de práctica</p>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Escribe un email completo</h2>
          </div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => reset()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <RotateCcw size={15} />
            Reiniciar
          </button>
        </div>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
            Situación
          </span>
          <select
            value={prompt.id}
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
            {prompts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.topic}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem' }}>
          <article className="wl-card" style={{ padding: '0.9rem', borderRadius: 14, background: `${accent}0d`, border: `1px solid ${accent}25` }}>
            <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Situation
            </p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.92rem' }}>{prompt.situation}</p>
          </article>
          <article className="wl-card" style={{ padding: '0.9rem', borderRadius: 14 }}>
            <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Task
            </p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.92rem' }}>{prompt.task}</p>
          </article>
          <article className="wl-card" style={{ padding: '0.9rem', borderRadius: 14 }}>
            <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Audience & tone
            </p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.92rem' }}>
              {prompt.audience} · {toneLabels[prompt.tone]}
            </p>
          </article>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem', alignItems: 'start' }}>
          <label style={{ display: 'grid', gap: '0.45rem' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <strong style={{ color: 'var(--ink)' }}>Tu email</strong>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: words >= 70 && words <= 140 ? '#059669' : 'var(--muted)' }}>
                {words} palabras · {wordStatus}
              </span>
            </span>
            <textarea
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              placeholder="Dear Professor, I am writing to ask whether..."
              style={{
                width: '100%',
                minHeight: 270,
                resize: 'vertical',
                border: '1px solid var(--line-soft)',
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

          <aside style={{ display: 'grid', gap: '0.75rem' }}>
            <div className="wl-card" style={{ padding: '0.9rem', borderRadius: 14 }}>
              <p style={{ margin: '0 0 0.45rem', fontWeight: 900, color: 'var(--ink)' }}>Objetivo</p>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>{prompt.target}</p>
            </div>

            <div className="wl-card" style={{ padding: '0.9rem', borderRadius: 14 }}>
              <p style={{ margin: '0 0 0.55rem', fontWeight: 900, color: 'var(--ink)' }}>
                Checklist {completed}/{prompt.checklist.length}
              </p>
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                {prompt.checklist.map((item) => (
                  <label key={item} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: '0.45rem', alignItems: 'start', color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.45 }}>
                    <input
                      type="checkbox"
                      checked={Boolean(checked[item])}
                      onChange={(event) => setChecked((current) => ({ ...current, [item]: event.target.checked }))}
                      style={{ marginTop: 2 }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="wl-card" style={{ padding: '0.9rem', borderRadius: 14 }}>
              <p style={{ margin: '0 0 0.55rem', fontWeight: 900, color: 'var(--ink)' }}>Frases útiles</p>
              <div style={{ display: 'grid', gap: '0.4rem' }}>
                {prompt.phrases.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() => setResponse((current) => `${current}${current.trim() ? ' ' : ''}${phrase} `)}
                    style={{
                      textAlign: 'left',
                      border: `1px solid ${accent}25`,
                      background: `${accent}0d`,
                      color: 'var(--ink)',
                      borderRadius: 10,
                      padding: '0.5rem 0.6rem',
                      fontSize: '0.84rem',
                      lineHeight: 1.35,
                      cursor: 'pointer',
                    }}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {completed === prompt.checklist.length && words >= 70 && (
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', alignItems: 'start', color: '#047857', background: 'rgba(5,150,105,0.08)', borderRadius: 12, padding: '0.75rem', lineHeight: 1.55 }}>
            <CheckCircle2 size={18} />
            <span>
              Tu email cubre los elementos esenciales. Ahora revisa si el tono coincide con el destinatario y si cada oración ayuda a resolver la situación.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
