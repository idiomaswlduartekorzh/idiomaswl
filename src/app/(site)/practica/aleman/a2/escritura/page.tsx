'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; topic: string; grammar: string;
  prompt: string; promptDe: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Ein vergangenes Wochenende',
    topic: 'Freizeit und Reisen',
    grammar: 'Das Perfekt (haben / sein + Partizip II)',
    prompt: 'Escribe 5–6 oraciones sobre lo que hiciste el fin de semana pasado. Usa el Perfekt para narrar acciones terminadas en el pasado.',
    promptDe: 'Schreib 5–6 Sätze über dein letztes Wochenende. Benutze das Perfekt: was hast du gemacht? Wo bist du hingegangen? Was hast du gegessen?',
    model: 'Am letzten Wochenende bin ich mit meinen Freunden in die Stadt gefahren. Wir haben zuerst in einem Restaurant gegessen — ich habe Pasta bestellt. Nachmittags sind wir in den Park gegangen und haben Fußball gespielt. Abends haben wir einen Film gesehen. Es war ein sehr schönes Wochenende. Am Sonntag bin ich früh aufgestanden und habe zu Hause gelesen.',
    criteria: [
      'Usa al menos 4 verbos en Perfekt',
      'Usa "sein" con verbos de movimiento (fahren, gehen, laufen) y "haben" con el resto',
      'Incluye una expresión de tiempo (am Wochenende, nachmittags, abends)',
      'Describe al menos 3 actividades diferentes',
    ],
    vocab: ['Am letzten Wochenende', 'Ich bin ... gefahren/gegangen', 'Ich habe ... gemacht/gesehen/gegessen', 'zuerst ... dann ... danach', 'Es war sehr schön', 'Wir haben ... gespielt', 'Ich bin früh aufgestanden'],
    checklist: [
      '¿Usaste "sein" con verbos de movimiento (fahren→gefahren, gehen→gegangen)?',
      '¿Usaste "haben" con verbos transitivos (essen→gegessen, sehen→gesehen)?',
      '¿El Partizip II está al FINAL de la oración?',
      '¿Los sustantivos tienen mayúscula (Park, Restaurant, Film)?',
    ],
  },
  {
    id: 2,
    title: 'Zwei Dinge vergleichen',
    topic: 'Meinungen und Vergleiche',
    grammar: 'Komparativ und Superlativ',
    prompt: 'Compara dos cosas que conoces bien (dos ciudades, dos deportes, dos películas, etc.). Usa el Komparativ (... ist ... als ...) y el Superlativ (... ist am ...sten / der/die/das ...ste).',
    promptDe: 'Vergleiche zwei Dinge: Städte, Sportarten, Sprachen, Essen, Filme usw. Benutze Komparativ und Superlativ. Min. 5 Sätze.',
    model: 'Ich denke, Bogotá ist größer als Medellín, aber Medellín ist wärmer und entspannter. Die Berge in Medellín sind höher als in Bogotá. Bogotá ist teurer — das ist der größte Unterschied. Für das Wetter ist Medellín am besten: es ist weder zu heiß noch zu kalt. Trotzdem finde ich Bogotá kulturell interessanter, weil es mehr Museen gibt. Aber das Essen in Medellín ist genauso gut wie in Bogotá.',
    criteria: [
      'Usa al menos 3 Komparative (Adj + -er + als)',
      'Usa al menos 1 Superlativ (am + Adj + -sten o der/die/das + Adj + -ste)',
      'Incluye una comparación de igualdad (genauso ... wie)',
      'Justifica al menos una comparación (weil, deshalb, trotzdem)',
    ],
    vocab: ['... ist größer/besser/schöner als ...', 'Am besten/schönsten/interessantesten', 'der/die/das ... ste', 'genauso ... wie', 'Aber / Trotzdem / Deshalb', 'Der größte Unterschied ist', 'Ich denke / Ich finde', 'Einerseits ... andererseits'],
    checklist: [
      '¿Los Komparative usan "-er + als" (no "mehr + adj")?',
      '¿Los Superlative predikativos usan "am ... -sten"?',
      '¿Los Superlative atributivos usan artículo (der beste / die schönste)?',
      '¿Los Adjektive irregulares son correctos (gut→besser, groß→größer, viel→mehr)?',
    ],
  },
  {
    id: 3,
    title: 'Meine Zukunftspläne',
    topic: 'Zukunft und Pläne',
    grammar: 'werden + Infinitiv, Modalverben (wollen, möchten)',
    prompt: 'Escribe 5–6 oraciones sobre tus planes y metas para el futuro. Usa "werden + Infinitiv" para hacer predicciones y "wollen / möchten" para expresar deseos.',
    promptDe: 'Was wirst du in Zukunft machen? Was willst du erreichen? Schreib über deine Pläne: Beruf, Familie, Reisen, Sprachen...',
    model: 'In der Zukunft werde ich mehr Sprachen lernen — ich möchte fließend Deutsch sprechen. Nächstes Jahr werde ich eine Sprachreise nach Deutschland machen. Ich will auch meinen Abschluss machen und danach eine gute Stelle finden. In fünf Jahren werde ich vielleicht im Ausland arbeiten. Ich möchte auch eine eigene Familie haben und in einer schönen Stadt wohnen. Das sind meine wichtigsten Ziele.',
    criteria: [
      'Usa "werden + Infinitiv" al menos 3 veces',
      'Usa "wollen" o "möchten" al menos 2 veces',
      'Incluye expresiones temporales (nächstes Jahr, in fünf Jahren, in Zukunft)',
      'Menciona al menos 3 áreas diferentes (trabajo, familia, idiomas, viajes, etc.)',
    ],
    vocab: ['Ich werde ... (machen/lernen/arbeiten)', 'Ich möchte ...', 'Ich will ...', 'Nächstes Jahr / In fünf Jahren', 'In der Zukunft / Irgendwann', 'meinen Abschluss machen', 'im Ausland arbeiten', 'fließend ... sprechen', 'Das sind meine Ziele'],
    checklist: [
      '¿El Infinitiv está al FINAL con "werden" (Ich werde ... lernen)?',
      '¿Usaste "möchte" (más suave) y "will" (determinado) correctamente?',
      '¿Las expresiones de tiempo están en la posición correcta?',
      '¿Los sustantivos tienen mayúscula (Sprachen, Familie, Stelle)?',
    ],
  },
  {
    id: 4,
    title: 'Ratschläge geben',
    topic: 'Ratschläge und Empfehlungen',
    grammar: 'Modalverben: sollen / müssen / dürfen + Infinitiv',
    prompt: 'Un amigo tuyo quiere aprender alemán pero no sabe cómo empezar. Dale 5–6 consejos en alemán. Usa los Modalverben para dar recomendaciones.',
    promptDe: 'Dein Freund/Deine Freundin möchte Deutsch lernen. Gib ihm/ihr Ratschläge mit Modalverben: sollen, müssen, dürfen (nicht), können.',
    model: 'Wenn du Deutsch lernen willst, musst du jeden Tag üben — auch nur 20 Minuten. Du solltest einen Sprachkurs belegen oder eine App benutzen. Du kannst auch deutsche Filme mit Untertiteln schauen. Du darfst keine Angst vor Fehlern haben — Fehler sind normal! Am besten solltest du auch mit Muttersprachlern sprechen. Du musst nicht alles sofort perfekt machen. Mit Geduld und Übung wirst du bald Fortschritte machen.',
    criteria: [
      'Usa "müssen" (obligación), "sollen" (consejo), "dürfen nicht" (prohibición/advertencia)',
      'Da al menos 5 consejos diferentes',
      'Incluye al menos un consejo negativo (darf nicht / muss nicht)',
      'Usa el registro "du" (informal, para un amigo)',
    ],
    vocab: ['Du musst ...', 'Du solltest ...', 'Du kannst ...', 'Du darfst nicht ...', 'Du musst nicht ...', 'Am besten ...', 'Ich empfehle dir ...', 'Es ist wichtig, dass du ...', 'Mit Geduld und Übung', 'Fehler sind normal'],
    checklist: [
      '¿El Infinitiv va al FINAL de la oración con los Modalverben?',
      '¿Usaste "sollen" para consejo (du sollst/solltest) y "müssen" para obligación?',
      '¿"Dürfen nicht" para lo que NO se debe hacer (prohibición)?',
      '¿Los verbos Modalverben están conjugados en la persona correcta (du → musst/sollst/darfst/kannst)?',
    ],
  },
  {
    id: 5,
    title: 'Eine formelle E-Mail',
    topic: 'Formelle Kommunikation',
    grammar: 'Sie-Form, höfliche Sprache, Konjunktiv II (möchte, würde, könnte)',
    prompt: 'Escribe una e-mail formal en alemán: solicita información sobre un curso de alemán en una escuela de idiomas. Usa la forma "Sie" (usted) y lenguaje formal.',
    promptDe: 'Schreib eine formelle E-Mail an eine Sprachschule. Du fragst nach einem Deutschkurs: Kosten, Zeiten, Kursniveau, Anmeldung. Benutze die Sie-Form.',
    model: `Sehr geehrte Damen und Herren,\n\nmein Name ist Carlos Gómez und ich interessiere mich für Ihre Deutschkurse. Ich lerne seit sechs Monaten Deutsch und mein aktuelles Niveau ist A1–A2.\n\nKönnten Sie mir bitte Informationen über Ihre A2-Kurse schicken? Ich würde gern wissen, wann die Kurse stattfinden und wie viel sie kosten. Außerdem möchte ich fragen, ob es auch Online-Kurse gibt.\n\nIch freue mich auf Ihre Antwort.\n\nMit freundlichen Grüßen,\nCarlos Gómez`,
    criteria: [
      'Usa la apertura formal: "Sehr geehrte Damen und Herren" o "Sehr geehrter Herr / Sehr geehrte Frau ___"',
      'Usa la Sie-Form (Sie/Ihnen/Ihre) en todo el texto',
      'Incluye al menos 2 preguntas con Konjunktiv II (könnten Sie, würde gern, möchte fragen)',
      'Cierra con: "Mit freundlichen Grüßen" + nombre',
    ],
    vocab: ['Sehr geehrte/r ...', 'Ich interessiere mich für ...', 'Könnten Sie mir ... schicken?', 'Ich würde gern wissen, ...', 'Ich möchte fragen, ob ...', 'Wann findet der Kurs statt?', 'Was kostet der Kurs?', 'Ich freue mich auf Ihre Antwort.', 'Mit freundlichen Grüßen'],
    checklist: [
      '¿Usaste "Sie" (mayúscula) para el usted formal en todo el texto?',
      '¿Abriste con "Sehr geehrte/r..."?',
      '¿Cerraste con "Mit freundlichen Grüßen"?',
      '¿Usaste Konjunktiv II para las peticiones (könnten, würde, möchte)?',
      '¿Los verbos en las preguntas indirectas van al final ("ob es... gibt")?',
    ],
  },
];

