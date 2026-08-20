'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface ReviewCard {
  id: string;
  skills: string[];       // which skills this integrates
  skillColors: string[];
  ko?: string;
  front: string;          // what the student sees
  frontSub?: string;
  options: string[];
  correct: string;
  back: string;           // explanation shown after
  audio?: string;
}

/* ─── Cards — each requires 2+ integrated skills ─────────────────────────── */
const ALL_CARDS: ReviewCard[] = [
  {
    id: 'sr1',
    skills: ['SOV', '주세요'],
    skillColors: ['#e879f9', '#22c55e'],
    ko: '아메리카노 미디엄 주세요',
    front: '¿Qué regla del Step001 explica por qué 주세요 va al final?',
    options: [
      'SOV — en coreano el verbo siempre cierra la frase',
      '주세요 es la palabra más importante, por eso va al final',
      'Es una excepción del coreano de pedidos',
      'El japonés también lo hace así, es un préstamo',
    ],
    correct: 'SOV — en coreano el verbo siempre cierra la frase',
    back: '저는 학교에 가요 (Step001) y 아메리카노 미디엄 주세요 (Step003) usan el mismo ADN: S+O+V. El verbo siempre cierra. Reconocer SOV en el café refuerza lo del Step001.',
    audio: '아메리카노 한 잔 주세요',
  },
  {
    id: 'sr2',
    skills: ['Hangul', '이다'],
    skillColors: ['#22c55e', '#6c63ff'],
    ko: '저는 의사예요',
    front: 'Para elegir 예요 correcto, primero debes leer 의사. ¿Qué habilidad del Step002 usas?',
    frontSub: '의사 = médico/a',
    options: [
      'Leer el bloque final de hangul: 사 termina en vocal (ㅏ) → 예요',
      'Contar las sílabas totales de la palabra',
      'Identificar si la palabra es un sustantivo o verbo',
      'Mirar si la palabra tiene consonante doble (ㄲ, ㅆ)',
    ],
    correct: 'Leer el bloque final de hangul: 사 termina en vocal (ㅏ) → 예요',
    back: 'Integración real: Step002 (leer hangul → detectar vocal/consonante final) + Step003 (regla 이다: vocal→예요, consonante→이에요). Sin leer hangul, no puedes aplicar la regla de 이다.',
  },
  {
    id: 'sr3',
    skills: ['있다', 'SOV'],
    skillColors: ['#f59e0b', '#e879f9'],
    ko: '화장실이 어디 있어요?',
    front: 'Esta frase integra 있다 (Step003) y SOV (Step001). ¿Cuál análisis es correcto?',
    options: [
      '화장실이(S) + 어디(O/ubicación) + 있어요(V) = SOV · 있다 = existencia/ubicación',
      '있어요 es el sujeto · 화장실이 es el verbo · SOV no aplica en preguntas',
      '어디 es el verbo · 있어요 es el modificador',
      'Las preguntas en coreano tienen orden inverso (OVS)',
    ],
    correct: '화장실이(S) + 어디(O/ubicación) + 있어요(V) = SOV · 있다 = existencia/ubicación',
    back: 'El orden SOV no cambia en preguntas — a diferencia del español/inglés que invierte el orden, el coreano mantiene S+O+V y solo agrega entonación ascendente. 있어요 = existencia/ubicación.',
  },
  {
    id: 'sr4',
    skills: ['Hangul', 'Vocabulario'],
    skillColors: ['#22c55e', '#06b6d4'],
    ko: '감사합니다',
    front: '¿Cuántas sílabas tiene esta palabra? ¿Y cuándo la usas en el café?',
    frontSub: 'Usa tu habilidad de lectura hangul del Step002',
    options: [
      '5 sílabas (감-사-합-니-다) · Al recibir el café cuando la barista dice 여기 있습니다',
      '4 sílabas (감-사-합-니) · Al saludar al entrar',
      '5 sílabas · Al pedir el tamaño',
      '3 sílabas (감-사-합) · Al dar tu nombre',
    ],
    correct: '5 sílabas (감-사-합-니-다) · Al recibir el café cuando la barista dice 여기 있습니다',
    back: 'Cada bloque hangul = 1 sílaba: 감(gam)+사(sa)+합(hap)+니(ni)+다(da) = 5. La habilidad de contar bloques hangul del Step002 te permite verificar pronunciación sin romanización. En el café: siempre después de 여기 있습니다.',
    audio: '감사합니다',
  },
  {
    id: 'sr5',
    skills: ['이다', 'Formalidad'],
    skillColors: ['#6c63ff', '#e879f9'],
    front: 'En una entrevista de trabajo en Seúl te presentas: "Soy diseñador/a". 디자이너 termina en vocal.',
    frontSub: '¿Qué forma usas? (combinando regla de 이다 + nivel de formalidad)',
    options: [
      '저는 디자이너입니다 (합쇼체, vocal pero nivel formal de entrevista)',
      '저는 디자이너예요 (해요체 — demasiado casual para entrevista)',
      '저는 디자이너이에요 (error de regla — vocal no necesita 이)',
      '저는 디자이너야 (casual — completamente inapropiado)',
    ],
    correct: '저는 디자이너입니다 (합쇼체, vocal pero nivel formal de entrevista)',
    back: '입니다 funciona con CUALQUIER final (no depende de vocal/consonante). En entrevista siempre 합쇼체. La regla vocal/consonante solo importa entre 이에요 y 예요 — 입니다 es invariable.',
  },
  {
    id: 'sr6',
    skills: ['이다', '있다'],
    skillColors: ['#6c63ff', '#f59e0b'],
    ko: '이것은 커피예요 · 커피가 있어요',
    front: 'Dos frases con 커피. ¿Cuál diferencia fundamental expresan?',
    options: [
      '이다 = identidad ("esto ES café") · 있다 = existencia ("hay/tenemos café")',
      'Son intercambiables — ambas dicen lo mismo',
      '이다 = presente · 있다 = futuro',
      '이다 para cosas inanimadas · 있다 para personas',
    ],
    correct: '이다 = identidad ("esto ES café") · 있다 = existencia ("hay/tenemos café")',
    back: 'La confusión más común del español-hablante. En español "estar" y "ser" ya son distintos, pero aquí el coreano separa identidad (이다) de existencia (있다). Memoriza las dos frases juntas: son el ejemplo perfecto.',
  },
  {
    id: 'sr7',
    skills: ['SOV', 'Hangul', '주세요'],
    skillColors: ['#e879f9', '#22c55e', '#06b6d4'],
    ko: '저는 대학교에 가요',
    front: 'Frase del Step001. Integra 3 habilidades: lee hangul + analiza SOV + conecta con el café.',
    frontSub: '¿Cuántas sílabas tiene 대학교? ¿Qué rol tiene en SOV? ¿Cómo aplica en el café?',
    options: [
      '대학교 = 3 síl. (대-학-교) · es el objeto/lugar (O en SOV) · el café usa el mismo orden con 아메리카노',
      '대학교 = 4 síl. · es el sujeto · no aplica en el café',
      '대학교 = 3 síl. · es el verbo · 주세요 también es verbo',
      '대학교 = 2 síl. · es el objeto · el café invierte el orden',
    ],
    correct: '대학교 = 3 síl. (대-학-교) · es el objeto/lugar (O en SOV) · el café usa el mismo orden con 아메리카노',
    back: 'Tres habilidades en una: Step002 (contar bloques = 3 sílabas) + Step001 (대학교 es el destino/O en SOV) + Step003 (아메리카노 ocupa la misma posición O en 아메리카노 주세요). El SOV es universal.',
  },
  {
    id: 'sr8',
    skills: ['있다', 'Vocabulario'],
    skillColors: ['#f59e0b', '#06b6d4'],
    front: '쁠랑 우유 있어요? — Llegas al café. Quieres preguntar si tienen leche de planta.',
    frontSub: '¿Qué hace 있어요 en esta frase? ¿Qué del Step003 aprendiste para construirla?',
    options: [
      'Pregunta por existencia (있다) + [sustantivo] + 있어요 = patrón universal de "¿hay X?"',
      'Pides la leche de planta con 있어요 como verbo de pedido',
      'Confirmas que tienes leche de planta',
      '있어요 aquí es un saludo especial del café',
    ],
    correct: 'Pregunta por existencia (있다) + [sustantivo] + 있어요 = patrón universal de "¿hay X?"',
    back: '[sustantivo] + 있어요? = "¿hay [sustantivo]?" — el patrón más útil para pedir en cualquier tienda. Aplicable a menú, Wi-Fi (와이파이 있어요?), cargador (충전기 있어요?). Generalizable infinitamente.',
  },
];

