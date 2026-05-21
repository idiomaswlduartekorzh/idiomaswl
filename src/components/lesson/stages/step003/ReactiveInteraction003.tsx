'use client';

import { useState, useRef, useEffect, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type Speaker = 'barista' | 'you';

interface Turn {
  speaker: Speaker;
  ko: string;
  es: string;
  audio?: string;
}

interface Choice {
  ko: string;
  es: string;
  quality: 'perfect' | 'ok' | 'wrong';
  feedback: string;
}

interface RoleTurn {
  barista: Turn;
  choices: Choice[];
  correctIdx: number;
}

/* ─── Conversation data ───────────────────────────────────────────────────── */
const NAME_PLACEHOLDER = 'NOMBRE';

const ROLE_TURNS: RoleTurn[] = [
  {
    barista: {
      speaker: 'barista',
      ko: '어서 오세요!',
      es: '¡Bienvenido/a!',
      audio: '어서 오세요',
    },
    choices: [
      { ko: '안녕하세요!', es: '¡Hola!', quality: 'perfect', feedback: 'Correcto. 안녕하세요 es la respuesta natural. No necesitas responder 어서 오세요 — no es una pregunta.' },
      { ko: '감사합니다', es: 'Gracias', quality: 'ok', feedback: 'Funciona pero suena raro aquí. 감사합니다 es para agradecer algo recibido. Al entrar, lo más natural es saludar primero.' },
      { ko: '어서 오세요', es: '¡Bienvenido!', quality: 'wrong', feedback: '어서 오세요 lo dice el empleado a quien llega. Tú eres el cliente, no la barista.' },
    ],
    correctIdx: 0,
  },
  {
    barista: {
      speaker: 'barista',
      ko: '주문하시겠어요?',
      es: '¿Va a ordenar?',
      audio: '아메리카노 한 잔 주세요',
    },
    choices: [
      { ko: '아메리카노 라지 주세요.', es: 'Un americano grande, por favor.', quality: 'perfect', feedback: 'SOV perfecto: [producto] + [tamaño] + 주세요. Esta es la estructura universal de pedido en Corea.' },
      { ko: '주세요 아메리카노 라지.', es: 'Por favor americano grande.', quality: 'wrong', feedback: '주세요 siempre va al final (es el verbo en SOV). Empezar con el verbo suena como inglés, no coreano.' },
      { ko: '있어요?', es: '¿Hay?', quality: 'wrong', feedback: '있어요 pregunta si algo existe, no hace un pedido. Para pedir usas 주세요.' },
    ],
    correctIdx: 0,
  },
  {
    barista: {
      speaker: 'barista',
      ko: '이름이 뭐예요?',
      es: '¿Cuál es su nombre?',
      audio: '이름이 뭐예요',
    },
    choices: [
      { ko: `저는 ${NAME_PLACEHOLDER}예요.`, es: `Me llamo ${NAME_PLACEHOLDER} (vocal final).`, quality: 'perfect', feedback: '저는 [nombre]이에요/예요 es el patrón universal. La barista escribe tu nombre en el vaso.' },
      { ko: `저는 ${NAME_PLACEHOLDER}이에요.`, es: `Me llamo ${NAME_PLACEHOLDER} (consonante final).`, quality: 'perfect', feedback: 'Correcto si tu nombre termina en consonante. Ambas formas son válidas según el nombre propio.' },
      { ko: `${NAME_PLACEHOLDER} 주세요.`, es: `${NAME_PLACEHOLDER}, por favor.`, quality: 'wrong', feedback: '주세요 es para pedir cosas, no para dar tu nombre. Suena como si pidieras una persona. Usa 이에요/예요.' },
    ],
    correctIdx: 0,
  },
  {
    barista: {
      speaker: 'barista',
      ko: '여기 있습니다. 감사합니다!',
      es: 'Aquí tiene. ¡Gracias!',
      audio: '여기 있습니다',
    },
    choices: [
      { ko: '감사합니다!', es: '¡Gracias!', quality: 'perfect', feedback: '감사합니다 es la forma más sincera y formal de agradecer. Perfecto en contextos de servicio.' },
      { ko: '감사해요!', es: 'Gracias (해요체)', quality: 'ok', feedback: 'Correcto pero ligeramente menos formal que 감사합니다. Con la barista cualquiera de las dos funciona bien.' },
      { ko: '어서 오세요!', es: '¡Bienvenido!', quality: 'wrong', feedback: '어서 오세요 da bienvenida — no tiene sentido aquí. Acabas de recibir tu café, agradeces: 감사합니다.' },
    ],
    correctIdx: 0,
  },
];

/* ─── Quality config ──────────────────────────────────────────────────────── */
const QC = {
  perfect: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.45)', text: '#16a34a', label: '✓ Perfecto', badge: '⭐', feedbackPrefix: '✅ ' },
  ok:      { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)',  text: '#b45309', label: '~ Aceptable', badge: '☆', feedbackPrefix: '💛 ' },
  wrong:   { bg: 'rgba(239,68,68,0.09)',  border: 'rgba(239,68,68,0.4)',   text: '#dc2626', label: '✕ Incorrecto', badge: '✕', feedbackPrefix: '💡 ' },
};

