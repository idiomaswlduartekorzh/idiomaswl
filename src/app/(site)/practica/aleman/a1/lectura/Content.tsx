'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

type Phase = 'pre' | 'read' | 'questions' | 'done';

interface MCQ { q: string; opts: string[]; answer: number; label?: string; }
interface OpenQ { q: string; tip: string; }
interface TextData {
  id: number; title: string; subtitle: string; text: string;
  vocab: Record<string, string>;
  preQ: string; preA: string;
  mcqs: MCQ[];
  openQs: OpenQ[];
}

const TEXTS: TextData[] = [
  {
    id:1, title:'Ich bin Anna', subtitle:'Eine Studentin stellt sich vor',
    text:'Hallo! Ich heiße Anna. Ich bin 22 Jahre alt. Ich wohne in Berlin mit meinen Eltern. Ich habe einen Bruder, er heißt Klaus. Jeden Morgen trinke ich Kaffee und esse Brot. Ich lerne Deutsch an der Universität. Ich mag Musik und Sport. Am Wochenende gehe ich mit Freunden ins Kino.',
    vocab:{ 'heiße':'me llamo','Jahre alt':'años de edad','wohne':'vivo','Eltern':'padres','Bruder':'hermano','Morgen':'mañana','trinke':'bebo','Kaffee':'café','esse':'como','Brot':'pan','lerne':'aprendo','mag':'me gusta','Freunden':'amigos','Kino':'cine','Wochenende':'fin de semana' },
    preQ:'¿Cómo te presentarías tú en alemán? ¿Qué información daría alguien de 22 años?',
    preA:'Una persona joven normalmente da: nombre (Ich heiße), edad (Ich bin ___ Jahre alt), dónde vive (Ich wohne in), qué hace (Ich studiere/arbeite) y qué le gusta (Ich mag).',
    mcqs:[
      { q:'Wie heißt die Person?', opts:['Anna','Maria','Klaus','Laura'], answer:0, label:'vocabulario' },
      { q:'Wie alt ist Anna?', opts:['20 Jahre alt','22 Jahre alt','25 Jahre alt','28 Jahre alt'], answer:1, label:'comprensión' },
      { q:'Wo wohnt Anna?', opts:['München','Hamburg','Frankfurt','Berlin'], answer:3, label:'comprensión' },
      { q:'Was macht Anna morgens?', opts:['Sie schläft','Sie lernt Englisch','Sie trinkt Kaffee und isst Brot','Sie geht ins Kino'], answer:2, label:'comprensión' },
    ],
    openQs:[
      { q:'¿Qué dos actividades hace Anna con amigos?', tip:'Mira el final del texto — usa "mit Freunden".' },
      { q:'¿Por qué crees que Anna dice "Ich lerne Deutsch" si el texto está en alemán?', tip:'Ella es estudiante de la universidad — probablemente es hablante nativa pero estudia la asignatura formal.' },
    ],
  },
  {
    id:2, title:'Meine Familie', subtitle:'Thomas spricht über seine Familie',
    text:'Hallo, ich bin Thomas. Ich bin 35 Jahre alt und ich wohne in München. Ich habe eine Frau. Sie heißt Sandra. Wir haben zwei Kinder: einen Sohn und eine Tochter. Mein Sohn heißt Max und er ist 8 Jahre alt. Meine Tochter heißt Lena und sie ist 5 Jahre alt. Mein Vater heißt Georg. Er ist Rentner. Meine Mutter heißt Hilde. Sie ist Lehrerin. Wir sind eine glückliche Familie.',
    vocab:{ 'Frau':'esposa','Kinder':'hijos','Sohn':'hijo','Tochter':'hija','Vater':'padre','Mutter':'madre','Rentner':'jubilado','Lehrerin':'profesora (f.)','glücklich':'feliz','wohne':'vivo','heißt':'se llama' },
    preQ:'¿Qué vocabulario familiar conoces en alemán? ¿Cómo se diría "mi madre es profesora"?',
    preA:'"Meine Mutter ist Lehrerin" — en alemán los sustantivos se escriben con mayúscula y las profesiones no usan artículo después de "sein" (ser).',
    mcqs:[
      { q:'Wie alt ist Thomas?', opts:['25 Jahre','30 Jahre','35 Jahre','40 Jahre'], answer:2, label:'comprensión' },
      { q:'Wie heißt Thomas Frau?', opts:['Lena','Hilde','Sandra','Maria'], answer:2, label:'vocabulario' },
      { q:'Was ist Thomas Mutter von Beruf?', opts:['Ärztin','Renterin','Ingenieurin','Lehrerin'], answer:3, label:'comprensión' },
      { q:'Wie viele Kinder hat Thomas?', opts:['Eines','Zwei','Drei','Vier'], answer:1, label:'comprensión' },
    ],
    openQs:[
      { q:'¿Cuántos años tienen los hijos de Thomas? Escríbelo en alemán.', tip:'Max ist ___ Jahre alt. Lena ist ___ Jahre alt.' },
      { q:'¿Cómo se dice "feliz" en alemán? ¿En qué parte del texto aparece?', tip:'Es un adjetivo al final del texto.' },
    ],
  },
  {
    id:3, title:'Meine Wohnung', subtitle:'Maria beschreibt ihr Zuhause',
    text:'Ich heiße Maria und ich wohne in Hamburg. Meine Wohnung ist nicht sehr groß, aber sie ist gemütlich. Sie hat drei Zimmer: ein Wohnzimmer, ein Schlafzimmer und eine Küche. Es gibt auch ein Bad. Im Wohnzimmer stehen ein Sofa und ein Tisch. Im Schlafzimmer steht ein Bett. Ich habe keine Garage. Meine Wohnung ist im dritten Stock. Der Blick ist sehr schön.',
    vocab:{ 'Wohnung':'apartamento','groß':'grande','gemütlich':'cómodo/acogedor','Zimmer':'habitaciones','Wohnzimmer':'sala','Schlafzimmer':'dormitorio','Küche':'cocina','Bad':'baño','Sofa':'sofá','Tisch':'mesa','Bett':'cama','Garage':'garaje','Stock':'piso/planta','Blick':'vista','stehen':'estar (de pie)' },
    preQ:'¿Cómo describirías tu propio apartamento en alemán? ¿Qué habitaciones tiene?',
    preA:'Para describir habitaciones: "Es gibt ein/eine ___ (hay un/una)". Los sustantivos llevan artículo: das Wohnzimmer, das Schlafzimmer, die Küche, das Bad.',
    mcqs:[
      { q:'Wo wohnt Maria?', opts:['Berlin','München','Hamburg','Frankfurt'], answer:2, label:'comprensión' },
      { q:'Wie viele Zimmer hat die Wohnung?', opts:['Zwei','Drei','Vier','Fünf'], answer:1, label:'comprensión' },
      { q:'Was steht im Wohnzimmer?', opts:['Ein Bett und ein Tisch','Ein Sofa und ein Tisch','Ein Sofa und ein Bett','Zwei Stühle'], answer:1, label:'vocabulario' },
      { q:'In welchem Stock ist die Wohnung?', opts:['Ersten','Zweiten','Dritten','Vierten'], answer:2, label:'comprensión' },
    ],
    openQs:[
      { q:'¿Por qué Maria dice "nicht sehr groß, aber gemütlich"? ¿Qué contraste establece?', tip:'"Aber" = pero. Pequeña pero acogedora — contrapone tamaño y comodidad.' },
      { q:'¿Qué tiene y qué no tiene la Wohnung de Maria?', tip:'Usa "Es gibt" para lo que sí hay y "Sie hat keine" para lo que no.' },
    ],
  },
  {
    id:4, title:'Ein Tag in meinem Leben', subtitle:'Jonas erzählt von seinem Alltag',
    text:'Ich heiße Jonas und ich lebe in Köln. Ich stehe um sechs Uhr auf. Ich dusche und frühstücke. Zum Frühstück esse ich Müsli und trinke Orangensaft. Um acht Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite als Ingenieur. Mittags esse ich in der Kantine. Um achtzehn Uhr bin ich wieder zu Hause. Am Abend lese ich oder sehe ich fern. Ich gehe um elf Uhr schlafen.',
    vocab:{ 'lebe':'vivo','stehe auf':'me levanto','dusche':'me ducho','frühstücke':'desayuno','Frühstück':'desayuno','Müsli':'muesli/granola','Orangensaft':'jugo de naranja','fahre':'viajo','Bus':'autobús','Arbeit':'trabajo','Ingenieur':'ingeniero','Mittags':'al mediodía','Kantine':'cafetería','zu Hause':'en casa','fern':'televisión (sehe fern = veo tv)','schlafen':'dormir' },
    preQ:'¿A qué hora te levantas tú? ¿Cómo se diría "me levanto a las 7" en alemán?',
    preA:'"Ich stehe um sieben Uhr auf" — el verbo separable "aufstehen" parte el prefijo al final: "Ich stehe... auf". Los trenes horarios usan "Uhr" (reloj).',
    mcqs:[
      { q:'Wo lebt Jonas?', opts:['München','Berlin','Hamburg','Köln'], answer:3, label:'comprensión' },
      { q:'Wann steht Jonas auf?', opts:['Um fünf Uhr','Um sechs Uhr','Um sieben Uhr','Um acht Uhr'], answer:1, label:'comprensión' },
      { q:'Was isst Jonas zum Frühstück?', opts:['Brot und Kaffee','Eier und Speck','Müsli und Orangensaft','Joghurt und Tee'], answer:2, label:'vocabulario' },
      { q:'Als was arbeitet Jonas?', opts:['Lehrer','Arzt','Ingenieur','Rentner'], answer:2, label:'comprensión' },
    ],
    openQs:[
      { q:'¿Cuántas horas trabaja Jonas aproximadamente (según el texto)?', tip:'Llega a las 8, vuelve a las 18. ¿Cuántas horas son?' },
      { q:'¿Cuál es la diferencia entre "essen" y "trinken" según el texto?', tip:'"Essen" = comer (sólidos), "trinken" = beber (líquidos).' },
    ],
  },
  {
    id:5, title:'Meine Hobbys', subtitle:'Lisa spricht über ihre Freizeit',
    text:'Ich heiße Lisa und ich komme aus Stuttgart. In meiner Freizeit spiele ich gern Gitarre. Ich übe jeden Tag eine Stunde. Ich höre auch viel Musik — meine Lieblingsband ist "Tokio Hotel". Am Wochenende gehe ich mit meiner Schwester schwimmen oder wir machen einen Spaziergang im Park. Ich lese auch sehr gern. Mein Lieblingsbuch ist "Der Kleine Prinz". Ich mag keine Videospiele.',
    vocab:{ 'Freizeit':'tiempo libre','spiele':'toco/juego','gern':'con gusto/me gusta','übe':'practico','Stunde':'hora','höre':'escucho','Lieblingsband':'banda favorita','Schwester':'hermana','schwimmen':'nadar','Spaziergang':'paseo','Lieblingsbuch':'libro favorito','mag':'me gusta (mögen)','Videospiele':'videojuegos' },
    preQ:'¿Qué pasatiempos tienes tú? ¿Cómo se dice "me gusta escuchar música" en alemán?',
    preA:'"Ich höre gern Musik" — "gern" + verbo = me gusta hacer algo. Es la estructura más natural para expresar gustos en alemán.',
    mcqs:[
      { q:'Woher kommt Lisa?', opts:['Berlin','München','Stuttgart','Köln'], answer:2, label:'comprensión' },
      { q:'Wie lange übt Lisa Gitarre?', opts:['Dreißig Minuten','Eine Stunde','Zwei Stunden','Jeden Abend'], answer:1, label:'comprensión' },
      { q:'Was macht Lisa am Wochenende?', opts:['Sie liest immer','Sie spielt Videospiele','Sie schwimmt mit ihrer Schwester','Sie kocht'], answer:2, label:'comprensión' },
      { q:'Was mag Lisa nicht?', opts:['Musik','Schwimmen','Lesen','Videospiele'], answer:3, label:'vocabulario' },
    ],
    openQs:[
      { q:'¿Cuál es la estructura alemana para decir "me gusta hacer algo"? Da un ejemplo del texto.', tip:'"gern" aparece 3 veces — ¿en qué posición va respecto al verbo?' },
      { q:'¿En qué se parece "Spaziergang" a la palabra española? ¿Qué patrón puedes identificar?', tip:'"Gang" = andar/caminar. "Spazieren" = pasear. Alemán forma sustantivos compuestos juntando palabras.' },
    ],
  },
];

