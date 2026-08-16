'use client';

import { useState } from 'react';
import Link from 'next/link';

type Skill = 'lectura' | 'gramatica' | 'escritura' | 'habla' | 'escucha';
const COLOR = '#dd0000';

const READING_TEXT =
  "Hallo! Ich heiße Anna. Ich bin 22 Jahre alt. Ich wohne in Berlin mit meinen Eltern. " +
  "Ich habe einen Bruder, er heißt Klaus. Jeden Morgen trinke ich Kaffee und esse Brot. " +
  "Ich lerne Deutsch an der Universität. Ich mag Musik und Sport. " +
  "Am Wochenende gehe ich mit Freunden ins Kino.";

const VOCAB: Record<string,string> = {
  hallo:'¡hola', heiße:'me llamo', bin:'soy / tengo', jahre:'años', alt:'años (edad)',
  wohne:'vivo', berlin:'Berlín', eltern:'padres', bruder:'hermano',
  morgen:'mañana', trinke:'bebo', kaffee:'café', esse:'como', brot:'pan',
  lerne:'aprendo', deutsch:'alemán', universität:'universidad',
  mag:'me gusta', musik:'música', sport:'deporte', wochenende:'fin de semana',
  freunden:'amigos', kino:'cine',
};

const READ_Q = [
  { q:'¿Qué significa "Bruder"?', opts:['hermana','hermano','amigo','padre'], a:1, fb:'"Bruder" = hermano. "Schwester" = hermana.' },
  { q:'¿Qué significa "Wochenende"?', opts:['semana','día','fin de semana','noche'], a:2, fb:'"Wochenende" = fin de semana.' },
  { q:'¿Dónde vive Anna?', opts:['München','Frankfurt','Berlin','Hamburg'], a:2, fb:'"Ich wohne in Berlin" — Anna vive en Berlín.' },
  { q:'¿Adónde va Anna los fines de semana?', opts:['Al parque','Al restaurante','Al cine','Al mercado'], a:2, fb:'"Am Wochenende gehe ich ... ins Kino" — Anna va al cine.' },
];
const OPEN_Q = '¿Qué aprende Anna y qué le gusta? Escríbelo en español o en alemán.';

