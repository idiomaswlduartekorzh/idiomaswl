'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; topic: string;
  prompt: string; model: string; criteria: string[];
  vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'A Personal Opinion', topic: 'First Conditional + modal verbs',
    prompt: 'Write your opinion about social media — are the effects positive or negative? Write 5-6 sentences. Use "If..., I think..., I believe..." and at least one First Conditional.',
    model: 'In my opinion, social media has both positive and negative effects on society. I believe that if people use it responsibly, it can be a powerful tool for communication and learning. However, if young people spend too many hours online, they might develop anxiety and miss real-life experiences. I think that social media companies should introduce time limits for younger users. If governments created stricter regulations, the negative effects would decrease significantly. Overall, I believe that social media can be beneficial if we are aware of its risks.',
    criteria: ['Usa "In my opinion" o "I believe" para expresar tu postura', 'Incluye al menos un First Conditional (If + present, will/might...)', 'Presenta tanto aspectos positivos como negativos', 'Cierra con una conclusión personal'],
    vocab: ["In my opinion,", "I believe that", "I think that", "If people use..., they will/might...", "However,", "On the other hand,", "Overall,", "should / might / could"],
    checklist: ['¿Expresaste claramente tu opinión desde el inicio?', '¿Usaste al menos un First Conditional correctamente?', '¿Incluiste contraste (positive/negative o however/but)?', '¿La conclusión resume tu posición?'],
  },
  {
    id: 2, title: 'A Formal Complaint Email', topic: 'Passive Voice',
    prompt: 'Write a formal email complaining about a faulty product you ordered online. Write 5-6 sentences. Use passive voice: "The order was sent...", "I have been informed...", "The product should be replaced..."',
    model: 'Dear Customer Services, I am writing to complain about an order that was placed on 15th June. The package was delivered three days late, and when it was opened, the product was found to be damaged. I have been informed that returns must be processed within 14 days, which I will do immediately. The item should be replaced as soon as possible, as it was purchased as a gift. I have also been charged twice for the same order, which is unacceptable. I expect this matter to be resolved promptly. Yours sincerely, A. García',
    criteria: ['Comienza con "Dear Customer Services" y cierra con "Yours sincerely"', 'Usa al menos 3 estructuras en voz pasiva (was + PP)', 'Explica el problema claramente y de forma formal', 'Evita lenguaje informal — no uses contracciones al inicio'],
    vocab: ['I am writing to complain about', 'was delivered / was found / was purchased', 'has been charged / have been informed', 'should be replaced / must be processed', 'I expect this to be resolved', 'Yours sincerely'],
    checklist: ['¿Empezaste con "Dear..." y cerraste con "Yours sincerely"?', '¿Usaste al menos 3 frases en voz pasiva?', '¿El tono es formal y profesional?', '¿Explicaste el problema y pediste solución?'],
  },
  {
    id: 3, title: 'Comparing Two Cities', topic: 'Comparatives + Present Perfect',
    prompt: 'Compare your city (or any city you know) with another you have visited or read about. Use comparatives and Present Perfect. Write 5-6 sentences. Include: "has become", "is more...than", "have seen improvements in..."',
    model: 'Bogotá and Medellín are both great Colombian cities, but they have developed differently in recent years. Bogotá has become more cosmopolitan and has attracted a larger number of international businesses. However, Medellín has transformed more dramatically — it has been recognised as one of the most innovative cities in Latin America. The public transport system in Medellín has improved more significantly than in Bogotá, where traffic is still a major problem. Culturally, both cities have grown, but Bogotá is larger and has more museums and universities. I have visited both cities several times and believe each has its own unique charm.',
    criteria: ['Menciona ambas ciudades desde el inicio', 'Usa Present Perfect para cambios recientes (has become, has improved)', 'Usa comparativos (more...than, larger, more significantly)', 'Incluye tu opinión personal al final'],
    vocab: ['has become / has transformed / has attracted', 'more cosmopolitan than', 'more significantly / more dramatically', 'have seen improvements in', 'However, / Although,', 'I have visited... / I have noticed...'],
    checklist: ['¿Comparaste con correctivos comparativos?', '¿Usaste Present Perfect para cambios actuales?', '¿Incluiste conectores de contraste (however/but/although)?', '¿La redacción tiene 5-6 oraciones coherentes?'],
  },
  {
    id: 4, title: 'A Difficult Decision', topic: 'Second Conditional',
    prompt: 'Describe a difficult hypothetical decision you might face in the future. Write 5-6 sentences using Second Conditional: "If I..., I would..." throughout. Example: choosing between a job offer abroad and staying with your family.',
    model: 'Imagine I received a job offer to work in London for two years. If I accepted the position, I would earn a much higher salary and gain international experience. However, if I moved abroad, I would miss my family and friends enormously. If I stayed in Colombia, I would be closer to my loved ones but might miss a great career opportunity. If I were in this situation, I would try to negotiate a remote work arrangement first. I think that if I had more financial security, I would find it easier to make such a decision.',
    criteria: ['Introduce el escenario hipotético claramente', 'Usa Second Conditional al menos 4 veces (If + past, would + verb)', 'Presenta tanto ventajas como desventajas', 'Cierra con tu decisión o preferencia personal'],
    vocab: ["If I accepted..., I would...", "If I moved..., I would...", "If I stayed..., I might...", "If I were in this situation...", "I would try to / I would find it...", "However, / On the other hand,"],
    checklist: ['¿Usaste correctamente "If + past simple, would + verb"?', '¿Presentaste los dos lados de la decisión?', '¿Evitaste "If I would" (error clásico)?', '¿La redacción fluye con conectores?'],
  },
  {
    id: 5, title: 'A Short Story', topic: 'Past Simple + Past Continuous',
    prompt: 'Write a short story about an unexpected event. Write 5-6 sentences. Use: "was doing... when suddenly..." — the Past Continuous for background actions and Past Simple for the unexpected event.',
    model: 'Last Saturday, I was walking to the supermarket when I suddenly heard a loud noise. A group of street musicians were performing in the main square, and a large crowd was gathering around them. While I was watching the performance, a little girl was dancing and accidentally knocked over a food stall. The vendor was not angry — he was laughing and started to play along with the musicians. By the time the performance ended, nearly two hundred people were clapping and singing together. It was one of the most spontaneous and joyful moments I have experienced in a long time.',
    criteria: ['Introduce el contexto con Past Continuous (was/were + -ing)', 'Usa Past Simple para el evento inesperado', 'Incluye "when" o "while" para conectar las acciones', 'Cierra con un comentario personal sobre el evento'],
    vocab: ['was walking / was watching / were performing', 'when suddenly / while', 'accidentally / spontaneously', 'By the time... / Eventually...', 'It was one of the most... / I have never...'],
    checklist: ['¿Usaste Past Continuous para las acciones de fondo?', '¿Usaste Past Simple para el evento inesperado?', '¿Incluiste "when" o "while" para la conexión?', '¿La narración es coherente y tiene un cierre?'],
  },
];

