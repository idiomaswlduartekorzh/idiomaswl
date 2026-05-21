'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Data ───────────────────────────────────────────────────────────────── */
interface ExCard {
  ko: string; rom: string; es: string;
  badge: string; badgeColor: string; audio?: string;
  realLifeHint: string;
}
interface QuizItem {
  ko: string; prompt: string; sub?: string;
  options: string[]; correct: string; explanation: string;
  celebration: string; audio?: string;
}

const EXIST_CARDS: ExCard[] = [
  { ko:'여기 있습니다', rom:'yeo-gi it-seum-ni-da', es:'Aquí tiene / Está aquí', badge:'합쇼체', badgeColor:'#f59e0b', audio:'여기 있습니다', realLifeHint:'Lo dijo la barista al entregarte el café. Ahora ya sabes qué verbo usó.' },
  { ko:'화장실이 있어요', rom:'hwa-jang-sil-i i-sseo-yo', es:'Hay baño / El baño está aquí', badge:'해요체', badgeColor:'#6c63ff', realLifeHint:'La frase más útil si necesitas ir al baño en Corea. Memoriza esta.' },
  { ko:'돈이 있어요', rom:'don-i i-sseo-yo', es:'Tengo dinero / Hay dinero', badge:'해요체', badgeColor:'#6c63ff', realLifeHint:'있다 hace el trabajo de "hay", "estar" y "tener". Tres verbos del español, uno en coreano.' },
  { ko:'설탕이 없어요', rom:'seol-tang-i eop-seo-yo', es:'No hay azúcar / No tengo azúcar', badge:'없다 ✗', badgeColor:'#e879f9', realLifeHint:'없다 es el negativo completo: no hay, no está, no tengo. Todo en uno.' },
];

