'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titleIt: string; topic: string;
  prompt: string; model: string; criteria: string[];
  vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Una opinión personal', titleIt: "Un'opinione personale",
    topic: 'Congiuntivo + opinione',
    prompt: "Scrivi la tua opinione sui social media (100-120 parole). Usa espressioni di opinione con il congiuntivo: 'Penso che...', 'È importante che...', 'Sebbene...', 'Mi sembra che...', 'Ritengo che...'. Presenta sia i vantaggi che gli svantaggi.",
    model: "I social media hanno trasformato radicalmente il modo in cui comunichiamo. Penso che abbiano molti vantaggi: permettono di restare in contatto con persone lontane e di condividere idee. Tuttavia, ritengo che l'uso eccessivo possa essere dannoso. È importante che i giovani imparino a usarli in modo consapevole. Sebbene offrano opportunità straordinarie, mi sembra che spesso creino anche ansia e senso di inadeguatezza. A mio parere, sarebbe necessario che le scuole insegnassero un uso responsabile delle piattaforme digitali. In conclusione, penso che i social media siano uno strumento potente che richiede saggezza.",
    criteria: ['Usa almeno 4 espressioni di opinione con il congiuntivo', 'Presenta vantaggi E svantaggi', 'Includi almeno una congiunzione concessiva (sebbene/benché)', 'Concludi con una sintesi personale'],
    vocab: ['Penso che... sia/abbiano', 'È importante che...', 'Sebbene...', 'Mi sembra che...', 'Ritengo che...', 'A mio parere', 'In conclusione', 'tuttavia / nonostante'],
    checklist: ['¿Usaste el congiuntivo después de "penso che", "è importante che", "ritengo che"?', '¿Incluiste tanto ventajas como desventajas?', '¿Usaste "sebbene" o "benché" + congiuntivo?', '¿Tu opinión personal está clara?', '¿El texto tiene al menos 80 palabras?'],
  },
  {
    id: 2, title: 'Un email formal', titleIt: "Un'email formale",
    topic: 'Condizionale di cortesia + passivo',
    prompt: "Scrivi un'email formale di reclamo a un hotel (80-100 parole). Hai avuto problemi durante il tuo soggiorno: la camera non era pulita, il riscaldamento non funzionava e il personale era scortese. Usa il condizionale di cortesia: 'Vorrei segnalare...', 'Sarebbe necessario...'. Usa anche il passivo: 'Il problema è stato segnalato...', 'La camera non è stata pulita.'",
    model: "Gentile Direttore,\nVorrei segnalare alcuni problemi riscontrati durante il mio soggiorno presso il vostro hotel dal 15 al 17 marzo. La camera non è stata pulita adeguatamente all'arrivo e il riscaldamento non funzionava correttamente. Il problema è stato segnalato al personale, ma non è stata trovata una soluzione soddisfacente. Inoltre, lo staff si è mostrato poco disponibile. Sarebbe necessario migliorare la qualità del servizio. Vorrei ricevere una risposta scritta e un rimborso parziale della quota pagata.\nIn attesa di una risposta, porgo distinti saluti,\nClaudio Ferretti",
    criteria: ['Usa il condizionale di cortesia almeno 2 volte (Vorrei, Sarebbe)', 'Usa il passivo almeno 2 volte (è stato/è stata)', 'Mantieni un tono formale e professionale', 'Includi una richiesta specifica alla fine'],
    vocab: ['Gentile Direttore/Direttrice', 'Vorrei segnalare...', 'Sarebbe necessario...', 'Non è stato/stata...', 'è stato segnalato', 'distinti saluti', 'in attesa di una risposta', 'rimborso'],
    checklist: ['¿Usaste "Vorrei" y "Sarebbe" (condizionale) para las peticiones educadas?', '¿Incluiste formas pasivas (è stato/è stata + participio)?', '¿El tono es formal durante todo el texto?', '¿Hay una petición concreta al final?', '¿El email tiene saludo y despedida formales?'],
  },
  {
    id: 3, title: 'Confrontare due città', titleIt: 'Confrontare due città',
    topic: 'Comparativi + pronomi relativi',
    prompt: "Scrivi un testo comparativo su Roma e Milano (100-120 parole). Confronta le due città usando comparativi e pronomi relativi. Considera: dimensioni, cultura, economia, qualità della vita. Usa 'più/meno... di', 'la città che preferisco', 'quella in cui', 'dove'.",
    model: "Roma e Milano sono le due città italiane più famose nel mondo, ma sono molto diverse tra loro. Roma, che è la capitale, è più antica e ricca di storia di Milano. Il Colosseo e i Fori Imperiali sono monumenti che non hanno eguali al mondo. Milano, invece, è la città in cui si concentra la moda e la finanza italiana. È più moderna e cosmopolita di Roma, ma meno romantica. La qualità della vita a Roma è spesso considerata migliore grazie al clima e al cibo. Tuttavia, Milano offre più opportunità lavorative. La città che preferisco dipende dalle priorità: Roma per la cultura, Milano per la carriera.",
    criteria: ['Usa almeno 4 comparativi (più/meno... di/che)', 'Includi almeno 3 pronomi relativi diversi (che, in cui, dove)', 'Usa un superlativo relativo o assoluto', 'Confronta almeno 3 aspetti diversi delle città'],
    vocab: ['più... di / meno... di', 'la città che...', 'quella in cui...', 'dove si trova...', 'rispetto a', '-issimo/a', 'migliore / peggiore', 'a differenza di'],
    checklist: ['¿Usaste "di" cuando comparas dos sustantivos y "che" entre adjetivos?', '¿Los pronomi relativi son variados (che, in cui, dove)?', '¿Incluiste al menos un superlativo?', '¿Comparaste al menos 3 aspectos (historia, economía, vida, etc.)?'],
  },
  {
    id: 4, title: 'Una elección difícil', titleIt: 'Una scelta difficile',
    topic: 'Periodo ipotetico (se + cong. imperfetto → condizionale)',
    prompt: "Descrivi una scelta difficile ipotetica usando il periodo ipotetico dell'irrealtà (80-100 parole). Scegli uno di questi scenari: a) Se potessi vivere in qualsiasi paese, quale sceglieresti? b) Se potessi cambiare professione, cosa faresti? c) Se potessi tornare indietro nel tempo, cosa cambieresti? Usa la struttura: 'Se potessi/avessi/fossi... (farei/sarei/andrei...)'",
    model: "Se potessi scegliere di vivere in qualsiasi paese del mondo, sceglierei sicuramente il Giappone. Se vivessi lì, imparerei una lingua completamente diversa e scoprirei una cultura affascinante. Sarebbe un'esperienza che mi cambierebbe profondamente. Ovviamente, se lasciassi l'Italia, mi mancherebbero la famiglia e gli amici. Ma se avessi questa opportunità, la coglerei senza esitare. Penso che, se incontrassi delle difficoltà, le affronterei con entusiasmo. In fondo, se non si rischiasse mai, non si crescerebbe mai.",
    criteria: ['Usa almeno 4 períodos hipotéticos con "se + cong. imperfetto + condizionale"', 'NUNCA uses el condizionale después de "se"', 'Desarrolla la reflexión con detalles específicos', 'Incluye un aspecto positivo y uno negativo de la elección'],
    vocab: ['Se potessi...', 'Se fossi...', 'Se avessi...', 'Se vivessi...', 'farei / andrei / sarei', 'sceglierei / imparerei', 'mi mancherebbe / mi piacerebbe', 'in fondo / sicuramente'],
    checklist: ['¿Después de "se" siempre usaste congiuntivo imperfetto (potessi, fossi, avessi)?', '¿NUNCA usaste condizionale después de "se"?', '¿La frase principal tiene siempre el condizionale (farei, sarei, andrei)?', '¿Incluiste tanto aspectos positivos como negativos?'],
  },
  {
    id: 5, title: 'Un evento pasado', titleIt: 'Un evento passato',
    topic: 'Trapassato prossimo + passato prossimo',
    prompt: "Racconta un evento importante della tua vita (reale o inventato) usando il trapassato prossimo e il passato prossimo (80-100 parole). Il trapassato descrive azioni avvenute PRIMA dell'evento principale. Usa: 'Quando sono arrivato/a, lui aveva già...', 'Non avevo mai...', 'Avevano già deciso...'",
    model: "L'anno scorso ho partecipato al mio primo colloquio di lavoro per una grande azienda internazionale. Quando sono arrivato, avevo già studiato l'azienda per settimane e avevo preparato molte risposte. Prima di entrare, non avevo mai vissuto un'emozione simile. Il direttore aveva già letto il mio curriculum e mi ha accolto con calore. Abbiamo parlato per un'ora di progetti che non avevo ancora realizzato ma che speravo di fare. Alla fine, mi hanno offerto il lavoro. È stato il giorno più importante della mia carriera.",
    criteria: ['Usa il trapassato prossimo almeno 3 volte per azioni anteriori', 'Usa il passato prossimo per l\'evento principale', "Includi 'Quando sono arrivato/a...' o struttura simile", "Usa almeno un 'non avevo mai...' o 'avevo già...'"],
    vocab: ['Quando sono arrivato/a...', 'aveva già / avevo già', 'non avevo mai...', 'avevano deciso', 'è stato / sono andato', 'prima di + infinito', 'dopo che + trapassato', 'alla fine'],
    checklist: ['¿El trapassato (avevo/aveva + participio) describe acciones ANTERIORES al evento?', '¿El passato prossimo (ho/è + participio) describe el evento principal?', '¿Incluiste "avevo già" o "non avevo mai"?', '¿La narración es coherente y cronológicamente clara?'],
  },
];

