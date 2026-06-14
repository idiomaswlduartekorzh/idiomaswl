'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Exercise {
  prompt: string;
  essayType: string;
  bodySummary: string[];
  thesis: string;
  model: string;
  modelAnnotations: string[];
}

const EXERCISES: Exercise[] = [
  {
    essayType: 'Opinión',
    prompt: 'Some people believe that governments should ban all advertising aimed at children. To what extent do you agree or disagree?',
    thesis: 'Governments must actively prohibit advertising targeted at children.',
    bodySummary: [
      'Body 1: Advertising exploits children\'s inability to distinguish commercial content from genuine information.',
      'Body 2: Parental oversight alone places an unfair burden on families and cannot replace regulatory protection.',
    ],
    model: 'In conclusion, while some argue that parental guidance is sufficient to protect children from manipulative advertising, I firmly believe that governments must take an active regulatory role. The evidence clearly demonstrates that young people are uniquely vulnerable to commercial influence, and robust legislation is the only reliable means of ensuring their protection.',
    modelAnnotations: [
      'Retoma la tesis: "governments must take an active regulatory role" (mismo mensaje, nuevas palabras)',
      'Resume los puntos: sintetiza ambos argumentos sin repetir exactamente',
      'Sin información nueva: no introduce nuevos argumentos ni datos',
    ],
  },
  {
    essayType: 'Problema-Solución',
    prompt: 'In many countries, the number of elderly people living alone is increasing. What problems does this cause, and what solutions can you suggest?',
    thesis: 'Two key solutions can address the problems of elderly isolation.',
    bodySummary: [
      'Body 1 (Problemas): Riesgo de crisis de salud sin detectar + deterioro mental severo por aislamiento social.',
      'Body 2 (Soluciones): Programas de visitas periódicas financiados por el gobierno + incentivos para convivencia multigeneracional.',
    ],
    model: 'In summary, the growing number of elderly individuals living alone poses serious threats to both physical health and psychological wellbeing. By implementing regular welfare checks and encouraging multi-generational living through financial incentives, governments can meaningfully improve the quality of life for this vulnerable group. Prompt and coordinated action is essential before this demographic trend intensifies further.',
    modelAnnotations: [
      'Retoma la tesis: sintetiza los problemas en una oración ("serious threats...")',
      'Resume los puntos: soluciones mencionadas brevemente ("welfare checks", "multi-generational living")',
      'Recomendación final: cierra con urgencia sin introducir información nueva',
    ],
  },
  {
    essayType: 'Discusión',
    prompt: 'Some think schools should group students by ability. Others believe all abilities should be educated together. Discuss both views and give your own opinion.',
    thesis: 'Mixed-ability education, supplemented by targeted support, is preferable overall.',
    bodySummary: [
      'Body 1 (View A): La agrupación por habilidad permite ritmo más rápido para estudiantes avanzados.',
      'Body 2 (View B): La educación mixta mejora autoestima, empatía y habilidades sociales; el streaming daña a los grupos bajos.',
    ],
    model: 'To conclude, while ability grouping may offer some efficiency gains for high-achieving students, the long-term social and psychological costs of streaming are considerable. In my view, inclusive classrooms with differentiated teacher support represent the most equitable and effective approach to education, providing both academic rigour and the development of essential social skills.',
    modelAnnotations: [
      'Reconoce el otro lado brevemente ("may offer some efficiency gains") — importante en Discusión',
      'Tu opinión clara: "inclusive classrooms... most equitable and effective approach"',
      'Síntesis de ambos cuerpos sin añadir argumentos nuevos',
    ],
  },
];

const CHECKLIST_ITEMS = [
  '¿Retomaste la tesis con palabras diferentes a las de la introducción?',
  '¿Resumiste brevemente los puntos principales del cuerpo?',
  '¿Evitaste añadir información o argumentos nuevos?',
];

function wc(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function ConclusionPage() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState<(boolean | null)[]>([null, null, null]);
  const [showModel, setShowModel] = useState(false);
  const ex = EXERCISES[current];
  const count = wc(text);

  function toggleCheck(i: number) {
    setChecks(c => c.map((v, idx) => idx === i ? !v : v));
  }

  function next() {
    setCurrent(i => (i + 1) % EXERCISES.length);
    setText('');
    setRevealed(false);
    setChecks([null, null, null]);
    setShowModel(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Conclusión</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🏁 Sub-habilidad 5 — Conclusión</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Restate + Summarize</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            La conclusión retoma la tesis y resume los puntos clave. Nunca introduzcas argumentos nuevos. 40–60 palabras es suficiente.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((current + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{current + 1}/{EXERCISES.length}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Enunciado</p>
              <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 700 }}>{ex.essayType}</span>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>
              &ldquo;{ex.prompt}&rdquo;
            </p>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Resumen del cuerpo</p>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {ex.bodySummary.map((s, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{s}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>
              Tu conclusión:
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="In conclusion / To conclude / In summary, ... Retoma la tesis con otras palabras y resume los puntos principales."
              rows={5}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {count} palabras {count > 80 ? '— considera reducir' : count > 0 ? '(ideal: 40–60)' : ''}
              </span>
              {count > 15 && !revealed && (
                <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver análisis →</button>
              )}
            </div>
          </div>

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.75rem' }}>Auto-evaluación</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {CHECKLIST_ITEMS.map((item, i) => (
                    <button key={i} onClick={() => toggleCheck(i)}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.65rem 0.85rem', borderRadius: 9, border: checks[i] === true ? '2px solid #059669' : checks[i] === false ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: checks[i] === true ? 'rgba(5,150,105,0.07)' : checks[i] === false ? 'rgba(220,38,38,0.05)' : 'var(--bg)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                      <span style={{ fontSize: '1.1rem', lineHeight: 1, marginTop: '0.05rem', minWidth: 20 }}>
                        {checks[i] === true ? '✓' : checks[i] === false ? '✗' : '○'}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>{item}</span>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.6rem 0 0', lineHeight: 1.4 }}>Haz clic en cada ítem para marcar sí (✓) o no (✗). Luego compara con el modelo.</p>
              </div>

              <button className="btn btn-ghost btn-sm" onClick={() => setShowModel(v => !v)} style={{ alignSelf: 'flex-start' }}>
                {showModel ? 'Ocultar modelo' : 'Ver conclusión modelo Band 7 →'}
              </button>

              {showModel && (
                <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Conclusión modelo (Band 7+)</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--ink)' }}>{ex.model}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {ex.modelAnnotations.map((note, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.85rem', lineHeight: 1.4, minWidth: 16 }}>{i + 1}.</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {current < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
