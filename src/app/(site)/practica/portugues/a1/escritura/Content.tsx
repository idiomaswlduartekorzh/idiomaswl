'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; topic: string;
  prompt: string; promptPt: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id:1, title:'Me apresentar', topic:'Apresentação',
    prompt:'Escribe 4–5 oraciones en portugués para presentarte: nombre, edad, dónde vives, qué haces y algo que te gusta.',
    promptPt:'Escreva 4–5 frases para se apresentar: nome, idade, onde mora, o que faz e o que gosta.',
    model:'Olá! Meu nome é Pedro. Tenho vinte e dois anos. Moro em Medellín, na Colômbia. Estudo engenharia na universidade. Adoro música e futebol.',
    criteria:['Inclui nome e idade (Meu nome é... / Tenho ... anos)','Menciona onde mora (Moro em...)','Diz o que faz (Estudo/Trabalho)','Inclui um gosto (Gosto de / Adoro...)'],
    vocab:["Meu nome é","Tenho ___ anos","Moro em","Estudo","Trabalho em","Gosto de","Adoro","com minha família","na universidade"],
    checklist:['¿Usaste "Tenho" para la edad (no "Sou")?','¿Los artigos são corretos (o/a/um/uma)?','¿La tilde de "mãe/irmã/irmão" está correcta?','¿Conjugaste o verbo em 1ª pessoa (eu)?'],
  },
  {
    id:2, title:'Minha família', topic:'A família',
    prompt:'Describe tu familia en 4–5 oraciones: al menos 2 miembros, nombres, edades, profesiones y una característica.',
    promptPt:'Descreva sua família: ao menos 2 membros, nomes, idades, profissões e uma característica.',
    model:'Tenho uma família pequena. Meu pai se chama Roberto. Ele é engenheiro e tem cinquenta anos. Minha mãe se chama Lucia. Ela é professora e é muito carinhosa.',
    criteria:['Describe al menos 2 miembros (Meu pai/Minha mãe/Meu irmão/Minha irmã)','Incluye profesión con "ser" (Ele/Ela é + profesión)','Usa "Ele" para hombres y "Ela" para mujeres','Añade un adjetivo de personalidad'],
    vocab:["Meu pai/Minha mãe se chama","Ele/Ela é","Ele/Ela tem ___ anos","Ele/Ela trabalha","muito carinhoso/a/inteligente/alto/a"],
    checklist:['¿Usaste "Ele é" para hombres y "Ela é" para mujeres?','¿La profesión no tiene artigo? (Ele é médico, no "um médico")','¿Los adjetivos concuerdan en género?','¿Usaste "se chama" para el nombre?'],
  },
  {
    id:3, title:'Meu apartamento', topic:'A moradia',
    prompt:'Describe tu casa o apartamento en 4–5 oraciones. Usa "tem" para describir lo que hay.',
    promptPt:'Descreva seu apartamento. Use "tem" para dizer o que há em cada cômodo.',
    model:'Moro num apartamento em Bogotá. O apartamento tem três cômodos: uma sala, uma cozinha e um quarto. Na sala, tem um sofá e uma televisão. Meu quarto é pequeno mas confortável.',
    criteria:['Dice dónde vives (Moro em/num...)','Usa "tem" al menos 2 veces','Menciona al menos 2 habitaciones (sala, cozinha, quarto, banheiro)','Añade un adjetivo descriptivo'],
    vocab:["Moro em/num","O apartamento tem","Na sala/na cozinha/no quarto","um sofá/uma cama/uma mesa/um guarda-roupa","pequeno/grande/confortável/moderno"],
    checklist:['¿Usaste "tem" (hay/tiene) para describir los ambientes?','¿Los artigos son correctos (um para masc., uma para fem.)?','¿La preposición es correcta (na sala / no quarto — em + a = na, em + o = no)?','¿Describiste al menos 2 habitaciones?'],
  },
  {
    id:4, title:'Minha rotina', topic:'A rotina diária',
    prompt:'Escribe 5–6 oraciones sobre tu rutina diaria. Usa expresiones de tiempo (às ___ horas, de manhã, à noite) y verbos en presente.',
    promptPt:'Escreva sobre sua rotina diária. Use expressões de tempo e verbos no presente.',
    model:'Todo dia acordo às sete horas. Tomo banho e como pão com manteiga. Às oito, pego o ônibus para ir à universidade. As aulas começam às nove. À tarde, estudo na biblioteca. À noite, janto com minha família.',
    criteria:['Usa al menos 2 expresiones de tiempo (de manhã, às ___ horas, à tarde, à noite)','La rutina tiene orden lógico (mañana → tarde → noche)','Los verbos están en presente','Menciona al menos 4 actividades'],
    vocab:["Todo dia","Às ___ horas","De manhã/À tarde/À noite","Acordo","Tomo banho","Como/Tomo café","Vou para/Pego o ônibus","Estudo","Janto"],
    checklist:['¿Usaste "às" antes de la hora (às sete horas)?','¿Las actividades siguen un orden lógico?','¿Conectaste con "e" o "depois" (después)?','¿Los verbos están conjugados en 1ª persona (eu)?'],
  },
  {
    id:5, title:'Meus gostos', topic:'Os passatempos',
    prompt:'Escribe 4–5 oraciones sobre tus pasatiempos. Usa "Gosto de / Adoro / Não gosto de" y adverbios de frecuencia (sempre, às vezes, nunca).',
    promptPt:'Escreva sobre suas atividades favoritas usando "gosto de / adoro / não gosto de" + advérbio de frequência.',
    model:'Adoro música brasileira! Toco violão às vezes à noite. Também gosto de assistir futebol com meus amigos. Sempre leio um livro antes de dormir. Não gosto muito de cozinhar.',
    criteria:['Menciona al menos 2 cosas que te gustan','Menciona al menos 1 que no te gusta (Não gosto de...)','Usa al menos un adverbio de frecuencia (sempre/às vezes/nunca)','Usa al menos 3 verbos diferentes'],
    vocab:["Adoro/Gosto de/Não gosto de","Toco","Assisto","Leio","Pratico","sempre/às vezes/nunca/raramente","no fim de semana/à noite"],
    checklist:['¿Usaste "Adoro" para lo que más te gusta y "Gosto" para lo que te gusta?','¿Pusiste "Não gosto de" para la negación?','¿El adverbio de frecuencia está antes o después del verbo?','¿Conectaste con "também" (también) o "mas" (pero)?'],
  },
];

