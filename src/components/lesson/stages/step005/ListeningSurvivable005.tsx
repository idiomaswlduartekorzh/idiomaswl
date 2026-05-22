'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_005, KR_PODCAST_005, playAudio } from '@/lib/storage';

/* ─── Timestamps ──────────────────────────────────────────────────────────── */
interface Timestamp { label: string; time: number }

const TIMESTAMPS: Timestamp[] = [
  { label: '한국 생활 어때요?',              time: 0  },
  { label: '대학교에서 공부해요',             time: 8  },
  { label: '카페에서 일해요',                time: 15 },
  { label: '한국 좋아해요',                  time: 21 },
  { label: '민수 씨는 뭐해요?',              time: 27 },
  { label: '저도 공부해요 / 친구들이 많아요', time: 35 },
  { label: '매일 카페에 가요',               time: 46 },
];

const TOTAL_SEC = 60;

/* ─── Comprehension questions ─────────────────────────────────────────────── */
interface Question { id: string; q: string; options: string[]; correct: string }

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Dónde trabaja David además de estudiar?',
    options: ['En la biblioteca', 'En casa de Minsu', 'En un café', 'En la universidad'],
    correct: 'En un café',
  },
  {
    id: 'Q2',
    q: '¿Qué tiene Minsu que lo hace feliz en la universidad?',
    options: ['Un trabajo part-time', 'Muchos amigos', 'Un café propio', 'Clases fáciles'],
    correct: 'Muchos amigos',
  },
  {
    id: 'Q3',
    q: '¿A dónde va David todos los días?',
    options: ['A la biblioteca', 'A la universidad de Minsu', 'Al café', 'A casa'],
    correct: 'Al café',
  },
];