export default function EscrituraInglesB1() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setCheckDone({}); }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (submitted && task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <h2 style={{ margin: '0 0 0.5rem', color: '#059669' }}>¡Texto completado!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Guardado en sesión — David o Zhanna pueden revisarlo contigo en clase.</p>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Escribir de nuevo</button>
              <button className="btn btn-ghost btn-sm" onClick={back}>← Otras tareas</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés B1</Link>
            <span>/</span>
            <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Escritura</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>Tarea {task.id}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Writing Task {task.id} — {task.topic}</p>
          <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.title}</h2>

          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Consigna</div>
            <p style={{ margin: 0, fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.65, fontWeight: 600 }}>{task.prompt}</p>
          </div>

          <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
            {showModel ? '👁 Ocultar modelo' : '👁 Ver ejemplo de texto'}
          </button>
          {showModel && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criterios de evaluación</div>
              {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
            </div>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Banco de vocabulario</div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {task.vocab.map((v, i) => (
                  <button key={i} onClick={() => setText(p => p ? `${p} ${v}` : v)}
                    style={{ fontSize: '0.72rem', padding: '0.18rem 0.5rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}30`, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
            placeholder="Write your text here in English..."
            style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 30 ? '#d97706' : '#059669' }}>
            <span>{words} palabras {words < 30 ? '(mínimo recomendado: 40)' : '✓'}</span>
          </div>

          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Lista de verificación antes de enviar</div>
            {task.checklist.map((item, i) => (
              <button key={i} onClick={() => setCheckDone(p => ({ ...p, [i]: !p[i] }))}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.35rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', textAlign: 'left' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{checkDone[i] ? '✅' : '⬜'}</span>
                <span style={{ fontSize: '0.82rem', color: checkDone[i] ? '#059669' : 'var(--muted)' }}>{item}</span>
              </button>
            ))}
          </div>

          <button className="btn btn-sm" onClick={() => text.trim() && setSubmitted(true)} disabled={!text.trim()}
            style={{ background: COLOR, borderColor: COLOR, opacity: text.trim() ? 1 : 0.5 }}>
            Enviar texto →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Writing · Inglés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          5 tareas B1 con texto modelo, banco de vocabulario y lista de verificación. Practica opiniones, cartas formales, comparaciones y narración.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.prompt.substring(0, 70)}...</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
