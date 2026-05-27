'use client';

import { useEffect, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

const C = { A: '#6c63ff', B: '#f59e0b', C: '#e879f9' };

type Step =
  | { kind: 'explicacion'; section: string; color: string; title: string; lines: string[]; examples: { kr: string; es: string; audio: string; highlight?: string }[] }
  | { kind: 'ejemplos';    section: string; color: string; items: { kr: string; es: string; audio: string; highlight: string }[] }
  | { kind: 'comparacion'; section: string; color: string; title: string; rows: [string, string, string][] }
  | { kind: 'ejercicio';   section: string; color: string; question: string; options: { text: string; correct: boolean }[]; feedback: string };

const STEPS: Step[] = [
  // ── A: 맛있게 드세요 anatomy ─────────────────────────────────────────────────
  {
    kind: 'explicacion', section: 'A', color: C.A,
    title: '맛있게 드세요 — anatomía',
    lines: [
      '맛있다 (estar delicioso)',
      '↓ sufijo -게 → convierte adjetivo en adverbio',
      '맛있게 (deliciosamente)',
      '+ 드세요 (honorífico de 먹어요 — "coma usted")',
      '= 맛있게 드세요 — "coma deliciosamente" → ¡bon appétit!',
    ],
    examples: [
      { kr: '맛있게 드세요', es: 'Antes de que el otro empiece a comer', audio: '맛있게 드세요', highlight: '드세요' },
      { kr: '잘 먹겠습니다', es: 'Respuesta del que va a comer (opcional)', audio: '잘 먹었습니다', highlight: '잘' },
      { kr: '잘 먹었습니다', es: 'Después de comer — agradece el esfuerzo', audio: '잘 먹었습니다', highlight: '먹었습니다' },
    ],
  },
  {
    kind: 'ejercicio', section: 'A', color: C.A,
    question: 'David dice 맛있게 드세요. ¿Cuándo es el momento exacto para decirlo?',
    options: [
      { text: 'Cuando entrega el pedido, antes de que el cliente empiece a comer o beber', correct: true },
      { text: 'Después de que el cliente termina de comer', correct: false },
      { text: 'Cuando el cliente paga la cuenta', correct: false },
    ],
    feedback: '✅ Correcto. 맛있게 드세요 es preventivo — se dice ANTES de comer. Es el anfitrión o quien sirve el que lo dice. El que come responde con 잘 먹겠습니다 (voy a comer bien) o al terminar con 잘 먹었습니다.',
  },
  // ── B: 잘 + verbo ────────────────────────────────────────────────────────────
  {
    kind: 'explicacion', section: 'B', color: C.B,
    title: '잘 + verbo — el patrón del episodio',
    lines: [
      '잘 = bien / de forma satisfactoria (adverbio)',
      'Siempre va ANTES del verbo que modifica.',
      '',
      'Patrón: 잘 + [verbo]',
    ],
    examples: [
      { kr: '잘 먹었습니다', es: '"comí bien" → gracias por la comida', audio: '잘 먹었습니다', highlight: '잘' },
      { kr: '잘 모르겠어요', es: '"no lo sé bien" → suaviza la pregunta', audio: '잘 모르겠어요', highlight: '잘' },
      { kr: '잘 자요',       es: '"duerme bien" → buenas noches', audio: '잘 모르겠어요', highlight: '잘' },
      { kr: '잘 지내요?',    es: '"¿estás bien?" → saludo cotidiano', audio: '잘 모르겠어요', highlight: '잘' },
    ],
  },
  {
    kind: 'ejercicio', section: 'B', color: C.B,
    question: 'Quieres decir "no estoy seguro" de forma cortés antes de dar una dirección. ¿Cuál usas?',
    options: [
      { text: '잘 모르겠어요', correct: true },
      { text: '모르겠어요 잘', correct: false },
      { text: '잘이에요 모르다', correct: false },
    ],
    feedback: '✅ 잘 모르겠어요 — 잘 siempre ANTES del verbo. Esta frase es un colchón lingüístico: admitir incertidumbre antes de responder elimina la presión y suena más empático.',
  },
  // ── C: 실례합니다 vs 저기요 ──────────────────────────────────────────────────
  {
    kind: 'comparacion', section: 'C', color: C.C,
    title: '실례합니다 vs 저기요 — ¿cuándo cada una?',
    rows: [
      ['저기요', 'Llamar al mesero desde la mesa', '✋ Levantar la mano en un restaurante'],
      ['실례합니다', 'Interrumpir a alguien que está trabajando o hablando', '🙏 Acercarse a David que está en el mostrador'],
      ['잠시만요', 'Pedir que esperen un momento (quien habla pide tiempo)', '⏱ David pide tiempo para mirar la caja'],
    ],
  },
  {
    kind: 'ejercicio', section: 'C', color: C.C,
    question: 'Estás en la calle y necesitas parar a un transeúnte para preguntar una dirección. ¿Qué dices?',
    options: [
      { text: '실례합니다', correct: true },
      { text: '저기요', correct: false },
      { text: '잠시만요', correct: false },
    ],
    feedback: '✅ 실례합니다 — para interrumpir a alguien en la calle o que está ocupado. 저기요 es para llamar al personal de servicio. 잠시만요 lo dice quien necesita tiempo, no quien llama la atención.',
  },
];

export default function MicroExplanation005({ onComplete }: Props) {
  const [stepIdx,  setStepIdx]  = useState(0);
  const [picked,   setPicked]   = useState<number | null>(null);
  const [correct,  setCorrect]  = useState(0);
  const [timer,    setTimer]    = useState(90);

  const step   = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  useEffect(() => {
    setTimer(90);
    const iv = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(iv);
  }, [stepIdx]);

  function highlightText(text: string, hl?: string, color?: string) {
    if (!hl || !color) return <>{text}</>;
    const parts = text.split(hl);
    return <>{parts.map((p, i) => (<span key={i}>{p}{i < parts.length - 1 && <strong style={{ color, background: `${color}22`, borderRadius: 4, padding: '0 3px' }}>{hl}</strong>}</span>))}</>;
  }

  function advance() { setPicked(null); setStepIdx(i => i + 1); }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 07 DE 11 · Micro explicación</p>
        <span style={{ fontSize: 12, color: timer < 20 ? '#ef4444' : 'var(--muted)', fontFamily: 'var(--mono)' }}>{timer}s</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${((stepIdx + 1) / STEPS.length) * 100}%`, background: step.color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      {/* EXPLICACION */}
      {step.kind === 'explicacion' && (
        <>
          <div style={{ background: `${step.color}0d`, border: `1px solid ${step.color}33`, borderRadius: 14, padding: '18px 20px', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: step.color, letterSpacing: '0.1em' }}>BLOQUE {step.section}</span>
            <h3 style={{ margin: '6px 0 12px', fontSize: 17, fontWeight: 800 }}>{step.title}</h3>
            {step.lines.map((l, i) => l ? (
              <p key={i} style={{ margin: '4px 0', fontSize: 14, fontFamily: l.includes('↓') ? 'var(--mono)' : 'inherit', color: l.includes('=') ? step.color : 'var(--foreground)', fontWeight: l.includes('=') ? 700 : 400 }}>{l}</p>
            ) : <div key={i} style={{ height: 8 }} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {step.examples.map((ex, i) => (
              <button key={i} onClick={() => playAudio(ex.audio)}
                style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 12, padding: '12px 16px', textAlign: 'left', cursor: 'pointer' }}>
                <p style={{ margin: '0 0 2px', fontSize: 20, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}>
                  {highlightText(ex.kr, ex.highlight, step.color)}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{ex.es} 🔊</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* COMPARACION */}
      {step.kind === 'comparacion' && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ background: `${step.color}15`, padding: '12px 16px', borderBottom: `1px solid ${step.color}33` }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: step.color }}>BLOQUE {step.section} · {step.title}</p>
          </div>
          {step.rows.map(([term, uso, ejemplo], i) => (
            <div key={i} style={{ padding: '14px 16px', borderTop: i > 0 ? '1px solid var(--line-soft)' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <button onClick={() => playAudio(term)}
                  style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, fontWeight: 800, color: step.color, background: `${step.color}15`, border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {term}
                </button>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600 }}>{uso}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{ejemplo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EJERCICIO */}
      {step.kind === 'ejercicio' && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 14, padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600 }}>✏️ {step.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {step.options.map((opt, i) => {
              const isPicked  = picked === i;
              const isCorrect = opt.correct;
              const bg = picked === null ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
              const border = picked === null ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={i} onClick={() => { if (picked !== null) return; setPicked(i); if (isCorrect) setCorrect(c => c + 1); }}
                  style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", cursor: picked !== null ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                  {isPicked && !isCorrect ? '❌ ' : isCorrect && picked !== null ? '✅ ' : ''}{opt.text}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p style={{ marginTop: 12, fontSize: 13, background: `${step.color}11`, borderRadius: 8, padding: '10px 14px', lineHeight: 1.5 }}>{step.feedback}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {isLast ? (
          <button onClick={() => onComplete?.()} style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            ¡Entendido! Continuar →
          </button>
        ) : (
          <button onClick={advance} disabled={step.kind === 'ejercicio' && picked === null}
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 600, cursor: step.kind === 'ejercicio' && picked === null ? 'not-allowed' : 'pointer', opacity: step.kind === 'ejercicio' && picked === null ? 0.5 : 1 }}>
            Siguiente →
          </button>
        )}
      </div>
    </section>
  );
}
