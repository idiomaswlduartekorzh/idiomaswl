'use client';

import { useState, useEffect } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }
type StepKind = 'tema' | 'ejemplos' | 'ejercicio';

interface TemaStep {
  kind: 'tema'; section: string; icon: string; color: string;
  title: string; rule: string; subRule?: string;
  table?: { cols: string[]; rows: string[][] };
}
interface EjemplosStep {
  kind: 'ejemplos'; section: string; color: string;
  items: { kr: string; es: string; audio: string; highlight?: string }[];
}
interface Option { text: string; correct: boolean }
interface EjercicioStep {
  kind: 'ejercicio'; section: string; color: string;
  question: string; options: Option[]; feedback: string;
}
type Step = TemaStep | EjemplosStep | EjercicioStep;

const C = {
  A: '#6c63ff',  // demonstratives
  B: '#8b5cf6',  // numbers
  C: '#22c55e',  // -도
};

const STEPS: Step[] = [
  // ── CÁPSULA A: Demostrativos ──────────────────────────────────────────────────
  {
    kind: 'tema', section: 'A', icon: '👆', color: C.A,
    title: 'Cápsula A — 이거 / 그거 / 저거',
    rule: 'El coreano codifica la DISTANCIA en el pronombre. El mismo objeto recibe un nombre diferente según dónde estás parado.',
    table: {
      cols: ['Pronombre', 'Distancia', 'Ejemplo'],
      rows: [
        ['이거', 'cerca del hablante', '이거 뭐예요? ¿Qué es esto?'],
        ['그거', 'lejos del hablante', '그거는 호떡이에요. Eso es hodduk.'],
        ['저거', 'lejos de ambos', '저거는 뭐예요? ¿Qué es aquello?'],
      ],
    },
  },
  {
    kind: 'ejemplos', section: 'A', color: C.A,
    items: [
      { kr: '이거 뭐예요?',       es: '¿Qué es esto? (cerca de ti)',        audio: '이거 뭐예요?',    highlight: '이거' },
      { kr: '그거는 호떡이에요',   es: 'Eso es hodduk (lejos de ti)',        audio: '호떡',           highlight: '그거' },
      { kr: '이거 얼마예요?',      es: '¿Cuánto es esto? (♻️ step003)',      audio: '이거 얼마예요',   highlight: '이거' },
      { kr: '저거는 뭐예요?',      es: '¿Qué es aquello? (lejos de ambos)', audio: '저거는 뭐예요?', highlight: '저거' },
    ],
  },
  {
    kind: 'ejercicio', section: 'A', color: C.A,
    question: 'Estás en un café. Señalas el pastelito que tienes justo frente a ti y preguntas "¿qué es esto?". ¿Qué dices?',
    options: [
      { text: '이거 뭐예요?', correct: true },
      { text: '그거 뭐예요?', correct: false },
      { text: '저거 뭐예요?', correct: false },
    ],
    feedback: '¡Correcto! El objeto está CERCA de ti → 이거.',
  },
  // ── CÁPSULA B: Números nativos + contracción ──────────────────────────────────
  {
    kind: 'tema', section: 'B', icon: '🔢', color: C.B,
    title: 'Cápsula B — Números nativos y contadores',
    rule: 'Para contar objetos físicos usa los números nativos: 하나, 둘, 셋, 넷, 다섯. Cuando van antes de un contador, los 4 primeros se CONTRAEN.',
    subRule: '하나→한 · 둘→두 · 셋→세 · 넷→네 · 다섯 (sin cambio)',
    table: {
      cols: ['Solo', 'Con contador', 'Contador', 'Para...'],
      rows: [
        ['하나', '한 잔', '잔', 'bebidas/tazas'],
        ['하나', '한 개', '개', 'objetos genéricos'],
        ['둘',   '두 잔', '잔', 'dos bebidas'],
        ['셋',   '세 개', '개', 'tres objetos'],
      ],
    },
  },
  {
    kind: 'ejemplos', section: 'B', color: C.B,
    items: [
      { kr: '호떡 하나 주세요',     es: 'Un hodduk (sin contador)',           audio: '호떡 하나 주세요', highlight: '하나' },
      { kr: '호떡 한 개 주세요',    es: 'Un hodduk (con contador 개)',        audio: '호떡 한 개 주세요', highlight: '한 개' },
      { kr: '커피 한 잔 주세요',    es: 'Un café (contador 잔 para bebidas)', audio: '한 잔',           highlight: '한 잔' },
      { kr: '커피 두 잔 주세요',    es: 'Dos cafés (둘→두 antes de 잔)',      audio: '둘',              highlight: '두 잔' },
    ],
  },
  {
    kind: 'ejercicio', section: 'B', color: C.B,
    question: '¿Cómo pedirías DOS tazas de café con la forma correcta?',
    options: [
      { text: '커피 두 잔 주세요', correct: true },
      { text: '커피 둘 잔 주세요', correct: false },
      { text: '커피 이 잔 주세요', correct: false },
    ],
    feedback: '¡Correcto! 둘 se contrae a 두 antes del contador 잔.',
  },
  // ── CÁPSULA C: Partícula -도 ──────────────────────────────────────────────────
  {
    kind: 'tema', section: 'C', icon: '➕', color: C.C,
    title: 'Cápsula C — La partícula -도 (también)',
    rule: '-도 significa "también" y se pega directamente a la palabra SIN espacio. REEMPLAZA las partículas 은/는, 이/가, 을/를 — no las agrega.',
    table: {
      cols: ['Con partícula normal', 'Con -도', 'Significado'],
      rows: [
        ['커피를 주세요',  '커피도 주세요',  'Un café también'],
        ['저는 알아요',    '저도 알아요',    'Yo también lo sé'],
        ['영수증을 주세요','영수증도 주세요', 'El recibo también'],
      ],
    },
  },
  {
    kind: 'ejemplos', section: 'C', color: C.C,
    items: [
      { kr: '커피도 주세요',     es: 'Un café también (del video)',        audio: '커피도 주세요',   highlight: '도' },
      { kr: '저도요',           es: 'Yo también',                         audio: '저도요',          highlight: '도' },
      { kr: '영수증도 주세요',   es: 'El recibo también, por favor',       audio: '영수증도 주세요', highlight: '도' },
      { kr: '나도 알아요',       es: 'Yo también lo sé',                   audio: '나도 알아요',     highlight: '도' },
    ],
  },
  {
    kind: 'ejercicio', section: 'C', color: C.C,
    question: 'Ya pediste el hodduk. Ahora quieres agregar agua. ¿Qué dices?',
    options: [
      { text: '물도 주세요', correct: true },
      { text: '물를 주세요', correct: false },
      { text: '물은 주세요', correct: false },
    ],
    feedback: '¡Perfecto! 물 (agua) + 도 = 물도. La partícula -도 reemplaza -를.',
  },
];

