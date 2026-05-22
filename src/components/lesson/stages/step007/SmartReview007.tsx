'use client';

import { useEffect, useState } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Question types ──────────────────────────────────────────────────────── */
type QuestionType = 'kr→es' | 'es→kr' | 'fill' | 'grammar' | 'pattern' | 'context';

interface BaseQ {
  id: string;
  type: QuestionType;
  audio?: string;
  explanation: string;
  step?: string;
}
interface MCQ extends BaseQ { type: 'kr→es' | 'es→kr' | 'grammar' | 'context'; prompt: string; options: string[]; correct: string }
interface FillQ extends BaseQ { type: 'fill'; prefix: string; suffix: string; options: string[]; correct: string; es: string }
interface PatternQ extends BaseQ { type: 'pattern'; template: string; options: string[]; correct: string; es: string }
type Question = MCQ | FillQ | PatternQ;

/* ─── All questions — acumulativo steps 001-007 ──────────────────────────── */
const ALL_QUESTIONS: Question[] = [
  // ── Recicladas de Step 004 ───────────────────────────────────────────────
  { id:'q001-1', type:'kr→es', step:'Step 001', prompt:'안녕하세요', options:['Gracias','Hola (formal)','¿Eres nuevo?','Encantado/a'], correct:'Hola (formal)', audio:'안녕하세요', explanation:'안녕하세요 es el saludo formal universal. Funciona en cualquier situación.' },
  { id:'q002-1', type:'kr→es', step:'Step 002', prompt:'있어요', options:['no hay / no tiene','soy / es','¿Cómo es?','hay / tiene / existe'], correct:'hay / tiene / existe', audio:'있어요', explanation:'있어요 = hay, existe, tiene. Su contrario es 없어요. Son dos de las palabras más útiles del coreano.' },
  { id:'q002-2', type:'es→kr', step:'Step 002', prompt:'"No hay / no existe" en coreano:', options:['있어요','아니에요','없어요','몰라요'], correct:'없어요', audio:'없어요', explanation:'없어요 = no hay, no existe, no tiene. Contrario de 있어요.' },
  { id:'q003-2', type:'grammar', step:'Step 003', prompt:'¿Cuándo usas 예요 en vez de 이에요?', options:['Solo con nombres propios','Después de vocal','Después de consonante','Solo en preguntas'], correct:'Después de vocal', explanation:'Vocal → 예요 (민수예요). Consonante → 이에요 (사람이에요). ¡La terminal del nombre importa!' },
  { id:'q003-3', type:'context', step:'Step 003', prompt:'Alguien te pregunta "어느 나라 사람이에요?". Respondes (eres de Colombia):', options:['콜롬비아 있어요','콜롬비아 없어요','콜롬비아 사람이에요','콜롬비아 어때요?'], correct:'콜롬비아 사람이에요', audio:'콜롬비아 사람이에요', explanation:'[País] + 사람이에요 = "Soy de [País]". La fórmula más directa para decir tu nacionalidad.' },
  { id:'q004-4', type:'es→kr', step:'Step 004', prompt:'"¿Quieres tomar un café?" en coreano:', options:['커피 어때요?','커피 있어요?','커피 마실래요?','커피 좋아요?'], correct:'커피 마실래요?', audio:'커피 마실래요?', explanation:'-ㄹ래요? propone hacer algo juntos. 마실래요 = ¿quieres beber? De 마시다 (beber) + -ㄹ래요.' },
  { id:'q004-g2', type:'grammar', step:'Step 004', prompt:'¿Cuál es la diferencia entre 마실래요? y 어때요?', options:['Son sinónimos — ambas piden opinión','어때요 invita a hacer algo, 마실래요 describe','마실래요 es formal, 어때요 informal','마실래요 invita a hacer algo, 어때요 pide opinión'], correct:'마실래요 invita a hacer algo, 어때요 pide opinión', explanation:'Clave del step004: -ㄹ래요 = propuesta de acción, 어때요 = consulta de opinión.' },
  { id:'q-cross-1', type:'context', step:'Steps 001–004', prompt:'Ves a alguien nuevo en el aula. ¿Cómo empiezas la conversación?', options:['커피 없어요','친절한 사람들이에요','안녕하세요! 새로 왔어요?','감사합니다, 많아요'], correct:'안녕하세요! 새로 왔어요?', audio:'안녕하세요', explanation:'La secuencia natural: saludo (안녕하세요) + pregunta de apertura (새로 왔어요?). ¡Así empieza la historia!' },

  // ── Step 007 — vocabulario ────────────────────────────────────────────────
  { id:'q007-1', type:'kr→es', step:'Step 007', prompt:'생활', options:['vida cotidiana / rutina','trabajo','estudio','amigos'], correct:'vida cotidiana / rutina', audio:'생활', explanation:'생활 = la vida como actividad continua en un lugar. 한국 생활 = vida en Corea.' },
  { id:'q007-2', type:'kr→es', step:'Step 007', prompt:'공부해요', options:['trabajo','estudio / estudia','voy','me gusta'], correct:'estudio / estudia', audio:'공부해요', explanation:'공부하다 → 공부해요 (presente polite). El patrón 하다 → 해요 es siempre igual.' },
  { id:'q007-3', type:'kr→es', step:'Step 007', prompt:'일해요', options:['estudio','hay muchos','trabajo / trabaja','voy'], correct:'trabajo / trabaja', audio:'일해요', explanation:'일하다 → 일해요. 일 = trabajo (sustantivo), 일하다 = trabajar (verbo).' },
  { id:'q007-4', type:'kr→es', step:'Step 007', prompt:'좋아해요', options:['está bien','hay','me gusta / le gusta','tengo'], correct:'me gusta / le gusta', audio:'좋아해요', explanation:'좋아하다 = gustar (verbo de acción). Diferente de 좋아요 (adjetivo = está bien).' },
  { id:'q007-5', type:'kr→es', step:'Step 007', prompt:'매일', options:['a veces','todos los días','muy','hoy'], correct:'todos los días', audio:'매일', explanation:'매일 = todos los días. Adverbio de frecuencia muy útil: 매일 카페에 가요.' },
  { id:'q007-6', type:'grammar', step:'Step 007', prompt:'¿Cuándo usas 에서 en lugar de 에?', options:['Cuando vas a un lugar','Cuando una acción ocurre en un lugar','Cuando describes algo','Cuando hay algo en un lugar'], correct:'Cuando una acción ocurre en un lugar', explanation:'에서 = la acción sucede aquí. 에 = te mueves hacia aquí. Mismo lugar, distintas partículas según el verbo.' },
  { id:'q007-7', type:'fill', step:'Step 007', prefix:'카페', suffix:'일해요.', options:['에서','에','는','도'], correct:'에서', es:'Trabajo en el café.', audio:'카페에서 일해요', explanation:'일하다 es una acción que ocurre EN el café → 에서. Si fuera 가요 (ir), sería 에.' },
  { id:'q007-8', type:'fill', step:'Step 007', prefix:'매일 카페', suffix:'가요.', options:['에','에서','가','을'], correct:'에', es:'Voy al café todos los días.', audio:'매일 카페에 가요', explanation:'가요 (ir) es movimiento hacia un destino → 에. Con 일하다/공부하다 usarías 에서.' },
  { id:'q007-9', type:'context', step:'Step 007', prompt:'Quieres decir "Estudio en esta universidad". ¿Cuál es correcto?', options:['이 대학교에 공부해요','이 대학교에서 공부해요','이 대학교가 공부해요','이 대학교를 공부해요'], correct:'이 대학교에서 공부해요', audio:'이 대학교에서 공부해요', explanation:'공부하다 es acción → 에서. "En la universidad" como lugar de la acción, no destino.' },
  { id:'q007-10', type:'context', step:'Step 007', prompt:'¿Cuál expresa correctamente "Me gusta Corea"?', options:['한국 좋아요','한국이 좋아요','한국 좋아해요','한국이에요 좋아요'], correct:'한국 좋아해요', audio:'한국 좋아해요', explanation:'좋아해요 es el verbo "gustar". 좋아요 significa "está bien" o "de acuerdo" — no expresa preferencia.' },
  { id:'q007-11', type:'es→kr', step:'Step 007', prompt:'"¿Qué haces?" en coreano:', options:['어때요?','뭐해요?','있어요?','가요?'], correct:'뭐해요?', audio:'뭐해요?', explanation:'뭐(qué) + 해요(haces) = 뭐해요? La pregunta social más frecuente después de conocer a alguien en Corea.' },
  { id:'q007-12', type:'kr→es', step:'Step 007', prompt:'친구들', options:['un amigo','amigos (plural)','personas','compañeros de clase'], correct:'amigos (plural)', audio:'친구들', explanation:'친구 + 들 = amigos. 들 es el marcador de plural en coreano. También: 사람들 (personas), 학생들 (estudiantes).' },
  { id:'q007-13', type:'grammar', step:'Step 007', prompt:'¿Cuál es la diferencia entre 좋아요 y 좋아해요?', options:['좋아요 es pasado, 좋아해요 es presente','좋아요 es adjetivo (está bien), 좋아해요 es verbo (gustar)','Son sinónimos perfectos','좋아요 es formal, 좋아해요 informal'], correct:'좋아요 es adjetivo (está bien), 좋아해요 es verbo (gustar)', explanation:'좋다 (adjetivo) → 좋아요. 좋아하다 (verbo) → 좋아해요. Para expresar que algo te gusta usa siempre 좋아해요.' },
  { id:'q007-14', type:'pattern', step:'Step 007', template:'___ + 에서 + 공부해요', options:['매일','대학교','가요','좋아해요'], correct:'대학교', es:'Estudio en la universidad', audio:'이 대학교에서 공부해요', explanation:'에서 necesita un lugar como sujeto. 대학교에서 공부해요 = la acción (공부) ocurre en ese lugar (대학교).' },
  { id:'q007-15', type:'context', step:'Step 007', prompt:'Minsu te pregunta 한국 생활 어때요? Respondes que estudias y que te gusta Corea.', options:['대학교에서 공부해요. 한국 좋아해요.','대학교에 공부해요. 한국 좋아요.','대학교에서 공부해요. 한국 좋아요.','대학교에 가요. 한국 좋아해요.'], correct:'대학교에서 공부해요. 한국 좋아해요.', audio:'이 대학교에서 공부해요', explanation:'에서 para la acción de estudiar + 좋아해요 para expresar preferencia. ¡Así responde David!' },
  { id:'q007-16', type:'kr→es', step:'Step 007', prompt:'씨 (partícula)', options:['señor/señora + apellido','señor/señora + nombre propio','muy / bastante','ya / todavía'], correct:'señor/señora + nombre propio', audio:'씨', explanation:'씨 se usa DESPUÉS del nombre propio (no apellido): 민수 씨. Es respetuoso y cercano a la vez. Muy frecuente entre colegas.' },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function getCorrect(q: Question): string { return q.type === 'fill' || q.type === 'pattern' ? (q as FillQ | PatternQ).correct : (q as MCQ).correct; }
function getOptions(q: Question): string[] { return shuffle(q.type === 'fill' || q.type === 'pattern' ? (q as FillQ | PatternQ).options : (q as MCQ).options); }
function typeLabel(t: QuestionType) { return { 'kr→es': '🇰🇷 → 🇪🇸', 'es→kr': '🇪🇸 → 🇰🇷', 'fill': 'Completa', 'grammar': 'Gramática', 'pattern': 'Patrón', 'context': 'Contexto' }[t]; }

const ACCENT = '#6c63ff', GREEN = '#22c55e', RED = '#ef4444', AMBER = '#f59e0b';
const SESSION_SIZE = 18;

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

function createInitialState() {
  const q = shuffle(ALL_QUESTIONS).slice(0, SESSION_SIZE);
  return { queue: q, options: q[0] ? getOptions(q[0]) : [] as string[] };
}

export default function SmartReview007({ onComplete }: Props) {
  const [initState]  = useState(createInitialState);
  const [queue,      setQueue]     = useState<Question[]>(() => initState.queue);
  const [missed,     setMissed]    = useState<Question[]>([]);
  const [idx,        setIdx]       = useState(0);
  const [options,    setOptions]   = useState<string[]>(() => initState.options);
  const [selected,   setSelected]  = useState<string | null>(null);
  const [revealed,   setRevealed]  = useState(false);
  const [correct,    setCorrect]   = useState(0);
  const [total,      setTotal]     = useState(0);
  const [streak,     setStreak]    = useState(0);
  const [xp,         setXp]        = useState(0);
  const [round,      setRound]     = useState(1);
  const [done,       setDone]      = useState(false);
  const [showBurst,  setShowBurst] = useState(false);
  const [burstKey,   setBurstKey]  = useState(0);

  const q     = queue[idx] as Question | undefined;
  const maxXp = queue.length * 10;
  const xpPct = maxXp > 0 ? Math.min(Math.round((xp / maxXp) * 100), 100) : 0;

  useEffect(() => {
    if (!q) return;
    setOptions(getOptions(q));
    setSelected(null);
    setRevealed(false);
    if (q.audio) { const t = setTimeout(() => playAudio(q.audio!), 400); return () => clearTimeout(t); }
  }, [idx, round]); // eslint-disable-line react-hooks/exhaustive-deps

  function select(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    const isOk = opt === getCorrect(q!);
    setTotal(t => t + 1);
    setXp(x => Math.min(x + (isOk ? 10 : 3), maxXp));
    if (isOk) {
      setCorrect(c => c + 1);
      const ns = streak + 1; setStreak(ns);
      if (ns > 0 && ns % 3 === 0) { setBurstKey(k => k + 1); setShowBurst(true); setTimeout(() => setShowBurst(false), 1800); }
    } else {
      setStreak(0);
      setMissed(m => [...m, q!]);
    }
    if (q?.audio) setTimeout(() => playAudio(getCorrect(q!)), 700);
  }

  function advance() {
    if (idx < queue.length - 1) { setIdx(i => i + 1); return; }
    if (missed.length > 0 && round < 3) {
      setQueue(shuffle(missed).slice(0, 10));
      setMissed([]); setIdx(0); setRound(r => r + 1);
    } else { setDone(true); onComplete?.(); }
  }

  const base: React.CSSProperties = { fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' };

  /* ── DONE ──────────────────────────────────────────────────────────────── */
  if (done) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const head = pct >= 85 ? '¡Memoria consolidada! 🧠' : pct >= 65 ? '¡Muy buen repaso! ⭐' : '¡Progresando! 💪';
    return (
      <div style={{ ...base, padding: '28px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <style>{`@keyframes sr5-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{head}</h3>
        <div style={{ padding: '14px 28px', borderRadius: 14, background: pct >= 75 ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${pct >= 75 ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
          <p style={{ margin: '0 0 2px', fontSize: 36, fontWeight: 800, color: pct >= 75 ? GREEN : AMBER }}>{xp} XP</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)' }}>{correct}/{total} correctas · {pct}%</p>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)', maxWidth: 320, lineHeight: 1.6 }}>
          Repasaste vocabulario y gramática de Steps 001 → 007 en una sola sesión. La circularidad es clave para la memoria.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 360 }}>
          {['안녕하세요', '있어요', '없어요', '에서', '에', '공부해요', '일해요', '좋아해요', '매일'].map(v => (
            <button key={v} type="button" onClick={() => playAudio(v)} style={{ padding: '5px 12px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontFamily: '"Noto Sans KR",sans-serif', fontWeight: 700, color: ACCENT, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>{v}</button>
          ))}
        </div>
        <button type="button" onClick={onComplete} style={{ padding: '13px', borderRadius: 14, width: '100%', cursor: 'pointer', background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)', fontSize: 13, fontWeight: 700, color: ACCENT }}>
          Siguiente etapa →
        </button>
      </div>
    );
  }

  if (!q) return null;
  const isOk = selected !== null && selected === getCorrect(q);

  /* ── ACTIVE QUESTION ───────────────────────────────────────────────────── */
  return (
    <div style={{ ...base, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
      <style>{`
        @keyframes sr5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes sr5-pop { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:none} }
        @keyframes sr5-burst { 0%{opacity:0;transform:translate(-50%,-50%)scale(0.6)} 20%{opacity:1;transform:translate(-50%,-50%)scale(1.05)} 80%{opacity:1} 100%{opacity:0;transform:translate(-50%,-50%)scale(0.9)} }
      `}</style>

      {/* Streak burst */}
      {showBurst && (
        <div key={burstKey} style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 9999, pointerEvents: 'none', animation: 'sr5-burst 1.8s ease forwards', background: 'rgba(234,179,8,0.95)', borderRadius: 20, padding: '14px 24px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#fff' }}>¡En racha! 🔥</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{streak} seguidas</p>
        </div>
      )}

      {/* XP bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted-foreground)' }}>Ronda {round} · {idx + 1}/{queue.length}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {streak >= 2 && <span style={{ fontSize: 11, fontWeight: 700, color: AMBER }}>🔥 {streak}</span>}
            <span style={{ fontSize: 11, fontWeight: 700, color: GREEN }}>{xp} XP</span>
          </div>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'var(--border)' }}>
          <div style={{ height: '100%', width: `${xpPct}%`, background: `linear-gradient(90deg,${ACCENT},#a78bfa)`, borderRadius: 3, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Round 2+ banner */}
      {round > 1 && (
        <div style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', textAlign: 'center', animation: 'sr5-in 0.3s ease both' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: RED }}>🔁 Ronda {round} — repasando las que fallaste</span>
        </div>
      )}

      {/* Card */}
      <div key={`${round}-${idx}`} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px', animation: 'sr5-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: ACCENT }}>{typeLabel(q.type)}</span>
          {q.step && <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: GREEN }}>{q.step}</span>}
        </div>

        {/* Prompt */}
        <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.18)', marginBottom: 16, textAlign: 'center' }}>
          {q.type === 'fill' ? (
            <>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--muted-foreground)' }}>Completa la oración:</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.4 }}>
                {(q as FillQ).prefix} <span style={{ color: ACCENT, borderBottom: `2px dashed ${ACCENT}`, padding: '0 4px' }}>___</span> {(q as FillQ).suffix}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>{(q as FillQ).es}</p>
            </>
          ) : q.type === 'pattern' ? (
            <>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--muted-foreground)' }}>¿Qué va en el espacio?</p>
              <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{(q as PatternQ).template}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{(q as PatternQ).es}</p>
            </>
          ) : (
            <p style={{ margin: 0, fontSize: (q as MCQ).prompt.length > 30 ? 13 : (q as MCQ).prompt.length > 15 ? 17 : 22, fontWeight: 800, fontFamily: q.type === 'kr→es' ? '"Noto Sans KR",sans-serif' : 'inherit', color: 'var(--foreground)', lineHeight: 1.4 }}>
              {(q as MCQ).prompt}
            </p>
          )}
          {q.audio && (
            <button type="button" onClick={() => playAudio(q.audio!)} style={{ marginTop: 10, padding: '4px 12px', borderRadius: 100, cursor: 'pointer', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', fontSize: 11, fontWeight: 600, color: ACCENT, display: 'inline-flex', alignItems: 'center', gap: 5 }}>🔊 Escuchar</button>
          )}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map(opt => {
            const isSel = selected === opt, isRight = opt === getCorrect(q);
            let bg = 'var(--secondary)', border = '1.5px solid var(--border)', color = 'var(--foreground)';
            if (revealed) {
              if (isRight)                { bg = 'rgba(34,197,94,0.1)';  border = `1.5px solid rgba(34,197,94,0.5)`;  color = '#16a34a'; }
              else if (isSel && !isRight) { bg = 'rgba(239,68,68,0.1)'; border = `1.5px solid rgba(239,68,68,0.45)`; color = RED; }
            } else if (isSel) { bg = 'rgba(108,99,255,0.1)'; border = `1.5px solid rgba(108,99,255,0.5)`; }
            return (
              <button key={opt} type="button" onClick={() => select(opt)} disabled={revealed}
                style={{ padding: '12px 14px', borderRadius: 12, cursor: revealed ? 'default' : 'pointer', background: bg, border, fontSize: 13, textAlign: 'left', color, fontFamily: (q.type === 'es→kr' || q.type === 'fill' || q.type === 'pattern') ? '"Noto Sans KR",sans-serif' : 'inherit', fontWeight: 600, transition: 'all 0.15s', lineHeight: 1.5 }}>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{ marginTop: 12, padding: '11px 14px', borderRadius: 12, background: isOk ? 'rgba(34,197,94,0.07)' : 'rgba(245,158,11,0.07)', border: `1px solid ${isOk ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.3)'}`, animation: 'sr5-in 0.3s ease both' }}>
            <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: isOk ? GREEN : AMBER }}>{isOk ? '✓ ¡Correcto!' : `→ Respuesta: ${getCorrect(q)}`}</p>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Advance */}
      {revealed && (
        <button type="button" onClick={advance} style={{ padding: '13px', borderRadius: 14, cursor: 'pointer', width: '100%', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.35)', fontSize: 14, fontWeight: 800, color: ACCENT, animation: 'sr5-in 0.3s ease both' }}>
          {idx < queue.length - 1 ? 'Siguiente →' : round < 3 && missed.length > 0 ? `Ronda ${round + 1} — repasar errores →` : '¡Terminé! →'}
        </button>
      )}
    </div>
  );
}
