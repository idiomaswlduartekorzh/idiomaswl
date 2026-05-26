'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }
type Phase = 'demo' | 'p1_numbers' | 'p2_contraction' | 'p3_counters' | 'done';

const BLUE   = '#6c63ff';
const PURPLE = '#8b5cf6';
const GREEN  = '#22c55e';
const AMBER  = '#f59e0b';

const NUMBERS = [
  { native: '하나', contracted: '한', sino: '일', rom: 'ha-na / han', audio: '하나' },
  { native: '둘',  contracted: '두', sino: '이', rom: 'dul / du',   audio: '둘' },
  { native: '셋',  contracted: '세', sino: '삼', rom: 'set / se',   audio: '셋' },
  { native: '넷',  contracted: '네', sino: '사', rom: 'net / ne',   audio: '넷' },
  { native: '다섯', contracted: '다섯', sino: '오', rom: 'da-seot',  audio: '다섯' },
];

interface CounterQ { sentence: string; audio: string; answer: 'jan' | 'gae'; explanation: string }
const COUNTER_QUESTIONS: CounterQ[] = [
  { sentence: '아메리카노 한 ___ 주세요', audio: '한 잔', answer: 'jan', explanation: '아메리카노 es una bebida → usa 잔 (jan)' },
  { sentence: '호떡 한 ___ 주세요', audio: '호떡 하나 주세요', answer: 'gae', explanation: '호떡 es un objeto sólido → usa 개 (gae)' },
  { sentence: '주스 두 ___ 주세요', audio: '둘', answer: 'jan', explanation: '주스 (jugo) es bebida → 잔' },
  { sentence: '케이크 세 ___ 주세요', audio: '셋', answer: 'gae', explanation: '케이크 (pastel) es sólido → 개' },
];

