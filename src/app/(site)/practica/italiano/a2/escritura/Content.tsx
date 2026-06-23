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
    id: 1, title: "Un'email a un amico", topic: 'Passato prossimo',
    prompt: "Scrivi un'email a un amico italiano contando un fine settimana speciale. Usa il passato prossimo. Includi: dove sei andato/a, con chi, cosa hai fatto, cosa hai mangiato, e com'è stato.",
    model: "Caro Marco, come stai? Voglio raccontarti del mio weekend! Sabato sono andato a Napoli con Sofia. Siamo partiti presto la mattina e siamo arrivati verso le 11. Abbiamo visitato il centro storico e abbiamo mangiato la pizza più buona della nostra vita. Nel pomeriggio siamo saliti sul Vesuvio — è stata un'esperienza incredibile! La domenica abbiamo visto il Museo Nazionale. È stato un weekend fantastico. La prossima volta devi venire anche tu! Un abbraccio, Luca",
    criteria: ['Usa almeno 4 verbi al passato prossimo (2 con avere, 2 con essere)', 'Includi espressioni di tempo passato (sabato, la domenica, nel pomeriggio)', 'Menziona almeno una persona con cui sei andato/a', 'Usa almeno un aggettivo per descrivere l\'esperienza'],
    vocab: ['Sabato / La domenica', 'Sono andato/a', 'Ho visitato / mangiato', 'Siamo partiti', 'È stato / È stata', 'Un abbraccio', 'Com\'è stato?', 'Nel pomeriggio / La mattina'],
    checklist: ['¿Todos los verbos están en passato prossimo?', '¿Usaste essere con los verbos de movimiento (andare, partire, arrivare)?', '¿El participio concuerda con el sujeto cuando usas essere?', '¿Incluiste expresiones de tiempo?', '¿El tono es informal y amistoso?'],
  },
  {
    id: 2, title: 'Il mio anno scorso', topic: 'Passato prossimo + imperfetto',
    prompt: "Scrivi un racconto breve di qualcosa che hai fatto o che ti è successo l'anno scorso. Usa il passato prossimo per eventi specifici e l'imperfetto per descrivere lo stato di cose o le abitudini. Scrivi 5-6 frasi.",
    model: "L'anno scorso ho iniziato a studiare l'italiano. All'inizio era difficile e mi sentivo frustrato spesso. Studiavo ogni giorno per un'ora, ma i progressi sembravano lenti. Un giorno ho incontrato una coppia italiana in un bar e ho parlato con loro per la prima volta. Erano sorpresi dalla mia pronuncia! Da quel momento, ho capito che potevo farcela. È stata un'esperienza che ha cambiato il mio approccio allo studio delle lingue.",
    criteria: ['Usa almeno 3 verbi al passato prossimo per eventi puntuali', 'Usa almeno 2 verbi all\'imperfetto per stati o abitudini', 'Incluye una transición temporal (un giorno, da quel momento, all\'inizio)', 'Cierra con una reflexión personal'],
    vocab: ["L'anno scorso", 'Ho iniziato / ho capito', 'Studiavo / mi sentivo', 'All\'inizio / Un giorno', 'Da quel momento', 'È stato/a', 'Mi sono reso/a conto', 'Nonostante'],
    checklist: ['¿Usaste imperfetto para las situaciones continuas y habituales?', '¿Usaste passato prossimo para eventos puntuales y conclusos?', '¿Las dos formas verbales se alternan de manera correcta?', '¿Incluiste un marcador temporal que señale el contraste?'],
  },
  {
    id: 3, title: 'La mia città ideale', topic: 'Comparativo e superlativo',
    prompt: 'Descrivi la tua città ideale usando comparativi e superlativi. Confronta questa città immaginaria con una reale che conosci. Scrivi 5-6 frasi.',
    model: "La mia città ideale sarebbe più piccola di Milano ma più vivace di un villaggio di campagna. Le strade sarebbero più pulite di qualsiasi città che conosca. Ci sarebbero parchi bellissimi — i più grandi e verdi che si possano immaginare. Il trasporto pubblico funzionerebbe meglio di quello italiano e sarebbe molto più economico. I ristoranti offrirebbero il cibo più buono e più fresco della regione. In questa città, la qualità della vita sarebbe ottima — la migliore possibile.",
    criteria: ['Usa almeno 3 comparativi (più/meno + aggettivo + di/che)', 'Includi almeno 2 superlativi (relativi o assoluti)', 'Usa almeno un superlativo irregolare (migliore, peggiore, ottimo, pessimo)', 'Da una descrizione completa con detalles específicos'],
    vocab: ['più / meno ... di', 'più ... che', 'il più / la più', '-issimo/a', 'migliore / peggiore', 'ottimo / pessimo', 'rispetto a', 'a differenza di'],
    checklist: ['¿Usaste "di" cuando comparas dos sustantivos?', '¿Usaste "che" cuando comparas dos adjetivos o verbos?', '¿Los superlativos relativos tienen el artículo determinado?', '¿Usaste algún superlativo irregular (migliore, ottimo)?'],
  },
  {
    id: 4, title: 'Piani per le vacanze', topic: 'Futuro semplice',
    prompt: "Scrivi dei tuoi piani per le prossime vacanze usando il futuro semplice. Includi: dove andrai, con chi, cosa farai, cosa vedrai, cosa mangerai. Scrivi 5-6 frasi.",
    model: "Quest'estate andrò in Puglia con la mia famiglia. Partiremo a luglio e resteremo due settimane. Visiteremo Alberobello con i suoi trulli famosi e nuoteremo nel mare cristallino. Mangeremo orecchiette fresche e taralli ogni giorno — sarà delizioso! Mia sorella ha detto che il mare pugliese è il più bello d'Italia. Farà caldo, ma troveremo sempre un posto all'ombra. Non vedo l'ora di partire — sarà la vacanza più bella dell'anno!",
    criteria: ['Usa almeno 4 verbi al futuro semplice', 'Includi almeno un futuro irregolare (andare, essere, fare, venire, ecc.)', 'Specifica date o periodi (quest\'estate, a luglio, la settimana prossima)', 'Chiudi con una espressione di entusiasmo'],
    vocab: ["Quest'estate / L'anno prossimo", 'Andrò / Partirò', 'Visiterò / Mangerò', 'Sarà / Farà', 'Resterò / Vedrò', 'Non vedo l\'ora di', 'Probabilmente', 'Con tutta la famiglia'],
    checklist: ['¿Usaste futuro semplice y no presente?', '¿Los irregulares están correctamente formados? (andrò, farò, sarò)', '¿Incluiste detalles específicos sobre el lugar y las actividades?', '¿La redacción es coherente y entusiasta?'],
  },
  {
    id: 5, title: 'Una recensione di un film', topic: 'Passato prossimo + comparativo + superlativo',
    prompt: "Scrivi una breve recensione di un film che hai visto recentemente. Racconta di cosa parla, cosa ti è piaciuto e cosa no, e confrontalo con altri film simili. Scrivi 5-6 frasi.",
    model: "La settimana scorsa ho visto 'La vita è bella' di Roberto Benigni. È un film commovente che parla di un padre che cerca di proteggere suo figlio durante la Seconda Guerra Mondiale. La storia è più emozionante di qualsiasi altro film che abbia mai visto. Benigni è bravissimo — è uno degli attori più talentuosi del cinema italiano. L'unico difetto è che alcune scene sono molto difficili da guardare. Ho pianto tantissimo, ma è stata comunque un'esperienza meravigliosa. Lo consiglio assolutamente!",
    criteria: ['Presenta el título y el director del film', 'Resume brevemente la trama sin revelar el final', 'Usa comparativos o superlativos para describir el film', 'Da tu opinión personal con al menos un punto positivo y uno negativo'],
    vocab: ['La settimana scorsa ho visto', 'Il film parla di', 'È più ... di', 'È il più / la più ... che', '-issimo/a', 'Secondo me / A mio parere', 'Lo consiglio perché', 'L\'unico difetto è che'],
    checklist: ['¿Presentaste el film con título y director?', '¿Usaste passato prossimo para contar lo que viste/sentiste?', '¿Incluiste comparativos o superlativos para tu evaluación?', '¿Tu opinión personal está clara al final?'],
  },
];

export default function EscrituraItalianoA2() {
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
            <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Italiano A2</Link>
            <span>/</span>
            <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Scrittura</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>Compito {task.id}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Scrittura Compito {task.id} — {task.topic}</p>
          <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.title}</h2>

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
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 30 ? '#d97706' : '#059669' }}>
            <span>{words} parole {words < 30 ? '(minimo consigliato: 40)' : '✓'}</span>
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
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Scrittura · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Scrittura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          5 compiti guidati con testo modello, banco di vocabolario e lista di verifica.
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
