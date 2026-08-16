'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_006, KR_PODCAST_006, playAudio } from '@/lib/storage';

// Video y podcast vienen de storage.ts

/* ─── Chapter map (timestamps en segundos) ────────────────────────────────── */
interface Chapter { startSec: number; emoji: string; labelEs: string; videoKey?: keyof typeof KR_VIDEO_006 }

const CHAPTERS: Chapter[] = [
  { startSec:  10, emoji:'🎙️', labelEs:'Intro · David en el campus' },
  { startSec:  83, emoji:'👤', labelEs:'이다 · Ser e identidad',         videoKey:'scene1' },
  { startSec: 158, emoji:'☕', labelEs:'있다/없다 · Tener y existir',    videoKey:'scene2' },
  { startSec: 240, emoji:'🔄', labelEs:'아니에요 vs 없어요 · La negación' },
  { startSec: 330, emoji:'🎓', labelEs:'Cierre del episodio' },
];
const TOTAL_SEC = 360;

/* ─── Comprehension questions ─────────────────────────────────────────────── */
interface Question { id: string; q: string; options: string[]; correct: string }

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: 'Minsu ve a David y le dice "새로 왔어요?". ¿Qué le está preguntando?',
    options: ['¿Eres nuevo/a aquí?', '¿Cómo estás?', '¿De dónde eres?', '¿Te gustan los cafés?'],
    correct: '¿Eres nuevo/a aquí?',
  },
  {
    id: 'Q2',
    q: 'David quiere decir que es colombiano. ¿Qué dice?',
    options: ['콜롬비아 사람이에요', '콜롬비아 있어요', '콜롬비아 어때요?', '콜롬비아 아니에요'],
    correct: '콜롬비아 사람이에요',
  },
  {
    id: 'Q3',
    q: '¿Cuál es la diferencia clave entre 아니에요 y 없어요?',
    options: [
      '아니에요 niega lo que eres, 없어요 niega lo que tienes o existe',
      'Son exactamente lo mismo, solo cambia la formalidad',
      '아니에요 es formal, 없어요 es informal',
      '아니에요 es para preguntas, 없어요 para afirmaciones',
    ],
    correct: '아니에요 niega lo que eres, 없어요 niega lo que tienes o existe',
  },
];

