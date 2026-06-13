'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; gender?: string; }
interface VocabSet { id: string; name: string; nameDe: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id:'familie', name:'La familia', nameDe:'Die Familie', icon:'👨‍👩‍👧‍👦',
    words:[
      { word:'der Vater', es:'el padre', emoji:'👨', example:'Mein Vater ist Arzt.', exampleEs:'Mi padre es médico.', gender:'m' },
      { word:'die Mutter', es:'la madre', emoji:'👩', example:'Meine Mutter ist Lehrerin.', exampleEs:'Mi madre es profesora.', gender:'f' },
      { word:'der Bruder', es:'el hermano', emoji:'👦', example:'Mein Bruder heißt Klaus.', exampleEs:'Mi hermano se llama Klaus.', gender:'m' },
      { word:'die Schwester', es:'la hermana', emoji:'👧', example:'Meine Schwester wohnt in Hamburg.', exampleEs:'Mi hermana vive en Hamburgo.', gender:'f' },
      { word:'der Sohn', es:'el hijo', emoji:'🧒', example:'Ihr Sohn ist acht Jahre alt.', exampleEs:'Su hijo tiene ocho años.', gender:'m' },
      { word:'die Tochter', es:'la hija', emoji:'👧', example:'Die Tochter lernt Deutsch.', exampleEs:'La hija aprende alemán.', gender:'f' },
      { word:'die Eltern', es:'los padres', emoji:'👪', example:'Meine Eltern wohnen in Berlin.', exampleEs:'Mis padres viven en Berlín.', gender:'f' },
      { word:'der Mann', es:'el esposo / el hombre', emoji:'🧔', example:'Ihr Mann ist sehr nett.', exampleEs:'Su esposo es muy simpático.', gender:'m' },
      { word:'die Frau', es:'la esposa / la mujer', emoji:'👱‍♀️', example:'Seine Frau heißt Maria.', exampleEs:'Su esposa se llama María.', gender:'f' },
      { word:'die Kinder', es:'los hijos / los niños', emoji:'👶', example:'Sie haben zwei Kinder.', exampleEs:'Ellos tienen dos hijos.', gender:'f' },
    ],
  },
  {
    id:'zahlen', name:'Los números', nameDe:'Die Zahlen', icon:'🔢',
    words:[
      { word:'eins', es:'uno', emoji:'1️⃣', example:'Ich habe einen Bruder.', exampleEs:'Tengo un hermano.' },
      { word:'zwei', es:'dos', emoji:'2️⃣', example:'Ich habe zwei Schwestern.', exampleEs:'Tengo dos hermanas.' },
      { word:'drei', es:'tres', emoji:'3️⃣', example:'Die Wohnung hat drei Zimmer.', exampleEs:'El apartamento tiene tres habitaciones.' },
      { word:'zehn', es:'diez', emoji:'🔟', example:'Ich bin um zehn Uhr da.', exampleEs:'Llego a las diez en punto.' },
      { word:'zwanzig', es:'veinte', emoji:'2️⃣0️⃣', example:'Er ist zwanzig Jahre alt.', exampleEs:'Él tiene veinte años.' },
      { word:'dreißig', es:'treinta', emoji:'3️⃣0️⃣', example:'Sie ist dreißig Jahre alt.', exampleEs:'Ella tiene treinta años.' },
      { word:'hundert', es:'cien', emoji:'💯', example:'Das kostet hundert Euro.', exampleEs:'Eso cuesta cien euros.' },
      { word:'viel', es:'mucho', emoji:'➕', example:'Ich habe viele Freunde.', exampleEs:'Tengo muchos amigos.' },
      { word:'wenig', es:'poco', emoji:'➖', example:'Ich habe wenig Zeit.', exampleEs:'Tengo poco tiempo.' },
      { word:'kein/keine', es:'ningún/ninguna', emoji:'❌', example:'Ich habe keine Zeit.', exampleEs:'No tengo tiempo.' },
    ],
  },
  {
    id:'essen', name:'La comida', nameDe:'Das Essen', icon:'🍽️',
    words:[
      { word:'das Brot', es:'el pan', emoji:'🍞', example:'Ich esse Brot zum Frühstück.', exampleEs:'Como pan en el desayuno.', gender:'n' },
      { word:'der Kaffee', es:'el café', emoji:'☕', example:'Ich trinke jeden Morgen Kaffee.', exampleEs:'Bebo café todas las mañanas.', gender:'m' },
      { word:'das Wasser', es:'el agua', emoji:'💧', example:'Ich trinke viel Wasser.', exampleEs:'Bebo mucha agua.', gender:'n' },
      { word:'das Fleisch', es:'la carne', emoji:'🥩', example:'Er isst gern Fleisch.', exampleEs:'A él le gusta comer carne.', gender:'n' },
      { word:'das Gemüse', es:'las verduras', emoji:'🥦', example:'Das Gemüse ist frisch.', exampleEs:'Las verduras están frescas.', gender:'n' },
      { word:'das Obst', es:'la fruta', emoji:'🍎', example:'Ich esse gern Obst.', exampleEs:'Me gusta comer fruta.', gender:'n' },
      { word:'die Milch', es:'la leche', emoji:'🥛', example:'Ich trinke Kaffee mit Milch.', exampleEs:'Bebo café con leche.', gender:'f' },
      { word:'das Ei', es:'el huevo', emoji:'🥚', example:'Ich esse ein Ei zum Frühstück.', exampleEs:'Como un huevo en el desayuno.', gender:'n' },
      { word:'der Saft', es:'el jugo', emoji:'🧃', example:'Ich möchte einen Orangensaft.', exampleEs:'Quisiera un jugo de naranja.', gender:'m' },
      { word:'die Suppe', es:'la sopa', emoji:'🍲', example:'Die Suppe ist sehr lecker!', exampleEs:'¡La sopa está muy rica!', gender:'f' },
    ],
  },
  {
    id:'farben', name:'Los colores', nameDe:'Die Farben', icon:'🎨',
    words:[
      { word:'rot', es:'rojo', emoji:'🔴', example:'Das Auto ist rot.', exampleEs:'El carro es rojo.' },
      { word:'blau', es:'azul', emoji:'🔵', example:'Der Himmel ist blau.', exampleEs:'El cielo es azul.' },
      { word:'grün', es:'verde', emoji:'🟢', example:'Das Gras ist grün.', exampleEs:'El pasto es verde.' },
      { word:'gelb', es:'amarillo', emoji:'🟡', example:'Die Sonne ist gelb.', exampleEs:'El sol es amarillo.' },
      { word:'weiß', es:'blanco', emoji:'⬜', example:'Der Schnee ist weiß.', exampleEs:'La nieve es blanca.' },
      { word:'schwarz', es:'negro', emoji:'⬛', example:'Die Katze ist schwarz.', exampleEs:'El gato es negro.' },
      { word:'braun', es:'marrón', emoji:'🟫', example:'Der Tisch ist braun.', exampleEs:'La mesa es marrón.' },
      { word:'grau', es:'gris', emoji:'🔘', example:'Der Himmel ist heute grau.', exampleEs:'El cielo está gris hoy.' },
      { word:'orange', es:'naranja', emoji:'🟠', example:'Die Karotte ist orange.', exampleEs:'La zanahoria es naranja.' },
      { word:'lila', es:'morado/lila', emoji:'🟣', example:'Die Blume ist lila.', exampleEs:'La flor es lila.' },
    ],
  },
  {
    id:'wohnung', name:'La vivienda', nameDe:'Die Wohnung', icon:'🏠',
    words:[
      { word:'das Wohnzimmer', es:'la sala', emoji:'🛋️', example:'Im Wohnzimmer steht ein Sofa.', exampleEs:'En la sala hay un sofá.', gender:'n' },
      { word:'das Schlafzimmer', es:'el dormitorio', emoji:'🛏️', example:'Das Schlafzimmer ist groß.', exampleEs:'El dormitorio es grande.', gender:'n' },
      { word:'die Küche', es:'la cocina', emoji:'🍳', example:'Die Küche ist modern.', exampleEs:'La cocina es moderna.', gender:'f' },
      { word:'das Bad', es:'el baño', emoji:'🚿', example:'Das Bad hat eine Dusche.', exampleEs:'El baño tiene ducha.', gender:'n' },
      { word:'der Tisch', es:'la mesa', emoji:'🪑', example:'Der Tisch ist aus Holz.', exampleEs:'La mesa es de madera.', gender:'m' },
      { word:'das Bett', es:'la cama', emoji:'🛏️', example:'Das Bett ist sehr bequem.', exampleEs:'La cama es muy cómoda.', gender:'n' },
      { word:'das Sofa', es:'el sofá', emoji:'🛋️', example:'Ich sitze auf dem Sofa.', exampleEs:'Me siento en el sofá.', gender:'n' },
      { word:'das Fenster', es:'la ventana', emoji:'🪟', example:'Das Fenster ist offen.', exampleEs:'La ventana está abierta.', gender:'n' },
      { word:'die Tür', es:'la puerta', emoji:'🚪', example:'Die Tür ist zu.', exampleEs:'La puerta está cerrada.', gender:'f' },
      { word:'der Stuhl', es:'la silla', emoji:'🪑', example:'Der Stuhl steht am Tisch.', exampleEs:'La silla está junto a la mesa.', gender:'m' },
    ],
  },
  {
    id:'alltag', name:'El día a día', nameDe:'Der Alltag', icon:'⏰',
    words:[
      { word:'der Morgen', es:'la mañana', emoji:'🌅', example:'Jeden Morgen trinke ich Kaffee.', exampleEs:'Todas las mañanas bebo café.', gender:'m' },
      { word:'der Mittag', es:'el mediodía', emoji:'☀️', example:'Mittags esse ich in der Kantine.', exampleEs:'Al mediodía como en la cafetería.', gender:'m' },
      { word:'der Abend', es:'la tarde/noche', emoji:'🌆', example:'Am Abend lese ich gern.', exampleEs:'Por la noche me gusta leer.', gender:'m' },
      { word:'die Arbeit', es:'el trabajo', emoji:'💼', example:'Ich fahre mit dem Bus zur Arbeit.', exampleEs:'Voy en autobús al trabajo.', gender:'f' },
      { word:'die Schule', es:'la escuela', emoji:'🏫', example:'Die Kinder gehen in die Schule.', exampleEs:'Los niños van a la escuela.', gender:'f' },
      { word:'das Auto', es:'el carro', emoji:'🚗', example:'Er fährt mit dem Auto.', exampleEs:'Él va en carro.', gender:'n' },
      { word:'der Bus', es:'el autobús', emoji:'🚌', example:'Ich nehme den Bus.', exampleEs:'Tomo el autobús.', gender:'m' },
      { word:'der Supermarkt', es:'el supermercado', emoji:'🏪', example:'Ich gehe in den Supermarkt.', exampleEs:'Voy al supermercado.', gender:'m' },
      { word:'das Geld', es:'el dinero', emoji:'💶', example:'Ich habe kein Geld.', exampleEs:'No tengo dinero.', gender:'n' },
      { word:'die Zeit', es:'el tiempo', emoji:'⏱️', example:'Ich habe keine Zeit.', exampleEs:'No tengo tiempo.', gender:'f' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(()=>Math.random()-0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: ()=>void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx>=words.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🎴</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>Fertig!</h3>
      <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1.25rem' }}>{known}/{words.length} Wörter markiert.</p>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background:COLOR, borderColor:COLOR }}>Nochmal</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w=words[idx];
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
      <div style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)' }}>{idx+1}/{words.length}</div>
      <div onClick={() => setFlipped(f=>!f)} style={{ width:'100%', maxWidth:400, minHeight:200, cursor:'pointer', borderRadius:18, border:`2px solid ${flipped?COLOR:'var(--line-soft)'}`, background:flipped?`${COLOR}08`:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.65rem', padding:'1.5rem', transition:'all 0.3s', textAlign:'center' }}>
        {!flipped?(
          <>
            <div style={{ fontSize:'2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
            {w.gender&&<div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.1rem 0.4rem', borderRadius:5, background:`${COLOR}15` }}>{w.gender==='m'?'maskulin':w.gender==='f'?'feminin':'neutrum'}</div>}
            <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.25rem' }}>Klicken zum Sehen</div>
          </>
        ):(
          <>
            <div style={{ fontSize:'1rem', color:'var(--muted)', fontStyle:'italic' }}>{w.word}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:COLOR }}>{w.es}</div>
            <div style={{ fontSize:'0.82rem', color:'var(--muted)', marginTop:'0.5rem', lineHeight:1.5, borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', width:'100%', textAlign:'left' }}>
              <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span><br/><span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped&&(
        <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k=>k+1); setIdx(i=>i+1); setFlipped(false); }} style={{ background:COLOR, borderColor:COLOR }}>✓ Ich weiß es</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i=>i+1); setFlipped(false); }}>Nochmal ansehen →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: ()=>void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number|null>(null);
  const shuffled = useState(()=>shuffle(words))[0];

  if (idx>=shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w=shuffled[idx];
  const distractors=shuffle(shuffled.filter(x=>x.word!==w.word)).slice(0,3).map(x=>x.es);
  const allOpts=shuffle([w.es,...distractors]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
        {w.gender&&<div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, marginTop:'0.25rem' }}>{w.gender==='m'?'maskulin':w.gender==='f'?'feminin':'neutrum'}</div>}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
        {allOpts.map((opt,i)=>{
          const isCorrect=opt===w.es, isSel=answered!==null&&allOpts[answered]===opt;
          let bg='var(--bg)',border='1.5px solid var(--line-soft)',color='var(--ink)';
          if(answered!==null&&isCorrect){bg='rgba(5,150,105,0.1)';border='1.5px solid #059669';color='#059669';}
          if(answered!==null&&isSel&&!isCorrect){bg='rgba(220,38,38,0.1)';border='1.5px solid #dc2626';color='#dc2626';}
          return <button key={i} disabled={answered!==null} onClick={() => { setAnswered(i); if(isCorrect) setScore(s=>s+1); }}
            style={{ padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.95rem', cursor:answered!==null?'default':'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
            {opt}
          </button>;
        })}
      </div>
      {answered!==null&&(
        <div>
          <div style={{ padding:'0.65rem 0.9rem', borderRadius:8, background:allOpts[answered]===w.es?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.82rem', color:'var(--muted)', marginBottom:'0.65rem' }}>
            <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx<shuffled.length-1?'Weiter →':'Ergebnis →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: ()=>void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(()=>shuffle(words))[0];

  if (idx>=shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w=shuffled[idx];
  const isCorrect=input.trim().toLowerCase()===w.word.toLowerCase()||input.trim().toLowerCase()===w.word.replace(/^(der|die|das)\s/i,'').toLowerCase();

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.1rem', fontWeight:700, color:COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)' }}>Wie heißt das auf Deutsch (mit Artikel):</p>
      <input value={input} onChange={e=>setInput(e.target.value)} disabled={checked} placeholder="z.B.: der Tisch"
        onKeyDown={e=>{ if(e.key==='Enter'&&input.trim()&&!checked){ setChecked(true); if(isCorrect) setScore(s=>s+1); } }}
        style={{ padding:'0.7rem 1rem', borderRadius:10, border:`1.5px solid ${checked?(isCorrect?'#059669':'#dc2626'):'var(--line-soft)'}`, background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', outline:'none' }}/>
      {!checked&&input.trim()&&<button className="btn btn-sm" onClick={() => { setChecked(true); if(isCorrect) setScore(s=>s+1); }} style={{ background:COLOR, borderColor:COLOR }}>Überprüfen</button>}
      {checked&&(
        <div>
          <div style={{ padding:'0.7rem 0.9rem', borderRadius:9, background:isCorrect?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.88rem', marginBottom:'0.65rem' }}>
            {isCorrect?'✅ Richtig!': `✗ Richtig: ${w.word}`}
            <div style={{ marginTop:'0.3rem', fontSize:'0.8rem', color:'var(--muted)', fontStyle:'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx<shuffled.length-1?'Weiter →':'Ergebnis →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VokabularAlemanA1() {
  const [setId, setSetId] = useState<string|null>(null);
  const [mode, setMode] = useState<PracticeMode|null>(null);
  const set = SETS.find(s=>s.id===setId);

  if (set&&mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.25rem' }}>← {set.nameDe}</button>
        {mode==='flashcard'&&<Flashcard words={set.words} onDone={() => setMode(null)}/>}
        {mode==='mcq'&&<MCQPractice words={set.words} onDone={() => setMode(null)}/>}
        {mode==='fillblank'&&<FillBlank words={set.words} onDone={() => setMode(null)}/>}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.5rem' }}>← Vokabular A1</button>
        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line"/>{set.icon} {set.nameDe}</p>
        <h2 style={{ fontSize:'1.75rem', margin:'0 0 0.25rem', fontWeight:700 }}>{set.name}</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>{set.words.length} Wörter · Wähle einen Übungsmodus</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
          {[{id:'flashcard' as PracticeMode,icon:'🎴',title:'Karteikarten',desc:'Sieh jedes Wort mit Übersetzung.'},{id:'mcq' as PracticeMode,icon:'🎯',title:'Multiple Choice',desc:'Wähle die richtige Übersetzung.'},{id:'fillblank' as PracticeMode,icon:'✏️',title:'Lückentext',desc:'Schreibe das deutsche Wort (mit Artikel).'}].map(m=>(
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1.1rem 1.3rem', border:`1.5px solid ${COLOR}22`, borderRadius:14, background:`${COLOR}04`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`;(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLOR}14`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ width:42, height:42, borderRadius:10, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>{m.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:'0.1rem' }}>{m.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color:COLOR, fontWeight:700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.65rem' }}>Wortliste</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'0.55rem' }}>
            {set.words.map(w=>(
              <div key={w.word} style={{ padding:'0.55rem 0.7rem', borderRadius:9, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
                <div style={{ fontWeight:700, fontSize:'0.88rem', color:'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
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
          <span style={{ color:COLOR, fontWeight:800 }}>📚 Vokabular</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Vokabular · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Wortschatz A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>6 thematische Gruppen — 60 Wörter mit Beispielen. Karteikarten, Multiple Choice und Lückentext.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:'0.85rem' }}>
          {SETS.map(s=>(
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ padding:'1.25rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}04`, height:'100%', display:'flex', flexDirection:'column', gap:'0.5rem', transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`;(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLOR}14`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ fontSize:'1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight:800, color:'var(--ink)' }}>{s.nameDe}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{s.name} · {s.words.length} Wörter</div>
                <div style={{ marginTop:'auto', fontSize:'0.8rem', color:COLOR, fontWeight:700 }}>Lernen →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