interface GQItem { s:string; opts:string[]; a:number; fb:string; }
const GRAMMAR_TOPICS: Record<string,{title:string;desc:string;qs:GQItem[]}> = {
  artikel: {
    title:'Artikel: der / die / das / ein / eine',
    desc:'Masculino → der / ein · Femenino → die / eine · Neutro → das / ein · "Das ist..." para presentar cosas.',
    qs:[
      {s:'Das ist ___ Buch.',           opts:['ein','eine','der','das'],   a:0, fb:'"Ein Buch" — Buch es neutro → ein.' },
      {s:'Das ist ___ Mann.',           opts:['ein','eine','der','das'],   a:0, fb:'"Ein Mann" — masculino indefinido → ein.' },
      {s:'Das ist ___ Frau.',           opts:['ein','eine','die','das'],   a:1, fb:'"Eine Frau" — femenino indefinido → eine.' },
      {s:'___ Hund ist groß.',          opts:['Der','Die','Das','Ein'],    a:0, fb:'"Der Hund" — Hund es masculino definido → der.' },
      {s:'___ Katze schläft.',          opts:['Der','Die','Das','Eine'],   a:1, fb:'"Die Katze" — Katze es femenino → die.' },
      {s:'___ Kind ist klein.',         opts:['Der','Die','Das','Ein'],    a:2, fb:'"Das Kind" — Kind es neutro → das.' },
      {s:'Das ist ___ Haus.',           opts:['ein','eine','der','das'],   a:0, fb:'"Ein Haus" — Haus es neutro indefinido → ein.' },
      {s:'Das ist ___ Schule.',         opts:['ein','eine','die','das'],   a:1, fb:'"Eine Schule" — Schule es femenino indefinido → eine.' },
      {s:'___ Auto ist neu.',           opts:['Der','Die','Das','Ein'],    a:2, fb:'"Das Auto" — Auto es neutro definido → das.' },
      {s:'___ Lehrer erklärt.',         opts:['Der','Die','Das','Eine'],   a:0, fb:'"Der Lehrer" — masculino definido → der.' },
    ],
  },
  sein: {
    title:'Verb "sein" (ich bin / du bist...)',
    desc:'ich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind',
    qs:[
      {s:'Ich ___ Student.',            opts:['bin','bist','ist','sind'],  a:0, fb:'"Ich bin" — con ich → bin.' },
      {s:'Du ___ sehr nett.',           opts:['bin','bist','ist','sind'],  a:1, fb:'"Du bist" — con du → bist.' },
      {s:'Er ___ aus Kolumbien.',       opts:['bin','bist','ist','sind'],  a:2, fb:'"Er ist" — con er/sie/es → ist.' },
      {s:'Wir ___ Freunde.',            opts:['bin','sind','ist','seid'],  a:1, fb:'"Wir sind" — con wir → sind.' },
      {s:'Ihr ___ fleißig.',            opts:['sind','seid','ist','bist'], a:1, fb:'"Ihr seid" — con ihr → seid.' },
      {s:'Sie (pl.) ___ in Berlin.',    opts:['bin','bist','ist','sind'],  a:3, fb:'"Sie sind" — plural/formal → sind.' },
      {s:'Das ___ mein Haus.',          opts:['bin','bist','ist','sind'],  a:2, fb:'"Das ist" — con es/das → ist.' },
      {s:'Ich ___ nicht müde.',         opts:['bin','bist','ist','sind'],  a:0, fb:'"Ich bin nicht" — negación con ich bin.' },
      {s:'Sie (ella) ___ Lehrerin.',    opts:['bin','bist','ist','sind'],  a:2, fb:'"Sie ist" — con sie (ella) → ist.' },
      {s:'Das Kind ___ krank.',         opts:['bin','bist','ist','sind'],  a:2, fb:'"Das Kind ist" — singular → ist.' },
    ],
  },
  pronomen: {
    title:'Personalpronomen',
    desc:'ich · du · er (masc.) · sie (fem.) · es (neutro) · wir · sie (pl.)',
    qs:[
      {s:'Maria kommt aus Deutschland. ___ kommt aus Deutschland.',  opts:['Er','Sie','Es','Wir'],  a:1, fb:'"Sie" — Maria es femenino → sie.' },
      {s:'Peter und ich lernen Deutsch. ___ lernen Deutsch.',        opts:['Wir','Sie','Ihr','Es'],  a:0, fb:'"Wir" — yo + otra persona → wir.' },
      {s:'Das Buch ist neu. ___ ist neu.',                           opts:['Er','Sie','Es','Wir'],  a:2, fb:'"Es" — Das Buch es neutro → es.' },
      {s:'Die Kinder spielen. ___ spielen.',                         opts:['Wir','Sie','Ihr','Es'],  a:1, fb:'"Sie" — plural personas → sie.' },
      {s:'Hans ist Student. ___ studiert in Berlin.',                opts:['Er','Sie','Es','Wir'],  a:0, fb:'"Er" — Hans es masculino → er.' },
      {s:'Das ist meine Mutter. ___ heißt Petra.',                   opts:['Er','Sie','Es','Wir'],  a:1, fb:'"Sie" — Mutter es femenino → sie.' },
      {s:'Ich und du — ___ sind Freunde.',                           opts:['Wir','Sie','Ihr','Es'],  a:0, fb:'"Wir" — ich + du = wir.' },
      {s:'Der Kaffee ist heiß. Ich trinke ___.',                     opts:['er','sie','es','ihn'],  a:3, fb:'"Ihn" — acusativo de der Kaffee (masculino) → ihn.' },
    ],
  },
};

const PHRASES = [
  {phrase:'Hallo!',                     phonetic:'[HAH-loh]',                       es:'¡Hola!'},
  {phrase:'Ich heiße ___.',             phonetic:'[ich HY-sseh]',                   es:'Me llamo ___.'},
  {phrase:'Wie geht es Ihnen?',         phonetic:'[vee gayt es EE-nen]',            es:'¿Cómo está usted?'},
  {phrase:'Freut mich.',                phonetic:'[froyt mich]',                    es:'Mucho gusto.'},
  {phrase:'Danke schön.',               phonetic:'[DAHN-ke shern]',                 es:'Muchas gracias.'},
  {phrase:'Ich verstehe nicht.',        phonetic:'[ich fer-SHTAY-he nicht]',        es:'No entiendo.'},
  {phrase:'Können Sie wiederholen?',    phonetic:'[KER-nen zee VEE-der-hoh-len]',   es:'¿Puede repetir?'},
  {phrase:'Wo ist die Toilette?',       phonetic:'[voh ist dee toy-LET-e]',         es:'¿Dónde está el baño?'},
  {phrase:'Was kostet das?',            phonetic:'[vahs KOS-tet dahs]',             es:'¿Cuánto cuesta?'},
  {phrase:'Ich brauche Hilfe.',         phonetic:'[ich BROW-che HIL-fe]',           es:'Necesito ayuda.'},
];

