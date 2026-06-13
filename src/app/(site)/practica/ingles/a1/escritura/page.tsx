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
    id: 1, title: 'Introduce Yourself', topic: 'Presentación personal',
    prompt: 'Write 4–5 sentences to introduce yourself. Include: your name, age, where you live, what you do (work/study), and one thing you like.',
    model: 'Hello! My name is Maria. I am 22 years old. I live in Bogotá with my family. I study Engineering at university. I love music and I like playing football.',
    criteria: ['Incluye nombre y edad (My name is... / I am ... years old)', 'Menciona dónde vives (I live in...)', 'Menciona lo que haces (I study/work)', 'Incluye al menos un gusto (I like/love...)'],
    vocab: ['My name is', 'I am ___ years old', 'I live in', 'I study', 'I work in', 'I like', 'I love', 'with my family', 'at university'],
    checklist: ['¿Empezaste con mayúscula?', '¿Pusiste punto al final de cada oración?', '¿Usaste "am" con "I"?', '¿Conjugaste el verbo en presente simple?'],
  },
  {
    id: 2, title: 'My Family', topic: 'La familia',
    prompt: 'Write 4–5 sentences about your family. Describe at least 2 family members: their name, age, job, and one characteristic.',
    model: 'I have a small family. My mother is a nurse. She is 45 years old and she is very kind. My father is a teacher. He is tall and he loves football.',
    criteria: ['Describe al menos 2 miembros (My mother/father/brother/sister is...)', 'Incluye profesión para al menos uno (is a teacher/nurse/doctor)', 'Usa adjetivos de personalidad o físicos (kind, tall, funny...)', 'Usa "He" para hombres y "She" para mujeres'],
    vocab: ['My mother/father/sister/brother is', 'He/She is', 'He/She works as', 'He/She is ___ years old', 'He/She loves', 'very kind/funny/tall/smart'],
    checklist: ['¿Usaste "He" para hombres y "She" para mujeres?', '¿Conjugaste "to be" correctamente (is)?', '¿Añadiste una descripción para cada persona?', '¿Revisaste mayúsculas en nombres propios?'],
  },
  {
    id: 3, title: 'My Home', topic: 'Mi casa',
    prompt: 'Write 4–5 sentences describing your home. Use "there is" / "there are" to describe what is in each room.',
    model: 'I live in an apartment in Bogotá. There are three rooms: a bedroom, a kitchen, and a living room. In my bedroom, there is a big bed and a desk. There are some books on the shelf. I love my home because it is comfortable.',
    criteria: ['Menciona el tipo de vivienda (I live in a house/apartment)', 'Usa "there is" al menos una vez para singular', 'Usa "there are" al menos una vez para plural', 'Menciona al menos 2 habitaciones o áreas'],
    vocab: ['I live in a house/apartment', 'There is a/an', 'There are some', 'In my bedroom/kitchen/living room', 'next to', 'in front of', 'comfortable', 'small/big'],
    checklist: ['¿Usaste "there is" para singular y "there are" para plural?', '¿Describiste al menos 2 habitaciones?', '¿Usaste preposiciones de lugar (in, on, next to)?', '¿Incluiste al menos 3 objetos del hogar?'],
  },
  {
    id: 4, title: 'My Daily Routine', topic: 'Rutina diaria',
    prompt: 'Write 5–6 sentences about your daily routine. Use time expressions (at 7, in the morning, every day) and present simple.',
    model: 'Every morning, I wake up at seven o\'clock. I take a shower and eat breakfast. I usually have eggs and coffee. Then I take the bus to university. Classes start at eight. I finish at two o\'clock in the afternoon.',
    criteria: ['Usa al menos 2 expresiones de tiempo (every morning, at 7, in the afternoon...)', 'Incluye acciones de mañana, mediodía y tarde/noche', 'Usa presente simple correctamente (I wake / I take / I eat)', 'Menciona cómo vas al trabajo/universidad'],
    vocab: ['Every morning/afternoon/evening', 'At ___ o\'clock', 'I wake up', 'I take a shower', 'I have breakfast/lunch/dinner', 'I take the bus/walk', 'I start/finish at'],
    checklist: ['¿Usaste expresiones de tiempo?', '¿Los verbos están en presente simple?', '¿La rutina tiene orden lógico (mañana → tarde → noche)?', '¿Usaste "Then" o "After that" para conectar?'],
  },
  {
    id: 5, title: 'My Favourite Food', topic: 'La comida favorita',
    prompt: 'Write 4–5 sentences about food you like and dislike. Use "I like/love/don\'t like" and at least one frequency adverb (always, usually, sometimes, never).',
    model: 'I love Colombian food! My favourite meal is bandeja paisa. I usually eat rice and chicken for lunch. I drink coffee every morning. I don\'t like vegetables very much, but I always eat fruit.',
    criteria: ['Menciona al menos 2 comidas o bebidas que te gustan', 'Menciona al menos 1 que no te gusta (I don\'t like...)', 'Usa al menos un adverbio de frecuencia (always/usually/sometimes/never)', 'Menciona el desayuno, almuerzo o cena'],
    vocab: ['I love', 'I like', 'My favourite food is', 'I don\'t like', 'I always/usually/sometimes/never eat', 'for breakfast/lunch/dinner', 'every day/morning'],
    checklist: ['¿Usaste al menos un adverbio de frecuencia?', '¿Mencionaste comidas específicas (no solo "comida")?', '¿Usaste "don\'t" con I/you/we/they en la negación?', '¿Conectaste ideas con "and" o "but"?'],
  },
];

export default function EscrituraInglesA1() {
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
            <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés A1</Link>
            <span>/</span>
            <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Escritura</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>Tarea {task.id}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Writing Task {task.id} — {task.topic}</p>
          <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.title}</h2>

          {/* Prompt */}
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Consigna</div>
            <p style={{ margin: 0, fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.65, fontWeight: 600 }}>{task.prompt}</p>
          </div>

          {/* Model toggle */}
          <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
            {showModel ? '👁 Ocultar modelo' : '👁 Ver ejemplo de texto'}
          </button>
          {showModel && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
            </div>
          )}

          {/* Criteria + vocab */}
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

          {/* Writing area */}
          <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
            placeholder="Write your text here in English..."
            style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 20 ? '#d97706' : '#059669' }}>
            <span>{words} palabras {words < 20 ? '(mínimo recomendado: 25)' : '✓'}</span>
          </div>

          {/* Pre-submit checklist */}
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
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Writing · Inglés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A1</h1>
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
