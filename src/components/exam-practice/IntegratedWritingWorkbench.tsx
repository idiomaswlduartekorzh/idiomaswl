'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { IntegratedWritingPrompt } from '@/data/practica-exams/seo-catalog';

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function IntegratedWritingWorkbench({
  prompts,
  accent = '#1a4fcc',
}: {
  prompts: IntegratedWritingPrompt[];
  accent?: string;
}) {
  const [promptId, setPromptId] = useState(prompts[0]?.id ?? '');
  const [response, setResponse] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const prompt = prompts.find((item) => item.id === promptId) ?? prompts[0];
  const words = useMemo(() => countWords(response), [response]);
  const completed = prompt.checklist.filter((item) => checked[item]).length;
  const wordStatus = words >= 150 && words <= 230 ? 'Rango útil' : words < 150 ? 'Falta síntesis' : 'Recorta';

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
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Banco de síntesis</p>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Escribe una respuesta Integrated Writing</h2>
          </div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => reset()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <RotateCcw size={15} />
            Reiniciar
          </button>
        </div>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
            Prompt
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

        <article style={{ padding: '0.9rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
          <p style={{ margin: '0 0 0.3rem', fontWeight: 800, color: 'var(--ink)' }}>Task</p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{prompt.task}</p>
        </article>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '0.85rem' }}>
          <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
            <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              {prompt.readingTitle}
            </p>
            <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.72, fontSize: '0.92rem' }}>{prompt.reading}</div>
          </article>

          <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: `${accent}0d`, border: `1px solid ${accent}25` }}>
            <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Lecture notes
            </p>
            <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.72, fontSize: '0.92rem' }}>{prompt.lecture}</div>
          </article>
        </div>

        <section className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
          <p style={{ margin: '0 0 0.65rem', fontWeight: 900, color: 'var(--ink)' }}>Mapa de contraste</p>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            {prompt.readingClaims.map((claim, index) => (
              <div key={claim} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.65rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: 12, background: 'var(--bg)', border: '1px solid var(--line-soft)' }}>
                  <span style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase' }}>
                    Reading point {index + 1}
                  </span>
                  <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.88rem' }}>{claim}</p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 12, background: `${accent}0d`, border: `1px solid ${accent}25` }}>
                  <span style={{ display: 'block', marginBottom: '0.25rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase' }}>
                    Lecture response {index + 1}
                  </span>
                  <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.88rem' }}>{prompt.lectureResponses[index]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem', alignItems: 'start' }}>
          <label style={{ display: 'grid', gap: '0.45rem' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <strong style={{ color: 'var(--ink)' }}>Tu respuesta</strong>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: words >= 150 && words <= 230 ? '#059669' : 'var(--muted)' }}>
                {words} palabras · {wordStatus}
              </span>
            </span>
            <textarea
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              placeholder="The lecture challenges the reading's claims about..."
              style={{
                width: '100%',
                minHeight: 280,
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

        {completed === prompt.checklist.length && words >= 150 && (
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', alignItems: 'start', color: 'var(--wl-on-panel-ok, #047857)', background: 'rgba(5,150,105,0.08)', borderRadius: 12, padding: '0.75rem', lineHeight: 1.55 }}>
            <CheckCircle2 size={18} />
            <span>
              Tu respuesta ya cubre la estructura base. Ahora revisa que cada párrafo reporte una relación lectura-clase y que no aparezca una opinión personal.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