const WRITING_PROMPT = 'Schreib 3 Sätze über dich: (1) deinen Namen und dein Alter, (2) wo du wohnst und was du machst, (3) was du magst.';
const VOCAB_BANK = ['Ich heiße','Ich bin ___ Jahre alt','Ich wohne in','Ich lerne','Ich arbeite','Ich mag','Ich habe','Meine Familie','Jeden Tag','Am Wochenende'];

function tokenize(text:string) { return text.split(/(\s+)/).filter(Boolean).map(t=>({raw:t,isSpace:/^\s+$/.test(t),clean:t.replace(/[^a-zA-ZÀ-ÿäöüÄÖÜß]/g,'').toLowerCase()})); }

function ReadingA1() {
  const [activeWord,setActiveWord]=useState<string|null>(null);
  const [activeIdx,setActiveIdx]=useState<number|null>(null);
  const [phase,setPhase]=useState<'read'|'questions'|'done'>('read');
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [revealed,setRevealed]=useState<Record<number,boolean>>({});
  const [openAns,setOpenAns]=useState('');
  const tokens=tokenize(READING_TEXT);
  const allDone=READ_Q.every((_,i)=>answers[i]!==undefined);

  function handleAnswer(qi:number,oi:number) { if (answers[qi]!==undefined) return; setAnswers(p=>({...p,[qi]:oi})); setRevealed(p=>({...p,[qi]:true})); }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      {phase==='read'&&(
        <div className="wl-card" style={{ padding:'1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Text A1 — Klick auf ein Wort für die Übersetzung</p>
          <div style={{ lineHeight:2.1, fontSize:'1.05rem', color:'var(--ink)', position:'relative' }}>
            {tokens.map((t,i)=>{
              if (t.isSpace) return <span key={i}>{t.raw}</span>;
              const hasTrans=!!VOCAB[t.clean],isActive=activeIdx===i;
              return (
                <span key={i} style={{ position:'relative', display:'inline-block' }}>
                  <button onClick={() => { setActiveWord(VOCAB[t.clean]??null); setActiveIdx(i); }} style={{ background:isActive?`rgba(221,0,0,0.12)`:hasTrans?`rgba(221,0,0,0.06)`:'transparent', border:isActive?`1.5px solid ${COLOR}`:hasTrans?`1px dashed rgba(221,0,0,0.3)`:'none', borderRadius:6, padding:'0 3px', cursor:hasTrans?'pointer':'default', fontSize:'inherit', fontFamily:'inherit', color:isActive?COLOR:'inherit', fontWeight:isActive?700:'inherit', transition:'all 0.15s' }}>{t.raw}</button>
                  {isActive&&(activeWord?<span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:COLOR, color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.78rem', fontWeight:600, whiteSpace:'nowrap', zIndex:10, boxShadow:`0 4px 16px rgba(221,0,0,0.25)`, marginTop:4 }}>{activeWord}</span>:<span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:'#6f7691', color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.72rem', whiteSpace:'nowrap', zIndex:10, marginTop:4 }}>(Funktionswort)</span>)}
                </span>
              );
            })}
          </div>
          <button className="btn btn-sm" style={{ marginTop:'1.25rem' }} onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>Ya leí → Responder preguntas</button>
        </div>
      )}

      {phase==='questions'&&(
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf:'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {READ_Q.map((q,qi)=>{
            const ans=answers[qi],done=ans!==undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding:'1.25rem' }}>
                <div style={{ fontSize:'0.68rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>{qi<2?'Vokabular':'Verständnis'} · Frage {qi+1}</div>
                <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{q.q}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                  {q.opts.map((opt,oi)=>{
                    const isCorrect=oi===q.a,isSelected=ans===oi;
                    let bg='var(--bg)',border='1.5px solid var(--line-soft)',color='var(--ink)';
                    if (done&&isCorrect){bg='rgba(5,150,105,0.1)';border='1.5px solid #059669';color='#059669';}
                    if (done&&isSelected&&!isCorrect){bg='rgba(220,38,38,0.1)';border='1.5px solid #dc2626';color='#dc2626';}
                    return <button key={oi} onClick={() => handleAnswer(qi,oi)} disabled={done} style={{ textAlign:'left', padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.92rem', cursor:done?'default':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.15s' }}><span style={{ fontSize:'0.8rem', fontFamily:'var(--mono)', fontWeight:700, opacity:0.6 }}>{String.fromCharCode(65+oi)}.</span>{opt}{done&&isCorrect&&<span style={{ marginLeft:'auto' }}>✓</span>}{done&&isSelected&&!isCorrect&&<span style={{ marginLeft:'auto' }}>✗</span>}</button>;
                  })}
                </div>
                {revealed[qi]&&<div style={{ marginTop:'0.75rem', padding:'0.65rem 0.9rem', borderRadius:8, background:answers[qi]===q.a?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.83rem', color:'var(--ink-2)' }}>{answers[qi]===q.a?'✅ ':'💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding:'1.25rem' }}>
            <div style={{ fontSize:'0.68rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Offene Frage</div>
            <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{OPEN_Q}</p>
            <textarea value={openAns} onChange={e=>setOpenAns(e.target.value)} placeholder="Schreib deine Antwort hier..." rows={3} style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.95rem', fontFamily:'inherit', boxSizing:'border-box' }}/>
          </div>
          {allDone&&<button className="btn btn-sm" onClick={() => setPhase('done')}>Ver resultado →</button>}
        </div>
      )}

      {phase==='done'&&(
        <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{Object.entries(answers).filter(([i,v])=>v===READ_Q[+i].a).length===READ_Q.length?'🎉':'📚'}</div>
          <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)' }}>{Object.entries(answers).filter(([i,v])=>v===READ_Q[+i].a).length} / {READ_Q.length} correctas</h2>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setRevealed({}); setOpenAns(''); }}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')}>Volver al texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GramaticaA1() {
  const [topic,setTopic]=useState<keyof typeof GRAMMAR_TOPICS>('artikel');
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [revealed,setRevealed]=useState<Record<number,boolean>>({});
  const [showResult,setShowResult]=useState(false);
  const data=GRAMMAR_TOPICS[topic];
  const all=data.qs.length,done=Object.keys(answers).length;
  const correct=data.qs.filter((q,i)=>answers[i]===q.a).length;
  function pick(qi:number,oi:number) { if (answers[qi]!==undefined) return; setAnswers(p=>({...p,[qi]:oi})); setRevealed(p=>({...p,[qi]:true})); }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.75rem' }}><span className="ink-line" />Thema wählen</p>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {(Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[]).map(k=><button key={k} className={topic===k?'btn btn-sm':'btn btn-ghost btn-sm'} onClick={() => { setTopic(k); reset(); }} style={{ fontSize:'0.84rem' }}>{GRAMMAR_TOPICS[k].title}</button>)}
        </div>
        <p style={{ margin:'0.85rem 0 0', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>{data.desc}</p>
      </div>
      {done>0&&!showResult&&<div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}><div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}><div style={{ height:'100%', width:`${(done/all)*100}%`, background:COLOR, borderRadius:4, transition:'width 0.4s' }}/></div><span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)', flexShrink:0 }}>{done}/{all}</span></div>}
      {!showResult&&data.qs.map((q,qi)=>{
        const ans=answers[qi],isDone=ans!==undefined;
        return (
          <div key={`${topic}-${qi}`} className="wl-card" style={{ padding:'1.25rem' }}>
            <p style={{ margin:'0 0 0.85rem', fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>
              {qi+1}. {q.s.split('___').map((part,i,arr)=><span key={i}>{part}{i<arr.length-1&&<span style={{ display:'inline-block', minWidth:70, borderBottom:`2px solid ${COLOR}`, margin:'0 4px', verticalAlign:'bottom' }}>{isDone&&<span style={{ fontSize:'0.88rem', fontWeight:800, color:answers[qi]===q.a?'#059669':'#dc2626' }}>{q.opts[ans]}</span>}</span>}</span>)}
            </p>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              {q.opts.map((opt,oi)=>{
                const isCorrect=oi===q.a,isSelected=ans===oi;
                let bg='var(--bg-2)',border='1px solid var(--line-soft)',color='var(--ink)';
                if (isDone&&isCorrect){bg='rgba(5,150,105,0.1)';border='1px solid #059669';color='#059669';}
                if (isDone&&isSelected&&!isCorrect){bg='rgba(220,38,38,0.1)';border='1px solid #dc2626';color='#dc2626';}
                return <button key={oi} onClick={() => pick(qi,oi)} disabled={isDone} style={{ padding:'0.5rem 1rem', borderRadius:8, fontSize:'0.92rem', fontWeight:700, border, background:bg, color, cursor:isDone?'default':'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>{opt}</button>;
              })}
            </div>
            {revealed[qi]&&<div style={{ marginTop:'0.65rem', fontSize:'0.82rem', color:'var(--ink-2)', padding:'0.5rem 0.75rem', borderRadius:8, background:ans===q.a?'rgba(5,150,105,0.07)':'rgba(220,38,38,0.07)' }}>{ans===q.a?'✅ ':`✗ La respuesta es "${q.opts[q.a]}". `}{q.fb}</div>}
          </div>
        );
      })}
      {done===all&&!showResult&&<button className="btn btn-sm" onClick={() => setShowResult(true)}>Ver resultado →</button>}
      {showResult&&<div className="wl-card" style={{ padding:'1.75rem', textAlign:'center' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{correct===all?'🏆':correct>=all*0.7?'⭐':'📖'}</div>
        <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)' }}>{correct} / {all} correctas</h2>
        <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
          <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { const keys=Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[]; const next=keys[(keys.indexOf(topic)+1)%keys.length]; setTopic(next); reset(); }}>Siguiente tema →</button>
        </div>
      </div>}
    </div>
  );
}

function EscrituraA1() {
  const [text,setText]=useState('');
  const [submitted,setSubmitted]=useState(false);
  const words=text.trim()?text.trim().split(/\s+/).length:0;
  if (submitted) return (
    <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>✅</div>
      <h2 style={{ margin:'0 0 0.5rem', color:'var(--wl-on-panel-ok, #059669)' }}>¡Text gesendet!</h2>
      <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1rem', maxWidth:420, marginLeft:'auto', marginRight:'auto' }}>Tu texto fue registrado. Un profesor de WeLearn lo revisará pronto.</p>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.25rem', textAlign:'left', maxWidth:440, margin:'0 auto 1.25rem' }}><p style={{ margin:0, fontSize:'0.88rem', color:'var(--ink-2)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>{text}</p></div>
      <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); }}>Einen anderen Text schreiben</button>
    </div>
  );
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem', borderTop:`3px solid ${COLOR}` }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Schreibaufgabe A1</p>
        <p style={{ margin:0, fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>{WRITING_PROMPT}</p>
        <p style={{ margin:'0.5rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Instrucción: Escribe 3 frases para presentarte en alemán.</p>
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.65rem' }}>
          <span style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Deine Antwort:</span>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:words>=15?'#059669':'var(--muted)' }}>{words} Wörter {words>=15?'✓':'(min. 15)'}</span>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Schreib hier auf Deutsch..." rows={6} style={{ width:'100%', padding:'0.85rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.98rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.8 }}/>
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p style={{ margin:'0 0 0.65rem', fontSize:'0.8rem', fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono)' }}>Nützlicher Wortschatz — klicken zum Einfügen</p>
        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
          {VOCAB_BANK.map(v=><button key={v} onClick={() => setText(p=>p?`${p} ${v}`:v)} style={{ fontSize:'0.82rem', padding:'0.3rem 0.7rem', borderRadius:8, border:`1px solid rgba(221,0,0,0.25)`, background:`rgba(221,0,0,0.06)`, color:COLOR, cursor:'pointer', fontFamily:'inherit' }}>{v}</button>)}
        </div>
      </div>
      <button className="btn btn-sm" disabled={words<8} onClick={() => setSubmitted(true)} style={{ opacity:words<8?0.5:1 }}>Senden →</button>
    </div>
  );
}

function HablaA1() {
  const [status,setStatus]=useState<Record<number,'done'|'retry'|null>>({});
  const done=Object.values(status).filter(v=>v==='done').length;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Überlebensphrasen A1</p>
        <p style={{ margin:0, fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.65 }}>Lee cada frase en voz alta. Usa la guía fonética. Marca si lo lograste o necesitas más práctica.</p>
        {done>0&&<div style={{ marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.75rem' }}><div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}><div style={{ height:'100%', width:`${(done/PHRASES.length)*100}%`, background:'#059669', borderRadius:4, transition:'width 0.5s' }}/></div><span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--wl-on-panel-ok, #059669)' }}>{done}/{PHRASES.length}</span></div>}
      </div>
      {PHRASES.map((p,i)=>{
        const s=status[i];
        return (
          <div key={i} className="wl-card" style={{ padding:'1.25rem', borderLeft:`3px solid ${s==='done'?'#059669':s==='retry'?'#f59e0b':'var(--line-soft)'}`, transition:'border-color 0.3s' }}>
            <div style={{ marginBottom:'0.75rem' }}>
              <div style={{ fontSize:'1.25rem', fontWeight:800, color:'var(--ink)', marginBottom:'0.25rem' }}>{p.phrase}</div>
              <div style={{ fontSize:'0.85rem', color:COLOR, fontFamily:'var(--mono)', marginBottom:'0.2rem' }}>{p.phonetic}</div>
              <div style={{ fontSize:'0.88rem', color:'var(--muted)' }}>{p.es}</div>
            </div>
            {!s?<div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              <button onClick={() => setStatus(p=>({...p,[i]:'done'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #059669', background:'rgba(5,150,105,0.08)', color:'var(--wl-on-panel-ok, #059669)', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>✓ Lo logré</button>
              <button onClick={() => setStatus(p=>({...p,[i]:'retry'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #f59e0b', background:'rgba(245,158,11,0.08)', color:'var(--wl-on-panel-warn, #d97706)', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>🔁 Necesito practicar</button>
            </div>:<div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
              <span style={{ fontSize:'0.85rem', fontWeight:700, color:s==='done'?'#059669':'#d97706' }}>{s==='done'?'✓ Completado':'🔁 Para practicar'}</span>
              <button onClick={() => setStatus(p=>{ const n={...p}; delete n[i]; return n; })} style={{ fontSize:'0.75rem', color:'var(--muted)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }}>Cambiar</button>
            </div>}
          </div>
        );
      })}
      {done===PHRASES.length&&<div className="wl-card" style={{ padding:'1.25rem', textAlign:'center', background:'rgba(5,150,105,0.07)', border:'1.5px solid #059669' }}><div style={{ fontSize:'2rem', marginBottom:'0.4rem' }}>🎉</div><p style={{ margin:0, fontWeight:700, color:'var(--wl-on-panel-ok, #059669)' }}>¡Ausgezeichnet! Dominas las frases esenciales en alemán.</p></div>}
    </div>
  );
}

function EscuchaA1() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center', borderTop:`3px solid ${COLOR}` }}>
        <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🎧</div>
        <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)', fontSize:'1.4rem' }}>Hörverstehen A1 — Próximamente</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.92rem', maxWidth:400, margin:'0 auto 1.25rem', lineHeight:1.65 }}>Los ejercicios de escucha estarán disponibles muy pronto con diálogos reales en alemán A1.</p>
        <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          {['🗣️ Dialoge A1','📝 Lückentext','🔊 Überlebensphrasen','🎯 Richtig / Falsch'].map(tag=><span key={tag} style={{ fontSize:'0.78rem', padding:'0.25rem 0.65rem', borderRadius:20, background:`rgba(221,0,0,0.08)`, color:COLOR, border:`1px solid rgba(221,0,0,0.2)`, fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>)}
        </div>
      </div>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', fontSize:'0.85rem', color:'var(--muted)' }}>
        Mientras esperas: escucha <strong style={{ color:'var(--ink)' }}>Deutsch warum nicht</strong> (Deutsche Welle) o <strong style={{ color:'var(--ink)' }}>DW Deutsch lernen</strong> — recursos gratuitos perfectos para A1-A2.
      </div>
    </div>
  );
}

const LEVELS=[{id:'A1',label:'A1 — Anfänger',active:true},{id:'A2',label:'A2 — Grundstufe',active:false},{id:'B1',label:'B1 — Mittelstufe',active:false},{id:'B2',label:'B2 — Fortgeschritten',active:false}];
const SKILLS:{id:Skill;label:string;icon:string;desc:string}[]=[
  {id:'lectura',label:'Lesen',icon:'📖',desc:'Text mit Vokabular + Verständnisfragen'},
  {id:'gramatica',label:'Grammatik',icon:'⚡',desc:'Artikel, sein, Pronomen'},
  {id:'escritura',label:'Schreiben',icon:'✏️',desc:'Geführter Prompt mit Wortschatzhilfe'},
  {id:'habla',label:'Sprechen',icon:'🗣️',desc:'Überlebensphrasen mit Aussprachehilfe'},
  {id:'escucha',label:'Hören',icon:'🎧',desc:'Próximamente'},
];

export default function AlemanHubClient() {
  const [level,setLevel]=useState<string|null>(null);
  const [skill,setSkill]=useState<Skill|null>(null);

  if (!level) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.75rem' }}>
        <Link href="/practica" className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Práctica</Link>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Práctica / Alemán</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />🇩🇪 Deutsch üben</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Elige tu nivel</h1>
      <p style={{ color:'var(--muted)', fontSize:'1rem', margin:'0 0 2rem' }}>Lesen, Grammatik, Schreiben y Sprechen.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
        {LEVELS.map(l=><button key={l.id} onClick={() => l.active&&setLevel(l.id)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.25rem', borderRadius:14, border:l.active?`1.5px solid ${COLOR}`:'1.5px solid var(--line-soft)', background:l.active?`rgba(221,0,0,0.06)`:'var(--bg-2)', cursor:l.active?'pointer':'default', fontFamily:'inherit', opacity:l.active?1:0.6, transition:'all 0.15s' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}><span style={{ fontSize:'0.7rem', fontWeight:800, padding:'0.2rem 0.5rem', borderRadius:6, background:l.active?COLOR:'var(--line-soft)', color:l.active?'#fff':'var(--muted)', fontFamily:'var(--mono)' }}>{l.id}</span><span style={{ fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{l.label}</span></div>
          <span style={{ fontSize:'0.8rem', color:l.active?COLOR:'var(--muted)', fontWeight:l.active?700:400 }}>{l.active?'Practicar →':'Próximamente'}</span>
        </button>)}
      </div>
    </div></div></section>
  );

  if (!skill) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.75rem' }}>
        <button onClick={() => setLevel(null)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Volver</button>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Deutsch / {level}</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Deutsch {level}</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>¿Qué quieres practicar?</h1>
      <div className="wl-exams-catalog" style={{ marginTop:'1.5rem' }}>
        {SKILLS.map(s=><button key={s.id} onClick={() => s.id!=='escucha'&&setSkill(s.id)} className={`wl-catalog-card${s.id==='escucha'?' wl-catalog-card--soon':''}`} style={{ '--exam-color':COLOR, textAlign:'left', cursor:s.id!=='escucha'?'pointer':'default', appearance:'none', WebkitAppearance:'none', margin:0, padding:0, font:'inherit', color:'inherit', display:'flex', flexDirection:'column' } as React.CSSProperties}>
          <div className="wl-catalog-card__bar"/>
          <div className="wl-catalog-card__body"><div className="wl-catalog-card__top"><span style={{ fontSize:'1.8rem' }}>{s.icon}</span>{s.id==='escucha'&&<span className="wl-catalog-card__badge">Próximamente</span>}</div><h2 className="wl-catalog-card__name">{s.label}</h2><p className="wl-catalog-card__tagline">{s.desc}</p></div>
          <div className="wl-catalog-card__footer"><span>Deutsch {level}</span><span className="wl-catalog-card__cta">{s.id==='escucha'?'Próximamente':'Practicar →'}</span></div>
        </button>)}
      </div>
    </div></div></section>
  );

  const skillLabel=SKILLS.find(s=>s.id===skill)?.label??skill;
  return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        <button onClick={() => setSkill(null)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Habilidades</button>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Deutsch {level} / {skillLabel}</span>
      </div>
      <div style={{ marginBottom:'1.5rem' }}><p className="eyebrow" style={{ marginBottom:'0.3rem' }}><span className="ink-line" />🇩🇪 Deutsch {level} — {skillLabel}</p></div>
      {skill==='lectura'&&<ReadingA1/>}
      {skill==='gramatica'&&<GramaticaA1/>}
      {skill==='escritura'&&<EscrituraA1/>}
      {skill==='habla'&&<HablaA1/>}
      {skill==='escucha'&&<EscuchaA1/>}
    </div></div></section>
  );
}
