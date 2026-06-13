'use client';

import { useState } from 'react';
import Link from 'next/link';

type Skill = 'lectura' | 'gramatica' | 'escritura' | 'habla' | 'escucha';

const READING_TEXT =
  "Olá! Meu nome é Carlos. Tenho trinta anos. Moro em São Paulo com minha esposa e meu filho. " +
  "Trabalho num escritório perto de casa. Todo dia tomo café da manhã com pão e frutas. " +
  "No fim de semana, gosto de ir ao parque com minha família. Adoro futebol e música brasileira.";

const VOCAB: Record<string, string> = {
  olá: '¡hola', nome: 'nombre', tenho: 'tengo', trinta: 'treinta',
  moro: 'vivo', paulo: 'Paulo', esposa: 'esposa / mujer',
  filho: 'hijo', trabalho: 'trabajo', escritório: 'oficina',
  perto: 'cerca', casa: 'casa', manhã: 'mañana', pão: 'pan',
  frutas: 'frutas', semana: 'semana', gosto: 'me gusta',
  parque: 'parque', família: 'familia', adoro: 'adoro / me encanta',
  futebol: 'fútbol', música: 'música', brasileira: 'brasileña',
};

const READ_Q = [
  { q: '¿Qué significa "filho"?', opts: ['hija','hijo','amigo','hermano'], a: 1, fb: '"Filho" = hijo. "Filha" = hija.' },
  { q: '¿Qué significa "escritório"?', opts: ['escuela','hospital','oficina','restaurante'], a: 2, fb: '"Escritório" = oficina (lugar de trabajo).' },
  { q: '¿Dónde vive Carlos?', opts: ['Rio de Janeiro','Brasília','São Paulo','Salvador'], a: 2, fb: '"Moro em São Paulo" — Carlos vive en São Paulo.' },
  { q: '¿Qué hace Carlos los fines de semana?', opts: ['Va al cine','Va al parque','Trabaja','Viaja'], a: 1, fb: '"Gosto de ir ao parque" — Carlos va al parque.' },
];
const OPEN_Q = '¿Qué cosas le gustan a Carlos? Escríbelo en español o en portugués.';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; desc: string; qs: GQItem[] }> = {
  artigos: {
    title: 'Artigos: o / a / um / uma',
    desc: 'Masculino → o / um · Feminino → a / uma · Plural → os / as',
    qs: [
      { s:'___ livro é interessante.',    opts:['O','A','Um','Uma'],     a:0, fb:'"O livro" — livro é masculino → o.' },
      { s:'___ casa é bonita.',           opts:['O','A','Um','Uma'],     a:1, fb:'"A casa" — casa é feminino → a.' },
      { s:'Eu tenho ___ irmão.',          opts:['o','a','um','uma'],     a:2, fb:'"Um irmão" — masculino + indefinido → um.' },
      { s:'Ela tem ___ filha.',           opts:['o','a','um','uma'],     a:3, fb:'"Uma filha" — feminino + indefinido → uma.' },
      { s:'___ alunos estudam muito.',    opts:['O','A','Os','As'],      a:2, fb:'"Os alunos" — plural masculino → os.' },
      { s:'___ professoras são ótimas.',  opts:['O','A','Os','As'],      a:3, fb:'"As professoras" — plural feminino → as.' },
      { s:'Quero ___ café, por favor.',   opts:['o','a','um','uma'],     a:2, fb:'"Um café" — masculino indefinido → um.' },
      { s:'Preciso de ___ caneta.',       opts:['o','a','um','uma'],     a:3, fb:'"Uma caneta" — feminino indefinido → uma.' },
      { s:'___ menino está na escola.',   opts:['O','A','Um','Uma'],     a:0, fb:'"O menino" — menino é masculino + definido → o.' },
      { s:'___ cidade é grande.',         opts:['O','A','Um','Uma'],     a:1, fb:'"A cidade" — cidade é feminino + definido → a.' },
    ],
  },
  ser_estar: {
    title: 'Ser vs Estar',
    desc: 'Ser = identidade permanente. Estar = estado temporário ou localização.',
    qs: [
      { s:'Eu ___ estudante. (identidade)',      opts:['sou','estou','é','está'],    a:0, fb:'"Eu sou" — identidade → ser.' },
      { s:'Ele ___ cansado hoje. (estado)',       opts:['sou','estou','é','está'],    a:3, fb:'"Ele está cansado" — estado temporário → estar.' },
      { s:'Nós ___ do Brasil. (origem)',          opts:['somos','estamos','são','estão'],a:0,fb:'"Nós somos" — origem → ser.' },
      { s:'Ela ___ feliz agora. (estado)',        opts:['sou','estou','é','está'],    a:3, fb:'"Ela está feliz" — estado temporário → estar.' },
      { s:'Você ___ professor? (profissão)',      opts:['sou','estou','é','está'],    a:2, fb:'"Você é" — profissão → ser.' },
      { s:'Eles ___ em casa. (localização)',      opts:['são','estão','somos','estamos'],a:1,fb:'"Eles estão" — localização → estar.' },
      { s:'O café ___ quente. (estado)',          opts:['é','está','sou','estou'],    a:1, fb:'"O café está quente" — estado temporário → estar.' },
      { s:'Minha mãe ___ médica. (profissão)',    opts:['é','está','sou','estou'],    a:0, fb:'"Minha mãe é médica" — profissão → ser.' },
      { s:'Eu ___ bem, obrigado. (estado)',       opts:['sou','estou','é','está'],    a:1, fb:'"Eu estou bem" — estado → estar.' },
      { s:'São Paulo ___ uma cidade grande.',     opts:['é','está','sou','estou'],    a:0, fb:'"São Paulo é" — característica → ser.' },
    ],
  },
  verbos_ar: {
    title: 'Verbos regulares -AR (presente)',
    desc: 'EU -o · TU -as · ELE/ELA -a · NÓS -amos · VOCÊS/ELES -am',
    qs: [
      { s:'Eu ___ (falar) português.',    opts:['falo','falas','fala','falamos'],     a:0, fb:'"Eu falo" — eu + -o.' },
      { s:'Você ___ (morar) em São Paulo?',opts:['moro','moras','mora','moram'],     a:2, fb:'"Você mora" — você + -a.' },
      { s:'Ela ___ (trabalhar) muito.',   opts:['trabalho','trabalhas','trabalha','trabalham'],a:2,fb:'"Ela trabalha" — ela + -a.' },
      { s:'Nós ___ (estudar) inglês.',    opts:['estudo','estudas','estuda','estudamos'],a:3,fb:'"Nós estudamos" — nós + -amos.' },
      { s:'Eles ___ (amar) o Brasil.',    opts:['amo','amas','ama','amam'],           a:3, fb:'"Eles amam" — eles + -am.' },
      { s:'Tu ___ (gostar) de música?',   opts:['gosto','gostas','gosta','gostam'],   a:1, fb:'"Tu gostas" — tu + -as.' },
      { s:'Eu ___ (tomar) café de manhã.',opts:['tomo','tomas','toma','tomamos'],    a:0, fb:'"Eu tomo" — eu + -o.' },
      { s:'Nós ___ (usar) o computador.', opts:['uso','usas','usa','usamos'],        a:3, fb:'"Nós usamos" — nós + -amos.' },
      { s:'Ela ___ (comprar) frutas.',    opts:['compro','compras','compra','compram'],a:2,fb:'"Ela compra" — ela + -a.' },
      { s:'Você ___ (ajudar) muito.',     opts:['ajudo','ajudas','ajuda','ajudam'],  a:2, fb:'"Você ajuda" — você + -a.' },
    ],
  },
};

