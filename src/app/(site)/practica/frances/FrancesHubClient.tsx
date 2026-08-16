'use client';

import { useState } from 'react';
import Link from 'next/link';

type Skill = 'lectura' | 'gramatica' | 'escritura' | 'habla' | 'escucha';

// ─── Reading A1 ───────────────────────────────────────────────────────────────

const READING_TEXT =
  "Bonjour! Je m'appelle Sophie. J'ai vingt ans. J'habite à Paris avec mes parents. " +
  "J'ai un frère et une sœur. Mon frère s'appelle Paul et il a dix-huit ans. " +
  "Chaque matin, je bois du café et je mange une baguette. " +
  "J'étudie le français à l'université. J'aime lire et écouter de la musique.";

const VOCAB: Record<string, string> = {
  bonjour: '¡hola', appelle: 'me llamo', ai: 'tengo (edad)',
  habite: 'vivo / habito', paris: 'París', parents: 'padres',
  frère: 'hermano', sœur: 'hermana', paul: 'Paul',
  matin: 'mañana', bois: 'bebo', café: 'café',
  mange: 'como', baguette: 'baguette (pan francés)',
  étudie: 'estudio', université: 'universidad',
  aime: 'me gusta / amo', lire: 'leer', écouter: 'escuchar', musique: 'música',
};

const READ_Q = [
  { q: '¿Qué significa "frère"?', opts: ['hermana','hermano','amigo','padre'], a: 1, fb: '"Frère" = hermano. "Sœur" = hermana.' },
  { q: '¿Qué significa "matin"?', opts: ['noche','tarde','mañana','semana'], a: 2, fb: '"Matin" = mañana (parte del día antes del mediodía).' },
  { q: '¿Dónde vive Sophie?', opts: ['En Lyon','En París','En Marsella','En Burdeos'], a: 1, fb: '"J\'habite à Paris" — Sophie vive en París.' },
  { q: '¿Qué toma Sophie en la mañana?', opts: ['Solo café','Baguette y café','Croissant','Leche'], a: 1, fb: '"Je bois du café et je mange une baguette" — café y baguette.' },
];
const OPEN_Q = '¿Qué le gusta hacer a Sophie? Escríbelo en español o en francés.';

