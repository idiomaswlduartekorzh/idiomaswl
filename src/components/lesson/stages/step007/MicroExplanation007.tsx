'use client';

import { useState, useEffect } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

type StepKind = 'tema' | 'ejemplos' | 'ejercicio' | 'contrast' | 'hada' | 'combo';

interface TemaStep {
  kind: 'tema';
  section: string;
  sectionIndex: number;
  particle: string;
  color: string;
  rule: string;
  subRule?: string;
  showTransform?: { from: string; to: string; label: string };
}

interface EjemplosStep {
  kind: 'ejemplos';
  section: string;
  color: string;
  items: { ko: string[]; particleIdx: number; verbIdx: number; es: string; audio: string }[];
}

interface Option { text: string; correct: boolean }

interface EjercicioStep {
  kind: 'ejercicio';
  section: string;
  color: string;
  question: string;
  options: Option[];
  feedback: string;
}

interface ContrastStep {
  kind: 'contrast';
  section: string;
  left: { color: string; label: string; icon: string; items: string[] };
  right: { color: string; label: string; icon: string; items: string[] };
  tip: string;
}

interface HadaVerb { noun: string; hadaForm: string; audio: string }

interface HadaStep {
  kind: 'hada';
  section: string;
  color: string;
  rule: string;
  verbs: HadaVerb[];
}

interface ComboStep {
  kind: 'combo';
  section: string;
  color: string;
  question: string;
  blank?: string;
  binaryOptions?: string[];
  options?: Option[];
  answer: string;
  feedback: string;
}

type Step =
  | TemaStep
  | EjemplosStep
  | EjercicioStep
  | ContrastStep
  | HadaStep
  | ComboStep;

/* ─── Color constants ────────────────────────────────────────────────────── */
const C = {
  eoseo: '#8b5cf6',
  e:     '#3b82f6',
  do_:   '#f59e0b',
  hada:  '#22c55e',
  joa:   '#ec4899',
  red:   '#ef4444',
} as const;