const QUIZ: QuizItem[] = [
  { ko:'화장실이 ___ ?', prompt:'Necesitas ir al baño. ¿Cómo preguntas si hay uno?', sub:'있다 = existencia · 이다 = identidad',
    options:['있어요','이에요','없어요','아니에요'], correct:'있어요',
    explanation:'있어요 pregunta si algo EXISTE. No es 이에요 (eso clasificaría el baño como algo, sin sentido aquí). 있어요 = ¿existe? ¿está aquí?',
    celebration:'✅ ¡Exacto! Acabas de aprender la frase de emergencia más útil en Corea.' },
  { ko:'오늘 우유가 ___ .', prompt:'El café no tiene leche hoy. ¿Cómo lo dice el barista?', sub:'우유 = leche',
    options:['없어요','있어요','아니에요','이에요'], correct:'없어요',
    explanation:'없어요 = no hay / no existe. 아니에요 negaría la identidad ("no ES leche"), no la existencia. El barista dice que la leche no EXISTE hoy.',
    celebration:'💪 ¡Bien! El negativo de 있다 es siempre 없다 — sin excepciones.' },
  { ko:'저는 학생이에요 · 책이 있어요', prompt:'Lee las dos frases. ¿Qué diferencia hay entre 이에요 y 있어요?',
    options:['이에요 = identidad ("soy estudiante") · 있어요 = posesión ("tengo un libro")','Son intercambiables — lo mismo','이에요 = presente · 있어요 = futuro','이에요 para cosas · 있어요 para personas'],
    correct:'이에요 = identidad ("soy estudiante") · 있어요 = posesión ("tengo un libro")',
    explanation:'Estas dos frases juntas muestran la distinción perfecta. 이다 clasifica al sujeto. 있다 dice que algo existe, está, o se tiene.',
    celebration:'🎯 ¡Esa es la distinción más importante de este bloque! Ya la tienes.' },
  { ko:'여기 있습니다', prompt:'La barista dijo esto. ¿Cuál descripción es la más completa?', sub:'여기 = aquí',
    options:['"Aquí tiene" · 합쇼체 formal · 있다 de entrega','"Gracias" · 해요체 · 이다','"¿Qué es esto?" · casual · 있다','"Bienvenido/a" · 합쇼체 · 없다'],
    correct:'"Aquí tiene" · 합쇼체 formal · 있다 de entrega',
    explanation:'여기(aquí) + 있습니다(있다 en nivel formal). La barista usa 합쇼체 porque eres un cliente. Tu café EXISTE en este lugar — eso es 있다.',
    celebration:'⭐ ¡Perfecto! Ya conectas el verbo, el nivel de formalidad y el contexto al mismo tiempo.', audio:'여기 있습니다' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function MicroExplanation003({ onComplete }: Props) {
  const [phase,    setPhase]    = useState<'hook' | 'explain' | 'compare' | 'quiz'>('hook');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [quizIdx,  setQuizIdx]  = useState(0);
  const [picked,   setPicked]   = useState<string | null>(null);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [showFire, setShowFire] = useState(false);
  const [done,     setDone]     = useState(false);

  const quiz = QUIZ[quizIdx];
  const isCorrect = picked === quiz?.correct;

  function pickQuiz(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === quiz.correct) {
      setScore(s => s + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns >= 2) { setShowFire(true); setTimeout(() => setShowFire(false), 2000); }
    } else { setStreak(0); }
  }

  function nextQuiz() {
    setPicked(null);
    if (quizIdx === QUIZ.length - 1) { setDone(true); onComplete?.(); }
    else setQuizIdx(i => i + 1);
  }

  const base: CSSProperties = { fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' };

  const fmtRows = [['합쇼체','있습니다','없습니다','Entrevistas, anuncios'],['해요체','있어요','없어요','Café, tiendas ★'],['casual','있어','없어','Amigos íntimos']];

  /* ── HOOK ─────────────────────────────────────────────── */
  if (phase === 'hook') return (
    <div style={{ ...base, padding:'28px 20px', display:'flex', flexDirection:'column', gap:20 }}>
      <style>{`@keyframes me-pop{from{opacity:0;transform:scale(0.88) translateY(18px)}to{opacity:1;transform:none}} @keyframes me-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}} .me-btn:hover{filter:brightness(1.07);transform:translateY(-1px);transition:all 0.18s ease} @keyframes me-fire{0%{opacity:1;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}100%{opacity:0;transform:scale(0.7)}}`}</style>
      <div style={{ textAlign:'center', animation:'me-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <p style={{ fontSize:52, margin:'0 0 12px' }}>📍</p>
        <h2 style={{ margin:'0 0 8px', fontSize:22, fontWeight:800 }}>있다 / 없다</h2>
        <p style={{ margin:0, fontSize:14, color:'var(--muted-foreground)', lineHeight:1.65, maxWidth:320, marginInline:'auto' }}>
          En español necesitas <strong>tres verbos</strong> para esto: <em>hay · estar · tener</em>. El coreano lo resuelve con <strong>uno solo</strong>. Eso lo hace más fácil — si entiendes cómo funciona.
        </p>
      </div>
      <div style={{ padding:'16px', borderRadius:16, background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.28)', animation:'me-in 0.4s 0.15s ease both' }}>
        <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:700, color:'var(--foreground)' }}>있다 hace todo esto:</p>
        {[['🏪','¿Hay café? → 커피가 있어요?'],['📍','El café está aquí → 커피가 있어요'],['☕','Tengo café → 커피가 있어요']].map(([icon,text])=>(
          <div key={text} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderTop:'1px solid rgba(245,158,11,0.15)' }}>
            <span style={{ fontSize:18 }}>{icon}</span>
            <p style={{ margin:0, fontSize:13, color:'var(--foreground)' }}>{text}</p>
          </div>
        ))}
        <p style={{ margin:'10px 0 0', fontSize:12, color:'#f59e0b', fontWeight:700 }}>Misma frase — tres traducciones al español. El contexto decide cuál.</p>
      </div>
      <div style={{ padding:'14px 16px', borderRadius:14, background:'rgba(232,121,249,0.08)', border:'1px solid rgba(232,121,249,0.25)', animation:'me-in 0.4s 0.25s ease both' }}>
        <p style={{ margin:0, fontSize:13, color:'var(--foreground)', lineHeight:1.6 }}>💜 <strong>없다</strong> es el negativo: no hay · no está · no tengo. Aprende los dos juntos.</p>
      </div>
      <button type="button" className="me-btn" onClick={()=>setPhase('explain')}
        style={{ padding:'15px', borderRadius:14, cursor:'pointer', width:'100%', background:'rgba(245,158,11,0.14)', border:'1px solid rgba(245,158,11,0.4)', fontSize:14, fontWeight:800, color:'#f59e0b', animation:'me-in 0.4s 0.3s ease both' }}>
        Ver los 4 ejemplos del café →
      </button>
    </div>
  );

  /* ── EXPLAIN ──────────────────────────────────────────── */
  if (phase === 'explain') return (
    <div style={{ ...base, padding:'24px 20px', display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <p style={{ margin:0, fontSize:11, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#f59e0b' }}>📖 4 ejemplos reales</p>
        <p style={{ margin:'3px 0 0', fontSize:13, color:'var(--muted-foreground)', lineHeight:1.5 }}>Toca cada frase para ver por qué funciona así.</p>
      </div>

      {EXIST_CARDS.map((c, i) => {
        const open = expanded === i;
        const [r,g,b] = c.badgeColor==='#f59e0b'?[245,158,11]:c.badgeColor==='#6c63ff'?[108,99,255]:[232,121,249];
        return (
          <div key={i} style={{ animation:`me-in 0.35s ${i*0.08}s ease both` }}>
            <button type="button" className="me-btn" onClick={()=>setExpanded(open?null:i)}
              style={{ width:'100%', textAlign:'left', cursor:'pointer', background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, transition:'all 0.2s ease' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <p style={{ margin:0, fontSize:20, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)', lineHeight:1.2 }}>{c.ko}</p>
                  <span style={{ fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:100, background:`rgba(${r},${g},${b},0.12)`, border:`1px solid rgba(${r},${g},${b},0.35)`, color:c.badgeColor, flexShrink:0 }}>{c.badge}</span>
                </div>
                <p style={{ margin:0, fontSize:11, color:'var(--muted-foreground)', fontFamily:'monospace' }}>{c.rom}</p>
                <p style={{ margin:'2px 0 0', fontSize:13, color:'var(--foreground)', fontWeight:500 }}>{c.es}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                {c.audio && <button type="button" onClick={e=>{e.stopPropagation();playAudio(c.audio!);}} style={{ width:32,height:32,borderRadius:'50%',cursor:'pointer',background:`rgba(${r},${g},${b},0.1)`,border:`1px solid rgba(${r},${g},${b},0.3)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>🔊</button>}
                <div style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'var(--muted-foreground)',transition:'transform 0.25s ease',transform:open?'rotate(180deg)':'none' }}>▾</div>
              </div>
            </button>
            {open && (
              <div style={{ margin:'0 4px', padding:'12px 16px', background:`rgba(${r},${g},${b},0.06)`, border:`1px solid rgba(${r},${g},${b},0.2)`, borderTop:'none', borderRadius:'0 0 14px 14px', animation:'me-in 0.25s ease both' }}>
                <p style={{ margin:'0 0 6px', fontSize:12.5, color:'var(--foreground)', lineHeight:1.65 }}>💡 {c.realLifeHint}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Formality table */}
      <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'16px' }}>
        <p style={{ margin:'0 0 12px', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', color:'#f59e0b' }}>Los 3 niveles de있다</p>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>{['Nivel','있다 (+)','없다 (−)','Cuándo'].map(h=><th key={h} style={{ padding:'6px 8px', textAlign:'left', fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'var(--muted-foreground)', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr></thead>
          <tbody>{fmtRows.map(([lvl,pos,neg,ctx],i)=>(
            <tr key={i}>
              <td style={{ padding:'9px 8px', fontSize:12, fontWeight:700, color:'#f59e0b' }}>{lvl}</td>
              <td style={{ padding:'9px 8px', fontSize:14, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{pos}</td>
              <td style={{ padding:'9px 8px', fontSize:14, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{neg}</td>
              <td style={{ padding:'9px 8px', fontSize:11, color:'var(--muted-foreground)' }}>{ctx}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <button type="button" className="me-btn" onClick={()=>setPhase('compare')}
        style={{ padding:'13px', borderRadius:14, width:'100%', cursor:'pointer', background:'rgba(245,158,11,0.14)', border:'1px solid rgba(245,158,11,0.4)', fontSize:13, fontWeight:800, color:'#f59e0b' }}>
        La diferencia clave: 이다 vs 있다 →
      </button>
    </div>
  );

  /* ── COMPARE ──────────────────────────────────────────── */
  if (phase === 'compare') return (
    <div style={{ ...base, padding:'24px 20px', display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <p style={{ margin:0, fontSize:11, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#e879f9' }}>La distinción más importante</p>
        <h2 style={{ margin:'4px 0 4px', fontSize:20, fontWeight:800 }}>이다 vs 있다</h2>
        <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)', lineHeight:1.5 }}>Misma palabra (커피), verbo diferente — significado completamente distinto.</p>
      </div>

      {[{ verb:'이다', ko:'이것은 커피예요', es:'Esto ES café', why:'이다 clasifica e identifica. "Esto pertenece a la categoría café."', color:'#6c63ff' },
        { verb:'있다', ko:'커피가 있어요', es:'HAY café / Tengo café', why:'있다 dice que algo existe o se posee. "El café está disponible / lo tenemos."', color:'#f59e0b' },
      ].map((item,i)=>(
        <div key={i} style={{ background:'var(--card)', border:`1px solid ${item.color}35`, borderRadius:18, padding:'18px', animation:`me-in 0.4s ${i*0.1}s ease both` }}>
          <span style={{ fontSize:11, fontWeight:800, padding:'3px 12px', borderRadius:100, background:`${item.color}15`, border:`1px solid ${item.color}40`, color:item.color, textTransform:'uppercase', letterSpacing:'0.07em' }}>{item.verb}</span>
          <p style={{ margin:'10px 0 3px', fontSize:26, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{item.ko}</p>
          <p style={{ margin:'0 0 10px', fontSize:15, fontWeight:600, color:item.color }}>{item.es}</p>
          <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6 }}>{item.why}</p>
        </div>
      ))}

      <div style={{ padding:'16px', borderRadius:14, background:'rgba(232,121,249,0.08)', border:'1px solid rgba(232,121,249,0.28)' }}>
        <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.07em', color:'#e879f9' }}>🧠 Regla de oro</p>
        <p style={{ margin:0, fontSize:13.5, color:'var(--foreground)', lineHeight:1.65 }}>
          ¿Estás <strong>clasificando</strong> algo? → <strong style={{ color:'#6c63ff' }}>이다</strong> &nbsp;|&nbsp; ¿Estás diciendo que algo <strong>existe / está / tienes</strong>? → <strong style={{ color:'#f59e0b' }}>있다</strong>
        </p>
      </div>

      <button type="button" className="me-btn" onClick={()=>setPhase('quiz')}
        style={{ padding:'13px', borderRadius:14, width:'100%', cursor:'pointer', background:'rgba(232,121,249,0.14)', border:'1px solid rgba(232,121,249,0.4)', fontSize:13, fontWeight:800, color:'#e879f9' }}>
        Poner a prueba lo que aprendí →
      </button>
    </div>
  );

  /* ── QUIZ ──────────────────────────────────────────────── */
  if (!done) return (
    <div style={{ ...base, padding:'24px 20px', display:'flex', flexDirection:'column', gap:18 }}>
      {showFire && <div style={{ position:'fixed', top:'30%', left:'50%', transform:'translate(-50%,-50%)', zIndex:999, fontSize:40, animation:'me-fire 1.8s ease forwards', pointerEvents:'none', textAlign:'center' }}>🔥<br/><span style={{ fontSize:18, fontWeight:800, color:'#f59e0b' }}>¡Racha!</span></div>}

      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ display:'flex', gap:5, flex:1 }}>
          {QUIZ.map((_,i)=><div key={i} style={{ width:i===quizIdx?28:10, height:8, borderRadius:4, background:i<quizIdx?'#22c55e':i===quizIdx?'#f59e0b':'var(--border)', transition:'all 0.3s ease', flex:i===quizIdx?'0 0 28px':'0 0 10px' }} />)}
        </div>
        {streak>=2 && <div style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 10px', borderRadius:100, background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.35)', flexShrink:0 }}><span style={{ fontSize:12 }}>🔥</span><span style={{ fontSize:11, fontWeight:800, color:'#f59e0b' }}>{streak} seguidas</span></div>}
      </div>

      <p style={{ margin:0, fontSize:11, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#f59e0b' }}>Aplica · {quizIdx+1} de {QUIZ.length}</p>

      <div key={quizIdx} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, padding:'22px 18px', animation:'me-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div style={{ padding:'14px', borderRadius:12, marginBottom:14, textAlign:'center', background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.28)' }}>
          <p style={{ margin:0, fontSize:26, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{quiz.ko}</p>
          {quiz.audio && <button type="button" onClick={()=>playAudio(quiz.audio!)} style={{ marginTop:8, padding:'5px 14px', borderRadius:100, cursor:'pointer', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.35)', fontSize:11, fontWeight:600, color:'#f59e0b', display:'inline-flex', alignItems:'center', gap:5 }}>🔊 Escuchar</button>}
        </div>
        <p style={{ margin:'0 0 4px', fontSize:15.5, fontWeight:700, color:'var(--foreground)', lineHeight:1.4 }}>{quiz.prompt}</p>
        {quiz.sub && <p style={{ margin:'0 0 16px', fontSize:12.5, color:'var(--muted-foreground)' }}>{quiz.sub}</p>}
        {!quiz.sub && <div style={{ height:14 }} />}

        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {quiz.options.map(opt=>{
            const state=!picked?'idle':opt===quiz.correct?(picked===opt?'correct':'reveal'):opt===picked?'wrong':'idle';
            return <button key={opt} type="button" disabled={!!picked} onClick={()=>pickQuiz(opt)} style={{ textAlign:'left', padding:'12px 16px', borderRadius:12, fontSize:13, fontWeight:500, lineHeight:1.5, cursor:picked?'default':'pointer', background:state==='correct'?'rgba(34,197,94,0.12)':state==='wrong'?'rgba(239,68,68,0.09)':state==='reveal'?'rgba(34,197,94,0.06)':'var(--secondary)', border:state==='correct'?'1px solid rgba(34,197,94,0.5)':state==='wrong'?'1px solid rgba(239,68,68,0.45)':state==='reveal'?'1px solid rgba(34,197,94,0.3)':'1px solid var(--border)', color:state==='correct'?'#16a34a':state==='wrong'?'#dc2626':state==='reveal'?'#15803d':'var(--foreground)', display:'flex', alignItems:'flex-start', gap:10, transition:'all 0.18s ease' }}>
              <span style={{ width:20,height:20,borderRadius:'50%',flexShrink:0,marginTop:1,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800, background:state==='correct'?'rgba(34,197,94,0.25)':state==='wrong'?'rgba(239,68,68,0.2)':state==='reveal'?'rgba(34,197,94,0.15)':'var(--border)', color:state==='correct'?'#16a34a':state==='wrong'?'#dc2626':state==='reveal'?'#15803d':'var(--muted-foreground)' }}>{state==='correct'?'✓':state==='wrong'?'✕':state==='reveal'?'✓':''}</span>
              {opt}
            </button>;
          })}
        </div>

        {picked && (
          <div style={{ marginTop:14, padding:'14px 16px', borderRadius:12, animation:'me-in 0.3s ease both', background:isCorrect?'rgba(34,197,94,0.08)':'rgba(245,158,11,0.08)', border:`1px solid ${isCorrect?'rgba(34,197,94,0.3)':'rgba(245,158,11,0.3)'}` }}>
            {isCorrect && <p style={{ margin:'0 0 4px', fontSize:13, fontWeight:800, color:'#22c55e' }}>{quiz.celebration}</p>}
            {!isCorrect && <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em', color:'#f59e0b' }}>→ Respuesta: {quiz.correct}</p>}
            <p style={{ margin:0, fontSize:12.5, color:'var(--foreground)', lineHeight:1.65 }}>{quiz.explanation}</p>
          </div>
        )}
      </div>

      {picked && <button type="button" className="me-btn" onClick={nextQuiz} style={{ padding:'13px', borderRadius:14, width:'100%', cursor:'pointer', background:'rgba(245,158,11,0.14)', border:'1px solid rgba(245,158,11,0.4)', fontSize:13, fontWeight:800, color:'#f59e0b' }}>{quizIdx===QUIZ.length-1?'✓ Lo tengo claro → Siguiente etapa':'Siguiente →'}</button>}
    </div>
  );

  /* ── DONE ─────────────────────────────────────────────── */
  return (
    <div style={{ ...base, padding:'28px 20px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <p style={{ fontSize:52, margin:0 }}>📖</p>
      <h3 style={{ margin:0, fontSize:22, fontWeight:800 }}>{score===QUIZ.length?'¡Distinción dominada!':'Buen trabajo'}</h3>
      <div style={{ padding:'10px 20px', borderRadius:100, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)' }}>
        <span style={{ fontSize:13, fontWeight:800, color:'#22c55e' }}>{score}/{QUIZ.length} correctas</span>
      </div>
      <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)', maxWidth:300, lineHeight:1.65 }}>이다 = identidad · 있다 = existencia/posesión. Dos verbos que nunca más confundirás.</p>
      <div style={{ display:'flex', gap:10 }}>
        {[['이에요/예요','이다','#6c63ff'],['있어요','있다','#f59e0b'],['없어요','없다','#e879f9']].map(([form,verb,c])=>(
          <div key={form} style={{ padding:'12px 14px', borderRadius:14, background:`${c}10`, border:`1px solid ${c}28`, textAlign:'center' }}>
            <p style={{ margin:'0 0 4px', fontSize:17, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:c }}>{form}</p>
            <p style={{ margin:0, fontSize:10, fontWeight:700, color:'var(--muted-foreground)', textTransform:'uppercase' }}>{verb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