const RECAP_PHRASES = [
  { kr: '이 대학교에서 공부해요', es: 'Estudio en esta universidad', audio: '이 대학교에서 공부해요' },
  { kr: '카페에서 일해요',       es: 'Trabajo en el café',          audio: '카페에서 일해요' },
  { kr: '한국 좋아해요',         es: 'Me gusta Corea',              audio: '한국 좋아해요' },
  { kr: '매일 카페에 가요',      es: 'Voy al café todos los días',  audio: '매일 카페에 가요' },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function secToMmSs(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function activeTimestamp(t: number): Timestamp {
  let ch = TIMESTAMPS[0];
  for (const ts of TIMESTAMPS) { if (t >= ts.time) ch = ts; }
  return ch;
}

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function ListeningSurvivable005({ onComplete }: Props) {
  const [phase, setPhase]             = useState<'intro'|'listening'|'questions'|'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(TOTAL_SEC);
  const [playing, setPlaying]         = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [podcastError, setPodcastError] = useState(false);
  const [showPodcast, setShowPodcast]   = useState(false);
  const [answers, setAnswers]         = useState<Record<string,string>>({});
  const [checked, setChecked]         = useState(false);
  const [score, setScore]             = useState(0);

  const audioRef    = useRef<HTMLAudioElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const activeCh    = activeTimestamp(currentTime);
  const progressPct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  }

  function jumpTo(sec: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = sec;
    a.play().catch(() => {});
    setPlaying(true);
  }

  function jumpVideoTo(sec: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    v.play().catch(() => {});
  }

  function handleCheck() {
    if (!allAnswered || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
  }

  /* ── INTRO ──────────────────────────────────────────────────────────────── */
  if (phase === 'intro') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'2rem 1rem' }}>
      <p style={{ margin:'0 0 6px', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#6c63ff', fontWeight:700 }}>
        ETAPA 04 DE 11
      </p>
      <h3 style={{ margin:'0 0 10px', fontSize:22, fontWeight:700, color:'var(--foreground)' }}>
        Escucha sobrevivible · Rutina universitaria
      </h3>
      <p style={{ margin:'0 0 20px', fontSize:13, color:'var(--muted-foreground)', lineHeight:1.75 }}>
        Vas a ver la conversación entre Minsu y David sobre la rutina universitaria. Céntrate en las partículas 에 y 에서 — y en los verbos con 해요.
      </p>

      {/* Timestamp preview */}
      <div style={{ background:'rgba(108,99,255,0.04)', border:'1px solid rgba(108,99,255,0.15)', borderRadius:12, padding:'14px 16px', marginBottom:16 }}>
        <p style={{ margin:'0 0 10px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6c63ff' }}>
          Momentos clave
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {TIMESTAMPS.map(ts => (
            <div key={ts.time} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:11, color:'var(--muted-foreground)', fontFamily:'monospace', flexShrink:0 }}>{secToMmSs(ts.time)}</span>
              <p style={{ margin:0, flex:1, fontSize:13, color:'var(--foreground)', fontFamily:"'Noto Sans KR',sans-serif", fontWeight:600 }}>{ts.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div style={{ background:'rgba(108,99,255,0.05)', border:'1px solid rgba(108,99,255,0.18)', borderRadius:12, padding:'16px 20px', marginBottom:24 }}>
        <p style={{ margin:'0 0 12px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6c63ff' }}>
          Tu misión: mientras miras, identifica...
        </p>
        <ol style={{ margin:0, paddingLeft:20, display:'flex', flexDirection:'column', gap:6 }}>
          {QUESTIONS.map(q => (
            <li key={q.id} style={{ fontSize:13, color:'var(--foreground)', lineHeight:1.5 }}>{q.q}</li>
          ))}
        </ol>
      </div>

      <button type="button" onClick={() => setPhase('listening')}
        style={{ width:'100%', padding:'14px', background:'#6c63ff', border:'none', borderRadius:12, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
        🎧 Ver el episodio →
      </button>
    </section>
  );

  /* ── LISTENING ───────────────────────────────────────────────────────────── */
  if (phase === 'listening') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'1rem 0' }}>

      {/* Podcast audio (hidden) */}
      <audio
        ref={audioRef}
        src={KR_PODCAST_005}
        onTimeUpdate={e => {
          const t = e.currentTarget.currentTime;
          setCurrentTime(t);
          if (t > 30) setHasListened(true);
        }}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onEnded={() => { setPlaying(false); setHasListened(true); }}
        onError={() => setPodcastError(true)}
      />

      {/* Video */}
      <article style={{ background:'#000', borderRadius:16, overflow:'hidden', marginBottom:12 }}>
        <video
          ref={videoRef}
          src={KR_VIDEO_005}
          controls
          playsInline
          style={{ width:'100%', display:'block', maxHeight:340, objectFit:'contain' }}
          onTimeUpdate={e => {
            const t = e.currentTarget.currentTime;
            setCurrentTime(t);
            if (t > 20) setHasListened(true);
          }}
          onEnded={() => setHasListened(true)}
        />
        {/* Timestamp buttons under video */}
        <div style={{ background:'#111', padding:'10px 14px', display:'flex', gap:6, overflowX:'auto' }}>
          {TIMESTAMPS.map(ts => (
            <button
              key={ts.time}
              type="button"
              onClick={() => jumpVideoTo(ts.time)}
              style={{
                flexShrink:0, padding:'5px 11px', borderRadius:100, cursor:'pointer',
                background:'rgba(108,99,255,0.25)', border:'1px solid rgba(108,99,255,0.5)',
                fontSize:11, fontWeight:700, color:'#c4b5fd', whiteSpace:'nowrap',
                display:'flex', alignItems:'center', gap:5,
                fontFamily:"'Noto Sans KR',sans-serif",
              }}
            >
              <span style={{ fontFamily:'monospace', fontSize:10 }}>{secToMmSs(ts.time)}</span>
              <span style={{ fontWeight:400, opacity:0.85 }}>{ts.label}</span>
            </button>
          ))}
        </div>
      </article>

      {/* Podcast opcional (colapsable) */}
      <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', marginBottom:12 }}>
        <button
          type="button"
          onClick={() => setShowPodcast(p => !p)}
          style={{ width:'100%', padding:'12px 16px', display:'flex', alignItems:'center', gap:10, background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}
        >
          <span style={{ fontSize:18 }}>🎙️</span>
          <p style={{ margin:0, flex:1, fontSize:13, fontWeight:600, color:'var(--foreground)' }}>Podcast del episodio</p>
          <span style={{ fontSize:12, color:'var(--muted-foreground)' }}>{showPodcast ? '▲' : '▼'}</span>
        </button>

        {showPodcast && (
          <div style={{ borderTop:'1px solid var(--border)', padding:'12px 16px', display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <button type="button" onClick={togglePlay}
                style={{ width:44, height:44, borderRadius:'50%', background:'#6c63ff', border:'none', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <div style={{ flex:1 }}>
                <p style={{ margin:'0 0 4px', fontSize:12, color:'var(--muted-foreground)' }}>
                  {podcastError ? '⚠️ Podcast cargando…' : playing ? activeCh.label : 'Pulsa ▶ para escuchar'}
                </p>
                <div
                  role="slider" aria-valuenow={currentTime} aria-valuemin={0} aria-valuemax={duration}
                  style={{ position:'relative', height:5, background:'var(--border)', borderRadius:3, cursor:'pointer' }}
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (audioRef.current) audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
                  }}
                >
                  <div style={{ height:'100%', width:`${progressPct}%`, background:'#6c63ff', borderRadius:3, pointerEvents:'none' }} />
                </div>
              </div>
              <span style={{ fontSize:11, color:'var(--muted-foreground)', fontFamily:'monospace', flexShrink:0 }}>
                {secToMmSs(currentTime)}/{secToMmSs(duration)}
              </span>
            </div>

            {/* Timestamp list in podcast panel */}
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {TIMESTAMPS.map(ts => {
                const isActive = activeCh.time === ts.time;
                return (
                  <button key={ts.time} type="button" onClick={() => jumpTo(ts.time)}
                    style={{ padding:'7px 12px', display:'flex', alignItems:'center', gap:8, background: isActive ? 'rgba(108,99,255,0.06)' : 'transparent', border:'none', borderRadius:8, cursor:'pointer', textAlign:'left' }}>
                    <span style={{ fontSize:11, color:'var(--muted-foreground)', fontFamily:'monospace', flexShrink:0 }}>{secToMmSs(ts.time)}</span>
                    <p style={{ margin:0, flex:1, fontSize:12, fontWeight: isActive ? 700 : 500, color: isActive ? '#6c63ff' : 'var(--foreground)', fontFamily:"'Noto Sans KR',sans-serif" }}>{ts.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {hasListened ? (
        <button type="button" onClick={() => { setPhase('questions'); setChecked(false); setAnswers({}); setScore(0); }}
          style={{ width:'100%', padding:'13px', background:'#6c63ff', border:'none', borderRadius:10, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>
          Responder preguntas →
        </button>
      ) : (
        <p style={{ margin:'8px 0 0', textAlign:'center', fontSize:12, color:'var(--muted-foreground)' }}>
          Mira unos segundos del video para continuar
        </p>
      )}
    </section>
  );

  /* ── QUESTIONS ───────────────────────────────────────────────────────────── */
  if (phase === 'questions') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'1rem 0' }}>
      <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6c63ff' }}>
        Tu misión
      </p>
      <p style={{ margin:'0 0 20px', fontSize:13, color:'var(--muted-foreground)' }}>
        Responde basándote en lo que escuchaste. Sin trampa.
      </p>

      <div style={{ marginBottom:16, background:'var(--secondary)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontSize:20 }}>🎧</span>
        <p style={{ margin:0, fontSize:12, color:'var(--muted-foreground)', flex:1 }}>¿Quieres verlo otra vez?</p>
        <button type="button" onClick={() => setPhase('listening')}
          style={{ fontSize:12, color:'#6c63ff', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>
          Ver de nuevo
        </button>
      </div>

      {QUESTIONS.map(q => (
        <article key={q.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:16, marginBottom:12 }}>
          <p style={{ margin:'0 0 12px', fontSize:14, fontWeight:600, color:'var(--foreground)', lineHeight:1.5 }}>{q.q}</p>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {q.options.map(opt => {
              const selected    = answers[q.id] === opt;
              const isCorrect   = opt === q.correct;
              const showCorrect = checked && isCorrect;
              const showWrong   = checked && selected && !isCorrect;
              return (
                <button key={opt} type="button" disabled={checked}
                  onClick={() => { if (!checked) setAnswers(p => ({ ...p, [q.id]: opt })); }}
                  style={{
                    padding:'10px 14px',
                    background: showCorrect ? 'rgba(34,197,94,0.06)' : showWrong ? 'rgba(239,68,68,0.05)' : selected ? 'rgba(108,99,255,0.06)' : 'var(--card)',
                    border:`1.5px solid ${showCorrect ? '#22c55e' : showWrong ? '#ef4444' : selected ? '#6c63ff' : 'var(--border)'}`,
                    borderRadius:9, fontSize:13, textAlign:'left',
                    cursor: checked ? 'default' : 'pointer',
                    color: showCorrect ? '#16a34a' : showWrong ? '#dc2626' : 'var(--foreground)',
                    transition:'all 0.12s',
                  }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </article>
      ))}

      {allAnswered && !checked && (
        <button type="button" onClick={handleCheck}
          style={{ width:'100%', padding:'13px', background:'#6c63ff', border:'none', borderRadius:10, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>
          Verificar respuestas
        </button>
      )}

      {checked && (
        <div style={{ marginTop:16 }}>
          <div style={{ background: score===3 ? 'rgba(34,197,94,0.07)' : 'rgba(108,99,255,0.06)', border:`1px solid ${score===3 ? 'rgba(34,197,94,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius:12, padding:'14px 16px', marginBottom:16, textAlign:'center' }}>
            <p style={{ margin:'0 0 4px', fontSize:28, fontWeight:800, color: score===3 ? '#22c55e' : '#6c63ff' }}>{score}/3</p>
            <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)' }}>
              {score===3 ? 'Perfecto. Las partículas ya son tuyas.' : score===2 ? 'Casi todo. Muy bien.' : 'Normal para la primera vez.'}
            </p>
          </div>

          <p style={{ margin:'0 0 10px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--muted-foreground)' }}>
            Frases que escuchaste
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
            {RECAP_PHRASES.map(phrase => (
              <div key={phrase.kr} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--secondary)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 14px' }}>
                <div style={{ flex:1 }}>
                  <p style={{ margin:'0 0 2px', fontSize:16, fontWeight:700, fontFamily:"'Noto Sans KR',sans-serif", color:'var(--foreground)' }}>{phrase.kr}</p>
                  <p style={{ margin:0, fontSize:12, color:'var(--muted-foreground)' }}>{phrase.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(phrase.audio)}
                  style={{ flexShrink:0, width:32, height:32, borderRadius:'50%', background:'rgba(108,99,255,0.08)', border:'1px solid rgba(108,99,255,0.2)', color:'#6c63ff', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🔊
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => { setPhase('complete'); onComplete?.(); }}
            style={{ width:'100%', padding:'13px', background:'#6c63ff', border:'none', borderRadius:10, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>
            Continuar →
          </button>
        </div>
      )}
    </section>
  );

  /* ── COMPLETE ────────────────────────────────────────────────────────────── */
  return (
    <section style={{ maxWidth:540, margin:'0 auto', padding:'3rem 1rem', textAlign:'center' }}>
      <h3 style={{ margin:'0 0 10px', fontSize:20, fontWeight:700, color:'var(--foreground)' }}>
        Etapa completada
      </h3>
      <p style={{ margin:'0 0 28px', fontSize:13, color:'var(--muted-foreground)', lineHeight:1.7 }}>
        Acabas de escuchar la rutina de David y Minsu. Las partículas 에 y 에서 ya tienen sonido y contexto real.
      </p>
      <button type="button" onClick={onComplete}
        style={{ width:'100%', padding:'14px', background:'#6c63ff', border:'none', borderRadius:12, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
        Siguiente etapa →
      </button>
    </section>
  );
}