const PHRASES = [
  { phrase:'Olá!',                    phonetic:'[oh-LAH]',                      es:'¡Hola!' },
  { phrase:'Meu nome é ___.',         phonetic:'[mew NOH-meh eh]',              es:'Mi nombre es ___.' },
  { phrase:'Como vai você?',          phonetic:'[KOH-moo vai voh-SAY]',         es:'¿Cómo estás?' },
  { phrase:'Prazer em conhecê-lo.',   phonetic:'[prah-ZER em koh-nyeh-SAY-loo]',es:'Mucho gusto.' },
  { phrase:'Obrigado / Obrigada.',    phonetic:'[oh-bree-GAH-doo / -dah]',      es:'Gracias.' },
  { phrase:'Não entendo.',            phonetic:'[nowng en-TEN-doo]',             es:'No entiendo.' },
  { phrase:'Pode repetir?',           phonetic:'[POH-djeh heh-peh-TEER]',       es:'¿Puede repetir?' },
  { phrase:'Onde fica o banheiro?',   phonetic:'[OHN-djeh FEE-kah oo bah-NYAY-roo]',es:'¿Dónde está el baño?' },
  { phrase:'Quanto custa?',           phonetic:'[KWAHN-too KOOS-tah]',          es:'¿Cuánto cuesta?' },
  { phrase:'Preciso de ajuda.',       phonetic:'[preh-SEE-zoo djeh ah-ZHOO-dah]',es:'Necesito ayuda.' },
];