/* ─── Steps data ─────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  /* ── SECTION 에서 ── */
  {
    kind: 'tema', section: '에서', sectionIndex: 1,
    particle: '에서', color: C.eoseo,
    rule: 'La acción ocurre AQUÍ',
    subRule: '[lugar]에서 [acción]',
  },
  {
    kind: 'ejemplos', section: '에서', color: C.eoseo,
    items: [
      { ko: ['이 대학교', '에서', ' 공부해요'], particleIdx: 1, verbIdx: 2, es: 'Estudio en esta universidad', audio: '이 대학교에서 공부해요' },
      { ko: ['카페', '에서', ' 일해요'], particleIdx: 1, verbIdx: 2, es: 'Trabajo en el café', audio: '카페에서 일해요' },
      { ko: ['집', '에서', ' 쉬어요'], particleIdx: 1, verbIdx: 2, es: 'Descanso en casa', audio: '집에서 쉬어요' },
    ],
  },
  {
    kind: 'ejercicio', section: '에서', color: C.eoseo,
    question: '¿Cuál usa 에서 correctamente?',
    options: [
      { text: '카페에서 커피 마셔요', correct: true },
      { text: '학교에 공부해요', correct: false },
      { text: '집에서 가요', correct: false },
      { text: '대학교 가요', correct: false },
    ],
    feedback: '에서 + cualquier acción que NO sea ir/venir ✓',
  },

  /* ── SECTION 에 ── */
  {
    kind: 'tema', section: '에', sectionIndex: 2,
    particle: '에', color: C.e,
    rule: 'Me muevo HACIA aquí',
    subRule: '[lugar]에 가다 / 오다',
  },
  {
    kind: 'ejemplos', section: '에', color: C.e,
    items: [
      { ko: ['매일 카페', '에', ' 가요'], particleIdx: 1, verbIdx: 2, es: 'Voy al café todos los días', audio: '매일 카페에 가요' },
      { ko: ['대학교', '에', ' 가요'], particleIdx: 1, verbIdx: 2, es: 'Voy a la universidad', audio: '대학교에 가요' },
      { ko: ['집', '에', ' 와요'], particleIdx: 1, verbIdx: 2, es: 'Vengo a casa', audio: '집에 와요' },
    ],
  },
  {
    kind: 'ejercicio', section: '에', color: C.e,
    question: '¿Qué frase usa 에 correctamente?',
    options: [
      { text: '학교에 가요', correct: true },
      { text: '카페에 일해요', correct: false },
      { text: '집에서 가요', correct: false },
      { text: '대학교에서 가요', correct: false },
    ],
    feedback: '에 + 가다/오다 = movimiento hacia un destino ✓',
  },

  /* ── SECTION 에서 vs 에 ── */
  {
    kind: 'contrast', section: '에서 vs 에',
    left:  { color: C.eoseo, label: '에서 ★ acción aquí', icon: '📍', items: ['에서 일해요', '에서 공부해요', '에서 마셔요'] },
    right: { color: C.e,     label: '에 → movimiento',    icon: '🚶', items: ['에 가요', '에 와요'] },
    tip: '¿el verbo es 가다/오다? → 에 · ¿cualquier otra acción? → 에서',
  },
  {
    kind: 'combo', section: '에서 vs 에', color: C.eoseo,
    question: '카페___ 일해요',
    blank: '___',
    binaryOptions: ['에서', '에'],
    answer: '에서',
    feedback: '일해요 es una acción → 에서',
  },
  {
    kind: 'combo', section: '에서 vs 에', color: C.e,
    question: '카페___ 가요',
    blank: '___',
    binaryOptions: ['에서', '에'],
    answer: '에',
    feedback: '가요 es movimiento → 에',
  },

  /* ── SECTION 도 ── */
  {
    kind: 'tema', section: '도', sectionIndex: 3,
    particle: '도', color: C.do_,
    rule: 'También · Añade 도 en lugar de 은/는/이/가',
    showTransform: { from: '저는 공부해요', to: '저도 공부해요', label: 'Yo también estudio' },
  },
  {
    kind: 'ejemplos', section: '도', color: C.do_,
    items: [
      { ko: ['저', '도', ' 이 대학교에서 공부해요'], particleIdx: 1, verbIdx: -1, es: 'Yo también estudio en esta universidad', audio: '저도 이 대학교에서 공부해요' },
      { ko: ['친구들', '도', ' 많아요'], particleIdx: 1, verbIdx: -1, es: 'Los amigos también son muchos', audio: '친구들도 많아요' },
    ],
  },
  {
    kind: 'ejercicio', section: '도', color: C.do_,
    question: '¿Cómo dices "Yo también trabajo en el café"?',
    options: [
      { text: '저도 카페에서 일해요', correct: true },
      { text: '저는 카페에서 일해요도', correct: false },
      { text: '저도 카페에 일해요', correct: false },
      { text: '도 저 카페에서 일해요', correct: false },
    ],
    feedback: '도 va pegado al sujeto, reemplaza 는/은 ✓',
  },

  /* ── SECTION 하다 verbs ── */
  {
    kind: 'hada', section: '하다 verbs', color: C.hada,
    rule: 'Sufijo -해요 siempre igual. Solo cambia lo que va delante.',
    verbs: [
      { noun: '공부', hadaForm: '공부해요', audio: '공부해요' },
      { noun: '일',   hadaForm: '일해요',   audio: '일해요'   },
      { noun: '좋아', hadaForm: '좋아해요', audio: '좋아해요' },
      { noun: '뭐',   hadaForm: '뭐해요?',  audio: '뭐 해요'  },
    ],
  },
  {
    kind: 'ejercicio', section: '하다 verbs', color: C.hada,
    question: '¿Cómo se dice "Estudio en la biblioteca"?',
    options: [
      { text: '도서관에서 공부해요', correct: true },
      { text: '도서관에 공부해요', correct: false },
      { text: '도서관에서 공부하다', correct: false },
      { text: '도서관에서 일해요', correct: false },
    ],
    feedback: '공부하다 → 공부해요 + 에서 porque la acción ocurre ahí ✓',
  },

  /* ── SECTION 좋아요 vs 좋아해요 ── */
  {
    kind: 'contrast', section: '좋아요 vs 좋아해요',
    left:  { color: '#f59e0b', label: '좋아요 = adjetivo', icon: '👍', items: ['¡Está bien!', '¡De acuerdo!', '좋아요! (standalone)'] },
    right: { color: C.joa,    label: '좋아해요 = verbo',  icon: '❤️', items: ['Me gusta X', 'Le gusta X', '한국 좋아해요'] },
    tip: '⚠️ 한국 좋아요 ✗ — incorrecto para expresar gusto por algo',
  },
  {
    kind: 'ejercicio', section: '좋아해요', color: C.joa,
    question: '¿Cómo expresas "Me gusta el café"?',
    options: [
      { text: '카페 좋아해요', correct: true },
      { text: '카페 좋아요', correct: false },
      { text: '카페에서 좋아요', correct: false },
      { text: '카페가 좋아해요', correct: false },
    ],
    feedback: 'Para expresar gusto por algo → [objeto] + 좋아해요 ✓',
  },

  /* ── COMBINED EXERCISES ── */
  {
    kind: 'combo', section: 'Combinado', color: C.eoseo,
    question: 'David estudia en esta universidad. ¿Cómo lo dice?',
    options: [
      { text: '이 대학교에서 공부해요', correct: true },
      { text: '이 대학교에 공부해요', correct: false },
      { text: '이 대학교에서 가요', correct: false },
      { text: '이 대학교 공부해요', correct: false },
    ],
    answer: '이 대학교에서 공부해요',
    feedback: '에서 + 공부해요 = acción en el lugar ✓',
  },
  {
    kind: 'combo', section: 'Combinado', color: C.do_,
    question: 'Minsu también estudia. ¿Cómo?',
    options: [
      { text: '저도 이 대학교에서 공부해요', correct: true },
      { text: '저는 이 대학교에서 공부해요', correct: false },
      { text: '저도 이 대학교에 공부해요', correct: false },
      { text: '저도 이 대학교에서 일해요', correct: false },
    ],
    answer: '저도 이 대학교에서 공부해요',
    feedback: '도 (también) + 에서 (acción en lugar) + 공부해요 ✓',
  },
];