export default function MicroExplanation004({ onComplete }: Props) {
  const [stepIdx,  setStepIdx]  = useState(0);
  const [picked,   setPicked]   = useState<number | null>(null);
  const [correct,  setCorrect]  = useState(0);
  const [timer,    setTimer]    = useState(90);
  const [running,  setRunning]  = useState(false);

  const step = STEPS[stepIdx];

  useEffect(() => {
    if (!running) return;
    if (timer <= 0) { setRunning(false); return; }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, timer]);

  function startTimer() { setTimer(90); setRunning(true); }

  function handlePick(i: number) {
    if (picked !== null || step.kind !== 'ejercicio') return;
    setPicked(i);
    if ((step as EjercicioStep).options[i].correct) setCorrect(c => c + 1);
    playAudio('호떡 하나 주세요');
  }

  function next() {
    if (stepIdx + 1 >= STEPS.length) { onComplete?.(); return; }
    setStepIdx(s => s + 1);
    setPicked(null);
    setRunning(false);
  }

  const sections = ['A','B','C'];
  const currentSection = step.section;

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 07 DE 11 · Micro explicación</p>
        {running && <span style={{ fontSize: 12, fontWeight: 700, color: timer < 20 ? '#ef4444' : 'var(--muted)' }}>⏱ {timer}s</span>}
      </div>

      {/* Section indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {sections.map(s => {
          const colors = { A: C.A, B: C.B, C: C.C };
          const active = s === currentSection;
          return (
            <div key={s} style={{ flex: 1, padding: '6px', borderRadius: 8, background: active ? `${colors[s as keyof typeof colors]}18` : 'var(--bg-2,#f5f5f7)', border: `1px solid ${active ? colors[s as keyof typeof colors] : 'var(--line-soft)'}`, textAlign: 'center', fontSize: 12, fontWeight: 700, color: active ? colors[s as keyof typeof colors] : 'var(--muted)' }}>
              Cápsula {s}
            </div>
          );
        })}
      </div>

      {step.kind === 'tema' && (
        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{(step as TemaStep).icon}</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{(step as TemaStep).title}</h3>
          </div>
          <div style={{ background: `${step.color}10`, border: `1px solid ${step.color}33`, borderRadius: 12, padding: '14px', marginBottom: 14 }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.5 }}>{(step as TemaStep).rule}</p>
            {(step as TemaStep).subRule && <p style={{ margin: 0, fontSize: 13, fontWeight: 700, fontFamily: "'Noto Sans KR',sans-serif", color: step.color }}>{(step as TemaStep).subRule}</p>}
          </div>
          {(step as TemaStep).table && (
            <div style={{ overflowX: 'auto', marginBottom: 14 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>{(step as TemaStep).table!.cols.map(c => <th key={c} style={{ padding: '8px 10px', background: `${step.color}20`, textAlign: 'left', fontWeight: 700 }}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {(step as TemaStep).table!.rows.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2,#f5f5f7)' }}>
                      {row.map((cell, j) => <td key={j} style={{ padding: '8px 10px', fontFamily: j === 0 || j === 1 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!running && <button onClick={startTimer} style={{ marginBottom: 12, background: 'none', border: `1px solid ${step.color}`, borderRadius: 100, padding: '6px 16px', fontSize: 12, color: step.color, cursor: 'pointer' }}>⏱ Modo 90 segundos</button>}
          <button onClick={next} style={{ width: '100%', background: step.color, color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Ejemplos →</button>
        </div>
      )}

      {step.kind === 'ejemplos' && (
        <div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted)' }}>Tap en cada frase para escucharla:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {(step as EjemplosStep).items.map(item => (
              <button key={item.kr} onClick={() => playAudio(item.audio)}
                style={{ background: 'var(--bg-2,#f5f5f7)', border: `1px solid ${step.color}44`, borderRadius: 12, padding: '14px 16px', textAlign: 'left', cursor: 'pointer' }}>
                <p style={{ margin: '0 0 4px', fontSize: 20, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700 }}>
                  {item.highlight ? item.kr.split(item.highlight).map((part, i, arr) => (
                    <span key={i}>{part}{i < arr.length - 1 && <strong style={{ color: step.color }}>{item.highlight}</strong>}</span>
                  )) : item.kr}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{item.es} 🔊</p>
              </button>
            ))}
          </div>
          <button onClick={next} style={{ width: '100%', background: step.color, color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Ejercicio →</button>
        </div>
      )}

      {step.kind === 'ejercicio' && (
        <div>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>{(step as EjercicioStep).question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {(step as EjercicioStep).options.map((opt, i) => {
              const isCorrect = opt.correct;
              const isPicked  = picked === i;
              const bg = picked === null ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
              const border = picked === null ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={opt.text} onClick={() => handlePick(i)}
                  style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 14, fontFamily: "'Noto Sans KR',sans-serif", cursor: picked !== null ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                  {isPicked && !isCorrect ? '❌ ' : isCorrect && picked !== null ? '✅ ' : ''}{opt.text}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <div style={{ background: `${step.color}12`, border: `1px solid ${step.color}33`, borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: 13 }}>💡 {(step as EjercicioStep).feedback}</p>
              </div>
              <button onClick={next} style={{ width: '100%', background: step.color, color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {stepIdx + 1 >= STEPS.length ? 'Continuar →' : 'Siguiente cápsula →'}
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