const RECAP_PHRASES = [
  { kr:'저는 콜롬비아 사람이에요', es:'Soy colombiano/a',           audio:'콜롬비아 사람이에요' },
  { kr:'커피 마실래요?',           es:'¿Quieres tomar un café?',     audio:'커피 마실래요?' },
  { kr:'대학교 어때요?',           es:'¿Cómo es la universidad?',    audio:'대학교 어때요?' },
  { kr:'학생이 아니에요',          es:'No soy estudiante (아니에요)',  audio:'좋아요' },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function secToMmSs(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function activeChapter(t: number): Chapter {
  let ch = CHAPTERS[0];
  for (const c of CHAPTERS) { if (t >= c.startSec) ch = c; }
  return ch;
}

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function ListeningSurvivable006({ onComplete }: Props) {
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
  const activeCh    = activeChapter(currentTime);
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

  function handleCheck() {
    if (!allAnswered || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
  }

  /* ── INTRO ──────────────────────────────────────────────────────────────── */
  if (phase === 'intro') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'2rem 1rem' }}>
      <p style={{ margin:'0 0 6px', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--wl-on-panel-link, #6c63ff)', fontWeight:700 }}>
        ETAPA 04 DE 11
      </p>
      <h3 style={{ margin:'0 0 10px', fontSize:22, fontWeight:700, color:'var(--ink)' }}>
        Escucha sobrevivible · El podcast del campus
      </h3>
      <p style={{ margin:'0 0 20px', fontSize:13, color:'var(--muted)', lineHeight:1.75 }}>
        Vas a escuchar el episodio del campus de David. No necesitas entender todo — céntrate en las frases que ya conoces.
      </p>

      {/* Chapter preview */}
      <div style={{ background:'rgba(108,99,255,0.04)', border:'1px solid rgba(108,99,255,0.15)', borderRadius:12, padding:'14px 16px', marginBottom:16 }}>
        <p style={{ margin:'0 0 10px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--wl-on-panel-link, #6c63ff)' }}>
          Capítulos del episodio
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {CHAPTERS.map(ch => (
            <div key={ch.startSec} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:16, flexShrink:0 }}>{ch.emoji}</span>
              <p style={{ margin:0, flex:1, fontSize:13, color:'var(--ink)', fontWeight:600 }}>{ch.labelEs}</p>
              <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{secToMmSs(ch.startSec)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div style={{ background:'rgba(108,99,255,0.05)', border:'1px solid rgba(108,99,255,0.18)', borderRadius:12, padding:'16px 20px', marginBottom:24 }}>
        <p style={{ margin:'0 0 12px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--wl-on-panel-link, #6c63ff)' }}>
          Tu misión: mientras escuchas, identifica...
        </p>
        <ol style={{ margin:0, paddingLeft:20, display:'flex', flexDirection:'column', gap:6 }}>
          {QUESTIONS.map(q => (
            <li key={q.id} style={{ fontSize:13, color:'var(--ink)', lineHeight:1.5 }}>{q.q}</li>
          ))}
        </ol>
      </div>

      <button type="button" onClick={() => setPhase('listening')}
        style={{ width:'100%', padding:'14px', background:'#6c63ff', border:'none', borderRadius:12, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
        🎧 Escuchar el episodio →
      </button>
    </section>
  );

  /* ── LISTENING ───────────────────────────────────────────────────────────── */
  if (phase === 'listening') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'1rem 0' }}>

      {/* Podcast audio (oculto, solo para modo podcast) */}
      <audio
        ref={audioRef}
        src={KR_PODCAST_006}
        onTimeUpdate={e => {
          const t = e.currentTarget.currentTime;
          setCurrentTime(t);
          if (t > 120) setHasListened(true);
        }}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onEnded={() => { setPlaying(false); setHasListened(true); }}
        onError={() => setPodcastError(true)}
      />

      {/* ── Video completo ── */}
      <article style={{ background:'#000', borderRadius:16, overflow:'hidden', marginBottom:12 }}>
        <video
          ref={videoRef}
          src={KR_VIDEO_006.full}
          controls
          playsInline
          style={{ width:'100%', display:'block', maxHeight:340, objectFit:'contain' }}
          onTimeUpdate={e => {
            const t = e.currentTarget.currentTime;
            setCurrentTime(t);
            if (t > 60) setHasListened(true);
          }}
          onEnded={() => setHasListened(true)}
        />
        {/* Chapter timestamps overlay (debajo del video) */}
        <div style={{ background:'#111', padding:'10px 14px', display:'flex', gap:6, overflowX:'auto' }}>
          {CHAPTERS.map(ch => (
            <button
              key={ch.startSec}
              type="button"
              onClick={() => { if (videoRef.current) { videoRef.current.currentTime = ch.startSec; videoRef.current.play().catch(() => {}); } }}
              style={{
                flexShrink:0, padding:'5px 11px', borderRadius:100, cursor:'pointer',
                background:'rgba(108,99,255,0.25)', border:'1px solid rgba(108,99,255,0.5)',
                fontSize:11, fontWeight:700, color:'#c4b5fd', whiteSpace:'nowrap',
                display:'flex', alignItems:'center', gap:5,
              }}
            >
              <span>{ch.emoji}</span>
              <span>{secToMmSs(ch.startSec)}</span>
              <span style={{ fontWeight:400, opacity:0.8 }}>{ch.labelEs}</span>
            </button>
          ))}
        </div>
      </article>

      {/* ── Podcast opcional ── */}
      <div style={{ background:'var(--bg)', border:'1px solid var(--line-soft)', borderRadius:12, overflow:'hidden', marginBottom:12 }}>
        <button
          type="button"
          onClick={() => setShowPodcast(p => !p)}
          style={{ width:'100%', padding:'12px 16px', display:'flex', alignItems:'center', gap:10, background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}
        >
          <span style={{ fontSize:18 }}>🎙️</span>
          <p style={{ margin:0, flex:1, fontSize:13, fontWeight:600, color:'var(--ink)' }}>Podcast del episodio</p>
          <span style={{ fontSize:12, color:'var(--muted)' }}>{showPodcast ? '▲' : '▼'}</span>
        </button>

        {showPodcast && (
          <div style={{ borderTop:'1px solid var(--line-soft)', padding:'12px 16px', display:'flex', flexDirection:'column', gap:10 }}>
            {/* Player */}
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <button type="button" onClick={togglePlay}
                style={{ width:44, height:44, borderRadius:'50%', background:'#6c63ff', border:'none', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <div style={{ flex:1 }}>
                <p style={{ margin:'0 0 4px', fontSize:12, color:'var(--muted)' }}>
                  {podcastError ? '⚠️ Podcast cargando…' : playing ? activeCh.labelEs : 'Pulsa ▶ para escuchar'}
                </p>
                {/* Barra de progreso */}
                <div
                  role="slider" aria-valuenow={currentTime} aria-valuemin={0} aria-valuemax={duration}
                  style={{ position:'relative', height:5, background:'var(--line-soft)', borderRadius:3, cursor:'pointer' }}
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (audioRef.current) audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
                  }}
                >
                  {CHAPTERS.slice(1).map(ch => (
                    <div key={ch.startSec} style={{ position:'absolute', top:0, bottom:0, left:`${(ch.startSec/TOTAL_SEC)*100}%`, width:2, background:'rgba(108,99,255,0.5)', pointerEvents:'none' }} />
                  ))}
                  <div style={{ height:'100%', width:`${progressPct}%`, background:'#6c63ff', borderRadius:3, pointerEvents:'none' }} />
                </div>
              </div>
              <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)', flexShrink:0 }}>
                {secToMmSs(currentTime)}/{secToMmSs(duration)}
              </span>
            </div>

            {/* Capítulos del podcast */}
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {CHAPTERS.map((ch, i) => {
                const isActive = activeCh.startSec === ch.startSec;
                return (
                  <button key={ch.startSec} type="button" onClick={() => jumpTo(ch.startSec)}
                    style={{ padding:'8px 12px', display:'flex', alignItems:'center', gap:8, background: isActive ? 'rgba(108,99,255,0.06)' : 'transparent', border:'none', borderRadius:8, cursor:'pointer', textAlign:'left' }}>
                    <span style={{ fontSize:13 }}>{ch.emoji}</span>
                    <p style={{ margin:0, flex:1, fontSize:12, fontWeight: isActive ? 700 : 500, color: isActive ? '#6c63ff' : 'var(--ink)' }}>{ch.labelEs}</p>
                    <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{secToMmSs(ch.startSec)}</span>
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
        <p style={{ margin:'8px 0 0', textAlign:'center', fontSize:12, color:'var(--muted)' }}>
          Mira al menos 1 minuto del video para continuar
        </p>
      )}
    </section>
  );

  /* ── QUESTIONS ───────────────────────────────────────────────────────────── */
  if (phase === 'questions') return (
    <section style={{ maxWidth:640, margin:'0 auto', padding:'1rem 0' }}>
      <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--wl-on-panel-link, #6c63ff)' }}>
        Tu misión
      </p>
      <p style={{ margin:'0 0 20px', fontSize:13, color:'var(--muted)' }}>
        Responde basándote en lo que escuchaste. Sin trampa.
      </p>

      {/* Re-listen strip */}
      <div style={{ marginBottom:16, background:'var(--bg-2)', border:'1px solid var(--line-soft)', borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontSize:20 }}>🎧</span>
        <p style={{ margin:0, fontSize:12, color:'var(--muted)', flex:1 }}>¿Quieres escucharlo otra vez?</p>
        <button type="button" onClick={() => setPhase('listening')}
          style={{ fontSize:12, color:'var(--wl-on-panel-link, #6c63ff)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>
          Escuchar de nuevo
        </button>
      </div>

      {QUESTIONS.map(q => (
        <article key={q.id} style={{ background:'var(--bg)', border:'1px solid var(--line-soft)', borderRadius:12, padding:16, marginBottom:12 }}>
          <p style={{ margin:'0 0 12px', fontSize:14, fontWeight:600, color:'var(--ink)', lineHeight:1.5 }}>{q.q}</p>
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
                    background: showCorrect ? 'rgba(45,155,78,0.06)' : showWrong ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : 'var(--bg)',
                    border:`1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--line-soft)'}`,
                    borderRadius:9, fontSize:13, textAlign:'left',
                    cursor: checked ? 'default' : 'pointer',
                    color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : 'var(--ink)',
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
          <div style={{ background: score===3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border:`1px solid ${score===3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius:12, padding:'14px 16px', marginBottom:16, textAlign:'center' }}>
            <p style={{ margin:'0 0 4px', fontSize:28, fontWeight:800, color: score===3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
            <p style={{ margin:0, fontSize:13, color:'var(--muted)' }}>
              {score===3 ? 'Perfecto. Lo escuchaste todo.' : score===2 ? 'Casi todo. Muy bien.' : 'Normal para la primera vez.'}
            </p>
          </div>

          <p style={{ margin:'0 0 12px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--muted)' }}>
            Frases que escuchaste
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
            {RECAP_PHRASES.map(phrase => (
              <div key={phrase.kr} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', borderRadius:10, padding:'10px 14px' }}>
                <div style={{ flex:1 }}>
                  <p style={{ margin:'0 0 2px', fontSize:16, fontWeight:700, fontFamily:"'Noto Sans KR',sans-serif", color:'var(--ink)' }}>{phrase.kr}</p>
                  <p style={{ margin:0, fontSize:12, color:'var(--muted)' }}>{phrase.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(phrase.audio)}
                  style={{ flexShrink:0, width:32, height:32, borderRadius:'50%', background:'rgba(108,99,255,0.08)', border:'1px solid rgba(108,99,255,0.2)', color:'var(--wl-on-panel-link, #6c63ff)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
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
      <h3 style={{ margin:'0 0 10px', fontSize:20, fontWeight:700, color:'var(--ink)' }}>
        Etapa completada
      </h3>
      <p style={{ margin:'0 0 28px', fontSize:13, color:'var(--muted)', lineHeight:1.7 }}>
        Acabas de escuchar el coreano universitario en acción. La identidad, la existencia y la negación ya tienen sonido y contexto real.
      </p>
      <button type="button" onClick={onComplete}
        style={{ width:'100%', padding:'14px', background:'#6c63ff', border:'none', borderRadius:12, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
        Siguiente etapa →
      </button>
    </section>
  );
}