export default function EscrituraPortuguesA1() {
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
          <h2 style={{ margin:'0 0 0.5rem', color:COLOR }}>Texto enviado!</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>Registrado para revisão com David ou Zhanna.</p>
          <div style={{ padding:'1.1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.5rem', textAlign:'left' }}>
            <p style={{ margin:0, fontSize:'0.92rem', color:'var(--ink)', lineHeight:1.75, whiteSpace:'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background:COLOR, borderColor:COLOR }}>Escrever de novo</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Outras tarefas</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>Português A1</Link>
          <span>/</span>
          <button onClick={back} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'0.82rem', padding:0 }}>✍️ Escrita</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>Tarefa {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />Tarefa de escrita {task.id} — {task.topic}</p>
        <h2 style={{ fontSize:'1.7rem', margin:'0 0 1.5rem', fontWeight:700 }}>{task.title}</h2>

        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Consigna (español)</div>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.95rem', color:'var(--ink)', lineHeight:1.6 }}>{task.prompt}</p>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Em português</div>
          <p style={{ margin:0, fontSize:'0.88rem', color:'var(--muted)', fontStyle:'italic', lineHeight:1.6 }}>{task.promptPt}</p>
        </div>

        <button onClick={() => setShowModel(s=>!s)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1rem', fontSize:'0.82rem' }}>
          {showModel?'👁 Esconder modelo':'👁 Ver texto modelo'}
        </button>
        {showModel && (
          <div style={{ padding:'1rem 1.2rem', borderRadius:12, background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.2)', marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'#2563eb', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Texto modelo</div>
            <p style={{ margin:0, fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.7, fontStyle:'italic' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'0.85rem', marginBottom:'1.25rem' }}>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Critérios de avaliação</div>
            {task.criteria.map((c,i)=><p key={i} style={{ margin:'0 0 0.3rem', fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Vocabulário útil — clique</div>
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

        <textarea value={text} onChange={e=>setText(e.target.value)} rows={7} placeholder="Escreva seu texto em português aqui..."
          style={{ width:'100%', padding:'1rem 1.1rem', borderRadius:12, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.7, marginBottom:'0.5rem' }}/>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem', fontSize:'0.78rem', fontFamily:'var(--mono)', color:words<20?'#d97706':'#059669' }}>
          <span>{words} palavras {words<20?'(mínimo recomendado: 25)':'✓'}</span>
        </div>

        <div style={{ padding:'1rem 1.2rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)', marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Lista de verificação antes de enviar</div>
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
          Enviar texto →
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
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇧🇷 Português A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>✍️ Escrita</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Escrita · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Produção escrita A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>5 tarefas guiadas com texto modelo, vocabulário e lista de verificação.</p>
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