const WRITING_PROMPT = 'Escreva 3 frases sobre você: (1) seu nome e sua idade, (2) onde você mora e o que você faz, (3) o que você gosta.';
const VOCAB_BANK = ['Meu nome é','Tenho ___ anos','Moro em','Trabalho em','Estudo','Gosto de','Adoro','Minha família','Todo dia','No fim de semana'];

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({ raw:t, isSpace:/^\s+$/.test(t), clean:t.replace(/[^a-zA-ZÀ-ÿ]/g,'').toLowerCase() }));
}

function ReadingA1() {
  const [activeWord, setActiveWord] = useState<string|null>(null);
  const [activeIdx, setActiveIdx]   = useState<number|null>(null);
  const [phase, setPhase]           = useState<'read'|'questions'|'done'>('read');
  const [answers, setAnswers]       = useState<Record<number,number>>({});
  const [revealed, setRevealed]     = useState<Record<number,boolean>>({});
  const [openAns, setOpenAns]       = useState('');
  const tokens = tokenize(READING_TEXT);
  const allDone = READ_Q.every((_,i)=>answers[i]!==undefined);
  const COLOR = '#009c3b';

  function handleAnswer(qi:number, oi:number) {
    if (answers[qi]!==undefined) return;
    setAnswers(p=>({...p,[qi]:oi})); setRevealed(p=>({...p,[qi]:true}));
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      {phase==='read' && (
        <div className="wl-card" style={{ padding:'1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Texto A1 — Clique em qualquer palavra para ver a tradução</p>
          <div style={{ lineHeight:2.1, fontSize:'1.05rem', color:'var(--ink)', position:'relative' }}>
            {tokens.map((t,i) => {
              if (t.isSpace) return <span key={i}>{t.raw}</span>;
              const hasTrans=!!VOCAB[t.clean], isActive=activeIdx===i;
              return (
                <span key={i} style={{ position:'relative', display:'inline-block' }}>
                  <button onClick={() => { setActiveWord(VOCAB[t.clean]??null); setActiveIdx(i); }}
                    style={{ background: isActive?`rgba(0,156,59,0.12)`:hasTrans?`rgba(0,156,59,0.06)`:'transparent', border: isActive?`1.5px solid ${COLOR}`:hasTrans?`1px dashed rgba(0,156,59,0.3)`:'none', borderRadius:6, padding:'0 3px', cursor:hasTrans?'pointer':'default', fontSize:'inherit', fontFamily:'inherit', color:isActive?COLOR:'inherit', fontWeight:isActive?700:'inherit', transition:'all 0.15s' }}>{t.raw}</button>
                  {isActive && (activeWord?<span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:COLOR, color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.78rem', fontWeight:600, whiteSpace:'nowrap', zIndex:10, boxShadow:`0 4px 16px rgba(0,156,59,0.25)`, marginTop:4 }}>{activeWord}</span>:<span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:'#6f7691', color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.72rem', whiteSpace:'nowrap', zIndex:10, marginTop:4 }}>(partícula gramatical)</span>)}
                </span>
              );
            })}
          </div>
          <button className="btn btn-sm" style={{ marginTop:'1.25rem' }} onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>Ya leí → Responder preguntas</button>
        </div>
      )}

      {phase==='questions' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf:'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {READ_Q.map((q,qi) => {
            const ans=answers[qi], done=ans!==undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding:'1.25rem' }}>
                <div style={{ fontSize:'0.68rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>{qi<2?'Vocabulário':'Compreensão'} · Pergunta {qi+1}</div>
                <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{q.q}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                  {q.opts.map((opt,oi) => {
                    const isCorrect=oi===q.a, isSelected=ans===oi;
                    let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
                    if (done && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1.5px solid #059669'; color='#059669'; }
                    if (done && isSelected && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
                    return <button key={oi} onClick={() => handleAnswer(qi,oi)} disabled={done} style={{ textAlign:'left', padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.92rem', cursor:done?'default':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.15s' }}><span style={{ fontSize:'0.8rem', fontFamily:'var(--mono)', fontWeight:700, opacity:0.6 }}>{String.fromCharCode(65+oi)}.</span>{opt}{done&&isCorrect&&<span style={{ marginLeft:'auto' }}>✓</span>}{done&&isSelected&&!isCorrect&&<span style={{ marginLeft:'auto' }}>✗</span>}</button>;
                  })}
                </div>
                {revealed[qi] && <div style={{ marginTop:'0.75rem', padding:'0.65rem 0.9rem', borderRadius:8, background:answers[qi]===q.a?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.83rem', color:'var(--ink-2)' }}>{answers[qi]===q.a?'✅ ':'💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding:'1.25rem' }}>
            <div style={{ fontSize:'0.68rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Pergunta aberta</div>
            <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{OPEN_Q}</p>
            <textarea value={openAns} onChange={e=>setOpenAns(e.target.value)} placeholder="Escreva sua resposta aqui..." rows={3} style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.95rem', fontFamily:'inherit', boxSizing:'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')}>Ver resultado →</button>}
        </div>
      )}

      {phase==='done' && (
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
  const [topic, setTopic]     = useState<keyof typeof GRAMMAR_TOPICS>('artigos');
  const [answers, setAnswers] = useState<Record<number,number>>({});
  const [revealed, setRevealed] = useState<Record<number,boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const data = GRAMMAR_TOPICS[topic];
  const all=data.qs.length, done=Object.keys(answers).length;
  const correct=data.qs.filter((q,i)=>answers[i]===q.a).length;
  const COLOR = '#009c3b';

  function pick(qi:number,oi:number) { if (answers[qi]!==undefined) return; setAnswers(p=>({...p,[qi]:oi})); setRevealed(p=>({...p,[qi]:true})); }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.75rem' }}><span className="ink-line" />Escolha um tema</p>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {(Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[]).map(k=>(
            <button key={k} className={topic===k?'btn btn-sm':'btn btn-ghost btn-sm'} onClick={() => { setTopic(k); reset(); }} style={{ fontSize:'0.84rem' }}>{GRAMMAR_TOPICS[k].title}</button>
          ))}
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
      <h2 style={{ margin:'0 0 0.5rem', color:'#059669' }}>¡Texto enviado!</h2>
      <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1rem', maxWidth:420, marginLeft:'auto', marginRight:'auto' }}>Tu texto fue registrado. Un profesor de WeLearn lo revisará pronto.</p>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.25rem', textAlign:'left', maxWidth:440, margin:'0 auto 1.25rem' }}><p style={{ margin:0, fontSize:'0.88rem', color:'var(--ink-2)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>{text}</p></div>
      <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); }}>Escrever outro texto</button>
    </div>
  );
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem', borderTop:'3px solid #009c3b' }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Tarefa de escrita A1</p>
        <p style={{ margin:0, fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>{WRITING_PROMPT}</p>
        <p style={{ margin:'0.5rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Instrucción: Escribe 3 frases para presentarte en portugués.</p>
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.65rem' }}>
          <span style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Sua resposta:</span>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:words>=15?'#059669':'var(--muted)' }}>{words} palavras {words>=15?'✓':'(mín. 15)'}</span>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Escreva aqui em português..." rows={6} style={{ width:'100%', padding:'0.85rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.98rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.8 }}/>
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p style={{ margin:'0 0 0.65rem', fontSize:'0.8rem', fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono)' }}>Vocabulário útil — clique para inserir</p>
        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
          {VOCAB_BANK.map(v=><button key={v} onClick={() => setText(p=>p?`${p} ${v}`:v)} style={{ fontSize:'0.82rem', padding:'0.3rem 0.7rem', borderRadius:8, border:'1px solid rgba(0,156,59,0.25)', background:'rgba(0,156,59,0.06)', color:'#009c3b', cursor:'pointer', fontFamily:'inherit' }}>{v}</button>)}
        </div>
      </div>
      <button className="btn btn-sm" disabled={words<8} onClick={() => setSubmitted(true)} style={{ opacity:words<8?0.5:1 }}>Enviar →</button>
    </div>
  );
}

function HablaA1() {
  const [status,setStatus]=useState<Record<number,'done'|'retry'|null>>({});
  const done=Object.values(status).filter(v=>v==='done').length;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Frases de sobrevivência A1</p>
        <p style={{ margin:0, fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.65 }}>Lee cada frase en voz alta. Usa la guía fonética. Marca si lo lograste o necesitas más práctica.</p>
        {done>0&&<div style={{ marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.75rem' }}><div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}><div style={{ height:'100%', width:`${(done/PHRASES.length)*100}%`, background:'#059669', borderRadius:4, transition:'width 0.5s' }}/></div><span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'#059669' }}>{done}/{PHRASES.length}</span></div>}
      </div>
      {PHRASES.map((p,i)=>{
        const s=status[i];
        return (
          <div key={i} className="wl-card" style={{ padding:'1.25rem', borderLeft:`3px solid ${s==='done'?'#059669':s==='retry'?'#f59e0b':'var(--line-soft)'}`, transition:'border-color 0.3s' }}>
            <div style={{ marginBottom:'0.75rem' }}>
              <div style={{ fontSize:'1.25rem', fontWeight:800, color:'var(--ink)', marginBottom:'0.25rem' }}>{p.phrase}</div>
              <div style={{ fontSize:'0.85rem', color:'#009c3b', fontFamily:'var(--mono)', marginBottom:'0.2rem' }}>{p.phonetic}</div>
              <div style={{ fontSize:'0.88rem', color:'var(--muted)' }}>{p.es}</div>
            </div>
            {!s?<div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              <button onClick={() => setStatus(p=>({...p,[i]:'done'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #059669', background:'rgba(5,150,105,0.08)', color:'#059669', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>✓ Lo logré</button>
              <button onClick={() => setStatus(p=>({...p,[i]:'retry'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #f59e0b', background:'rgba(245,158,11,0.08)', color:'#d97706', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>🔁 Necesito practicar</button>
            </div>:<div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
              <span style={{ fontSize:'0.85rem', fontWeight:700, color:s==='done'?'#059669':'#d97706' }}>{s==='done'?'✓ Completado':'🔁 Para practicar'}</span>
              <button onClick={() => setStatus(p=>{ const n={...p}; delete n[i]; return n; })} style={{ fontSize:'0.75rem', color:'var(--muted)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }}>Cambiar</button>
            </div>}
          </div>
        );
      })}
      {done===PHRASES.length&&<div className="wl-card" style={{ padding:'1.25rem', textAlign:'center', background:'rgba(5,150,105,0.07)', border:'1.5px solid #059669' }}><div style={{ fontSize:'2rem', marginBottom:'0.4rem' }}>🎉</div><p style={{ margin:0, fontWeight:700, color:'#059669' }}>¡Ótimo trabalho! Dominas as frases essenciais em português.</p></div>}
    </div>
  );
}

function EscuchaA1() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center', borderTop:'3px solid #009c3b' }}>
        <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🎧</div>
        <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)', fontSize:'1.4rem' }}>Compreensão auditiva A1 — Próximamente</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.92rem', maxWidth:400, margin:'0 auto 1.25rem', lineHeight:1.65 }}>Los ejercicios de escucha estarán disponibles muy pronto con diálogos reales en português.</p>
        <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          {['🗣️ Diálogos reais','📝 Preencher texto','🔊 Frases de sobrevivência','🎯 Verdadeiro / Falso'].map(tag=><span key={tag} style={{ fontSize:'0.78rem', padding:'0.25rem 0.65rem', borderRadius:20, background:'rgba(0,156,59,0.08)', color:'#009c3b', border:'1px solid rgba(0,156,59,0.2)', fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>)}
        </div>
      </div>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', fontSize:'0.85rem', color:'var(--muted)' }}>
        Mientras esperas: escucha <strong style={{ color:'var(--ink)' }}>Português com Letras</strong> o <strong style={{ color:'var(--ink)' }}>Aprender Português</strong> en YouTube — recursos gratuitos para nivel A1-A2.
      </div>
    </div>
  );
}

const LEVELS=[{id:'A1',label:'A1 — Iniciante',active:true},{id:'A2',label:'A2 — Básico',active:false},{id:'B1',label:'B1 — Intermediário',active:false},{id:'B2',label:'B2 — Avançado',active:false}];
const SKILLS:{id:Skill;label:string;icon:string;desc:string}[]=[
  {id:'lectura',label:'Leitura',icon:'📖',desc:'Texto com vocabulário + perguntas de compreensão'},
  {id:'gramatica',label:'Gramática',icon:'⚡',desc:'Artigos, Ser/Estar, verbos -AR'},
  {id:'escritura',label:'Escrita',icon:'✏️',desc:'Prompt guiado com banco de vocabulário'},
  {id:'habla',label:'Expressão oral',icon:'🗣️',desc:'Frases de sobrevivência com guia fonético'},
  {id:'escucha',label:'Compreensão oral',icon:'🎧',desc:'Próximamente'},
];
const COLOR='#009c3b';

export default function PortuguesHubClient() {
  const [level,setLevel]=useState<string|null>(null);
  const [skill,setSkill]=useState<Skill|null>(null);

  if (!level) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.75rem' }}>
        <Link href="/practica" className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Práctica</Link>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Práctica / Portugués</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />🇧🇷 Prática de Português</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Elige tu nivel</h1>
      <p style={{ color:'var(--muted)', fontSize:'1rem', margin:'0 0 2rem' }}>Leitura, Gramática, Escrita y Expressão oral.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
        {LEVELS.map(l=><button key={l.id} onClick={() => l.active&&setLevel(l.id)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.25rem', borderRadius:14, border:l.active?`1.5px solid ${COLOR}`:'1.5px solid var(--line-soft)', background:l.active?`rgba(0,156,59,0.06)`:'var(--bg-2)', cursor:l.active?'pointer':'default', fontFamily:'inherit', opacity:l.active?1:0.6, transition:'all 0.15s' }}>
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
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Português / {level}</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Português {level}</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>¿Qué quieres practicar?</h1>
      <div className="wl-exams-catalog" style={{ marginTop:'1.5rem' }}>
        {SKILLS.map(s=><button key={s.id} onClick={() => s.id!=='escucha'&&setSkill(s.id)} className={`wl-catalog-card${s.id==='escucha'?' wl-catalog-card--soon':''}`} style={{ '--exam-color':COLOR, textAlign:'left', cursor:s.id!=='escucha'?'pointer':'default', appearance:'none', WebkitAppearance:'none', margin:0, padding:0, font:'inherit', color:'inherit', display:'flex', flexDirection:'column' } as React.CSSProperties}>
          <div className="wl-catalog-card__bar"/>
          <div className="wl-catalog-card__body"><div className="wl-catalog-card__top"><span style={{ fontSize:'1.8rem' }}>{s.icon}</span>{s.id==='escucha'&&<span className="wl-catalog-card__badge">Próximamente</span>}</div><h2 className="wl-catalog-card__name">{s.label}</h2><p className="wl-catalog-card__tagline">{s.desc}</p></div>
          <div className="wl-catalog-card__footer"><span>Português {level}</span><span className="wl-catalog-card__cta">{s.id==='escucha'?'Próximamente':'Practicar →'}</span></div>
        </button>)}
      </div>
    </div></div></section>
  );

  const skillLabel=SKILLS.find(s=>s.id===skill)?.label??skill;
  return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        <button onClick={() => setSkill(null)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Habilidades</button>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Português {level} / {skillLabel}</span>
      </div>
      <div style={{ marginBottom:'1.5rem' }}><p className="eyebrow" style={{ marginBottom:'0.3rem' }}><span className="ink-line" />🇧🇷 Português {level} — {skillLabel}</p></div>
      {skill==='lectura'&&<ReadingA1/>}
      {skill==='gramatica'&&<GramaticaA1/>}
      {skill==='escritura'&&<EscrituraA1/>}
      {skill==='habla'&&<HablaA1/>}
      {skill==='escucha'&&<EscuchaA1/>}
    </div></div></section>
  );
}