export default function EscrituraItalianoB1() {
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
            <h2 style={{ margin: '0 0 0.5rem', color: '#059669' }}>Testo completato!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Salvato nella sessione — David o Zhanna possono rivederlo con te in classe.</p>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Scrivere di nuovo</button>
              <button className="btn btn-ghost btn-sm" onClick={back}>← Altri compiti</button>
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
            <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Italiano B1</Link>
            <span>/</span>
            <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Scrittura</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>Compito {task.id}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Scrittura Compito {task.id} — {task.topic}</p>
          <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.titleIt}</h2>

          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Consegna</div>
            <p style={{ margin: 0, fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.65, fontWeight: 600 }}>{task.prompt}</p>
          </div>

          <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
            {showModel ? '👁 Nascondere il modello' : '👁 Vedere un esempio di testo'}
          </button>
          {showModel && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Testo modello</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{task.model}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criteri di valutazione</div>
              {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
            </div>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Banco di vocabolario</div>
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
            placeholder="Scrivi qui il tuo testo in italiano..."
            style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 50 ? '#d97706' : '#059669' }}>
            <span>{words} parole {words < 50 ? '(minimo consigliato: 80)' : '✓'}</span>
          </div>

          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Lista di verifica prima di inviare</div>
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
            Inviare il testo →
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
          <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Scrittura · Italiano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Scrittura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          5 compiti guidati B1 con testo modello, banco di vocabolario e lista di verifica. Pratica il congiuntivo, il condizionale e il periodo ipotetico nella scrittura.
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
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.titleIt}</div>
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
