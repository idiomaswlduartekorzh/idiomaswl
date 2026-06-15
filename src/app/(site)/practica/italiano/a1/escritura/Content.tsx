'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask { id: number; title: string; topic: string; prompt: string; model: string; criteria: string[]; vocab: string[]; checklist: string[]; }

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Presentarsi', topic: 'Presentación personal',
    prompt: 'Scrivi 4–5 frasi per presentarti. Includi: nome, età, provenienza, cosa fai (lavoro/studio) e una cosa che ti piace.',
    model: 'Ciao! Mi chiamo Sofia. Ho 23 anni. Sono di Bogotá, in Colombia. Studio informatica all\'università. Mi piace molto la musica italiana.',
    criteria: ['Incluye nombre con "Mi chiamo..." o "Sono..."', 'Menciona la edad con "Ho ___ anni"', 'Indica de dónde eres con "Sono di..."', 'Menciona qué haces: "Studio/Lavoro..."', 'Incluye un gusto con "Mi piace..."'],
    vocab: ['Mi chiamo', 'Ho ___ anni', 'Sono di', 'Studio', 'Lavoro in/come', 'Mi piace', 'Mi piacciono', 'all\'università', 'in ufficio'],
    checklist: ['¿Usaste "Ho" (avere) para la edad, no "Sono"?', '¿Pusiste "di" antes de la ciudad?', '¿Conjugaste el verbo en presente indicativo?', '¿Revisaste el artículo del sustantivo?'],
  },
  {
    id: 2, title: 'La famiglia', topic: 'La familia',
    prompt: 'Scrivi 4–5 frasi sulla tua famiglia. Descrivi almeno 2 membri: nome, età, professione e un aggettivo.',
    model: 'Ho una famiglia piccola. Mia madre si chiama Rosa. Ha 48 anni ed è insegnante. È molto gentile. Mio padre lavora in un\'azienda. Lui è alto e simpatico.',
    criteria: ['Describe al menos 2 miembros con "Mio/Mia..."', 'Incluye profesión para uno ("è insegnante/medico")', 'Usa al menos un adjetivo calificativo', 'Usa essere y avere correctamente'],
    vocab: ['Mio padre/Mia madre/Mio fratello/Mia sorella', 'si chiama', 'Ha ___ anni', 'è (professione)', 'lavora come', 'è (aggettivo)', 'gentile/simpatico/alto/divertente'],
    checklist: ['¿Usaste mio/mia correctamente según género?', '¿Usaste "Ha" para la edad?', '¿Los adjetivos concuerdan en género con el sustantivo?', '¿Pusiste "è" antes de la profesión?'],
  },
  {
    id: 3, title: 'La mia casa', topic: 'Mi casa',
    prompt: 'Scrivi 4–5 frasi per descrivere la tua casa. Usa "c\'è" e "ci sono" per descrivere cosa c\'è dentro.',
    model: 'Abito in un appartamento al terzo piano. Ci sono quattro stanze: un soggiorno, una cucina e due camere da letto. In soggiorno c\'è un divano grande e un televisore. Sul balcone ci sono dei fiori colorati. Il mio appartamento è piccolo ma accogliente.',
    criteria: ['Menciona el tipo de vivienda con "Abito in..."', 'Usa "c\'è" al menos una vez para singular', 'Usa "ci sono" al menos una vez para plural', 'Menciona al menos 2 habitaciones o áreas', 'Usa una preposición de lugar (su, in, vicino a...)'],
    vocab: ['Abito in', 'C\'è un/una', 'Ci sono', 'un soggiorno', 'una cucina', 'una camera da letto', 'un bagno', 'sul divano', 'in cucina', 'accogliente/comodo/piccolo/grande'],
    checklist: ['¿Usaste "c\'è" para singular y "ci sono" para plural?', '¿Mencionaste al menos 3 objetos o muebles?', '¿Usaste correctamente le preposizioni (su, in, vicino a)?', '¿Concordaron los artículos con el género de los sustantivos?'],
  },
  {
    id: 4, title: 'La mia giornata', topic: 'Rutina diaria',
    prompt: 'Scrivi 5–6 frasi sulla tua routine quotidiana. Usa espressioni di tempo (alle 7, la mattina, ogni giorno) e il presente indicativo.',
    model: 'Mi alzo alle sette di mattina. Faccio una doccia e poi faccio colazione. Di solito mangio toast e bevo caffè. Alle otto prendo l\'autobus per l\'università. Le lezioni iniziano alle nove. La sera guardo la televisione o leggo un libro.',
    criteria: ['Usa al menos 2 expresiones de tiempo (alle, di mattina, ogni...)', 'Menciona acciones de mañana y tarde/noche', 'Usa el presente indicativo correctamente', 'Conecta las frases con "poi", "quindi", "dopo"'],
    vocab: ['Mi alzo alle', 'Faccio la doccia', 'Faccio colazione', 'Di solito', 'prendo l\'autobus', 'Le lezioni iniziano alle', 'La sera', 'guardo la tv', 'leggo', 'vado a letto'],
    checklist: ['¿Usaste expresiones de tiempo con "alle" (a las)?', '¿Los verbos están conjugados en presente indicativo?', '¿La rutina tiene orden lógico (mattina → pomeriggio → sera)?', '¿Usaste conectores (poi, dopo, quindi)?'],
  },
  {
    id: 5, title: 'I miei gusti', topic: 'Gustos y preferencias',
    prompt: 'Scrivi 4–5 frasi sui tuoi gusti. Usa "mi piace" (singular) e "mi piacciono" (plural). Includi qualcosa che non ti piace.',
    model: 'Mi piace molto la musica pop. Mi piacciono i film d\'azione e le serie tv. Non mi piace alzarmi presto la mattina! Mi piace cucinare e mangiare con gli amici. Il mio cibo preferito è la pizza margherita.',
    criteria: ['Usa "mi piace" con sustantivo singular o verbo infinitivo', 'Usa "mi piacciono" con sustantivo plural', 'Incluye algo que no te gusta con "non mi piace/non mi piacciono"', 'Menciona tu comida o actividad favorita'],
    vocab: ['Mi piace molto', 'Mi piacciono', 'Non mi piace', 'Non mi piacciono', 'Adoro', 'Odio', 'Il mio preferito è', 'La mia preferita è', 'soprattutto', 'in particolare'],
    checklist: ['¿Usaste "mi piace" con singular y "mi piacciono" con plural?', '¿Incluiste al menos una negación?', '¿Mencionaste actividades (infinitivo) o cosas (sustantivo)?', '¿Concordaron género y número en los sustantivos?'],
  },
];