const TOTAL_CARDS = ALL_CARDS.length;
const XP_CORRECT = 10;
const XP_WRONG = 5;
const MAX_XP = TOTAL_CARDS * XP_CORRECT;

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function SmartReview003({ onComplete }: Props) {
  const [queue, setQueue]       = useState<ReviewCard[]>(() => shuffleArr([...ALL_CARDS]));
  const [idx,   setIdx]         = useState(0);
  const [picked, setPicked]     = useState<string | null>(null);
  const [wrong,  setWrong]      = useState<string[]>([]);
  const [round,  setRound]      = useState(1);
  const [total,  setTotal]      = useState(0);
  const [right,  setRight]      = useState(0);
  const [done,   setDone]       = useState(false);
  // Gamification state
  const [xp,         setXp]         = useState(0);
  const [streak,     setStreak]     = useState(0);
  const [xpFloat,    setXpFloat]    = useState<{ val: number; key: number } | null>(null);
  const [burstVisible, setBurstVisible] = useState(false);

  const card = queue[idx];
  const isCorrect = picked === card?.correct;

  function shuffleArr<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    setTotal(t => t + 1);
    const correct = opt === card.correct;

    if (correct) {
      setRight(r => r + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setXp(x => Math.min(x + XP_CORRECT, MAX_XP));
      setXpFloat({ val: XP_CORRECT, key: Date.now() });
      if (newStreak >= 3) {
        setBurstVisible(true);
        setTimeout(() => setBurstVisible(false), 1800);
      }
    } else {
      setStreak(0);
      setWrong(w => [...w, card.id]);
      setXp(x => Math.min(x + XP_WRONG, MAX_XP));
      setXpFloat({ val: XP_WRONG, key: Date.now() });
    }
    if (card.audio && correct) setTimeout(() => playAudio(card.audio!), 280);
  }

  function next() {
    setPicked(null);
    setXpFloat(null);
    if (idx < queue.length - 1) {
      setIdx(i => i + 1);
    } else {
      if (wrong.length > 0 && round < 2) {
        const missedCards = ALL_CARDS.filter(c => wrong.includes(c.id));
        setQueue(shuffleArr([...missedCards]));
        setIdx(0);
        setRound(2);
        setWrong([]);
        setStreak(0);
      } else {
        setDone(true);
        onComplete?.();
      }
    }
  }

  const pct = total > 0 ? Math.round(right / total * 100) : 0;
  const xpPct = MAX_XP > 0 ? Math.min(Math.round(xp / MAX_XP * 100), 100) : 0;

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  /* ── Done screen ───────────────────────────────────── */
  if (done) {
    const timeEst = Math.round(TOTAL_CARDS * 25 / 60);
    let headline: string;
    let motiveLine: string;
    if (pct >= 90) {
      headline = '🧠 Integración dominada';
      motiveLine = 'Los 3 steps funcionan como un sistema en tu mente. Estás listo para conversar.';
    } else if (pct >= 70) {
      headline = '💪 Buen trabajo';
      motiveLine = 'Las conexiones entre steps se están consolidando. Repasa los puntos flojos y vuelve.';
    } else {
      headline = '🎯 Sigue practicando';
      motiveLine = 'La integración lleva tiempo. Vuelve a las etapas anteriores si es necesario — es parte del proceso.';
    }

    return (
      <div style={{ ...base, padding:'28px 20px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:18 }}>
        <style>{`@keyframes sr-in{from{opacity:0;transform:translateY(12px) scale(0.97)}to{opacity:1;transform:none}}`}</style>
        <h3 style={{ margin:0, fontSize:22, fontWeight:800 }}>{headline}</h3>
        <p style={{ margin:'0', fontSize:14, color:'var(--muted-foreground)', maxWidth:300, lineHeight:1.65 }}>{motiveLine}</p>

        <div style={{ padding:'14px 24px', borderRadius:14, background: pct>=80?'rgba(34,197,94,0.1)':'rgba(245,158,11,0.1)', border:`1px solid ${pct>=80?'rgba(34,197,94,0.3)':'rgba(245,158,11,0.3)'}` }}>
          <p style={{ margin:0, fontSize:32, fontWeight:800, color: pct>=80?'#22c55e':'#f59e0b' }}>{pct}%</p>
          <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)' }}>{right}/{total} correctas</p>
        </div>

        {/* XP earned */}
        <div style={{ padding:'10px 20px', borderRadius:12, background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:18 }}>⚡</span>
          <span style={{ fontSize:14, fontWeight:700, color:'#22c55e' }}>{xp} XP ganados</span>
        </div>

        {/* Time estimate */}
        <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)' }}>
          Tiempo bien invertido: ~{timeEst} min
        </p>

        {/* Skills summary */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, width:'100%', maxWidth:320 }}>
          {[['SOV','#e879f9','Step001'],['Hangul','#22c55e','Step002'],['이다','#6c63ff','Step003'],['있다','#f59e0b','Step003']].map(([s,c,st]) => (
            <div key={s} style={{ padding:'10px', borderRadius:12, background:`${c}10`, border:`1px solid ${c}28`, textAlign:'center' }}>
              <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:800, color:c }}>{s}</p>
              <p style={{ margin:0, fontSize:10, color:'var(--muted-foreground)', fontWeight:600 }}>{st}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Active card ───────────────────────────────────── */
  return (
    <div style={{ ...base, padding:'24px 20px', display:'flex', flexDirection:'column', gap:18, position:'relative' }}>
      <style>{`
        @keyframes sr-in{from{opacity:0;transform:translateY(12px) scale(0.97)}to{opacity:1;transform:none}}
        @keyframes xp-float{0%{opacity:0;transform:translateY(0)}20%{opacity:1}80%{opacity:1}100%{opacity:0;transform:translateY(-32px)}}
        @keyframes burst-in{0%{opacity:0;transform:translate(-50%,-50%) scale(0.6)}20%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}80%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(0.9)}}
      `}</style>

      {/* Streak burst overlay */}
      {burstVisible && (
        <div style={{ position:'fixed', top:'50%', left:'50%', zIndex:9999, pointerEvents:'none',
          animation:'burst-in 1.8s ease forwards',
          background:'rgba(234,179,8,0.95)', borderRadius:20, padding:'16px 28px',
          boxShadow:'0 8px 40px rgba(234,179,8,0.4)', textAlign:'center' }}>
          <p style={{ margin:0, fontSize:22, fontWeight:900, color:'#fff' }}>¡En racha! 🔥</p>
          <p style={{ margin:'2px 0 0', fontSize:13, color:'rgba(255,255,255,0.85)', fontWeight:600 }}>{streak} respuestas seguidas</p>
        </div>
      )}

      {/* XP bar */}
      <div style={{ position:'relative' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
          <span style={{ fontSize:11, fontWeight:800, color:'var(--muted-foreground)', letterSpacing:'0.05em', textTransform:'uppercase' }}>XP</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {/* Streak indicator */}
            {streak > 0 && (
              <span style={{ fontSize:11, fontWeight:700, color:'#f59e0b' }}>🔥 {streak} seguidas</span>
            )}
            <span style={{ fontSize:11, fontWeight:700, color:'#22c55e' }}>{xp} / {MAX_XP}</span>
            {/* Floating XP delta */}
            {xpFloat && (
              <span key={xpFloat.key} style={{
                position:'absolute', right:0, top:-22, fontSize:13, fontWeight:800,
                color: xpFloat.val === XP_CORRECT ? '#22c55e' : '#f59e0b',
                animation:'xp-float 1.4s ease forwards', pointerEvents:'none',
              }}>+{xpFloat.val}</span>
            )}
          </div>
        </div>
        <div style={{ height:6, borderRadius:3, background:'var(--border)', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${xpPct}%`, background:'linear-gradient(90deg,#22c55e,#16a34a)', borderRadius:3, transition:'width 0.5s cubic-bezier(0.34,1.56,0.64,1)' }} />
        </div>
      </div>

      {/* Round 2 banner */}
      {round === 2 && (
        <div style={{ padding:'9px 14px', borderRadius:12, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', textAlign:'center', animation:'sr-in 0.4s ease both' }}>
          <span style={{ fontSize:12, fontWeight:700, color:'var(--wl-on-panel-alert, #ef4444)' }}>🔁 Segunda oportunidad — solo los que fallaste</span>
        </div>
      )}

      {/* Progress bar + card counter */}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, height:4, borderRadius:2, background:'var(--border)', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${((idx)/queue.length)*100}%`, background:'linear-gradient(90deg,#6c63ff,#e879f9)', borderRadius:2, transition:'width 0.4s ease' }} />
        </div>
        <span style={{ fontSize:11, fontWeight:700, color:'var(--muted-foreground)', minWidth:80, textAlign:'right' }}>
          Tarjeta {idx + 1} de {queue.length}
        </span>
      </div>

      {/* Card */}
      <div key={card.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, padding:'22px 20px', animation:'sr-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>

        {/* Skill badges + skill count chip */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14, alignItems:'center' }}>
          {card.skills.map((s, i) => (
            <span key={s} style={{ fontSize:10, fontWeight:800, padding:'2px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.06em',
              background:`${card.skillColors[i]}12`, border:`1px solid ${card.skillColors[i]}35`, color:card.skillColors[i] }}>
              {s}
            </span>
          ))}
          <span style={{ fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:100,
            background:'rgba(108,99,255,0.08)', border:'1px solid rgba(108,99,255,0.22)', color:'var(--wl-on-panel-link, #6c63ff)', whiteSpace:'nowrap' }}>
            integra {card.skills.length} habilidades
          </span>
        </div>

        {/* Korean display */}
        {card.ko && (
          <div style={{ padding:'14px 16px', borderRadius:14, marginBottom:14, textAlign:'center',
            background:'rgba(108,99,255,0.07)', border:'1px solid rgba(108,99,255,0.22)' }}>
            <p style={{ margin:0, fontSize: card.ko.length > 20 ? 18 : 24, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)', lineHeight:1.3 }}>
              {card.ko}
            </p>
            {card.audio && (
              <button type="button" onClick={() => playAudio(card.audio!)}
                style={{ marginTop:8, padding:'4px 12px', borderRadius:100, cursor:'pointer',
                  background:'rgba(108,99,255,0.1)', border:'1px solid rgba(108,99,255,0.3)',
                  fontSize:11, fontWeight:600, color:'var(--wl-on-panel-link, #6c63ff)', display:'inline-flex', alignItems:'center', gap:5 }}>
                🔊 Escuchar
              </button>
            )}
          </div>
        )}

        {/* Front */}
        <p style={{ margin:'0 0 5px', fontSize:15, fontWeight:700, color:'var(--foreground)', lineHeight:1.45 }}>{card.front}</p>
        {card.frontSub && <p style={{ margin:'0 0 16px', fontSize:12.5, color:'var(--muted-foreground)', lineHeight:1.5 }}>{card.frontSub}</p>}
        {!card.frontSub && <div style={{ height:14 }} />}

        {/* Options */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {card.options.map(opt => {
            const state = !picked ? 'idle' : opt === card.correct ? (picked === opt ? 'correct' : 'reveal') : opt === picked ? 'wrong' : 'idle';
            return (
              <button key={opt} type="button" disabled={!!picked} onClick={() => pick(opt)}
                style={{
                  textAlign:'left', padding:'12px 14px', borderRadius:12, fontSize:13, fontWeight:500, lineHeight:1.5, cursor:picked?'default':'pointer',
                  background: state==='correct'?'rgba(34,197,94,0.12)':state==='wrong'?'rgba(239,68,68,0.09)':state==='reveal'?'rgba(34,197,94,0.06)':'var(--secondary)',
                  border: state==='correct'?'1px solid rgba(34,197,94,0.5)':state==='wrong'?'1px solid rgba(239,68,68,0.45)':state==='reveal'?'1px solid rgba(34,197,94,0.3)':'1px solid var(--border)',
                  color: state==='correct'?'#16a34a':state==='wrong'?'#dc2626':state==='reveal'?'#15803d':'var(--foreground)',
                  display:'flex', alignItems:'flex-start', gap:10, transition:'all 0.18s ease',
                }}>
                <span style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800,
                  background: state==='correct'?'rgba(34,197,94,0.25)':state==='wrong'?'rgba(239,68,68,0.2)':state==='reveal'?'rgba(34,197,94,0.15)':'var(--border)',
                  color: state==='correct'?'#16a34a':state==='wrong'?'#dc2626':state==='reveal'?'#15803d':'var(--muted-foreground)',
                }}>{state==='correct'?'✓':state==='wrong'?'✕':state==='reveal'?'✓':''}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {picked && (
          <div style={{ marginTop:14, padding:'13px 15px', borderRadius:12,
            background: isCorrect?'rgba(34,197,94,0.08)':'rgba(245,158,11,0.08)',
            border:`1px solid ${isCorrect?'rgba(34,197,94,0.3)':'rgba(245,158,11,0.3)'}`,
            animation:'sr-in 0.3s ease both' }}>
            <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:800, letterSpacing:'0.06em', textTransform:'uppercase',
              color:isCorrect?'#22c55e':'#f59e0b' }}>
              {isCorrect ? '✓ Integración correcta' : `→ Respuesta: ${card.correct}`}
            </p>
            <p style={{ margin:0, fontSize:12.5, color:'var(--foreground)', lineHeight:1.65 }}>
              {isCorrect ? `🧠 ¡Conexión hecha! ${card.back}` : card.back}
            </p>
            {!isCorrect && (
              <p style={{ margin:'8px 0 0', fontSize:11, color:'var(--muted-foreground)', fontStyle:'italic' }}>
                Esta tarjeta volverá al final — sin presión.
              </p>
            )}
          </div>
        )}
      </div>

      {picked && (
        <button type="button" onClick={next}
          style={{ padding:'13px', borderRadius:14, width:'100%', cursor:'pointer',
            background:'rgba(108,99,255,0.14)', border:'1px solid rgba(108,99,255,0.4)',
            fontSize:13, fontWeight:700, color:'var(--wl-on-panel-link, #6c63ff)', transition:'all 0.18s ease' }}>
          {idx < queue.length - 1 || (wrong.length > 0 && round < 2)
            ? 'Siguiente tarjeta →'
            : '🧠 Ver resultados finales'}
        </button>
      )}
    </div>
  );
}