/* ─── Conversation map data ───────────────────────────────────────────────── */
const CONV_MAP: [string, string][] = [
  ['어서 오세요', '¿Cómo respondes al entrar?'],
  ['주문하시겠어요?', 'Haz tu pedido'],
  ['이름이 뭐예요?', 'Da tu nombre'],
  ['여기 있습니다', 'Recibe el café'],
];

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function ReactiveInteraction003({ onComplete }: Props) {
  const [step,    setStep]    = useState(-1); // -1 = intro
  const [picked,  setPicked]  = useState<number | null>(null);
  const [history, setHistory] = useState<{ turn: RoleTurn; choiceIdx: number }[]>([]);
  const [done,    setDone]    = useState(false);
  const [score,   setScore]   = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const turn = ROLE_TURNS[step] ?? null;

  /* Auto-play barista line when step changes */
  useEffect(() => {
    if (step < 0 || !turn) return;
    const t = setTimeout(() => { if (turn.barista.audio) playAudio(turn.barista.audio!); }, 400);
    return () => clearTimeout(t);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Scroll to bottom after choice */
  useEffect(() => {
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 120);
    return () => clearTimeout(t);
  }, [picked, step]);

  function pick(idx: number) {
    if (picked !== null || !turn) return;
    setPicked(idx);
    if (turn.choices[idx].quality === 'perfect') setScore(s => s + 1);
  }

  function next() {
    if (!turn) return;
    const newHistory = [...history, { turn, choiceIdx: picked! }];
    setHistory(newHistory);
    setPicked(null);
    if (step === ROLE_TURNS.length - 1) { setDone(true); onComplete?.(); }
    else setStep(s => s + 1);
  }

  function replay() {
    setStep(-1);
    setPicked(null);
    setHistory([]);
    setDone(false);
    setScore(0);
  }

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  /* ── Stars bar ─────────────────────────────────────────────────────────── */
  function StarsBar({ filled, total }: { filled: number; total: number }) {
    return (
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} style={{
            fontSize: 20,
            opacity: i < filled ? 1 : 0.22,
            filter: i < filled ? 'drop-shadow(0 0 4px gold)' : 'none',
            transition: 'opacity 0.3s ease, filter 0.3s ease',
          }}>⭐</span>
        ))}
      </div>
    );
  }

  /* ── Intro ─────────────────────────────────────────────────────────────── */
  if (step === -1) {
    return (
      <div style={{ ...base, padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <style>{`
          @keyframes ri-in { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
          @keyframes ri-slide-l { from { opacity:0; transform:translateX(-40px) scale(0.96) } to { opacity:1; transform:none } }
          @keyframes ri-slide-r { from { opacity:0; transform:translateX(40px) scale(0.96) } to { opacity:1; transform:none } }
        `}</style>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 52, margin: '0 0 12px' }}>☕</p>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: 'var(--foreground)' }}>Tú entras al café</h2>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65, maxWidth: 320, marginInline: 'auto' }}>
            La barista te habla — elige cómo responder. Serás evaluado por exactitud y formalidad.
          </p>
        </div>

        {/* Conversation map */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)' }}>La conversación</p>
          {CONV_MAP.map(([ko, hint], i) => (
            <div key={i}>
              {/* Barista → you row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(232,121,249,0.12)', border: '1px solid rgba(232,121,249,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#e879f9', flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted-foreground)' }}>☕ barista</span>
                    <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>→</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#e879f9' }}>tú</span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ko}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>{hint}</p>
                </div>
              </div>
              {i < CONV_MAP.length - 1 && (
                <div style={{ height: 1, background: 'var(--border)', marginLeft: 38 }} />
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={() => setStep(0)}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: 'rgba(232,121,249,0.14)', border: '1px solid rgba(232,121,249,0.4)',
            fontSize: 14, fontWeight: 700, color: '#e879f9',
          }}>
          Entrar al café →
        </button>
      </div>
    );
  }

  /* ── Done ──────────────────────────────────────────────────────────────── */
  if (done) {
    const perfect = score === ROLE_TURNS.length;
    const good    = score >= 3;
    const doneMsg = perfect
      ? '¡Conversación perfecta! 🌟'
      : good
        ? '¡Muy bien! Un pequeño desliz.'
        : 'Buen intento — repite para dominarla.';
    const doneColor  = perfect ? '#22c55e' : good ? '#f59e0b' : '#e879f9';
    const doneBg     = perfect ? 'rgba(34,197,94,0.1)' : good ? 'rgba(245,158,11,0.1)' : 'rgba(232,121,249,0.1)';
    const doneBorder = perfect ? 'rgba(34,197,94,0.3)'  : good ? 'rgba(245,158,11,0.3)'  : 'rgba(232,121,249,0.3)';

    return (
      <div style={{ ...base, padding: '28px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {/* Stars */}
        <StarsBar filled={score} total={ROLE_TURNS.length} />

        <div style={{ padding: '14px 24px', borderRadius: 14, background: doneBg, border: `1px solid ${doneBorder}` }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: doneColor }}>{score}/{ROLE_TURNS.length}</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)' }}>respuestas perfectas</p>
        </div>

        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>{doneMsg}</h3>

        {/* Review */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
          {history.map(({ turn: t, choiceIdx }, i) => {
            const choice = t.choices[choiceIdx];
            const qc = QC[choice.quality];
            return (
              <div key={i} style={{ background: 'var(--card)', border: `1px solid ${qc.border}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: qc.text, padding: '2px 8px', borderRadius: 100, background: qc.bg, border: `1px solid ${qc.border}`,
                  }}>{qc.label}</span>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>Turno {i + 1}</p>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{choice.ko}</p>
                <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{qc.feedbackPrefix}{choice.feedback}</p>
              </div>
            );
          })}
        </div>

        {/* Replay */}
        <button type="button" onClick={replay}
          style={{
            padding: '13px', borderRadius: 13, cursor: 'pointer', width: '100%',
            background: 'rgba(232,121,249,0.14)', border: '1px solid rgba(232,121,249,0.4)',
            fontSize: 14, fontWeight: 700, color: '#e879f9',
          }}>
          Repetir conversación ↺
        </button>
      </div>
    );
  }

  /* ── Active turn ───────────────────────────────────────────────────────── */
  /* Stars earned so far (only for history) */
  const starsEarned = history.filter(h => h.turn.choices[h.choiceIdx].quality === 'perfect').length;

  return (
    <div style={{ ...base, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes ri-in { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
        @keyframes ri-slide-l { from { opacity:0; transform:translateX(-40px) scale(0.96) } to { opacity:1; transform:none } }
        @keyframes ri-slide-r { from { opacity:0; transform:translateX(40px) scale(0.96) } to { opacity:1; transform:none } }
      `}</style>

      {/* Live score + progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <StarsBar filled={starsEarned} total={ROLE_TURNS.length} />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {ROLE_TURNS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 24 : 8, height: 8, borderRadius: 4,
              background: i < step ? '#e879f9' : i === step ? '#e879f9' : 'var(--border)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e879f9' }}>
          🎭 Tu turno · {step + 1} de {ROLE_TURNS.length}
        </p>
      </div>

      {/* Chat history (past turns) */}
      {history.map(({ turn: t, choiceIdx }, i) => {
        const choice = t.choices[choiceIdx];
        const qc = QC[choice.quality];
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Barista bubble */}
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%', animation: 'ri-slide-l 0.4s ease both' }}>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', paddingLeft: 4 }}>☕ Barista</p>
              <div style={{ padding: '11px 14px', borderRadius: '4px 16px 16px 16px', background: 'var(--secondary)', border: '1px solid var(--border)' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{t.barista.ko}</p>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: 'var(--muted-foreground)' }}>{t.barista.es}</p>
              </div>
            </div>
            {/* You bubble with quality badge */}
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%', animation: 'ri-slide-r 0.4s ease both' }}>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', textAlign: 'right', paddingRight: 4 }}>
                Tú 🙋 <span style={{ marginLeft: 4 }}>{qc.badge}</span>
              </p>
              <div style={{ padding: '11px 14px', borderRadius: '16px 4px 16px 16px', background: qc.bg, border: `1px solid ${qc.border}` }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{choice.ko}</p>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: 'var(--muted-foreground)' }}>{choice.es}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Current barista turn */}
      <div style={{ alignSelf: 'flex-start', maxWidth: '80%', animation: 'ri-slide-l 0.45s ease both' }}>
        <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', paddingLeft: 4 }}>☕ Barista</p>
        <div style={{ padding: '11px 14px', borderRadius: '4px 16px 16px 16px', background: 'var(--secondary)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{turn.barista.ko}</p>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>{turn.barista.es}</p>
          {turn.barista.audio && (
            <button type="button" onClick={() => playAudio(turn.barista.audio!)}
              style={{
                marginTop: 4, padding: '4px 12px', borderRadius: 100, cursor: 'pointer', alignSelf: 'flex-start',
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                fontSize: 11, fontWeight: 600, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: 5,
              }}>
              🔊
            </button>
          )}
        </div>
      </div>

      {/* Choices or feedback */}
      {picked === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>¿Qué dices tú?</p>
          {turn.choices.map((c, i) => (
            <button key={i} type="button" onClick={() => pick(i)}
              style={{
                textAlign: 'left', padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
                background: 'var(--secondary)', border: '1px solid var(--border)',
                fontSize: 14, fontWeight: 600, fontFamily: '"Noto Sans KR",sans-serif',
                color: 'var(--foreground)', lineHeight: 1.4, transition: 'all 0.18s ease',
                display: 'flex', flexDirection: 'column', gap: 3,
              }}>
              <span>{c.ko}</span>
              <span style={{ fontSize: 11, fontWeight: 400, fontFamily: 'system-ui', color: 'var(--muted-foreground)' }}>{c.es}</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Chosen answer bubble with badge */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '80%', animation: 'ri-slide-r 0.4s ease both' }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', textAlign: 'right', paddingRight: 4 }}>
              Tú 🙋 <span style={{ marginLeft: 4 }}>{QC[turn.choices[picked].quality].badge}</span>
            </p>
            <div style={{
              padding: '11px 14px', borderRadius: '16px 4px 16px 16px',
              background: QC[turn.choices[picked].quality].bg,
              border: `1px solid ${QC[turn.choices[picked].quality].border}`,
            }}>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>
                {turn.choices[picked].ko}
              </p>
            </div>
          </div>

          {/* Feedback box */}
          <div style={{
            padding: '13px 15px', borderRadius: 13, animation: 'ri-in 0.3s ease both',
            background: QC[turn.choices[picked].quality].bg,
            border: `1px solid ${QC[turn.choices[picked].quality].border}`,
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: QC[turn.choices[picked].quality].text }}>
              {QC[turn.choices[picked].quality].label}
            </p>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>
              {QC[turn.choices[picked].quality].feedbackPrefix}{turn.choices[picked].feedback}
            </p>
          </div>

          <button type="button" onClick={next}
            style={{
              padding: '12px', borderRadius: 13, cursor: 'pointer', width: '100%',
              background: 'rgba(232,121,249,0.14)', border: '1px solid rgba(232,121,249,0.4)',
              fontSize: 13, fontWeight: 700, color: '#e879f9',
            }}>
            {step === ROLE_TURNS.length - 1 ? '🎭 Ver resultado →' : 'Siguiente →'}
          </button>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