// ─── Grammar A1 ───────────────────────────────────────────────────────────────

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; desc: string; qs: GQItem[] }> = {
  articles: {
    title: 'Articles: le / la / l\' / les / un / une',
    desc: 'Masculin → le/un · Féminin → la/une · Devant voyelle → l\' · Pluriel → les/des.',
    qs: [
      { s:"J'ai ___ frère.",               opts:["un","une","le","l'"],    a:0, fb:'"Un frère" — frère es masculino → un.' },
      { s:"Elle a ___ sœur.",              opts:["un","une","le","la"],    a:1, fb:'"Une sœur" — sœur es femenino → une.' },
      { s:"___ chat est mignon.",          opts:["Le","La","L'","Les"],    a:0, fb:'"Le chat" — chat es masculino → le.' },
      { s:"___ école est grande.",         opts:["Le","La","L'","Les"],    a:2, fb:'"L\'école" — antes de vocal se usa l\'.' },
      { s:"J'ai ___ amis.",               opts:["des","les","un","de"],   a:0, fb:'"Des amis" — plural indefinido → des.' },
      { s:"___ livres sont sur la table.", opts:["Le","La","Les","L'"],   a:2, fb:'"Les livres" — plural definido → les.' },
      { s:"Il lit ___ journal.",          opts:["un","une","le","l'"],    a:0, fb:'"Un journal" — masculino + primera mención → un.' },
      { s:"C'est ___ belle ville.",        opts:["un","une","le","la"],    a:1, fb:'"Une ville" — ville es femenino → une.' },
      { s:"___ hôtel est moderne.",        opts:["Le","La","L'","Les"],    a:2, fb:'"L\'hôtel" — h aspirada pero se usa l\' (hôtel).' },
      { s:"J'ai ___ stylos dans mon sac.", opts:["des","les","un","de"],   a:0, fb:'"Des stylos" — plural indefinido → des.' },
    ],
  },
  etre: {
    title: 'Être au présent',
    desc: 'je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont',
    qs: [
      { s:"Je ___ étudiant(e).",          opts:["suis","es","est","sommes"], a:0, fb:'"Je suis" — con "je" siempre "suis".' },
      { s:"Tu ___ français(e)?",          opts:["suis","es","est","êtes"],   a:1, fb:'"Tu es" — con "tu" siempre "es".' },
      { s:"Il ___ médecin.",              opts:["suis","es","est","sont"],   a:2, fb:'"Il est" — con il/elle siempre "est".' },
      { s:"Elle ___ très gentille.",      opts:["suis","es","est","sont"],   a:2, fb:'"Elle est" — con il/elle → est.' },
      { s:"Nous ___ amis.",               opts:["sommes","êtes","sont","es"],a:0, fb:'"Nous sommes" — con nous → sommes.' },
      { s:"Vous ___ à Paris?",            opts:["sommes","êtes","sont","es"],a:1, fb:'"Vous êtes" — con vous → êtes.' },
      { s:"Ils ___ à l'école.",           opts:["sommes","êtes","sont","es"],a:2, fb:'"Ils sont" — con ils/elles → sont.' },
      { s:"Je ne ___ pas fatigué(e).",    opts:["suis","es","est","sommes"], a:0, fb:'"Je ne suis pas" — negación con suis.' },
      { s:"Elles ___ très belles.",       opts:["sommes","êtes","sont","es"],a:2, fb:'"Elles sont" — plural femenino → sont.' },
      { s:"Tu ___ prêt(e)?",             opts:["suis","es","est","êtes"],   a:1, fb:'"Tu es" — con tu → es.' },
    ],
  },
  avoir: {
    title: 'Avoir au présent',
    desc: 'j\'ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont',
    qs: [
      { s:"J'___ vingt ans.",             opts:["ai","as","a","avons"],  a:0, fb:'"J\'ai" — con je → ai.' },
      { s:"Tu ___ un chat?",              opts:["ai","as","a","avez"],   a:1, fb:'"Tu as" — con tu → as.' },
      { s:"Il ___ une voiture.",          opts:["ai","as","a","ont"],    a:2, fb:'"Il a" — con il/elle → a.' },
      { s:"Nous ___ faim.",               opts:["avons","avez","ont","as"],a:0, fb:'"Nous avons" — con nous → avons.' },
      { s:"Vous ___ des enfants?",        opts:["avons","avez","ont","as"],a:1, fb:'"Vous avez" — con vous → avez.' },
      { s:"Elles ___ peur.",              opts:["avons","avez","ont","a"],a:2, fb:'"Elles ont" — con ils/elles → ont.' },
      { s:"J'___ un frère et une sœur.",  opts:["ai","as","a","avons"],  a:0, fb:'"J\'ai" — con je → ai.' },
      { s:"Tu ___ soif?",                 opts:["ai","as","a","avez"],   a:1, fb:'"Tu as" — con tu → as.' },
      { s:"Il ___ besoin d'aide.",        opts:["ai","as","a","ont"],    a:2, fb:'"Il a besoin" — con il → a.' },
      { s:"Ils ___ beaucoup de travail.", opts:["avons","avez","ont","a"],a:2, fb:'"Ils ont" — con ils → ont.' },
    ],
  },
};

// ─── Speaking A1 ──────────────────────────────────────────────────────────────

const PHRASES = [
  { phrase:'Bonjour!',                phonetic:'[bon-ZHOOR]',              es:'¡Buenos días / Hola!' },
  { phrase:'Je m\'appelle ___.',      phonetic:'[zhe mah-PEL]',            es:'Me llamo ___.' },
  { phrase:'Comment allez-vous?',     phonetic:'[koh-mahn tah-LEH voo]',   es:'¿Cómo está usted?' },
  { phrase:'Enchanté(e).',            phonetic:'[ahn-shahn-TEH]',          es:'Encantado/a.' },
  { phrase:'Merci beaucoup.',         phonetic:'[mehr-SEE boh-KOO]',       es:'Muchas gracias.' },
  { phrase:'Je ne comprends pas.',    phonetic:'[zhe ne kohm-PRAHN pah]',  es:'No entiendo.' },
  { phrase:'Pouvez-vous répéter?',    phonetic:'[poo-VEH voo reh-peh-TEH]',es:'¿Puede repetir?' },
  { phrase:'Où sont les toilettes?',  phonetic:'[oo sohn leh twah-LET]',   es:'¿Dónde están los baños?' },
  { phrase:'Combien ça coûte?',       phonetic:'[kom-BYAN sah koot]',      es:'¿Cuánto cuesta?' },
  { phrase:'J\'ai besoin d\'aide.',   phonetic:'[zhay buh-ZWAN daid]',     es:'Necesito ayuda.' },
];