/* ─── Section label helper ───────────────────────────────────────────────── */
function getSectionLabel(step: Step): string {
  return step.section;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function MicroExplanation007({ onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [picked,  setPicked]  = useState<string | null>(null);
  const [binaryPicked, setBinaryPicked] = useState<string | null>(null);
  const [revealedVerbs, setRevealedVerbs] = useState<boolean[]>([false, false, false, false]);

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  /* Reset per-step state when navigating */
  useEffect(() => {
    setPicked(null);
    setBinaryPicked(null);
    setRevealedVerbs([false, false, false, false]);
  }, [stepIdx]);

  function advance() {
    if (isLast) { onComplete?.(); }
    else { setStepIdx(i => i + 1); }
  }

  const progress = (stepIdx / (STEPS.length - 1)) * 100;

  /* ── Shared option button renderer ── */
  function OptionButton({ opt, answer }: { opt: Option; answer: string }) {
    const chosen = picked === opt.text || binaryPicked === opt.text;
    const revealed = !!(picked || binaryPicked);
    const state = !revealed
      ? 'idle'
      : opt.correct
        ? (chosen ? 'correct' : 'reveal')
        : chosen ? 'wrong' : 'idle';

    const bg    = state === 'correct' ? 'rgba(34,197,94,0.12)' : state === 'wrong' ? 'rgba(239,68,68,0.09)' : state === 'reveal' ? 'rgba(34,197,94,0.06)' : 'var(--secondary)';
    const bdr   = state === 'correct' ? '1px solid rgba(34,197,94,0.5)' : state === 'wrong' ? '1px solid rgba(239,68,68,0.45)' : state === 'reveal' ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)';
    const clr   = state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--foreground)';
    const mark  = state === 'correct' || state === 'reveal' ? '✓' : state === 'wrong' ? '✕' : '';

    return (
      <button
        type="button"
        disabled={revealed}
        onClick={() => {
          if (revealed) return;
          setPicked(opt.text);
        }}
        style={{
          textAlign: 'left', padding: '12px 16px', borderRadius: 12,
          fontSize: 14, fontWeight: 600, lineHeight: 1.45,
          cursor: revealed ? 'default' : 'pointer',
          background: bg, border: bdr, color: clr,
          display: 'flex', alignItems: 'center', gap: 10,
          transition: 'all 0.18s ease',
          fontFamily: '"Noto Sans KR",system-ui,sans-serif',
        }}
      >
        <span style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800,
          background: state === 'correct' ? 'rgba(34,197,94,0.25)' : state === 'wrong' ? 'rgba(239,68,68,0.2)' : state === 'reveal' ? 'rgba(34,197,94,0.15)' : 'var(--border)',
          color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--muted-foreground)',
        }}>{mark}</span>
        {opt.text}
      </button>
    );
    void answer;
  }

  /* ── Feedback box ── */
  function FeedbackBox({ feedback, color }: { feedback: string; color: string }) {
    const isOk = !!(picked && STEPS[stepIdx] && (() => {
      const s = STEPS[stepIdx];
      if (s.kind === 'ejercicio') return s.options.find(o => o.text === picked)?.correct;
      if (s.kind === 'combo' && s.options) return s.options.find(o => o.text === picked)?.correct;
      return false;
    })());
    return (
      <div style={{
        padding: '12px 16px', borderRadius: 12, marginTop: 12,
        animation: 'me5-in 0.3s ease both',
        background: isOk ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
        border: `1px solid ${isOk ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
      }}>
        {isOk
          ? <p style={{ margin: '0 0 3px', fontSize: 12, fontWeight: 800, color: '#22c55e' }}>✓ ¡Correcto!</p>
          : <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b' }}>
              Respuesta: {(() => {
                const cs = STEPS[stepIdx];
                if (cs.kind === 'combo') return (cs as ComboStep).answer;
                if (cs.kind === 'ejercicio') return (cs as EjercicioStep).options.find(o => o.correct)?.text;
                return '';
              })()}
            </p>
        }
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{feedback}</p>
      </div>
    );
    void color;
  }

  /* ── RENDER TEMA ── */
  function renderTema(s: TemaStep) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', textAlign: 'center', padding: '8px 0' }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 100,
          background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color,
        }}>
          SECCIÓN {s.sectionIndex} · {s.section}
        </div>

        <div style={{ animation: 'me5-particle 0.55s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <span style={{
            fontSize: 80, fontWeight: 900, fontFamily: '"Noto Sans KR",sans-serif',
            color: s.color, lineHeight: 1, display: 'block',
          }}>{s.particle}</span>
        </div>

        <div style={{
          padding: '14px 20px', borderRadius: 16, maxWidth: 320,
          background: `${s.color}10`, border: `2px solid ${s.color}30`,
          borderLeft: `4px solid ${s.color}`,
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: s.color }}>{s.rule}</p>
          {s.subRule && (
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--foreground)', fontFamily: '"Noto Sans KR",sans-serif' }}>
              {s.subRule}
            </p>
          )}
        </div>

        {s.showTransform && (
          <div style={{ width: '100%', maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.3)', fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: C.red, textDecoration: 'line-through' }}>
                {s.showTransform.from}
              </span>
              <span style={{ fontSize: 18, color: s.color }}>→</span>
              <span style={{ padding: '8px 14px', borderRadius: 10, background: `${s.color}12`, border: `1px solid ${s.color}40`, fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: s.color }}>
                {s.showTransform.to}
              </span>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>{s.showTransform.label}</p>
          </div>
        )}
      </div>
    );
  }

  /* ── RENDER EJEMPLOS ── */
  function renderEjemplos(s: EjemplosStep) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: s.color }}>
          Ejemplos · {s.section}
        </p>
        {s.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
            padding: '12px 14px', borderRadius: 14,
            background: `${s.color}08`, border: `1px solid ${s.color}28`,
            borderLeft: `3px solid ${s.color}`,
            animation: `me5-in 0.35s ${i * 0.08}s ease both`,
          }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', lineHeight: 1.3 }}>
                {item.ko.map((seg, j) => {
                  if (j === item.particleIdx) return <span key={j} style={{ color: s.color, fontWeight: 900 }}>{seg}</span>;
                  if (j === item.verbIdx)     return <span key={j} style={{ color: C.hada }}>{seg}</span>;
                  return <span key={j} style={{ color: 'var(--foreground)' }}>{seg}</span>;
                })}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{item.es}</p>
            </div>
            <button
              type="button"
              onClick={() => playAudio(item.audio)}
              style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                background: `${s.color}14`, border: `1px solid ${s.color}40`,
                color: s.color, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >🔊</button>
          </div>
        ))}
      </div>
    );
  }

  /* ── RENDER EJERCICIO ── */
  function renderEjercicio(s: EjercicioStep) {
    const answered = !!picked;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: s.color }}>
          Ejercicio · {s.section}
        </p>
        <div style={{
          padding: '16px', borderRadius: 16,
          background: `${s.color}08`, border: `1px solid ${s.color}28`,
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4 }}>
            {s.question}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.options.map((opt, i) => (
              <OptionButton key={i} opt={opt} answer={s.options.find(o => o.correct)?.text ?? ''} />
            ))}
          </div>
          {answered && <FeedbackBox feedback={s.feedback} color={s.color} />}
        </div>
      </div>
    );
  }

  /* ── RENDER CONTRAST ── */
  function renderContrast(s: ContrastStep) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
          Contraste · {s.section}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[s.left, s.right].map((col, ci) => (
            <div key={ci} style={{
              padding: '14px 12px', borderRadius: 16,
              background: `${col.color}10`, border: `2px solid ${col.color}35`,
              animation: `me5-in 0.4s ${ci * 0.1}s ease both`,
            }}>
              <p style={{ margin: '0 0 3px', fontSize: 20 }}>{col.icon}</p>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 800, color: col.color, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>
                {col.label}
              </p>
              {col.items.map((item, i) => (
                <p key={i} style={{
                  margin: '0 0 4px', fontSize: 13, fontWeight: 600,
                  fontFamily: '"Noto Sans KR",system-ui,sans-serif',
                  color: 'var(--foreground)', lineHeight: 1.4,
                }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          padding: '12px 16px', borderRadius: 14,
          background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.22)',
          animation: 'me5-in 0.4s 0.2s ease both',
        }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65, fontWeight: 600 }}>
            💡 {s.tip}
          </p>
        </div>
      </div>
    );
  }

  /* ── RENDER HADA ── */
  function renderHada(s: HadaStep) {
    const allRevealed = revealedVerbs.every(Boolean);

    function revealVerb(idx: number) {
      setRevealedVerbs(prev => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: s.color }}>
            {s.section} · Constructor dinámico
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>Toca "해요 →" para revelar cada forma</p>
        </div>

        {s.verbs.map((verb, i) => {
          const revealed = revealedVerbs[i];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', borderRadius: 14,
              background: revealed ? `${s.color}10` : 'var(--secondary)',
              border: `1px solid ${revealed ? s.color + '40' : 'var(--border)'}`,
              transition: 'all 0.3s ease',
              animation: `me5-in 0.35s ${i * 0.07}s ease both`,
            }}>
              <span style={{ fontSize: 20, fontWeight: 900, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', minWidth: 48 }}>
                {verb.noun}
              </span>
              <span style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>+</span>
              {!revealed
                ? (
                  <button
                    type="button"
                    onClick={() => revealVerb(i)}
                    style={{
                      padding: '6px 14px', borderRadius: 10, cursor: 'pointer',
                      background: `${s.color}14`, border: `1px solid ${s.color}40`,
                      fontSize: 13, fontWeight: 800, color: s.color,
                    }}
                  >해요 →</button>
                )
                : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    <span style={{
                      fontSize: 20, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif',
                      color: s.color, animation: 'me5-reveal 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
                    }}>{verb.hadaForm}</span>
                    <button
                      type="button"
                      onClick={() => playAudio(verb.audio)}
                      style={{
                        width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                        background: `${s.color}14`, border: `1px solid ${s.color}40`,
                        color: s.color, fontSize: 13,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'me5-in 0.3s 0.1s ease both',
                      }}
                    >🔊</button>
                  </div>
                )
              }
            </div>
          );
        })}

        <div style={{
          padding: '10px 14px', borderRadius: 12,
          background: `${s.color}08`, border: `1px solid ${s.color}28`,
        }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.6 }}>
            💡 {s.rule}
          </p>
        </div>

        {!allRevealed && (
          <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: 'var(--muted-foreground)' }}>
            Revela los {s.verbs.length - revealedVerbs.filter(Boolean).length} restantes para continuar
          </p>
        )}
      </div>
    );
  }

  /* ── RENDER COMBO ── */
  function renderCombo(s: ComboStep) {
    const isBinary = !!s.binaryOptions;
    const answered  = isBinary ? !!binaryPicked : !!picked;

    const isCorrectBinary = binaryPicked === s.answer;
    const isCorrectMulti  = picked ? s.options?.find(o => o.text === picked)?.correct : false;
    const isCorrect       = isBinary ? isCorrectBinary : !!isCorrectMulti;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: s.color }}>
          {s.section === 'Combinado' ? 'Ejercicio combinado' : `Ejercicio · ${s.section}`}
        </p>
        <div style={{
          padding: '16px', borderRadius: 16,
          background: `${s.color}08`, border: `1px solid ${s.color}28`,
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          {/* Question */}
          <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4, fontFamily: '"Noto Sans KR",system-ui,sans-serif' }}>
            {s.question}
          </p>

          {/* Binary (2 big buttons) */}
          {isBinary && s.binaryOptions && (
            <div style={{ display: 'flex', gap: 10 }}>
              {s.binaryOptions.map((opt) => {
                const chosen = binaryPicked === opt;
                const isRight = opt === s.answer;
                const state = !answered ? 'idle' : isRight ? (chosen ? 'correct' : 'reveal') : chosen ? 'wrong' : 'idle';
                const bg  = state === 'correct' ? 'rgba(34,197,94,0.12)' : state === 'wrong' ? 'rgba(239,68,68,0.09)' : state === 'reveal' ? 'rgba(34,197,94,0.06)' : `${s.color}10`;
                const bdr = state === 'correct' ? '2px solid rgba(34,197,94,0.5)' : state === 'wrong' ? '2px solid rgba(239,68,68,0.45)' : state === 'reveal' ? '2px solid rgba(34,197,94,0.3)' : `2px solid ${s.color}40`;
                const clr = state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : s.color;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={answered}
                    onClick={() => { if (!answered) setBinaryPicked(opt); }}
                    style={{
                      flex: 1, padding: '16px 8px', borderRadius: 14,
                      cursor: answered ? 'default' : 'pointer',
                      background: bg, border: bdr,
                      fontSize: 22, fontWeight: 900, fontFamily: '"Noto Sans KR",sans-serif',
                      color: clr, transition: 'all 0.2s ease',
                    }}
                  >{opt}</button>
                );
              })}
            </div>
          )}

          {/* Multi options */}
          {!isBinary && s.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.options.map((opt, i) => (
                <OptionButton key={i} opt={opt} answer={s.answer} />
              ))}
            </div>
          )}

          {/* Feedback */}
          {answered && (
            <div style={{
              padding: '12px 16px', borderRadius: 12, marginTop: 12,
              animation: 'me5-in 0.3s ease both',
              background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
            }}>
              {isCorrect
                ? <p style={{ margin: '0 0 3px', fontSize: 12, fontWeight: 800, color: '#22c55e' }}>✓ ¡Correcto!</p>
                : <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b' }}>
                    Respuesta: {s.answer}
                  </p>
              }
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{s.feedback}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Can advance logic ── */
  function canAdvance(): boolean {
    if (step.kind === 'ejercicio') return !!picked;
    if (step.kind === 'combo') {
      if ((step as ComboStep).binaryOptions) return !!binaryPicked;
      return !!picked;
    }
    if (step.kind === 'hada') return revealedVerbs.every(Boolean);
    return true;
  }

  /* ── Main render ── */
  return (
    <div style={{ fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)', padding: '16px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: '100%' }}>
      <style>{`
        @keyframes me5-particle {
          from { opacity:0; transform:scale(0.5) translateY(20px) }
          to   { opacity:1; transform:scale(1) translateY(0) }
        }
        @keyframes me5-reveal {
          from { opacity:0; transform:scale(0.7) }
          to   { opacity:1; transform:scale(1) }
        }
        @keyframes me5-in {
          from { opacity:0; transform:translateY(10px) }
          to   { opacity:1; transform:none }
        }
        @keyframes me5-pop {
          from { opacity:0; transform:scale(0.92) }
          to   { opacity:1; transform:scale(1) }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ animation: 'me5-in 0.4s ease both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
            ETAPA 07 DE 11 · Micro Explicación
          </p>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)' }}>
            {stepIdx + 1}/{STEPS.length}
          </p>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${C.eoseo}, ${C.joa})`,
            width: `${progress}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 10, fontWeight: 600, color: 'var(--muted-foreground)' }}>
          {getSectionLabel(step)}
        </p>
      </div>

      {/* ── Step content ── */}
      <div key={stepIdx} style={{ flex: 1, animation: 'me5-in 0.35s ease both' }}>
        {step.kind === 'tema'      && renderTema(step)}
        {step.kind === 'ejemplos'  && renderEjemplos(step)}
        {step.kind === 'ejercicio' && renderEjercicio(step)}
        {step.kind === 'contrast'  && renderContrast(step)}
        {step.kind === 'hada'      && renderHada(step)}
        {step.kind === 'combo'     && renderCombo(step)}
      </div>

      {/* ── Siguiente button ── */}
      {canAdvance() && (
        <button
          type="button"
          onClick={advance}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `linear-gradient(135deg, ${C.eoseo}22, ${C.joa}22)`,
            border: `1px solid ${C.eoseo}50`,
            fontSize: 14, fontWeight: 800, color: C.eoseo,
            animation: 'me5-in 0.4s 0.2s ease both',
            transition: 'all 0.2s ease',
          }}
        >
          {isLast ? 'Continuar →' : 'Siguiente →'}
        </button>
      )}
    </div>
  );
}
