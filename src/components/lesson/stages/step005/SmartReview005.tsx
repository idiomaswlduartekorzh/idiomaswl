'use client';

import { useEffect, useState } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Question types ──────────────────────────────────────────────────────── */
type QuestionType = 'kr→es' | 'es→kr' | 'fill' | 'grammar' | 'context';

interface BaseQ { id: string; type: QuestionType; audio?: string; explanation: string; step?: string }
interface MCQ   extends BaseQ { type: 'kr→es' | 'es→kr' | 'grammar' | 'context'; prompt: string; options: string[]; correct: string }
interface FillQ extends BaseQ { type: 'fill'; prefix: string; suffix: string; options: string[]; correct: string; es: string }
type Question = MCQ | FillQ;

/* ─── Questions — acumulativo steps 001 → 005 ────────────────────────────── */
const ALL_QUESTIONS: Question[] = [
  // ─── Step 001 – saludos ──────────────────────────────────────────────────
  {
    id: 'q1-1', type: 'kr→es', step: 'Step 001',
    prompt: '안녕하세요', audio: '안녕하세요',
    options: ['Hasta luego', 'Gracias', 'Hola (formal)', 'De nada'],
    correct: 'Hola (formal)',
    explanation: '안녕하세요 es el saludo formal universal. Se usa con desconocidos, personas mayores y en situaciones formales.',
  },
  {
    id: 'q1-2', type: 'kr→es', step: 'Step 001',
    prompt: '감사합니다', audio: '감사합니다',
    options: ['Por favor', 'Gracias', 'Lo siento', 'Hola'],
    correct: 'Gracias',
    explanation: '감사합니다 = Gracias (formal). En contextos casuales también se usa 고마워요.',
  },
  {
    id: 'q1-3', type: 'es→kr', step: 'Step 001',
    prompt: '"Hasta luego" en coreano:',
    options: ['안녕하세요', '감사합니다', '안녕히 가세요', '처음 뵙겠습니다'],
    correct: '안녕히 가세요',
    explanation: '안녕히 가세요 = que te vayas bien (lo dice quien se queda). 안녕히 계세요 = que te quedes bien (lo dice quien se va).',
  },

  // ─── Step 002 – 있어요 / 없어요 ──────────────────────────────────────────
  {
    id: 'q2-1', type: 'kr→es', step: 'Step 002',
    prompt: '있어요', audio: '있어요',
    options: ['no hay / no existe', 'soy / es', 'hay / tiene / existe', '¿cómo es?'],
    correct: 'hay / tiene / existe',
    explanation: '있어요 = hay, existe, tiene. Su contrario es 없어요. Son dos de las palabras más útiles del coreano.',
  },
  {
    id: 'q2-2', type: 'context', step: 'Step 002',
    prompt: 'David busca hodduk en la calle. No hay. ¿Cómo lo dice?',
    options: ['호떡 있어요', '호떡 없어요', '호떡이에요', '호떡 주세요'],
    correct: '호떡 없어요',
    audio: '호떡',
    explanation: 'Para decir que no hay algo, simplemente agrega 없어요 después del sustantivo.',
  },

  // ─── Step 003 – 이에요 / 예요 ─────────────────────────────────────────────
  {
    id: 'q3-1', type: 'grammar', step: 'Step 003',
    prompt: '¿Cuándo usas 예요 en vez de 이에요?',
    options: ['Siempre con objetos', 'Después de vocal', 'Después de consonante', 'Solo en preguntas'],
    correct: 'Después de vocal',
    explanation: 'Vocal final → 예요 · Consonante final → 이에요. Hodduk (호떡) termina en ㄱ → 이에요.',
  },
  {
    id: 'q3-2', type: 'context', step: 'Step 003',
    prompt: 'David dice que el pan es hodduk. ¿Cuál es correcto?',
    options: ['그거는 호떡이에요', '그거는 호떡예요', '그거는 호떡 있어요', '그거는 호떡 없어요'],
    correct: '그거는 호떡이에요',
    audio: '호떡',
    explanation: '호떡 termina en consonante ㄱ → se usa 이에요.',
  },

  // ─── Step 004 – contadores ─────────────────────────────────────────────
  {
    id: 'q4-1', type: 'kr→es', step: 'Step 004',
    prompt: '이거', audio: '이거 뭐예요?',
    options: ['eso (lejos mío)', 'esto (cerca del hablante)', 'allá / aquel', '¿qué es?'],
    correct: 'esto (cerca del hablante)',
    explanation: '이거 = esto. 그거 = eso. 저거 = aquello. La perspectiva del hablante determina cuál usar.',
  },
  {
    id: 'q4-2', type: 'grammar', step: 'Step 004',
    prompt: '하나 se contrae a ___ antes de un contador (예: 개, 잔)',
    options: ['하', '한', '하나', '일'],
    correct: '한',
    explanation: 'Regla: 하나→한, 둘→두, 셋→세, 넷→네 antes de contador. Ejemplo: 한 잔 (una taza), 한 개 (un objeto).',
  },
  {
    id: 'q4-3', type: 'kr→es', step: 'Step 004',
    prompt: '커피도 주세요',
    options: ['Un café, por favor', 'Un café también, por favor', 'Sin café, por favor', '¿Tiene café?'],
    correct: 'Un café también, por favor',
    audio: '커피',
    explanation: '-도 = también. Se pega directamente a la palabra y reemplaza partículas de objeto.',
  },
  {
    id: 'q4-4', type: 'fill', step: 'Step 004',
    prefix: '커피', suffix: '주세요 (un café también)',
    options: ['도', '를', '은', '에서'],
    correct: '도',
    es: 'Un café también, por favor',
    audio: '커피',
    explanation: '-도 = también. Reemplaza a partículas de objeto (-를/을). 커피도 = café también.',
  },

  // ─── Step 005 – pago y baño ───────────────────────────────────────────────
  {
    id: 'q5-1', type: 'grammar', step: 'Step 005',
    prompt: 'David dice "여기 있습니다" al entregar el pedido. ¿Qué diferencia hay entre 있습니다 y 있어요?',
    options: [
      '있습니다 es la forma formal (-습니다), 있어요 es casual (-어요)',
      '있습니다 es pasado, 있어요 es presente',
      'Son idénticas, cualquiera sirve',
      '있습니다 solo se usa con objetos',
    ],
    correct: '있습니다 es la forma formal (-습니다), 있어요 es casual (-어요)',
    audio: '여기 있습니다',
    explanation: '-습니다 = nivel de servicio profesional. David usa esta forma con clientes desconocidos para sonar más formal y respetuoso.',
  },
  {
    id: 'q5-2', type: 'kr→es', step: 'Step 005',
    prompt: '맛있게 드세요', audio: '맛있게 드세요',
    options: ['Gracias por la comida', '¡Que lo disfrutes! / Bon appétit', 'Está delicioso', 'Coma despacio'],
    correct: '¡Que lo disfrutes! / Bon appétit',
    explanation: '맛있게 드세요 = literalmente "coma deliciosamente". Se dice ANTES de que el otro empiece a comer. 드세요 es el honorífico de 먹어요.',
  },
  {
    id: 'q5-3', type: 'grammar', step: 'Step 005',
    prompt: '잘 aparece en: 잘 먹었습니다, 잘 모르겠어요, 잘 자요. ¿Qué función cumple 잘?',
    options: [
      'Adverbio: indica que algo se hace bien o de forma satisfactoria',
      'Partícula de sujeto',
      'Marcador de tiempo pasado',
      'Prefijo de honorífico',
    ],
    correct: 'Adverbio: indica que algo se hace bien o de forma satisfactoria',
    audio: '잘 먹었습니다',
    explanation: '잘 = bien, satisfactoriamente. Siempre va ANTES del verbo. 잘 먹었습니다 = comí bien. 잘 모르겠어요 = no lo sé bien.',
  },
  {
    id: 'q5-4', type: 'context', step: 'Step 005',
    prompt: 'Estás en la calle y necesitas parar a un transeúnte para preguntar una dirección. ¿Qué dices primero?',
    options: ['실례합니다', '저기요', '잠시만요', '여기요'],
    correct: '실례합니다',
    audio: '실례합니다',
    explanation: '실례합니다 = reconocer que interrumpes la actividad de alguien. 저기요 es para llamar al personal de servicio. 잠시만요 lo dice quien necesita tiempo.',
  },
  {
    id: 'q5-5', type: 'grammar', step: 'Step 005',
    prompt: '칠천 원이에요 usa 칠 para el 7. ¿A qué sistema pertenece 칠?',
    options: [
      'Sistema sino-coreano — el mismo para precios, fechas y minutos',
      'Sistema nativo coreano — el mismo que 하나/둘/셋',
      'Es un número especial solo para dinero',
      '칠 y 일곱 son intercambiables en precios',
    ],
    correct: 'Sistema sino-coreano — el mismo para precios, fechas y minutos',
    audio: '칠천 원이에요',
    explanation: 'Regla: PRECIOS → sino-coreano (일/이/삼…칠). OBJETOS físicos y horas → nativo (하나/둘/셋). Nunca se mezclan.',
  },
  {
    id: 'q5-6', type: 'fill', step: 'Step 005',
    prefix: '안쪽 오른쪽', suffix: '있어요 (está al fondo a la derecha)',
    options: ['-에', '-에서', '-로', '-가'],
    correct: '-에',
    es: 'Está al fondo a la derecha',
    audio: '안쪽 오른쪽에 있어요',
    explanation: '-에 con 있어요 = ubicación estática ("está EN"). -에 con 가요 = destino ("voy A"). Mismo -에, dos lecturas según el verbo.',
  },
  {
    id: 'q5-7', type: 'kr→es', step: 'Step 005',
    prompt: '잘 먹었습니다', audio: '잘 먹었습니다',
    options: ['¡Que lo disfrutes!', 'Gracias por la comida (después de comer)', 'Comí demasiado', 'La comida está buena'],
    correct: 'Gracias por la comida (después de comer)',
    explanation: '잘 먹었습니다 = "comí bien" → agradece el esfuerzo de quien preparó/sirvió. Lo dice el cliente DESPUÉS de comer.',
  },
  {
    id: 'q5-8', type: 'context', step: 'Step 005',
    prompt: 'David dice "잠시만요. 칠천 원이에요." ¿Cuál es la secuencia correcta?',
    options: [
      'Primero pide un momento, luego da el precio',
      'Primero da el precio, luego pide esperar',
      'Pide un momento para que el cliente pague',
      'Ambas frases significan lo mismo',
    ],
    correct: 'Primero pide un momento, luego da el precio',
    audio: '잠시만요',
    explanation: '잠시만요 = un momento (David comprueba el precio). Luego 칠천 원이에요 = son 7.000 wones. La secuencia natural en el mostrador.',
  },
  {
    id: 'q5-9', type: 'es→kr', step: 'Step 005',
    prompt: '"¿Hay un baño?" en coreano:',
    options: ['화장실 있어요?', '화장실이 어디예요?', '화장실 없어요?', '화장실에 가요'],
    correct: '화장실 있어요?',
    audio: '화장실 있어요?',
    explanation: '화장실 있어요? = literalmente "¿baño hay?". 있어요 pregunta por existencia. 어디예요? preguntaría por la ubicación específica.',
  },

  // ─── Preguntas cruzadas ──────────────────────────────────────────────────
  {
    id: 'q-cross-1', type: 'context', step: 'Steps 001–005',
    prompt: 'La secuencia completa en el café de David. ¿Cuál es el orden correcto?',
    options: [
      '여기 있습니다 → 맛있게 드세요 → 얼마예요? → 잠시만요. 칠천 원이에요',
      '맛있게 드세요 → 여기 있습니다 → 잠시만요. 칠천 원이에요 → 얼마예요?',
      '얼마예요? → 여기 있습니다 → 맛있게 드세요 → 칠천 원이에요',
      'No hay un orden fijo — cualquier secuencia es válida',
    ],
    correct: '여기 있습니다 → 맛있게 드세요 → 얼마예요? → 잠시만요. 칠천 원이에요',
    audio: '여기 있습니다',
    explanation: 'El orden del video: David entrega (여기 있습니다) → desea bon appétit (맛있게 드세요) → cliente pregunta precio (얼마예요?) → David da precio (잠시만요. 칠천 원이에요).',
  },
  {
    id: 'q-cross-2', type: 'context', step: 'Steps 001–005',
    prompt: 'Un cliente te pregunta: "실례합니다. 화장실 있어요?" ¿Cuál es la respuesta de David?',
    options: [
      '네, 안쪽 오른쪽에 있어요.',
      '없어요. 화장실은 밖에 있어요.',
      '잠시만요. 화장실이에요.',
      '이거 뭐예요?',
    ],
    correct: '네, 안쪽 오른쪽에 있어요.',
    audio: '안쪽 오른쪽에 있어요',
    explanation: 'David confirma con 네 (sí) y da la dirección: 안쪽 오른쪽에 있어요 = está al fondo a la derecha. -에 marca la ubicación con 있어요.',
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function getCorrect(q: Question): string { return (q as MCQ).correct ?? (q as FillQ).correct; }
function getOptions(q: Question): string[] { return shuffle(q.type === 'fill' ? (q as FillQ).options : (q as MCQ).options); }
function typeLabel(t: QuestionType) {
  return { 'kr→es': '🇰🇷 → 🇪🇸', 'es→kr': '🇪🇸 → 🇰🇷', 'fill': 'Completa', 'grammar': 'Gramática', 'context': 'Contexto' }[t];
}

const ACCENT = '#6c63ff', GREEN = '#22c55e', RED = '#ef4444', AMBER = '#f59e0b';
const SESSION_SIZE = 12;

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

function createInitialState() {
  const q = shuffle(ALL_QUESTIONS).slice(0, SESSION_SIZE);
  return { queue: q, options: q[0] ? getOptions(q[0]) : [] as string[] };
}

export default function SmartReview005({ onComplete }: Props) {
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
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{correct}/{total} correctas · {pct}%</p>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.6 }}>
          Repasaste vocabulario y gramática de Steps 001 → 005 en una sesión circular.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 360 }}>
          {['맛있게 드세요', '잘 먹었습니다', '잠시만요', '칠천 원', '실례합니다', '화장실 있어요?'].map(v => (
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

      {showBurst && (
        <div key={burstKey} style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 9999, pointerEvents: 'none', animation: 'sr5-burst 1.8s ease forwards', background: 'rgba(234,179,8,0.95)', borderRadius: 20, padding: '14px 24px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#fff' }}>¡En racha! 🔥</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{streak} seguidas</p>
        </div>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>ETAPA 10 DE 11 · Ronda {round} · {idx + 1}/{queue.length}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {streak >= 2 && <span style={{ fontSize: 11, fontWeight: 700, color: AMBER }}>🔥 {streak}</span>}
            <span style={{ fontSize: 11, fontWeight: 700, color: GREEN }}>{xp} XP</span>
          </div>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'var(--line-soft)' }}>
          <div style={{ height: '100%', width: `${xpPct}%`, background: `linear-gradient(90deg,${ACCENT},#a78bfa)`, borderRadius: 3, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {round > 1 && (
        <div style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', textAlign: 'center', animation: 'sr5-in 0.3s ease both' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: RED }}>🔁 Ronda {round} — repasando las que fallaste</span>
        </div>
      )}

      <div key={`${round}-${idx}`} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 18, padding: '20px', animation: 'sr5-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: ACCENT }}>{typeLabel(q.type)}</span>
          {q.step && <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: GREEN }}>{q.step}</span>}
        </div>

        <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.18)', marginBottom: 16, textAlign: 'center' }}>
          {q.type === 'fill' ? (
            <>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--muted)' }}>Completa la oración:</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.4 }}>
                {(q as FillQ).prefix} <span style={{ color: ACCENT, borderBottom: `2px dashed ${ACCENT}`, padding: '0 4px' }}>___</span> {(q as FillQ).suffix}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)' }}>{(q as FillQ).es}</p>
            </>
          ) : (
            <p style={{ margin: 0, fontSize: (q as MCQ).prompt.length > 40 ? 13 : (q as MCQ).prompt.length > 20 ? 16 : 22, fontWeight: 800, fontFamily: q.type === 'kr→es' ? '"Noto Sans KR",sans-serif' : 'inherit', color: 'var(--foreground)', lineHeight: 1.4 }}>
              {(q as MCQ).prompt}
            </p>
          )}
          {q.audio && (
            <button type="button" onClick={() => playAudio(q.audio!)} style={{ marginTop: 10, padding: '4px 12px', borderRadius: 100, cursor: 'pointer', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', fontSize: 11, fontWeight: 600, color: ACCENT, display: 'inline-flex', alignItems: 'center', gap: 5 }}>🔊 Escuchar</button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map(opt => {
            const isSel = selected === opt, isRight = opt === getCorrect(q);
            let bg = 'var(--bg-2,#f5f5f7)', border = '1.5px solid var(--line-soft)', color = 'var(--foreground)';
            if (revealed) {
              if (isRight)                { bg = 'rgba(34,197,94,0.1)';  border = `1.5px solid rgba(34,197,94,0.5)`;  color = '#16a34a'; }
              else if (isSel && !isRight) { bg = 'rgba(239,68,68,0.1)'; border = `1.5px solid rgba(239,68,68,0.45)`; color = RED; }
            } else if (isSel) { bg = 'rgba(108,99,255,0.1)'; border = `1.5px solid rgba(108,99,255,0.5)`; }
            return (
              <button key={opt} type="button" onClick={() => select(opt)} disabled={revealed}
                style={{ padding: '12px 14px', borderRadius: 12, cursor: revealed ? 'default' : 'pointer', background: bg, border, fontSize: 13, textAlign: 'left', color, fontFamily: (q.type === 'es→kr' || q.type === 'fill') ? '"Noto Sans KR",sans-serif' : 'inherit', fontWeight: 600, transition: 'all 0.15s', lineHeight: 1.5 }}>
                {opt}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ marginTop: 12, padding: '11px 14px', borderRadius: 12, background: isOk ? 'rgba(34,197,94,0.07)' : 'rgba(245,158,11,0.07)', border: `1px solid ${isOk ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.3)'}`, animation: 'sr5-in 0.3s ease both' }}>
            <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: isOk ? GREEN : AMBER }}>{isOk ? '✓ ¡Correcto!' : `→ Respuesta: ${getCorrect(q)}`}</p>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{q.explanation}</p>
          </div>
        )}
      </div>

      {revealed && (
        <button type="button" onClick={advance} style={{ padding: '13px', borderRadius: 14, cursor: 'pointer', width: '100%', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.35)', fontSize: 14, fontWeight: 800, color: ACCENT, animation: 'sr5-in 0.3s ease both' }}>
          {idx < queue.length - 1 ? 'Siguiente →' : round < 3 && missed.length > 0 ? `Ronda ${round + 1} — repasar errores →` : '¡Terminé! →'}
        </button>
      )}
    </div>
  );
}