// ─── Writing A1 ───────────────────────────────────────────────────────────────

const WRITING_PROMPT = 'Présente-toi en 3 phrases en français: (1) ton prénom et ton âge, (2) où tu habites et ce que tu étudies/fais, (3) ce que tu aimes.';
const VOCAB_BANK = [
  'Je m\'appelle', 'J\'ai ___ ans', 'J\'habite à', 'J\'étudie', 'Je travaille',
  'J\'aime', 'Je n\'aime pas', 'J\'ai un/une', 'Ma famille', 'Tous les jours',
];

// ─── Token parser ─────────────────────────────────────────────────────────────

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t,
    isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase(),
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ReadingA1() {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeIdx, setActiveIdx]   = useState<number | null>(null);
  const [phase, setPhase]           = useState<'read'|'questions'|'done'>('read');
  const [answers, setAnswers]       = useState<Record<number,number>>({});
  const [revealed, setRevealed]     = useState<Record<number,boolean>>({});
  const [openAns, setOpenAns]       = useState('');
  const tokens = tokenize(READING_TEXT);
  const allDone = READ_Q.every((_,i) => answers[i] !== undefined);

  function handleAnswer(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      {phase === 'read' && (
        <div className="wl-card" style={{ padding:'1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Texto A1 — Toca una palabra para ver su traducción</p>
          <div style={{ lineHeight:2.1, fontSize:'1.05rem', color:'var(--ink)', position:'relative' }}>
            {tokens.map((t, i) => {
              if (t.isSpace) return <span key={i}>{t.raw}</span>;
              const hasTrans = !!VOCAB[t.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position:'relative', display:'inline-block' }}>
                  <button onClick={() => { setActiveWord(VOCAB[t.clean] ?? null); setActiveIdx(i); }}
                    style={{
                      background: isActive ? 'rgba(0,49,137,0.12)' : hasTrans ? 'rgba(0,49,137,0.06)' : 'transparent',
                      border: isActive ? '1.5px solid #003189' : hasTrans ? '1px dashed rgba(0,49,137,0.3)' : 'none',
                      borderRadius:6, padding:'0 3px', cursor: hasTrans ? 'pointer' : 'default',
                      fontSize:'inherit', fontFamily:'inherit', color: isActive ? '#003189' : 'inherit',
                      fontWeight: isActive ? 700 : 'inherit', transition:'all 0.15s',
                    }}>{t.raw}</button>
                  {isActive && (activeWord ? (
                    <span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:'#003189', color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.78rem', fontWeight:600, whiteSpace:'nowrap', zIndex:10, boxShadow:'0 4px 16px rgba(0,49,137,0.25)', marginTop:4 }}>{activeWord}</span>
                  ) : (
                    <span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:'#6f7691', color:'#fff', borderRadius:8, padding:'0.3rem 0.65rem', fontSize:'0.72rem', whiteSpace:'nowrap', zIndex:10, marginTop:4 }}>(mot grammatical)</span>
                  ))}
                </span>
              );
            })}
          </div>
          <button className="btn btn-sm" style={{ marginTop:'1.25rem' }} onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
            Ya leí → Responder preguntas
          </button>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf:'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {READ_Q.map((q, qi) => {
            const ans = answers[qi]; const done = ans !== undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding:'1.25rem' }}>
                <div style={{ fontSize:'0.68rem', fontWeight:800, color:'var(--wl-on-panel-link, #003189)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>
                  {qi < 2 ? 'Vocabulaire' : 'Compréhension'} · Question {qi+1}
                </div>
                <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{q.q}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                  {q.opts.map((opt,oi) => {
                    const isCorrect = oi===q.a, isSelected = ans===oi;
                    let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
                    if (done && isCorrect)  { bg='rgba(5,150,105,0.1)'; border='1.5px solid #059669'; color='#059669'; }
                    if (done && isSelected && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
                    return (
                      <button key={oi} onClick={() => handleAnswer(qi,oi)} disabled={done}
                        style={{ textAlign:'left', padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.92rem', cursor: done?'default':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.15s' }}>
                        <span style={{ fontSize:'0.8rem', fontFamily:'var(--mono)', fontWeight:700, opacity:0.6 }}>{String.fromCharCode(65+oi)}.</span>
                        {opt}
                        {done && isCorrect && <span style={{ marginLeft:'auto' }}>✓</span>}
                        {done && isSelected && !isCorrect && <span style={{ marginLeft:'auto' }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {revealed[qi] && <div style={{ marginTop:'0.75rem', padding:'0.65rem 0.9rem', borderRadius:8, background: answers[qi]===q.a?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.83rem', color:'var(--ink-2)' }}>{answers[qi]===q.a?'✅ ':'💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding:'1.25rem' }}>
            <div style={{ fontSize:'0.68rem', fontWeight:800, color:'var(--wl-on-panel-link, #003189)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Question ouverte</div>
            <p style={{ margin:'0 0 0.85rem', fontWeight:600, color:'var(--ink)', fontSize:'0.98rem' }}>{OPEN_Q}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} placeholder="Écris ta réponse ici..." rows={3}
              style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.95rem', fontFamily:'inherit', boxSizing:'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')}>Ver resultado →</button>}
        </div>
      )}

      {phase === 'done' && (
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
  const [topic, setTopic]   = useState<keyof typeof GRAMMAR_TOPICS>('articles');
  const [answers, setAnswers] = useState<Record<number,number>>({});
  const [revealed, setRevealed] = useState<Record<number,boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const data = GRAMMAR_TOPICS[topic];
  const all = data.qs.length, done = Object.keys(answers).length;
  const correct = data.qs.filter((q,i)=>answers[i]===q.a).length;

  function pick(qi:number, oi:number) {
    if (answers[qi]!==undefined) return;
    setAnswers(p=>({...p,[qi]:oi}));
    setRevealed(p=>({...p,[qi]:true}));
  }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.75rem' }}><span className="ink-line" />Choisir un thème</p>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {(Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[]).map(k => (
            <button key={k} className={topic===k?'btn btn-sm':'btn btn-ghost btn-sm'} onClick={() => { setTopic(k); reset(); }} style={{ fontSize:'0.84rem' }}>{GRAMMAR_TOPICS[k].title}</button>
          ))}
        </div>
        <p style={{ margin:'0.85rem 0 0', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>{data.desc}</p>
      </div>

      {done>0 && !showResult && (
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}>
            <div style={{ height:'100%', width:`${(done/all)*100}%`, background:'#003189', borderRadius:4, transition:'width 0.4s' }} />
          </div>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)', flexShrink:0 }}>{done}/{all}</span>
        </div>
      )}

      {!showResult && data.qs.map((q,qi) => {
        const ans=answers[qi], isDone=ans!==undefined;
        return (
          <div key={`${topic}-${qi}`} className="wl-card" style={{ padding:'1.25rem' }}>
            <p style={{ margin:'0 0 0.85rem', fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>
              {qi+1}. {q.s.split('___').map((part,i,arr) => (
                <span key={i}>{part}{i<arr.length-1 && (
                  <span style={{ display:'inline-block', minWidth:70, borderBottom:'2px solid #003189', margin:'0 4px', verticalAlign:'bottom' }}>
                    {isDone && <span style={{ fontSize:'0.88rem', fontWeight:800, color:answers[qi]===q.a?'#059669':'#dc2626' }}>{q.opts[ans]}</span>}
                  </span>
                )}</span>
              ))}
            </p>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              {q.opts.map((opt,oi) => {
                const isCorrect=oi===q.a, isSelected=ans===oi;
                let bg='var(--bg-2)', border='1px solid var(--line-soft)', color='var(--ink)';
                if (isDone && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1px solid #059669'; color='#059669'; }
                if (isDone && isSelected && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1px solid #dc2626'; color='#dc2626'; }
                return (
                  <button key={oi} onClick={() => pick(qi,oi)} disabled={isDone}
                    style={{ padding:'0.5rem 1rem', borderRadius:8, fontSize:'0.92rem', fontWeight:700, border, background:bg, color, cursor:isDone?'default':'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {revealed[qi] && <div style={{ marginTop:'0.65rem', fontSize:'0.82rem', color:'var(--ink-2)', padding:'0.5rem 0.75rem', borderRadius:8, background:ans===q.a?'rgba(5,150,105,0.07)':'rgba(220,38,38,0.07)' }}>
              {ans===q.a?'✅ ':`✗ La respuesta es "${q.opts[q.a]}". `}{q.fb}
            </div>}
          </div>
        );
      })}

      {done===all && !showResult && <button className="btn btn-sm" onClick={() => setShowResult(true)}>Ver mi resultado →</button>}

      {showResult && (
        <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{correct===all?'🏆':correct>=all*0.7?'⭐':'📖'}</div>
          <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)' }}>{correct} / {all} correctas</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.25rem' }}>{correct===all?'¡Parfait! Dominas este tema.':correct>=all*0.7?'Très bien. Repasa los errores.':'Estudia la explicación y practica de nuevo.'}</p>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={() => {
              const keys=Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[];
              const next=keys[(keys.indexOf(topic)+1)%keys.length];
              setTopic(next); reset();
            }}>Siguiente tema →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EscrituraA1() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (submitted) return (
    <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>✅</div>
      <h2 style={{ margin:'0 0 0.5rem', color:'var(--wl-on-panel-ok, #059669)' }}>¡Texte envoyé!</h2>
      <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1rem', maxWidth:420, marginLeft:'auto', marginRight:'auto' }}>Tu texto fue registrado. Un profesor de WeLearn lo revisará pronto.</p>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.25rem', textAlign:'left', maxWidth:440, margin:'0 auto 1.25rem' }}>
        <p style={{ margin:0, fontSize:'0.88rem', color:'var(--ink-2)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>{text}</p>
      </div>
      <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); }}>Écrire un autre texte</button>
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem', borderTop:'3px solid #003189' }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Tâche d'écriture A1</p>
        <p style={{ margin:0, fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>{WRITING_PROMPT}</p>
        <p style={{ margin:'0.5rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Instrucción: Escribe 3 frases para presentarte en francés. Incluye: nombre, edad, dónde vives y qué te gusta.</p>
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.65rem' }}>
          <span style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Ta réponse:</span>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color: words>=15?'#059669':'var(--muted)' }}>{words} mots {words>=15?'✓':'(mín. 15)'}</span>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Écris ici en français..." rows={6}
          style={{ width:'100%', padding:'0.85rem 1rem', borderRadius:10, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.98rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.8 }} />
      </div>
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p style={{ margin:'0 0 0.65rem', fontSize:'0.8rem', fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono)' }}>Vocabulaire utile — cliquer pour insérer</p>
        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
          {VOCAB_BANK.map(v => (
            <button key={v} onClick={() => setText(p => p ? `${p} ${v}` : v)}
              style={{ fontSize:'0.82rem', padding:'0.3rem 0.7rem', borderRadius:8, border:'1px solid rgba(0,49,137,0.25)', background:'rgba(0,49,137,0.06)', color:'var(--wl-on-panel-link, #003189)', cursor:'pointer', fontFamily:'inherit' }}>{v}</button>
          ))}
        </div>
      </div>
      <button className="btn btn-sm" disabled={words<8} onClick={() => setSubmitted(true)} style={{ opacity:words<8?0.5:1 }}>Envoyer →</button>
    </div>
  );
}

function HablaA1() {
  const [status, setStatus] = useState<Record<number,'done'|'retry'|null>>({});
  const done = Object.values(status).filter(v=>v==='done').length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Expressions de survie A1</p>
        <p style={{ margin:0, fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.65 }}>Lee cada frase en voz alta. Usa la guía fonética. Marca si lo lograste o necesitas más práctica.</p>
        {done>0 && <div style={{ marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}>
            <div style={{ height:'100%', width:`${(done/PHRASES.length)*100}%`, background:'#059669', borderRadius:4, transition:'width 0.5s' }} />
          </div>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--wl-on-panel-ok, #059669)' }}>{done}/{PHRASES.length}</span>
        </div>}
      </div>

      {PHRASES.map((p,i) => {
        const s=status[i];
        return (
          <div key={i} className="wl-card" style={{ padding:'1.25rem', borderLeft:`3px solid ${s==='done'?'#059669':s==='retry'?'#f59e0b':'var(--line-soft)'}`, transition:'border-color 0.3s' }}>
            <div style={{ marginBottom:'0.75rem' }}>
              <div style={{ fontSize:'1.25rem', fontWeight:800, color:'var(--ink)', marginBottom:'0.25rem' }}>{p.phrase}</div>
              <div style={{ fontSize:'0.85rem', color:'var(--wl-on-panel-link, #003189)', fontFamily:'var(--mono)', marginBottom:'0.2rem' }}>{p.phonetic}</div>
              <div style={{ fontSize:'0.88rem', color:'var(--muted)' }}>{p.es}</div>
            </div>
            {!s ? (
              <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                <button onClick={() => setStatus(p=>({...p,[i]:'done'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #059669', background:'rgba(5,150,105,0.08)', color:'var(--wl-on-panel-ok, #059669)', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>✓ Lo logré</button>
                <button onClick={() => setStatus(p=>({...p,[i]:'retry'}))} style={{ padding:'0.45rem 1rem', borderRadius:8, border:'1.5px solid #f59e0b', background:'rgba(245,158,11,0.08)', color:'var(--wl-on-panel-warn, #d97706)', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>🔁 Necesito practicar</button>
              </div>
            ) : (
              <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                <span style={{ fontSize:'0.85rem', fontWeight:700, color:s==='done'?'#059669':'#d97706' }}>{s==='done'?'✓ Completado':'🔁 Para practicar'}</span>
                <button onClick={() => setStatus(p=>{ const n={...p}; delete n[i]; return n; })} style={{ fontSize:'0.75rem', color:'var(--muted)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }}>Cambiar</button>
              </div>
            )}
          </div>
        );
      })}

      {done===PHRASES.length && (
        <div className="wl-card" style={{ padding:'1.25rem', textAlign:'center', background:'rgba(5,150,105,0.07)', border:'1.5px solid #059669' }}>
          <div style={{ fontSize:'2rem', marginBottom:'0.4rem' }}>🎉</div>
          <p style={{ margin:0, fontWeight:700, color:'var(--wl-on-panel-ok, #059669)' }}>¡Felicitaciones! Dominas las frases esenciales en francés.</p>
        </div>
      )}
    </div>
  );
}

function EscuchaA1() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div className="wl-card" style={{ padding:'1.75rem', textAlign:'center', borderTop:'3px solid #003189' }}>
        <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🎧</div>
        <h2 style={{ margin:'0 0 0.5rem', color:'var(--ink)', fontSize:'1.4rem' }}>Compréhension orale A1 — Próximamente</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.92rem', maxWidth:400, margin:'0 auto 1.25rem', lineHeight:1.65 }}>Los ejercicios de escucha estarán disponibles muy pronto con diálogos reales en francés de nivel A1.</p>
        <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          {['🗣️ Dialogues A1','📝 Compléter le texte','🔊 Expressions courantes','🎯 Vrai / Faux'].map(tag=>(
            <span key={tag} style={{ fontSize:'0.78rem', padding:'0.25rem 0.65rem', borderRadius:20, background:'rgba(0,49,137,0.08)', color:'var(--wl-on-panel-link, #003189)', border:'1px solid rgba(0,49,137,0.2)', fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>
          ))}
        </div>
      </div>
      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', fontSize:'0.85rem', color:'var(--muted)' }}>
        Mientras esperas: escucha <strong style={{ color:'var(--ink)' }}>innerFrench (podcast A2-B1)</strong> o <strong style={{ color:'var(--ink)' }}>Français authentique</strong> en YouTube — excelentes recursos gratuitos.
      </div>
    </div>
  );
}

// ─── Root hub ─────────────────────────────────────────────────────────────────

const LEVELS = [
  { id:'A1', label:'A1 — Débutant',       active:true  },
  { id:'A2', label:'A2 — Élémentaire',    active:false },
  { id:'B1', label:'B1 — Intermédiaire',  active:false },
  { id:'B2', label:'B2 — Avancé',         active:false },
];

const SKILLS: { id:Skill; label:string; icon:string; desc:string }[] = [
  { id:'lectura',   label:'Lecture',      icon:'📖', desc:'Texte avec vocabulaire + questions de compréhension' },
  { id:'gramatica', label:'Grammaire',    icon:'⚡', desc:'Articles, être, avoir' },
  { id:'escritura', label:'Écriture',     icon:'✏️', desc:'Prompt guidé avec banque de vocabulaire' },
  { id:'habla',     label:'Expression orale', icon:'🗣️', desc:'Phrases de survie avec guide phonétique' },
  { id:'escucha',   label:'Compréhension orale', icon:'🎧', desc:'Próximamente' },
];

export default function FrancesHubClient() {
  const [level, setLevel] = useState<string|null>(null);
  const [skill, setSkill] = useState<Skill|null>(null);

  if (!level) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.75rem' }}>
        <Link href="/practica" className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Práctica</Link>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Práctica / Francés</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />🇫🇷 Pratique de Français</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Elige tu nivel</h1>
      <p style={{ color:'var(--muted)', fontSize:'1rem', margin:'0 0 2rem' }}>Lecture, Grammaire, Écriture y Expression orale.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
        {LEVELS.map(l => (
          <button key={l.id} onClick={() => l.active && setLevel(l.id)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.25rem', borderRadius:14, border: l.active?'1.5px solid #003189':'1.5px solid var(--line-soft)', background: l.active?'rgba(0,49,137,0.06)':'var(--bg-2)', cursor: l.active?'pointer':'default', fontFamily:'inherit', opacity: l.active?1:0.6, transition:'all 0.15s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span style={{ fontSize:'0.7rem', fontWeight:800, padding:'0.2rem 0.5rem', borderRadius:6, background: l.active?'#003189':'var(--line-soft)', color: l.active?'#fff':'var(--muted)', fontFamily:'var(--mono)' }}>{l.id}</span>
              <span style={{ fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{l.label}</span>
            </div>
            <span style={{ fontSize:'0.8rem', color: l.active?'#003189':'var(--muted)', fontWeight: l.active?700:400 }}>{l.active?'Practicar →':'Próximamente'}</span>
          </button>
        ))}
      </div>
    </div></div></section>
  );

  if (!skill) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.75rem' }}>
        <button onClick={() => setLevel(null)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Volver</button>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Francés / {level}</span>
      </div>
      <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Français {level}</p>
      <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>¿Qué quieres practicar?</h1>
      <div className="wl-exams-catalog" style={{ marginTop:'1.5rem' }}>
        {SKILLS.map(s => (
          <button key={s.id} onClick={() => s.id!=='escucha' && setSkill(s.id)}
            className={`wl-catalog-card${s.id==='escucha'?' wl-catalog-card--soon':''}`}
            style={{ '--exam-color':'#003189', textAlign:'left', cursor: s.id!=='escucha'?'pointer':'default', appearance:'none', WebkitAppearance:'none', margin:0, padding:0, font:'inherit', color:'inherit', display:'flex', flexDirection:'column' } as React.CSSProperties}>
            <div className="wl-catalog-card__bar" />
            <div className="wl-catalog-card__body">
              <div className="wl-catalog-card__top">
                <span style={{ fontSize:'1.8rem' }}>{s.icon}</span>
                {s.id==='escucha' && <span className="wl-catalog-card__badge">Próximamente</span>}
              </div>
              <h2 className="wl-catalog-card__name">{s.label}</h2>
              <p className="wl-catalog-card__tagline">{s.desc}</p>
            </div>
            <div className="wl-catalog-card__footer">
              <span>Français {level}</span>
              <span className="wl-catalog-card__cta">{s.id==='escucha'?'Próximamente':'Practicar →'}</span>
            </div>
          </button>
        ))}
      </div>
    </div></div></section>
  );

  const skillLabel = SKILLS.find(s=>s.id===skill)?.label ?? skill;
  return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth:720, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        <button onClick={() => setSkill(null)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>← Habilidades</button>
        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontFamily:'var(--mono)' }}>Français {level} / {skillLabel}</span>
      </div>
      <div style={{ marginBottom:'1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.3rem' }}><span className="ink-line" />🇫🇷 Français {level} — {skillLabel}</p>
      </div>
      {skill==='lectura'   && <ReadingA1 />}
      {skill==='gramatica' && <GramaticaA1 />}
      {skill==='escritura' && <EscrituraA1 />}
      {skill==='habla'     && <HablaA1 />}
      {skill==='escucha'   && <EscuchaA1 />}
    </div></div></section>
  );
}
