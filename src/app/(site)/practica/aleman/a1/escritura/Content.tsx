'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

interface WritingTask {
  id: number; title: string; topic: string;
  prompt: string; promptDe: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id:1, title:'Ich stelle mich vor', topic:'Vorstellung',
    prompt:'Escribe 4–5 oraciones en alemán presentándote: nombre, edad, ciudad y lo que haces.',
    promptDe:'Schreib 3–5 Sätze: dein Name und Alter, wo du wohnst, was du machst und was du magst.',
    model:'Hallo! Ich heiße Carlos. Ich bin 25 Jahre alt. Ich wohne in Medellín, in Kolumbien. Ich studiere Informatik. Ich mag Musik und Fußball.',
    criteria:['Usa "Ich heiße" para el nombre','Usa "Ich bin ___ Jahre alt" para la edad (no "Ich habe")','Menciona dónde vives (Ich wohne in...)','Incluye qué haces (Ich studiere/arbeite)'],
    vocab:['Ich heiße','Ich bin ___ Jahre alt','Ich wohne in','Ich studiere','Ich arbeite','Ich mag','Ich lerne Deutsch','Ich komme aus'],
    checklist:['¿Usaste "Ich bin" para la edad (no "Ich habe")?','¿Los sustantivos tienen mayúscula (Musik, Fußball, Berlin)?','¿Los verbos están en primera persona (-e: ich lerne, ich wohne)?','¿Pusiste punto al final de cada oración?'],
  },
  {
    id:2, title:'Meine Familie', topic:'Die Familie',
    prompt:'Describe tu familia en 4–5 oraciones: miembros, nombres, edades y profesiones.',
    promptDe:'Schreib über deine Familie: Wer ist in deiner Familie? Wie heißen sie? Was machen sie?',
    model:'Meine Familie ist klein. Mein Vater heißt Roberto. Er ist 55 Jahre alt und er ist Arzt. Meine Mutter heißt Carmen. Sie ist Lehrerin. Ich habe eine Schwester. Sie heißt Laura.',
    criteria:['Usa "Mein/Meine" correctamente (Mein Vater / Meine Mutter)','Describe al menos 2 miembros de la familia','Incluye profesión sin artículo (Er ist Arzt)','Usa "heißt" para el nombre de otros (Mein Vater heißt...)'],
    vocab:['Mein Vater/Bruder heißt','Meine Mutter/Schwester heißt','Er/Sie ist ___ Jahre alt','Er ist Arzt/Ingenieur/Lehrer','Sie ist Ärztin/Lehrerin','Ich habe einen Bruder/eine Schwester','Wir sind eine Familie'],
    checklist:['¿Usaste "Mein" para masculino y "Meine" para femenino?','¿La profesión va sin artículo (Er ist Arzt, nicht "ein Arzt")?','¿Usaste "Er" para hombres y "Sie" para mujeres?','¿Los sustantivos tienen mayúscula (Familie, Bruder, Arzt)?'],
  },
  {
    id:3, title:'Meine Wohnung', topic:'Die Wohnung',
    prompt:'Describe tu casa o apartamento en 4–5 oraciones. Usa "Es gibt" para decir qué hay.',
    promptDe:'Schreib über deine Wohnung: Wie viele Zimmer hat sie? Was gibt es darin?',
    model:'Ich wohne in einer Wohnung in Bogotá. Die Wohnung hat drei Zimmer: ein Wohnzimmer, ein Schlafzimmer und eine Küche. Es gibt auch ein Bad. Im Wohnzimmer steht ein Sofa. Meine Wohnung ist nicht groß, aber sehr gemütlich.',
    criteria:['Usa "Es gibt" para describir contenido (Es gibt ein Bad)','Menciona al menos 2 Zimmer (Wohnzimmer, Schlafzimmer, Küche, Bad)','Usa un adjetivo (groß, klein, gemütlich, schön)','Usa "hat" para hablar de lo que tiene la casa'],
    vocab:['Die Wohnung hat','Es gibt','Im Wohnzimmer/Schlafzimmer/in der Küche','ein Sofa/ein Bett/einen Tisch','groß/klein/gemütlich/schön','nicht sehr groß, aber...'],
    checklist:['¿Usaste "Es gibt" + artículo (ein/eine)?','¿Los cuartos tienen artículo correcto (das Wohnzimmer / die Küche)?','¿Usaste "Im" (en el = in dem)  para ubicar cosas?','¿Los sustantivos tienen mayúscula?'],
  },
  {
    id:4, title:'Mein Alltag', topic:'Die Tagesroutine',
    prompt:'Escribe 5–6 oraciones sobre tu rutina diaria. Usa expresiones de tiempo (um ___ Uhr, morgens, abends).',
    promptDe:'Schreib über deinen Alltag. Benutze Zeitangaben: um ___ Uhr, morgens, mittags, abends.',
    model:'Jeden Morgen stehe ich um sieben Uhr auf. Ich dusche und frühstücke. Um acht Uhr fahre ich mit dem Bus zur Universität. Mittags esse ich in der Mensa. Abends lerne ich Deutsch. Um elf Uhr gehe ich schlafen.',
    criteria:['Usa al menos 2 expresiones de tiempo (um ___ Uhr, morgens, mittags, abends)','Incluye verbos separables (aufstehen = stehe auf, fernsehen = sehe fern)','La rutina tiene orden lógico','Usa conjunciones (und, dann, danach)'],
    vocab:['Um ___ Uhr','Jeden Morgen','Morgens/Mittags/Abends','Ich stehe auf','Ich dusche','Ich frühstücke','Dann/Danach','Ich fahre mit dem Bus','Ich gehe schlafen'],
    checklist:['¿El verbo separable está separado? (Ich stehe... auf, no "Ich aufstehe")?','¿Usaste "um" antes de la hora (um sieben Uhr)?','¿Los sustantivos tienen mayúscula?','¿Las actividades siguen orden cronológico?'],
  },
  {
    id:5, title:'Meine Hobbys', topic:'Die Freizeit',
    prompt:'Escribe 4–5 oraciones sobre tus hobbies y tiempo libre. Usa "gern" y "nicht gern" para expresar gustos.',
    promptDe:'Schreib über deine Hobbys und Freizeit. Was machst du gern? Was machst du nicht gern?',
    model:'In meiner Freizeit höre ich gern Musik. Ich spiele auch gern Gitarre. Am Wochenende gehe ich mit Freunden ins Kino. Ich lese nicht sehr gern. Ich mag Sport — ich spiele jeden Tag Fußball.',
    criteria:['Usa "gern" + verbo para expresar gusto (Ich höre gern Musik)','Usa "nicht gern" para lo que no te gusta','Menciona al menos 3 actividades diferentes','Usa "Am Wochenende" o "In meiner Freizeit"'],
    vocab:['Ich ... gern','Ich mag ...','Am Wochenende','In meiner Freizeit','Ich gehe ins Kino/schwimmen','Ich höre Musik','Ich spiele Fußball/Gitarre','Ich lese gern','Ich treffe Freunde'],
    checklist:['¿Pusiste "gern" DESPUÉS del verbo (Ich höre gern, no Ich gern höre)?','¿Los sustantivos tienen mayúscula (Musik, Fußball)?','¿Diferenciaste "mögen" (Ich mag) de "gern + verbo" (Ich höre gern)?','¿Los verbos están bien conjugados en primera persona?'],
  },
];