export default function GuidedDiscovery004({ onComplete }: Props) {
  const [phase,        setPhase]        = useState<Phase>('demo');
  const [numIdx,       setNumIdx]       = useState(0);
  const [counterIdx,   setCounterIdx]   = useState(0);
  const [counterPick,  setCounterPick]  = useState<'jan' | 'gae' | null>(null);
  const [counterScore, setCounterScore] = useState(0);

  const base: CSSProperties = { fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' };

  function handleCounter(pick: 'jan' | 'gae') {
    if (counterPick) return;
    setCounterPick(pick);
    if (pick === COUNTER_QUESTIONS[counterIdx].answer) setCounterScore(s => s + 1);
    playAudio(COUNTER_QUESTIONS[counterIdx].audio);
  }
  function nextCounter() {
    const next = counterIdx + 1;
    if (next >= COUNTER_QUESTIONS.length) setPhase('done');
    else { setCounterIdx(next); setCounterPick(null); }
  }

  return (
    <section style={{ ...base, maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 06 DE 11 · Descubre el patrón
      </p>

      {/* Phase tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {(['demo','p1_numbers','p2_contraction','p3_counters'] as Phase[]).map((p, i) => (
          <div key={p} style={{ flex: 1, height: 4, borderRadius: 2, background: phase === p || (p === 'demo' && phase === 'demo') ? BLUE : ['demo','p1_numbers','p2_contraction','p3_counters'].indexOf(phase) > i ? GREEN : 'var(--line-soft)' }} />
        ))}
      </div>

      {/* PHASE: demo — demonstratives */}
      {phase === 'demo' && (
        <div>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>이거 / 그거 / 저거 — La distancia importa</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
            El coreano usa pronombres diferentes según la distancia al hablante. El mismo objeto recibe diferentes nombres dependiendo de quién habla.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[
              { kr:'이거', rom:'i-geo', es:'esto', sub:'cerca del hablante', color: BLUE, example:'이거 뭐예요? ¿Qué es esto?' },
              { kr:'그거', rom:'geu-geo', es:'eso', sub:'lejos del hablante', color: PURPLE, example:'그거는 호떡이에요. Eso es hodduk.' },
              { kr:'저거', rom:'jeo-geo', es:'aquello', sub:'lejos de ambos', color: AMBER, example:'저거는 뭐예요? ¿Qué es aquello?' },
            ].map(d => (
              <button key={d.kr} onClick={() => playAudio(d.kr)}
                style={{ background: `${d.color}12`, border: `2px solid ${d.color}55`, borderRadius: 12, padding: '14px 10px', cursor: 'pointer', textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 700, fontFamily: "'Noto Sans KR',sans-serif", color: d.color }}>{d.kr}</p>
                <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--muted)', fontFamily:'var(--mono)' }}>{d.rom}</p>
                <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600 }}>{d.es}</p>
                <p style={{ margin: 0, fontSize: 10, color: 'var(--muted)' }}>{d.sub}</p>
              </button>
            ))}
          </div>
          <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700 }}>Del video:</p>
            <p style={{ margin: '0 0 4px', fontSize: 14, fontFamily:"'Noto Sans KR',sans-serif" }}>
              Cliente: <strong>이거</strong> 뭐예요? → David: <strong>그거</strong>는 호떡이에요
            </p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>Mismo hodduk → pronombres diferentes según la perspectiva</p>
          </div>
          <button onClick={() => setPhase('p1_numbers')} style={{ width: '100%', background: BLUE, color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Siguiente: Números nativos →
          </button>
        </div>
      )}

      {/* PHASE: p1_numbers */}
      {phase === 'p1_numbers' && (
        <div>
          <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>Los dos sistemas numéricos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div style={{ background:`${PURPLE}12`, border:`1px solid ${PURPLE}33`, borderRadius: 12, padding: '12px' }}>
              <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:700, color:PURPLE }}>순우리말 (NATIVOS)</p>
              <p style={{ margin:'0 0 4px', fontSize:11, color:'var(--muted)' }}>objetos físicos · personas · edad</p>
              {NUMBERS.map(n => (
                <button key={n.native} onClick={() => playAudio(n.audio)} style={{ display:'block', width:'100%', background:'none', border:'none', padding:'3px 0', cursor:'pointer', textAlign:'left', fontSize:16, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:600 }}>
                  {n.native} <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>({n.rom.split('/')[0].trim()})</span>
                </button>
              ))}
            </div>
            <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px' }}>
              <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:700, color:'#ef4444' }}>한자어 (SINO-COREANOS)</p>
              <p style={{ margin:'0 0 4px', fontSize:11, color:'var(--muted)' }}>dinero · fechas · pisos · min</p>
              {NUMBERS.map(n => (
                <div key={n.sino} style={{ display:'block', padding:'3px 0', fontSize:16, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:600, color:'var(--muted)' }}>
                  {n.sino}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16 }}>
            <p style={{ margin:0, fontSize:13 }}>💡 <strong>Del video:</strong> "호떡 <strong>하나</strong> 주세요" — el hodduk es un objeto físico → número nativo 하나</p>
          </div>
          <button onClick={() => setPhase('p2_contraction')} style={{ width:'100%', background:BLUE, color:'#fff', border:'none', borderRadius:10, padding:'13px', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            Siguiente: La contracción →
          </button>
        </div>
      )}

      {/* PHASE: p2_contraction */}
      {phase === 'p2_contraction' && (
        <div>
          <h3 style={{ margin:'0 0 6px', fontSize:16, fontWeight:700 }}>La contracción — 하나→한 antes de contadores</h3>
          <p style={{ margin:'0 0 16px', fontSize:13, color:'var(--muted)', lineHeight:1.5 }}>
            Cuando el número va justo antes de un contador, los primeros 4 se contraen:
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginBottom:20 }}>
            {NUMBERS.map(n => (
              <button key={n.native} onClick={() => { playAudio(n.audio); setNumIdx(NUMBERS.indexOf(n)); }}
                style={{ background: numIdx === NUMBERS.indexOf(n) ? `${PURPLE}18` : 'var(--bg-2,#f5f5f7)', border: numIdx === NUMBERS.indexOf(n) ? `2px solid ${PURPLE}` : '1px solid var(--line-soft)', borderRadius:10, padding:'10px 6px', cursor:'pointer', textAlign:'center' }}>
                <p style={{ margin:'0 0 2px', fontSize:20, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:700 }}>{n.native}</p>
                {n.native !== n.contracted && (
                  <p style={{ margin:0, fontSize:16, color:PURPLE, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:700 }}>→ {n.contracted}</p>
                )}
                {n.native === n.contracted && <p style={{ margin:0, fontSize:11, color:'var(--muted)' }}>sin cambio</p>}
              </button>
            ))}
          </div>
          <div style={{ background:`${GREEN}10`, border:`1px solid ${GREEN}33`, borderRadius:12, padding:'14px', marginBottom:16 }}>
            <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:700 }}>Comparación:</p>
            {[
              { line:'호떡 하나 주세요', note:'sin contador → 하나 completo', audio:'호떡 하나 주세요' },
              { line:'호떡 한 개 주세요', note:'con contador 개 → hana→한', audio:'호떡 한 개 주세요' },
              { line:'커피 한 잔 주세요', note:'con contador 잔 → hana→한', audio:'한 잔' },
            ].map(ex => (
              <button key={ex.line} onClick={() => playAudio(ex.audio)}
                style={{ display:'block', width:'100%', background:'none', border:'none', textAlign:'left', cursor:'pointer', padding:'4px 0' }}>
                <span style={{ fontFamily:"'Noto Sans KR',sans-serif", fontWeight:600, fontSize:15 }}>{ex.line}</span>
                <span style={{ fontSize:11, color:'var(--muted)', marginLeft:8 }}>— {ex.note}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setPhase('p3_counters')} style={{ width:'100%', background:BLUE, color:'#fff', border:'none', borderRadius:10, padding:'13px', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            Siguiente: Ejercicio de contadores →
          </button>
        </div>
      )}

      {/* PHASE: p3_counters — sort exercise */}
      {phase === 'p3_counters' && counterIdx < COUNTER_QUESTIONS.length && (
        <div>
          <h3 style={{ margin:'0 0 6px', fontSize:16, fontWeight:700 }}>¿잔 o 개? — Elige el contador</h3>
          <p style={{ margin:'0 0 16px', fontSize:13, color:'var(--muted)' }}>
            Pregunta {counterIdx + 1} de {COUNTER_QUESTIONS.length}
          </p>
          <div style={{ background:'var(--bg-2,#f5f5f7)', borderRadius:14, padding:'24px', textAlign:'center', marginBottom:20 }}>
            <p style={{ margin:0, fontSize:24, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:700 }}>
              {COUNTER_QUESTIONS[counterIdx].sentence}
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
            {(['jan','gae'] as const).map(opt => {
              const isCorrect = opt === COUNTER_QUESTIONS[counterIdx].answer;
              const isPicked  = counterPick === opt;
              const bg = !counterPick ? `${opt === 'jan' ? GREEN : AMBER}18` : isCorrect ? 'rgba(45,155,78,0.2)' : isPicked ? 'rgba(239,68,68,0.12)' : 'var(--bg-2,#f5f5f7)';
              const border = !counterPick ? `2px solid ${opt === 'jan' ? GREEN : AMBER}66` : isCorrect ? '2px solid #2d9b4e' : isPicked ? '2px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={opt} onClick={() => handleCounter(opt)}
                  style={{ background:bg, border, borderRadius:12, padding:'20px 10px', cursor:counterPick ? 'default' : 'pointer', textAlign:'center' }}>
                  <p style={{ margin:'0 0 4px', fontSize:32, fontFamily:"'Noto Sans KR',sans-serif", fontWeight:700, color: opt === 'jan' ? GREEN : AMBER }}>{opt === 'jan' ? '잔' : '개'}</p>
                  <p style={{ margin:0, fontSize:12, color:'var(--muted)' }}>{opt === 'jan' ? 'bebidas/tazas' : 'objetos'}</p>
                </button>
              );
            })}
          </div>
          {counterPick && (
            <>
              <div style={{ background:`${counterPick === COUNTER_QUESTIONS[counterIdx].answer ? GREEN : '#ef4444'}12`, border:`1px solid ${counterPick === COUNTER_QUESTIONS[counterIdx].answer ? GREEN : '#ef4444'}44`, borderRadius:10, padding:'10px 14px', marginBottom:12 }}>
                <p style={{ margin:0, fontSize:13 }}>💡 {COUNTER_QUESTIONS[counterIdx].explanation}</p>
              </div>
              <button onClick={nextCounter} style={{ width:'100%', background:BLUE, color:'#fff', border:'none', borderRadius:10, padding:'12px', fontSize:14, fontWeight:600, cursor:'pointer' }}>
                {counterIdx + 1 < COUNTER_QUESTIONS.length ? 'Siguiente →' : 'Ver resultado →'}
              </button>
            </>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🎯</div>
          <h2 style={{ margin:'0 0 8px', fontSize:20, fontWeight:700 }}>{counterScore}/{COUNTER_QUESTIONS.length} contadores correctos</h2>
          <p style={{ margin:'0 0 24px', color:'var(--muted)', fontSize:14 }}>Dominaste los tres patrones: demostrativos, números nativos y contadores.</p>
          <button onClick={() => onComplete?.()} style={{ background:'#2d9b4e', color:'#fff', border:'none', borderRadius:10, padding:'14px 32px', fontSize:14, fontWeight:700, cursor:'pointer' }}>
            Continuar →
          </button>
        </div>
      )}
    </section>
  );
}
