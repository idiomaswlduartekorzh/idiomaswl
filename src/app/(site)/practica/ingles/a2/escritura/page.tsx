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
    id: 1, title: 'A Past Weekend', topic: 'Pasado simple',
    prompt: 'Write 5-6 sentences about what you did last weekend. Use past simple (regular and irregular verbs). Include where you went, who you were with, and what you ate or saw.',
    model: 'Last weekend, I visited my grandparents in the countryside. We woke up early on Saturday and went for a walk in the hills. The weather was perfect — sunny but not too hot. In the afternoon, my grandmother cooked her famous ajiaco and we sat together for a long lunch. On Sunday, I watched a film at home and prepared for the new week.',
    criteria: ['Usa al menos 4 verbos en pasado (2 regulares y 2 irregulares)', 'Incluye expresiones de tiempo pasado (last weekend, on Saturday, in the afternoon)', 'Menciona a al menos una persona más (with my...)', 'Usa al menos un adjetivo para describir (the weather was...)'],
    vocab: ['Last weekend/week', 'On Saturday/Sunday', 'In the morning/afternoon/evening', 'went to', 'visited', 'saw', 'ate/had', 'woke up', 'was/were'],
    checklist: ['¿Todos los verbos están en pasado simple?', '¿Los irregulares están bien conjugados? (went/saw/ate/woke up)', '¿Usaste expresiones de tiempo?', '¿Conectaste ideas con and/but/then/so?'],
  },
  {
    id: 2, title: 'Compare Two Things', topic: 'Comparativos y superlativos',
    prompt: 'Write a paragraph (5-6 sentences) comparing two cities, two types of holidays (beach vs mountains), or two jobs. Use comparatives (bigger, more interesting, better than).',
    model: 'Bogotá and Medellín are both great Colombian cities, but they are quite different. Bogotá is bigger and more cosmopolitan than Medellín, but Medellín has a warmer climate. Medellín is also more affordable for tourists than Bogotá. However, Bogotá has more museums and cultural events. In my opinion, Medellín is better for quality of life because the weather is nicer and the people are very friendly.',
    criteria: ['Menciona el tema de comparación desde el inicio', 'Usa al menos 3 comparativos (bigger/more... than)', 'Incluye un superlativo (the most/the best/the biggest)', 'Da tu opinión personal al final (In my opinion...)'],
    vocab: ['bigger/smaller than', 'more interesting/exciting/affordable than', 'better/worse than', 'However,', 'In my opinion,', 'On the other hand,', 'both', 'the most/the best'],
    checklist: ['¿Comparaste correctamente con "-er than" para adjetivos cortos?', '¿Usaste "more + adj + than" para adjetivos largos?', '¿Incluiste al menos un superlativo?', '¿La estructura tiene contraste (but/however)?'],
  },
  {
    id: 3, title: 'A Future Plan', topic: 'Going to / Will',
    prompt: 'Write about your plans for the next 3-6 months. Use "going to" for decisions already made and "will" for spontaneous reactions or predictions. Write 5-6 sentences.',
    model: 'I have made some exciting plans for the next few months. In July, I am going to start an online English course — I have already paid for it. I am also going to visit my cousin in Cali for a week. I think it will be a great trip because we haven\'t seen each other in two years. If the weather is good, we will probably go to the beach. I believe these plans will help me grow professionally and personally.',
    criteria: ['Usa "going to" para al menos 2 planes ya decididos', 'Usa "will" para al menos 1 predicción o decisión espontánea', 'Incluye expresiones de tiempo futuro (in July, next month, soon)', 'Cierra con un comentario personal o reflexión'],
    vocab: ["I'm going to", "I've decided to", "I'm planning to", "I think it will", "I believe", "In [month]", "next [week/month/year]"],
    checklist: ['¿Usaste "going to" para planes ya decididos?', '¿Usaste "will" para predicciones o decisiones espontáneas?', '¿Incluiste detalles específicos (fechas, lugares, personas)?', '¿La redacción tiene 5-6 oraciones coherentes?'],
  },
  {
    id: 4, title: 'Giving Advice', topic: 'Modales: should/could',
    prompt: 'A friend is feeling stressed about learning English. Write them a message (5-6 sentences) giving advice using should/shouldn\'t. Include at least one "going to" plan you will share with them.',
    model: 'Hi Miguel! I understand how you feel — learning a language can be stressful sometimes. You should try to practise a little every day, even just 15 minutes. You shouldn\'t try to learn too many words at once because it\'s overwhelming. I really think you should watch films or series in English with subtitles — it\'s very helpful! Could you join an online conversation group? I think that would be great. I\'m going to send you some good apps that helped me a lot. Don\'t give up!',
    criteria: ['Usa "should" para al menos 2 consejos positivos', 'Usa "shouldn\'t" para al menos 1 consejo negativo', 'Usa "could" para una sugerencia opcional', 'Incluye un plan con "going to"'],
    vocab: ['You should', 'You shouldn\'t', 'Could you...?', 'I think you should', "I'm going to send/share/help you", "Don't give up!", 'It would be great if'],
    checklist: ['¿Diferenciaste entre should (consejo firme) y could (sugerencia suave)?', '¿Usaste shouldn\'t para al menos una cosa que no debe hacer?', '¿El tono es amable y motivador?', '¿Incluiste un plan personal con "going to"?'],
  },
  {
    id: 5, title: 'Email to a Hotel', topic: 'Escritura formal + modales',
    prompt: 'Write a formal email (5-6 sentences) to a hotel in London. You want to: (1) book a room for 3 nights, (2) ask about breakfast, (3) mention you need a quiet room because you\'re working. Use modal verbs (could, would, should).',
    model: 'Dear Sir/Madam, I would like to make a reservation for a single room from 10th to 13th July. Could you please confirm if breakfast is included in the price? I am attending a professional conference, so I would prefer a quiet room away from the street. Could you also let me know if there is Wi-Fi in the rooms? I should mention that I am travelling with heavy luggage, so it would be great if you could arrange early check-in. I look forward to hearing from you. Kind regards, [Name]',
    criteria: ['Comienza con "Dear Sir/Madam" o "Dear [Name]"', 'Usa "Would like to" para expresar intención formal', 'Usa "Could you...?" para al menos 2 peticiones', 'Cierra con "Kind regards" o "Yours faithfully"'],
    vocab: ['I would like to', 'Could you please', 'I am writing to', 'I would prefer', 'I should mention', 'I look forward to hearing from you', 'Kind regards/Yours faithfully'],
    checklist: ['¿Empezaste con saludo formal?', '¿Usaste "would like" (no "I want")?', '¿Usaste "Could you?" para peticiones?', '¿El tono es formal y educado?'],
  },
];

export default function EscrituraInglesA2() {
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
            <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés A2</Link>
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
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Writing · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          5 tareas guiadas con texto modelo, banco de vocabulario y lista de verificación.
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