export default function EscrituraAlemanA1() {
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
      <div className="wrap" style={{ maxWidth:720 }}>
        <div style={{ textAlign:'center', padding:'2rem 1rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>✅</div>
          <h2 style={{ margin:'0 0 0.5rem', color:COLOR }}>Text abgeschickt!</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>Wird von David oder Zhanna korrigiert.</p>
          <div style={{ padding:'1.1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.5rem', textAlign:'left' }}>
            <p style={{ margin:0, fontSize:'0.92rem', color:'var(--ink)', lineHeight:1.75, whiteSpace:'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background:COLOR, borderColor:COLOR }}>Nochmal schreiben</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Andere Aufgaben</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica/aleman/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>Deutsch A1</Link>
          <span>/</span>
          <button onClick={back} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'0.82rem', padding:0 }}>✍️ Schreiben</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>Aufgabe {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />Schreibaufgabe {task.id} — {task.topic}</p>
        <h2 style={{ fontSize:'1.7rem', margin:'0 0 1.5rem', fontWeight:700 }}>{task.title}</h2>

        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Aufgabe (español)</div>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.95rem', color:'var(--ink)', lineHeight:1.6 }}>{task.prompt}</p>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Auf Deutsch</div>
          <p style={{ margin:0, fontSize:'0.88rem', color:'var(--muted)', fontStyle:'italic', lineHeight:1.6 }}>{task.promptDe}</p>
        </div>

        <button onClick={() => setShowModel(s=>!s)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1rem', fontSize:'0.82rem' }}>
          {showModel?'▲ Mustertext ausblenden':'▼ Mustertext sehen'}
        </button>
        {showModel && (
          <div style={{ padding:'1rem 1.2rem', borderRadius:12, background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.2)', marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'#2563eb', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Mustertext</div>
            <p style={{ margin:0, fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.7, fontStyle:'italic' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'0.85rem', marginBottom:'1.25rem' }}>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Bewertungskriterien</div>
            {task.criteria.map((c,i)=><p key={i} style={{ margin:'0 0 0.3rem', fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Wortschatz — klicken</div>
            <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap' }}>
              {task.vocab.map((v,i)=>(
                <button key={i} onClick={() => setText(p=>p?`${p} ${v}`:v)}
                  style={{ fontSize:'0.72rem', padding:'0.18rem 0.5rem', borderRadius:6, background:`${COLOR}10`, color:COLOR, border:`1px solid ${COLOR}30`, cursor:'pointer', fontFamily:'inherit' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea value={text} onChange={e=>setText(e.target.value)} rows={7} placeholder="Schreib deinen Text auf Deutsch hier..."
          style={{ width:'100%', padding:'1rem 1.1rem', borderRadius:12, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.7, marginBottom:'0.5rem' }}/>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem', fontSize:'0.78rem', fontFamily:'var(--mono)', color:words<20?'#d97706':'#059669' }}>
          <span>{words} Wörter {words<20?'(Minimum empfohlen: 25)':'✓'}</span>
        </div>

        <div style={{ padding:'1rem 1.2rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)', marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Checkliste vor dem Abschicken</div>
          {task.checklist.map((item,i)=>(
            <button key={i} onClick={() => setCheckDone(p=>({...p,[i]:!p[i]}))}
              style={{ display:'flex', alignItems:'center', gap:'0.6rem', width:'100%', padding:'0.35rem 0', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', color:'inherit', textAlign:'left' }}>
              <span style={{ fontSize:'1rem', flexShrink:0 }}>{checkDone[i]?'✅':'⬜'}</span>
              <span style={{ fontSize:'0.82rem', color:checkDone[i]?'#059669':'var(--muted)' }}>{item}</span>
            </button>
          ))}
        </div>

        <button className="btn btn-sm" onClick={() => text.trim()&&setSubmitted(true)} disabled={!text.trim()}
          style={{ background:COLOR, borderColor:COLOR, opacity:text.trim()?1:0.5 }}>
          Abschicken →
        </button>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇩🇪 Deutsch A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>✍️ Schreiben</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Schreiben · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Schreiben A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>5 Aufgaben mit Mustertext, Wortschatz und Checkliste.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {TASKS.map(t=>(
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1.1rem 1.4rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}05`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 20px ${COLOR}18`;(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}44`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;}}>
                <div style={{ width:48, height:48, borderRadius:12, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{t.id}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.15rem' }}>{t.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{t.topic} · {t.prompt.substring(0,70)}...</p>
                </div>
                <span style={{ color:COLOR, fontSize:'1.1rem', fontWeight:700, flexShrink:0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