export default function EscrituraAlemanA2() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setCheckDone({}); }

  if (submitted && task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
          <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>Text abgeschickt!</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Wird von David oder Zhanna korrigiert.</p>
          <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Nochmal schreiben</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Andere Aufgaben</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Deutsch A2</Link>
          <span>/</span>
          <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Schreiben</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Aufgabe {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Schreibaufgabe {task.id} — {task.topic}</p>
        <h2 style={{ fontSize: '1.7rem', margin: '0 0 0.4rem', fontWeight: 700 }}>{task.title}</h2>
        <div style={{ display: 'inline-block', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700, marginBottom: '1.25rem' }}>Grammatik: {task.grammar}</div>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Aufgabe (español)</div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Auf Deutsch</div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.promptDe}</p>
        </div>

        <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
          {showModel ? '▲ Mustertext ausblenden' : '▼ Mustertext sehen'}
        </button>
        {showModel && (
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Mustertext</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', whiteSpace: 'pre-line' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Bewertungskriterien</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Wortschatz — klicken</div>
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

        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Schreib deinen Text auf Deutsch hier..."
          style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 30 ? '#d97706' : '#059669' }}>
          <span>{words} Wörter {words < 30 ? '(Minimum empfohlen: 40)' : '✓'}</span>
        </div>

        <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Checkliste vor dem Abschicken</div>
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
          Abschicken →
        </button>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Schreiben</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Schreiben · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Schreiben A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 Aufgaben con gramática integrada, Mustertext, vocabulario de apoyo y checkliste.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.title}</div>
                  <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic}</p>
                  <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 5, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.grammar}</span>
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