export default function EscrituraItalianoA1() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const task = TASKS.find(t => t.id === taskId) ?? null;

  if (!task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Scrittura · Italiano A1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Scrittura A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
            5 tareas guiadas con modelo del texto, banco de vocabulario y lista de verificación. Escribe en italiano y compara con el modelo.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {TASKS.map(t => (
              <button key={t.id} onClick={() => { setTaskId(t.id); setText(''); setSubmitted(false); setShowModel(false); }}
                style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid rgba(5,150,105,0.22)`, borderRadius: 16, background: 'linear-gradient(135deg, rgba(5,150,105,0.04) 0%, transparent 100%)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.15rem' }}>{t.title}</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>{t.topic} · {t.criteria.length} criterios de evaluación</p>
                  </div>
                  <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700 }}>→</span>
                </div>
              </button>
            ))}
          </div>
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
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <button onClick={() => setTaskId(null)} style={{ color: 'var(--muted)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>✍️ Scrittura</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{task.title}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Tarea {task.id} / 5 — {task.topic}</p>
        <h1 style={{ fontSize: '1.8rem', letterSpacing: '-0.03em', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.title}</h1>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consegna (Tarea)</p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.65 }}>{task.prompt}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{ flex: '1 1 200px', padding: '1rem 1.2rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Banco di vocaboli</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {task.vocab.map((v, i) => (
                <span key={i} style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', borderRadius: 6, background: 'rgba(5,150,105,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{v}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 200px', padding: '1rem 1.2rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Criteri (Criterios)</p>
            <ul style={{ margin: 0, padding: '0 0 0 1.1rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              {task.criteria.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

        <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
          placeholder="Scrivi qui in italiano..."
          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.97rem', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: '1rem' }} />

        {!submitted ? (
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" disabled={text.trim().length < 20} onClick={() => setSubmitted(true)} style={{ background: COLOR, borderColor: COLOR }}>
              Consegna e verifica →
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setTaskId(null)}>← Tutti i compiti</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)' }}>
              <p style={{ margin: '0 0 0.6rem', fontSize: '0.75rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Lista di controllo</p>
              {task.checklist.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--ink)' }}>
                  <span style={{ color: COLOR, fontSize: '0.9rem', flexShrink: 0 }}>□</span> {c}
                </div>
              ))}
            </div>
            <div>
              <button onClick={() => setShowModel(!showModel)} className="btn btn-ghost btn-sm" style={{ marginBottom: showModel ? '0.75rem' : 0 }}>
                {showModel ? '▲ Nascondere il modello' : '▼ Vedere il testo modello'}
              </button>
              {showModel && (
                <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Testo modello</p>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{task.model}</p>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setSubmitted(false); setText(''); }} style={{ background: COLOR, borderColor: COLOR }}>Riscrivere</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setTaskId(null)}>← Tutti i compiti</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