function tokenize(text: string, vocab: Record<string,string>) {
  return text.split(/(\s+)/).map((token, i) => {
    const clean = token.replace(/[^a-zA-ZäöüÄÖÜß]/g, '');
    const trans = vocab[token.trim()] || vocab[clean];
    if (trans && clean) return (
      <span key={i} title={trans} style={{ borderBottom:`1.5px dashed ${COLOR}77`, cursor:'pointer', color:COLOR, fontWeight:600 }}
        onClick={e => { e.stopPropagation(); alert(`"${token.trim()}" = ${trans}`); }}>
        {token}
      </span>
    );
    return <span key={i}>{token}</span>;
  });
}

function TextExercise({ data, onBack }: { data: TextData; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('pre');
  const [mcqAnswers, setMcqAnswers] = useState<Record<number,number>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<number,string>>({});
  const [showTips, setShowTips] = useState<Record<number,boolean>>({});

  const mcqScore = data.mcqs.filter((q,i)=>mcqAnswers[i]===q.answer).length;

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'0.82rem', padding:0 }}>📖 Lectura A1</button>
        <span>/</span>
        <span style={{ color:COLOR, fontWeight:800 }}>{data.title}</span>
      </div>

      {/* Phase stepper */}
      <div style={{ display:'flex', gap:'0.35rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {(['pre','read','questions','done'] as Phase[]).map((p,i)=>{
          const labels=['Activación','Lectura','Preguntas','Resultado'];
          const done=(['pre','read','questions','done'] as Phase[]).indexOf(phase)>i;
          const active=phase===p;
          return <div key={p} style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}>
            <span style={{ padding:'0.25rem 0.65rem', borderRadius:20, fontSize:'0.72rem', fontWeight:700, fontFamily:'var(--mono)', background:active?COLOR:done?`${COLOR}22`:'var(--line-soft)', color:active?'#fff':done?COLOR:'var(--muted)' }}>{labels[i]}</span>
            {i<3&&<span style={{ color:'var(--muted)', fontSize:'0.75rem' }}>›</span>}
          </div>;
        })}
      </div>

      {phase==='pre'&&(
        <div>
          <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line"/>Vor dem Lesen · Vor der Lektüre</p>
          <h2 style={{ fontSize:'1.75rem', margin:'0 0 1.25rem', fontWeight:700 }}>{data.title} — {data.subtitle}</h2>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Pregunta de activación</div>
            <p style={{ margin:'0 0 0.75rem', color:'var(--ink)', lineHeight:1.6, fontWeight:600 }}>{data.preQ}</p>
            <details>
              <summary style={{ fontSize:'0.82rem', color:COLOR, cursor:'pointer', fontWeight:700 }}>💡 Ver orientación</summary>
              <p style={{ margin:'0.5rem 0 0', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.55 }}>{data.preA}</p>
            </details>
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background:COLOR, borderColor:COLOR }}>Zum Text → Weiter</button>
        </div>
      )}

      {phase==='read'&&(
        <div>
          <h2 style={{ fontSize:'1.6rem', margin:'0 0 0.25rem', fontWeight:700 }}>{data.title}</h2>
          <p style={{ fontSize:'0.82rem', color:'var(--muted)', margin:'0 0 0.75rem', fontStyle:'italic' }}>{data.subtitle}</p>
          <div style={{ padding:'0.75rem 1rem', borderRadius:10, background:`${COLOR}08`, border:`1px solid ${COLOR}22`, fontSize:'0.78rem', color:'var(--muted)', marginBottom:'0.85rem' }}>
            💡 Haz clic en las palabras <span style={{ color:COLOR, fontWeight:700 }}>resaltadas</span> para ver la traducción.
          </div>
          <div style={{ padding:'1.4rem 1.5rem', borderRadius:16, background:'var(--bg)', border:'1.5px solid var(--line-soft)', fontSize:'1.05rem', lineHeight:1.9, marginBottom:'1.25rem', color:'var(--ink)' }}>
            {tokenize(data.text, data.vocab)}
          </div>
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Wörterliste · Glosario</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
              {Object.entries(data.vocab).map(([w,t])=>(
                <span key={w} style={{ fontSize:'0.75rem', padding:'0.18rem 0.5rem', borderRadius:6, background:`${COLOR}0d`, color:COLOR, border:`1px solid ${COLOR}22`, fontFamily:'var(--mono)' }}>{w} = {t}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background:COLOR, borderColor:COLOR }}>Zu den Fragen →</button>
        </div>
      )}

      {phase==='questions'&&(
        <div>
          <h2 style={{ fontSize:'1.5rem', margin:'0 0 1.25rem', fontWeight:700 }}>Verständnisfragen</h2>
          {data.mcqs.map((q,i)=>(
            <div key={i} style={{ marginBottom:'1.25rem', padding:'1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
              {q.label&&<div style={{ fontSize:'0.62rem', fontWeight:700, background:`${COLOR}15`, color:COLOR, borderRadius:5, padding:'0.1rem 0.4rem', fontFamily:'var(--mono)', display:'inline-block', marginBottom:'0.4rem' }}>{q.label}</div>}
              <p style={{ margin:'0 0 0.65rem', fontWeight:700, color:'var(--ink)', fontSize:'0.95rem' }}>{i+1}. {q.q}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                {q.opts.map((o,j)=>{
                  const sel=mcqAnswers[i]===j;
                  const ans=mcqAnswers[i]!==undefined;
                  let bg='var(--bg)',border='1.5px solid var(--line-soft)',color='var(--ink)';
                  if(ans&&j===q.answer){bg=`rgba(5,150,105,0.1)`;border='1.5px solid #059669';color='#059669';}
                  else if(ans&&sel){bg='rgba(220,38,38,0.08)';border='1.5px solid #dc2626';color='#dc2626';}
                  return <button key={j} onClick={() => !ans&&setMcqAnswers(p=>({...p,[i]:j}))} disabled={ans}
                    style={{ padding:'0.55rem 0.9rem', borderRadius:9, border, background:bg, color, fontSize:'0.9rem', cursor:ans?'default':'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
                    {o}
                  </button>;
                })}
              </div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:'1.25rem', marginBottom:'1.25rem' }}>
            <h3 style={{ margin:'0 0 1rem', fontWeight:700 }}>Offene Fragen · Preguntas abiertas</h3>
            {data.openQs.map((oq,i)=>(
              <div key={i} style={{ marginBottom:'1rem' }}>
                <p style={{ margin:'0 0 0.45rem', fontWeight:700, color:'var(--ink)', fontSize:'0.92rem' }}>{i+1}. {oq.q}</p>
                <textarea value={openAnswers[i]||''} onChange={e=>setOpenAnswers(p=>({...p,[i]:e.target.value}))} rows={2} placeholder="Tu respuesta..."
                  style={{ width:'100%', padding:'0.7rem 0.9rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'vertical', lineHeight:1.5 }}/>
                <button onClick={() => setShowTips(p=>({...p,[i]:!p[i]}))} style={{ fontSize:'0.72rem', color:COLOR, background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)', padding:0, marginTop:'0.25rem' }}>
                  {showTips[i]?'▲ ocultar pista':'💡 pista'}
                </button>
                {showTips[i]&&<p style={{ margin:'0.3rem 0 0', fontSize:'0.8rem', color:'var(--muted)', fontStyle:'italic' }}>{oq.tip}</p>}
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background:COLOR, borderColor:COLOR }}>Ergebnis ansehen →</button>
        </div>
      )}

      {phase==='done'&&(
        <div style={{ textAlign:'center', padding:'1.5rem 1rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>{mcqScore===data.mcqs.length?'🏆':mcqScore>=2?'⭐':'📖'}</div>
          <h2 style={{ margin:'0 0 0.5rem', color:COLOR }}>{mcqScore}/{data.mcqs.length} Fragen richtig</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.5rem' }}>
            {mcqScore===data.mcqs.length?'Perfekt! Ausgezeichnet!':mcqScore>=2?'Gut gemacht! Bitte lies den Text noch einmal.':'Lies den Text noch einmal — klicke auf die Wörter!'}
          </p>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setMcqAnswers({}); setOpenAnswers({}); setShowTips({}); }} style={{ background:COLOR, borderColor:COLOR }}>Noch einmal</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Andere Texte</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaAlemanA1() {
  const [textId, setTextId] = useState<number | null>(null);
  const text = TEXTS.find(t => t.id === textId);

  if (text) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <TextExercise data={text} onBack={() => setTextId(null)}/>
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
          <span style={{ color:COLOR, fontWeight:800 }}>📖 Lesen</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Lesen · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Leseverstehen A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>5 textos con vocabulario interactivo: activación → lectura → preguntas → resultado.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {TEXTS.map(t=>(
            <button key={t.id} onClick={() => setTextId(t.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1.1rem 1.4rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}05`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 20px ${COLOR}18`;(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}44`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;}}>
                <div style={{ width:48, height:48, borderRadius:12, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{t.id}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.15rem' }}>{t.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{t.subtitle} · {t.mcqs.length} Fragen</p>
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
