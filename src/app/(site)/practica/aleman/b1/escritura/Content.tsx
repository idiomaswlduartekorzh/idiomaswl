'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titleDe: string; topic: string;
  prompt: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Meine Meinung',
    titleDe: 'Meinungsäußerung',
    topic: 'Konjunktiv II + Meinungsäußerung',
    prompt: 'Escribe tu opinión sobre las redes sociales (5–6 oraciones). Usa "Ich glaube, dass...", "Meiner Meinung nach...", "Wenn ich... würde ich...", "Es wäre besser, wenn..."',
    model: 'Meiner Meinung nach haben soziale Medien sowohl Vor- als auch Nachteile. Ich glaube, dass sie eine wichtige Rolle bei der Kommunikation spielen. Wenn ich jedoch die Nutzungszeit reduzieren könnte, würde ich das tun. Es wäre besser, wenn Menschen mehr Zeit im echten Leben miteinander verbringen würden. Andererseits wäre ich ohne soziale Medien weniger gut informiert. Ich bin der Überzeugung, dass man diese Plattformen bewusst nutzen sollte.',
    criteria: [
      'Usa al menos 2 expresiones de opinión (Meiner Meinung nach, Ich glaube, dass...)',
      'Incluye al menos 1 Konjunktiv II (würde, wäre, könnte)',
      'Presenta dos perspectivas (Vor- und Nachteile)',
      'Usa conectores (jedoch, andererseits, aber, trotzdem)',
    ],
    vocab: ['Meiner Meinung nach...', 'Ich glaube, dass...', 'Ich bin der Überzeugung, dass...', 'Es wäre besser, wenn...', 'Wenn ich ... würde ich...', 'sowohl ... als auch', 'andererseits', 'Einerseits ... andererseits'],
    checklist: [
      '¿Usaste Konjunktiv II correctamente (würde + Infinitiv, wäre, könnte)?',
      '¿Los verbos de los "dass"-Sätze van al FINAL?',
      '¿Presentaste más de una perspectiva?',
      '¿Los sustantivos tienen mayúscula (Meinung, Nachteil, Plattform)?',
    ],
  },
  {
    id: 2,
    title: 'Ein formeller Brief',
    titleDe: 'Formeller Beschwerdebrief',
    topic: 'Höflichkeit mit Konjunktiv II + Passiv',
    prompt: 'Escribe una carta formal de queja (hotel o producto defectuoso, 5–6 oraciones). Usa "Ich würde mich freuen, wenn...", "Es wurde mir versprochen, dass...", "Das Problem wurde ... nicht gelöst.", "Könnten Sie...?"',
    model: `Sehr geehrte Damen und Herren,\n\nIch schreibe Ihnen bezüglich meines Aufenthalts in Ihrem Hotel vom 15. bis 18. Juni. Leider wurde mir ein Zimmer mit Meeresblick versprochen, das jedoch nicht zur Verfügung gestellt wurde. Das Problem wurde trotz mehrerer Beschwerden an der Rezeption nicht gelöst. Ich würde mich freuen, wenn Sie mir eine Entschädigung anbieten würden. Könnten Sie mir bitte erklären, wie dieser Fehler passieren konnte?\n\nIch erwarte Ihre baldige Rückmeldung.\n\nMit freundlichen Grüßen`,
    criteria: [
      'Usa apertura formal: "Sehr geehrte Damen und Herren"',
      'Incluye al menos 1 construcción de Passiv (wurde versprochen, wurde gelöst)',
      'Usa Konjunktiv II para peticiones corteses (würde mich freuen, könnten Sie)',
      'Cierra con "Mit freundlichen Grüßen"',
    ],
    vocab: ['Sehr geehrte Damen und Herren,', 'bezüglich meines/meiner...', 'Es wurde mir versprochen, dass...', 'Das Problem wurde ... nicht gelöst.', 'Ich würde mich freuen, wenn...', 'Könnten Sie mir bitte...?', 'Ich erwarte Ihre baldige Rückmeldung.', 'Mit freundlichen Grüßen'],
    checklist: [
      '¿Usaste "Sie" (mayúscula) para el usted formal en todo el texto?',
      '¿Usaste Passiv Perfekt (wurde + Partizip II) para describir lo que ocurrió?',
      '¿Las peticiones usan Konjunktiv II (könnten, würde)?',
      '¿Abriste con "Sehr geehrte/r..." y cerraste con "Mit freundlichen Grüßen"?',
    ],
  },
  {
    id: 3,
    title: 'Zwei Städte vergleichen',
    titleDe: 'Stadtvergleich',
    topic: 'Komparativ + Relativsätze',
    prompt: 'Compara Berlín y Múnich (o dos ciudades que conozcas) en 5–6 oraciones. Usa comparativos (... ist größer als...), Relativsätze (die Stadt, die ich...) y conectores de contraste.',
    model: 'Berlin ist die größte Stadt Deutschlands und hat eine faszinierende Geschichte. München hingegen, das im Süden Deutschlands liegt, ist bekannt für sein Oktoberfest und seine Gemütlichkeit. Berlin ist günstiger als München, was die Lebenshaltungskosten betrifft. Die Mieten, die in München am höchsten sind, machen das Leben dort teurer. Trotzdem hat München eine niedrigere Arbeitslosenquote als Berlin. Ich würde lieber in Berlin wohnen, weil es internationaler und vielfältiger ist.',
    criteria: [
      'Usa al menos 2 Komparative (größer als, günstiger als, höher als)',
      'Incluye al menos 1 Relativsatz con Nominativ o Dativ',
      'Usa conectores de contraste (hingegen, trotzdem, jedoch, aber)',
      'Menciona al menos 3 aspectos de comparación',
    ],
    vocab: ['... ist größer/schöner/teurer als...', 'Berlin hingegen...', 'München, das/die...', 'was ... betrifft', 'Trotzdem...', 'Ich würde lieber ... wohnen, weil...', 'am höchsten/größten/günstigsten', 'im Vergleich zu...'],
    checklist: [
      '¿Los Komparative usan "-er + als" (no "mehr + adj")?',
      '¿El pronombre relativo concuerda en género y caso con el Bezugsnomen?',
      '¿El Verb del Relativsatz va al FINAL?',
      '¿Usaste conectores de contraste para contrastar las ciudades?',
    ],
  },
  {
    id: 4,
    title: 'Eine schwierige Entscheidung',
    titleDe: 'Hypothetische Entscheidung',
    topic: 'Konjunktiv II (Wenn...)',
    prompt: 'Describe una elección hipotética difícil (5–6 oraciones). Usa "Wenn ich die Wahl hätte, würde ich...", "Einerseits würde ich..., andererseits...", "Am Ende wäre mir ... wichtiger."',
    model: 'Wenn ich die Wahl hätte zwischen einem gut bezahlten Job und einem sinnvollen Job, wäre das sehr schwierig. Einerseits würde ich gerne viel Geld verdienen, um meiner Familie ein komfortables Leben zu ermöglichen. Andererseits wäre mir Zufriedenheit bei der Arbeit langfristig wichtiger. Wenn ich ehrlich bin, würde ich den sinnvollen Job wählen. Ohne Begeisterung für die Arbeit könnte ich nicht mein Bestes geben. Am Ende wäre mir das Gefühl, etwas Wichtiges zu tun, wichtiger als das Gehalt.',
    criteria: [
      'Usa al menos 2 Wenn-Sätze con Konjunktiv II',
      'Presenta ambos lados de la decisión (einerseits / andererseits)',
      'Incluye la construcción "wäre mir ... wichtiger"',
      'Usa al menos 1 Konjunktiv II modal (könnte, würde, müsste)',
    ],
    vocab: ['Wenn ich die Wahl hätte...', 'Einerseits würde ich...', 'Andererseits wäre mir...', 'Am Ende wäre mir ... wichtiger.', 'Wenn ich ehrlich bin...', 'Ohne ... könnte ich nicht...', 'langfristig', 'kurzfristig'],
    checklist: [
      '¿Los Wenn-Sätze usan Konjunktiv II (hätte, wäre, würde)?',
      '¿Después del Wenn-Satz hay Inversion en el Hauptsatz?',
      '¿Usaste "einerseits" y "andererseits" para contrastar?',
      '¿Los verbos en los Nebensätzen van al FINAL?',
    ],
  },
  {
    id: 5,
    title: 'Ein vergangenes Ereignis',
    titleDe: 'Narración en pasado',
    topic: 'Plusquamperfekt + Vergangenheit',
    prompt: 'Describe un evento importante de tu pasado usando Plusquamperfekt y Präteritum/Perfekt (5–6 oraciones). Usa "Bevor ich ankam, hatte er schon...", "Nachdem wir... gegessen hatten, gingen wir..."',
    model: 'Letztes Jahr besuchte ich eine wichtige Konferenz in meiner Stadt. Bevor ich ankam, hatte das Organisationsteam bereits alles vorbereitet. Nachdem wir alle Vorträge gehört hatten, gingen wir in ein Restaurant essen. Während wir aßen, diskutierten wir über die Themen der Konferenz. Ich hatte noch nie so viele interessante Menschen getroffen. Als ich nach Hause kam, war ich erschöpft aber sehr zufrieden.',
    criteria: [
      'Usa al menos 2 construcciones con Plusquamperfekt (hatte/war + Partizip II)',
      'Usa "nachdem" o "bevor" con Plusquamperfekt',
      'Combina diferentes tiempos verbales (Perfekt, Präteritum, Plusquamperfekt)',
      'Incluye expresiones temporales (bevor, nachdem, während, als)',
    ],
    vocab: ['Bevor ich ankam, hatte ... schon...', 'Nachdem wir ... hatten, ...ten wir...', 'Als ich ... war, ...', 'Während wir ... aßen/sprachen...', 'hatte noch nie...', 'war bereits...', 'erschöpft aber zufrieden'],
    checklist: [
      '¿El Plusquamperfekt usa "hatte/war + Partizip II" (no solo Perfekt)?',
      '¿Después de "Nachdem"-Satz hay Inversion en el Hauptsatz?',
      '¿"Als" se usa para una situación pasada única (no "wenn")?',
      '¿Los sustantivos tienen mayúscula?',
    ],
  },
];

export default function EscrituraAlemanB1() {
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
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Deutsch B1</Link>
          <span>/</span>
          <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Schreiben</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Aufgabe {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Schreibaufgabe {task.id} — {task.titleDe}</p>
        <h2 style={{ fontSize: '1.7rem', margin: '0 0 0.4rem', fontWeight: 700 }}>{task.title}</h2>
        <div style={{ display: 'inline-block', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700, marginBottom: '1.25rem' }}>Thema: {task.topic}</div>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Aufgabe</div>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
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
          <span>{words} Wörter {words < 40 ? '(Minimum empfohlen: 50)' : '✓'}</span>
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
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Schreiben</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Schreiben · Deutsch B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Schreiben B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 Aufgaben B1 con gramática integrada, Mustertext, vocabulario de apoyo y checkliste.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.title} — {t.titleDe}</div>
                  <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic}</p>
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
